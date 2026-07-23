// components/playbooks/SmallBusinessPlaybook.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  Wrench,
  Zap,
  BarChart3,
  Users,
  Shield,
  Sparkles,
  Target,
  Megaphone,
  ShoppingCart,
  DollarSign,
  HeadphonesIcon,
  Settings,
  Monitor,
  FileText,
  Lightbulb,
  Award,
  ChevronRight,
  AlertTriangle,
  Star,
  Cpu,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Playbook {
  slug: string;
  industry: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
    roi: string;
    timeline: string;
    opportunitiesCount: number;
  };
  purpose: string;
  challenges: { title: string; description?: string }[];
  opportunities: {
    department: string;
    opportunity: string;
    priority: "High" | "Medium" | "Low";
    slug: string;
  }[];
  featuredSolutions: {
    title: string;
    businessProblem: string;
    solution: string;
    benefits: string;
    technology: string;
    timeline: string;
    roi: string;
    slug: string;
  }[];
  maturityJourney: string[];
  roadmap: { month: string; milestone: string }[];
  businessBenefits: string[];
  services: { name: string; description?: string; link: string }[];
  faq: { q: string; a: string }[];
}

interface Props {
  playbook: Playbook;
}

// ─── Static Data ───────────────────────────────────────────────────────────────

const INDUSTRY_STATS = [
  { value: "78%", label: "SMBs already use AI in some form", icon: <Cpu className="w-6 h-6" /> },
  { value: "65%", label: "report measurable productivity gains", icon: <TrendingUp className="w-6 h-6" /> },
  { value: "44%", label: "reduced operational costs with AI", icon: <DollarSign className="w-6 h-6" /> },
  { value: "3.2×", label: "revenue growth vs. non-AI peers", icon: <BarChart3 className="w-6 h-6" /> },
];

const BUSINESS_FUNCTIONS = [
  { label: "Marketing", icon: <Megaphone className="w-5 h-5" />, examples: "Content, SEO, Campaigns" },
  { label: "Sales", icon: <ShoppingCart className="w-5 h-5" />, examples: "Lead scoring, Outreach" },
  { label: "Finance", icon: <DollarSign className="w-5 h-5" />, examples: "Bookkeeping, Forecasting" },
  { label: "HR", icon: <Users className="w-5 h-5" />, examples: "Screening, Onboarding" },
  { label: "Customer Service", icon: <HeadphonesIcon className="w-5 h-5" />, examples: "24/7 Chatbot, Ticketing" },
  { label: "Operations", icon: <Settings className="w-5 h-5" />, examples: "Workflows, Scheduling" },
  { label: "IT", icon: <Monitor className="w-5 h-5" />, examples: "Support desk, Security" },
  { label: "Administration", icon: <FileText className="w-5 h-5" />, examples: "Docs, Contracts, Email" },
];

const SUCCESS_METRICS = [
  { value: "300%", label: "Typical ROI", sub: "over 12 months", icon: <TrendingUp className="w-7 h-7" /> },
  { value: "8 Wks", label: "Implementation", sub: "first use-case live", icon: <Clock className="w-7 h-7" /> },
  { value: "4 Mo", label: "Payback Period", sub: "average for SMBs", icon: <Award className="w-7 h-7" /> },
  { value: "45%", label: "Tasks Automated", sub: "across business ops", icon: <Zap className="w-7 h-7" /> },
];

const METHODOLOGY_STEPS = [
  {
    number: "01",
    title: "AI Discovery Workshop",
    description: "A focused 2-hour session where we map your current operations, identify pain points, and surface your highest-value AI opportunities.",
    tag: "Where we start",
  },
  {
    number: "02",
    title: "Opportunity Mapping",
    description: "We catalogue every AI use-case specific to your business and score them by feasibility, speed-to-value, and strategic impact.",
    tag: "What we uncover",
  },
  {
    number: "03",
    title: "Prioritisation",
    description: "Not every AI idea is equal. We rank opportunities using our proven Priority Matrix—effort vs. impact—so you invest in what matters most first.",
    tag: "How we focus",
  },
  {
    number: "04",
    title: "Transformation Roadmap",
    description: "You receive a clear, phased roadmap: quick wins in weeks 1–4, core automation in months 2–6, and intelligent scaling beyond that.",
    tag: "Your blueprint",
  },
  {
    number: "05",
    title: "Implementation",
    description: "Our engineers build and deploy your AI solutions—chatbots, content assistants, workflow automations—integrated into the tools you already use.",
    tag: "Execution",
  },
  {
    number: "06",
    title: "Optimisation",
    description: "AI improves with feedback. We monitor performance, retrain models, and continuously improve ROI through monthly check-ins.",
    tag: "Ongoing value",
  },
];

const WHY_NISOL = [
  {
    title: "SMB-First Approach",
    body: "We don't sell enterprise complexity to small businesses. Every recommendation is affordable, practical, and sized for your stage of growth.",
    icon: <Star className="w-6 h-6 text-golden-500" />,
  },
  {
    title: "Speed to Value",
    body: "Your first AI use-case is live within 2–3 weeks, not months. We focus relentlessly on quick wins that build confidence and momentum.",
    icon: <Zap className="w-6 h-6 text-golden-500" />,
  },
  {
    title: "No Technical Team Needed",
    body: "We handle everything—strategy, build, deployment. You focus on running your business; we handle the AI complexity behind the scenes.",
    icon: <Shield className="w-6 h-6 text-golden-500" />,
  },
  {
    title: "Proven Methodology",
    body: "Our 6-step process has been refined across 50+ SMB engagements. You benefit from what works—not experiments at your expense.",
    icon: <CheckCircle2 className="w-6 h-6 text-golden-500" />,
  },
  {
    title: "Tools You Already Use",
    body: "We integrate with Notion, Slack, WordPress, HubSpot, QuickBooks, and more. No rip-and-replace; AI layers on top of your existing stack.",
    icon: <Settings className="w-6 h-6 text-golden-500" />,
  },
  {
    title: "Transparent Pricing",
    body: "From $2,500 for a standalone chatbot to $8,000 for a full AI starter stack. No hidden fees, no surprise costs, no lock-in contracts.",
    icon: <DollarSign className="w-6 h-6 text-golden-500" />,
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "Do you use any AI tools today (ChatGPT, Copilot, etc.)?",
    options: ["No, we haven't started", "A few people use them informally", "Yes, we use them regularly"],
    scores: [0, 1, 2],
  },
  {
    question: "How much of your customer communication is automated?",
    options: ["Almost none — it's all manual", "Some email templates", "Significant automation in place"],
    scores: [0, 1, 2],
  },
  {
    question: "How is your business data organised?",
    options: ["Scattered across email / paper", "Mostly in spreadsheets", "Organised in CRM / software"],
    scores: [0, 1, 2],
  },
  {
    question: "Have you defined clear business goals for the next 12 months?",
    options: ["Not really", "High-level goals only", "Specific, measurable targets"],
    scores: [0, 1, 2],
  },
  {
    question: "What is your team's comfort with new technology?",
    options: ["Low — change is slow", "Medium — we adapt gradually", "High — we embrace new tools"],
    scores: [0, 1, 2],
  },
];

const CONSULTANT_INSIGHTS = [
  {
    quote:
      "Most small businesses don't need custom AI on day one. The fastest value usually comes from workflow automation and knowledge assistants — tools that work immediately with the content and data you already have.",
    context: "On getting started",
  },
  {
    quote:
      "The question isn't 'Can we afford AI?' — it's 'Can we afford not to adopt it?' Competitors who adopt AI now will have a 3-year head start on everyone who waits.",
    context: "On urgency",
  },
  {
    quote:
      "We always start with a chatbot or content tool — not because it's the biggest win, but because it's visible, fast, and builds the internal trust needed for deeper AI investment.",
    context: "On prioritisation",
  },
];

const BUSINESS_IMPACT = [
  {
    area: "Missed Leads",
    cost: "$47K/year",
    description: "Average revenue lost by SMBs who don't respond to leads within 5 minutes",
    severity: "high",
  },
  {
    area: "Manual Admin Work",
    cost: "12 hrs/week",
    description: "Average owner time spent on tasks AI could automate (email, scheduling, data entry)",
    severity: "high",
  },
  {
    area: "Content Gap",
    cost: "68% less traffic",
    description: "SMBs publishing <4 pieces of content/month get 68% less organic traffic than competitors",
    severity: "medium",
  },
  {
    area: "After-Hours Queries",
    cost: "35% lost",
    description: "of website enquiries arrive outside business hours with no automated response",
    severity: "medium",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const priorityColor = (p: string) => {
  if (p === "High") return "bg-red-100 text-red-800";
  if (p === "Medium") return "bg-yellow-100 text-yellow-800";
  return "bg-blue-100 text-blue-800";
};

function getReadinessLabel(score: number, max: number): { label: string; color: string; pct: number; next: string } {
  const pct = Math.round((score / max) * 100);
  if (pct < 30) return { label: "AI Beginner", color: "bg-red-500", pct, next: "Book a Discovery Workshop to start safely." };
  if (pct < 60) return { label: "AI Explorer", color: "bg-yellow-500", pct, next: "You have a foundation — an Opportunity Mapping session will unlock quick wins." };
  if (pct < 85) return { label: "AI Adopter", color: "bg-blue-500", pct, next: "You're ready to scale. A Roadmap session will help prioritise what comes next." };
  return { label: "AI-Ready Leader", color: "bg-emerald-500", pct, next: "You're ahead of peers. Let's build your AI competitive moat." };
}

// ─── AI Readiness Quiz ─────────────────────────────────────────────────────────

function ReadinessQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const totalScore = answers.reduce<number>((sum, a, i) => {
    if (a === null) return sum;
    return sum + QUIZ_QUESTIONS[i].scores[a];
  }, 0);
  const maxScore = QUIZ_QUESTIONS.length * 2;

  const result = getReadinessLabel(totalScore, maxScore);
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="bg-white rounded-3xl border border-navy-100 shadow-lg p-8 space-y-8">
      {!submitted ? (
        <>
          <div className="space-y-2">
            <Badge variant="golden" className="bg-golden-100 text-golden-700 border-golden-200">
              AI Readiness Self-Assessment
            </Badge>
            <h3 className="text-2xl font-bold text-navy-950">How mature is your AI readiness?</h3>
            <p className="text-navy-600">Answer 5 quick questions to discover where you stand and what to do next.</p>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qi) => (
              <div key={qi} className="space-y-3">
                <p className="font-semibold text-navy-800">
                  <span className="text-golden-600 mr-2">{qi + 1}.</span>
                  {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => {
                        const next = [...answers];
                        next[qi] = oi;
                        setAnswers(next);
                      }}
                      className={`text-sm px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                        answers[qi] === oi
                          ? "border-golden-500 bg-golden-50 text-golden-800 shadow-sm"
                          : "border-navy-200 text-navy-700 hover:border-golden-300 hover:bg-golden-50/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setSubmitted(true)}
            variant="primary"
            size="lg"
            className={`w-full sm:w-auto ${!allAnswered ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!allAnswered}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            See My AI Readiness Score
          </Button>
        </>
      ) : (
        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-navy-500 uppercase tracking-wider">Your AI Readiness Score</p>
            <div className="text-7xl font-black golden-gradient-text">{result.pct}%</div>
            <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-semibold ${result.color}`}>
              {result.label}
            </div>
          </div>

          <div className="w-full bg-navy-100 rounded-full h-3 max-w-sm mx-auto">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${result.color}`}
              style={{ width: `${result.pct}%` }}
            />
          </div>

          <div className="bg-navy-50 rounded-2xl p-5 text-left max-w-md mx-auto">
            <p className="text-sm font-medium text-navy-500 mb-1">Recommended next step</p>
            <p className="text-navy-800 font-medium">{result.next}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Book AI Discovery Workshop
            </Button>
            <Button
              onClick={() => {
                setAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
                setSubmitted(false);
              }}
              variant="outline"
              size="lg"
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function SmallBusinessPlaybook({ playbook }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeInsight, setActiveInsight] = useState(0);

  const benefitIcons = [
    <TrendingUp key="1" className="w-6 h-6 text-golden-600" />,
    <Zap key="2" className="w-6 h-6 text-golden-600" />,
    <CheckCircle2 key="3" className="w-6 h-6 text-golden-600" />,
    <Clock key="4" className="w-6 h-6 text-golden-600" />,
    <BarChart3 key="5" className="w-6 h-6 text-golden-600" />,
    <Users key="6" className="w-6 h-6 text-golden-600" />,
    <Shield key="7" className="w-6 h-6 text-golden-600" />,
    <Target key="8" className="w-6 h-6 text-golden-600" />,
  ];

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:ml-56 space-y-20">

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <section id="overview" className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-80 md:h-[28rem] w-full">
            <Image
              src={playbook.hero.image}
              alt={playbook.hero.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/75 to-transparent flex items-center">
              <div className="max-w-2xl p-8 md:p-12 text-white space-y-4">
                <Badge variant="golden" className="bg-golden-500 text-white border-none">
                  AI Playbook · Small Business
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {playbook.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-xl">
                  {playbook.hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <TrendingUp className="w-4 h-4 text-golden-300" />
                    <span>ROI: {playbook.hero.roi}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-golden-300" />
                    <span>{playbook.hero.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Sparkles className="w-4 h-4 text-golden-300" />
                    <span>{playbook.hero.opportunitiesCount}+ Opportunities</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book AI Discovery Workshop
                  </Button>
                  <Button
                    href="#executive-summary"
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Read the Playbook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. EXECUTIVE SUMMARY ─────────────────────────────────────────── */}
        <section id="executive-summary">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-golden-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-golden-600" />
            </div>
            <Badge variant="golden" className="bg-golden-100 text-golden-700 border-golden-200">
              Executive Summary
            </Badge>
          </div>
          <div className="bg-gradient-to-br from-navy-950 to-navy-800 rounded-3xl p-8 md:p-12 text-white border border-golden-500/20 shadow-xl">
            <p className="text-golden-300 text-sm font-semibold uppercase tracking-widest mb-4">One-Page Overview</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Your AI Adoption Blueprint — <span className="text-golden-400">At a Glance</span>
            </h2>
            <p className="text-navy-200 text-lg mb-10 max-w-2xl">
              This playbook shows you exactly how Nisol Labs helps small businesses adopt AI strategically — from identifying your first opportunity to achieving measurable, compounding ROI.
            </p>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-0">
              {[
                { step: "Current Situation", detail: "We map your operations, tools, and bottlenecks", icon: <Target className="w-5 h-5" /> },
                { step: "Top 5 AI Opportunities", detail: "Ranked by speed-to-value for your business", icon: <Sparkles className="w-5 h-5" /> },
                { step: "Expected ROI", detail: "300–600% typical return within 12 months", icon: <TrendingUp className="w-5 h-5" /> },
                { step: "Implementation Timeline", detail: "First results in 2–3 weeks, full stack in 8 months", icon: <Clock className="w-5 h-5" /> },
                { step: "Recommended First Step", detail: "AI Discovery Workshop — free for qualified SMBs", icon: <ArrowRight className="w-5 h-5" /> },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center text-center px-3 py-4">
                    <div className="w-12 h-12 rounded-full bg-golden-500/20 border border-golden-500/40 flex items-center justify-center text-golden-300 mb-3">
                      {item.icon}
                    </div>
                    <p className="font-semibold text-white text-sm mb-1">{item.step}</p>
                    <p className="text-navy-300 text-xs">{item.detail}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-golden-500/50" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Start My AI Journey
              </Button>
              <Button href="/resources/roi-calculator" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Calculate My ROI
              </Button>
            </div>
          </div>
        </section>

        {/* ── 3. INDUSTRY STATISTICS ───────────────────────────────────────── */}
        <section id="industry-stats">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <Badge variant="navy" className="text-sm">
              Industry Statistics
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">The Numbers That Matter</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            AI adoption in small business is no longer emerging — it&apos;s mainstream. These are the benchmarks your competitors are already hitting.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {INDUSTRY_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-navy-100 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex justify-center mb-3 text-navy-400 group-hover:text-golden-500 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black golden-gradient-text mb-2">{stat.value}</div>
                <p className="text-sm text-navy-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. INDUSTRY CHALLENGES + BUSINESS IMPACT ─────────────────────── */}
        <section id="challenges">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-sm">
              Industry Challenges
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">We Understand Your World</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            These aren&apos;t generic business problems — they&apos;re the specific constraints we hear from small business owners every day. Recognise any?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {playbook.challenges.map((challenge, idx) => (
              <div key={idx} className="bg-white border border-navy-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="text-red-400 mt-0.5">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 text-sm">{challenge.title}</h3>
                    {challenge.description && (
                      <p className="text-xs text-navy-500 mt-1">{challenge.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Business Impact — cost of inaction */}
          <div className="bg-gradient-to-br from-red-950 to-red-900 rounded-3xl p-8 border border-red-700/30 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">The Cost of Inaction</h3>
            <p className="text-red-200 text-sm mb-6">
              Every month without AI is money left on the table. Here&apos;s what the data says about businesses that haven&apos;t started.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUSINESS_IMPACT.map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-black text-red-300 leading-none">{item.cost}</div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.area}</p>
                      <p className="text-red-200 text-xs mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button href="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Discuss Your Specific Challenges
              </Button>
            </div>
          </div>
        </section>

        {/* ── 5. CONSULTANT INSIGHTS ───────────────────────────────────────── */}
        <section id="insights">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-golden-100 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-golden-600" />
            </div>
            <Badge variant="golden" className="bg-golden-100 text-golden-700 border-golden-200">
              Consultant Insights
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-10">What We Tell Clients on Day One</h2>

          <div className="bg-white rounded-3xl border border-golden-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-golden-50 to-golden-100/50 p-8 md:p-10">
              <div className="flex gap-3 mb-2">
                <span className="text-xs font-semibold text-golden-700 uppercase tracking-widest bg-golden-200 px-3 py-1 rounded-full">
                  {CONSULTANT_INSIGHTS[activeInsight].context}
                </span>
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-navy-900 leading-relaxed italic">
                &ldquo;{CONSULTANT_INSIGHTS[activeInsight].quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-navy-500 font-medium">— Nisol Labs Principal Consultant</p>
            </div>
            <div className="flex border-t border-golden-200">
              {CONSULTANT_INSIGHTS.map((insight, i) => (
                <button
                  key={i}
                  onClick={() => setActiveInsight(i)}
                  className={`flex-1 py-3 text-xs font-medium transition-colors ${
                    activeInsight === i
                      ? "bg-golden-500 text-white"
                      : "text-navy-600 hover:bg-golden-50"
                  }`}
                >
                  {insight.context}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. AI OPPORTUNITIES ──────────────────────────────────────────── */}
        <section id="opportunities">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-sm">
              AI Opportunities
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">Where Value Can Be Created</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            These are the highest-impact AI opportunities we see for small businesses right now — mapped by business function and prioritised by speed-to-value.
          </p>

          {/* Business Function Coverage */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {BUSINESS_FUNCTIONS.map((fn, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-navy-100 p-4 hover:border-golden-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-navy-400 group-hover:text-golden-500 transition-colors">{fn.icon}</span>
                  <span className="font-semibold text-sm text-navy-800">{fn.label}</span>
                </div>
                <p className="text-xs text-navy-500">{fn.examples}</p>
              </div>
            ))}
          </div>

          {/* Opportunities Table */}
          <div className="overflow-x-auto rounded-2xl border border-navy-100 shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-navy-950 text-white">
                  <th className="px-5 py-3.5 text-left text-sm font-semibold">Department</th>
                  <th className="px-5 py-3.5 text-left text-sm font-semibold">AI Opportunity</th>
                  <th className="px-5 py-3.5 text-left text-sm font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody>
                {playbook.opportunities.map((op, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-navy-50"} hover:bg-golden-50 transition-colors`}>
                    <td className="px-5 py-3.5 text-sm text-navy-700 font-medium">{op.department}</td>
                    <td className="px-5 py-3.5 text-sm">
                      <span className="text-navy-900">{op.opportunity}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityColor(op.priority)}`}>
                        {op.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 7. PRIORITISATION ────────────────────────────────────────────── */}
        <section id="prioritisation">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-sm">
              Prioritisation
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">What Should Come First</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            We use the Nisol Priority Matrix to ensure your first AI investment creates visible value quickly — building internal confidence and momentum for what comes next.
          </p>

          {/* Featured Solutions — prioritised */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {playbook.featuredSolutions.map((sol, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl border border-navy-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-golden-500 text-white text-sm font-bold flex items-center justify-center shadow-md">
                  #{i + 1}
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-golden-100 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-golden-600" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950">{sol.title}</h3>
                </div>
                <div className="space-y-2.5 text-sm text-navy-700">
                  <div className="flex gap-2">
                    <span className="font-semibold text-navy-900 shrink-0 w-20">Problem:</span>
                    <span>{sol.businessProblem}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-navy-900 shrink-0 w-20">Solution:</span>
                    <span>{sol.solution}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-navy-900 shrink-0 w-20">Benefits:</span>
                    <span className="text-emerald-700 font-medium">{sol.benefits}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-navy-100 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex gap-3 text-xs text-navy-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {sol.timeline}
                    </span>
                    <span className="flex items-center gap-1 text-golden-600 font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" /> ROI {sol.roi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultant Callout Box */}
          <div className="bg-golden-50 border border-golden-200 rounded-2xl p-6 flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-golden-500 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-golden-800 mb-1">Consultant Insight</p>
              <p className="text-golden-900 text-sm leading-relaxed">
                Most small businesses don&apos;t need custom AI on day one. The fastest value usually comes from <strong>workflow automation and knowledge assistants</strong> — tools that work immediately with the content and data you already have.
              </p>
            </div>
          </div>
        </section>

        {/* ── 8. THE NISOL LABS METHODOLOGY (Process) ─────────────────────── */}
        <section id="methodology">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-navy-700" />
            </div>
            <Badge variant="navy" className="text-sm">
              Transformation Roadmap
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">How Nisol Labs Guides Your AI Journey</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            Every section of this playbook maps to a step in our proven 6-stage methodology. This is the process that turns AI curiosity into measurable business results.
          </p>

          <div className="space-y-4">
            {METHODOLOGY_STEPS.map((step, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-5 bg-white rounded-2xl border border-navy-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-golden-300 group"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-navy-950 group-hover:bg-golden-500 transition-colors flex items-center justify-center">
                    <span className="text-white font-black text-lg">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                    <h3 className="font-bold text-navy-950 text-lg">{step.title}</h3>
                    <span className="text-xs bg-navy-100 text-navy-600 px-3 py-1 rounded-full">{step.tag}</span>
                  </div>
                  <p className="text-navy-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < METHODOLOGY_STEPS.length - 1 && (
                  <div className="hidden sm:flex items-center">
                    <ChevronRight className="w-5 h-5 text-navy-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-10 bg-navy-50 rounded-2xl p-6">
            <h3 className="font-bold text-navy-950 mb-5">Your Implementation Timeline</h3>
            <div className="space-y-3">
              {playbook.roadmap.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 border-l-4 border-golden-500 pl-4 py-2">
                  <div className="min-w-[80px] font-semibold text-golden-700 text-sm">{item.month}</div>
                  <div className="text-navy-700 text-sm">{item.milestone}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button href="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Start Your AI Journey
              </Button>
            </div>
          </div>
        </section>

        {/* ── 9. AI READINESS SELF ASSESSMENT ─────────────────────────────── */}
        <section id="readiness">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-sm">
              AI Readiness Assessment
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">How Mature Is Your AI Readiness?</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            Take our 5-question quiz to get an instant score, understand where you stand versus peers, and receive a personalised recommended next step.
          </p>
          <ReadinessQuiz />
        </section>

        {/* ── 10. SUCCESS METRICS (Expected Outcomes) ──────────────────────── */}
        <section id="outcomes">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-sm">
              Expected Outcomes
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">Measurable Business Results</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            These are the typical outcomes Nisol Labs clients achieve. Not projections — these are averages drawn from our SMB client base.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {SUCCESS_METRICS.map((metric, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-navy-100 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex justify-center mb-3 text-navy-300 group-hover:text-golden-500 transition-colors">
                  {metric.icon}
                </div>
                <div className="text-4xl font-black golden-gradient-text mb-1">{metric.value}</div>
                <p className="font-semibold text-navy-800 text-sm">{metric.label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{metric.sub}</p>
              </div>
            ))}
          </div>

          {/* Business Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {playbook.businessBenefits.map((benefit, idx) => (
              <div key={idx} className="bg-white border border-navy-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-center mb-2 group-hover:text-golden-500 transition-colors">
                  {benefitIcons[idx % benefitIcons.length]}
                </div>
                <span className="text-sm font-medium text-navy-800">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 11. WHY NISOL LABS ───────────────────────────────────────────── */}
        <section id="why-nisol">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-golden-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-golden-600" />
            </div>
            <Badge variant="golden" className="bg-golden-100 text-golden-700 border-golden-200">
              Why Nisol Labs
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-3">Our Methodology. Our Differentiators.</h2>
          <p className="text-navy-600 mb-10 max-w-2xl">
            Any agency can sell you AI tools. Nisol Labs is the only SMB-focused AI consultancy that runs your transformation end-to-end — from strategy to live deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_NISOL.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-navy-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-golden-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-golden-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-1.5">{item.title}</h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Services */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-navy-950 mb-6">Our SMB Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {playbook.services.map((service, idx) => (
                <Link
                  key={idx}
                  href={service.link}
                  className="block border rounded-xl p-5 hover:shadow-md transition-shadow bg-white hover:border-golden-300 group"
                >
                  <h3 className="font-semibold text-navy-900 group-hover:text-golden-700 transition-colors">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-navy-600 mt-1">{service.description}</p>
                  )}
                  <span className="text-golden-600 text-sm inline-flex items-center mt-3 font-medium">
                    Learn More <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-navy-700" />
            </div>
            <Badge variant="navy" className="text-sm">
              FAQ
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-navy-950 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {playbook.faq.map((item, idx) => (
              <div key={idx} className="border border-navy-100 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-navy-50 transition-colors"
                >
                  <span className="font-medium text-navy-900 pr-4">{item.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-golden-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-navy-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-navy-700 text-sm leading-relaxed bg-navy-50/50">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 13. NEXT STEP — AI DISCOVERY WORKSHOP CTA ────────────────────── */}
        <section
          id="cta"
          className="bg-navy-950 text-white rounded-3xl p-10 lg:p-16 border border-golden-500/30 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Badge variant="golden" className="bg-golden-500 text-white border-none">
              Your Next Step
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Book Your <span className="text-golden-400">AI Discovery Workshop</span>
            </h2>
            <p className="text-navy-200 text-lg max-w-lg mx-auto">
              A focused 2-hour session where Nisol Labs consultants map your operations, identify your top 5 AI opportunities, and hand you a prioritised roadmap — ready to execute.
            </p>

            <div className="grid grid-cols-3 gap-4 text-left mt-4 mb-6">
              {[
                { icon: <Clock className="w-4 h-4 text-golden-400" />, text: "2-hour virtual or in-person session" },
                { icon: <Target className="w-4 h-4 text-golden-400" />, text: "Top 5 AI opportunities identified" },
                { icon: <CheckCircle2 className="w-4 h-4 text-golden-400" />, text: "Prioritised roadmap delivered same day" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                  <span className="shrink-0">{item.icon}</span>
                  <span className="text-sm text-white/90">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book AI Discovery Workshop
              </Button>
              <Button
                href="/resources/roi-calculator"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Calculate Your ROI First
              </Button>
            </div>

            <p className="text-navy-400 text-xs mt-4">
              No commitment required. Available for qualified SMBs with 5–500 employees.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
