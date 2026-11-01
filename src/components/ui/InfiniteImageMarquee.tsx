import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface MarqueeItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year?: number | string;
  slug?: string;
}

interface InfiniteImageMarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  onItemClick?: (item: MarqueeItem) => void;
}

export const InfiniteImageMarquee: React.FC<InfiniteImageMarqueeProps> = ({
  items,
  direction = 'left',
  speed = 'medium',
  className = '',
  onItemClick,
}) => {
  if (!items || items.length === 0) return null;

  // Choose the CSS animation class
  const getAnimationClass = () => {
    if (direction === 'right') {
      return speed === 'slow' ? 'animate-marquee-right-slow' : 'animate-marquee-right';
    }
    if (speed === 'slow') return 'animate-marquee-left-slow';
    if (speed === 'fast') return 'animate-marquee-left-fast';
    return 'animate-marquee-left';
  };

  const renderCard = (item: MarqueeItem, uniqueKey: string) => {
    const cardContent = (
      <div className="group relative w-72 sm:w-96 md:w-[420px] shrink-0 overflow-hidden bg-[#E8E6E0] border border-[#E8E6E0] transition-all duration-500 hover:border-[#B69A65] hover:shadow-lg">
        {/* Cinematic 16:10 Aspect Image */}
        <div className="relative aspect-16/10 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale contrast-105 transition-all duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Subtle Film Grain Texture */}
          <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

          {/* Top Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[#121212] bg-white/95 backdrop-blur-xs border border-[#E8E6E0]">
              {item.category}
            </span>
            {item.year && (
              <span className="px-2 py-1 text-[10px] font-mono tracking-wider text-white/90 bg-black/60 backdrop-blur-xs">
                {item.year}
              </span>
            )}
          </div>

          {/* Bottom Project Details */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <h4 className="font-editorial text-lg sm:text-xl font-normal leading-tight text-white group-hover:text-[#FAF9F5] transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] uppercase tracking-widest text-[#B69A65] mt-1 font-medium">
                Be Happy Entertainment Studio
              </p>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-white/90 text-[#121212] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75 group-hover:bg-[#B69A65] group-hover:text-white shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );

    if (item.slug) {
      return (
        <Link
          key={uniqueKey}
          to={`/productions/${item.slug}`}
          className="block outline-hidden focus:ring-1 focus:ring-[#B69A65]"
        >
          {cardContent}
        </Link>
      );
    }

    if (onItemClick) {
      return (
        <button
          key={uniqueKey}
          type="button"
          onClick={() => onItemClick(item)}
          className="block text-left cursor-pointer outline-hidden focus:ring-1 focus:ring-[#B69A65]"
        >
          {cardContent}
        </button>
      );
    }

    return <div key={uniqueKey}>{cardContent}</div>;
  };

  return (
    <div className={`relative w-full overflow-hidden marquee-container py-3 ${className}`}>
      {/* Edge gradient overlays for elegant cinematic fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-white via-white/70 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-white via-white/70 to-transparent" />

      <div className={`flex gap-6 sm:gap-8 ${getAnimationClass()}`}>
        {/* Track 1 */}
        <div className="flex gap-6 sm:gap-8 shrink-0">
          {items.map((item, idx) => renderCard(item, `marquee-a-${item.id}-${idx}`))}
        </div>
        {/* Duplicate Track 2 for seamless infinite loop */}
        <div className="flex gap-6 sm:gap-8 shrink-0" aria-hidden="true">
          {items.map((item, idx) => renderCard(item, `marquee-b-${item.id}-${idx}`))}
        </div>
      </div>
    </div>
  );
};
