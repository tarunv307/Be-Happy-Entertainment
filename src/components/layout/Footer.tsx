import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Music, Shield, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../ui/SocialIcons';
import { KavinLogo } from '../brand/KavinLogo';
import { useData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { companySettings } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-[#B5B5B5] border-t border-[#D6AD68]/20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,rgba(214,173,104,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <Link to="/" className="group">
              <KavinLogo variant="footer" size="lg" />
            </Link>

            <p className="text-sm text-[#8E8E8E] max-w-sm leading-relaxed mt-2">
              Be Happy Entertainment is a cinematic entertainment platform and creative film house dedicated to original visual narratives, feature films, short cinema, and electrifying live concerts.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D6AD68] font-cinematic tracking-widest mt-1">
              <span>“EVERY FRAME TELLS A STORY”</span>
            </div>

            {/* Official Social Links */}
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://www.instagram.com/be_happy_entertainment24/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#151515] hover:bg-[#D6AD68] text-white hover:text-black border border-white/10 hover:border-[#D6AD68] flex items-center justify-center transition-all duration-300 shadow-sm"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <a
                href="https://youtube.com/@kavin_kp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#151515] hover:bg-red-600 text-white border border-white/10 hover:border-red-600 flex items-center justify-center transition-all duration-300 shadow-sm"
                title="Subscribe on YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>

              <Link
                to="/admin"
                className="h-10 px-4 rounded-full bg-[#151515] hover:bg-white/10 text-[#D6AD68] border border-[#D6AD68]/30 flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-colors"
                title="Studio CMS"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>CMS</span>
              </Link>
            </div>
          </div>

          {/* OTT Navigation */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AD68]">
              Entertainment
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Theater
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">
                  Feature Movies
                </Link>
              </li>
              <li>
                <Link to="/short-films" className="hover:text-white transition-colors">
                  Short Films
                </Link>
              </li>
              <li>
                <Link to="/concerts" className="hover:text-white transition-colors">
                  Live Concerts & DJ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Studio & Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Titles */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AD68]">
              Featured Titles
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/productions/mudhal-kadhal" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>Mudhal Kadhal</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#D6AD68]/20 text-[#D6AD68] rounded-xs font-mono">2026</span>
                </Link>
              </li>
              <li>
                <Link to="/productions/padikathavan" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>Padikathavan</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-white/10 text-white/70 rounded-xs font-mono">Movie</span>
                </Link>
              </li>
              <li>
                <Link to="/productions/game" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>Game (Not Over)</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-white/10 text-white/70 rounded-xs font-mono">Movie</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Channels & Connection */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AD68]">
              Official Channels
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E8E8E]">
              <li>
                <a
                  href="https://www.instagram.com/be_happy_entertainment24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#D6AD68] shrink-0" />
                  <span>@be_happy_entertainment24</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@kavin_kp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>@kavin_kp</span>
                </a>
              </li>
            </ul>

            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center py-2.5 px-4 bg-white/5 hover:bg-[#D6AD68] text-white hover:text-black border border-white/10 hover:border-[#D6AD68] text-xs uppercase tracking-widest font-semibold transition-all rounded-xs text-center"
            >
              Collaborate
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E7E7E]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} BE HAPPY ENTERTAINMENT. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[#D6AD68]">DREAM. CREATE. ENTERTAIN.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#B5B5B5] hover:text-[#D6AD68] transition-colors cursor-pointer"
          >
            <span className="text-[11px] uppercase tracking-wider">Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
