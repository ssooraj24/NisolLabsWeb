import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileCheck,
  TrendingUp,
  Download,
  AlertTriangle,
  HelpCircle,
  FileText,
  Calendar,
  BookOpen,
  Calculator,
  LayoutGrid
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ReadinessAssessment } from "@/components/discovery/ReadinessAssessment";

export const metadata: Metadata = {
  title: "AI Readiness Assessment — Nisol AI",
  description: "Get a comprehensive AI Readiness Assessment powered by Nisol Intelligence™. Evaluate 15 capabilities and get actionable insights in weeks.",
};

const KEY_POINTS = [
  {
    title: "Comprehensive",
    desc: "Covers 15 capabilities across leadership, technology, operations, and culture"
  },
  {
    title: "Data-Driven",
    desc: "62 structured questions with a 1-5 scoring framework"
  },
  {
    title: "AI-Powered",
    desc: "Nisol Intelligence™ analyzes responses and generates insights"
  },
  {
    title: "Executive-Ready",
    desc: "Delivered as a professional report with radar charts and action plans"
  }
];

const DELIVERABLES = [
  { name: "AI Readiness Score", desc: "Your overall maturity score (0-100)" },
  { name: "15 Capability Scores", desc: "Detailed scores across all capabilities" },
  { name: "Radar Chart", desc: "Visual comparison of your scores" },
  { name: "Gap Analysis", desc: "Strengths, weaknesses, and opportunities" },
  { name: "Benchmarking", desc: "Comparison to industry averages" },
  { name: "Actionable Recommendations", desc: "Prioritized next steps" }
];

const REPORT_PAGES = [
  { page: "Page 1", content: "Executive Summary" },
  { page: "Page 2", content: "AI Readiness Score & Radar Chart" },
  { page: "Pages 3–4", content: "Capability-wise Breakdown (15 scores)" },
  { page: "Pages 5–6", content: "Gap Analysis & Key Findings" },
  { page: "Page 7", content: "Benchmarking Data" },
  { page: "Pages 8–10", content: "Actionable Recommendations" },
  { page: "Pages 11–15", content: "Appendix — Detailed Question Responses" }
];

const RISKS = [
  { risk: "Wrong AI investments", impact: "Wasted budget (₹1-5 Cr+)" },
  { risk: "Failed implementations", impact: "Delayed transformation (12-24 months)" },
  { risk: "Competitive disadvantage", impact: "Lost market share" },
  { risk: "Governance gaps", impact: "Regulatory fines and reputational damage" }
];

export default function DiscoveryReadinessPage() {
  return (
    <div className="space-y-24 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section 1: Hero Header */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-8 pb-4">
        <Badge variant="golden">AI Readiness Assessment</Badge>
        <h1 id="page-title" className="text-4xl sm:text-6xl font-black text-navy-950 tracking-tight leading-none">
          Understand Your AI Maturity in <span className="golden-gradient-text">Weeks, Not Months</span>
        </h1>
        <p className="text-lg sm:text-xl text-navy-800 font-semibold max-w-3xl mx-auto leading-relaxed">
          Our proprietary AI Readiness Assessment evaluates your organization across 15 capabilities and 62 metrics to deliver a clear, actionable picture of your AI maturity.
        </p>
        
        {/* Radar Chart Visual Element Mock */}
        <div className="relative w-full max-w-lg mx-auto py-8 bg-slate-50 border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-radial-gradient-golden opacity-5" />
          <svg className="w-48 h-48 text-navy-900 stroke-current opacity-20" viewBox="0 0 100 100">
            <polygon points="50,10 90,35 90,75 50,95 10,75 10,35" fill="none" strokeWidth="0.5" />
            <polygon points="50,25 80,42 80,70 50,83 20,70 20,42" fill="none" strokeWidth="0.5" />
            <polygon points="50,40 70,50 70,65 50,72 30,65 30,50" fill="none" strokeWidth="0.5" />
            <line x1="50" y1="10" x2="50" y2="95" strokeWidth="0.5" />
            <line x1="10" y1="35" x2="90" y2="75" strokeWidth="0.5" />
            <line x1="10" y1="75" x2="90" y2="35" strokeWidth="0.5" />
            {/* Filled Assessment polygon */}
            <polygon points="50,18 84,40 76,68 50,78 24,62 38,45" fill="rgba(212, 163, 89, 0.25)" stroke="rgb(212, 163, 89)" strokeWidth="1.5" />
          </svg>
          <span className="mt-4 text-xs font-mono font-bold text-navy-950 uppercase tracking-widest bg-golden-100 text-golden-800 py-1 px-3 rounded-full border border-golden-300">
            Discover Your AI Maturity Score
          </span>
        </div>

        <div className="flex justify-center pt-4">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book Discovery Call
          </Button>
        </div>
      </div>

      {/* Section 2: What Is the AI Readiness Assessment? */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <Badge variant="navy">Framework Overview</Badge>
          <h2 className="text-3xl font-extrabold text-navy-950">What is the AI Readiness Assessment?</h2>
          <p className="text-base text-navy-700 leading-relaxed">
            The <strong>Nisol AI Readiness Assessment</strong> is a structured, data-driven evaluation of your organization&apos;s AI maturity. It combines a 62-question diagnostic workshop with AI-powered analysis to deliver a comprehensive view of your AI capabilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEY_POINTS.map((pt, idx) => (
              <div key={idx} className="flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-golden-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-950">{pt.title}</h4>
                  <p className="text-xs text-navy-600 leading-snug">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 bg-navy-950 text-white rounded-2xl p-6 border border-golden-500/20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-golden-500/10 border border-golden-500/30 flex items-center justify-center mx-auto text-golden-400">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-golden-400 block">System Diagnostic</span>
          <h3 className="text-lg font-bold text-white">AI-Powered Assessment</h3>
          <p className="text-xs text-navy-200 leading-relaxed">
            Calculated across leadership alignment, technical infrastructure readiness, functional operations matrices, and cultural change tolerance.
          </p>
        </div>
      </div>

      {/* Section 3: The 15 Capabilities We Assess */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
            We Assess 15 Critical Capabilities That Drive AI Success
          </h2>
          <p className="text-sm sm:text-base text-navy-700">
            Click on any capability below to view assessment parameters, example questions, and strategic outcomes.
          </p>
        </div>

        <ReadinessAssessment />
      </div>

      {/* Section 4: What You Will Receive */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="golden">Key Deliverables</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
            Your AI Readiness Assessment Deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 bg-navy-950 text-white p-4 font-bold text-sm sm:text-base">
              <div>Deliverable</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-slate-100">
              {DELIVERABLES.map((del, idx) => (
                <div key={idx} className="grid grid-cols-2 p-4 text-xs sm:text-sm text-navy-800 gap-4">
                  <div className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-golden-600 shrink-0" />
                    <span>{del.name}</span>
                  </div>
                  <div>{del.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 text-center space-y-4 flex flex-col justify-center items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-navy-400">Visualization Sample</span>
            <div className="w-full aspect-square max-w-[280px] bg-white rounded-2xl border border-slate-200 flex items-center justify-center p-4">
              <svg className="w-full h-full text-golden-500 fill-golden-500/10 stroke-current" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                
                {/* Simulated Radar Shape */}
                <polygon points="50,18 78,35 85,55 50,80 15,62 25,38" strokeWidth="1.5" />
                
                {/* Dots */}
                <circle cx="50" cy="18" r="2" fill="#d4a359" />
                <circle cx="78" cy="35" r="2" fill="#d4a359" />
                <circle cx="85" cy="55" r="2" fill="#d4a359" />
                <circle cx="50" cy="80" r="2" fill="#d4a359" />
                <circle cx="15" cy="62" r="2" fill="#d4a359" />
                <circle cx="25" cy="38" r="2" fill="#d4a359" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-navy-950">Maturity Radar Chart</h4>
            <p className="text-xs text-navy-600">Visual mapping of overall strengths and weaknesses against vertical industry benchmarks.</p>
          </div>
        </div>
      </div>

      {/* Section 5: Sample Assessment Report */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="navy">Deliverables Preview</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">See What a Nisol AI Readiness Assessment Looks Like</h2>
          <p className="text-xs sm:text-sm text-navy-700">
            Download a sample AI Readiness Assessment report to understand the depth and quality of our deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-navy-950 text-white p-3 font-bold text-xs uppercase tracking-wider text-center">
              Sample Report Content Blueprint
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {REPORT_PAGES.map((pg, idx) => (
                <div key={idx} className="flex justify-between p-3">
                  <span className="font-mono text-golden-600 font-bold">{pg.page}</span>
                  <span className="text-navy-950 font-medium">{pg.content}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-6 flex flex-col justify-center items-center shadow-xs self-stretch">
            <div className="p-4 bg-navy-50 rounded-full text-navy-950">
              <Download className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-navy-950">Sample Report PDF</h4>
              <p className="text-[11px] text-navy-500">[No email required] • Format: PDF • Pages: 15</p>
            </div>
            <Button href="/assets/documents/sample-readiness-report.pdf" variant="secondary" size="md" className="w-full">
              Download Sample Report
            </Button>
          </div>
        </div>
      </div>

      {/* Section 6: Why This Matters */}
      <div className="space-y-12 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">Why Understanding Your AI Readiness is Critical</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">The AI Imperative</h3>
            <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
              <strong>85% of AI transformations fail</strong> to deliver expected value. The primary reason? Organizations jump into technical integration and code builds without first understanding their underlying data capabilities and system constraints.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-golden-100 border border-golden-300 flex items-center justify-center text-golden-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">The Nisol AI Advantage</h3>
            <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
              Our structured assessment uncovers technical roadblocks early, audits regulatory data access compliance boundary issues, and models accurate token pricing estimates, laying a solid pathway for safe, accelerated enterprise AI adoption.
            </p>
          </div>
        </div>

        {/* Cost of Not Knowing Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-xs">
          <div className="bg-red-950 text-white p-4 font-bold text-sm sm:text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>The Cost of Not Knowing</span>
          </div>
          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {RISKS.map((r, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2 sm:gap-4">
                <div className="font-bold text-navy-950 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {r.risk}
                </div>
                <div className="text-navy-700 font-medium">{r.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 7: Success Stories */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <Badge variant="golden">Social Proof</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">How Our Readiness Assessment Has Helped Clients</h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-golden-600 uppercase tracking-widest">Case Study Snippet</span>
              <h3 className="text-xl font-bold text-navy-950">Acme Corp — Manufacturing Sector</h3>
            </div>
            <Badge variant="navy">Maturity Score: 78/100</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-navy-900">The Challenge:</h4>
              <blockquote className="italic border-l-2 border-slate-300 pl-3 text-navy-700">
                &ldquo;We knew we needed to leverage LLMs and semantic search for our standard operating procedures, but didn&apos;t know where to start or if our documents were clean enough.&rdquo;
              </blockquote>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-navy-900">Our Assessment:</h4>
              <p className="text-navy-700">
                Completed a thorough 62-question evaluation across 5 legacy department divisions, indexing knowledge structures, OCR compatibility, and security boundaries.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900">Quantified Strategic Outcomes:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="block text-lg font-black text-golden-600">3</span>
                <span className="text-[10px] text-navy-500 font-medium uppercase tracking-wider">AI Opportunities</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="block text-lg font-black text-golden-600">8</span>
                <span className="text-[10px] text-navy-500 font-medium uppercase tracking-wider">Use Cases Mapped</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="block text-lg font-black text-golden-600">₹2.4 Cr</span>
                <span className="text-[10px] text-navy-500 font-medium uppercase tracking-wider">Annual Savings</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="block text-lg font-black text-golden-600">2 Weeks</span>
                <span className="text-[10px] text-navy-500 font-medium uppercase tracking-wider">Roadmap Delivery</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Link href="/clients" className="text-xs font-bold text-golden-600 flex items-center gap-1 hover:text-golden-700 hover:underline">
              <span>Read Full Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Section 8: CTA — Get Your Assessment */}
      <div className="bg-navy-950 text-white rounded-3xl p-10 sm:p-12 text-center space-y-8 border border-golden-500/20 max-w-5xl mx-auto">
        <div className="space-y-3">
          <Badge variant="golden">Secure Clarity</Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-white">Ready to Assess Your AI Readiness?</h2>
          <p className="text-xs sm:text-sm text-navy-200 max-w-2xl mx-auto">
            Get a comprehensive AI Readiness Assessment for your organization. Our fixed-price engagement delivers executive clarity in weeks—not months.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
          <Button href="/contact?type=proposal" variant="secondary" size="lg">
            Request a Proposal
          </Button>
        </div>

        <div className="w-full h-px bg-slate-800" />

        <div className="space-y-3">
          <span className="text-xs text-navy-300 font-medium uppercase tracking-wider block">Or, start exploring:</span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs">
            <Link href="/discovery/methodology" className="text-golden-400 hover:text-golden-500 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn About Discovery Methodology</span>
            </Link>
            <Link href="/resources/roi-calculator" className="text-golden-400 hover:text-golden-500 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>Try the ROI Calculator</span>
            </Link>
            <Link href="/discovery/deliverables" className="text-golden-400 hover:text-golden-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>View Sample Deliverables</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
