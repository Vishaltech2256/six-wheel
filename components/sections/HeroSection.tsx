'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WheelEmblem } from '../brand/WheelEmblem';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2000&q=85',
    title: 'The Maldives',
    subtitle: 'Overwater Sanctuary & Azure Solitude',
  },
  {
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2000&q=85',
    title: 'Swiss Alps',
    subtitle: 'Belle Époque Grandeur & Glacier Rails',
  },
  {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=85',
    title: 'Imperial Kyoto',
    subtitle: 'Silent Zen Temples & Sacred Cedar Groves',
  },
  {
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85',
    title: 'The Serengeti',
    subtitle: 'Private Concessions & The Great Migration',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden">
      {/* Background Slideshow with crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform transition-transform duration-10000`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

        {/* Cinematic multi-stop gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-navy-950/80 pointer-events-none" />
      </div>

      {/* Hero Headline Content */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6 my-auto">
        {/* Eyebrow with Wheel Emblem */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-950/70 border border-gold/40 backdrop-blur-md animate-fade-in">
          <WheelEmblem size={16} color="#B8975A" animate />
          <span className="eyebrow text-gold text-[10px] sm:text-[11px] tracking-luxury">
            Journeys, Perfectly in Motion
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory font-light tracking-tight leading-[1.05] max-w-5xl mx-auto text-balance">
          Journeys Crafted Beyond the Ordinary
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-ivory/85 font-light max-w-2xl mx-auto leading-relaxed">
          Private escapes, handpicked stays and seamless travel, designed around you.
        </p>

        {/* Luxury 3D Glass Pill CTA */}
        <div className="flex items-center justify-center pt-4">
          <a
            href="https://wa.me/917639341779?text=Hi%20Mohan%2C%20I%20need%20to%20book%20a%20tour%20package%20with%20Six%20Wheels%20Holidays.%20Please%20suggest%20the%20best%20plans%20and%20places%20to%20visit."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber-glass-pill w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-4.5 text-navy text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-center"
          >
            <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]">
              Book Your Enjoyment Now
            </span>
          </a>
        </div>
      </div>

      {/* Bottom slide tracker */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-8 flex items-center justify-center text-xs text-stone">
        {/* Slide Indicator */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                i === currentSlide ? 'w-10 bg-gold' : 'w-3 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="text-xs font-serif text-ivory/80 ml-3 hidden sm:inline tracking-wide">
            {HERO_SLIDES[currentSlide].title} • {HERO_SLIDES[currentSlide].subtitle}
          </span>
        </div>
      </div>
    </section>
  );
};
