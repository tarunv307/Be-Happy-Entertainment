import React, { useState } from 'react';
import { Camera, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Lightbox } from '../components/ui/Lightbox';
import { GalleryItem } from '../types/database';

export const GalleryPage: React.FC = () => {
  const { galleryItems } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Behind The Scenes',
    'Film Production',
    'Studio',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#080808] text-white pt-24 pb-24 min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-[#18130B] via-[#0E0E0E] to-[#080808] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black inline-block mb-3">
            VISUAL ARCHIVE
          </span>
          <h1 className="font-cinematic font-black text-3xl sm:text-5xl text-white tracking-wide uppercase">
            CINEMATIC GALLERY
          </h1>
          <p className="text-sm sm:text-base text-[#B5B5B5] font-light mt-3 leading-relaxed">
            Stills from active production sets, behind-the-scenes camera setups, audio consoles, and official release posters.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-white/10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-xs ${
                selectedCategory === cat
                  ? 'bg-[#D6AD68] text-black shadow-md'
                  : 'bg-white/5 text-[#B5B5B5] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group relative bg-[#121212] border border-white/10 overflow-hidden cursor-pointer aspect-4/3 rounded-xl transition-all duration-400 hover:border-[#D6AD68]/60 hover:shadow-[0_10px_30px_rgba(214,173,104,0.2)]"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <span className="text-[9px] uppercase tracking-widest text-[#D6AD68] font-mono">
                    {item.category}
                  </span>
                  <h3 className="font-cinematic font-bold text-white text-base group-hover:text-[#D6AD68] transition-colors mt-0.5 line-clamp-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#B5B5B5] mt-1 line-clamp-1 font-light">
                      {item.caption}
                    </p>
                  )}
                </div>

                {/* Corner Zoom Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-[#D6AD68] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <ImageIcon className="w-12 h-12 text-[#D6AD68]/40 mb-3" />
            <h3 className="font-cinematic text-lg font-bold">No images in this category</h3>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        item={activeImage}
        onClose={() => setActiveImage(null)}
        onNext={() => {
          if (!activeImage) return;
          const currIdx = filteredItems.findIndex((i) => i.id === activeImage.id);
          const nextIdx = (currIdx + 1) % filteredItems.length;
          setActiveImage(filteredItems[nextIdx]);
        }}
        onPrev={() => {
          if (!activeImage) return;
          const currIdx = filteredItems.findIndex((i) => i.id === activeImage.id);
          const prevIdx = (currIdx - 1 + filteredItems.length) % filteredItems.length;
          setActiveImage(filteredItems[prevIdx]);
        }}
      />
    </div>
  );
};
