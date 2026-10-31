import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TypographyMarquee } from '../components/ui/TypographyMarquee';

export const ServicesPage: React.FC = () => {
  const { services } = useData();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const publishedServices = services
    .filter((s) => s.is_published)
    .sort((a, b) => a.display_order - b.display_order);

  const filterCategories = [
    'All',
    'Cinema',
    'Commercial',
    'Music',
    'Craft',
    'Post-Production',
    'Stills',
    'Digital',
    'Events',
  ];

  const filteredServices =
    selectedFilter === 'All'
      ? publishedServices
      : publishedServices.filter((s) => s.category === selectedFilter);

  return (
    <div className="bg-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A65] font-semibold block mb-3">
              Production Disciplines
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#121212] tracking-tight mb-4">
              OUR EXPERTISE.
            </h1>
            <p className="text-sm sm:text-base text-[#6B6861] font-light leading-relaxed">
              From initial concept incubation to theatrical DCP mastering, Kavin Production provides
              full-spectrum creative and physical media production services.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal direction="up" delay={200}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-16 border-b border-[#E8E6E0] scrollbar-none">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-none ${
                  selectedFilter === cat
                    ? 'bg-[#121212] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#6B6861] hover:text-[#121212] hover:bg-[#E8E6E0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Services List / Cards */}
        <div className="space-y-16">
          {filteredServices.map((service, index) => (
            <ScrollReveal key={service.id} direction="up" delay={100}>
              <div
                id={service.slug}
                className="border border-[#E8E6E0] bg-[#FAF9F5] overflow-hidden p-6 sm:p-10 transition-all duration-400 hover:border-[#B69A65] hover:shadow-md rounded-none"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Visual */}
                  <div className="lg:col-span-5 relative aspect-16/10 overflow-hidden bg-[#E8E6E0] border border-[#E8E6E0] group">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-xs font-mono font-bold text-[#121212] border border-[#E8E6E0]">
                      0{service.display_order || index + 1}
                    </div>
                  </div>

                  {/* Information */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold">
                        {service.category}
                      </span>
                      <span className="text-[#E8E6E0]">•</span>
                      <span className="text-xs text-[#6B6861] font-medium italic">
                        {service.tagline}
                      </span>
                    </div>

                    <h2 className="font-editorial text-2xl sm:text-4xl text-[#121212] font-semibold">
                      {service.title}
                    </h2>

                    <p className="text-sm text-[#6B6861] font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Workflow Steps */}
                    {service.workflow_steps && service.workflow_steps.length > 0 && (
                      <div className="pt-3 border-t border-[#E8E6E0]">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#121212] block mb-2">
                          Production Workflow
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B6861]">
                          {service.workflow_steps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B69A65]" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Deliverables */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="pt-2 text-xs text-[#6B6861]">
                        <span className="font-medium text-[#121212]">Deliverables: </span>
                        {service.deliverables.join(' • ')}
                      </div>
                    )}

                    {/* Action Link */}
                    <div className="pt-4 flex items-center gap-4">
                      <Link
                        to="/contact"
                        state={{ defaultType: service.title }}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-all rounded-none shadow-xs group"
                      >
                        <span>Commission This Service</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B69A65] group-hover:text-white transition-colors" />
                      </Link>
                    </div>
                  </div>
                </div>
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
