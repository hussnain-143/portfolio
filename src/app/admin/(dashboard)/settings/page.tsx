'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle2, Globe, Sliders } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    siteName: '',
    siteUrl: '',
    defaultSeoTitle: '',
    defaultSeoDescription: '',
    ogImageUrl: '',
    footerText: '',
    showClock: true,
    showAvailabilityBadge: true,
    emailNotificationsEnabled: false,
    notificationEmail: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/settings');
        if (!res.ok) throw new Error('Failed to load settings');
        const data = await res.json();
        const s = data.settings;
        if (s) {
          setFormData({
            siteName: s.siteName || '',
            siteUrl: s.siteUrl || '',
            defaultSeoTitle: s.defaultSeoTitle || '',
            defaultSeoDescription: s.defaultSeoDescription || '',
            ogImageUrl: s.ogImageUrl || '',
            footerText: s.footerText || '',
            showClock: s.showClock ?? true,
            showAvailabilityBadge: s.showAvailabilityBadge ?? true,
            emailNotificationsEnabled: s.emailNotificationsEnabled ?? false,
            notificationEmail: s.notificationEmail || '',
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update settings');
      setSuccess('Site settings and SEO metadata saved successfully');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-8 h-8 border-2 border-[var(--admin-accent)] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-[var(--admin-text-secondary)] font-mono">Loading site settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[var(--admin-border)] pb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[var(--admin-text-primary)]">
          Site Configuration & SEO
        </h1>
        <p className="text-xs sm:text-sm text-[var(--admin-text-secondary)] mt-1">
          Configure search engine indexing, social card meta tags, branding titles, and feature visibility flags.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SEO & Meta */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 space-y-4">
          <h2 className="text-sm font-bold text-[var(--admin-text-primary)] flex items-center gap-2 border-b border-[var(--admin-border)] pb-3 font-['Outfit']">
            <Globe className="w-4 h-4 text-[var(--admin-accent)]" />
            <span>Search Engine & Domain Configuration</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Site Title Brand</label>
              <input
                type="text"
                required
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Production Origin URL</label>
              <input
                type="url"
                required
                value={formData.siteUrl}
                onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Default SEO Page Title</label>
            <input
              type="text"
              required
              value={formData.defaultSeoTitle}
              onChange={(e) => setFormData({ ...formData, defaultSeoTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">
              Default Meta Description (Google snippet preview)
            </label>
            <textarea
              required
              rows={3}
              value={formData.defaultSeoDescription}
              onChange={(e) => setFormData({ ...formData, defaultSeoDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">
                OpenGraph / Social Card Asset
              </label>
              <input
                type="text"
                required
                value={formData.ogImageUrl}
                onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Footer Copyright Text</label>
              <input
                type="text"
                required
                value={formData.footerText}
                onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 space-y-4">
          <h2 className="text-sm font-bold text-[var(--admin-text-primary)] flex items-center gap-2 border-b border-[var(--admin-border)] pb-3 font-['Outfit']">
            <Sliders className="w-4 h-4 text-[var(--admin-orange)]" />
            <span>Live Portfolio Toggles</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)]/30 transition-colors">
              <input
                type="checkbox"
                checked={formData.showClock}
                onChange={(e) => setFormData({ ...formData, showClock: e.target.checked })}
                className="w-4 h-4 rounded text-[var(--admin-accent)] focus:ring-[var(--admin-accent)] accent-[var(--admin-accent)]"
              />
              <div>
                <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">Floating Live Local Clock</span>
                <span className="text-[11px] text-[var(--admin-text-secondary)]">Shows real-time Asia/Karachi time ticker for international clients</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)]/30 transition-colors">
              <input
                type="checkbox"
                checked={formData.showAvailabilityBadge}
                onChange={(e) => setFormData({ ...formData, showAvailabilityBadge: e.target.checked })}
                className="w-4 h-4 rounded text-[var(--admin-accent)] focus:ring-[var(--admin-accent)] accent-[var(--admin-accent)]"
              />
              <div>
                <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">Hero Availability Badge</span>
                <span className="text-[11px] text-[var(--admin-text-secondary)]">Displays "Available for Work" pulsing indicator on the homepage hero</span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--admin-accent)] hover:opacity-90 text-[#0B0D0E] font-bold text-xs shadow-md disabled:opacity-50 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
