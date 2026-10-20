'use client';

import React, { useEffect, useState } from 'react';
import {
  GitPullRequest,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  Star,
  GitFork,
  Code2,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Github,
} from 'lucide-react';

interface OpenSourceItem {
  _id: string;
  title: string;
  slug: string;
  repoName: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  role: 'Author' | 'Maintainer' | 'Contributor';
  stars: number;
  forks: number;
  language: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  highlights?: string[];
  updatedAt?: string;
}

const emptyItem: Omit<OpenSourceItem, '_id'> = {
  title: '',
  slug: '',
  repoName: '',
  description: '',
  githubUrl: '',
  liveUrl: '',
  role: 'Author',
  stars: 0,
  forks: 0,
  language: 'TypeScript',
  tags: ['Next.js', 'React', 'Tailwind CSS'],
  isFeatured: true,
  isPublished: true,
  displayOrder: 0,
  highlights: [],
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  PHP: '#777BB4',
  Go: '#00ADD8',
  Rust: '#DEA584',
  HTML: '#E34F26',
  CSS: '#1572B6',
};

export default function AdminOpenSourcePage() {
  const [items, setItems] = useState<OpenSourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [editingItem, setEditingItem] = useState<OpenSourceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<OpenSourceItem, '_id'>>(emptyItem);
  const [tagsInput, setTagsInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter === 'published') params.set('status', 'published');
      if (statusFilter === 'draft') params.set('status', 'draft');

      const res = await fetch(`/api/admin/opensource?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load open source repositories');
      const data = await res.json();
      let repos: OpenSourceItem[] = data.repos || [];
      if (statusFilter === 'featured') {
        repos = repos.filter((r) => r.isFeatured);
      }
      setItems(repos);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search, statusFilter]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      ...emptyItem,
      displayOrder: items.length + 1,
    });
    setTagsInput('Next.js, React, Tailwind CSS');
    setHighlightsInput('');
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: OpenSourceItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      repoName: item.repoName,
      description: item.description,
      githubUrl: item.githubUrl,
      liveUrl: item.liveUrl || '',
      role: item.role,
      stars: item.stars,
      forks: item.forks,
      language: item.language,
      tags: item.tags,
      isFeatured: item.isFeatured,
      isPublished: item.isPublished,
      displayOrder: item.displayOrder,
      highlights: item.highlights || [],
    });
    setTagsInput((item.tags || []).join(', '));
    setHighlightsInput((item.highlights || []).join('\n'));
    setError(null);
    setIsModalOpen(true);
  };

  // Helper: auto-derive title, slug, and github URL from repoName if new
  const handleRepoNameChange = (val: string) => {
    const trimmed = val.trim();
    const update: Partial<typeof formData> = { repoName: val };

    if (!editingItem && trimmed) {
      const parts = trimmed.split('/');
      const repoShort = parts.length > 1 ? parts[1] : parts[0];

      if (!formData.title) {
        // e.g. "my-cool-project" -> "My Cool Project"
        update.title = repoShort
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
      }
      if (!formData.slug) {
        update.slug = repoShort.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      if (!formData.githubUrl) {
        update.githubUrl = `https://github.com/${trimmed}`;
      }
    }

    setFormData({ ...formData, ...update });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const parsedHighlights = highlightsInput
        .split('\n')
        .map((h) => h.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        tags: parsedTags,
        highlights: parsedHighlights,
      };

      const url = editingItem
        ? `/api/admin/opensource/${editingItem._id}`
        : '/api/admin/opensource';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');

      setSuccess(
        editingItem
          ? 'Repository updated successfully'
          : 'Repository published to open source section'
      );
      setIsModalOpen(false);
      fetchItems();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: OpenSourceItem) => {
    try {
      const res = await fetch(`/api/admin/opensource/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isPublished: !item.isPublished,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update visibility');
      }
      setSuccess(`Repository "${item.title}" ${!item.isPublished ? 'published' : 'hidden'}`);
      fetchItems();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleToggleFeatured = async (item: OpenSourceItem) => {
    try {
      const res = await fetch(`/api/admin/opensource/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isFeatured: !item.isFeatured,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update featured flag');
      }
      setSuccess(`Repository "${item.title}" ${!item.isFeatured ? 'marked as featured' : 'unfeatured'}`);
      fetchItems();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/opensource/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete repository');
      setDeleteConfirmId(null);
      setSuccess('Repository deleted successfully');
      fetchItems();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const totalStars = items.reduce((acc, curr) => acc + (curr.stars || 0), 0);
  const totalForks = items.reduce((acc, curr) => acc + (curr.forks || 0), 0);
  const publishedCount = items.filter((i) => i.isPublished).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFB020] uppercase tracking-wider mb-1">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Community &amp; Contributions</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[#F7F7F2]">
            Open Source Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#A7ADB2] mt-1">
            Configure public repositories, community contributions, star metrics, and showcase flags.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFB020] hover:bg-[#FFD43B] text-black font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#FFB020]/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Repository</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033]">
          <div className="text-xs text-[#737B82] uppercase tracking-wider font-mono">Repositories</div>
          <div className="text-2xl font-bold text-[#F7F7F2] font-['Outfit'] mt-1">{items.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033]">
          <div className="text-xs text-[#737B82] uppercase tracking-wider font-mono">Published</div>
          <div className="text-2xl font-bold text-emerald-400 font-['Outfit'] mt-1">{publishedCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033]">
          <div className="text-xs text-[#737B82] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>Total Stars</span>
          </div>
          <div className="text-2xl font-bold text-[#FFD43B] font-['Outfit'] mt-1">{totalStars}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#171A1C] border border-[#2B3033]">
          <div className="text-xs text-[#737B82] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5 text-blue-400" />
            <span>Total Forks</span>
          </div>
          <div className="text-2xl font-bold text-blue-400 font-['Outfit'] mt-1">{totalForks}</div>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#171A1C] p-3 rounded-2xl border border-[#2B3033]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737B82]" />
          <input
            type="text"
            placeholder="Search by repo name, title, language, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] placeholder-[#737B82] focus:outline-none focus:border-[#FFB020]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'published', 'draft', 'featured'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === filter
                  ? 'bg-[#FFB020]/20 text-[#FFD43B] border border-[#FFB020]/40'
                  : 'text-[#A7ADB2] hover:text-[#F7F7F2] hover:bg-[#202326]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Repositories Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-[#FFB020] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#A7ADB2] font-mono">Loading open source repositories...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#171A1C] border border-[#2B3033] p-8 space-y-3">
          <Code2 className="w-10 h-10 text-[#737B82] mx-auto" />
          <div className="text-sm font-semibold text-[#F7F7F2]">No open source projects found</div>
          <p className="text-xs text-[#A7ADB2] max-w-sm mx-auto">
            {search
              ? 'No repositories match your search criteria. Try a different query.'
              : 'Add your first open source repository to display it on your public portfolio.'}
          </p>
          <button
            onClick={openCreateModal}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFB020] hover:bg-[#FFD43B] text-black font-semibold text-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Repository</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className={`group p-5 rounded-2xl bg-[#171A1C] border transition-all duration-200 flex flex-col justify-between ${
                item.isPublished
                  ? 'border-[#2B3033] hover:border-[#FFB020]/50'
                  : 'border-dashed border-[#2B3033]/60 opacity-75'
              }`}
            >
              <div className="space-y-3">
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-[#FFB020] font-semibold flex items-center gap-1.5">
                        <Github className="w-3.5 h-3.5 text-[#F7F7F2]" />
                        {item.repoName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#202326] text-[#A7ADB2] border border-[#2B3033]">
                        {item.role}
                      </span>
                      {item.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#FFB020]/15 text-[#FFD43B] border border-[#FFB020]/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-[#F7F7F2] font-['Outfit']">
                      {item.title}
                    </h3>
                  </div>

                  {/* Actions Dropdown / Quick Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleTogglePublish(item)}
                      title={item.isPublished ? 'Unpublish' : 'Publish'}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        item.isPublished
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                          : 'border-[#2B3033] text-[#737B82] hover:text-[#F7F7F2] hover:bg-[#202326]'
                      }`}
                    >
                      {item.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(item)}
                      title={item.isFeatured ? 'Remove from Featured' : 'Mark as Featured'}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        item.isFeatured
                          ? 'border-[#FFB020]/40 text-[#FFD43B] bg-[#FFB020]/15'
                          : 'border-[#2B3033] text-[#737B82] hover:text-[#FFB020] hover:bg-[#202326]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5" fill={item.isFeatured ? '#FFD43B' : 'none'} />
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg border border-[#2B3033] text-[#A7ADB2] hover:text-[#F7F7F2] hover:bg-[#202326] transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item._id)}
                      className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#A7ADB2] leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Metrics & Language */}
                <div className="flex items-center gap-4 text-xs font-mono text-[#737B82] pt-1">
                  <div className="flex items-center gap-1.5 text-[#F7F7F2]">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: LANGUAGE_COLORS[item.language] || '#FFB020' }}
                    />
                    <span>{item.language}</span>
                  </div>

                  <div className="flex items-center gap-1 hover:text-[#FFD43B] transition-colors">
                    <Star className="w-3.5 h-3.5 text-[#FFB020]" />
                    <span>{item.stars}</span>
                  </div>

                  <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <GitFork className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.forks}</span>
                  </div>

                  <span className="text-[11px] text-[#737B82] ml-auto">
                    Order: #{item.displayOrder}
                  </span>
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#0B0D0E] text-[10px] font-mono text-[#A7ADB2] border border-[#2B3033]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Links Footer */}
              <div className="pt-4 mt-3 border-t border-[#2B3033] flex items-center justify-between text-xs">
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#A7ADB2] hover:text-[#F7F7F2] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#737B82]" />
                </a>

                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#FFB020] hover:text-[#FFD43B] transition-colors font-medium"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-[#737B82]">No demo URL</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#171A1C] border border-[#2B3033] rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-[#F7F7F2]">Delete Open Source Project?</h3>
            </div>
            <p className="text-xs text-[#A7ADB2]">
              Are you sure you want to remove this repository? It will be removed from your public portfolio and admin console. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A7ADB2] hover:text-[#F7F7F2] hover:bg-[#202326] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
              >
                Delete Repository
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-[#171A1C] border border-[#2B3033] rounded-2xl p-6 space-y-5 my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#2B3033] pb-4">
              <div>
                <h2 className="text-lg font-bold font-['Outfit'] text-[#F7F7F2]">
                  {editingItem ? 'Edit Open Source Repository' : 'Add Open Source Repository'}
                </h2>
                <p className="text-xs text-[#A7ADB2]">
                  Configure repository metrics, GitHub link, language, and display settings.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#202326] text-[#737B82] hover:text-[#F7F7F2] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Row 1: Repository Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                    Repository Name <span className="text-[#FFB020]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. hussnain-143/portfolio"
                    value={formData.repoName}
                    onChange={(e) => handleRepoNameChange(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] font-mono focus:outline-none focus:border-[#FFB020]"
                  />
                  <span className="text-[10px] text-[#737B82] mt-0.5 block">
                    Format: username/repository (autofills title and GitHub link)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as 'Author' | 'Maintainer' | 'Contributor',
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                  >
                    <option value="Author">Author</option>
                    <option value="Maintainer">Maintainer</option>
                    <option value="Contributor">Contributor</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                    Showcase Title <span className="text-[#FFB020]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Developer Portfolio CMS"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                    Slug <span className="text-[#FFB020]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. developer-portfolio-cms"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] font-mono focus:outline-none focus:border-[#FFB020]"
                  />
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                  Description <span className="text-[#FFB020]">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Short summary of what this repository accomplishes and why it matters..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020] resize-none"
                />
              </div>

              {/* Row 4: URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                    GitHub URL <span className="text-[#FFB020]">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                    Live Demo / Docs URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                  />
                </div>
              </div>

              {/* Row 5: Metrics (Stars, Forks, Language, Display Order) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">Stars</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stars}
                    onChange={(e) =>
                      setFormData({ ...formData, stars: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] font-mono focus:outline-none focus:border-[#FFB020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">Forks</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.forks}
                    onChange={(e) =>
                      setFormData({ ...formData, forks: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] font-mono focus:outline-none focus:border-[#FFB020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">Language</label>
                  <input
                    type="text"
                    placeholder="e.g. TypeScript"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] font-mono focus:outline-none focus:border-[#FFB020]"
                  />
                </div>
              </div>

              {/* Row 6: Tags */}
              <div>
                <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                  Technology Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, React, Tailwind CSS, MongoDB"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020]"
                />
              </div>

              {/* Row 7: Highlights (One per line) */}
              <div>
                <label className="block text-xs font-semibold text-[#A7ADB2] mb-1">
                  Key Highlights / Bullets (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Next.js 16 App Router architecture&#10;Custom dark-mode CMS with JWT authentication&#10;99+ Lighthouse performance score"
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0B0D0E] border border-[#2B3033] text-xs text-[#F7F7F2] focus:outline-none focus:border-[#FFB020] resize-none font-mono"
                />
              </div>

              {/* Row 8: Checkboxes */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FFB020] bg-[#0B0D0E] border-[#2B3033] focus:ring-[#FFB020]"
                  />
                  <span className="text-xs text-[#F7F7F2] font-medium">Published (Visible on site)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FFB020] bg-[#0B0D0E] border-[#2B3033] focus:ring-[#FFB020]"
                  />
                  <span className="text-xs text-[#F7F7F2] font-medium">
                    Featured on Home Page
                  </span>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2B3033]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A7ADB2] hover:text-[#F7F7F2] hover:bg-[#202326] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFB020] hover:bg-[#FFD43B] text-black font-semibold text-xs transition-all shadow-lg shadow-[#FFB020]/20 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>{editingItem ? 'Save Changes' : 'Publish Repository'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
