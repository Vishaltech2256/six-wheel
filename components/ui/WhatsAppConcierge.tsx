'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, PhoneCall } from 'lucide-react';
import { WheelEmblem } from '../brand/WheelEmblem';

export const WhatsAppConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Open WhatsApp with prefilled message
    const encoded = encodeURIComponent(
      `Hello Six Wheels Concierge, I am inquiring regarding a luxury journey: "${message.trim()}"`
    );
    window.open(`https://wa.me/917639341779?text=${encoded}`, '_blank');

    setSent(true);
    setTimeout(() => {
      setMessage('');
      setSent(false);
      setIsOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Concierge Pill / Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-charcoal/95 border border-gold/40 text-ivory shadow-luxury-gold backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-navy-900"
          aria-label="Open 24/7 Luxury Travel Concierge"
        >
          <div className="relative flex items-center justify-center">
            <WheelEmblem size={22} color="#B8975A" animate />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-gold leading-none">
              24/7 Concierge
            </span>
            <span className="text-[10px] text-stone tracking-wider font-sans mt-0.5 leading-none">
              Live Private Assistance
            </span>
          </div>
        </button>
      )}

      {/* Concierge Flyout Modal */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] rounded-refined bg-charcoal border border-gold/40 shadow-luxury-lg overflow-hidden animate-fade-in text-ivory">
          {/* Header */}
          <div className="p-4 bg-navy-950/90 border-b border-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
                <WheelEmblem size={24} color="#B8975A" />
              </div>
              <div>
                <h4 className="font-serif text-base tracking-wide text-ivory">
                  Private Travel Concierge
                </h4>
                <p className="text-[11px] text-stone flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Available now • Avg reply &lt; 2 min
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-subtle text-stone hover:text-ivory transition-colors"
              aria-label="Close concierge"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3.5 bg-navy/40">
            <div className="bg-navy-900/80 p-3 rounded-subtle border border-white/5 text-xs text-ivory/90 leading-relaxed">
              <p className="flex items-center gap-1.5 text-gold-light font-medium mb-1">
                <Sparkles size={13} className="text-gold" />
                Good day from Six Wheels Holidays.
              </p>
              How may we craft your upcoming journey? We are pleased to assist with bespoke
              itineraries, private charters, or immediate reservations.
            </div>

            {sent ? (
              <div className="py-4 text-center space-y-1">
                <p className="text-gold text-sm font-serif">Connecting with Concierge...</p>
                <p className="text-xs text-stone">WhatsApp opening in a moment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Inquiring for a 10-day private villa in the Maldives this November..."
                  className="w-full text-xs bg-navy-950/80 border border-white/10 rounded-subtle p-3 text-ivory placeholder:text-stone focus:outline-none focus:border-gold transition-colors resize-none"
                  required
                />

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+917639341779"
                      className="inline-flex items-center gap-1 text-[11px] text-stone hover:text-gold transition-colors"
                      title="Call primary line"
                    >
                      <PhoneCall size={12} />
                      <span>7639341779</span>
                    </a>
                    <span className="text-stone/40">/</span>
                    <a
                      href="tel:+917708393572"
                      className="text-[11px] text-stone hover:text-gold transition-colors"
                      title="Call secondary line"
                    >
                      <span>7708393572</span>
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-hover text-navy text-xs font-semibold uppercase tracking-wider rounded-subtle transition-all duration-200"
                  >
                    <span>Connect Live</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
