import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../components/ui/SocialIcons';
import { useData } from '../context/DataContext';

export const TeamPage: React.FC = () => {
  const { teamMembers } = useData();

  const publishedMembers = teamMembers.filter((m) => m.is_published);
  const producer = publishedMembers.find((m) => m.is_producer) || publishedMembers[0];
  const otherMembers = publishedMembers.filter((m) => m.id !== producer?.id);

  return (
    <div className="bg-[#080808] text-white pt-24 pb-24 min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-[#18130B] via-[#0E0E0E] to-[#080808] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black inline-block mb-3">
            TALENT & LEADERSHIP
          </span>
          <h1 className="font-cinematic font-black text-3xl sm:text-5xl text-white tracking-wide uppercase">
            THE CREATIVE MINDS
          </h1>
          <p className="text-sm sm:text-base text-[#B5B5B5] font-light mt-3 leading-relaxed">
            The visionary producer, director, writers, and technical craftspeople collaborating under Be Happy Entertainment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Featured Producer & Director Profile */}
        {producer && (
          <div className="mb-20 rounded-2xl overflow-hidden border border-[#D6AD68]/40 bg-[#121212] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-white/10 aspect-16/10 sm:aspect-16/9 bg-black group shadow-lg">
                  <img
                    src={producer.photo_url}
                    alt={producer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block">
                  FOUNDER, PRODUCER & DIRECTOR
                </span>

                <h2 className="font-cinematic font-black text-3xl sm:text-4xl text-white">
                  {producer.name}
                </h2>

                <p className="text-xs sm:text-sm text-[#D6AD68] font-cinematic italic tracking-wider">
                  “{producer.creative_philosophy}”
                </p>

                <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed font-light">
                  {producer.biography}
                </p>

                <div className="pt-3 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/be_happy_entertainment24/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-sm bg-white/5 hover:bg-[#D6AD68] hover:text-black text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://youtube.com/@kavin_kp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-sm bg-white/5 hover:bg-red-600 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Collaborating Team Members */}
        {otherMembers.length > 0 && (
          <div>
            <h3 className="font-cinematic font-bold text-xl text-white mb-6 uppercase tracking-wider">
              Key Creative Collaborators
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl overflow-hidden bg-[#121212] border border-white/10 p-5 flex flex-col justify-between hover:border-[#D6AD68]/40 transition-all"
                >
                  <div>
                    <div className="aspect-4/3 rounded-lg overflow-hidden bg-black mb-4 border border-white/5">
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6AD68] block">
                      {member.position}
                    </span>

                    <h4 className="font-cinematic font-bold text-lg text-white mt-1">
                      {member.name}
                    </h4>

                    <p className="text-xs text-[#8E8E8E] mt-2 font-light leading-relaxed">
                      {member.biography}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
