"use client";

import React, { useState, useEffect } from "react";
import { useProposal } from "./useProposal";
import { PricingForm, PricingData } from "./PricingForm";
import { ExportButtons } from "./ExportButtons";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { replacePlaceholders } from "@/lib/pricing/pricingEngine";
import { createBrowserClient } from "@supabase/ssr";
import { calculateROICalculations } from "@/lib/utils/roiCalculator";

interface ProposalTabProps {
  reportId: string;
}

export default function ProposalTab({ reportId }: ProposalTabProps) {
  const { proposal, loading, error, saveProposal } = useProposal(reportId);

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [contextData, setContextData] = useState<Record<string, any>>({});
  const [pricing, setPricing] = useState<PricingData>({
    engagementType: "Standard",
    dailyRate: 48000,
    days: 3,
    totalInvestment: 144000,
    paymentTerms: "30% Upfront / 70% on Completion",
  });

  // Fetch contextual metadata for template variable replacements
  useEffect(() => {
    if (!reportId) return;

    async function loadReportContext() {
      try {
        const { data: reportData } = await supabase
          .from("audit_reports")
          .select("audit_id, ai_readiness_assessment, roi_estimates, top_use_cases, quick_wins_strategic_bets")
          .eq("id", reportId)
          .single();

        if (reportData?.audit_id) {
          const { data: auditData } = await supabase
            .from("audits")
            .select("title, overall_maturity_score, tenants:tenant_id (name, industry, employee_count)")
            .eq("id", reportData.audit_id)
            .single();

          const tenantObj = Array.isArray(auditData?.tenants) ? auditData?.tenants[0] : auditData?.tenants;

          const roiCalc = calculateROICalculations(reportData?.roi_estimates);

          setContextData({
            companyName: tenantObj?.name || "Valued Client",
            industry: tenantObj?.industry || "Technology",
            employeeCount: tenantObj?.employee_count || 100,
            overallScore: auditData?.overall_maturity_score || reportData?.ai_readiness_assessment?.overall_score || 3.8,
            totalROI: roiCalc.summary?.overall_roi_percentage ? `+${roiCalc.summary.overall_roi_percentage}%` : "0%",
            paybackPeriod: roiCalc.summary?.payback_period_months ? `${roiCalc.summary.payback_period_months} Months` : "0 Months",
            totalUseCases: reportData?.top_use_cases?.use_cases?.length || 20,
            quickWinsCount: reportData?.quick_wins_strategic_bets?.quick_wins?.length || 5,
            strategicBetsCount: reportData?.quick_wins_strategic_bets?.strategic_bets?.length || 3,
          });
        }
      } catch (err) {
        console.error("Error loading proposal context:", err);
      }
    }

    loadReportContext();
  }, [reportId, supabase]);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Commercial Proposal Draft...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load proposal draft: {error}
      </div>
    );
  }

  // Combine context data with current pricing calculation
  const fullReplacements = {
    ...contextData,
    dailyRate: pricing.dailyRate,
    totalInvestment: pricing.totalInvestment,
  };

  const processedProposalText = replacePlaceholders(proposal, fullReplacements);

  return (
    <div className="space-y-6">
      {/* Top Export Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-[#0A1E3C]">Commercial Proposal Draft</h3>
          <p className="text-xs text-slate-500">
            Client: <span className="font-bold text-slate-800">{contextData.companyName || "Client"}</span> ({contextData.industry || "Industry"})
          </p>
        </div>

        <ExportButtons proposalText={processedProposalText} companyName={contextData.companyName} />
      </div>

      {/* Interactive Pricing Engine */}
      <PricingForm
        data={pricing}
        employeeCount={contextData.employeeCount}
        onUpdate={(updated) => setPricing(updated)}
      />

      {/* Main Proposal Text Editor */}
      <EditableContent
        label="8. Formal Proposal Draft (Markdown with Template Variables)"
        initialValue={proposal}
        onSave={saveProposal}
        placeholder="Proposal draft markdown..."
      />

      {/* Real-Time Preview Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="text-sm font-bold text-[#0A1E3C] uppercase tracking-wider">
            👁 Real-Time Template Variable Preview
          </h4>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Variables Auto-Replaced
          </span>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans bg-slate-50 p-5 rounded-xl border border-slate-100">
          {processedProposalText || <span className="text-slate-400 italic">No proposal content generated.</span>}
        </div>
      </div>
    </div>
  );
}
