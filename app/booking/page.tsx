import React, { Suspense } from 'react';
import { BookingClient } from './BookingClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reserve Your Journey | SIX WHEELS HOLIDAYS',
  description: 'Multi-step reservation and bespoke journey confirmation.',
};

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-28 text-center text-ivory">
          <p className="font-serif text-xl">Loading your reservation chamber...</p>
        </div>
      }
    >
      <BookingClient />
    </Suspense>
  );
}

