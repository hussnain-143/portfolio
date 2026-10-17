import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProfileData, getEducationData, getExperienceData } from '@/lib/data';
import { Download, Mail, GraduationCap, Award, Briefcase } from 'lucide-react';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = constructMetadata({
  title: 'About Me — Hussnain Ahmed | Full-Stack Developer Background',
  description:
    'Learn about Hussnain Ahmed, a dedicated MERN & Full-Stack developer with education in Information Technology, verified hackathon awards, and production web engineering experience.',
  path: '/about',
});

export default async function AboutPage() {
  const [profile, education, experiences] = await Promise.all([
    getProfileData(),
    getEducationData(),
    getExperienceData(),
  ]);

  const academic = education.filter((e: any) => !e.isCertificate);
  const certificates = education.filter((e: any) => e.isCertificate);

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.name || 'Hussnain Ahmed',
      jobTitle: profile.title || 'Full-Stack Developer',
      description: profile.shortBio,
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}${profile.avatarUrl || '/profile/image.jpg'}`,
      sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
      <JsonLd data={profilePageJsonLd} />

      {/* 1. Header & Bio */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
            About Me
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1">
            Background, Philosophy &amp; Journey
          </h1>
        </div>

        <div className="rounded-3xl bg-[#171A1C] border border-[#2B3033] p-6 sm:p-8 space-y-4 text-sm text-[#A7ADB2] leading-relaxed">
          {profile.fullBio && profile.fullBio.length > 0 ? (
            profile.fullBio.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))
          ) : (
            <p>{profile.shortBio}</p>
          )}

          <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[#2B3033]">
            <a
              href={profile.resumeUrl || '/cv/HUSSNAIN-AHMED-CV.pdf'}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs shadow-md shadow-[#FFB020]/20 hover:scale-105 transition-all"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download Official CV</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202326] hover:bg-[#2B3033] text-[#F7F7F2] text-xs font-semibold border border-[#2B3033] hover:border-[#FFB020]/50 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFB020]" />
              <span>Contact Directly</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Work Experience */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
            Professional History
          </span>
          <h2 className="text-2xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#FFB020]" />
            <span>Work Experience</span>
          </h2>
        </div>

        <div className="space-y-6 relative border-l border-[#2B3033] pl-6 sm:pl-8 ml-3">
          {experiences.map((exp: any, index: number) => (
            <div key={exp._id || index} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#FFD43B] border-4 border-[#0B0D0E] shadow-[0_0_10px_rgba(255,212,59,0.5)]" />

              <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-[#F7F7F2]">{exp.role}</h3>
                    <div className="text-xs text-[#FFB020] font-semibold">@ {exp.company}</div>
                  </div>
                  <span className="text-[11px] font-mono-code text-[#737B82] bg-[#202326] px-2.5 py-1 rounded-full w-fit border border-[#2B3033]">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs text-[#A7ADB2] leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(exp.skills || []).map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[#202326] text-[#A7ADB2] border border-[#2B3033] font-mono-code"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Academic Education */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
            Academics
          </span>
          <h2 className="text-2xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#FFD43B]" />
            <span>Formal Education</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academic.map((edu: any) => (
            <div
              key={edu._id}
              className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[#F7F7F2]">{edu.degree}</h3>
                  <span className="text-[10px] font-mono-code text-[#FFB020] bg-[#FFB020]/10 px-2 py-0.5 rounded border border-[#FFB020]/25 shrink-0">
                    {edu.period}
                  </span>
                </div>
                <div className="text-xs text-[#A7ADB2]">{edu.school}</div>
                <p className="text-xs text-[#737B82] leading-relaxed pt-1">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Certificates & Awards */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#FF8A24]">
            Honors &amp; Recognitions
          </span>
          <h2 className="text-2xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF8A24]" />
            <span>Certifications &amp; Awards</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {certificates.map((cert: any) => (
            <div
              key={cert._id}
              className="group rounded-2xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#FFB020]/10"
            >
              {cert.certificateImage && (
                <div className="h-36 bg-[#111416] overflow-hidden relative border-b border-[#2B3033]">
                  <Image
                    src={cert.certificateImage}
                    alt={cert.degree}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A1C] via-transparent to-transparent opacity-60" />
                </div>
              )}

              <div className="p-4 space-y-1.5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-xs text-[#F7F7F2] group-hover:text-[#FFD43B] transition-colors">
                    {cert.degree}
                  </h3>
                  <span className="text-[10px] font-mono-code text-[#FFB020] bg-[#FFB020]/10 px-1.5 py-0.5 rounded border border-[#FFB020]/25 shrink-0">
                    {cert.period}
                  </span>
                </div>
                <div className="text-[11px] text-[#A7ADB2]">{cert.school}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
