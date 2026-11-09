import { DESTINATIONS } from './destinations';
import { PACKAGES } from './packages';
import { HOTELS } from './hotels';
import { REVIEWS } from './reviews';
import { TESTIMONIALS } from './testimonials';
import { BLOG_POSTS } from './blog';
import { FAQS } from './faqs';
import { Destination, Package, Hotel, BlogPost } from '@/types';

export { DESTINATIONS, PACKAGES, HOTELS, REVIEWS, TESTIMONIALS, BLOG_POSTS, FAQS };

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function getHotelBySlug(slug: string): Hotel | undefined {
  return HOTELS.find((h) => h.slug === slug);
}

export function getPackagesByDestination(destinationId: string): Package[] {
  return PACKAGES.filter((p) => p.destinationId === destinationId);
}

export function getHotelsByDestination(destinationId: string): Hotel[] {
  return HOTELS.filter((h) => h.destinationId === destinationId);
}

export function getFeaturedDestinations(): Destination[] {
  return DESTINATIONS.filter((d) => d.featured);
}

export function getFeaturedPackages(): Package[] {
  return PACKAGES.filter((p) => p.featured);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug);
}
