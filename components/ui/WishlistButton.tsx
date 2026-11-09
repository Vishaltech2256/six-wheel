'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface WishlistButtonProps {
  id: string;
  className?: string;
  size?: number;
  label?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  id,
  className = '',
  size = 18,
  label,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const active = isInWishlist(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
      }}
      className={`group/wish relative p-2 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
        active
          ? 'bg-gold/20 text-gold-light border border-gold/40'
          : 'bg-navy-950/60 hover:bg-navy-900 border border-white/15 text-stone hover:text-ivory'
      } ${className}`}
      aria-label={active ? 'Remove from saved wishlist' : 'Save journey to wishlist'}
      title={active ? 'Saved to Wishlist' : 'Save to Wishlist'}
    >
      <Heart
        size={size}
        className={`transition-transform duration-300 ${
          active
            ? 'fill-gold text-gold scale-110'
            : 'group-hover/wish:scale-110 group-hover/wish:text-gold-light'
        }`}
      />
      {label && <span className="text-xs font-sans tracking-wider uppercase">{label}</span>}
    </button>
  );
};
