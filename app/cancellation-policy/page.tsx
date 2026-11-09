import React from 'react';
import Link from 'next/link';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import { ShieldCheck, RefreshCw, Calendar, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation & Guarantee Policy | SIX WHEELS HOLIDAYS',
  description:
    'Comprehensive cancellation flexibility, travel credit options, and financial guarantees.',
};

export default function CancellationPolicyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="eyebrow text-gold">Flexibility & Protection</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
            Cancellation & Flexibility Policy
          </h1>
          <p className="text-xs text-stone">Designed with Generous Luxury Standards</p>
        </div>

        <div className="p-8 sm:p-12 rounded-refined bg-charcoal/80 border border-gold/30 text-stone text-xs sm:text-sm font-light space-y-8 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              1. The 45-Day Grace Window
            </h2>
            <p>
              Journeys cancelled forty-five (45) days or more prior to the scheduled departure date
              qualify for a full travel credit voucher valid for 24 months across any global
              blueprint, or a refund minus directly non-refundable lodge/private charter permits.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              2. Cancellation Timeline Schedule
            </h2>
            <div className="space-y-2 border border-white/10 rounded-subtle p-4 bg-navy-950">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-ivory font-medium">45+ Days Prior</span>
                <span className="text-gold-light">100% Travel Credit or Cash Refund*</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ivory font-medium">30 to 44 Days Prior</span>
                <span className="text-gold-light">75% Travel Credit</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ivory font-medium">15 to 29 Days Prior</span>
                <span className="text-gold-light">50% Travel Credit</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ivory font-medium">Under 14 Days</span>
                <span className="text-stone">Subject to direct lodge cancellation terms</span>
              </div>
            </div>
            <p className="text-[11px] text-stone">
              *Minus unrecoverable third-party national park conservation fees or private jet slot
              authorizations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              3. Complimentary Rescheduling
            </h2>
            <p>
              You may shift your journey departure dates within 12 months with zero administrative
              fees when notification is provided at least 30 days prior to departure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              4. Travel Insurance Requirement
            </h2>
            <p>
              We strongly advise all patrons to hold comprehensive medical, trip interruption, and
              private aviation cancellation insurance. Our concierge can recommend preferred
              high-net-worth underwriters.
            </p>
          </section>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs text-gold-light hover:text-gold uppercase tracking-wider font-semibold"
          >
            <span>Have questions regarding your specific journey? Contact Concierge &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

