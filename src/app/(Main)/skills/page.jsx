import React from 'react'
import Skills from '@/components/Sections/Skills/Skills'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Skills & Expertise',
  description: 'Technical expertise in Frontend Development (React, Next.js, JavaScript, Tailwind CSS), Backend Development (PHP, Node.js, MySQL, MongoDB), WordPress Ecosystem, and modern development tools.',
  keywords: [
    'React Skills',
    'Next.js Skills',
    'JavaScript Skills',
    'PHP Development',
    'WordPress Development',
    'Frontend Development',
    'Backend Development',
    'Full Stack Skills',
    'Web Development Technologies',
    'Programming Skills',
    'Node.js',
    'MongoDB',
    'MySQL',
    'Tailwind CSS',
    'Elementor',
  ],
  openGraph: {
    title: 'Skills & Expertise - Hussnain Ahmed',
    description: 'Technical expertise in Frontend, Backend, WordPress, and modern web development technologies.',
    url: `${siteUrl}/skills`,
    images: [`${siteUrl}/profile/image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills & Expertise - Hussnain Ahmed',
    description: 'Technical expertise in modern web development technologies.',
  },
  alternates: {
    canonical: `${siteUrl}/skills`,
  },
};

const SkillsPage = () => {
  return (
    <>
        <Skills/>
    </>
  )
}

export default SkillsPage
