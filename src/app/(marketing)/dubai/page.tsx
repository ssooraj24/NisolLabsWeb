"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Clock, 
  Lock, 
  Award,
  Globe2,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const DUBAI_TIERS = [
  {
    name: "Spark Sprint",
    price: "AED 9,200",
    usdEquiv: "(~$2,500 USD)",
    duration: "3 Business Days",
    tagline: "The Gulf Executive First Look",
    description: "Laser-focused evaluation of your highest-value AI opportunity or cloud LLM spend audit.",
    href: "/contact?region=dubai&package=Spark",
    popular: false,
  },
  {
    name: "Nisol One",
    price: "AED 27,500",
    usdEquiv: "(~$7,500 USD)",
    duration: "7–11 Business Days",
    tagline: "360° Enterprise Diagnostic",
    description: "Complete 62-question audit across 15 capabilities, benchmarked against Gulf industry leaders.",
    href: "/contact?region=dubai&package=One",
    popular: false,
  },
  {
    name: "Nisol Pro",
    price: "AED 55,000",
    usdEquiv: "(~$15,000 USD)",
    duration: "10–15 Business Days",
    tagline: "Full Transformation Blueprint",
    description: "Comprehensive architecture, CFO financial model (AED & USD), data lakehouse blueprint, and board memo.",
    href: "/contact?region=dubai&package=Pro",
    popular: true,
  },
  {
    name: "Nisol Enterprise",
    price: "AED 110,000+",
    usdEquiv: "(~$30,000+ USD)",
    duration: "4–8 Weeks",
    tagline: "Sovereign Intelligence System",
    description: "Multi-entity holding conglomerate deployment, custom AI CoE charter, and private VPC orchestration.",
    href: "/contact?region=dubai&package=Enterprise",
    popular: false,
  },
];

const GULF_MANDATES = [
  {
    title: "DUB.AI Alignment",
    desc: "Architected to satisfy the Dubai Universal Blueprint for Artificial Intelligence and Dubai AI Seal standards."
  },
  {
    title: "UAE AI 2031 & Vision 2030",
    desc: "Strategic roadmaps built to accelerate national transformation mandates across the UAE and Saudi Arabia."
  },
  {
    title: "Sovereign In-Country Data",
    desc: "Deployment compatibility with local UAE cloud infrastructure (G42 / sovereign VPCs) ensuring total data residency."
  },
  {
    title: "Museum-Grade Deliverable",
    desc: "Hand-delivered custom-embossed physical executive dossier delivered to your boardroom in DIFC or Downtown."
  }
];

export default function DubaiPage() {
  return (
    <div className="space-y-24 sm:space-y-32 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-golden-500/30 text-golden-300 text-xs font-semibold shadow-lg">
          <Globe2 className="w-3.5 h-3.5 text-golden-400" />
          <span>UAE & Middle East Enterprise Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-navy-950 tracking-tight leading-[1.08]">
          The most ambitious enterprises in the Gulf <br />
          <span className="golden-gradient-text">partner with Nisol AI.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-navy-700/90 leading-relaxed font-medium max-w-3xl mx-auto">
          "Your enterprise has a thousand decisions. We make them intelligent — in 7 days."
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/contact?region=dubai" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Gulf Discovery →
          </Button>
          <Button href="/about" variant="navy" size="lg">
            About Our Architects
          </Button>
        </div>

        <div className="pt-8 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Serving Family Offices • Conglomerates • Financial Institutions • Government Entities
        </div>
      </section>

      {/* 2. REGIONAL MANDATES & COMPLIANCE */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 shadow-2xl space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-golden-400 font-bold">Gulf Excellence</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Built for the Speed & Prestige of Dubai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GULF_MANDATES.map((mandate, idx) => (
              <div key={idx} className="bg-navy-900/90 rounded-2xl p-6 border border-navy-800 space-y-2">
                <div className="flex items-center gap-2 text-golden-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0" />
                  <span>{mandate.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {mandate.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GULF PRICING MATRIX */}
      <section className="space-y-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Gulf Engagement Pricing</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Transparent Fixed-Price Engagements in AED
          </h2>
          <p className="text-sm text-navy-700/80">
            Fixed scope, museum-grade deliverable packaging, and zero vendor lock-in. Invoiced in AED or USD (Pegged at 1 USD = 3.67 AED).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUBAI_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? "bg-navy-950 text-white shadow-2xl ring-2 ring-golden-500 relative lg:-translate-y-2"
                  : "bg-white text-navy-950 border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    tier.popular ? "bg-golden-500 text-navy-950" : "bg-navy-100 text-navy-800"
                  }`}>
                    {tier.popular ? "POPULAR IN GULF" : "FIXED SOW"}
                  </span>
                  <span className={`text-xs font-medium ${tier.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {tier.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-1">{tier.name}</h3>
                <div className="text-xs font-bold text-golden-600 mb-4">{tier.tagline}</div>

                <div className="mb-4">
                  <div className="text-3xl font-black">{tier.price}</div>
                  <div className={`text-xs font-semibold ${tier.popular ? "text-golden-400" : "text-golden-600"} mt-0.5`}>
                    {tier.usdEquiv}
                  </div>
                  <div className={`text-[11px] ${tier.popular ? "text-slate-400" : "text-slate-500"} mt-0.5`}>
                    AED • Fixed-Price SOW
                  </div>
                </div>

                <p className={`text-xs leading-relaxed mb-6 ${tier.popular ? "text-slate-300" : "text-slate-600"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/20">
                <Button
                  href={tier.href}
                  variant={tier.popular ? "primary" : "navy"}
                  size="sm"
                  className="w-full justify-center"
                >
                  Apply for {tier.name} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE WHITE-GLOVE UNBOXING */}
      <section className="max-w-5xl mx-auto bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-6 text-center">
        <Badge variant="golden" className="mx-auto">Museum-Grade Delivery</Badge>
        <h2 className="text-2xl sm:text-4xl font-black text-navy-950 tracking-tight">
          Delivered Like an Apple Product.
        </h2>
        <p className="text-sm sm:text-base text-navy-700/85 max-w-2xl mx-auto leading-relaxed">
          Your final Intelligence Dossier is not an email attachment. It arrives in an embossed, cloth-bound executive portfolio case, personally presented by our principal architect to your board or executive committee.
        </p>
      </section>

      {/* 5. SCARCITY CLOSE */}
      <section className="max-w-3xl mx-auto text-center space-y-6 pb-8">
        <Badge variant="golden" className="mx-auto">Controlled Scarcity</Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
          Only 3 Gulf Engagements Accepted Per Month
        </h2>
        <p className="text-base text-navy-700/85 max-w-xl mx-auto">
          We maintain strict selectivity to guarantee dedicated executive time from our founding architects.
        </p>
        <div className="pt-2">
          <Button href="/contact?region=dubai" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Gulf Discovery Session →
          </Button>
        </div>
      </section>
    </div>
  );
}
