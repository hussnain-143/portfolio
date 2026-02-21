import "./globals.css";
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Hussnain Ahmed - Full Stack Developer",
    default: "Hussnain Ahmed - Full Stack Developer & WordPress Specialist | Hire React & Next.js Expert",
  },
  description: "Hire Hussnain Ahmed - Expert Full Stack Web Developer specializing in React, Next.js, WordPress, PHP, and modern web technologies. Professional portfolio showcasing innovative projects, technical skills, and proven experience. Available for freelance, remote, and full-time opportunities in Islamabad, Pakistan.",
  keywords: [
    // Primary Keywords
    "Hussnain Ahmed",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "WordPress Developer",
    "PHP Developer",

    // High-Intent Keywords
    "Hire Full Stack Developer",
    "Hire React Developer",
    "Hire Web Developer",
    "Freelance Web Developer",
    "Remote Web Developer",
    "Web Developer for Hire",
    "Full Stack Developer Pakistan",
    "React Developer Pakistan",
    "WordPress Developer Pakistan",
    "Web Developer Islamabad",

    // Technical Keywords
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    "MEAN Stack Developer",
    "E-commerce Developer",
    "Custom WordPress Development",
    "WordPress Theme Developer",
    "WordPress Plugin Developer",

    // Technology Stack
    "React.js",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PHP",
    "Laravel",
    "WordPress",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Tailwind CSS",
    "CSS3",
    "HTML5",
    "RESTful APIs",
    "GraphQL",
    "Firebase",

    // Service Keywords
    "Web Development Services",
    "Custom Web Development",
    "E-commerce Development",
    "WordPress Development Services",
    "React Development Services",
    "Full Stack Development Services",
    "Web Application Development",
    "Responsive Web Design",
    "Progressive Web Apps",
    "Single Page Applications",

    // Portfolio & Experience
    "Developer Portfolio",
    "Web Developer Portfolio",
    "Full Stack Developer Portfolio",
    "React Developer Portfolio",
    "Professional Web Developer",
    "Experienced Web Developer",
    "Senior Web Developer",

    // Location-Based
    "Web Developer in Pakistan",
    "Web Developer in Islamabad",
    "Full Stack Developer in Pakistan",
    "React Developer in Pakistan",
    "WordPress Developer in Pakistan",

    // Industry Keywords
    "Software Developer",
    "Application Developer",
    "UI/UX Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Full Stack Engineer",
    "Web Engineer"
  ],
  authors: [{ name: "Hussnain Ahmed" }],
  creator: "Hussnain Ahmed",
  publisher: "Hussnain Ahmed",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: "Hussnain Ahmed - Full Stack Developer Portfolio",
    title: "Hussnain Ahmed - Full Stack Developer & WordPress Specialist | Hire React & Next.js Expert",
    description: "Expert Full Stack Web Developer specializing in React, Next.js, WordPress, PHP, and modern web technologies. Available for hire - freelance, remote, and full-time opportunities. Professional portfolio showcasing innovative projects and proven experience.",
    images: [
      {
        url: `${siteUrl}/profile/image.jpg`,
        width: 1200,
        height: 1200,
        alt: 'Hussnain Ahmed - Full Stack Web Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hussnain Ahmed - Full Stack Developer & WordPress Specialist",
    description: "Expert Full Stack Web Developer | React, Next.js, WordPress, PHP | Available for Hire | Freelance & Remote Opportunities",
    images: [`${siteUrl}/profile/image.jpg`],
    creator: '@hussnain_ahmed', // Update with your actual Twitter handle if available
    site: '@hussnain_ahmed',
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'technology',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
    'format-detection': 'telephone=yes',
    'geo.region': 'PK-IS',
    'geo.placename': 'Islamabad',
    'geo.position': '33.6844;73.0479',
    'ICBM': '33.6844, 73.0479',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/WebSite">
      <body cz-shortcut-listen="true" itemScope itemType="https://schema.org/Person">
        {children}
      </body>
    </html>
  );
}