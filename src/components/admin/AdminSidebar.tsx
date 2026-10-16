'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  User,
  Briefcase,
  GraduationCap,
  Cpu,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import Image from 'next/image';
import { SessionPayload } from '@/lib/auth';

interface AdminSidebarProps {
  admin: SessionPayload;
}

export default function AdminSidebar({ admin }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Profile', href: '/admin/profile', icon: User },
    { label: 'Experience', href: '/admin/experience', icon: Briefcase },
    { label: 'Education & Certs', href: '/admin/education', icon: GraduationCap },
    { label: 'Technical Skills', href: '/admin/skills', icon: Cpu },
    { label: 'Inquiries Inbox', href: '/admin/messages', icon: Mail },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#171A1C] border border-[#2B3033] text-[#F7F7F2] md:hidden shadow-lg"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="w-5 h-5 text-[#FFB020]" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar shell */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0B0D0E] border-r border-[#2B3033] flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#171A1C] border border-[#2B3033] flex items-center justify-center p-2 shadow-lg shadow-[#FFB020]/10">
              <Image src="/logo-symbol.svg" alt="Hussnain Ahmed" width={24} height={24} />
            </div>
            <div>
              <div className="font-bold text-sm tracking-wide text-[#F7F7F2]">Hussnain Ahmed</div>
              <div className="text-[10px] text-[#FFB020] uppercase tracking-wider font-mono-code font-semibold">
                Admin Console
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#FFB020]/15 text-[#FFD43B] border border-[#FFB020]/30 font-semibold shadow-sm'
                      : 'text-[#A7ADB2] hover:text-[#F7F7F2] hover:bg-[#171A1C]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFB020]' : 'text-[#737B82]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-[#2B3033] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#A7ADB2] hover:text-[#F7F7F2] hover:bg-[#171A1C] transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Public Portfolio
            </span>
            <span className="text-[10px] font-mono-code text-[#FFB020]">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
