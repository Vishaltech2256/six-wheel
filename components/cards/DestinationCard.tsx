'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Destination } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { WishlistButton } from '../ui/WishlistButton';
import { ArrowUpRight, Star } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
  featured?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  className = '',
  featured = false,
}) => {
  const { format } = useCurrency();

  return (
    <article
      className={`group relative overflow-hidden rounded-refined bg-charcoal border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-luxury-md flex flex-col justify-between ${
        featured ? 'min-h-[440px] md:min-h-[500px]' : 'min-h-[380px]'
      } ${className}`}
    >
      {/* Background Image with subtle zoom on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Editorial multi-stop dark gradient for impeccable text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-900/20" />
      </div>

      {/* Top Bar: Travel Style & Wishlist */}
      <div className="relative z-10 p-5 flex items-start justify-between">
        <span className="inline-block px-2.5 py-1 rounded-subtle bg-navy-950/80 backdrop-blur-md border border-gold/30 text-[10px] tracking-luxury uppercase font-semibold text-gold-light">
          {destination.travelStyles[0] || destination.region}
        </span>
        <WishlistButton id={destination.id} />
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-6 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-stone">
            <span className="eyebrow text-gold/90 text-[10px]">{destination.region}</span>
            <span className="flex items-center gap-1 text-gold-light">
              <Star size={12} className="fill-gold text-gold" />
              <span className="font-serif font-medium">{destination.rating.toFixed(2)}</span>
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-ivory group-hover:text-gold-light transition-colors font-normal leading-tight">
            {destination.name}
          </h3>
        </div>

        <p className="text-xs text-ivory/80 line-clamp-2 font-light leading-relaxed">
          {destination.tagline}
        </p>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone block">From</span>
            <span className="text-sm font-serif font-semibold text-ivory">
              {format(destination.startingPrice)}{' '}
              <span className="text-[11px] text-stone font-sans font-normal">/ guest</span>
            </span>
          </div>

          <Link
            href={`/destinations/${destination.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-subtle bg-white/10 hover:bg-gold hover:text-navy text-ivory text-xs font-sans uppercase tracking-wider transition-all duration-300 group-hover:bg-gold group-hover:text-navy"
            aria-label={`Explore ${destination.name}`}
          >
            <span>Explore</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};
