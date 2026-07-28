"use client";

import React from "react";
import { useSummary } from "./useSummary";
import { EditableContent } from "@/components/intelligence/EditableContent";

interface SummaryTabProps {
  reportId: string;
}

export default function SummaryTab({ reportId }: SummaryTabProps) {
  const { summary, loading, error, saveSummary } = useSummary(reportId);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Executive Summary...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load summary: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EditableContent
        label="1. Executive Summary"
        initialValue={summary}
        onSave={saveSummary}
        placeholder="Executive summary content..."
      />
    </div>
  );
}
