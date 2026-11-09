'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Heart, CheckCircle2, MessageCircle, ArrowRight, MapPin } from 'lucide-react';

interface CustomerStory {
  id: string;
  names: string;
  location: string;
  destination: string;
  badge: string;
  quote: string;
  image: string;
  rating: number;
  packageLink?: string;
}

const HAPPY_CUSTOMERS: CustomerStory[] = [
  {
    id: 'cust-1',
    names: 'Karthik & Friends (8 Members)',
    location: 'Chennai',
    destination: 'Munnar • Tea Hills & Off-road Jeep Safari, Kerala',
    badge: 'Off-road Jeep Safari',
    quote:
      'Mohan arranged our Munnar off-road jeep safari through the tea plantations and sunrise point. Unbelievable adventure and memories!',
    image: '/customers/tea-estate-jeep.jpg',
    rating: 5,
    packageLink: '#package-munnar',
  },
  {
    id: 'cust-2',
    names: 'Suresh, Mythili & Group (35 Members)',
    location: 'Salem & Coimbatore',
    destination: 'Kolukkumalai & Vagamon • High Altitude Peak Safari',
    badge: 'Mountain Peak Expedition',
    quote:
      'Coordinating a fleet of 4x4 jeeps for 35 of us to the highest peak viewpoint was handled with top-notch safety and perfection!',
    image: '/customers/mountain-jeep-safari.jpg',
    rating: 5,
    packageLink: '#package-munnar',
  },
  {
    id: 'cust-3',
    names: 'Vignesh, Deepa & Friends',
    location: 'Bangalore & Hosur',
    destination: 'Wonderla Resort & Amusement Tour • Bangalore',
    badge: 'Theme Park Getaway',
    quote:
      'Weekend trip with college friends to Wonderla! Mohan organized our private transit and tickets seamlessly. Full day of pure thrills!',
    image: '/customers/wonderla-group.jpg',
    rating: 5,
    packageLink: '#package-munnar',
  },
  {
    id: 'cust-4',
    names: 'The Natarajan Family & Relatives (28 Members)',
    location: 'Coimbatore & Tiruppur',
    destination: 'Grand South India Temple Tour • AC Luxury Coach',
    badge: 'Grand Family Tour',
    quote:
      'Traveling with 28 family members from kids to grandparents in a luxury AC coach. Punctual driver, smooth journey, and zero hassle!',
    image: '/customers/luxury-bus-group.jpg',
    rating: 5,
    packageLink: '#package-munnar',
  },
  {
    id: 'cust-5',
    names: 'Balaji, Soundarya & Group (32 Members)',
    location: 'Tiruchirappalli',
    destination: 'Ooty & Kodaikanal • Pine Forest & Valley Tour',
    badge: 'Pine Valley Retreat',
    quote:
      'Row boating on the lake, cool forest walks, and homemade chocolates! Mohan took care of all meals, cottages, and transport flawlessly.',
    image: '/customers/pine-forest-group.jpg',
    rating: 5,
    packageLink: '#package-munnar',
  },
  {
    id: 'cust-6',
    names: 'Murugesan, Shanthi & Family',
    location: 'Tirunelveli & Madurai',
    destination: 'Kodaikanal & Vagamon • Misty Hilltop Viewpoint Tour',
    badge: 'Misty Hilltop Tour',
    quote:
      'Panoramic mountain views, cool valley breeze, and wonderful hospitality. Mohan took care of our entire family with utmost warmth!',
    image: '/customers/hilltop-viewpoint-group.jpg',
    rating: 5,
    packageLink: '#package-munnar',
  },
];

export const HappyCustomers: React.FC = () => {
  // Duplicate for seamless infinite loop
  const doubleList = [...HAPPY_CUSTOMERS, ...HAPPY_CUSTOMERS];

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-navy-950 via-navy to-navy-950 relative overflow-hidden border-t border-gold/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-radial-gradient from-amber-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      {/* Section Header */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-sans font-semibold tracking-luxury uppercase">
          <Heart size={13} className="fill-gold text-gold" />
          <span>Verified Travelers • 100% Satisfaction</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory font-light tracking-tight">
          Happy Customers
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-stone font-light max-w-2xl mx-auto leading-relaxed">
          Real moments of joy, unhurried bliss, and extraordinary memories captured across our
          curated holiday journeys in Tamil Nadu, Kerala, and Andhra Pradesh.
        </p>
      </div>

      {/* Sliding Motion Gallery */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient fade masks for smooth infinite look */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-navy-950 via-navy-950/80 to-transparent" />

        {/* Continuous sliding marquee track */}
        <div className="animate-marquee-slow py-4">
          {doubleList.map((customer, index) => (
            <div
              key={`${customer.id}-${index}`}
              className="group relative w-[300px] sm:w-[350px] aspect-[4/5] rounded-refined mx-3.5 overflow-hidden border border-white/10 hover:border-gold/60 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,63,0.35)] shrink-0 cursor-pointer bg-navy-900"
            >
              {/* Full-bleed picture with zoom on hover */}
              <Image
                src={customer.image}
                alt={customer.names}
                fill
                sizes="(max-width: 768px) 300px, 350px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Multi-layer atmospheric dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

              {/* Top Floating Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-navy-950/85 backdrop-blur-md border border-gold/40 text-[10px] uppercase tracking-wider font-semibold text-gold">
                  {customer.badge}
                </span>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-950/85 backdrop-blur-md border border-white/15 text-gold text-xs">
                  {[...Array(customer.rating)].map((_, i) => (
                    <Star key={i} size={11} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>

              {/* Bottom Customer Details & Quote */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2.5 z-10 text-left">
                <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span className="text-[11px] tracking-wider uppercase">Verified Patron</span>
                </div>

                <h3 className="font-serif text-lg text-ivory font-medium group-hover:text-gold-light transition-colors leading-snug">
                  {customer.names}
                </h3>

                <p className="text-[11px] text-stone font-sans">
                  {customer.destination}
                </p>

                <p className="text-xs text-ivory/90 font-serif italic line-clamp-2 leading-relaxed pt-1 border-t border-white/10">
                  &ldquo;{customer.quote}&rdquo;
                </p>

                {/* Package CTA Button */}
                <div className="pt-1">
                  <a
                    href={customer.packageLink || '#package-munnar'}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-full bg-gold hover:bg-gold-hover text-navy text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-gold/20 hover:scale-[1.02]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span>Package</span>
                    <ArrowRight size={13} className="stroke-[2.5]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Direct Action */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center pt-14 relative z-10">
        <a
          href="https://wa.me/917639341779?text=Hi%20Mohan%2C%20I%20need%20to%20book%20a%20tour%20package%20with%20Six%20Wheels%20Holidays.%20Please%20suggest%20the%20best%20plans%20and%20places%20to%20visit."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md transition-all duration-300 hover:scale-105"
        >
          <MessageCircle size={15} />
          <span>Chat with Mohan on WhatsApp & Plan Your Holiday</span>
        </a>
      </div>
    </section>
  );
};

