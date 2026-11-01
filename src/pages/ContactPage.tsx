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
  ArrowRight,
  ShieldCheck,
  User,
  Film,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../components/ui/SocialIcons';
import { useData } from '../context/DataContext';

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
  project_title: z.string().min(2, 'Project or event title is required'),
  estimated_budget: z.string().optional(),
  expected_timeline: z.string().optional(),
  project_description: z
    .string()
    .min(10, 'Please provide at least a brief summary of the requirements (min 10 characters)'),
  reference_links: z.string().optional(),
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export const ContactPage: React.FC = () => {
  const { companySettings, submitEnquiry } = useData();
  const location = useLocation();

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
      setErrorMessage('A transmission error occurred. Please contact us via email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#080808] text-white pt-24 pb-24 min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-[#18130B] via-[#0E0E0E] to-[#080808] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black inline-block mb-3">
            INITIATE PRODUCTION
          </span>
          <h1 className="font-cinematic font-black text-3xl sm:text-5xl text-white tracking-wide uppercase">
            CONNECT WITH BE HAPPY ENTERTAINMENT
          </h1>
          <p className="text-sm sm:text-base text-[#B5B5B5] font-light mt-3 leading-relaxed">
            Whether inquiring about theatrical distribution, short film festival collaborations, or live concert and DJ sound engineering, our production office is ready to evaluate your vision.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Studio Contact & Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#121212] border border-white/10 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block border-b border-white/10 pb-3">
                Production Headquarters
              </span>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/5 border border-white/10 text-[#D6AD68] rounded-lg mt-0.5">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                      Creative Leadership
                    </h4>
                    <p className="text-white font-medium mt-1">
                      Kavin
                    </p>
                    <p className="text-xs text-[#8E8E8E] font-light mt-0.5">
                      Producer, Director & Sound Engineer | ECE Graduate & DJ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/5 border border-white/10 text-[#D6AD68] rounded-lg mt-0.5">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                      Production Banners
                    </h4>
                    <p className="text-[#8E8E8E] font-light mt-1">
                      Be Happy Entertainment
                    </p>
                    <p className="text-xs text-[#D6AD68] font-mono mt-0.5">
                      “Every Frame Tells a Story”
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Social Media Channels */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block">
                  Official Channels
                </span>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/be_happy_entertainment24/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-[#D6AD68] hover:text-black border border-white/10 text-white flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#D6AD68]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://youtube.com/@kavin_kp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-red-600 text-white border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <YoutubeIcon className="w-4 h-4 text-red-500" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Production Proposal Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#121212] border border-white/10">
              <h2 className="font-cinematic font-bold text-2xl text-white mb-2">
                Project Proposal & Booking Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#8E8E8E] mb-6">
                Fill out the creative overview below. Our team reviews all incoming submissions.
              </p>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-[#D6AD68]/20 border border-[#D6AD68] flex items-center gap-3 text-white text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#D6AD68] shrink-0" />
                  <span>Your submission was received successfully! We will contact you shortly.</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-red-950/40 border border-red-500/50 flex items-center gap-3 text-red-300 text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B5B5B5] block mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('full_name')}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-[#555] focus:outline-hidden"
                    />
                    {errors.full_name && (
                      <p className="text-xs text-red-400 mt-1">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B5B5B5] block mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="email@example.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-[#555] focus:outline-hidden"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B5B5B5] block mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91..."
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-[#555] focus:outline-hidden"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B5B5B5] block mb-1.5 font-medium">
                      Production Category *
                    </label>
                    <select
                      {...register('project_type')}
                      className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#D6AD68] rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white focus:outline-hidden"
                    >
                      <option value="Film">Feature Film</option>
                      <option value="Short Film">Short Film</option>
                      <option value="Event">Concert & Live Event</option>
                      <option value="Music Video">Music Video</option>
                      <option value="Advertisement">Commercial</option>
                      <option value="Photography">Stills & Photography</option>
                      <option value="Other">Other Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#B5B5B5] block mb-1.5 font-medium">
                    Project / Event Title *
                  </label>
                  <input
                    type="text"
                    {...register('project_title')}
                    placeholder="Working Title"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-[#555] focus:outline-hidden"
                  />
                  {errors.project_title && (
                    <p className="text-xs text-red-400 mt-1">{errors.project_title.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#B5B5B5] block mb-1.5 font-medium">
                    Creative Requirements & Timeline *
                  </label>
                  <textarea
                    rows={4}
                    {...register('project_description')}
                    placeholder="Provide details on the narrative synopsis, stage venue, acoustic requirements, or event schedule..."
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-[#555] focus:outline-hidden"
                  />
                  {errors.project_description && (
                    <p className="text-xs text-red-400 mt-1">{errors.project_description.message}</p>
                  )}
                </div>

                {/* Honeypot anti-spam */}
                <input type="text" {...register('honeypot')} className="hidden" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold py-3.5 rounded-sm text-xs uppercase font-extrabold flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-98 transition-transform"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>{isSubmitting ? 'Transmitting Proposal...' : 'Transmit Production Proposal'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
