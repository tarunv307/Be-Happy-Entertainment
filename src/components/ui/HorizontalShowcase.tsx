import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { Production } from '../../types/database';

interface HorizontalShowcaseProps {
  productions: Production[];
  onPlayTrailer?: (url: string, title: string) => void;
}

export const HorizontalShowcase: React.FC<HorizontalShowcaseProps> = ({
  productions,
  onPlayTrailer,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(scrollContainerRef.current.clientWidth * 0.75, 600);
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full py-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Immersive Film Reel
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#121212] font-normal">
            HORIZONTAL PORTFOLIO REEL.
          </h3>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll productions left"
            className={`w-11 h-11 rounded-none border border-[#E8E6E0] flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'bg-white text-[#121212] hover:bg-[#121212] hover:text-white hover:border-[#121212] shadow-xs cursor-pointer'
                : 'bg-[#FAF9F5] text-[#A09D94] border-[#E8E6E0]/60 cursor-not-allowed opacity-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll productions right"
            className={`w-11 h-11 rounded-none border border-[#E8E6E0] flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'bg-white text-[#121212] hover:bg-[#121212] hover:text-white hover:border-[#121212] shadow-xs cursor-pointer'
                : 'bg-[#FAF9F5] text-[#A09D94] border-[#E8E6E0]/60 cursor-not-allowed opacity-50'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="horizontal-scroll-track flex gap-6 sm:gap-8 overflow-x-auto px-4 sm:px-6 lg:px-8 py-4 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {productions.map((prod) => (
          <div
            key={prod.id}
            className="group relative w-80 sm:w-[420px] md:w-[480px] shrink-0 snap-start bg-[#FAF9F5] border border-[#E8E6E0] transition-all duration-500 hover:border-[#B69A65] hover:shadow-xl overflow-hidden"
          >
            {/* Cinematic Image Frame */}
            <div className="relative aspect-16/10 sm:aspect-16/11 overflow-hidden bg-[#E8E6E0]">
              <img
                src={prod.cover_url || prod.poster_url}
                alt={prod.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-105 transition-transform duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300" />
              <div className="absolute inset-0 film-grain opacity-25 pointer-events-none" />

              {/* Category & Status Pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[#121212] bg-white/95 backdrop-blur-xs border border-[#E8E6E0]">
                  {prod.category}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider text-white bg-black/60 backdrop-blur-xs">
                  {prod.year}
                </span>
              </div>

              {/* Trailer Play Button if URL exists */}
              {prod.youtube_trailer_url && onPlayTrailer && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onPlayTrailer(prod.youtube_trailer_url!, prod.title);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-[#121212] hover:bg-[#B69A65] hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group/play cursor-pointer"
                  title="Watch Trailer"
                >
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </button>
              )}

              {/* Bottom Project Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight text-white mb-2 group-hover:text-[#FAF9F5]">
                  {prod.title}
                </h4>
                <p className="text-xs text-white/80 line-clamp-2 font-light leading-relaxed mb-4">
                  {prod.short_description}
                </p>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-[11px] text-[#B69A65] font-mono">
                    <span>DIR: {prod.director}</span>
                    <span>•</span>
                    <span>PROD: {prod.producer}</span>
                  </div>

                  <Link
                    to={`/productions/${prod.slug}`}
                    className="inline-flex items-center gap-1 text-white uppercase text-[11px] font-semibold tracking-wider hover:text-[#B69A65] transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
