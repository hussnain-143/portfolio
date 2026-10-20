import React from 'react';
import Link from 'next/link';
import { getOpenSourceData, getProfileData } from '@/lib/data';
import { constructMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import {
  GitPullRequest,
  Github,
  Star,
  GitFork,
  ExternalLink,
  ArrowRight,
  Code2,
  Terminal,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Open Source & Community Contributions — Hussnain Ahmed',
  description:
    'Explore open-source repositories, developer tools, packages, and full-stack software authored and maintained by Hussnain Ahmed.',
  path: '/opensource',
});

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  PHP: '#777BB4',
  Go: '#00ADD8',
  Rust: '#DEA584',
};

export default async function OpenSourcePage() {
  const [repos, profile] = await Promise.all([
    getOpenSourceData(),
    getProfileData(),
  ]);

  const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stars || 0), 0);
  const totalForks = repos.reduce((sum: number, r: any) => sum + (r.forks || 0), 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Open Source Contributions of Hussnain Ahmed',
    description:
      'Curated open source repositories, libraries, and tools engineered by Hussnain Ahmed.',
    hasPart: repos.map((r: any) => ({
      '@type': 'SoftwareSourceCode',
      name: r.title,
      codeRepository: r.githubUrl,
      programmingLanguage: r.language,
      author: {
        '@type': 'Person',
        name: profile.name || 'Hussnain Ahmed',
      },
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      <JsonLd data={jsonLd} />

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#FFB020] uppercase tracking-wider">
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>COMMUNITY &amp; CODE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F2] font-['Outfit']">
          Open Source <span className="text-[#FFD43B]">Showcase</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A7ADB2] max-w-2xl leading-relaxed">
          Open source is at the heart of modern software engineering. Here are public repositories,
          developer tooling, and architectures I have authored and contributed to.
        </p>

        {/* Global Metrics Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono-code">
          <div className="px-3.5 py-1.5 rounded-full bg-[#171A1C] border border-[#2B3033] text-[#F7F7F2] flex items-center gap-2">
            <span className="text-[#FFB020] font-bold">{repos.length}</span>
            <span className="text-[#A7ADB2]">Repositories</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-[#171A1C] border border-[#2B3033] text-[#F7F7F2] flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-[#FFB020] fill-[#FFB020]" />
            <span className="text-[#FFD43B] font-bold">{totalStars}</span>
            <span className="text-[#A7ADB2]">GitHub Stars</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-[#171A1C] border border-[#2B3033] text-[#F7F7F2] flex items-center gap-2">
            <GitFork className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-400 font-bold">{totalForks}</span>
            <span className="text-[#A7ADB2]">Forks</span>
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo: any) => {
          const langColor = LANGUAGE_COLORS[repo.language] || '#FFB020';

          return (
            <div
              key={repo._id || repo.slug}
              className="group rounded-2xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#FFB020]/10"
            >
              <div className="space-y-4">
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#202326] border border-[#2B3033] flex items-center justify-center text-[#F7F7F2] group-hover:text-[#FFD43B] transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[#A7ADB2] block truncate max-w-[170px]">
                        {repo.repoName}
                      </span>
                      <div className="inline-flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#202326] text-[#FFB020] border border-[#2B3033]">
                          {repo.role || 'Author'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#A7ADB2]">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#FFB020] fill-[#FFB020]/20" />
                      <span>{repo.stars || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-blue-400" />
                      <span>{repo.forks || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h2 className="font-bold text-base text-[#F7F7F2] font-['Outfit'] group-hover:text-[#FFD43B] transition-colors">
                    {repo.title}
                  </h2>
                  <p className="text-xs text-[#A7ADB2] leading-relaxed line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                {/* Highlights if provided */}
                {repo.highlights && repo.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-1 text-[11px] text-[#737B82]">
                    {repo.highlights.slice(0, 2).map((h: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#FFB020] leading-none mt-1">▸</span>
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Language & Tags */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F7F7F2]">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: langColor }}
                    />
                    <span className="text-[11px]">{repo.language || 'TypeScript'}</span>
                  </div>

                  {repo.tags && repo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {repo.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-[#202326] text-[10px] font-mono-code text-[#A7ADB2] border border-[#2B3033]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-5 mt-4 border-t border-[#2B3033] flex items-center justify-between text-xs">
                <a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#A7ADB2] hover:text-[#F7F7F2] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-[#737B82]" />
                </a>

                {repo.liveUrl && (
                  <a
                    href={repo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#FFB020] hover:text-[#FFD43B] font-semibold transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* GitHub Callout Footer Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#171A1C] via-[#202326] to-[#171A1C] border border-[#2B3033] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#FFB020] uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>CONTINUOUS CONTRIBUTIONS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F7F7F2] font-['Outfit']">
            Want to collaborate on an open source idea?
          </h3>
          <p className="text-xs sm:text-sm text-[#A7ADB2]">
            Explore all commits, open pull requests, and star activity directly on GitHub, or get in touch to start a new collaborative project.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.githubUrl || 'https://github.com/hussnain-143'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#202326] hover:bg-[#2B3033] text-xs font-semibold text-[#F7F7F2] border border-[#2B3033] transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#A7ADB2]" />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs tracking-wide shadow-xl shadow-[#FFB020]/20 hover:scale-105 transition-all"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
