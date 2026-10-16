import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Education } from '@/models/Education';
import { educationSchema } from '@/lib/validations';
import mongoose from 'mongoose';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid education ID format' }, { status: 400 });
    }

    const body = await req.json();
    const parseResult = educationSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid education data' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updated = await Education.findByIdAndUpdate(
      id,
      { $set: parseResult.data },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Education record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, education: JSON.parse(JSON.stringify(updated)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update education record' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid education ID format' }, { status: 400 });
    }

    await connectToDatabase();
    const deleted = await Education.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ error: 'Education record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Education record deleted' });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete education record' }, { status: 500 });
  }
}
