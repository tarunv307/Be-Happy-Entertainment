-- Seed data generated from initialData.ts
BEGIN;

-- 1. Company Settings
DELETE FROM public.company_settings;
INSERT INTO public.company_settings (
  id, brand_name, tagline, producer_name, producer_title, producer_bio, producer_philosophy,
  producer_photo_url, company_about, mission_statement, vision_statement, contact_email,
  contact_phone, office_address, working_hours, instagram_url, youtube_url, facebook_url,
  linkedin_url, meta_title, meta_description, updated_at
) VALUES (
  1,
  'BE HAPPY ENTERTAINMENT',
  'WE CREATE. WE CAPTURE. WE TELL STORIES.',
  'Kavin',
  'Producer & Founder',
  'Kavin is a visionary producer dedicated to cinematic excellence and narrative depth. With a background spanning independent cinema, high-impact commercials, and music visuals, Kavin guides every production with meticulous attention to visual craft, emotional resonance, and uncompromised production standards.',
  'Every frame must serve a purpose. Great production is not merely about expensive equipment — it is about the harmony between authentic emotion, technical mastery, and courageous storytelling.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  'Be Happy Entertainment is a creative media production company focused on transforming ideas into meaningful visual experiences. From concept development to final delivery, we bring creativity, technical expertise, and passion to every project.',
  'To pioneer compelling visual storytelling by blending cinematic craft with modern production technologies, creating media that moves audiences and elevates brands globally.',
  'To become an internationally recognized creative studio renowned for uncompromising quality, artistic integrity, and innovative production solutions.',
  'contact@behappyentertainment.com',
  '+91 (0) 44 2847 9000',
  'Studio 4, Film City Avenue, Creative Quarter, Chennai, India',
  'Monday – Friday: 09:00 AM – 07:00 PM (IST)',
  'https://www.instagram.com/be_happy_entertainment24/',
  'https://youtube.com/@kavin_kp',
  'https://facebook.com/behappyentertainment',
  'https://linkedin.com/company/behappyentertainment',
  'BE HAPPY ENTERTAINMENT — We Create. We Capture. We Tell Stories.',
  'Official website of Be Happy Entertainment. Premium media production studio specializing in feature films, commercials, music videos, and creative cinematography.',
  NOW()
);

-- 2. Services
DELETE FROM public.services;
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-1',
  'film-production',
  'Film Production',
  'Cinema',
  'End-to-end cinematic storytelling for the silver screen.',
  'Full-scale feature film production services from script development, location scouting, casting, and principal photography to world-class delivery.',
  'We bring original cinematic stories to life with world-class production infrastructure. Whether developing an independent feature or a high-concept studio project, our team manages script supervision, casting, line production, location permits, camera departments, and set logistics.',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
  '["Script Analysis & Feasibility","Budgeting & Line Production","Principal Photography & Direction","Theatrical Master Delivery"]'::jsonb,
  '["DCP Theatrical Package","ProRes 4444 Master","Promotional EPK & Teasers"]'::jsonb,
  TRUE,
  1,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-2',
  'short-film-production',
  'Short Film Production',
  'Cinema',
  'Impactful narratives crafted with precision and festival ambition.',
  'Compelling short-form cinema designed for international film festivals, digital showcases, and visionary storytellers.',
  'Short films require unparalleled narrative economy. We work closely with visionary writers and directors to crystallize ideas, manage intimate crew setups, and produce award-worthy cinema capable of competing on global festival circuits.',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
  '["Narrative Polish & Casting","Production Design & Logistics","Cinematography","Festival Cut & Grade"]'::jsonb,
  '["4K Festival Deliverable","Poster & Press Kit","Digital Screening Masters"]'::jsonb,
  TRUE,
  2,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-3',
  'music-video-production',
  'Music Video Production',
  'Music',
  'Electrifying visual concepts synchronized with rhythm and soul.',
  'Distinctive visual identities for recording artists, record labels, and independent musicians.',
  'From moody performance videos to choreographed narrative journeys, we synchronize evocative lighting, dynamic camera movement, and cutting-edge visual pacing to turn tracks into unforgettable visual anthems.',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
  '["Treatment & Creative Pitch","Choreography & Set Construction","High-Speed Camera Capture","Rhythmic Edit & Color Grade"]'::jsonb,
  '["4K UHD Music Video","Vertical Teasers for Reels/TikTok","Clean & Explicit Masters"]'::jsonb,
  TRUE,
  3,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-4',
  'advertisement-production',
  'Advertisement Production',
  'Commercial',
  'High-conversion commercial films that command audience attention.',
  'Television commercials and high-impact digital advertisements engineered to elevate brand prestige and drive action.',
  'We combine commercial strategy with cinematic aesthetics. Working closely with advertising agencies and brand directors, our commercials present products with arresting beauty and emotional clarity.',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
  '["Creative Brief & Storyboarding","Talent Casting & Art Direction","Precision Lighting & Shooting","VFX, Sound & Broadcast QC"]'::jsonb,
  '["TVC 30s & 15s Broadcast Cuts","Multi-ratio Digital Cuts (16:9, 9:16, 1:1)","High-Res Stills Package"]'::jsonb,
  TRUE,
  4,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-5',
  'corporate-video-production',
  'Corporate Video Production',
  'Corporate',
  'Humanizing enterprise narratives with sophistication.',
  'Executive profiles, company milestone films, investor presentations, and culture showcases.',
  'Move beyond mundane corporate communications. We capture the true spirit of enterprise leaders, employees, and groundbreaking technology with cinematic camera techniques and naturalistic interviews.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  '["Executive Discovery & Pre-interview","Multi-location Film Logistics","Dynamic B-Roll & Visuals","Soundtrack Scored & Final Delivery"]'::jsonb,
  '["Keynote Video Files","Internal Town Hall Master","Social Edit Highlights"]'::jsonb,
  TRUE,
  5,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-6',
  'event-video-production',
  'Event Video Production',
  'Events',
  'Immortalizing live moments and grand milestones.',
  'Multi-camera event coverage, awards ceremonies, product launches, and retrospective highlights.',
  'We deploy nimble, experienced camera units to document conferences, luxury galas, concerts, and brand experiences. Real-time footage management ensures same-day teasers and comprehensive recap films.',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  '["Venue Walkthrough & Signal Mapping","Multi-camera Crew Deployment","Live Audio Recording & Switching","Post-Event Highlight Cut"]'::jsonb,
  '["Same-Day Social Recap","Full-Length Archive Cut","Keynote Excerpt Packages"]'::jsonb,
  TRUE,
  6,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-7',
  'photography',
  'Photography',
  'Stills',
  'Timeless still imagery captured with editorial sensibility.',
  'High-fashion, unit stills, architectural, portraiture, and commercial product photography.',
  'Our dedicated photographers understand that every still image must tell an entire story in a single fraction of a second. Using Hasselblad and medium format setups, we craft imagery that commands billboards and editorial spreads.',
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=80',
  '["Moodboard & Lighting Design","On-location or Studio Shoot","Tethered Real-time Review","High-end Beauty & Tone Retouching"]'::jsonb,
  '["Ultra High-Res TIFF & JPEG","Color-matched Web Exports","Print-ready CMYK Files"]'::jsonb,
  TRUE,
  7,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-8',
  'cinematography',
  'Cinematography',
  'Craft',
  'Mastery of light, lens optics, and movement.',
  'Director of Photography services utilizing ARRI, RED, and anamorphic optical glass.',
  'Light is our brush and camera movement is our rhythm. Our cinematographers bring deep technical proficiency in color science, anamorphic lens character, gimbal operations, and dramatic scene lighting.',
  'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80',
  '["Look Development & Camera Testing","Lighting Diagrams & Rigging","On-set DIT & Exposure Management","Color Science Collaboration"]'::jsonb,
  '["Raw Cinema Footage with DIT Backups","LUT Pack Developed For Project","Cinematography Notes"]'::jsonb,
  TRUE,
  8,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-9',
  'creative-direction',
  'Creative Direction',
  'Creative',
  'Guiding the overarching artistic vision and aesthetic tone.',
  'World-building, visual identity concepts, moodboards, and narrative consultation.',
  'Before a single camera rolls, we define the aesthetic soul of the piece. Our creative directors establish the color schemes, costume design guidelines, architectural environments, and emotional cadence.',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
  '["Vision Alignment Workshop","Lookbook & Concept Deck Creation","Departmental Alignment","Art Direction Supervision"]'::jsonb,
  '["Comprehensive Creative Deck","Color Palette & Texture Guide","Director Treatment"]'::jsonb,
  TRUE,
  9,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-10',
  'digital-media-production',
  'Digital Media Production',
  'Digital',
  'Dynamic digital assets built for connected audiences.',
  'Streaming media, web series, digital shorts, interactive media, and podcast video productions.',
  'Digital audiences demand freshness without sacrificing production value. We produce episodic content, live interactive broadcasts, and podcast studio streams with broadcast-grade fidelity.',
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
  '["Format Structuring & Pilot","Multi-camera Studio Recording","Real-time Graphics Integration","Multi-platform Optimization"]'::jsonb,
  '["Full Length 4K Episodes","Short-form Clips with Subtitles","Audio Masters for Spotify/Apple"]'::jsonb,
  TRUE,
  10,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-11',
  'video-editing',
  'Video Editing',
  'Post-Production',
  'Pacing, rhythm, and editorial cohesion.',
  'Non-linear editing for features, documentaries, commercials, and high-tempo music videos.',
  'Editing is where the story is truly rewritten. Our editors sculpt the pacing, structure narrative tension, and ensure seamless continuity across complex multi-camera storylines.',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  '["Footage Ingest & Assembly Cut","Rough Cut & Director Collaboration","Fine Cut & Pacing Lock","Conform & Export"]'::jsonb,
  '["Locked Offline Cut","EDL/XML Turnovers for Sound & Color","Screening Watermarked Files"]'::jsonb,
  TRUE,
  11,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-12',
  'post-production',
  'Post Production',
  'Post-Production',
  'Finishing suites: color grading, VFX, sound design, and mastering.',
  'DaVinci Resolve color grading, cinematic sound design, motion graphics, and QC mastering.',
  'A true end-to-end post house experience. From subtle beauty cleanups and compositing to Dolby Atmos audio mixing and ACES color grading calibrated on calibrated OLED reference monitors.',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  '["Color Grading & Tone Curves","Foley & Sound Design","Visual Effects & Cleanups","Dolby / Streaming Quality Control"]'::jsonb,
  '["Final Master (ProRes 4444 XQ)","5.1 & Stereo Mix Deliverables","Clean Textless Master"]'::jsonb,
  TRUE,
  12,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-13',
  'promotional-content',
  'Promotional Content',
  'Marketing',
  'Teasers, trailers, and promo reels that ignite anticipation.',
  'High-energy promotional packages designed to build pre-launch buzz for projects and launches.',
  'Every release needs hype. We create dramatic teasers, behind-the-scenes sizzle reels, and promotional mini-docs that build irresistible momentum ahead of your premiere.',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  '["Hook Strategy & Cue Selection","Rapid Cut Editing","Epic Sound Design & Risers","Multi-format Exports"]'::jsonb,
  '["Official Theatrical Trailer","15s & 30s Promo Cutdowns","Press Screener Assets"]'::jsonb,
  TRUE,
  13,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-14',
  'brand-films',
  'Brand Films',
  'Commercial',
  'Elevating company ethos into cinematic art.',
  'Emotional, authentic short documentaries and manifesto films that define modern brands.',
  'A brand film does not push features — it creates cultural resonance. We capture founders, craftsmen, and global movements with cinematic reverence, building unforgettable brand loyalty.',
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
  '["Brand Philosophy Immersion","Casting Real Protagonists","Cinematic On-location Shoot","Orchestral Scoring & Finish"]'::jsonb,
  '["Full Brand Manifesto Film (3-5 min)","60s Anthem Cut","Executive Quote Assets"]'::jsonb,
  TRUE,
  14,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.services (
  id, slug, title, category, tagline, short_description, description,
  image_url, workflow_steps, deliverables, is_published, display_order, created_at, updated_at
) VALUES (
  'srv-15',
  'social-media-content',
  'Social Media Content',
  'Social',
  'Premium native video tailored for algorithms and eyes.',
  'Vertical 9:16 cinematic reels, episodic series, and dynamic trend adaptations.',
  'We bring film-grade cameras, lighting, and sound into the mobile vertical format. Create content that stops the endless scroll and feels inherently artistic yet natively social.',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
  '["Batch Content Planning","Vertical Cinematography Sprint","Fast Turnaround Editing","Graphic Overlays & Motion Text"]'::jsonb,
  '["Batch of 10-20 Vertical Reels","Thumbnail Stills","Optimized Captions & Audio Tracks"]'::jsonb,
  TRUE,
  15,
  '2025-01-01T00:00:00Z',
  NOW()
);

-- 3. Productions
DELETE FROM public.productions;
INSERT INTO public.productions (
  id, slug, title, category, year, short_description, description,
  poster_url, cover_url, youtube_trailer_url, external_video_url, director, producer,
  cinematographer, editor, cast_and_crew, credits, gallery_images, status,
  is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-1',
  'the-last-echo',
  'The Last Echo',
  'Feature Films',
  2025,
  'A poignant psychological mystery set against the misty foothills of the Western Ghats.',
  'When an antique sound recordist stumbles upon an undocumented acoustic phenomenon deep within an abandoned colonial tea estate, he begins unearthing secrets that challenge his perception of grief and memory. Shot entirely on ARRI Alexa Mini LF with vintage Cooke Panchro lenses.',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
  'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  NULL,
  'Aravind Swaminathan',
  'Kavin',
  'Rahul Menon',
  'Siddharth V.',
  'Starring Mohan Kumar, Priya Darshini, and Victor Bannerjee.',
  '[{"role":"Producer","name":"Kavin"},{"role":"Director","name":"Aravind Swaminathan"},{"role":"Director of Photography","name":"Rahul Menon"},{"role":"Lead Editor","name":"Siddharth V."},{"role":"Original Score","name":"Marcus Sterling"},{"role":"Sound Design","name":"Kavin Sound Lab"}]'::jsonb,
  '["https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Completed',
  TRUE,
  TRUE,
  '2025-01-10T00:00:00Z',
  '2025-01-10T00:00:00Z'
);
INSERT INTO public.productions (
  id, slug, title, category, year, short_description, description,
  poster_url, cover_url, youtube_trailer_url, external_video_url, director, producer,
  cinematographer, editor, cast_and_crew, credits, gallery_images, status,
  is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-2',
  'chroma-rhythm',
  'Chroma: Symphony of Light',
  'Music Videos',
  2024,
  'A visually mesmerizing blend of choreography, anamorphic flares, and neon reflections.',
  'Produced for electronic music sensation Elysian, Chroma explores human connection through chromatic wavelength transitions and bespoke motorized camera rigs. Featured across top international visual platforms.',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
  'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  NULL,
  'Meera Raghav',
  'Kavin',
  'Rahul Menon',
  'Preethi Nair',
  'Featuring The Kinetic Dance Collective.',
  '[{"role":"Producer","name":"Kavin"},{"role":"Director","name":"Meera Raghav"},{"role":"Cinematographer","name":"Rahul Menon"},{"role":"Choreography","name":"Elena Rostova"},{"role":"Colorist","name":"Kavin Post Studio"}]'::jsonb,
  '["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Released',
  TRUE,
  TRUE,
  '2024-11-15T00:00:00Z',
  '2024-11-15T00:00:00Z'
);
INSERT INTO public.productions (
  id, slug, title, category, year, short_description, description,
  poster_url, cover_url, youtube_trailer_url, external_video_url, director, producer,
  cinematographer, editor, cast_and_crew, credits, gallery_images, status,
  is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-3',
  'aurora-motors-zenith',
  'Zenith: The Electric Frontier',
  'Commercial Advertisements',
  2025,
  'A cinematic commercial capturing luxury performance and sustainable engineering.',
  'Filmed across coastal cliffs and wind farm highways, this national commercial for Zenith combines pursuit-vehicle tracking, high-speed Russian arm sequences, and photorealistic motion design.',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  NULL,
  'Kavin',
  'Kavin',
  'Rahul Menon',
  'Siddharth V.',
  'Production services by Kavin Production Automotive Unit.',
  '[{"role":"Executive Producer","name":"Kavin"},{"role":"Director","name":"Kavin"},{"role":"Camera Operator (Pursuit)","name":"Arjun Das"},{"role":"Sound Design & Mix","name":"Audio Craft Lab"}]'::jsonb,
  '["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Released',
  TRUE,
  TRUE,
  '2025-01-05T00:00:00Z',
  '2025-01-05T00:00:00Z'
);
INSERT INTO public.productions (
  id, slug, title, category, year, short_description, description,
  poster_url, cover_url, youtube_trailer_url, external_video_url, director, producer,
  cinematographer, editor, cast_and_crew, credits, gallery_images, status,
  is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-4',
  'shadows-of-cochin',
  'Shadows of Cochin',
  'Short Films',
  2024,
  'An intimate narrative of a harbor fisherman discovering an ancient brass chest.',
  'Official Selection at multiple international film festivals. A lyrical meditation on heritage, coastal ecology, and the unspoken bonds between generations along the Malabar coast.',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1600&q=80',
  'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  NULL,
  'Kiran Mohan',
  'Kavin',
  'Deepak Varma',
  'Siddharth V.',
  'Cast: K. T. Joseph, Ananya Nair, Babu Antony.',
  '[{"role":"Producer","name":"Kavin"},{"role":"Director","name":"Kiran Mohan"},{"role":"Cinematography","name":"Deepak Varma"}]'::jsonb,
  '["https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Completed',
  TRUE,
  FALSE,
  '2024-08-20T00:00:00Z',
  '2024-08-20T00:00:00Z'
);
INSERT INTO public.productions (
  id, slug, title, category, year, short_description, description,
  poster_url, cover_url, youtube_trailer_url, external_video_url, director, producer,
  cinematographer, editor, cast_and_crew, credits, gallery_images, status,
  is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-5',
  'lumina-heritage',
  'Lumina: Master of Architecture',
  'Corporate Films',
  2024,
  'An architectural documentary celebrating sustainable structural engineering.',
  'Commissioned by Lumina Design Group, this film documents the construction of the award-winning Terra Pavilion. Through drone photogrammetry and time-lapse cinematography, we showcase raw materials transforming into living art.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  NULL,
  'Sujith George',
  'Kavin',
  'Rahul Menon',
  'Preethi Nair',
  'Interviewees: Principal Architects of Studio Terra.',
  '[{"role":"Producer","name":"Kavin"},{"role":"Director","name":"Sujith George"},{"role":"Drone Pilot & DP","name":"Vikram Joshi"}]'::jsonb,
  '["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Released',
  TRUE,
  FALSE,
  '2024-06-12T00:00:00Z',
  '2024-06-12T00:00:00Z'
);
INSERT INTO public.productions (
  id, slug, title, category, year, short_description, description,
  poster_url, cover_url, youtube_trailer_url, external_video_url, director, producer,
  cinematographer, editor, cast_and_crew, credits, gallery_images, status,
  is_published, is_featured, created_at, updated_at
) VALUES (
  'prod-6',
  'the-solitary-craftsman',
  'The Solitary Craftsman',
  'Brand Films',
  2024,
  'An artisanal timepiece maker’s quiet devotion to micro-precision.',
  'A brand anthem celebrating patience, hand craftsmanship, and uncompromising passion. Extreme macro cinematography highlights gears no thicker than a human hair.',
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=80',
  'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  NULL,
  'Kavin',
  'Kavin',
  'Deepak Varma',
  'Siddharth V.',
  'Narrated by David Vance.',
  '[{"role":"Director & Producer","name":"Kavin"},{"role":"Macro Cinematography","name":"Deepak Varma"}]'::jsonb,
  '["https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Released',
  TRUE,
  TRUE,
  '2024-04-01T00:00:00Z',
  '2024-04-01T00:00:00Z'
);

-- 4. Team Members
DELETE FROM public.team_members;
INSERT INTO public.team_members (
  id, name, position, role_category, photo_url, biography, creative_philosophy,
  is_producer, social_links, display_order, is_published, created_at, updated_at
) VALUES (
  'team-1',
  'Kavin',
  'Producer & Founder',
  'Executive',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  'As the founding producer of Kavin Production, Kavin leads all creative productions with a commitment to artistic integrity, pristine visual fidelity, and storytelling that resonates deeply with audiences.',
  'We do not produce mere content; we build cinematic experiences that linger long after the lights come up.',
  TRUE,
  '{"instagram":"https://instagram.com/kavinproduction","linkedin":"https://linkedin.com/in/kavin-producer","imdb":"https://imdb.com"}'::jsonb,
  1,
  TRUE,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.team_members (
  id, name, position, role_category, photo_url, biography, creative_philosophy,
  is_producer, social_links, display_order, is_published, created_at, updated_at
) VALUES (
  'team-2',
  'Aravind Swaminathan',
  'Creative Director & Film Director',
  'Direction',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
  'With over a decade directing dramatic narrative cinema and premium commercials, Aravind guides the creative vision from script formulation to screen execution.',
  'A director’s primary role is to create a safe harbor where truth can emerge in front of the lens.',
  FALSE,
  '{"linkedin":"https://linkedin.com","imdb":"https://imdb.com"}'::jsonb,
  2,
  TRUE,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.team_members (
  id, name, position, role_category, photo_url, biography, creative_philosophy,
  is_producer, social_links, display_order, is_published, created_at, updated_at
) VALUES (
  'team-3',
  'Rahul Menon',
  'Director of Photography',
  'Cinematography',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
  'A master of natural lighting, anamorphic glass, and fluid camera movement. Rahul brings rich atmospheric depth to every film produced at Kavin Production.',
  'Lighting is not about illuminating a subject; it is about choosing what to conceal in darkness.',
  FALSE,
  '{"instagram":"https://instagram.com","imdb":"https://imdb.com"}'::jsonb,
  3,
  TRUE,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.team_members (
  id, name, position, role_category, photo_url, biography, creative_philosophy,
  is_producer, social_links, display_order, is_published, created_at, updated_at
) VALUES (
  'team-4',
  'Siddharth V.',
  'Head of Editorial & Post-Production',
  'Post-Production',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80',
  'Specializing in pace, emotional rhythm, and structural clarity. Siddharth supervises our finishing pipeline, color grading suites, and high-fidelity masters.',
  'Every cut is an emotional breath. The best edit is the one the viewer never detects.',
  FALSE,
  '{"linkedin":"https://linkedin.com"}'::jsonb,
  4,
  TRUE,
  '2025-01-01T00:00:00Z',
  NOW()
);
INSERT INTO public.team_members (
  id, name, position, role_category, photo_url, biography, creative_philosophy,
  is_producer, social_links, display_order, is_published, created_at, updated_at
) VALUES (
  'team-5',
  'Nisha Ramanathan',
  'Line Producer & Production Manager',
  'Executive',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  'Managing logistics, multi-unit location scheduling, international film permits, and set safety with flawless precision and calm authority.',
  'Impeccable logistical execution is the foundation upon which creative courage is built.',
  FALSE,
  '{"linkedin":"https://linkedin.com"}'::jsonb,
  5,
  TRUE,
  '2025-01-01T00:00:00Z',
  NOW()
);

-- 5. Gallery
DELETE FROM public.gallery;
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-1',
  'ARRI Cinema Camera Rig Setup',
  'Configuring custom anamorphic prime lenses for morning light sequence.',
  'Behind The Scenes',
  'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
  'landscape',
  1,
  '2025-01-01T00:00:00Z'
);
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-2',
  'Sound Stage Lighting Architecture',
  'Diffusion grid calibration on Studio Stage 2.',
  'Studio',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  'portrait',
  2,
  '2025-01-01T00:00:00Z'
);
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-3',
  'On-Location Coastal Shoot',
  'Golden hour shot coordination along the rugged shoreline.',
  'Film Production',
  'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80',
  'landscape',
  3,
  '2025-01-01T00:00:00Z'
);
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-4',
  'Director & Producer Discussion',
  'Producer Kavin reviewing shot continuity during principal photography.',
  'Team',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'landscape',
  4,
  '2025-01-01T00:00:00Z'
);
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-5',
  'Editorial Suite Conform Session',
  'High dynamic range color calibration and master timeline grading.',
  'Behind The Scenes',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  'square',
  5,
  '2025-01-01T00:00:00Z'
);
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-6',
  'High-Fashion Unit Photography',
  'Medium-format Hasselblad capture for editorial release.',
  'Photography',
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=80',
  'portrait',
  6,
  '2025-01-01T00:00:00Z'
);
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-7',
  'Gala Premiere Night',
  'Red carpet screening and live multi-camera broadcast capture.',
  'Events',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  'landscape',
  7,
  '2025-01-01T00:00:00Z'
);
INSERT INTO public.gallery (
  id, title, caption, category, image_url, aspect_ratio, display_order, created_at
) VALUES (
  'gal-8',
  'Night Exterior Grip Setup',
  'High-wattage HMI cranes simulating atmospheric moonlight in the misty valley.',
  'Film Production',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
  'landscape',
  8,
  '2025-01-01T00:00:00Z'
);

-- 6. Enquiries
DELETE FROM public.enquiries;
INSERT INTO public.enquiries (
  id, full_name, email, phone, company, project_type, project_title,
  estimated_budget, expected_timeline, project_description, reference_links,
  status, internal_notes, created_at, updated_at
) VALUES (
  'enq-1',
  'Anandhi R.',
  'anandhi@luminaheritage.com',
  '+91 98401 23456',
  'Lumina Heritage Group',
  'Advertisement',
  'Global Brand Anthem 2026',
  '$50,000 - $100,000',
  'Q2 2026',
  'We are seeking Kavin Production to produce a 60-second international brand film focusing on architectural craftsmanship and sustainable design.',
  'https://vimeo.com',
  'new',
  'High priority enquiry. Producer Kavin to schedule intro call.',
  '2025-01-15T10:30:00Z',
  '2025-01-15T10:30:00Z'
);
INSERT INTO public.enquiries (
  id, full_name, email, phone, company, project_type, project_title,
  estimated_budget, expected_timeline, project_description, reference_links,
  status, internal_notes, created_at, updated_at
) VALUES (
  'enq-2',
  'David Sterling',
  'david@sterlingmedia.co.uk',
  '+44 20 7946 0912',
  'Sterling Sound UK',
  'Music Video',
  'Echoes of London EP Visuals',
  '$25,000 - $50,000',
  'March 2026',
  'Looking for cinematic camera operators and color grading for a two-day shoot across urban exterior locations.',
  '',
  'contacted',
  'Initial deck and rate card sent via email.',
  '2025-01-12T14:15:00Z',
  '2025-01-13T09:00:00Z'
);

COMMIT;
