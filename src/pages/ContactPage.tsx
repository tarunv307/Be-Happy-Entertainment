import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TypographyMarquee } from '../components/ui/TypographyMarquee';

const enquirySchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid contact phone number'),
  company: z.string().optional(),
  project_type: z.enum([
    'Film',
    'Short Film',
    'Advertisement',
    'Music Video',
    'Corporate Video',
    'Event',
    'Photography',
    'Other',
  ]),
  project_title: z.string().min(2, 'Project title or working title is required'),
  estimated_budget: z.string().optional(),
  expected_timeline: z.string().optional(),
  project_description: z
    .string()
    .min(10, 'Please provide at least a brief summary of the creative requirements (min 10 characters)'),
  reference_links: z.string().optional(),
  honeypot: z.string().max(0, 'Spam detected').optional(), // Anti-spam trap
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export const ContactPage: React.FC = () => {
  const { companySettings, submitEnquiry } = useData();
  const location = useLocation();

  // Read preselected project type if passed from navigation
  const stateDefaultType = (location.state as any)?.defaultType;
  const initialType =
    stateDefaultType &&
    ['Film', 'Short Film', 'Advertisement', 'Music Video', 'Corporate Video', 'Event', 'Photography', 'Other'].includes(
      stateDefaultType
    )
      ? stateDefaultType
      : 'Film';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      project_type: initialType as any,
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { honeypot, ...cleanData } = data;
      const res = await submitEnquiry(cleanData);
      if (res.success) {
        setIsSuccess(true);
        reset();
      } else {
        setErrorMessage(res.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch {
      setErrorMessage('A transmission error occurred. Please contact us via phone or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A65] font-semibold block mb-3">
              Initiate Production
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#121212] tracking-tight mb-4">
              LET’S DISCUSS YOUR PROJECT.
            </h1>
            <p className="text-sm sm:text-base text-[#6B6861] font-light leading-relaxed">
              Whether preparing a feature film treatment, a nationwide commercial campaign, or
              high-concept music video, our production office is ready to evaluate your requirements.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Studio Contact & Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 bg-[#F7F6F3] border border-[#E9E7E2] space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block border-b border-[#E9E7E2] pb-2">
                Production Headquarters
              </span>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E9E7E2] text-[#B69A65] mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                      Studio Address
                    </h4>
                    <p className="text-[#777777] font-light mt-1 leading-relaxed">
                      {companySettings.office_address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E9E7E2] text-[#B69A65] mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                      Direct Enquiries
                    </h4>
                    <a
                      href={`mailto:${companySettings.contact_email}`}
                      className="text-[#777777] hover:text-[#171717] font-light mt-1 block"
                    >
                      {companySettings.contact_email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E9E7E2] text-[#B69A65] mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                      Production Desk
                    </h4>
                    <a
                      href={`tel:${companySettings.contact_phone}`}
                      className="text-[#777777] hover:text-[#171717] font-light mt-1 block"
                    >
                      {companySettings.contact_phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E9E7E2] text-[#B69A65] mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                      Studio Hours
                    </h4>
                    <p className="text-[#777777] font-light mt-1 leading-relaxed">
                      {companySettings.working_hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidentiality Commitment */}
              <div className="pt-4 border-t border-[#E9E7E2] flex items-center gap-3 text-xs text-[#777777]">
                <ShieldCheck className="w-5 h-5 text-[#B69A65] flex-shrink-0" />
                <p className="leading-tight font-light">
                  Strict non-disclosure assured. All creative materials and budget outlines remain fully confidential.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E9E7E2] p-8 sm:p-12 shadow-xs">
              <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-2">
                Project Specification
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#171717] mb-8">
                Submit A Project Brief
              </h2>

              {isSuccess ? (
                <div className="p-8 bg-[#F7F6F3] border border-[#B69A65] text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-[#B69A65] mx-auto" />
                  <h3 className="font-editorial text-2xl font-semibold text-[#171717]">
                    Project Brief Received
                  </h3>
                  <p className="text-sm text-[#777777] font-light max-w-md mx-auto leading-relaxed">
                    Thank you. Your project brief has been securely logged with Kavin Production. Producer Kavin and our creative development team will review the parameters and reach out within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Anti-spam Honeypot field (hidden) */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Full Name <span className="text-[#B69A65]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Anandhi Raj"
                        {...register('full_name')}
                        className={`w-full px-4 py-3 text-xs bg-[#F7F6F3] border ${
                          errors.full_name ? 'border-red-400' : 'border-[#E9E7E2]'
                        } focus:outline-hidden focus:border-[#B69A65]`}
                      />
                      {errors.full_name && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.full_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Email Address <span className="text-[#B69A65]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. anandhi@company.com"
                        {...register('email')}
                        className={`w-full px-4 py-3 text-xs bg-[#F7F6F3] border ${
                          errors.email ? 'border-red-400' : 'border-[#E9E7E2]'
                        } focus:outline-hidden focus:border-[#B69A65]`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Phone Number <span className="text-[#B69A65]">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98401 23456"
                        {...register('phone')}
                        className={`w-full px-4 py-3 text-xs bg-[#F7F6F3] border ${
                          errors.phone ? 'border-red-400' : 'border-[#E9E7E2]'
                        } focus:outline-hidden focus:border-[#B69A65]`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Company / Organization <span className="text-[#777777] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Studio Nexus or Independent"
                        {...register('company')}
                        className="w-full px-4 py-3 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                      />
                    </div>
                  </div>

                  {/* Project Type & Project Title Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Project Type <span className="text-[#B69A65]">*</span>
                      </label>
                      <select
                        {...register('project_type')}
                        className="w-full px-4 py-3 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65] text-[#171717]"
                      >
                        <option value="Film">Film</option>
                        <option value="Short Film">Short Film</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Corporate Video">Corporate Video</option>
                        <option value="Event">Event</option>
                        <option value="Photography">Photography</option>
                        <option value="Other">Other Media</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Project / Working Title <span className="text-[#B69A65]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Project Zenith or Untitled Feature"
                        {...register('project_title')}
                        className={`w-full px-4 py-3 text-xs bg-[#F7F6F3] border ${
                          errors.project_title ? 'border-red-400' : 'border-[#E9E7E2]'
                        } focus:outline-hidden focus:border-[#B69A65]`}
                      />
                      {errors.project_title && (
                        <p className="text-[11px] text-red-600 mt-1">
                          {errors.project_title.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Budget & Timeline Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Estimated Budget <span className="text-[#777777] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. $25k-$50k or ₹20L-₹50L"
                        {...register('estimated_budget')}
                        className="w-full px-4 py-3 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                        Expected Timeline <span className="text-[#777777] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Q3 2026 or Next Month"
                        {...register('expected_timeline')}
                        className="w-full px-4 py-3 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                      Project Description & Requirements <span className="text-[#B69A65]">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Outline the synopsis, desired visual tone, target audience, shooting locations, or deliverables..."
                      {...register('project_description')}
                      className={`w-full px-4 py-3 text-xs bg-[#F7F6F3] border ${
                        errors.project_description ? 'border-red-400' : 'border-[#E9E7E2]'
                      } focus:outline-hidden focus:border-[#B69A65] leading-relaxed`}
                    />
                    {errors.project_description && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.project_description.message}
                      </p>
                    )}
                  </div>

                  {/* Reference Links */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-2">
                      Reference Links / Moodboards <span className="text-[#777777] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. YouTube, Vimeo, Pinterest, or Google Drive URL"
                      {...register('reference_links')}
                      className="w-full px-4 py-3 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Brief...</span>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
                          <Send className="w-3.5 h-3.5 text-[#B69A65]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Footer Accent */}
      <div className="mt-20">
        <TypographyMarquee speed="slow" />
      </div>
    </div>
  );
};
