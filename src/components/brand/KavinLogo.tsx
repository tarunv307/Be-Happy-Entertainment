import React from 'react';

interface KavinLogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  showTagline?: boolean;
}

export const KavinLogo: React.FC<KavinLogoProps> = ({
  variant = 'full',
  size = 'md',
  animated = false,
  className = '',
  showTagline = true,
}) => {
  // Dimension scales
  const sizeMap = {
    sm: { icon: 32, textScale: 'text-base', subText: 'text-[8px]', track: 'tracking-[0.25em]' },
    md: { icon: 42, textScale: 'text-xl', subText: 'text-[9px]', track: 'tracking-[0.3em]' },
    lg: { icon: 54, textScale: 'text-2xl', subText: 'text-[11px]', track: 'tracking-[0.35em]' },
    xl: { icon: 72, textScale: 'text-4xl', subText: 'text-xs', track: 'tracking-[0.4em]' },
  };

  const currentSize = sizeMap[size];

  // The Stylized KP Monogram combining Film Strip + Play Button in Gold
  const Monogram = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 group ${
        animated ? 'transition-transform duration-500 hover:scale-105' : ''
      }`}
      style={{ width: currentSize.icon, height: currentSize.icon }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(214,173,104,0.35)]"
      >
        <defs>
          <linearGradient id="kpGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E8BE" />
            <stop offset="35%" stopColor="#D6AD68" />
            <stop offset="70%" stopColor="#B38942" />
            <stop offset="100%" stopColor="#8C6627" />
          </linearGradient>

          <linearGradient id="kpBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D6AD68" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFF2D6" stopOpacity="0.2" />
          </linearGradient>

          <filter id="kpGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Cinematic Film Frame with Chamfered Corners */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="14"
          fill="#0D0D0D"
          stroke="url(#kpGold)"
          strokeWidth="2.5"
          className="transition-all duration-300"
        />

        {/* Film Strip Sprocket Perforations (Left Column) */}
        <rect x="10" y="14" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="10" y="28" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="10" y="42" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="10" y="56" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="10" y="70" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="10" y="84" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />

        {/* Film Strip Sprocket Perforations (Right Column) */}
        <rect x="84" y="14" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="84" y="28" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="84" y="42" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="84" y="56" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="84" y="70" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />
        <rect x="84" y="84" width="6" height="8" rx="1.5" fill="url(#kpGold)" opacity="0.8" />

        {/* Central Vertical Pillar of the Letter 'K' */}
        <path
          d="M26 18H34V82H26V18Z"
          fill="url(#kpGold)"
        />

        {/* Diagonal Arms of 'K' Intertwined */}
        <path
          d="M33 52L49 24H59L41 55L60 82H50L33 58"
          fill="url(#kpGold)"
        />

        {/* Stylized 'P' Loop morphed into a Radiant Forward Play-Button Triangle */}
        {/* Upper horizontal connecting bar */}
        <path
          d="M34 22H55C66 22 75 30 75 42C75 54 66 62 55 62H42"
          stroke="url(#kpGold)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />

        {/* The Golden Play Button Core - Nestled inside the P loop */}
        <path
          d="M48 30L68 44L48 58Z"
          fill="url(#kpGold)"
          filter="url(#kpGlow)"
          className={animated ? 'animate-pulse' : ''}
        />

        {/* Subtle Cinematic Lens Flare Sparkle */}
        <circle cx="68" cy="44" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {Monogram}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {Monogram}
        <div className="flex flex-col">
          <span className={`font-cinematic font-bold tracking-[0.25em] text-white uppercase leading-none ${currentSize.textScale}`}>
            KAVIN
          </span>
          <span className="text-[8px] tracking-[0.3em] text-[#D6AD68] font-semibold uppercase mt-0.5">
            PRODUCTION
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-start gap-3 ${className}`}>
        <div className="inline-flex items-center gap-3">
          {Monogram}
          <div className="flex flex-col">
            <span className="font-cinematic font-extrabold tracking-[0.28em] text-white text-2xl uppercase leading-none">
              KAVIN PRODUCTION
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#D6AD68] font-semibold uppercase mt-1">
              CINEMATIC OTT PLATFORM
            </span>
          </div>
        </div>
        {showTagline && (
          <p className="text-xs uppercase tracking-[0.3em] text-[#B5B5B5] font-light mt-1 flex items-center gap-2">
            <span>DREAM</span>
            <span className="w-1 h-1 rounded-full bg-[#D6AD68]" />
            <span>CREATE</span>
            <span className="w-1 h-1 rounded-full bg-[#D6AD68]" />
            <span>ENTERTAIN</span>
          </p>
        )}
      </div>
    );
  }

  // Full default variant
  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {Monogram}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-cinematic font-extrabold text-white tracking-[0.22em] uppercase leading-none transition-colors group-hover:text-[#F3E2B8] ${currentSize.textScale}`}>
            KAVIN
          </span>
          <span className={`font-cinematic font-light text-[#D6AD68] tracking-[0.22em] uppercase leading-none ${currentSize.textScale}`}>
            PRODUCTION
          </span>
        </div>
        {showTagline && (
          <span className={`${currentSize.subText} uppercase tracking-[0.32em] text-[#B5B5B5] font-medium mt-1 transition-colors group-hover:text-[#D6AD68]`}>
            DREAM. CREATE. ENTERTAIN.
          </span>
        )}
      </div>
    </div>
  );
};
