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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, isDemoMode } = useAuth();
  const { enquiries } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F6F3] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Film className="w-8 h-8 text-[#B69A65] animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#777777]">
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
    { name: 'Productions', path: '/admin/productions', icon: Film },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Team Members', path: '/admin/team', icon: Users },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
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
    <div className="min-h-screen bg-[#F7F6F3] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E9E7E2] justify-between z-20">
        <div>
          {/* Logo & Brand */}
          <div className="p-6 border-b border-[#E9E7E2]">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#171717] rounded-xs flex items-center justify-center text-white">
                <Film className="w-4 h-4 text-[#B69A65]" />
              </div>
              <div>
                <span className="font-cinematic text-sm font-bold tracking-widest text-[#171717] block">
                  KAVIN CMS
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#777777]">
                  Studio Control Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#171717] text-white font-semibold'
                      : 'text-[#777777] hover:bg-[#F7F6F3] hover:text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-[#B69A65] text-white font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Database Status & Logout */}
        <div className="p-4 border-t border-[#E9E7E2] space-y-3">
          <div className="px-3 py-2 bg-[#F7F6F3] border border-[#E9E7E2] text-[11px] flex items-center gap-2 text-[#777777]">
            <Database className="w-3.5 h-3.5 text-[#B69A65]" />
            <span>{isDemoMode ? 'Local / Demo Store' : 'Live Supabase Connected'}</span>
          </div>

          <div className="flex items-center justify-between px-2 text-xs">
            <span className="text-[#777777] truncate max-w-[120px]">{user?.email}</span>
            <button
              onClick={handleLogout}
              title="Log Out"
              className="text-[#777777] hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#E9E7E2] flex items-center justify-between px-4 sm:px-8">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 text-[#171717]"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden md:block">
            <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold">
              KAVIN PRODUCTION OFFICIAL CMS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#777777] hover:text-[#171717] transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-white border-b border-[#E9E7E2] p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center justify-between p-2.5 text-xs uppercase tracking-wider text-[#171717]"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-[#B69A65]" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-[#B69A65] text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left p-2.5 text-xs uppercase tracking-wider text-red-600 flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Child Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
