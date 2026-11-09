import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import { ShieldCheck, Compass, Sparkles, Award, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story & Philosophy | SIX WHEELS HOLIDAYS',
  description:
    'The philosophy behind Six Wheels Holidays: mechanical precision, effortless movement, and calm discretion in luxury travel.',
};

const PILLARS = [
  {
    title: 'The Six-Spoke Geometry',
    description:
      'The emblem embodies mechanical perfection and frictionless travel across six essential realms: private aviation, yacht charter, rail salon, heritage palace, wildlife concession, and personal concierge.',
  },
  {
    title: 'Understated Calm',
    description:
      'We reject pushy sales and garish excess. True luxury speaks softly with immaculate attention to detail, quiet rooms, and unhurried schedules.',
  },
  {
    title: 'Direct Multi-Generational Trust',
    description:
      'From 15th-generation tea masters in Kyoto to private game reserve trusts in Tanzania, our access is rooted in decades of personal reverence.',
  },
];

const TEAM = [
  {
    name: 'Julian Vance-Pembroke',
    role: 'Founder & Managing Director',
    bio: 'Former diplomatic attache with 22 years curating high-security royal and family office expeditions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Elena Rostova',
    role: 'Director of Alpine & Rail Journeys',
    bio: 'Engadin native and sommelier, pioneering private Excellence Class rail itineraries across Europe.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Kenzo Takahashi',
    role: 'Head of Far East Heritage & Arts',
    bio: 'Kyoto scholar and cultural emissary unlocking closed-door temple contemplations.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-sans uppercase tracking-luxury">
            <WheelEmblem size={16} color="#B57C51" animate />
            <span>The Six Wheels Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light text-ivory leading-tight">
            Journeys, Perfectly in Motion.
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-gold-light/90 italic font-light">
            &ldquo;Travel that moves like fine mechanical watchwork: calm, precise, and effortlessly
            fluid.&rdquo;
          </p>
        </div>

        {/* Brand Story Editorial */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-stone font-light leading-relaxed">
            <span className="eyebrow text-gold">The Genesis</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-light">
              Crafted for the Connoisseur of Slowness
            </h2>
            <p>
              SIX WHEELS HOLIDAYS was founded on a singular realization: true modern luxury is not
              measured in loud displays or rushed itineraries. It is found in unhurried stillness,
              unbroken privacy, and the quiet assurance that every mile has been anticipated by
              masters of the craft.
            </p>
            <p>
              The name draws inspiration from the timeless romance of classical grand tours—where
              six precision-engineered wheels carried discerning travelers across alpine passes and
              sunlit coasts, connecting seamlessly with private seaplanes, mahogany yachts, and
              secluded island sanctuaries.
            </p>
            <p>
              Today, our Mayfair atelier operates with discrete intimacy. We accept only a curated
              number of commissions each season, ensuring each journey receives the meticulous
              devotion of our senior directors.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-refined overflow-hidden border border-gold/30 shadow-luxury-gold">
            <Image
              src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80"
              alt="The Swiss Engadin Pass"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Three Core Pillars */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="eyebrow text-gold">Foundational Values</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
              The Tenets of Our Atelier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-refined bg-charcoal/80 border border-gold/30 space-y-3 shadow-luxury-sm"
              >
                <div className="w-10 h-10 rounded-subtle bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <WheelEmblem size={22} color="#B57C51" />
                </div>
                <h3 className="font-serif text-xl text-ivory font-medium">{p.title}</h3>
                <p className="text-xs text-stone font-light leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Leadership Team */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="eyebrow text-gold">Atelier Stewards</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
              Our Private Travel Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="p-6 rounded-refined bg-charcoal/70 border border-white/10 hover:border-gold/40 transition-colors text-center space-y-4"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold/40 mx-auto">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-ivory font-medium">{member.name}</h4>
                  <span className="text-[11px] text-gold uppercase tracking-wider block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-stone font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to Commission */}
        <div className="text-center p-12 rounded-refined bg-gradient-to-r from-charcoal via-navy-900 to-charcoal border border-gold/40 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
            Begin an Unhurried Conversation
          </h2>
          <p className="text-xs sm:text-sm text-stone max-w-md mx-auto leading-relaxed">
            We invite you to discuss your upcoming journey with our Mayfair directors.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md"
          >
            <span>Book My Enjoyment Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

