'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sixwheels_wishlist');
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      } else {
        // Seed initial favorites for delightful first impression
        setWishlistIds(['maldives-overwater-haven', 'kyoto-zen-heritage']);
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('sixwheels_wishlist', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const updated = prev.filter((item) => item !== id);
      try {
        localStorage.setItem('sixwheels_wishlist', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        count: isLoaded ? wishlistIds.length : 0,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
