"use client";

import React from "react";
import { Database, CheckCircle2, AlertCircle, Layers, HardDrive } from "lucide-react";

interface DataReadinessTabProps {
  reportId?: string;
  initialData?: any;
  onSave?: (data: any) => Promise<void>;
  isFinalized?: boolean;
}

export default function DataReadinessTab({ initialData }: DataReadinessTabProps) {
  const dataReadiness = initialData?.dataReadinessAssessment || {
    overallDataScore: 64,
    dataQualityScore: 68,
    dataAccessibilityScore: 60,
    vectorRagReadinessScore: 58,
    dataCatalogEtlScore: 65,
    estimatedDataPrepCost: "₹28 - ₹38 Lakhs",
    estimatedDataPrepPctOfBudget: 42,
    qualityDimensions: [
      { dimension: "Completeness", score: 65, status: "Needs Attention", findings: "Legacy transactional records have variable mandatory field population." },
      { dimension: "Accuracy", score: 78, status: "Healthy", findings: "High core financial and operational precision; deduplication needed across CRM." },
      { dimension: "Timeliness", score: 58, status: "Needs Attention", findings: "Batch ETL sync intervals create latency for real-time agent responses." },
      { dimension: "Consistency", score: 62, status: "Needs Attention", findings: "Discrepant schema naming conventions across sales CRM vs ERP databases." },
      { dimension: "Accessibility", score: 60, status: "Needs Attention", findings: "Data locked in siloed department repositories without vector embeddings." },
    ],
    domainScorecards: [
      { domain: "Customer & CRM Telemetry", dataQualityScore: 72, ragVectorReadiness: "High", governanceMaturity: "Defined", keyBottlenecks: ["Lead notes lack standardized structuring", "Historical ticket archives need PII scrubbing"] },
      { domain: "ERP & Financial Records", dataQualityScore: 82, ragVectorReadiness: "Moderate", governanceMaturity: "Managed", keyBottlenecks: ["Direct database read-only replicas needed", "Complex join logic across disparate ledgers"] },
      { domain: "Unstructured Documents (PDFs)", dataQualityScore: 54, ragVectorReadiness: "Moderate", governanceMaturity: "Ad-hoc", keyBottlenecks: ["Scanned image PDFs require high-accuracy OCR", "Missing document versioning and obsolescence tagging"] },
      { domain: "Operational Telemetry", dataQualityScore: 68, ragVectorReadiness: "High", governanceMaturity: "Defined", keyBottlenecks: ["High velocity logs require aggregation pipelines", "Retention policies must balance storage vs context depth"] },
    ],
    recommendedDataRoadmap: [
      "Build a centralized Hybrid Vector Lakehouse (e.g. pgvector / Qdrant with hybrid BM25 search)",
      "Deploy an automated Document Ingestion & OCR pipeline with chunk-level metadata tagging",
      "Implement real-time Change Data Capture (CDC) pipelines from ERP/CRM into analytical vector stores",
      "Configure granular Role-Based Access Control (RBAC) filtering at the embedding chunk level",
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            Data Strategy & Architecture Audit
          </div>
          <h2 className="text-xl font-bold text-slate-900">Data Readiness & Vector Pipeline Health</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Evaluation of data quality, ETL readiness, vector search capability, and preparation costs.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase">Data Readiness</div>
            <div className="text-xl font-black text-indigo-900">{dataReadiness.overallDataScore}/100</div>
          </div>
          <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 text-center">
            <div className="text-xs font-bold text-indigo-600 uppercase">Est. Prep Cost</div>
            <div className="text-base font-black text-indigo-900">{dataReadiness.estimatedDataPrepCost}</div>
          </div>
        </div>
      </div>

      {/* 5-Dimension Quality Scorecard */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          5-Dimension Enterprise Data Quality Scorecard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {dataReadiness.qualityDimensions.map((q: any, i: number) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">{q.dimension}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      q.status === "Healthy" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {q.score}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full ${q.status === "Healthy" ? "bg-emerald-500" : "bg-amber-500"}`}
                    style={{ width: `${q.score}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">{q.findings}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Scorecards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Domain-Specific Data & Vector Readiness
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {dataReadiness.domainScorecards.map((domain: any, i: number) => (
            <div key={i} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-900">{domain.domain}</span>
                </div>
                <div className="text-xs text-slate-500">
                  Key Bottlenecks: {domain.keyBottlenecks.join(" • ")}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Vector Readiness</div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      domain.ragVectorReadiness === "High"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {domain.ragVectorReadiness}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Governance</div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {domain.governanceMaturity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Data Architecture Roadmap */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Recommended Data Architecture Blueprint</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dataReadiness.recommendedDataRoadmap.map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
