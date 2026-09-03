"use client";

import React, { useState } from "react";
import { Mail, ShieldCheck, Clock, CheckCircle2, ArrowRight, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    interestPillar: "agents",
    budgetRange: "$25k - $50k",
    message: ""
  });

  const sendAuditRequest = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.workEmail || !formData.companyName) {
      setErrorMessage("Please fill in all required fields (*).");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || "Failed to send request. Check your API route logs.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">Apply for Discovery</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Apply for a <br />
          <span className="golden-gradient-text">Discovery Session</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          We partner with 5 new enterprises each month. Tell us about your organization to see if we are the right fit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950">Application Received</h3>
              <p className="text-sm text-navy-700 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your application is under review. A senior Nisol AI Architect will personally reach out within 48 hours.
              </p>
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      workEmail: "",
                      companyName: "",
                      interestPillar: "discovery",
                      budgetRange: "Nisol One",
                      message: ""
                    });
                  }} 
                  variant="navy" 
                  size="md"
                >
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); sendAuditRequest(); }} className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy-950">
                  Organization Application
                </h2>
                <span className="text-xs font-semibold text-golden-600 bg-golden-50 px-2.5 py-1 rounded-full border border-golden-200">
                  Selective 5 Partners / Mo
                </span>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Enterprise Solutions"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  What is the primary challenge or opportunity you want AI to address? <span className="text-slate-400 font-normal lowercase">(Optional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. We want to reduce document processing time, automate internal knowledge retrieval, or cut token spend..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                />
              </div>

              <div onClick={sendAuditRequest}>
                <Button 
                  type="button" 
                  variant="primary" 
                  size="lg" 
                  disabled={loading}
                  className="w-full justify-center cursor-pointer font-bold" 
                  icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                >
                  {loading ? "Submitting Application..." : "Submit Application →"}
                </Button>
              </div>
              <p className="text-[11px] text-center text-slate-500 font-medium">
                🔒 Strict Confidentiality Guaranteed • Mutual NDA provided prior to technical review
              </p>
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
                  <span>contact@nisolai.com</span>
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