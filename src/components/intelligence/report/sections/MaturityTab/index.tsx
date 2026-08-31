"use client";

import React from "react";
import { useMaturity } from "./useMaturity";
import { MaturityRadar } from "@/components/intelligence/MaturityRadar";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { BarChart2, TrendingUp, Award, Layers } from "lucide-react";

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
  const rawScore = readiness?.overall_score || 42;
  const clientScore = typeof rawScore === "number" && rawScore <= 5 ? Math.round(rawScore * 20) : Math.min(100, Math.max(10, Math.round(rawScore)));
  const industryBenchmark = readiness?.benchmark_score || 64;
  const topQuartile = readiness?.top_quartile_score || 86;

  return (
    <div className="space-y-6">
      {/* Sector Benchmark Comparison Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <BarChart2 className="w-4 h-4" />
          Industry Peer Benchmarking
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Client Score</span>
            <div className="text-2xl font-black text-[#0A1E3C] mt-1">
              {(clientScore / 20).toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 5.0 ({clientScore}%)</span>
            </div>
            <span className="text-[11px] font-semibold text-amber-600 mt-1 block">Developing Baseline</span>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
            <span className="text-[11px] font-bold text-amber-700 uppercase block">Industry Sector Median</span>
            <div className="text-2xl font-black text-amber-900 mt-1">
              {(industryBenchmark / 20).toFixed(1)} <span className="text-xs text-amber-600/70 font-normal">/ 5.0 ({industryBenchmark}%)</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Cross-Enterprise Average</span>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-700 uppercase block">Top Quartile (Leaders)</span>
            <div className="text-2xl font-black text-emerald-900 mt-1">
              {(topQuartile / 20).toFixed(1)} <span className="text-xs text-emerald-600/70 font-normal">/ 5.0 ({topQuartile}%)</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Top 25% AI Adopters</span>
          </div>
        </div>
      </div>

      {/* Visual Radar & Score Overview */}
      <MaturityRadar data={radarData} overallScore={clientScore / 20} />

      {/* Editable JSON / Text Representation */}
      <EditableContent
        label="AI Readiness Assessment & Capability Analysis JSON"
        initialValue={JSON.stringify(readiness || capabilityScores || {}, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            return saveMaturity(parsed, capabilityScores);
          } catch {
            alert("Invalid JSON format");
            return Promise.resolve();
          }
        }}
        placeholder="Edit maturity data JSON..."
      />
    </div>
  );
}
