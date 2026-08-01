"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { ReportTabs, ReportTabId } from "@/components/intelligence/ReportTabs";
import { StatusBadge } from "@/components/intelligence/StatusBadge";
import { PDFExporter } from "@/components/intelligence/PDFExporter";

// Read-only visualization components
import { MaturityRadar } from "@/components/intelligence/MaturityRadar";
import { OpportunityMatrix } from "@/components/intelligence/OpportunityMatrix";
import { RoadmapTimeline } from "@/components/intelligence/RoadmapTimeline";
import { BlueprintCard, BlueprintItem } from "@/components/intelligence/BlueprintCard";
import { calculateROICalculations } from "@/lib/utils/roiCalculator";
import { getSolutionBlueprints } from "@/lib/ai/defaultBlueprints";

export default function ClientReportViewerPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id as string;

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchFinalizedReport() {
      setLoading(true);
      setError(null);
      try {
        // Fetch Report by ID
        const { data: reportData, error: rErr } = await supabase
          .from("audit_reports")
          .select("*")
          .eq("id", reportId)
          .single();

        if (rErr || !reportData) {
          throw new Error("Report not found or access restricted.");
        }

        setReport(reportData);

        // Fetch Audit metadata
        const { data: auditData } = await supabase
          .from("audits")
          .select("title, overall_maturity_score, tenants:tenant_id (name, industry)")
          .eq("id", reportData.audit_id)
          .single();

        setAudit(auditData);
      } catch (err: any) {
        console.error("Error fetching client report:", err);
        setError(err.message || "Failed to load report");
      } finally {
        setLoading(false);
      }
    }

    fetchFinalizedReport();
  }, [reportId, supabase]);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Loading Client Advisory Report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-red-800 mb-2">Report Access Error</h3>
          <p className="text-sm text-red-600 mb-4">{error || "Requested report is unavailable."}</p>
          <Link href="/client/reports" className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg">
            ← Back to My Reports
          </Link>
        </div>
      </div>
    );
  }

  const tenantObj = Array.isArray(audit?.tenants) ? audit?.tenants[0] : audit?.tenants;
  const useCasesList: any[] = report.top_use_cases?.use_cases || (Array.isArray(report.top_use_cases) ? report.top_use_cases : []);
  const blueprintsList: BlueprintItem[] = getSolutionBlueprints(report.solution_blueprints);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/client/reports"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 mb-3"
        >
          ← Back to All Approved Reports
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#0A1E3C]">{audit?.title || "AI Advisory Report"}</h1>
              <StatusBadge status={report.status} />
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold border">
                v{report.version || 1}.0
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Client: <span className="font-semibold text-slate-800">{tenantObj?.name || "Client"}</span> ({tenantObj?.industry || "Technology"})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PDFExporter reportId={report.id} auditTitle={audit?.title} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ReportTabs activeTab={activeTab} onTabChange={(t) => setActiveTab(t)} />

      {/* TAB CONTENT (STRICT READ-ONLY) */}
      <div className="space-y-6">
        {activeTab === "summary" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#0A1E3C] border-b border-slate-100 pb-3">1. Executive Summary</h2>
            <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans bg-slate-50/50 p-5 rounded-xl border border-slate-100">
              {report.executive_summary || "No executive summary text."}
            </div>
          </div>
        )}

        {activeTab === "maturity" && (
          <div className="space-y-6">
            <MaturityRadar
              data={report.ai_readiness_assessment?.radar_data || report.capability_scores?.capabilities || {}}
              overallScore={report.ai_readiness_assessment?.overall_score ? report.ai_readiness_assessment.overall_score / 20 : undefined}
            />
          </div>
        )}

        {activeTab === "matrix" && (
          <div className="space-y-6">
            <OpportunityMatrix data={report.opportunity_matrix} />
          </div>
        )}

        {activeTab === "usecases" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#0A1E3C] border-b border-slate-100 pb-3">Prioritized AI Use Cases</h2>
            {useCasesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {useCasesList.map((uc: any, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        {uc.department || "General"}
                      </span>
                      {uc.estimated_roi_percentage && (
                        <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ROI: +{uc.estimated_roi_percentage}%
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{uc.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No use cases listed.</p>
            )}
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="space-y-6">
            <RoadmapTimeline phases={report.roadmap?.phases} />
          </div>
        )}

        {activeTab === "roi" && (() => {
          const roiCalc = calculateROICalculations(report?.roi_estimates);
          return (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-[#0A1E3C] border-b border-slate-100 pb-3">Financial ROI Projections</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Est. Investment</span>
                  <span className="text-xl font-extrabold text-[#0A1E3C] mt-1 block">
                    ${roiCalc.summary?.total_estimated_investment_usd?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Annual Savings</span>
                  <span className="text-xl font-extrabold text-emerald-600 mt-1 block">
                    ${roiCalc.summary?.annual_cost_savings_usd?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Payback Period</span>
                  <span className="text-xl font-extrabold text-[#0A1E3C] mt-1 block">
                    {roiCalc.summary?.payback_period_months || 0} Months
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Program ROI</span>
                  <span className="text-xl font-extrabold text-blue-600 mt-1 block">
                    +{roiCalc.summary?.overall_roi_percentage || 0}%
                  </span>
                </div>
              </div>
            </div>
          );
        })()}

        {activeTab === "blueprints" && (
          <div className="space-y-4">
            {blueprintsList.length > 0 ? (
              blueprintsList.map((bp, i) => <BlueprintCard key={i} blueprint={bp} />)
            ) : (
              <div className="p-6 bg-white rounded-2xl border text-center text-slate-400 text-sm">
                No solution blueprints available.
              </div>
            )}
          </div>
        )}

        {activeTab === "proposal" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#0A1E3C] border-b border-slate-100 pb-3">Commercial Proposal Draft</h2>
            <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans bg-slate-50/50 p-5 rounded-xl border border-slate-100">
              {report.proposal_draft || "No proposal text."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
