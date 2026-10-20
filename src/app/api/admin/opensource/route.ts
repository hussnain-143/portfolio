import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { OpenSource } from '@/models/OpenSource';
import { openSourceSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status'); // 'published', 'draft'

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { repoName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { language: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (status === 'published') {
      filter.isPublished = true;
    } else if (status === 'draft') {
      filter.isPublished = false;
    }

    const repos = await OpenSource.find(filter)
      .sort({ displayOrder: 1, updatedAt: -1 })
      .lean();

    return NextResponse.json({ repos: JSON.parse(JSON.stringify(repos)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('OpenSource GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch open source projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    const parseResult = openSourceSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid open source data' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify slug uniqueness
    const existing = await OpenSource.findOne({ slug: parseResult.data.slug });
    if (existing) {
      return NextResponse.json(
        { error: `An open source project with slug "${parseResult.data.slug}" already exists.` },
        { status: 409 }
      );
    }

    const newRepo = await OpenSource.create(parseResult.data);
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/opensource');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json(
      { success: true, repo: JSON.parse(JSON.stringify(newRepo)) },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('OpenSource POST error:', err);
    return NextResponse.json({ error: 'Failed to create open source project' }, { status: 500 });
  }
}
