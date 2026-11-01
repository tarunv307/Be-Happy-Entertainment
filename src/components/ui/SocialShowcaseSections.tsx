import React from 'react';
import { Play, ExternalLink, Sparkles, Film, ArrowRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './SocialIcons';

interface SocialShowcaseSectionsProps {
  onPlayVideo?: (videoUrl: string, title: string) => void;
}

export const SocialShowcaseSections: React.FC<SocialShowcaseSectionsProps> = ({ onPlayVideo }) => {
  // Official verified media from ect/
  const youtubeVideos = [
    {
      id: 'yt-1',
      title: 'Mudhal Kadhal — Official Short Film Teaser',
      category: 'Teaser / Trailer',
      videoUrl: '/media/mudhal-kadhal.mp4',
      thumbnail: '/media/mudhal-kadhal-poster.png',
      tagline: '“Some stories find you... First love. Lasts forever.” Written & Directed by Kavin.',
    },
    {
      id: 'yt-2',
      title: 'Padikathavan — Official Feature Video',
      category: 'Movie Stream',
      videoUrl: '/media/padikathavan.mp4',
      thumbnail: '/media/padikathavan-poster.webp',
      tagline: 'Campus emotional drama produced under Be Happy Entertainment.',
    },
    {
      id: 'yt-3',
      title: 'Game (Not Over) — Official Theatrical Video',
      category: 'Movie Stream',
      videoUrl: '/media/game-not-over.mp4',
      thumbnail: '/media/game-poster.webp',
      tagline: '“Life is a journey. Enjoy the ride.” Intense confrontation and turning points.',
    },
  ];

  const instagramPosts = [
    {
      id: 'ig-1',
      image: '/media/title-card-release.png',
      title: 'Important Today — Title Card Release @ 5PM',
      caption: 'Be Happy Productions Presents — Official title announcement release. எப்பவும் சிரிச்சுகிட்டே இரு ❤️',
      aspect: 'aspect-3/4',
    },
    {
      id: 'ig-2',
      image: '/media/title-3-teaser.png',
      title: 'Production No. 3 — Coming Soon 15 AUG',
      caption: 'Some stories stay with you forever... Production No: 3 coming soon under Be Happy Entertainment.',
      aspect: 'aspect-square',
    },
    {
      id: 'ig-3',
      image: '/media/kavin-director-banner.png',
      title: 'Kavin — Producer, Director & Sound Engineer',
      caption: 'Good Stories, Better People. Same Passion, Different Medium. Shoot, Edit, Mix, Create, Repeat.',
      aspect: 'aspect-video',
    },
    {
      id: 'ig-4',
      image: '/media/bts-gimbal.png',
      title: 'On Set: Cinematography & Gimbal Setup',
      caption: 'Behind the scenes camera rigging and stabilization during principal photography.',
      aspect: 'aspect-3/4',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-12">
      {/* ====================================================
          FROM OUR YOUTUBE CHANNEL
          ==================================================== */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center">
                  <YoutubeIcon className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-red-400 font-bold">
                  OFFICIAL YOUTUBE BROADCAST
                </span>
              </div>
              <h2 className="font-cinematic font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase">
                FROM OUR YOUTUBE CHANNEL
              </h2>
              <p className="text-xs sm:text-sm text-[#7E7E7E] mt-1 max-w-xl">
                Explore official trailers, narrative short cinema, and verified video streams from channel <strong className="text-white">@kavin_kp</strong>.
              </p>
            </div>

            <a
              href="https://youtube.com/@kavin_kp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-102 shrink-0 self-start sm:self-auto"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>EXPLORE OUR YOUTUBE CHANNEL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="group rounded-xl overflow-hidden bg-[#141414] border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(220,38,38,0.2)] flex flex-col"
              >
                {/* Thumbnail Box */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

                  {/* Play Trigger */}
                  <button
                    onClick={() => {
                      if (onPlayVideo) onPlayVideo(video.videoUrl, video.title);
                    }}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-500 transition-all cursor-pointer"
                    title="Play Video"
                  >
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </button>

                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider bg-black/80 text-white border border-white/20">
                    {video.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col justify-between grow">
                  <div>
                    <h3 className="font-cinematic font-bold text-white text-base group-hover:text-red-400 transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#B5B5B5] mt-1 line-clamp-2 leading-relaxed">
                      {video.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        if (onPlayVideo) onPlayVideo(video.videoUrl, video.title);
                      }}
                      className="text-[#D6AD68] hover:text-white font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <span>Stream Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href="https://youtube.com/@kavin_kp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7E7E7E] hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          FOLLOW OUR JOURNEY (INSTAGRAM)
          ==================================================== */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D6AD68] to-[#F3E2B8] text-black flex items-center justify-center">
                  <InstagramIcon className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D6AD68] font-bold">
                  OFFICIAL SOCIAL MEDIA
                </span>
              </div>
              <h2 className="font-cinematic font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase">
                FOLLOW OUR JOURNEY
              </h2>
              <p className="text-xs sm:text-sm text-[#7E7E7E] mt-1 max-w-xl">
                Official behind-the-scenes, announcements, and production milestones from <strong className="text-white">@be_happy_entertainment24</strong>.
              </p>
            </div>

            <a
              href="https://www.instagram.com/be_happy_entertainment24/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-sm bg-gradient-to-r from-[#D6AD68] to-[#B38942] hover:from-[#F3E2B8] hover:to-[#D6AD68] text-black font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(214,173,104,0.3)] hover:scale-102 shrink-0 self-start sm:self-auto"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Instagram Verified Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://www.instagram.com/be_happy_entertainment24/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden bg-[#141414] border border-white/10 hover:border-[#D6AD68]/60 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(214,173,104,0.25)] flex flex-col"
              >
                {/* Media Box */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-black">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

                  {/* Corner Instagram Badge */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-[#D6AD68] flex items-center justify-center border border-white/10">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Caption / Title */}
                <div className="p-4 bg-[#111111] flex flex-col justify-between grow">
                  <h4 className="text-white font-cinematic font-bold text-sm group-hover:text-[#D6AD68] transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-[#8E8E8E] mt-1 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                  <span className="text-[10px] text-[#D6AD68] tracking-widest uppercase font-semibold mt-3 flex items-center gap-1">
                    <span>View Post on Instagram</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
