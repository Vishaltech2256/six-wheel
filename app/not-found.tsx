import React from 'react';
import Link from 'next/link';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-20 bg-navy text-ivory text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center mx-auto text-gold">
          <WheelEmblem size={44} color="#B57C51" animate />
        </div>

        <div className="space-y-2">
          <span className="eyebrow text-gold text-xs">Uncharted Territory</span>
          <h1 className="font-serif text-5xl sm:text-6xl text-ivory font-light">404</h1>
          <p className="font-serif text-xl text-gold-light/90 italic font-light">
            This horizon has not yet been mapped.
          </p>
          <p className="text-xs text-stone font-light leading-relaxed max-w-sm mx-auto">
            The private sanctum or sanctuary page you seek may have shifted location or been
            reserved exclusively.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm transition-transform hover:scale-105"
          >
            Return to Homepage
          </Link>

          <Link
            href="/destinations"
            className="w-full sm:w-auto px-6 py-3 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/15 text-xs font-semibold uppercase tracking-luxury"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}

