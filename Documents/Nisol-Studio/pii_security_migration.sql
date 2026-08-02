-- =================================================================
-- Nisol Discovery: PII Security & Encryption Database Migration Script
-- Run this script in the Supabase SQL Editor
-- =================================================================

-- 1. Add Encrypted JSON Payload & HMAC Blind Index Columns to `tenants`
ALTER TABLE tenants 
ADD COLUMN IF NOT EXISTS tenant_secure TEXT,
ADD COLUMN IF NOT EXISTS company_hash TEXT,
ADD COLUMN IF NOT EXISTS website_hash TEXT;

-- Index for high-performance exact hash searches
CREATE INDEX IF NOT EXISTS idx_tenants_company_hash ON tenants(company_hash);
CREATE INDEX IF NOT EXISTS idx_tenants_website_hash ON tenants(website_hash);


-- 2. Add Encrypted JSON Payload Column to `audit_reports`
ALTER TABLE audit_reports 
ADD COLUMN IF NOT EXISTS report_payload TEXT;


-- 3. Create Enterprise Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    ip_address TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on audit_logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for audit_logs
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'audit_logs' AND policyname = 'Authenticated users can read audit logs'
    ) THEN
        CREATE POLICY "Authenticated users can read audit logs" ON audit_logs
            FOR SELECT TO authenticated USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'audit_logs' AND policyname = 'Authenticated users can insert audit logs'
    ) THEN
        CREATE POLICY "Authenticated users can insert audit logs" ON audit_logs
            FOR INSERT TO authenticated WITH CHECK (true);
    END IF;
END $$;
