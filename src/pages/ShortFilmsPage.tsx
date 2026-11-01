import React, { useState } from 'react';
import { Film, Play, Info, Sparkles, Search, Calendar, Clock, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { CinemaPosterCard } from '../components/ui/CinemaPosterCard';
import { CinematicPlayerModal } from '../components/player/CinematicPlayerModal';

export const ShortFilmsPage: React.FC = () => {
  const { productions } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  // Video player modal state
  const [playerState, setPlayerState] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  const handlePlayVideo = (videoUrl: string, title: string) => {
    setPlayerState({ isOpen: true, videoUrl, title });
  };

  // Find Mudhal Kadhal as flagship featured short film
  const featuredShort = productions.find((p) => p.slug === 'mudhal-kadhal') || productions[0];

  // All short films or productions relevant to short cinema
  const shortFilmList = productions.filter(
    (p) =>
      p.content_type === 'short-film' ||
      p.category === 'Short Films' ||
      p.slug === 'mudhal-kadhal'
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-20">
      {/* ====================================================
          FEATURED SHORT FILM HERO BANNER
          ==================================================== */}
      {featuredShort && (
        <div className="relative border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#18130B] via-[#0D0D0D] to-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Information */}
              <div className="lg:col-span-7 flex flex-col items-start gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black">
                    SPOTLIGHT SHORT FILM
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#D6AD68] font-mono">
                    OFFICIAL RELEASE 2026
                  </span>
                </div>

                <h1 className="font-cinematic font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-tight">
                  {featuredShort.title}
                </h1>

                <p className="text-base sm:text-lg text-[#D6AD68] font-cinematic italic tracking-wider">
                  “SOME STORIES FIND YOU... FIRST LOVE. LASTS FOREVER.”
                </p>

                <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed max-w-xl font-light">
                  {featuredShort.description}
                </p>

                {/* Verified Credits Badge List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 w-full max-w-lg border-y border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7E7E7E] block">Written & Directed</span>
                    <strong className="text-white">{featuredShort.director}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7E7E7E] block">Music Score</span>
                    <strong className="text-white">Ajay Kumar</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7E7E7E] block">Lead Artists</span>
                    <strong className="text-white">Sanjith, Mehnaz</strong>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  {featuredShort.video_url && (
                    <button
                      onClick={() => handlePlayVideo(featuredShort.video_url!, `${featuredShort.title} — Teaser`)}
                      className="btn-gold px-7 py-3.5 rounded-sm flex items-center gap-2 text-xs uppercase font-extrabold cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-black" />
                      <span>Watch Stream</span>
                    </button>
                  )}

                  <Link
                    to={`/productions/${featuredShort.slug}`}
                    className="px-6 py-3.5 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    View Story & Cast
                  </Link>
                </div>
              </div>

              {/* Poster Box */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-64 sm:w-80 rounded-2xl overflow-hidden border-2 border-[#D6AD68]/50 shadow-[0_20px_50px_rgba(214,173,104,0.3)] group">
                  <img
                    src={featuredShort.poster_url}
                    alt={featuredShort.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          SHORT FILM CATALOG & DISCOVERY
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6AD68] font-bold">
              EXCLUSIVE SHORTS
            </span>
            <h2 className="font-cinematic font-black text-2xl sm:text-3xl text-white uppercase tracking-wide mt-1">
              DISCOVER SHORT CINEMA
            </h2>
            <p className="text-xs sm:text-sm text-[#7E7E7E] mt-1">
              Original narrative short cinema crafted with festival vision and emotional resonance.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#D6AD68] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search short films..."
              className="w-full bg-white/5 border border-white/10 rounded-xs pl-9 pr-3 py-2 text-base sm:text-xs text-white placeholder-[#7E7E7E] focus:outline-hidden focus:border-[#D6AD68]"
            />
          </div>
        </div>

        {/* Short Films Grid (Cinematic 2-column mobile poster grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {shortFilmList.map((shortFilm) => (
            <CinemaPosterCard
              key={shortFilm.id}
              production={shortFilm}
              onPlayTrailer={handlePlayVideo}
              aspectRatio="poster"
            />
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <CinematicPlayerModal
        isOpen={playerState.isOpen}
        onClose={() => setPlayerState((prev) => ({ ...prev, isOpen: false }))}
        videoUrl={playerState.videoUrl}
        title={playerState.title}
      />
    </div>
  );
};
