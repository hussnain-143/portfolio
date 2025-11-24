import React from 'react'
import Home from '@/components/Sections/Home/Home'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Hussnain Ahmed\'s portfolio. Full-stack web developer specializing in React, Next.js, WordPress, and modern web technologies. Explore my projects, skills, and professional experience.',
  openGraph: {
    title: 'Hussnain Ahmed - Full Stack Developer Portfolio',
    description: 'Passionate full-stack developer crafting beautiful, scalable web experiences with React, Next.js, WordPress, and modern technologies.',
    url: siteUrl,
    images: [`${siteUrl}/profile/image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hussnain Ahmed - Full Stack Developer Portfolio',
    description: 'Passionate full-stack developer crafting beautiful, scalable web experiences.',
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