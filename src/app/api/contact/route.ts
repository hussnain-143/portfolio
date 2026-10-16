import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ContactMessage } from '@/models/ContactMessage';
import { contactSubmissionSchema } from '@/lib/validations';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'You have sent multiple messages recently. Please wait a bit before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam trap
    if (body.honeypot && body.honeypot.length > 0) {
      // Return fake success for bot traps without storing
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    const parseResult = contactSubmissionSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid form input' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parseResult.data;
    const userAgent = req.headers.get('user-agent') || '';

    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      await ContactMessage.create({
        name,
        email,
        subject: subject || 'Portfolio Inquiry',
        message,
        ipAddress: ip,
        userAgent,
        isRead: false,
        isArchived: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
    });
  } catch (err: unknown) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      { error: 'Unable to deliver message right now. Please try again or reach out directly by email.' },
      { status: 500 }
    );
  }
}
