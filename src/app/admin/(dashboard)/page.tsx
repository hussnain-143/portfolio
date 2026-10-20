'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderGit2,
  Mail,
  Cpu,
  Briefcase,
  Plus,
  ArrowUpRight,
  AlertCircle,
  ExternalLink,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  User,
  CheckCircle2,
  GitPullRequest,
} from 'lucide-react';

interface Stats {
  publishedProjects: number;
  draftProjects: number;
  totalProjects: number;
  unreadMessages: number;
  totalMessages: number;
  skillsCount: number;
  experienceCount: number;
  openSourceCount?: number;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
  updatedAt: string;
}

interface ProfileData {
  name?: string;
  headline?: string;
  title?: string;
  location?: string;
  avatarUrl?: string;
  availabilityStatus?: string;
  availabilityNote?: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [recentProjects, setRecentProjects] = useState<ProjectItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Live time ticker in Asia/Karachi timezone
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setCurrentTime(timeFormatter.format(now));
      setCurrentDate(dateFormatter.format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/overview');
      if (!res.ok) throw new Error('Failed to load dashboard data');
      const data = await res.json();
      setStats(data.stats);
      setRecentMessages(data.recentMessages || []);
      setRecentProjects(data.recentProjects || []);
      if (data.profile) setProfile(data.profile);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markMessageAsRead = async (id: string, currentRead: boolean) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !currentRead }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-2 border-[var(--admin-accent)] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-[var(--admin-text-secondary)] font-mono">Loading telemetry...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* PROPER ADMIN HERO BANNER: Location, Time, Avatar & Profile */}
      {/* ============================================================ */}
      <div className="rounded-3xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 sm:p-8 relative overflow-hidden shadow-sm">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--admin-accent)]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Avatar + Identity + Live Telemetry */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar with status ring */}
            <div className="relative shrink-0">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--admin-accent)]/40 p-0.5 shadow-lg shadow-[var(--admin-accent)]/10 bg-[var(--admin-elevated)]">
                <Image
                  src={profile?.avatarUrl || '/profile/image.jpg'}
                  alt={profile?.name || 'Hussnain Ahmed'}
                  width={80}
                  height={80}
                  priority
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Pulsing online/available badge */}
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--admin-surface)] shadow-sm"
                title="Status: Available for Work"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
            </div>

            {/* Profile Info & Metadata */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-[var(--admin-text-primary)]">
                  {profile?.name || 'Hussnain Ahmed'}
                </h1>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--admin-accent)]/15 text-[var(--admin-accent)] border border-[var(--admin-accent)]/25 font-bold">
                  Studio Admin
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--admin-text-secondary)] font-medium">
                {profile?.headline || profile?.title || 'Full-Stack Developer & Next.js Specialist'}
              </p>

              {/* Location, Time & Availability Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                {/* Location */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-[var(--admin-text-secondary)] font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[var(--admin-accent)]" />
                  <span>{profile?.location || 'Islamabad, Pakistan'}</span>
                </div>

                {/* Live Local Clock */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-[var(--admin-text-secondary)] font-mono">
                  <Clock className="w-3.5 h-3.5 text-[var(--admin-orange)]" />
                  <span className="tabular-nums font-semibold text-[var(--admin-text-primary)]">
                    {currentTime || 'Loading...'}
                  </span>
                  <span className="text-[10px] text-[var(--admin-text-secondary)]">(PKT)</span>
                </div>

                {/* Date */}
                {currentDate && (
                  <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-[var(--admin-text-secondary)] font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[var(--admin-accent)]" />
                    <span>{currentDate}</span>
                  </div>
                )}

                {/* Availability Note */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-semibold font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{profile?.availabilityNote || 'Available for freelance & full-time'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--admin-accent)] hover:opacity-90 text-[#0B0D0E] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Project</span>
            </Link>

            <Link
              href="/admin/profile"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-elevated)] text-[var(--admin-text-primary)] hover:border-[var(--admin-accent)]/50 text-xs font-semibold transition-all"
            >
              <User className="w-3.5 h-3.5 text-[var(--admin-accent)]" />
              <span>Edit Profile</span>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-elevated)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] text-xs font-medium transition-all"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metric Cards (Real Database Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Published Projects */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5 relative overflow-hidden group hover:border-[var(--admin-accent)]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider font-mono">
              Published Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-[var(--admin-accent)]/10 text-[var(--admin-accent)] flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold mt-3 text-[var(--admin-text-primary)] font-['Outfit']">
            {stats?.publishedProjects ?? 0}
          </div>
          <div className="text-xs text-[var(--admin-text-secondary)] mt-1.5 flex items-center gap-1.5 font-mono">
            <span className="text-[var(--admin-accent)] font-semibold">{stats?.draftProjects ?? 0} draft(s)</span>
            <span>in workspace</span>
          </div>
        </div>

        {/* Open Source Repositories */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5 relative overflow-hidden group hover:border-[#FFB020]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider font-mono">
              Open Source
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FFB020]/10 text-[#FFB020] flex items-center justify-center">
              <GitPullRequest className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold mt-3 text-[var(--admin-text-primary)] font-['Outfit']">
            {stats?.openSourceCount ?? 4}
          </div>
          <div className="text-xs text-[var(--admin-text-secondary)] mt-1.5 font-mono flex items-center gap-1.5">
            <span className="text-[#FFB020] font-semibold">Community</span>
            <span>repos managed</span>
          </div>
        </div>

        {/* Unread Inquiries */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5 relative overflow-hidden group hover:border-[var(--admin-orange)]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider font-mono">
              Client Inquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-[var(--admin-orange)]/10 text-[var(--admin-orange)] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold mt-3 text-[var(--admin-text-primary)] font-['Outfit']">
            {stats?.unreadMessages ?? 0}
          </div>
          <div className="text-xs text-[var(--admin-text-secondary)] mt-1.5 flex items-center gap-1.5 font-mono">
            <span className="text-[var(--admin-orange)] font-semibold">{stats?.totalMessages ?? 0} total</span>
            <span>inquiries logged</span>
          </div>
        </div>

        {/* Active Skills */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5 relative overflow-hidden group hover:border-[var(--admin-accent)]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider font-mono">
              Active Technologies
            </span>
            <div className="w-9 h-9 rounded-xl bg-[var(--admin-accent)]/10 text-[var(--admin-accent)] flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold mt-3 text-[var(--admin-text-primary)] font-['Outfit']">
            {stats?.skillsCount ?? 0}
          </div>
          <div className="text-xs text-[var(--admin-text-secondary)] mt-1.5 font-mono">
            Across 4 categories
          </div>
        </div>

        {/* Experience Roles */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--admin-text-secondary)] uppercase tracking-wider font-mono">
              Career Roles
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold mt-3 text-[var(--admin-text-primary)] font-['Outfit']">
            {stats?.experienceCount ?? 0}
          </div>
          <div className="text-xs text-[var(--admin-text-secondary)] mt-1.5 font-mono">
            Verified milestones
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Link
          href="/admin/projects"
          className="p-3.5 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)] transition-all flex items-center justify-between text-xs font-semibold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
        >
          <span>Projects Directory</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--admin-accent)]" />
        </Link>
        <Link
          href="/admin/opensource"
          className="p-3.5 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)] hover:border-[#FFB020] transition-all flex items-center justify-between text-xs font-semibold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
        >
          <span>Open Source</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FFB020]" />
        </Link>
        <Link
          href="/admin/skills"
          className="p-3.5 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)] transition-all flex items-center justify-between text-xs font-semibold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
        >
          <span>Manage Tech Stack</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--admin-accent)]" />
        </Link>
        <Link
          href="/admin/messages"
          className="p-3.5 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)] transition-all flex items-center justify-between text-xs font-semibold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
        >
          <span>Contact Inbox</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--admin-accent)]" />
        </Link>
        <Link
          href="/admin/settings"
          className="p-3.5 rounded-xl bg-[var(--admin-surface)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)] transition-all flex items-center justify-between text-xs font-semibold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
        >
          <span>Site Configuration</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--admin-accent)]" />
        </Link>
      </div>

      {/* Two columns: Recent Inquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--admin-border)]">
            <h2 className="font-bold text-sm text-[var(--admin-text-primary)] flex items-center gap-2 font-['Outfit']">
              <Mail className="w-4 h-4 text-[var(--admin-orange)]" />
              <span>Latest Inquiries</span>
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs text-[var(--admin-accent)] hover:underline font-medium"
            >
              Open Inbox →
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--admin-text-secondary)]">
              No inquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.slice(0, 4).map((msg) => (
                <div
                  key={msg._id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    msg.isRead
                      ? 'bg-[var(--admin-elevated)] border-[var(--admin-border)]'
                      : 'bg-[var(--admin-accent)]/5 border-[var(--admin-accent)]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-xs text-[var(--admin-text-primary)] flex items-center gap-2">
                        <span>{msg.name}</span>
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-accent)] animate-pulse" />
                        )}
                      </div>
                      <div className="text-[11px] text-[var(--admin-text-secondary)] font-mono mt-0.5">{msg.email}</div>
                    </div>
                    <span className="text-[10px] text-[var(--admin-text-secondary)] font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--admin-text-secondary)] mt-2 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[var(--admin-border)] flex items-center justify-between text-xs">
                    <button
                      onClick={() => markMessageAsRead(msg._id, msg.isRead)}
                      className="text-[11px] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] transition-colors cursor-pointer"
                    >
                      {msg.isRead ? 'Mark unread' : 'Mark read'}
                    </button>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                        msg.subject || 'Portfolio Inquiry'
                      )}`}
                      className="text-[11px] text-[var(--admin-accent)] hover:underline font-semibold"
                    >
                      Reply via Email →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--admin-border)]">
            <h2 className="font-bold text-sm text-[var(--admin-text-primary)] flex items-center gap-2 font-['Outfit']">
              <FolderGit2 className="w-4 h-4 text-[var(--admin-accent)]" />
              <span>Project Catalog</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs text-[var(--admin-accent)] hover:underline font-medium"
            >
              Manage all →
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--admin-text-secondary)]">
              No projects added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.slice(0, 4).map((p) => (
                <div
                  key={p._id}
                  className="p-3.5 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)]/40 transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-[var(--admin-text-primary)] truncate flex items-center gap-2">
                      <span className="truncate">{p.title}</span>
                      {p.isFeatured && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[var(--admin-accent)]/15 text-[var(--admin-accent)] border border-[var(--admin-accent)]/25 font-mono shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[var(--admin-text-secondary)] mt-0.5 flex items-center gap-1.5 font-mono truncate">
                      <span>/{p.slug}</span>
                      <span>•</span>
                      <span>{p.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold font-mono ${
                        p.isPublished
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {p.isPublished ? 'Published' : 'Draft'}
                    </span>

                    <Link
                      href={`/admin/projects`}
                      className="text-xs text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] px-2 py-1 rounded-lg bg-[var(--admin-surface)] border border-[var(--admin-border)] transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
