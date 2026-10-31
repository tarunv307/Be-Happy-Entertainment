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
    if (window.confirm('Reset all website settings and mock data to initial studio defaults?')) {
      resetToDefaults();
      setFormData({ ...companySettings });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E7E2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Studio Configuration
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#171717]">
            Website Settings & Identity
          </h1>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E9E7E2] bg-white text-xs uppercase tracking-wider font-semibold text-[#777777] hover:text-[#171717] hover:border-[#171717] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully saved and synchronized across the platform.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-10 border border-[#E9E7E2] shadow-xs">
        {/* Brand & Identity */}
        <div>
          <h3 className="font-editorial text-xl font-semibold text-[#171717] pb-3 border-b border-[#E9E7E2] mb-4">
            Brand Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Brand Name
              </label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>
          </div>
        </div>

        {/* Producer Profile */}
        <div>
          <h3 className="font-editorial text-xl font-semibold text-[#171717] pb-3 border-b border-[#E9E7E2] mb-4">
            Producer Leadership
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Producer Name
              </label>
              <input
                type="text"
                name="producer_name"
                value={formData.producer_name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Title / Position
              </label>
              <input
                type="text"
                name="producer_title"
                value={formData.producer_title}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Producer Biography
              </label>
              <textarea
                rows={3}
                name="producer_bio"
                value={formData.producer_bio}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Producer Creative Philosophy
              </label>
              <textarea
                rows={2}
                name="producer_philosophy"
                value={formData.producer_philosophy}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Producer Portrait Image URL
              </label>
              <input
                type="url"
                name="producer_photo_url"
                value={formData.producer_photo_url}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>
          </div>
        </div>

        {/* Company Overview, Mission & Vision */}
        <div>
          <h3 className="font-editorial text-xl font-semibold text-[#171717] pb-3 border-b border-[#E9E7E2] mb-4">
            Company Narrative
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                About The Studio (Homepage & About Us)
              </label>
              <textarea
                rows={3}
                name="company_about"
                value={formData.company_about}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  name="mission_statement"
                  value={formData.mission_statement}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={3}
                  name="vision_statement"
                  value={formData.vision_statement}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-editorial text-xl font-semibold text-[#171717] pb-3 border-b border-[#E9E7E2] mb-4">
            Studio Contact & Operations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Office / Studio Address
              </label>
              <input
                type="text"
                name="office_address"
                value={formData.office_address}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Working Hours
              </label>
              <input
                type="text"
                name="working_hours"
                value={formData.working_hours}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="font-editorial text-xl font-semibold text-[#171717] pb-3 border-b border-[#E9E7E2] mb-4">
            Social Media Channels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>
          </div>
        </div>

        {/* SEO Metadata */}
        <div>
          <h3 className="font-editorial text-xl font-semibold text-[#171717] pb-3 border-b border-[#E9E7E2] mb-4">
            SEO & Search Visibility
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Page Meta Title (Target: Kavin Production)
              </label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-[#E9E7E2] flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
