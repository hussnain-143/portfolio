import React from 'react'
import About from '@/components/Sections/About/About'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'About Me',
  description: 'Learn about Hussnain Ahmed - a passionate full-stack developer with expertise in React, Next.js, WordPress, PHP, and modern web technologies. View my education, work experience, and professional certifications.',
  keywords: [
    'Hussnain Ahmed',
    'About Developer',
    'Web Developer Background',
    'Full Stack Developer Experience',
    'Developer Education',
    'Developer Certifications',
    'WordPress Developer',
    'React Developer',
  ],
  openGraph: {
    title: 'About Me - Hussnain Ahmed',
    description: 'Learn about Hussnain Ahmed - a passionate full-stack developer with expertise in modern web technologies.',
    url: `${siteUrl}/about`,
    images: [`${siteUrl}/profile/image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me - Hussnain Ahmed',
    description: 'Learn about my background, education, and professional experience as a full-stack developer.',
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const AboutPage = () => {
  return (
    <>
        <About/>
    </>
  )
}

export default AboutPage