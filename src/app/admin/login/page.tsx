'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--admin-bg,#0B0D0E)] flex items-center justify-center p-6 text-[var(--admin-text-primary,#F4F4F5)] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#FFB020]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFB020]/15 border border-[#FFB020]/30 text-[#FFB020] mb-4 shadow-lg shadow-[#FFB020]/10 font-bold font-['Outfit'] text-lg">
            HA
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text-primary,#F4F4F5)] font-['Outfit']">
            Portfolio Studio CMS
          </h1>
          <p className="text-xs text-[var(--admin-text-secondary,#A1A1AA)] mt-1.5 font-sans">
            Authenticated administrator access for Hussnain Ahmed
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--admin-surface,#141719)] border border-[var(--admin-border,#292D30)] p-7 md:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary,#A1A1AA)] mb-1.5 font-mono">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--admin-text-secondary,#A1A1AA)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@hussnain.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--admin-elevated,#1C2022)] border border-[var(--admin-border,#292D30)] text-xs text-[var(--admin-text-primary,#F4F4F5)] placeholder-[var(--admin-text-secondary,#A1A1AA)] focus:outline-none focus:border-[#FFB020] font-mono transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--admin-text-secondary,#A1A1AA)] mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--admin-text-secondary,#A1A1AA)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[var(--admin-elevated,#1C2022)] border border-[var(--admin-border,#292D30)] text-xs text-[var(--admin-text-primary,#F4F4F5)] placeholder-[var(--admin-text-secondary,#A1A1AA)] focus:outline-none focus:border-[#FFB020] font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-secondary,#A1A1AA)] hover:text-[#FFB020] transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 rounded-xl font-bold text-xs text-[#0B0D0E] bg-[var(--admin-accent,#FFB020)] hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0B0D0E]/30 border-t-[#0B0D0E] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-[var(--admin-border,#292D30)] text-center">
            <Link
              href="/"
              className="text-xs text-[var(--admin-text-secondary,#A1A1AA)] hover:text-[#FFB020] transition-colors font-medium"
            >
              ← Back to public portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
