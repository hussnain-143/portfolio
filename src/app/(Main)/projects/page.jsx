import React from 'react'
import Projects from '@/components/Sections/project/Project'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Projects',
  description: 'Explore my featured web development projects including e-commerce platforms, React applications, Next.js websites, and WordPress solutions. View live demos and source code.',
  keywords: [
    'Web Development Projects',
    'React Projects',
    'Next.js Projects',
    'E-commerce Development',
    'Portfolio Projects',
    'Web Applications',
    'JavaScript Projects',
    'Full Stack Projects',
    'Rosy Garden',
    'E.Store',
    'Finance Tracker',
  ],
  openGraph: {
    title: 'Featured Projects - Hussnain Ahmed',
    description: 'Explore innovative web development projects built with React, Next.js, and modern technologies.',
    url: `${siteUrl}/projects`,
    images: [`${siteUrl}/project/rosy-garden.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Featured Projects - Hussnain Ahmed',
    description: 'Explore innovative web development projects built with modern technologies.',
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
};

const ProjectPage = () => {
  return (
    <>
      <Projects/>
    </>
  )
}

export default ProjectPage