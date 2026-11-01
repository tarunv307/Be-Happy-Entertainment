import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  X,
  Film,
  Sparkles,
} from 'lucide-react';

interface CinematicPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  videoUrl: string;
  posterUrl?: string;
}

export const CinematicPlayerModal: React.FC<CinematicPlayerModalProps> = ({
  isOpen,
  onClose,
  title,
  category = 'Official Stream',
  videoUrl,
  posterUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = percentage * duration;
    setCurrentTime(percentage * duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
    if (!nextMute && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  const handleSpeedChange = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3200);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        handlePlayPause();
      }
      if (e.key === 'm') toggleMute();
      if (e.key === 'f') toggleFullscreen();
      if (e.key === 'ArrowRight') skipTime(10);
      if (e.key === 'ArrowLeft') skipTime(-10);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePlayPause, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetControlsTimer}
        className="relative w-full max-w-6xl aspect-video bg-black md:rounded-xl overflow-hidden shadow-2xl border border-white/10 group select-none"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          playsInline
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
          }}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onClick={handlePlayPause}
          className="w-full h-full object-contain cursor-pointer"
        />

        {/* Buffering Indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/30">
            <div className="w-16 h-16 border-4 border-[#D6AD68]/20 border-t-[#D6AD68] rounded-full animate-spin" />
          </div>
        )}

        {/* Center Big Play Button (when paused) */}
        {!isPlaying && !isBuffering && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#D6AD68]/90 text-black flex items-center justify-center shadow-[0_0_40px_rgba(214,173,104,0.6)] hover:scale-110 transition-transform cursor-pointer"
          >
            <Play className="w-9 h-9 fill-black translate-x-1" />
          </button>
        )}

        {/* Top Header Bar */}
        <div
          className={`absolute top-0 left-0 right-0 p-3 sm:p-6 pt-[max(0.75rem,env(safe-area-inset-top))] bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 z-20 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-3">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#D6AD68] text-black rounded-xs shrink-0">
              {category}
            </span>
            <div className="flex flex-col min-w-0">
              <h2 className="text-white text-xs sm:text-base font-bold font-cinematic tracking-wider truncate">
                {title}
              </h2>
              <span className="text-[9px] sm:text-[11px] text-[#D6AD68] tracking-widest uppercase truncate hidden xs:inline">
                KAVIN PRODUCTION THEATER
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-[#D6AD68] active:text-black text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Control Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 sm:p-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2.5 sm:gap-3 transition-opacity duration-300 z-20 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress / Scrub Bar */}
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="relative w-full h-2.5 hover:h-3.5 bg-white/20 rounded-full cursor-pointer transition-all flex items-center group/bar py-1"
          >
            <div
              className="h-full bg-gradient-to-r from-[#D6AD68] to-[#F3E2B8] rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FFFFFF] shadow-md opacity-100 sm:opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            {/* Left Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handlePlayPause}
                className="p-1.5 sm:p-2 hover:text-[#D6AD68] transition-colors cursor-pointer"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={() => skipTime(-10)}
                className="p-1.5 sm:p-2 hover:text-[#D6AD68] transition-colors cursor-pointer"
                title="Rewind 10s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => skipTime(10)}
                className="p-1.5 sm:p-2 hover:text-[#D6AD68] transition-colors cursor-pointer"
                title="Forward 10s"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Volume Slider (Hidden on phones, accessible on tablet/desktop) */}
              <div className="hidden md:flex items-center gap-2 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-[#D6AD68] transition-colors cursor-pointer"
                  title="Mute / Unmute (M)"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-red-400" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1 bg-white/20 accent-[#D6AD68] cursor-pointer"
                />
              </div>

              {/* Timestamps */}
              <span className="text-[#B5B5B5] font-mono text-[10px] sm:text-xs tracking-wider whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Speed Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-2 py-0.5 sm:py-1 rounded-sm border border-white/20 hover:border-[#D6AD68] hover:text-[#D6AD68] text-[11px] sm:text-xs font-mono transition-colors cursor-pointer"
                >
                  {playbackSpeed}x
                </button>
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 py-1 bg-[#151515] border border-white/10 rounded-md shadow-xl flex flex-col min-w-[70px] z-30">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        className={`px-3 py-1 text-left text-xs hover:bg-[#D6AD68] hover:text-black cursor-pointer ${
                          playbackSpeed === s ? 'text-[#D6AD68] font-bold' : 'text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 sm:p-2 hover:text-[#D6AD68] transition-colors cursor-pointer"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
