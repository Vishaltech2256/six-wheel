import React from 'react';
import { notFound } from 'next/navigation';
import { PACKAGES, getPackageBySlug, getDestinationBySlug } from '@/data';
import { PackageDetailClient } from './PackageDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return { title: 'Journey Not Found' };

  return {
    title: `${pkg.title} (${pkg.durationDays} Days)`,
    description: pkg.tagline,
    openGraph: {
      title: `${pkg.title} | SIX WHEELS HOLIDAYS`,
      description: pkg.overview,
      images: [{ url: pkg.heroImage }],
    },
  };
}

export default function PackageDetailPage({ params }: Props) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const destination = getDestinationBySlug(pkg.destinationId);
  const relatedPackages = PACKAGES.filter(
    (p) => p.id !== pkg.id && (p.destinationId === pkg.destinationId || p.travelStyle === pkg.travelStyle)
  ).slice(0, 3);

  return (
    <PackageDetailClient
      pkg={pkg}
      destination={destination}
      relatedPackages={relatedPackages}
    />
  );
}
