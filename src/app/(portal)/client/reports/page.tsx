"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { StatusBadge } from "@/components/intelligence/StatusBadge";
import { PDFExporter } from "@/components/intelligence/PDFExporter";

interface FinalizedReport {
  id: string;
  audit_id: string;
  version: number;
  status: string;
  finalized_at: string;
  generated_at: string;
  audits: {
    title: string;
    overall_maturity_score: number | null;
    tenants: { name: string; industry?: string } | null;
  } | null;
}

export default function ClientReportsListPage() {
  const router = useRouter();
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [reports, setReports] = useState<FinalizedReport[]>([]);
  const [tenantName, setTenantName] = useState<string>("Valued Client");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadClientReports() {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch current user tenant info
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("tenant_id, tenants:tenant_id(name)")
            .eq("id", user.id)
            .single();

          const tenantObj = Array.isArray(profile?.tenants) ? profile?.tenants[0] : profile?.tenants;
          if (tenantObj?.name) {
            setTenantName(tenantObj.name);
          }
        }

        // 2. Fetch finalized reports (RLS policy automatically restricts to tenant's finalized records)
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select(`
            id,
            audit_id,
            version,
            status,
            finalized_at,
            generated_at,
            audits:audit_id (
              title,
              overall_maturity_score,
              tenants:tenant_id (name, industry)
            )
          `)
          .eq("status", "finalized")
          .order("finalized_at", { ascending: false });

        if (err && err.code !== "PGRST116") throw err;

        setReports((data as unknown as FinalizedReport[]) || []);
      } catch (err: any) {
        console.error("Error loading client reports:", err);
        setError(err.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    }

    loadClientReports();
  }, [supabase]);

  const filteredReports = reports.filter((r) => {
    const title = r.audits?.title || "";
    return searchQuery === "" || title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Client Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0A1E3C] to-slate-900 text-white p-8 rounded-2xl shadow-md border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-400/30">
            Client Portal
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Welcome, {tenantName}</h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Access your finalized AI Transformation Advisory reports, readiness scorecards, phased implementation roadmaps, and architecture solution blueprints.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by report title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
        />
        <span className="text-xs text-slate-500 font-medium">
          {filteredReports.length} Approved Reports
        </span>
      </div>

      {/* Reports Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading approved client reports...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 text-sm">{error}</div>
        ) : filteredReports.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm space-y-2">
            <p className="font-bold text-slate-700">No Finalized Reports Available Yet</p>
            <p className="text-xs text-slate-400">
              Once Nisol AI consultants finalize your AI Assessment Advisory Report, it will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Report Title</th>
                  <th className="py-3.5 px-4">Version</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Maturity Score</th>
                  <th className="py-3.5 px-4">Finalized Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0A1E3C]">
                      <Link href={`/client/reports/${r.id}`} className="hover:text-blue-600">
                        {r.audits?.title || "AI Transformation Report"}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                      v{r.version || 1}.0
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {r.audits?.overall_maturity_score
                        ? `${Number(r.audits.overall_maturity_score).toFixed(1)} / 5.0`
                        : "Approved"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {r.finalized_at
                        ? new Date(r.finalized_at).toLocaleDateString()
                        : new Date(r.generated_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => router.push(`/client/reports/${r.id}`)}
                        className="px-3 py-1.5 bg-[#0A1E3C] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        View Report
                      </button>
                      <PDFExporter reportId={r.id} auditTitle={r.audits?.title} companyName={r.audits?.tenants?.name || tenantName} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
