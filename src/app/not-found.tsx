import React from 'react';
import Link from 'next/link';
import { Home, FolderGit2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-6 relative">
      <div className="max-w-md space-y-6">
        <div className="text-8xl sm:text-9xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24]">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F2] font-['Outfit']">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#A7ADB2] leading-relaxed">
            The page or project case study you requested could not be located. It might have been moved or unpublished.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs tracking-wide shadow-lg shadow-[#FFB020]/20 hover:scale-105 transition-all"
          >
            <Home className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#171A1C] hover:bg-[#202326] text-[#F7F7F2] border border-[#2B3033] hover:border-[#FFB020]/50 text-xs font-semibold transition-colors"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
