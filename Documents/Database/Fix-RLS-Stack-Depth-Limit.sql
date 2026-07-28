-- ============================================================================
-- NISOL LABS - FIX FOR SUPABASE RLS STACK DEPTH LIMIT EXCEEDED ERROR
-- File: Documents/Database/Fix-RLS-Stack-Depth-Limit.sql
-- Description:
--   Fixes infinite recursion in Supabase Row Level Security (RLS) policies.
--   Helper functions (is_internal_user, get_user_role, get_user_tenant) are
--   re-created with `SECURITY DEFINER` and `SET search_path = public`.
--   This allows helper functions to bypass RLS when reading public.profiles,
--   stopping infinite policy recursion across all tables.
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: RE-CREATE HELPER FUNCTIONS WITH SECURITY DEFINER
-- ============================================================================

-- Function 1: Get User Role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Function 2: Get User Tenant ID
CREATE OR REPLACE FUNCTION public.get_user_tenant()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid();
$$;

-- Function 3: Check if User is Internal (Super Admin, Admin, Consultant)
CREATE OR REPLACE FUNCTION public.is_internal_user()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role IN ('super_admin', 'admin', 'consultant') FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- Grant execution to authenticated users & anon
GRANT EXECUTE ON FUNCTION public.get_user_role() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_user_tenant() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.is_internal_user() TO authenticated, anon;


-- ============================================================================
-- STEP 2: RE-APPLY RLS POLICIES FOR PROFILES TABLE
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid() OR public.is_internal_user());

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());


-- ============================================================================
-- STEP 3: RE-APPLY RLS POLICIES FOR TENANTS TABLE
-- ============================================================================

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Internal users see all tenants" ON public.tenants;
CREATE POLICY "Internal users see all tenants" ON public.tenants
  FOR SELECT USING (public.is_internal_user());

DROP POLICY IF EXISTS "Clients see own tenant" ON public.tenants;
CREATE POLICY "Clients see own tenant" ON public.tenants
  FOR SELECT USING (id = public.get_user_tenant());

DROP POLICY IF EXISTS "Internal users manage tenants" ON public.tenants;
CREATE POLICY "Internal users manage tenants" ON public.tenants
  FOR ALL USING (public.is_internal_user());


-- ============================================================================
-- STEP 4: RE-APPLY RLS POLICIES FOR AUDITS TABLE
-- ============================================================================

ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Internal users see all audits" ON public.audits;
CREATE POLICY "Internal users see all audits" ON public.audits
  FOR SELECT USING (public.is_internal_user());

DROP POLICY IF EXISTS "Clients read-only own audits" ON public.audits;
CREATE POLICY "Clients read-only own audits" ON public.audits
  FOR SELECT USING (tenant_id = public.get_user_tenant());

DROP POLICY IF EXISTS "Internal users create audits" ON public.audits;
CREATE POLICY "Internal users create audits" ON public.audits
  FOR INSERT WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS "Internal users update audits" ON public.audits;
CREATE POLICY "Internal users update audits" ON public.audits
  FOR UPDATE USING (public.is_internal_user()) WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS "Internal users delete audits" ON public.audits;
CREATE POLICY "Internal users delete audits" ON public.audits
  FOR DELETE USING (public.is_internal_user());


-- ============================================================================
-- STEP 5: RE-APPLY RLS POLICIES FOR AUDIT_MATURITY_SCORES TABLE
-- ============================================================================

ALTER TABLE public.audit_maturity_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view scores via audit" ON public.audit_maturity_scores;
CREATE POLICY "Users can view scores via audit" ON public.audit_maturity_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audits 
      WHERE audits.id = audit_maturity_scores.audit_id 
      AND (public.is_internal_user() OR audits.tenant_id = public.get_user_tenant())
    )
  );

DROP POLICY IF EXISTS "Internal users manage scores" ON public.audit_maturity_scores;
CREATE POLICY "Internal users manage scores" ON public.audit_maturity_scores
  FOR ALL USING (public.is_internal_user());


-- ============================================================================
-- STEP 6: RE-APPLY RLS POLICIES FOR QUESTIONS TABLE
-- ============================================================================

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read questions" ON public.questions;
CREATE POLICY "Anyone can read questions" ON public.questions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage questions" ON public.questions;
CREATE POLICY "Admins manage questions" ON public.questions
  FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin'));


-- ============================================================================
-- STEP 7: RE-APPLY RLS POLICIES FOR AUDIT_REPORTS TABLE
-- ============================================================================

ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Internal users view all audit reports" ON public.audit_reports;
CREATE POLICY "Internal users view all audit reports" ON public.audit_reports
  FOR SELECT USING (public.is_internal_user());

DROP POLICY IF EXISTS "Internal users create audit reports" ON public.audit_reports;
CREATE POLICY "Internal users create audit reports" ON public.audit_reports
  FOR INSERT WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS "Internal users update audit reports" ON public.audit_reports;
CREATE POLICY "Internal users update audit reports" ON public.audit_reports
  FOR UPDATE USING (public.is_internal_user()) WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS "Internal users delete audit reports" ON public.audit_reports;
CREATE POLICY "Internal users delete audit reports" ON public.audit_reports
  FOR DELETE USING (public.is_internal_user());

DROP POLICY IF EXISTS "Clients view finalized tenant reports" ON public.audit_reports;
CREATE POLICY "Clients view finalized tenant reports" ON public.audit_reports
  FOR SELECT USING (
    status = 'finalized' AND EXISTS (
      SELECT 1 FROM public.audits
      WHERE audits.id = audit_reports.audit_id
      AND audits.tenant_id = public.get_user_tenant()
    )
  );


-- ============================================================================
-- STEP 8: RE-APPLY RLS POLICIES FOR SOLUTION_BLUEPRINTS TABLE
-- ============================================================================

ALTER TABLE public.solution_blueprints ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Internal users view solution blueprints" ON public.solution_blueprints;
CREATE POLICY "Internal users view solution blueprints" ON public.solution_blueprints
  FOR SELECT USING (public.is_internal_user());

DROP POLICY IF EXISTS "Admins manage solution blueprints" ON public.solution_blueprints;
CREATE POLICY "Admins manage solution blueprints" ON public.solution_blueprints
  FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin'));


-- ============================================================================
-- STEP 9: RE-APPLY RLS POLICIES FOR REPORT_TEMPLATES TABLE
-- ============================================================================

ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Internal users view report templates" ON public.report_templates;
CREATE POLICY "Internal users view report templates" ON public.report_templates
  FOR SELECT USING (public.is_internal_user());

DROP POLICY IF EXISTS "Admins manage report templates" ON public.report_templates;
CREATE POLICY "Admins manage report templates" ON public.report_templates
  FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin'));

COMMIT;
