"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { Tenant } from "@/types/database";
import { getTenants } from "@/lib/supabase/queries/tenants";

type Audit = {
  id: string;
  title: string;
  status: string | null;
  overall_maturity_score: number | null;
  tenant_id: string;
  conducted_by: string | null;
  created_at: string;
};

export default function Dashboard() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );
  const [audits, setAudits] = useState<Audit[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: auditsData, error: auditsError } = await supabase
        .from("audits")
        .select("id, title, status, overall_maturity_score, tenant_id, conducted_by, created_at")
        .order("created_at", { ascending: false });

      if (auditsError) throw auditsError;

      const tenantsData = await getTenants(undefined, supabase);

      setAudits(auditsData || []);
      setTenants(tenantsData || []);
    } catch (err: any) {
      console.error(err);
      setError(`Dashboard load error: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const tenantMap = useMemo(() => new Map(tenants.map((t) => [t.id, t])), [tenants]);

  // Compute metrics
  const activeClientsCount = useMemo(
    () => tenants.filter((t) => t.status === "active").length,
    [tenants]
  );
  const prospectCount = useMemo(
    () => tenants.filter((t) => t.status === "prospect").length,
    [tenants]
  );

  const industrySectorBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    tenants.forEach((t) => {
      const sector = t.industry_sector || t.industry || "Unassigned";
      counts[sector] = (counts[sector] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [tenants]);

  if (loading) return <p className="p-6 text-sm text-slate-500 font-medium">Loading Discovery Dashboard...</p>;
  if (error) return <p className="p-6 text-sm text-red-600 font-semibold">{error}</p>;

  return (
    <section className="p-6 min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1E3C]">Discovery Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Overview of client discovery audits, client status metrics, and industry distributions.
          </p>
        </div>
        <NewAuditModal tenants={tenants} onCreated={loadData} supabase={supabase} />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Tenants</span>
            <div className="text-2xl font-extrabold text-[#0A1E3C] mt-1">{tenants.length}</div>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl text-xl">🏢</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Active Clients</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">{activeClientsCount}</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-xl">✅</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Prospects</span>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">{prospectCount}</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-xl">🎯</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Total Audits</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">{audits.length}</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl text-xl">📊</div>
        </div>
      </div>

      {/* Industry Sector Breakdown Summary */}
      {industrySectorBreakdown.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border shadow-sm mb-8">
          <h2 className="text-sm font-bold text-[#0A1E3C] uppercase tracking-wider mb-3">
            Clients by Industry Sector
          </h2>
          <div className="flex flex-wrap gap-2">
            {industrySectorBreakdown.map(([sector, count]) => (
              <span
                key={sector}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-medium border flex items-center gap-1.5"
              >
                <span>{sector}</span>
                <span className="bg-[#0A1E3C] text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold">
                  {count}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Audits List */}
      {audits.length === 0 ? (
        <div className="p-8 border rounded-2xl bg-white text-center shadow-sm">
          <p className="font-semibold text-slate-700">No discovery audits found.</p>
          <p className="text-xs text-slate-500 mt-1">Create your first audit to start digital maturity assessment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#0A1E3C]">Recent Discovery Audits</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audits.map((audit) => {
              const tenantObj = tenantMap.get(audit.tenant_id);

              return (
                <div key={audit.id} className="p-5 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700 capitalize">
                        {audit.status || "draft"}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(audit.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#0A1E3C] mb-1">{audit.title}</h3>
                    <p className="text-xs text-slate-600 mb-2">
                      <span className="font-medium text-slate-400">Tenant:</span>{" "}
                      <strong>{tenantObj?.name || audit.tenant_id}</strong>
                    </p>

                    {tenantObj && (
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border mb-3 space-y-0.5">
                        <div>Size: <strong className="text-slate-700">{tenantObj.company_size || "N/A"}</strong></div>
                        <div>Revenue: <strong className="text-slate-700">{tenantObj.revenue_range || "N/A"}</strong></div>
                      </div>
                    )}

                    <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 text-xs text-slate-700 flex justify-between items-center mb-3">
                      <span className="font-medium text-slate-500">Maturity Score:</span>
                      <span className="font-extrabold text-[#0A1E3C]">{audit.overall_maturity_score ?? 0} / 5.0</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t mt-auto">
                    <Link
                      href={`/audits/${audit.id}/questionnaire`}
                      className="flex-1 text-center text-xs font-semibold py-2 rounded-xl bg-[#0A1E3C] text-white hover:bg-slate-800 transition-colors"
                    >
                      Questionnaire
                    </Link>
                    <Link
                      href={`/audits/${audit.id}`}
                      className="flex-1 text-center text-xs font-semibold border py-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function NewAuditModal({
  tenants,
  onCreated,
  supabase,
}: {
  tenants: Tenant[];
  onCreated: () => void;
  supabase: any;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !tenantId) return alert("Enter audit title and select a tenant");

    const selectedTenant = tenants.find((t) => t.id === tenantId);
    if (selectedTenant && (selectedTenant.status === "inactive" || selectedTenant.status === "lost")) {
      return alert("Cannot create audits for inactive or lost clients.");
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("audits").insert({
      title,
      tenant_id: tenantId,
      status: "draft",
      conducted_by: user?.id || null,
      raw_responses: {},
    });

    setSaving(false);
    if (error) {
      alert(`Failed to create audit: ${error.message}`);
      console.error(error);
    } else {
      setOpen(false);
      setTitle("");
      setTenantId("");
      onCreated();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#0A1E3C] text-white hover:bg-slate-800 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
      >
        <span>+</span> New Audit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl border">
            <h2 className="text-lg font-bold text-[#0A1E3C] mb-1">Create Discovery Audit</h2>
            <p className="text-xs text-slate-500 mb-4">
              Select an active client tenant to initiate digital maturity evaluation.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Audit Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                  placeholder="e.g. Acme Corp AI Maturity Discovery 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Client Tenant *
                </label>
                <select
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  required
                  className="w-full border rounded-xl p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                >
                  <option value="">Select client tenant...</option>
                  {tenants.map((t) => {
                    const isDisabled = t.status === "inactive" || t.status === "lost";
                    const sizeLabel = t.company_size ? ` [Size: ${t.company_size}]` : "";
                    const revLabel = t.revenue_range ? ` [Rev: ${t.revenue_range}]` : "";
                    const statusLabel = isDisabled ? ` (${t.status.toUpperCase()} - Disabled)` : "";

                    return (
                      <option key={t.id} value={t.id} disabled={isDisabled}>
                        {t.name}
                        {sizeLabel}
                        {revLabel}
                        {statusLabel}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-xs font-semibold border rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0A1E3C] text-white hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-md"
                >
                  {saving ? "Creating..." : "Create Audit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}