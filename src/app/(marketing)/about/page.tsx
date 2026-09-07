import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Globe,
  Code2,
  Users,
  Layers,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "About Nisol AI | Enterprise Intelligence Partner",
  description: "We've spent two decades building intelligence systems. Now we build them for you. Learn about our philosophy, architecture, and anti-consulting standard.",
};

const ANTI_CONSULTING_COMPARISON = [
  {
    category: "Team Architecture",
    traditional: "47-person junior team learning on your dollar",
    nisol: "2-person master architect pod with 40+ years experience",
  },
  {
    category: "Incentive Model",
    traditional: "Billed by the hour — financially rewarded for delays",
    nisol: "Fixed-price by outcome — engineered for rapid, flawless delivery",
  },
  {
    category: "Delivery Speed",
    traditional: "6 months of discovery meetings & discovery decks",
    nisol: "7–11 business days to a complete, board-approved roadmap",
  },
  {
    category: "IP & Code Ownership",
    traditional: "Proprietary vendor lock-in & managed hosting traps",
    nisol: "100% Sovereign IP — you own every repo, weight, and dataset",
  },
  {
    category: "Deliverable Standard",
    traditional: "Generic 120-slide PowerPoint that gathers dust",
    nisol: "Museum-grade board dossier with CFO cash-flow models & PoC gates",
  },
];

const CORE_PRINCIPLES = [
  {
    number: "01",
    title: "Radical Clarity",
    description: "No buzzwords. No techno-babble. Every enterprise decision is framed with mathematical certainty and business truth.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Outcome Over Effort",
    description: "We don't celebrate hours worked. We measure impact in EBITDA expansion, operational latency reduction, and hard ROI.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Sovereign Intelligence",
    description: "Your intelligence belongs inside your perimeter. We engineer systems that give you total autonomy, with zero vendor lock-in.",
    icon: Lock,
  },
  {
    number: "04",
    title: "Museum-Grade Craftsmanship",
    description: "Every report, architecture blueprint, and code commit is crafted with unreasonable precision. Designed to be shown to the board.",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-28 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO: EMOTION-LED MANIFESTO */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-golden-500/30 text-golden-300 text-xs font-semibold shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-golden-400" />
          <span>Enterprise Intelligence Partner</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-navy-950 tracking-tight leading-[1.08]">
          We don't build prototypes. <br />
          <span className="bg-gradient-to-r from-golden-500 via-amber-400 to-golden-600 bg-clip-text text-transparent">
            We awaken enterprises.
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-navy-700/90 leading-relaxed font-medium max-w-3xl mx-auto pt-2">
          "We've spent two decades building intelligence systems. Now we build them for you."
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Discovery →
          </Button>
          <Button href="/pricing" variant="navy" size="lg">
            Explore Product Hierarchy
          </Button>
        </div>
      </section>

      {/* 2. THE EMOTIONAL TRUTH: WHY WE EXIST */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-14 border border-navy-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-golden-400 font-bold">The Core Belief</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Enterprise AI didn't fail because of the models. <br />
              <span className="text-golden-400">It failed because nobody stopped to think first.</span>
            </h2>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <p>
              In 2024, the world rushed into generative AI. Boards demanded immediate adoption. Consultancies responded by deploying 40-person teams that billed millions for demo wrappers that crashed in production. Hallucinations went undetected, token costs skyrocketed, and security teams shut projects down.
            </p>
            <p>
              We watched companies treat AI as an IT accessory rather than what it truly is: <strong className="text-white">a fundamental reimagination of how an enterprise thinks, decides, and executes.</strong>
            </p>
            <p className="border-l-2 border-golden-400 pl-4 text-white font-medium italic">
              Nisol AI was founded on a radically simple principle: Bring two senior enterprise architects into a room with leadership, audit 62 dimensions of capability and data hygiene in 7 days, and deliver a strategy so clear and mathematically sound that the board approves it on Monday morning.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BUILT DIFFERENT: THE ANTI-CONSULTING CONTRAST */}
      <section className="space-y-10 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Anti-Consulting Philosophy</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Built Different.
          </h2>
          <p className="text-base text-navy-700/80">
            Why the world's most ambitious executives choose a 2-person architect pod over Big-4 consulting armies.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-12 bg-navy-950 text-white p-5 text-xs uppercase tracking-wider font-bold border-b border-navy-800">
            <div className="col-span-4 sm:col-span-3 text-slate-400">Dimension</div>
            <div className="col-span-4 sm:col-span-4 text-rose-400 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Industry Default</span>
            </div>
            <div className="col-span-4 sm:col-span-5 text-golden-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-golden-400" />
              <span>The Nisol AI Standard</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {ANTI_CONSULTING_COMPARISON.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-5 sm:p-6 items-center gap-3 text-sm hover:bg-slate-50/80 transition-colors">
                <div className="col-span-12 sm:col-span-3 font-bold text-navy-950 text-xs sm:text-sm">
                  {row.category}
                </div>
                <div className="col-span-6 sm:col-span-4 text-slate-500 text-xs sm:text-sm flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{row.traditional}</span>
                </div>
                <div className="col-span-6 sm:col-span-5 text-navy-950 font-semibold text-xs sm:text-sm flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{row.nisol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE FOUR CORE PRINCIPLES */}
      <section className="space-y-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Our Operating Code</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            The Principles That Guide Every Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">{principle.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 mb-2">{principle.title}</h3>
                  <p className="text-xs sm:text-sm text-navy-700/85 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. THE ARCHITECTS: SOVEREIGN SYSTEMS THINKERS */}
      <section id="leadership" className="space-y-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Leadership & Architects</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Architects, Not Account Managers.
          </h2>
          <p className="text-base text-navy-700/80">
            When you engage Nisol AI, you work directly with the systems architects who design and write the core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPANY.founders.slice(0, 2).map((founder, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col justify-between hover:border-golden-400/50 transition-all">
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden relative border-2 border-golden-500/40 shrink-0 bg-navy-950">
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-950">{founder.name}</h3>
                    <p className="text-xs font-bold text-golden-700 uppercase tracking-wider">{founder.role}</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Co-Founder & Systems Architect
                    </span>
                  </div>
                </div>

                <p className="text-sm text-navy-700/90 leading-relaxed">
                  {founder.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                <span className="text-xs text-slate-500 font-medium">
                  Direct engagement on every audit
                </span>
                <div className="flex items-center gap-3 text-navy-600">
                  <a href={founder.linkedin} className="hover:text-golden-600 transition-colors" title="LinkedIn Profile">
                    <Globe className="w-4 h-4" />
                  </a>
                  <a href={founder.github} className="hover:text-golden-600 transition-colors" title="Code Repository">
                    <Code2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emerging Engineers */}
        {COMPANY.founders[2] && (
          <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-golden-400 shrink-0 bg-navy-900">
              <img src={COMPANY.founders[2].image} alt={COMPANY.founders[2].name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="font-bold text-navy-950 text-sm">{COMPANY.founders[2].name}</h4>
                <span className="text-[10px] bg-navy-100 text-navy-800 font-semibold px-2 py-0.5 rounded">
                  {COMPANY.founders[2].role}
                </span>
              </div>
              <p className="text-xs text-navy-600 leading-relaxed">
                {COMPANY.founders[2].bio}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 6. MUSEUM-GRADE DELIVERABLES STANDARD */}
      <section className="max-w-5xl mx-auto bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/20 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-golden-400 font-bold">Unboxing Intelligence</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Deliverables Engineered for the Boardroom.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every deliverable leaving Nisol AI follows Apple hardware unboxing principles: cloth-bound physical executive portfolios, clear CFO financial sensitivity models, and deterministic architectural blueprints.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-golden-400" />
                <span>Zero Slide Deck Bloat</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-golden-400" />
                <span>CFO Cash-Flow Models</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-golden-400" />
                <span>Deterministic PoC Gates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-golden-400" />
                <span>Full Source Code Ownership</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-navy-900/90 rounded-2xl p-6 border border-navy-700 text-center space-y-4">
            <div className="text-3xl font-black text-golden-400">7–11 Days</div>
            <div className="text-xs text-slate-300 font-medium">
              Average turnaround from Discovery kickoff to Board Memorandum presentation.
            </div>
            <div className="pt-2">
              <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                Apply for Discovery →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTROLLED SCARCITY CLOSE */}
      <section className="text-center max-w-3xl mx-auto space-y-5 pb-8">
        <Badge variant="golden" className="mx-auto">Controlled Scarcity</Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
          We Partner With Only 5 New Enterprises Each Month.
        </h2>
        <p className="text-base text-navy-700/85 max-w-2xl mx-auto">
          We reject the agency model of infinite scaling with junior developers. We take only 5 accounts per month so our founding architects can dedicate full focus to your transformation.
        </p>
        <div className="pt-4">
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Discovery Session →
          </Button>
        </div>
        <p className="text-xs text-slate-400">
          Applications reviewed within 48 hours • Mutual NDA provided prior to review
        </p>
      </section>
    </div>
  );
}
