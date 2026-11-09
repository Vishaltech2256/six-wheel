import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { HappyCustomers } from '@/components/sections/HappyCustomers';
import { PackageDetailSection } from '@/components/sections/PackageDetailSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <HappyCustomers />
      <PackageDetailSection id="package-munnar" />
    </div>
  );
}
