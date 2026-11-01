# KAVIN PRODUCTION — Premium Cinematic OTT Platform

> **“DREAM. CREATE. ENTERTAIN.”**
> *Movies | Short Films | Concerts — “Every Frame Tells a Story.”*

Official cinematic entertainment streaming platform and production showcase for **KAVIN PRODUCTION** (in collaboration with **Be Happy Entertainment**). Inspired by premier streaming interfaces like Netflix and Prime Video, sculpted with bespoke gold-and-obsidian cinematic branding, real original video streaming, verified production credits, and responsive design.

---

## 🎬 1. Official Client Information & Verified Media

All content across the platform is verified from client assets. No mock movies, fake cast, fake awards, fake reviews, or fabricated social metrics are used.

### Official Social Profiles:
* **Instagram**: [https://www.instagram.com/be_happy_entertainment24/](https://www.instagram.com/be_happy_entertainment24/)
* **YouTube**: [https://youtube.com/@kavin_kp](https://youtube.com/@kavin_kp)

### Official Movie & Production Collection:
1. **Padikathavan**
   * *Classification*: Feature Film
   * *Status*: Released (2025)
   * *Producer*: Kavin
   * *Production Banner*: Kavin Production / Be Happy Entertainment
   * *Video Stream*: Full video playback (`/media/padikathavan.mp4`)
   * *Official Poster*: `/media/padikathavan-poster.webp`

2. **Game (Not Over)**
   * *Classification*: Feature Film
   * *Status*: Released (2025)
   * *Producer*: Kavin
   * *Production Banner*: Kavin Production / Be Happy Entertainment
   * *Video Stream*: Full video playback (`/media/game-not-over.mp4`)
   * *Official Poster*: `/media/game-poster.webp`

3. **Mudhal Kadhal**
   * *Classification*: Movie / Short Film
   * *Status*: In Production — Coming 2026
   * *Producer, Written & Directed by*: Kavin
   * *Co-Written by*: Puviyarasan
   * *AD & DOP*: Yuvan
   * *Editor*: Tharun(AT)
   * *Original Music*: Ajay Kumar
   * *Cast*: Starring Sanjith, Mehnaz Sherin, and Nagasundaram
   * *Tagline*: *“Some stories find you... First love. Lasts forever.”*
   * *Teaser Video*: `/media/mudhal-kadhal.mp4`
   * *Official Poster*: `/media/mudhal-kadhal-poster.png`

### Creative Leadership:
* **Kavin**: Founder, Producer, Director, and Sound Engineer & DJ. Background in Electronics and Communication Engineering (ECE graduate).
* *Philosophy*: *“Good Stories, Better People. Same Passion, Different Medium. Shoot, Edit, Mix, Create, Repeat. Ideas | Stories | Sound | Beyond.”*

---

## 🎨 2. Brand Identity & Design System

* **Brand Colors**:
  * Deep Cinematic Black: `#080808`
  * Dark Charcoal: `#151515`
  * Warm Cinematic Gold: `#D6AD68`
  * Secondary Accent: `#FFFFFF`
  * Soft Grey Text: `#B5B5B5`
* **Logo System**:
  * Bespoke **KP Monogram**: Intertwined 'K' pillar and golden play-button triangle framed within a film-strip perimeter with sprocket perforations.
  * Formats provided: Main Logo, Compact Icon Logo, Favicon (`/favicon.svg`), and Animated Film Countdown Intro Splash (`IntroSplash.tsx`).
* **Audio-Visual Atmosphere**:
  * Film grain texture overlay, subtle lens flares, and directional gold ambient glows.
  * Synthesized Web Audio API cinematic sub-bass thud and golden shimmer chime.

---

## 🚀 3. Features & User Experience

1. **Cinematic Intro Splash**:
   * Authentic film countdown (3 -> 2 -> 1) with rotating sweep arm, audio-synthesized cinematic chime, KP monogram reveal, and smooth fade-in to the home theater.
2. **Full-Screen OTT Hero Banner**:
   * Auto-advancing carousel with inline video stream, sound toggle (mute/unmute), animated KP logo, title metadata, and quick action buttons (*Watch Trailer*, *Explore Movies*, *Details*).
3. **Curated Content Carousels**:
   * *Our Cinematic Collection* (Client-specified showcase of all three official titles)
   * *Trending Now*
   * *Featured Movies* (Landscape poster theater)
   * *Exclusive Short Films*
   * *Upcoming Releases* (Mudhal Kadhal 2026)
   * *Most Watched*
   * *Live Concerts & DJ Entertainment* (Highlighting Kavin's Pioneer DJ sets and acoustic engineering)
4. **Cinematic Custom Video Player**:
   * Native, custom-skinned controls: Play/Pause, seeker timeline, elapsed & total duration, volume slider with mute toggle, playback speed selector (0.5x to 2x), buffering spinner, keyboard shortcuts (`Space`, `F`, `M`, `Arrow keys`, `Esc`), and fullscreen toggle.
5. **Global Search Modal**:
   * Universal search indexed across titles, tags, directors, crew, and concerts.
   * Instant category chips (*All*, *Movies*, *Short Films*, *Concerts*), keyboard shortcut (`Cmd+K` / `Ctrl+K`), and quick-play button.
6. **Dedicated Movie Details Pages (`/productions/:slug` & `/movies/:slug`)**:
   * Full-bleed hero banner, verified specs box, official synopsis, cast & crew cards with verified roles, behind-the-scenes gallery with expandable lightbox, and related movie carousel.
7. **Official Social Integrations**:
   * Dedicated YouTube section with streamable videos and direct link to `@kavin_kp`.
   * Dedicated Instagram section featuring verified title announcement stills and direct link to `@be_happy_entertainment24`.
8. **Admin CMS Management (`/admin`)**:
   * Secure portal to manage productions, media, settings, and inquiries with instant offline persistence and optional Supabase cloud synchronization.

---

## 🛠️ 4. Technology Stack

* **Core**: React 19, TypeScript, Vite, Tailwind CSS v4
* **Routing**: React Router DOM v7
* **Form Validation**: React Hook Form + Zod
* **Icons**: Lucide React + Bespoke SVGs (Instagram, YouTube, KP Monogram)
* **Backend**: Dual-mode Data Layer (Persistent LocalStorage + Supabase PostgreSQL SDK ready)

---

## 📦 5. Installation & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
```
Default keys are pre-configured with client parameters. To connect a live Supabase database:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Admin CMS Access
* **URL**: `/admin` (or click **CMS** in navigation/footer)
* **Demo Passkey**: `admin@kavinproduction.com` / `kavin@2025`

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 📋 6. Summary of Verification

* [x] All mock, fake, and placeholder content eliminated.
* [x] Only verified client information (Kavin's actual titles, background in ECE/DJ/sound engineering, official movies *Padikathavan*, *Game*, *Mudhal Kadhal*, and official Instagram & YouTube links) active across the platform.
* [x] Type-safe compilation (`npm run build` succeeds cleanly).
* [x] Fully responsive across mobile, tablet, laptop, and desktop.
