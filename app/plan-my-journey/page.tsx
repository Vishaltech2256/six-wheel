import React, { Suspense } from 'react';
import { PlanMyJourneyClient } from './PlanMyJourneyClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan My Journey | Bespoke Luxury Travel Atelier',
  description:
    'Commission a bespoke journey designed around your exact desires, milestones, and rhythm.',
};

export default function PlanMyJourneyPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-28 text-center text-ivory">
          <p className="font-serif text-xl">Opening the bespoke atelier...</p>
        </div>
      }
    >
      <PlanMyJourneyClient />
    </Suspense>
  );
}

