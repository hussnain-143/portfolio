# Master Implementation Plan

**Project**: Hussnain Ahmed — Premium Developer Portfolio + Secure Admin CMS  
**Date**: October 2026

---

## Phase 1: Repository Audit & Baseline Verification (Completed)
- [x] Inspect Git history, existing branch, package manifest, dependencies, and configuration.
- [x] Run baseline build and lint checks, identify baseline issues.
- [x] Review design reference (`eishaanwar.me`) and document findings.
- [x] Generate `docs/project-audit.md`.

---

## Phase 2: Safe File & Dependency Cleanup
- [ ] Remove verified abandoned directory `portfolio-v1/`.
- [ ] Remove empty route directories: `src/app/about/`, `src/app/contact/`, `src/app/projects/`, `src/app/skills/`, and `public/projects/`.
- [ ] Remove duplicate icon asset: `src/app/favicona.ico`.
- [ ] Consolidate/remove unused standalone components: `CustomCursor.jsx`, `AnimatedStars.jsx`, `SkillCard.jsx`.
- [ ] Document all removals in `docs/cleanup-report.md`.
- [ ] Verify build remains intact after cleanup.

---

## Phase 3: TypeScript Setup & Dependency Configuration
- [ ] Install required dependencies:
  - `mongoose`
  - `zod`
  - `bcryptjs` & `@types/bcryptjs`
  - `jose` (for JWT / session tokens)
  - `typescript`, `@types/react`, `@types/node`, `@types/react-dom`
- [ ] Initialize `tsconfig.json` with strict mode enabled.
- [ ] Configure `components.json` for TS support.
- [ ] Fix ESLint configuration for clean execution.

---

## Phase 4: Database Architecture & Mongoose Models
- [ ] Implement server-only MongoDB connection utility with caching in `src/lib/db.ts`.
- [ ] Implement Mongoose models in `src/models/`:
  - `AdminUser.ts`
  - `Profile.ts`
  - `Project.ts`
  - `Skill.ts`
  - `Experience.ts`
  - `Education.ts`
  - `SiteSettings.ts`
  - `ContactMessage.ts`
- [ ] Implement Zod validation schemas in `src/lib/validations/`.
- [ ] Build idempotent database seed script (`src/scripts/seed.ts` or `src/scripts/seed.js`) loaded with 100% real verified user content.

---

## Phase 5: Authentication & Security Architecture
- [ ] Implement secure session manager (`src/lib/auth.ts`):
  - Password verification via bcrypt.
  - Signed HTTP-only session cookies with expiration and secure flags.
  - Server-side authorization guard helper (`requireAdmin`).
- [ ] Implement rate limiter (`src/lib/rate-limit.ts`) for login attempts and contact submissions.
- [ ] Configure security headers in `next.config.mjs` (CSP, HSTS, frame-ancestors, X-Content-Type-Options, etc.).
- [ ] Build admin login endpoint (`/api/auth/login`) and logout endpoint (`/api/auth/logout`).
- [ ] Build first-admin provisioning script (`src/scripts/create-admin.ts`).

---

## Phase 6: Secure Admin CMS Dashboard (`/admin`)
- [ ] Build `/admin/login` page with secure form, rate-limiting feedback, and CSRF/origin checks.
- [ ] Build `/admin` protected dashboard layout with sidebar navigation, session validation, and logout.
- [ ] Build CMS views & API routes:
  - `/admin` (Overview: stats, published vs draft counts, recent messages, quick links)
  - `/admin/projects` (CRUD: create, edit, slug validation, image, tags, demo/code links, publish/unpublish toggle, featured toggle, reordering, deletion modal)
  - `/admin/profile` (Edit name, title, bio, contact details, socials, resume, availability status)
  - `/admin/experience` & `/admin/education` (Add, edit, delete, reorder)
  - `/admin/skills` (Add, edit, delete, categorize)
  - `/admin/messages` (Inquiry inbox: read/unread, details modal, archive, delete, reply mailto)
  - `/admin/settings` (SEO defaults, site name, footer text, custom toggles)
- [ ] API routes under `/api/admin/*` with strict server-side authentication and Zod input parsing.

---

## Phase 7: Public Portfolio Redesign (Inspired by Reference)
- [ ] Design System:
  - Sleek, premium dark theme with refined glowing borders, glassmorphic floating pill navbar, smooth transitions, and high-readability typography.
  - Reduced-motion accessible styling.
- [ ] Routes & Pages:
  - `/` — Homepage: Hero with dynamic typing / headline, availability indicator, live stats, featured projects showcase, skills snapshot, experience highlights, and contact CTA.
  - `/about` — Biography, career journey, experience timeline, education history, awards & certifications showcase, download resume link.
  - `/projects` — Project catalog with category filtering, technology badges, live demo / github links, and modal or link to case study.
  - `/projects/[slug]` — Deep-dive case study page with full project description, tech stack, architecture details, screenshots, and links.
  - `/experience` — Dedicated work experience & milestones timeline.
  - `/skills` — Interactive technical expertise grid categorized with proficiency badges.
  - `/contact` — Clean contact page with direct contact details, location, and MongoDB-persisted contact form with honeypot spam protection, server-side validation, and instant feedback.
  - `404` / `not-found.tsx` — Custom aesthetic 404 page.

---

## Phase 8: Testing & Verification
- [ ] Implement unit and integration tests (validations, auth helpers, slug creation, rate limiter, database models).
- [ ] Test public and admin endpoints for unauthorized access rejection.
- [ ] Verify contact form persistence and honeypot spam filtering.
- [ ] Run full build check (`npm run build`).

---

## Phase 9: Documentation & Deployment Preparation
- [ ] Create `docs/cleanup-report.md`.
- [ ] Create `docs/security-review.md`.
- [ ] Create `docs/deployment.md` for Vercel + MongoDB Atlas M0.
- [ ] Create `.env.example`.
- [ ] Update root `README.md` with complete architecture, local development commands, and admin provisioning guide.
