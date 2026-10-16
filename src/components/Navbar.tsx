'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Download,
  Menu,
  X,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Header Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 flex justify-center items-center ${
          scrolled
            ? 'backdrop-blur-xl bg-[#0B0D0E]/85 border-b border-[#2B3033]/80 shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl flex items-center justify-between">
          {/* Brand Mark Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Hussnain Ahmed - Home"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo-symbol.svg"
                alt="Hussnain Ahmed Monogram"
                width={32}
                height={32}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[#F7F7F2] font-['Outfit']">
                Hussnain Ahmed
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium"
          >
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#FFD43B] font-semibold'
                      : 'text-[#A7ADB2] hover:text-[#F7F7F2]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFD43B] to-[#FF8A24] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Standout Resume Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="/cv/HUSSNAIN-AHMED-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] hover:opacity-95 text-[#0B0D0E] font-bold text-xs tracking-wide shadow-md shadow-[#FFB020]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Resume</span>
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-[#171A1C] border border-[#2B3033] text-[#F7F7F2] md:hidden hover:bg-[#202326] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#FFB020]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0D0E]/95 backdrop-blur-2xl md:hidden pt-24 px-6">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <div className="px-3 py-1 mb-2 text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base transition-all ${
                    isActive
                      ? 'bg-[#FFB020]/10 text-[#FFD43B] border border-[#FFB020]/30 font-semibold'
                      : 'text-[#A7ADB2] hover:bg-[#171A1C] hover:text-[#F7F7F2]'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD43B]" />}
                </Link>
              );
            })}

            <div className="pt-6 mt-4 border-t border-[#2B3033] space-y-3">
              <a
                href="/cv/HUSSNAIN-AHMED-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-sm shadow-lg shadow-[#FFB020]/20"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
