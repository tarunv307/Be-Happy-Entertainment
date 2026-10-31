import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight } from 'lucide-react';
import { Production } from '../../types/database';

interface ProjectCardProps {
  production: Production;
  onPlayTrailer?: (url: string, title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ production, onPlayTrailer }) => {
  return (
    <div className="group flex flex-col bg-[#FAF9F5] border border-[#E8E6E0] overflow-hidden rounded-none transition-all duration-400 hover:shadow-xl hover:border-[#B69A65]">
      {/* Poster Image Container */}
      <div className="relative aspect-16/10 sm:aspect-16/9 overflow-hidden bg-[#E8E6E0]">
        <img
          src={production.poster_url || production.cover_url}
          alt={production.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale contrast-105 transition-transform duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
        />

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

        {/* Status / Category Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white/95 backdrop-blur-xs text-[#121212] border border-[#E8E6E0]">
            {production.category}
          </span>
          <span className="px-2 py-1 text-[10px] font-mono tracking-wider font-medium bg-[#121212]/80 text-white backdrop-blur-xs">
            {production.year}
          </span>
        </div>

        {/* Video Play Button Overlay if Available */}
        {production.youtube_trailer_url && onPlayTrailer && (
          <button
            onClick={() => onPlayTrailer(production.youtube_trailer_url!, production.title)}
            aria-label={`Watch trailer for ${production.title}`}
            className="absolute bottom-4 right-4 w-11 h-11 bg-white text-[#121212] rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#B69A65] hover:text-white transition-all duration-300 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] uppercase tracking-widest text-[#B69A65] font-semibold">
              Producer: {production.producer || 'Kavin'}
            </span>
            <span className="text-[11px] text-[#6B6861] font-mono">{production.status}</span>
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#121212] group-hover:text-[#B69A65] transition-colors leading-tight mb-2">
            <Link to={`/productions/${production.slug}`}>
              {production.title}
            </Link>
          </h3>

          <p className="text-xs text-[#6B6861] line-clamp-2 leading-relaxed font-light mb-4">
            {production.short_description}
          </p>
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-[#E8E6E0] flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#121212]">
          <Link
            to={`/productions/${production.slug}`}
            className="inline-flex items-center gap-1.5 hover:text-[#B69A65] transition-colors editorial-hover-underline"
          >
            <span>View Production</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          {production.director && (
            <span className="text-[#6B6861] font-normal text-[11px] font-mono tracking-normal">
              dir. {production.director}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
