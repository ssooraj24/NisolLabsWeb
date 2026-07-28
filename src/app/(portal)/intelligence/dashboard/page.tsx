"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { StatusBadge } from "@/components/intelligence/StatusBadge";

interface AuditWorkItem {
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

interface ActivityLog {
  id: string;
  title: string;
  timestamp: string;
  type: "generated" | "started" | "approved" | "finalized";
}

export default function IntelligenceDashboardPage() {
  const router = useRouter();
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [audits, setAudits] = useState<AuditWorkItem[]>([]);
  const [userProfile, setUserProfile] = useState<{ full_name?: string; role?: string }>({});
  const [loading, setLoading] = useState(true);
  const [startingAnalysisId, setStartingAnalysisId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filters & State
  const [activeKpiFilter, setActiveKpiFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedConsultant, setSelectedConsultant] = useState<string>("ALL");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  async function loadDashboardData() {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch User Profile
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", user.id)
          .single();
        if (profile) setUserProfile(profile);
      }

      // 2. Fetch Audits for Work Queue
      const { data: auditData, error: aErr } = await supabase
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
        .order("updated_at", { ascending: false });

      if (aErr) throw aErr;
      setAudits((auditData as unknown as AuditWorkItem[]) || []);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (err: any) {
      console.error("Error loading dashboard data:", err);
      setError(err.message || "Failed to load dashboard workspace");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, [supabase]);

  const isSuperAdmin = userProfile.role === "super_admin" || userProfile.role === "admin";

  // Calculate KPI Counts
  const readyForAnalysisCount = audits.filter(
    (a) => (a.status || "draft").toLowerCase() === "data_collected"
  ).length;

  const inProgressCount = audits.filter(
    (a) => (a.status || "").toLowerCase() === "in_analysis"
  ).length;

  const reportsReadyCount = audits.filter(
    (a) => (a.status || "").toLowerCase() === "report_ready"
  ).length;

  const clientPresentationsCount = audits.filter((a) => {
    const st = (a.status || "").toLowerCase();
    return st === "presented" || st === "finalized" || st === "approved";
  }).length;

  // Filtered Work Queue Items
  const filteredWorkQueue = audits.filter((item) => {
    const statusLower = (item.status || "draft").toLowerCase();

    let matchesKpi = true;
    if (activeKpiFilter === "data_collected") matchesKpi = statusLower === "data_collected";
    else if (activeKpiFilter === "in_analysis") matchesKpi = statusLower === "in_analysis";
    else if (activeKpiFilter === "report_ready") matchesKpi = statusLower === "report_ready";
    else if (activeKpiFilter === "presented") {
      matchesKpi = statusLower === "presented" || statusLower === "finalized" || statusLower === "approved";
    }

    const clientName = item.tenants?.name || "";
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientName.toLowerCase().includes(searchQuery.toLowerCase());

    const consultantName = item.profiles?.full_name || "";
    const matchesConsultant =
      selectedConsultant === "ALL" ||
      consultantName.toLowerCase() === selectedConsultant.toLowerCase();

    return matchesKpi && matchesSearch && matchesConsultant;
  });

  // Unique Consultants list for Super Admin filter
  const consultants = [
    "ALL",
    ...Array.from(new Set(audits.map((a) => a.profiles?.full_name).filter(Boolean))) as string[],
  ];

  // Most recent audit ready for analysis
  const nextReadyAudit = audits.find(
    (a) => (a.status || "draft").toLowerCase() === "data_collected"
  );

  // Trigger Start Analysis
  const handleStartAnalysis = async (auditId: string) => {
    setStartingAnalysisId(auditId);
    try {
      const res = await fetch("/api/intelligence/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to trigger analysis");
      router.push(`/intelligence/audits/${auditId}/report`);
    } catch (err: any) {
      alert(`Analysis Trigger Failed: ${err.message}`);
    } finally {
      setStartingAnalysisId(null);
    }
  };

  // Recent Activity Feed mock/data
  const recentActivities: ActivityLog[] = audits.slice(0, 5).map((a) => {
    const st = (a.status || "draft").toLowerCase();
    let type: ActivityLog["type"] = "started";
    let title = `${a.title} (${a.tenants?.name || "Client"}) assessment updated`;

    if (st === "report_ready") {
      type = "generated";
      title = `${a.tenants?.name || "Client"} AI Report Generated`;
    } else if (st === "presented" || st === "finalized") {
      type = "finalized";
      title = `${a.tenants?.name || "Client"} Proposal & Advisory Approved`;
    } else if (st === "in_analysis") {
      type = "started";
      title = `${a.tenants?.name || "Client"} AI Pipeline Running`;
    }

    return {
      id: a.id,
      title,
      timestamp: a.conducted_at || a.created_at,
      type,
    };
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A1E3C] text-white p-8 rounded-2xl shadow-md border border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-300 font-bold block mb-1">
            Nisol Intelligence
          </span>
          <h1 className="text-2xl font-extrabold text-white">
            Welcome back, {userProfile.full_name || "Consultant"}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            AI Transformation Intelligence & Advisory Platform • Actionable Work Queue
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-xs font-mono text-slate-400 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            🕒 Last updated: {lastUpdated || "Now"}
          </span>

          {nextReadyAudit && (
            <button
              onClick={() => handleStartAnalysis(nextReadyAudit.id)}
              disabled={Boolean(startingAnalysisId)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <span>+</span>
              <span>
                {startingAnalysisId === nextReadyAudit.id
                  ? "Starting AI Analysis..."
                  : `Start Analysis (${nextReadyAudit.tenants?.name || "Next Audit"})`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Actionable KPI Cards (Clickable Filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ready for Analysis */}
        <div
          onClick={() => setActiveKpiFilter(activeKpiFilter === "data_collected" ? "ALL" : "data_collected")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
            activeKpiFilter === "data_collected"
              ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20"
              : "bg-white border-slate-200 hover:border-blue-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ready for Analysis</span>
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0A1E3C]">{readyForAnalysisCount}</span>
            <span className="text-xs font-semibold text-blue-600">Awaiting AI Pipeline →</span>
          </div>
        </div>

        {/* Card 2: Analysis in Progress */}
        <div
          onClick={() => setActiveKpiFilter(activeKpiFilter === "in_analysis" ? "ALL" : "in_analysis")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
            activeKpiFilter === "in_analysis"
              ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20"
              : "bg-white border-slate-200 hover:border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Analysis in Progress</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0A1E3C]">{inProgressCount}</span>
            <span className="text-xs font-semibold text-amber-600">AI Running →</span>
          </div>
        </div>

        {/* Card 3: Reports Ready */}
        <div
          onClick={() => setActiveKpiFilter(activeKpiFilter === "report_ready" ? "ALL" : "report_ready")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
            activeKpiFilter === "report_ready"
              ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20"
              : "bg-white border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reports Ready</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0A1E3C]">{reportsReadyCount}</span>
            <span className="text-xs font-semibold text-emerald-600">Review & Edit →</span>
          </div>
        </div>

        {/* Card 4: Client Presentations */}
        <div
          onClick={() => setActiveKpiFilter(activeKpiFilter === "presented" ? "ALL" : "presented")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
            activeKpiFilter === "presented"
              ? "bg-purple-50 border-purple-500 ring-2 ring-purple-500/20"
              : "bg-white border-slate-200 hover:border-purple-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Presentations</span>
            <span className="w-2 h-2 rounded-full bg-purple-600" />
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0A1E3C]">{clientPresentationsCount}</span>
            <span className="text-xs font-semibold text-purple-600">Approved & Final →</span>
          </div>
        </div>
      </div>

      {/* Main Work Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-[#0A1E3C]">My Consultant Work Queue</h2>
            <p className="text-xs text-slate-500">
              Prioritized list of active client audits requiring analysis, review, or delivery.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search assessment or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-60"
            />

            <select
              value={activeKpiFilter}
              onChange={(e) => setActiveKpiFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium text-slate-700"
            >
              <option value="ALL">All Stages</option>
              <option value="data_collected">Ready for Analysis</option>
              <option value="in_analysis">Analysis in Progress</option>
              <option value="report_ready">Reports Ready</option>
              <option value="presented">Client Presentations</option>
            </select>

            {isSuperAdmin && consultants.length > 1 && (
              <select
                value={selectedConsultant}
                onChange={(e) => setSelectedConsultant(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium text-slate-700"
              >
                {consultants.map((c) => (
                  <option key={c} value={c}>
                    {c === "ALL" ? "All Consultants" : c}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Work Queue Table */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading consultant work queue...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 text-sm">{error}</div>
        ) : filteredWorkQueue.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No audits found in this work queue filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Assessment</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Progress</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkQueue.map((item) => {
                  const respCount = item.raw_responses ? Object.keys(item.raw_responses).length : 0;
                  const st = (item.status || "draft").toLowerCase();

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0A1E3C]">
                        <Link href={`/intelligence/audits/${item.id}`} className="hover:text-blue-600">
                          {item.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {item.tenants?.name || "N/A"}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        {respCount} / 62 Questions
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {st === "data_collected" && (
                          <button
                            onClick={() => handleStartAnalysis(item.id)}
                            disabled={startingAnalysisId === item.id}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs disabled:opacity-50"
                          >
                            {startingAnalysisId === item.id ? "Analyzing..." : "Start Analysis"}
                          </button>
                        )}

                        {st === "in_analysis" && (
                          <button
                            onClick={() => router.push(`/intelligence/audits/${item.id}/report`)}
                            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                          >
                            View Running Status
                          </button>
                        )}

                        {st === "report_ready" && (
                          <button
                            onClick={() => router.push(`/intelligence/audits/${item.id}/report`)}
                            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                          >
                            Review Report
                          </button>
                        )}

                        {(st === "presented" || st === "finalized" || st === "approved") && (
                          <button
                            onClick={() => router.push(`/client/reports`)}
                            className="px-4 py-1.5 bg-[#0A1E3C] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                          >
                            View Client Deliverable
                          </button>
                        )}

                        {st === "draft" && (
                          <button
                            onClick={() => router.push(`/intelligence/audits/${item.id}`)}
                            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                          >
                            Open Raw Data
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom Section: Activity Stream & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Stream */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#0A1E3C] uppercase tracking-wider border-b border-slate-100 pb-2">
            ⏱ Recent Audit Activity Stream
          </h3>
          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span className="font-semibold text-slate-800">{act.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(act.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#0A1E3C] uppercase tracking-wider border-b border-slate-100 pb-2">
            🔗 Quick Navigation
          </h3>

          <div className="space-y-2.5">
            <Link
              href="/audits/new"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-xl border border-slate-200 transition-colors text-xs font-semibold"
            >
              <span>+ Create Assessment</span>
              <span>→</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-xl border border-slate-200 transition-colors text-xs font-semibold"
            >
              <span>📋 View Discovery Portal</span>
              <span>→</span>
            </Link>

            <Link
              href="/intelligence/templates"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-xl border border-slate-200 transition-colors text-xs font-semibold"
            >
              <span>🛠 Report Templates</span>
              <span>→</span>
            </Link>

            <Link
              href="/intelligence/blueprints"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-xl border border-slate-200 transition-colors text-xs font-semibold"
            >
              <span>📐 Solution Blueprint Library</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
