'use client'
import React from 'react'

const StructuredData = ({ type = 'home' }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hussnain Ahmed',
    alternateName: 'Hussnain Ahmed Developer',
    jobTitle: 'Full Stack Web Developer',
    description: 'Expert Full Stack Web Developer specializing in React, Next.js, WordPress, PHP, and modern web technologies. Available for freelance, remote, and full-time opportunities.',
    url: siteUrl,
    image: `${siteUrl}/profile/image.jpg`,
    email: 'hussnain.ahmed.dev@gmail.com',
    telephone: '+92 340 6999701',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Islamabad',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      postalCode: '44000',
      addressCountry: 'PK',
    },
    sameAs: [],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'React',
      'React.js',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'WordPress',
      'WordPress Development',
      'PHP',
      'Node.js',
      'Express.js',
      'Frontend Development',
      'Backend Development',
      'E-commerce Development',
      'RESTful APIs',
      'GraphQL',
      'MySQL',
      'MongoDB',
      'PostgreSQL',
      'Tailwind CSS',
      'CSS3',
      'HTML5',
      'MERN Stack',
      'MEAN Stack',
      'Custom WordPress Themes',
      'WordPress Plugin Development',
      'Responsive Web Design',
      'Progressive Web Apps',
      'Single Page Applications',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Your University/College',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance Web Developer',
    },
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        serviceType: 'Web Development',
        description: 'Full Stack Web Development Services including React, Next.js, WordPress, and custom web applications',
      },
    },
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Hussnain Ahmed - Full Stack Developer Portfolio",
    alternateName: "Hussnain Ahmed Portfolio",
    url: siteUrl,
    description: 'Expert Full Stack Web Developer Portfolio showcasing React, Next.js, WordPress projects, technical skills, and professional experience. Available for hire.',
    author: {
      '@type': 'Person',
      name: 'Hussnain Ahmed',
    },
    publisher: {
      '@type': 'Person',
      name: 'Hussnain Ahmed',
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/projects?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hussnain Ahmed - Web Development Services',
    url: siteUrl,
    logo: `${siteUrl}/profile/image.jpg`,
    description: 'Professional Full Stack Web Development Services specializing in React, Next.js, WordPress, and modern web technologies.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-340-6999701',
      contactType: 'Customer Service',
      email: 'hussnain.ahmed.dev@gmail.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    sameAs: [
      // Add your social media profiles here
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development Services',
    name: 'Full Stack Web Development Services',
    description: 'Professional web development services including React, Next.js, WordPress development, custom web applications, e-commerce solutions, and full-stack development.',
    provider: {
      '@type': 'Person',
      name: 'Hussnain Ahmed',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'React Development',
            description: 'Custom React.js and Next.js web application development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WordPress Development',
            description: 'Custom WordPress themes, plugins, and website development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Stack Development',
            description: 'Complete full-stack web application development with React, Node.js, and databases',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Development',
            description: 'Custom e-commerce platform development and integration',
          },
        },
      ],
    },
  };

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
    schemas.push(organizationSchema);
    schemas.push(serviceSchema);
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


