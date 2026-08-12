import { createBrowserClient } from '@supabase/ssr';

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

function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Fetch all user profiles with tenant organization information.
 */
export async function getUsers(filters?: UserFilters, client?: any): Promise<UserProfile[]> {
  const supabase = client || getSupabaseClient();

  let query = supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      role,
      tenant_id,
      created_at,
      updated_at,
      tenants:tenant_id (
        id,
        name,
        tenant_type
      )
    `)
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

  let results: UserProfile[] = (data || []).map((item: any) => ({
    ...item,
    tenants: Array.isArray(item.tenants) ? item.tenants[0] || null : item.tenants,
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
  const supabase = client || getSupabaseClient();

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select(`
      id,
      full_name,
      role,
      tenant_id,
      created_at,
      updated_at,
      tenants:tenant_id (
        id,
        name,
        tenant_type
      )
    `)
    .single();

  if (error) throw error;

  return {
    ...data,
    tenants: Array.isArray(data.tenants) ? data.tenants[0] || null : data.tenants,
  };
}
