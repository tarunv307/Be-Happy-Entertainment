import React from 'react';
import { GalleryItem } from '../../types/database';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MultiDirectionGalleryProps {
  items: GalleryItem[];
  onOpenLightbox: (item: { url: string; title: string; caption?: string; category?: string }) => void;
}

export const MultiDirectionGallery: React.FC<MultiDirectionGalleryProps> = ({
  items,
  onOpenLightbox,
}) => {
  if (!items || items.length === 0) return null;

  // Split gallery items across rows or provide fallback high-res cinema stills
  const row1Items = items.slice(0, 4);
  const row2Items = items.length >= 8 ? items.slice(4, 8) : items.slice(2, 6);
  const row3StaticItems = items.slice(0, 6);

  const renderMarqueeCard = (
    item: GalleryItem,
    uniqueKey: string,
    aspectClass: string = 'aspect-16/10'
  ) => (
    <div
      key={uniqueKey}
      onClick={() =>
        onOpenLightbox({
          url: item.image_url,
          title: item.title,
          caption: item.caption,
          category: item.category,
        })
      }
      className={`group relative w-72 sm:w-88 md:w-96 shrink-0 overflow-hidden bg-[#FAF9F5] border border-[#E8E6E0] cursor-pointer transition-all duration-500 hover:border-[#B69A65] hover:shadow-lg ${aspectClass}`}
    >
      <img
        src={item.image_url}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover grayscale contrast-105 transition-transform duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block">
              {item.category}
            </span>
            <h4 className="font-editorial text-base text-white">{item.title}</h4>
            {item.caption && (
              <p className="text-xs text-white/70 line-clamp-1 font-light mt-0.5">{item.caption}</p>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-8 select-none">
      {/* ROW 1: Right-to-Left Infinite Marquee */}
      <div className="relative w-full overflow-hidden marquee-container">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="flex gap-6 animate-marquee-left-slow">
          <div className="flex gap-6 shrink-0">
            {row1Items.map((item, idx) =>
              renderMarqueeCard(item, `r1-a-${item.id}-${idx}`, 'aspect-16/10')
            )}
          </div>
          <div className="flex gap-6 shrink-0" aria-hidden="true">
            {row1Items.map((item, idx) =>
              renderMarqueeCard(item, `r1-b-${item.id}-${idx}`, 'aspect-16/10')
            )}
          </div>
        </div>
      </div>

      {/* ROW 2: Left-to-Right Infinite Marquee */}
      <div className="relative w-full overflow-hidden marquee-container">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="flex gap-6 animate-marquee-right-slow">
          <div className="flex gap-6 shrink-0">
            {row2Items.map((item, idx) =>
              renderMarqueeCard(item, `r2-a-${item.id}-${idx}`, 'aspect-4/3')
            )}
          </div>
          <div className="flex gap-6 shrink-0" aria-hidden="true">
            {row2Items.map((item, idx) =>
              renderMarqueeCard(item, `r2-b-${item.id}-${idx}`, 'aspect-4/3')
            )}
          </div>
        </div>
      </div>

      {/* ROW 3: Static Featured Photography Grid with varied dimensions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8 border-b border-[#E8E6E0] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block">
              Curated Stills
            </span>
            <h4 className="font-editorial text-xl sm:text-2xl text-[#121212] font-normal">
              STATIC FEATURED STILLS & PRODUCTION PLATES
            </h4>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121212] hover:text-[#B69A65] transition-colors"
          >
            <span>View Full Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {row3StaticItems.map((item, idx) => {
            // Give first item a prominent 2-column span on medium/large screens
            const isLarge = idx === 0;
            return (
              <div
                key={`static-${item.id}`}
                onClick={() =>
                  onOpenLightbox({
                    url: item.image_url,
                    title: item.title,
                    caption: item.caption,
                    category: item.category,
                  })
                }
                className={`group relative overflow-hidden bg-[#FAF9F5] border border-[#E8E6E0] cursor-pointer transition-all duration-500 hover:border-[#B69A65] hover:shadow-lg ${
                  isLarge
                    ? 'md:col-span-2 aspect-16/10'
                    : idx % 2 === 0
                    ? 'aspect-4/3'
                    : 'aspect-square'
                }`}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-105 transition-transform duration-700 ease-out group-hover:scale-106 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-editorial text-base text-white">{item.title}</h4>
                  {item.caption && (
                    <p className="text-xs text-white/70 line-clamp-1 font-light mt-0.5">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
