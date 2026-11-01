import React from 'react';
import { Film, Music, Radio, Award, Compass, Eye, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { KavinLogo } from '../components/brand/KavinLogo';

export const AboutPage: React.FC = () => {
  const capabilities = [
    {
      title: 'Feature Films',
      desc: 'Developing and producing character-driven theatrical and streaming feature cinema with high visual and emotional payoff.',
      link: '/movies',
    },
    {
      title: 'Narrative Short Cinema',
      desc: 'Crafting potent short films with festival pedigree like Mudhal Kadhal, defined by poetic cinematography and emotional depth.',
      link: '/short-films',
    },
    {
      title: 'Live Concerts & DJ Production',
      desc: 'Pioneer DJ sets, large-scale stage sound reinforcement, and acoustic direction curated for unforgettable live audiences.',
      link: '/concerts',
    },
    {
      title: 'Sound Engineering & Audio Post',
      desc: 'Comprehensive studio recording, Foley design, multi-track mixing, and acoustic mastering engineered by technical specialists.',
      link: '/contact',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-20">
      {/* ====================================================
          HERO BANNER
          ==================================================== */}
      <div className="relative border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#18130B] via-[#0E0E0E] to-[#080808] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl flex flex-col items-start gap-4">
            <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black">
              STUDIO & VISION
            </span>

            <h1 className="font-cinematic font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-tight">
              DREAM. CREATE. ENTERTAIN.
            </h1>

            <p className="text-base sm:text-lg text-[#D6AD68] font-cinematic italic tracking-wider">
              “EVERY FRAME TELLS A STORY.”
            </p>

            <p className="text-sm sm:text-base text-[#B5B5B5] leading-relaxed max-w-2xl font-light">
              Be Happy Entertainment is a creative entertainment house where cinema and sound converge. From evocative feature films and short cinema to electrifying live concerts, we craft experiences that linger in minds and hearts.
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================
          FOUNDER SPOTLIGHT: KAVIN
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-2xl overflow-hidden border border-[#D6AD68]/40 bg-[#121212] shadow-2xl">
          <div className="relative aspect-21/9 sm:aspect-16/7 w-full overflow-hidden">
            <img
              src="/media/kavin-director-banner.png"
              alt="Kavin — Producer, Director & Sound Engineer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#D6AD68] uppercase font-bold tracking-[0.25em]">
                  LEADERSHIP
                </span>
                <h3 className="font-cinematic font-black text-2xl sm:text-3xl text-white mt-1">
                  Kavin
                </h3>
                <p className="text-xs text-[#B5B5B5]">
                  Producer, Director & Sound Engineer | ECE Graduate & DJ
                </p>
              </div>

              <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-sm border border-white/10 text-xs font-mono text-[#D6AD68]">
                IDEAS • STORIES • SOUND • BEYOND
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#B5B5B5] leading-relaxed">
            <div>
              <h4 className="font-cinematic font-bold text-lg text-white mb-2">
                Creative Philosophy
              </h4>
              <p className="font-light">
                “Good Stories, Better People. Same Passion, Different Medium.” With a foundational background in Electronics and Communication Engineering (ECE), Kavin bridges technical precision with evocative storytelling. Every narrative decision is built on empathy, and every acoustic cue is engineered for emotional clarity.
              </p>
            </div>

            <div>
              <h4 className="font-cinematic font-bold text-lg text-white mb-2">
                The Filmmaking Routine
              </h4>
              <p className="font-light">
                “Shoot. Edit. Mix. Create. Repeat.” From writing and directing titles like Mudhal Kadhal, Padikathavan, and Game to engineering live festival sound rigs, Be Happy Entertainment is rooted in relentless hands-on creative execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          VISION & MISSION
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl bg-[#121212] border border-white/10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#D6AD68]/10 border border-[#D6AD68]/30 flex items-center justify-center text-[#D6AD68]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-cinematic font-bold text-xl text-white">Our Vision</h3>
            <p className="text-sm text-[#B5B5B5] leading-relaxed font-light">
              To build a celebrated modern entertainment company where cinematic storytelling, short films, and high-energy live concerts resonate globally, pushing technical boundaries while honoring human emotion.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-[#121212] border border-white/10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#D6AD68]/10 border border-[#D6AD68]/30 flex items-center justify-center text-[#D6AD68]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-cinematic font-bold text-xl text-white">Our Mission</h3>
            <p className="text-sm text-[#B5B5B5] leading-relaxed font-light">
              To pioneer compelling visual and musical experiences by blending technical craft with courageous narrative direction — creating films and live performances that move audiences and leave a lasting impression.
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================
          PRODUCTION CAPABILITIES
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6AD68] font-bold">
            PORTFOLIO PILLARS
          </span>
          <h2 className="font-cinematic font-black text-2xl sm:text-4xl text-white uppercase tracking-wide mt-1">
            CORE PRODUCTION CAPABILITIES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[#121212] border border-white/10 hover:border-[#D6AD68]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <h4 className="font-cinematic font-bold text-lg text-white mb-2">
                  {cap.title}
                </h4>
                <p className="text-xs text-[#B5B5B5] leading-relaxed font-light">
                  {cap.desc}
                </p>
              </div>

              <Link
                to={cap.link}
                className="mt-6 text-xs text-[#D6AD68] hover:text-white font-semibold uppercase tracking-wider flex items-center gap-1"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          OFFICIAL SOCIAL CHANNELS
          ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#17130A] via-[#101010] to-[#0A0A0A] border border-[#D6AD68]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D6AD68]">
              OFFICIAL CHANNELS
            </span>
            <h3 className="font-cinematic font-black text-2xl sm:text-3xl text-white mt-1">
              Connect With Be Happy Entertainment
            </h3>
            <p className="text-xs sm:text-sm text-[#B5B5B5] mt-1 font-light">
              Follow our official media profiles on YouTube (@kavin_kp) and Instagram (@be_happy_entertainment24).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com/@kavin_kp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/be_happy_entertainment24/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-5 py-3 rounded-sm text-black font-extrabold text-xs uppercase tracking-wider"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
