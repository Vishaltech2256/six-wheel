'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DESTINATIONS } from '@/data/destinations';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Heart,
  Phone,
  Mail,
  Send,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const INTERESTS = [
  'Private Overwater Villas',
  'Chartered Superyacht / Riva Cruising',
  'Private Helicopter / Seaplane Charters',
  'Michelin & Private Chef Dining',
  'Ayurvedic & Mineral Thermal Wellness',
  'Exclusive After-Hours Temple / Museum Entry',
  'Big Five Conservation Safaris',
  'Historic Scenic Luxury Trains (Glacier Express / Scotsman)',
];

const BUDGET_TIERS = [
  { label: '$5,000 – $10,000', sub: 'Boutique luxury & five-star suites' },
  { label: '$10,000 – $25,000', sub: 'Premier villas, private guides & charters' },
  { label: '$25,000 – $50,000', sub: 'Private island retreats & helicopter links' },
  { label: '$50,000+', sub: 'Ultra-exclusive private buyouts & aviation' },
];

export const PlanMyJourneyClient: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(['maldives']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Private Overwater Villas',
    'Michelin & Private Chef Dining',
  ]);
  const [estimatedMonth, setEstimatedMonth] = useState('Autumn 2026 (Sep - Nov)');
  const [duration, setDuration] = useState('8 to 10 Days');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [budgetTier, setBudgetTier] = useState('$10,000 – $25,000');
  const [celebration, setCelebration] = useState('');
  const [specialWishes, setSpecialWishes] = useState('');

  // Contact
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp' | 'phone'>('whatsapp');
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');

  const toggleDestination = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SW-ATELIER-${Math.floor(10000 + Math.random() * 90000)}`;
    setInquiryRef(ref);
    setSubmitted(true);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-sans uppercase tracking-luxury">
            <WheelEmblem size={16} color="#B57C51" animate={!submitted} />
            <span>Bespoke Travel Atelier</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
            {submitted ? 'Inquiry Entrusted to Our Directors' : 'Commission a Bespoke Journey'}
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light max-w-lg mx-auto">
            {submitted
              ? `Reference ${inquiryRef}. Your dedicated Private Travel Director is reviewing your vision.`
              : 'Tell us how you desire to travel. We curate every milestone, suite, and connection without compromise.'}
          </p>

          {!submitted && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    currentStep >= step ? 'w-12 bg-gold' : 'w-6 bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Form Chamber */}
        <div className="p-6 sm:p-10 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-lg">
          {submitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-10 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto text-gold">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
                  Vision Received with Pleasure
                </h3>
                <p className="text-xs text-stone max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-ivory">{fullName || 'Esteemed Guest'}</strong>.
                  Our Mayfair team has logged inquiry{' '}
                  <span className="text-gold font-mono font-medium">{inquiryRef}</span>.
                </p>
              </div>

              <div className="p-6 rounded-refined bg-navy-950 border border-gold/20 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone">Sanctum Wishes:</span>
                  <span className="text-ivory font-medium">
                    {selectedDestinations.length > 0
                      ? selectedDestinations
                          .map((d) => DESTINATIONS.find((dest) => dest.id === d)?.name || d)
                          .join(', ')
                      : 'Open to Director Suggestions'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Season:</span>
                  <span className="text-ivory font-medium">{estimatedMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Party Size:</span>
                  <span className="text-ivory font-medium">{adults} Adults</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Contact Preference:</span>
                  <span className="text-gold-light uppercase font-semibold">{contactMethod}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-3.5 rounded-subtle bg-gold text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm"
                >
                  Return to Homepage
                </Link>
                <Link
                  href="/packages"
                  className="px-6 py-3.5 rounded-subtle bg-white/5 hover:bg-white/10 text-ivory border border-white/10 text-xs uppercase tracking-luxury"
                >
                  Browse Signature Journeys
                </Link>
              </div>
            </div>
          ) : (
            /* MULTI-STEP BESPOKE QUESTIONNAIRE */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* STEP 1: DESTINATIONS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <span className="eyebrow text-gold">Phase 1</span>
                    <h2 className="font-serif text-2xl text-ivory font-light">
                      Where would you love to awaken?
                    </h2>
                    <p className="text-xs text-stone font-light">
                      Select one or multiple horizons that inspire you.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {DESTINATIONS.map((d) => {
                      const active = selectedDestinations.includes(d.id);
                      return (
                        <div
                          key={d.id}
                          onClick={() => toggleDestination(d.id)}
                          className={`p-3.5 rounded-subtle border cursor-pointer text-xs transition-all ${
                            active
                              ? 'bg-gold/20 border-gold text-ivory shadow-luxury-sm'
                              : 'bg-navy-950/60 border-white/10 text-stone hover:text-ivory hover:border-gold/30'
                          }`}
                        >
                          <span className="font-serif font-medium text-sm block">{d.name}</span>
                          <span className="text-[10px] text-stone mt-0.5 block">{d.region}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: TRAVEL STYLE & INTERESTS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <span className="eyebrow text-gold">Phase 2</span>
                    <h2 className="font-serif text-2xl text-ivory font-light">
                      What textures shape your ideal journey?
                    </h2>
                    <p className="text-xs text-stone font-light">
                      Choose the passions you wish woven into your blueprint.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INTERESTS.map((interest) => {
                      const active = selectedInterests.includes(interest);
                      return (
                        <div
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`p-4 rounded-subtle border cursor-pointer text-xs transition-all flex items-center justify-between ${
                            active
                              ? 'bg-gold/20 border-gold text-ivory'
                              : 'bg-navy-950/60 border-white/10 text-stone hover:text-ivory'
                          }`}
                        >
                          <span>{interest}</span>
                          {active && <CheckCircle2 size={16} className="text-gold shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: TIMING, PARTY & BUDGET */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <span className="eyebrow text-gold">Phase 3</span>
                    <h2 className="font-serif text-2xl text-ivory font-light">
                      Timing, Travelers & Investment
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-stone uppercase tracking-wider block">
                        Estimated Season
                      </label>
                      <select
                        value={estimatedMonth}
                        onChange={(e) => setEstimatedMonth(e.target.value)}
                        className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold cursor-pointer"
                      >
                        <option value="Spring 2026 (Mar - May)">Spring 2026 (Mar - May)</option>
                        <option value="Summer 2026 (Jun - Aug)">Summer 2026 (Jun - Aug)</option>
                        <option value="Autumn 2026 (Sep - Nov)">Autumn 2026 (Sep - Nov)</option>
                        <option value="Winter 2026/27 (Dec - Feb)">Winter 2026/27 (Dec - Feb)</option>
                        <option value="Flexible / Undecided">Flexible / Open</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-stone uppercase tracking-wider block">
                        Trip Duration
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold cursor-pointer"
                      >
                        <option value="5 to 7 Days">5 to 7 Days</option>
                        <option value="8 to 10 Days">8 to 10 Days</option>
                        <option value="11 to 14 Days">11 to 14 Days</option>
                        <option value="15+ Days">15+ Days Grand Tour</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-stone uppercase tracking-wider block">
                        Adult Travelers
                      </label>
                      <div className="flex items-center justify-between p-2.5 rounded-subtle bg-navy-950 border border-white/10 text-xs">
                        <span>{adults} Adults</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-6 h-6 rounded border border-gold/40 text-gold"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdults(adults + 1)}
                            className="w-6 h-6 rounded border border-gold/40 text-gold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-stone uppercase tracking-wider block">
                        Target Budget Per Person
                      </label>
                      <select
                        value={budgetTier}
                        onChange={(e) => setBudgetTier(e.target.value)}
                        className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold cursor-pointer"
                      >
                        {BUDGET_TIERS.map((tier) => (
                          <option key={tier.label} value={tier.label} className="bg-charcoal">
                            {tier.label} ({tier.sub})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs text-stone uppercase tracking-wider block">
                      Special Milestones & Celebration Notes
                    </label>
                    <input
                      type="text"
                      value={celebration}
                      onChange={(e) => setCelebration(e.target.value)}
                      placeholder="e.g. 30th Wedding Anniversary, Milestone Birthday, Honeymoon..."
                      className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT & DISPATCH */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <span className="eyebrow text-gold">Final Phase</span>
                    <h2 className="font-serif text-2xl text-ivory font-light">
                      Where may our directors reach you?
                    </h2>
                    <p className="text-xs text-stone font-light">
                      Strictly confidential. No promotional spam, ever.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[11px] text-stone uppercase tracking-wider block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Lord & Lady Pembroke"
                        className="w-full p-3 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-stone uppercase tracking-wider block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full p-3 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-stone uppercase tracking-wider block">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 76393 41779"
                        className="w-full p-3 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[11px] text-stone uppercase tracking-wider block">
                        Preferred Dispatch Channel
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['whatsapp', 'email', 'phone'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setContactMethod(method)}
                            className={`p-3 rounded-subtle border text-xs capitalize transition-colors ${
                              contactMethod === method
                                ? 'bg-gold/20 border-gold text-gold-light font-medium'
                                : 'bg-navy-950 border-white/10 text-stone hover:text-ivory'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[11px] text-stone uppercase tracking-wider block">
                        Any specific wishes, private aviation or dietary desires?
                      </label>
                      <textarea
                        rows={3}
                        value={specialWishes}
                        onChange={(e) => setSpecialWishes(e.target.value)}
                        placeholder="Tell us any particular touches you envision..."
                        className="w-full p-3 rounded-subtle bg-navy-950 border border-white/15 text-xs text-ivory focus:outline-none focus:border-gold resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-subtle bg-white/5 hover:bg-white/10 text-stone hover:text-ivory text-xs uppercase tracking-wider"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-sm"
                  >
                    <span>Continue</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md"
                  >
                    <span>Entrust Vision to Concierge</span>
                    <Send size={14} />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

