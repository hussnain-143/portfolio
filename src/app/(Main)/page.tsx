import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getProfileData,
  getPublishedProjects,
  getSkillsData,
  getExperienceData,
  getEducationData,
} from '@/lib/data';
import {
  ArrowRight,
  MapPin,
  Clock as ClockIcon,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Users,
  Terminal,
} from 'lucide-react';

import { constructMetadata, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import HeroLiveClock from '@/components/HeroLiveClock';
import GlowingLaptop from '@/components/GlowingLaptop';
import TechIcon from '@/components/TechIcon';

export const metadata = constructMetadata({
  title: 'Hussnain Ahmed — Full-Stack Developer & Next.js Specialist',
  description:
    'Portfolio of Hussnain Ahmed: Full-Stack Developer crafting fast, scalable, and user-centric web applications with React, Next.js, Node.js, and WordPress.',
  path: '/',
});

export default async function HomePage() {
  const [profile, projects, skills, experiences, education] = await Promise.all([
    getProfileData(),
    getPublishedProjects(),
    getSkillsData(),
    getExperienceData(),
    getEducationData(),
  ]);

  // Featured projects from database or curated list
  const featuredProjects = projects.slice(0, 3);

  // Dynamic profile fields
  const fullName = profile.name || 'Hussnain Ahmed';
  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || 'Hussnain';
  const lastName = nameParts.slice(1).join(' ');

  const headline = profile.headline || profile.title || 'Full-Stack Developer';
  const bio =
    profile.shortBio ||
    'I build modern, scalable, and user-focused web applications using Next.js, TypeScript, and Node.js. I love turning ideas into real products with clean code and great design.';
  const avatarSrc = profile.avatarUrl || '/profile/image.jpg';
  const locationText = profile.location || 'Islamabad, Pakistan';
  const annotationText = profile.availabilityNote || 'Always building';

  // Hero stack badges (top 5 skills from database, with fallback)
  const heroSkills =
    skills && skills.length > 0
      ? skills.slice(0, 5)
      : [
          { name: 'Next.js' },
          { name: 'TypeScript' },
          { name: 'React' },
          { name: 'Node.js' },
          { name: 'MongoDB' },
        ];

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    url: SITE_URL,
    image: `${SITE_URL}${avatarSrc}`,
    jobTitle: profile.title || headline,
    description: bio,
    sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
    knowsAbout: skills.map((s: any) => s.name),
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${fullName} Portfolio`,
    url: SITE_URL,
    description: bio,
    author: {
      '@type': 'Person',
      name: fullName,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">
      <JsonLd data={personJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* =========================================================================
          1. HERO SECTION — Asymmetric Editorial Layout (Completely Editable via Admin)
          ========================================================================= */}
      <section className="pt-6 md:pt-14 relative">
        {/* Far Right Vertical Indicators */}
        <div className="hidden xl:flex flex-col items-center gap-6 absolute -right-6 top-1/2 -translate-y-1/2 text-[11px] font-mono-code text-[#737B82]">
          <span className="text-[#FFD43B] font-bold">01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Editorial Typography & Bio) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline & Availability Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 text-xs font-mono-code tracking-wider">
              <div className="inline-flex items-center gap-2 text-[#A7ADB2]">
                <span className="text-[#FFB020] font-bold">—</span>
                <span>Hello, I'm</span>
              </div>
              {profile.availabilityStatus && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#171A1C] border border-[#2B3033] text-[11px] text-[#A7ADB2]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      profile.availabilityStatus === 'available'
                        ? 'bg-emerald-400 animate-pulse'
                        : profile.availabilityStatus === 'busy'
                        ? 'bg-amber-400'
                        : 'bg-blue-400'
                    }`}
                  />
                  <span className="capitalize">
                    {profile.availabilityStatus === 'available'
                      ? 'Available for work'
                      : profile.availabilityStatus}
                  </span>
                </div>
              )}
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7F7F2] font-['Outfit']">
                {firstName}{' '}
                {lastName ? <span className="text-[#FFD43B]">{lastName}</span> : null}
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight pt-1">
                {headline}
              </h2>
            </div>

            {/* Bio Description */}
            <p className="text-[#A7ADB2] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              {bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs tracking-wide shadow-lg shadow-[#FFB020]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/60 text-[#F7F7F2] font-semibold text-xs transition-all hover:bg-[#202326] cursor-pointer"
              >
                <span>Get In Touch</span>
              </Link>
            </div>

            {/* Compact Tech Stack Badges Row (Dynamic from Admin Skills) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-[#2B3033]/60">
              {heroSkills.map((s: any) => (
                <div
                  key={s._id || s.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171A1C] border border-[#2B3033] text-xs text-[#F7F7F2]"
                >
                  <TechIcon name={s.name} className="w-4 h-4 shrink-0" size={16} />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Portrait in Amber Arch + Script Note + Info Badges) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Script Annotation Note */}
            <div className="absolute -top-6 left-6 md:left-12 z-20 text-[#FFD43B] font-['Outfit'] italic font-medium text-sm flex items-center gap-1 drop-shadow-md">
              <span>{annotationText}</span>
              <span className="text-base">↗</span>
            </div>

            {/* Glowing Amber Arch Container */}
            <div className="relative w-64 sm:w-72 md:w-80 h-84 sm:h-96 md:h-[420px] rounded-t-[140px] rounded-b-3xl overflow-hidden bg-gradient-to-b from-[#FFD43B] via-[#FFB020] to-[#FF8A24] p-[3px] shadow-2xl shadow-[#FFB020]/25">
              <div className="w-full h-full rounded-t-[137px] rounded-b-[21px] overflow-hidden bg-[#111416] relative flex items-end justify-center">
                {/* Internal Arch Warm Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E] via-transparent to-[#FFB020]/40 z-10" />

                {/* Profile Portrait (Dynamic from Admin Profile) */}
                <Image
                  src={avatarSrc}
                  alt={`${fullName} - ${headline}`}
                  width={360}
                  height={460}
                  priority
                  className="w-full h-full object-cover object-top relative z-0 scale-105"
                />
              </div>
            </div>

            {/* Floating Info Cards (Stacked Right/Bottom) */}
            <div className="w-full max-w-xs flex flex-col gap-2.5 mt-6 sm:mt-0 sm:absolute sm:-right-6 sm:bottom-6 z-20">
              {/* Card 1: Location (Dynamic from Admin Profile) */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#171A1C]/90 backdrop-blur-xl border border-[#2B3033] shadow-xl shadow-black/50">
                <div className="w-8 h-8 rounded-full bg-[#FFB020]/15 text-[#FFB020] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#737B82] uppercase tracking-wider font-mono-code">Based in</div>
                  <div className="text-xs font-bold text-[#F7F7F2]">{locationText}</div>
                </div>
              </div>

              {/* Card 2: Local Time */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#171A1C]/90 backdrop-blur-xl border border-[#2B3033] shadow-xl shadow-black/50">
                <div className="w-8 h-8 rounded-full bg-[#FFB020]/15 text-[#FFB020] flex items-center justify-center shrink-0">
                  <ClockIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#737B82] uppercase tracking-wider font-mono-code">Local Time</div>
                  <div className="text-xs font-bold text-[#FFD43B] font-mono-code">
                    <HeroLiveClock />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FEATURED PROJECTS — Asymmetric 3-Card Showcase (Matching Reference)
          ========================================================================= */}
      <section className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#FFB020] uppercase tracking-wider">
              <span>→</span>
              <span>MY WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F7F7F2] font-['Outfit']">
              Featured <span className="text-[#FFD43B]">Projects</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A7ADB2] max-w-md">
              Here are some of my recent projects. Each one represents a problem I solved
              and a skill I improved.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/60 text-xs font-semibold text-[#F7F7F2] hover:text-[#FFD43B] transition-all self-start md:self-auto cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project: any) => (
            <div
              key={project._id || project.slug}
              className="group rounded-2xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#FFB020]/10"
            >
              <div>
                {/* Screenshot Frame */}
                <div className="aspect-[16/10] bg-[#111416] border-b border-[#2B3033] overflow-hidden relative">
                  <Image
                    src={project.coverImage || project.image || '/project/rosy-garden.png'}
                    alt={project.title}
                    width={480}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A1C] via-transparent to-transparent opacity-40" />
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-[#F7F7F2] font-['Outfit'] group-hover:text-[#FFD43B] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#A7ADB2] line-clamp-2 leading-relaxed">
                    {project.shortDescription || project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(project.tags || project.technologies || []).slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-[#202326] text-[11px] font-mono-code text-[#A7ADB2] border border-[#2B3033]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Project Footer Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFB020] hover:text-[#FFD43B] transition-colors"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. ABOUT SECTION — Split Layout with Features & Glowing Laptop (Reference)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: Editorial Pitch */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#FFB020] uppercase tracking-wider">
              <span>→</span>
              <span>ABOUT ME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F7F7F2] font-['Outfit'] leading-tight">
              Turning Ideas Into <br />
              <span className="text-[#FFD43B]">Digital Experiences</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#A7ADB2] leading-relaxed">
              I'm a passionate full-stack developer with a strong focus on building fast,
              accessible, and scalable web applications. I enjoy learning new technologies,
              solving real-world problems, and creating products that make a difference.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/60 text-xs font-semibold text-[#F7F7F2] hover:text-[#FFD43B] transition-all cursor-pointer"
            >
              <span>More About Me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Middle Column: 3 Feature Cards Stacked */}
          <div className="lg:col-span-4 space-y-3.5">
            {/* Feature 1: Problem Solver */}
            <div className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033] flex items-start gap-4 hover:border-[#FFB020]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFB020]/10 text-[#FFD43B] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#F7F7F2] font-['Outfit']">Problem Solver</h4>
                <p className="text-xs text-[#A7ADB2] leading-relaxed">
                  I enjoy breaking down complex problems into simple, effective solutions.
                </p>
              </div>
            </div>

            {/* Feature 2: Continuous Learner */}
            <div className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033] flex items-start gap-4 hover:border-[#FFB020]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFB020]/10 text-[#FFD43B] flex items-center justify-center shrink-0">
                <ClockIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#F7F7F2] font-['Outfit']">Continuous Learner</h4>
                <p className="text-xs text-[#A7ADB2] leading-relaxed">
                  Always exploring new technologies and improving my skills.
                </p>
              </div>
            </div>

            {/* Feature 3: Team Player */}
            <div className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033] flex items-start gap-4 hover:border-[#FFB020]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FFB020]/10 text-[#FFD43B] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#F7F7F2] font-['Outfit']">Team Player</h4>
                <p className="text-xs text-[#A7ADB2] leading-relaxed">
                  I believe in collaboration, clear communication, and shared success.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Glowing 3D Developer Laptop Graphic */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <GlowingLaptop />
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. TECH STACK, EXPERIENCE & EDUCATION — 3-Column Structured Layout
          ========================================================================= */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Tech Stack & Tools (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#FFB020] uppercase tracking-wider">
                <span>→</span>
                <span>SKILLS & EXPERIENCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F7F2] font-['Outfit']">
                Tech Stack & <span className="text-[#FFD43B]">Tools</span>
              </h2>
            </div>

            {/* Tech Badges Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {(skills && skills.length > 0
                ? skills.slice(0, 12).map((s: any) => s.name)
                : [
                    'Next.js',
                    'TypeScript',
                    'React',
                    'Node.js',
                    'MongoDB',
                    'Tailwind CSS',
                    'Git',
                    'Docker',
                    'PostgreSQL',
                    'AWS',
                    'WordPress',
                    'Figma',
                  ]
              ).map((name: string) => (
                <div
                  key={name}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#171A1C] border border-[#2B3033] text-xs text-[#F7F7F2] hover:border-[#FFB020]/40 transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <TechIcon name={name} size={16} colored={true} />
                  </div>
                  <span className="truncate group-hover:text-[#FFD43B] transition-colors">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Experience Card (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#171A1C] border border-[#2B3033] space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-[#2B3033]">
              <div className="w-8 h-8 rounded-lg bg-[#FFB020]/15 text-[#FFB020] flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-[#F7F7F2] font-['Outfit']">Experience</h3>
            </div>

            <div className="space-y-5">
              {experiences && experiences.length > 0 ? (
                experiences.slice(0, 3).map((exp: any) => (
                  <div key={exp._id || exp.role || exp.title} className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#F7F7F2]">{exp.role || exp.position || exp.title}</h4>
                      <div className="text-[11px] text-[#A7ADB2]">{exp.company}</div>
                    </div>
                    <span className="text-[11px] font-mono-code text-[#737B82] shrink-0">{exp.period || exp.duration}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#F7F7F2]">Full-Stack Developer</h4>
                      <div className="text-[11px] text-[#A7ADB2]">Freelance / Remote</div>
                    </div>
                    <span className="text-[11px] font-mono-code text-[#737B82]">2022 – Present</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#F7F7F2]">Frontend Developer</h4>
                      <div className="text-[11px] text-[#A7ADB2]">Local Projects & Client Work</div>
                    </div>
                    <span className="text-[11px] font-mono-code text-[#737B82]">2021 – 2022</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Column 3: Education Card (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#171A1C] border border-[#2B3033] space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-[#2B3033]">
              <div className="w-8 h-8 rounded-lg bg-[#FFB020]/15 text-[#FFB020] flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-[#F7F7F2] font-['Outfit']">Education</h3>
            </div>

            <div className="space-y-5">
              {education && education.length > 0 ? (
                education.slice(0, 3).map((edu: any) => (
                  <div key={edu._id || edu.degree} className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-[#F7F7F2]">{edu.degree}</h4>
                      <span className="text-[11px] font-mono-code text-[#737B82] shrink-0">{edu.period || edu.year}</span>
                    </div>
                    <div className="text-[11px] text-[#A7ADB2]">{edu.institution || edu.school || edu.issuer}</div>
                  </div>
                ))
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-[#F7F7F2]">BS Computer Science</h4>
                      <span className="text-[11px] font-mono-code text-[#737B82]">2020 – 2024</span>
                    </div>
                    <div className="text-[11px] text-[#A7ADB2]">Abbottabad University</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CONTACT CALL-TO-ACTION BANNER
          ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#171A1C] via-[#202326] to-[#171A1C] border border-[#2B3033] relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#FFB020] uppercase tracking-wider">
            <span>●</span>
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F7F2] font-['Outfit']">
            Have a project in mind? Let's build something remarkable.
          </h2>
          <p className="text-xs sm:text-sm text-[#A7ADB2]">
            I am currently open for full-time opportunities, freelance engineering, and technical consultations.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs tracking-wide shadow-xl shadow-[#FFB020]/20 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <span>Send a Message</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </section>
    </div>
  );
}
