-- ==============================================================================
-- NISOL 360 / NISOL LABS — POSTGRESQL 16 ENTERPRISE DATABASE SETUP
-- Target: PostgreSQL 16 on VM 2 (Data & Telemetry) / Cloud SQL / RDS
-- Architecture: Next.js + FastAPI + Better Auth + PostgreSQL 16 + pgvector
-- ==============================================================================

-- 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- vector extension for enterprise embeddings (Option A VM 2)
CREATE EXTENSION IF NOT EXISTS "vector";

-- ==============================================================================
-- 1. BETTER AUTH TABLES (Authentication & Session Store)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  role TEXT DEFAULT 'client',
  "tenantId" TEXT
);

CREATE TABLE IF NOT EXISTS "session" (
  id TEXT PRIMARY KEY,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  id TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" TIMESTAMPTZ,
  "refreshTokenExpiresAt" TIMESTAMPTZ,
  scope TEXT,
  password TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "verification" (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_session_user_id ON "session"("userId");
CREATE INDEX IF NOT EXISTS idx_session_token ON "session"(token);
CREATE INDEX IF NOT EXISTS idx_account_user_id ON "account"("userId");

-- ==============================================================================
-- 2. TENANTS (Client Organizations)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  sub_industry TEXT,
  industry_sector TEXT,
  employee_count INT,
  revenue_range TEXT,
  pricing_plan TEXT DEFAULT 'spark',
  country TEXT,
  state TEXT,
  city TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  tenant_type TEXT NOT NULL DEFAULT 'client',
  joined_date TIMESTAMPTZ DEFAULT now(),
  created_by TEXT,
  updated_by TEXT,
  tenant_secure TEXT,
  company_hash TEXT,
  website_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tenants_status ON public.tenants(status);
CREATE INDEX IF NOT EXISTS idx_tenants_company_hash ON public.tenants(company_hash);
CREATE INDEX IF NOT EXISTS idx_tenants_website_hash ON public.tenants(website_hash);

-- ==============================================================================
-- 3. PROFILES (Backward-Compatible Application Profiles)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON public.profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ==============================================================================
-- 4. AUDITS (Assessments)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  conducted_by TEXT,
  conducted_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'draft',
  notes TEXT,
  raw_responses JSONB DEFAULT '{}'::jsonb,
  overall_maturity_score NUMERIC(3, 2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audits_tenant_id ON public.audits(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audits_status ON public.audits(status);
CREATE INDEX IF NOT EXISTS idx_audits_conducted_at ON public.audits(conducted_at);

-- ==============================================================================
-- 5. AUDIT MATURITY SCORES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.audit_maturity_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES public.audits(id) ON DELETE CASCADE,
  pillar_name TEXT NOT NULL,
  maturity_score NUMERIC(3, 2) NOT NULL,
  recommendations TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_maturity_scores_audit_id ON public.audit_maturity_scores(audit_id);

-- ==============================================================================
-- 6. QUESTIONS (Discovery Assessment Questions)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.questions (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  order_index INT NOT NULL,
  question_text TEXT NOT NULL,
  tip_discussion TEXT,
  triggered_patterns TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_section ON public.questions(section);
CREATE INDEX IF NOT EXISTS idx_questions_order_index ON public.questions(order_index);

-- ==============================================================================
-- 7. AUDIT REPORTS & INTELLIGENCE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES public.audits(id) ON DELETE CASCADE,
  version INT DEFAULT 1,
  status TEXT DEFAULT 'draft',
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
  generated_at TIMESTAMPTZ DEFAULT now(),
  last_edited_at TIMESTAMPTZ DEFAULT now(),
  finalized_at TIMESTAMPTZ,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_reports_audit_id ON public.audit_reports(audit_id);

CREATE TABLE IF NOT EXISTS public.report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_default BOOLEAN DEFAULT FALSE,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.report_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.audit_reports(id) ON DELETE CASCADE,
  version INT NOT NULL,
  snapshot JSONB NOT NULL,
  changed_by TEXT,
  change_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.report_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.audit_reports(id) ON DELETE CASCADE,
  export_format TEXT NOT NULL,
  file_url TEXT,
  exported_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 8. GRANT APPLICATIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.grant_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name TEXT NOT NULL,
  registration_type TEXT,
  hq_location TEXT,
  mission_statement TEXT,
  problem_solved TEXT NOT NULL,
  tech_bottleneck TEXT,
  leadership_confirmed BOOLEAN DEFAULT FALSE,
  grant_use_case TEXT,
  amplification_pledged BOOLEAN DEFAULT FALSE,
  media_reach_link TEXT,
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  grant_cohort TEXT DEFAULT '2026-Q1',
  status TEXT DEFAULT 'pending_review',
  review_notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  rubric_scores JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grant_applications_status ON public.grant_applications(status);

-- ==============================================================================
-- 9. PARTNER ECOSYSTEM
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  partner_track TEXT NOT NULL,
  primary_market TEXT NOT NULL,
  estimated_referrals TEXT NOT NULL,
  is_founding_partner BOOLEAN DEFAULT FALSE,
  commission_rate_yr1 NUMERIC(4, 2) DEFAULT 0.30,
  commission_rate_yr2 NUMERIC(4, 2) DEFAULT 0.20,
  unique_ref_code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending_approval',
  priority_territory TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.partner_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  target_company_name TEXT NOT NULL,
  target_domain TEXT NOT NULL,
  contact_person_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  package_tier TEXT NOT NULL,
  estimated_deal_value_inr NUMERIC(12, 2) NOT NULL,
  status TEXT DEFAULT 'pending_review',
  conflict_partner_id UUID REFERENCES public.partners(id),
  protection_starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  protection_expires_at TIMESTAMPTZ NOT NULL,
  sla_response_due_at TIMESTAMPTZ NOT NULL,
  sla_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.partner_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.partner_deals(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  commission_type TEXT NOT NULL,
  deal_revenue_inr NUMERIC(12, 2) NOT NULL,
  commission_rate NUMERIC(4, 2) NOT NULL,
  commission_amount_inr NUMERIC(12, 2) NOT NULL,
  payout_status TEXT DEFAULT 'calculated',
  invoice_number TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 10. REVENUE RANGE DEFAULTS & ENTERPRISE AUDIT LOGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.revenue_range_defaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revenue_range TEXT NOT NULL UNIQUE,
  baseline_budget_cr NUMERIC(10, 2),
  typical_timeline_months INT,
  recommended_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  tenant_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  ip_address TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_id ON public.audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);
