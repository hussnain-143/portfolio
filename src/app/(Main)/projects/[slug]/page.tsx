import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPublishedProjects } from '@/lib/data';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
} from 'lucide-react';
import { Metadata } from 'next';

import { constructMetadata, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p: any) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({
      title: 'Project Not Found | Hussnain Ahmed',
      description: 'The requested project case study could not be located.',
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${project.title} — Case Study | Hussnain Ahmed`,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
    type: 'article',
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.shortDescription,
    applicationCategory: project.category || 'WebApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/projects/${project.slug}`,
    image: `${SITE_URL}${project.coverImage}`,
    author: {
      '@type': 'Person',
      name: 'Hussnain Ahmed',
    },
    ...(project.liveUrl && { installUrl: project.liveUrl }),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      <JsonLd data={softwareJsonLd} />

      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs text-[#A7ADB2] hover:text-[#FFD43B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] font-mono-code uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFB020]/10 text-[#FFD43B] border border-[#FFB020]/25">
            {project.category}
          </span>
          <span className="text-[11px] font-mono-code px-3 py-1 rounded-full bg-[#202326] text-[#A7ADB2] border border-[#2B3033]">
            Status: {project.projectStatus}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight">
          {project.title}
        </h1>

        <p className="text-sm sm:text-base text-[#A7ADB2] leading-relaxed max-w-2xl">
          {project.shortDescription}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] hover:opacity-95 text-[#0B0D0E] font-bold text-xs shadow-md shadow-[#FFB020]/20 hover:scale-105 transition-all"
            >
              <span>View Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#171A1C] hover:bg-[#202326] text-[#F7F7F2] border border-[#2B3033] hover:border-[#FFB020]/50 text-xs font-semibold hover:scale-105 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-[#2B3033] shadow-2xl bg-[#111416]">
        <Image
          src={project.coverImage || '/project/rosy-garden.png'}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {/* Tech Stack Tags */}
      <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 space-y-3">
        <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
          Technologies &amp; Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          {(project.tags || []).map((tag: string, idx: number) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full bg-[#202326] text-[#F7F7F2] border border-[#2B3033] font-mono-code"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Case Study Detailed Breakdown */}
      <div className="space-y-8">
        {project.detailedDescription && (
          <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-bold text-[#F7F7F2] font-['Outfit']">Project Overview</h2>
            <p className="text-xs sm:text-sm text-[#A7ADB2] leading-relaxed whitespace-pre-line">
              {project.detailedDescription}
            </p>
          </div>
        )}

        {project.caseStudyContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.caseStudyContent.challenges && (
              <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 space-y-3">
                <h3 className="text-sm font-bold text-[#FFD43B] font-['Outfit']">
                  Key Challenges
                </h3>
                <p className="text-xs text-[#A7ADB2] leading-relaxed">
                  {project.caseStudyContent.challenges}
                </p>
              </div>
            )}

            {project.caseStudyContent.solutions && (
              <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 space-y-3">
                <h3 className="text-sm font-bold text-[#FF8A24] font-['Outfit']">
                  Engineering Solutions
                </h3>
                <p className="text-xs text-[#A7ADB2] leading-relaxed">
                  {project.caseStudyContent.solutions}
                </p>
              </div>
            )}
          </div>
        )}

        {project.caseStudyContent?.keyFeatures &&
          project.caseStudyContent.keyFeatures.length > 0 && (
            <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#F7F7F2] font-['Outfit']">Key Features Implemented</h2>
              <ul className="space-y-2.5">
                {project.caseStudyContent.keyFeatures.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#A7ADB2]">
                    <CheckCircle2 className="w-4 h-4 text-[#FFB020] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-[#171A1C] via-[#202326] to-[#171A1C] border border-[#2B3033] p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-[#F7F7F2] font-['Outfit']">
          Interested in a similar solution for your project?
        </h3>
        <p className="text-xs text-[#A7ADB2] max-w-md mx-auto">
          I'm open to discussing web application architectures, e-commerce stores, and custom feature developments.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs shadow-lg shadow-[#FFB020]/20 hover:scale-105 transition-all"
          >
            <span>Discuss Your Project</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
