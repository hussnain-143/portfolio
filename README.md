# ⚡ Hussnain Ahmed — Premium Developer Portfolio & Secure Admin CMS

A production-grade, full-stack developer portfolio and administrative content management system (CMS) built for **Hussnain Ahmed** (Full-Stack / Front-End Developer). Engineered with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB Atlas** with zero operational cost ($0/month free tier).

---

## 🌟 Key Highlights

- **Aesthetic Excellence**: Inspired by modern minimalist developer portfolios (floating pill navigation, glassmorphism, dynamic glowing borders, Asia/Karachi live timezone clock, responsive mobile drawer).
- **Zero-Downtime Resilience**: Seamless dual-mode data layer: reads directly from **MongoDB Atlas**, falling back gracefully to verified static data if the database is temporarily unreachable.
- **Dynamic Case Studies**: Filterable project catalog with dedicated deep-dive case study pages (`/projects/[slug]`) featuring problem statements, technical architecture, and key highlights.
- **Secure Admin CMS (`/admin`)**:
  - Full CRUD management for Projects, Profile, Skills, Work Experience, Education, Certificates, and Global Settings.
  - Interactive Inquiries Inbox to read, archive, delete, or reply directly to contact messages.
  - Analytics Overview with key metric counters and quick actions.
- **Enterprise-Grade Security**:
  - Bcrypt password hashing (12 salt rounds).
  - Cryptographically signed JWT session tokens stored in secure, HTTP-only cookies (`ha_admin_session`).
  - Sliding-window IP rate limiting (Login: 5 attempts/15 min; Contact: 5 submissions/hour).
  - Honeypot bot protection on contact forms.
  - Production Content Security Policy (CSP), HSTS, and frame protection headers.
  - Strict Zod validation on every API endpoint and form submission.
- **Automated Testing**: 17 unit and integration tests passing out of the box using Node's native test runner (`npm test`).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode enabled) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism & Micro-animations |
| **Icons & UI** | [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) (M0 Free Tier) via [Mongoose](https://mongoosejs.com/) |
| **Authentication** | [JOSE](https://github.com/panva/jose) (JWT) & [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Validation** | [Zod](https://zod.dev/) |
| **Testing** | Node.js Test Runner + [tsx](https://github.com/privatenumber/tsx) |
| **Hosting Target** | [Vercel](https://vercel.com/) (Hobby Free Tier) |

---

## 📁 Project Architecture

```bash
portfolio/
├── docs/                      # Architectural audits, security reviews, deployment guides
│   ├── cleanup-report.md      # Record of safe deletions and verified assets
│   ├── deployment.md          # Step-by-step Vercel + MongoDB Atlas guide
│   ├── implementation-plan.md # Master engineering roadmap
│   ├── project-audit.md       # Pre-transformation baseline audit
│   └── security-review.md     # OWASP threat model & security controls
├── public/                    # Static assets (verified project screenshots, CV, certificates)
│   ├── certificates/          # Official certificate images
│   ├── cv/                    # Hussnain Ahmed CV PDF
│   └── project/               # Real project preview screenshots
├── src/
│   ├── app/
│   │   ├── (Main)/            # Public portfolio routes
│   │   │   ├── page.tsx       # Homepage (Hero, Stats, Featured Projects, Experience, CTA)
│   │   │   ├── about/         # Biography & verified certificates
│   │   │   ├── contact/       # Contact form submitting to MongoDB with honeypot & rate limits
│   │   │   ├── experience/    # Dedicated career timeline
│   │   │   ├── projects/      # Filterable project catalog
│   │   │   │   └── [slug]/    # Dynamic project case study details
│   │   │   └── skills/        # Categorized technical competencies
│   │   ├── admin/             # Authenticated Admin CMS
│   │   │   ├── login/         # Admin login screen with rate limit feedback
│   │   │   ├── page.tsx       # Dashboard overview & analytics
│   │   │   ├── projects/      # Project CRUD & slug generator
│   │   │   ├── profile/       # Bio, contact info & availability status
│   │   │   ├── skills/        # Skill & proficiency manager
│   │   │   ├── experience/    # Career history manager
│   │   │   ├── education/     # Degree & certification manager
│   │   │   ├── messages/      # Inquiries inbox with status filters
│   │   │   └── settings/      # Global SEO, site titles & toggles
│   │   ├── api/
│   │   │   ├── admin/         # Protected CRUD API endpoints
│   │   │   ├── auth/          # Login, logout, and session check
│   │   │   └── contact/       # Public contact submission endpoint
│   │   ├── layout.tsx         # Root layout with SEO metadata & Inter font
│   │   ├── not-found.tsx      # Custom 404 page
│   │   └── sitemap.ts         # Dynamic search engine sitemap
│   ├── components/            # Reusable UI components
│   │   ├── admin/             # Admin sidebar and layout navigation
│   │   ├── Clock.tsx          # Real-time Asia/Karachi digital clock
│   │   ├── ContactForm.tsx    # Interactive contact form
│   │   ├── Footer.tsx         # Minimalist footer with social links
│   │   ├── Navbar.tsx         # Floating pill navbar with mobile drawer
│   │   └── ProjectsCatalog.tsx# Interactive project filter and search
│   ├── lib/
│   │   ├── auth.ts            # Bcrypt, JWT session cookies, and route guards
│   │   ├── data.ts            # Data access layer with MongoDB Atlas + static fallbacks
│   │   ├── db.ts              # Cached Mongoose connection pooling
│   │   ├── rate-limit.ts      # In-memory sliding window IP rate limiter
│   │   └── validations/       # Typed Zod schemas for all models & forms
│   ├── models/                # Mongoose database models
│   └── scripts/               # CLI database seed and admin provisioning tools
└── tests/                     # Automated unit and integration test suite
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/hussnain-143/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment Variables
Copy the template and populate your MongoDB connection string:
```bash
cp .env.example .env.local
```

Example `.env.local`:
```env
MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority"
ADMIN_JWT_SECRET="generate_a_random_32_character_string_here"
ADMIN_EMAIL="admin@hussnain.dev"
ADMIN_PASSWORD="YourStrongAdminPassword123!"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Seed Database & Bootstrap Admin
Seed all verified user data (projects, skills, career history, education, certificates):
```bash
npm run db:seed
```

Or provision/reset an administrator account interactively:
```bash
npm run admin:create
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public portfolio or [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin CMS.

---

## 🧪 Testing & Code Quality

Run the complete test suite:
```bash
npm test
```

Perform strict TypeScript type-checking:
```bash
npm run type-check
```

Run ESLint:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

---

## 🌐 Deployment to Vercel (Free Tier)

See the detailed step-by-step guide in [docs/deployment.md](docs/deployment.md).

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables (`MONGODB_URI`, `ADMIN_JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`).
4. Click **Deploy**. Vercel will automatically build and deploy the application worldwide.

---

## 🔒 Security & Best Practices

- Review the comprehensive threat model in [docs/security-review.md](docs/security-review.md).
- Admin routes (`/admin/*`) and API endpoints (`/api/admin/*`) are completely blocked from search crawlers via `public/robots.txt`.
- All database mutations require authenticated JWT session tokens stored in HTTP-only, SameSite cookies.
- Contact submissions and login attempts are strictly rate-limited per IP address.

---

## 👤 Author

**Hussnain Ahmed**  
- **Title**: Full-Stack Developer / Front-End Developer  
- **LinkedIn**: [linkedin.com/in/hussnain-ahmed143](https://linkedin.com/in/hussnain-ahmed143/)  
- **GitHub**: [github.com/hussnain-143](https://github.com/hussnain-143/)  
- **Email**: [husnainahmed143@gmail.com](mailto:husnainahmed143@gmail.com)  

---

## 📄 License

This project is licensed under the MIT License.
