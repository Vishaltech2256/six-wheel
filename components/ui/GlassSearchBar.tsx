'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DESTINATIONS } from '@/data/destinations';
import { TravelStyle } from '@/types';
import {
  Search,
  Calendar,
  Users,
  Compass,
  MapPin,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const TRAVEL_STYLES: TravelStyle[] = [
  'Honeymoon',
  'Private Islands',
  'Wildlife & Safari',
  'Cultural Journeys',
  'Road & Rail Journeys',
  'Wellness Retreats',
  'Adventure',
  'Family Escapes',
];

export const GlassSearchBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const router = useRouter();

  // Search form states
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [departureMonth, setDepartureMonth] = useState<string>('Any Season');
  const [adults, setAdults] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<string>('All Styles');

  // Popover toggle states
  const [openSection, setOpenSection] = useState<'dest' | 'dates' | 'guests' | 'style' | null>(
    null
  );
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setOpenSection(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSection(null);

    const params = new URLSearchParams();
    if (selectedDestination) params.set('dest', selectedDestination);
    if (travelStyle && travelStyle !== 'All Styles') params.set('style', travelStyle);
    if (departureMonth && departureMonth !== 'Any Season') params.set('season', departureMonth);
    params.set('adults', adults.toString());

    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div
      ref={barRef}
      className={`relative w-full max-w-5xl mx-auto rounded-refined bg-charcoal/90 border border-gold/40 shadow-luxury-gold backdrop-blur-xl p-2 sm:p-3 text-ivory ${className}`}
    >
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 items-center"
      >
        {/* 1. Destination Field */}
        <div className="lg:col-span-3 relative">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'dest' ? null : 'dest')}
            className={`w-full text-left p-3 rounded-subtle transition-colors flex items-center gap-3 border ${
              openSection === 'dest'
                ? 'bg-navy-900 border-gold/50'
                : 'hover:bg-white/5 border-transparent'
            }`}
          >
            <MapPin className="text-gold shrink-0 w-4 h-4" />
            <div className="truncate">
              <span className="eyebrow text-stone text-[10px] block leading-none mb-1">
                Sanctum / Realm
              </span>
              <span className="text-xs font-serif font-medium text-ivory truncate block">
                {selectedDestination
                  ? DESTINATIONS.find((d) => d.id === selectedDestination)?.name
                  : 'Select Destination'}
              </span>
            </div>
          </button>

          {/* Destination Dropdown */}
          {openSection === 'dest' && (
            <div className="absolute top-full left-0 mt-2 w-72 max-h-72 overflow-y-auto rounded-refined bg-charcoal border border-gold/30 shadow-luxury-lg p-2 z-50">
              <button
                type="button"
                onClick={() => {
                  setSelectedDestination('');
                  setOpenSection(null);
                }}
                className="w-full text-left px-3 py-2 text-xs text-stone hover:text-ivory hover:bg-white/5 rounded-subtle"
              >
                All 12 Curated Sanctums
              </button>
              {DESTINATIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setSelectedDestination(d.id);
                    setOpenSection(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-subtle flex items-center justify-between transition-colors ${
                    selectedDestination === d.id
                      ? 'bg-gold/20 text-gold-light font-medium'
                      : 'text-ivory/90 hover:bg-white/5'
                  }`}
                >
                  <span className="font-serif">{d.name}</span>
                  <span className="text-[10px] text-stone">{d.region.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Season / Departure Month */}
        <div className="lg:col-span-3 relative">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'dates' ? null : 'dates')}
            className={`w-full text-left p-3 rounded-subtle transition-colors flex items-center gap-3 border ${
              openSection === 'dates'
                ? 'bg-navy-900 border-gold/50'
                : 'hover:bg-white/5 border-transparent'
            }`}
          >
            <Calendar className="text-gold shrink-0 w-4 h-4" />
            <div className="truncate">
              <span className="eyebrow text-stone text-[10px] block leading-none mb-1">
                Departure Season
              </span>
              <span className="text-xs font-serif font-medium text-ivory truncate block">
                {departureMonth}
              </span>
            </div>
          </button>

          {/* Season Dropdown */}
          {openSection === 'dates' && (
            <div className="absolute top-full left-0 mt-2 w-64 rounded-refined bg-charcoal border border-gold/30 shadow-luxury-lg p-2 z-50">
              {[
                'Any Season',
                'Spring 2026 (Mar - May)',
                'Summer 2026 (Jun - Aug)',
                'Autumn 2026 (Sep - Nov)',
                'Winter 2026/27 (Dec - Feb)',
              ].map((season) => (
                <button
                  key={season}
                  type="button"
                  onClick={() => {
                    setDepartureMonth(season);
                    setOpenSection(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-subtle transition-colors ${
                    departureMonth === season
                      ? 'bg-gold/20 text-gold-light font-medium'
                      : 'text-ivory/90 hover:bg-white/5'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Guests Selector */}
        <div className="lg:col-span-2 relative">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'guests' ? null : 'guests')}
            className={`w-full text-left p-3 rounded-subtle transition-colors flex items-center gap-3 border ${
              openSection === 'guests'
                ? 'bg-navy-900 border-gold/50'
                : 'hover:bg-white/5 border-transparent'
            }`}
          >
            <Users className="text-gold shrink-0 w-4 h-4" />
            <div className="truncate">
              <span className="eyebrow text-stone text-[10px] block leading-none mb-1">
                Travelers
              </span>
              <span className="text-xs font-serif font-medium text-ivory truncate block">
                {adults} {adults === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
          </button>

          {/* Guests Popover */}
          {openSection === 'guests' && (
            <div className="absolute top-full left-0 mt-2 w-56 rounded-refined bg-charcoal border border-gold/30 shadow-luxury-lg p-4 z-50 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span>Party Size</span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-7 h-7 rounded-subtle border border-gold/40 flex items-center justify-center hover:bg-gold/20 text-gold text-sm"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-serif text-sm">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.min(8, adults + 1))}
                    className="w-7 h-7 rounded-subtle border border-gold/40 flex items-center justify-center hover:bg-gold/20 text-gold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-stone leading-tight border-t border-white/10 pt-2">
                For private parties larger than 8 or villa buyouts, our concierge prepares bespoke
                arrangements.
              </p>
            </div>
          )}
        </div>

        {/* 4. Travel Style */}
        <div className="lg:col-span-2 relative">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'style' ? null : 'style')}
            className={`w-full text-left p-3 rounded-subtle transition-colors flex items-center gap-3 border ${
              openSection === 'style'
                ? 'bg-navy-900 border-gold/50'
                : 'hover:bg-white/5 border-transparent'
            }`}
          >
            <Compass className="text-gold shrink-0 w-4 h-4" />
            <div className="truncate">
              <span className="eyebrow text-stone text-[10px] block leading-none mb-1">
                Travel Style
              </span>
              <span className="text-xs font-serif font-medium text-ivory truncate block">
                {travelStyle}
              </span>
            </div>
          </button>

          {/* Style Dropdown */}
          {openSection === 'style' && (
            <div className="absolute top-full right-0 mt-2 w-60 rounded-refined bg-charcoal border border-gold/30 shadow-luxury-lg p-2 z-50">
              <button
                type="button"
                onClick={() => {
                  setTravelStyle('All Styles');
                  setOpenSection(null);
                }}
                className="w-full text-left px-3 py-2 text-xs text-stone hover:text-ivory hover:bg-white/5 rounded-subtle"
              >
                All Travel Styles
              </button>
              {TRAVEL_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    setTravelStyle(style);
                    setOpenSection(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-subtle transition-colors ${
                    travelStyle === style
                      ? 'bg-gold/20 text-gold-light font-medium'
                      : 'text-ivory/90 hover:bg-white/5'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Submit Button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full h-12 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
          >
            <Search size={15} />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
