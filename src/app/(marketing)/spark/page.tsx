"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Database, 
  DollarSign, 
  HelpCircle,
  FileCheck,
  ChevronRight,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const SPARK_TRACKS = [
  {
    id: "track-a",
    letter: "A",
    title: "AI Opportunity Sprint",
    subtitle: "Where should we start with AI?",
    idealFor: "Companies with zero or early AI experience seeking high-ROI quick wins.",
    icon: Target,
    deliverables: [
      "2-hour executive leadership discovery workshop (virtual or on-site)",
      "Rapid scan of 3–5 highest-impact business departments",
      "Top 5 AI use cases ranked by Business Value vs. Technical Feasibility",
      "Immediate quick-win recommendation with projected 12-month ROI range",
      "8–10 page Executive Intelligence Brief delivered on Day 3"
    ]
  },
  {
    id: "track-b",
    letter: "B",
    title: "AI Cost & Efficiency Audit",
    subtitle: "We're already spending on AI — are we spending wisely?",
    idealFor: "Enterprises bleeding money on cloud LLM APIs, tokens, or SaaS AI subscriptions.",
    icon: Zap,
    deliverables: [
      "Audit of current AI/ML/GenAI tool spend (API tokens, cloud GPUs, SaaS seats)",
      "Intelligent model routing audit (stop paying GPT-4o rates for basic summarization)",
      "Semantic caching and prompt compression opportunity identification",
      "Cost reduction blueprint with projected 30%–60% monthly token savings",
      "8–10 page Cost Intelligence Brief delivered on Day 3"
    ]
  },
  {
    id: "track-c",
    letter: "C",
    title: "Data & Compliance Readiness Check",
    subtitle: "Is our data even ready for AI & compliant with laws?",
    idealFor: "Enterprises worried about data silos, PII exposure, and DPDP / EU AI Act liability.",
    icon: Database,
    deliverables: [
      "Surface data quality scan across core systems (CRM, ERP, Document Stores)",
      "Data silo identification and lakehouse integration gap assessment",
      "DPDP Act 2023 & EU AI Act regulatory baseline posture review",
      "PII exposure surface-level scan and vectorization hygiene check",
      "8–10 page Data Readiness Brief & Compliance Checklist delivered on Day 3"
    ]
  }
];

const THREE_DAY_TIMELINE = [
  {
    day: "Day 1",
    title: "Deep Diagnostic & Ingestion",
    desc: "2-hour architecture deep-dive with your leadership and technical owners. Rapid telemetry and documentation scan."
  },
  {
    day: "Day 2",
    title: "Synthesis & Architectural Modeling",
    desc: "Our senior architect synthesizes findings, benchmarks against industry peers, and models unit economics."
  },
  {
    day: "Day 3",
    title: "Executive Readout & Brief Delivery",
    desc: "1-hour executive findings presentation with leadership, followed by immediate delivery of your 8–10 page brief."
  }
];

export default function SparkPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>("track-a");

  return (
    <div className="space-y-24 sm:space-y-32 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-golden-500" />
          <span>The First Look • Fixed-Price 3-Day Sprint</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-navy-950 tracking-tight leading-[1.08]">
          Nisol Spark. <br />
          <span className="golden-gradient-text">Clarity in 3 Days.</span>
        </h1>

        <p className="text-lg sm:text-xl text-navy-700/90 leading-relaxed font-medium max-w-3xl mx-auto">
          No 6-month consulting commitments. No bloated teams. Just one senior AI architect in your organization to give you a definitive answer on your biggest AI question.
        </p>

        {/* Pricing & Duration Bar */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-navy-950 text-white shadow-2xl border border-navy-800">
          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-black text-golden-400">₹1,50,000</div>
            <div className="text-xs text-slate-400 font-medium">$1,800 USD • Fixed-Price SOW</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-navy-800" />
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>3 Business Days</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Kickoff to Board-Ready Brief</div>
          </div>
          <div className="pt-2 sm:pt-0">
            <Button href="/contact?package=Spark" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Apply for Spark Sprint →
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE 100% CREDIT GUARANTEE */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-950 to-navy-950 text-white rounded-3xl p-8 sm:p-10 border border-emerald-500/30 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h3 className="text-xl font-bold text-white">The Zero-Risk 100% Upgrade Credit</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If your leadership decides to proceed to <strong className="text-emerald-300">Nisol One</strong> within 30 days of receiving your Spark brief, <strong>100% of your ₹1,50,000 fee is credited directly</strong> against the Nisol One engagement. You risk nothing.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CHOOSE YOUR FOCUS TRACK */}
      <section className="space-y-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Single-Focus Architecture</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Choose Your Focus Track
          </h2>
          <p className="text-sm text-navy-700/80">
            Unlike Nisol One (which audits all 15 capabilities simultaneously), Nisol Spark laser-focuses on your single most urgent priority.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPARK_TRACKS.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            return (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`cursor-pointer rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-navy-950 text-white border-golden-500 ring-2 ring-golden-500/50 shadow-2xl scale-[1.02]"
                    : "bg-white text-navy-950 border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      isSelected ? "bg-golden-500 text-navy-950" : "bg-navy-100 text-navy-800"
                    }`}>
                      TRACK {track.letter}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-golden-400" : "text-slate-400"}`} />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{track.title}</h3>
                  <p className={`text-xs font-medium italic mb-4 ${isSelected ? "text-golden-300" : "text-golden-700"}`}>
                    "{track.subtitle}"
                  </p>

                  <div className={`text-[11px] mb-6 p-3 rounded-xl ${
                    isSelected ? "bg-navy-900 text-slate-300 border border-navy-800" : "bg-slate-50 text-slate-600 border border-slate-100"
                  }`}>
                    <strong>Best for:</strong> {track.idealFor}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? "text-slate-400" : "text-slate-500"}`}>
                      Track Inclusions
                    </div>
                    {track.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? "text-golden-400" : "text-emerald-600"}`} />
                        <span className={isSelected ? "text-slate-200" : "text-navy-800"}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/20">
                  <Button
                    href={`/contact?package=Spark&track=${track.letter}`}
                    variant={isSelected ? "primary" : "navy"}
                    size="sm"
                    className="w-full justify-center"
                  >
                    Select Track {track.letter} →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. THE 3-DAY EXECUTION TIMELINE */}
      <section className="max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Precision Execution</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            How The 3 Days Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THREE_DAY_TIMELINE.map((step, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3 relative">
              <span className="text-3xl font-black text-golden-500">{step.day}</span>
              <h3 className="text-lg font-bold text-navy-950">{step.title}</h3>
              <p className="text-xs text-navy-700/85 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CONTROLLED SCARCITY CLOSE */}
      <section className="max-w-3xl mx-auto text-center space-y-6 pb-8">
        <Badge variant="golden" className="mx-auto">Limited Availability</Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
          Ready for Your First Look?
        </h2>
        <p className="text-base text-navy-700/85 max-w-xl mx-auto">
          We accept a maximum of 4 Spark Sprints per month to ensure senior architect dedication.
        </p>
        <div className="pt-2">
          <Button href="/contact?package=Spark" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Spark Sprint (₹1,50,000) →
          </Button>
        </div>
        <p className="text-xs text-slate-400">
          Mutual NDA guaranteed • Kickoff within 5 business days of approval
        </p>
      </section>
    </div>
  );
}
