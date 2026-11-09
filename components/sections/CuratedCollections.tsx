'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PACKAGES } from '@/data/packages';
import { TravelStyle } from '@/types';
import { PackageCard } from '../cards/PackageCard';
import { ArrowRight, Compass } from 'lucide-react';

const COLLECTIONS: TravelStyle[] = [
  'Honeymoon',
  'Private Islands',
  'Wildlife & Safari',
  'Cultural Journeys',
  'Road & Rail Journeys',
  'Wellness Retreats',
  'Adventure',
  'Family Escapes',
];

export const CuratedCollections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TravelStyle>('Honeymoon');

  const filteredPackages = PACKAGES.filter((p) => p.travelStyle === activeTab);

  return (
    <section className="py-24 lg:py-32 bg-navy-950 border-t border-white/5 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="eyebrow text-gold">Curated Collections</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-light leading-tight">
              Journeys Defined by Purpose
            </h2>
            <p className="text-xs sm:text-sm text-stone font-light max-w-xl leading-relaxed">
              Explore signature travel themes designed around singular passions, romantic milestones,
              and soul-restoring retreats.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-xs text-gold-light hover:text-gold uppercase tracking-luxury font-medium transition-colors self-start md:self-auto"
          >
            <span>View All Blueprints</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {COLLECTIONS.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setActiveTab(style)}
              className={`px-4 py-2.5 rounded-subtle text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-all duration-300 border ${
                activeTab === style
                  ? 'bg-gold text-navy border-gold shadow-luxury-sm font-semibold'
                  : 'bg-charcoal/80 text-stone hover:text-ivory border-white/10 hover:border-gold/30'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Package Grid for Active Tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
          ) : (
            <div className="col-span-3 text-center py-16 bg-charcoal/40 rounded-refined border border-white/10 space-y-3">
              <Compass className="w-8 h-8 text-gold mx-auto" />
              <p className="font-serif text-lg text-ivory">
                Curating new private blueprints for {activeTab}.
              </p>
              <p className="text-xs text-stone max-w-md mx-auto">
                Our bespoke travel directors are ready to craft a tailor-made itinerary for this
                style today.
              </p>
              <Link
                href="/plan-my-journey"
                className="inline-block mt-3 px-6 py-2.5 rounded-subtle bg-gold text-navy text-xs uppercase tracking-luxury font-semibold"
              >
                Request Bespoke Plan
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
