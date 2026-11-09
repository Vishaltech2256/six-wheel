import React from 'react';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Discretion Protocol | SIX WHEELS HOLIDAYS',
  description: 'Our commitment to uncompromising discretion, GDPR compliance, and client privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="eyebrow text-gold">Confidentiality Protocol</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
            Privacy & Discretion Statement
          </h1>
          <p className="text-xs text-stone">Reviewed January 2026 • Sovereign Privacy Standards</p>
        </div>

        <div className="p-8 sm:p-12 rounded-refined bg-charcoal/80 border border-gold/30 text-stone text-xs sm:text-sm font-light space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              1. Uncompromising Discretion
            </h2>
            <p>
              At SIX WHEELS HOLIDAYS, confidentiality is not a mere compliance policy—it is a core
              brand foundation. We serve patrons, family offices, and public dignitaries who require
              impeccable discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              2. Information We Collect
            </h2>
            <p>
              We collect only the essential information necessary to orchestrate private travel:
              full legal names for manifests and permits, contact details for concierge
              communications, and specific dietary, medical, or pillow preferences you explicitly
              entrust to us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              3. Protection of Biometric & Financial Data
            </h2>
            <p>
              All payment submissions are handled through encrypted multi-vault systems compliant
              with Level 1 PCI-DSS standards. We never retain full payment card CVV numbers on our
              servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
              4. Cookies & Browser Preferences
            </h2>
            <p>
              Our website uses strictly functional cookies to preserve your selected currency,
              saved wishlist journeys, and session state. We do not engage in invasive third-party
              ad-retargeting pixels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

