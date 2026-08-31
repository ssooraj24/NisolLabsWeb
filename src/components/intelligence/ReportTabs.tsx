"use client";

import React from "react";

import { isTabAllowedForPlan, PricingPlan, normalizePricingPlan, PLAN_CONFIG } from "@/lib/report/reportPortfolioTypes";

export type ReportTabId =
  | "summary"
  | "maturity"
  | "risk"
  | "data"
  | "matrix"
  | "usecases"
  | "roadmap"
  | "ocm"
  | "roi"
  | "blueprints"
  | "proposal";

interface TabOption {
  id: ReportTabId;
  label: string;
  icon: string;
  minPlanLabel?: string;
}

export const REPORT_TABS: TabOption[] = [
  { id: "summary", label: "Executive Summary", icon: "📄" },
  { id: "maturity", label: "Readiness & Benchmark", icon: "📊" },
  { id: "risk", label: "Risk & Governance", icon: "🛡️", minPlanLabel: "Growth" },
  { id: "data", label: "Data Strategy", icon: "🗄️", minPlanLabel: "Growth" },
  { id: "matrix", label: "Opportunity Matrix", icon: "🎯" },
  { id: "usecases", label: "Prioritized Use Cases", icon: "💡" },
  { id: "roadmap", label: "Transformation Roadmap", icon: "🗺️" },
  { id: "ocm", label: "Change Mgmt (OCM)", icon: "👥", minPlanLabel: "Growth" },
  { id: "roi", label: "ROI & Sensitivity", icon: "💰", minPlanLabel: "Growth" },
  { id: "blueprints", label: "Solution Blueprints", icon: "📐", minPlanLabel: "Growth" },
  { id: "proposal", label: "Proposal Draft", icon: "📝" },
];

interface ReportTabsProps {
  activeTab: ReportTabId;
  onTabChange: (tabId: ReportTabId) => void;
  planTier?: PricingPlan | string;
}

export function ReportTabs({ activeTab, onTabChange, planTier }: ReportTabsProps) {
  const normPlan = normalizePricingPlan(planTier);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 overflow-x-auto scrollbar-thin">
      <nav className="flex items-center gap-1 min-w-max">
        {REPORT_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAllowed = isTabAllowedForPlan(tab.id, normPlan);

          if (!isAllowed) {
            return (
              <button
                key={tab.id}
                type="button"
                disabled
                title={`This section requires a ${tab.minPlanLabel || "Growth"} subscription`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-50/70 border border-dashed border-slate-200 cursor-not-allowed whitespace-nowrap opacity-75 select-none"
              >
                <span className="text-slate-400">🔒</span>
                <span>{tab.label}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-slate-200/80 text-slate-500 font-bold uppercase">
                  {tab.minPlanLabel || "Upgrade"}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0A1E3C] text-white shadow-md scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
