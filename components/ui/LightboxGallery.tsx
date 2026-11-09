'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxGalleryProps {
  images: string[];
  title: string;
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Editorial Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        {/* Main large image */}
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-8 relative aspect-[16/10] rounded-refined overflow-hidden group cursor-pointer border border-white/10"
        >
          <Image
            src={images[0]}
            alt={`${title} main view`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
          <div className="absolute bottom-4 right-4 p-2 rounded-subtle bg-navy-950/80 backdrop-blur-md text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={16} />
          </div>
        </div>

        {/* Secondary thumbnails */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
          {images.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx + 1)}
              className="relative aspect-[16/10] md:aspect-auto md:h-full rounded-refined overflow-hidden group cursor-pointer border border-white/10"
            >
              <Image
                src={img}
                alt={`${title} gallery view ${idx + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-3 right-3 p-1.5 rounded-subtle bg-navy-950/80 backdrop-blur-md text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-charcoal/80 border border-gold/40 text-ivory hover:text-gold transition-colors z-50"
            aria-label="Close image lightbox"
          >
            <X size={22} />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-charcoal/80 border border-gold/40 text-ivory hover:text-gold transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] rounded-refined overflow-hidden border border-gold/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${title} - slide ${selectedIndex + 1}`}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-navy-950/80 border border-white/10 text-xs font-sans text-stone tracking-wider">
              {selectedIndex + 1} of {images.length}
            </div>
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-charcoal/80 border border-gold/40 text-ivory hover:text-gold transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
};
