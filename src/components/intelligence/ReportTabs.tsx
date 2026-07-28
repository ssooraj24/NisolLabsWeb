"use client";

import React from "react";

export type ReportTabId =
  | "summary"
  | "maturity"
  | "matrix"
  | "usecases"
  | "roadmap"
  | "roi"
  | "blueprints"
  | "proposal";

interface TabOption {
  id: ReportTabId;
  label: string;
  icon: string;
}

export const REPORT_TABS: TabOption[] = [
  { id: "summary", label: "Executive Summary", icon: "📄" },
  { id: "maturity", label: "Readiness & Radar", icon: "📊" },
  { id: "matrix", label: "Opportunity Matrix", icon: "🎯" },
  { id: "usecases", label: "Top 20 Use Cases", icon: "💡" },
  { id: "roadmap", label: "Transformation Roadmap", icon: "🗺️" },
  { id: "roi", label: "ROI Analysis", icon: "💰" },
  { id: "blueprints", label: "Solution Blueprints", icon: "📐" },
  { id: "proposal", label: "Proposal Draft", icon: "📝" },
];

interface ReportTabsProps {
  activeTab: ReportTabId;
  onTabChange: (tabId: ReportTabId) => void;
}

export function ReportTabs({ activeTab, onTabChange }: ReportTabsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 overflow-x-auto scrollbar-thin">
      <nav className="flex items-center gap-1 min-w-max">
        {REPORT_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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
