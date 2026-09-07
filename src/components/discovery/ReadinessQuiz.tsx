"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Zap, 
  Database, 
  Lock, 
  FileText 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Question {
  id: number;
  category: string;
  title: string;
  options: {
    label: string;
    points: number;
    tag: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Strategic Mandate",
    title: "What is your executive leadership's current mandate for AI?",
    options: [
      { label: "No formal mandate yet; ad-hoc interest from individual teams", points: 5, tag: "Ad-Hoc" },
      { label: "Board wants 'something done in AI' this year, but no fixed roadmap", points: 10, tag: "Exploratory" },
      { label: "Executive sponsor identified with active allocated transformation budget", points: 15, tag: "Funded" },
      { label: "Top-level enterprise imperative tied directly to EBITDA & CEO targets", points: 20, tag: "Strategic" },
    ],
  },
  {
    id: 2,
    category: "Data Architecture",
    title: "How is your core operational data structured and accessed?",
    options: [
      { label: "Fragmented across spreadsheets, local drives, and disconnected silos", points: 3, tag: "Siloed" },
      { label: "Standard relational SQL databases & SaaS apps with manual exports", points: 8, tag: "Relational" },
      { label: "Centralized cloud data warehouse (Snowflake/BigQuery) with clean schemas", points: 14, tag: "Centralized" },
      { label: "Real-time lakehouse with CDC sync, vector embeddings, and semantic indexes", points: 20, tag: "Lakehouse Ready" },
    ],
  },
  {
    id: 3,
    category: "AI Production Footprint",
    title: "What is your organization's current real-world AI deployment state?",
    options: [
      { label: "Zero formal AI deployments (staff use individual consumer chat tools)", points: 3, tag: "Zero" },
      { label: "A few internal prototype scripts or off-the-shelf vendor bot plug-ins", points: 8, tag: "Prototypes" },
      { label: "At least 1-2 models integrated into production workflows with basic logging", points: 14, tag: "Production Pilot" },
      { label: "Autonomous multi-agent systems with continuous LLMOps evaluation telemetry", points: 20, tag: "Autonomous Scale" },
    ],
  },
  {
    id: 4,
    category: "Security & Governance",
    title: "How do you control data leakage, prompt injection, and regulatory compliance?",
    options: [
      { label: "No AI security policy defined; rely on public SaaS providers", points: 2, tag: "Unprotected" },
      { label: "Basic acceptable-use policy asking staff not to paste confidential data", points: 6, tag: "Informal Policy" },
      { label: "Role-Based Access Control (RBAC) and private cloud VPC model hosting", points: 12, tag: "VPC Isolated" },
      { label: "Zero-Trust guardrails, PII redaction proxy, and DPDP / EU AI Act audit logs", points: 18, tag: "Enterprise Zero-Trust" },
    ],
  },
  {
    id: 5,
    category: "Engineering & Latency",
    title: "What does your technical infrastructure look like for AI scaling?",
    options: [
      { label: "Legacy on-premise infrastructure without standardized API access", points: 2, tag: "Legacy" },
      { label: "Hybrid cloud with REST APIs and basic microservice containers", points: 5, tag: "Standard Cloud" },
      { label: "Modern containerized cloud with GPU support and vector databases", points: 8, tag: "AI Cloud Native" },
      { label: "High-throughput vLLM clusters, semantic caching, and sub-200ms latency SLAs", points: 12, tag: "Ultra Low Latency" },
    ],
  },
  {
    id: 6,
    category: "Primary Horizon",
    title: "What is the single most urgent objective you need AI to accomplish?",
    options: [
      { label: "Identify the top 5 high-ROI quick-win opportunities and eliminate confusion", points: 5, tag: "Opportunity Focus" },
      { label: "Stop bleeding budget on runaway cloud LLM API tokens and optimize architecture", points: 7, tag: "Cost Optimization" },
      { label: "Automate complex multi-step workflows with reliable autonomous agents", points: 8, tag: "Workflow Automation" },
      { label: "Build a permanent, sovereign intelligence layer that creates a defensible moat", points: 10, tag: "Sovereign Moat" },
    ],
  },
];

export function ReadinessQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (points: number) => {
    const updated = [...selectedAnswers, points];
    setSelectedAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Score calculation (0 - 100)
  const totalScore = selectedAnswers.reduce((acc, curr) => acc + curr, 0);

  let maturityLevel = "AI Novice";
  let recommendedPackage = "Nisol Spark (Track A: Opportunity Sprint)";
  let packageParam = "Spark";
  let summaryText = "Your organization is at the initial exploration stage. Committing to massive consulting retainers risks significant wasted capital. Start with a focused 3-day sprint to pinpoint exactly where AI generates measurable value.";

  if (totalScore >= 36 && totalScore <= 60) {
    maturityLevel = "AI Explorer";
    recommendedPackage = "Nisol One (Foundation 360° Diagnostic)";
    packageParam = "One";
    summaryText = "You have initiated experimentation, but data silos and unmonitored prototypes prevent production scaling. A structured 62-question audit across 15 capabilities will give you a board-approved 12-month transformation roadmap.";
  } else if (totalScore >= 61 && totalScore <= 82) {
    maturityLevel = "Accelerating Enterprise";
    recommendedPackage = "Nisol Pro (Growth & CFO Memo)";
    packageParam = "Pro";
    summaryText = "Your infrastructure and strategy are maturing rapidly. Your primary bottleneck is board financial justification, model unit economics, and data lakehouse engineering. Nisol Pro delivers a full CFO investment memo and architecture blueprint.";
  } else if (totalScore > 82) {
    maturityLevel = "AI-First Candidate";
    recommendedPackage = "Nisol Enterprise (Sovereign Intelligence)";
    packageParam = "Enterprise";
    summaryText = "Your organization is positioned to deploy autonomous agent clusters and proprietary vector intelligence. You need enterprise multi-entity architecture, custom CoE governance, and zero-trust sovereign deployment.";
  }

  return (
    <div className="max-w-3xl mx-auto">
      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span className="text-golden-600 font-bold">{QUESTIONS[currentStep].category}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-golden-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 leading-snug">
              {QUESTIONS[currentStep].title}
            </h2>
            <p className="text-xs text-slate-500">
              Select the option that most accurately represents your organization today.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.points)}
                className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:border-golden-500/70 hover:bg-golden-50/20 transition-all duration-200 flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1 pr-4">
                  <div className="text-sm font-bold text-navy-950 group-hover:text-golden-700 transition-colors">
                    {option.label}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {option.tag}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-300 group-hover:border-golden-500 group-hover:bg-golden-500 group-hover:text-navy-950 flex items-center justify-center shrink-0 transition-all">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-950 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-14 border border-golden-500/30 shadow-2xl space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-3">
            <Badge variant="golden" className="mx-auto">Assessment Results</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Your AI Maturity Score
            </h2>
          </div>

          {/* Score Gauge */}
          <div className="flex flex-col items-center justify-center py-6 bg-navy-900/90 rounded-2xl border border-navy-800 space-y-2">
            <div className="text-6xl sm:text-7xl font-black text-golden-400">
              {totalScore}<span className="text-3xl text-slate-500 font-normal">/100</span>
            </div>
            <div className="text-lg font-bold text-emerald-400">
              Maturity Level: {maturityLevel}
            </div>
          </div>

          {/* Analysis */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-golden-400">
              Executive Diagnosis
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {summaryText}
            </p>
          </div>

          {/* Recommended Starting System */}
          <div className="bg-navy-900 p-6 rounded-2xl border border-navy-700 space-y-3">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Recommended Engagement Tier
            </div>
            <div className="text-xl font-black text-golden-300">
              {recommendedPackage}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your scores, this engagement tier provides the fastest path to production ROI without premature capital commitment.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Button
              href={`/contact?package=${packageParam}&score=${totalScore}`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto justify-center"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Apply with My Score ({totalScore}/100) →
            </Button>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 py-2 px-4 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
