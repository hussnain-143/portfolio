import React from 'react'
import Home from '@/components/Sections/Home/Home'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Home',
  description: 'Hire Hussnain Ahmed - Expert Full Stack Web Developer specializing in React, Next.js, WordPress, PHP, and modern web technologies. Professional portfolio showcasing innovative projects, technical expertise, and proven experience. Available for freelance, remote, and full-time opportunities. Based in Islamabad, Pakistan.',
  keywords: [
    'Hire Full Stack Developer',
    'Hire React Developer',
    'Hire Web Developer',
    'Full Stack Developer Portfolio',
    'React Developer Portfolio',
    'Web Developer Portfolio',
    'Freelance Web Developer',
    'Remote Web Developer',
    'Web Developer for Hire',
    'Full Stack Developer Pakistan',
    'React Developer Pakistan',
    'WordPress Developer Pakistan',
    'Web Developer Islamabad',
    'Professional Web Developer',
    'Experienced Web Developer',
    'MERN Stack Developer',
    'Next.js Developer',
    'WordPress Developer',
    'E-commerce Developer',
    'Custom Web Development',
  ],
  openGraph: {
    title: 'Hussnain Ahmed - Full Stack Developer Portfolio | Hire React & Next.js Expert',
    description: 'Expert Full Stack Web Developer specializing in React, Next.js, WordPress, PHP, and modern web technologies. Available for hire - freelance, remote, and full-time opportunities.',
    url: siteUrl,
    images: [`${siteUrl}/profile/image.jpg`],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hussnain Ahmed - Full Stack Developer Portfolio',
    description: 'Expert Full Stack Web Developer | React, Next.js, WordPress, PHP | Available for Hire',
    images: [`${siteUrl}/profile/image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const page = () => {
  return (
    <>
      <Home/>
    </>
  )
}

export default page