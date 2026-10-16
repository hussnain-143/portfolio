'use client';

import React, { useEffect, useState } from 'react';
import {
  Mail,
  Search,
  Trash2,
  Archive,
  X,
  AlertCircle,
  RefreshCw,
  Clock,
  Send,
  User,
  ShieldAlert,
  CheckCircle2,
  Inbox,
} from 'lucide-react';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [search, setSearch] = useState('');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/messages?filter=${filter}`);
      if (!res.ok) throw new Error('Failed to load messages');
      const data = await res.json();
      setMessages(data.messages || []);
      // Auto-select first message if desktop and none selected
      if (!activeMessage && data.messages && data.messages.length > 0) {
        setActiveMessage(data.messages[0]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const toggleRead = async (msg: ContactMessage) => {
    try {
      await fetch(`/api/admin/messages/${msg._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !msg.isRead }),
      });
      fetchMessages();
      if (activeMessage?._id === msg._id) {
        setActiveMessage({ ...activeMessage, isRead: !msg.isRead });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleArchive = async (msg: ContactMessage) => {
    try {
      await fetch(`/api/admin/messages/${msg._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: !msg.isArchived }),
      });
      fetchMessages();
      if (activeMessage?._id === msg._id) setActiveMessage(null);
      setSuccess(msg.isArchived ? 'Message restored' : 'Message moved to archive');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete message');
      setDeleteConfirmId(null);
      if (activeMessage?._id === id) setActiveMessage(null);
      setSuccess('Message permanently deleted');
      fetchMessages();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.subject && m.subject.toLowerCase().includes(q)) ||
      m.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] tracking-tight text-[#F7F7F2]">
            Contact Inbox
          </h1>
          <p className="text-sm text-[#A7ADB2] mt-1">
            Private client submissions and project inquiries received through your portfolio
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/40 text-xs font-medium text-[#F7F7F2] transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#FFB020]" />
          <span>Refresh Inbox</span>
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

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#737B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sender, email, or message..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#171A1C] border border-[#2B3033] text-xs text-[#F7F7F2] placeholder-[#737B82] focus:outline-none focus:border-[#FFB020] transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#171A1C] border border-[#2B3033] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#FFB020] text-black shadow-sm'
                : 'text-[#A7ADB2] hover:text-[#F7F7F2]'
            }`}
          >
            Active Inquiries
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'unread'
                ? 'bg-[#FFB020] text-black shadow-sm'
                : 'text-[#A7ADB2] hover:text-[#F7F7F2]'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'archived'
                ? 'bg-[#FFB020] text-black shadow-sm'
                : 'text-[#A7ADB2] hover:text-[#F7F7F2]'
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      {/* =========================================================================
          SAAS SPLIT-VIEW INBOX
          ========================================================================= */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#FFB020] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-16 text-center text-[#737B82] space-y-3">
          <Inbox className="w-10 h-10 mx-auto text-[#737B82]" />
          <h3 className="text-sm font-semibold text-[#F7F7F2]">Inbox is Clear</h3>
          <p className="text-xs max-w-sm mx-auto">
            No inquiries match your current filter. When visitors submit the portfolio contact form, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Message List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredMessages.map((msg) => {
              const isSelected = activeMessage?._id === msg._id;
              const initials = msg.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase() || 'U';

              return (
                <div
                  key={msg._id}
                  onClick={() => {
                    setActiveMessage(msg);
                    if (!msg.isRead) toggleRead(msg);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-[#FFB020]/10 border-[#FFB020]/60 shadow-md'
                      : msg.isRead
                      ? 'bg-[#171A1C] border-[#2B3033] hover:border-[#3F464B]'
                      : 'bg-[#FFB020]/5 border-[#FFB020]/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Avatar + Sender Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFD43B] to-[#FF8A24] text-black font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-[#F7F7F2] truncate flex items-center gap-2">
                          <span>{msg.name}</span>
                          {!msg.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#FFD43B] shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-[#A7ADB2] truncate">{msg.email}</div>
                      </div>
                    </div>

                    <span className="text-[10px] text-[#737B82] font-mono-code shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Subject */}
                  <div className="text-xs font-semibold text-[#FFB020] mt-2.5 truncate">
                    {msg.subject || 'Portfolio Inquiry'}
                  </div>

                  {/* Preview snippet */}
                  <p className="text-xs text-[#A7ADB2] line-clamp-2 mt-1 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed View Pane (7 cols) */}
          <div className="lg:col-span-7">
            {activeMessage ? (
              <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-6 sm:p-8 space-y-6 sticky top-24">
                {/* Header: Sender details */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#2B3033] pb-5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFD43B] to-[#FF8A24] text-black font-bold text-base flex items-center justify-center shrink-0 shadow-md">
                      {activeMessage.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase() || 'U'}
                    </div>

                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#F7F7F2] font-['Outfit']">
                        {activeMessage.name}
                      </h2>
                      <div className="text-xs text-[#A7ADB2] flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-[#FFB020]" />
                        <span className="text-[#F7F7F2] font-medium">{activeMessage.email}</span>
                      </div>
                      <div className="text-[10px] text-[#737B82] font-mono-code mt-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(activeMessage.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono-code px-2.5 py-1 rounded-full font-semibold ${
                        activeMessage.isRead
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-[#FFB020]/15 text-[#FFD43B] border border-[#FFB020]/30'
                      }`}
                    >
                      {activeMessage.isRead ? 'Read' : 'New Unread'}
                    </span>
                    {activeMessage.isArchived && (
                      <span className="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-white/5 text-[#A7ADB2] border border-[#2B3033]">
                        Archived
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject title */}
                <div>
                  <span className="text-[10px] text-[#737B82] font-mono-code uppercase tracking-wider block">
                    Inquiry Subject
                  </span>
                  <div className="text-sm font-bold text-[#F7F7F2] mt-0.5">
                    {activeMessage.subject || 'Portfolio Inquiry'}
                  </div>
                </div>

                {/* Message Canvas */}
                <div className="rounded-2xl bg-[#111416] border border-[#2B3033] p-5 text-xs text-[#F7F7F2] leading-relaxed whitespace-pre-wrap font-sans">
                  {activeMessage.message}
                </div>

                {/* Action Bar */}
                <div className="pt-4 border-t border-[#2B3033] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(activeMessage)}
                      className="px-3.5 py-2 rounded-xl bg-[#202326] hover:bg-[#2B3033] text-xs text-[#F7F7F2] transition-colors cursor-pointer"
                    >
                      {activeMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    </button>

                    <button
                      onClick={() => toggleArchive(activeMessage)}
                      className="px-3.5 py-2 rounded-xl bg-[#202326] hover:bg-[#2B3033] text-xs text-[#F7F7F2] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Archive className="w-3.5 h-3.5 text-[#A7ADB2]" />
                      <span>{activeMessage.isArchived ? 'Restore' : 'Archive'}</span>
                    </button>

                    {deleteConfirmId === activeMessage._id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleDelete(activeMessage._id)}
                          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1.5 rounded-xl bg-white/10 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(activeMessage._id)}
                        className="p-2 rounded-xl text-[#737B82] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Mailto Reply */}
                  <a
                    href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(
                      activeMessage.subject || 'Portfolio Inquiry'
                    )}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-black font-bold text-xs shadow-md shadow-[#FFB020]/20 hover:scale-105 transition-all"
                  >
                    <span>Reply via Email</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#171A1C] border border-[#2B3033] p-16 text-center text-[#737B82] text-xs">
                Select an inquiry from the list to view its full details and reply.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
