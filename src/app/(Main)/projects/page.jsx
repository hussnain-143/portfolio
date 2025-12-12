import React from 'react'
import Projects from '@/components/Sections/project/Project'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Web Development Projects - React, Next.js & WordPress Portfolio',
  description: 'Explore featured web development projects by Hussnain Ahmed including e-commerce platforms, React applications, Next.js websites, WordPress solutions, and full-stack applications. View live demos, case studies, source code, and project details showcasing technical expertise and innovative solutions.',
  keywords: [
    'Web Development Projects',
    'React Projects',
    'Next.js Projects',
    'E-commerce Development',
    'Portfolio Projects',
    'Web Applications',
    'JavaScript Projects',
    'Full Stack Projects',
    'React Portfolio Projects',
    'Next.js Portfolio Projects',
    'WordPress Projects',
    'E-commerce Websites',
    'Custom Web Applications',
    'React Web Apps',
    'Next.js Web Apps',
    'Full Stack Applications',
    'MERN Stack Projects',
    'Web Development Case Studies',
    'Developer Portfolio Projects',
    'Professional Web Projects',
    'Rosy Garden',
    'E.Store',
    'Finance Tracker',
    'React E-commerce',
    'Next.js E-commerce',
    'WordPress E-commerce',
    'Custom WordPress Development',
    'React Development Examples',
    'Next.js Development Examples',
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