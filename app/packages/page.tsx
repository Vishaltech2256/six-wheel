'use client';

import React, { useState, useMemo } from 'react';
import { PACKAGES } from '@/data/packages';
import { DESTINATIONS } from '@/data/destinations';
import { PackageCard } from '@/components/cards/PackageCard';
import { TravelStyle } from '@/types';
import { Search, Compass, RotateCcw } from 'lucide-react';

const STYLES: (TravelStyle | 'All')[] = [
  'All',
  'Private Islands',
  'Honeymoon',
  'Wildlife & Safari',
  'Cultural Journeys',
  'Road & Rail Journeys',
  'Wellness Retreats',
  'Adventure',
  'Family Escapes',
];

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<TravelStyle | 'All'>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>(
    'featured'
  );

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDestination =
        selectedDestination === 'All' || p.destinationId === selectedDestination;
      const matchesStyle = selectedStyle === 'All' || p.travelStyle === selectedStyle;

      let matchesDuration = true;
      if (selectedDuration === 'short') matchesDuration = p.durationDays <= 5;
      if (selectedDuration === 'medium') matchesDuration = p.durationDays >= 6 && p.durationDays <= 7;
      if (selectedDuration === 'long') matchesDuration = p.durationDays >= 8;

      return matchesSearch && matchesDestination && matchesStyle && matchesDuration;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedDestination, selectedStyle, selectedDuration, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDestination('All');
    setSelectedStyle('All');
    setSelectedDuration('All');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-navy min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="eyebrow text-gold">The Journey Collection</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-light leading-tight">
            Signature Blueprints
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            Every journey has been meticulously crafted by our Private Travel Directors, complete
            with premier villa suites, private transfers, and rare local access.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="p-4 sm:p-6 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search journeys, experiences, tags..."
                className="w-full pl-10 pr-4 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory placeholder:text-stone focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Destination filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                aria-label="Filter by destination"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="All" className="bg-charcoal text-ivory">
                  All 12 Destinations
                </option>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-charcoal text-ivory">
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Style filter */}
            <div className="md:col-span-2">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as any)}
                aria-label="Filter by travel style"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                {STYLES.map((s) => (
                  <option key={s} value={s} className="bg-charcoal text-ivory">
                    {s === 'All' ? 'All Styles' : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration filter */}
            <div className="md:col-span-1.5">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                aria-label="Filter by trip duration"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="All" className="bg-charcoal text-ivory">
                  Any Duration
                </option>
                <option value="short" className="bg-charcoal text-ivory">
                  1 - 5 Days
                </option>
                <option value="medium" className="bg-charcoal text-ivory">
                  6 - 7 Days
                </option>
                <option value="long" className="bg-charcoal text-ivory">
                  8+ Days
                </option>
              </select>
            </div>

            {/* Sort selector */}
            <div className="md:col-span-1.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort packages"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="featured" className="bg-charcoal text-ivory">
                  Featured
                </option>
                <option value="price-asc" className="bg-charcoal text-ivory">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-charcoal text-ivory">
                  Price: High to Low
                </option>
                <option value="duration" className="bg-charcoal text-ivory">
                  Longest First
                </option>
              </select>
            </div>
          </div>

          {/* Results count & reset */}
          <div className="flex items-center justify-between text-xs text-stone pt-2 border-t border-white/5">
            <span>
              Showing <strong className="text-gold font-serif">{filteredPackages.length}</strong> of{' '}
              {PACKAGES.length} signature blueprints
            </span>

            {(searchQuery || selectedDestination !== 'All' || selectedStyle !== 'All' || selectedDuration !== 'All') && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-stone hover:text-gold text-[11px] uppercase tracking-wider transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-charcoal/40 rounded-refined border border-white/10 space-y-4">
            <Compass className="w-10 h-10 text-gold mx-auto" />
            <h3 className="font-serif text-2xl text-ivory">No journeys match your filter combination</h3>
            <p className="text-xs text-stone max-w-sm mx-auto">
              Please reset your filters or commission a custom itinerary through our bespoke planner.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-subtle bg-gold text-navy text-xs uppercase tracking-luxury font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
