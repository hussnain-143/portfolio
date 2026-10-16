'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react';

interface FooterProps {
  brandName?: string;
  title?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
  footerText?: string;
}

export default function Footer({
  brandName = 'Hussnain Ahmed',
  title = 'Full-Stack Developer',
  githubUrl = 'https://github.com/hussnain-143',
  linkedinUrl = 'https://www.linkedin.com/in/hussnain-ahmed143/',
  twitterUrl = '',
  email = 'hussnain.ahmed.dev@gmail.com',
  footerText,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultFooterText = `© ${currentYear} ${brandName}. All rights reserved.`;

  return (
    <footer className="border-t border-[#2B3033] bg-[#0B0D0E] text-[#A7ADB2] py-10 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
            <Image
              src="/logo-symbol.svg"
              alt={`${brandName} Monogram`}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-[#F7F7F2] text-sm tracking-tight font-['Outfit']">
              {brandName}
            </span>
            <p className="text-[11px] text-[#737B82] font-mono-code -mt-0.5">
              {title}
            </p>
          </div>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 hover:text-[#FFD43B] text-[#A7ADB2] flex items-center justify-center transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 hover:text-[#FFD43B] text-[#A7ADB2] flex items-center justify-center transition-all hover:scale-105"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="w-9 h-9 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 hover:text-[#FFD43B] text-[#A7ADB2] flex items-center justify-center transition-all hover:scale-105"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label="Send Email"
              className="w-9 h-9 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 hover:text-[#FFD43B] text-[#A7ADB2] flex items-center justify-center transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs text-[#737B82]">
          <span>{footerText || defaultFooterText}</span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-8 h-8 rounded-full bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 hover:text-[#FFD43B] text-[#A7ADB2] flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
