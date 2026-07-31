import { createBrowserClient } from '@supabase/ssr';
import { Tenant, TenantStatus, TenantType, IndustrySector } from '@/types/database';

export interface TenantFilters {
  status?: TenantStatus | string;
  tenant_type?: TenantType | string;
  industry_sector?: IndustrySector | string;
  country?: string;
  search?: string;
}

function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getTenants(filters?: TenantFilters, client?: any): Promise<Tenant[]> {
  const supabase = client || getSupabaseClient();
  let query = supabase.from('tenants').select('*').order('name', { ascending: true });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.tenant_type) {
    query = query.eq('tenant_type', filters.tenant_type);
  }
  if (filters?.industry_sector) {
    query = query.eq('industry_sector', filters.industry_sector);
  }
  if (filters?.country) {
    query = query.ilike('country', `%${filters.country}%`);
  }

  const { data, error } = await query;
  if (error) throw error;

  let result: Tenant[] = data || [];

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
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
  return data;
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

  const payload = {
    ...tenantData,
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
  return data;
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
  return data;
}
