import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Play, Film, Music, Sparkles, ArrowRight, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayVideo?: (videoUrl: string, title: string) => void;
}

interface SearchableItem {
  id: string;
  title: string;
  category: 'Movies' | 'Short Films' | 'Concerts' | string;
  type: string;
  year: number;
  slug: string;
  image: string;
  videoUrl?: string | null;
  tagline: string;
  director?: string;
  credits?: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onPlayVideo,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Movies' | 'Short Films' | 'Concerts'>('All');
  const { productions } = useData();
  const navigate = useNavigate();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Concert items data
  const concertItems = useMemo<SearchableItem[]>(
    () => [
      {
        id: 'concert-1',
        title: 'Kavin Live Concert & Stage Sound',
        category: 'Concerts',
        type: 'concert',
        year: 2025,
        slug: '/concerts',
        image: '/media/kavin-director-banner.png',
        tagline: 'High-energy DJ performance and acoustic stage mastery.',
      },
      {
        id: 'concert-2',
        title: 'Pioneer DJ Acoustic Night',
        category: 'Concerts',
        type: 'concert',
        year: 2025,
        slug: '/concerts',
        image: '/media/kavin-director-banner.png',
        tagline: 'Live sound engineering and musical mixing set by Kavin.',
      },
    ],
    []
  );

  // Search indexing
  const allSearchable = useMemo<SearchableItem[]>(() => {
    const prods: SearchableItem[] = productions.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.content_type === 'short-film' ? 'Short Films' : 'Movies',
      type: p.content_type || 'movie',
      year: p.year,
      slug: `/productions/${p.slug}`,
      image: p.poster_url,
      videoUrl: p.video_url,
      tagline: p.tagline || p.short_description,
      director: p.director,
      credits: p.credits?.map((c) => c.name).join(' ') || '',
    }));

    return [...prods, ...concertItems];
  }, [productions, concertItems]);

  const filteredResults = useMemo(() => {
    return allSearchable.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      if (!query.trim()) return matchesCategory;

      const q = query.toLowerCase();
      const matchesText =
        item.title.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        (item.director ? item.director.toLowerCase().includes(q) : false) ||
        (item.credits ? item.credits.toLowerCase().includes(q) : false);

      return matchesCategory && matchesText;
    });
  }, [allSearchable, query, selectedCategory]);

  const handleSelect = (item: SearchableItem) => {
    onClose();
    if (item.type === 'concert') {
      navigate('/concerts');
    } else {
      navigate(item.slug);
    }
  };

  const handleQuickPlay = (e: React.MouseEvent, item: SearchableItem) => {
    e.stopPropagation();
    if (item.videoUrl && onPlayVideo) {
      onClose();
      onPlayVideo(item.videoUrl, item.title);
    } else {
      handleSelect(item);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 bg-black/90 backdrop-blur-xl flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Search Input Box */}
        <div className="relative p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-6 h-6 text-[#D6AD68] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, short films, live concerts, or crew..."
            className="w-full bg-transparent text-white placeholder-[#7E7E7E] text-base sm:text-lg focus:outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:text-[#D6AD68] text-white/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs uppercase tracking-wider text-white/60 hover:text-white border border-white/20 rounded-sm cursor-pointer ml-1"
          >
            Esc
          </button>
        </div>

        {/* Filter Categories Chips */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-[#181818] border-b border-white/5 overflow-x-auto no-scrollbar">
          {(['All', 'Movies', 'Short Films', 'Concerts'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#D6AD68] text-black font-bold shadow-[0_0_15px_rgba(214,173,104,0.4)]'
                  : 'bg-white/5 text-[#B5B5B5] hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-[11px] text-[#7E7E7E] ml-auto whitespace-nowrap hidden sm:inline">
            {filteredResults.length} {filteredResults.length === 1 ? 'title' : 'titles'} found
          </span>
        </div>

        {/* Search Results List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D6AD68]/40 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 sm:w-16 h-20 sm:h-22 rounded-lg overflow-hidden bg-black shrink-0 relative border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#D6AD68]/20 text-[#D6AD68] border border-[#D6AD68]/30">
                        {item.category}
                      </span>
                      <span className="text-xs text-[#7E7E7E]">{item.year}</span>
                    </div>

                    <h3 className="text-white font-cinematic font-bold text-base sm:text-lg group-hover:text-[#D6AD68] transition-colors truncate">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#B5B5B5] line-clamp-1 mt-0.5">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {Boolean(item.videoUrl) && (
                    <button
                      onClick={(e) => handleQuickPlay(e, item)}
                      className="w-9 h-9 rounded-full bg-[#D6AD68] text-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                      title="Play Now"
                    >
                      <Play className="w-4 h-4 fill-black translate-x-0.5" />
                    </button>
                  )}
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#D6AD68] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D6AD68] mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h4 className="text-white text-lg font-cinematic font-bold">
                No productions found for "{query}"
              </h4>
              <p className="text-sm text-[#7E7E7E] max-w-sm mt-1">
                Try searching for Mudhal Kadhal, Padikathavan, Game, or Live Concerts.
              </p>
              <div className="flex gap-2 mt-4">
                {['Mudhal Kadhal', 'Padikathavan', 'Game', 'Concerts'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1 bg-white/5 hover:bg-[#D6AD68] hover:text-black border border-white/10 text-xs rounded-full transition-colors cursor-pointer text-[#B5B5B5]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
