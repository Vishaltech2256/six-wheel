import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/account/private',
    },
    sitemap: 'https://sixwheelsholidays.com/sitemap.xml',
  };
}

