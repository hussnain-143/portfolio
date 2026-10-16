'use client';

import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, Plus, Edit, Trash2, X, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';

interface Education {
  _id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
  isCertificate: boolean;
  certificateImage?: string;
  issuer?: string;
  displayOrder: number;
}

export default function AdminEducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [formData, setFormData] = useState({
    degree: '',
    school: '',
    period: '',
    description: '',
    isCertificate: false,
    certificateImage: '',
    issuer: '',
    displayOrder: 0,
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/education');
      if (!res.ok) throw new Error('Failed to load education data');
      const data = await res.json();
      setItems(data.education || []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      degree: '',
      school: '',
      period: '2020 - 2024',
      description: '',
      isCertificate: false,
      certificateImage: '',
      issuer: '',
      displayOrder: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Education) => {
    setEditingItem(item);
    setFormData({
      degree: item.degree,
      school: item.school,
      period: item.period,
      description: item.description || '',
      isCertificate: item.isCertificate,
      certificateImage: item.certificateImage || '',
      issuer: item.issuer || '',
      displayOrder: item.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const url = editingItem ? `/api/admin/education/${editingItem._id}` : '/api/admin/education';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');

      setSuccess(editingItem ? 'Record updated' : 'Record created');
      setIsModalOpen(false);
      fetchItems();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/education/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete record');
      setDeleteConfirmId(null);
      fetchItems();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const formalEducation = items.filter((i) => !i.isCertificate);
  const certificates = items.filter((i) => i.isCertificate);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--admin-border)] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[var(--admin-text-primary)]">
            Education & Certifications
          </h1>
          <p className="text-xs sm:text-sm text-[var(--admin-text-secondary)] mt-1">
            Manage academic degrees, certifications, hackathon awards, and verified credentials.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--admin-accent)] hover:opacity-90 text-[#0B0D0E] font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Credential</span>
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
          <span className="text-xs text-[var(--admin-text-secondary)] font-mono">Loading credentials...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Formal Education */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[var(--admin-text-primary)] flex items-center gap-2 font-['Outfit']">
              <GraduationCap className="w-4 h-4 text-[var(--admin-accent)]" />
              <span>Academic Degrees ({formalEducation.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formalEducation.map((edu) => (
                <div
                  key={edu._id}
                  className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-5 hover:border-[var(--admin-accent)]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-[var(--admin-text-primary)]">{edu.degree}</h3>
                      <span className="text-[10px] font-mono text-[var(--admin-accent)] bg-[var(--admin-accent)]/10 px-2 py-0.5 rounded border border-[var(--admin-accent)]/20 font-semibold shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--admin-text-secondary)] font-medium">{edu.school}</div>
                    {edu.description && (
                      <p className="text-xs text-[var(--admin-text-secondary)] leading-relaxed pt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--admin-border)] mt-4">
                    <span className="text-[10px] text-[var(--admin-text-secondary)] font-mono">Order: #{edu.displayOrder}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(edu)}
                        className="p-1.5 rounded-lg text-[var(--admin-text-secondary)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu._id)}
                        className="p-1.5 rounded-lg text-[var(--admin-text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[var(--admin-text-primary)] flex items-center gap-2 font-['Outfit']">
              <Award className="w-4 h-4 text-[var(--admin-orange)]" />
              <span>Certificates & Awards ({certificates.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert._id}
                  className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] overflow-hidden flex flex-col justify-between hover:border-[var(--admin-orange)]/40 transition-all"
                >
                  {cert.certificateImage && (
                    <div className="h-32 bg-[var(--admin-elevated)] overflow-hidden relative border-b border-[var(--admin-border)]">
                      <img
                        src={cert.certificateImage}
                        alt={cert.degree}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4 space-y-2 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-xs text-[var(--admin-text-primary)] line-clamp-1">{cert.degree}</h3>
                      <span className="text-[10px] font-mono text-[var(--admin-orange)] bg-[var(--admin-orange)]/10 border border-[var(--admin-orange)]/20 px-1.5 py-0.5 rounded font-medium shrink-0">
                        {cert.period}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--admin-text-secondary)]">{cert.school}</div>
                  </div>

                  <div className="p-3 border-t border-[var(--admin-border)] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[var(--admin-text-secondary)] font-mono">Order: #{cert.displayOrder}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(cert)}
                        className="p-1 rounded text-[var(--admin-text-secondary)] hover:text-[var(--admin-accent)] transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cert._id)}
                        className="p-1 rounded text-[var(--admin-text-secondary)] hover:text-red-500 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-2xl p-6 shadow-2xl text-[var(--admin-text-primary)] relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold font-['Outfit'] mb-5">
              {editingItem ? 'Edit Credential' : 'Add Credential'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">
                  Title / Degree *
                </label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="BS in Computer Science or Hackathon Winner"
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">
                  Institution / Issuer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="Abbottabad University / Tech Summit"
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Period *</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2020 - 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
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
                <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key coursework, honors, project achievements..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--admin-text-primary)]">
                  <input
                    type="checkbox"
                    checked={formData.isCertificate}
                    onChange={(e) => setFormData({ ...formData, isCertificate: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--admin-accent)] focus:ring-[var(--admin-accent)] accent-[var(--admin-accent)]"
                  />
                  <span>This is a Certificate or Award</span>
                </label>
              </div>

              {formData.isCertificate && (
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">
                    Certificate Image (Path, URL, or File)
                  </label>
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-[var(--admin-accent)]/50 bg-[var(--admin-elevated)] shrink-0 shadow-sm flex items-center justify-center">
                      {formData.certificateImage ? (
                        <img
                          src={formData.certificateImage}
                          alt="Certificate Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] text-[var(--admin-text-secondary)]">No Pic</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        value={formData.certificateImage}
                        onChange={(e) => setFormData({ ...formData, certificateImage: e.target.value })}
                        placeholder="/certificates/hackathon.jpg or https://..."
                        className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                      />
                      <label className="text-[10px] px-2.5 py-1 rounded-lg bg-[var(--admin-elevated)] hover:bg-[var(--admin-border)] text-[var(--admin-accent)] border border-[var(--admin-border)] cursor-pointer transition-colors inline-flex items-center gap-1">
                        <span>Browse Local Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                if (typeof reader.result === 'string') {
                                  setFormData((prev) => ({ ...prev, certificateImage: reader.result as string }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

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
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
