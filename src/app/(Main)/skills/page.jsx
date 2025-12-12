import React from 'react'
import Skills from '@/components/Sections/Skills/Skills'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Technical Skills & Expertise - Full Stack Developer Technologies',
  description: 'Comprehensive technical skills and expertise: Frontend Development (React, Next.js, JavaScript, TypeScript, Tailwind CSS), Backend Development (PHP, Node.js, Express.js, MySQL, MongoDB), WordPress Ecosystem (Custom Themes, Plugins, Elementor), and modern development tools. View detailed proficiency levels and technology stack.',
  keywords: [
    'React Skills',
    'Next.js Skills',
    'JavaScript Skills',
    'TypeScript Skills',
    'PHP Development Skills',
    'WordPress Development Skills',
    'Frontend Development Skills',
    'Backend Development Skills',
    'Full Stack Skills',
    'Web Development Technologies',
    'Programming Skills',
    'Node.js Skills',
    'Express.js Skills',
    'MongoDB Skills',
    'MySQL Skills',
    'PostgreSQL Skills',
    'Tailwind CSS Skills',
    'Elementor Skills',
    'React Developer Skills',
    'Next.js Developer Skills',
    'WordPress Developer Skills',
    'Full Stack Developer Skills',
    'MERN Stack Skills',
    'MEAN Stack Skills',
    'Web Development Stack',
    'Developer Technical Skills',
    'Programming Languages',
    'Web Frameworks',
    'Database Skills',
    'API Development Skills',
    'RESTful API Skills',
    'GraphQL Skills',
    'Frontend Frameworks',
    'Backend Frameworks',
    'CSS Frameworks',
    'Version Control Skills',
    'Git Skills',
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
