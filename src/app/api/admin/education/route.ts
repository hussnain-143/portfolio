import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Education } from '@/models/Education';
import { educationSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();

    const education = await Education.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ education: JSON.parse(JSON.stringify(education)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch education records' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    const parseResult = educationSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid education data' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newEdu = await Education.create(parseResult.data);
    return NextResponse.json({ success: true, education: JSON.parse(JSON.stringify(newEdu)) }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create education record' }, { status: 500 });
  }
}
