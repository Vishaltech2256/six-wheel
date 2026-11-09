'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Package, Destination } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { LightboxGallery } from '@/components/ui/LightboxGallery';
import { PackageCard } from '@/components/cards/PackageCard';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import {
  Clock,
  Users,
  MapPin,
  Star,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Plane,
  Anchor,
  Car,
  Heart,
  PhoneCall,
  Check,
} from 'lucide-react';

interface Props {
  pkg: Package;
  destination?: Destination;
  relatedPackages: Package[];
}

export const PackageDetailClient: React.FC<Props> = ({
  pkg,
  destination,
  relatedPackages,
}) => {
  const router = useRouter();
  const { format } = useCurrency();

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'stays' | 'reviews'>(
    'overview'
  );

  // Booking options state
  const [adults, setAdults] = useState<number>(2);
  const [selectedTierId, setSelectedTierId] = useState<string>(
    pkg.roomTiers[0]?.id || ''
  );
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [openItineraryDay, setOpenItineraryDay] = useState<number | null>(1);

  // Selected tier diff
  const selectedTier = pkg.roomTiers.find((t) => t.id === selectedTierId) || pkg.roomTiers[0];
  const tierUpgradePerNight = selectedTier?.priceDiffPerNight || 0;
  const nights = pkg.durationDays - 1;
  const totalTierUpgrade = tierUpgradePerNight * nights;

  // Selected add-ons total
  const totalAddOns = pkg.addOns
    .filter((a) => selectedAddOnIds.includes(a.id))
    .reduce((sum, a) => sum + (a.perPerson ? a.price * adults : a.price), 0);

  // Live Price Calculation
  const baseTotal = pkg.price * adults;
  const grandTotal = baseTotal + totalTierUpgrade + totalAddOns;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProceedToBooking = () => {
    const params = new URLSearchParams();
    params.set('packageId', pkg.id);
    params.set('adults', adults.toString());
    if (selectedTierId) params.set('tier', selectedTierId);
    if (selectedAddOnIds.length > 0) params.set('addons', selectedAddOnIds.join(','));

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb & Wishlist */}
        <div className="flex items-center justify-between text-xs text-stone border-b border-white/10 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/packages" className="hover:text-gold transition-colors">
              Signature Journeys
            </Link>
            <span>/</span>
            <span className="text-gold-light truncate max-w-xs">{pkg.title}</span>
          </nav>
          <WishlistButton id={pkg.id} label="Save Journey" />
        </div>

        {/* Hero Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-sans uppercase tracking-luxury font-semibold">
              {pkg.travelStyle}
            </span>
            {destination && (
              <Link
                href={`/destinations/${destination.slug}`}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone hover:text-ivory text-xs font-sans transition-colors flex items-center gap-1.5"
              >
                <MapPin size={12} className="text-gold" />
                <span>{destination.name}</span>
              </Link>
            )}
            <div className="flex items-center gap-1.5 text-xs text-stone ml-2">
              <Star size={13} className="fill-gold text-gold" />
              <span className="font-serif font-medium text-ivory">{pkg.rating.toFixed(2)}</span>
              <span>({pkg.reviewsCount} reviews)</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight">
            {pkg.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-gold-light/90 italic font-light">
            &ldquo;{pkg.tagline}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone">
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-gold" />
              <span>{pkg.durationDays} Days / {pkg.durationDays - 1} Nights</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={15} className="text-gold" />
              <span>Max {pkg.maxGuests} Travelers</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-gold" />
              <span>100% Bespoke Flexible</span>
            </span>
          </div>
        </div>

        {/* Gallery with Lightbox */}
        <LightboxGallery images={[pkg.heroImage, ...pkg.gallery]} title={pkg.title} />

        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/15 pb-2 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'itinerary', label: `Day-by-Day (${pkg.itinerary.length} Days)` },
            { id: 'inclusions', label: 'Inclusions & Services' },
            { id: 'stays', label: 'Villas & Palaces' },
            { id: 'reviews', label: `Reviews (${pkg.reviewsCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-subtle text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-all border ${
                activeTab === tab.id
                  ? 'bg-gold/15 text-gold-light border-gold font-semibold'
                  : 'bg-transparent text-stone hover:text-ivory border-transparent hover:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Layout (Left tabs content + Right sticky live booking calculator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-10 animate-fade-in">
                <section className="space-y-4">
                  <h3 className="font-serif text-2xl text-ivory font-light">Journey Philosophy</h3>
                  <p className="text-sm sm:text-base text-stone font-light leading-relaxed">
                    {pkg.overview}
                  </p>
                </section>

                {/* Key Inclusions Preview */}
                <section className="space-y-4 p-6 rounded-refined bg-charcoal/80 border border-gold/30">
                  <span className="eyebrow text-gold">Privilege Highlights</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-ivory/90">
                        <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                        <span className="font-light">{inc}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Villa Upgrade Preview */}
                {pkg.roomTiers.length > 1 && (
                  <section className="space-y-4">
                    <span className="eyebrow text-gold">Sanctuary Suites</span>
                    <h3 className="font-serif text-2xl text-ivory font-light">
                      Accommodations & Villas
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pkg.roomTiers.map((tier) => (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedTierId(tier.id)}
                          className={`p-4 rounded-refined border cursor-pointer transition-all ${
                            selectedTierId === tier.id
                              ? 'bg-gold/15 border-gold shadow-luxury-sm'
                              : 'bg-charcoal/60 border-white/10 hover:border-gold/30'
                          }`}
                        >
                          <div className="relative aspect-[16/9] rounded-subtle overflow-hidden mb-3">
                            <Image
                              src={tier.image}
                              alt={tier.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-base text-ivory font-medium">{tier.name}</h4>
                            {selectedTierId === tier.id && (
                              <span className="px-2 py-0.5 rounded-full bg-gold text-navy text-[10px] font-bold uppercase">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone font-light mt-1">{tier.description}</p>
                          <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-white/5">
                            <span className="text-stone">{tier.sqm} sqm • {tier.capacity}</span>
                            <span className="text-gold-light font-medium">
                              {tier.priceDiffPerNight === 0
                                ? 'Included in base'
                                : `+${format(tier.priceDiffPerNight)} / night`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* 2. ITINERARY TAB */}
            {activeTab === 'itinerary' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <span className="eyebrow text-gold">Day-by-Day Choreography</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                    The Complete Itinerary
                  </h3>
                  <p className="text-xs text-stone font-light">
                    Each day is orchestrated with ample room for stillness, unhurried leisure, and
                    private requests.
                  </p>
                </div>

                <div className="space-y-4">
                  {pkg.itinerary.map((day) => {
                    const isOpen = openItineraryDay === day.day;
                    return (
                      <div
                        key={day.day}
                        className={`rounded-refined border transition-all ${
                          isOpen
                            ? 'bg-charcoal border-gold/40 shadow-luxury-md'
                            : 'bg-charcoal/50 border-white/10 hover:border-gold/20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenItineraryDay(isOpen ? null : day.day)}
                          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-subtle bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 font-serif text-sm font-semibold text-gold-light">
                              Day {day.day}
                            </div>
                            <div>
                              <h4 className="font-serif text-lg sm:text-xl text-ivory font-normal">
                                {day.title}
                              </h4>
                              <p className="text-[11px] text-stone mt-0.5">Stay: {day.stay}</p>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 space-y-4 animate-fade-in">
                            <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
                              {day.description}
                            </p>

                            {/* Activities & Meals Pills */}
                            <div className="flex flex-wrap items-center gap-2 pt-2">
                              {day.meals.map((meal, mIdx) => (
                                <span
                                  key={mIdx}
                                  className="px-2.5 py-1 rounded-subtle bg-navy-950/80 border border-white/10 text-[10px] text-stone uppercase tracking-wider"
                                >
                                  {meal}
                                </span>
                              ))}
                              {day.activities.map((act, aIdx) => (
                                <span
                                  key={aIdx}
                                  className="px-2.5 py-1 rounded-subtle bg-gold/10 border border-gold/30 text-[10px] text-gold-light uppercase tracking-wider"
                                >
                                  {act}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. INCLUSIONS & EXCLUSIONS TAB */}
            {activeTab === 'inclusions' && (
              <div className="space-y-10 animate-fade-in">
                <section className="space-y-4">
                  <h3 className="font-serif text-2xl text-ivory font-light">What is Included</h3>
                  <div className="space-y-3">
                    {pkg.inclusions.map((inc, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-subtle bg-charcoal/70 border border-gold/25 flex items-start gap-3"
                      >
                        <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-ivory/90 font-light">{inc}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="font-serif text-2xl text-ivory font-light">Not Included</h3>
                  <div className="space-y-3">
                    {pkg.exclusions.map((exc, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-subtle bg-charcoal/40 border border-white/10 flex items-start gap-3 text-stone"
                      >
                        <XCircle size={16} className="text-stone shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-light">{exc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* 4. STAYS TAB */}
            {activeTab === 'stays' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <span className="eyebrow text-gold">Rest & Sanctuary</span>
                  <h3 className="font-serif text-2xl text-ivory font-light">
                    Featured Stays on this Journey
                  </h3>
                </div>

                <div className="space-y-4">
                  {pkg.stays.map((stay, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-refined bg-charcoal border border-gold/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="eyebrow text-gold text-[10px]">
                          {stay.nights} Nights Reserved
                        </span>
                        <Link
                          href={`/hotels/${stay.hotelId}`}
                          className="text-xs text-gold-light hover:underline uppercase tracking-wider font-semibold"
                        >
                          View Hotel &rarr;
                        </Link>
                      </div>
                      <h4 className="font-serif text-2xl text-ivory font-normal">{stay.hotelName}</h4>
                      <p className="text-xs text-stone">Suite category: {stay.roomType}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="eyebrow text-gold">Traveler Reflections</span>
                    <h3 className="font-serif text-2xl text-ivory font-light">
                      Reviews & Testimonials
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="fill-gold text-gold" />
                    <span className="font-serif text-2xl text-gold-light font-semibold">
                      {pkg.rating.toFixed(2)}
                    </span>
                    <span className="text-xs text-stone">/ 5.0</span>
                  </div>
                </div>

                <div className="p-6 rounded-refined bg-charcoal/80 border border-white/10 space-y-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <h4 className="font-serif text-lg text-ivory">
                    &ldquo;Transcendent hospitality and precision execution.&rdquo;
                  </h4>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    Six Wheels organized every connection with flawless grace. From the private
                    seaplane arrival to the starlit sandbank dining, this journey will remain with
                    our family forever.
                  </p>
                  <p className="text-[11px] text-gold-light pt-1">
                    Patron Review • Verified Traveler
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Live Price Calculator Sidebar */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-refined bg-charcoal border border-gold/40 shadow-luxury-gold space-y-6">
              {/* Price Header */}
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-stone block">
                  Estimated Journey Total
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold text-gold-light">
                    {format(grandTotal)}
                  </span>
                  <span className="text-xs text-stone">({adults} Travelers)</span>
                </div>
                <span className="text-[10px] text-stone block mt-1">
                  Base: {format(pkg.price)} / traveler
                </span>
              </div>

              {/* Guest Count Selector */}
              <div className="space-y-2">
                <span className="eyebrow text-stone text-[10px] block">Travelers</span>
                <div className="flex items-center justify-between p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs">
                  <span>Adult Guests</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-6 h-6 rounded-subtle border border-gold/40 flex items-center justify-center text-gold text-sm hover:bg-gold/20"
                    >
                      -
                    </button>
                    <span className="font-serif font-semibold">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(pkg.maxGuests, adults + 1))}
                      className="w-6 h-6 rounded-subtle border border-gold/40 flex items-center justify-center text-gold text-sm hover:bg-gold/20"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Villa Tier Selector */}
              {pkg.roomTiers.length > 0 && (
                <div className="space-y-2">
                  <span className="eyebrow text-stone text-[10px] block">Sanctuary Tier</span>
                  <select
                    value={selectedTierId}
                    onChange={(e) => setSelectedTierId(e.target.value)}
                    aria-label="Select villa tier"
                    className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold cursor-pointer"
                  >
                    {pkg.roomTiers.map((tier) => (
                      <option key={tier.id} value={tier.id} className="bg-charcoal text-ivory">
                        {tier.name}{' '}
                        {tier.priceDiffPerNight > 0
                          ? `(+${format(tier.priceDiffPerNight * nights)})`
                          : '(Included)'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Add-ons Selector */}
              {pkg.addOns.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="eyebrow text-gold text-[10px] block">
                    Enhance Your Journey
                  </span>
                  <div className="space-y-2">
                    {pkg.addOns.map((addon) => {
                      const isSelected = selectedAddOnIds.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddOn(addon.id)}
                          className={`p-3 rounded-subtle border cursor-pointer text-xs flex items-start justify-between gap-3 transition-colors ${
                            isSelected
                              ? 'bg-gold/15 border-gold text-ivory'
                              : 'bg-navy-950 border-white/10 hover:border-white/20 text-stone'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="font-medium text-ivory block">{addon.name}</span>
                            <span className="text-[10px] text-stone line-clamp-1">
                              {addon.description}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-gold-light font-serif font-semibold block">
                              +{format(addon.price)}
                            </span>
                            <span className="text-[9px] text-stone">
                              {addon.perPerson ? 'per person' : 'total'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-stone">
                <div className="flex justify-between">
                  <span>Base Package ({adults} travelers)</span>
                  <span className="text-ivory font-serif">{format(baseTotal)}</span>
                </div>
                {totalTierUpgrade > 0 && (
                  <div className="flex justify-between">
                    <span>Villa Upgrade ({nights} nights)</span>
                    <span className="text-gold-light font-serif">+{format(totalTierUpgrade)}</span>
                  </div>
                )}
                {totalAddOns > 0 && (
                  <div className="flex justify-between">
                    <span>Selected Enhancements</span>
                    <span className="text-gold-light font-serif">+{format(totalAddOns)}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-sm font-semibold text-ivory pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-gold-light text-base">{format(grandTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleProceedToBooking}
                  className="w-full py-4 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Reserve This Journey</span>
                  <ArrowRight size={14} />
                </button>

                <Link
                  href={`/plan-my-journey?pkg=${pkg.id}`}
                  className="w-full py-3 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/15 text-xs font-semibold uppercase tracking-luxury block text-center transition-colors"
                >
                  Request Bespoke Customization
                </Link>
              </div>

              {/* Discretion Guarantee */}
              <div className="pt-2 text-center text-[11px] text-stone flex items-center justify-center gap-2">
                <WheelEmblem size={16} color="#B8975A" />
                <span>Zero deposit required to submit inquiry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Journeys */}
        {relatedPackages.length > 0 && (
          <div className="pt-16 border-t border-white/10 space-y-8">
            <div className="space-y-2">
              <span className="eyebrow text-gold">Complementary Horizons</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                Related Signature Journeys
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPackages.map((rel) => (
                <PackageCard key={rel.id} pkg={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar for Mobile Screen Reservations */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 bg-charcoal/95 border-t border-gold/30 backdrop-blur-md flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-stone uppercase block">Total</span>
          <span className="font-serif text-lg font-semibold text-gold-light">
            {format(grandTotal)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleProceedToBooking}
          className="px-6 py-3 rounded-subtle bg-gold text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm"
        >
          Reserve Journey
        </button>
      </div>
    </div>
  );
};
