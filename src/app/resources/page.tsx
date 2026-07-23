"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Layers, 
  Sparkles, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  FileCode2, 
  ShieldCheck, 
  Download, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PLAYBOOKS, BLUEPRINTS, CASE_STUDIES } from "@/data/resources";

export default function ResourcesHubPage() {
  const [activeTab, setActiveTab] = useState<"playbooks" | "blueprints" | "case-studies" | "architecture">("playbooks");

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">Knowledge & Engineering Portal</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Enterprise AI <span className="golden-gradient-text">Resource Center</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          Access our battle-tested AI playbooks, solution blueprints, illustrative case benchmarks, and enterprise reference architecture.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab("playbooks")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "playbooks" ? "bg-navy-900 text-white shadow-md" : "bg-white text-navy-800 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="w-4 h-4 text-golden-400" />
          AI Playbooks (6)
        </button>

        <button
          onClick={() => setActiveTab("blueprints")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "blueprints" ? "bg-navy-900 text-white shadow-md" : "bg-white text-navy-800 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Layers className="w-4 h-4 text-golden-400" />
          Solution Blueprints (5)
        </button>

        <button
          onClick={() => setActiveTab("case-studies")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "case-studies" ? "bg-navy-900 text-white shadow-md" : "bg-white text-navy-800 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4 text-golden-400" />
          Case Studies (7)
        </button>

        <button
          onClick={() => setActiveTab("architecture")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "architecture" ? "bg-navy-900 text-white shadow-md" : "bg-white text-navy-800 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-golden-400" />
          Reference Architecture
        </button>
      </div>

      {/* Tab 1: AI Playbooks (6) */}
      {activeTab === "playbooks" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLAYBOOKS.map((pb) => (
            <Link key={pb.id} href={`/resources/playbooks/${pb.id}`} className="glass-panel rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-golden-700 bg-golden-100 px-2 py-0.5 rounded border border-golden-300">
                    {pb.category}
                  </span>
                  <span className="text-[11px] font-mono text-navy-600 font-semibold">{pb.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-950 mb-2 leading-snug">{pb.title}</h3>
                <p className="text-xs text-navy-700/90 leading-relaxed mb-4">{pb.summary}</p>

                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-bold text-navy-900">Key Playbook Takeaways</div>
                  {pb.keyTakeaways.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-navy-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-navy-600">Target: {pb.targetAudience}</span>

              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Tab 2: Solution Blueprints (5) */}
      {activeTab === "blueprints" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLUEPRINTS.map((bp) => (
            <div key={bp.id} className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="flex justify-between items-center">
                <Badge variant={bp.complexity === "Enterprise" ? "golden" : "navy"}>
                  {bp.complexity} Blueprint
                </Badge>
                <span className="text-xs font-mono text-navy-600">Modular System</span>
              </div>

              <h3 className="text-xl font-bold text-navy-950">{bp.title}</h3>
              <p className="text-xs text-navy-700/90 leading-relaxed">{bp.summary}</p>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-navy-900">Architecture Components</div>
                <div className="grid grid-cols-2 gap-2">
                  {bp.architectureComponents.map((c, idx) => (
                    <div key={idx} className="text-xs text-navy-800 bg-white p-2 rounded border border-slate-200 font-medium">
                      • {c}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-navy-950 text-white rounded-xl text-xs space-y-1 border border-golden-500/30">
                <span className="text-golden-400 font-bold block">Key Architectural Design Choice:</span>
                <p className="text-navy-200">{bp.keyDesignDecision}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Case Studies (7) */}
      {activeTab === "case-studies" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.id} className="glass-panel rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-navy-700 bg-navy-100 px-2 py-0.5 rounded mb-2 inline-block">
                  {cs.industry}
                </div>
                <h3 className="text-base font-bold text-navy-950 mb-2">{cs.title}</h3>
                <p className="text-xs text-navy-700 mb-3 font-medium"><strong>Client:</strong> {cs.clientType}</p>
                <p className="text-xs text-navy-700/90 leading-relaxed mb-4">{cs.challenge}</p>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl mb-3 border border-slate-200">
                  {cs.impactMetrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-sm font-black text-navy-900">{m.value}</div>
                      <div className="text-[9px] text-navy-600 font-semibold">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Button href="/contact" variant="navy" size="sm" className="w-full justify-center" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Request Full Case Study PDF
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Reference Architecture */}
      {activeTab === "architecture" && (
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-3">
            <Badge variant="golden">ENTERPRISE PLATFORM SPECIFICATION</Badge>
            <h2 className="text-3xl font-black text-white">Nisol Enterprise AI Platform Reference Architecture</h2>
            <p className="text-sm text-navy-200 leading-relaxed">
              Standardized blueprint for deploying autonomous multi-agent state graphs, hybrid RAG vector search, and continuous LLMOps observability in high-security environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="bg-navy-900/90 p-5 rounded-2xl border border-navy-800 space-y-2">
              <span className="text-golden-400 font-bold block">[Layer 1: Ingestion]</span>
              <p className="text-slate-300">Unstructured Document Parsing, PII Masking, Chunking & Dense Embeddings.</p>
            </div>

            <div className="bg-navy-900/90 p-5 rounded-2xl border border-navy-800 space-y-2">
              <span className="text-golden-400 font-bold block">[Layer 2: Memory]</span>
              <p className="text-slate-300">Qdrant / Pinecone Vector Store, Neo4j Knowledge Graph, GPTCache.</p>
            </div>

            <div className="bg-navy-900/90 p-5 rounded-2xl border border-navy-800 space-y-2">
              <span className="text-golden-400 font-bold block">[Layer 3: Agents]</span>
              <p className="text-slate-300">LangGraph Supervisor Graph, Tool-Calling Gateways, Human Approval UI.</p>
            </div>

            <div className="bg-navy-900/90 p-5 rounded-2xl border border-navy-800 space-y-2">
              <span className="text-golden-400 font-bold block">[Layer 4: Telemetry]</span>
              <p className="text-slate-300">LangSmith Evaluation, Prometheus Latency Tracking, Model Cost Router.</p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Button href="/contact" variant="primary" size="lg" icon={<Download className="w-4 h-4" />}>
              Download High-Res Architecture Diagram
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
