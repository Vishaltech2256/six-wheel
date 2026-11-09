'use client';

import React, { useState, useMemo } from 'react';
import { DESTINATIONS } from '@/data/destinations';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { Region, TravelStyle } from '@/types';
import { Search, SlidersHorizontal, Compass, RotateCcw } from 'lucide-react';

const REGIONS: (Region | 'All')[] = [
  'All',
  'Indian Ocean',
  'Europe & Mediterranean',
  'Asia & Far East',
  'Africa',
  'Middle East',
  'Nordics & Polar',
];

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

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [selectedStyle, setSelectedStyle] = useState<TravelStyle | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>(
    'featured'
  );

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
      const matchesStyle = selectedStyle === 'All' || d.travelStyles.includes(selectedStyle as TravelStyle);

      return matchesSearch && matchesRegion && matchesStyle;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedRegion, selectedStyle, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedStyle('All');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-navy min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="eyebrow text-gold">The Global Atlas</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-light leading-tight">
            Curated Sanctums & Havens
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            From private coral sanctuaries to medieval clifftop palazzos, each destination is
            handpicked for discerning travelers seeking unmatched stillness and beauty.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Live Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by country, island or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory placeholder:text-stone focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Region Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as Region | 'All')}
                aria-label="Filter by geographic region"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r} className="bg-charcoal text-ivory">
                    {r === 'All' ? 'All Geographic Regions' : r}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as TravelStyle | 'All')}
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

            {/* Sort Selector */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort destinations"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="featured" className="bg-charcoal text-ivory">
                  Featured Order
                </option>
                <option value="price-asc" className="bg-charcoal text-ivory">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-charcoal text-ivory">
                  Price: High to Low
                </option>
                <option value="rating" className="bg-charcoal text-ivory">
                  Top Rated
                </option>
              </select>
            </div>
          </div>

          {/* Active status & reset */}
          <div className="flex items-center justify-between text-xs text-stone pt-2 border-t border-white/5">
            <span>
              Showing <strong className="text-gold font-serif">{filteredDestinations.length}</strong> of{' '}
              {DESTINATIONS.length} sanctums
            </span>

            {(searchQuery || selectedRegion !== 'All' || selectedStyle !== 'All') && (
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

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-charcoal/40 rounded-refined border border-white/10 space-y-4">
            <Compass className="w-10 h-10 text-gold mx-auto" />
            <h3 className="font-serif text-2xl text-ivory">No sanctums match your criteria</h3>
            <p className="text-xs text-stone max-w-sm mx-auto">
              Try adjusting your search terms or reset the filters to browse our full atlas.
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
