import React, { useState, useMemo } from 'react';
import { Search, Film } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProjectCard } from '../components/ui/ProjectCard';
import { VideoModal } from '../components/ui/VideoModal';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TypographyMarquee } from '../components/ui/TypographyMarquee';

export const ProductionsPage: React.FC = () => {
  const { productions } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const categories = [
    'All',
    'Feature Films',
    'Short Films',
    'Music Videos',
    'Commercial Advertisements',
    'Corporate Films',
    'Event Productions',
    'Photography',
    'Digital Content',
    'Other Media Productions',
  ];

  const publishedProductions = useMemo(() => {
    return productions.filter((p) => p.is_published);
  }, [productions]);

  const filteredProductions = useMemo(() => {
    return publishedProductions.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.short_description.toLowerCase().includes(q) ||
        item.director.toLowerCase().includes(q) ||
        (item.producer && item.producer.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [publishedProductions, selectedCategory, searchQuery]);

  return (
    <div className="bg-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A65] font-semibold block mb-3">
              Portfolio & Repertoire
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#121212] tracking-tight mb-4">
              PRODUCTIONS.
            </h1>
            <p className="text-sm sm:text-base text-[#6B6861] font-light leading-relaxed">
              A curated catalog of cinematic narratives, commercials, and visual arts produced by
              Kavin Production.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6861]" />
                <input
                  type="text"
                  placeholder="Search by title, director, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF9F5] border border-[#E8E6E0] text-[#121212] focus:outline-hidden focus:border-[#B69A65] placeholder:text-[#6B6861] rounded-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B6861] hover:text-[#121212] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="text-xs text-[#6B6861] font-mono">
                Showing {filteredProductions.length} of {publishedProductions.length} productions
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E6E0] scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-none ${
                    selectedCategory === cat
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'bg-[#FAF9F5] text-[#6B6861] hover:text-[#121212] hover:bg-[#E8E6E0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Productions Grid with Staggered ScrollReveal */}
        {filteredProductions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProductions.map((production, idx) => (
              <ScrollReveal key={production.id} direction="up" delay={80 + (idx % 3) * 100}>
                <ProjectCard
                  production={production}
                  onPlayTrailer={(url, title) => setActiveVideo({ url, title })}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#FAF9F5] border border-dashed border-[#E8E6E0] max-w-xl mx-auto my-12 p-8">
            <Film className="w-10 h-10 text-[#B69A65] mx-auto mb-4 opacity-70" />
            <h3 className="font-editorial text-xl font-semibold text-[#121212] mb-2">
              No Productions Match
            </h3>
            <p className="text-xs text-[#6B6861] mb-6 font-light">
              We couldn't find any productions matching your query or filter selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2.5 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors rounded-none cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Subtle Marquee Footer Accent */}
      <div className="mt-20">
        <TypographyMarquee speed="slow" />
      </div>

      {/* Trailer Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};
