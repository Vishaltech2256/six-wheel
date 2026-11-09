import { MetadataRoute } from 'next';
import { DESTINATIONS } from '@/data/destinations';
import { PACKAGES } from '@/data/packages';
import { HOTELS } from '@/data/hotels';
import { BLOG_POSTS } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sixwheelsholidays.com';

  const staticPages = [
    '',
    '/destinations',
    '/packages',
    '/hotels',
    '/plan-my-journey',
    '/about',
    '/contact',
    '/journal',
    '/faq',
    '/terms',
    '/privacy',
    '/cancellation-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const destinationPages = DESTINATIONS.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const packagePages = PACKAGES.map((p) => ({
    url: `${baseUrl}/packages/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const hotelPages = HOTELS.map((h) => ({
    url: `${baseUrl}/hotels/${h.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/journal/${b.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...destinationPages, ...packagePages, ...hotelPages, ...blogPages];
}

