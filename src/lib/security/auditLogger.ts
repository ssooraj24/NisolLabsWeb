export interface AuditLogParams {
  userId?: string | null;
  tenantId?: string | null;
  action: string;
  resourceType: string;
  ipAddress?: string | null;
  metadata?: Record<string, any>;
}

/**
 * Inserts an entry into the enterprise audit_logs table.
 * If called from browser, posts to the secure /api/data endpoint.
 * If called from server, executes direct parameterized PostgreSQL query.
 */
export async function logAuditEvent(params: AuditLogParams): Promise<boolean> {
  try {
    if (typeof window !== "undefined") {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "insert",
          table: "audit_logs",
          values: {
            user_id: params.userId || null,
            tenant_id: params.tenantId || null,
            action: params.action,
            resource_type: params.resourceType,
            ip_address: params.ipAddress || null,
            metadata: params.metadata || {},
            created_at: new Date().toISOString(),
          },
        }),
      });
      return true;
    }

    // Dynamic import to prevent Node.js 'pg' driver from being bundled into client code
    const { query } = await import("@/lib/db");
    const sql = `
      INSERT INTO public.audit_logs (user_id, tenant_id, action, resource_type, ip_address, metadata, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await query(sql, [
      params.userId || null,
      params.tenantId || null,
      params.action,
      params.resourceType,
      params.ipAddress || null,
      JSON.stringify(params.metadata || {}),
      new Date().toISOString(),
    ]);

    return true;
  } catch (err: any) {
    console.error("[AuditLogger] Exception during audit logging:", err?.message || err);
    return false;
  }
}
