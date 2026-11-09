'use client';

import React, { useState, useMemo } from 'react';
import { HOTELS } from '@/data/hotels';
import { DESTINATIONS } from '@/data/destinations';
import { HotelCard } from '@/components/cards/HotelCard';
import { Search, Compass, RotateCcw } from 'lucide-react';

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedMealPlan, setSelectedMealPlan] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'stars' | 'price-asc' | 'price-desc' | 'rating'>('rating');

  const filteredHotels = useMemo(() => {
    return HOTELS.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDestination =
        selectedDestination === 'All' || h.destinationId === selectedDestination;
      const matchesMeal = selectedMealPlan === 'All' || h.mealPlan.toLowerCase().includes(selectedMealPlan.toLowerCase());

      return matchesSearch && matchesDestination && matchesMeal;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'stars') return b.stars - a.stars;
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedDestination, selectedMealPlan, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDestination('All');
    setSelectedMealPlan('All');
    setSortBy('rating');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-navy min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="eyebrow text-gold">Sanctuaries of Slumber</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-light leading-tight">
            Handpicked Palaces & Resorts
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            Suspended overwater retreats, 300-year-old marble island palaces, and alpine grand hotels
            with private butler service.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="p-4 sm:p-6 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hotels by name, location or amenity..."
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

            {/* Meal Plan Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedMealPlan}
                onChange={(e) => setSelectedMealPlan(e.target.value)}
                aria-label="Filter by meal plan"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="All" className="bg-charcoal text-ivory">
                  All Meal Plans
                </option>
                <option value="Breakfast" className="bg-charcoal text-ivory">
                  Champagne Breakfast Included
                </option>
                <option value="Full Board" className="bg-charcoal text-ivory">
                  Full Board / All-Inclusive
                </option>
              </select>
            </div>

            {/* Sort */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort hotels"
                className="w-full px-3 py-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="rating" className="bg-charcoal text-ivory">
                  Guest Rating
                </option>
                <option value="price-asc" className="bg-charcoal text-ivory">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-charcoal text-ivory">
                  Price: High to Low
                </option>
                <option value="stars" className="bg-charcoal text-ivory">
                  5-Star Elite
                </option>
              </select>
            </div>
          </div>

          {/* Results count & reset */}
          <div className="flex items-center justify-between text-xs text-stone pt-2 border-t border-white/5">
            <span>
              Showing <strong className="text-gold font-serif">{filteredHotels.length}</strong> of{' '}
              {HOTELS.length} handpicked sanctuaries
            </span>

            {(searchQuery || selectedDestination !== 'All' || selectedMealPlan !== 'All') && (
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

        {/* Hotels Grid */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-charcoal/40 rounded-refined border border-white/10 space-y-4">
            <Compass className="w-10 h-10 text-gold mx-auto" />
            <h3 className="font-serif text-2xl text-ivory">No hotels match your filters</h3>
            <p className="text-xs text-stone max-w-sm mx-auto">
              Please try different keywords or reset your filters.
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
