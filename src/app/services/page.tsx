import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Bot, Cpu, Compass, MessageSquareCode, Zap, Database, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "AI Services & Core Pillars | Autonomous Agents, LLMOps & Strategy",
  description: "Explore Nisol Labs' 6 core AI pillars: Autonomous AI Agents, AI Engineering & DevOps, AI Strategy, AI Assistants, Automation, and Data Readiness."
};

export default function ServicesPage() {
  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">Enterprise AI Capabilities</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Practical, Scalable, Outcome-Driven <br />
          <span className="golden-gradient-text">Enterprise AI Services</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          From executive strategic roadmaps to autonomous multi-agent state graphs and LLMOps infrastructure, we deliver end-to-end AI capabilities that drive measurable ROI.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="glass-panel rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
          >
            {service.badge && (
              <div className="absolute top-6 right-6">
                <Badge variant={service.badge === "FLAGSHIP" ? "golden" : "navy"}>
                  {service.badge}
                </Badge>
              </div>
            )}

            <div>
              <div className="w-14 h-14 rounded-2xl bg-navy-900 text-golden-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                {service.id === "agents" && <Bot className="w-7 h-7" />}
                {service.id === "engineering" && <Cpu className="w-7 h-7" />}
                {service.id === "strategy" && <Compass className="w-7 h-7" />}
                {service.id === "assistants" && <MessageSquareCode className="w-7 h-7" />}
                {service.id === "automation" && <Zap className="w-7 h-7" />}
                {service.id === "data-readiness" && <Database className="w-7 h-7" />}
              </div>

              <h2 className="text-2xl font-bold text-navy-950 mb-2">
                {service.title}
              </h2>
              <p className="text-xs font-semibold text-golden-700 mb-4">{service.tagline}</p>

              <p className="text-sm text-navy-700/90 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-navy-600">Core Benefits</div>
                {service.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-navy-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-golden-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {service.technologies.slice(0, 4).map((tech, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-navy-50 text-navy-800 px-2 py-0.5 rounded border border-navy-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                {service.caseStudyHighlight.metric}
              </div>
              <Button href={`/services/${service.slug}`} variant="navy" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Pillar Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Callout */}
      <div className="bg-navy-950 text-white rounded-3xl p-10 border border-golden-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <Badge variant="golden">Unsure Which Pillar Fits Best?</Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule a Confidential AI Feasibility & Discovery Session
          </h3>
          <p className="text-sm text-navy-200">
            Our principal AI engineers will analyze your business processes and provide an initial feasibility matrix within 48 hours.
          </p>
        </div>
        <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
          Book Discovery Call
        </Button>
      </div>
    </div>
  );
}
