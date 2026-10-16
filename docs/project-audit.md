# Repository Audit & Baseline Assessment

**Project**: Hussnain Ahmed — Premium Developer Portfolio + Secure Admin CMS  
**Date**: October 2026  
**Repository Branch**: `v2/fix`  
**Current Production Deployment**: [https://h-a-portfolio.netlify.app/](https://h-a-portfolio.netlify.app/)  
**Design Reference**: [https://www.eishaanwar.me/](https://www.eishaanwar.me/)

---

## 1. Current Architecture

- **Framework**: Next.js `16.0.10` with App Router (`src/app/`)
- **React**: React `19.0.0` & React-DOM `19.0.0`
- **Styling**: Tailwind CSS `v4.x` with `@tailwindcss/postcss` and `tw-animate-css`, shadcn/ui components (`button`, `badge`, `card`) configured in `components.json`
- **Language / TypeScript**: Currently configured via `jsconfig.json` with `@/*` path alias, using JavaScript (`.jsx` / `.js`) files
- **Routing Structure**:
  - `src/app/(Main)/` route group with layout wrapper containing animated star background, animated floating icons, sidebar navigation, live digital clock (Asia/Karachi), structured data injection (`StructuredData.jsx`), and footer.
  - Public pages:
    - `/` (`src/app/(Main)/page.jsx` -> `Home.jsx` -> Hero, Highlights, Skill preview, Contact CTA)
    - `/about` (`src/app/(Main)/about/page.jsx` -> `About.jsx` -> Main Bio, Experience, Education, Certificates)
    - `/projects` (`src/app/(Main)/projects/page.jsx` -> `Project.jsx` -> 6 projects)
    - `/skills` (`src/app/(Main)/skills/page.jsx` -> `Skills.jsx` -> Front-end, Back-end, Specializations, Tools)
    - `/contact` (`src/app/(Main)/contact/page.jsx` -> `Contact.jsx` -> Contact info cards + Formspree form)
  - Root files: `src/app/layout.jsx`, `src/app/globals.css`, `src/app/not-found.jsx`, `src/app/sitemap.js`, `src/app/favicon.ico`, `src/app/favicona.ico`
  - Empty stub directories in `src/app/`: `src/app/about/`, `src/app/contact/`, `src/app/projects/`, `src/app/skills/` (leftover from route grouping refactor into `(Main)`)
- **Hosting & Infrastructure**:
  - Netlify (current live URL)
  - Vercel target for new production deployment

---

## 2. Important Existing Functionality & Content to Preserve

1. **User Identity & Bio**:
   - Name: Hussnain Ahmed
   - Professional Title: Full-Stack Developer / Front-End Developer / WordPress Specialist
   - Location: Islamabad, Pakistan
   - Email: `hussnain.ahmed.dev@gmail.com`
   - Phone: `+92 340 6999701`
   - LinkedIn: `https://linkedin.com/in/hussnain-ahmed143/`
   - GitHub: `https://github.com/hussnain-143`
   - Resume / CV: `public/cv/HUSSNAIN-AHMED-CV.pdf`
   - Profile Picture: `public/profile/image.jpg`

2. **Real Projects (Verified Data)**:
   - **Rosy Garden**: "The ultimate flower destination — a paradise for flower enthusiasts and nature lovers." Stack: React, Next.js, Tailwind. Live: `https://rosy-garden-shop.vercel.app/`, GitHub: `https://github.com/hussnain-143/rosy-garden`, Image: `/project/rosy-garden.png`.
   - **E.Store (Ecommerce)**: "An e-commerce platform built using Next.js and Redux, featuring a clean UI with Tailwind CSS and powerful state management." Stack: Next.js, Redux, Tailwind. Live: `https://e-s-store.netlify.app/`, GitHub: `https://github.com/hussnain-143/e.store`, Image: `/project/E.Store.png`.
   - **Resturent**: "A modern restaurant web app designed using React and Bootstrap, integrated with a REST API for dynamic menu and order management." Stack: React, RestApi, Bootstrap. Live: `https://restaurant-ahmed.netlify.app`, GitHub: `https://github.com/hussnain-143/restaurant`, Image: `/project/resturent.png`.
   - **Finance Tracker**: "A personal finance tracker dashboard built in React with Chart.js visualizations." Stack: React, Chart.js, Tailwind. Live: `https://adv-finance-tracker.netlify.app`, GitHub: `https://github.com/hussnain-143/finance-tracker`, Image: `/project/Finance-Tracker.png`.
   - **Eco Wrap**: "A responsive website for an eco-friendly packaging company." Stack: JavaScript, HTML, Bootstrap. Live: `https://eco-wrap.netlify.app/`, GitHub: `https://github.com/hussnain-143/Eco-Wrap`, Image: `/project/eco-wrap.png`.
   - **E.Fly (Flight Booking App)**: "A flight booking web app enabling users to search, select, and book flights." Stack: JavaScript, HTML, Bootstrap. Live: `https://apni-flight.netlify.app/`, GitHub: `https://github.com/hussnain-143/flight-booking`, Image: `/project/E.fly.png`.
   - *Additional asset found in public*: `public/project/CloudCPanel.png`.

3. **Real Work Experience**:
   - **Full-Stack Developer** at *Poxito* (Aug 2025 – Present): Next.js, React, Node.js, Tailwind CSS, WordPress.
   - **WordPress Developer** at *LDNinjas* (Jun 2025 – Aug 2025): Custom plugins, enhanced features, admin dashboards.
   - **Frontend Developer Intern** at *Stech.ai* (Aug 2022 – Sep 2022): Responsive websites, HTML/CSS, JS, WordPress, Elementor.

4. **Real Education**:
   - **BS in Computer Science**, Abbottabad University (2020 – 2024), Software engineering, algorithms, data structures.
   - **Intermediate in Pre-Medical Science**, Post Graduate College No. 1, Abbottabad (2018 – 2020).

5. **Real Certifications**:
   - **Hackathon Winner 2024**, Tech Innovation Summit (`public/certificates/hakathon.jpg`).
   - **Achievement Award 2023**, Best Performance (`public/certificates/Achievement.png`).
   - **Participation Certificate 2023**, WordCamp Lahore Participation (`public/certificates/PARTICIPATION.png`).

6. **SEO & Metadata**:
   - Extensive structured schema (`Person`, `WebSite`, `Organization`, `Service`, `BreadcrumbList`) in `StructuredData.jsx`.
   - OpenGraph and Twitter card metadata for each route.
   - Dynamic sitemap (`sitemap.js`) and `robots.txt`.

---

## 3. Genuinely Unused Files and Folders Identified

1. **`portfolio-v1/` Directory**:
   - Contains an abandoned empty folder hierarchy mirroring an old project structure with only `.DS_Store` files inside. No actual code or media assets.
   - Verified: 0 tracked files, 0 functional assets. Completely safe to remove.
2. **Empty Duplicate Route Directories in `src/app/`**:
   - `src/app/about/` (empty)
   - `src/app/contact/` (empty)
   - `src/app/projects/` (empty)
   - `src/app/skills/` (empty)
   - These are empty leftovers because the real routes live under `src/app/(Main)/`.
3. **`public/projects/` Directory**:
   - Empty directory (actual images are in `public/project/`).
4. **Duplicate Icon Assets**:
   - `src/app/favicona.ico` (duplicate/typo icon file alongside `src/app/favicon.ico`).
5. **Unused / Duplicate Components**:
   - `src/components/CustomCursor.jsx`: Rendered nowhere in the active application tree (commented out or disconnected).
   - `src/components/AnimatedStars.jsx`: The layout directly renders its own inline generated stars in `src/app/(Main)/layout.jsx`, leaving this standalone component unimported and unused.
   - `src/components/Sections/Skills/SkillCard.jsx`: Replaced by inline card rendering in `src/components/Sections/Skills/Skills.jsx`.

---

## 4. Duplicate or Obsolete Implementations

- **Skills Representation**:
  - `src/components/Sections/Home/Skill.jsx` and `src/components/Sections/Skills/Skills.jsx` duplicate the skill data array with slight visual differences.
  - Both will be centralized into MongoDB `Skill` collection and unified dynamic components.
- **Home Contact vs Main Contact**:
  - `src/components/Sections/Home/Contact.jsx` is a mini CTA section; `src/components/Sections/Contact/Contact.jsx` is the full form using Formspree.

---

## 5. Dependency Audit & Cleanup Opportunities

- **`@formspree/react`**: Currently used for the contact form submitting to hardcoded form ID `mzzglvaz`. Since we are building full MongoDB message persistence, server-side validation, rate limiting, and free-tier email notifications, `@formspree/react` will no longer be required on the client.
- **`radix-ui`**: High-level package installed (`^1.4.3`); specific primitives or cleaner lucide-react icons can be used.
- **Dependencies to add for Production Stack**:
  - `mongoose` for MongoDB Atlas integration.
  - `zod` for server-side schema validation (admin actions, project inputs, contact inquiries).
  - `bcryptjs` for secure administrator password hashing.
  - `jose` or signed server-side session cookies (stateless, tamper-proof, secure HTTP-only cookies compatible with Next.js edge/serverless runtime).
  - TypeScript tooling: `typescript`, `@types/react`, `@types/node`, `@types/bcryptjs`.

---

## 6. Security Issues Identified

1. **Client-Side Formspree Endpoint**:
   - The contact form directly hit client-side third-party Formspree without server-side validation, rate limiting, or persistent MongoDB storage under owner control.
2. **Absence of Admin Authentication & Authorization**:
   - The current repository is entirely static; no admin panel or database security exists yet.
3. **No Content Security Policy (CSP) or Security Headers**:
   - `next.config.mjs` lacks basic security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`).
4. **No Rate Limiting on Mutation Endpoints**:
   - Contact submissions currently have no IP-based rate limiting or spam honeypot.

---

## 7. Build and Runtime Issues

1. **ESLint 9 Circular Structure Crash**:
   - Baseline check: `npm run lint` and `npx eslint .` threw `TypeError: Converting circular structure to JSON` in `eslint-config-next` / `@eslint/eslintrc` under ESLint 9.
   - Fix: Configure flat config properly for ESLint 9 or align compatible eslint configuration.
2. **Next.js 16 SWC Native Binary vs WASM**:
   - On darwin-x64, Next.js 16 reported `@next/swc-darwin-x64` missing in the existing node_modules, falling back to wasm bindings which prevented Turbopack compilation. Running with webpack (`--webpack`) or ensuring correct swc bindings resolves this cleanly.
3. **Missing TypeScript Configuration**:
   - Currently JavaScript (`jsconfig.json`). Converting to TypeScript with `tsconfig.json` and strict type checks ensures production reliability.

---

## 8. Recommended Architecture & Implementation Plan

1. **Clean up verified dead directories & files** (`portfolio-v1`, empty stubs, unused components).
2. **Transition to TypeScript** (`tsconfig.json`, strict mode, model types).
3. **MongoDB Atlas & Mongoose Architecture**:
   - Singleton cached database connection utility (`src/lib/db.ts`).
   - Mongoose Models: `AdminUser`, `Profile`, `Project`, `Skill`, `Experience`, `Education`, `SiteSettings`, `ContactMessage`.
   - Comprehensive seed script with all 100% verified portfolio data.
4. **Design System & Public Frontend**:
   - Inspired by the minimalist, refined developer aesthetic of `eishaanwar.me`:
     - Clean typography (Inter + Outfit / Geist), sleek dark mode with subtle border glows, refined floating pill navigation.
     - Interactive hero with availability badge, fast CTAs, and verified stats.
     - Individual project case-study dynamic route (`/projects/[slug]`).
     - Real MongoDB-backed project cards, experience timeline, education, skills, and contact form with spam protection & rate limiting.
5. **Secure Admin CMS (`/admin`)**:
   - Secure login (`/admin/login`) with bcrypt, HTTP-only signed session cookies, brute-force rate limiting.
   - Protected layout checking server-side session for all routes and API handlers.
   - Comprehensive management dashboards:
     - Dashboard Overview (real project, draft, message counts)
     - Projects Manager (CRUD, slug generator, cover image, tags, demo & github links, publish/unpublish, featured toggle, reordering)
     - Profile Manager (bio, availability, headline, resume link, contact details)
     - Experience & Education Managers
     - Skills Manager
     - Contact Inquiries Inbox (unread/read, archive, delete, response mailto)
     - Site Settings Manager (SEO metadata, global switches)
6. **Testing**:
   - Automated test suite covering models, validation schemas, auth helpers, slug generation, rate limiting, and API handlers.
7. **Deployment & Documentation**:
   - `.env.example`, `docs/security-review.md`, `docs/cleanup-report.md`, `docs/implementation-plan.md`, `docs/deployment.md`, and updated `README.md`.

---

## 9. Risks and Rollback Strategy

- **Git Checkpoint**: We will verify changes against the `v2/fix` baseline.
- **Data Safety**: Database operations check for existence before overwriting. Seeding script is idempotent.
- **Rollback**: Clean git commits allow instant checkout of previous states if needed.
