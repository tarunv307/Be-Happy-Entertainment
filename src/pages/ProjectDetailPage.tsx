import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Play,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Film,
  Sparkles,
  Share2,
  Check,
  Video,
  Camera,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { CinematicPlayerModal } from '../components/player/CinematicPlayerModal';
import { CinemaPosterCard } from '../components/ui/CinemaPosterCard';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { productions } = useData();

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Find target production
  const production = productions.find((p) => p.slug === slug);

  if (!production) {
    return (
      <div className="min-h-screen bg-[#080808] text-white pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <Film className="w-16 h-16 text-[#D6AD68]/40 mb-4" />
        <h1 className="font-cinematic text-3xl font-black">Title Not Found</h1>
        <p className="text-[#7E7E7E] text-sm mt-2 max-w-md">
          The requested film could not be located in the Kavin Production catalog.
        </p>
        <Link
          to="/movies"
          className="mt-6 btn-gold px-6 py-2.5 rounded-sm text-xs uppercase font-extrabold"
        >
          Return to Movies
        </Link>
      </div>
    );
  }

  const isVideoAvailable = Boolean(production.video_url);

  // Related movies (excluding current)
  const relatedProductions = productions.filter((p) => p.id !== production.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${production.title} — Kavin Production`,
        text: production.tagline || production.short_description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* ====================================================
          FULL-WIDTH CINEMATIC HERO BANNER
          ==================================================== */}
      <div className="relative w-full h-[65vh] sm:h-[75vh] min-h-[500px] overflow-hidden bg-black select-none">
        {/* Banner Media */}
        <img
          src={production.cover_url || production.poster_url}
          alt={production.title}
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.1] scale-102"
        />

        {/* Cinematic atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

        {/* Back Navigation Button */}
        <div className="absolute top-24 left-4 sm:left-8 z-20">
          <Link
            to="/movies"
            className="px-4 py-2 rounded-full bg-black/60 hover:bg-[#D6AD68] text-white hover:text-black backdrop-blur-md border border-white/20 hover:border-[#D6AD68] text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Movies</span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-8 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl flex flex-col items-start gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black">
                {production.content_type === 'short-film' ? 'Short Film' : 'Movie'}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#D6AD68] font-mono">
                {production.status === 'In Production' ? 'COMING SOON 2026' : `RELEASED ${production.year}`}
              </span>
            </div>

            <h1 className="font-cinematic font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase leading-tight drop-shadow-lg">
              {production.title}
            </h1>

            {production.tagline && (
              <p className="text-sm sm:text-base text-[#D6AD68] font-cinematic italic tracking-wider">
                “{production.tagline}”
              </p>
            )}

            {/* Action Buttons: Watch Trailer, Watch Movie (if available), Back to Movies */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Watch Movie (Only if video is actually available) */}
              {isVideoAvailable && (
                <button
                  onClick={() => setIsPlayerOpen(true)}
                  className="btn-gold px-7 py-3 rounded-sm flex items-center gap-2 text-xs uppercase font-extrabold cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Watch Movie</span>
                </button>
              )}

              {/* Watch Trailer */}
              <button
                onClick={() => {
                  if (isVideoAvailable) {
                    setIsPlayerOpen(true);
                  } else if (production.youtube_trailer_url) {
                    window.open(production.youtube_trailer_url, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="px-6 py-3 rounded-sm bg-white/10 hover:bg-[#D6AD68] text-white hover:text-black border border-white/20 hover:border-[#D6AD68] text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Film className="w-4 h-4 text-[#D6AD68]" />
                <span>Watch Trailer</span>
              </button>

              <Link
                to="/movies"
                className="px-5 py-3 rounded-sm bg-white/5 hover:bg-white/15 text-[#B5B5B5] hover:text-white border border-white/10 text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Back to Movies</span>
              </Link>

              <button
                onClick={handleShare}
                className="px-4 py-3 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Share Film"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          MAIN DETAILS & CAST / CREW SECTION
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Official Poster & Fast Specs */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border-2 border-[#D6AD68]/40 shadow-[0_15px_40px_rgba(214,173,104,0.25)] bg-[#101010]">
              <img
                src={production.poster_url}
                alt={production.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Production Specs Box */}
            <div className="p-6 rounded-xl bg-[#121212] border border-white/10 space-y-4 text-xs">
              <h3 className="font-cinematic font-bold text-sm text-[#D6AD68] uppercase tracking-wider">
                Title Specifications
              </h3>

              <div className="space-y-3 text-[#B5B5B5]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#7E7E7E]">Category:</span>
                  <strong className="text-white">{production.category}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#7E7E7E]">Release:</span>
                  <strong className="text-white">{production.year}</strong>
                </div>

                {production.runtime && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#7E7E7E]">Runtime:</span>
                    <strong className="text-white">{production.runtime}</strong>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#7E7E7E]">Producer:</span>
                  <strong className="text-white">{production.producer}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#7E7E7E]">Status:</span>
                  <span className="text-[#D6AD68] font-bold">{production.status}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-[#7E7E7E]">Production House:</span>
                  <strong className="text-white">Kavin Production</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Story Synopsis & Verified Credits */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Synopsis Section */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#121212] border border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D6AD68]">
                STORY & SYNOPSIS
              </span>
              <h2 className="font-cinematic font-bold text-2xl text-white mt-1">
                About The Film
              </h2>
              <p className="text-sm sm:text-base text-[#C5C5C5] leading-relaxed mt-4 font-light">
                {production.description || production.short_description}
              </p>
            </div>

            {/* Verified Cast & Crew List */}
            {production.credits && production.credits.length > 0 && (
              <div className="p-6 sm:p-8 rounded-xl bg-[#121212] border border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D6AD68]">
                  OFFICIAL VERIFIED CREDITS
                </span>
                <h2 className="font-cinematic font-bold text-2xl text-white mt-1">
                  Cast & Production Crew
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {production.credits.map((credit, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between"
                    >
                      <span className="text-xs text-[#7E7E7E] uppercase tracking-wider">
                        {credit.role}
                      </span>
                      <strong className="text-sm text-white font-medium">
                        {credit.name}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Behind-The-Scenes Gallery */}
            {production.gallery_images && production.gallery_images.length > 0 && (
              <div className="p-6 sm:p-8 rounded-xl bg-[#121212] border border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D6AD68]">
                  VISUAL ARCHIVE
                </span>
                <h2 className="font-cinematic font-bold text-2xl text-white mt-1">
                  Behind The Scenes & Posters
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                  {production.gallery_images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className="group relative aspect-4/3 rounded-lg overflow-hidden bg-black border border-white/10 cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ====================================================
            RELATED TITLES CAROUSEL
            ==================================================== */}
        {relatedProductions.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D6AD68]">
              MORE RELEASES
            </span>
            <h2 className="font-cinematic font-black text-2xl sm:text-3xl text-white uppercase tracking-wide mt-1 mb-8">
              EXPLORE MORE FROM KAVIN PRODUCTION
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProductions.map((related) => (
                <CinemaPosterCard
                  key={related.id}
                  production={related}
                  onPlayTrailer={(videoUrl, title) => {
                    setIsPlayerOpen(true);
                  }}
                  aspectRatio="poster"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Gallery Images */}
      {activeImage && (
        <div
          className="fixed inset-0 z-9999 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveImage(null)}
        >
          <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt="Expanded gallery item" className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-2 right-2 px-3 py-1 bg-black/80 text-white rounded-full text-xs font-mono"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cinematic Video Player Modal */}
      {isVideoAvailable && (
        <CinematicPlayerModal
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          videoUrl={production.video_url!}
          title={production.title}
          posterUrl={production.poster_url}
        />
      )}
    </div>
  );
};
