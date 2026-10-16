import React from 'react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Admin Sign In | Hussnain Ahmed Portfolio CMS',
  description: 'Administrative portal sign in.',
  path: '/admin/login',
  noIndex: true,
});

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
