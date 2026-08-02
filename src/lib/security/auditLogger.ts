import { createClient } from '@supabase/supabase-js';

export interface AuditLogParams {
  userId?: string | null;
  tenantId?: string | null;
  action: string;
  resourceType: string;
  ipAddress?: string | null;
  metadata?: Record<string, any>;
}

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, serviceKey);
}

/**
 * Inserts an entry into the enterprise audit_logs table.
 * Fails gracefully with console logging if database write fails.
 */
export async function logAuditEvent(params: AuditLogParams): Promise<boolean> {
  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from('audit_logs').insert({
      user_id: params.userId || null,
      tenant_id: params.tenantId || null,
      action: params.action,
      resource_type: params.resourceType,
      ip_address: params.ipAddress || null,
      metadata: params.metadata || {},
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[AuditLogger] Failed to write audit log:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[AuditLogger] Exception during audit logging:', err);
    return false;
  }
}
