import { CurrencyCode, CurrencyConfig } from '@/types';

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.92,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.79,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rate: 83.5,
  },
};

export function convertPrice(amountInUSD: number, targetCurrency: CurrencyCode): number {
  const rate = CURRENCY_CONFIGS[targetCurrency]?.rate || 1.0;
  return Math.round(amountInUSD * rate);
}

export function formatPrice(amountInUSD: number, currency: CurrencyCode = 'USD'): string {
  const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.USD;
  const converted = convertPrice(amountInUSD, currency);

  if (currency === 'INR') {
    return `${config.symbol} ${converted.toLocaleString('en-IN')}`;
  }
  return `${config.symbol}${converted.toLocaleString('en-US')}`;
}
