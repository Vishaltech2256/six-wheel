import React from 'react';
import Link from 'next/link';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SIX WHEELS HOLIDAYS',
  description: 'Terms of service, client financial bonding, and reservation agreements.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="eyebrow text-gold">Legal Framework</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-stone">Effective Date: January 1, 2026 • Version 4.2</p>
        </div>

        <div className="p-8 sm:p-12 rounded-refined bg-charcoal/80 border border-gold/30 text-stone text-xs sm:text-sm font-light space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              1. The Nature of Our Commissions
            </h2>
            <p>
              SIX WHEELS HOLIDAYS LTD (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Atelier&rdquo;)
              operates as a high-end bespoke travel organizer. All journeys, private charters, and
              accommodations featured on our website are curated blueprints that are tailored to the
              specific wishes of our patrons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              2. Financial Bonding & Protection
            </h2>
            <p>
              All patron funds are held in designated ring-fenced client trust accounts in
              compliance with the UK Package Travel Regulations and international aviation
              protection frameworks. Patrons enjoy full ATOL and IATA consumer protection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              3. Reservation Deposits & Payment Terms
            </h2>
            <p>
              A non-refundable deposit of 25% is due upon mutual approval of the journey blueprint.
              The remaining balance is payable sixty (60) calendar days prior to the journey
              commencement date. For reservations made within 60 days of travel, full settlement is
              required upon confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              4. Bespoke Alterations & Rescheduling
            </h2>
            <p>
              We recognize that private schedules may shift. Up to forty-five (45) days prior to
              departure, journeys may be rescheduled to alternate available dates within twelve
              months without penalty, subject only to direct partner hotel or private aviation rate
              differentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              5. Discretion & Patron Confidentiality
            </h2>
            <p>
              The names, flight itineraries, companion details, and personal preferences of our
              travelers are maintained under the strictest non-disclosure protocols and are never
              monetized, published, or transmitted to third parties except as strictly required for
              customs clearances or villa security.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

