import React, { useState } from 'react';
import { Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SettingsAdmin: React.FC = () => {
  const { companySettings, updateCompanySettings, resetToDefaults } = useData();

  const [formData, setFormData] = useState({ ...companySettings });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanySettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all website settings and catalog to initial verified studio defaults?')) {
      resetToDefaults();
      setFormData({ ...companySettings });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
            Studio Configuration
          </span>
          <h1 className="font-cinematic text-3xl font-black text-white uppercase tracking-wider">
            PLATFORM SETTINGS & IDENTITY
          </h1>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/10 bg-white/5 text-xs uppercase tracking-wider font-semibold text-[#B5B5B5] hover:text-white hover:border-[#D6AD68] transition-colors rounded-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#D6AD68]" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings successfully saved and synchronized across the platform.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-[#121212] p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
        {/* Brand & Identity */}
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-4 border-b border-white/10 pb-2">
            1. Brand Identity
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                Brand Name
              </label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Lead Producer */}
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-4 border-b border-white/10 pb-2">
            2. Founder & Director
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                Founder Name
              </label>
              <input
                type="text"
                name="producer_name"
                value={formData.producer_name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                Title / Credential
              </label>
              <input
                type="text"
                name="producer_title"
                value={formData.producer_title}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
              Creative Philosophy
            </label>
            <input
              type="text"
              name="producer_philosophy"
              value={formData.producer_philosophy}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
            />
          </div>

          <div className="mt-4">
            <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
              Biography
            </label>
            <textarea
              rows={3}
              name="producer_bio"
              value={formData.producer_bio}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-4 border-b border-white/10 pb-2">
            3. Official Social Channels
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                YouTube Channel URL
              </label>
              <input
                type="text"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-4 border-b border-white/10 pb-2">
            4. Studio Contact Desk
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                Email
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                Phone
              </label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="btn-gold px-8 py-3 rounded-sm text-xs uppercase font-extrabold flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 fill-black" />
            <span>Save All Studio Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
