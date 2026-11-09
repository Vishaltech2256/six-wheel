import React from 'react';
import Link from 'next/link';
import { WheelEmblem } from '../brand/WheelEmblem';
import { Sparkles, Compass, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Tell Us Your Dream',
    description:
      'Share your aspirations, preferred pace, special milestones, or aesthetic desires through our bespoke planner or private consultation.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'We Design It',
    description:
      'Our seasoned Travel Directors choreograph a tailored blueprint, reserving prime suites, secret villas, and private transport connections.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'You Approve',
    description:
      'Review a cinematic day-by-day itinerary. Refine culinary notes, excursion timings, and private aviation details until completely seamless.',
    icon: CheckCircle,
  },
  {
    number: '04',
    title: 'We Handle Everything',
    description:
      'Step into motion with effortless tranquility. Your 24/7 concierge, private chauffeurs, and local hosts handle every detail invisibly.',
    icon: ShieldCheck,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 lg:mb-20">
          <span className="eyebrow text-gold">The Atelier Process</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-light leading-tight">
            Effortless Travel, Masterfully Crafted
          </h2>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            From the initial spark of inspiration to your triumphant return home, our six-wheel
            precision guides every mile.
          </p>
        </div>

        {/* 4 Steps Grid with connecting wheel emblem motif */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-refined bg-charcoal/60 border border-gold/25 hover:border-gold transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Step Header: Number & Wheel Motif */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-serif text-3xl text-gold-light/60 font-light group-hover:text-gold transition-colors">
                    {step.number}
                  </span>
                  <div className="transition-transform duration-500 group-hover:rotate-45">
                    <WheelEmblem size={24} color="#B8975A" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-subtle bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-serif text-xl text-ivory font-normal tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 text-[10px] uppercase tracking-luxury text-gold/80 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Seamless Execution</span>
                  <ArrowRight size={11} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/plan-my-journey"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Begin Your Bespoke Inquiry</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
