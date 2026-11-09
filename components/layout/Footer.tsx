'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { WheelEmblem } from '../brand/WheelEmblem';
import { Phone, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-gold/20 text-ivory/80 pt-16 lg:pt-20 pb-12">
      <div className="container max-w-7xl mx-auto space-y-12">
        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-7 space-y-5">
            <Logo variant="light" showTagline={true} emblemSize={50} />
            <p className="text-xs sm:text-sm text-stone font-light leading-relaxed max-w-lg pt-2">
              SIX WHEELS HOLIDAYS is a bespoke luxury travel atelier. We craft seamless, private
              journeys across the globe with precision, calm elegance and quiet mastery.
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone text-xs">
              <ShieldCheck className="text-gold w-4 h-4 shrink-0" />
              <span>Full ATOL Bonded & IATA Accredited Luxury Member</span>
            </div>
          </div>

          {/* Concierge Contact Column */}
          <div className="lg:col-span-5 space-y-4 bg-navy-900/60 p-6 sm:p-7 rounded-refined border border-gold/20 backdrop-blur-sm">
            <span className="eyebrow text-gold font-sans font-semibold tracking-luxury block text-xs">
              Concierge Chambers
            </span>
            <div className="flex items-start gap-3.5 py-1 font-sans">
              <Phone size={18} className="text-gold shrink-0 mt-1" />
              <div className="flex flex-col gap-2 font-sans">
                <a
                  href="tel:+917639341779"
                  className="hover:text-gold transition-colors text-ivory font-sans font-semibold tracking-wider text-base sm:text-lg tabular-nums"
                >
                  +91 76393 41779
                </a>
                <a
                  href="tel:+917708393572"
                  className="hover:text-gold transition-colors text-ivory font-sans font-semibold tracking-wider text-base sm:text-lg tabular-nums"
                >
                  +91 77083 93572
                </a>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans">
              <span className="text-[10px] text-stone uppercase tracking-widest block">
                Operating Hours
              </span>
              <span className="text-xs text-gold font-medium">24 Hours, 365 Days Worldwide</span>
            </div>
          </div>
        </div>

        {/* Section Divider with Six-Spoke Wheel Motif */}
        <div className="flex items-center justify-center gap-4 py-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <WheelEmblem size={24} color="#B8975A" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-[11px] uppercase tracking-wider text-stone pt-2">
          <Link href="/terms" className="hover:text-gold transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:text-gold transition-colors">
            Privacy & Discretion
          </Link>
          <Link href="/cancellation-policy" className="hover:text-gold transition-colors">
            Cancellation Policy
          </Link>
          <Link href="/contact" className="hover:text-gold transition-colors">
            Contact Concierge
          </Link>
        </div>
      </div>
    </footer>
  );
};
