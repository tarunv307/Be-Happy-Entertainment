import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  Film,
  LayoutDashboard,
  Layers,
  Users,
  Image,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  Music,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { KavinLogo } from '../../components/brand/KavinLogo';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, isDemoMode } = useAuth();
  const { enquiries } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <Film className="w-8 h-8 text-[#D6AD68] animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#B5B5B5]">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Productions & OTT', path: '/admin/productions', icon: Film },
    { name: 'Services & Concerts', path: '/admin/services', icon: Layers },
    { name: 'Team & Artists', path: '/admin/team', icon: Users },
    { name: 'Media Archive', path: '/admin/gallery', icon: Image },
    {
      name: 'Enquiries',
      path: '/admin/enquiries',
      icon: Inbox,
      badge: pendingEnquiriesCount > 0 ? pendingEnquiriesCount : null,
    },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#121212] border-r border-white/10 justify-between z-20">
        <div>
          {/* Logo & Brand */}
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2.5">
              <KavinLogo variant="compact" size="sm" />
            </Link>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#7E7E7E] block mt-2 font-mono">
              STUDIO CMS PORTAL
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#D6AD68] text-black font-bold shadow-md'
                      : 'text-[#B5B5B5] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#8E8E8E] px-2">
            <span className="truncate max-w-[140px]">{user?.email}</span>
            <span className="text-[9px] font-mono uppercase text-[#D6AD68] px-1.5 py-0.5 rounded-xs bg-[#D6AD68]/15 border border-[#D6AD68]/30">
              {isDemoMode ? 'Local' : 'Live'}
            </span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#B5B5B5] hover:text-white text-xs transition-colors"
          >
            <span>View Public OTT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#121212] border-b border-white/10">
          <KavinLogo variant="compact" size="sm" />

          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-[#D6AD68]"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/95 pt-20 px-6 pb-6 flex flex-col justify-between">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 p-3 text-lg font-cinematic font-bold text-white hover:text-[#D6AD68]"
                >
                  <item.icon className="w-5 h-5 text-[#D6AD68]" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Main Routed Content */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
