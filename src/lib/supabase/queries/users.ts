import { db } from '@/lib/db/client';

export interface UserProfile {
  id: string;
  email?: string | null;
  full_name: string | null;
  role: 'super_admin' | 'admin' | 'consultant' | 'client';
  tenant_id: string | null;
  created_at: string;
  updated_at: string;
  tenants?: {
    id: string;
    name: string;
    tenant_type: string;
  } | null;
}

export interface UserFilters {
  role?: string;
  tenant_id?: string;
  search?: string;
}

function getDatabaseClient() {
  return db;
}

/**
 * Fetch all user profiles with tenant organization information.
 */
export async function getUsers(filters?: UserFilters, client?: any): Promise<UserProfile[]> {
  const supabase = client || getDatabaseClient();

  let query = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.role && filters.role !== 'all') {
    query = query.eq('role', filters.role);
  }
  if (filters?.tenant_id && filters.tenant_id !== 'all') {
    query = query.eq('tenant_id', filters.tenant_id);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching user profiles:', error);
    throw error;
  }

  // Fetch tenants to map organization info
  const { data: tenantsData } = await supabase.from('tenants').select('id, name, tenant_type');
  const tenantMap = new Map((tenantsData || []).map((t: any) => [t.id, t]));

  let results: UserProfile[] = (data || []).map((item: any) => ({
    ...item,
    tenants: item.tenant_id ? tenantMap.get(item.tenant_id) || null : null,
  }));

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (u) =>
        (u.full_name || '').toLowerCase().includes(q) ||
        (u.tenants?.name || '').toLowerCase().includes(q) ||
        (u.role || '').toLowerCase().includes(q)
    );
  }

  return results;
}

/**
 * Update user profile role or assigned tenant organization.
 */
export async function updateUserProfile(
  userId: string,
  updates: { role?: string; tenant_id?: string | null; full_name?: string },
  client?: any
): Promise<UserProfile> {
  const supabase = client || getDatabaseClient();

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select('*')
    .single();

  if (error) throw error;

  let tenantObj = null;
  if (data?.tenant_id) {
    const { data: tData } = await supabase
      .from('tenants')
      .select('id, name, tenant_type')
      .eq('id', data.tenant_id)
      .maybeSingle();
    tenantObj = tData || null;
  }

  return {
    ...data,
    tenants: tenantObj,
  };
}
