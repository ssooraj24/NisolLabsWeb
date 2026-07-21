"use client";

import React, { useState } from "react";
import { Mail, ShieldCheck, Clock, CheckCircle2, ArrowRight, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    interestPillar: "agents",
    budgetRange: "$25k - $50k",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">Executive Consultation</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Book an Enterprise <br />
          <span className="golden-gradient-text">AI Discovery Session</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          Speak directly with our senior AI architects. Receive an initial technical feasibility audit and structured adoption timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950">Discovery Request Received</h3>
              <p className="text-sm text-navy-700 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. A senior Nisol Labs AI Architect will review your requirements and reach out within 24 business hours.
              </p>
              <div className="pt-4">
                <Button onClick={() => setSubmitted(false)} variant="navy" size="md">
                  Submit Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-bold text-navy-950 mb-4 border-b border-slate-200 pb-3">
                Project & Organization Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Organization / Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Health Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Primary AI Pillar</label>
                  <select
                    value={formData.interestPillar}
                    onChange={(e) => setFormData({ ...formData, interestPillar: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white font-medium"
                  >
                    <option value="agents">Autonomous AI Agents (Flagship)</option>
                    <option value="engineering">AI Engineering & LLMOps (Differentiator)</option>
                    <option value="strategy">AI Strategy & Discovery</option>
                    <option value="assistants">Enterprise AI Assistants (RAG)</option>
                    <option value="automation">AI-Powered Automation (IDP)</option>
                    <option value="data-readiness">Data Readiness for AI</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Project Budget Scope</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white font-medium"
                >
                  <option value="$15k - $25k">$15,000 - $25,000 (Initial PoC)</option>
                  <option value="$25k - $50k">$25,000 - $50,000 (Multi-Agent System)</option>
                  <option value="$50k - $100k">$50,000 - $100,000 (Full Enterprise Platform)</option>
                  <option value="$100k+">$100,000+ (Custom Transformation)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Project Goals & Context</label>
                <textarea
                  rows={4}
                  placeholder="Describe your current bottlenecks, target workflows, or data environment..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                Request Confidential AI Audit
              </Button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Info & Security Commitments */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/30 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-golden-400" />
              Direct Engagement Model
            </h3>

            <div className="space-y-4 text-xs text-navy-200">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-golden-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-bold block">24-Hour Response SLA</strong>
                  <span>Every inquiry is routed directly to a senior AI systems architect.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-bold block">Strict Non-Disclosure Guarantee</strong>
                  <span>Mutual NDAs provided prior to reviewing proprietary dataset samples.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-golden-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-bold block">Direct Email</strong>
                  <span>contact@nisollabs.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-navy-950">Prefer an Immediate ROI Estimate?</h4>
            <p className="text-xs text-navy-700">
              Use our interactive calculator to forecast annual cost savings and productivity gains before your call.
            </p>
            <Button href="/resources/roi-calculator" variant="navy" size="sm" className="w-full justify-center">
              Open ROI Calculator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
