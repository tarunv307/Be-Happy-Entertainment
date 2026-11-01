import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film, Music, Sliders, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ServicesPage: React.FC = () => {
  const { services } = useData();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const publishedServices = services
    .filter((s) => s.is_published)
    .sort((a, b) => a.display_order - b.display_order);

  const filterCategories = ['All', 'Cinema', 'Live Events', 'Audio'];

  const filteredServices =
    selectedFilter === 'All'
      ? publishedServices
      : publishedServices.filter((s) => s.category === selectedFilter);

  return (
    <div className="bg-[#080808] text-white pt-24 pb-24 min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-[#18130B] via-[#0E0E0E] to-[#080808] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black inline-block mb-3">
            PRODUCTION CAPABILITIES
          </span>
          <h1 className="font-cinematic font-black text-3xl sm:text-5xl text-white tracking-wide uppercase">
            SERVICES & EXPERTISE
          </h1>
          <p className="text-sm sm:text-base text-[#B5B5B5] font-light mt-3 leading-relaxed">
            From initial concept writing to theatrical cinema distribution and live stage concert audio engineering.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-14 border-b border-white/10 no-scrollbar">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-xs ${
                selectedFilter === cat
                  ? 'bg-[#D6AD68] text-black shadow-md'
                  : 'bg-white/5 text-[#B5B5B5] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="space-y-12">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-2xl bg-[#121212] border border-white/10 hover:border-[#D6AD68]/40 transition-all duration-300"
            >
              {/* Image Box */}
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg group">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Text Info */}
              <div className={`lg:col-span-7 flex flex-col items-start gap-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D6AD68] bg-[#D6AD68]/15 px-2.5 py-0.5 rounded-xs border border-[#D6AD68]/30">
                    {service.category}
                  </span>
                </div>

                <h2 className="font-cinematic font-bold text-2xl sm:text-3xl text-white">
                  {service.title}
                </h2>

                <p className="text-sm text-[#D6AD68] font-cinematic italic">
                  “{service.tagline}”
                </p>

                <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed font-light">
                  {service.description || service.short_description}
                </p>

                {/* Workflow Steps */}
                {service.workflow_steps && service.workflow_steps.length > 0 && (
                  <div className="w-full pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7E7E7E] block mb-2">
                      Key Process & Execution
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.workflow_steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#C5C5C5]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AD68] shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to="/contact"
                  className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6AD68] hover:text-white font-bold"
                >
                  <span>Inquire Regarding {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
