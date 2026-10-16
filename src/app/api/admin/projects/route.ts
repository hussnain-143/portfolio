import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Project } from '@/models/Project';
import { projectSchema } from '@/lib/validations';

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
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (status === 'published') {
      filter.isPublished = true;
    } else if (status === 'draft') {
      filter.isPublished = false;
    }

    const projects = await Project.find(filter).sort({ displayOrder: 1, updatedAt: -1 }).lean();

    return NextResponse.json({ projects: JSON.parse(JSON.stringify(projects)) });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Projects GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    const parseResult = projectSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid project data' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check slug uniqueness
    const existing = await Project.findOne({ slug: parseResult.data.slug });
    if (existing) {
      return NextResponse.json(
        { error: `A project with slug "${parseResult.data.slug}" already exists.` },
        { status: 409 }
      );
    }

    const newProject = await Project.create(parseResult.data);
    try {
      revalidatePath('/', 'layout');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }
    return NextResponse.json({ success: true, project: JSON.parse(JSON.stringify(newProject)) }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Project POST error:', err);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
