import './globals.css';
import React from 'react';
import { Inter, Outfit } from 'next/font/google';
import { SITE_URL } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Hussnain Ahmed',
    default: 'Hussnain Ahmed — Full-Stack Developer & Next.js Specialist',
  },
  description:
    'Portfolio of Hussnain Ahmed: Expert Full-Stack Web Developer specializing in React, Next.js, Node.js, and WordPress. Available for freelance, remote, and full-time opportunities in Islamabad, Pakistan.',
  keywords: [
    'Hussnain Ahmed',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'WordPress Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'MERN Stack Developer',
    'Portfolio',
    'Islamabad Web Developer',
    'Pakistan Web Developer',
  ],
  authors: [{ name: 'Hussnain Ahmed' }],
  creator: 'Hussnain Ahmed',
  publisher: 'Hussnain Ahmed',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Hussnain Ahmed — Full-Stack Developer Portfolio',
    title: 'Hussnain Ahmed — Full-Stack Developer & Next.js Specialist',
    description:
      'Portfolio of Hussnain Ahmed: Full-Stack Developer crafting fast, scalable, and user-centric web applications with React, Next.js, Node.js, and WordPress.',
    images: [
      {
        url: `${SITE_URL}/profile/image.jpg`,
        width: 1200,
        height: 1200,
        alt: 'Hussnain Ahmed - Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hussnain Ahmed — Full-Stack Developer',
    description:
      'Full-Stack Developer | React, Next.js, Node.js, WordPress | Available for freelance & remote opportunities.',
    images: [`${SITE_URL}/profile/image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/logo-symbol.svg',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-[#0B0D0E] text-[#F7F7F2] antialiased selection:bg-[#FFB020]/20 selection:text-[#FFD43B]"
      >
        {children}
      </body>
    </html>
  );
}
