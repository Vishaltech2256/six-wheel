'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Heart, CheckCircle2, MessageCircle } from 'lucide-react';

interface CustomerStory {
  id: string;
  names: string;
  location: string;
  destination: string;
  badge: string;
  quote: string;
  image: string;
  rating: number;
}

const HAPPY_CUSTOMERS: CustomerStory[] = [
  {
    id: 'cust-1',
    names: 'Karthik & Priya',
    location: 'Chennai',
    destination: 'Munnar • Tea Hills & Cloud Forests, Kerala',
    badge: 'Munnar Hills',
    quote:
      'Mohan arranged our Munnar holiday with a serene private tea estate villa and sunrise tour. Zero stress, pure bliss!',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=85',
    rating: 5,
  },
  {
    id: 'cust-2',
    names: 'Suresh & Mythili',
    location: 'Salem',
    destination: 'Ooty & Nilgiri Hills • Tamil Nadu',
    badge: 'Nilgiri Hills',
    quote:
      'The toy train ride, tea gardens, and Doddabetta mist were breath-taking. Six Wheels Holidays made our family trip memorable!',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=85',
    rating: 5,
  },
  {
    id: 'cust-3',
    names: 'Vignesh & Deepa',
    location: 'Bangalore',
    destination: 'Alleppey Backwaters • Houseboat Cruise, Kerala',
    badge: 'Backwater Houseboat',
    quote:
      'Cruising through palm-fringed backwaters on a luxury private houseboat with hot Kerala meals. Truly five-star experience!',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=85',
    rating: 5,
  },
  {
    id: 'cust-4',
    names: 'The Natarajan Family (8 Members)',
    location: 'Coimbatore',
    destination: 'Madurai • Meenakshi Temple, Tamil Nadu',
    badge: 'Heritage & Temple Tour',
    quote:
      'Traveling with elders and kids can be tough, but Mohan managed seamless temple darshan and luxury tempo traveler. Excellent!',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=85',
    rating: 5,
  },
  {
    id: 'cust-5',
    names: 'Balaji & Soundarya',
    location: 'Tiruchirappalli',
    destination: 'Araku Valley & Borra Caves • Andhra Pradesh',
    badge: 'Eastern Ghats Odyssey',
    quote:
      'The scenic valley drive, aromatic coffee plantations, and Borra Caves exploration were fantastic. Superb hospitality!',
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=85',
    rating: 5,
  },
  {
    id: 'cust-6',
    names: 'Murugesan & Shanthi',
    location: 'Tirunelveli',
    destination: 'Tirupati & Tirumala Sacred Hills • Andhra Pradesh',
    badge: 'Sacred Pilgrimage',
    quote:
      'Peaceful hill darshan, prompt hotel arrangements, and safe mountain driving. Mohan ensured complete peace of mind for our parents.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=85',
    rating: 5,
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

                <p className="text-xs text-ivory/90 font-serif italic line-clamp-3 leading-relaxed pt-1 border-t border-white/10">
                  &ldquo;{customer.quote}&rdquo;
                </p>
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

