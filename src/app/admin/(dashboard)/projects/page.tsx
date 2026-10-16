'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  FolderGit2,
  Eye,
  Star,
  Globe,
  Github,
  CheckCircle2,
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription?: string;
  coverImage: string;
  tags: string[];
  category: string;
  projectStatus: 'completed' | 'in-progress' | 'archived';
  isFeatured: boolean;
  displayOrder: number;
  githubUrl: string;
  liveUrl: string;
  isPublished: boolean;
  caseStudyContent?: {
    overview?: string;
    challenges?: string;
    solutions?: string;
    keyFeatures?: string[];
  };
}

const emptyProject: Omit<Project, '_id'> = {
  title: '',
  slug: '',
  shortDescription: '',
  detailedDescription: '',
  coverImage: '/project/rosy-garden.png',
  tags: ['React', 'Next.js', 'Tailwind CSS'],
  category: 'Full-Stack',
  projectStatus: 'completed',
  isFeatured: false,
  displayOrder: 0,
  githubUrl: '',
  liveUrl: '',
  isPublished: true,
  caseStudyContent: {
    overview: '',
    challenges: '',
    solutions: '',
    keyFeatures: [],
  },
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Project, '_id'>>(emptyProject);
  const [tagsInput, setTagsInput] = useState('');
  const [keyFeaturesInput, setKeyFeaturesInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/projects?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, statusFilter]);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(emptyProject);
    setTagsInput('React, Next.js, Tailwind CSS');
    setKeyFeaturesInput('');
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      shortDescription: p.shortDescription,
      detailedDescription: p.detailedDescription || '',
      coverImage: p.coverImage,
      tags: p.tags,
      category: p.category,
      projectStatus: p.projectStatus,
      isFeatured: p.isFeatured,
      displayOrder: p.displayOrder,
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      isPublished: p.isPublished,
      caseStudyContent: p.caseStudyContent || {},
    });
    setTagsInput((p.tags || []).join(', '));
    setKeyFeaturesInput((p.caseStudyContent?.keyFeatures || []).join('\n'));
    setError(null);
    setIsModalOpen(true);
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const keyFeatures = keyFeaturesInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      tags,
      caseStudyContent: {
        ...formData.caseStudyContent,
        keyFeatures,
      },
    };

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject._id}`
        : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');

      setSuccess(editingProject ? 'Project updated successfully' : 'Project created successfully');
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (p: Project) => {
    try {
      await fetch(`/api/admin/projects/${p._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, isPublished: !p.isPublished }),
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (p: Project) => {
    try {
      await fetch(`/api/admin/projects/${p._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, isFeatured: !p.isFeatured }),
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--admin-border)] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[var(--admin-text-primary)]">
            Projects Management
          </h1>
          <p className="text-xs sm:text-sm text-[var(--admin-text-secondary)] mt-1">
            Manage case studies, publication drafts, technology tags, and live repository links.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--admin-accent)] hover:opacity-90 text-[#0B0D0E] font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Project</span>
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-[var(--admin-surface)] p-3.5 rounded-2xl border border-[var(--admin-border)]">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[var(--admin-text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] placeholder-[var(--admin-text-secondary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[var(--admin-accent)] text-[#0B0D0E]'
                : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-elevated)]'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === 'published'
                ? 'bg-[var(--admin-accent)] text-[#0B0D0E]'
                : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-elevated)]'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === 'draft'
                ? 'bg-[var(--admin-accent)] text-[#0B0D0E]'
                : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-elevated)]'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-2 border-[var(--admin-accent)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[var(--admin-text-secondary)] font-mono">Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] p-12 text-center">
          <FolderGit2 className="w-10 h-10 text-[var(--admin-text-secondary)] mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] font-['Outfit']">No projects found</h3>
          <p className="text-xs text-[var(--admin-text-secondary)] mt-1">Try adjusting your search query or create a new project.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--admin-elevated)] border-b border-[var(--admin-border)] text-[var(--admin-text-secondary)] uppercase tracking-wider font-mono">
                <tr>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--admin-border)]">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-[var(--admin-elevated)]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs sm:text-sm text-[var(--admin-text-primary)]">{p.title}</div>
                      <div className="text-[11px] text-[var(--admin-text-secondary)] font-mono mt-0.5">/{p.slug}</div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--admin-elevated)] text-[var(--admin-text-secondary)] border border-[var(--admin-border)]"
                          >
                            {tag}
                          </span>
                        ))}
                        {p.tags.length > 3 && (
                          <span className="text-[10px] text-[var(--admin-text-secondary)] self-center font-mono">
                            +{p.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[var(--admin-text-secondary)] font-mono">{p.category}</td>

                    <td className="py-3.5 px-4 font-mono text-[var(--admin-text-secondary)]">{p.displayOrder}</td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublish(p)}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold font-mono cursor-pointer transition-all ${
                          p.isPublished
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20'
                        }`}
                      >
                        {p.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-medium font-mono cursor-pointer transition-all flex items-center gap-1 ${
                          p.isFeatured
                            ? 'bg-[var(--admin-accent)]/15 text-[var(--admin-accent)] border-[var(--admin-accent)]/30 hover:bg-[var(--admin-accent)]/25'
                            : 'bg-[var(--admin-elevated)] text-[var(--admin-text-secondary)] border-[var(--admin-border)] hover:text-[var(--admin-text-primary)]'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${p.isFeatured ? 'fill-[var(--admin-accent)]' : ''}`} />
                        <span>{p.isFeatured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Live Case Study"
                          className="p-1.5 rounded-lg text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-elevated)] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => openEditModal(p)}
                          title="Edit Project"
                          className="p-1.5 rounded-lg text-[var(--admin-text-secondary)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {deleteConfirmId === p._id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold hover:bg-red-500 cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="p-1 rounded text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(p._id)}
                            title="Delete Project"
                            className="p-1.5 rounded-lg text-[var(--admin-text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-2xl p-6 md:p-8 shadow-2xl my-8 text-[var(--admin-text-primary)] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-['Outfit'] mb-6 text-[var(--admin-text-primary)]">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project Name"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] font-mono">Slug *</label>
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="text-[10px] text-[var(--admin-accent)] hover:underline cursor-pointer"
                    >
                      Generate from Title
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="unique-project-slug"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Full-Stack, Frontend, etc."
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

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Status</label>
                  <select
                    value={formData.projectStatus}
                    onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Concise overview displayed on cards..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Detailed Case Study</label>
                <textarea
                  rows={3}
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                  placeholder="Deep dive into features, architecture, and outcomes..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Cover Image Path</label>
                  <input
                    type="text"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="/project/rosy-garden.png"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1">Technology Tags (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React, Next.js, Redux, Tailwind"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-text-secondary)] mb-1 font-mono">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--admin-elevated)] border border-[var(--admin-border)] text-xs text-[var(--admin-text-primary)] focus:outline-none focus:border-[var(--admin-accent)] font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--admin-text-primary)]">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--admin-accent)] focus:ring-[var(--admin-accent)] accent-[var(--admin-accent)]"
                  />
                  <span>Published (visible on live portfolio)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--admin-text-primary)]">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--admin-accent)] focus:ring-[var(--admin-accent)] accent-[var(--admin-accent)]"
                  />
                  <span>Featured project</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-elevated)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[var(--admin-accent)] text-[#0B0D0E] hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {saving ? 'Saving...' : editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
