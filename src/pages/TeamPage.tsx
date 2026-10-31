import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { useData } from '../context/DataContext';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TypographyMarquee } from '../components/ui/TypographyMarquee';

export const TeamPage: React.FC = () => {
  const { teamMembers } = useData();
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const publishedMembers = teamMembers.filter((m) => m.is_published);
  const producer = publishedMembers.find((m) => m.is_producer) || publishedMembers[0];
  const otherMembers = publishedMembers.filter((m) => m.id !== producer?.id);

  const roles = ['All', 'Direction', 'Cinematography', 'Post-Production', 'Executive'];

  const filteredOthers =
    selectedRole === 'All'
      ? otherMembers
      : otherMembers.filter((m) => m.role_category === selectedRole);

  return (
    <div className="bg-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A65] font-semibold block mb-3">
              Talent & Leadership
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#121212] tracking-tight mb-4">
              OUR CREATIVE TEAM.
            </h1>
            <p className="text-sm sm:text-base text-[#6B6861] font-light leading-relaxed">
              The directors, cinematographers, craftspeople, and line producers behind Kavin
              Production’s body of work.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Producer Profile */}
        {producer && (
          <ScrollReveal direction="up" delay={150}>
            <div className="mb-24 border border-[#E8E6E0] bg-[#FAF9F5] p-8 sm:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5 relative">
                  <div className="aspect-3/4 max-w-sm mx-auto overflow-hidden border border-[#E8E6E0] bg-white p-2 group">
                    <img
                      src={producer.photo_url}
                      alt={producer.name}
                      className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block">
                    Studio Head & Founding Producer
                  </span>

                  <h2 className="font-editorial text-3xl sm:text-5xl text-[#121212] font-semibold">
                    {producer.name}
                  </h2>

                  <p className="text-xs uppercase tracking-widest text-[#6B6861] font-medium">
                    {producer.position}
                  </p>

                  <p className="text-sm sm:text-base text-[#6B6861] font-light leading-relaxed">
                    {producer.biography}
                  </p>

                  {producer.creative_philosophy && (
                    <div className="p-4 bg-white border-l-2 border-[#B69A65]">
                      <p className="font-editorial text-sm italic text-[#121212]">
                        “{producer.creative_philosophy}”
                      </p>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="pt-2 flex items-center gap-3">
                    {producer.social_links?.instagram && (
                      <a
                        href={producer.social_links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="p-2 border border-[#E8E6E0] bg-white text-[#6B6861] hover:text-[#B69A65] hover:border-[#B69A65] transition-colors"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                    {producer.social_links?.linkedin && (
                      <a
                        href={producer.social_links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="p-2 border border-[#E8E6E0] bg-white text-[#6B6861] hover:text-[#B69A65] hover:border-[#B69A65] transition-colors"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Filter Pills */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-[#E8E6E0] scrollbar-none">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-none ${
                  selectedRole === r
                    ? 'bg-[#121212] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#6B6861] hover:text-[#121212] hover:bg-[#E8E6E0]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredOthers.map((member, idx) => (
            <ScrollReveal key={member.id} direction="up" delay={80 + (idx % 4) * 80}>
              <div className="bg-[#FAF9F5] border border-[#E8E6E0] overflow-hidden group hover:border-[#B69A65] transition-all duration-300 rounded-none h-full flex flex-col justify-between">
                <div>
                  <div className="aspect-3/4 overflow-hidden bg-[#E8E6E0] relative">
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block">
                      {member.role_category}
                    </span>
                    <h3 className="font-editorial text-xl font-semibold text-[#121212]">
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#6B6861] font-mono">
                      {member.position}
                    </p>
                    <p className="text-xs text-[#6B6861] font-light leading-relaxed line-clamp-3 pt-2">
                      {member.biography}
                    </p>
                  </div>
                </div>

                {member.social_links && (
                  <div className="px-6 pb-6 pt-2 flex items-center gap-2">
                    {member.social_links.instagram && (
                      <a
                        href={member.social_links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#6B6861] hover:text-[#B69A65] transition-colors"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.social_links.linkedin && (
                      <a
                        href={member.social_links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#6B6861] hover:text-[#B69A65] transition-colors"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Marquee Footer Accent */}
      <div className="mt-20">
        <TypographyMarquee speed="slow" />
      </div>
    </div>
  );
};
