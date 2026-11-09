import React from 'react';
import { BedDouble, Car, Headphones, ShieldCheck } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: BedDouble,
    title: 'Handpicked Stays',
    description: 'Vetted five-star sanctuaries, historic palaces & private island estates.',
  },
  {
    icon: Car,
    title: 'Private Transfers',
    description: 'Chauffeured Maybachs, private twin-engine helicopters & custom 4x4s.',
  },
  {
    icon: Headphones,
    title: '24/7 Concierge',
    description: 'Direct access to your dedicated Private Travel Director anytime worldwide.',
  },
  {
    icon: ShieldCheck,
    title: 'Best-Rate & Bond Guarantee',
    description: 'Direct partner terms, bespoke inclusions & comprehensive financial bonding.',
  },
];

export const TrustStrip: React.FC = () => {
  return (
    <div id="trust-strip" className="border-y border-gold/20 bg-charcoal/70 py-10 lg:py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-subtle border border-gold/30 bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon className="text-gold w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base text-ivory font-medium tracking-wide">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
