export type ProductionCategory =
  | 'Feature Films'
  | 'Short Films'
  | 'Music Videos'
  | 'Commercial Advertisements'
  | 'Corporate Films'
  | 'Brand Films'
  | 'Event Productions'
  | 'Photography'
  | 'Digital Content'
  | 'Other Media Productions';

export interface Production {
  id: string;
  slug: string;
  title: string;
  category: ProductionCategory;
  year: number;
  short_description: string;
  description: string;
  poster_url: string;
  cover_url: string;
  youtube_trailer_url?: string;
  external_video_url?: string;
  director: string;
  producer: string;
  cinematographer: string;
  editor: string;
  cast_and_crew: string;
  credits: { role: string; name: string }[];
  gallery_images: string[];
  status: 'Pre-Production' | 'In Production' | 'Post-Production' | 'Completed' | 'Released';
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  short_description: string;
  description: string;
  image_url: string;
  workflow_steps: string[];
  deliverables: string[];
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role_category: 'Executive' | 'Direction' | 'Cinematography' | 'Post-Production' | 'Crew';
  photo_url: string;
  biography: string;
  creative_philosophy?: string;
  is_producer: boolean;
  social_links: {
    instagram?: string;
    linkedin?: string;
    imdb?: string;
    twitter?: string;
  };
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  category: 'Behind The Scenes' | 'Film Production' | 'Photography' | 'Events' | 'Studio' | 'Team';
  image_url: string;
  aspect_ratio?: 'landscape' | 'portrait' | 'square';
  display_order: number;
  created_at: string;
}

export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';

export interface Enquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  project_type: 'Film' | 'Short Film' | 'Advertisement' | 'Music Video' | 'Corporate Video' | 'Event' | 'Photography' | 'Other';
  project_title: string;
  estimated_budget?: string;
  expected_timeline?: string;
  project_description: string;
  reference_links?: string;
  status: EnquiryStatus;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanySettings {
  brand_name: string;
  tagline: string;
  producer_name: string;
  producer_title: string;
  producer_bio: string;
  producer_philosophy: string;
  producer_photo_url: string;
  company_about: string;
  mission_statement: string;
  vision_statement: string;
  contact_email: string;
  contact_phone: string;
  office_address: string;
  working_hours: string;
  instagram_url: string;
  youtube_url: string;
  facebook_url: string;
  linkedin_url: string;
  meta_title: string;
  meta_description: string;
}
