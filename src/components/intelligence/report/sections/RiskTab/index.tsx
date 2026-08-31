"use client";

import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, FileCheck } from "lucide-react";

interface RiskTabProps {
  reportId?: string;
  initialData?: any;
  onSave?: (data: any) => Promise<void>;
  isFinalized?: boolean;
}

export default function RiskTab({ reportId, initialData }: RiskTabProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const riskRegister = initialData?.governanceAssessment?.riskRegister || [
    {
      id: "RSK-01",
      category: "Data Privacy & Security",
      description: "PII or sensitive client IP sent to third-party LLM endpoints without automated token redaction.",
      potentialImpact: "Regulatory penalties under DPDP Act 2023 / GDPR; client data disclosure.",
      likelihood: 4,
      impact: 5,
      riskScore: 20,
      riskLevel: "Critical",
      regulatoryFrameworks: ["India DPDP Act 2023", "GDPR"],
      mitigationStrategy: "Deploy enterprise API Gateway proxy with automated Presidio PII redaction layer.",
      ownerRole: "CISO",
      residualRisk: "Low",
    },
    {
      id: "RSK-02",
      category: "Model Risk & Bias",
      description: "LLM hallucinations in client-facing advisory or operational financial summaries.",
      potentialImpact: "Inaccurate client communications; erroneous decision-making.",
      likelihood: 4,
      impact: 4,
      riskScore: 16,
      riskLevel: "High",
      regulatoryFrameworks: ["EU AI Act", "RBI AI Guidelines"],
      mitigationStrategy: "Enforce deterministic schema validation, citation checking, and mandatory Human-in-the-Loop review.",
      ownerRole: "Head of AI Engineering",
      residualRisk: "Low",
    },
    {
      id: "RSK-03",
      category: "Regulatory & Compliance",
      description: "Non-compliance with in-region data localization and continuous AI audit logging requirements.",
      potentialImpact: "Regulatory censure and operational audit failure.",
      likelihood: 3,
      impact: 4,
      riskScore: 12,
      riskLevel: "High",
      regulatoryFrameworks: ["DPDP Act 2023", "ISO 42001"],
      mitigationStrategy: "Host vector databases and model weights in private cloud VPCs (AWS Mumbai / Azure India).",
      ownerRole: "Chief Compliance Officer",
      residualRisk: "Low",
    },
    {
      id: "RSK-04",
      category: "Operational & Adoption",
      description: "Staff resistance or shadow AI adoption using unauthorized consumer tools without corporate audit trails.",
      potentialImpact: "Data leakage, inconsistent outputs, and low transformation ROI realization.",
      likelihood: 4,
      impact: 3,
      riskScore: 12,
      riskLevel: "Medium",
      regulatoryFrameworks: ["Corporate IT Acceptable Use Policy"],
      mitigationStrategy: "Roll out sanctioned AI workspace with SSO, training curricula, and department champions.",
      ownerRole: "VP HR & Change Lead",
      residualRisk: "Low",
    },
  ];

  const complianceMatrix = initialData?.governanceAssessment?.regulatoryComplianceMatrix || [
    {
      regulation: "India DPDP Act 2023",
      status: "Action Required",
      gapSummary: "Explicit consent records and automated data erasure logs needed for vector stores.",
      remediationAction: "Implement chunk-level metadata tagging with TTL vector lifecycle management.",
    },
    {
      regulation: "EU AI Act (Regulation 2024/1689)",
      status: "Compliant",
      gapSummary: "High-risk AI obligations require explainability audit trails.",
      remediationAction: "Maintain comprehensive model cards and human override logging.",
    },
    {
      regulation: "ISO/IEC 42001 (AI Management System)",
      status: "Under Review",
      gapSummary: "Continuous AI model evaluation framework needed.",
      remediationAction: "Form Enterprise AI Governance Steering Committee meeting quarterly.",
    },
  ];

  const filteredRisks = riskRegister.filter((r: any) => {
    if (selectedFilter === "all") return true;
    return r.riskLevel.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            Enterprise Risk & Governance Register
          </div>
          <h2 className="text-xl font-bold text-slate-900">AI Risk Matrix & Regulatory Compliance</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            5×5 Likelihood × Impact matrix mapping operational, privacy, and regulatory vulnerabilities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["all", "critical", "high", "medium"].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                selectedFilter === f
                  ? "bg-[#0A1E3C] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Cards & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Identified Risk Catalog ({filteredRisks.length})</span>
          <span className="text-xs text-slate-500 font-medium">Likelihood (1–5) × Impact (1–5)</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredRisks.map((risk: any) => (
            <div key={risk.id} className="p-5 hover:bg-slate-50/70 transition-colors">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-extrabold px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {risk.id}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{risk.description}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      risk.riskLevel === "Critical"
                        ? "bg-rose-100 text-rose-700"
                        : risk.riskLevel === "High"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    Score: {risk.riskScore}/25 ({risk.riskLevel})
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                    Owner: {risk.ownerRole}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-3">{risk.potentialImpact}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-700">Mitigation Strategy: </span>
                  <span className="text-slate-600">{risk.mitigationStrategy}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Regulatory Mapping: </span>
                  <span className="text-slate-600">{risk.regulatoryFrameworks?.join(", ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Compliance Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileCheck className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Regulatory Compliance Framework Matrix</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {complianceMatrix.map((item: any, i: number) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">{item.regulation}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "Compliant"
                        ? "bg-emerald-100 text-emerald-700"
                        : item.status === "Action Required"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{item.gapSummary}</p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-700">
                <span className="font-bold text-indigo-600">Action: </span>
                {item.remediationAction}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
