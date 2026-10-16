'use client';

import React, { useEffect, useState } from 'react';
import { User, Save, AlertCircle, CheckCircle2, Link2, Briefcase, Mail } from 'lucide-react';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    title: '',
    shortBio: '',
    fullBioText: '',
    email: '',
    phone: '',
    location: '',
    avatarUrl: '',
    resumeUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    availabilityStatus: 'available' as 'available' | 'busy' | 'selective',
    availabilityNote: '',
    yearsOfExperience: 2,
    completedProjectsCount: 6,
    rotatingPhrasesText: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/profile');
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        const p = data.profile;
        if (p) {
          setFormData({
            name: p.name || '',
            headline: p.headline || '',
            title: p.title || '',
            shortBio: p.shortBio || '',
            fullBioText: (p.fullBio || []).join('\n\n'),
            email: p.email || '',
            phone: p.phone || '',
            location: p.location || '',
            avatarUrl: p.avatarUrl || '',
            resumeUrl: p.resumeUrl || '',
            githubUrl: p.githubUrl || '',
            linkedinUrl: p.linkedinUrl || '',
            twitterUrl: p.twitterUrl || '',
            availabilityStatus: p.availabilityStatus || 'available',
            availabilityNote: p.availabilityNote || '',
            yearsOfExperience: p.yearsOfExperience ?? 2,
            completedProjectsCount: p.completedProjectsCount ?? 6,
            rotatingPhrasesText: (p.rotatingPhrases || []).join('\n'),
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const fullBio = formData.fullBioText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const rotatingPhrases = formData.rotatingPhrasesText
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      fullBio,
      rotatingPhrases,
    };

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');
      setSuccess('Profile configuration successfully updated');
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
        <span className="text-xs text-[var(--admin-text-secondary)] font-mono">Loading profile data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[var(--admin-border)] pb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[var(--admin-text-primary)]">
          Developer Profile
        </h1>
        <p className="text-xs sm:text-sm text-[var(--admin-text-secondary)] mt-1">
          Manage your personal brand identity, professional headline, availability badge, and social URLs.
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
        {/* General Identity */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 space-y-4">
          <h2 className="text-sm font-bold text-[var(--admin-text-primary)] flex items-center gap-2 border-b border-[var(--admin-border)] pb-3 font-['Outfit']">
            <User className="w-4 h-4 text-[var(--admin-accent)]" />
            <span>Identity & Overview</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Professional Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Headline</label>
            <input
              type="text"
              required
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Short Bio</label>
            <textarea
              required
              rows={2}
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">
              Full Biography (double line-break between paragraphs)
            </label>
            <textarea
              required
              rows={5}
              value={formData.fullBioText}
              onChange={(e) => setFormData({ ...formData, fullBioText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] leading-relaxed font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">
              Hero Rotating Phrases (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.rotatingPhrasesText}
              onChange={(e) => setFormData({ ...formData, rotatingPhrasesText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
            />
          </div>
        </div>

        {/* Contact and Availability */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 space-y-4">
          <h2 className="text-sm font-bold text-[var(--admin-text-primary)] flex items-center gap-2 border-b border-[var(--admin-border)] pb-3 font-['Outfit']">
            <Mail className="w-4 h-4 text-[var(--admin-orange)]" />
            <span>Contact & Availability Status</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Public Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Phone / WhatsApp</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Availability Status</label>
              <select
                value={formData.availabilityStatus}
                onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
              >
                <option value="available">Available for Work</option>
                <option value="selective">Selectively Open</option>
                <option value="busy">Currently Busy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Availability Note</label>
              <input
                type="text"
                value={formData.availabilityNote}
                onChange={(e) => setFormData({ ...formData, availabilityNote: e.target.value })}
                placeholder="Available for freelance & full-time roles"
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
              />
            </div>
          </div>
        </div>

        {/* Links and Assets */}
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-6 space-y-4">
          <h2 className="text-sm font-bold text-[var(--admin-text-primary)] flex items-center gap-2 border-b border-[var(--admin-border)] pb-3 font-['Outfit']">
            <Link2 className="w-4 h-4 text-[var(--admin-accent)]" />
            <span>Asset Paths & Social Channels</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Avatar Image Path</label>
              <input
                type="text"
                required
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Resume / CV File Path</label>
              <input
                type="text"
                required
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">GitHub Profile</label>
              <input
                type="url"
                required
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">LinkedIn Profile</label>
              <input
                type="url"
                required
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Twitter / X Profile</label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--admin-accent)] hover:opacity-90 text-[#0B0D0E] font-bold text-xs shadow-md disabled:opacity-50 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
