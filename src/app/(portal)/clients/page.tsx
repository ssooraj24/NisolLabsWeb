"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { Tenant } from "@/types/database";
import { getTenants } from "@/lib/supabase/queries/tenants";
import TenantList from "@/components/tenants/TenantList";
import CreateTenantForm from "@/components/tenants/CreateTenantForm";
import EditTenantForm from "@/components/tenants/EditTenantForm";
import TenantDetail from "@/components/tenants/TenantDetail";

export default function TenantsPage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [viewingTenant, setViewingTenant] = useState<Tenant | null>(null);

  const loadTenants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTenants(undefined, supabase);
      setTenants(data);
    } catch (err: any) {
      console.error("Error fetching tenants:", err);
      setError(`Failed to load tenants: ${err.message || "Unknown error"}`);
      setTenants([]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  return (
    <section className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0A1E3C] text-white rounded-2xl p-6 mb-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
            Directory & Tenant Management
          </span>
          <h1 className="text-3xl font-bold mt-1">Clients & Tenants</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Manage client organizations, industry sectors, company size, revenue brackets, and enterprise tenant details.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/users"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users & Team
          </Link>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-white text-[#0A1E3C] hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-[#0A1E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            + Add New Tenant
          </button>
        </div>
      </div>

      {/* Error Notification */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadTenants} className="underline font-semibold">
            Retry
          </button>
        </div>
      )}

      {/* Tenant List & Filters */}
      <TenantList
        tenants={tenants}
        loading={loading}
        onEdit={(tenant) => setEditingTenant(tenant)}
        onViewDetail={(tenant) => setViewingTenant(tenant)}
        onCreateNew={() => setIsCreateOpen(true)}
      />

      {/* Modals */}
      <CreateTenantForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={loadTenants}
        supabaseClient={supabase}
      />

      <EditTenantForm
        tenant={editingTenant}
        isOpen={!!editingTenant}
        onClose={() => setEditingTenant(null)}
        onSuccess={loadTenants}
        supabaseClient={supabase}
      />

      <TenantDetail
        tenant={viewingTenant}
        isOpen={!!viewingTenant}
        onClose={() => setViewingTenant(null)}
        onEdit={(tenant) => setEditingTenant(tenant)}
      />
    </section>
  );
}
