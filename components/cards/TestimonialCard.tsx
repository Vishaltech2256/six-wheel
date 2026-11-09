import React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';

export const TestimonialCard: React.FC<{ testimonial: Testimonial; className?: string }> = ({
  testimonial,
  className = '',
}) => {
  return (
    <div
      className={`p-8 sm:p-10 rounded-refined bg-charcoal/80 border border-gold/30 shadow-luxury-md flex flex-col justify-between space-y-6 ${className}`}
    >
      <div className="space-y-4">
        {/* Rating Stars and Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={14} className="fill-gold text-gold" />
            ))}
          </div>
          <Quote className="text-gold/40 w-8 h-8" />
        </div>

        <p className="font-serif text-lg sm:text-xl text-ivory/95 font-light leading-relaxed italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40 shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-serif text-base text-ivory font-medium leading-tight">
            {testimonial.name}
          </h4>
          <p className="text-xs text-stone font-sans">
            {testimonial.role} • {testimonial.location}
          </p>
          <span className="text-[11px] text-gold/90 uppercase tracking-wider block mt-0.5">
            {testimonial.trip}
          </span>
        </div>
      </div>
    </div>
  );
};
