import React, { useEffect, useState } from 'react';

interface IntroSplashProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete, forceShow = false }) => {
  const [stage, setStage] = useState<'idle' | 'countdown' | 'reveal' | 'tagline' | 'done'>('idle');
  const [count, setCount] = useState(3);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if already viewed in this session unless forceShow is true
    const hasSeenIntro = sessionStorage.getItem('kavin_intro_seen');
    if (hasSeenIntro && !forceShow) {
      if (onComplete) onComplete();
      return;
    }

    setVisible(true);
    setStage('countdown');

    // Film Countdown 3 -> 2 -> 1
    const timer1 = setTimeout(() => setCount(2), 500);
    const timer2 = setTimeout(() => setCount(1), 1000);
    const timer3 = setTimeout(() => {
      setStage('reveal');
      playCinematicChime();
    }, 1500);
    const timer4 = setTimeout(() => setStage('tagline'), 2500);
    const timer5 = setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('kavin_intro_seen', 'true');
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 700);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [forceShow, onComplete]);

  // Subtle synthesized cinematic chime using Web Audio API
  const playCinematicChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Sub-bass thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);

      // Shimmer chime
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'triangle';
      chime.frequency.setValueAtTime(587.33, now + 0.1); // D5
      chime.frequency.exponentialRampToValueAtTime(880, now + 1.8); // A5

      chimeGain.gain.setValueAtTime(0.12, now + 0.1);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chime.start(now + 0.1);
      chime.stop(now + 1.8);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('kavin_intro_seen', 'true');
    setVisible(false);
    if (onComplete) onComplete();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 bg-[#080808] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${
        stage === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cinematic Flare & Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,173,104,0.18)_0%,rgba(8,8,8,0.95)_70%)]" />

      {/* Film Strip Frame Lines */}
      <div className="absolute top-0 left-0 right-0 h-10 border-b border-[#D6AD68]/20 flex items-center justify-around overflow-hidden opacity-30">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-4 h-6 border border-[#D6AD68]/40 rounded-xs" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-[#D6AD68]/20 flex items-center justify-around overflow-hidden opacity-30">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-4 h-6 border border-[#D6AD68]/40 rounded-xs" />
        ))}
      </div>

      {/* Center Stage Animation */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Stage 1: Film countdown leader */}
        {stage === 'countdown' && (
          <div className="relative w-44 h-44 rounded-full border-4 border-[#D6AD68]/40 flex items-center justify-center animate-pulse">
            <div className="absolute inset-0 border-t-4 border-[#D6AD68] rounded-full animate-spin" />
            <span className="font-cinematic text-7xl font-black text-[#D6AD68] tracking-widest">
              {count}
            </span>
          </div>
        )}

        {/* Stage 2 & 3: Logo Reveal */}
        {(stage === 'reveal' || stage === 'tagline' || stage === 'done') && (
          <div className="flex flex-col items-center animate-fade-in">
            {/* Animated Stylized KP Emblem */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_25px_rgba(214,173,104,0.7)] animate-scale-up"
              >
                <defs>
                  <linearGradient id="introGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2D6" />
                    <stop offset="35%" stopColor="#D6AD68" />
                    <stop offset="70%" stopColor="#B38942" />
                    <stop offset="100%" stopColor="#8C6627" />
                  </linearGradient>
                </defs>

                {/* Outer Chamfered Film Frame */}
                <rect
                  x="5"
                  y="5"
                  width="90"
                  height="90"
                  rx="14"
                  fill="#0E0E0E"
                  stroke="url(#introGold)"
                  strokeWidth="3"
                />

                {/* Film Perforations Left */}
                <rect x="10" y="14" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="10" y="28" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="10" y="42" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="10" y="56" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="10" y="70" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="10" y="84" width="6" height="8" rx="1.5" fill="url(#introGold)" />

                {/* Film Perforations Right */}
                <rect x="84" y="14" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="84" y="28" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="84" y="42" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="84" y="56" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="84" y="70" width="6" height="8" rx="1.5" fill="url(#introGold)" />
                <rect x="84" y="84" width="6" height="8" rx="1.5" fill="url(#introGold)" />

                {/* KP Monogram */}
                <path d="M26 18H34V82H26V18Z" fill="url(#introGold)" />
                <path d="M33 52L49 24H59L41 55L60 82H50L33 58" fill="url(#introGold)" />
                <path
                  d="M34 22H55C66 22 75 30 75 42C75 54 66 62 55 62H42"
                  stroke="url(#introGold)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                />

                {/* Radiant Play Button Triangle in Center */}
                <path d="M48 30L68 44L48 58Z" fill="url(#introGold)" />
                <circle cx="68" cy="44" r="3" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Typography with Cinematic Letter-Spacing Expansion */}
            <h1 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.3em] uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              KAVIN <span className="text-[#D6AD68]">PRODUCTION</span>
            </h1>

            {/* Tagline */}
            <div
              className={`mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.4em] uppercase text-[#B5B5B5] transition-all duration-700 ${
                stage === 'tagline' || stage === 'done'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
            >
              <span className="text-[#D6AD68]">DREAM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68]" />
              <span className="text-white">CREATE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD68]" />
              <span className="text-[#D6AD68]">ENTERTAIN</span>
            </div>
          </div>
        )}
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 text-xs uppercase tracking-widest text-[#B5B5B5] hover:text-[#D6AD68] border border-white/20 hover:border-[#D6AD68] px-4 py-2 rounded-xs bg-black/40 backdrop-blur-md transition-all cursor-pointer z-20"
      >
        Skip Intro
      </button>
    </div>
  );
};
