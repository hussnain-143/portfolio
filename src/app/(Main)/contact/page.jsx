import React from 'react'
import Contact from '@/components/Sections/Contact/Contact'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Hussnain Ahmed for web development projects, collaborations, or inquiries. Available for freelance work, full-time positions, and consulting opportunities. Located in Islamabad, Pakistan.',
  keywords: [
    'Contact Developer',
    'Hire Web Developer',
    'Freelance Developer',
    'Web Development Services',
    'Contact Hussnain Ahmed',
    'Developer Contact',
    'Web Developer Pakistan',
    'React Developer Contact',
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