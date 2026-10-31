import React from 'react';

interface TypographyMarqueeProps {
  className?: string;
  speed?: 'normal' | 'slow';
}

export const TypographyMarquee: React.FC<TypographyMarqueeProps> = ({
  className = '',
  speed = 'normal',
}) => {
  const words = [
    'KAVIN PRODUCTION',
    'CINEMATIC STORYTELLING',
    'CREATIVE MEDIA',
    'VISUAL EXPERIENCES',
  ];

  const renderContent = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {words.map((word, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <span className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#121212] font-normal uppercase select-none px-6 sm:px-10 whitespace-nowrap transition-colors duration-300 hover:text-[#B69A65]">
            {word}
          </span>
          <span className="inline-flex items-center justify-center text-[#B69A65] text-lg sm:text-2xl select-none opacity-80">
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-[#E8E6E0] bg-[#FAF9F5] py-6 sm:py-8 marquee-container select-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle edge fade overlays for cinematic feel */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#FAF9F5] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#FAF9F5] to-transparent" />

      <div
        className={`flex ${
          speed === 'slow' ? 'animate-marquee-left-slow' : 'animate-marquee-typography'
        }`}
      >
        {renderContent('track-1')}
        {renderContent('track-2')}
      </div>
    </div>
  );
};
