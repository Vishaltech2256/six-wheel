
'use client';

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  orientation?: 'horizontal' | 'stacked';
  showTagline?: boolean;
  emblemSize?: number;
  className?: string;
  animateEmblem?: boolean;
  standalone?: boolean; // If true, shows just the circular badge
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  orientation = 'horizontal',
  showTagline = false,
  emblemSize = 44,
  className = '',
  standalone = false,
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-ivory' : 'text-navy-950';
  const taglineColor = isLight ? 'text-sand/80' : 'text-amber-dark/90';

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${
        orientation === 'stacked' ? 'flex-col items-center text-center' : 'flex-row'
      } ${className}`}
      aria-label="Six Wheels Holidays - Return to Homepage"
    >
      {/* Official Circular Badge Logo */}
      <div
        className="relative shrink-0 rounded-full overflow-hidden shadow-luxury-md border border-gold/40 group-hover:border-gold transition-all duration-500"
        style={{ width: emblemSize, height: emblemSize }}
      >
        <Image
          src="/logo.png"
          alt="SIX WHEEL HOLIDAYS Logo"
          fill
          priority
          sizes={`${emblemSize}px`}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {!standalone && (
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-[0.25em] text-[15px] sm:text-[17px] font-medium uppercase leading-tight ${textColor}`}
          >
            SIX WHEELS
          </span>
          <span
            className={`font-sans tracking-[0.35em] text-[9px] sm:text-[10px] font-semibold uppercase leading-none mt-0.5 text-amber`}
          >
            HOLIDAYS
          </span>
          {showTagline && (
            <span
              className={`font-sans tracking-[0.2em] text-[8px] uppercase mt-1 italic ${taglineColor}`}
            >
              Journeys, Perfectly in Motion
            </span>
          )}
        </div>
      )}
    </Link>
  );
};
