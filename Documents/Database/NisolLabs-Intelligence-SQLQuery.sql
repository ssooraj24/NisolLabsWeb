-- ============================================
-- NISOL INTELLIGENCE - DATABASE SCHEMA SETUP
-- Step 1 of 15: Tables, Indexes, Constraints & RLS
-- (FIXED: Check constraint issue)
-- ============================================

-- ============================================
-- 0. FIX: Handle Existing Audit Statuses
-- ============================================

-- Check existing statuses (for debugging)
SELECT DISTINCT status, COUNT(*) FROM public.audits GROUP BY status;

-- Update old statuses to match new allowed values
-- Adjust these mappings based on your actual data
UPDATE public.audits SET status = 'data_collected' WHERE status IN ('completed', 'complete', 'done', 'closed');
UPDATE public.audits SET status = 'data_collection' WHERE status IN ('in_progress', 'active', 'ongoing');
UPDATE public.audits SET status = 'draft' WHERE status IN ('new', 'created', 'pending');

-- If status is NULL, set to 'draft'
UPDATE public.audits SET status = 'draft' WHERE status IS NULL;

-- Verify no invalid statuses remain
SELECT DISTINCT status FROM public.audits;

-- Drop old constraint if it exists (to be safe)
ALTER TABLE public.audits DROP CONSTRAINT IF EXISTS check_audit_status;

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Table 1: audit_reports (Stores generated AI outputs and drafts)
CREATE TABLE IF NOT EXISTS public.audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES public.audits(id) ON DELETE CASCADE,
  
  -- Metadata & Versioning
  version INT DEFAULT 1,
  status TEXT DEFAULT 'draft', -- 'draft', 'review', 'approved', 'finalized'
  
  -- 10 Core Outputs (stored as JSON/Text)
  executive_summary TEXT,
  ai_readiness_assessment JSONB,
  capability_scores JSONB,
  opportunity_matrix JSONB,
  top_use_cases JSONB,
  quick_wins_strategic_bets JSONB,
  roadmap JSONB,
  roi_estimates JSONB,
  solution_blueprints JSONB,
  proposal_draft TEXT,
  
  -- Timestamps & Tracking
  generated_at TIMESTAMPTZ DEFAULT now(),
  last_edited_at TIMESTAMPTZ DEFAULT now(),
  finalized_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table 2: solution_blueprints (Master Blueprint Library)
CREATE TABLE IF NOT EXISTS public.solution_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- e.g., 'Customer Service', 'Finance', 'IT'
  technology_stack TEXT[],
  architecture_diagram TEXT, -- Mermaid or SVG URL
  implementation_steps TEXT[],
  estimated_timeline TEXT,
  resource_requirements TEXT,
  success_metrics TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table 3: report_templates (Super Admin Report Customization)
CREATE TABLE IF NOT EXISTS public.report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  sections JSONB, -- Defines included sections & order
  styling JSONB,  -- Brand colors, fonts, logo placement
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. STATUS CONSTRAINTS (Add after data is cleaned)
-- ============================================

-- Add constraint for audits (now that data is clean)
ALTER TABLE public.audits 
  ADD CONSTRAINT check_audit_status 
  CHECK (status IN ('draft', 'data_collection', 'data_collected', 'in_analysis', 'report_ready', 'presented'));

-- Add constraint for audit_reports
ALTER TABLE public.audit_reports 
  DROP CONSTRAINT IF EXISTS check_report_status;

ALTER TABLE public.audit_reports 
  ADD CONSTRAINT check_report_status 
  CHECK (status IN ('draft', 'review', 'approved', 'finalized'));

-- ============================================
-- 3. INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_audit_reports_audit_id ON public.audit_reports(audit_id);
CREATE INDEX IF NOT EXISTS idx_audit_reports_status ON public.audit_reports(status);
CREATE INDEX IF NOT EXISTS idx_audit_reports_version ON public.audit_reports(version);
CREATE INDEX IF NOT EXISTS idx_solution_blueprints_category ON public.solution_blueprints(category);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. RLS POLICIES FOR AUDIT_REPORTS
-- ============================================

-- Internal users (Super Admin, Admin, Consultant) can view all reports
DROP POLICY IF EXISTS "Internal users view all audit reports" ON public.audit_reports;
CREATE POLICY "Internal users view all audit reports" ON public.audit_reports
  FOR SELECT USING (is_internal_user());

-- Internal users can create reports
DROP POLICY IF EXISTS "Internal users create audit reports" ON public.audit_reports;
CREATE POLICY "Internal users create audit reports" ON public.audit_reports
  FOR INSERT WITH CHECK (is_internal_user());

-- Internal users can update reports
DROP POLICY IF EXISTS "Internal users update audit reports" ON public.audit_reports;
CREATE POLICY "Internal users update audit reports" ON public.audit_reports
  FOR UPDATE USING (is_internal_user()) WITH CHECK (is_internal_user());

-- Internal users can delete reports
DROP POLICY IF EXISTS "Internal users delete audit reports" ON public.audit_reports;
CREATE POLICY "Internal users delete audit reports" ON public.audit_reports
  FOR DELETE USING (is_internal_user());

-- Clients can only view finalized reports for their tenant
DROP POLICY IF EXISTS "Clients view finalized tenant reports" ON public.audit_reports;
CREATE POLICY "Clients view finalized tenant reports" ON public.audit_reports
  FOR SELECT USING (
    status = 'finalized' AND EXISTS (
      SELECT 1 FROM public.audits
      WHERE audits.id = audit_reports.audit_id
      AND audits.tenant_id = get_user_tenant()
    )
  );

-- ============================================
-- 6. RLS POLICIES FOR SOLUTION_BLUEPRINTS
-- ============================================

-- Internal users can view all blueprints
DROP POLICY IF EXISTS "Internal users view solution blueprints" ON public.solution_blueprints;
CREATE POLICY "Internal users view solution blueprints" ON public.solution_blueprints
  FOR SELECT USING (is_internal_user());

-- Only Super Admin and Admin can manage blueprints (create, update, delete)
DROP POLICY IF EXISTS "Admins manage solution blueprints" ON public.solution_blueprints;
CREATE POLICY "Admins manage solution blueprints" ON public.solution_blueprints
  FOR ALL USING (get_user_role() IN ('super_admin', 'admin'));

-- ============================================
-- 7. RLS POLICIES FOR REPORT_TEMPLATES
-- ============================================

-- Internal users can view templates
DROP POLICY IF EXISTS "Internal users view report templates" ON public.report_templates;
CREATE POLICY "Internal users view report templates" ON public.report_templates
  FOR SELECT USING (is_internal_user());

-- Only Super Admin and Admin can manage templates
DROP POLICY IF EXISTS "Admins manage report templates" ON public.report_templates;
CREATE POLICY "Admins manage report templates" ON public.report_templates
  FOR ALL USING (get_user_role() IN ('super_admin', 'admin'));

-- ============================================
-- 8. VERIFICATION (Run after all steps)
-- ============================================

-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('audit_reports', 'solution_blueprints', 'report_templates');

-- Check constraints
SELECT constraint_name, table_name 
FROM information_schema.table_constraints 
WHERE table_schema = 'public' 
AND constraint_name IN ('check_audit_status', 'check_report_status');

-- Check RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('audit_reports', 'solution_blueprints', 'report_templates');

-- Check existing audit statuses (should only contain allowed values)
SELECT DISTINCT status, COUNT(*) 
FROM public.audits 
GROUP BY status;