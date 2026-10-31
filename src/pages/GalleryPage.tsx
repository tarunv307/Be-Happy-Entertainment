import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Lightbox } from '../components/ui/Lightbox';
import { GalleryItem } from '../types/database';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TypographyMarquee } from '../components/ui/TypographyMarquee';

export const GalleryPage: React.FC = () => {
  const { galleryItems } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Behind The Scenes',
    'Film Production',
    'Photography',
    'Events',
    'Studio',
    'Team',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A65] font-semibold block mb-3">
              Visual Archive
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#121212] tracking-tight mb-4">
              GALLERY.
            </h1>
            <p className="text-sm sm:text-base text-[#6B6861] font-light leading-relaxed">
              Stills from active production sets, soundstage setups, high-fashion unit photography, and
              behind-the-scenes moments.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Pills */}
        <ScrollReveal direction="up" delay={200}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-[#E8E6E0] scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-none ${
                  selectedCategory === cat
                    ? 'bg-[#121212] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#6B6861] hover:text-[#121212] hover:bg-[#E8E6E0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Gallery Grid with Staggered ScrollReveal */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <ScrollReveal key={item.id} direction="up" delay={80 + (idx % 3) * 100}>
                <div
                  onClick={() => setActiveImage(item)}
                  className="group relative bg-[#FAF9F5] border border-[#E8E6E0] overflow-hidden cursor-pointer aspect-4/3 rounded-none transition-all duration-400 hover:border-[#B69A65] hover:shadow-lg"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold">
                        {item.category}
                      </span>
                      <ZoomIn className="w-4 h-4 text-white/80" />
                    </div>
                    <h3 className="font-editorial text-lg text-white font-medium">{item.title}</h3>
                    {item.caption && (
                      <p className="text-xs text-white/75 font-light line-clamp-1 mt-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#FAF9F5] border border-dashed border-[#E8E6E0] max-w-md mx-auto">
            <Camera className="w-8 h-8 text-[#B69A65] mx-auto mb-3" />
            <p className="text-xs text-[#6B6861]">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Subtle Marquee Footer Accent */}
      <div className="mt-20">
        <TypographyMarquee speed="slow" />
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <Lightbox
          isOpen={!!activeImage}
          imageUrl={activeImage.image_url}
          title={activeImage.title}
          caption={activeImage.caption}
          category={activeImage.category}
          onClose={() => setActiveImage(null)}
        />
      )}
    </div>
  );
};
