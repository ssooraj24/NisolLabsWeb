"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Cpu, 
  FileCheck, 
  UserCheck, 
  AlertTriangle,
  Mic,
  FileCode2,
  Share2,
  Check,
  X,
  Building2,
  Briefcase,
  Landmark,
  Users,
  Server,
  Database,
  Eye,
  Network,
  Key,
  Trash2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RoSenseProductPage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      id: "remember",
      number: "01",
      title: "Remember",
      subtitle: "Multi-Hour Audio Ingestion & Speaker Retention",
      description:
        "Upload multi-hour recordings, boardroom sessions, or multi-day workshop audio. RoSense accurately transcribes and identifies every speaker without losing nuance, technical vocabulary, or context.",
      icon: Mic,
      details: [
        "Handles 18+ hour recordings without losing a single detail",
        "Accurately diarizes and identifies every speaker across complex discussions",
        "Audio processed privately in RAM, never stored unencrypted or used for model training",
      ],
      badge: "Multi-Speaker Audio Intelligence",
    },
    {
      id: "connect",
      number: "02",
      title: "Connect",
      subtitle: "Decision Lineage & Commitment Linking",
      description:
        "Conversations become interconnected institutional knowledge. Concrete business decisions, action commitments, owners, and risks are parsed and linked across time and corporate hierarchy.",
      icon: FileCode2,
      details: [
        "Extracts decisions, commitments, owners, deadlines, and technical risks",
        "Connects discussions across weeks, quarters, and cross-functional teams",
        "Deterministic lineage protected against hallucination or data manipulation",
      ],
      badge: "Decision Lineage & Linking",
    },
    {
      id: "act",
      number: "03",
      title: "Act",
      subtitle: "Decisive Execution & Living Memory",
      description:
        "Output structured intelligence into your internal tools, export executive briefing dossiers, or query months of company memory with sub-second, auditable semantic search.",
      icon: Share2,
      details: [
        "Every decision links directly back to the exact moment it was spoken (Audio Jump)",
        "Automated integration with your enterprise CRM, Jira, and internal workflows",
        "Sub-second natural language search across your entire institutional conversation history",
      ],
      badge: "Decisive Action & Enterprise Memory",
    },
  ];

  const categories = [
    {
      icon: Users,
      title: "Executive Leadership",
      description: "Turn 18-hour board meetings, strategy offsites, and quarterly reviews into 5-minute executive briefing dossiers.",
      useCases: [
        "Board of Directors Meetings",
        "Annual Strategy Offsites",
        "Executive Committee Reviews",
        "M&A Evaluation Discussions",
      ],
      badge: "C-Suite & Boardroom",
    },
    {
      icon: Briefcase,
      title: "Consulting & Agencies",
      description: "Capture every client workshop and discovery session without missing key scope requirements or executive commitments.",
      useCases: [
        "Multi-Day Client Discovery",
        "Strategy & Architecture Roadmaps",
        "Digital Transformation Programs",
        "Stakeholder Interview Series",
      ],
      badge: "Consulting & Services",
    },
    {
      icon: Landmark,
      title: "Government & Regulated",
      description: "Ensure complete compliance, data sovereignty, and auditability for policy committees and air-gapped reviews.",
      useCases: [
        "Policy & Governance Committees",
        "Air-Gapped Confidential Reviews",
        "Regulatory Compliance Audits",
        "Public Hearing Records",
      ],
      badge: "100% On-Premise",
    },
    {
      icon: Building2,
      title: "Large Enterprises",
      description: "Align cross-functional Product, Engineering, Finance, and Legal teams across enterprise organizational silos.",
      useCases: [
        "Product Roadmap Planning",
        "Engineering Architecture Reviews",
        "Quarterly Financial Reviews",
        "Cross-Department Alignment",
      ],
      badge: "Cross-Functional",
    },
  ];

  const outcomes = [
    {
      title: "Total Boardroom Confidentiality",
      description:
        "Speak freely about mergers, pricing strategy, and confidential roadmaps. Your conversations never train public models or leak into vendor clouds.",
      rosense: "100% Zero-Trust, Encrypted RAM-Only execution, Optional Air-Gapped Appliance",
      traditional: "Public cloud storage, data retention for vendor model training",
    },
    {
      title: "Zero Lost Details in Long Sessions",
      description:
        "Built specifically for multi-day strategy offsites, board meetings, and full-day workshops where standard meeting bots fail or cut off.",
      rosense: "Handles 18+ hours of conversation without losing a single detail",
      traditional: "Optimized for short 30-60 min calls; degrades or cuts off on long audio",
    },
    {
      title: "Decision Traceability & Proof",
      description:
        "Never argue about who agreed to what. Every decision, commitment, and risk links to the exact speaker and a 1-click 20s decrypted audio snippet.",
      rosense: "Instant 1-Click Audio Jump proof with speaker verification",
      traditional: "Decisions buried inside static text transcripts and generic summaries",
    },
    {
      title: "Instant Organizational Memory",
      description:
        "Stop asking 'didn't we discuss this six months ago?' Search across your entire company's conversation history as easily as searching Google.",
      rosense: "Unified organizational memory connecting conversations across teams",
      traditional: "Meeting notes remain isolated inside individual files or user inboxes",
    },
  ];

  const securityLayers = [
    {
      num: "01",
      icon: Lock,
      title: "Complete Data Isolation",
      description: "Your data is invisible to everyone else on the system. Full tenant-level cryptographic separation.",
    },
    {
      num: "02",
      icon: Eye,
      title: "Full Audit Trail",
      description: "Every access, playback, search, and export is recorded in an immutable ledger. Nothing goes unnoticed.",
    },
    {
      num: "03",
      icon: Cpu,
      title: "Isolated Processing",
      description: "Audio processing runs in complete isolation — zero external network access, zero third-party API leakage.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "AI Safety & Lineage",
      description: "Deterministic safeguards prevent data manipulation, prompt injection, or unauthorized extraction.",
    },
    {
      num: "05",
      icon: Network,
      title: "Zero Network Leakage",
      description: "In private mode, not a single byte ever leaves your local area network (LAN). Not even once.",
    },
    {
      num: "06",
      icon: Key,
      title: "Enterprise Encryption",
      description: "Military-grade AES-256 encryption at rest and in transit. You control and custody the keys. Always.",
    },
    {
      num: "07",
      icon: FileText,
      title: "Leak Traceability",
      description: "Every export is cryptographically watermarked. Every playback is logged. Unofficial leaks are immediately traceable.",
    },
    {
      num: "08",
      icon: Trash2,
      title: "Instant Data Destruction",
      description: "Delete everything in under one second via master key crypto-shredding. Full compliance with DPDP and GDPR.",
    },
  ];

  return (
    <div className="bg-[#030914] text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-navy-950">
      {/* =========================================================
          ACT 1: THE STATEMENT (HERO)
          "Your company remembers everything. Privately."
         ========================================================= */}
      <section
        id="hero-section"
        className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-navy-800/80"
      >
        {/* Glow backdrop effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/15 via-navy-800/20 to-transparent pointer-events-none -z-10 rounded-b-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Outcome Copy & Dual CTAs */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 bg-navy-900/90 text-slate-200 text-xs font-semibold px-4 py-1.5 rounded-full border border-navy-700/80 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-mono text-[11px] uppercase tracking-wider">
                  PROPRIETARY AI ENGINE
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-golden-400 font-mono text-[11px]">
                  Private Cloud & On-Prem Appliance
                </span>
              </div>

              {/* Outcome Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Your company remembers everything.{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                  Privately.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Every decision captured. Every commitment tracked. Every conversation searchable.
                Entirely on your terms.
              </p>

              {/* Dual CTAs Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  href="/contact?type=rosense-demo"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold border-emerald-400 shadow-lg shadow-emerald-500/20"
                  icon={<Cpu className="w-5 h-5" />}
                >
                  <span>Experience RoSense</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  href="#pipeline"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-navy-700 text-slate-200 hover:bg-navy-800/80 hover:text-white"
                  icon={<Sparkles className="w-4 h-4 text-emerald-400" />}
                >
                  See How It Works
                </Button>
              </div>

              {/* 3 Pillar Guarantees */}
              <div className="pt-6 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 border-t border-navy-800/80 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Zero Model Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Air-Gapped Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">100% Data Sovereignty</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Visual Waveform & Decision Transformation Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Outer Glass Card */}
                <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl text-white relative overflow-hidden backdrop-blur-xl">
                  {/* Accent Top Ribbon Glow */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Header: Live Audio Ingestion Simulation */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-slate-950 transition-all shadow-md active:scale-95"
                        aria-label="Simulate audio playback"
                      >
                        {isPlayingAudio ? (
                          <Pause className="w-4 h-4 fill-slate-950" />
                        ) : (
                          <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                        )}
                      </button>
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-2">
                          <span>Strategy_Offsite_Day1.m4a</span>
                          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            Private
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Duration: 04:18:22 • Diarized (4 Speakers)
                        </div>
                      </div>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Waveform Visualization */}
                  <div className="py-4 flex items-center justify-between gap-1 h-12">
                    {[40, 65, 30, 80, 95, 45, 60, 100, 75, 40, 90, 50, 70, 85, 35, 95, 60, 80, 45, 75, 90, 40, 60].map(
                      (height, idx) => (
                        <div
                          key={idx}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isPlayingAudio
                              ? "bg-emerald-400 animate-pulse"
                              : "bg-slate-700"
                          }`}
                          style={{
                            height: `${
                              isPlayingAudio ? Math.max(15, (height * 0.8) + 15) : height
                            }%`,
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* Live Extraction Stream Badge */}
                  <div className="my-2 flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Extracting decisions and commitments...</span>
                  </div>

                  {/* Output Transformation Preview Cards */}
                  <div className="space-y-3 pt-2">
                    {/* Decision Item */}
                    <div className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-3.5 hover:border-emerald-500/50 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5" /> DECISION #01
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Timestamp [01:42:15]</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        &quot;Approved Q4 expansion strategy targeting European enterprise accounts.&quot;
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                        <UserCheck className="w-3 h-3 text-slate-400" />
                        <span>Speaker: Rahul (VP Ops)</span>
                      </div>
                    </div>

                    {/* Commitment Item */}
                    <div className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-3.5 hover:border-golden-500/50 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-golden-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ACTION COMMITMENT
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Due: Aug 15</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        &quot;Finalize security audit compliance documentation for DPDP readiness.&quot;
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Owner: Priya (Security Lead)</span>
                        <span className="text-emerald-400 hover:underline cursor-pointer font-mono text-[10px]">
                          ▶ Listen Proof (20s)
                        </span>
                      </div>
                    </div>

                    {/* Risk Alert */}
                    <div className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-3.5">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> RISK IDENTIFIED
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">[03:10:04]</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Third-party API latency on legacy systems could delay migration.
                      </p>
                    </div>
                  </div>

                  {/* Footer Vault Shield Callout */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AES-256 Encrypted at Rest
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      Vault Key: company_k39a
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACT 2: THE STORY & TRANSFORMATION (PIPELINE)
          "How RoSense Works: Remember ➔ Connect ➔ Act"
         ========================================================= */}
      <section
        id="pipeline"
        className="py-24 bg-slate-950/70 border-b border-navy-800/80 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Transformation Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How RoSense Works:{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                Remember ➔ Connect ➔ Act
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Your conversations become your company&apos;s living memory.
            </p>
          </div>

          {/* Visual Narrative Flow Banner */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 text-xs font-mono font-bold uppercase tracking-wider">
            <span
              className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                activeStep === 0
                  ? "bg-slate-900 text-emerald-400 border-emerald-500/50 shadow-md"
                  : "bg-navy-900/60 text-slate-400 border-navy-800"
              }`}
            >
              01. Remember
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
            <span
              className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                activeStep === 1
                  ? "bg-slate-900 text-emerald-400 border-emerald-500/50 shadow-md"
                  : "bg-navy-900/60 text-slate-400 border-navy-800"
              }`}
            >
              02. Connect
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
            <span
              className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                activeStep === 2
                  ? "bg-slate-900 text-emerald-400 border-emerald-500/50 shadow-md"
                  : "bg-navy-900/60 text-slate-400 border-navy-800"
              }`}
            >
              03. Act
            </span>
          </div>

          {/* Step Selector Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 relative">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <div key={step.id} className="relative">
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`w-full p-6 rounded-2xl text-left transition-all duration-300 border ${
                      isActive
                        ? "bg-slate-900 text-white border-emerald-500/50 shadow-xl scale-[1.02]"
                        : "bg-navy-900/60 hover:bg-navy-900 text-slate-300 border-navy-800"
                    }`}
                    id={`pipeline-step-${step.id}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                          isActive
                            ? "bg-emerald-500 text-navy-950"
                            : "bg-navy-800 text-slate-300"
                        }`}
                      >
                        STEP {step.number}
                      </span>
                      <Icon
                        className={`w-6 h-6 ${
                          isActive ? "text-emerald-400" : "text-slate-500"
                        }`}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-white">{step.title}</h3>
                    <p
                      className={`text-xs ${
                        isActive ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-8 text-white shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span>{pipelineSteps[activeStep].badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {pipelineSteps[activeStep].title}: {pipelineSteps[activeStep].subtitle}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed">
                  {pipelineSteps[activeStep].description}
                </p>

                <div className="space-y-3 pt-2">
                  {pipelineSteps[activeStep].details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-slate-200">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Interactive Execution Mock View */}
              <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-6 space-y-4 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800 text-[11px]">
                  <span>STAGE {pipelineSteps[activeStep].number} EXECUTION</span>
                  <span className="text-emerald-400">Status: Complete</span>
                </div>

                {activeStep === 0 && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-emerald-400 text-[11px] font-semibold mb-1">
                        ▶ Processing audio stream
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        File: Executive_Offsite_FullDay.m4a (18h 45m)
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-slate-200 text-[11px] font-semibold mb-1">
                        Speaker Identification
                      </div>
                      <div className="text-slate-400 text-[10px] space-y-1">
                        <div>Speaker 01: CEO (34% talk time)</div>
                        <div>Speaker 02: VP Engineering (28% talk time)</div>
                        <div>Speaker 03: Lead Counsel (18% talk time)</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-golden-400 text-[11px] font-semibold mb-1">
                        Structured Output
                      </div>
                      <pre className="text-[10px] text-slate-300 overflow-x-auto">
{`{
  "decision": "Approve Q4 EMEA expansion",
  "owner": "Siddharth",
  "due_date": "2026-09-01",
  "risk": "Regulatory compliance dependency"
}`}
                      </pre>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30">
                      <div className="text-emerald-400 text-[11px] font-semibold mb-1">
                        Enterprise Search Query
                      </div>
                      <div className="text-slate-300 text-[11px]">
                        &quot;What did CEO decide regarding European launch?&quot;
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30">
                      <div className="text-slate-200 text-[11px]">
                        Result: Approved Q4 rollout. [02:14:10]
                      </div>
                      <div className="mt-2 text-emerald-400 text-[10px] font-bold">
                        ▶ Play 20s Audio Proof
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveStep((activeStep + 1) % pipelineSteps.length)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACT 3A: WHO USES ROSENSE (USE CASES)
          "Built for Every Strategic Conversation"
         ========================================================= */}
      <section id="use-cases" className="py-24 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Built for Every{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                Strategic Conversation
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              RoSense is designed for organizations that demand total data privacy, long-context accuracy, and immediate decision execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-navy-950/80 rounded-2xl p-6 border border-navy-700/80 shadow-sm hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-sm border border-slate-800">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="space-y-2 border-t border-navy-800 pt-4">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Primary Use Cases:
                      </p>
                      {item.useCases.map((useCase, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          ACT 3B: OUTCOMES (WHY CHOOSE ROSENSE)
          "Why Enterprise Leaders Choose RoSense"
         ========================================================= */}
      <section id="outcomes" className="py-24 bg-slate-950/70 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Why Enterprise Leaders Choose{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                RoSense
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Beyond basic meeting notes. Built for enterprise decision-making, governance, and long-term memory.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="bg-navy-950/80 rounded-2xl p-8 border border-navy-700/80 shadow-sm hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shadow-md">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-navy-800">
                    {/* RoSense Advantage */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide font-mono">
                          RoSense
                        </div>
                        <div className="text-xs font-semibold text-slate-200 mt-0.5">
                          {item.rosense}
                        </div>
                      </div>
                    </div>

                    {/* Traditional Drawback */}
                    <div className="p-3.5 rounded-xl bg-navy-900/60 border border-navy-800 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wide font-mono">
                          Traditional Meeting Assistants
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {item.traditional}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ACT 4: THE HARDWARE ("THE ROSENSE BOX")
          "Your company's memory. In a box."
         ========================================================= */}
      <section id="appliance" className="py-28 bg-[#020610] text-white relative overflow-hidden border-b border-navy-800/80">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <Lock className="w-3.5 h-3.5" />
              <span>Turnkey On-Premise Appliance</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                RoSense Box
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Your company&apos;s memory. In a box. Intelligence that never leaves your building.
            </p>
          </div>

          {/* Enterprise Appliance Visual Showcase & Specs Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Virtual ITX Appliance Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-8 shadow-2xl">
                {/* Box Top Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        <span>RoSense Box</span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Private intelligence. Plug and play.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AIR-GAPPED READY</span>
                  </div>
                </div>

                {/* 3 Pillars Grid */}
                <div className="py-6 space-y-4 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                    Enterprise Capability Architecture:
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-left">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                      <Cpu className="w-4 h-4 text-emerald-400 mb-1" />
                      <div className="text-white text-[11px] font-bold mb-1">Private AI</div>
                      <div className="text-[10px] text-slate-400 space-y-0.5">
                        <div>✓ 100% Local</div>
                        <div>✓ Zero Internet</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                      <Database className="w-4 h-4 text-golden-400 mb-1" />
                      <div className="text-white text-[11px] font-bold mb-1">Intelligence</div>
                      <div className="text-[10px] text-slate-400 space-y-0.5">
                        <div>✓ Decisions</div>
                        <div>✓ Commitments</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                      <ShieldCheck className="w-4 h-4 text-purple-400 mb-1" />
                      <div className="text-white text-[11px] font-bold mb-1">Deployment</div>
                      <div className="text-[10px] text-slate-400 space-y-0.5">
                        <div>✓ On-Premises</div>
                        <div>✓ Air-Gapped</div>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Security Checklist Container */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-2">
                    <div className="text-[11px] font-bold text-white mb-2 font-mono">Enterprise Safeguards:</div>
                    <div className="space-y-1.5 text-[11px] font-sans">
                      <div className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Conversations never leave your infrastructure</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Zero customer data used for AI model training</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Customer-controlled deployment & complete auditability</span>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Ready Bottom Strip */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400">
                    <span className="flex items-center gap-1.5 font-sans font-semibold">
                      <ShieldCheck className="w-4 h-4" /> Enterprise Ready
                    </span>
                    <span className="font-mono text-[10px] text-slate-300">
                      Automated Backup • Recovery • Business Continuity
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Appliance Benefits & Value Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Your data. Your infrastructure. Your rules.
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                Designed for organizations with the highest privacy requirements. The RoSense Box runs entirely inside your network — no external calls, no data leaving your perimeter.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Zero byte transmitted outside your local area network (LAN)",
                  "Compact, high-performance turn-key local AI server",
                  "Automated business continuity with local encrypted backups",
                  "Instant 1-second master key crypto-shredding capability",
                  "Role-based access control & complete audit trail integration",
                  "Turnkey installation backed by dedicated enterprise AMC support",
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-slate-200">{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  href="/contact?type=rosense-box"
                  variant="primary"
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold border-emerald-400 px-7"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request RoSense Box Appliance
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACT 5: THE FORTRESS (SECURITY VAULT)
          "What you say stays yours. Always."
         ========================================================= */}
      <section id="security" className="py-28 bg-slate-950 text-white relative overflow-hidden border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy & Security</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              What you say{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                stays yours
              </span>
              . Always.
            </h2>
            <p className="mt-3 text-slate-300 text-base">
              Built for organizations where privacy isn&apos;t a feature — it&apos;s a requirement.
            </p>
          </div>

          {/* 8-Layer Security Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.num}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                        LAYER {layer.num}
                      </span>
                      <Icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {layer.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          ACT 6: THE INVITATION BANNER & CTA
          "Ready to see your organization think better?"
         ========================================================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-emerald-950 border border-navy-700 p-10 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to see your organization{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                think better?
              </span>
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto mb-8">
              See how RoSense gives your conversations a living memory. Zero data leakage guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contact?type=rosense-demo"
                variant="primary"
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold border-emerald-400 px-8 shadow-lg shadow-emerald-500/20"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Experience RoSense Demo
              </Button>
              <Button
                href="/spark"
                variant="outline"
                size="lg"
                className="border-navy-700 text-slate-200 hover:bg-navy-800/80"
              >
                Explore Nisol Spark™ Sprint
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
