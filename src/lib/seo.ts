import { Metadata } from 'next';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app'
).replace(/\/+$/, '');

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

export interface ConstructMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'profile';
}

/**
 * Centralized, standardized Next.js Metadata generator
 * Ensures exact canonical URLs, openGraph, Twitter card, and search crawler controls.
 */
export function constructMetadata({
  title = 'Hussnain Ahmed — Full-Stack Developer & Next.js Specialist',
  description = 'Portfolio of Hussnain Ahmed: Full-Stack & Front-End Developer specializing in React, Next.js, TypeScript, Node.js, and modern UI engineering.',
  path = '',
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = 'website',
}: ConstructMetadataOptions = {}): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  const resolvedImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Hussnain Ahmed Portfolio',
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedImage],
      creator: '@hussnain143',
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          'max-video-preview': -1,
          'max-image-preview': 'none',
          'max-snippet': -1,
        },
      },
    }),
  };
}
