import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bot, ShieldCheck, Award, ArrowRight, CheckCircle2, Globe, Code2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "About Nisol Labs | Our Story & Founders",
  description: "Learn about Nisol Labs' mission to help businesses become AI-First organizations through practical, scalable, outcome-driven AI solutions."
};

export default function AboutPage() {
  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">About Nisol Labs</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          The Core of <span className="golden-gradient-text">Intelligence</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          {COMPANY.vision} We build production-ready AI software engineered for scale, reliability, and security.
        </p>
      </div>

      {/* Our Story */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-golden-600">Our Origin & Story</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Bridging Academic AI Innovation and Enterprise Production Systems
          </h2>
          <p className="text-sm text-navy-700/90 leading-relaxed">
            Nisol Labs was founded on a simple observation: while foundational large language models advanced exponentially, enterprise adoption was crippled by fragile prompt wrappers, unmonitored hallucinations, high API token costs, and zero-trust security concerns.
          </p>
          <p className="text-sm text-navy-700/90 leading-relaxed">
            We assembled a team of senior AI researchers, distributed systems engineers, and domain architects to build a new standard—stateful multi-agent systems, continuous LLMOps observability, and hybrid vector lakehouses that deliver measurable business ROI.
          </p>
        </div>

        <div className="lg:col-span-5 bg-navy-950 rounded-2xl p-6 text-white space-y-4 border border-golden-500/30">
          <div className="text-xs font-bold uppercase tracking-wider text-golden-400">By The Numbers</div>
          <div className="grid grid-cols-2 gap-4">
            {COMPANY.stats.map((s, idx) => (
              <div key={idx} className="bg-navy-900/90 p-4 rounded-xl border border-navy-800">
                <div className="text-2xl font-black text-golden-400">{s.value}</div>
                <div className="text-xs text-navy-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Founders Section */}
      <section className="space-y-10">
        <SectionHeader
          badgeText="Leadership"
          title="Meet The Founders"
          subtitle="Engineering-First Executive Leadership"
          description="Led by veteran AI research engineers and distributed systems architects."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPANY.founders.map((founder, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-golden-500 shrink-0">
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-950">{founder.name}</h3>
                    <p className="text-xs font-bold text-golden-700">{founder.role}</p>
                  </div>
                </div>

                <p className="text-sm text-navy-700/90 leading-relaxed">
                  {founder.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-between mt-6 text-navy-700">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  Co-Founder
                </span>
                <div className="flex items-center gap-3">
                  <a href={founder.linkedin} className="text-navy-600 hover:text-navy-950"><Globe className="w-4 h-4" /></a>
                  <a href={founder.github} className="text-navy-600 hover:text-navy-950"><Code2 className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <SectionHeader
          badgeText="Our Core Values"
          title="What Guides Nisol Labs"
          description="Every line of code and architectural recommendation is guided by these principles."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPANY.values.map((val, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-navy-950">{val.title}</h4>
              <p className="text-xs text-navy-700 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-navy-950 text-white rounded-3xl p-10 text-center space-y-6 border border-golden-500/30">
        <h2 className="text-3xl font-black text-white">Partner with Nisol Labs Today</h2>
        <p className="text-sm text-navy-200 max-w-xl mx-auto">
          Let’s discuss your AI adoption roadmap and evaluate how autonomous agents can transform your operational efficiency.
        </p>
        <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
          Schedule Leadership Call
        </Button>
      </div>
    </div>
  );
}
