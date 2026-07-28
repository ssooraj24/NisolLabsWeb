import React from "react";

export type AuditStatus = "draft" | "data_collection" | "data_collected" | "in_analysis" | "report_ready" | "presented" | "review" | "approved" | "finalized" | string;

interface StatusBadgeProps {
  status: AuditStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = (status || "draft").toLowerCase();

  const getStyles = () => {
    switch (normalized) {
      case "data_collected":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "in_analysis":
        return "bg-amber-50 text-amber-700 border-amber-200 animate-pulse";
      case "report_ready":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "presented":
      case "finalized":
      case "approved":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "data_collection":
      case "review":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "draft":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getLabel = () => {
    switch (normalized) {
      case "data_collected":
        return "Data Collected";
      case "in_analysis":
        return "In Analysis";
      case "report_ready":
        return "Report Ready";
      case "presented":
        return "Presented";
      case "data_collection":
        return "Data Collection";
      case "finalized":
        return "Finalized";
      case "approved":
        return "Approved";
      case "review":
        return "In Review";
      case "draft":
      default:
        return "Draft";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStyles()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {getLabel()}
    </span>
  );
}
