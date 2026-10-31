import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, ArrowUpRight, ShieldCheck, FileText, Lock } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { companySettings, services } = useData();
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  const topServices = services.slice(0, 6);

  return (
    <>
      <footer className="bg-[#171717] text-white pt-20 pb-12 border-t border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-neutral-800">
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                  <Film className="w-5 h-5 text-[#B69A65]" />
                </div>
                <span className="font-cinematic text-xl font-bold tracking-widest text-white uppercase">
                  {companySettings.brand_name || 'KAVIN PRODUCTION'}
                </span>
              </Link>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-md">
                “{companySettings.tagline || 'WE CREATE. WE CAPTURE. WE TELL STORIES.'}”
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
                A premier creative media production house specializing in feature films, commercials, music visuals, and high-end cinematic storytelling worldwide.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-2">
                {companySettings.instagram_url && (
                  <a
                    href={companySettings.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#B69A65] hover:border-[#B69A65] transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {companySettings.youtube_url && (
                  <a
                    href={companySettings.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#B69A65] hover:border-[#B69A65] transition-colors"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
                {companySettings.facebook_url && (
                  <a
                    href={companySettings.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#B69A65] hover:border-[#B69A65] transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {companySettings.linkedin_url && (
                  <a
                    href={companySettings.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#B69A65] hover:border-[#B69A65] transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold mb-6">
                Explore Studio
              </p>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Company
                  </Link>
                </li>
                <li>
                  <Link to="/productions" className="hover:text-white transition-colors">
                    Selected Works
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    Production Capabilities
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white transition-colors">
                    Behind The Scenes
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="hover:text-white transition-colors">
                    Creative Team
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Project Enquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Expertise */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold mb-6">
                Our Services
              </p>
              <ul className="space-y-3 text-sm text-neutral-400">
                {topServices.map((srv) => (
                  <li key={srv.id}>
                    <Link
                      to="/services"
                      className="hover:text-white transition-colors line-clamp-1"
                    >
                      {srv.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    className="text-xs text-[#B69A65] hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    View All 15 Services <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Studio Office & Contact */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold mb-6">
                Studio Headquarters
              </p>
              <div className="space-y-3 text-sm text-neutral-400 leading-relaxed">
                <p className="text-white font-medium">{companySettings.office_address}</p>
                <p>
                  <a
                    href={`mailto:${companySettings.contact_email}`}
                    className="hover:text-[#B69A65] transition-colors"
                  >
                    {companySettings.contact_email}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${companySettings.contact_phone}`}
                    className="hover:text-[#B69A65] transition-colors"
                  >
                    {companySettings.contact_phone}
                  </a>
                </p>
                <p className="text-xs text-neutral-500 pt-2 border-t border-neutral-800">
                  Hours: {companySettings.working_hours}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              © {new Date().getFullYear()} {companySettings.brand_name || 'KAVIN PRODUCTION'}. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setModalContent('privacy')}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModalContent('terms')}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white hover:border-[#B69A65] hover:bg-neutral-800 transition-all text-[11px] font-medium"
              >
                <Lock className="w-3 h-3 text-[#B69A65]" />
                <span>Studio CMS Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Privacy & Terms */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#171717] max-w-2xl w-full p-8 shadow-2xl relative border border-[#E9E7E2] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#171717] text-xl font-bold"
            >
              ×
            </button>
            <div className="flex items-center gap-3 mb-4">
              {modalContent === 'privacy' ? (
                <ShieldCheck className="w-6 h-6 text-[#B69A65]" />
              ) : (
                <FileText className="w-6 h-6 text-[#B69A65]" />
              )}
              <h3 className="font-editorial text-2xl font-semibold">
                {modalContent === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
            </div>
            <div className="space-y-4 text-sm text-[#777777] leading-relaxed">
              {modalContent === 'privacy' ? (
                <>
                  <p>
                    At Kavin Production, we respect the confidentiality and creative intellectual property of all our clients, talent, and collaborators.
                  </p>
                  <p>
                    Information submitted through our project enquiry portal is stored securely and accessed exclusively by our production heads to prepare treatments, proposals, and schedules. We never sell, rent, or distribute personal data.
                  </p>
                  <p>
                    All project briefs, creative concepts, scripts, and budget parameters remain strictly confidential under customary film industry non-disclosure standards.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All creative materials, concept decks, motion imagery, photography, and original treatments produced by Kavin Production are protected by international copyright laws.
                  </p>
                  <p>
                    Production engagement is formalized via written production service agreements, setting out shooting milestones, delivery specifications, and rights licensing terms.
                  </p>
                  <p>
                    Website content, imagery, and credentials are provided for informational showcase purposes. Unsolicited script submissions are subject to customary agency review guidelines.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-[#E9E7E2] flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-5 py-2 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
