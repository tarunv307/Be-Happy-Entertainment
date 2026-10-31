import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Film } from 'lucide-react';
import { useData } from '../context/DataContext';
import { VideoModal } from '../components/ui/VideoModal';
import { Lightbox } from '../components/ui/Lightbox';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { productions } = useData();

  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeImage, setActiveImage] = useState<{ url: string; title: string } | null>(null);

  const production = productions.find((p) => p.slug === slug || p.id === slug);

  if (!production) {
    return (
      <div className="min-h-screen bg-white pt-36 pb-20 text-center px-4">
        <Film className="w-12 h-12 text-[#B69A65] mx-auto mb-4" />
        <h1 className="font-editorial text-3xl font-semibold text-[#121212] mb-2">
          Production Not Found
        </h1>
        <p className="text-sm text-[#6B6861] mb-8 font-light">
          The requested project does not exist or may have been unlisted.
        </p>
        <Link
          to="/productions"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors rounded-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back To Productions</span>
        </Link>
      </div>
    );
  }

  // Related productions
  const relatedProductions = productions
    .filter((p) => p.id !== production.id && p.is_published && p.category === production.category)
    .slice(0, 3);

  return (
    <div className="bg-white pt-24 pb-24">
      {/* Back Button Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E8E6E0] mb-8 flex items-center justify-between">
        <Link
          to="/productions"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B6861] hover:text-[#121212] transition-colors editorial-hover-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Productions</span>
        </Link>

        <span className="text-[11px] uppercase tracking-widest text-[#B69A65] font-semibold">
          {production.category} • {production.year}
        </span>
      </div>

      {/* Cinematic Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ScrollReveal direction="up" delay={100}>
          <div className="relative aspect-21/9 sm:aspect-16/7 overflow-hidden border border-[#E8E6E0] bg-[#FAF9F5] group">
            <img
              src={production.cover_url || production.poster_url}
              alt={production.title}
              className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold mb-2">
                {production.status}
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-4">
                {production.title}
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl line-clamp-2">
                {production.short_description}
              </p>
            </div>

            {/* Quick Play Button if YouTube Available */}
            {production.youtube_trailer_url && (
              <button
                onClick={() =>
                  setActiveVideo({ url: production.youtube_trailer_url!, title: production.title })
                }
                aria-label="Play Trailer"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white/90 hover:bg-[#B69A65] text-[#121212] hover:text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Main Details & Metadata Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Synopsis & Story */}
          <div className="lg:col-span-8 space-y-8">
            <ScrollReveal direction="up" delay={150}>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
                  Project Synopsis
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#121212] font-semibold mb-4">
                  The Narrative
                </h2>
                <p className="text-base text-[#6B6861] font-light leading-relaxed whitespace-pre-line">
                  {production.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Embedded YouTube Trailer if Available */}
            {production.youtube_trailer_url && (
              <ScrollReveal direction="up" delay={200}>
                <div className="pt-6 border-t border-[#E8E6E0]">
                  <h3 className="font-editorial text-xl font-semibold text-[#121212] mb-4">
                    Official Preview
                  </h3>
                  <div className="relative aspect-16/9 bg-black border border-[#E8E6E0] overflow-hidden">
                    <iframe
                      src={
                        production.youtube_trailer_url.includes('embed')
                          ? production.youtube_trailer_url
                          : `https://www.youtube.com/embed/${
                              production.youtube_trailer_url.split('v=')[1]?.split('&')[0] ||
                              production.youtube_trailer_url.split('youtu.be/')[1] ||
                              ''
                            }`
                      }
                      title={production.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Production Stills Gallery */}
            {production.gallery_images && production.gallery_images.length > 0 && (
              <ScrollReveal direction="up" delay={250}>
                <div className="pt-6 border-t border-[#E8E6E0]">
                  <h3 className="font-editorial text-xl font-semibold text-[#121212] mb-4">
                    Production Stills & Cinematography
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {production.gallery_images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          setActiveImage({ url: img, title: `${production.title} Still 0${idx + 1}` })
                        }
                        className="aspect-16/10 bg-[#FAF9F5] border border-[#E8E6E0] overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={img}
                          alt={`${production.title} still`}
                          className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right Column: Key Credits & Spec Sheet */}
          <div className="lg:col-span-4 space-y-8">
            <ScrollReveal direction="left" delay={200}>
              <div className="bg-[#FAF9F5] border border-[#E8E6E0] p-8 space-y-6">
                <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block border-b border-[#E8E6E0] pb-2">
                  Production Credits
                </span>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[#6B6861] block text-[10px] uppercase tracking-wider">
                      Producer
                    </span>
                    <span className="font-semibold text-sm text-[#121212]">
                      {production.producer || 'Kavin'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#6B6861] block text-[10px] uppercase tracking-wider">
                      Director
                    </span>
                    <span className="font-semibold text-sm text-[#121212]">
                      {production.director}
                    </span>
                  </div>

                  {production.cinematographer && (
                    <div>
                      <span className="text-[#6B6861] block text-[10px] uppercase tracking-wider">
                        Director of Photography
                      </span>
                      <span className="font-semibold text-sm text-[#121212]">
                        {production.cinematographer}
                      </span>
                    </div>
                  )}

                  {production.editor && (
                    <div>
                      <span className="text-[#6B6861] block text-[10px] uppercase tracking-wider">
                        Editor
                      </span>
                      <span className="font-semibold text-sm text-[#121212]">
                        {production.editor}
                      </span>
                    </div>
                  )}

                  {production.cast_and_crew && (
                    <div>
                      <span className="text-[#6B6861] block text-[10px] uppercase tracking-wider">
                        Cast & Notable Crew
                      </span>
                      <p className="text-[#6B6861] font-light mt-0.5 leading-relaxed">
                        {production.cast_and_crew}
                      </p>
                    </div>
                  )}

                  {/* Additional Credits JSON */}
                  {production.credits && production.credits.length > 0 && (
                    <div className="pt-3 border-t border-[#E8E6E0] space-y-2">
                      {production.credits.map((cr, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <span className="text-[#6B6861]">{cr.role}</span>
                          <span className="font-medium text-[#121212] text-right">{cr.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Enquiry for Similar Project */}
                <div className="pt-4 border-t border-[#E8E6E0]">
                  <Link
                    to="/contact"
                    className="w-full text-center block py-3.5 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors rounded-none shadow-xs"
                  >
                    Enquire For Similar Project
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Related Productions */}
      {relatedProductions.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-[#E8E6E0]">
          <ScrollReveal direction="up" delay={100}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-editorial text-2xl font-semibold text-[#121212]">
                Related {production.category}
              </h3>
              <Link
                to="/productions"
                className="text-xs uppercase tracking-wider text-[#B69A65] font-semibold hover:underline"
              >
                View All
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProductions.map((p, idx) => (
              <ScrollReveal key={p.id} direction="up" delay={100 + idx * 100}>
                <ProjectCard production={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Lightbox */}
      {activeImage && (
        <Lightbox
          isOpen={!!activeImage}
          imageUrl={activeImage.url}
          title={activeImage.title}
          onClose={() => setActiveImage(null)}
        />
      )}
    </div>
  );
};
