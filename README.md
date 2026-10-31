# KAVIN PRODUCTION — Official Cinematic Media Production Website

> **“WE CREATE. WE CAPTURE. WE TELL STORIES.”**

Kavin Production is a complete, production-ready web application for an elite creative media production house led by Producer Kavin. The website features a strict light-themed editorial aesthetic, dynamic production portfolio, project inquiry system, and a comprehensive, fully functional CMS Admin Dashboard powered by Supabase.

---

## 🎨 Visual Identity & Brand Design System

* **Strict Light Theme Only**:
  * Main Background: `#FFFFFF`
  * Secondary Background: `#F7F6F3`
  * Primary Typography: `#171717`
  * Secondary Typography: `#777777`
  * Gold Accent: `#B69A65`
  * Editorial Border: `#E9E7E2`
  * Dark Footer: `#171717`
* **Typography**: *Plus Jakarta Sans*, *Playfair Display* (Editorial headings), and *Cinzel* (Cinematic wordmarks).
* **Cinematic Aesthetic**: High-contrast still imagery, subtle film-grain grid accents, natural aspect ratios, and refined typography without AI gradients or neon clutter.

---

## ⚡ Technology Stack

* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7, Lucide React
* **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Storage, Auth)
* **Form Validation**: React Hook Form + Zod validation schemas
* **Architecture**: Context API with seamless dual-mode capability (works with live Supabase or instant offline-first persistent local storage)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Supabase project credentials (optional for testing, as local mock mode runs automatically out of the box):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🔐 Admin CMS Portal

* **URL Route**: `/admin` (or `/admin/login`)
* **Default Studio Credentials**:
  * **Email**: `admin@kavinproduction.com`
  * **Password**: `kavin@2025`

### CMS Features:
1. **Dashboard Home**: Live metrics on total productions, published works, active enquiries, pending reviews, and recent submissions.
2. **Production Management**: Full CRUD for feature films, music videos, commercials, and short films. Supports poster/cover uploads, video links, YouTube trailer previews, credits, and draft/publish toggles.
3. **Service Management**: Full CRUD for all 15 media production disciplines, workflow steps, deliverables, and display ordering.
4. **Team Management**: Manage roster profiles, roles (Executive, Direction, Cinematography, Post-Production, Crew), biographies, and Producer Kavin spotlight.
5. **Gallery Management**: Organize behind-the-scenes photography, soundstage setups, and on-location unit stills into categories with lightbox support.
6. **Project Inquiries**: Inspect client briefs with full confidentiality, update statuses (*New*, *Contacted*, *In Progress*, *Completed*), add internal production notes, and remove spam.
7. **Website Settings**: Live updates to brand tagline, producer biography & philosophy, contact information, social links, and SEO metadata.

---

## 🗄️ Database Architecture & Supabase SQL Setup

A complete SQL migration script is provided in:
`supabase/migrations/20250101000000_init.sql`

To apply to your Supabase project:
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Go to the **SQL Editor**.
3. Paste the contents of `supabase/migrations/20250101000000_init.sql` and run.
4. All 8 tables (`profiles`, `productions`, `production_categories`, `services`, `team_members`, `gallery`, `enquiries`, `company_settings`) with Row Level Security (RLS) policies will be automatically provisioned.

---

## 📦 Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License & Intellectual Property
© Kavin Production. All rights reserved.
# kavin-production-
