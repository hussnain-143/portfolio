import React from 'react';
import { getSkillsData } from '@/lib/data';
import TechIcon from '@/components/TechIcon';
import {
  Laptop,
  Database,
  Layers,
  Wrench,
  Cpu,
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Technical Skills & Stack — Hussnain Ahmed | Full-Stack Technologies',
  description:
    'Comprehensive technical skills: React, Next.js, TypeScript, Node.js, PHP, MongoDB, Tailwind CSS, WordPress development, and DevOps tools.',
  path: '/skills',
});

export default async function SkillsPage() {
  const skills = await getSkillsData();
  const categories = Array.from(new Set(skills.map((s: any) => s.category)));

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return Laptop;
      case 'backend':
        return Database;
      case 'specializations':
        return Layers;
      case 'tools & workflow':
        return Wrench;
      default:
        return Cpu;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      {/* Header */}
      <div>
        <span className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
          Core Capabilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1">
          Technical Skills &amp; Stack
        </h1>
        <p className="text-sm text-[#A7ADB2] mt-2 max-w-2xl leading-relaxed">
          A structured breakdown of languages, frameworks, runtime environments, databases, and engineering workflows used across production client systems and full-stack applications.
        </p>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat: any) => {
          const catSkills = skills.filter((s: any) => s.category === cat);
          const Icon = getCategoryIcon(cat);

          return (
            <div
              key={cat}
              className="rounded-3xl bg-[#171A1C] border border-[#2B3033] p-6 sm:p-8 space-y-6 hover:border-[#FFB020]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-[#2B3033] pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFB020]/15 text-[#FFB020] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#F7F7F2] font-['Outfit']">{cat}</h2>
                    <span className="text-[11px] font-mono-code text-[#737B82]">
                      {catSkills.length} Verified Technologies
                    </span>
                  </div>
                </div>

                {/* Technology Icons & Marks Grid (No Proficiency Labels) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catSkills.map((s: any) => (
                    <div
                      key={s._id}
                      className="group p-3.5 rounded-2xl bg-[#202326] border border-[#2B3033] hover:border-[#FFB020]/50 hover:bg-[#25292D] transition-all flex items-center gap-3.5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#171A1C] border border-[#2B3033] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <TechIcon name={s.name} size={18} colored={true} />
                      </div>
                      <span className="text-xs font-semibold text-[#F7F7F2] tracking-wide group-hover:text-[#FFD43B] transition-colors line-clamp-1">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
