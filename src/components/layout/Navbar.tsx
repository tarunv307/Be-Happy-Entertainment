import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Film, Music, Tv, Info, Mail, Lock, Menu, X, Sparkles, User, Home, ChevronRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../ui/SocialIcons';
import { KavinLogo } from '../brand/KavinLogo';
import { GlobalSearchModal } from '../ui/GlobalSearchModal';

interface NavbarProps {
  onReplayIntro?: () => void;
  onPlayVideo?: (videoUrl: string, title: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro, onPlayVideo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'Short Films', path: '/short-films', icon: Tv },
    { name: 'Concerts', path: '/concerts', icon: Music },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-2xl border-b border-[#D6AD68]/25 shadow-[0_4px_35px_rgba(0,0,0,0.9)] py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-[#080808]/95 via-[#080808]/60 to-transparent py-3.5 sm:py-4.5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 min-h-[44px] sm:min-h-[48px]">
          {/* Brand Logo (Left) */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="Be Happy Entertainment Home">
            <KavinLogo variant="full" size="md" animated={true} />
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 2xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[12px] xl:text-[13px] tracking-[0.14em] uppercase font-semibold transition-all duration-200 relative py-2 whitespace-nowrap group ${
                    isActive
                      ? 'text-[#D6AD68] font-bold drop-shadow-[0_0_10px_rgba(214,173,104,0.6)]'
                      : 'text-[#B5B5B5] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Gold Glow Active Underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D6AD68] to-transparent transition-transform duration-300 ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions & Social Links (Right) */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {/* Action Pill Container */}
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 shadow-xs">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 rounded-full text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center"
                title="Search platform (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-4 bg-white/15" />

              {/* Official Instagram */}
              <a
                href="https://www.instagram.com/be_happy_entertainment24/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Official Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>

              {/* Official YouTube */}
              <a
                href="https://youtube.com/@kavin_kp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full text-[#B5B5B5] hover:text-red-500 hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Official YouTube Channel"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>

              {/* Intro Replay Button */}
              {onReplayIntro && (
                <>
                  <div className="w-px h-4 bg-white/15" />
                  <button
                    onClick={onReplayIntro}
                    className="w-8 h-8 rounded-full text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                    title="Replay Cinematic Intro"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>

            {/* Admin CMS Access */}
            <Link
              to="/admin"
              className="h-9 px-3.5 inline-flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#D6AD68] bg-[#141414] border border-[#D6AD68]/45 hover:bg-[#D6AD68] hover:text-black transition-all duration-300 rounded-sm shadow-[0_2px_15px_rgba(214,173,104,0.2)] active:scale-95"
              title="Admin CMS Portal"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>CMS</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#B5B5B5] hover:text-[#D6AD68] bg-white/5 border border-white/10 active:scale-90 transition-all cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/admin"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#D6AD68] bg-white/5 border border-[#D6AD68]/30 active:scale-90 transition-all"
              title="Profile / CMS"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:text-[#D6AD68] bg-white/5 border border-white/10 active:scale-90 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D6AD68]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Luxury Full-screen OTT Experience) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-2xl pt-20 px-5 lg:hidden flex flex-col justify-between pb-32 animate-fade-in overflow-y-auto">
          <div className="flex flex-col space-y-4 pt-2">
            {/* Quick Search Tap Bar */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-[#D6AD68]/30 text-left text-sm text-[#B5B5B5] active:scale-98 transition-transform"
            >
              <span className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#D6AD68]" />
                <span className="text-xs">Search movies, shorts, music...</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-[#D6AD68]">
                Find
              </span>
            </button>

            {/* Platform Navigation Header */}
            <div className="flex items-center justify-between pb-2 pt-2 border-b border-white/10">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6AD68] font-bold">
                PLATFORM NAVIGATION
              </span>
              <span className="text-[9px] text-[#7E7E7E] uppercase font-cinematic tracking-wider">
                DREAM • CREATE • ENTERTAIN
              </span>
            </div>

            {/* Links List with Icons & Chevrons */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group active:scale-98 ${
                      isActive
                        ? 'bg-[#D6AD68]/15 border border-[#D6AD68]/40 text-[#D6AD68]'
                        : 'hover:bg-white/5 text-[#E0E0E0] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#D6AD68] text-black' : 'bg-white/5 text-[#D6AD68]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-cinematic text-lg font-bold tracking-wide">
                        {link.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-[#D6AD68] text-black">
                          Active
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#D6AD68] transition-colors" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer: Producer Spotlight & Socials */}
          <div className="border-t border-white/10 pt-5 flex flex-col gap-3.5 mt-6">
            {/* Studio / Producer Spotlight Chip */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#16130E] to-[#0E0E0E] border border-[#D6AD68]/30 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">
                  BE HAPPY ENTERTAINMENT
                </p>
                <p className="text-[10px] text-[#D6AD68] font-cinematic">
                  Directed & Produced by Kavin
                </p>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D6AD68]/20 text-[#D6AD68] border border-[#D6AD68]/40 uppercase font-mono">
                Official
              </span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center justify-around py-2.5 bg-white/5 rounded-xl border border-white/10">
              <a
                href="https://www.instagram.com/be_happy_entertainment24/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#B5B5B5] hover:text-[#D6AD68] active:scale-95 transition-transform"
              >
                <InstagramIcon className="w-4 h-4 text-[#D6AD68]" />
                <span className="font-medium">Instagram</span>
              </a>
              <div className="w-px h-4 bg-white/20" />
              <a
                href="https://youtube.com/@kavin_kp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#B5B5B5] hover:text-red-400 active:scale-95 transition-transform"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span className="font-medium">YouTube</span>
              </a>
            </div>

            {/* Admin CMS Access */}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#121212] border border-[#D6AD68]/50 text-[#D6AD68] text-xs uppercase tracking-widest font-bold hover:bg-[#D6AD68] hover:text-black transition-all rounded-lg active:scale-98 shadow-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Admin CMS Portal</span>
            </Link>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPlayVideo={onPlayVideo}
      />
    </>
  );
};
