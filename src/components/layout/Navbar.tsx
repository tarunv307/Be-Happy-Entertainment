import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Film, Lock } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { companySettings } = useData();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Productions', path: '/productions' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Our Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E8E6E0] py-0'
            : isHome
            ? 'bg-transparent border-b border-[#E8E6E0]/40 py-1'
            : 'bg-white border-b border-[#E8E6E0] py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark (Left) */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-[#121212] rounded-none flex items-center justify-center text-white transition-all duration-500 group-hover:scale-105 group-hover:bg-[#B69A65] shrink-0 shadow-xs">
              <Film className="w-5 h-5 text-[#B69A65] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-cinematic text-lg sm:text-xl font-bold tracking-widest text-[#121212] uppercase leading-none transition-colors group-hover:text-[#B69A65]">
                {companySettings.brand_name || 'KAVIN PRODUCTION'}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#6B6861] font-medium mt-1">
                Cinematic Media Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs xl:text-[13px] tracking-wider uppercase font-medium transition-colors duration-200 relative py-2 ${
                    isActive
                      ? 'text-[#121212] font-bold'
                      : 'text-[#6B6861] hover:text-[#121212]'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Subtle Gold Underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#B69A65] transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs (Right) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Distinct Admin CMS Button */}
            <Link
              to="/admin"
              className="h-10 px-4 inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#121212] bg-[#FAF9F5] border border-[#B69A65] hover:bg-[#121212] hover:text-white hover:border-[#121212] shadow-xs rounded-none transition-all duration-300 group"
              title="Access Admin CMS Portal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B69A65] animate-pulse group-hover:bg-white shrink-0" />
              <Lock className="w-3.5 h-3.5 text-[#B69A65] group-hover:text-white transition-colors shrink-0" />
              <span className="font-mono text-[10px]">ADMIN CMS</span>
            </Link>

            {/* Start A Project CTA */}
            <Link
              to="/contact"
              className="h-10 px-6 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest bg-[#121212] text-white hover:bg-[#B69A65] transition-all duration-300 rounded-none shadow-xs group shrink-0 relative overflow-hidden"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#B69A65] group-hover:text-white shrink-0" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button (Hidden on lg+) */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/admin"
              className="h-8 px-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#121212] bg-[#FAF9F5] border border-[#B69A65] rounded-none"
            >
              <Lock className="w-3 h-3 text-[#B69A65]" />
              <span>CMS</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-[#121212] hover:text-[#B69A65] focus:outline-hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with smooth entrance */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col justify-between pb-8 transition-opacity duration-300">
          <div className="flex flex-col space-y-4">
            <p className="text-[11px] tracking-widest uppercase text-[#B69A65] font-semibold border-b border-[#E8E6E0] pb-2">
              Studio Navigation
            </p>
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{ animationDelay: `${idx * 40}ms` }}
                  className={`text-2xl font-editorial tracking-wide transition-colors ${
                    isActive ? 'text-[#B69A65] italic font-semibold' : 'text-[#121212] hover:text-[#B69A65]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-[#E8E6E0] pt-6 flex flex-col gap-3">
            <Link
              to="/contact"
              className="w-full text-center py-4 bg-[#121212] text-white uppercase text-xs tracking-widest font-semibold hover:bg-[#B69A65] transition-colors rounded-none shadow-sm"
            >
              Start A Project
            </Link>

            <Link
              to="/admin"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FAF9F5] border border-[#B69A65] text-[#121212] text-xs uppercase tracking-widest font-bold hover:bg-[#121212] hover:text-white transition-all shadow-xs rounded-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#B69A65] animate-pulse" />
              <Lock className="w-3.5 h-3.5 text-[#B69A65]" />
              <span>Studio Admin CMS Portal</span>
            </Link>

            <div className="flex justify-between items-center text-[10px] text-[#6B6861] pt-1">
              <span>{companySettings.brand_name || 'KAVIN PRODUCTION'}</span>
              <span>Light Theme Official</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
