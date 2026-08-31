import { createBrowserClient } from '@supabase/ssr';
import { Tenant, TenantStatus, TenantType, IndustrySector, PricingPlan } from '@/types/database';
import { encryptPayload, decryptPayload } from '@/lib/security/encryption';
import { generateBlindIndex } from '@/lib/security/hash';
import { logAuditEvent } from '@/lib/security/auditLogger';

export interface TenantFilters {
  status?: TenantStatus | string;
  tenant_type?: TenantType | string;
  industry_sector?: IndustrySector | string;
  pricing_plan?: PricingPlan | string;
  country?: string;
  search?: string;
}

function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Helper to hydrate encrypted fields from tenant_secure if available.
 */
function hydrateTenantData(rawTenant: any): Tenant {
  if (!rawTenant) return rawTenant;

  let tenant = { ...rawTenant } as Tenant;

  if (rawTenant.tenant_secure) {
    const decryptedObj = decryptPayload<Record<string, any>>(rawTenant.tenant_secure);
    if (decryptedObj && typeof decryptedObj === 'object') {
      tenant = {
        ...tenant,
        ...decryptedObj,
      };
    }
  }

  return tenant;
}

export async function getTenants(filters?: TenantFilters, client?: any): Promise<Tenant[]> {
  const supabase = client || getSupabaseClient();
  let query = supabase.from('tenants').select('*').order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.tenant_type) {
    query = query.eq('tenant_type', filters.tenant_type);
  }
  if (filters?.industry_sector) {
    query = query.eq('industry_sector', filters.industry_sector);
  }
  if (filters?.pricing_plan) {
    query = query.eq('pricing_plan', filters.pricing_plan);
  }
  if (filters?.country) {
    query = query.ilike('country', `%${filters.country}%`);
  }

  // If search matches exact blind index hash
  if (filters?.search && filters.search.trim()) {
    const searchHash = generateBlindIndex(filters.search);
    if (searchHash) {
      // Check if matching hash exists
      const hashQuery = supabase.from('tenants').select('*').or(`company_hash.eq.${searchHash},website_hash.eq.${searchHash}`);
      const { data: hashMatches } = await hashQuery;
      if (hashMatches && hashMatches.length > 0) {
        return hashMatches.map(hydrateTenantData);
      }
    }
  }

  const { data, error } = await query;
  if (error) throw error;

  let result: Tenant[] = (data || []).map(hydrateTenantData);

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (t) =>
        (t.name || '').toLowerCase().includes(q) ||
        (t.industry || '').toLowerCase().includes(q) ||
        (t.sub_industry || '').toLowerCase().includes(q) ||
        (t.industry_sector || '').toLowerCase().includes(q) ||
        (t.city || '').toLowerCase().includes(q) ||
        (t.country || '').toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getTenantById(id: string, client?: any): Promise<Tenant | null> {
  const supabase = client || getSupabaseClient();
  const { data, error } = await supabase.from('tenants').select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return hydrateTenantData(data);
}

export async function createTenant(
  tenantData: Partial<Omit<Tenant, 'id' | 'company_size' | 'created_at' | 'updated_at'>>,
  client?: any
): Promise<Tenant> {
  const supabase = client || getSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id || null;

  // Prepare encrypted confidential payload
  const confidentialPayload = {
    name: tenantData.name,
    website: tenantData.website,
    revenue_range: tenantData.revenue_range,
    city: tenantData.city,
    state: tenantData.state,
  };

  const encryptedSecureBlob = encryptPayload(confidentialPayload);
  const companyHash = generateBlindIndex(tenantData.name);
  const websiteHash = generateBlindIndex(tenantData.website);

  const payload = {
    ...tenantData,
    tenant_secure: encryptedSecureBlob,
    company_hash: companyHash,
    website_hash: websiteHash,
    status: tenantData.status || 'active',
    tenant_type: tenantData.tenant_type || 'client',
    created_by: userId,
    updated_by: userId,
    updated_at: new Date().toISOString(),
  };

  // Ensure computed column company_size is not sent
  delete (payload as any).company_size;

  const { data, error } = await supabase.from('tenants').insert(payload).select().single();
  if (error) throw error;

  // Log Audit Event
  await logAuditEvent({
    userId,
    tenantId: data.id,
    action: 'CREATE_TENANT',
    resourceType: 'tenants',
    metadata: { name: tenantData.name, tenant_type: tenantData.tenant_type },
  });

  return hydrateTenantData(data);
}

export async function updateTenant(
  id: string,
  tenantData: Partial<Tenant>,
  client?: any
): Promise<Tenant> {
  const supabase = client || getSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id || null;

  const payload: Record<string, any> = {
    ...tenantData,
    updated_by: userId,
    updated_at: new Date().toISOString(),
  };

  if (tenantData.name || tenantData.website) {
    const confidentialPayload = {
      name: tenantData.name,
      website: tenantData.website,
      revenue_range: tenantData.revenue_range,
      city: tenantData.city,
      state: tenantData.state,
    };
    payload.tenant_secure = encryptPayload(confidentialPayload);
    if (tenantData.name) payload.company_hash = generateBlindIndex(tenantData.name);
    if (tenantData.website) payload.website_hash = generateBlindIndex(tenantData.website);
  }

  delete payload.company_size;
  delete payload.id;
  delete payload.created_at;
  delete payload.created_by;

  const { data, error } = await supabase
    .from('tenants')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  // Log Audit Event
  await logAuditEvent({
    userId,
    tenantId: id,
    action: 'UPDATE_TENANT',
    resourceType: 'tenants',
    metadata: { tenantId: id },
  });

  return hydrateTenantData(data);
}
