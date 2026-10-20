import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required').max(120).trim(),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
    .trim(),
  shortDescription: z.string().min(5, 'Short description is required').max(300).trim(),
  detailedDescription: z.string().optional().default(''),
  coverImage: z.string().min(1, 'Cover image is required').trim(),
  galleryImages: z.array(z.string().trim()).optional().default([]),
  tags: z.array(z.string().trim()).min(1, 'At least one tag is required'),
  category: z.string().min(2, 'Category is required').trim(),
  projectStatus: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
  isFeatured: z.boolean().default(false),
  displayOrder: z.coerce.number().int().default(0),
  githubUrl: z.string().url().or(z.literal('')).optional().default(''),
  liveUrl: z.string().url().or(z.literal('')).optional().default(''),
  caseStudyContent: z
    .object({
      overview: z.string().optional().default(''),
      challenges: z.string().optional().default(''),
      solutions: z.string().optional().default(''),
      keyFeatures: z.array(z.string()).optional().default([]),
      architecture: z.string().optional().default(''),
    })
    .optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  isPublished: z.boolean().default(true),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  headline: z.string().min(5).max(150).trim(),
  title: z.string().min(2).max(100).trim(),
  shortBio: z.string().min(10).max(500).trim(),
  fullBio: z.array(z.string().trim()).min(1),
  email: z.string().email().trim(),
  phone: z.string().min(5).max(30).trim(),
  location: z.string().min(2).max(100).trim(),
  avatarUrl: z.string().min(1).trim(),
  resumeUrl: z.string().min(1).trim(),
  githubUrl: z.string().url().trim(),
  linkedinUrl: z.string().url().trim(),
  twitterUrl: z.string().url().or(z.literal('')).optional().default(''),
  availabilityStatus: z.enum(['available', 'busy', 'selective']).default('available'),
  availabilityNote: z.string().max(200).optional(),
  yearsOfExperience: z.coerce.number().min(0).max(50).default(2),
  completedProjectsCount: z.coerce.number().min(0).default(6),
  rotatingPhrases: z.array(z.string().trim()).min(1),
  highlights: z
    .array(
      z.object({
        title: z.string().min(2).max(50),
        desc: z.string().min(5).max(200),
        icon: z.string().default('code'),
      })
    )
    .optional()
    .default([]),
});

export const skillSchema = z.object({
  category: z.string().min(2).max(60).trim(),
  name: z.string().min(1).max(60).trim(),
  level: z.enum(['Expert', 'Advanced', 'Intermediate', 'Beginner']).default('Advanced'),
  icon: z.string().optional().default(''),
  displayOrder: z.coerce.number().int().default(0),
  isFeatured: z.boolean().default(true),
});

export const experienceSchema = z.object({
  role: z.string().min(2).max(100).trim(),
  company: z.string().min(2).max(100).trim(),
  location: z.string().max(100).optional().default(''),
  period: z.string().min(2).max(50).trim(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(10).max(2000).trim(),
  achievements: z.array(z.string().trim()).optional().default([]),
  skills: z.array(z.string().trim()).optional().default([]),
  displayOrder: z.coerce.number().int().default(0),
});

export const educationSchema = z.object({
  degree: z.string().min(2).max(120).trim(),
  school: z.string().min(2).max(120).trim(),
  period: z.string().min(2).max(50).trim(),
  description: z.string().max(1000).optional().default(''),
  isCertificate: z.boolean().default(false),
  certificateImage: z.string().optional().default(''),
  issuer: z.string().max(100).optional().default(''),
  displayOrder: z.coerce.number().int().default(0),
});

export const contactSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80).trim(),
  email: z.string().email('Please enter a valid email address').trim().toLowerCase(),
  subject: z.string().max(120).optional().default('Portfolio Inquiry'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000).trim(),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(2).max(100).trim(),
  siteUrl: z.string().url().trim(),
  defaultSeoTitle: z.string().min(5).max(100).trim(),
  defaultSeoDescription: z.string().min(10).max(250).trim(),
  ogImageUrl: z.string().trim(),
  footerText: z.string().max(200).trim(),
  showClock: z.boolean().default(true),
  showAvailabilityBadge: z.boolean().default(true),
  emailNotificationsEnabled: z.boolean().default(false),
  notificationEmail: z.string().email().optional(),
});

export const openSourceSchema = z.object({
  title: z.string().min(2, 'Title is required').max(120).trim(),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
    .trim(),
  repoName: z.string().min(2, 'Repository name is required').max(100).trim(),
  description: z.string().min(5, 'Description is required').max(500).trim(),
  githubUrl: z.string().url('Must be a valid GitHub URL').trim(),
  liveUrl: z.string().url().or(z.literal('')).optional().default(''),
  role: z.enum(['Author', 'Maintainer', 'Contributor']).default('Author'),
  stars: z.coerce.number().int().min(0).default(0),
  forks: z.coerce.number().int().min(0).default(0),
  language: z.string().min(1).max(50).trim().default('TypeScript'),
  tags: z.array(z.string().trim()).default([]),
  isFeatured: z.boolean().default(true),
  isPublished: z.boolean().default(true),
  displayOrder: z.coerce.number().int().default(0),
  highlights: z.array(z.string().trim()).optional().default([]),
});
