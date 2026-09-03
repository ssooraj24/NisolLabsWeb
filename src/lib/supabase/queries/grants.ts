import { createBrowserClient } from '@supabase/ssr';
import { GrantApplication, GrantStatus, GrantApplicationFormData, GrantRubricScores } from '@/types/grants';

function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export interface GrantFilters {
  status?: GrantStatus | string;
  registration_type?: string;
  search?: string;
  cohort?: string;
}

/**
 * Fetch all grant applications with optional filters and text search.
 */
export async function getGrantApplications(filters?: GrantFilters, client?: any): Promise<GrantApplication[]> {
  const supabase = client || getSupabaseClient();
  let query = supabase.from('grant_applications').select('*').order('created_at', { ascending: false });

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }
  if (filters?.registration_type && filters.registration_type !== 'all') {
    query = query.eq('registration_type', filters.registration_type);
  }
  if (filters?.cohort) {
    query = query.eq('grant_cohort', filters.cohort);
  }

  const { data, error } = await query;
  if (error) throw error;

  let result: GrantApplication[] = data || [];

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (item) =>
        (item.org_name || '').toLowerCase().includes(q) ||
        (item.contact_name || '').toLowerCase().includes(q) ||
        (item.contact_email || '').toLowerCase().includes(q) ||
        (item.hq_location || '').toLowerCase().includes(q)
    );
  }

  return result;
}

/**
 * Fetch a single grant application by ID.
 */
export async function getGrantApplicationById(id: string, client?: any): Promise<GrantApplication | null> {
  const supabase = client || getSupabaseClient();
  const { data, error } = await supabase.from('grant_applications').select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

/**
 * Create a new grant application record.
 */
export async function createGrantApplication(
  formData: GrantApplicationFormData,
  client?: any
): Promise<GrantApplication> {
  const supabase = client || getSupabaseClient();

  const payload = {
    ...formData,
    status: 'pending',
    grant_cohort: '2026-Q1',
    rubric_impact_score: 0,
    rubric_complexity_score: 0,
    rubric_leadership_score: 0,
    rubric_amplification_score: 0,
    rubric_total_weighted: 0,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from('grant_applications').insert(payload).select().single();
  if (error) throw error;
  return data;
}

/**
 * Update grant status, rubric scores, and reviewer notes.
 */
export async function updateGrantApplication(
  id: string,
  updates: Partial<GrantApplication>,
  client?: any
): Promise<GrantApplication> {
  const supabase = client || getSupabaseClient();

  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('grant_applications')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update internal rubric scores and auto-calculate weighted score (0-100).
 * Impact: 35%, Complexity: 25%, Leadership: 20%, Amplification: 20%
 */
export async function updateGrantRubricScores(
  id: string,
  scores: GrantRubricScores,
  notes?: string,
  client?: any
): Promise<GrantApplication> {
  const weightedTotal = Math.round(
    ((scores.impact / 5) * 35) +
    ((scores.complexity / 5) * 25) +
    ((scores.leadership / 5) * 20) +
    ((scores.amplification / 5) * 20)
  );

  return updateGrantApplication(id, {
    rubric_impact_score: scores.impact,
    rubric_complexity_score: scores.complexity,
    rubric_leadership_score: scores.leadership,
    rubric_amplification_score: scores.amplification,
    rubric_total_weighted: weightedTotal,
    ...(notes ? { internal_notes: notes } : {}),
  }, client);
}

/**
 * Delete a grant application record.
 */
export async function deleteGrantApplication(id: string, client?: any): Promise<boolean> {
  const supabase = client || getSupabaseClient();
  const { error } = await supabase.from('grant_applications').delete().eq('id', id);
  if (error) throw error;
  return true;
}
