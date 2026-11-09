'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hotel } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { WishlistButton } from '../ui/WishlistButton';
import { Star, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  className?: string;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, className = '' }) => {
  const { format } = useCurrency();

  return (
    <article
      className={`group flex flex-col rounded-refined bg-charcoal border border-white/10 hover:border-gold/50 transition-all duration-500 overflow-hidden shadow-luxury-md ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={hotel.heroImage}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-navy/40" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-subtle bg-navy-950/85 backdrop-blur-md border border-gold/30">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} size={11} className="fill-gold text-gold" />
            ))}
          </div>
          <WishlistButton id={hotel.id} />
        </div>

        <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1 text-[11px] text-ivory/90">
          <MapPin size={12} className="text-gold" />
          <span className="truncate">{hotel.location}</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="eyebrow text-gold text-[10px] block">{hotel.destinationName}</span>
          <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-gold-light transition-colors font-normal leading-tight">
            <Link href={`/hotels/${hotel.slug}`}>{hotel.name}</Link>
          </h3>
          <p className="text-xs text-stone line-clamp-2 font-light leading-relaxed">
            {hotel.description}
          </p>
        </div>

        {/* Highlights Preview */}
        <div className="space-y-1 pt-2 border-t border-white/5">
          {hotel.highlights.slice(0, 2).map((hl, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-ivory/80">
              <Sparkles size={11} className="text-gold shrink-0" />
              <span className="truncate">{hl}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone block">From</span>
            <span className="text-base font-serif font-semibold text-ivory">
              {format(hotel.pricePerNight)}{' '}
              <span className="text-[11px] text-stone font-sans font-normal">/ night</span>
            </span>
          </div>

          <Link
            href={`/hotels/${hotel.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-subtle bg-gold/15 hover:bg-gold text-gold-light hover:text-navy text-xs font-semibold uppercase tracking-wider transition-all duration-300"
          >
            <span>View Sanctuary</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
};
