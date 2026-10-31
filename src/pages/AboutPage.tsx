import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, Target } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TypographyMarquee } from '../components/ui/TypographyMarquee';

export const AboutPage: React.FC = () => {
  const { companySettings } = useData();

  return (
    <div className="bg-white pt-28 pb-24">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <ScrollReveal direction="up" delay={100}>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A65] font-semibold block mb-3">
            Company Profile & Ethos
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal text-[#121212] tracking-tight mb-6">
            DISCIPLINE, PASSION <br />
            <span className="italic text-[#6B6861]">& VISUAL ARTISTRY.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B6861] font-light max-w-2xl mx-auto leading-relaxed">
            {companySettings.company_about}
          </p>
        </ScrollReveal>
      </section>

      {/* Hero Studio Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <ScrollReveal direction="up" delay={150}>
          <div className="relative aspect-21/9 sm:aspect-16/7 overflow-hidden border border-[#E8E6E0] bg-[#FAF9F5] group">
            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=80"
              alt="Kavin Production Studio Sound Stage"
              className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <span className="text-white text-xs sm:text-sm tracking-widest uppercase font-medium bg-black/60 backdrop-blur-xs px-4 py-2 border border-white/20">
                Studio Floor & Line Production Unit
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Our Story & Producer Kavin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={100}>
              <div className="border border-[#E8E6E0] p-2 bg-[#FAF9F5] shadow-xs group">
                <div className="overflow-hidden">
                  <img
                    src={
                      companySettings.producer_photo_url ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
                    }
                    alt={companySettings.producer_name || 'Producer Kavin'}
                    className="w-full h-auto object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-4 p-4 bg-[#FAF9F5] border border-[#E8E6E0] text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#121212] block">
                  {companySettings.producer_name || 'Kavin'}
                </span>
                <span className="text-[#6B6861]">
                  {companySettings.producer_title || 'Producer & Founder'}
                </span>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delay={200}>
              <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block">
                The Journey
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#121212] font-normal">
                OUR STORY.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-4 text-sm sm:text-base text-[#6B6861] font-light leading-relaxed">
                <p>
                  Founded on the fundamental conviction that every frame must carry narrative intent,
                  Kavin Production was established to bridge intimate artistic cinema with
                  world-class commercial execution.
                </p>
                <p>
                  Under the direct stewardship of Producer Kavin, the studio has assembled an agile,
                  multidisciplinary team of cinematographers, directors, editors, colorists, and line
                  producers. We handle the entire creative continuum: from initial script incubation
                  and budgetary strategy to on-location physical production and Dolby-calibrated
                  post-finishing.
                </p>
                <p>
                  We do not believe in disposable content or generic templates. Every production we
                  undertake is treated as a bespoke visual work tailored to resonate deeply with
                  target audiences across festivals, cinema halls, or global digital streams.
                </p>
              </div>

              <div className="p-6 bg-[#FAF9F5] border-l-2 border-[#B69A65] mt-6">
                <h4 className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold mb-2">
                  Producer Philosophy
                </h4>
                <p className="font-editorial text-base sm:text-lg italic text-[#121212]">
                  “{companySettings.producer_philosophy}”
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#FAF9F5] py-20 border-y border-[#E8E6E0] mb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-white p-8 sm:p-12 border border-[#E8E6E0] space-y-4 h-full">
                <div className="w-10 h-10 bg-[#FAF9F5] flex items-center justify-center text-[#B69A65]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#121212]">Our Mission</h3>
                <p className="text-sm text-[#6B6861] font-light leading-relaxed">
                  {companySettings.mission_statement}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="bg-white p-8 sm:p-12 border border-[#E8E6E0] space-y-4 h-full">
                <div className="w-10 h-10 bg-[#FAF9F5] flex items-center justify-center text-[#B69A65]">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#121212]">Our Vision</h3>
                <p className="text-sm text-[#6B6861] font-light leading-relaxed">
                  {companySettings.vision_statement}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Studio Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
              What Defines Us
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#121212] font-normal">
              OUR CORE VALUES.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Artistic Integrity',
              desc: 'Refusing compromise on visual rhythm, thematic honesty, and cinematic craft.',
            },
            {
              title: 'Logistical Precision',
              desc: 'Rigorous schedule adherence, transparent budgeting, and seamless set coordination.',
            },
            {
              title: 'Optical Innovation',
              desc: 'Continuous adoption of bleeding-edge sensor technology and bespoke anamorphic optics.',
            },
            {
              title: 'Collaborative Trust',
              desc: 'Honoring client creative briefs and empowering directors, writers, and technical crew.',
            },
          ].map((val, idx) => (
            <ScrollReveal key={idx} direction="up" delay={100 + idx * 80}>
              <div className="p-8 border border-[#E8E6E0] bg-[#FAF9F5] hover:border-[#B69A65] transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#B69A65] block mb-3 font-semibold">
                    0{idx + 1}
                  </span>
                  <h4 className="font-editorial text-xl font-semibold text-[#121212] mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-[#6B6861] leading-relaxed font-light">{val.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Production Milestone Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <ScrollReveal direction="up" delay={150}>
          <div className="border border-[#E8E6E0] p-8 sm:p-12 bg-[#FAF9F5]">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
                Studio Operations
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#121212] font-semibold mb-4">
                Commitment to Excellence
              </h3>
              <p className="text-sm text-[#6B6861] font-light leading-relaxed mb-8">
                Whether you are an independent filmmaker with a festival concept, an advertising
                agency with a multi-market campaign, or an enterprise seeking an iconic brand film,
                Kavin Production provides the vision, team, and infrastructure to realize your ambition.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors rounded-none shadow-xs group"
              >
                <span>Work With Producer Kavin</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B69A65] group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Subtle Marquee Footer Accent */}
      <div className="mt-20">
        <TypographyMarquee speed="slow" />
      </div>
    </div>
  );
};
