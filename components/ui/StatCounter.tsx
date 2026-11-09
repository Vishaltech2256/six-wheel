'use client';

import React, { useEffect, useState, useRef } from 'react';
import { WheelEmblem } from '../brand/WheelEmblem';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}

const STATS: StatItem[] = [
  {
    value: 12,
    suffix: '',
    label: 'Curated Global Sanctums',
    subtext: 'Privately negotiated access',
  },
  {
    value: 4200,
    suffix: '+',
    label: 'Discerning Travelers',
    subtext: 'Flawlessly chauffeured',
  },
  {
    value: 48,
    suffix: '',
    label: 'Partner Palaces & Lodges',
    subtext: 'Handpicked ultra-luxury stays',
  },
  {
    value: 18,
    suffix: ' Years',
    label: 'Atelier Experience',
    subtext: 'Mastery of seamless travel',
  },
];

export const StatCounter: React.FC = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 lg:py-20 bg-charcoal border-y border-gold/25 relative overflow-hidden"
    >
      {/* Subtle background emblem watermark */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <WheelEmblem size={480} color="#B8975A" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center lg:text-left">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1.5 relative">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-gold-light tracking-tight">
                {inView ? (
                  <Counter target={stat.value} />
                ) : (
                  <span>0</span>
                )}
                <span>{stat.suffix}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-sans uppercase tracking-luxury text-ivory font-medium">
                {stat.label}
              </h4>
              <p className="text-[11px] text-stone font-light">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1800; // 1.8 seconds
    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
}
