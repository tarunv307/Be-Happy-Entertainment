import React, { useState } from 'react';
import { Film, Play, Info, Sparkles, Filter, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { CinemaPosterCard } from '../components/ui/CinemaPosterCard';
import { CinematicPlayerModal } from '../components/player/CinematicPlayerModal';

export const MoviesPage: React.FC = () => {
  const { productions } = useData();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Released' | 'In Production'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Player modal state
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

  // Filter movies
  const movies = productions.filter((p) => {
    const matchesCategory = p.content_type === 'movie' || p.category === 'Feature Films' || p.category === 'Short Films';
    const matchesFilter =
      selectedFilter === 'All' ||
      (selectedFilter === 'Released' && p.status === 'Released') ||
      (selectedFilter === 'In Production' && p.status === 'In Production');

    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-20">
      {/* Page Hero Header */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#080808] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black">
              ORIGINAL CATALOG
            </span>
            <h1 className="font-cinematic font-black text-3xl sm:text-5xl text-white tracking-wide uppercase mt-3">
              FEATURE FILMS & CINEMA
            </h1>
            <p className="text-sm sm:text-base text-[#B5B5B5] mt-2 font-light leading-relaxed">
              Explore the official feature cinematic releases produced and presented by Kavin Production. Every story sculpted with emotional depth, bold imagery, and uncompromising sound design.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {(['All', 'Released', 'In Production'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedFilter === tab
                      ? 'bg-[#D6AD68] text-black shadow-md'
                      : 'bg-white/5 text-[#B5B5B5] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab === 'In Production' ? 'Upcoming (2026)' : tab}
                </button>
              ))}
            </div>

            {/* Quick Search Field */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#D6AD68] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full bg-white/5 border border-white/10 rounded-xs pl-9 pr-3 py-2 text-base sm:text-xs text-white placeholder-[#7E7E7E] focus:outline-hidden focus:border-[#D6AD68]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid (Cinematic 2-column mobile poster grid) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {movies.map((movie) => (
              <CinemaPosterCard
                key={movie.id}
                production={movie}
                onPlayTrailer={handlePlayVideo}
                aspectRatio="poster"
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Film className="w-12 h-12 text-[#D6AD68]/50 mb-3" />
            <h3 className="font-cinematic text-xl text-white font-bold">No movies found</h3>
            <p className="text-sm text-[#7E7E7E] mt-1">Try clearing your search query or filters.</p>
          </div>
        )}
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
