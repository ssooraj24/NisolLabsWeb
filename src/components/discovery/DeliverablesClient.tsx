"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Layers,
  Cpu,
  BarChart3,
  Sparkles,
  FileCheck,
  TrendingUp,
  Users,
  Building2,
  Zap,
  Database,
  Scale,
  MessageSquare,
  Share2,
  Lightbulb,
  Workflow,
  Target,
  Download,
  HelpCircle,
  FileText,
  X,
  ArrowUpRight,
  TrendingDown,
  Lock,
  Mail,
  User,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PACK_INFO = [
  {
    id: "executive",
    title: "Executive Intelligence Pack",
    tagline: "Clarity for Leadership",
    icon: Users,
    gradient: "from-amber-500/10 via-golden-500/5 to-transparent",
    border: "border-golden-500/30",
    textGradient: "from-amber-400 to-golden-600",
    desc: "This pack gives your leadership team the clarity needed to make informed decisions about your AI transformation. It provides a comprehensive view of where you are, what you need, and where you can go.",
    deliverables: [
      { id: 1, name: "Executive Summary", desc: "High-level overview of findings, opportunities, and recommendations.", benefit: "Quick understanding for board and leadership." },
      { id: 2, name: "AI Readiness Assessment", desc: "Overall AI maturity score and capability breakdown.", benefit: "Understand your starting point." },
      { id: 3, name: "Executive Dashboard", desc: "Visual intelligence dashboard with key metrics.", benefit: "Real-time visibility for leadership." },
      { id: 4, name: "AI Scorecard", desc: "15 capability scores with gap analysis.", benefit: "Identify strengths and weaknesses." }
    ]
  },
  {
    id: "opportunity",
    title: "AI Opportunity Pack",
    tagline: "What's Possible",
    icon: Target,
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    border: "border-blue-500/30",
    textGradient: "from-blue-400 to-indigo-600",
    desc: "This pack identifies and prioritizes AI opportunities across your organization. It answers the question: 'Where should we invest first?'",
    deliverables: [
      { id: 5, name: "AI Opportunity Matrix", desc: "2x2 matrix mapping impact against feasibility.", benefit: "Visual prioritization of opportunities." },
      { id: 6, name: "Top 20 AI Use Cases", desc: "20 specific use cases with ROI and feasibility scores.", benefit: "Concrete, actionable ideas." },
      { id: 7, name: "Quick Wins vs Strategic Bets", desc: "Categorization of initiatives by timeline and impact.", benefit: "Balanced portfolio approach." },
      { id: 8, name: "Implementation Prioritization", desc: "Clear sequence for implementation.", benefit: "Focused execution plan." }
    ]
  },
  {
    id: "transformation",
    title: "Transformation Pack",
    tagline: "Your Roadmap to Success",
    icon: Workflow,
    gradient: "from-purple-500/10 via-fuchsia-500/5 to-transparent",
    border: "border-purple-500/30",
    textGradient: "from-purple-400 to-fuchsia-600",
    desc: "This pack provides the comprehensive plan needed to execute your AI transformation. It includes the roadmap, financial case, and technical blueprints to get started.",
    deliverables: [
      { id: 9, name: "AI Transformation Roadmap", desc: "30/90/180/365-day implementation plan.", benefit: "Clear path forward." },
      { id: 10, name: "ROI Analysis", desc: "Financial impact, cost savings, and payback period.", benefit: "Business case justification." },
      { id: 11, name: "Business Case", desc: "Comprehensive business case for AI investment.", benefit: "Executive approval support." },
      { id: 12, name: "Solution Blueprints", desc: "Technical architecture for top 5 use cases.", benefit: "Implementation-ready designs." },
      { id: 13, name: "Change Management Recommendations", desc: "People and culture recommendations.", benefit: "Organizational readiness." },
      { id: 14, name: "Risk Assessment", desc: "Key risks and mitigation strategies.", benefit: "Risk-aware planning." },
      { id: 15, name: "Success Metrics Framework", desc: "KPIs to measure transformation success.", benefit: "Track and measure progress." }
    ]
  }
];

const MATTERS_GRID = [
  { deliverable: "Executive Summary", value: "Aligns leadership on AI priorities instantly." },
  { deliverable: "AI Readiness Assessment", value: "Prevents wasted investment on the wrong initiatives." },
  { deliverable: "Opportunity Matrix", value: "Focuses resources on highest-impact opportunities first." },
  { deliverable: "Top 20 Use Cases", value: "Provides a clear, concrete starting point for implementation." },
  { deliverable: "AI Transformation Roadmap", value: "Creates accountability and timeline clarity across teams." },
  { deliverable: "ROI Analysis", value: "Makes the hard business case for financial investment." },
  { deliverable: "Solution Blueprints", value: "Reduces implementation risk, developer friction, and time." },
  { deliverable: "Change Management", value: "Ensures organizational adoption and high user-satisfaction." },
  { deliverable: "Success Metrics", value: "Enables ongoing tracking, ROI calculations, and optimization." }
];

const BEFORE_AFTER = [
  { before: "Unclear AI priorities", after: "Clear, prioritized AI opportunities" },
  { before: "Unknown AI maturity", after: "Comprehensive AI readiness score" },
  { before: "No clear roadmap", after: "Phased 30/90/180/365-day roadmap" },
  { before: "Fragmented data silos", after: "15 capability scores with gap analysis" },
  { before: "No financial justification", after: "Detailed ROI analysis and payback models" },
  { before: "High execution risk", after: "Implementation-ready blueprints" },
  { before: "Uncertainty about next steps", after: "Clear, actionable next-step recommendations" }
];

// Interactive previews
const PREVIEWS = [
  { id: "board-memo", label: "CFO Board Investment Memo" },
  { id: "bubble-matrix", label: "2D Opportunity Bubble Matrix" },
  { id: "exec-summary", label: "Minto Executive Briefing" },
  { id: "radar-chart", label: "Maturity & Benchmark Radar" },
  { id: "data-blueprint", label: "Data & Vector Lakehouse Blueprint" },
  { id: "risk-register", label: "5x5 Risk & Regulatory Register" },
  { id: "roadmap", label: "Roadmap & OCM Phases" }
];

export default function DeliverablesClient() {
  const [activeTab, setActiveTab] = useState<"executive" | "opportunity" | "transformation">("executive");
  const [activePreview, setActivePreview] = useState("exec-summary");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      // Simulate file download
      setIsModalOpen(false);
      setFormSubmitted(false);
      setEmail("");
      setName("");
      setCompany("");
      alert("Sample Deliverables PDF download simulated successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* SECTION 1: HERO HEADER */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-8 pb-4">
        <Badge variant="golden" className="animate-pulse">Executive Advisory</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-navy-950 tracking-tight leading-none">
          Executive-Grade Deliverables, <br />
          <span className="golden-gradient-text">AI-Powered, Consultant-Reviewed</span>
        </h1>
        <p className="text-lg sm:text-xl text-navy-800 font-semibold max-w-3xl mx-auto leading-relaxed">
          Our Nisol Discovery™ engagement delivers <strong className="text-navy-950 font-black">15 executive-ready reports</strong> across three strategic packs.
        </p>
        <p className="text-sm sm:text-base text-navy-600 max-w-2xl mx-auto font-medium">
          Every document, matrix, and architecture diagram is meticulously generated by our Nisol Intelligence™ engine and reviewed by senior consultants for enterprise-level quality.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg px-7 py-3.5 text-base gap-2.5 shadow-md bg-navy-900 hover:bg-navy-950 text-golden-400 border border-golden-500/30 group active:scale-[0.98]"
          >
            <Download className="w-5 h-5 text-golden-400 group-hover:scale-105 transition-transform" />
            Download Sample PDF
          </button>
        </div>

        {/* Floating overlay text / banner */}
        <div className="mt-12 inline-flex items-center gap-2 sm:gap-6 px-6 py-3 bg-navy-950 border border-golden-500/20 rounded-full shadow-2xl text-xs sm:text-sm font-mono text-golden-400">
          <span>15 Deliverables</span>
          <span className="text-navy-700">•</span>
          <span>3 Strategic Packs</span>
          <span className="text-navy-700">•</span>
          <span>1 Transformation Roadmap</span>
        </div>
      </div>

      {/* SECTION 2: DELIVERABLES OVERVIEW & 3 PACKS TAB SYSTEM */}
      <div className="space-y-12">
        <SectionHeader 
          title="15 Executive-Ready Deliverables"
          subtitle="Organized for Organizational Impact"
          description="We group our deliverables into three highly specialized packs to guide your organization from initial assessment to absolute deployment readiness."
          badgeText="Deliverables Breakdown"
          badgeVariant="golden"
        />

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {PACK_INFO.map((pack) => {
            const Icon = pack.icon;
            const isActive = activeTab === pack.id;
            return (
              <button
                key={pack.id}
                onClick={() => setActiveTab(pack.id as any)}
                className={`relative flex flex-col items-start text-left p-6 rounded-3xl border transition-all duration-300 ${
                  isActive 
                    ? "bg-navy-950 text-white border-golden-500/60 shadow-xl scale-[1.02]" 
                    : "bg-white text-navy-950 border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className={`p-3 rounded-2xl mb-4 ${
                  isActive ? "bg-golden-500/20 text-golden-400" : "bg-navy-50 text-navy-800"
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black">{pack.title}</h3>
                <p className={`text-xs mt-1 ${isActive ? "text-golden-400/90" : "text-golden-600 font-bold"}`}>
                  {pack.tagline}
                </p>
                <p className={`text-xs mt-3 leading-relaxed ${isActive ? "text-navy-200" : "text-navy-700"}`}>
                  {pack.deliverables.length} Actionable Deliverables Included
                </p>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {PACK_INFO.map((pack) => {
              if (pack.id !== activeTab) return null;
              const Icon = pack.icon;
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-br ${pack.gradient} rounded-3xl p-8 border ${pack.border} shadow-sm space-y-8`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/50 pb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-navy-950 text-golden-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-black text-navy-950">{pack.title}</h3>
                      </div>
                      <p className="text-sm text-navy-700 font-medium max-w-2xl">{pack.desc}</p>
                    </div>
                    <Badge variant="golden" className="self-start md:self-center">Full IP Ownership</Badge>
                  </div>

                  {/* Table of Deliverables */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-navy-950 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider w-16">#</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider w-1/3">Deliverable</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Description</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Business Benefit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {pack.deliverables.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-golden-600 font-mono font-bold">
                              {item.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-navy-950 font-black">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 text-xs text-navy-700">
                              {item.desc}
                            </td>
                            <td className="px-6 py-4 text-xs text-emerald-600 font-semibold">
                              {item.benefit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* SECTION 6: SAMPLE DELIVERABLES PREVIEW */}
      <div className="space-y-12 bg-navy-950 text-white -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-16 rounded-[2.5rem] border border-golden-500/20 shadow-2xl">
        <SectionHeader 
          title="See What Our Deliverables Look Like"
          subtitle="Interactive Preview Library"
          description="Inspect simulated snippets of the actual consulting components delivered to leadership boards."
          badgeText="Visual Quality"
          badgeVariant="golden"
          theme="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left panel selectors */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {PREVIEWS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePreview(p.id)}
                className={`whitespace-nowrap flex-1 text-left px-5 py-4 rounded-xl border transition-all ${
                  activePreview === p.id 
                    ? "bg-gradient-to-r from-golden-500 to-golden-600 text-navy-950 font-bold border-golden-400 shadow-lg scale-[1.02]" 
                    : "bg-navy-900/60 text-navy-200 border-navy-800/80 hover:bg-navy-900 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-black">{p.label}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </div>
              </button>
            ))}

            <div className="hidden lg:block mt-8 p-5 bg-navy-900 border border-navy-800 rounded-2xl text-center space-y-4">
              <h4 className="text-sm font-black text-golden-400">Want the complete set?</h4>
              <p className="text-xs text-navy-300">Download the full simulated PDF pack with high fidelity templates.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-golden-500 hover:bg-golden-600 text-navy-950 font-bold py-2 px-4 rounded-lg text-xs transition active:scale-[0.98] cursor-pointer"
              >
                📄 Download Sample PDF
              </button>
            </div>
          </div>

          {/* Right panel mock previews */}
          <div className="lg:col-span-8 bg-navy-900 border border-navy-800 rounded-3xl p-6 md:p-8 min-h-[400px] flex flex-col justify-between shadow-inner relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-golden-500/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {activePreview === "board-memo" && (
                <motion.div
                  key="board-memo"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                    <div>
                      <h4 className="text-sm font-mono font-bold text-golden-400">CFO & BOARD MEMO</h4>
                      <h3 className="text-lg font-black text-white">Financial Business Case & Capital Phasing</h3>
                    </div>
                    <Badge variant="outline" className="border-golden-500/40 text-golden-300">Board Authorization</Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-navy-950 rounded-xl border border-navy-800">
                      <span className="text-[10px] text-navy-400 font-bold uppercase block">Capital Outlay</span>
                      <span className="text-base font-black text-golden-400">₹95.0 Lakhs</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Phase 1-2 Total</span>
                    </div>
                    <div className="p-3 bg-navy-950 rounded-xl border border-navy-800">
                      <span className="text-[10px] text-navy-400 font-bold uppercase block">Annual Savings</span>
                      <span className="text-base font-black text-emerald-400">₹3.20 Cr</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Recurring run-rate</span>
                    </div>
                    <div className="p-3 bg-navy-950 rounded-xl border border-navy-800">
                      <span className="text-[10px] text-navy-400 font-bold uppercase block">5-Yr Net Benefit</span>
                      <span className="text-base font-black text-blue-400">₹14.20 Cr</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">NPV @ 10% rate</span>
                    </div>
                    <div className="p-3 bg-navy-950 rounded-xl border border-navy-800">
                      <span className="text-[10px] text-navy-400 font-bold uppercase block">Payback Period</span>
                      <span className="text-base font-black text-golden-300">6.8 Months</span>
                      <span className="text-[9px] text-emerald-400 block mt-0.5">IRR: 44.5%</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-navy-950/80 rounded-xl border border-navy-800 text-xs text-navy-200 space-y-2">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>3-Scenario Sensitivity Stress Test:</span>
                      <span className="text-[10px] text-golden-400 font-mono">10% Discount Rate</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                      <div className="p-2 bg-navy-900 rounded border border-navy-800">
                        <div className="text-slate-400">Conservative (-25%)</div>
                        <div className="text-emerald-400 font-bold">NPV: ₹7.80 Cr</div>
                      </div>
                      <div className="p-2 bg-navy-900 rounded border border-golden-500/30">
                        <div className="text-golden-400 font-bold">Base Case (100%)</div>
                        <div className="text-emerald-400 font-bold">NPV: ₹10.85 Cr</div>
                      </div>
                      <div className="p-2 bg-navy-900 rounded border border-navy-800">
                        <div className="text-slate-400">Optimistic (+25%)</div>
                        <div className="text-emerald-400 font-bold">NPV: ₹13.90 Cr</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePreview === "bubble-matrix" && (
                <motion.div
                  key="bubble-matrix"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                    <div>
                      <h4 className="text-sm font-mono font-bold text-golden-400">PORTFOLIO OPTIMIZATION</h4>
                      <h3 className="text-lg font-black text-white">2D Value vs. Feasibility Bubble Matrix</h3>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">ROI-Scaled</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-1.5">
                      <div className="font-bold text-emerald-300 text-xs flex justify-between">
                        <span>⚡ QUICK WINS</span>
                        <span>4 Initiatives</span>
                      </div>
                      <p className="text-[11px] text-emerald-100/70">High Value, Low Effort (QA Automation, SOP RAG, Invoice OCR). Value in 4-6 wks.</p>
                    </div>
                    <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl space-y-1.5">
                      <div className="font-bold text-indigo-300 text-xs flex justify-between">
                        <span>🚀 STRATEGIC BETS</span>
                        <span>2 Initiatives</span>
                      </div>
                      <p className="text-[11px] text-indigo-100/70">High Value, Complex Build (Autonomous Underwriting, Predictive Maintenance).</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePreview === "data-blueprint" && (
                <motion.div
                  key="data-blueprint"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                    <div>
                      <h4 className="text-sm font-mono font-bold text-golden-400">DATA ARCHITECTURE</h4>
                      <h3 className="text-lg font-black text-white">5-Dimension Quality & Vector Lakehouse</h3>
                    </div>
                    <Badge variant="outline" className="border-blue-500/40 text-blue-300">CTO Blueprint</Badge>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 bg-navy-950 rounded-lg border border-navy-800">
                      <div className="text-[10px] text-slate-400">Completeness</div>
                      <div className="font-bold text-emerald-400 mt-1">78%</div>
                    </div>
                    <div className="p-2 bg-navy-950 rounded-lg border border-navy-800">
                      <div className="text-[10px] text-slate-400">Accuracy</div>
                      <div className="font-bold text-emerald-400 mt-1">84%</div>
                    </div>
                    <div className="p-2 bg-navy-950 rounded-lg border border-navy-800">
                      <div className="text-[10px] text-slate-400">Timeliness</div>
                      <div className="font-bold text-amber-400 mt-1">62%</div>
                    </div>
                    <div className="p-2 bg-navy-950 rounded-lg border border-navy-800">
                      <div className="text-[10px] text-slate-400">Consistency</div>
                      <div className="font-bold text-amber-400 mt-1">65%</div>
                    </div>
                    <div className="p-2 bg-navy-950 rounded-lg border border-navy-800">
                      <div className="text-[10px] text-slate-400">Accessibility</div>
                      <div className="font-bold text-blue-400 mt-1">70%</div>
                    </div>
                  </div>

                  <p className="text-xs text-navy-300 bg-navy-950 p-3 rounded-xl border border-navy-800">
                    Includes vector DB schema, real-time Debezium CDC ingestion topology, and itemized data prep allocation (~42% of Phase 1 budget).
                  </p>
                </motion.div>
              )}

              {activePreview === "risk-register" && (
                <motion.div
                  key="risk-register"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                    <div>
                      <h4 className="text-sm font-mono font-bold text-golden-400">GOVERNANCE & COMPLIANCE</h4>
                      <h3 className="text-lg font-black text-white">5x5 Risk Register & Regulatory Matrix</h3>
                    </div>
                    <Badge variant="outline" className="border-red-500/40 text-red-300">DPDP Act Ready</Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-navy-950 rounded-lg border border-red-900/60 flex items-center justify-between">
                      <span className="font-bold text-red-400">RSK-01: PII Leakage in LLM Prompts</span>
                      <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">High / Severity 16</span>
                    </div>
                    <div className="p-2.5 bg-navy-950 rounded-lg border border-amber-900/60 flex items-center justify-between">
                      <span className="font-bold text-amber-400">RSK-02: LLM Hallucination in Client Advisories</span>
                      <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">Med / Severity 12</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Full compliance guardrails mapped to DPDP Act 2023, EU AI Act, and RBI AI Guidelines with automated Presidio redaction proxies.
                  </p>
                </motion.div>
              )}
              {activePreview === "exec-summary" && (
                <motion.div
                  key="exec-summary"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                    <div>
                      <h4 className="text-sm font-mono font-bold text-golden-400">SAMPLE PAGE</h4>
                      <h3 className="text-lg font-black text-white">Executive AI Advisory Summary</h3>
                    </div>
                    <Badge variant="outline" className="border-navy-700 text-navy-300">Confidential</Badge>
                  </div>

                  <div className="space-y-4 text-xs md:text-sm text-navy-200 leading-relaxed font-sans">
                    <p className="border-l-2 border-golden-500 pl-3 italic text-navy-300">
                      “Acme Corp has demonstrated a strong foundation in cloud infrastructure (4.5/5) and data engineering pipelines (4.0/5). However, security governance and localized agent telemetry remain critical gaps (1.9/5) that restrict enterprise-wide orchestration rollout.”
                    </p>

                    <div>
                      <h5 className="font-bold text-white mb-2 text-xs uppercase tracking-wider">Strategic Recommendations</h5>
                      <ol className="list-decimal pl-4 space-y-2 text-navy-300">
                        <li>
                          <strong className="text-white">Establish AI Governance:</strong> Set up a Zero-Trust Multi-Agent Governance group within 30 days.
                        </li>
                        <li>
                          <strong className="text-white">Vector Ingestion Cleanliness:</strong> Standardize file chunking and hybrid dense-sparse metadata indexes.
                        </li>
                        <li>
                          <strong className="text-white">Phase 1 Pilot Chatbot:</strong> Deliver client-facing assistant mapping automated document parsing within 90 days.
                        </li>
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePreview === "radar-chart" && (
                <motion.div
                  key="radar-chart"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left flex flex-col h-full"
                >
                  <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                    <div>
                      <h4 className="text-sm font-mono font-bold text-golden-400">AI READINESS RADAR</h4>
                      <h3 className="text-lg font-black text-white">15 Capability Dimensions</h3>
                    </div>
                    <Badge variant="outline" className="border-navy-700 text-navy-300">Maturity Radar</Badge>
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 py-2">
                    {/* SVG RADAR CHART MOCK */}
                    <div className="w-48 h-48 md:w-56 md:h-56 relative shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-navy-700">
                        {/* Outer polygon rings */}
                        <polygon points="50,5 95,35 78,85 22,85 5,35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <polygon points="50,15 85,38 72,77 28,77 15,38" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <polygon points="50,27 75,43 65,70 35,70 25,43" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                        
                        {/* Grid axes */}
                        <line x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2="95" y2="35" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2="78" y2="85" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2="22" y2="85" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2="5" y2="35" stroke="currentColor" strokeWidth="0.5" />
                        
                        {/* Plotting simulated readiness data (filled gold area) */}
                        <polygon 
                          points="50,12 82,38 68,75 32,68 18,36" 
                          fill="rgba(212, 175, 55, 0.25)" 
                          stroke="#d4af37" 
                          strokeWidth="1.5" 
                          className="animate-pulse"
                        />
                        
                        {/* Data point dots */}
                        <circle cx="50" cy="12" r="1.5" fill="#d4af37" />
                        <circle cx="82" cy="38" r="1.5" fill="#d4af37" />
                        <circle cx="68" cy="75" r="1.5" fill="#d4af37" />
                        <circle cx="32" cy="68" r="1.5" fill="#d4af37" />
                        <circle cx="18" cy="36" r="1.5" fill="#d4af37" />
                      </svg>
                    </div>

                    <div className="text-xs space-y-2 text-navy-300 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-golden-500" />
                        <span><strong>Strategy & Leadership:</strong> 4.2 / 5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-golden-500" />
                        <span><strong>Data & Ingestion:</strong> 4.0 / 5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-golden-500" />
                        <span><strong>IT & Stack:</strong> 3.7 / 5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-golden-500" />
                        <span><strong>Security Guardrails:</strong> 3.5 / 5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span><strong>Talent / AI Literacy:</strong> 2.4 / 5.0 (Gap)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePreview === "roadmap" && (
                <motion.div
                  key="roadmap"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                    <div>
                      <h4 className="text-sm font-mono font-bold text-golden-400">AI ROADMAP</h4>
                      <h3 className="text-lg font-black text-white">30/90/180/365 Phased Blueprint</h3>
                    </div>
                    <Badge variant="outline" className="border-navy-700 text-navy-300">Roadmap</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 bg-navy-950 rounded-2xl border border-navy-800/80 space-y-2">
                      <div className="text-golden-500 font-bold border-b border-navy-800 pb-1 flex items-center justify-between">
                        <span>Day 1–30</span>
                        <span className="text-[10px] bg-golden-500/10 text-golden-400 px-2 py-0.5 rounded">GOVERNANCE</span>
                      </div>
                      <ul className="space-y-1 text-navy-300 list-disc pl-3">
                        <li>AI Steering Committee setup</li>
                        <li>Token audit guardrails spec</li>
                        <li>Dataset masking policies</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-navy-950 rounded-2xl border border-navy-800/80 space-y-2">
                      <div className="text-golden-500 font-bold border-b border-navy-800 pb-1 flex items-center justify-between">
                        <span>Day 31–90</span>
                        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">PILOT</span>
                      </div>
                      <ul className="space-y-1 text-navy-300 list-disc pl-3">
                        <li>RAG system pipeline kickoff</li>
                        <li>Customer Support Pilot</li>
                        <li>Staff Literacy Seminars</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-navy-950 rounded-2xl border border-navy-800/80 space-y-2">
                      <div className="text-golden-500 font-bold border-b border-navy-800 pb-1 flex items-center justify-between">
                        <span>Day 91–180</span>
                        <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">INTEGRATION</span>
                      </div>
                      <ul className="space-y-1 text-navy-300 list-disc pl-3">
                        <li>Multi-Agent orchestrator sync</li>
                        <li>Full CRM & ticketing API hooks</li>
                        <li>AI Center of Excellence (CoE)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-navy-950 rounded-2xl border border-navy-800/80 space-y-2">
                      <div className="text-golden-500 font-bold border-b border-navy-800 pb-1 flex items-center justify-between">
                        <span>Day 181–365</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">SCALE</span>
                      </div>
                      <ul className="space-y-1 text-navy-300 list-disc pl-3">
                        <li>Global deployment and scale</li>
                        <li>Autonomous audit reviews</li>
                        <li>Payback/Budget optimization</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between items-center text-xs text-navy-400 border-t border-navy-800 pt-4">
              <span>* Data shown is simulated sample values based on a standard corporate report.</span>
              <span className="font-mono text-golden-500">© Nisol AI Intelligence</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 7: WHY THESE DELIVERABLES MATTER */}
      <div className="space-y-12">
        <SectionHeader 
          title="The Business Value of Every Deliverable"
          subtitle="Connecting Strategy to Enterprise Returns"
          description="We do not supply vanity reports. Each of our 15 components acts as a shield against bad technology spend and a blueprint for real commercial profit."
          badgeText="Commercial Purpose"
          badgeVariant="golden"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {MATTERS_GRID.map((m, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-golden-500/30 hover:shadow-lg transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-2 rounded-xl bg-navy-50 text-navy-950 group-hover:bg-navy-950 group-hover:text-golden-400 transition-colors">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <div className="space-y-2 text-left">
                <h4 className="font-black text-navy-950 text-sm group-hover:text-golden-600 transition-colors">
                  {m.deliverable}
                </h4>
                <p className="text-xs text-navy-700 leading-relaxed font-medium">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 8: BEFORE VS AFTER COMPARISON */}
      <div className="space-y-12">
        <SectionHeader 
          title="What You Have Today vs. What You Get"
          subtitle="Tangible Acceleration Matrix"
          description="See how a fixed-price Nisol Discovery™ replaces tech uncertainty with structured transformation confidence."
          badgeText="Before vs. After"
          badgeVariant="outline"
        />

        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl text-left">
          <div className="grid grid-cols-2 bg-navy-950 text-white border-b border-slate-800">
            <div className="px-6 py-4 text-sm font-black text-red-400 flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Before (Without Nisol Discovery)
            </div>
            <div className="px-6 py-4 text-sm font-black text-golden-400 flex items-center gap-2 border-l border-slate-800">
              <TrendingUp className="w-4 h-4" />
              After (With Nisol Discovery)
            </div>
          </div>
          <div className="divide-y divide-slate-100 font-medium">
            {BEFORE_AFTER.map((row, idx) => (
              <div key={idx} className="grid grid-cols-2 hover:bg-slate-50/50 transition-colors">
                <div className="px-6 py-4 text-xs text-navy-700 leading-relaxed flex items-center">
                  {row.before}
                </div>
                <div className="px-6 py-4 text-xs text-navy-950 font-semibold leading-relaxed border-l border-slate-100 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-golden-500 shrink-0 mr-2" />
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 10: CALL TO ACTION (CTA) */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-8 border border-golden-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900/50 via-navy-950 to-navy-950 pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-golden-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-4">
          <Badge variant="golden" className="animate-pulse">Ready to Transform?</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Ready to Get Your Discovery Deliverables?
          </h2>
          <p className="text-sm sm:text-base text-navy-200 max-w-2xl mx-auto leading-relaxed">
            Get the complete set of 15 deliverables for your organization. Our fixed-price engagement delivers executive clarity in weeks — not months.
          </p>
        </div>

        <div className="relative flex flex-wrap justify-center gap-4 pt-2">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
          <Button href="/contact?type=proposal" variant="navy" size="lg">
            Request a Proposal
          </Button>
        </div>

        <div className="relative border-t border-navy-800 pt-8 mt-6">
          <p className="text-xs text-navy-400 font-bold uppercase tracking-wider mb-4">Or explore more frameworks:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold">
            <Link href="/discovery/methodology" className="text-navy-300 hover:text-golden-400 transition flex items-center gap-1">
              Learn About Discovery Methodology <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-navy-700 hidden sm:inline">|</span>
            <Link href="/resources/roi-calculator" className="text-navy-300 hover:text-golden-400 transition flex items-center gap-1">
              Try the ROI Calculator <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-navy-700 hidden sm:inline">|</span>
            <button onClick={() => setIsModalOpen(true)} className="text-navy-300 hover:text-golden-400 transition flex items-center gap-1 cursor-pointer bg-transparent border-none">
              View Full Sample PDF <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-navy-950 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-golden-500/20 text-left space-y-6 z-10 overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <Badge variant="golden">Lead Capture</Badge>
                <h3 className="text-2xl font-black text-navy-950">Download Sample Pack</h3>
                <p className="text-xs text-navy-700 leading-relaxed font-medium">
                  Enter your business details below to instantly access the PDF preview of our 15 Executive Advisory deliverables.
                </p>
              </div>

              <form onSubmit={handleDownloadSubmit} className="space-y-4 font-medium">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-golden-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:border-golden-500 focus:ring-1 focus:ring-golden-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-golden-500" /> Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:border-golden-500 focus:ring-1 focus:ring-golden-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-golden-500" /> Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corporation"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:border-golden-500 focus:ring-1 focus:ring-golden-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-navy-950 font-black py-3 px-6 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formSubmitted ? (
                    <span>Preparing Document...</span>
                  ) : (
                    <>
                      <span>Generate Sample Pack</span>
                      <Download className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-2 text-[10px] text-navy-500 border-t border-slate-100 pt-4 font-mono justify-center">
                <Lock className="w-3 h-3 text-golden-500" />
                <span>Zero model-training policy. Data 100% secure.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
