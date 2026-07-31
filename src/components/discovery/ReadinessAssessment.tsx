"use client";

import React, { useState } from "react";
import { 
  Users, Cpu, Database, ShieldCheck, MessageSquare, Target, Sparkles, 
  Workflow, BarChart3, Building2, FileCheck, Scale, Share2, Lightbulb, 
  TrendingUp, Check, ChevronDown, ChevronUp, ArrowRight, Download, BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Capability {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  assessments: string[];
  whyItMatters: string;
  exampleQuestion: string;
  color: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 1,
    title: "Leadership & Strategy",
    icon: Users,
    assessments: [
      "AI vision and strategic alignment",
      "Investment posture and budget authority",
      "Decision-making structure and governance",
      "Transformation history and appetite",
      "AI ethics and governance framework"
    ],
    whyItMatters: "Leadership commitment is the #1 predictor of AI transformation success.",
    exampleQuestion: "What is the organization's top-level strategic vision for AI over the next 3 years?",
    color: "from-amber-500/20 to-golden-500/20 text-golden-500 border-golden-500/30"
  },
  {
    id: 2,
    title: "IT & Technology",
    icon: Cpu,
    assessments: [
      "Cloud infrastructure readiness (On-prem, Hybrid, Cloud-native)",
      "Legacy systems modernization planning",
      "vLLM and API hosting suitability",
      "Technical stack scalability and container usage"
    ],
    whyItMatters: "Robust technical infrastructure ensures model deployment feasibility and low-latency scaling.",
    exampleQuestion: "What is the current state of your cloud infrastructure (On-prem, Hybrid, Cloud-native)?",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30"
  },
  {
    id: 3,
    title: "Data & Analytics",
    icon: Database,
    assessments: [
      "Corporate knowledge assets inventory",
      "Vector indexing and chunking suitability",
      "Document formatting and OCR quality constraints",
      "Dense-sparse hybrid retrieval pathways"
    ],
    whyItMatters: "AI output quality is directly constrained by the quality and taxonomy of your underlying data.",
    exampleQuestion: "What is the structure, volume, and accessibility of your unstructured data?",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: 4,
    title: "Security & Compliance",
    icon: ShieldCheck,
    assessments: [
      "Role-Based Access Control (RBAC) mapping",
      "Prompt injection and hallucination guardrails",
      "PII masking, redaction, and compliance pre-screening",
      "Audit logging and telemetry configuration"
    ],
    whyItMatters: "Security oversights in AI deployments can lead to catastrophic data leaks and regulatory penalties.",
    exampleQuestion: "What security and data privacy boundaries are required for customer or employee data?",
    color: "from-red-500/20 to-rose-500/20 text-rose-400 border-red-500/30"
  },
  {
    id: 5,
    title: "Customer Service",
    icon: MessageSquare,
    assessments: [
      "Conversational agent integration opportunities",
      "Support ticketing automation bottlenecks",
      "Chat history data structure quality",
      "Human-in-the-loop handoff thresholds"
    ],
    whyItMatters: "Customer support is the lowest-hanging fruit for immediate cost reduction via AI.",
    exampleQuestion: "How are customer support inquiries currently routed, answered, and logged?",
    color: "from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30"
  },
  {
    id: 6,
    title: "Sales",
    icon: Target,
    assessments: [
      "Lead routing and automated qualification",
      "Intelligence lookup directly inside CRM environments",
      "Sales playbook automation and context synthesis",
      "Pipeline deal velocity tracking"
    ],
    whyItMatters: "Empowering sales reps with instant context boosts conversion rates and deal velocity.",
    exampleQuestion: "What manual steps do sales reps take to research leads and update CRM details?",
    color: "from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30"
  },
  {
    id: 7,
    title: "Marketing",
    icon: Sparkles,
    assessments: [
      "Copywriting and translation automation",
      "SEO research and asset optimization pipelines",
      "Dynamic personalization of campaign creatives",
      "Content asset production workflow speed"
    ],
    whyItMatters: "AI-driven content generation drops asset production cycle times from weeks to minutes.",
    exampleQuestion: "How are marketing campaigns, copy, and visual assets currently created?",
    color: "from-purple-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/30"
  },
  {
    id: 8,
    title: "Operations & Supply Chain",
    icon: Workflow,
    assessments: [
      "Process bottlenecks and manual validation steps",
      "Extraction of data from physical logs or receipts",
      "Inventory estimation and queue routing models",
      "Siloed hand-offs between department tools"
    ],
    whyItMatters: "Operations contain hidden queues where human-in-the-loop AI can unlock enormous throughput.",
    exampleQuestion: "Which operational workflows require manual review and hand-offs between systems?",
    color: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30"
  },
  {
    id: 9,
    title: "Finance",
    icon: BarChart3,
    assessments: [
      "Token budget consumption modeling",
      "Cloud API cost vs. dedicated instance budgets",
      "Variance analysis and automated reporting pipelines",
      "Payback milestone schedules"
    ],
    whyItMatters: "Mapping cost-per-query vs. headcount efficiency prevents surprise budget overruns.",
    exampleQuestion: "How are financial forecasts, variance analyses, and expense reporting performed?",
    color: "from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: 10,
    title: "HR",
    icon: Building2,
    assessments: [
      "Resume parsing and candidate filtering parameters",
      "Onboarding checklists and policy matching automation",
      "Compliance training monitoring and reminders",
      "Internal HR portal query engines"
    ],
    whyItMatters: "Talent operations scale exponentially when internal knowledge is instantly searchable.",
    exampleQuestion: "What is the process for candidate screening, onboarding, and training compliance?",
    color: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30"
  },
  {
    id: 11,
    title: "Procurement",
    icon: FileCheck,
    assessments: [
      "Invoice matching and discrepancy flagging",
      "Purchase order comparison algorithms",
      "Vendor SLA compliance history checks"
    ],
    whyItMatters: "Automating document audits protects margins from double-billing and SLA leakages.",
    exampleQuestion: "How are vendor invoices reconciled, and how are vendor contracts compared?",
    color: "from-yellow-500/20 to-amber-500/20 text-amber-400 border-yellow-500/30"
  },
  {
    id: 12,
    title: "Legal",
    icon: Scale,
    assessments: [
      "Clause taxonomy indexing and lookup acceleration",
      "NDA compliance screening scripts",
      "Risk posture matching for legacy contract scans"
    ],
    whyItMatters: "Standard reviews can be accelerated by 80% using highly scoped semantic agents.",
    exampleQuestion: "What is the workflow for standard contract reviews, NDA approvals, and risk screening?",
    color: "from-slate-500/20 to-zinc-500/20 text-slate-300 border-slate-500/30"
  },
  {
    id: 13,
    title: "Knowledge Management",
    icon: Share2,
    assessments: [
      "Wiki access permissions and synchronization schedules",
      "Semantic search infrastructure suitability",
      "Organizational memory loss and context retention"
    ],
    whyItMatters: "Knowledge silos waste hours of productivity as employees duplicate existing research.",
    exampleQuestion: "Where is corporate knowledge stored, and how easily can employees find answers?",
    color: "from-teal-500/20 to-cyan-500/20 text-teal-400 border-teal-500/30"
  },
  {
    id: 14,
    title: "Project Management",
    icon: Lightbulb,
    assessments: [
      "Automated meeting transcription summaries",
      "Action item assignment triggers",
      "Cross-functional status tracking dashboards"
    ],
    whyItMatters: "AI agents can summarize project threads to keep cross-functional teams automatically aligned.",
    exampleQuestion: "How are project status reports, meeting minutes, and action items generated?",
    color: "from-lime-500/20 to-green-500/20 text-lime-400 border-lime-500/30"
  },
  {
    id: 15,
    title: "Culture & Change",
    icon: TrendingUp,
    assessments: [
      "AI literacy benchmarking across employees",
      "Corporate posture on technology risk and failures",
      "Change management communication plans"
    ],
    whyItMatters: "Adoption fails if teams fear replacement or lack the training to use AI tools.",
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30",
    exampleQuestion: "What is the level of AI literacy among your leadership and middle management?"
  }
];

export function ReadinessAssessment() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          const isExpanded = expandedId === cap.id;

          return (
            <div 
              key={cap.id} 
              className={`bg-white border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                isExpanded ? "border-golden-500 ring-2 ring-golden-200/50 shadow-lg md:col-span-2 lg:col-span-3" : "border-slate-200 hover:border-golden-400 hover:shadow-md"
              }`}
              onClick={() => toggleExpand(cap.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cap.color} border shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-navy-400 font-mono">ID: 0{cap.id}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-golden-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-golden-600" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-navy-950">{cap.title}</h3>
                  {!isExpanded && (
                    <p className="text-xs text-navy-600 line-clamp-2 leading-relaxed">
                      {cap.assessments[0]} and other key items. Click to explore diagnostic details.
                    </p>
                  )}
                </div>

                {isExpanded && (
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">What We Assess:</h4>
                        <ul className="space-y-2 text-xs text-navy-700">
                          {cap.assessments.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-golden-600 block mb-1">Example Metric Question</span>
                        <p className="text-xs font-medium text-navy-850">&ldquo;{cap.exampleQuestion}&rdquo;</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Why It Matters:</h4>
                        <p className="text-xs text-navy-700 leading-relaxed font-medium">
                          {cap.whyItMatters}
                        </p>
                      </div>
                      <div className="bg-navy-950 text-white p-4 rounded-xl border border-golden-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-golden-400 block mb-1">Assessment Outcome</span>
                        <p className="text-xs text-navy-200">
                          Standardized maturity rating (1-5) included in final Gap Analysis reporting structures.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
