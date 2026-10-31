import { Production, ServiceItem, TeamMember, GalleryItem, CompanySettings, Enquiry } from '../types/database';

export const initialCompanySettings: CompanySettings = {
  brand_name: 'KAVIN PRODUCTION',
  tagline: 'WE CREATE. WE CAPTURE. WE TELL STORIES.',
  producer_name: 'Kavin',
  producer_title: 'Producer & Founder',
  producer_bio:
    'Kavin is a visionary producer dedicated to cinematic excellence and narrative depth. With a background spanning independent cinema, high-impact commercials, and music visuals, Kavin guides every production with meticulous attention to visual craft, emotional resonance, and uncompromised production standards.',
  producer_philosophy:
    'Every frame must serve a purpose. Great production is not merely about expensive equipment — it is about the harmony between authentic emotion, technical mastery, and courageous storytelling.',
  producer_photo_url:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  company_about:
    'Kavin Production is a creative media production company focused on transforming ideas into meaningful visual experiences. From concept development to final delivery, we bring creativity, technical expertise, and passion to every project.',
  mission_statement:
    'To pioneer compelling visual storytelling by blending cinematic craft with modern production technologies, creating media that moves audiences and elevates brands globally.',
  vision_statement:
    'To become an internationally recognized creative studio renowned for uncompromising quality, artistic integrity, and innovative production solutions.',
  contact_email: 'contact@kavinproduction.com',
  contact_phone: '+91 (0) 44 2847 9000',
  office_address: 'Studio 4, Film City Avenue, Creative Quarter, Chennai, India',
  working_hours: 'Monday – Friday: 09:00 AM – 07:00 PM (IST)',
  instagram_url: 'https://instagram.com/kavinproduction',
  youtube_url: 'https://youtube.com/@kavinproduction',
  facebook_url: 'https://facebook.com/kavinproduction',
  linkedin_url: 'https://linkedin.com/company/kavinproduction',
  meta_title: 'KAVIN PRODUCTION — We Create. We Capture. We Tell Stories.',
  meta_description:
    'Official website of Kavin Production. Premium media production studio specializing in feature films, commercials, music videos, and creative cinematography.',
};

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'film-production',
    title: 'Film Production',
    category: 'Cinema',
    tagline: 'End-to-end cinematic storytelling for the silver screen.',
    short_description:
      'Full-scale feature film production services from script development, location scouting, casting, and principal photography to world-class delivery.',
    description:
      'We bring original cinematic stories to life with world-class production infrastructure. Whether developing an independent feature or a high-concept studio project, our team manages script supervision, casting, line production, location permits, camera departments, and set logistics.',
    image_url:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: [
      'Script Analysis & Feasibility',
      'Budgeting & Line Production',
      'Principal Photography & Direction',
      'Theatrical Master Delivery',
    ],
    deliverables: ['DCP Theatrical Package', 'ProRes 4444 Master', 'Promotional EPK & Teasers'],
    is_published: true,
    display_order: 1,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-2',
    slug: 'short-film-production',
    title: 'Short Film Production',
    category: 'Cinema',
    tagline: 'Impactful narratives crafted with precision and festival ambition.',
    short_description:
      'Compelling short-form cinema designed for international film festivals, digital showcases, and visionary storytellers.',
    description:
      'Short films require unparalleled narrative economy. We work closely with visionary writers and directors to crystallize ideas, manage intimate crew setups, and produce award-worthy cinema capable of competing on global festival circuits.',
    image_url:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Narrative Polish & Casting', 'Production Design & Logistics', 'Cinematography', 'Festival Cut & Grade'],
    deliverables: ['4K Festival Deliverable', 'Poster & Press Kit', 'Digital Screening Masters'],
    is_published: true,
    display_order: 2,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-3',
    slug: 'music-video-production',
    title: 'Music Video Production',
    category: 'Music',
    tagline: 'Electrifying visual concepts synchronized with rhythm and soul.',
    short_description:
      'Distinctive visual identities for recording artists, record labels, and independent musicians.',
    description:
      'From moody performance videos to choreographed narrative journeys, we synchronize evocative lighting, dynamic camera movement, and cutting-edge visual pacing to turn tracks into unforgettable visual anthems.',
    image_url:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Treatment & Creative Pitch', 'Choreography & Set Construction', 'High-Speed Camera Capture', 'Rhythmic Edit & Color Grade'],
    deliverables: ['4K UHD Music Video', 'Vertical Teasers for Reels/TikTok', 'Clean & Explicit Masters'],
    is_published: true,
    display_order: 3,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-4',
    slug: 'advertisement-production',
    title: 'Advertisement Production',
    category: 'Commercial',
    tagline: 'High-conversion commercial films that command audience attention.',
    short_description:
      'Television commercials and high-impact digital advertisements engineered to elevate brand prestige and drive action.',
    description:
      'We combine commercial strategy with cinematic aesthetics. Working closely with advertising agencies and brand directors, our commercials present products with arresting beauty and emotional clarity.',
    image_url:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Creative Brief & Storyboarding', 'Talent Casting & Art Direction', 'Precision Lighting & Shooting', 'VFX, Sound & Broadcast QC'],
    deliverables: ['TVC 30s & 15s Broadcast Cuts', 'Multi-ratio Digital Cuts (16:9, 9:16, 1:1)', 'High-Res Stills Package'],
    is_published: true,
    display_order: 4,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-5',
    slug: 'corporate-video-production',
    title: 'Corporate Video Production',
    category: 'Corporate',
    tagline: 'Humanizing enterprise narratives with sophistication.',
    short_description:
      'Executive profiles, company milestone films, investor presentations, and culture showcases.',
    description:
      'Move beyond mundane corporate communications. We capture the true spirit of enterprise leaders, employees, and groundbreaking technology with cinematic camera techniques and naturalistic interviews.',
    image_url:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Executive Discovery & Pre-interview', 'Multi-location Film Logistics', 'Dynamic B-Roll & Visuals', 'Soundtrack Scored & Final Delivery'],
    deliverables: ['Keynote Video Files', 'Internal Town Hall Master', 'Social Edit Highlights'],
    is_published: true,
    display_order: 5,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-6',
    slug: 'event-video-production',
    title: 'Event Video Production',
    category: 'Events',
    tagline: 'Immortalizing live moments and grand milestones.',
    short_description:
      'Multi-camera event coverage, awards ceremonies, product launches, and retrospective highlights.',
    description:
      'We deploy nimble, experienced camera units to document conferences, luxury galas, concerts, and brand experiences. Real-time footage management ensures same-day teasers and comprehensive recap films.',
    image_url:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Venue Walkthrough & Signal Mapping', 'Multi-camera Crew Deployment', 'Live Audio Recording & Switching', 'Post-Event Highlight Cut'],
    deliverables: ['Same-Day Social Recap', 'Full-Length Archive Cut', 'Keynote Excerpt Packages'],
    is_published: true,
    display_order: 6,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-7',
    slug: 'photography',
    title: 'Photography',
    category: 'Stills',
    tagline: 'Timeless still imagery captured with editorial sensibility.',
    short_description:
      'High-fashion, unit stills, architectural, portraiture, and commercial product photography.',
    description:
      'Our dedicated photographers understand that every still image must tell an entire story in a single fraction of a second. Using Hasselblad and medium format setups, we craft imagery that commands billboards and editorial spreads.',
    image_url:
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Moodboard & Lighting Design', 'On-location or Studio Shoot', 'Tethered Real-time Review', 'High-end Beauty & Tone Retouching'],
    deliverables: ['Ultra High-Res TIFF & JPEG', 'Color-matched Web Exports', 'Print-ready CMYK Files'],
    is_published: true,
    display_order: 7,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-8',
    slug: 'cinematography',
    title: 'Cinematography',
    category: 'Craft',
    tagline: 'Mastery of light, lens optics, and movement.',
    short_description:
      'Director of Photography services utilizing ARRI, RED, and anamorphic optical glass.',
    description:
      'Light is our brush and camera movement is our rhythm. Our cinematographers bring deep technical proficiency in color science, anamorphic lens character, gimbal operations, and dramatic scene lighting.',
    image_url:
      'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Look Development & Camera Testing', 'Lighting Diagrams & Rigging', 'On-set DIT & Exposure Management', 'Color Science Collaboration'],
    deliverables: ['Raw Cinema Footage with DIT Backups', 'LUT Pack Developed For Project', 'Cinematography Notes'],
    is_published: true,
    display_order: 8,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-9',
    slug: 'creative-direction',
    title: 'Creative Direction',
    category: 'Creative',
    tagline: 'Guiding the overarching artistic vision and aesthetic tone.',
    short_description:
      'World-building, visual identity concepts, moodboards, and narrative consultation.',
    description:
      'Before a single camera rolls, we define the aesthetic soul of the piece. Our creative directors establish the color schemes, costume design guidelines, architectural environments, and emotional cadence.',
    image_url:
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Vision Alignment Workshop', 'Lookbook & Concept Deck Creation', 'Departmental Alignment', 'Art Direction Supervision'],
    deliverables: ['Comprehensive Creative Deck', 'Color Palette & Texture Guide', 'Director Treatment'],
    is_published: true,
    display_order: 9,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-10',
    slug: 'digital-media-production',
    title: 'Digital Media Production',
    category: 'Digital',
    tagline: 'Dynamic digital assets built for connected audiences.',
    short_description:
      'Streaming media, web series, digital shorts, interactive media, and podcast video productions.',
    description:
      'Digital audiences demand freshness without sacrificing production value. We produce episodic content, live interactive broadcasts, and podcast studio streams with broadcast-grade fidelity.',
    image_url:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Format Structuring & Pilot', 'Multi-camera Studio Recording', 'Real-time Graphics Integration', 'Multi-platform Optimization'],
    deliverables: ['Full Length 4K Episodes', 'Short-form Clips with Subtitles', 'Audio Masters for Spotify/Apple'],
    is_published: true,
    display_order: 10,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-11',
    slug: 'video-editing',
    title: 'Video Editing',
    category: 'Post-Production',
    tagline: 'Pacing, rhythm, and editorial cohesion.',
    short_description:
      'Non-linear editing for features, documentaries, commercials, and high-tempo music videos.',
    description:
      'Editing is where the story is truly rewritten. Our editors sculpt the pacing, structure narrative tension, and ensure seamless continuity across complex multi-camera storylines.',
    image_url:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Footage Ingest & Assembly Cut', 'Rough Cut & Director Collaboration', 'Fine Cut & Pacing Lock', 'Conform & Export'],
    deliverables: ['Locked Offline Cut', 'EDL/XML Turnovers for Sound & Color', 'Screening Watermarked Files'],
    is_published: true,
    display_order: 11,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-12',
    slug: 'post-production',
    title: 'Post Production',
    category: 'Post-Production',
    tagline: 'Finishing suites: color grading, VFX, sound design, and mastering.',
    short_description:
      'DaVinci Resolve color grading, cinematic sound design, motion graphics, and QC mastering.',
    description:
      'A true end-to-end post house experience. From subtle beauty cleanups and compositing to Dolby Atmos audio mixing and ACES color grading calibrated on calibrated OLED reference monitors.',
    image_url:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Color Grading & Tone Curves', 'Foley & Sound Design', 'Visual Effects & Cleanups', 'Dolby / Streaming Quality Control'],
    deliverables: ['Final Master (ProRes 4444 XQ)', '5.1 & Stereo Mix Deliverables', 'Clean Textless Master'],
    is_published: true,
    display_order: 12,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-13',
    slug: 'promotional-content',
    title: 'Promotional Content',
    category: 'Marketing',
    tagline: 'Teasers, trailers, and promo reels that ignite anticipation.',
    short_description:
      'High-energy promotional packages designed to build pre-launch buzz for projects and launches.',
    description:
      'Every release needs hype. We create dramatic teasers, behind-the-scenes sizzle reels, and promotional mini-docs that build irresistible momentum ahead of your premiere.',
    image_url:
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Hook Strategy & Cue Selection', 'Rapid Cut Editing', 'Epic Sound Design & Risers', 'Multi-format Exports'],
    deliverables: ['Official Theatrical Trailer', '15s & 30s Promo Cutdowns', 'Press Screener Assets'],
    is_published: true,
    display_order: 13,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-14',
    slug: 'brand-films',
    title: 'Brand Films',
    category: 'Commercial',
    tagline: 'Elevating company ethos into cinematic art.',
    short_description:
      'Emotional, authentic short documentaries and manifesto films that define modern brands.',
    description:
      'A brand film does not push features — it creates cultural resonance. We capture founders, craftsmen, and global movements with cinematic reverence, building unforgettable brand loyalty.',
    image_url:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Brand Philosophy Immersion', 'Casting Real Protagonists', 'Cinematic On-location Shoot', 'Orchestral Scoring & Finish'],
    deliverables: ['Full Brand Manifesto Film (3-5 min)', '60s Anthem Cut', 'Executive Quote Assets'],
    is_published: true,
    display_order: 14,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-15',
    slug: 'social-media-content',
    title: 'Social Media Content',
    category: 'Social',
    tagline: 'Premium native video tailored for algorithms and eyes.',
    short_description:
      'Vertical 9:16 cinematic reels, episodic series, and dynamic trend adaptations.',
    description:
      'We bring film-grade cameras, lighting, and sound into the mobile vertical format. Create content that stops the endless scroll and feels inherently artistic yet natively social.',
    image_url:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    workflow_steps: ['Batch Content Planning', 'Vertical Cinematography Sprint', 'Fast Turnaround Editing', 'Graphic Overlays & Motion Text'],
    deliverables: ['Batch of 10-20 Vertical Reels', 'Thumbnail Stills', 'Optimized Captions & Audio Tracks'],
    is_published: true,
    display_order: 15,
    created_at: '2025-01-01T00:00:00Z',
  },
];

export const initialProductions: Production[] = [
  {
    id: 'prod-1',
    slug: 'the-last-echo',
    title: 'The Last Echo',
    category: 'Feature Films',
    year: 2025,
    short_description:
      'A poignant psychological mystery set against the misty foothills of the Western Ghats.',
    description:
      'When an antique sound recordist stumbles upon an undocumented acoustic phenomenon deep within an abandoned colonial tea estate, he begins unearthing secrets that challenge his perception of grief and memory. Shot entirely on ARRI Alexa Mini LF with vintage Cooke Panchro lenses.',
    poster_url:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    cover_url:
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    director: 'Aravind Swaminathan',
    producer: 'Kavin',
    cinematographer: 'Rahul Menon',
    editor: 'Siddharth V.',
    cast_and_crew: 'Starring Mohan Kumar, Priya Darshini, and Victor Bannerjee.',
    credits: [
      { role: 'Producer', name: 'Kavin' },
      { role: 'Director', name: 'Aravind Swaminathan' },
      { role: 'Director of Photography', name: 'Rahul Menon' },
      { role: 'Lead Editor', name: 'Siddharth V.' },
      { role: 'Original Score', name: 'Marcus Sterling' },
      { role: 'Sound Design', name: 'Kavin Sound Lab' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Completed',
    is_published: true,
    is_featured: true,
    created_at: '2025-01-10T00:00:00Z',
    updated_at: '2025-01-10T00:00:00Z',
  },
  {
    id: 'prod-2',
    slug: 'chroma-rhythm',
    title: 'Chroma: Symphony of Light',
    category: 'Music Videos',
    year: 2024,
    short_description:
      'A visually mesmerizing blend of choreography, anamorphic flares, and neon reflections.',
    description:
      'Produced for electronic music sensation Elysian, Chroma explores human connection through chromatic wavelength transitions and bespoke motorized camera rigs. Featured across top international visual platforms.',
    poster_url:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    cover_url:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    director: 'Meera Raghav',
    producer: 'Kavin',
    cinematographer: 'Rahul Menon',
    editor: 'Preethi Nair',
    cast_and_crew: 'Featuring The Kinetic Dance Collective.',
    credits: [
      { role: 'Producer', name: 'Kavin' },
      { role: 'Director', name: 'Meera Raghav' },
      { role: 'Cinematographer', name: 'Rahul Menon' },
      { role: 'Choreography', name: 'Elena Rostova' },
      { role: 'Colorist', name: 'Kavin Post Studio' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Released',
    is_published: true,
    is_featured: true,
    created_at: '2024-11-15T00:00:00Z',
    updated_at: '2024-11-15T00:00:00Z',
  },
  {
    id: 'prod-3',
    slug: 'aurora-motors-zenith',
    title: 'Zenith: The Electric Frontier',
    category: 'Commercial Advertisements',
    year: 2025,
    short_description:
      'A cinematic commercial capturing luxury performance and sustainable engineering.',
    description:
      'Filmed across coastal cliffs and wind farm highways, this national commercial for Zenith combines pursuit-vehicle tracking, high-speed Russian arm sequences, and photorealistic motion design.',
    poster_url:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    cover_url:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    director: 'Kavin',
    producer: 'Kavin',
    cinematographer: 'Rahul Menon',
    editor: 'Siddharth V.',
    cast_and_crew: 'Production services by Kavin Production Automotive Unit.',
    credits: [
      { role: 'Executive Producer', name: 'Kavin' },
      { role: 'Director', name: 'Kavin' },
      { role: 'Camera Operator (Pursuit)', name: 'Arjun Das' },
      { role: 'Sound Design & Mix', name: 'Audio Craft Lab' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Released',
    is_published: true,
    is_featured: true,
    created_at: '2025-01-05T00:00:00Z',
    updated_at: '2025-01-05T00:00:00Z',
  },
  {
    id: 'prod-4',
    slug: 'shadows-of-cochin',
    title: 'Shadows of Cochin',
    category: 'Short Films',
    year: 2024,
    short_description:
      'An intimate narrative of a harbor fisherman discovering an ancient brass chest.',
    description:
      'Official Selection at multiple international film festivals. A lyrical meditation on heritage, coastal ecology, and the unspoken bonds between generations along the Malabar coast.',
    poster_url:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    cover_url:
      'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1600&q=80',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    director: 'Kiran Mohan',
    producer: 'Kavin',
    cinematographer: 'Deepak Varma',
    editor: 'Siddharth V.',
    cast_and_crew: 'Cast: K. T. Joseph, Ananya Nair, Babu Antony.',
    credits: [
      { role: 'Producer', name: 'Kavin' },
      { role: 'Director', name: 'Kiran Mohan' },
      { role: 'Cinematography', name: 'Deepak Varma' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Completed',
    is_published: true,
    is_featured: false,
    created_at: '2024-08-20T00:00:00Z',
    updated_at: '2024-08-20T00:00:00Z',
  },
  {
    id: 'prod-5',
    slug: 'lumina-heritage',
    title: 'Lumina: Master of Architecture',
    category: 'Corporate Films',
    year: 2024,
    short_description:
      'An architectural documentary celebrating sustainable structural engineering.',
    description:
      'Commissioned by Lumina Design Group, this film documents the construction of the award-winning Terra Pavilion. Through drone photogrammetry and time-lapse cinematography, we showcase raw materials transforming into living art.',
    poster_url:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    cover_url:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    director: 'Sujith George',
    producer: 'Kavin',
    cinematographer: 'Rahul Menon',
    editor: 'Preethi Nair',
    cast_and_crew: 'Interviewees: Principal Architects of Studio Terra.',
    credits: [
      { role: 'Producer', name: 'Kavin' },
      { role: 'Director', name: 'Sujith George' },
      { role: 'Drone Pilot & DP', name: 'Vikram Joshi' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Released',
    is_published: true,
    is_featured: false,
    created_at: '2024-06-12T00:00:00Z',
    updated_at: '2024-06-12T00:00:00Z',
  },
  {
    id: 'prod-6',
    slug: 'the-solitary-craftsman',
    title: 'The Solitary Craftsman',
    category: 'Brand Films',
    year: 2024,
    short_description:
      'An artisanal timepiece maker’s quiet devotion to micro-precision.',
    description:
      'A brand anthem celebrating patience, hand craftsmanship, and uncompromising passion. Extreme macro cinematography highlights gears no thicker than a human hair.',
    poster_url:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    cover_url:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=80',
    youtube_trailer_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    director: 'Kavin',
    producer: 'Kavin',
    cinematographer: 'Deepak Varma',
    editor: 'Siddharth V.',
    cast_and_crew: 'Narrated by David Vance.',
    credits: [
      { role: 'Director & Producer', name: 'Kavin' },
      { role: 'Macro Cinematography', name: 'Deepak Varma' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Released',
    is_published: true,
    is_featured: true,
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-04-01T00:00:00Z',
  },
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Kavin',
    position: 'Producer & Founder',
    role_category: 'Executive',
    photo_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    biography:
      'As the founding producer of Kavin Production, Kavin leads all creative productions with a commitment to artistic integrity, pristine visual fidelity, and storytelling that resonates deeply with audiences.',
    creative_philosophy:
      'We do not produce mere content; we build cinematic experiences that linger long after the lights come up.',
    is_producer: true,
    social_links: {
      instagram: 'https://instagram.com/kavinproduction',
      linkedin: 'https://linkedin.com/in/kavin-producer',
      imdb: 'https://imdb.com',
    },
    display_order: 1,
    is_published: true,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'team-2',
    name: 'Aravind Swaminathan',
    position: 'Creative Director & Film Director',
    role_category: 'Direction',
    photo_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    biography:
      'With over a decade directing dramatic narrative cinema and premium commercials, Aravind guides the creative vision from script formulation to screen execution.',
    creative_philosophy: 'A director’s primary role is to create a safe harbor where truth can emerge in front of the lens.',
    is_producer: false,
    social_links: {
      linkedin: 'https://linkedin.com',
      imdb: 'https://imdb.com',
    },
    display_order: 2,
    is_published: true,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'team-3',
    name: 'Rahul Menon',
    position: 'Director of Photography',
    role_category: 'Cinematography',
    photo_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
    biography:
      'A master of natural lighting, anamorphic glass, and fluid camera movement. Rahul brings rich atmospheric depth to every film produced at Kavin Production.',
    creative_philosophy: 'Lighting is not about illuminating a subject; it is about choosing what to conceal in darkness.',
    is_producer: false,
    social_links: {
      instagram: 'https://instagram.com',
      imdb: 'https://imdb.com',
    },
    display_order: 3,
    is_published: true,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'team-4',
    name: 'Siddharth V.',
    position: 'Head of Editorial & Post-Production',
    role_category: 'Post-Production',
    photo_url:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80',
    biography:
      'Specializing in pace, emotional rhythm, and structural clarity. Siddharth supervises our finishing pipeline, color grading suites, and high-fidelity masters.',
    creative_philosophy: 'Every cut is an emotional breath. The best edit is the one the viewer never detects.',
    is_producer: false,
    social_links: {
      linkedin: 'https://linkedin.com',
    },
    display_order: 4,
    is_published: true,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'team-5',
    name: 'Nisha Ramanathan',
    position: 'Line Producer & Production Manager',
    role_category: 'Executive',
    photo_url:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    biography:
      'Managing logistics, multi-unit location scheduling, international film permits, and set safety with flawless precision and calm authority.',
    creative_philosophy: 'Impeccable logistical execution is the foundation upon which creative courage is built.',
    is_producer: false,
    social_links: {
      linkedin: 'https://linkedin.com',
    },
    display_order: 5,
    is_published: true,
    created_at: '2025-01-01T00:00:00Z',
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'ARRI Cinema Camera Rig Setup',
    caption: 'Configuring custom anamorphic prime lenses for morning light sequence.',
    category: 'Behind The Scenes',
    image_url:
      'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    display_order: 1,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'gal-2',
    title: 'Sound Stage Lighting Architecture',
    caption: 'Diffusion grid calibration on Studio Stage 2.',
    category: 'Studio',
    image_url:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'portrait',
    display_order: 2,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'gal-3',
    title: 'On-Location Coastal Shoot',
    caption: 'Golden hour shot coordination along the rugged shoreline.',
    category: 'Film Production',
    image_url:
      'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    display_order: 3,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'gal-4',
    title: 'Director & Producer Discussion',
    caption: 'Producer Kavin reviewing shot continuity during principal photography.',
    category: 'Team',
    image_url:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    display_order: 4,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'gal-5',
    title: 'Editorial Suite Conform Session',
    caption: 'High dynamic range color calibration and master timeline grading.',
    category: 'Behind The Scenes',
    image_url:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'square',
    display_order: 5,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'gal-6',
    title: 'High-Fashion Unit Photography',
    caption: 'Medium-format Hasselblad capture for editorial release.',
    category: 'Photography',
    image_url:
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'portrait',
    display_order: 6,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'gal-7',
    title: 'Gala Premiere Night',
    caption: 'Red carpet screening and live multi-camera broadcast capture.',
    category: 'Events',
    image_url:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    display_order: 7,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'gal-8',
    title: 'Night Exterior Grip Setup',
    caption: 'High-wattage HMI cranes simulating atmospheric moonlight in the misty valley.',
    category: 'Film Production',
    image_url:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    display_order: 8,
    created_at: '2025-01-01T00:00:00Z',
  },
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    full_name: 'Anandhi R.',
    email: 'anandhi@luminaheritage.com',
    phone: '+91 98401 23456',
    company: 'Lumina Heritage Group',
    project_type: 'Advertisement',
    project_title: 'Global Brand Anthem 2026',
    estimated_budget: '$50,000 - $100,000',
    expected_timeline: 'Q2 2026',
    project_description:
      'We are seeking Kavin Production to produce a 60-second international brand film focusing on architectural craftsmanship and sustainable design.',
    reference_links: 'https://vimeo.com',
    status: 'new',
    internal_notes: 'High priority enquiry. Producer Kavin to schedule intro call.',
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T10:30:00Z',
  },
  {
    id: 'enq-2',
    full_name: 'David Sterling',
    email: 'david@sterlingmedia.co.uk',
    phone: '+44 20 7946 0912',
    company: 'Sterling Sound UK',
    project_type: 'Music Video',
    project_title: 'Echoes of London EP Visuals',
    estimated_budget: '$25,000 - $50,000',
    expected_timeline: 'March 2026',
    project_description:
      'Looking for cinematic camera operators and color grading for a two-day shoot across urban exterior locations.',
    reference_links: '',
    status: 'contacted',
    internal_notes: 'Initial deck and rate card sent via email.',
    created_at: '2025-01-12T14:15:00Z',
    updated_at: '2025-01-13T09:00:00Z',
  },
];
