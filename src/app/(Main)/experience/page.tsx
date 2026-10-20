import React from 'react';
import Link from 'next/link';
import { getExperienceData, getProfileData } from '@/lib/data';
import { Download, MapPin } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import FormattedDescription from '@/components/FormattedDescription';

export const metadata = constructMetadata({
  title: 'Work Experience — Hussnain Ahmed | Full-Stack Career History',
  description:
    'Explore the career history, engineering achievements, and technical contributions of Hussnain Ahmed across full-stack web and front-end development.',
  path: '/experience',
});

export default async function ExperiencePage() {
  const [experiences, profile] = await Promise.all([
    getExperienceData(),
    getProfileData(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
            Career Milestones
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1">
            Work History &amp; Experience
          </h1>
          <p className="text-sm text-[#A7ADB2] mt-2 max-w-xl">
            A chronological timeline of production engineering roles, client projects, and software responsibilities.
          </p>
        </div>

        <a
          href={profile.resumeUrl || '/cv/HUSSNAIN-AHMED-CV.pdf'}
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171A1C] hover:bg-[#202326] text-[#F7F7F2] border border-[#2B3033] hover:border-[#FFB020]/50 text-xs font-semibold self-start sm:self-auto transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#FFB020]" />
          <span>Download CV</span>
        </a>
      </div>

      <div className="space-y-8 relative border-l border-[#2B3033] pl-6 sm:pl-8 ml-3">
        {experiences.map((exp: any, index: number) => (
          <div key={exp._id || index} className="relative group">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#FFD43B] border-4 border-[#0B0D0E] shadow-[0_0_12px_rgba(255,212,59,0.6)]" />

            <div className="rounded-3xl bg-[#171A1C] border border-[#2B3033] p-6 sm:p-8 space-y-4 hover:border-[#FFB020]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#F7F7F2] font-['Outfit']">{exp.role}</h2>
                  <div className="text-xs font-semibold text-[#FFB020] mt-0.5">
                    @ {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code text-[#FFD43B] bg-[#FFB020]/10 px-3 py-1 rounded-full border border-[#FFB020]/25">
                    {exp.period}
                  </span>
                  {exp.isCurrent && (
                    <span className="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Present
                    </span>
                  )}
                </div>
              </div>

              {exp.location && (
                <div className="flex items-center gap-1.5 text-xs text-[#737B82]">
                  <MapPin className="w-3.5 h-3.5 text-[#FFB020]" />
                  <span>{exp.location}</span>
                </div>
              )}

              <FormattedDescription
                text={exp.description}
                className="text-xs sm:text-sm text-[#A7ADB2] max-w-3xl"
              />

              {/* Skills */}
              <div className="pt-2">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-[#737B82] mb-2">
                  Technologies Applied
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#202326] text-[#F7F7F2] border border-[#2B3033] font-mono-code"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
