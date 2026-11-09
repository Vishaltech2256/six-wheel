import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HOTELS, getHotelBySlug, getDestinationBySlug } from '@/data';
import { LightboxGallery } from '@/components/ui/LightboxGallery';
import { WishlistButton } from '@/components/ui/WishlistButton';
import {
  Star,
  MapPin,
  Sparkles,
  Utensils,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  Bed,
  Maximize2,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return HOTELS.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const hotel = getHotelBySlug(params.slug);
  if (!hotel) return { title: 'Hotel Not Found' };

  return {
    title: `${hotel.name} - 5-Star Luxury Stay`,
    description: hotel.description,
    openGraph: {
      title: `${hotel.name} | SIX WHEELS HOLIDAYS`,
      description: hotel.description,
      images: [{ url: hotel.heroImage }],
    },
  };
}

export default function HotelDetailPage({ params }: Props) {
  const hotel = getHotelBySlug(params.slug);
  if (!hotel) notFound();

  const destination = getDestinationBySlug(hotel.destinationId);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-navy min-h-screen text-ivory">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-stone border-b border-white/10 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/hotels" className="hover:text-gold transition-colors">
              Stays & Palaces
            </Link>
            <span>/</span>
            <span className="text-gold-light truncate max-w-xs">{hotel.name}</span>
          </nav>
          <WishlistButton id={hotel.id} label="Save Hotel" />
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs text-stone">•</span>
            <span className="text-xs text-gold-light font-medium uppercase tracking-wider">
              {hotel.destinationName}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight">
            {hotel.name}
          </h1>

          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-stone font-light">
            <MapPin size={14} className="text-gold" />
            <span>{hotel.location}</span>
          </p>
        </div>

        {/* Gallery */}
        <LightboxGallery images={[hotel.heroImage, ...hotel.images]} title={hotel.name} />

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <span className="eyebrow text-gold">The Sanctuary</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                Philosophy of Hospitality
              </h2>
              <p className="text-sm sm:text-base text-stone font-light leading-relaxed">
                {hotel.description}
              </p>
            </section>

            {/* Highlights */}
            <section className="space-y-4 p-6 rounded-refined bg-charcoal border border-gold/30">
              <span className="eyebrow text-gold">Exclusive Features</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {hotel.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-ivory/90">
                    <Sparkles size={14} className="text-gold shrink-0 mt-0.5" />
                    <span className="font-light">{hl}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Available Rooms & Villas */}
            <section className="space-y-6">
              <div className="space-y-1">
                <span className="eyebrow text-gold">Accommodations</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                  Suites & Private Villas
                </h2>
              </div>

              <div className="space-y-6">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-refined bg-charcoal/80 border border-white/10 hover:border-gold/30 transition-colors"
                  >
                    <div className="md:col-span-5 relative aspect-[16/10] rounded-subtle overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xl text-ivory font-normal">{room.name}</h4>
                          <span className="font-serif text-lg font-semibold text-gold-light">
                            ${room.pricePerNight.toLocaleString()}{' '}
                            <span className="text-[11px] text-stone font-sans font-normal">/ night</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-stone">
                          <span className="flex items-center gap-1">
                            <Maximize2 size={12} className="text-gold" />
                            <span>{room.size}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed size={12} className="text-gold" />
                            <span>{room.bedType}</span>
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {room.amenities.map((am, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-subtle bg-navy-950/80 border border-white/10 text-[10px] text-stone uppercase tracking-wider"
                            >
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-stone">Capacity: {room.capacity}</span>
                        <Link
                          href={`/plan-my-journey?hotel=${hotel.id}&room=${room.id}`}
                          className="px-4 py-2 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          Inquire for Stay
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Comprehensive Amenities */}
            <section className="space-y-4">
              <span className="eyebrow text-gold">Resort Amenities</span>
              <h2 className="font-serif text-2xl text-ivory font-light">Facilities & Privileges</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {hotel.amenities.map((am, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-subtle bg-charcoal/50 border border-white/10 text-xs text-stone flex items-center gap-2"
                  >
                    <CheckCircle2 size={13} className="text-gold shrink-0" />
                    <span className="truncate">{am}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location Map Placeholder with GPS Coordinates */}
            <section className="space-y-4">
              <span className="eyebrow text-gold">Sanctum Position</span>
              <h2 className="font-serif text-2xl text-ivory font-light">Location & Seclusion</h2>
              <div className="relative aspect-[21/9] rounded-refined overflow-hidden border border-gold/30 bg-navy-950 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <MapPin className="w-8 h-8 text-gold animate-bounce" />
                <h4 className="font-serif text-lg text-ivory">{hotel.name}</h4>
                <p className="text-xs text-stone max-w-md">{hotel.location}</p>
                <div className="px-3 py-1 rounded-full bg-navy border border-white/10 text-[10px] text-stone uppercase tracking-widest">
                  Private Helipad / Chauffeur Access Coordinates: 46.498° N, 9.839° E
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-8 rounded-refined bg-charcoal border border-gold/40 shadow-luxury-gold space-y-6">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-xs text-stone uppercase tracking-wider block">
                  Nightly Reserve from
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold text-gold-light">
                    ${hotel.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone">/ night</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone">
                <div className="flex items-center gap-2">
                  <Utensils size={14} className="text-gold" />
                  <span>{hotel.mealPlan}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold" />
                  <span>Best-rate guarantee & VIP upgrade priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-gold" />
                  <span>Complimentary bottle of vintage champagne upon arrival</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/plan-my-journey?hotel=${hotel.id}`}
                  className="w-full text-center py-3.5 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm block transition-all hover:scale-[1.02]"
                >
                  Reserve Through Concierge
                </Link>

                {destination && (
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="w-full text-center py-3 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/15 text-xs font-semibold uppercase tracking-luxury block transition-colors"
                  >
                    View Destination Details
                  </Link>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-stone uppercase tracking-widest block">
                  Private Reservations Desk
                </span>
                <div className="flex items-center justify-center gap-2 text-xs text-gold">
                  <a
                    href="tel:+917639341779"
                    className="hover:underline font-medium font-serif"
                  >
                    +91 76393 41779
                  </a>
                  <span className="text-stone/40">•</span>
                  <a
                    href="tel:+917708393572"
                    className="hover:underline font-medium font-serif"
                  >
                    +91 77083 93572
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
