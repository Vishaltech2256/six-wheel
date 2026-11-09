'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '@/types';
import { CURRENCY_CONFIGS, formatPrice, convertPrice } from '@/lib/currency';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (amountInUSD: number) => string;
  convert: (amountInUSD: number) => number;
  config: CurrencyConfig;
  allCurrencies: CurrencyConfig[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sixwheels_currency');
      if (saved && (saved === 'USD' || saved === 'EUR' || saved === 'GBP' || saved === 'INR')) {
        setCurrencyState(saved as CurrencyCode);
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem('sixwheels_currency', code);
    } catch {
      // Local storage unavailable
    }
  };

  const format = (amountInUSD: number) => formatPrice(amountInUSD, currency);
  const convert = (amountInUSD: number) => convertPrice(amountInUSD, currency);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        format,
        convert,
        config: CURRENCY_CONFIGS[currency],
        allCurrencies: Object.values(CURRENCY_CONFIGS),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
