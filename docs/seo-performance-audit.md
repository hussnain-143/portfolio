# Comprehensive Technical SEO, Performance & Dead-Code Audit

**Project**: Hussnain Ahmed Portfolio & Secure Admin CMS  
**Date**: October 2026  
**Auditor**: Senior Next.js Performance & Technical SEO Engineering  
**Baseline Status**: Clean Build, 17/17 Tests Passing, 0 Lint Warnings, 0 Type Errors  

---

## 1. Executive Summary

A comprehensive architectural and performance inspection of the entire codebase was conducted across dependencies, routing, metadata, asset weight, accessibility, Core Web Vitals (CWV), and security boundaries. The application currently functions reliably on a server-first Next.js 16 App Router architecture backed by MongoDB Atlas Free Tier ($0/month). However, several key opportunities exist to drastically elevate search-engine indexability, eliminate unused bundle overhead, and boost performance:

1. **Dead Code & Unused Dependencies**: 
   - `@formspree/react`: Legacy dependency completely unused following the migration to the native MongoDB `/api/contact` API.
   - `radix-ui` & `class-variance-authority`: Exclusively imported by unused legacy component stubs (`badge.jsx`, `button.jsx`, `card.jsx`).
   - Unused images in `public/profile/` (`profileA.png` at 1.1MB, `profileA(1).png` at 1.2MB) and boilerplate Next.js SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).
2. **Technical SEO Deficiencies**:
   - Lack of route-level canonical tags across `/about`, `/projects`, `/projects/[slug]`, `/experience`, `/skills`, and `/contact`.
   - Missing explicit `<meta name="robots" content="noindex, nofollow">` on `/admin` and `/admin/login`.
   - Hardcoded `public/robots.txt` lacking dynamic host resolution.
   - Absence of JSON-LD structured data (`Person`, `WebSite`, `CreativeWork` / `SoftwareApplication`).
   - OpenGraph and Twitter social sharing metadata missing from several individual routes.
3. **Core Web Vitals & Image Performance**:
   - Heavy certificate images (e.g. `PARTICIPATION.png` at 3.0MB, `Achievement.png` at 1.0MB) should be optimized or served with explicit dimensions and responsive `sizes`.
   - Next.js font optimization: `Inter` and `Outfit` fonts self-hosted via `next/font/google` eliminate external stylesheet blocking.
4. **Security & Zero-Cost Constraints**:
   - Zero billable services required; full preservation of Bcrypt hashing, signed JWT HTTP-only cookies, MongoDB singleton connection caching, and honeypot rate limiting.

---

## 2. Baseline Measurements & Metrics

Prior to executing any changes, baseline checks were recorded:

| Diagnostic | Command | Result | Duration |
|---|---|:---:|:---:|
| **Lint** | `npm run lint` | Pass (0 errors, 0 warnings) | ~1.5s |
| **Strict Type-Check** | `npm run type-check` | Pass (0 errors) | ~8.7s |
| **Automated Test Suite** | `npm test` | Pass (17 / 17 tests across 10 suites) | ~1.8s |
| **Production Build** | `npm run build` | Pass (31/31 routes compiled) | ~23s |

---

## 3. Dependency & Codebase Analysis

### 3.1 Unused Dependencies Identified
- **`@formspree/react`** (`^3.0.0`): 0 imports across all `src/` files. Contact form submits to `/api/contact`.
- **`radix-ui`** (`^1.4.3`): Only referenced in 2 unused component files (`badge.jsx`, `button.jsx`).
- **`class-variance-authority`** (`^0.7.1`): Only referenced in unused `badge.jsx` and `button.jsx`.
- **Recommendation**: Safely remove `@formspree/react`, `radix-ui`, `class-variance-authority`, and the unreferenced `src/components/ui/` JSX stubs. Convert `src/lib/utils.js` to TypeScript `src/lib/utils.ts` retaining `clsx` and `tailwind-merge` for clean utility functions.

### 3.2 Unused Public Assets Identified
- `public/profile/profileA(1).png`: 1.2 MB (0 references in code)
- `public/profile/profileA.png`: 1.1 MB (0 references in code)
- `public/file.svg`: 391 B (0 references in code)
- `public/globe.svg`: 1.0 KB (0 references in code)
- `public/next.svg`: 1.3 KB (0 references in code)
- `public/vercel.svg`: 128 B (0 references in code)
- `public/window.svg`: 385 B (0 references in code)
- **Total Immediate Disk & Bundle Savings**: ~2.3 MB.

---

## 4. Technical SEO Action Plan

### 4.1 Route-Level Metadata & Canonicals
- Create a centralized metadata utility `src/lib/seo.ts` providing standardized OpenGraph, Twitter card, and canonical generation.
- Implement explicit canonical URLs for:
  - `/` (Home)
  - `/about`
  - `/projects`
  - `/projects/[slug]` (Dynamic per-project metadata using database values or verified fallbacks)
  - `/experience`
  - `/skills`
  - `/contact`
- Ensure trailing slashes are consistently handled (`${siteUrl}/about`).

### 4.2 Search Engine Indexing Controls
- Migrate `public/robots.txt` to dynamic `src/app/robots.ts` resolving `process.env.NEXT_PUBLIC_SITE_URL`.
- Enforce `robots: { index: false, follow: false, nocache: true }` in `src/app/admin/(dashboard)/layout.tsx` and `src/app/admin/login/page.tsx` so search crawlers never index administrative panels.

### 4.3 Structured Data (JSON-LD)
- **Homepage (`/`)**:
  - `WebSite` schema (`url`, `name`, `description`, `author`).
  - `Person` schema (`name`, `jobTitle`, `url`, `sameAs` [GitHub, LinkedIn], `knowsAbout`, `email`).
- **Project Case Studies (`/projects/[slug]`)**:
  - `CreativeWork` / `SoftwareApplication` schema (`name`, `description`, `applicationCategory`, `author`, `url`).

### 4.4 Accessibility & Semantic Hierarchy
- Verify each page contains exactly one `<h1>` element.
- Ensure all interactive elements have accessible names and images include meaningful `alt` attributes.

---

## 5. Performance & Core Web Vitals Strategy

- **LCP (Largest Contentful Paint)**: Hero avatar image has `priority` and explicit `sizes="(max-width: 640px) 256px, 288px"`.
- **CLS (Cumulative Layout Shift)**: All `<Image>` components utilize explicit `width`/`height` or parent `relative` containers with `fill` and responsive `sizes`.
- **INP (Interaction to Next Paint)**: Client components are minimized to interactive forms and drawers (`ContactForm.tsx`, `ProjectsCatalog.tsx`, `Navbar.tsx`). All content rendering remains server-side.
- **Font Optimization**: `Inter` and `Outfit` loaded through `next/font/google` with `display: swap`.

---

## 6. Risk Assessment & Mitigations

| Risk | Mitigation |
|---|---|
| Unintended deletion of active code/asset | Verify with AST/grep across all files, test suites, and dynamic patterns before removing. |
| Broken database connection or admin auth | Keep all authentication, bcrypt, JWT, and Mongoose connection logic intact. Run integration test suite on every change. |
| Broken canonical URL generation | Strip trailing slashes centrally in `src/lib/seo.ts` with fallback to `https://h-a-portfolio.netlify.app`. |
