'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, Search } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  tags: string[];
  category: string;
  projectStatus: string;
  isFeatured: boolean;
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectsCatalog({ initialProjects }: { initialProjects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(initialProjects.map((p) => p.category)))];

  const filteredProjects = initialProjects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#171A1C] p-4 rounded-3xl border border-[#2B3033]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] shadow-md shadow-[#FFB020]/20'
                  : 'bg-[#202326] text-[#A7ADB2] hover:text-[#F7F7F2] hover:bg-[#2B3033]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#737B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-full bg-[#111416] border border-[#2B3033] text-xs text-[#F7F7F2] placeholder-[#737B82] focus:outline-none focus:border-[#FFB020]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#171A1C] border border-[#2B3033] text-[#737B82] text-xs">
          No projects match your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p._id || p.slug}
              className="group rounded-3xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#FFB020]/10 hover:-translate-y-1"
            >
              <div className="relative h-56 sm:h-64 bg-[#111416] overflow-hidden">
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171A1C] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono-code uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#F7F7F2] border border-[#2B3033]">
                    {p.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#F7F7F2] group-hover:text-[#FFD43B] transition-colors font-['Outfit']">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#A7ADB2] line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#202326] text-[#A7ADB2] border border-[#2B3033] font-mono-code"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#2B3033] text-xs">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-semibold text-[#FFB020] hover:text-[#FFD43B] flex items-center gap-1 transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#A7ADB2] hover:text-[#F7F7F2] transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#A7ADB2] hover:text-[#FFD43B] transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
