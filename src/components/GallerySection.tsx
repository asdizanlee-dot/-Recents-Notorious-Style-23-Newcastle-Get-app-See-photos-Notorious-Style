import React, { useState } from 'react';
import { Maximize2, X, Scissors, User } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'fades', label: 'Barber Craft & Fades' },
    { id: 'colour', label: 'Colour & Balayage' },
    { id: 'womens', label: 'Styling & Restyle' },
    { id: 'studio', label: 'Studio & Lounge' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>Our Work</span>
              <span aria-hidden="true">·</span>
              <span>Victoria Park Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Client Transformations</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Curated Gallery
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Explore our recent scissor cuts, custom skin fades, beard architectures, lived-in balayage, and the distinct ambience of our Albany Highway studio.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            Book Your Look
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative h-80 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer shadow-md hover:border-amber-500/50 transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay on hover / focus */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 right-3 p-2 rounded-full bg-neutral-950/70 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                  <span>{item.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-300 flex items-center gap-1">
                    <User className="w-3 h-3 text-neutral-400" />
                    {item.stylist}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 font-light">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/90 backdrop-blur-md"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-neutral-950/80 rounded-full border border-neutral-800"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="p-6 bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                  <span>{lightboxItem.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>Artisan: {lightboxItem.stylist}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mt-1">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  {lightboxItem.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setLightboxItem(null);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0"
              >
                Book This Look
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
