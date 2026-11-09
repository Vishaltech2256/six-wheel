'use client';

import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const agreed = localStorage.getItem('sixwheels_cookies');
      if (!agreed) {
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('sixwheels_cookies', 'accepted');
    } catch {
      // Ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie Preferences"
      className="fixed bottom-6 left-6 z-40 max-w-md p-4 rounded-refined bg-charcoal/95 border border-gold/30 shadow-luxury-lg backdrop-blur-md animate-fade-in text-xs text-ivory/80"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="leading-relaxed">
          We use refined cookies to remember your travel preferences, curated wishlist, and currency
          settings with utmost privacy.
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-subtle bg-gold hover:bg-gold-hover text-navy font-semibold text-[11px] tracking-wider uppercase transition-colors"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="px-2.5 py-1.5 text-stone hover:text-ivory text-[11px] uppercase transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </aside>
  );
};
