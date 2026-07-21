import React from "react";
import { Metadata } from "next";
import {
  ArrowRight,
  Globe,
  Code2,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Users,
  Database,
  GraduationCap,
  Shield,
  Award,
  Bot,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
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
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="golden" className="mx-auto">
          Our Origin & Story
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-4 leading-tight">
          Bridging Academic AI Innovation and{" "}
          <span className="bg-gradient-to-r from-golden-500 to-golden-600 bg-clip-text text-transparent">
            Enterprise Production Systems
          </span>
        </h2>
      </div>
      {/* The Problem */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-golden-500 flex-shrink-0 mt-1" />
            <h3 className="text-2xl font-bold text-navy-950">The Problem</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            In 2024, the AI world was electrified by rapid advances in large
            language models. But in the enterprise, reality looked different.
            We watched companies pour millions into AI experiments that went
            nowhere.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700 text-sm">
                Prompts that worked in demos{" "}
                <strong className="text-red-600">failed in production</strong>
              </span>
            </div>
            <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700 text-sm">
                Hallucinations went{" "}
                <strong className="text-red-600">undetected</strong> until
                customers complained
              </span>
            </div>
            <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700 text-sm">
                API costs <strong className="text-red-600">ballooned</strong>{" "}
                without warning
              </span>
            </div>
            <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700 text-sm">
                Security teams said <strong className="text-red-600">"no"</strong>
              </span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-navy-950 rounded-xl border border-navy-800">
            <p className="text-white font-medium text-center text-lg">
              We saw a massive gap:{" "}
              <span className="text-golden-400">
                cutting-edge AI capability
              </span>
              , but no way to deploy it safely, reliably, or at scale in the
              enterprise.
            </p>
          </div>
        </div>
      </div>

      {/* Our Answer */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="w-6 h-6 text-golden-500 flex-shrink-0 mt-1" />
            <h3 className="text-2xl font-bold text-navy-950">Our Answer</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            That's why we founded{" "}
            <strong className="text-navy-950">Nisol Labs</strong>.
          </p>

          {/* Team Capabilities */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-golden-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-navy-700" />
                </div>
                <h4 className="font-semibold text-navy-950 text-sm">
                  Deep Enterprise Experience
                </h4>
                <p className="text-gray-500 text-xs mt-1">
                  24+ years · IT Delivery · DevOps · Cloud
                </p>
              </CardContent>
            </Card>
            <Card className="border-golden-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-golden-100 flex items-center justify-center mx-auto mb-3">
                  <Database className="w-6 h-6 text-golden-600" />
                </div>
                <h4 className="font-semibold text-navy-950 text-sm">
                  Data Engineering Expertise
                </h4>
                <p className="text-gray-500 text-xs mt-1">
                  18+ years · Production-Grade Data Platforms
                </p>
              </CardContent>
            </Card>
            <Card className="border-golden-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-navy-950 text-sm">
                  Fresh AI/ML Knowledge
                </h4>
                <p className="text-gray-500 text-xs mt-1">
                  Cutting-Edge · Academic · Modern AI
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-lg italic">
              "What would it take to build AI that{" "}
              <span className="text-navy-950 font-semibold">
                actually works
              </span>{" "}
              in the enterprise?"
            </p>
          </div>
        </div>
      </div>

      {/* The Nisol Labs Standard — Table */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-navy-950 rounded-2xl p-8 md:p-10 border border-navy-800">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-golden-500 flex-shrink-0 mt-1" />
            <h3 className="text-2xl font-bold text-white">
              The Nisol Labs Standard
            </h3>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            We built our own architecture to answer that question:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-navy-700">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-gray-300 font-medium text-sm">
                        Unreliable Agents
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <ArrowRight className="w-4 h-4 text-golden-500 mx-auto" />
                  </td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-medium text-sm">
                        Stateful Multi-Agent Systems
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-navy-700">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-gray-300 font-medium text-sm">
                        Black-Box Operations
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <ArrowRight className="w-4 h-4 text-golden-500 mx-auto" />
                  </td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-medium text-sm">
                        LLMOps Observability
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-navy-700">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-gray-300 font-medium text-sm">
                        Bad Data Foundations
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <ArrowRight className="w-4 h-4 text-golden-500 mx-auto" />
                  </td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-medium text-sm">
                        Hybrid Vector Lakehouses
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-gray-300 font-medium text-sm">
                        Security Concerns
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <ArrowRight className="w-4 h-4 text-golden-500 mx-auto" />
                  </td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-medium text-sm">
                        Enterprise-Grade Zero-Trust
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* The Result */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 rounded-2xl p-8 md:p-10 border border-golden-500/20 shadow-xl shadow-golden-500/5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-golden-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-golden-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">The Result</h3>
              <p className="text-gray-300 text-lg leading-relaxed mt-2">
                AI that enterprises can trust. Systems that deliver{" "}
                <span className="text-golden-400 font-semibold">
                  measurable ROI
                </span>{" "}
                — not just prototypes. Solutions that bridge the gap between
                academic innovation and production reality.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge className="bg-golden-500/10 text-golden-400 border-golden-500/20 px-4 py-2">
              ✅ Production-Ready
            </Badge>
            <Badge className="bg-golden-500/10 text-golden-400 border-golden-500/20 px-4 py-2">
              ✅ Enterprise-Grade
            </Badge>
            <Badge className="bg-golden-500/10 text-golden-400 border-golden-500/20 px-4 py-2">
              ✅ Measurable ROI
            </Badge>
          </div>
        </div>

        {/* Promise */}
        <div className="text-center mt-8">
          <p className="text-xl font-semibold text-navy-950">
            We don't just build AI.{" "}
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-golden-500 to-golden-600 bg-clip-text text-transparent text-2xl font-bold">
              We build AI-powered enterprises.
            </span>
          </p>
        </div>
      </div>
      
      {/* The Founders Section */}
      <section className="space-y-10">
        <SectionHeader
          badgeText="Leadership & Team"
          title="Meet The Team Behind Nisol Labs"
          subtitle="Where Enterprise Experience Meets AI Innovation."
          description="Nisol Labs brings together experienced enterprise technology leaders and emerging AI engineers to design, build, and deliver practical AI solutions. Through mentorship and hands-on experience, our team combines proven industry expertise with the innovation of the next generation."
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
                  {founder.position}
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
          Let's discuss your AI adoption roadmap and evaluate how autonomous agents can transform your operational efficiency.
        </p>
        <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
          Schedule an AI Strategy Session
        </Button>
      </div>
    </div>
  );
}
