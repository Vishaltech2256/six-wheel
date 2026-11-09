'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { PACKAGES } from '@/data/packages';
import { DESTINATIONS } from '@/data/destinations';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import {
  Heart,
  Calendar,
  User,
  ShieldCheck,
  Trash2,
  ArrowRight,
  Sparkles,
  Plane,
  Clock,
  Printer,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const AccountClient: React.FC = () => {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { format } = useCurrency();
  const [activeTab, setActiveTab] = useState<'wishlist' | 'bookings' | 'profile'>('wishlist');

  // Find saved items in packages or destinations
  const savedPackages = PACKAGES.filter((p) => wishlistIds.includes(p.id));
  const savedDestinations = DESTINATIONS.filter((d) => wishlistIds.includes(d.id));

  // Mock past/upcoming bookings
  const mockBookings = [
    {
      reference: 'SWH-2026-9812',
      title: 'The Maldivian Sovereign Sanctuary',
      destination: 'The Maldives (Noonu Atoll)',
      dates: 'November 12 – 19, 2026',
      villa: 'One-Bedroom Water Retreat with Slide',
      travelers: '2 Adults',
      status: 'Confirmed & Chauffeur Assigned',
      total: 9400,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
    },
    {
      reference: 'SWH-2025-4421',
      title: 'The Grand Alpine Palace & Glacier Rail Odyssey',
      destination: 'Swiss Alps & St. Moritz',
      dates: 'January 10 – 18, 2025',
      villa: 'Deluxe Alpine Lake Suite',
      travelers: '2 Adults',
      status: 'Completed',
      total: 11200,
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Profile Card Header */}
        <div className="p-8 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-md flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-gold/40 p-1 bg-navy-950">
              <div className="w-full h-full rounded-full bg-gold/15 flex items-center justify-center font-serif text-2xl text-gold-light">
                CM
              </div>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-light text-[10px] uppercase tracking-luxury font-semibold">
                <Sparkles size={11} className="text-gold" />
                <span>Patron Tier Member</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                Lady Charlotte Montague
              </h1>
              <p className="text-xs text-stone font-light">
                Mayfair Member #SWH-8842 • Direct Director: Julian Vance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone border border-white/10 px-3 py-1.5 rounded-subtle flex items-center gap-1.5">
              <Lock size={12} className="text-gold" />
              <span>Biometric Vault Secure</span>
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-2.5 rounded-subtle text-xs tracking-wider uppercase font-medium transition-all ${
              activeTab === 'wishlist'
                ? 'bg-gold/20 text-gold-light border border-gold/40 font-semibold'
                : 'text-stone hover:text-ivory'
            }`}
          >
            Saved Sanctums ({savedPackages.length + savedDestinations.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-subtle text-xs tracking-wider uppercase font-medium transition-all ${
              activeTab === 'bookings'
                ? 'bg-gold/20 text-gold-light border border-gold/40 font-semibold'
                : 'text-stone hover:text-ivory'
            }`}
          >
            My Journeys ({mockBookings.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-subtle text-xs tracking-wider uppercase font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-gold/20 text-gold-light border border-gold/40 font-semibold'
                : 'text-stone hover:text-ivory'
            }`}
          >
            Preferences & Dossier
          </button>
        </div>

        {/* ================= TAB 1: WISHLIST ================= */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6 animate-fade-in">
            {savedPackages.length === 0 && savedDestinations.length === 0 ? (
              <div className="text-center py-20 bg-charcoal/40 rounded-refined border border-white/10 space-y-4">
                <Heart className="w-10 h-10 text-stone mx-auto" />
                <h3 className="font-serif text-2xl text-ivory">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone max-w-sm mx-auto">
                  Click the heart icon on any signature journey or destination to curate your
                  private wishlist.
                </p>
                <Link
                  href="/packages"
                  className="inline-block px-6 py-2.5 rounded-subtle bg-gold text-navy text-xs uppercase tracking-luxury font-semibold"
                >
                  Explore Signature Journeys
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-refined bg-charcoal/80 border border-gold/25 flex flex-col justify-between space-y-4 shadow-luxury-sm"
                  >
                    <div className="relative aspect-[16/10] rounded-subtle overflow-hidden">
                      <Image
                        src={pkg.heroImage}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gold uppercase tracking-luxury font-semibold">
                        {pkg.travelStyle} • {pkg.durationDays} Days
                      </span>
                      <h4 className="font-serif text-lg text-ivory font-normal leading-snug">
                        {pkg.title}
                      </h4>
                      <p className="text-xs text-stone">{format(pkg.price)} / traveler</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(pkg.id)}
                        className="text-stone hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>

                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="text-xs text-gold-light hover:text-gold uppercase tracking-wider font-semibold flex items-center gap-1"
                      >
                        <span>Reserve</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}

                {savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="p-5 rounded-refined bg-charcoal/80 border border-gold/25 flex flex-col justify-between space-y-4 shadow-luxury-sm"
                  >
                    <div className="relative aspect-[16/10] rounded-subtle overflow-hidden">
                      <Image
                        src={dest.heroImage}
                        alt={dest.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gold uppercase tracking-luxury font-semibold">
                        Sanctum
                      </span>
                      <h4 className="font-serif text-lg text-ivory font-normal leading-snug">
                        {dest.name}
                      </h4>
                      <p className="text-xs text-stone">From {format(dest.startingPrice)}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(dest.id)}
                        className="text-stone hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>

                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="text-xs text-gold-light hover:text-gold uppercase tracking-wider font-semibold flex items-center gap-1"
                      >
                        <span>Explore</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: MY BOOKINGS ================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            {mockBookings.map((b) => (
              <div
                key={b.reference}
                className="p-6 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-3 relative aspect-[16/10] rounded-subtle overflow-hidden">
                  <Image src={b.image} alt={b.title} fill className="object-cover" />
                </div>

                <div className="md:col-span-6 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold-light text-[10px] font-mono font-medium">
                      {b.reference}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold ${
                        b.status.includes('Confirmed') ? 'text-emerald-400' : 'text-stone'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-ivory font-normal">{b.title}</h3>
                  <p className="text-xs text-stone">{b.dates} • {b.villa}</p>
                  <p className="text-[11px] text-stone">Party: {b.travelers}</p>
                </div>

                <div className="md:col-span-3 text-left md:text-right space-y-2 border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
                  <span className="font-serif text-lg font-semibold text-gold-light block">
                    {format(b.total)}
                  </span>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-subtle bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-stone hover:text-ivory uppercase tracking-wider"
                  >
                    <Printer size={12} />
                    <span>Print Dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TAB 3: PROFILE PREFERENCES ================= */}
        {activeTab === 'profile' && (
          <div className="p-8 rounded-refined bg-charcoal border border-gold/30 space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <span className="eyebrow text-gold">Confidential Profile</span>
              <h3 className="font-serif text-2xl text-ivory font-light">
                Private Aviation & Hospitality Preferences
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1.5">
                <label className="text-stone uppercase tracking-wider block">
                  Preferred Departure Airport & FBO
                </label>
                <input
                  type="text"
                  defaultValue="London Heathrow VIP Windsor Suite / Farnborough FBO"
                  className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-ivory"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-stone uppercase tracking-wider block">
                  Dietary & Culinary Notes
                </label>
                <input
                  type="text"
                  defaultValue="Fine French & Japanese Kaiseki, low sodium"
                  className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-ivory"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-stone uppercase tracking-wider block">
                  Villa Pillow & Linen Choice
                </label>
                <input
                  type="text"
                  defaultValue="Hypoallergenic goose down, 800-thread Italian sateen"
                  className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-ivory"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-stone uppercase tracking-wider block">
                  Emergency Concierge Contact
                </label>
                <input
                  type="text"
                  defaultValue="+91 76393 41779 / +91 77083 93572 (Concierge Director)"
                  className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-ivory"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-stone text-xs flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-gold" />
                <span>Preferences synchronized across all international suites</span>
              </span>

              <button
                type="button"
                onClick={() => alert('Preferences saved to your private concierge dossier.')}
                className="px-6 py-2.5 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-wider"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

