import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Film, Tv, Music, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Movies',
      path: '/movies',
      icon: Film,
    },
    {
      name: 'Shorts',
      path: '/short-films',
      icon: Tv,
    },
    {
      name: 'Concerts',
      path: '/concerts',
      icon: Music,
    },
    {
      name: 'About',
      path: '/about',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-2xl border-t border-[#D6AD68]/20 shadow-[0_-10px_35px_rgba(0,0,0,0.9)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? 'text-[#D6AD68]'
                  : 'text-[#8E8E8E] hover:text-[#C5C5C5] active:scale-95'
              }`}
            >
              {/* Active Indicator Glow Pip */}
              {isActive && (
                <span className="absolute -top-2 w-7 h-1 rounded-full bg-gradient-to-r from-transparent via-[#D6AD68] to-transparent shadow-[0_0_12px_rgba(214,173,104,0.9)]" />
              )}

              <div
                className={`p-1 rounded-lg transition-transform duration-300 ${
                  isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(214,173,104,0.7)]' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 mt-0.5 ${
                  isActive ? 'font-bold text-[#D6AD68]' : 'font-medium'
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

