"use client";

import React, { useState } from "react";
import { useSummary } from "./useSummary";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { FileText, TrendingUp, AlertTriangle, Lightbulb, CheckCircle, DollarSign } from "lucide-react";

interface SummaryTabProps {
  reportId: string;
}

export default function SummaryTab({ reportId }: SummaryTabProps) {
  const { summary, loading, error, saveSummary } = useSummary(reportId);
  const [isEditingStructured, setIsEditingStructured] = useState(false);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Executive Summary Briefing...
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
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-br from-[#0A1E3C] to-[#041024] p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            Minto Pyramid Executive Briefing
          </div>
          <h2 className="text-xl font-black tracking-tight">Executive Summary & Transformation Thesis</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Board-ready strategic briefing synthesizing current operational maturity, critical vulnerabilities, and projected 5-year financial impact.
          </p>
        </div>

        <button
          onClick={() => setIsEditingStructured(!isEditingStructured)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all"
        >
          {isEditingStructured ? "👁️ View Executive Presentation" : "✏️ Edit Executive Content"}
        </button>
      </div>

      {!isEditingStructured ? (
        <div className="space-y-6">
          {/* Minto Pyramid Structured 3-Tier Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Situation */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" />
                1. Situation (Current State)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                The enterprise maintains established operational capabilities across core service lines, with growing demand for rapid delivery. Core departmental workflows rely heavily on legacy software platforms, manual data verification, and distributed knowledge silos.
              </p>
            </div>

            {/* 2. Complication */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                2. Complication (Urgency)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Over 25% of frontline staff hours are consumed by repetitive data collation, manual QA cycles, and proposal assembly. Siloed data repositories and lack of centralized AI governance create growing vulnerability against sector peers and regulatory mandates.
              </p>
            </div>

            {/* 3. Resolution */}
            <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                3. Resolution (Transformation)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Execute a 4-phase transformation: deploy high-ROI conversational RAG hubs and API PII proxies in Phase 1, expand autonomous agents into finance and support in Phase 2, and institute a self-governing AI Center of Excellence (CoE).
              </p>
            </div>
          </div>

          {/* Full Narrative Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Strategic Executive Narrative
            </h3>
            <div className="prose prose-slate max-w-none text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {summary ||
                "Following an extensive AI Readiness Assessment, Nisol AI has formulated a comprehensive transformation strategy tailored to accelerate throughput, eliminate manual bottlenecks, and establish robust DPDP-compliant governance.\n\nImmediate high-impact quick wins in QA automation and knowledge RAG will deliver payback within 7 months, unlocking positive cumulative net benefits across a 5-year transformation horizon."}
            </div>
          </div>
        </div>
      ) : (
        /* Editable Content */
        <EditableContent
          label="Executive Summary Narrative Content"
          initialValue={summary}
          onSave={saveSummary}
          placeholder="Enter structured executive summary..."
        />
      )}
    </div>
  );
}
