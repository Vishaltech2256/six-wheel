import React from 'react';
import Link from 'next/link';
import { WheelEmblem } from '../brand/WheelEmblem';
import { PhoneCall, ArrowRight, Sparkles } from 'lucide-react';

export const ConciergeBanner: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-navy-950 via-charcoal to-navy-950 border-y border-gold/30 relative overflow-hidden">
      {/* Decorative wheel emblem watermark */}
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 opacity-5 pointer-events-none">
        <WheelEmblem size={500} color="#B8975A" />
      </div>

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-light text-xs font-sans">
          <Sparkles size={13} className="text-gold" />
          <span className="uppercase tracking-wider text-[11px] font-semibold">
            Private Atelier Consultation
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory font-light leading-tight">
          Let us plan your next journey.
        </h2>

        <p className="text-sm sm:text-base text-stone font-light max-w-xl mx-auto leading-relaxed">
          Whether you desire a secluded private atoll buyout, an untouched glacier rail traverse, or
          exclusive royal palace chambers, our Private Travel Directors await your vision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/plan-my-journey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Commission a Bespoke Journey</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href="tel:+917639341779"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/15 text-xs font-semibold uppercase tracking-luxury transition-colors"
          >
            <PhoneCall size={14} className="text-gold" />
            <span>Call +91 76393 41779</span>
          </a>
        </div>
      </div>
    </section>
  );
};
