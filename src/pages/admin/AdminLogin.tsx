import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Film,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { KavinLogo } from '../../components/brand/KavinLogo';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickFill = () => {
    setEmail('admin@behappyentertainment.com');
    setPassword('kavin@2025');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('An unexpected login transmission error occurred.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-center relative overflow-hidden select-none py-12 px-4 sm:px-6 lg:px-8">
      {/* ====================================================
          CINEMATIC BACKDROP LAYER
          ==================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient Blurred Artwork Collage */}
        <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-3 opacity-15 filter blur-xl scale-110">
          <img
            src="/media/title-3-teaser.png"
            alt="Mudhal Kadhal Background"
            className="w-full h-full object-cover"
          />
          <img
            src="/media/kavin-director-banner.png"
            alt="Kavin Studio Console"
            className="w-full h-full object-cover"
          />
          <img
            src="/media/padikathavan-poster.webp"
            alt="Padikathavan"
            className="w-full h-full object-cover hidden lg:block"
          />
        </div>

        {/* Film Grain Texture */}
        <div className="absolute inset-0 film-grain opacity-50" />

        {/* Radial Dark Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,173,104,0.12)_0%,rgba(8,8,8,0.92)_65%,#080808_100%)]" />
      </div>

      {/* Top Header Return Link */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md mb-4 flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#B5B5B5] hover:text-[#D6AD68] transition-colors py-2 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return To Public Theater</span>
        </Link>

        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D6AD68] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secure CMS</span>
        </span>
      </div>

      {/* Brand & Title */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-2xl bg-black/60 border border-[#D6AD68]/40 shadow-[0_0_30px_rgba(214,173,104,0.3)]">
            <KavinLogo variant="full" size="md" animated={true} />
          </div>
        </div>

        <h1 className="font-cinematic font-black text-2xl sm:text-3xl text-white uppercase tracking-wider">
          STUDIO CMS PORTAL
        </h1>
        <p className="mt-1 text-xs text-[#8E8E8E] font-light">
          Official Content Management & Streaming Administration
        </p>
      </div>

      {/* Sign-in Card */}
      <div className="relative z-10 mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121212]/95 backdrop-blur-2xl py-8 px-6 sm:px-10 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(214,173,104,0.15)]">
          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-500/50 flex items-center gap-3 text-red-200 text-xs animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Admin Email Field */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#B5B5B5] block mb-1.5 font-medium">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#D6AD68] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@behappyentertainment.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm pl-10 pr-3.5 py-3 text-base sm:text-sm text-white placeholder-[#666] focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Admin Passkey Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider text-[#B5B5B5] font-medium">
                  Studio Passkey
                </label>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[10px] uppercase font-bold text-[#D6AD68] hover:text-[#F3E2B8] cursor-pointer flex items-center gap-1"
                  title="Click to auto-fill credentials"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Auto-Fill</span>
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-[#D6AD68] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm pl-10 pr-10 py-3 text-base sm:text-sm text-white placeholder-[#666] focus:outline-hidden transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D6AD68] p-1 cursor-pointer transition-colors"
                  title={showPassword ? 'Hide Passkey' : 'Show Passkey'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Security Info */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#B5B5B5]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-xs border-white/20 bg-white/5 text-[#D6AD68] accent-[#D6AD68] focus:ring-0 cursor-pointer"
                />
                <span>Remember Session</span>
              </label>

              <span className="text-[10px] text-[#7E7E7E] uppercase tracking-wider font-mono">
                256-BIT SSL
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-gold py-3.5 rounded-sm text-xs uppercase font-extrabold flex items-center justify-center gap-2.5 cursor-pointer mt-6 active:scale-98 transition-transform shadow-[0_4px_25px_rgba(214,173,104,0.4)]"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating Studio Session...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 fill-black" />
                  <span>Access Studio CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Quick One-Tap Demo Login Card */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D6AD68]/40 transition-all flex items-center justify-between group cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#D6AD68]/20 text-[#D6AD68] flex items-center justify-center shrink-0">
                  <KeyRound className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block group-hover:text-[#D6AD68] transition-colors">
                    One-Tap Studio Credentials
                  </span>
                  <span className="text-[10px] text-[#7E7E7E] font-mono">
                    admin@behappyentertainment.com
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider bg-[#D6AD68]/20 text-[#D6AD68] border border-[#D6AD68]/30">
                Auto-Fill
              </span>
            </button>
          </div>
        </div>

        {/* Footer Notice */}
        <p className="text-center text-[11px] text-[#666] mt-6 font-light">
          &copy; {new Date().getFullYear()} Be Happy Entertainment. All rights reserved.
        </p>
      </div>
    </div>
  );
};
