import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Hussnain Ahmed - Full Stack Developer",
    default: "Hussnain Ahmed - Full Stack Developer & WordPress Specialist",
  },
  description: "Hussnain Ahmed is a passionate full-stack web developer specializing in React, Next.js, WordPress, PHP, and modern web technologies. Explore my portfolio showcasing innovative projects, skills, and professional experience.",
  keywords: [
    "Hussnain Ahmed",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "WordPress Developer",
    "PHP Developer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Web Development",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "MySQL",
    "Tailwind CSS",
    "E-commerce Development",
    "Custom WordPress Themes",
    "Plugin Development",
    "RESTful APIs"
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
    siteName: "Hussnain Ahmed's Portfolio",
    title: "Hussnain Ahmed - Full Stack Developer & WordPress Specialist",
    description: "Passionate full-stack developer crafting beautiful, scalable web experiences with React, Next.js, WordPress, and modern technologies.",
    images: [
      {
        url: `${siteUrl}/profile/image.jpg`,
        width: 1200,
        height: 1200,
        alt: 'Hussnain Ahmed - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hussnain Ahmed - Full Stack Developer",
    description: "Passionate full-stack developer crafting beautiful, scalable web experiences with modern technologies.",
    images: [`${siteUrl}/profile/image.jpg`],
    creator: '@hussnain_ahmed', // Update with your actual Twitter handle if available
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
}