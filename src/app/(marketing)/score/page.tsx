"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Layers, 
  FileText, 
  Sparkles,
  Download,
  Building2,
  Cpu,
  ChevronRight,
  ExternalLink,
  X,
  BookOpen,
  FileCheck2,
  Globe
} from "lucide-react";

interface Capability {
  n: string;
  name: string;
  desc: string;
  avg: string;
  category: "Strategic" | "Data & Tech" | "Execution";
}

const CAPABILITIES: Capability[] = [
  { n: "01", name: "Leadership & Vision", desc: "Board mandate, capital governance, and north-star tied to EBITDA impact.", avg: "2.4", category: "Strategic" },
  { n: "02", name: "Strategy & Roadmap", desc: "Prioritized high-conviction portfolio vs random disconnected departmental PoCs.", avg: "2.1", category: "Strategic" },
  { n: "03", name: "Data Hygiene", desc: "Lineage tracking, quality SLAs, master data hygiene, and automated curation.", avg: "1.9", category: "Data & Tech" },
  { n: "04", name: "Data Architecture", desc: "Enterprise lakehouse, CDC streaming pipelines, and metadata governance.", avg: "2.3", category: "Data & Tech" },
  { n: "05", name: "Vector & Knowledge", desc: "Hybrid dense-sparse RAG, ontology graphs, and context chunk governance.", avg: "1.8", category: "Data & Tech" },
  { n: "06", name: "Security & PII", desc: "Zero-trust tenant isolation, fine-grained RBAC, and zero public model training.", avg: "2.6", category: "Data & Tech" },
  { n: "07", name: "Governance & Risk", desc: "Model risk frameworks, hallucination boundaries, and immutable audit trails.", avg: "2.2", category: "Strategic" },
  { n: "08", name: "Talent & Skills", desc: "Multi-disciplinary pod structures, internal enablement, and upskilling velocity.", avg: "2.0", category: "Execution" },
  { n: "09", name: "Culture & Adoption", desc: "Executive sponsorship, organizational appetite, and adoption velocity across lines of work.", avg: "2.3", category: "Execution" },
  { n: "10", name: "Infrastructure", desc: "Inference scalability, latency budgets, pass-through cloud cost architecture.", avg: "2.7", category: "Data & Tech" },
  { n: "11", name: "MLOps & LLMOps", desc: "CI/CD eval suites, regression guards, synthetic bench testing, and fallback routing.", avg: "1.7", category: "Data & Tech" },
  { n: "12", name: "Use Case Maturity", desc: "Ratio of validated production workloads to experimental exploratory pilots.", avg: "2.0", category: "Execution" },
  { n: "13", name: "Token Economics", desc: "Cost per inference chunk, per business case unit, monitored at scale.", avg: "1.6", category: "Data & Tech" },
  { n: "14", name: "Measurement & ROI", desc: "Board-level operational KPIs, hard dollar payback tracking, not demo metrics.", avg: "1.9", category: "Strategic" },
  { n: "15", name: "Change & OCM", desc: "RACI transition frameworks, operational playbooks, and friction elimination.", avg: "2.1", category: "Execution" }
];

interface Industry {
  name: string;
  score: number;
  sampleCount: string;
  topRisk: string;
  leaderScore: number;
}

const INDUSTRIES: Industry[] = [
  { name: "BFSI & Fintech", score: 2.6, sampleCount: "42 Audits", topRisk: "Data lineage & regulatory audit trails", leaderScore: 4.2 },
  { name: "Industrial & Manufacturing", score: 2.1, sampleCount: "38 Audits", topRisk: "Legacy telemetry & fragmented SCADA silos", leaderScore: 3.9 },
  { name: "Healthcare & Life Sciences", score: 2.3, sampleCount: "29 Audits", topRisk: "HIPAA / DPDP PII isolation & clinical evals", leaderScore: 4.1 },
  { name: "Retail & E-Commerce", score: 2.9, sampleCount: "34 Audits", topRisk: "Runaway inference costs during demand peaks", leaderScore: 4.4 },
  { name: "Logistics & Supply Chain", score: 2.4, sampleCount: "31 Audits", topRisk: "Vendor lock-in & real-time latency cliffs", leaderScore: 4.0 },
  { name: "Enterprise SaaS & Tech", score: 3.1, sampleCount: "56 Audits", topRisk: "Token margin erosion at enterprise scale", leaderScore: 4.6 },
  { name: "Public Sector & Infrastructure", score: 1.9, sampleCount: "22 Audits", topRisk: "Sovereign governance & procurement inertia", leaderScore: 3.5 }
];

interface ReportChapter {
  chapter: string;
  title: string;
  desc: string;
  sectionTag: string;
  highlights: string[];
}

const REPORT_CHAPTERS: ReportChapter[] = [
  {
    chapter: "01",
    title: "The Macro State of Enterprise AI: The 2.3 vs 4.4 Reality Gap",
    desc: "Why 73% of enterprise AI pilots stall before production, and how top-quartile leaders achieve 3.8x higher EBITDA impact with 62% lower token spend.",
    sectionTag: "Macro Reality & Gap",
    highlights: ["Global Enterprise Avg: 2.3/5.0", "Top-Quartile Leader: 4.4/5.0", "The Unmonitored PoC Trap"]
  },
  {
    chapter: "02",
    title: "The 15 Enterprise AI Capabilities Scorecard",
    desc: "Empirical heatmaps identifying the 3 highest-risk failure points worldwide: Token Economics (1.6), LLMOps regression guards (1.7), and Vector Lakehouses (1.8).",
    sectionTag: "15-Capability Heatmap",
    highlights: ["15 Core Capabilities", "62 Proprietary Dimensions", "Hallucination Risk Zones"]
  },
  {
    chapter: "03",
    title: "Cross-Sector Benchmarks: 8 Global Cohorts Analyzed",
    desc: "Granular maturity diagnostics across BFSI, Industrial & Manufacturing, Healthcare, Retail, Logistics, Enterprise SaaS, Public Sector, and Automotive across North America, EMEA, GCC, and APAC.",
    sectionTag: "8-Cohort Diagnostics",
    highlights: ["250+ Audits Analyzed", "North America, EMEA, GCC & APAC", "Air-Gapped vs Cloud SLAs"]
  },
  {
    chapter: "04",
    title: "The 4 Enterprise Failure Modes (Why $1.4M is Wasted)",
    desc: "A forensic teardown of the 4 structural flaws: UI demo wrappers, unsanitized PII leaks, cloud inference margin cliffs, and black-box vendor lock-in.",
    sectionTag: "4 Failure Modes",
    highlights: ["Demo Wrapper Trap", "PII Data Breaches", "Zero Vendor Lock-In Defense"]
  },
  {
    chapter: "05",
    title: "The Reference Enterprise Intelligence Architecture",
    desc: "The vendor-neutral system blueprint: CDC Streaming pipelines, pgvector / Qdrant lakehouses, hybrid BM25 + dense re-ranking, and zero-trust PII gateways.",
    sectionTag: "Architecture Topology",
    highlights: ["CDC Lakehouse Topology", "Agent Mesh Protocols", "Latency < 2s SLAs"]
  },
  {
    chapter: "06",
    title: "The Board Presentation Toolkit & CFO DCF Model",
    desc: "A ready-to-use Minto Pyramid board memo structure and a 3-scenario discounted cash flow (DCF) model to defend AI capital expenditure in front of your board.",
    sectionTag: "CFO Financial Toolkit",
    highlights: ["Minto Board Memo", "3-Scenario DCF Template", "4 Go-Live Decision Gates"]
  }
];

function ScoreRadarSvg({ activeCapability }: { activeCapability: number | null }) {
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
  const count = 15;
  const angleStep = (Math.PI * 2) / count;
  const startAngle = -Math.PI / 2;

  // Actual capability weights normalized (0 to 1) based on benchmark averages
  const scores = CAPABILITIES.map(c => Number(c.avg) / 5.0);
  const targetScores = [0.76, 0.8, 0.74, 0.82, 0.78, 0.86, 0.76, 0.72, 0.78, 0.84, 0.76, 0.74, 0.72, 0.78, 0.8];

  const getCoord = (radius: number, angle: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  const currentPoints = scores.map((val, idx) => {
    const angle = startAngle + idx * angleStep;
    const pt = getCoord(maxRadius * val, angle);
    return `${pt.x},${pt.y}`;
  }).join(" ");

  const targetPoints = targetScores.map((val, idx) => {
    const angle = startAngle + idx * angleStep;
    const pt = getCoord(maxRadius * val, angle);
    return `${pt.x},${pt.y}`;
  }).join(" ");

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        {/* Background Radial Glow */}
        <circle cx={cx} cy={cy} r={maxRadius * 0.9} fill="#D4A24E" fillOpacity="0.03" />

        {/* Concentric Rings */}
        {rings.map((ringVal, rIdx) => {
          const ringRadius = maxRadius * ringVal;
          const ringPts = Array.from({ length: count }).map((_, i) => {
            const angle = startAngle + i * angleStep;
            const pt = getCoord(ringRadius, angle);
            return `${pt.x},${pt.y}`;
          }).join(" ");

          return (
            <g key={rIdx}>
              <polygon
                points={ringPts}
                fill="none"
                stroke={rIdx === rings.length - 1 ? "#D4A24E" : "rgba(255,255,255,0.12)"}
                strokeWidth={rIdx === rings.length - 1 ? 1.5 : 0.8}
                strokeDasharray={rIdx % 2 === 1 ? "3 3" : "0"}
                strokeOpacity={rIdx === rings.length - 1 ? 0.4 : 0.8}
              />
              {/* Ring scale text */}
              <text
                x={cx + 6}
                y={cy - ringRadius + 10}
                fill="#94A3B8"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                className="select-none font-medium opacity-60"
              >
                {(ringVal * 5).toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Radial Axis Spokes */}
        {Array.from({ length: count }).map((_, i) => {
          const angle = startAngle + i * angleStep;
          const outer = getCoord(maxRadius, angle);
          const isHighlighted = activeCapability === i;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke={isHighlighted ? "#D4A24E" : "rgba(255,255,255,0.1)"}
              strokeWidth={isHighlighted ? 1.8 : 0.8}
              strokeDasharray={isHighlighted ? "0" : "2 3"}
            />
          );
        })}

        {/* Target Polygon (3.8 Managed Blueprint Post-180 Days) */}
        <polygon
          points={targetPoints}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />

        {/* Current Enterprise Polygon (2.1 Reactive) */}
        <polygon
          points={currentPoints}
          fill="#D4A24E"
          fillOpacity="0.18"
          stroke="#D4A24E"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Data Vertices */}
        {scores.map((val, idx) => {
          const angle = startAngle + idx * angleStep;
          const pt = getCoord(maxRadius * val, angle);
          const isHighlighted = activeCapability === idx;
          return (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={isHighlighted ? 6 : 3.5}
              fill={isHighlighted ? "#FFFFFF" : "#D4A24E"}
              stroke="#0C1731"
              strokeWidth="2"
              className="transition-all duration-200 cursor-pointer"
            />
          );
        })}

        {/* Center Pivot Point */}
        <circle cx={cx} cy={cy} r="3" fill="#FFFFFF" opacity="0.8" />
      </svg>
    </div>
  );
}

export default function NisolScorePage() {
  const [activeCapability, setActiveCapability] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(INDUSTRIES[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ company: "", email: "", role: "" });

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportForm, setReportForm] = useState({ name: "", email: "", company: "", region: "Global / Worldwide" });
  const [reportDownloaded, setReportDownloaded] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const REPORT_PDF_URL = "/reports/Global-Enterprise-AI-Maturity-Report-2026-nisolai.pdf";
  const REPORT_FILE_NAME = "Global-Enterprise-AI-Maturity-Report-2026-nisolai.pdf";

  const triggerPdfDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = REPORT_PDF_URL;
      link.download = REPORT_FILE_NAME;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        try {
          document.body.removeChild(link);
        } catch {
          // ignore
        }
      }, 200);
    } catch {
      window.open(REPORT_PDF_URL, "_blank");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.email) {
      showToast("Please enter your organization name and work email.");
      return;
    }
    setFormSubmitted(true);
    showToast("Baseline Application Submitted. Our architecture team will review in 48h.");
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportDownloaded(true);
    triggerPdfDownload();
    showToast(
      reportForm.email
        ? `Downloading report. Confirmation queued for ${reportForm.email}.`
        : "Downloading Global Enterprise AI Maturity Report 2026 (PDF)..."
    );
  };

  return (
    <div className="bg-[#0C1731] text-white min-h-screen selection:bg-[#D4A24E]/30 selection:text-[#FBF8F3]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#101D3D] text-[#FBF8F3] px-5 py-3 rounded-xl border border-[#D4A24E]/40 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-[#D4A24E]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-20 border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(212,162,78,0.12),_transparent_70%)]" />
          <div className="absolute top-1/2 -left-60 w-96 h-96 bg-[radial-gradient(circle,_rgba(27,45,91,0.6),_transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D4A24E]/30 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4A24E] animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-widest text-[#D4A24E] uppercase">
                ENTERPRISE AI MATURITY AUDIT • NISOL SCORE™
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FBF8F3] leading-[1.05]">
              Enterprise AI Maturity Audit: <br className="hidden sm:inline" />
              <span className="text-[#D4A24E]">The Benchmark Boards Trust.</span>
            </h1>

            {/* Subtitle */}
            <div className="mt-6 space-y-3 max-w-3xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal">
                <strong className="text-[#D4A24E] font-semibold">Nisol Score™</strong> is our Enterprise AI Maturity Audit. Not an unvetted quiz. Architect-validated against 62 proprietary dimensions and 15 core capabilities.
              </p>
              <p className="text-xs sm:text-sm font-mono text-slate-400">
                AI Maturity Scored 1.0 to 5.0: Reactive (1) → Emerging (2) → Operational (3) → Scaled (4) → Autonomous (5). Architect-validated baseline included in Nisol 360™.
              </p>
            </div>

            {/* Scorecard Hero Graphic */}
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="bg-[#101D3D]/90 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D4A24E]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl sm:text-9xl font-extrabold text-[#D4A24E] tracking-tight leading-none">
                      2.1
                    </span>
                    <span className="text-2xl sm:text-4xl font-light text-slate-400 tracking-normal">
                      / 5.0
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs uppercase tracking-wider font-semibold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>Reactive • Bottom Quartile • At Risk</span>
                  </div>

                  {/* 3 Core Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-8 w-full max-w-lg text-center">
                    <div>
                      <div className="font-mono text-xs uppercase text-slate-400 tracking-wider">Capabilities</div>
                      <div className="mt-1 text-xl sm:text-2xl font-bold text-[#FBF8F3]">15</div>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase text-slate-400 tracking-wider">Dimensions</div>
                      <div className="mt-1 text-xl sm:text-2xl font-bold text-[#D4A24E]">62 • Protected</div>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase text-slate-400 tracking-wider">Industries</div>
                      <div className="mt-1 text-xl sm:text-2xl font-bold text-[#FBF8F3]">8 Benchmarked</div>
                    </div>
                  </div>
                </div>

                {/* Footer Micro-Guarantee */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#D4A24E]" />
                  <span>Architect-validated • Never self-reported • Mutual NDA protected</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D4A24E] text-[#0C1731] font-bold text-sm hover:bg-[#E5B86A] transition-all shadow-xl hover:shadow-[#D4A24E]/20 text-center"
              >
                Request Your Nisol Score™
              </a>
              <a
                href={REPORT_PDF_URL}
                download={REPORT_FILE_NAME}
                onClick={() => showToast("Downloading Global Enterprise AI Maturity Report 2026 (PDF)...")}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#FBF8F3] border border-white/10 font-semibold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D4A24E] group-hover:translate-y-0.5 transition-transform" />
                <span>Download Global Enterprise AI Report 2026</span>
              </a>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs">
              <button
                onClick={() => setReportModalOpen(true)}
                className="text-slate-400 hover:text-[#D4A24E] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D4A24E]" />
                <span className="underline">Preview 6 Chapters &amp; Table of Contents</span>
              </button>
              <span className="text-white/20">•</span>
              <a
                href={REPORT_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#D4A24E] flex items-center gap-1 transition-colors underline"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open in Tab</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: NOT A QUIZ. AN ENTERPRISE BENCHMARK */}
      <section className="py-20 lg:py-28 bg-[#101D3D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBF8F3]">
              Not a Quiz. An Enterprise Benchmark.
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              Consumer AI quizzes give you a vanity badge. NISOL SCORE™ gives your board a hard financial and architectural diagnostic.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#0C1731] p-8 rounded-2xl border border-white/10 hover:border-[#D4A24E]/40 transition-colors">
              <div className="font-mono text-xs uppercase tracking-widest text-[#D4A24E] font-bold">
                15 Capabilities
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#FBF8F3]">
                From Leadership to Token Economics.
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Each scored 1–5 against 62 proprietary diagnostic dimensions. No subjective opinions. Grounded purely in architecture artifacts, logs, and cost sheets.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0C1731] p-8 rounded-2xl border border-white/10 hover:border-[#D4A24E]/40 transition-colors relative overflow-hidden">
              <div className="font-mono text-xs uppercase tracking-widest text-[#D4A24E] font-bold">
                5 Maturity Levels
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#FBF8F3]">
                Reactive (1) → Autonomous (5).
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                73% of Indian and global enterprises are stuck at Reactive. 2.5 is the failure cliff — below it, 73% of initiatives never reach production.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>73% Failure Cliff at &lt; 2.5</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0C1731] p-8 rounded-2xl border border-white/10 hover:border-[#D4A24E]/40 transition-colors">
              <div className="font-mono text-xs uppercase tracking-widest text-[#D4A24E] font-bold">
                8 Industries
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#FBF8F3]">
                BFSI to Public Sector.
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Median 2.8. Leader 4.2. You do not compete against a generic AI hype cycle. You compete against your specific industry leader&apos;s cost and security posture.
              </p>
            </div>

          </div>

          {/* Institutional Trust Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E]" />
              <span>Like S&amp;P for corporate credit. NISOL SCORE™ for enterprise AI readiness.</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: 15 CAPABILITIES & 62 PROPRIETARY DIMENSIONS */}
      <section className="py-20 lg:py-28 bg-[#0C1731] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#D4A24E] uppercase">
              METHODOLOGY ARCHITECTURE
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBF8F3]">
              15 Capabilities. 62 Proprietary Dimensions.
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              We show you <span className="text-[#FBF8F3] font-semibold">what</span> we measure. Not <span className="text-[#FBF8F3] font-semibold">how</span> we measure it. Like Apple demonstrates M-series silicon throughput, not the EUV photolithography recipe.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap, idx) => (
              <div
                key={cap.n}
                onMouseEnter={() => setActiveCapability(idx)}
                onMouseLeave={() => setActiveCapability(null)}
                className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  activeCapability === idx
                    ? "bg-[#101D3D] border-[#D4A24E] shadow-xl shadow-[#D4A24E]/5"
                    : "bg-[#101D3D]/60 border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#D4A24E] tracking-wider">
                      {cap.n}
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                      AVG {cap.avg} / 5.0
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#FBF8F3]">
                    {cap.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                {/* Micro Progress Bar */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D4A24E] rounded-full transition-all duration-500"
                      style={{ width: `${(Number(cap.avg) / 5) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 font-medium">
                    {cap.avg}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Proprietary IP Callout */}
          <div className="mt-12 p-6 rounded-2xl bg-[#101D3D] border border-white/10 max-w-3xl mx-auto flex items-center gap-4 text-xs font-mono text-slate-400">
            <Lock className="w-5 h-5 text-[#D4A24E] shrink-0" />
            <p>
              The full 62 diagnostic test scripts, scoring weights, and audit rubrics are confidential and delivered exclusively within a signed mutual NDA Nisol 360™ engagement.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: GLOBAL ENTERPRISE AI READINESS 2026 BENCHMARK */}
      <section className="py-20 lg:py-28 bg-[#101D3D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4A24E]">
                BENCHMARK • 2026 • 250+ ENTERPRISES WORLDWIDE
              </div>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBF8F3]">
                Global Enterprise AI Maturity Benchmark 2026
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-300 leading-relaxed">
              Synthesized from 250+ active enterprise audits across North America, EMEA, GCC/Dubai, and APAC. Updated quarterly under controlled audit lineage.
            </p>
          </div>

          {/* 5 Macro Metrics */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-6 rounded-2xl bg-[#0C1731] border border-white/10">
              <div className="font-mono text-xs uppercase text-slate-400 font-medium">Global Average</div>
              <div className="mt-2 text-3xl font-extrabold text-rose-400">2.3 / 5</div>
              <div className="mt-1 text-xs text-slate-400">Reactive tier</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C1731] border border-white/10">
              <div className="font-mono text-xs uppercase text-slate-400 font-medium">Industry Median</div>
              <div className="mt-2 text-3xl font-extrabold text-amber-400">2.8 / 5</div>
              <div className="mt-1 text-xs text-slate-400">Operational tier</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C1731] border border-white/10">
              <div className="font-mono text-xs uppercase text-slate-400 font-medium">Global Leader</div>
              <div className="mt-2 text-3xl font-extrabold text-[#D4A24E]">4.4 / 5</div>
              <div className="mt-1 text-xs text-slate-400">Autonomous scale</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C1731] border border-white/10">
              <div className="font-mono text-xs uppercase text-slate-400 font-medium">Failure Rate &lt; 2.5</div>
              <div className="mt-2 text-3xl font-extrabold text-rose-400">73%</div>
              <div className="mt-1 text-xs text-slate-400">Never reach production</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C1731] border border-white/10 col-span-2 lg:col-span-1">
              <div className="font-mono text-xs uppercase text-slate-400 font-medium">Avg Wasted Spend</div>
              <div className="mt-2 text-3xl font-extrabold text-[#FBF8F3]">$1.4M</div>
              <div className="mt-1 text-xs text-slate-400">₹1.2 Cr without architecture</div>
            </div>
          </div>

          {/* Interactive Industry Comparison Table */}
          <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Industry Breakdown */}
            <div className="lg:col-span-7 bg-[#0C1731] p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-sm font-bold text-[#FBF8F3]">Sector Readiness Benchmark</span>
                <span className="font-mono text-xs text-slate-400">Score / 5.0 (Higher = Mature)</span>
              </div>

              <div className="mt-6 space-y-4">
                {INDUSTRIES.map((ind) => {
                  const isSelected = selectedIndustry.name === ind.name;
                  return (
                    <div
                      key={ind.name}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        isSelected 
                          ? "bg-white/10 border-[#D4A24E]/50" 
                          : "bg-white/5 border-transparent hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{ind.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-400">{ind.sampleCount}</span>
                          <span className="font-mono font-bold text-[#D4A24E]">{ind.score.toFixed(1)} / 5.0</span>
                        </div>
                      </div>

                      {/* Stacked comparison bar */}
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-slate-300 rounded-l-full"
                          style={{ width: `${(ind.score / 5) * 100}%` }}
                        />
                        <div
                          className="h-full bg-[#D4A24E]/40"
                          style={{ width: `${((ind.leaderScore - ind.score) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-slate-300 rounded-sm" />
                    <span>Current Industry Score</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#D4A24E]/40 rounded-sm" />
                    <span>Leader Delta</span>
                  </div>
                </div>
                <span>Audited Cohorts</span>
              </div>
            </div>

            {/* Right Column: Selected Sector Deep Dive */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#0C1731] p-8 rounded-2xl border border-white/10">
                <div className="font-mono text-xs uppercase tracking-widest text-[#D4A24E] font-semibold">
                  Sector Focus: {selectedIndustry.name}
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-[#FBF8F3]">{selectedIndustry.score}</span>
                  <span className="text-sm font-mono text-slate-400">/ 5.0 Avg</span>
                  <span className="ml-auto font-mono text-xs px-2.5 py-1 rounded bg-[#D4A24E]/10 text-[#D4A24E] border border-[#D4A24E]/20">
                    Leader: {selectedIndustry.leaderScore}
                  </span>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                  <div>
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Top Vulnerability Factor</div>
                    <div className="mt-1 text-sm text-rose-300 font-medium">{selectedIndustry.topRisk}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Audit Insight</div>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      Enterprises in {selectedIndustry.name} frequently invest in downstream copilot licenses before hardening basic data contracts. This creates an unbudgeted 3.8x token expansion.
                    </p>
                  </div>
                </div>
              </div>

              {/* The 2.5 Cliff Insight */}
              <div className="bg-gradient-to-br from-[#1B2D5B] to-[#0C1731] p-8 rounded-2xl border border-[#D4A24E]/30 relative overflow-hidden">
                <div className="font-mono text-xs uppercase tracking-widest text-[#D4A24E] font-bold">
                  Critical Architecture Rule
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#FBF8F3]">
                  The 2.5 Failure Cliff
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Organizations scoring below 2.5 lack continuous evals and PII masking contracts. Moving from PoC to enterprise scale causes runaway token charges and governance rejection.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-slate-200">Data Hygiene • 1.9</span>
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-slate-200">MLOps CI/CD • 1.7</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION: INSIDE THE GLOBAL ENTERPRISE AI REPORT 2026 */}
      <section className="py-20 lg:py-28 bg-[#0A1329] border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4A24E_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101D3D] text-[#D4A24E] border border-[#D4A24E]/40 text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              Official Benchmark Publication
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBF8F3]">
              Inside the Global Enterprise AI Report 2026
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Derived from 250+ enterprise architecture audits across North America, EMEA, GCC/Dubai, and APAC. An empirical look at why 73% of enterprise AI pilots fail and how top-quartile leaders operate at a 4.4 maturity index.
            </p>
          </div>

          {/* 6 Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REPORT_CHAPTERS.map((ch) => (
              <div
                key={ch.chapter}
                className="bg-[#101D3D] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#D4A24E]/40 transition-all group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#0C1731] border border-white/10 text-[#D4A24E]">
                      CHAPTER {ch.chapter}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{ch.sectionTag}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#FBF8F3] group-hover:text-[#D4A24E] transition-colors leading-snug">
                    {ch.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ch.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-1.5">
                  {ch.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Download Strip Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#101D3D] via-[#1B2D5B] to-[#101D3D] border border-[#D4A24E]/30 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center lg:text-left">
              <div className="text-xs font-mono text-[#D4A24E] font-bold uppercase tracking-wider">
                COMPLIMENTARY EXECUTIVE ACCESS • PDF FORMAT
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Download the Complete 2026 Global Benchmark
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Includes full 15-capability heatmaps, 8 industry cohort benchmarks, and the Minto Pyramid Board Brief template.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={REPORT_PDF_URL}
                download={REPORT_FILE_NAME}
                onClick={() => showToast("Downloading Global Enterprise AI Maturity Report 2026 (PDF)...")}
                className="px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B86A] text-[#0C1731] font-extrabold text-sm tracking-wide transition-all shadow-xl hover:shadow-[#D4A24E]/20 flex items-center justify-center gap-2.5 cursor-pointer text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive Report (PDF)</span>
              </a>
              <button
                onClick={() => setReportModalOpen(true)}
                className="px-5 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D4A24E]" />
                <span>Preview Chapters</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: HOW WE SCORE WITHOUT GIVING AWAY IP */}
      <section id="method" className="py-20 lg:py-28 bg-[#0C1731] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#D4A24E] uppercase">
              DELIVERY PROCESS
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBF8F3]">
              How We Score. Without Giving Away IP.
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              No self-serve survey questionnaires. Every NISOL SCORE™ is conducted by master enterprise architects reviewing real artifacts.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#101D3D] p-8 rounded-2xl border border-white/10 relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-extrabold text-[#D4A24E]">01 /</span>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">2 Days</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#FBF8F3]">Data Room &amp; Workshops</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                We inspect architecture topologies, VPC boundaries, vector indexing configurations, and security audit logs. Zero guesswork.
              </p>
            </div>

            <div className="bg-[#101D3D] p-8 rounded-2xl border border-white/10 relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-extrabold text-[#D4A24E]">02 /</span>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Proprietary</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#FBF8F3]">62-Dimension Audit</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Evaluated against the 15 enterprise capabilities with mathematical weights tested across 200+ enterprise environments.
              </p>
            </div>

            <div className="bg-[#101D3D] p-8 rounded-2xl border border-white/10 relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-extrabold text-[#D4A24E]">03 /</span>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Peer Comp</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#FBF8F3]">Industry Benchmark</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Your score mapped against the median and the top quartile leader in your exact sector. Financial exposure quantified.
              </p>
            </div>

            <div className="bg-[#101D3D] p-8 rounded-2xl border border-white/10 relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-extrabold text-[#D4A24E]">04 /</span>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Actionable</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#FBF8F3]">Nisol 360™</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Score is the diagnosis. The 7-day Nisol 360™ is the treatment plan. Complete architecture spec ready for any builder.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#101D3D] border border-white/10 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#D4A24E]" />
              <span>Conducted under mutual non-disclosure. Assessment artifacts remain isolated in client infrastructure.</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: WHAT YOU GET — INTERACTIVE RADAR & CASE STUDY */}
      <section className="py-20 lg:py-28 bg-[#101D3D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#D4A24E] uppercase">
              BOARD-READY DELIVERABLE
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBF8F3]">
              What You Get: Your NISOL SCORE™ Radar
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              15 capabilities plotted. 5 maturity rings. Current baseline vs 180-day target. Board-ready in a single decisive slide.
            </p>
          </div>

          <div className="mt-16 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: SVG Radar */}
            <div className="lg:col-span-7 bg-[#0C1731] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#D4A24E] uppercase tracking-wider">
                  Diagnostic Topology
                </span>
                <span className="font-mono text-xs text-slate-400">
                  15 Capability Dimensions
                </span>
              </div>

              <ScoreRadarSvg activeCapability={activeCapability} />

              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D4A24E]/30 border border-[#D4A24E]" />
                  <span className="text-[#FBF8F3]">Baseline: 2.1 Reactive</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-dashed border-slate-400" />
                  <span className="text-slate-400">Target: 3.8 Managed (Post-Blueprint)</span>
                </div>
              </div>
            </div>

            {/* Right: Redacted Case Study */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#0C1731] p-8 rounded-3xl border border-white/10">
                <div className="font-mono text-xs uppercase tracking-widest text-[#D4A24E] font-semibold">
                  Audited Case Study (Redacted)
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#FBF8F3]">
                  ₹2,400 Cr Industrial Equipment Group
                </h3>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-rose-400">2.1</span>
                  <span className="text-lg font-light text-slate-400">→</span>
                  <span className="text-4xl font-extrabold text-emerald-400">3.8</span>
                  <span className="ml-auto font-mono text-xs px-2.5 py-1 rounded bg-white/5 text-slate-300">
                    180 Days
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-mono text-slate-400 uppercase text-[10px]">Before Nisol 360™</div>
                    <div className="mt-1 font-semibold text-rose-300">
                      ₹1.4 Cr spent on 7 fragmented PoCs with zero production SLAs.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-mono text-[#D4A24E] uppercase text-[10px]">After Nisol 360™</div>
                    <div className="mt-1 font-semibold text-emerald-300">
                      Unified RAG topology, 63% token cost drop, 11 production cases.
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-xs text-slate-400 leading-relaxed">
                  &ldquo;The NISOL SCORE™ was the first time our audit committee saw a clear diagnostic between our AI experiments and true production readiness. It ended six months of vendor confusion in 48 hours.&rdquo;
                </p>
                <div className="mt-3 font-mono text-[11px] text-slate-500">
                  — Group Chief Technology Officer
                </div>
              </div>

              {/* Sample Report Trigger */}
              <div className="p-6 rounded-2xl bg-[#0C1731] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#FBF8F3]">Redacted Board Deck Sample</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">12 slides • Executive Summary &amp; Topology</div>
                </div>
                <button
                  onClick={() => showToast("Sample Board Deck dispatched via email.")}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  View Sample
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: APPLICATION / CONVERSION SECTION */}
      <section id="apply" className="py-20 lg:py-28 bg-[#0C1731] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D4A24E]/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4A24E] font-semibold">
              ARCHITECT-VALIDATED • INCLUDED IN NISOL 360™ • MUTUAL NDA
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBF8F3]">
            Request Nisol Score™
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Request Nisol Score™ — Architect-validated baseline included in Nisol 360™. Conducted by senior enterprise AI architects under mutual NDA.
          </p>

          <div className="mt-12 bg-[#101D3D] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl text-left max-w-2xl mx-auto">
            
            {formSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#D4A24E] mx-auto" />
                <h3 className="text-2xl font-bold text-[#FBF8F3]">Application Received</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Our principal enterprise architect will review <span className="text-[#D4A24E] font-semibold">{formData.company}</span> within 48 hours and dispatch our mutual NDA.
                </p>
                <div className="pt-4">
                  <Link
                    href="/blueprint"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#D4A24E] hover:underline"
                  >
                    <span>Read Nisol 360™: The 30-360 Architecture in the meantime</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Industrial Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#0C1731] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A24E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider mb-2">
                    Corporate Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. cto@acme.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0C1731] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A24E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider mb-2">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CIO, CTO, VP Engineering, CDO"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#0C1731] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A24E] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#D4A24E] text-[#0C1731] font-extrabold text-sm hover:bg-[#E5B86A] transition-all shadow-xl hover:shadow-[#D4A24E]/20"
                  >
                    Request Nisol Score™ — Included in Nisol 360™
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2">
                  <span>Reviewed within 48 hours</span>
                  <span>Strict enterprise confidentiality</span>
                </div>
              </form>
            )}

          </div>

          {/* Blueprint Crosslink */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <Link
              href="/blueprint"
              className="hover:text-[#D4A24E] transition-colors flex items-center gap-1.5 text-slate-200"
            >
              <span>See what is inside Nisol 360™</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4A24E]" />
            </Link>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>Conducted by Master Enterprise Architects • Zero survey fatigue</span>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* INTERACTIVE REPORT DOWNLOAD MODAL (GLOBAL REPORT)            */}
      {/* ============================================================ */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0C1731] border border-[#D4A24E]/40 rounded-3xl p-6 sm:p-10 shadow-2xl my-8 text-left overflow-hidden">
            
            {/* Architectural Grid Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#D4A24E_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            
            {/* Close Button */}
            <button
              onClick={() => { setReportModalOpen(false); setReportDownloaded(false); }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Report Information & Chapters */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101D3D] text-[#D4A24E] border border-[#D4A24E]/40 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5" />
                  Global Research Publication • Executive Dossier
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    The Global Enterprise AI Maturity Report 2026
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Empirical benchmarks across 8 sectors, 15 capabilities, and 250+ enterprise architectures worldwide ($50M to $5B+ revenue).
                  </p>
                </div>

                {/* Chapter Previews Accordion/Selector */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Table of Contents (6 Executive Chapters):
                  </div>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {REPORT_CHAPTERS.map((ch, idx) => (
                      <div
                        key={ch.chapter}
                        onClick={() => setActiveChapterIndex(idx)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          activeChapterIndex === idx
                            ? "bg-[#101D3D] border-[#D4A24E]/60 text-white"
                            : "bg-[#0C1731] border-white/10 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono font-bold text-[11px]">
                          <span className={activeChapterIndex === idx ? "text-[#D4A24E]" : "text-slate-400"}>
                            Ch {ch.chapter}: {ch.title}
                          </span>
                          <span className="text-[10px] text-slate-500">{ch.sectionTag}</span>
                        </div>
                        {activeChapterIndex === idx && (
                          <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed font-normal">
                            {ch.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4A24E]" />
                    NDA Protected Data
                  </span>
                  <span>•</span>
                  <span>North America • EMEA • GCC • APAC</span>
                </div>
              </div>

              {/* Right Column: Gated Access Form or Download State */}
              <div className="lg:col-span-5 bg-[#101D3D] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl">
                {reportDownloaded ? (
                  <div className="space-y-5 text-center py-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <FileCheck2 className="w-7 h-7" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-mono font-bold text-[#D4A24E] uppercase tracking-wider">
                        ACCESS GRANTED • SERIAL: NISOL-GL-2026
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        Your Global Report is Ready
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        A confirmation copy and executive board brief has been sent to <span className="text-[#D4A24E] font-mono font-semibold">{reportForm.email}</span>.
                      </p>
                    </div>

                    <a
                      href={REPORT_PDF_URL}
                      download={REPORT_FILE_NAME}
                      onClick={() => showToast("Downloading executive report dossier...")}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#D4A24E] hover:bg-[#E5B86A] text-[#0C1731] font-black text-xs tracking-wide transition-all shadow-lg cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Executive PDF</span>
                    </a>

                    <div className="pt-2 flex flex-col items-center gap-2">
                      <a
                        href={REPORT_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-slate-300 hover:text-[#D4A24E] underline cursor-pointer"
                      >
                        Open PDF in browser tab ↗
                      </a>
                      <button
                        onClick={() => setReportDownloaded(false)}
                        className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* 1-Click Direct Download Box */}
                    <div className="bg-[#0C1731] border border-[#D4A24E]/40 rounded-2xl p-5 text-center space-y-3.5 shadow-xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A24E]/10 text-[#D4A24E] border border-[#D4A24E]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        Executive Direct Download
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white">
                          Global Enterprise AI Report 2026
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Complete Benchmark • 15-Capability Heatmaps • 8-Industry Cohorts
                        </p>
                      </div>

                      <a
                        href={REPORT_PDF_URL}
                        download={REPORT_FILE_NAME}
                        onClick={() => showToast("Downloading Global Enterprise AI Maturity Report 2026 (PDF)...")}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#D4A24E] hover:bg-[#E5B86A] text-[#0C1731] font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-[#D4A24E]/20 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Executive PDF</span>
                      </a>

                      <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-400">
                        <a
                          href={REPORT_PDF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#D4A24E] underline flex items-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open in Browser Tab</span>
                        </a>
                        <span>•</span>
                        <span>Instant 1-Click Access</span>
                      </div>
                    </div>

                    {/* Email Briefing Form (Optional) */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="mb-3">
                        <h5 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                          Receive Email Copy &amp; CFO Board Memo
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Optional: Send an executive PDF copy and board brief to your corporate inbox.
                        </p>
                      </div>

                      <form onSubmit={handleReportSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                            Corporate Work Email
                          </label>
                          <input
                            type="email"
                            value={reportForm.email}
                            onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                            placeholder="e.g. v.sharma@enterprise.com"
                            className="w-full bg-[#0C1731] text-xs text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#D4A24E] outline-none transition-all placeholder:text-slate-600"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={reportForm.name}
                              onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                              placeholder="e.g. Vikram Sharma"
                              className="w-full bg-[#0C1731] text-xs text-white rounded-xl px-3 py-2 border border-white/15 focus:border-[#D4A24E] outline-none transition-all placeholder:text-slate-600"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                              Organization
                            </label>
                            <input
                              type="text"
                              value={reportForm.company}
                              onChange={(e) => setReportForm({ ...reportForm, company: e.target.value })}
                              placeholder="e.g. Global Corp"
                              className="w-full bg-[#0C1731] text-xs text-white rounded-xl px-3 py-2 border border-white/15 focus:border-[#D4A24E] outline-none transition-all placeholder:text-slate-600"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/15 mt-1 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <FileCheck2 className="w-3.5 h-3.5 text-[#D4A24E]" />
                          <span>Email Copy + Download PDF</span>
                        </button>

                        <p className="text-[10px] text-slate-400 text-center font-mono">
                          Strict confidentiality • Mutual NDA lineage • Zero spam
                        </p>
                      </form>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
