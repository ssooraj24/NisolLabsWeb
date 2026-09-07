import React from "react";
import { Metadata } from "next";
import { ReadinessQuiz } from "@/components/discovery/ReadinessQuiz";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Clock, ShieldCheck, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive AI Readiness Self-Assessment | Nisol AI",
  description: "Evaluate your enterprise AI maturity in 2 minutes across Strategy, Data Architecture, Security, and Engineering. Instant maturity score and actionable roadmap.",
};

export default function AssessmentPage() {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">Executive Self-Assessment</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight">
          How Ready is Your Enterprise <br />
          <span className="golden-gradient-text">for Autonomous AI?</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed font-normal">
          Answer 6 rapid architectural questions to receive your instant AI Maturity Score (0–100), bottleneck diagnosis, and recommended engagement tier.
        </p>

        {/* Quick Signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-golden-500" />
            <span>Takes 2 Minutes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Anonymous & Free</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-navy-900" />
            <span>Instant Executive Diagnosis</span>
          </div>
        </div>
      </div>

      {/* Quiz Container */}
      <ReadinessQuiz />
    </div>
  );
}
