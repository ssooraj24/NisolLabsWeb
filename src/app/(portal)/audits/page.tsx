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

export default function AuditsPage() {
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
  const [searchQuery, setSearchQuery] = useState("");

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
      setError(`Audits load error: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const tenantMap = useMemo(() => new Map(tenants.map((t) => [t.id, t])), [tenants]);

  const filteredAudits = audits.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const tenantObj = tenantMap.get(a.tenant_id);
    const tenantName = tenantObj?.name || "";
    const sector = tenantObj?.industry_sector || tenantObj?.industry || "";
    return (
      a.title.toLowerCase().includes(q) ||
      tenantName.toLowerCase().includes(q) ||
      sector.toLowerCase().includes(q)
    );
  });

  if (loading) return <p className="p-6 text-xs text-slate-500 font-medium">Loading audits list...</p>;
  if (error) return <p className="p-6 text-xs text-red-600 font-semibold">{error}</p>;

  return (
    <section className="p-6 min-h-screen bg-[#F8FAFC] font-sans">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1E3C]">Audits Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage and conduct digital maturity assessments across client tenants.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search audits or client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-xl px-3.5 py-2 text-xs w-full md:w-64 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
        />
      </div>

      {filteredAudits.length === 0 ? (
        <div className="p-8 border rounded-2xl bg-white text-center shadow-sm">
          <p className="font-semibold text-slate-700 text-sm">No audits found</p>
          <p className="text-xs text-slate-500 mt-1">Create audits from the Discovery Dashboard.</p>
          <Link
            href="/dashboard"
            className="inline-block mt-4 text-xs font-semibold bg-[#0A1E3C] text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAudits.map((audit) => {
            const tenantObj = tenantMap.get(audit.tenant_id);

            return (
              <div
                key={audit.id}
                className="p-5 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-slate-100 text-slate-700">
                      {audit.status || "draft"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(audit.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="font-bold text-base text-[#0A1E3C] mb-1">{audit.title}</h2>
                  <p className="text-xs text-slate-600 mb-2">
                    <span className="font-medium text-slate-400">Tenant:</span>{" "}
                    <strong>{tenantObj?.name || audit.tenant_id}</strong>
                  </p>

                  {tenantObj && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-blue-50 text-blue-800">
                        {tenantObj.industry_sector || tenantObj.industry || "General"}
                      </span>
                      {tenantObj.company_size && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-700">
                          {tenantObj.company_size}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="bg-slate-50 p-2.5 rounded-xl border text-xs text-slate-600 mb-4 flex justify-between items-center">
                    <span>Maturity Score:</span>
                    <span className="font-bold text-[#0A1E3C] text-sm">
                      {audit.overall_maturity_score ?? 0} / 5.0
                    </span>
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
      )}
    </section>
  );
}
