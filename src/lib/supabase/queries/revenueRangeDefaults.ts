import { createBrowserClient } from '@supabase/ssr';
import { RevenueRangeDefault } from '@/types/database';

function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getRevenueRangeDefaults(client?: any): Promise<RevenueRangeDefault[]> {
  const supabase = client || getSupabaseClient();
  const { data, error } = await supabase
    .from('revenue_range_defaults')
    .select('*')
    .order('min_cr', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getRevenueRangeDefault(label: string, client?: any): Promise<RevenueRangeDefault | null> {
  const supabase = client || getSupabaseClient();
  const { data, error } = await supabase
    .from('revenue_range_defaults')
    .select('*')
    .eq('range_label', label)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
}

export async function getMidPoint(label: string, client?: any): Promise<number | null> {
  const result = await getRevenueRangeDefault(label, client);
  return result?.mid_point_cr || null;
}
