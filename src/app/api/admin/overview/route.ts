import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Project } from '@/models/Project';
import { ContactMessage } from '@/models/ContactMessage';
import { Skill } from '@/models/Skill';
import { Experience } from '@/models/Experience';
import { Profile } from '@/models/Profile';

export async function GET() {
  try {
    await requireAdmin();

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        stats: {
          publishedProjects: 6,
          draftProjects: 0,
          totalProjects: 6,
          unreadMessages: 0,
          totalMessages: 0,
          skillsCount: 20,
          experienceCount: 3,
        },
        recentMessages: [],
        recentProjects: [],
      });
    }

    await connectToDatabase();

    const [
      publishedProjects,
      draftProjects,
      unreadMessages,
      totalMessages,
      skillsCount,
      experienceCount,
      recentMessages,
      recentProjects,
      profile,
    ] = await Promise.all([
      Project.countDocuments({ isPublished: true }),
      Project.countDocuments({ isPublished: false }),
      ContactMessage.countDocuments({ isRead: false }),
      ContactMessage.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
      Project.find().sort({ updatedAt: -1 }).limit(5).lean(),
      Profile.findOne().lean(),
    ]);

    return NextResponse.json({
      stats: {
        publishedProjects,
        draftProjects,
        totalProjects: publishedProjects + draftProjects,
        unreadMessages,
        totalMessages,
        skillsCount,
        experienceCount,
      },
      recentMessages: JSON.parse(JSON.stringify(recentMessages)),
      recentProjects: JSON.parse(JSON.stringify(recentProjects)),
      profile: profile ? JSON.parse(JSON.stringify(profile)) : null,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Admin overview error:', err);
    return NextResponse.json({ error: 'Failed to fetch admin overview' }, { status: 500 });
  }
}
