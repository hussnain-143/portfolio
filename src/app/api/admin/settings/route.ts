import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { SiteSettings } from '@/models/SiteSettings';
import { siteSettingsSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();

    const settings = await SiteSettings.findOne().lean();
    return NextResponse.json({ settings: settings ? JSON.parse(JSON.stringify(settings)) : null });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    const parseResult = siteSettingsSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid settings data' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updated = await SiteSettings.findOneAndUpdate(
      {},
      { $set: parseResult.data },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, settings: JSON.parse(JSON.stringify(updated)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
