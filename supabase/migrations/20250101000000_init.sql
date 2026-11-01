-- BE HAPPY ENTERTAINMENT DATABASE SCHEMA
-- Complete Supabase PostgreSQL Architecture with RLS and Security Policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Admins and Editors)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. PRODUCTION CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.production_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. PRODUCTIONS TABLE
CREATE TABLE IF NOT EXISTS public.productions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year INTEGER NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  youtube_trailer_url TEXT,
  external_video_url TEXT,
  director TEXT NOT NULL,
  producer TEXT DEFAULT 'Kavin' NOT NULL,
  cinematographer TEXT,
  editor TEXT,
  cast_and_crew TEXT,
  credits JSONB DEFAULT '[]'::jsonb,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Completed' CHECK (status IN ('Pre-Production', 'In Production', 'Post-Production', 'Completed', 'Released')),
  is_published BOOLEAN DEFAULT true NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_productions_slug ON public.productions(slug);
CREATE INDEX IF NOT EXISTS idx_productions_published ON public.productions(is_published);
CREATE INDEX IF NOT EXISTS idx_productions_featured ON public.productions(is_featured);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  workflow_steps JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(is_published);

-- 5. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  role_category TEXT DEFAULT 'Executive' NOT NULL,
  photo_url TEXT NOT NULL,
  biography TEXT NOT NULL,
  creative_philosophy TEXT,
  is_producer BOOLEAN DEFAULT false NOT NULL,
  social_links JSONB DEFAULT '{}'::jsonb,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_published BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_team_published ON public.team_members(is_published);

-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL CHECK (category IN ('Behind The Scenes', 'Film Production', 'Photography', 'Events', 'Studio', 'Team')),
  image_url TEXT NOT NULL,
  aspect_ratio TEXT DEFAULT 'landscape',
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);

-- 7. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  project_type TEXT NOT NULL,
  project_title TEXT NOT NULL,
  estimated_budget TEXT,
  expected_timeline TEXT,
  project_description TEXT NOT NULL,
  reference_links TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.enquiries(created_at DESC);

-- 8. COMPANY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.company_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  brand_name TEXT NOT NULL DEFAULT 'BE HAPPY ENTERTAINMENT',
  tagline TEXT NOT NULL DEFAULT 'WE CREATE. WE CAPTURE. WE TELL STORIES.',
  producer_name TEXT NOT NULL DEFAULT 'Kavin',
  producer_title TEXT NOT NULL DEFAULT 'Producer & Founder',
  producer_bio TEXT NOT NULL,
  producer_philosophy TEXT NOT NULL,
  producer_photo_url TEXT NOT NULL,
  company_about TEXT NOT NULL,
  mission_statement TEXT NOT NULL,
  vision_statement TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  office_address TEXT NOT NULL,
  working_hours TEXT NOT NULL,
  instagram_url TEXT,
  youtube_url TEXT,
  facebook_url TEXT,
  linkedin_url TEXT,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- ====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Helper check for admin user
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES POLICIES
CREATE POLICY "Admins can view and edit profiles"
  ON public.profiles
  FOR ALL
  USING (auth.uid() = id OR public.is_admin());

-- 2. PRODUCTIONS POLICIES
-- Public can only view published productions
CREATE POLICY "Public can view published productions"
  ON public.productions
  FOR SELECT
  USING (is_published = true);

-- Authenticated admins can perform all actions
CREATE POLICY "Admins have full access to productions"
  ON public.productions
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 3. SERVICES POLICIES
CREATE POLICY "Public can view published services"
  ON public.services
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins have full access to services"
  ON public.services
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 4. TEAM MEMBERS POLICIES
CREATE POLICY "Public can view published team members"
  ON public.team_members
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins have full access to team members"
  ON public.team_members
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 5. GALLERY POLICIES
CREATE POLICY "Public can view gallery"
  ON public.gallery
  FOR SELECT
  USING (true);

CREATE POLICY "Admins have full access to gallery"
  ON public.gallery
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 6. ENQUIRIES POLICIES (STRICT PRIVACY)
-- Anyone can INSERT an enquiry (public submission)
CREATE POLICY "Public can submit enquiries"
  ON public.enquiries
  FOR INSERT
  WITH CHECK (true);

-- ONLY authenticated admins can SELECT, UPDATE, DELETE enquiries
CREATE POLICY "Only admins can view and manage enquiries"
  ON public.enquiries
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 7. COMPANY SETTINGS POLICIES
CREATE POLICY "Public can view company settings"
  ON public.company_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update company settings"
  ON public.company_settings
  FOR UPDATE
  USING (auth.role() = 'authenticated');
