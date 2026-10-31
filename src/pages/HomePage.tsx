import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUpRight,
  Film,
  CheckCircle2,
  Clapperboard,
  Sparkles,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProjectCard } from '../components/ui/ProjectCard';
import { VideoModal } from '../components/ui/VideoModal';
import { Lightbox } from '../components/ui/Lightbox';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TypographyMarquee } from '../components/ui/TypographyMarquee';
import { InfiniteImageMarquee, MarqueeItem } from '../components/ui/InfiniteImageMarquee';
import { HorizontalShowcase } from '../components/ui/HorizontalShowcase';
import { MultiDirectionGallery } from '../components/ui/MultiDirectionGallery';

export const HomePage: React.FC = () => {
  const { productions, services, companySettings, galleryItems } = useData();

  // Active filter for featured works
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Video trailer modal state
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  // Gallery lightbox state
  const [activeImage, setActiveImage] = useState<{
    url: string;
    title: string;
    caption?: string;
    category?: string;
  } | null>(null);

  // Filtered published productions
  const publishedProductions = productions.filter((p) => p.is_published);
  const featuredProductions = publishedProductions.filter((p) => p.is_featured || true);

  const categories = [
    'All',
    'Feature Films',
    'Music Videos',
    'Commercial Advertisements',
    'Short Films',
    'Corporate Films',
  ];

  const displayedProductions =
    selectedCategory === 'All'
      ? featuredProductions.slice(0, 6)
      : featuredProductions.filter((p) => p.category === selectedCategory);

  // Convert productions into marquee items for the top hero infinite marquee
  const heroMarqueeItems: MarqueeItem[] = publishedProductions.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    imageUrl: p.cover_url || p.poster_url,
    year: p.year,
    slug: p.slug,
  }));

  // Fallback stills if productions are empty
  const defaultMarqueeItems: MarqueeItem[] =
    heroMarqueeItems.length > 0
      ? heroMarqueeItems
      : [
          {
            id: 'm1',
            title: 'Chronicles of Silence',
            category: 'Feature Film',
            imageUrl:
              'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
            year: 2025,
          },
          {
            id: 'm2',
            title: 'Neon Reverie',
            category: 'Music Video',
            imageUrl:
              'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
            year: 2024,
          },
          {
            id: 'm3',
            title: 'The Artisan Pulse',
            category: 'Commercial',
            imageUrl:
              'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
            year: 2024,
          },
          {
            id: 'm4',
            title: 'Echoes of the Coast',
            category: 'Short Film',
            imageUrl:
              'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
            year: 2023,
          },
        ];

  return (
    <div className="bg-white overflow-hidden">
      {/* ====================================================
          SECTION 1: CINEMATIC HERO (WITH KEN BURNS & PARALLAX)
          ==================================================== */}
      <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF9F5]">
        {/* Cinematic Background Layer with Slow Ken Burns Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=85"
            alt="Kavin Production Cinema Stage"
            className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125 animate-hero-zoom"
          />
          {/* Subtle multi-stop gradient ensuring high readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-[#FAF9F5]/85 to-white" />
          <div className="absolute inset-0 editorial-grid opacity-35" />
          <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Studio Badge with subtle entrance */}
          <ScrollReveal direction="down" delay={100}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#E8E6E0] bg-white/90 backdrop-blur-xs text-[11px] uppercase tracking-[0.25em] text-[#B69A65] font-semibold mb-8 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B69A65] animate-pulse" />
              <span>Official Media Production Studio</span>
            </div>
          </ScrollReveal>

          {/* Main Cinematic Headline */}
          <ScrollReveal direction="up" delay={250}>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#121212] leading-[1.05] mb-8">
              EVERY FRAME <br />
              <span className="italic font-light text-[#B69A65]">TELLS A STORY.</span>
            </h1>
          </ScrollReveal>

          {/* Supporting Narrative */}
          <ScrollReveal direction="up" delay={400}>
            <p className="text-base sm:text-lg md:text-xl text-[#6B6861] max-w-2xl font-light leading-relaxed mb-10">
              We are{' '}
              <strong className="text-[#121212] font-semibold">
                {companySettings.brand_name || 'Kavin Production'}
              </strong>{' '}
              — an independent creative media studio crafting compelling films, international
              commercials, and high-impact visual stories.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={550}>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#horizontal-showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-xs font-semibold uppercase tracking-widest bg-[#121212] text-white hover:bg-[#B69A65] transition-all duration-300 shadow-md group rounded-none"
              >
                <span>Explore Film Reel</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#B69A65] group-hover:text-white transition-transform group-hover:translate-y-1" />
              </a>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-xs font-semibold uppercase tracking-widest bg-white border border-[#E8E6E0] text-[#121212] hover:border-[#121212] hover:bg-[#FAF9F5] transition-all duration-300 shadow-xs rounded-none"
              >
                <span>Commission A Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#6B6861] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Animated Scroll Down Indicator */}
          <ScrollReveal direction="none" delay={750}>
            <div className="mt-14 sm:mt-18 flex flex-col items-center gap-2 select-none opacity-80">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#6B6861] font-mono">
                Scroll To Discover
              </span>
              <div className="w-5 h-9 rounded-full border border-[#B69A65]/50 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-[#B69A65] animate-scroll-indicator" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: INFINITE IMAGE MARQUEE (REQUIREMENT 1)
          ==================================================== */}
      <section className="py-6 sm:py-8 bg-white border-y border-[#E8E6E0]">
        <div className="mb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#B69A65]" />
            Continuous Production Stream
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#6B6861] font-mono hidden sm:block">
            Hover To Pause • Click To View
          </span>
        </div>
        <InfiniteImageMarquee items={defaultMarqueeItems} direction="left" speed="medium" />
      </section>

      {/* ====================================================
          SECTION 3: ANIMATED TYPOGRAPHY MARQUEE (REQUIREMENT 2)
          ==================================================== */}
      <TypographyMarquee speed="normal" />

      {/* ====================================================
          SECTION 4: BRAND INTRODUCTION (“CREATIVITY MEETS STORYTELLING”)
          ==================================================== */}
      <section className="py-24 sm:py-32 border-b border-[#E8E6E0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with Film Studio Framing */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal direction="left" delay={150}>
                <div className="relative border border-[#E8E6E0] p-2 bg-[#FAF9F5] shadow-xs group">
                  <div className="overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80"
                      alt="Production discussion at Kavin Production"
                      className="w-full h-auto object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-xs border border-[#E8E6E0] text-xs shadow-xs">
                    <span className="text-[#B69A65] font-semibold uppercase tracking-widest block text-[10px] mb-1">
                      Producer In Focus
                    </span>
                    <p className="font-editorial text-sm text-[#121212] italic">
                      “Story is the compass that guides every lens, cut, and chord.”
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="up" delay={200}>
                <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block">
                  Who We Are
                </span>

                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#121212] font-normal leading-tight mt-2">
                  CREATIVITY MEETS <br />
                  <span className="italic text-[#6B6861]">STORYTELLING.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="text-base sm:text-lg text-[#6B6861] font-light leading-relaxed">
                  {companySettings.company_about ||
                    'Kavin Production is a creative media production company focused on transforming ideas into meaningful visual experiences. From concept development to final delivery, we bring creativity, technical expertise, and passion to every project.'}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#E8E6E0]">
                  <div className="space-y-2">
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-[#121212]">
                      Founder & Producer
                    </h4>
                    <p className="text-xs text-[#6B6861] leading-relaxed">
                      Under the creative leadership of producer{' '}
                      <strong className="text-[#121212]">
                        {companySettings.producer_name || 'Kavin'}
                      </strong>
                      , our studio champions original vision, rigorous line production, and
                      uncompromised aesthetic value.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-[#121212]">
                      End-to-End Pipeline
                    </h4>
                    <p className="text-xs text-[#6B6861] leading-relaxed">
                      Script development, camera crews, high-speed cinema optics, and 4K DaVinci
                      color grading suites united under one seamless workflow.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={500}>
                <div className="pt-6">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121212] hover:text-[#B69A65] transition-colors group editorial-hover-underline"
                  >
                    <span>Learn More About Our Story</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5: HORIZONTAL PRODUCTION SHOWCASE (REQUIREMENT 4)
          ==================================================== */}
      <section
        id="horizontal-showcase"
        className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E8E6E0]"
      >
        <HorizontalShowcase
          productions={featuredProductions}
          onPlayTrailer={(url, title) => setActiveVideo({ url, title })}
        />
      </section>

      {/* ====================================================
          SECTION 6: OUR CAPABILITIES (“WHAT WE CREATE”)
          ==================================================== */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={100}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
                  Capabilities & Disciplines
                </span>
                <h2 className="font-editorial text-3xl sm:text-5xl text-[#121212] font-normal">
                  WHAT WE CREATE.
                </h2>
              </div>
              <p className="text-sm text-[#6B6861] max-w-md font-light leading-relaxed">
                Explore specialized production disciplines crafted for cinema, international
                commercial campaigns, and visionary artists.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid of Services with staggered ScrollReveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services
              .filter((s) => s.is_published)
              .slice(0, 6)
              .map((service, index) => (
                <ScrollReveal
                  key={service.id}
                  direction="up"
                  delay={100 + (index % 3) * 120}
                  className="h-full"
                >
                  <div className="group bg-[#FAF9F5] border border-[#E8E6E0] overflow-hidden flex flex-col justify-between h-full transition-all duration-400 hover:shadow-lg hover:border-[#B69A65]">
                    <div className="relative aspect-16/10 overflow-hidden bg-[#E8E6E0]">
                      <img
                        src={service.image_url}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-108 group-hover:grayscale-0"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[#121212] border border-[#E8E6E0]">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
                          {service.category}
                        </span>
                        <h3 className="font-editorial text-xl font-semibold text-[#121212] mb-2 group-hover:text-[#B69A65] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#6B6861] leading-relaxed line-clamp-3 mb-4 font-light">
                          {service.short_description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#E8E6E0] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#121212]">
                        <Link
                          to="/services"
                          className="inline-flex items-center gap-1 hover:text-[#B69A65] transition-colors editorial-hover-underline"
                        >
                          <span>Learn More</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>

          <div className="mt-14 text-center">
            <ScrollReveal direction="up" delay={200}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-9 py-4 bg-[#121212] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#B69A65] transition-colors shadow-xs rounded-none"
              >
                <span>Explore All 15 Services Detailed</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B69A65]" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 7: MULTI-DIRECTION IMAGE GALLERY (REQUIREMENT 5)
          ==================================================== */}
      <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <ScrollReveal direction="up" delay={100}>
            <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
              Visual Archives
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#121212] font-normal">
              MULTI-DIRECTIONAL PRODUCTION GALLERY.
            </h2>
            <p className="text-sm text-[#6B6861] mt-3 font-light max-w-xl">
              Continuous left-and-right visual tracks capturing on-set realities, cinematography
              rigs, and still frames.
            </p>
          </ScrollReveal>
        </div>

        <MultiDirectionGallery
          items={galleryItems}
          onOpenLightbox={(item) => setActiveImage(item)}
        />
      </section>

      {/* ====================================================
          SECTION 8: FEATURED PRODUCTIONS (FILTERED PORTFOLIO)
          ==================================================== */}
      <section id="featured-works" className="py-24 sm:py-32 bg-white border-b border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={100}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
                  Selected Portfolio
                </span>
                <h2 className="font-editorial text-3xl sm:text-5xl text-[#121212] font-normal">
                  CURATED PRODUCTIONS.
                </h2>
              </div>
              <Link
                to="/productions"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121212] hover:text-[#B69A65] transition-colors editorial-hover-underline"
              >
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#E8E6E0] scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-none ${
                  selectedCategory === cat
                    ? 'bg-[#121212] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#6B6861] hover:text-[#121212] hover:bg-[#E8E6E0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Productions Grid with Staggered ScrollReveal */}
          {displayedProductions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProductions.map((production, idx) => (
                <ScrollReveal key={production.id} direction="up" delay={100 + (idx % 3) * 120}>
                  <ProjectCard
                    production={production}
                    onPlayTrailer={(url, title) => setActiveVideo({ url, title })}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF9F5] border border-dashed border-[#E8E6E0]">
              <Film className="w-8 h-8 text-[#B69A65] mx-auto mb-3" />
              <p className="text-sm text-[#6B6861]">No productions found under this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================
          SECTION 9: OUR METHODOLOGY (“FROM AN IDEA TO AN EXPERIENCE.”)
          ==================================================== */}
      <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
                Production Methodology
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#121212] font-normal leading-tight">
                FROM AN IDEA TO AN EXPERIENCE.
              </h2>
              <p className="text-sm text-[#6B6861] mt-4 font-light">
                Our 4-stage editorial roadmap ensures disciplined creative execution and seamless
                delivery on every scale.
              </p>
            </div>
          </ScrollReveal>

          {/* 4-Stage Editorial Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                phase: 'Discovery',
                title: 'DISCOVER',
                desc: 'Understand the vision, concept, emotional core, and creative requirements through in-depth workshops.',
              },
              {
                num: '02',
                phase: 'Pre-Production',
                title: 'DEVELOP',
                desc: 'Plan the production, creative direction, storyboarding, location scouts, casting, and precision budget allocation.',
              },
              {
                num: '03',
                phase: 'Principal Photography',
                title: 'PRODUCE',
                desc: 'Bring the concept to life through high-end cinema cameras, optical glass, master lighting rigs, and seasoned crew.',
              },
              {
                num: '04',
                phase: 'Finishing & Mastering',
                title: 'DELIVER',
                desc: 'Complete editorial assembly, original composition, DaVinci color grading, and broadcast theatrical QC delivery.',
              },
            ].map((step, idx) => (
              <ScrollReveal key={step.num} direction="up" delay={100 + idx * 100}>
                <div className="bg-white p-8 border border-[#E8E6E0] relative group hover:border-[#B69A65] transition-all duration-300 hover:shadow-md h-full flex flex-col justify-between">
                  <div>
                    <span className="font-editorial text-5xl font-light text-[#E8E6E0] group-hover:text-[#B69A65] transition-colors block mb-4">
                      {step.num}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
                      {step.phase}
                    </span>
                    <h3 className="font-editorial text-2xl font-semibold text-[#121212] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6B6861] leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 10: PRODUCER SPOTLIGHT & STUDIO STANDARD
          ==================================================== */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#E8E6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={150}>
            <div className="max-w-4xl mx-auto border border-[#E8E6E0] p-8 sm:p-14 bg-[#FAF9F5] shadow-xs">
              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Producer Portrait */}
                <div className="w-44 h-56 sm:w-56 sm:h-72 shrink-0 relative border border-[#E8E6E0] overflow-hidden bg-white p-2">
                  <img
                    src={
                      companySettings.producer_photo_url ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
                    }
                    alt="Producer Kavin"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </div>

                {/* Biography & Philosophy */}
                <div className="space-y-4 text-left">
                  <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block">
                    The Creative Vision Behind The Production
                  </span>

                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#121212] font-semibold">
                    {companySettings.producer_name || 'Kavin'}
                  </h3>

                  <p className="text-xs uppercase tracking-widest text-[#6B6861] font-medium">
                    {companySettings.producer_title || 'Producer & Founder'}
                  </p>

                  <p className="text-sm text-[#6B6861] font-light leading-relaxed">
                    {companySettings.producer_bio}
                  </p>

                  <div className="pt-3 border-t border-[#E8E6E0]">
                    <p className="font-editorial text-sm italic text-[#121212] leading-relaxed">
                      “{companySettings.producer_philosophy}”
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121212] hover:text-[#B69A65] transition-colors editorial-hover-underline"
                    >
                      <span>Read Full Producer Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====================================================
          SECTION 11: FINAL CALL TO ACTION
          ==================================================== */}
      <section className="py-24 sm:py-32 bg-[#FAF9F5] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal direction="up" delay={100}>
            <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-4">
              Start A Dialogue
            </span>

            <h2 className="font-editorial text-4xl sm:text-6xl text-[#121212] font-normal tracking-tight mb-6">
              LET’S CREATE SOMETHING <br />
              <span className="italic text-[#B69A65]">REMARKABLE.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#6B6861] font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Have a script, commercial campaign, or music visual in mind? Let’s bring it to life
              through uncompromising cinematic craft.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#121212] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#B69A65] transition-colors shadow-md rounded-none"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B69A65]" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-white border border-[#E8E6E0] text-[#121212] text-xs font-semibold uppercase tracking-widest hover:border-[#121212] hover:bg-[#FAF9F5] transition-colors rounded-none"
              >
                <span>Contact Studio Directly</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trailer Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Lightbox for Gallery */}
      {activeImage && (
        <Lightbox
          isOpen={!!activeImage}
          imageUrl={activeImage.url}
          title={activeImage.title}
          caption={activeImage.caption}
          category={activeImage.category}
          onClose={() => setActiveImage(null)}
        />
      )}
    </div>
  );
};
