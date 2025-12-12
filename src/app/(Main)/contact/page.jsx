import React from 'react'
import Contact from '@/components/Sections/Contact/Contact'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Contact - Hire Full Stack Developer | Get in Touch',
  description: 'Contact Hussnain Ahmed for web development projects, collaborations, or inquiries. Available for freelance work, remote positions, full-time opportunities, and consulting services. Specializing in React, Next.js, WordPress, and full-stack development. Based in Islamabad, Pakistan. Quick response guaranteed.',
  keywords: [
    'Contact Developer',
    'Hire Web Developer',
    'Hire Full Stack Developer',
    'Hire React Developer',
    'Hire Next.js Developer',
    'Hire WordPress Developer',
    'Freelance Developer',
    'Freelance Web Developer',
    'Remote Web Developer',
    'Web Development Services',
    'Contact Hussnain Ahmed',
    'Developer Contact',
    'Web Developer Pakistan',
    'React Developer Contact',
    'Full Stack Developer Contact',
    'Hire Developer Pakistan',
    'Web Developer for Hire',
    'Freelance Web Development',
    'Remote Development Services',
    'Web Development Consultation',
    'Developer Availability',
    'Contact Web Developer',
    'Hire Remote Developer',
    'Freelance React Developer',
    'Freelance Next.js Developer',
    'WordPress Development Services',
    'React Development Services',
    'Full Stack Development Services',
    'Web Developer Islamabad',
    'Developer Contact Information',
  ],
  openGraph: {
    title: 'Contact - Hussnain Ahmed',
    description: 'Get in touch for web development projects, collaborations, or inquiries. Available for freelance and full-time opportunities.',
    url: `${siteUrl}/contact`,
    images: [`${siteUrl}/profile/image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Hussnain Ahmed',
    description: 'Get in touch for web development projects and collaborations.',
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

const ContactPage = () => {
  return (
    <>
        <Contact/>
    </>
  )
}

export default ContactPage