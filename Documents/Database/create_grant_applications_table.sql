-- ============================================
-- NISOL ENTERPRISE INTELLIGENCE GRANT PROGRAM
-- Table: grant_applications
-- Description: Stores public grant applications, internal scoring rubrics, and status tracking.
-- ============================================

CREATE TABLE IF NOT EXISTS public.grant_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Section A: Organization Details
  org_name TEXT NOT NULL,
  registration_type TEXT NOT NULL, -- e.g. 'Section 8 Company', 'Trust', 'Society', 'Educational Institution', 'Other'
  hq_location TEXT NOT NULL,
  mission_statement TEXT NOT NULL,
  
  -- Section B: Impact & Bottleneck
  problem_solved TEXT NOT NULL,
  tech_bottleneck TEXT NOT NULL,
  
  -- Section C: Partnership & Commitments
  leadership_confirmed BOOLEAN NOT NULL DEFAULT true,
  grant_use_case TEXT NOT NULL,
  amplification_pledged BOOLEAN NOT NULL DEFAULT true,
  media_reach_link TEXT,
  deck_url TEXT,
  
  -- Section D: Contact Info
  contact_name TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  
  -- Status & Cohort Lifecycle
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'shortlisted', 'awarded', 'declined')),
  grant_cohort TEXT DEFAULT '2026-Q1',
  
  -- Internal Rubric Scores (1-5 each)
  rubric_impact_score INT DEFAULT 0 CHECK (rubric_impact_score BETWEEN 0 AND 5),
  rubric_complexity_score INT DEFAULT 0 CHECK (rubric_complexity_score BETWEEN 0 AND 5),
  rubric_leadership_score INT DEFAULT 0 CHECK (rubric_leadership_score BETWEEN 0 AND 5),
  rubric_amplification_score INT DEFAULT 0 CHECK (rubric_amplification_score BETWEEN 0 AND 5),
  rubric_total_weighted INT DEFAULT 0 CHECK (rubric_total_weighted BETWEEN 0 AND 100),
  
  -- Notes & Signed Agreement
  internal_notes TEXT,
  signed_agreement_url TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  
  -- Audit Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_grant_applications_status ON public.grant_applications(status);
CREATE INDEX IF NOT EXISTS idx_grant_applications_email ON public.grant_applications(contact_email);
CREATE INDEX IF NOT EXISTS idx_grant_applications_created ON public.grant_applications(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.grant_applications ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone (Public & Authenticated) can INSERT a grant application
DROP POLICY IF EXISTS "Public can submit grant application" ON public.grant_applications;
CREATE POLICY "Public can submit grant application" ON public.grant_applications
  FOR INSERT WITH CHECK (true);

-- Policy 2: Internal users / Superadmins can view all grant applications
DROP POLICY IF EXISTS "Internal users view grant applications" ON public.grant_applications;
CREATE POLICY "Internal users view grant applications" ON public.grant_applications
  FOR SELECT USING (
    get_user_role() IN ('super_admin', 'admin', 'consultant')
  );

-- Policy 3: Only Superadmin and Admin can UPDATE grant applications
DROP POLICY IF EXISTS "Admins update grant applications" ON public.grant_applications;
CREATE POLICY "Admins update grant applications" ON public.grant_applications
  FOR UPDATE USING (
    get_user_role() IN ('super_admin', 'admin')
  ) WITH CHECK (
    get_user_role() IN ('super_admin', 'admin')
  );

-- Policy 4: Only Superadmin can DELETE grant applications
DROP POLICY IF EXISTS "Superadmin delete grant applications" ON public.grant_applications;
CREATE POLICY "Superadmin delete grant applications" ON public.grant_applications
  FOR DELETE USING (
    get_user_role() = 'super_admin'
  );
