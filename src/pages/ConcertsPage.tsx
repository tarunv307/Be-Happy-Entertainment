import React from 'react';
import { Music, Radio, Sparkles, Volume2, Calendar, MapPin, ArrowRight, ShieldCheck, Headphones, Sliders, Disc } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ConcertsPage: React.FC = () => {
  const capabilities = [
    {
      icon: <Disc className="w-6 h-6 text-[#D6AD68]" />,
      title: 'Pioneer DJ Live Sets',
      description:
        'Dynamic high-energy DJ performances curated for university cultural fests, music galas, and concert arenas with smooth genre transitions and rhythmic crowd engagement.',
    },
    {
      icon: <Sliders className="w-6 h-6 text-[#D6AD68]" />,
      title: 'Live Stage Audio Engineering',
      description:
        'Acoustic space calibration, multi-speaker delay line alignments, high-SPL clarity tuning, and feedback suppression engineered for crystal-clear vocals and punchy sub-bass.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#D6AD68]" />,
      title: 'Multi-Track Recording & Mixing',
      description:
        'Capturing pristine multi-track live performance stems for post-concert mixing, Dolby spatial mastering, and high-fidelity video synchronization.',
    },
    {
      icon: <Volume2 className="w-6 h-6 text-[#D6AD68]" />,
      title: 'Sound & Visual Synchronization',
      description:
        'Coordinating live sound cues with DMX lighting, stage LED visuals, and pyrotechnics for unforgettable sensory immersion.',
    },
  ];

  const concertGallery = [
    {
      image: '/media/kavin-director-banner.png',
      title: 'Pioneer DJ Console & Acoustic Mix Station',
      subtitle: '“Same Passion, Different Medium” — Live Stage Set',
    },
    {
      image: '/media/bts-gimbal.png',
      title: 'Stage Gimbal & Real-time Live Camera Rig',
      subtitle: 'Dynamic onstage tracking and visual capture',
    },
    {
      image: '/media/title-card-release.png',
      title: 'Musical Theme Launch & Audio Unveil',
      subtitle: 'Acoustic arrangement and sound card reveal',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-20">
      {/* ====================================================
          CONCERT HERO BANNER
          ==================================================== */}
      <div className="relative border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#1C160C] via-[#0E0E0E] to-[#080808]">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,173,104,0.18)_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="max-w-3xl flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D6AD68]/20 border border-[#D6AD68]/40 text-[#D6AD68] flex items-center justify-center">
                <Music className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6AD68] font-bold">
                LIVE ENTERTAINMENT & AUDIO ENGINEERING
              </span>
            </div>

            <h1 className="font-cinematic font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-tight">
              LIVE CONCERTS & DJ PRODUCTIONS
            </h1>

            <p className="text-base sm:text-lg text-[#D6AD68] font-cinematic italic tracking-wider">
              “IDEAS. STORIES. SOUND. BEYOND.”
            </p>

            <p className="text-sm sm:text-base text-[#B5B5B5] font-light leading-relaxed max-w-2xl">
              Led by Kavin — trained in Electronics & Communication Engineering, professional Producer, Director, and Sound Engineer & DJ. We bridge technological acoustic mastery with electrifying stage entertainment for music festivals, collegiate stages, and premium live gatherings.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="btn-gold px-8 py-3.5 rounded-sm flex items-center gap-2 text-xs uppercase font-extrabold"
              >
                <span>Book Concert Production</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://youtube.com/@kavin_kp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
              >
                <span>Watch Live Mixes</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          FEATURED CONSOLE PHOTO BANNER
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-2xl overflow-hidden border border-[#D6AD68]/40 shadow-2xl bg-[#121212] group">
          <div className="relative aspect-21/9 sm:aspect-16/7 w-full overflow-hidden">
            <img
              src="/media/kavin-director-banner.png"
              alt="Kavin Live Stage DJ & Sound Engineer Banner"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6AD68]">
                  OFFICIAL STAGE RIG
                </span>
                <h3 className="font-cinematic font-black text-xl sm:text-2xl text-white">
                  Pioneer DJ & Pro Audio Mixing Console
                </h3>
                <p className="text-xs text-[#B5B5B5] mt-1 font-light">
                  Shoot. Edit. Mix. Create. Repeat. — Dedicated to authentic live performance acoustics.
                </p>
              </div>

              <div className="px-4 py-2 bg-black/70 backdrop-blur-md rounded-sm border border-white/10 text-xs font-mono text-[#D6AD68] whitespace-nowrap">
                ECE • SOUND ENGINEER • DJ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          CONCERT CAPABILITIES GRID
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6AD68] font-bold">
            STAGE MASTERY
          </span>
          <h2 className="font-cinematic font-black text-2xl sm:text-4xl text-white uppercase tracking-wide mt-1">
            CONCERT PRODUCTION CAPABILITIES
          </h2>
          <p className="text-xs sm:text-sm text-[#7E7E7E] mt-2">
            Every concert is an acoustic journey. We handle the entire audio spectrum with scientific precision and artistic intuition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-xl bg-[#141414] border border-white/10 hover:border-[#D6AD68]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#D6AD68]/10 border border-[#D6AD68]/30 flex items-center justify-center mb-5">
                  {cap.icon}
                </div>
                <h3 className="font-cinematic font-bold text-lg sm:text-xl text-white mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          CONCERT & AUDIO GALLERY
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6AD68] font-bold">
              VISUAL ARCHIVE
            </span>
            <h2 className="font-cinematic font-black text-2xl sm:text-3xl text-white uppercase tracking-wide mt-1">
              LIVE STAGE & SOUND GALLERY
            </h2>
          </div>

          <Link
            to="/gallery"
            className="text-xs uppercase tracking-wider text-[#D6AD68] hover:text-white flex items-center gap-1.5"
          >
            <span>View Full Studio Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concertGallery.map((item, i) => (
            <div
              key={i}
              className="group rounded-xl overflow-hidden bg-[#121212] border border-white/10 hover:border-[#D6AD68]/40 transition-all flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4 bg-[#141414]">
                <h4 className="font-cinematic font-bold text-white text-sm group-hover:text-[#D6AD68] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#7E7E7E] mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          BOOKING ENQUIRY BANNER
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#17130A] via-[#101010] to-[#0A0A0A] border border-[#D6AD68]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D6AD68]">
              LIVE INQUIRIES
            </span>
            <h3 className="font-cinematic font-black text-2xl sm:text-3xl text-white mt-1">
              Planning a Concert, Stage Show, or Festival?
            </h3>
            <p className="text-xs sm:text-sm text-[#B5B5B5] mt-1 max-w-xl font-light">
              Collaborate directly with Kavin Production for live sound engineering, Pioneer DJ bookings, and stage acoustic consultation.
            </p>
          </div>

          <Link
            to="/contact"
            className="btn-gold px-8 py-3.5 rounded-sm text-xs uppercase font-extrabold shrink-0"
          >
            Inquire for Dates & Specs
          </Link>
        </div>
      </div>
    </div>
  );
};
