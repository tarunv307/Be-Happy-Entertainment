import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Play, Sparkles, Music, Radio, ChevronRight, Award, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { OttHeroBanner } from '../components/ui/OttHeroBanner';
import { OttCarousel } from '../components/ui/OttCarousel';
import { SocialShowcaseSections } from '../components/ui/SocialShowcaseSections';
import { CinematicPlayerModal } from '../components/player/CinematicPlayerModal';

export const HomePage: React.FC = () => {
  const { productions } = useData();

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
    setPlayerState({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  const handleClosePlayer = () => {
    setPlayerState((prev) => ({ ...prev, isOpen: false }));
  };

  // Grouped titles strictly based on verified data
  const officialCollection = productions;
  const trendingNow = [...productions].reverse();
  const featuredMovies = productions.filter((p) => p.content_type === 'movie' || p.category === 'Feature Films');
  const shortFilms = productions.filter((p) => p.content_type === 'short-film' || p.category === 'Short Films');
  const upcomingReleases = productions.filter((p) => p.status === 'In Production' || p.year >= 2026);
  const mostWatched = productions.length >= 2
    ? [productions[1], productions[0], productions[2] || productions[0]]
    : productions;

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* ====================================================
          FULL-SCREEN CINEMATIC OTT HERO BANNER
          ==================================================== */}
      <OttHeroBanner
        productions={productions}
        onPlayVideo={handlePlayVideo}
      />

      {/* Cinematic Marquee Divider */}
      <div className="py-4 bg-[#0D0D0D] border-y border-[#D6AD68]/20 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee-left">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm uppercase tracking-[0.3em] text-[#D6AD68] font-cinematic font-bold px-4">
              <span>BE HAPPY ENTERTAINMENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-white">DREAM. CREATE. ENTERTAIN.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68]" />
              <span>MUDHAL KADHAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-white">PADIKATHAVAN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68]" />
              <span>GAME (NOT OVER)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[#D6AD68]">LIVE CONCERTS & DJ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68]" />
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          SECTION 1: OUR CINEMATIC COLLECTION (Strict Client Requirement)
          ==================================================== */}
      <OttCarousel
        title="OUR CINEMATIC COLLECTION"
        badge="OFFICIAL PORTFOLIO"
        subtitle="FEATURED ORIGINALS"
        items={officialCollection}
        onPlayTrailer={handlePlayVideo}
        aspectRatio="poster"
      />

      {/* ====================================================
          SECTION 2: TRENDING NOW
          ==================================================== */}
      <OttCarousel
        title="TRENDING NOW"
        badge="TOP STREAMS"
        subtitle="POPULAR WITH AUDIENCES"
        items={trendingNow}
        onPlayTrailer={handlePlayVideo}
        aspectRatio="poster"
      />

      {/* ====================================================
          CINEMATIC SPOTLIGHT: MUDHAL KADHAL (COMING SOON 2026)
          ==================================================== */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-[#D6AD68]/40 bg-gradient-to-br from-[#1A1610] via-[#0E0E0E] to-black p-6 sm:p-10 lg:p-12 shadow-[0_15px_50px_rgba(214,173,104,0.15)]">
            {/* Background Art */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-25 lg:opacity-60 overflow-hidden pointer-events-none">
              <img
                src="/media/title-3-teaser.png"
                alt="Mudhal Kadhal Teaser"
                className="w-full h-full object-cover object-center filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1610] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-xl flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black">
                  UPCOMING RELEASE 2026
                </span>
                <span className="text-xs uppercase tracking-wider text-[#D6AD68] font-mono">
                  PRODUCTION NO. 3
                </span>
              </div>

              <h2 className="font-cinematic font-black text-3xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
                MUDHAL KADHAL
              </h2>

              <p className="text-sm sm:text-base text-[#D6AD68] font-cinematic italic tracking-wider">
                “SOME STORIES FIND YOU... FIRST LOVE. LASTS FOREVER.”
              </p>

              <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed font-light">
                Written, produced, and directed by Kavin with co-writing by Puviyarasan. Featuring an evocative musical composition by Ajay Kumar, camera direction by Yuvan, and editing by Tharun(AT). Starring Sanjith, Mehnaz Sherin, and Nagasundaram.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handlePlayVideo('/media/mudhal-kadhal.mp4', 'Mudhal Kadhal — Official Teaser')}
                  className="btn-gold px-6 py-3 rounded-sm flex items-center gap-2 text-xs uppercase font-extrabold cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Watch Teaser Video</span>
                </button>

                <Link
                  to="/productions/mudhal-kadhal"
                  className="px-6 py-3 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  View Full Credits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: FEATURED MOVIES (Landscape poster view)
          ==================================================== */}
      <OttCarousel
        title="FEATURED MOVIES"
        badge="CINEMA RELEASES"
        subtitle="THEATRICAL PRODUCTIONS"
        items={featuredMovies}
        onPlayTrailer={handlePlayVideo}
        aspectRatio="landscape"
      />

      {/* ====================================================
          SECTION 4: EXCLUSIVE SHORT FILMS
          ==================================================== */}
      <OttCarousel
        title="EXCLUSIVE SHORT FILMS"
        badge="NARRATIVE SHORTS"
        subtitle="INDEPENDENT CINEMA"
        items={shortFilms}
        onPlayTrailer={handlePlayVideo}
        aspectRatio="poster"
      />

      {/* ====================================================
          CATEGORY D: UPCOMING RELEASES
          ==================================================== */}
      {upcomingReleases.length > 0 && (
        <OttCarousel
          title="UPCOMING RELEASES"
          badge="COMING SOON"
          subtitle="NEXT ON BE HAPPY ENTERTAINMENT"
          items={upcomingReleases}
          onPlayTrailer={handlePlayVideo}
          aspectRatio="landscape"
        />
      )}

      {/* ====================================================
          SECTION 5: LIVE CONCERTS & DJ ENTERTAINMENT
          ==================================================== */}
      <section className="py-12 sm:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-[#D6AD68]/20 border border-[#D6AD68]/40 text-[#D6AD68] flex items-center justify-center">
                  <Music className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D6AD68] font-bold">
                  LIVE ENTERTAINMENT & STAGE
                </span>
              </div>
              <h2 className="font-cinematic font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase">
                LIVE CONCERTS & DJ PRODUCTION
              </h2>
              <p className="text-xs sm:text-sm text-[#7E7E7E] mt-1 max-w-xl">
                Led by Kavin — ECE Engineer, Sound Engineer, and DJ — bringing high-energy live audio mixing, concert staging, and acoustic mastery.
              </p>
            </div>

            <Link
              to="/concerts"
              className="px-5 py-3 rounded-sm bg-white/10 hover:bg-[#D6AD68] hover:text-black text-white font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all border border-white/20 self-start md:self-auto"
            >
              <span>EXPLORE CONCERT EXPERIENCES</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Concert Feature Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative rounded-xl overflow-hidden border border-white/10 bg-[#121212] group">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src="/media/kavin-director-banner.png"
                  alt="Kavin Sound Engineer & DJ Live Console"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xs bg-black/70 backdrop-blur-md text-[#D6AD68] border border-[#D6AD68]/30 text-[10px] font-bold uppercase tracking-widest">
                  PIONEER DJ & ACOUSTIC LAB
                </div>
              </div>
              <div className="p-6 bg-[#121212]">
                <h3 className="font-cinematic font-bold text-xl text-white group-hover:text-[#D6AD68] transition-colors">
                  Live Stage Sound Engineering & DJ Direction
                </h3>
                <p className="text-xs sm:text-sm text-[#B5B5B5] mt-2 leading-relaxed">
                  “Same Passion, Different Medium. Ideas | Stories | Sound | Beyond.” From large-scale live concert audio to festival DJ performances, Be Happy Entertainment engineers immersive sonic power tailored for energized crowds.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-[#151515]">
              <div>
                <span className="text-[10px] text-[#D6AD68] uppercase font-bold tracking-[0.25em]">
                  PRODUCTION CAPABILITIES
                </span>
                <h4 className="font-cinematic font-bold text-lg text-white mt-1">
                  Audio & Concert Services
                </h4>
                <ul className="mt-4 space-y-3 text-xs text-[#B5B5B5]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68] mt-1 shrink-0" />
                    <span>Pioneer DJ Live Sets & Festival Entertainment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68] mt-1 shrink-0" />
                    <span>Concert Stage Audio Engineering & Acoustic Tuning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68] mt-1 shrink-0" />
                    <span>Multi-track Audio Mixing & Post-Show Masters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68] mt-1 shrink-0" />
                    <span>Lighting, Pyrotechnics & Visual Sync Direction</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <Link
                  to="/contact"
                  className="w-full py-3 rounded-sm bg-[#D6AD68] hover:bg-[#F3E2B8] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Book Concert Production</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          CATEGORY F: MOST WATCHED
          ==================================================== */}
      <OttCarousel
        title="MOST WATCHED"
        badge="AUDIENCE FAVORITES"
        subtitle="TOP STREAMED RELEASES"
        items={mostWatched}
        onPlayTrailer={handlePlayVideo}
        aspectRatio="poster"
      />

      {/* ====================================================
          SECTION 6: OFFICIAL YOUTUBE & INSTAGRAM INTEGRATIONS
          ==================================================== */}
      <SocialShowcaseSections onPlayVideo={handlePlayVideo} />

      {/* ====================================================
          SECTION 7: CINEMATIC MODAL VIDEO PLAYER
          ==================================================== */}
      <CinematicPlayerModal
        isOpen={playerState.isOpen}
        onClose={handleClosePlayer}
        videoUrl={playerState.videoUrl}
        title={playerState.title}
      />
    </div>
  );
};
