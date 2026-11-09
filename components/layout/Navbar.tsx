'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { Instagram, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy/90 backdrop-blur-md border-b border-gold/20 py-3.5 shadow-luxury-sm'
          : 'bg-gradient-to-b from-navy/90 via-navy/40 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Logo variant="light" emblemSize={44} showTagline={false} />

        {/* Action Controls & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Instagram Symbol */}
          <a
            href="https://www.instagram.com/_.sixwheel_holidays._?xtok=c2U1ZGV4bjhjY3ll"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Six Wheels Holidays on Instagram"
            title="Follow @_.sixwheel_holidays._ on Instagram"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-gold/15 text-ivory/85 hover:text-gold border border-white/10 hover:border-gold/40 transition-all duration-300 hover:scale-105"
          >
            <Instagram size={17} />
          </a>

          {/* Call Symbol */}
          <a
            href="tel:+917639341779"
            aria-label="Call Concierge: +91 76393 41779"
            title="Call +91 76393 41779"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-gold/15 text-ivory/85 hover:text-gold border border-white/10 hover:border-gold/40 transition-all duration-300 hover:scale-105"
          >
            <Phone size={17} />
          </a>

          {/* WhatsApp CTA Button */}
          <a
            href="https://wa.me/917639341779?text=Hi%20Mohan%2C%20I%20need%20to%20book%20a%20tour%20package%20with%20Six%20Wheels%20Holidays.%20Please%20suggest%20the%20best%20plans%20and%20places%20to%20visit."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm whitespace-nowrap transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Book My Enjoyment Now</span>
          </a>
        </div>
      </div>
    </header>
  );
};
