import React from "react";
import Metadata from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Cpu, 
  Lock, 
  FileCheck, 
  Database, 
  Mic, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Server, 
  Cloud, 
  Terminal, 
  Layers, 
  ChevronRight,
  AlertTriangle,
  UserCheck,
  FileCode,
  Box,
  Building2,
  Users,
  Briefcase,
  Landmark
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROSENSE_DATA } from "@/data/rosenseData";

export const metadata = {
  title: "RoSense AI — Enterprise Conversation Intelligence Platform | Nisol AI",
  description: "Turn 18 hours of strategy into immediate execution. RoSense AI captures boardroom sessions & discovery workshops, extracts decisions, commitments, and risks with 100% data sovereignty.",
  keywords: [
    "RoSense AI",
    "Conversation Intelligence",
    "Meeting Decision Extraction",
    "Mamba SSM",
    "Private AI Appliance",
    "WhisperX Diarization",
    "AWS Bedrock",
    "Supabase pgvector",
    "Nisol AI"
  ]
};

export default function RoSenseProductPage() {
  return (
    <div className="bg-[#030914] text-slate-100 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden border-b border-navy-800/80">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-golden-500/5 to-transparent pointer-events-none -z-10 rounded-b-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-navy-900/90 text-slate-200 text-xs font-semibold px-4 py-1.5 rounded-full border border-navy-700/80 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-mono text-[11px] uppercase tracking-wider">PROPRIETARY AI ENGINE</span>
                <span className="text-slate-600">•</span>
                <span className="text-golden-400 font-mono text-[11px]">AWS Cloud & On-Prem Appliance</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Turn 18 Hours of Strategy into{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-golden-400 bg-clip-text text-transparent">
                  Immediate Execution.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {ROSENSE_DATA.heroSubheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button 
                  href="/contact?type=rosense-demo" 
                  variant="primary" 
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold border-emerald-400 shadow-lg shadow-emerald-500/20"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Private Demo
                </Button>
                <Button 
                  href="#architecture" 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-navy-700 text-slate-200 hover:bg-navy-800/80 hover:text-white"
                  icon={<Cpu className="w-4 h-4 text-emerald-400" />}
                >
                  AWS & Tech Architecture
                </Button>
              </div>

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

            {/* Right Mockup Card Column */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl bg-navy-950/90 border border-navy-700/80 p-6 shadow-2xl text-white relative overflow-hidden backdrop-blur-xl">
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-navy-950 font-bold shadow-md">
                        <Play className="w-4 h-4 fill-navy-950 ml-0.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-2">
                          <span>Executive_Offsite_Day1.m4a</span>
                          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">RAM-Only</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">Duration: 04:18:22 • Diarized (4 Speakers)</div>
                      </div>
                    </div>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Audio Wave Visualizer */}
                  <div className="py-4 flex items-center justify-between gap-1 h-12">
                    {[40, 65, 30, 80, 95, 45, 60, 100, 75, 40, 90, 50, 70, 85, 35, 95, 60, 80, 45, 75, 90, 40, 60].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-1 rounded-full transition-all duration-300 ${i % 3 === 0 ? 'bg-emerald-400' : 'bg-navy-700'}`} 
                        style={{ height: `${h}%` }} 
                      />
                    ))}
                  </div>

                  {/* Mamba-3 Live Processing Status */}
                  <div className="my-2 flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Mamba-3 SSM Extracting Decisions & Commitments...</span>
                  </div>

                  {/* Structured Output Cards */}
                  <div className="space-y-3 pt-2">
                    {/* Decision Item */}
                    <div className="rounded-xl bg-navy-900/80 border border-navy-700/80 p-3.5 hover:border-emerald-500/50 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5" /> DECISION #01
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Timestamp [01:42:15]</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">&quot;Approved Q4 expansion strategy targeting European enterprise accounts.&quot;</p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                        <UserCheck className="w-3 h-3 text-slate-400" />
                        <span>Speaker: Rahul (VP Operations)</span>
                      </div>
                    </div>

                    {/* Commitment Item */}
                    <div className="rounded-xl bg-navy-900/80 border border-navy-700/80 p-3.5 hover:border-golden-500/50 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-golden-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ACTION COMMITMENT
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Due: Aug 15</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">&quot;Finalize security audit compliance documentation for DPDP readiness.&quot;</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Owner: Priya (Security Lead)</span>
                        <span className="text-emerald-400 hover:underline cursor-pointer font-mono text-[10px]">▶ Listen Proof (20s)</span>
                      </div>
                    </div>

                    {/* Risk Item */}
                    <div className="rounded-xl bg-navy-900/80 border border-navy-700/80 p-3.5">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> RISK IDENTIFIED
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">[03:10:04]</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">Third-party API latency on legacy systems could delay migration.</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AES-256 Encrypted at Rest
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">Vault Key: company_k39a</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAFEGUARDS & COMPLIANCE BAR */}
      <section className="py-12 bg-navy-950/80 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 font-mono">Enterprise Safeguarding & Compliance Architecture</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ROSENSE_DATA.safeguards.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 hover:border-emerald-500/40 transition-all text-center flex flex-col items-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 1 && <Cpu className="w-5 h-5" />}
                  {idx === 2 && <Lock className="w-5 h-5" />}
                  {idx === 3 && <FileCheck className="w-5 h-5" />}
                  {idx === 4 && <Database className="w-5 h-5" />}
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                <p className="text-[11px] text-slate-400 leading-tight">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE TRANSFORMATION ENGINE (3 PIPELINE STEPS) */}
      <section className="py-24 relative overflow-hidden border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proprietary Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How RoSense AI Works:{" "}
              <span className="text-emerald-400">Listen ➔ Structure ➔ Deliver</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              From raw, multi-hour meeting audio to structured, actionable enterprise intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ROSENSE_DATA.pipelineSteps.map((step) => (
              <div 
                key={step.id} 
                className="rounded-2xl bg-navy-950/80 border border-navy-700/80 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500 text-navy-950">
                      STEP {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-mono bg-navy-900 text-golden-400 px-2 py-0.5 rounded border border-golden-500/30">
                      {step.techBadge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{step.title}</h3>
                  <p className="text-xs font-mono text-emerald-400 mb-3">{step.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{step.description}</p>

                  <div className="space-y-2.5 border-t border-navy-800 pt-4">
                    {step.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-800 font-mono text-[11px] bg-navy-900/60 p-3 rounded-lg border border-navy-800">
                  <div className="text-slate-400 font-bold mb-1 flex items-center justify-between">
                    <span>{step.executionSnippet.stage}</span>
                    <span className="text-emerald-400">{step.executionSnippet.status}</span>
                  </div>
                  <div className="text-slate-300 font-semibold truncate">{step.executionSnippet.detailHeader}</div>
                  <div className="text-slate-500 text-[10px] truncate mb-2">{step.executionSnippet.detailSub}</div>
                  <div className="space-y-0.5 text-slate-400 text-[10px]">
                    {step.executionSnippet.speakers.map((s, i) => (
                      <div key={i} className="truncate">• {s}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPLICIT AWS CLOUD INFRASTRUCTURE STACK (AWS Activate Feature) */}
      <section id="architecture" className="py-24 bg-navy-950/60 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-golden-500/10 text-golden-400 border border-golden-500/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Cloud className="w-4 h-4 text-golden-400" />
              <span>AWS Cloud Integration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Enterprise AWS Infrastructure & Supabase Hybrid Stack
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              RoSense AI combines AWS enterprise cloud compute and security services with high-precision vector database storage for scalable deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROSENSE_DATA.awsIntegration.services.map((svc, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-navy-900/80 border border-navy-700/80 hover:border-golden-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-950 border border-navy-700 text-golden-400 flex items-center justify-center mb-4">
                    {idx === 0 && <Cloud className="w-6 h-6" />}
                    {idx === 1 && <FileCode className="w-6 h-6" />}
                    {idx === 2 && <Server className="w-6 h-6" />}
                    {idx === 3 && <Database className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{svc.name}</h3>
                  <p className="text-xs font-mono text-golden-400 mb-3">{svc.role}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{svc.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-emerald-400">AWS Native</span>
                  <span className="text-slate-500">SOC-2 Ready</span>
                </div>
              </div>
            ))}
          </div>

          {/* Hybrid Architecture Diagram Callout */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 border border-navy-700/80 text-center max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">Hybrid Deployment Flexibility</h3>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-6">
              Deploy on managed <strong>AWS EC2/ECS GPU clusters + AWS S3</strong> for unlimited cloud scale, or run <strong>100% air-gapped on-premise</strong> via the RoSense Box hardware appliance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-navy-800 text-emerald-400 border border-emerald-500/30">WhisperX ASR</span>
              <span className="text-slate-600">➔</span>
              <span className="px-3 py-1.5 rounded-lg bg-navy-800 text-golden-400 border border-golden-500/30">Mamba-3 SSM (2.8B FP16)</span>
              <span className="text-slate-600">➔</span>
              <span className="px-3 py-1.5 rounded-lg bg-navy-800 text-teal-300 border border-teal-500/30">Supabase pgvector (1024-dim)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. USE CASES GRID */}
      <section className="py-24 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Built for Every Strategic Conversation
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Designed for organizations demanding total data privacy, long-context accuracy, and immediate decision execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROSENSE_DATA.useCases.map((uc, idx) => (
              <div key={idx} className="bg-navy-950/80 rounded-2xl p-6 border border-navy-700/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-900 text-emerald-400 flex items-center justify-center">
                      {idx === 0 && <Users className="w-5 h-5" />}
                      {idx === 1 && <Briefcase className="w-5 h-5" />}
                      {idx === 2 && <Landmark className="w-5 h-5" />}
                      {idx === 3 && <Building2 className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-semibold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      {uc.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{uc.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{uc.description}</p>
                  
                  <div className="space-y-2 border-t border-navy-800 pt-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Scenarios:</p>
                    {uc.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DEPLOYMENT OPTIONS (CLOUD vs BOX APPLIANCE) */}
      <section className="py-24 bg-navy-950/80 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Flexible Deployment Models
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Choose the deployment mode that fits your enterprise security and cloud compliance policy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ROSENSE_DATA.deployments.map((dep, idx) => (
              <div key={idx} className="rounded-2xl bg-navy-900/90 border border-navy-700/80 p-8 flex flex-col justify-between hover:border-golden-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold font-mono px-3 py-1 rounded-full bg-golden-500/20 text-golden-300 border border-golden-500/30">
                      {dep.badge}
                    </span>
                    {idx === 0 ? <Cloud className="w-6 h-6 text-golden-400" /> : <Box className="w-6 h-6 text-emerald-400" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{dep.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{dep.description}</p>
                  
                  <div className="space-y-3 border-t border-navy-800 pt-4">
                    {dep.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-golden-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-navy-800">
                  <Button 
                    href="/contact?type=rosense-demo" 
                    variant={idx === 0 ? "outline" : "primary"}
                    size="md" 
                    className="w-full justify-center"
                  >
                    Request {dep.title} Access
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 border border-navy-700 p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Turn 18-Hour Strategy Sessions into Immediate Execution?
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto mb-8">
              Experience RoSense AI in action during your next discovery workshop or executive board meeting. Zero data leakage guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                href="/contact?type=rosense-demo" 
                variant="primary" 
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold border-emerald-400 px-8"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Schedule Private RoSense Demo
              </Button>
              <Button 
                href="/discovery" 
                variant="outline" 
                size="lg"
                className="border-navy-700 text-slate-200 hover:bg-navy-800/80"
              >
                Explore Nisol Discovery™
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
