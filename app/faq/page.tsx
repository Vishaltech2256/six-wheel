import React from 'react';
import Link from 'next/link';
import { FAQS } from '@/data/faqs';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import { ArrowRight, HelpCircle, PhoneCall } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Addressed Inquiries | SIX WHEELS HOLIDAYS',
  description:
    'Answers regarding private concierge director services, financial bonding, cancellation terms, and bespoke itinerary customizations.',
};

export default function FAQPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="eyebrow text-gold">Clarity & Confidence</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-ivory leading-tight">
            Frequently Addressed
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light max-w-lg mx-auto leading-relaxed">
            Essential information regarding our private commissions, financial bonding, and
            round-the-clock concierge support.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-refined bg-charcoal/80 border border-gold/25 p-6 transition-all duration-300"
            >
              <summary className="font-serif text-lg sm:text-xl text-ivory cursor-pointer flex items-center justify-between list-none">
                <span className="font-normal pr-4">{faq.question}</span>
                <span className="text-gold text-2xl font-light shrink-0 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="pt-4 mt-4 border-t border-white/5 text-xs sm:text-sm text-stone font-light leading-relaxed space-y-2">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <WheelEmblem size={24} color="#B57C51" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Further Assistance Card */}
        <div className="p-8 rounded-refined bg-charcoal border border-gold/40 text-center space-y-4 shadow-luxury-md">
          <h3 className="font-serif text-2xl text-ivory font-light">
            Have a question not addressed here?
          </h3>
          <p className="text-xs text-stone max-w-md mx-auto leading-relaxed">
            Our Private Travel Directors are at your service for personal consultations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-subtle bg-gold text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm"
            >
              Contact Chambers
            </Link>
            <a
              href="tel:+917639341779"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/10 text-xs font-semibold uppercase tracking-luxury"
            >
              <PhoneCall size={13} className="text-gold" />
              <span>Call +91 76393 41779</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

