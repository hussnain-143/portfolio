import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Experience } from '@/models/Experience';
import { experienceSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();

    const experiences = await Experience.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ experiences: JSON.parse(JSON.stringify(experiences)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    const parseResult = experienceSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid experience data' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newExp = await Experience.create(parseResult.data);
    return NextResponse.json({ success: true, experience: JSON.parse(JSON.stringify(newExp)) }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
