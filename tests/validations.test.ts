import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  contactSubmissionSchema,
  loginSchema,
  projectSchema,
  skillSchema,
  experienceSchema,
  educationSchema,
  profileSchema,
  siteSettingsSchema,
  openSourceSchema,
} from '../src/lib/validations';

describe('Validation Schemas', () => {
  describe('contactSubmissionSchema', () => {
    it('accepts valid contact submission', () => {
      const valid = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project inquiry',
        message: 'Hello Hussnain, I would like to discuss a frontend project with you.',
        honeypot: '',
      };
      const res = contactSubmissionSchema.safeParse(valid);
      assert.equal(res.success, true);
    });

    it('rejects invalid email address', () => {
      const invalid = {
        name: 'John Doe',
        email: 'not-an-email',
        message: 'This is a message with more than ten characters.',
      };
      const res = contactSubmissionSchema.safeParse(invalid);
      assert.equal(res.success, false);
      if (!res.success) {
        assert.ok(res.error.issues.some((i) => i.path.includes('email')));
      }
    });

    it('rejects short message under 10 chars', () => {
      const invalid = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Too short',
      };
      const res = contactSubmissionSchema.safeParse(invalid);
      assert.equal(res.success, false);
    });

    it('flags honeypot bot trap with non-empty string', () => {
      const botSubmission = {
        name: 'Bot Spammer',
        email: 'bot@spam.com',
        message: 'Buy cheap watches now immediately!',
        honeypot: 'http://spam.ru',
      };
      const res = contactSubmissionSchema.safeParse(botSubmission);
      assert.equal(res.success, false);
    });
  });

  describe('loginSchema', () => {
    it('accepts valid credentials', () => {
      const valid = {
        email: 'admin@hussnain.dev',
        password: 'ValidPassword123!',
      };
      const res = loginSchema.safeParse(valid);
      assert.equal(res.success, true);
    });

    it('rejects short passwords', () => {
      const invalid = {
        email: 'admin@hussnain.dev',
        password: 'short',
      };
      const res = loginSchema.safeParse(invalid);
      assert.equal(res.success, false);
    });
  });

  describe('projectSchema', () => {
    it('validates a complete project', () => {
      const valid = {
        title: 'Ecommerce Store',
        slug: 'ecommerce-store',
        shortDescription: 'Modern shopping experience with Next.js and MongoDB.',
        coverImage: '/projects/ecommerce.png',
        tags: ['Next.js', 'React', 'MongoDB'],
        category: 'Full Stack',
        isFeatured: true,
        displayOrder: 1,
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/repo',
      };
      const res = projectSchema.safeParse(valid);
      assert.equal(res.success, true);
    });

    it('rejects project without title or slug', () => {
      const invalid = {
        shortDescription: 'Missing fields',
      };
      const res = projectSchema.safeParse(invalid);
      assert.equal(res.success, false);
    });
  });

  describe('skillSchema', () => {
    it('validates a skill with valid level', () => {
      const valid = {
        name: 'TypeScript',
        category: 'Languages',
        level: 'Expert' as const,
        isFeatured: true,
      };
      const res = skillSchema.safeParse(valid);
      assert.equal(res.success, true);
    });

    it('rejects an invalid skill level', () => {
      const invalid = {
        name: 'TypeScript',
        category: 'Languages',
        level: 'SuperMaster',
      };
      const res = skillSchema.safeParse(invalid);
      assert.equal(res.success, false);
    });
  });

  describe('experienceSchema', () => {
    it('validates an experience item', () => {
      const valid = {
        company: 'Freelance & Contract',
        role: 'Frontend / Full-Stack Developer',
        period: '2023 - Present',
        description: 'Delivered bespoke web applications with modern design systems and clean code.',
        isCurrent: true,
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      };
      const res = experienceSchema.safeParse(valid);
      assert.equal(res.success, true);
    });
  });

  describe('educationSchema', () => {
    it('validates degree and certification awards', () => {
      const valid = {
        school: 'University of Gujrat',
        degree: 'Bachelor of Science in Information Technology',
        period: '2020 - 2024',
        isCertificate: false,
      };
      const res = educationSchema.safeParse(valid);
      assert.equal(res.success, true);
    });
  });

  describe('siteSettingsSchema', () => {
    it('validates site settings', () => {
      const valid = {
        siteName: 'Hussnain Ahmed',
        siteUrl: 'https://hussnain.dev',
        defaultSeoTitle: 'Hussnain Ahmed | Full-Stack Developer',
        defaultSeoDescription: 'Portfolio of Hussnain Ahmed, Full-Stack Developer.',
        ogImageUrl: '/profile/avatar.png',
        footerText: 'Designed & Built with Next.js, TypeScript & Tailwind CSS',
        showClock: true,
        showAvailabilityBadge: true,
      };
      const res = siteSettingsSchema.safeParse(valid);
      assert.equal(res.success, true);
    });
  });

  describe('openSourceSchema', () => {
    it('validates a valid open source repository', () => {
      const valid = {
        title: 'Portfolio & Admin Console',
        slug: 'portfolio-admin',
        repoName: 'hussnain-143/portfolio',
        description: 'Modern full-stack portfolio with complete custom CMS admin panel built on Next.js 16.',
        githubUrl: 'https://github.com/hussnain-143/portfolio',
        liveUrl: 'https://hussnain.dev',
        role: 'Author' as const,
        stars: 14,
        forks: 3,
        language: 'TypeScript',
        tags: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS'],
        isFeatured: true,
        isPublished: true,
        displayOrder: 1,
        highlights: ['Server components & API routes', 'Admin dashboard with auth'],
      };
      const res = openSourceSchema.safeParse(valid);
      assert.equal(res.success, true);
    });

    it('rejects an invalid slug with uppercase or spaces', () => {
      const invalid = {
        title: 'Portfolio',
        slug: 'Portfolio Bad Slug',
        repoName: 'hussnain-143/portfolio',
        description: 'Description here',
        githubUrl: 'https://github.com/hussnain-143/portfolio',
      };
      const res = openSourceSchema.safeParse(invalid);
      assert.equal(res.success, false);
    });

    it('rejects an invalid github URL', () => {
      const invalid = {
        title: 'Portfolio',
        slug: 'portfolio',
        repoName: 'hussnain-143/portfolio',
        description: 'Description here',
        githubUrl: 'not-a-valid-url',
      };
      const res = openSourceSchema.safeParse(invalid);
      assert.equal(res.success, false);
    });
  });
});
