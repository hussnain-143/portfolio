import React from 'react';
import { getPublishedProjects } from '@/lib/data';
import ProjectsCatalog from '@/components/ProjectsCatalog';

import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Projects Catalog — Hussnain Ahmed | Web Development Case Studies',
  description:
    'Explore web applications, e-commerce systems, and full-stack platforms developed by Hussnain Ahmed using React, Next.js, Redux, Node.js, and WordPress.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
      <div>
        <span className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
          Work Showcase
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1">
          Featured Projects &amp; Applications
        </h1>
        <p className="text-sm text-[#A7ADB2] mt-2 max-w-xl">
          A curated collection of web applications, e-commerce solutions, and digital tools built for speed, aesthetics, and reliability.
        </p>
      </div>

      <ProjectsCatalog initialProjects={projects} />
    </div>
  );
}
