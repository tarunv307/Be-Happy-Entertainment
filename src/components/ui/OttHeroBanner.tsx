import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, Film, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Production } from '../../types/database';
import { KavinLogo } from '../brand/KavinLogo';

interface OttHeroBannerProps {
  productions: Production[];
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const OttHeroBanner: React.FC<OttHeroBannerProps> = ({ productions, onPlayVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile touch gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const featuredList = productions.filter((p) => p.is_featured).length > 0
    ? productions.filter((p) => p.is_featured)
    : productions;

  const current = featuredList[currentIndex] || featuredList[0];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      // Swiped left -> next
      nextSlide();
    } else if (distance < -45) {
      // Swiped right -> prev
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto advance every 10 seconds unless user is interacting
  useEffect(() => {
    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [currentIndex, featuredList.length]);

  // Restart inline video when current title changes
  useEffect(() => {
    if (videoRef.current && current?.video_url) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlayingInline(true))
        .catch(() => setIsPlayingInline(false));
    }
  }, [current]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  if (!current) return null;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[84vh] sm:h-[95vh] min-h-[520px] sm:min-h-[640px] max-h-[960px] overflow-hidden bg-[#080808] select-none touch-pan-y"
    >
      {/* Background Media (Inline Video or Poster with Ambient Glow) */}
      <div className="absolute inset-0 w-full h-full">
        {current.video_url ? (
          <video
            ref={videoRef}
            key={current.id}
            src={current.video_url}
            poster={current.cover_url || current.poster_url}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] transition-opacity duration-1000"
          />
        ) : (
          <img
            key={current.id}
            src={current.cover_url || current.poster_url}
            alt={current.title}
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05] transition-all duration-1000 scale-102"
          />
        )}

        {/* Film Grain Texture */}
        <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

        {/* Multi-Directional OTT Atmospheric Gradients */}
        {/* Bottom Fade to Platform Black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
        {/* Left Side Heavy Vignette for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent w-full lg:w-3/4" />
        {/* Top Fade for Navigation Legibility */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24">
        <div className="max-w-2xl sm:max-w-3xl flex flex-col items-start gap-3 sm:gap-5">
          {/* Animated Kavin Production Monogram & Badge Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 animate-fade-in">
            <div className="bg-black/70 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#D6AD68]/40 shadow-[0_0_20px_rgba(214,173,104,0.3)]">
              <KavinLogo variant="compact" size="sm" animated={true} showTagline={false} />
            </div>

            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xs text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] bg-[#D6AD68] text-black shadow-[0_0_15px_rgba(214,173,104,0.5)]">
              {current.content_type === 'short-film' ? 'Exclusive Short' : 'Featured Movie'}
            </span>

            {current.status === 'In Production' && (
              <span className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xs text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white backdrop-blur-md border border-white/10">
                Coming 2026
              </span>
            )}
          </div>

          {/* Featured Title */}
          <h1 className="font-cinematic font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wide uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] leading-tight">
            {current.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#B5B5B5] font-medium">
            <span className="flex items-center gap-1 text-[#D6AD68]">
              <Calendar className="w-3.5 h-3.5" />
              {current.year}
            </span>
            {current.runtime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {current.runtime}
              </span>
            )}
            <span className="text-white/40">•</span>
            <span className="truncate max-w-[200px] sm:max-w-none">
              Directed by <strong className="text-white">{current.director}</strong>
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-xs sm:text-base md:text-lg text-[#C5C5C5] line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow-md max-w-2xl font-light">
            {current.tagline ? `“${current.tagline}” ` : ''}
            {current.description || current.short_description}
          </p>

          {/* Action CTAs: Responsive Mobile Touch Flow */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto">
            {current.video_url && (
              <button
                onClick={() => onPlayVideo(current.video_url!, `${current.title} — Official Trailer / Stream`)}
                className="btn-gold flex-1 sm:flex-initial px-5 sm:px-8 py-3 sm:py-3.5 rounded-sm flex items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm uppercase font-extrabold cursor-pointer active:scale-95 transition-transform"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black shrink-0" />
                <span className="whitespace-nowrap">Watch Trailer</span>
              </button>
            )}

            <Link
              to="/movies"
              className="flex-1 sm:flex-initial px-4 sm:px-7 py-3 sm:py-3.5 rounded-sm bg-[#D6AD68]/20 hover:bg-[#D6AD68] hover:text-black text-[#D6AD68] backdrop-blur-md border border-[#D6AD68]/40 text-xs sm:text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Film className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="whitespace-nowrap">Movies</span>
            </Link>

            <Link
              to={`/productions/${current.slug}`}
              className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95"
            >
              <Info className="w-4 h-4 text-[#D6AD68] shrink-0" />
              <span>Details</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators & Navigation (Responsive positioning) */}
      <div className="absolute bottom-5 sm:bottom-8 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-4 bg-black/75 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-white/10 shadow-lg">
        {/* Inline Audio Toggle Button */}
        {current.video_url && (
          <button
            onClick={toggleMute}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#D6AD68] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Ambient Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6AD68]" />}
          </button>
        )}

        {/* Previous Slide (Hidden on mobile to preserve touch swipe) */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex w-9 h-9 rounded-full bg-white/10 hover:bg-[#D6AD68] hover:text-black text-white items-center justify-center transition-colors cursor-pointer"
          title="Previous Featured Title"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1">
          {featuredList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-5 sm:w-6 bg-[#D6AD68] shadow-[0_0_8px_rgba(214,173,104,0.8)]'
                  : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/60'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Slide (Hidden on mobile to preserve touch swipe) */}
        <button
          onClick={nextSlide}
          className="hidden sm:flex w-9 h-9 rounded-full bg-white/10 hover:bg-[#D6AD68] hover:text-black text-white items-center justify-center transition-colors cursor-pointer"
          title="Next Featured Title"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
