'use client';

import React from 'react';
import Image from 'next/image';

interface WheelEmblemProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  animate?: boolean;
  useSvgFallback?: boolean;
}

export const WheelEmblem: React.FC<WheelEmblemProps> = ({
  className = '',
  size = 32,
  color = '#B57C51',
  strokeWidth = 1.5,
  animate = false,
  useSvgFallback = false,
}) => {
  if (!useSvgFallback) {
    return (
      <div
        className={`relative inline-block rounded-full overflow-hidden border border-gold/40 shadow-luxury-sm shrink-0 ${
          animate ? 'animate-spin-slow' : ''
        } ${className}`}
        style={{ width: size, height: size }}
        aria-label="Six Wheels Holidays Official Emblem"
      >
        <Image
          src="/logo.png"
          alt="Six Wheels Holidays Official Emblem"
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'animate-spin-slow' : ''} ${className}`}
      aria-label="Six Wheels Holidays Emblem"
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity="0.9"
      />
      <circle
        cx="50"
        cy="50"
        r="39"
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
        strokeDasharray="2 3"
        strokeOpacity="0.4"
      />
      <circle
        cx="50"
        cy="50"
        r="7"
        stroke={color}
        strokeWidth={strokeWidth}
        fill={color}
        fillOpacity="0.15"
      />
      <circle cx="50" cy="50" r="2.5" fill={color} />
      <line x1="50" y1="7" x2="50" y2="43" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="50" y1="57" x2="50" y2="93" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="87.24" y1="28.5" x2="56.06" y2="46.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="43.94" y1="53.5" x2="12.76" y2="71.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="87.24" y1="71.5" x2="56.06" y2="53.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="43.94" y1="46.5" x2="12.76" y2="28.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
};
