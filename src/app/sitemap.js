const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h-a-portfolio.netlify.app';

export default function sitemap() {
  const baseDate = new Date();
  
  const routes = [
    {
      route: '',
      priority: 1.0,
      changeFrequency: 'weekly',
      lastModified: baseDate,
    },
    {
      route: '/about',
      priority: 0.9,
      changeFrequency: 'monthly',
      lastModified: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      route: '/projects',
      priority: 0.9,
      changeFrequency: 'weekly',
      lastModified: baseDate,
    },
    {
      route: '/skills',
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
    {
      route: '/contact',
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    },
  ].map(({ route, priority, changeFrequency, lastModified }) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${siteUrl}${route}`,
      },
    },
  }));

  return routes;
}


