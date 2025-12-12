import React from 'react'
import About from '@/components/Sections/About/About'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'About Me - Full Stack Developer Background & Experience',
  description: 'Learn about Hussnain Ahmed - Expert Full Stack Web Developer with extensive experience in React, Next.js, WordPress, PHP, and modern web technologies. View education, professional work experience, technical certifications, and career journey. Based in Islamabad, Pakistan.',
  keywords: [
    'Hussnain Ahmed',
    'About Full Stack Developer',
    'Web Developer Background',
    'Full Stack Developer Experience',
    'Developer Education',
    'Developer Certifications',
    'WordPress Developer Experience',
    'React Developer Experience',
    'Full Stack Developer Resume',
    'Web Developer Biography',
    'Developer Career',
    'Professional Developer Background',
    'Experienced Web Developer',
    'Senior Web Developer',
    'Full Stack Developer Skills',
    'Web Developer Qualifications',
    'Developer Portfolio About',
    'React Developer Background',
    'Next.js Developer Experience',
    'WordPress Developer Profile',
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