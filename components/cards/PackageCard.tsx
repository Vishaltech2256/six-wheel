'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { WishlistButton } from '../ui/WishlistButton';
import { Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PackageCardProps {
  pkg: Package;
  className?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, className = '' }) => {
  const { format } = useCurrency();

  return (
    <article
      className={`group flex flex-col rounded-refined bg-charcoal/90 border border-white/10 hover:border-gold/50 transition-all duration-500 overflow-hidden shadow-luxury-md ${className}`}
    >
      {/* Image Banner */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={pkg.heroImage}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-navy/30" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-subtle bg-navy-950/85 backdrop-blur-md border border-gold/30 text-[10px] tracking-luxury uppercase font-semibold text-gold-light">
            {pkg.travelStyle}
          </span>
          <WishlistButton id={pkg.id} />
        </div>

        {/* Bottom Duration Badge */}
        <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-subtle bg-navy-950/80 backdrop-blur-md text-[11px] text-ivory/90 border border-white/10">
          <Clock size={12} className="text-gold" />
          <span>{pkg.durationDays} Days / {pkg.durationDays - 1} Nights</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-stone">
            <div className="flex items-center text-gold">
              <Star size={13} className="fill-gold" />
            </div>
            <span className="font-serif font-medium text-ivory">{pkg.rating.toFixed(2)}</span>
            <span className="text-[11px]">({pkg.reviewsCount} reviews)</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-gold-light transition-colors font-normal leading-tight">
            <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
          </h3>

          <p className="text-xs text-stone line-clamp-2 font-light leading-relaxed">
            {pkg.tagline}
          </p>
        </div>

        {/* Inclusions summary preview */}
        <div className="space-y-1.5 pt-2 border-t border-white/5">
          {pkg.inclusions.slice(0, 2).map((inc, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] text-ivory/80">
              <CheckCircle2 size={12} className="text-gold shrink-0 mt-0.5" />
              <span className="truncate">{inc}</span>
            </div>
          ))}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone block">Starting from</span>
            <span className="text-base font-serif font-semibold text-gold-light">
              {format(pkg.price)}{' '}
              <span className="text-[11px] text-stone font-sans font-normal">/ traveler</span>
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-subtle bg-gold/15 hover:bg-gold text-gold-light hover:text-navy text-xs font-semibold uppercase tracking-wider transition-all duration-300"
          >
            <span>View Journey</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
};
