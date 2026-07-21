"use client";

import React, { useState } from "react";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Zap,
  FileText,
  LayoutTemplate,
  Users,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Stage Data
const stages = [
  {
    id: "discover",
    icon: Search,
    title: "Discover",
    subtitle: "Identify High-Impact AI Opportunities",
    description:
      "Understand your business, processes, and challenges before selecting AI solutions.",
    activities: [
      "AI Discovery Workshop",
      "Business Process Assessment",
      "AI Readiness Assessment",
      "Stakeholder Interviews",
      "Data Readiness Review",
    ],
    deliverables: [
      "AI Opportunity Report",
      "AI Maturity Score",
      "Business Priorities",
      "ROI Estimates",
    ],
    link: "/services/strategy",
  },
  {
    id: "design",
    icon: PenTool,
    title: "Design",
    subtitle: "Build an AI Transformation Roadmap",
    description:
      "Design practical AI solutions aligned with business goals.",
    activities: [
      "Solution Architecture",
      "AI Agent Design",
      "RAG Architecture",
      "Security Review",
      "Technology Selection",
    ],
    deliverables: [
      "Solution Blueprint",
      "Architecture Diagram",
      "Project Roadmap",
      "Cost Estimation",
    ],
    link: "/resources/blueprints",
  },
  {
    id: "develop",
    icon: Code2,
    title: "Develop",
    subtitle: "Build Production-Ready AI Solutions",
    description:
      "Develop enterprise-grade AI systems with governance, monitoring, and security built in.",
    activities: [
      "AI Assistants",
      "AI Agents",
      "Enterprise RAG",
      "Workflow Automation",
      "AI Engineering",
      "MCP Integrations",
      "Custom Dashboards",
    ],
    deliverables: [
      "Working AI Solution",
      "Documentation",
      "Test Reports",
      "Deployment Package",
    ],
    link: "/services",
  },
  {
    id: "deploy",
    icon: Rocket,
    title: "Deploy",
    subtitle: "Launch Securely Into Production",
    description:
      "Deploy AI solutions with security, monitoring, and governance from day one.",
    activities: [
      "Production Deployment",
      "User Training",
      "Security Validation",
      "Monitoring Setup",
      "LLMOps Configuration",
    ],
    deliverables: [
      "Live AI System",
      "Monitoring Dashboards",
      "User Guides",
      "Governance Documentation",
    ],
    link: "/services/engineering",
  },
  {
    id: "optimize",
    icon: BarChart3,
    title: "Optimize",
    subtitle: "Continuously Improve AI Performance",
    description:
      "AI isn't a one-time project. It evolves. We continuously improve performance.",
    activities: [
      "Model Evaluation",
      "Prompt Optimization",
      "Cost Optimization",
      "AI Observability",
      "User Feedback",
      "Continuous Improvement",
    ],
    deliverables: [
      "Better Accuracy",
      "Lower Token Costs",
      "Higher User Adoption",
      "Continuous ROI",
    ],
    link: "/resources/roi-calculator",
  },
];

// Engagement Deliverables
const deliverables = [
  { icon: FileText, label: "AI Discovery Report" },
  { icon: LayoutTemplate, label: "Solution Blueprint" },
  { icon: CheckCircle2, label: "Production-Ready Implementation" },
  { icon: FileText, label: "Documentation" },
  { icon: Users, label: "Knowledge Transfer" },
  { icon: TrendingUp, label: "Ongoing Optimization" },
];

export function AITransformationFramework() {
  const [activeStage, setActiveStage] = useState(stages[0].id);

  // Find the current stage object
  const currentStage = stages.find((s) => s.id === activeStage) || stages[0];
  const currentIndex = stages.findIndex((s) => s.id === activeStage);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="golden" className="mx-auto">
            Our Signature Framework
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 mt-4 leading-tight">
            The Nisol AI Transformation Framework™
          </h2>
          <p className="text-navy-700/80 text-lg mt-4">
            From AI Strategy to Measurable Business Outcomes
          </p>
          <p className="text-sm text-navy-600/70 mt-2 max-w-xl mx-auto">
            Every successful AI initiative follows a structured journey. We help
            organizations move from identifying opportunities to deploying
            secure, scalable, production-ready AI solutions.
          </p>
        </div>

        {/* Visual Tagline */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-200">
            <span className="text-sm font-semibold text-navy-700">Think.</span>
            <span className="w-1 h-1 rounded-full bg-golden-500" />
            <span className="text-sm font-semibold text-navy-700">Build.</span>
            <span className="w-1 h-1 rounded-full bg-golden-500" />
            <span className="text-sm font-semibold text-navy-700">Scale.</span>
            <span className="w-1 h-1 rounded-full bg-golden-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-golden-500 to-golden-600 bg-clip-text text-transparent">
              Differentiate.
            </span>
          </div>
        </div>

        {/* Horizontal Stepper - Desktop */}
        <div className="hidden lg:block relative mb-16">
          {/* Connecting Line */}
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-slate-200">
            <div
              className="h-full bg-gradient-to-r from-golden-500 via-golden-400 to-golden-500 transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / stages.length) * 100}%`,
              }}
            />
          </div>

          <div className="flex justify-between relative">
            {stages.map((stage, idx) => {
              const isActive = activeStage === stage.id;
              const isCompleted = idx <= currentIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className="flex flex-col items-center group relative z-10 cursor-pointer"
                  style={{ width: `${100 / stages.length}%` }}
                >
                  {/* Circle */}
                  <div
                    className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${
                        isActive || isCompleted
                          ? "bg-golden-500 shadow-lg shadow-golden-500/30"
                          : "bg-slate-200 group-hover:bg-slate-300"
                      }
                    `}
                  >
                    <stage.icon
                      className={`
                        w-8 h-8 transition-all duration-300
                        ${
                          isActive || isCompleted
                            ? "text-white"
                            : "text-slate-500 group-hover:text-slate-700"
                        }
                      `}
                    />
                  </div>

                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p
                      className={`
                        text-sm font-bold transition-colors duration-300
                        ${isActive ? "text-golden-600" : "text-navy-700"}
                      `}
                    >
                      {stage.title}
                    </p>
                    <p className="text-xs text-navy-500 hidden xl:block">
                      {stage.subtitle.split(" ").slice(0, 3).join(" ")}...
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Stepper - Cards */}
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-12">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`
                flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
                ${
                  activeStage === stage.id
                    ? "border-golden-500 bg-white shadow-md"
                    : "border-transparent bg-white/80 hover:bg-white"
                }
              `}
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center shrink-0
                  ${
                    activeStage === stage.id
                      ? "bg-golden-500"
                      : "bg-slate-100"
                  }
                `}
              >
                <stage.icon
                  className={`
                    w-6 h-6
                    ${
                      activeStage === stage.id
                        ? "text-white"
                        : "text-slate-500"
                    }
                  `}
                />
              </div>
              <div>
                <p
                  className={`
                    font-bold text-sm
                    ${
                      activeStage === stage.id
                        ? "text-golden-600"
                        : "text-navy-700"
                    }
                  `}
                >
                  {stage.title}
                </p>
                <p className="text-xs text-navy-500">
                  {stage.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Details — NO ANIMATION, just simple conditional render */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-golden-500/10 flex items-center justify-center shrink-0">
              <currentStage.icon className="w-7 h-7 text-golden-600" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-2xl font-bold text-navy-950">
                  Stage {currentIndex + 1}: {currentStage.title}
                </h3>
                <Badge variant="golden" className="text-xs">
                  {currentStage.subtitle}
                </Badge>
              </div>
              <p className="text-navy-600 mt-1">
                {currentStage.description}
              </p>
            </div>
          </div>

          {/* Two-Column Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Activities */}
            <div className="bg-navy-50 rounded-xl p-6">
              <h4 className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-golden-500" />
                Activities
              </h4>
              <ul className="space-y-2">
                {currentStage.activities.map((activity, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-navy-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-golden-500" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="bg-emerald-50 rounded-xl p-6">
              <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Deliverables
              </h4>
              <ul className="space-y-2">
                {currentStage.deliverables.map((deliverable, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-navy-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-navy-500">
              <span className="font-semibold text-navy-700">Learn more:</span>{" "}
              Explore how we deliver value at this stage
            </span>
            <Button
              href={currentStage.link}
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore {currentStage.title}
            </Button>
          </div>
        </div>

        {/* Bottom: Every Engagement Delivers */}
        <div className="mt-16 bg-navy-950 rounded-2xl p-8 md:p-10 border border-golden-500/20">
          <div className="text-center mb-8">
            <Badge className="bg-golden-500/10 text-golden-400 border-golden-500/20 mx-auto">
              Every Engagement Delivers
            </Badge>
            <h3 className="text-2xl font-bold text-white mt-3">
              Comprehensive AI Transformation
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-navy-800/50 rounded-xl p-4 text-center border border-navy-700 hover:border-golden-500/30 transition-all hover:bg-navy-800"
              >
                <item.icon className="w-6 h-6 text-golden-400 mx-auto mb-2" />
                <span className="text-xs text-white font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Framework Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-navy-500">
            The Nisol AI Transformation Framework™ —{" "}
            <span className="text-navy-700 font-medium">
              Think. Build. Scale. Differentiate.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}