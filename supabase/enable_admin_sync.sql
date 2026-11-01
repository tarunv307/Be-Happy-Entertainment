-- Allow web client to read and write all platform data seamlessly
BEGIN;

-- 1. COMPANY SETTINGS
DROP POLICY IF EXISTS "Only admins can update company settings" ON public.company_settings;
DROP POLICY IF EXISTS "Public can view company settings" ON public.company_settings;
DROP POLICY IF EXISTS "Allow all on company_settings" ON public.company_settings;
CREATE POLICY "Allow all on company_settings" ON public.company_settings FOR ALL TO public USING (true) WITH CHECK (true);

-- 2. PRODUCTIONS
DROP POLICY IF EXISTS "Admins have full access to productions" ON public.productions;
DROP POLICY IF EXISTS "Public can view published productions" ON public.productions;
DROP POLICY IF EXISTS "Allow all on productions" ON public.productions;
CREATE POLICY "Allow all on productions" ON public.productions FOR ALL TO public USING (true) WITH CHECK (true);

-- 3. SERVICES
DROP POLICY IF EXISTS "Admins have full access to services" ON public.services;
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
DROP POLICY IF EXISTS "Allow all on services" ON public.services;
CREATE POLICY "Allow all on services" ON public.services FOR ALL TO public USING (true) WITH CHECK (true);

-- 4. TEAM MEMBERS
DROP POLICY IF EXISTS "Admins have full access to team members" ON public.team_members;
DROP POLICY IF EXISTS "Public can view published team members" ON public.team_members;
DROP POLICY IF EXISTS "Allow all on team_members" ON public.team_members;
CREATE POLICY "Allow all on team_members" ON public.team_members FOR ALL TO public USING (true) WITH CHECK (true);

-- 5. GALLERY
DROP POLICY IF EXISTS "Admins have full access to gallery" ON public.gallery;
DROP POLICY IF EXISTS "Public can view gallery" ON public.gallery;
DROP POLICY IF EXISTS "Allow all on gallery" ON public.gallery;
CREATE POLICY "Allow all on gallery" ON public.gallery FOR ALL TO public USING (true) WITH CHECK (true);

-- 6. ENQUIRIES
DROP POLICY IF EXISTS "Only admins can view and manage enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Public can submit enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow all on enquiries" ON public.enquiries;
CREATE POLICY "Allow all on enquiries" ON public.enquiries FOR ALL TO public USING (true) WITH CHECK (true);

COMMIT;
