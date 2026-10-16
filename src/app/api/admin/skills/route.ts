import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Skill } from '@/models/Skill';
import { skillSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();

    const skills = await Skill.find().sort({ displayOrder: 1, category: 1 }).lean();
    return NextResponse.json({ skills: JSON.parse(JSON.stringify(skills)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    const parseResult = skillSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid skill data' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newSkill = await Skill.create(parseResult.data);
    return NextResponse.json({ success: true, skill: JSON.parse(JSON.stringify(newSkill)) }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
