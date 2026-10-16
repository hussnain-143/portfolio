import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { AdminUser } from '@/models/AdminUser';
import { verifyPassword, hashPassword, createSessionToken, setSessionCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`login:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 });

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid email or password format' },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    // Check if database URI is configured in environment variables
    if (!process.env.MONGODB_URI) {
      console.error('Login error: MONGODB_URI environment variable is missing.');
      return NextResponse.json(
        {
          error:
            'Server configuration error: MONGODB_URI is missing. Please add MONGODB_URI in your Vercel Project Settings -> Environment Variables.',
        },
        { status: 500 }
      );
    }

    await connectToDatabase();
    let admin = await AdminUser.findOne({ email });

    // Self-healing bootstrap: If this user matches ADMIN_EMAIL & ADMIN_PASSWORD env vars, auto-provision or sync
    const envAdminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    const envAdminPassword = process.env.ADMIN_PASSWORD;

    if (!admin && envAdminEmail && email === envAdminEmail && envAdminPassword && password === envAdminPassword) {
      console.log(`Auto-provisioning initial superadmin account for ${email}...`);
      const passwordHash = await hashPassword(password);
      admin = await AdminUser.create({
        email,
        passwordHash,
        name: 'Hussnain Ahmed',
        role: 'superadmin',
      });
    }

    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save();

    // Create signed session token
    const token = await createSessionToken({
      userId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });

    setSessionCookie(response, token);
    return response;
  } catch (err: unknown) {
    console.error('Login error:', err);
    const errString = err instanceof Error ? err.message : String(err);

    // Provide actionable diagnostic messages for database connection failures on Vercel
    if (
      errString.includes('whitelist') ||
      errString.includes('ServerSelectionError') ||
      errString.includes('ETIMEDOUT') ||
      errString.includes('querySrv')
    ) {
      return NextResponse.json(
        {
          error:
            'Database connection error: Could not reach MongoDB Atlas. Please ensure Network Access in MongoDB Atlas allows 0.0.0.0/0 (Vercel serverless IPs) and your database user credentials are correct.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Login server error: ${errString || 'An unexpected error occurred'}` },
      { status: 500 }
    );
  }
}
