import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Film, Sparkles } from 'lucide-react';
import { Production } from '../../types/database';
import { CinemaPosterCard } from './CinemaPosterCard';

interface OttCarouselProps {
  title: string;
  badge?: string;
  subtitle?: string;
  items: Production[];
  onPlayTrailer?: (videoUrl: string, title: string) => void;
  aspectRatio?: 'poster' | 'landscape';
}

export const OttCarousel: React.FC<OttCarouselProps> = ({
  title,
  badge,
  subtitle,
  items,
  onPlayTrailer,
  aspectRatio = 'poster',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollContainerRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-8 sm:py-12 group/carousel select-none">
      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {badge && (
              <span className="px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-[0.2em] bg-[#D6AD68]/20 text-[#D6AD68] border border-[#D6AD68]/30">
                {badge}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-[#7E7E7E] tracking-wider uppercase font-medium">
                {subtitle}
              </span>
            )}
          </div>
          <h2 className="font-cinematic font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wide uppercase">
            {title}
          </h2>
        </div>

        {/* Carousel Arrow Controls (Visible on tablet & desktop, touch swipe on mobile) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-[#181818] hover:bg-[#D6AD68] text-white hover:text-black border border-white/10 hover:border-[#D6AD68] flex items-center justify-center transition-all cursor-pointer shadow-md"
            title="Scroll Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-[#181818] hover:bg-[#D6AD68] text-white hover:text-black border border-white/10 hover:border-[#D6AD68] flex items-center justify-center transition-all cursor-pointer shadow-md"
            title="Scroll Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Track (Touch swipe optimized) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory overscroll-x-contain"
        >
          {items.map((prod) => (
            <div
              key={prod.id}
              className={`shrink-0 snap-start transition-all ${
                aspectRatio === 'poster'
                  ? 'w-[165px] xs:w-[190px] sm:w-[240px] md:w-[280px]'
                  : 'w-[260px] xs:w-[300px] sm:w-[360px] md:w-[420px]'
              }`}
            >
              <CinemaPosterCard
                production={prod}
                onPlayTrailer={onPlayTrailer}
                aspectRatio={aspectRatio}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
