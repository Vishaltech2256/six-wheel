import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { HappyCustomers } from '@/components/sections/HappyCustomers';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <HappyCustomers />
    </div>
  );
}
