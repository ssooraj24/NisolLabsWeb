"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { StatusBadge } from "@/components/intelligence/StatusBadge";

interface AuditListItem {
  id: string;
  title: string;
  status: string;
  overall_maturity_score: number | null;
  conducted_at: string;
  created_at: string;
  raw_responses: Record<string, any> | null;
  tenants: { name: string; industry?: string } | null;
  profiles: { full_name: string } | null;
}

export default function IntelligenceAuditsListPage() {
  const router = useRouter();
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [audits, setAudits] = useState<AuditListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchAudits() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audits")
          .select(`
            id,
            title,
            status,
            overall_maturity_score,
            conducted_at,
            created_at,
            raw_responses,
            tenants:tenant_id (name, industry),
            profiles:conducted_by (full_name)
          `)
          .order("created_at", { ascending: false });

        if (err) throw err;
        setAudits((data as unknown as AuditListItem[]) || []);
      } catch (err: any) {
        console.error("Failed to load audits:", err);
        setError(err.message || "Failed to load audits");
      } finally {
        setLoading(false);
      }
    }

    fetchAudits();
  }, [supabase]);

  const filteredAudits = audits.filter((a) => {
    const matchesStatus = statusFilter === "ALL" || (a.status || "draft").toLowerCase() === statusFilter.toLowerCase();
    const clientName = a.tenants?.name || "";
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1E3C]">Nisol Intelligence - Audits Workspace</h1>
          <p className="text-sm text-slate-500 mt-1">
            Select an assessment audit to review raw responses, trigger AI report generation, or edit deliverables.
          </p>
        </div>
        <Link
          href="/audits/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
        >
          + New Assessment Audit
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {["ALL", "data_collected", "in_analysis", "report_ready", "presented", "draft"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-[#0A1E3C] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "ALL" ? "All Statuses" : st.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by client or audit title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72"
        />
      </div>

      {/* Audits Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading assessment audits...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 text-sm">{error}</div>
        ) : filteredAudits.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No audits found matching criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Audit Title</th>
                  <th className="py-3.5 px-4">Client / Tenant</th>
                  <th className="py-3.5 px-4">Consultant</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Score</th>
                  <th className="py-3.5 px-4">Answered</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAudits.map((a) => {
                  const respCount = a.raw_responses ? Object.keys(a.raw_responses).length : 0;
                  return (
                    <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0A1E3C]">
                        <Link href={`/intelligence/audits/${a.id}`} className="hover:text-blue-600">
                          {a.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {a.tenants?.name || "N/A"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {a.profiles?.full_name || "Unassigned"}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {a.overall_maturity_score ? `${Number(a.overall_maturity_score).toFixed(1)} / 5` : "-"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                        {respCount} / 62
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => router.push(`/intelligence/audits/${a.id}`)}
                          className="px-3 py-1.5 bg-[#0A1E3C] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          Open Studio
                        </button>
                        <button
                          onClick={() => router.push(`/intelligence/audits/${a.id}/report`)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          Report
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
