import { supabase } from "@/lib/supabase/client";

export interface PartnerRecord {
  id: string;
  user_id?: string;
  full_name: string;
  work_email: string;
  company_name: string;
  phone?: string;
  website?: string;
  partner_track: string;
  primary_market: string;
  estimated_referrals: string;
  is_founding_partner: boolean;
  commission_rate_yr1: number;
  commission_rate_yr2: number;
  unique_ref_code: string;
  status: "pending_approval" | "active" | "suspended" | "rejected";
  priority_territory?: string;
  created_at: string;
}

export interface PartnerDealRecord {
  id: string;
  partner_id: string;
  target_company_name: string;
  target_domain: string;
  contact_person_name: string;
  contact_email: string;
  contact_phone?: string;
  package_tier: string;
  estimated_deal_value_inr: number;
  status: "pending_review" | "protected" | "conflict_rejected" | "closed_won" | "closed_lost" | "expired";
  conflict_partner_id?: string;
  protection_starts_at: string;
  protection_expires_at: string;
  sla_response_due_at: string;
  sla_contacted_at?: string;
  created_at: string;
  partner?: {
    full_name: string;
    company_name: string;
    work_email: string;
  };
}

export interface PartnerCommissionRecord {
  id: string;
  deal_id: string;
  partner_id: string;
  commission_type: "year_1_30pct" | "renewal_year_2_20pct" | "upsell_30pct";
  deal_revenue_inr: number;
  commission_rate: number;
  commission_amount_inr: number;
  payout_status: "calculated" | "approved" | "paid" | "void";
  invoice_number?: string;
  paid_at?: string;
  created_at: string;
  partner?: {
    full_name: string;
    company_name: string;
  };
  deal?: {
    target_company_name: string;
  };
}

/**
 * Register a new Partner Application
 */
export async function createPartnerApplication(data: {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone?: string;
  website?: string;
  partnerTrack?: string;
  primaryMarket?: string;
  estimatedReferrals?: string;
  isFoundingPartner?: boolean;
}) {
  const cleanEmail = data.workEmail.trim().toLowerCase();
  const refCode = `NISOL-${data.companyName.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  const { data: result, error } = await supabase
    .from("partners")
    .insert([
      {
        full_name: data.fullName,
        work_email: cleanEmail,
        company_name: data.companyName,
        phone: data.phone,
        website: data.website,
        partner_track: data.partnerTrack || "Implementation Partner (25-35%)",
        primary_market: data.primaryMarket || "India Tier-1 Cities",
        estimated_referrals: data.estimatedReferrals || "3 - 5 Deals / Year",
        is_founding_partner: data.isFoundingPartner ?? true,
        commission_rate_yr1: 0.30,
        commission_rate_yr2: 0.20,
        unique_ref_code: refCode,
        status: "pending_approval",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating partner application in DB:", error);
    throw error;
  }

  return result;
}

/**
 * Register a target deal with timestamped collision check
 */
export async function registerPartnerDeal(data: {
  partnerId: string;
  companyName: string;
  domain: string;
  contactName: string;
  contactEmail: string;
  packageTier?: string;
  estimatedValueINR?: number;
}) {
  // Normalize domain
  const cleanDomain = data.domain
    .toLowerCase()
    .replace(/^(https?:\/\/)?(www\.)?|\/.*$/g, "");

  // Execute database RPC call if present or direct check
  const { data: rpcResult, error: rpcError } = await supabase.rpc("register_partner_deal", {
    p_partner_id: data.partnerId,
    p_company_name: data.companyName,
    p_domain: cleanDomain,
    p_contact_name: data.contactName,
    p_contact_email: data.contactEmail,
    p_package_tier: data.packageTier || "Nisol Enterprise",
    p_estimated_value: data.estimatedValueINR || 1850000.0,
  });

  if (!rpcError && rpcResult) {
    return rpcResult;
  }

  // Fallback direct query if RPC function is not yet created in local env
  const { data: existingDeals } = await supabase
    .from("partner_deals")
    .select("*")
    .eq("target_domain", cleanDomain)
    .eq("status", "protected")
    .gt("protection_expires_at", new Date().toISOString())
    .limit(1);

  if (existingDeals && existingDeals.length > 0) {
    const { data: conflictDeal } = await supabase
      .from("partner_deals")
      .insert([
        {
          partner_id: data.partnerId,
          target_company_name: data.companyName,
          target_domain: cleanDomain,
          contact_person_name: data.contactName,
          contact_email: data.contactEmail,
          package_tier: data.packageTier || "Nisol Enterprise",
          estimated_deal_value_inr: data.estimatedValueINR || 1850000.0,
          status: "conflict_rejected",
          conflict_partner_id: existingDeals[0].partner_id,
        },
      ])
      .select()
      .single();

    return {
      success: false,
      status: "conflict_rejected",
      deal: conflictDeal,
      message: `Conflict rejected: ${cleanDomain} is already protected by another partner.`,
    };
  }

  // No collision — grant 90-day protection
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90);

  const dueSLAAt = new Date();
  dueSLAAt.setHours(dueSLAAt.getHours() + 48);

  const { data: newDeal, error: insertErr } = await supabase
    .from("partner_deals")
    .insert([
      {
        partner_id: data.partnerId,
        target_company_name: data.companyName,
        target_domain: cleanDomain,
        contact_person_name: data.contactName,
        contact_email: data.contactEmail,
        package_tier: data.packageTier || "Nisol Enterprise",
        estimated_deal_value_inr: data.estimatedValueINR || 1850000.0,
        status: "protected",
        protection_starts_at: new Date().toISOString(),
        protection_expires_at: expiresAt.toISOString(),
        sla_response_due_at: dueSLAAt.toISOString(),
      },
    ])
    .select()
    .single();

  if (insertErr) {
    throw insertErr;
  }

  return {
    success: true,
    status: "protected",
    deal: newDeal,
    protection_expires_at: expiresAt.toISOString(),
    message: "Deal protection granted for 90 days.",
  };
}

/**
 * Superadmin Queries
 */
export async function getSuperadminPartnerData() {
  const { data: partners } = await supabase.from("partners").select("*").order("created_at", { ascending: false });
  const { data: deals } = await supabase.from("partner_deals").select("*, partner:partners(full_name, company_name, work_email)").order("created_at", { ascending: false });
  const { data: commissions } = await supabase.from("partner_commissions").select("*, partner:partners(full_name, company_name), deal:partner_deals(target_company_name)").order("created_at", { ascending: false });

  return {
    partners: partners || [],
    deals: deals || [],
    commissions: commissions || [],
  };
}
