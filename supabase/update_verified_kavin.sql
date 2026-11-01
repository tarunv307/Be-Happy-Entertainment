-- Purge all mock data from Supabase and insert only verified Kavin Production content
BEGIN;

-- 1. Ensure table schema has needed columns
ALTER TABLE public.productions ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE public.productions ADD COLUMN IF NOT EXISTS runtime text;
ALTER TABLE public.productions ADD COLUMN IF NOT EXISTS tagline text;
ALTER TABLE public.productions ADD COLUMN IF NOT EXISTS content_type text;

-- 2. Delete all fake/mock productions (The Last Echo, Zenith, Chroma, Shadows of Cochin, etc.)
DELETE FROM public.productions;

-- 3. Insert ONLY verified Kavin titles
-- Movie 01: Padikathavan
INSERT INTO public.productions (
  id, slug, title, category, content_type, year, runtime, tagline,
  short_description, description, poster_url, cover_url, video_url, youtube_trailer_url,
  director, producer, cinematographer, editor, cast_and_crew,
  credits, gallery_images, status, is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-padikathavan',
  'padikathavan',
  'Padikathavan',
  'Feature Films',
  'movie',
  2025,
  '1h 48m',
  'A compelling college youth drama exploring ambition, friendship, and crossroads.',
  'A grounded campus drama revolving around youth experiences, relationships, and life turning points, produced by Kavin Production.',
  'Padikathavan captures the unspoken emotional battles, campus dynamics, and life lessons of collegiate life. Produced by Kavin Production with direct streaming available on the platform.',
  '/media/padikathavan-poster.webp',
  '/media/padikathavan-poster.webp',
  '/media/padikathavan.mp4',
  'https://youtube.com/@kavin_kp',
  'Kavin',
  'Kavin',
  'Kavin Production Camera Unit',
  'Kavin Production Post',
  'Official Kavin Production cast lineup.',
  '[{"name": "Kavin", "role": "Producer"}, {"name": "Kavin Production", "role": "Production House"}, {"name": "Be Happy Entertainment", "role": "Banner"}]'::jsonb,
  '["/media/padikathavan-poster.webp", "/media/bts-gimbal.png", "/media/kavin-director-banner.png"]'::jsonb,
  'Released',
  TRUE,
  TRUE,
  '2025-06-10T00:00:00Z',
  NOW()
);

-- Movie 02: Game (Not Over)
INSERT INTO public.productions (
  id, slug, title, category, content_type, year, runtime, tagline,
  short_description, description, poster_url, cover_url, video_url, youtube_trailer_url,
  director, producer, cinematographer, editor, cast_and_crew,
  credits, gallery_images, status, is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-game',
  'game',
  'Game (Not Over)',
  'Feature Films',
  'movie',
  2025,
  '1h 35m',
  'Life is a journey. Enjoy the ride... but remember, the game is never over.',
  'A suspenseful drama chronicling high-stakes confrontations, digital dilemmas, and unexpected turning points.',
  '“Life is a journey. Enjoy the ride.” Game (Not Over) dives into modern conflicts, confrontation, and resilience. Produced and crafted under Kavin Production.',
  '/media/game-poster.webp',
  '/media/game-poster.webp',
  '/media/game-not-over.mp4',
  'https://youtube.com/@kavin_kp',
  'Kavin',
  'Kavin',
  'Kavin Production Camera Unit',
  'Kavin Production Post',
  'Official Kavin Production cast lineup.',
  '[{"name": "Kavin", "role": "Producer"}, {"name": "Kavin Production", "role": "Production House"}, {"name": "Be Happy Entertainment", "role": "Banner"}]'::jsonb,
  '["/media/game-poster.webp", "/media/bts-gimbal.png", "/media/title-card-release.png"]'::jsonb,
  'Released',
  TRUE,
  TRUE,
  '2025-08-20T00:00:00Z',
  NOW()
);

-- Movie 03: Mudhal Kadhal (Upcoming 2026)
INSERT INTO public.productions (
  id, slug, title, category, content_type, year, runtime, tagline,
  short_description, description, poster_url, cover_url, video_url, youtube_trailer_url,
  director, producer, cinematographer, editor, cast_and_crew,
  credits, gallery_images, status, is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-mudhal-kadhal',
  'mudhal-kadhal',
  'Mudhal Kadhal',
  'Short Films',
  'short-film',
  2026,
  '22m',
  'Some stories find you... First love. Lasts forever.',
  'An evocative romantic narrative exploring the enduring resonance of first love, written and directed by Kavin.',
  '“Some stories find you... First love. Lasts forever.” Mudhal Kadhal is an official production under Be Happy Entertainment / Kavin Production. Penned, produced, and directed by Kavin with co-writing by Puviyarasan. Featuring an atmospheric score by Ajay Kumar and evocative cinematography by Yuvan.',
  '/media/mudhal-kadhal-poster.png',
  '/media/title-3-teaser.png',
  '/media/mudhal-kadhal.mp4',
  'https://youtube.com/@kavin_kp',
  'Kavin',
  'Kavin',
  'Yuvan (AD & DOP)',
  'Tharun(AT)',
  'Starring Sanjith, Mehnaz Sherin, and Nagasundaram.',
  '[{"name": "Kavin", "role": "Producer, Written & Directed by"}, {"name": "Puviyarasan", "role": "Co-Written by"}, {"name": "Yuvan", "role": "AD & DOP"}, {"name": "Tharun(AT)", "role": "Editor"}, {"name": "Ajay Kumar", "role": "Music"}, {"name": "Sanjith", "role": "Cast (Lead)"}, {"name": "Mehnaz Sherin", "role": "Cast (Lead)"}, {"name": "Nagasundaram", "role": "Cast"}]'::jsonb,
  '["/media/mudhal-kadhal-poster.png", "/media/title-3-teaser.png", "/media/title-card-release.png", "/media/bts-gimbal.png"]'::jsonb,
  'In Production',
  TRUE,
  TRUE,
  '2026-01-15T00:00:00Z',
  NOW()
);

-- 4. Purge mock team members & insert only Kavin
DELETE FROM public.team_members;
INSERT INTO public.team_members (
  id, name, position, role_category, photo_url, biography, creative_philosophy,
  is_producer, social_links, display_order, is_published, created_at, updated_at
) VALUES (
  'team-kavin',
  'Kavin',
  'Founder, Producer, Director & Sound Engineer',
  'Executive',
  '/media/kavin-director-banner.png',
  'Kavin is the visionary force behind Kavin Production and Be Happy Entertainment. Holding an engineering background in Electronics and Communication Engineering (ECE graduate), he integrates technical sound precision with intuitive narrative direction. As Producer and Director of Padikathavan, Game, and Mudhal Kadhal, as well as an accomplished DJ and Sound Engineer, Kavin oversees every project with the motto: "Good Stories, Better People. Shoot, Edit, Mix, Create, Repeat."',
  'Every Frame Tells a Story. Ideas. Stories. Sound. Beyond.',
  TRUE,
  '{"instagram": "https://www.instagram.com/be_happy_entertainment24/", "youtube": "https://youtube.com/@kavin_kp"}'::jsonb,
  1,
  TRUE,
  '2025-01-01T00:00:00Z',
  NOW()
);

-- 5. Purge mock gallery & insert verified media assets
DELETE FROM public.gallery;
INSERT INTO public.gallery (id, title, caption, category, image_url, aspect_ratio, display_order, created_at)
VALUES
  ('gal-1', 'Kavin — Producer, Director & Sound Engineer', '“Good Stories, Better People. Same Passion, Different Medium.”', 'Studio', '/media/kavin-director-banner.png', 'landscape', 1, '2025-01-01T00:00:00Z'),
  ('gal-2', 'Mudhal Kadhal Official Poster', '“Some Stories Find You... First Love. Lasts Forever.” Coming Soon 2026.', 'Film Production', '/media/mudhal-kadhal-poster.png', 'portrait', 2, '2026-01-01T00:00:00Z'),
  ('gal-3', 'Production No. 3 Teaser — Coming Soon', 'Be Happy Entertainment Presents: Some Stories Stay With You Forever...', 'Behind The Scenes', '/media/title-3-teaser.png', 'square', 3, '2026-01-05T00:00:00Z'),
  ('gal-4', 'Important Title Card Release @ 5PM', 'Be Happy Productions Presents — Official Title Card Announcement.', 'Behind The Scenes', '/media/title-card-release.png', 'portrait', 4, '2026-01-10T00:00:00Z'),
  ('gal-5', 'Padikathavan — Official Poster', 'Official movie poster for Padikathavan, produced by Kavin Production.', 'Film Production', '/media/padikathavan-poster.webp', 'portrait', 5, '2025-06-01T00:00:00Z'),
  ('gal-6', 'Game (Not Over) — Official Poster', 'Official movie poster for Game (Not Over), produced by Kavin Production.', 'Film Production', '/media/game-poster.webp', 'portrait', 6, '2025-08-01T00:00:00Z'),
  ('gal-7', 'Behind The Scenes — Gimbal Rig & Camera Setup', 'DJI gimbal stabilized rig on set during principal cinematography.', 'Behind The Scenes', '/media/bts-gimbal.png', 'portrait', 7, '2026-01-12T00:00:00Z');

-- 6. Purge mock enquiries & mock services
DELETE FROM public.enquiries;
DELETE FROM public.services;

-- 7. Update company settings with verified Kavin data
UPDATE public.company_settings SET
  brand_name = 'KAVIN PRODUCTION',
  tagline = 'DREAM. CREATE. ENTERTAIN.',
  producer_name = 'Kavin',
  producer_title = 'Producer, Director & Sound Engineer',
  producer_bio = 'Kavin is a multifaceted filmmaker, producer, director, and sound engineer & DJ with a background in Electronics and Communication Engineering (ECE graduate). Leading Kavin Production and Be Happy Entertainment across feature films, narrative short cinema, and high-energy live concerts.',
  producer_philosophy = 'Every Frame Tells a Story. Good Stories, Better People. Same Passion, Different Medium. Ideas | Stories | Sound | Beyond.',
  producer_photo_url = '/media/kavin-director-banner.png',
  company_about = 'Kavin Production is a cinematic entertainment platform and production house dedicated to original visual storytelling and live musical experiences. Creators of Padikathavan, Game, and Mudhal Kadhal.',
  mission_statement = 'To craft impactful cinematic and live entertainment experiences that touch hearts, elevate narratives, and resonate across generations through brave storytelling and acoustic mastery.',
  vision_statement = 'To build an enduring, globally recognized entertainment house where original cinema, short films, and electrifying live concerts thrive under a unified creative vision.',
  contact_email = '',
  contact_phone = '',
  office_address = '',
  working_hours = '',
  instagram_url = 'https://www.instagram.com/be_happy_entertainment24/',
  youtube_url = 'https://youtube.com/@kavin_kp',
  facebook_url = '',
  linkedin_url = '',
  meta_title = 'KAVIN PRODUCTION — DREAM. CREATE. ENTERTAIN. | Official OTT Platform',
  meta_description = 'Official cinematic entertainment platform and streaming showcase of Kavin Production. Stream Padikathavan, Game, and upcoming feature Mudhal Kadhal. Discover movies, short films, and live concerts.',
  updated_at = NOW();

COMMIT;
