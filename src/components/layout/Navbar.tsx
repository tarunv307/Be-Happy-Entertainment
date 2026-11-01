import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Film, Music, Tv, Info, Mail, Lock, Menu, X, Sparkles, User } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Short Films', path: '/short-films' },
    { name: 'Concerts', path: '/concerts' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-[#D6AD68]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-black/95 via-black/50 to-transparent py-3.5 sm:py-4.5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 min-h-[44px] sm:min-h-[48px]">
          {/* Brand Logo (Left) */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
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
                  className={`text-[11.5px] xl:text-[13px] tracking-[0.14em] uppercase font-medium transition-all duration-200 relative py-2 whitespace-nowrap group ${
                    isActive
                      ? 'text-[#D6AD68] font-bold drop-shadow-[0_0_8px_rgba(214,173,104,0.5)]'
                      : 'text-[#B5B5B5] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Subtle Gold Glow Active Underline */}
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
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-full text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
              title="Search platform (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Official Instagram */}
            <a
              href="https://www.instagram.com/be_happy_entertainment24/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/5 flex items-center justify-center transition-colors"
              title="Official Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Official YouTube */}
            <a
              href="https://youtube.com/@kavin_kp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full text-[#B5B5B5] hover:text-red-500 hover:bg-white/5 flex items-center justify-center transition-colors"
              title="Official YouTube Channel"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>

            {/* Intro Replay Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="w-9 h-9 rounded-full text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
                title="Replay Cinematic Intro"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            {/* Profile Icon */}
            <Link
              to="/admin"
              className="w-9 h-9 rounded-full text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center border border-white/10 hover:border-[#D6AD68]/40"
              title="Profile / CMS Sign In"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Admin CMS Access */}
            <Link
              to="/admin"
              className="h-9 px-3.5 inline-flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#D6AD68] bg-[#161616] border border-[#D6AD68]/40 hover:bg-[#D6AD68] hover:text-black transition-all duration-300 rounded-sm shadow-xs"
              title="Admin CMS Portal"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>CMS</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/admin"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#B5B5B5] hover:text-[#D6AD68] hover:bg-white/5 active:scale-90 transition-all"
              title="Profile / CMS"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#D6AD68] hover:text-white hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Touch friendly with bottom dock clearance) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-2xl pt-24 px-6 lg:hidden flex flex-col justify-between pb-28 animate-fade-in overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D6AD68] font-bold">
                PLATFORM NAVIGATION
              </span>
              <span className="text-[10px] text-[#7E7E7E] uppercase">
                DREAM. CREATE. ENTERTAIN.
              </span>
            </div>

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-cinematic font-bold tracking-wider transition-colors py-2 active:text-[#D6AD68] flex items-center justify-between ${
                    isActive ? 'text-[#D6AD68]' : 'text-white hover:text-[#D6AD68]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#D6AD68] shadow-[0_0_8px_rgba(214,173,104,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
            {/* Socials Row */}
            <div className="flex items-center justify-around py-2.5 bg-white/5 rounded-lg border border-white/5">
              <a
                href="https://www.instagram.com/be_happy_entertainment24/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#B5B5B5] hover:text-[#D6AD68] active:scale-95 transition-transform"
              >
                <InstagramIcon className="w-4 h-4 text-[#D6AD68]" />
                <span>Instagram</span>
              </a>
              <div className="w-px h-4 bg-white/20" />
              <a
                href="https://youtube.com/@kavin_kp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#B5B5B5] hover:text-red-400 active:scale-95 transition-transform"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>YouTube</span>
              </a>
            </div>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#151515] border border-[#D6AD68]/40 text-[#D6AD68] text-xs uppercase tracking-widest font-bold hover:bg-[#D6AD68] hover:text-black transition-all rounded-sm active:scale-98"
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
