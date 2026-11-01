import React from 'react';
import { Play, Info, Calendar, Clock, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Production } from '../../types/database';

interface CinemaPosterCardProps {
  production: Production;
  onPlayTrailer?: (videoUrl: string, title: string) => void;
  aspectRatio?: 'poster' | 'landscape';
}

export const CinemaPosterCard: React.FC<CinemaPosterCardProps> = ({
  production,
  onPlayTrailer,
  aspectRatio = 'poster',
}) => {
  const isVideoAvailable = Boolean(production.video_url);

  return (
    <div className="group relative rounded-xl overflow-hidden bg-[#141414] border border-white/10 hover:border-[#D6AD68]/60 transition-all duration-400 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(214,173,104,0.3)] hover:-translate-y-1.5 flex flex-col h-full select-none">
      {/* Poster Media Box */}
      <div
        className={`relative w-full overflow-hidden bg-black ${
          aspectRatio === 'poster' ? 'aspect-2/3' : 'aspect-16/9'
        }`}
      >
        <img
          src={aspectRatio === 'poster' ? production.poster_url : production.cover_url || production.poster_url}
          alt={production.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/20 opacity-80 group-hover:opacity-40 transition-opacity" />

        {/* Status / Category Badges (Top) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md text-[#D6AD68] border border-[#D6AD68]/40 shadow-xs">
            {production.content_type === 'short-film' ? 'Short Film' : 'Movie'}
          </span>

          {production.status === 'In Production' ? (
            <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider bg-[#D6AD68] text-black">
              Coming 2026
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white">
              {production.year}
            </span>
          )}
        </div>

        {/* Mobile Touch Stream Badge (Visible on phones without hover) */}
        {isVideoAvailable && (
          <div className="absolute bottom-2.5 right-2.5 sm:hidden z-10 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-[#D6AD68]/50 flex items-center justify-center shadow-lg">
            <Play className="w-3.5 h-3.5 fill-[#D6AD68] text-[#D6AD68] translate-x-0.5" />
          </div>
        )}

        {/* Quick Hover Play Overlay (Desktop) */}
        {isVideoAvailable && onPlayTrailer && (
          <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/35 backdrop-blur-[2px]">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (production.video_url) onPlayTrailer(production.video_url, production.title);
              }}
              className="w-14 h-14 rounded-full bg-[#D6AD68] text-black flex items-center justify-center shadow-[0_0_25px_rgba(214,173,104,0.8)] transform scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-white cursor-pointer"
              title="Watch Now"
            >
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* Card Information Bottom Body */}
      <div className="p-3 sm:p-4 flex flex-col justify-between grow bg-gradient-to-b from-[#141414] to-[#0D0D0D]">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-[#7E7E7E] mb-1 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#D6AD68]" />
              {production.year}
            </span>
            {production.runtime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D6AD68]" />
                {production.runtime}
              </span>
            )}
            <span className="text-[#D6AD68] text-[9px] sm:text-[10px] uppercase tracking-wider ml-auto">
              {production.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-cinematic font-bold text-white text-sm sm:text-lg group-hover:text-[#D6AD68] transition-colors line-clamp-1">
            {production.title}
          </h3>

          {/* Tagline / Verified Description */}
          <p className="text-[11px] sm:text-xs text-[#B5B5B5] line-clamp-2 mt-1 leading-relaxed">
            {production.tagline || production.short_description}
          </p>
        </div>

        {/* Actions Row (Mobile Touch & Compact friendly) */}
        <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-white/5 flex items-center gap-1.5 sm:gap-2">
          {isVideoAvailable && onPlayTrailer ? (
            <button
              onClick={() => {
                if (production.video_url) onPlayTrailer(production.video_url, `${production.title} — Official Trailer`);
              }}
              className="flex-1 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-sm bg-[#D6AD68] hover:bg-[#F3E2B8] text-black font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black shrink-0" />
              <span>Trailer</span>
            </button>
          ) : (
            <Link
              to={`/productions/${production.slug}`}
              className="flex-1 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-sm bg-[#D6AD68] hover:bg-[#F3E2B8] text-black font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-colors shadow-xs active:scale-95"
            >
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black shrink-0" />
              <span>Preview</span>
            </Link>
          )}

          <Link
            to={`/productions/${production.slug}`}
            className="flex-1 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-colors border border-white/10 text-center active:scale-95"
          >
            <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D6AD68] shrink-0" />
            <span>Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
