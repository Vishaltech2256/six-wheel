'use client';

import React, { useState } from 'react';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Bespoke Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="eyebrow text-gold">Concierge Chambers</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-ivory leading-tight">
            Connect with Our Atelier
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            Direct global communication. We respond discreetly to all inquiries within two hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-md space-y-6">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="eyebrow text-gold text-[10px]">Flagship Chambers</span>
                <h3 className="font-serif text-2xl text-ivory font-normal">Mayfair Atelier</h3>
                <p className="text-xs text-stone font-light">
                  14 Berkeley Square, Mayfair, London W1J 6BQ, United Kingdom
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gold shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-stone block">24/7 Concierge Hotlines</span>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+917639341779"
                        className="text-ivory hover:text-gold transition-colors font-semibold font-sans text-sm sm:text-base tracking-wide block tabular-nums"
                      >
                        +91 76393 41779
                      </a>
                      <a
                        href="tel:+917708393572"
                        className="text-ivory hover:text-gold transition-colors font-semibold font-sans text-sm sm:text-base tracking-wide block tabular-nums"
                      >
                        +91 77083 93572
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone block">Private Inquiries & Dispatches</span>
                    <a
                      href="mailto:concierge@sixwheelsholidays.com"
                      className="text-ivory hover:text-gold transition-colors font-medium"
                    >
                      concierge@sixwheelsholidays.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone block">Service Hours</span>
                    <span className="text-gold-light">24 Hours Daily • 365 Days Worldwide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-[16/10] rounded-refined bg-charcoal/70 border border-gold/30 overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-2">
              <MapPin className="text-gold w-8 h-8 animate-bounce" />
              <h4 className="font-serif text-base text-ivory">Berkeley Square, London</h4>
              <p className="text-[11px] text-stone">
                In-person consultations hosted by private appointment at our Mayfair residence.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-refined bg-charcoal/90 border border-gold/30 shadow-luxury-md">
            {sent ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto text-gold">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="font-serif text-2xl text-ivory">Message Entrusted to Director</h3>
                <p className="text-xs text-stone max-w-sm mx-auto">
                  Thank you, {name}. A member of our senior concierge team will reach out via your
                  chosen contact method shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="eyebrow text-gold text-[10px]">Private Dispatch</span>
                  <h3 className="font-serif text-2xl text-ivory font-light">Send an Inquiry</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Harrington"
                      className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold"
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
                      placeholder="harrington@estate.co.uk"
                      className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 76393 41779"
                      className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Topic of Interest
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="General Bespoke Inquiry">General Bespoke Inquiry</option>
                      <option value="Private Aviation & Yacht Charter">
                        Private Aviation & Yacht Charter
                      </option>
                      <option value="Multi-Generational Villa Buyout">
                        Multi-Generational Villa Buyout
                      </option>
                      <option value="Partnership & Press">Partnership & Press</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] text-stone uppercase tracking-wider block">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please share any destination ideas, dates, or specific aspirations..."
                      className="w-full p-3.5 rounded-subtle bg-navy-950 border border-white/10 text-xs text-ivory focus:outline-none focus:border-gold resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone">
                    <ShieldCheck size={14} className="text-gold" />
                    <span>Confidentiality guaranteed</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-subtle bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-luxury shadow-luxury-md"
                  >
                    <span>Transmit Message</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

