"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createBrowserClient } from "@supabase/ssr";
import { ReportTabs, ReportTabId } from "@/components/intelligence/ReportTabs";
import { StatusBadge } from "@/components/intelligence/StatusBadge";
import { PDFExporter } from "@/components/intelligence/PDFExporter";
import { normalizePricingPlan, PLAN_CONFIG, isTabAllowedForPlan } from "@/lib/report/reportPortfolioTypes";

// Lazy loaded section components
const SummaryTab = dynamic(() => import("@/components/intelligence/report/sections/SummaryTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Executive Summary...</div>,
});

const MaturityTab = dynamic(() => import("@/components/intelligence/report/sections/MaturityTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Readiness Assessment...</div>,
});

const RiskTab = dynamic(() => import("@/components/intelligence/report/sections/RiskTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Risk & Governance Register...</div>,
});

const DataReadinessTab = dynamic(() => import("@/components/intelligence/report/sections/DataReadinessTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Data Strategy Assessment...</div>,
});

const MatrixTab = dynamic(() => import("@/components/intelligence/report/sections/MatrixTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Opportunity Matrix...</div>,
});

const UseCasesTab = dynamic(() => import("@/components/intelligence/report/sections/UseCasesTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading AI Use Cases...</div>,
});

const RoadmapTab = dynamic(() => import("@/components/intelligence/report/sections/RoadmapTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Transformation Roadmap...</div>,
});

const OCMTab = dynamic(() => import("@/components/intelligence/report/sections/OCMTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Change Management (OCM)...</div>,
});

const ROITab = dynamic(() => import("@/components/intelligence/report/sections/ROITab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Financial ROI Projections...</div>,
});

const BlueprintsTab = dynamic(() => import("@/components/intelligence/report/sections/BlueprintsTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Solution Blueprints...</div>,
});

const ProposalTab = dynamic(() => import("@/components/intelligence/report/sections/ProposalTab"), {
  loading: () => <div className="p-8 bg-white rounded-2xl border text-center text-slate-400 text-sm animate-pulse">Loading Proposal Draft...</div>,
});

export default function ReportEditorPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params?.id as string;

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [activeTab, setActiveTab] = useState<ReportTabId>("summary");
  const [report, setReport] = useState<any>(null);
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    if (!auditId) return;
    setLoading(true);
    setError(null);
    try {
      // Fetch Audit details
      const { data: auditData, error: aErr } = await supabase
        .from("audits")
        .select(`
          id,
          title,
          status,
          raw_responses,
          tenants:tenant_id (name, industry, pricing_plan),
          profiles:conducted_by (full_name)
        `)
        .eq("id", auditId)
        .single();

      if (aErr) throw aErr;
      setAudit(auditData);

      // Fetch Latest Report
      const { data: reportData, error: rErr } = await supabase
        .from("audit_reports")
        .select("id, status, version, plan_tier, generated_at, finalized_at")
        .eq("audit_id", auditId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (rErr && rErr.code !== "PGRST116") throw rErr;
      setReport(reportData);
    } catch (err: any) {
      console.error("Error loading report editor:", err);
      setError(err.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [auditId, supabase]);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/intelligence/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to generate report");
      await loadData();
    } catch (err: any) {
      alert(`Report Generation Failed: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleApproveFinalize = async () => {
    if (!report?.id) return;
    setFinalizing(true);
    try {
      const { error: rErr } = await supabase
        .from("audit_reports")
        .update({
          status: "finalized",
          finalized_at: new Date().toISOString(),
        })
        .eq("id", report.id);

      if (rErr) throw rErr;

      await supabase
        .from("audits")
        .update({ status: "report_ready" })
        .eq("id", auditId);

      await loadData();
    } catch (err: any) {
      alert(`Finalization failed: ${err.message}`);
    } finally {
      setFinalizing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Loading Report Editor Workspace...</p>
        </div>
      </div>
    );
  }

  if (error || !audit) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Audit Report</h3>
          <p className="text-sm text-red-600 mb-4">{error || "Audit record not found."}</p>
          <Link href="/intelligence/audits" className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg">
            ← Back to Audits
          </Link>
        </div>
      </div>
    );
  }

  const tenantObj = Array.isArray(audit.tenants) ? audit.tenants[0] : audit.tenants;
  const rawPlan = report?.plan_tier || tenantObj?.pricing_plan || "foundation";
  const activePlan = normalizePricingPlan(rawPlan);
  const planConfig = PLAN_CONFIG[activePlan];

  // If currently on an unauthorized tab, auto-switch to summary
  useEffect(() => {
    if (report && !isTabAllowedForPlan(activeTab, activePlan)) {
      setActiveTab("summary");
    }
  }, [activePlan, activeTab, report]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Bar Header */}
      <div>
        <Link
          href={`/intelligence/audits/${auditId}`}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 mb-3"
        >
          ← Back to Audit Raw Data
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#0A1E3C]">{audit.title}</h1>
              <StatusBadge status={report?.status || audit.status} />
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1">
                ★ Plan: {planConfig.name}
              </span>
              {report?.version && (
                <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold border">
                  v{report.version}.0
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Client: <span className="font-semibold text-slate-800">{tenantObj?.name || "N/A"}</span> • Industry:{" "}
              <span className="font-semibold text-slate-800">{tenantObj?.industry || "Technology"}</span> • Consultant:{" "}
              <span className="font-semibold text-slate-800">{audit.profiles?.full_name || "Unassigned"}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-200 disabled:opacity-50"
            >
              {generating ? "⚡ Analyzing..." : "🔄 Re-Generate with AI"}
            </button>

            <PDFExporter
              reportId={report?.id || auditId}
              auditTitle={audit.title}
              companyName={tenantObj?.name}
              planTier={activePlan}
            />

            {report && report.status !== "finalized" && (
              <button
                onClick={handleApproveFinalize}
                disabled={finalizing}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
              >
                {finalizing ? "Finalizing..." : "✓ Approve & Finalize"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Report Body / Tab Navigation */}
      {!report ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto font-bold">
            🧠
          </div>
          <h3 className="text-xl font-bold text-[#0A1E3C]">No Report Generated Yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Click below to trigger the enterprise AI advisory pipeline and build the tailored Board-Ready Report for the <strong>{planConfig.name}</strong> subscription tier.
          </p>
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 disabled:opacity-50"
          >
            {generating ? "⚡ Running AI Generation Pipeline..." : `🚀 Generate ${planConfig.name} Report`}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tab Bar */}
          <ReportTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            planTier={activePlan}
          />

          {/* Lazy-Loaded Section Component rendering active tab only */}
          <div className="transition-all duration-300">
            {activeTab === "summary" && <SummaryTab reportId={report.id} />}
            {activeTab === "maturity" && <MaturityTab reportId={report.id} />}
            {activeTab === "risk" && <RiskTab reportId={report.id} />}
            {activeTab === "data" && <DataReadinessTab reportId={report.id} />}
            {activeTab === "matrix" && <MatrixTab reportId={report.id} />}
            {activeTab === "usecases" && <UseCasesTab reportId={report.id} />}
            {activeTab === "roadmap" && <RoadmapTab reportId={report.id} />}
            {activeTab === "ocm" && <OCMTab reportId={report.id} />}
            {activeTab === "roi" && <ROITab reportId={report.id} />}
            {activeTab === "blueprints" && <BlueprintsTab reportId={report.id} />}
            {activeTab === "proposal" && <ProposalTab reportId={report.id} />}
          </div>
        </div>
      )}
    </div>
  );
}
