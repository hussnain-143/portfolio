import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Profile } from '@/models/Profile';
import { profileSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();

    const profile = await Profile.findOne().lean();
    return NextResponse.json({ profile: profile ? JSON.parse(JSON.stringify(profile)) : null });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    const parseResult = profileSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid profile data' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updated = await Profile.findOneAndUpdate(
      {},
      { $set: parseResult.data },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, profile: JSON.parse(JSON.stringify(updated)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Profile PUT error:', err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
