'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencyCode } from '@/types';
import { ChevronDown } from 'lucide-react';

export const CurrencySwitcher: React.FC<{ variant?: 'dark' | 'light' }> = ({
  variant = 'dark',
}) => {
  const { currency, setCurrency, allCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wider rounded-subtle border transition-colors duration-200 ${
          isDark
            ? 'bg-navy-800/80 hover:bg-navy-700/80 border-gold/30 text-ivory hover:text-gold-light'
            : 'bg-sand/60 hover:bg-sand border-navy/20 text-navy hover:text-gold-dark'
        }`}
        aria-expanded={isOpen}
        aria-label="Change currency"
      >
        <span className="text-gold font-serif text-sm font-semibold">
          {allCurrencies.find((c) => c.code === currency)?.symbol}
        </span>
        <span className="uppercase">{currency}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 text-stone ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-subtle shadow-luxury-lg bg-charcoal border border-gold/30 py-1.5 z-50 animate-fade-in"
          role="menu"
        >
          {allCurrencies.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setCurrency(item.code as CurrencyCode);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                currency === item.code
                  ? 'bg-gold/15 text-gold-light font-medium'
                  : 'text-ivory/80 hover:bg-white/5 hover:text-ivory'
              }`}
              role="menuitem"
            >
              <span className="flex items-center gap-2">
                <span className="font-serif text-gold font-semibold text-sm w-4">
                  {item.symbol}
                </span>
                <span>{item.code}</span>
              </span>
              <span className="text-[10px] text-stone">{item.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
