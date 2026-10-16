'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, X, AlertCircle, CheckCircle2, Calendar, MapPin } from 'lucide-react';

interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  isCurrent: boolean;
  description: string;
  skills: string[];
  displayOrder: number;
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    period: '',
    isCurrent: false,
    description: '',
    skillsInput: '',
    displayOrder: 0,
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/experience');
      if (!res.ok) throw new Error('Failed to load experience');
      const data = await res.json();
      setExperiences(data.experiences || []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      location: 'Islamabad, Pakistan',
      period: 'Aug 2025 - Present',
      isCurrent: true,
      description: '',
      skillsInput: 'React, Next.js, Node.js, Tailwind CSS',
      displayOrder: experiences.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      role: exp.role,
      company: exp.company,
      location: exp.location || '',
      period: exp.period,
      isCurrent: exp.isCurrent,
      description: exp.description,
      skillsInput: (exp.skills || []).join(', '),
      displayOrder: exp.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const skills = formData.skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      role: formData.role,
      company: formData.company,
      location: formData.location,
      period: formData.period,
      isCurrent: formData.isCurrent,
      description: formData.description,
      skills,
      displayOrder: formData.displayOrder,
    };

    try {
      const url = editingExp ? `/api/admin/experience/${editingExp._id}` : '/api/admin/experience';
      const method = editingExp ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');

      setSuccess(editingExp ? 'Experience updated' : 'Experience created');
      setIsModalOpen(false);
      fetchExperience();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete experience');
      setDeleteConfirmId(null);
      fetchExperience();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--admin-border)] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[var(--admin-text-primary)]">
            Career Experience
          </h1>
          <p className="text-xs sm:text-sm text-[var(--admin-text-secondary)] mt-1">
            Maintain your career timeline, company leadership, tech stacks, and demonstrated milestones.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--admin-accent)] hover:opacity-90 text-[#0B0D0E] font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Position</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-2 border-[var(--admin-accent)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[var(--admin-text-secondary)] font-mono">Loading career history...</span>
        </div>
      ) : experiences.length === 0 ? (
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-12 text-center">
          <Briefcase className="w-10 h-10 text-[var(--admin-text-secondary)] mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] font-['Outfit']">No experience records</h3>
          <p className="text-xs text-[var(--admin-text-secondary)] mt-1">Add your career milestones to highlight your development journey.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5 hover:border-[var(--admin-accent)]/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="font-bold text-sm sm:text-base text-[var(--admin-text-primary)]">{exp.role}</h3>
                  <span className="text-xs font-semibold text-[var(--admin-accent)] font-mono">@ {exp.company}</span>
                  {exp.isCurrent && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--admin-accent)]/15 text-[var(--admin-accent)] border border-[var(--admin-accent)]/25 font-mono font-medium">
                      Current Role
                    </span>
                  )}
                </div>

                <div className="text-xs text-[var(--admin-text-secondary)] font-mono flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  )}
                  <span>• Order: #{exp.displayOrder}</span>
                </div>

                <p className="text-xs text-[var(--admin-text-secondary)] leading-relaxed max-w-3xl pt-1">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--admin-elevated)] text-[var(--admin-text-secondary)] border border-[var(--admin-border)] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-start">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-1.5 rounded-lg text-[var(--admin-text-secondary)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors cursor-pointer"
                  title="Edit Experience"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {deleteConfirmId === exp._id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="p-1 text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(exp._id)}
                    className="p-1.5 rounded-lg text-[var(--admin-text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-2xl p-6 md:p-8 shadow-2xl text-[var(--admin-text-primary)] relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold font-['Outfit'] mb-6">
              {editingExp ? 'Edit Experience Position' : 'Add New Position'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Full-Stack Developer"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Poxito, LDNinjas, etc."
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Period *</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Aug 2025 - Present"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Islamabad / Remote"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key responsibilities, team leadership, systems architected..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">
                  Skills Used (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.skillsInput}
                  onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
                  placeholder="React, Next.js, Node.js, Tailwind CSS"
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--admin-text-primary)]">
                  <input
                    type="checkbox"
                    checked={formData.isCurrent}
                    onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--admin-accent)] focus:ring-[var(--admin-accent)] accent-[var(--admin-accent)]"
                  />
                  <span>Currently active in this role</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-elevated)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[var(--admin-accent)] text-[#0B0D0E] hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {saving ? 'Saving...' : editingExp ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
