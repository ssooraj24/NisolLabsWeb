"use client";

import React from "react";
import { useMaturity } from "./useMaturity";
import { MaturityRadar } from "@/components/intelligence/MaturityRadar";
import { EditableContent } from "@/components/intelligence/EditableContent";

interface MaturityTabProps {
  reportId: string;
}

export default function MaturityTab({ reportId }: MaturityTabProps) {
  const { readiness, capabilityScores, loading, error, saveMaturity } = useMaturity(reportId);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading AI Readiness & Maturity Assessment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load maturity data: {error}
      </div>
    );
  }

  const radarData = readiness?.radar_data || capabilityScores?.capabilities || {};
  const overallScore = readiness?.overall_score ? readiness.overall_score / 20 : undefined;

  return (
    <div className="space-y-6">
      {/* Visual Radar & Score Overview */}
      <MaturityRadar data={radarData} overallScore={overallScore} />

      {/* Editable JSON / Text Representation */}
      <EditableContent
        label="2. AI Readiness Assessment & Capability Analysis"
        initialValue={JSON.stringify(readiness || capabilityScores || {}, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            return saveMaturity(parsed, capabilityScores);
          } catch {
            alert("Invalid JSON format");
          }
        }}
        placeholder="Edit maturity data JSON..."
      />
    </div>
  );
}
