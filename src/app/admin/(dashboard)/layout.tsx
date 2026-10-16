import React from 'react';
import { getCurrentAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Portfolio Studio | Hussnain Ahmed Admin CMS',
  description: 'Manage projects, profile, skills, experience, education, and contact inquiries',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  return <AdminShell admin={admin}>{children}</AdminShell>;
}
