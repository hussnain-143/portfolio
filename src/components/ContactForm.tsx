'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Spam trap for bots
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to deliver message');
      }

      setSuccessMessage(
        data.message || 'Thank you! Your inquiry has been sent and saved to my inbox.'
      );
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-[#171A1C] border border-[#2B3033] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {successMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot field (hidden from real users, filled by bots) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Do not fill this</label>
          <input
            id="website_url"
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#A7ADB2] mb-2 font-mono-code">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="w-full px-4 py-3 rounded-xl bg-[#111416] border border-[#2B3033] text-[#F7F7F2] placeholder-[#737B82] text-xs focus:outline-none focus:border-[#FFB020] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#A7ADB2] mb-2 font-mono-code">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              className="w-full px-4 py-3 rounded-xl bg-[#111416] border border-[#2B3033] text-[#F7F7F2] placeholder-[#737B82] text-xs focus:outline-none focus:border-[#FFB020] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#A7ADB2] mb-2 font-mono-code">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Next.js Web App Project Inquiry"
            className="w-full px-4 py-3 rounded-xl bg-[#111416] border border-[#2B3033] text-[#F7F7F2] placeholder-[#737B82] text-xs focus:outline-none focus:border-[#FFB020] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#A7ADB2] mb-2 font-mono-code">
            Your Message *
          </label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell me about your project, timeline, and goals..."
            className="w-full px-4 py-3 rounded-xl bg-[#111416] border border-[#2B3033] text-[#F7F7F2] placeholder-[#737B82] text-xs focus:outline-none focus:border-[#FFB020] transition-all resize-none leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD43B] via-[#FFB020] to-[#FF8A24] text-[#0B0D0E] font-bold text-xs tracking-wide shadow-lg shadow-[#FFB020]/20 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
