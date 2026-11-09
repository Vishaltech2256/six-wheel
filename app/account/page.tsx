import React, { Suspense } from 'react';
import { AccountClient } from './AccountClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traveler Account & Saved Sanctums | SIX WHEELS HOLIDAYS',
  description: 'Manage your saved wishlist, upcoming reservations, and private travel preferences.',
};

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-28 text-center text-ivory">
          <p className="font-serif text-xl">Accessing your private portal...</p>
        </div>
      }
    >
      <AccountClient />
    </Suspense>
  );
}

