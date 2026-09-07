"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Lock, 
  FileCheck, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Factory, 
  Activity, 
  Cpu,
  Layers,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PRODUCT_CARDS = [
  {
    id: "spark",
    name: "Nisol Spark",
    badge: "FIRST LOOK",
    price: "₹1,50,000",
    priceUSD: "$1,800",
    duration: "3 Business Days",
    tagline: "The First Look",
    description: "Rapid single-track focus sprint: AI Opportunity, Cost Audit, or Data Compliance check.",
    ctaText: "Explore Spark Sprint →",
    href: "/spark",
    popular: false,
  },
  {
    id: "one",
    name: "Nisol One",
    badge: "THE BEGINNING",
    price: "₹4,50,000",
    priceUSD: "$5,500",
    duration: "7–11 Business Days",
    tagline: "The Foundation",
    description: "Full 360° audit across 15 capabilities, 62 questions, and 8-industry benchmark.",
    ctaText: "Explore Nisol One →",
    href: "/pricing",
    popular: false,
  },
  {
    id: "pro",
    name: "Nisol Pro",
    badge: "MOST POPULAR",
    price: "₹8,50,000",
    priceUSD: "$10,500",
    duration: "10–15 Business Days",
    tagline: "The Transformation",
    description: "Full audit + financial modeling (NPV/IRR), data lakehouse blueprint, and staff upskilling.",
    ctaText: "Explore Nisol Pro →",
    href: "/pricing",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Nisol Enterprise",
    badge: "THE FULL VISION",
    price: "₹18,50,000+",
    priceUSD: "$22,500+",
    duration: "4–8 Weeks",
    tagline: "The Full Vision",
    description: "Multi-entity architecture, custom AI CoE charter, empirical PoC gates, and full rollout.",
    ctaText: "Explore Enterprise →",
    href: "/pricing",
    popular: false,
  },
];

const PROOF_VERTICALS = [
  { name: "BFSI & Fintech", domain: "Algorithmic Risk & KYC" },
  { name: "Industrial Manufacturing", domain: "Predictive Maintenance & Supply" },
  { name: "Healthcare & Diagnostics", domain: "Clinical Knowledge & Compliance" },
  { name: "Enterprise Cloud Platforms", domain: "High-Throughput Vector Retrieval" },
];

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ============================================================ */}
      {/* SECTION 1: THE EMOTIONAL HERO (Above the Fold)               */}
      {/* ============================================================ */}
      <section className="relative min-h-[85vh] bg-navy-950 text-white flex items-center pt-16 pb-20 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-[radial-gradient(#153C78_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-golden-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-golden-500/30 text-golden-300 text-xs font-semibold shadow-lg">
              <Sparkles className="w-4 h-4 text-golden-400" />
              <span>Nisol AI — Enterprise Intelligence System</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white">
              Intelligence. <br />
              <span className="bg-gradient-to-r from-golden-400 via-amber-300 to-golden-500 bg-clip-text text-transparent">
                Delivered.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Your enterprise has a thousand decisions. We make them intelligent — in 7 days.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Apply for Discovery →
              </Button>
              <Button href="/pricing" variant="navy" size="lg" icon={<Sparkles className="w-4 h-4 text-golden-400" />}>
                Explore Product Family
              </Button>
            </div>

            {/* Key Transformation Rhythm */}
            <div className="pt-10 border-t border-navy-800/80 max-w-2xl mx-auto grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-golden-400">7 Days</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Rapid Audit</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">62</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Capability Metrics</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">0% Lock-In</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">You Own Every Line</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: THE PROOF BAR (Subtle & High-Trust)              */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
            Trusted by enterprises ready to think faster
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-2">
            {PROOF_VERTICALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 text-center space-y-1 shadow-xs hover:border-golden-400/60 transition-colors"
              >
                <div className="font-bold text-navy-950 text-sm">{item.name}</div>
                <div className="text-[11px] text-slate-500 font-medium">{item.domain}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: THE PROBLEM STATEMENT (Emotional Tension)        */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-14 border border-navy-800 shadow-2xl relative overflow-hidden space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-golden-400 font-bold">The Industry Trap</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Why Most Enterprise AI Fails
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-navy-900/90 rounded-2xl p-6 border border-navy-800 space-y-2">
              <div className="text-3xl font-black text-rose-400">73%</div>
              <h3 className="font-bold text-white text-base">Projects Fail Before Production</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PoCs that perform in demos break under live data loads, unmonitored hallucinations, and edge cases.
              </p>
            </div>

            <div className="bg-navy-900/90 rounded-2xl p-6 border border-navy-800 space-y-2">
              <div className="text-3xl font-black text-amber-400">₹1.2 Cr</div>
              <h3 className="font-bold text-white text-base">Average Wasted Spend</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enterprises spend months paying massive consulting armies for generic slide decks that never ship to users.
              </p>
            </div>

            <div className="bg-navy-900/90 rounded-2xl p-6 border border-navy-800 space-y-2">
              <div className="text-3xl font-black text-golden-400">The Reason</div>
              <h3 className="font-bold text-white text-base">Lack of Architectural Rigor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Not because the models don't work. Because nobody audited data hygiene, security boundaries, and unit economics first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: THE ANSWER — 3 SENTENCES (Not a Feature Grid)    */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <Badge variant="golden" className="mx-auto">The Nisol Approach</Badge>
        
        <h2 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight leading-tight">
          Clarity in 7 Days. Code You Own Forever.
        </h2>

        <div className="space-y-6 text-lg sm:text-xl text-navy-800 leading-relaxed font-normal max-w-3xl mx-auto">
          <p>
            We send two senior AI architects into your organization. In 7 days, they diagnose every department, audit your data lakehouse readiness, map 62 capability dimensions, and deliver a board-ready strategy your CFO can present on Monday morning.
          </p>
          <p className="font-bold text-navy-950 text-xl sm:text-2xl">
            Then — if you're ready — we build it. And you own every line of code. Forever.
          </p>
        </div>

        <div className="pt-2">
          <Button href="/discovery" variant="navy" size="lg" icon={<ChevronRight className="w-4 h-4" />}>
            See How Discovery Works
          </Button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: THE 4 PRODUCTS (Clean, Hierarchical Cards)        */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Product Hierarchy</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Four Iconic Systems. Zero Ambiguity.
          </h2>
          <p className="text-base text-navy-700/80">
            Transparent, fixed-price engagements designed for every stage of your enterprise intelligence journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CARDS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? "bg-navy-950 text-white shadow-2xl ring-2 ring-golden-500 relative lg:-translate-y-2"
                  : "bg-white text-navy-950 border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      tier.popular
                        ? "bg-golden-500 text-navy-950"
                        : "bg-navy-100 text-navy-800"
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <span className={`text-xs font-medium ${tier.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {tier.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-1">{tier.name}</h3>
                <div className="text-xs font-bold text-golden-600 mb-4">{tier.tagline}</div>

                <div className="mb-4">
                  <div className="text-3xl font-black">{tier.price}</div>
                  <div className={`text-xs ${tier.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {tier.priceUSD} USD • Fixed-Price SOW
                  </div>
                </div>

                <p className={`text-xs leading-relaxed mb-6 ${tier.popular ? "text-slate-300" : "text-slate-600"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/20">
                <Link
                  href={tier.href}
                  className={`text-xs font-bold flex items-center justify-between group ${
                    tier.popular ? "text-golden-400 hover:text-golden-300" : "text-navy-950 hover:text-golden-600"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: THE DIFFERENTIATORS (3 Pillars — Visual)         */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Why Nisol AI</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Three Promises We Never Break
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-golden-600 flex items-center justify-center">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy-950">⚡ 7 Days</h3>
            <p className="text-sm text-navy-700/90 leading-relaxed">
              Not 6 months. We deliver a complete, board-ready intelligence roadmap in days, not quarters, eliminating costly consulting drag.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy-950">🔓 Zero Lock-In</h3>
            <p className="text-sm text-navy-700/90 leading-relaxed">
              Your code. Your data. Your model weights. We build inside your infrastructure so you retain 100% IP ownership forever.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center">
              <FileCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy-950">📊 Board-Ready</h3>
            <p className="text-sm text-navy-700/90 leading-relaxed">
              Not a vague slide deck. A museum-grade executive dossier featuring CFO financial models (NPV/IRR) and empirical PoC decision gates.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7: CLIENT STORY (One. Powerful. Full-Width.)         */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-14 text-center space-y-6">
          <div className="text-golden-500 flex justify-center gap-1">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="text-xl">★</span>
            ))}
          </div>

          <blockquote className="text-2xl sm:text-3xl font-extrabold text-navy-950 leading-snug max-w-3xl mx-auto">
            "We went from AI confusion to a clear 12-month roadmap with full board approval — in 11 days."
          </blockquote>

          <div className="space-y-1">
            <div className="font-bold text-navy-900 text-sm">Chief Technology Officer</div>
            <div className="text-xs text-slate-500">Enterprise Logistics & Supply Chain Client</div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: THE CLOSE (Controlled Scarcity + CTA)            */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Badge variant="golden" className="mx-auto">Controlled Scarcity</Badge>

        <h2 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
          We Partner With Only 5 New Enterprises Each Month.
        </h2>

        <p className="text-base sm:text-lg text-navy-700/85 max-w-2xl mx-auto leading-relaxed">
          Apply for a Discovery Session to see if we're the right fit for your organization. Applications are reviewed directly by our senior systems architects within 48 hours.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Discovery →
          </Button>
          <Button href="/assessment" variant="navy" size="lg">
            Take 2-Min Readiness Quiz
          </Button>
        </div>

        <p className="text-xs text-slate-400">
          Strict Non-Disclosure Guarantee • Mutual NDA provided prior to technical review
        </p>
      </section>
    </div>
  );
}