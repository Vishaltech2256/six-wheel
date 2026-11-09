import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  DESTINATIONS,
  getDestinationBySlug,
  getPackagesByDestination,
  getHotelsByDestination,
} from '@/data';
import { REVIEWS } from '@/data/reviews';
import { FAQS } from '@/data/faqs';
import { LightboxGallery } from '@/components/ui/LightboxGallery';
import { PackageCard } from '@/components/cards/PackageCard';
import { HotelCard } from '@/components/cards/HotelCard';
import { WishlistButton } from '@/components/ui/WishlistButton';
import {
  Calendar,
  CloudSun,
  Star,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) return { title: 'Destination Not Found' };

  return {
    title: `${dest.name} - Luxury Travel & Private Escapes`,
    description: dest.description,
    openGraph: {
      title: `${dest.name} | SIX WHEELS HOLIDAYS`,
      description: dest.tagline,
      images: [{ url: dest.heroImage }],
    },
  };
}

export default function DestinationDetailPage({ params }: Props) {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) notFound();

  const packages = getPackagesByDestination(dest.id);
  const hotels = getHotelsByDestination(dest.id);
  const destinationReviews = REVIEWS.slice(0, 3);
  const relevantFaqs = FAQS.slice(0, 4);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-navy min-h-screen text-ivory">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between text-xs text-stone border-b border-white/10 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-gold transition-colors">
              Destinations
            </Link>
            <span>/</span>
            <span className="text-gold-light">{dest.name}</span>
          </nav>
          <WishlistButton id={dest.id} label="Save Sanctum" />
        </div>

        {/* Hero Title & Tagline */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-sans uppercase tracking-luxury">
            <MapPin size={12} className="text-gold" />
            <span>{dest.region} • {dest.country}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-ivory leading-tight">
            {dest.name}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-gold-light/90 italic font-light">
            &ldquo;{dest.tagline}&rdquo;
          </p>
        </div>

        {/* Lightbox Image Gallery */}
        <LightboxGallery images={[dest.heroImage, ...dest.gallery]} title={dest.name} />

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Overview, Climate, Highlights, Stays, Packages */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <section className="space-y-4">
              <span className="eyebrow text-gold">Overview</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                The Sanctum Essence
              </h2>
              <p className="text-sm sm:text-base text-stone font-light leading-relaxed">
                {dest.description}
              </p>
            </section>

            {/* Best Time to Visit & Climate Strip */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-refined bg-charcoal border border-gold/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-subtle bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                  <Calendar size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base text-ivory font-medium">Optimal Season</h4>
                  <p className="text-xs text-stone font-light leading-relaxed">{dest.bestTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-subtle bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                  <CloudSun size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base text-ivory font-medium">Microclimate</h4>
                  <p className="text-xs text-stone font-light leading-relaxed">{dest.climate}</p>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className="space-y-6">
              <span className="eyebrow text-gold">Curated Experiences</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                Moments Beyond Ordinary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-subtle bg-charcoal/60 border border-white/10 flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-xs text-ivory/90 leading-relaxed font-light">{hl}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Signature Packages for this Destination */}
            {packages.length > 0 && (
              <section className="space-y-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="eyebrow text-gold">Blueprints</span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                      Signature Itineraries
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </section>
            )}

            {/* Featured Stays & Palaces */}
            {hotels.length > 0 && (
              <section className="space-y-6 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <span className="eyebrow text-gold">Accommodations</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                    Handpicked Palaces & Hideaways
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </section>
            )}

            {/* Guest Reviews */}
            <section className="space-y-6 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="eyebrow text-gold">Traveler Reflections</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                  Guest Reviews
                </h2>
              </div>

              <div className="space-y-4">
                {destinationReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-refined bg-charcoal/80 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={13} className="fill-gold text-gold" />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone">{rev.date}</span>
                    </div>
                    <h4 className="font-serif text-lg text-ivory font-medium">&ldquo;{rev.title}&rdquo;</h4>
                    <p className="text-xs text-stone font-light leading-relaxed">{rev.comment}</p>
                    <div className="text-[11px] text-gold-light pt-1">
                      {rev.author} • {rev.location}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Accordion */}
            <section className="space-y-6 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="eyebrow text-gold">Essential Inquiries</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                  Frequently Addressed
                </h2>
              </div>

              <div className="space-y-3">
                {relevantFaqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-subtle bg-charcoal/60 border border-white/10 p-4 transition-colors"
                  >
                    <summary className="font-serif text-base text-ivory cursor-pointer flex items-center justify-between list-none">
                      <span>{faq.question}</span>
                      <span className="text-gold text-lg transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="text-xs text-stone font-light mt-3 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Card & Concierge Hotline */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-8 rounded-refined bg-charcoal border border-gold/40 shadow-luxury-gold space-y-6">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-xs text-stone uppercase tracking-wider block">
                  Journeys to {dest.name} from
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold text-gold-light">
                    ${dest.startingPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone">/ traveler</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-gold" />
                  <span>Fully bespoke itinerary creation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gold" />
                  <span>Avg trip duration: 7 to 10 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold" />
                  <span>Private airport VIP tarmac meet & greet</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/plan-my-journey?dest=${dest.id}`}
                  className="w-full text-center py-3.5 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm block transition-all hover:scale-[1.02]"
                >
                  Commission This Journey
                </Link>

                {packages.length > 0 && (
                  <Link
                    href={`/packages/${packages[0].slug}`}
                    className="w-full text-center py-3 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/15 text-xs font-semibold uppercase tracking-luxury block transition-colors"
                  >
                    View Flagship Package
                  </Link>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 text-center space-y-1.5">
                <span className="text-[10px] text-stone uppercase tracking-widest block">
                  Direct Concierge Support
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
