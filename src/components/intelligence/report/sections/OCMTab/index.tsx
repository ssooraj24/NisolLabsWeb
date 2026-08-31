"use client";

import React from "react";
import { Users, GraduationCap, ArrowRight, Award } from "lucide-react";

interface OCMTabProps {
  reportId?: string;
  initialData?: any;
  onSave?: (data: any) => Promise<void>;
  isFinalized?: boolean;
}

export default function OCMTab({ initialData }: OCMTabProps) {
  const ocmPlan = initialData?.ocmPlan || {
    overallChangeReadinessScore: 64,
    stakeholderImpacts: [
      {
        stakeholderGroup: "Frontline Support & Operations Agents",
        impactLevel: "High",
        anticipatedResistance: "Anxiety regarding role automation, skepticism towards AI suggestions.",
        changeIntervention: "Position AI as an assistant; run 'AI Champion' sandboxes; tie adoption to bonuses.",
      },
      {
        stakeholderGroup: "Middle Management & Team Leads",
        impactLevel: "High",
        anticipatedResistance: "Uncertainty on assessing augmented team output and audit liabilities.",
        changeIntervention: "Provide managerial review dashboards and clear Human-in-the-Loop approval gates.",
      },
      {
        stakeholderGroup: "Engineering & IT Staff",
        impactLevel: "Medium",
        anticipatedResistance: "Concerns over maintenance overhead, vector latency, and API security.",
        changeIntervention: "Involve technical leads in architecture decisions (ADRs) and LLMOps training.",
      },
    ],
    raciMatrix: [
      {
        initiative: "AI Strategic Roadmap & Capital Allocation",
        responsible: "Chief AI Officer",
        accountable: "CEO & Board",
        consulted: "BU Heads",
        informed: "Company-wide",
      },
      {
        initiative: "AI Proxy Gateway & PII Guardrails",
        responsible: "Security Architect",
        accountable: "CISO",
        consulted: "Legal",
        informed: "Engineering",
      },
      {
        initiative: "Department AI Agents Rollout",
        responsible: "AI Product Lead",
        accountable: "Dept Head",
        consulted: "Super-users",
        informed: "Impacted Staff",
      },
    ],
    trainingPlan: [
      {
        targetAudience: "All Staff",
        moduleName: "Enterprise AI Fundamentals & Responsible Usage",
        durationHours: 4,
        coreCompetencies: ["Prompt engineering basics", "Recognizing hallucinations", "PII safety rules"],
      },
      {
        targetAudience: "Department Champions",
        moduleName: "Advanced AI Co-Pilots & Workflow Automation",
        durationHours: 12,
        coreCompetencies: ["Custom prompt design", "Human-in-the-Loop review", "Feedback loop tagging"],
      },
      {
        targetAudience: "Technical Engineering",
        moduleName: "Enterprise LLMOps, RAG & Governance",
        durationHours: 24,
        coreCompetencies: ["pgvector / Qdrant indexing", "Latency optimization", "Ragas evaluation CI/CD"],
      },
    ],
    changeAdoptionKpis: [
      { metric: "Active Weekly AI Co-Pilot Utilization", baseline: "12%", target90Days: "55%", target1Year: "85%+" },
      { metric: "Frontline Staff AI Certification", baseline: "5%", target90Days: "70%", target1Year: "95%" },
      { metric: "Hours Saved per Week per Employee", baseline: "0.5 hrs", target90Days: "3.5 hrs", target1Year: "6.0+ hrs" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            Organizational Change Management (OCM)
          </div>
          <h2 className="text-xl font-bold text-slate-900">Stakeholder Impact, RACI & Upskilling Plan</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Addressing cultural readiness, accountability matrices, and structured role-based training.
          </p>
        </div>

        <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 text-center">
          <div className="text-xs font-bold text-amber-700 uppercase">Change Readiness</div>
          <div className="text-xl font-black text-amber-900">{ocmPlan.overallChangeReadinessScore}/100</div>
        </div>
      </div>

      {/* Stakeholder Impact Analysis */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Stakeholder Impact & Change Interventions
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {ocmPlan.stakeholderImpacts.map((stk: any, i: number) => (
            <div key={i} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{stk.stakeholderGroup}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    stk.impactLevel === "High" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {stk.impactLevel} Impact
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-600">Anticipated Resistance: </span>
                  <span className="text-slate-600">{stk.anticipatedResistance}</span>
                </div>
                <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-lg">
                  <span className="font-bold text-amber-800">Change Intervention: </span>
                  <span className="text-amber-900">{stk.changeIntervention}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RACI Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Governance RACI Accountability Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 font-bold rounded-l-lg">Transformation Initiative</th>
                <th className="p-3 font-bold">Responsible (R)</th>
                <th className="p-3 font-bold">Accountable (A)</th>
                <th className="p-3 font-bold">Consulted (C)</th>
                <th className="p-3 font-bold rounded-r-lg">Informed (I)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ocmPlan.raciMatrix.map((raci: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{raci.initiative}</td>
                  <td className="p-3 text-slate-600">{raci.responsible}</td>
                  <td className="p-3 font-bold text-[#0A1E3C]">{raci.accountable}</td>
                  <td className="p-3 text-slate-600">{raci.consulted}</td>
                  <td className="p-3 text-slate-400">{raci.informed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Training Plan & KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upskilling Curriculum */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Role-Based Upskilling Curriculum
            </h3>
          </div>
          <div className="space-y-3">
            {ocmPlan.trainingPlan.map((tp: any, i: number) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>{tp.moduleName}</span>
                  <span className="text-indigo-600">{tp.durationHours} hrs</span>
                </div>
                <div className="text-[11px] text-slate-500 mb-1.5 font-medium">Audience: {tp.targetAudience}</div>
                <div className="text-[11px] text-slate-600">
                  {tp.coreCompetencies.join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change Adoption KPIs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Change Adoption Success KPIs
            </h3>
          </div>
          <div className="space-y-3">
            {ocmPlan.changeAdoptionKpis.map((kpi: any, i: number) => (
              <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{kpi.metric}</div>
                  <div className="text-[11px] text-slate-500">Baseline: {kpi.baseline}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700">90 Days: {kpi.target90Days}</div>
                  <div className="text-[11px] font-semibold text-slate-600">1 Year: {kpi.target1Year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
