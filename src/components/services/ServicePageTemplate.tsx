"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Bot, 
  Layers, 
  Cpu, 
  HelpCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Calculator,
  Code2,
  ListTodo,
  Workflow,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface UseCase {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePageProps {
  slug: string;
  badgeText: string;
  heroTitle: string;
  heroSubheading: string;
  challenges: string[];
  imagineInstead: string[];
  whatIsTitle: string;
  whatIsDescription: string;
  applications: { department: string; useCase: string }[];
  outcomes: { title: string; desc: string }[];
  techStack: string[];
  techComponents: { label: string; desc: string }[];
  deliverables: string[];
  useCases: UseCase[];
  roiPreview: { hoursSaved: string; costRed: string; payback: string; savings: string };
  faqs: FAQItem[];
}

export function ServicePageTemplate({
  slug,
  badgeText,
  heroTitle,
  heroSubheading,
  challenges,
  imagineInstead,
  whatIsTitle,
  whatIsDescription,
  applications,
  outcomes,
  techStack,
  techComponents,
  deliverables,
  useCases,
  roiPreview,
  faqs
}: ServicePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const deliveryPhases = [
    { phase: "Phase 1", title: "AI Opportunity Discovery", desc: "We map operational bottlenecks and audit data pipelines." },
    { phase: "Phase 2", title: "Workflow Assessment", desc: "Detailed feasibility modeling and ROI projections." },
    { phase: "Phase 3", title: "Architecture Design", desc: "Define multi-agent state graphs, APIs, and guardrails." },
    { phase: "Phase 4", title: "AI Development", desc: "Model fine-tuning, RAG semantic indexing, and integration." },
    { phase: "Phase 5", title: "Pilot Deployment", desc: "Deploy in sandboxed environments with human validation." },
    { phase: "Phase 6", title: "Scale Across Organization", desc: "Automate rollouts across target departments." }
  ];

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back to main services link */}
      <div>
        <Link href="/services" className="inline-flex items-center gap-2 text-xs font-bold text-navy-700 hover:text-navy-950 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Core Pillars
        </Link>
      </div>

      {/* SECTION 1: HERO */}
      <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="golden">{badgeText}</Badge>
            <span className="text-xs text-navy-200 font-mono hidden sm:inline">Nisol Labs Enterprise AI Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-navy-100/90 leading-relaxed max-w-3xl">
            {heroSubheading}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Book AI Discovery Session
            </Button>
            <Button href="/resources/roi-calculator" variant="navy" size="lg" icon={<Calculator className="w-4 h-4" />}>
              Estimate Your ROI
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: IS THIS CHALLENGE FAMILIAR? */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <Badge variant="navy">Operational Friction</Badge>
          <h2 className="text-3xl font-black text-navy-950 leading-tight">
            Is This Challenge <br className="hidden lg:block" />
            <span className="golden-gradient-text">Familiar?</span>
          </h2>
          <p className="text-sm text-navy-700">
            Most organizations hit scalability ceilings because high-value employees are bogged down by repetitive manual processes.
          </p>
        </div>

        <div className="lg:col-span-7 bg-red-50/50 rounded-2xl p-8 border border-red-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-red-700 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Common Bottlenecks We Audit & Eliminate:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-800 font-medium">
            {challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200/80">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-[10px] font-extrabold">✕</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 3: IMAGINE INSTEAD... */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-slate-200 pt-16">
        <div className="lg:col-span-5 space-y-4 lg:order-last">
          <Badge variant="golden">Future Vision</Badge>
          <h2 className="text-3xl font-black text-navy-950 leading-tight">
            Imagine <br className="hidden lg:block" />
            <span className="golden-gradient-text">Instead...</span>
          </h2>
          <p className="text-sm text-navy-700">
            A secure, automated environment where intelligence is decentralized and workflows execute in seconds rather than days.
          </p>
        </div>

        <div className="lg:col-span-7 bg-navy-950 text-white rounded-2xl p-8 border border-golden-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 text-golden-400 font-bold text-sm">
            <Sparkles className="w-5 h-5 shrink-0" />
            <span>Your Operations, Re-imagined with AI:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-navy-100 font-semibold">
            {imagineInstead.map((vision, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-navy-900/90 p-3 rounded-lg border border-navy-800">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span>{vision}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 4: WHAT IS THIS SERVICE? */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-golden-600">Overview</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-950">{whatIsTitle}</h2>
        <p className="text-sm sm:text-base text-navy-700 leading-relaxed max-w-4xl">
          {whatIsDescription}
        </p>
      </section>

      {/* SECTION 5: WHERE CAN IT HELP? */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="navy">Business Applications</Badge>
          <h2 className="text-3xl font-black text-navy-950">Where Can This Help?</h2>
          <p className="text-sm text-navy-700">Explore specific business departments and functional use cases.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-golden-600 bg-golden-50 px-2 py-0.5 rounded">
                {app.department}
              </span>
              <h4 className="text-sm font-bold text-navy-950">{app.useCase}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: BUSINESS OUTCOMES */}
      <section className="bg-navy-950 text-white py-16 rounded-3xl border border-navy-800 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 space-y-12 relative z-10">
          <div className="text-center space-y-2">
            <Badge variant="golden">Performance Benchmarks</Badge>
            <h2 className="text-3xl font-black text-white">Business Outcomes & Value</h2>
            <p className="text-sm text-navy-200">We anchor every project to clear, auditable business metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="glass-panel-dark rounded-xl p-5 border border-navy-800 space-y-2 text-center">
                <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mx-auto text-sm font-extrabold">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-white">{outcome.title}</h4>
                <p className="text-xs text-navy-200 leading-relaxed">{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: DELIVERY METHODOLOGY */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="navy">Execution Blueprint</Badge>
          <h2 className="text-3xl font-black text-navy-950">How We Deliver AI Results</h2>
          <p className="text-sm text-navy-700">A rigorous, milestone-driven framework to go from strategy to production in weeks.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryPhases.map((phase, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-golden-600 bg-golden-50 px-2 py-0.5 rounded">
                {phase.phase}
              </span>
              <h4 className="text-sm font-bold text-navy-950">{phase.title}</h4>
              <p className="text-xs text-navy-700 leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: TECHNICAL ARCHITECTURE (for tech buyers) */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
        <div className="max-w-2xl space-y-3">
          <Badge variant="golden">TECHNICAL SPECIFICATIONS</Badge>
          <h2 className="text-2xl sm:text-3xl font-black">Underlying AI System Architecture</h2>
          <p className="text-xs text-slate-300">
            For CIOs, CTOs, and Security Architects. We deploy enterprise-ready AI technologies with zero vendor lock-in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {techComponents.map((comp, idx) => (
            <div key={idx} className="bg-navy-950 p-5 rounded-xl border border-navy-800 space-y-2">
              <span className="text-golden-400 font-bold block">[{comp.label}]</span>
              <p className="text-slate-300 text-[11px]">{comp.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {techStack.map((tech, idx) => (
            <span key={idx} className="text-[10px] font-mono bg-navy-900 text-golden-400 px-3 py-1 rounded-full border border-navy-800">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 9: WHAT WE DELIVER */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="navy">Project Deliverables</Badge>
          <h2 className="text-3xl font-black text-navy-950">Enterprise Deliverables</h2>
          <p className="text-sm text-navy-700">What you receive upon completion of the engagement.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((del, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-navy-950">{del}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: EXAMPLE USE CASES */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="golden">Scenario Breakdowns</Badge>
          <h2 className="text-3xl font-black text-navy-950">Illustrative Use Cases</h2>
          <p className="text-sm text-navy-700">Real-world operational problems solved with this architecture.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {useCases.map((uc, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-950 border-b border-slate-200 pb-2 mb-2">{uc.title}</h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-red-700 block">Problem:</strong>
                    <span className="text-navy-800">{uc.problem}</span>
                  </div>
                  <div>
                    <strong className="text-golden-700 block">AI Solution:</strong>
                    <span className="text-navy-800">{uc.solution}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded">
                <strong>Outcome:</strong> {uc.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: ROI CALCULATOR PREVIEW */}
      <section className="max-w-4xl mx-auto bg-gradient-to-br from-white via-slate-50 to-golden-50/20 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="golden">ROI Analysis</Badge>
          <h3 className="text-2xl font-black text-navy-950">Operational Impact Forecast</h3>
          <p className="text-xs text-navy-700">Target metrics achieved by enterprise clients deploying this capability.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="pt-2 md:pt-0">
            <div className="text-2xl font-black text-navy-950">{roiPreview.hoursSaved}</div>
            <span className="text-[10px] text-navy-600 font-semibold block mt-1">Manual Hours Saved</span>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="text-2xl font-black text-navy-950">{roiPreview.costRed}</div>
            <span className="text-[10px] text-navy-600 font-semibold block mt-1">Cost Reduction</span>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="text-2xl font-black text-navy-950">{roiPreview.payback}</div>
            <span className="text-[10px] text-navy-600 font-semibold block mt-1">Payback Period</span>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="text-2xl font-black text-emerald-700">{roiPreview.savings}</div>
            <span className="text-[10px] text-navy-600 font-semibold block mt-1">Projected Savings</span>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Button href="/resources/roi-calculator" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Run Detailed ROI Calculator
          </Button>
        </div>
      </section>

      {/* SECTION 12: WHY NISOL LABS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="navy">Why Partner with Us?</Badge>
          <h2 className="text-3xl font-black text-navy-950">Why Nisol Labs</h2>
          <p className="text-sm text-navy-700">How we engineer value and security beyond standard wrappers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-navy-900">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <strong className="text-golden-700 font-bold block">Enterprise-First Design</strong>
            <p className="text-navy-700">Role-based access control, SOC-2 readiness, and PII masking built-in.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <strong className="text-golden-700 font-bold block">Outcome-Driven Auditing</strong>
            <p className="text-navy-700">Every engagement is tied to concrete productivity and cost KPIs.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <strong className="text-golden-700 font-bold block">Zero Vendor Lock-In</strong>
            <p className="text-navy-700">Modular open architectures utilizing LangGraph and local vLLM instances.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <strong className="text-golden-700 font-bold block">Human-in-the-Loop Controls</strong>
            <p className="text-navy-700">Custom validation screens so humans retain approval over critical AI actions.</p>
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="navy">FAQ</Badge>
          <h2 className="text-2xl font-black text-navy-950">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-2xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs text-navy-950 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-golden-600" /> : <ChevronDown className="w-4 h-4 text-golden-600" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-navy-700 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 14: FINAL CTA */}
      <section className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 border border-golden-500/30 text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <Badge variant="golden">Ready to Transition to AI-First?</Badge>
          <h3 className="text-3xl font-black">Deploy Your First AI Solution</h3>
          <p className="text-xs text-navy-200">
            Book a confidential 30-minute AI Discovery & Audit session. Our principal engineers will outline your implementation blueprint.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Discovery Call
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
