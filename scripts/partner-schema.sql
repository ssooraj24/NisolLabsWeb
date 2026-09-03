-- =========================================================================
-- NISOL AI PARTNER PROGRAM — DATABASE SCHEMA & AUTOMATION (SUPABASE / POSTGRES)
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PARTNERS TABLE
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    work_email VARCHAR(255) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(255),
    partner_track VARCHAR(100) DEFAULT 'Implementation Partner (25-35%)',
    primary_market VARCHAR(100) DEFAULT 'India Tier-1 Cities',
    estimated_referrals VARCHAR(100),
    is_founding_partner BOOLEAN DEFAULT false,
    commission_rate_yr1 NUMERIC(4, 2) DEFAULT 0.30, -- 30%
    commission_rate_yr2 NUMERIC(4, 2) DEFAULT 0.20, -- 20%
    unique_ref_code VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending_approval', -- pending_approval, active, suspended, rejected
    priority_territory VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast partner email lookup
CREATE INDEX IF NOT EXISTS idx_partners_email ON public.partners(work_email);
CREATE INDEX IF NOT EXISTS idx_partners_status ON public.partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_ref_code ON public.partners(unique_ref_code);


-- 3. PARTNER DEALS TABLE (DEAL REGISTRATIONS & TIMESTAMPED PROTECTION)
CREATE TABLE IF NOT EXISTS public.partner_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
    target_company_name VARCHAR(255) NOT NULL,
    target_domain VARCHAR(255) NOT NULL, -- Normalized domain (e.g. acme.com) for 100% duplicate checking
    contact_person_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    package_tier VARCHAR(100) DEFAULT 'Nisol Enterprise', -- Nisol One vs Nisol Enterprise
    estimated_deal_value_inr NUMERIC(12, 2) DEFAULT 1850000.00,
    status VARCHAR(50) DEFAULT 'protected', -- pending_review, protected, conflict_rejected, closed_won, closed_lost, expired
    conflict_partner_id UUID REFERENCES public.partners(id), -- If conflict, references earlier partner
    protection_starts_at TIMESTAMPTZ DEFAULT NOW(),
    protection_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days'),
    sla_response_due_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours'),
    sla_contacted_at TIMESTAMPTZ, -- Timestamp when Nisol AI sales team made first contact
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for domain collision check (crucial for first-to-register rule)
CREATE INDEX IF NOT EXISTS idx_partner_deals_domain ON public.partner_deals(target_domain);
CREATE INDEX IF NOT EXISTS idx_partner_deals_status ON public.partner_deals(status);
CREATE INDEX IF NOT EXISTS idx_partner_deals_partner_id ON public.partner_deals(partner_id);


-- 4. PARTNER COMMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.partner_commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES public.partner_deals(id) ON DELETE CASCADE,
    partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
    commission_type VARCHAR(50) DEFAULT 'year_1_30pct', -- year_1_30pct, renewal_year_2_20pct, upsell_30pct
    deal_revenue_inr NUMERIC(12, 2) NOT NULL,
    commission_rate NUMERIC(4, 2) NOT NULL,
    commission_amount_inr NUMERIC(12, 2) NOT NULL,
    payout_status VARCHAR(50) DEFAULT 'calculated', -- calculated, approved, paid, void
    invoice_number VARCHAR(100),
    paid_at TIMESTAMPTZ,
    payment_reference VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_commissions_partner_id ON public.partner_commissions(partner_id);
CREATE INDEX IF NOT EXISTS idx_commissions_payout_status ON public.partner_commissions(payout_status);


-- 5. PARTNER AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.partner_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL, -- partner, deal, commission
    entity_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    details JSONB,
    performed_by VARCHAR(255) DEFAULT 'system',
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================================
-- FUNCTION: CHECK DEAL REGISTRATION CONFLICT & AUTO-ASSIGN 90-DAY PROTECTION
-- =========================================================================
CREATE OR REPLACE FUNCTION public.register_partner_deal(
    p_partner_id UUID,
    p_company_name VARCHAR,
    p_domain VARCHAR,
    p_contact_name VARCHAR,
    p_contact_email VARCHAR,
    p_package_tier VARCHAR DEFAULT 'Nisol Enterprise',
    p_estimated_value NUMERIC DEFAULT 1850000.00
) RETURNS JSONB AS $$
DECLARE
    v_clean_domain VARCHAR;
    v_existing_deal RECORD;
    v_new_deal_id UUID;
BEGIN
    -- Normalize domain (strip http, https, www, trailing slashes)
    v_clean_domain := LOWER(REGEXP_REPLACE(p_domain, '^(https?:\/\/)?(www\.)?|\/.*$', '', 'g'));

    -- Check if an active protected deal exists for this domain within 90 days
    SELECT * INTO v_existing_deal 
    FROM public.partner_deals
    WHERE target_domain = v_clean_domain 
      AND status = 'protected' 
      AND protection_expires_at > NOW()
    ORDER BY created_at ASC
    LIMIT 1;

    IF FOUND THEN
        -- Conflict detected! Insert record as conflict_rejected
        INSERT INTO public.partner_deals (
            partner_id, target_company_name, target_domain, contact_person_name, 
            contact_email, package_tier, estimated_deal_value_inr, status, conflict_partner_id
        ) VALUES (
            p_partner_id, p_company_name, v_clean_domain, p_contact_name,
            p_contact_email, p_package_tier, p_estimated_value, 'conflict_rejected', v_existing_deal.partner_id
        ) RETURNING id INTO v_new_deal_id;

        -- Audit log
        INSERT INTO public.partner_audit_logs (entity_type, entity_id, action, details)
        VALUES ('deal', v_new_deal_id, 'CONFLICT_REJECTED', jsonb_build_object(
            'registered_by', p_partner_id,
            'existing_partner', v_existing_deal.partner_id,
            'domain', v_clean_domain
        ));

        RETURN jsonb_build_object(
            'success', false,
            'status', 'conflict_rejected',
            'deal_id', v_new_deal_id,
            'message', 'Deal registration conflict: another partner holds active protection for ' || v_clean_domain
        );
    ELSE
        -- No active conflict! Grant 90-day protection
        INSERT INTO public.partner_deals (
            partner_id, target_company_name, target_domain, contact_person_name, 
            contact_email, package_tier, estimated_deal_value_inr, status,
            protection_starts_at, protection_expires_at, sla_response_due_at
        ) VALUES (
            p_partner_id, p_company_name, v_clean_domain, p_contact_name,
            p_contact_email, p_package_tier, p_estimated_value, 'protected',
            NOW(), NOW() + INTERVAL '90 days', NOW() + INTERVAL '48 hours'
        ) RETURNING id INTO v_new_deal_id;

        -- Audit log
        INSERT INTO public.partner_audit_logs (entity_type, entity_id, action, details)
        VALUES ('deal', v_new_deal_id, 'PROTECTION_GRANTED', jsonb_build_object(
            'partner_id', p_partner_id,
            'domain', v_clean_domain,
            'expires_at', NOW() + INTERVAL '90 days'
        ));

        RETURN jsonb_build_object(
            'success', true,
            'status', 'protected',
            'deal_id', v_new_deal_id,
            'protection_expires_at', NOW() + INTERVAL '90 days',
            'message', 'Deal protection granted for 90 days.'
        );
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
