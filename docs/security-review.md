# Comprehensive Security Review & Threat Model

**Application**: Hussnain Ahmed Portfolio & Secure Admin CMS  
**Stack**: Next.js 16 (App Router), TypeScript, Mongoose, MongoDB Atlas Free Tier, Vercel  
**Author**: Security Engineering Review  
**Date**: October 2026  

---

## 1. Executive Summary

This application implements a defense-in-depth security posture designed to defend against modern web vulnerabilities (OWASP Top 10) while maintaining a $0/month operational budget. No public registration endpoints exist. Admin access is strictly protected through cryptographic password hashing, signed HTTP-only JWT session cookies, strict schema validation, IP-based sliding window rate limiting, and defensive Content Security Policy headers.

---

## 2. Authentication & Session Architecture

### 2.1 Password Security
- **Hashing Algorithm**: Bcrypt (`bcryptjs`) with 12 salt rounds.
- **Timing Attack Resistance**: Constant-time comparison ensures passwords cannot be discovered via subtle response latency discrepancies.
- **Complexity Enforcement**: Zod schema rejects passwords shorter than 8 characters on login and 12 characters during administrative provisioning.

### 2.2 Session Management
- **Token Mechanism**: Standard JSON Web Tokens signed with `jose` using HMAC-SHA256 (`HS256`).
- **Secret Key Protection**: Signed with `ADMIN_JWT_SECRET` (minimum 32-character requirement).
- **Storage**: Sessions are stored exclusively in HTTP-only cookies (`ha_admin_session`):
  - `httpOnly: true`: Completely inaccessible to client-side JavaScript, rendering XSS-based session hijacking ineffective.
  - `secure: true`: Enforced in production (`process.env.NODE_ENV === 'production'`) to mandate HTTPS transport.
  - `sameSite: 'lax'`: Mitigates Cross-Site Request Forgery (CSRF).
  - `path: '/'`: Restricts scope appropriately.
  - `maxAge: 7 * 24 * 3600`: 7-day expiration with explicit invalidation upon `/api/auth/logout`.

### 2.3 Route & Server Guard
- All administrative API mutations (`/api/admin/*`) invoke `requireAdmin()` on every incoming request.
- The cookie is verified using cryptographic HMAC signature checks before any database query or mutation executes.
- Protected page layouts (`src/app/admin/layout.tsx`) verify authentication on server render, redirecting unauthenticated sessions to `/admin/login`.

---

## 3. Input Validation & Injection Defenses

### 3.1 Strict Schema Enforcement (Zod)
- Every incoming payload (JSON request bodies, URL query parameters, contact forms, credentials) is stripped and validated through typed Zod schemas.
- Untrusted properties are stripped before data reaches database models.

### 3.2 NoSQL Injection Mitigation
- Mongoose schemas enforce strong type constraints (strings, arrays, booleans, dates) across all models.
- Parameterized Mongoose queries prevent operator injection (e.g. `{ $ne: null }`).
- Slugs are validated with strict regex (`/^[a-z0-9]+(?:-[a-z0-9]+)*$/`) before querying.

---

## 4. Rate Limiting & Denial of Service (DoS) Protections

### 4.1 Login Endpoint Throttling
- `/api/auth/login` is limited to **5 attempts per 15 minutes** per IP address.
- Exceeding the threshold returns HTTP `429 Too Many Requests` with a descriptive retry cooldown timer.
- Defends against automated credential stuffing and brute-force attacks.

### 4.2 Contact Form Throttling & Honeypot
- `/api/contact` is limited to **5 submissions per hour** per IP.
- Features a hidden honeypot trap (`honeypot` field hidden via CSS from real users).
- If an automated bot fills the honeypot field, the request is immediately rejected with HTTP `400 Bad Request`.

---

## 5. HTTP Security Headers

Configured in `next.config.mjs` across all routes:
- **`Content-Security-Policy`**: Restricts origins for scripts, styles, images, and fonts to self, trusted Google Fonts, and Cloudflare.
- **`Strict-Transport-Security`** (`HSTS`): `max-age=63072000; includeSubDomains; preload` enforces end-to-end HTTPS.
- **`X-Frame-Options`**: `DENY` prevents clickjacking attacks.
- **`X-Content-Type-Options`**: `nosniff` prevents MIME-type sniffing exploits.
- **`Referrer-Policy`**: `origin-when-cross-origin` preserves user privacy while allowing safe navigation.
- **`Permissions-Policy`**: Disables unused browser capabilities (`camera=()`, `microphone=()`, `geolocation=()`).

---

## 6. Crawler & Search Engine Boundaries

- `src/app/robots.ts`:
  - Dynamically disallows crawler indexing of `/admin/` and `/api/` while resolving canonical `sitemap.xml` and host headers.
  - Grants public access to portfolio showcases (`/`, `/about`, `/projects`, `/experience`, `/skills`, `/contact`).
- **Explicit `noindex, nofollow` Meta Directives**:
  - `src/app/admin/(dashboard)/layout.tsx` and `src/app/admin/login/layout.tsx` export strict `robots: { index: false, follow: false, nocache: true }` metadata.
  - Guarantees search engines never index admin authentication or management panels even if referenced externally.
- `src/app/sitemap.ts`:
  - Dynamically publishes only public portfolio routes and case studies with canonical URLs.

---

## 7. Residual Risks & Production Recommendations

1. **Rotate JWT Secret**: When deploying to production on Vercel, generate a cryptographically strong 64-character secret using `openssl rand -base64 48`.
2. **MongoDB Atlas IP Whitelist**: In production, configure MongoDB Atlas Network Access. For serverless hosting on Vercel, configure `0.0.0.0/0` with a dedicated, strong-password database user with read/write access restricted only to the `portfolio` database.
3. **Environment Isolation**: Never store live production secrets in `.env.local` or commit them to GitHub.
