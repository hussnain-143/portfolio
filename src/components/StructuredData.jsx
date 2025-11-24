'use client'
import React from 'react'

const StructuredData = ({ type = 'home' }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

  // Person Schema for Home/About pages
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hussnain Ahmed',
    jobTitle: 'Full Stack Web Developer',
    description: 'Passionate full-stack developer specializing in React, Next.js, WordPress, PHP, and modern web technologies.',
    url: siteUrl,
    image: `${siteUrl}/profile/image.jpg`,
    email: 'hussnain.ahmed.dev@gmail.com',
    telephone: '+92 340 6999701',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    sameAs: [
      // Add your social media profiles here
      // 'https://github.com/hussnain-143',
      // 'https://linkedin.com/in/hussnain-ahmed',
      // 'https://twitter.com/hussnain_ahmed',
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'JavaScript',
      'WordPress',
      'PHP',
      'Node.js',
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'E-commerce Development',
      'RESTful APIs',
      'MySQL',
      'MongoDB',
      'Tailwind CSS',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Your University/College', // Update with actual education details
    },
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Hussnain Ahmed's Portfolio",
    url: siteUrl,
    description: 'Full Stack Web Developer Portfolio showcasing projects, skills, and professional experience.',
    author: {
      '@type': 'Person',
      name: 'Hussnain Ahmed',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/projects?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Portfolio Schema
  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${siteUrl}/#portfolio`,
    name: "Hussnain Ahmed's Portfolio",
    description: 'A collection of web development projects and professional work by Hussnain Ahmed.',
    creator: {
      '@type': 'Person',
      name: 'Hussnain Ahmed',
    },
    url: siteUrl,
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      ...(type !== 'home' ? [
        {
          '@type': 'ListItem',
          position: 2,
          name: type.charAt(0).toUpperCase() + type.slice(1),
          item: `${siteUrl}/${type}`,
        },
      ] : []),
    ],
  };

  const schemas = [];

  if (type === 'home' || type === 'about') {
    schemas.push(personSchema);
  }

  if (type === 'home') {
    schemas.push(websiteSchema);
    schemas.push(portfolioSchema);
  }

  schemas.push(breadcrumbSchema);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;

