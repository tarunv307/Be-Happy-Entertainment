import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { IntroSplash } from '../brand/IntroSplash';
import { CinematicPlayerModal } from '../player/CinematicPlayerModal';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();
  const [forceShowIntro, setForceShowIntro] = useState(false);
  const [globalPlayer, setGlobalPlayer] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleReplayIntro = () => {
    setForceShowIntro(true);
  };

  const handleGlobalPlayVideo = (videoUrl: string, title: string) => {
    setGlobalPlayer({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080808] text-white selection:bg-[#D6AD68]/40 selection:text-white">
      {/* Cinematic Logo Splash Screen */}
      <IntroSplash
        forceShow={forceShowIntro}
        onComplete={() => setForceShowIntro(false)}
      />

      <Navbar
        onReplayIntro={handleReplayIntro}
        onPlayVideo={handleGlobalPlayVideo}
      />

      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>

      <Footer />

      {/* Floating OTT Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Quick Video Player */}
      <CinematicPlayerModal
        isOpen={globalPlayer.isOpen}
        onClose={() => setGlobalPlayer((prev) => ({ ...prev, isOpen: false }))}
        videoUrl={globalPlayer.videoUrl}
        title={globalPlayer.title}
      />
    </div>
  );
};
