// components/playbooks/PlaybookPageTemplate.tsx
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
  Building2,
  Wrench,
  Zap,
  BarChart3,
  Users,
  Shield,
  Sparkles,
  Target,
  Layers
} from "lucide-react";

// Types
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
  challenges: {
    title: string;
    icon?: React.ReactNode;
    description?: string;
  }[];
  opportunities: {
    department: string;
    opportunity: string;
    priority: 'High' | 'Medium' | 'Low';
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
  roadmap: {
    month: string;
    milestone: string;
  }[];
  businessBenefits: string[];
  services: {
    name: string;
    description?: string;
    link: string;
  }[];
  faq: { q: string; a: string }[];
}

interface Props {
  playbook: Playbook;
}

// Helper: priority badge colour
const priorityColor = (p: string) => {
  if (p === 'High') return 'bg-red-100 text-red-800';
  if (p === 'Medium') return 'bg-yellow-100 text-yellow-800';
  return 'bg-blue-100 text-blue-800';
};

export function PlaybookPageTemplate({ playbook }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');

  // Scroll to section (simple anchor)
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  // Icon mapping for benefits (you can expand)
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
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    

      <div className="lg:ml-56 space-y-16">
        {/* 1. HERO */}
        
        <section id="overview" className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-80 md:h-96 w-full">
            <Image
              src={playbook.hero.image}
              alt={playbook.hero.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-transparent flex items-center">
              <div className="max-w-2xl p-8 md:p-12 text-white space-y-4">
                <Badge variant="golden" className="bg-golden-500 text-white border-none">
                  AI Playbook
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {playbook.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-xl">
                  {playbook.hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span>ROI: {playbook.hero.roi}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{playbook.hero.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span>{playbook.hero.opportunitiesCount}+ Opportunities</span>
                  </div>
                </div>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="mt-4"
                >
                  Book AI Discovery Workshop
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PURPOSE */}
        <section>
          <h2 className="text-2xl font-bold text-navy-950 mb-4">Why This Playbook</h2>
          <div className="prose prose-lg text-navy-700 max-w-3xl">
            {playbook.purpose.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* 3. INDUSTRY CHALLENGES */}
        <section id="challenges">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">Industry Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {playbook.challenges.map((challenge, idx) => (
              <div key={idx} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">
                    {challenge.icon || <Wrench className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{challenge.title}</h3>
                    {challenge.description && (
                      <p className="text-sm text-navy-600 mt-1">{challenge.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button href="/contact" variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
              Discuss Your Challenges
            </Button>
          </div>
        </section>

        {/* 4. AI OPPORTUNITIES */}
        <section id="opportunities">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">AI Opportunities</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-navy-100">
                  <th className="border border-navy-200 px-4 py-2 text-left text-navy-800">Department</th>
                  <th className="border border-navy-200 px-4 py-2 text-left text-navy-800">Opportunity</th>
                  <th className="border border-navy-200 px-4 py-2 text-left text-navy-800">Priority</th>
                </tr>
              </thead>
              <tbody>
                {playbook.opportunities.map((op, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-navy-50'}>
                    <td className="border border-navy-200 px-4 py-2">{op.department}</td>
                    <td className="border border-navy-200 px-4 py-2">
                      <Link href={`/opportunities/${op.slug}`} className="text-golden-600 hover:underline">
                        {op.opportunity}
                      </Link>
                    </td>
                    <td className="border border-navy-200 px-4 py-2">
                      <Badge variant="outline" className={priorityColor(op.priority)}>
                        {op.priority}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. FEATURED SOLUTIONS */}
        <section id="solutions">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">Featured Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playbook.featuredSolutions.map((sol, i) => (
              <div key={i} className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-navy-950 mb-3">{sol.title}</h3>
                <div className="space-y-2 text-sm text-navy-700">
                  <p><span className="font-medium">Problem:</span> {sol.businessProblem}</p>
                  <p><span className="font-medium">Solution:</span> {sol.solution}</p>
                  <p><span className="font-medium">Benefits:</span> {sol.benefits}</p>
                  <p><span className="font-medium">Technology:</span> {sol.technology}</p>
                  <p><span className="font-medium">Timeline:</span> {sol.timeline}</p>
                  <p><span className="font-medium">ROI:</span> {sol.roi}</p>
                </div>
                <div className="mt-4">
                  <Button
                    href={`/solutions/${sol.slug}`}
                    variant="secondary"
                    size="sm"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. AI MATURITY JOURNEY */}
        <section id="maturity">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">AI Maturity Journey</h2>
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
            {playbook.maturityJourney.map((stage, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-golden-100 flex items-center justify-center text-golden-700 font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium text-navy-800 mt-2">{stage}</span>
                </div>
                {idx < playbook.maturityJourney.length - 1 && (
                  <div className="hidden md:block w-12 h-0.5 bg-golden-300" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm text-navy-500 text-center mt-4">
            Where is your organisation today?
          </p>
        </section>

        {/* 7. TRANSFORMATION ROADMAP */}
        <section id="roadmap">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">Transformation Roadmap</h2>
          <div className="space-y-4">
            {playbook.roadmap.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 border-l-4 border-golden-500 pl-4 py-2">
                <div className="min-w-[100px] font-semibold text-navy-800">{item.month}</div>
                <div>{item.milestone}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button href="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Start Your AI Journey
            </Button>
          </div>
        </section>

        {/* 8. BUSINESS BENEFITS */}
        <section id="benefits">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">Business Benefits</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playbook.businessBenefits.map((benefit, idx) => (
              <div key={idx} className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-2">
                  {benefitIcons[idx % benefitIcons.length]}
                </div>
                <span className="text-sm font-medium text-navy-800">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 9. RECOMMENDED SERVICES */}
        <section id="services">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">Recommended Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {playbook.services.map((service, idx) => (
              <Link key={idx} href={service.link} className="block border rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                <h3 className="font-semibold text-navy-900">{service.name}</h3>
                {service.description && (
                  <p className="text-sm text-navy-600 mt-1">{service.description}</p>
                )}
                <span className="text-golden-600 text-sm inline-flex items-center mt-2">
                  Learn More <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 10. RELATED RESOURCES (optional, but good for SEO) */}
        <section>
          <h2 className="text-2xl font-bold text-navy-950 mb-4">Related Resources</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="navy" className="text-sm">Blueprint: DevOps Pipeline</Badge>
            <Badge variant="navy" className="text-sm">Case Study: Manufacturing</Badge>
            <Badge variant="navy" className="text-sm">Blog: AI in Production</Badge>
            <Badge variant="navy" className="text-sm">ROI Calculator</Badge>
          </div>
        </section>

        {/* 11. FAQ */}
        <section id="faq">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {playbook.faq.map((item, idx) => (
              <div key={idx} className="border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-navy-50 transition-colors"
                >
                  <span className="font-medium text-navy-900">{item.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-navy-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-navy-500" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-navy-700">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 12. FINAL CTA */}
        <section id="cta" className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 border border-golden-500/30 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Badge variant="golden" className="bg-golden-500 text-white border-none">
              Ready to Transform Your {playbook.industry} Business?
            </Badge>
            <h3 className="text-3xl font-black">Book a 2‑Hour AI Strategy Session</h3>
            <p className="text-navy-200 text-sm max-w-md mx-auto">
              Our principal engineers will outline your implementation blueprint and identify quick‑win opportunities.
            </p>
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
                Calculate Your ROI
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
