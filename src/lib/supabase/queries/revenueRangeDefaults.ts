import { db } from '@/lib/db/client';
import { RevenueRangeDefault } from '@/types/database';

function getDatabaseClient() {
  return db;
}

export async function getRevenueRangeDefaults(client?: any): Promise<RevenueRangeDefault[]> {
  const supabase = client || getDatabaseClient();
  const { data, error } = await supabase
    .from('revenue_range_defaults')
    .select('*')
    .order('min_cr', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getRevenueRangeDefault(label: string, client?: any): Promise<RevenueRangeDefault | null> {
  const supabase = client || getDatabaseClient();
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
