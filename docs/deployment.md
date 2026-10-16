# Deployment & Production Setup Guide

This guide walks you through deploying the portfolio and admin CMS to Vercel with MongoDB Atlas on a 100% free tier ($0/month budget).

---

## Prerequisites
- GitHub account
- Vercel account (Hobby Free tier)
- MongoDB Atlas account (Free M0 Shared Cluster)
- Node.js 20+ installed locally

---

## Step 1: Set Up MongoDB Atlas Free Tier (M0)

1. **Sign in to MongoDB Atlas**: [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. **Create a Free Cluster**:
   - Choose **M0 Free** (512 MB storage, shared RAM, free forever).
   - Select the cloud provider and region closest to your Vercel deployment (e.g. AWS `us-east-1` or `eu-central-1`).
3. **Configure Database Access (User)**:
   - Go to **Database Access** under Security.
   - Click **Add New Database User**.
   - Authentication Method: **Password**.
   - Username: `portfolio_admin`
   - Password: Click **Autogenerate Secure Password** and copy it.
   - Built-in Role: **Read and write to any database** (or restrict to `portfolio`).
4. **Configure Network Access (IP Whitelist)**:
   - Go to **Network Access** under Security.
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`).
   - *(Note: Serverless platforms like Vercel have dynamic IP addresses, which require `0.0.0.0/0` with strong user authentication).*
5. **Get Connection String**:
   - Go to **Database** -> **Clusters** -> click **Connect**.
   - Choose **Drivers** -> Node.js.
   - Copy the connection string format:
     ```
     mongodb+srv://<db_username>:<db_password>@<cluster_name>.example.mongodb.net/portfolio?retryWrites=true&w=majority
     ```
   - Replace `<db_username>` and `<db_password>` with your database user credentials.

---

## Step 2: Seed Database & Create Admin Account

Before deploying or right after connecting, run the automated CLI utilities locally:

1. Create a local `.env.local` file with your credentials:
   ```bash
   cp .env.example .env.local
   ```
2. Update `.env.local` with your MongoDB URI:
   ```env
   MONGODB_URI="mongodb+srv://<db_username>:<db_password>@<cluster_name>.example.mongodb.net/portfolio?retryWrites=true&w=majority"
   ADMIN_JWT_SECRET="<generate_a_random_32_character_string_here>"
   ADMIN_EMAIL="<your_admin_email@example.com>"
   ADMIN_PASSWORD="<choose_a_strong_password_here>"
   NEXT_PUBLIC_SITE_URL="https://h-a-portfolio.netlify.app"
   ```
3. Run the database seed script:
   ```bash
   npm run db:seed
   ```
   *Output will confirm the insertion of Hussnain's verified profile, skills, experience, projects, education, site settings, and initial admin credentials.*

4. *(Optional)* Create or reset an administrator account via CLI:
   ```bash
   npm run admin:create
   ```

---

## Step 3: Deploy to Vercel

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete portfolio & admin CMS transformation"
   git push origin main
   ```
2. **Import Project to Vercel**:
   - Go to [vercel.com](https://vercel.com/) and click **Add New** -> **Project**.
   - Select your `portfolio` repository.
   - Framework Preset: **Next.js**.
   - Root Directory: `./`.
3. **Configure Environment Variables in Vercel**:
   In the **Environment Variables** section of the deployment screen, add:
   | Key | Value | Purpose |
   |---|---|---|
   | `MONGODB_URI` | `mongodb+srv://...` | MongoDB Atlas connection string |
   | `ADMIN_JWT_SECRET` | *(64-char string)* | Session token signing secret |
   | `ADMIN_EMAIL` | `admin@hussnain.dev` | Initial admin account email |
   | `ADMIN_PASSWORD` | *(Secure password)* | Initial admin account password |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Canonical site URL |
   | `FALLBACK_TO_STATIC_DATA` | `true` | Zero-downtime static fallback |

4. **Deploy**:
   - Click **Deploy**. Vercel will run `npm run build` and output the optimized production bundle.

---

## Step 4: Verification & Smoke Test

1. Visit your live deployment URL: `https://your-domain.vercel.app`
2. Test the public pages:
   - Homepage: Verify hero, statistics counter, featured projects, and fast responsiveness.
   - Projects: Test filtering by category, view individual project case study details (`/projects/[slug]`).
   - Experience: Verify the timeline of work history.
   - Skills: Check categorized proficiency pills.
   - About: Check biography and verified certificate awards.
   - Contact Form: Submit a test inquiry and verify success message.
3. Access Admin CMS:
   - Visit `/admin/login`.
   - Log in with your `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
   - Check the Overview Dashboard metrics.
   - Review the Messages Inbox to verify your test contact message arrived in MongoDB!
   - Test updating a project or profile field to verify instantaneous database persistence.
