'use client';

import React, { useEffect, useState } from 'react';
import { Cpu, Plus, Edit, Trash2, X, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';
import TechIcon from '@/components/TechIcon';

interface Skill {
  _id: string;
  category: string;
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  displayOrder: number;
  isFeatured: boolean;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    category: 'Frontend',
    name: '',
    level: 'Advanced' as 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner',
    displayOrder: 0,
    isFeatured: true,
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/skills');
      if (!res.ok) throw new Error('Failed to load skills');
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      category: 'Frontend',
      name: '',
      level: 'Advanced',
      displayOrder: skills.length + 1,
      isFeatured: true,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Skill) => {
    setEditingSkill(s);
    setFormData({
      category: s.category,
      name: s.name,
      level: s.level,
      displayOrder: s.displayOrder,
      isFeatured: s.isFeatured,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const url = editingSkill ? `/api/admin/skills/${editingSkill._id}` : '/api/admin/skills';
      const method = editingSkill ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');

      setSuccess(editingSkill ? 'Skill updated successfully' : 'Skill registered successfully');
      setIsModalOpen(false);
      fetchSkills();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete skill');
      setDeleteConfirmId(null);
      setSuccess('Skill deleted successfully');
      fetchSkills();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const allCategories = Array.from(new Set(skills.map((s) => s.category)));

  // Filter skills by search query and category tab
  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[#F7F7F2]">
            Skills &amp; Technologies
          </h1>
          <p className="text-sm text-[#A7ADB2] mt-1">
            Manage your verified technology stack, vector icons, and engineering categories
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs shadow-lg shadow-[#FFB020]/20 hover:scale-105 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Technology</span>
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Controls Bar: Search & Category Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#737B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search technologies..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#171A1C] border border-[#2B3033] text-xs text-[#F7F7F2] placeholder-[#737B82] focus:outline-none focus:border-[#FFB020] transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#FFB020] text-black shadow-sm'
                : 'bg-[#171A1C] border border-[#2B3033] text-[#A7ADB2] hover:text-[#F7F7F2]'
            }`}
          >
            All Categories ({skills.length})
          </button>
          {allCategories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FFB020] text-black shadow-sm'
                    : 'bg-[#171A1C] border border-[#2B3033] text-[#A7ADB2] hover:text-[#F7F7F2]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Skill Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#FFB020] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-12 text-center text-[#737B82] text-xs space-y-2">
          <Cpu className="w-8 h-8 mx-auto text-[#737B82]" />
          <p>No technologies matched your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((s) => (
            <div
              key={s._id}
              className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/40 transition-all flex items-center justify-between gap-3 group"
            >
              {/* Icon & Details */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#111416] border border-[#2B3033] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <TechIcon name={s.name} size={18} colored={true} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-[#F7F7F2] truncate group-hover:text-[#FFD43B] transition-colors">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-[#737B82] font-mono-code truncate">
                    {s.category} • Order: {s.displayOrder}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(s)}
                  className="p-1.5 rounded-lg text-[#737B82] hover:text-[#F7F7F2] hover:bg-white/5 transition-colors cursor-pointer"
                  title="Edit skill"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                {deleteConfirmId === s._id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-1.5 py-0.5 rounded bg-white/10 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(s._id)}
                    className="p-1.5 rounded-lg text-[#737B82] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal with Live Icon Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#171A1C] border border-[#2B3033] rounded-2xl p-6 shadow-2xl text-[#F7F7F2] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#737B82] hover:text-[#F7F7F2]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold font-['Outfit'] mb-5">
              {editingSkill ? 'Edit Technology' : 'Add Technology'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Live Icon Preview Badge */}
              <div className="p-4 rounded-xl bg-[#111416] border border-[#2B3033] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#171A1C] border border-[#2B3033] flex items-center justify-center shrink-0">
                  <TechIcon name={formData.name || 'code'} size={20} colored={true} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#F7F7F2]">
                    {formData.name || 'Technology Name'}
                  </div>
                  <div className="text-[10px] text-[#A7ADB2] font-mono-code">
                    Live icon mark matches automatically
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7ADB2] mb-1 font-mono-code">
                  Technology Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="React, Next.js, Node.js, Docker, MongoDB..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111416] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1 font-mono-code">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111416] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Specializations">Specializations</option>
                    <option value="Tools & Workflow">Tools & Workflow</option>
                    <option value="Databases">Databases</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1 font-mono-code">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111416] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020] font-mono-code"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2B3033]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A7ADB2] hover:text-[#F7F7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] shadow-lg shadow-[#FFB020]/20 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : editingSkill ? 'Update Technology' : 'Create Technology'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
