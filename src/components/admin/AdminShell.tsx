'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Mail,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Search,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Command as CommandIcon,
  Sparkles,
} from 'lucide-react';
import { SessionPayload } from '@/lib/auth';

interface AdminShellProps {
  admin: SessionPayload;
  children: React.ReactNode;
}

export default function AdminShell({ admin, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState<number | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem('ha_admin_theme') as 'dark' | 'light' | null) || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  // Fetch unread count for badge
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch('/api/admin/overview');
        if (res.ok) {
          const data = await res.json();
          if (data.stats && typeof data.stats.unreadMessages === 'number') {
            setUnreadCount(data.stats.unreadMessages);
          }
        }
      } catch (err) {
        // Silently ignore badge fetch errors
      }
    };
    fetchUnread();
  }, [pathname]);

  // Handle global ⌘K shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('ha_admin_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.classList.toggle('light', next === 'light');
  };

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

  const mainNav = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Skills & Tech', href: '/admin/skills', icon: Cpu },
    { label: 'Experience', href: '/admin/experience', icon: Briefcase },
    { label: 'Education & Certs', href: '/admin/education', icon: GraduationCap },
    {
      label: 'Contact Inbox',
      href: '/admin/messages',
      icon: Mail,
      badge: unreadCount && unreadCount > 0 ? unreadCount : null,
    },
  ];

  const configNav = [
    { label: 'Profile Management', href: '/admin/profile', icon: User },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  // Breadcrumbs calculation
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard Overview';
    if (pathname.startsWith('/admin/projects')) return 'Project Management';
    if (pathname.startsWith('/admin/skills')) return 'Skills & Technologies';
    if (pathname.startsWith('/admin/experience')) return 'Career Experience';
    if (pathname.startsWith('/admin/education')) return 'Education & Certifications';
    if (pathname.startsWith('/admin/messages')) return 'Inquiries Inbox';
    if (pathname.startsWith('/admin/profile')) return 'Profile & Bio';
    if (pathname.startsWith('/admin/settings')) return 'Site Settings';
    return 'Admin';
  };

  const commandItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Manage Projects', href: '/admin/projects', icon: FolderGit2, category: 'Navigation' },
    { label: 'Create New Project', href: '/admin/projects?create=true', icon: Plus, category: 'Action' },
    { label: 'Skills & Tech Stack', href: '/admin/skills', icon: Cpu, category: 'Navigation' },
    { label: 'Career History', href: '/admin/experience', icon: Briefcase, category: 'Navigation' },
    { label: 'Education & Certifications', href: '/admin/education', icon: GraduationCap, category: 'Navigation' },
    { label: 'Inquiries Inbox', href: '/admin/messages', icon: Mail, category: 'Navigation' },
    { label: 'Profile Settings', href: '/admin/profile', icon: User, category: 'Navigation' },
    { label: 'Site Configuration', href: '/admin/settings', icon: Settings, category: 'Navigation' },
  ].filter((item) => item.label.toLowerCase().includes(commandQuery.toLowerCase()));

  // Dynamic Theme Colors
  const isDark = theme === 'dark';
  const bgApp = isDark ? 'bg-[#0B0D0E]' : 'bg-[#F8F8F5]';
  const bgSidebar = isDark ? 'bg-[#101213]' : 'bg-[#FFFFFF]';
  const borderCol = isDark ? 'border-[#292D30]' : 'border-[#E4E4E7]';
  const textPrimary = isDark ? 'text-[#F4F4F5]' : 'text-[#18181B]';
  const textSecondary = isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]';
  const bgHeader = isDark ? 'bg-[#101213]/90' : 'bg-[#FFFFFF]/90';

  return (
    <div
      data-theme={theme}
      className={`min-h-screen ${theme} ${bgApp} ${textPrimary} flex transition-colors duration-200 font-sans`}
    >
      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* =========================================================================
          PERSISTENT COLLAPSIBLE SAAS SIDEBAR
          ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 ${bgSidebar} border-r ${borderCol} flex flex-col justify-between transition-all duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        {/* Sidebar Header / Brand */}
        <div>
          <div className={`h-16 flex items-center border-b ${borderCol} px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <Link
              href="/admin"
              className="flex items-center gap-3 group overflow-hidden"
              title="Portfolio Studio - Admin"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFD43B] via-[#FFB020] to-[#FF8A24] flex items-center justify-center p-2 shrink-0 shadow-md shadow-[#FFB020]/20 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-symbol.svg"
                  alt="Hussnain Ahmed"
                  width={22}
                  height={22}
                  className="brightness-0"
                />
              </div>

              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className={`font-bold text-sm leading-tight tracking-tight ${textPrimary} truncate font-['Outfit']`}>
                    Hussnain Ahmed
                  </span>
                  <span className="text-[10px] text-[#D97706] font-mono-code font-bold tracking-wider uppercase">
                    Portfolio Studio
                  </span>
                </div>
              )}
            </Link>

            {/* Collapse toggle (desktop only) */}
            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className={`hidden md:flex p-1.5 rounded-lg ${textSecondary} hover:${textPrimary} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
                title="Collapse sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick expand button when collapsed */}
          {collapsed && (
            <div className="hidden md:flex justify-center py-2 border-b border-inherit">
              <button
                onClick={() => setCollapsed(false)}
                className={`p-1.5 rounded-lg ${textSecondary} hover:${textPrimary} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
                title="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4 text-[#FFB020]" />
              </button>
            </div>
          )}

          {/* Navigation Groups */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {/* Group 1: Main Navigation */}
            <div className="space-y-1">
              {!collapsed && (
                <div className="px-3 py-1 text-[10px] font-mono-code uppercase tracking-wider text-[#71717A] font-bold">
                  Main Navigation
                </div>
              )}
              {mainNav.map((item) => {
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
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                      isActive
                        ? isDark
                          ? 'bg-[#FFB020]/15 text-[#FFD43B] font-semibold border border-[#FFB020]/30 shadow-sm'
                          : 'bg-[#FFB020]/20 text-[#B45309] font-semibold border border-[#FFB020]/40 shadow-sm'
                        : `${textSecondary} hover:${textPrimary} hover:bg-black/5 dark:hover:bg-white/5`
                    } ${collapsed ? 'justify-center' : 'justify-between'}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#FFB020]'
                            : 'text-[#71717A] group-hover:text-[#FFB020]'
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.badge ? (
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full bg-[#FFB020] text-black shrink-0">
                        {item.badge}
                      </span>
                    ) : null}

                    {collapsed && item.badge ? (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFB020]" />
                    ) : null}
                  </Link>
                );
              })}
            </div>

            {/* Group 2: Configuration */}
            <div className="space-y-1">
              {!collapsed && (
                <div className="px-3 py-1 text-[10px] font-mono-code uppercase tracking-wider text-[#71717A] font-bold">
                  Configuration
                </div>
              )}
              {configNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? isDark
                          ? 'bg-[#FFB020]/15 text-[#FFD43B] font-semibold border border-[#FFB020]/30 shadow-sm'
                          : 'bg-[#FFB020]/20 text-[#B45309] font-semibold border border-[#FFB020]/40 shadow-sm'
                        : `${textSecondary} hover:${textPrimary} hover:bg-black/5 dark:hover:bg-white/5`
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#FFB020]'
                          : 'text-[#71717A] group-hover:text-[#FFB020]'
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Public Link & Logout */}
        <div className={`p-3 border-t ${borderCol} space-y-2`}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'View Live Portfolio' : undefined}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs ${textSecondary} hover:${textPrimary} hover:bg-black/5 dark:hover:bg-white/5 transition-all ${
              collapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-3.5 h-3.5 text-[#FFB020]" />
              {!collapsed && <span>Live Portfolio</span>}
            </div>
            {!collapsed && (
              <span className="text-[10px] font-mono-code text-[#FFB020] bg-[#FFB020]/10 px-1.5 py-0.5 rounded border border-[#FFB020]/20">
                ↗
              </span>
            )}
          </a>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title={collapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-50 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>{loggingOut ? 'Signing Out...' : 'Sign Out'}</span>}
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION REGION
          ========================================================================= */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Top Header Navigation Bar */}
        <header
          className={`h-16 ${bgHeader} border-b ${borderCol} backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors`}
        >
          {/* Left: Mobile hamburger & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-xl border ${borderCol} ${textPrimary} md:hidden hover:bg-black/5 dark:hover:bg-white/5`}
              aria-label="Toggle navigation drawer"
            >
              {mobileOpen ? <X className="w-4 h-4 text-[#FFB020]" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Breadcrumb Indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className={textSecondary}>Portfolio Studio</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#71717A]" />
              <span className={`font-semibold ${textPrimary} font-['Outfit'] tracking-wide`}>
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Right: Quick Search, Theme Toggle, Profile Info */}
          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border ${borderCol} ${textSecondary} hover:${textPrimary} hover:border-[#FFB020]/40 bg-black/5 dark:bg-white/5 text-xs transition-all`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search actions...</span>
              <kbd className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-inherit border border-inherit">
                ⌘K
              </kbd>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border ${borderCol} ${textSecondary} hover:${textPrimary} hover:border-[#FFB020]/40 bg-black/5 dark:bg-white/5 transition-all`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#FBBF24]" />
              ) : (
                <Moon className="w-4 h-4 text-[#D97706]" />
              )}
            </button>

            {/* User Profile Mini Badge */}
            <div className={`flex items-center gap-2.5 pl-3 border-l ${borderCol}`}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFD43B] via-[#FFB020] to-[#FF8A24] flex items-center justify-center text-xs font-bold text-black shadow-sm shrink-0">
                {admin.name ? admin.name.charAt(0).toUpperCase() : 'H'}
              </div>
              <div className="hidden lg:block text-left">
                <p className={`text-xs font-semibold ${textPrimary} leading-tight truncate max-w-[130px]`}>
                  {admin.name || 'Hussnain Ahmed'}
                </p>
                <p className="text-[10px] text-[#71717A] leading-tight truncate max-w-[130px]">
                  {admin.email}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* =========================================================================
          COMMAND PALETTE MODAL (⌘K Quick Actions)
          ========================================================================= */}
      {commandOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div
            className={`w-full max-w-xl rounded-2xl ${bgSidebar} border ${borderCol} shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
          >
            {/* Search Input */}
            <div className={`p-4 border-b ${borderCol} flex items-center gap-3`}>
              <CommandIcon className="w-4 h-4 text-[#FFB020] shrink-0" />
              <input
                type="text"
                autoFocus
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Type a command or jump to page..."
                className={`w-full bg-transparent text-sm ${textPrimary} placeholder-[#71717A] focus:outline-none`}
              />
              <button
                onClick={() => setCommandOpen(false)}
                className={`p-1 rounded-lg ${textSecondary} hover:${textPrimary}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              {commandItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#71717A]">
                  No matching admin actions found.
                </div>
              ) : (
                commandItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        setCommandOpen(false);
                        router.push(item.href);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs ${textSecondary} hover:${textPrimary} hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-left`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#FFB020]" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#71717A]">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className={`p-3 border-t ${borderCol} text-[11px] text-[#71717A] flex items-center justify-between`}>
              <span>Navigation shortcut</span>
              <span>
                Press <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-inherit font-mono-code">ESC</kbd> to exit
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
