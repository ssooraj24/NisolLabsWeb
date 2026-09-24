"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  ChevronDown, 
  Sparkles, 
  Mail, 
  Clock, 
  AlertCircle,
  Building2,
  Cpu,
  Download,
  ExternalLink,
  FileText
} from "lucide-react";

const ROLES = [
  "CTO",
  "CEO",
  "COO",
  "CFO",
  "VP Engineering",
  "Head of AI",
  "Other"
];

const ENTERPRISE_SIZES = [
  "500–2,000 employees",
  "2,000–10,000 employees",
  "10,000+ / $50M+ revenue",
  "$500M+ revenue"
];

function VelvetRopeContactContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams ? searchParams.get("type") : null;
  const tierParam = searchParams ? searchParams.get("tier") : null;
  const needParam = searchParams ? searchParams.get("need") : null;

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    role: "",
    size: "",
    need: "360", // default to 360 or score based on url
    ownership: "yes", // 'yes' | 'no' | ''
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  useEffect(() => {
    if (typeParam === "score" || needParam === "score") {
      setFormData(prev => ({ ...prev, need: "score" }));
    } else if (typeParam === "360" || tierParam || needParam === "360") {
      setFormData(prev => ({ ...prev, need: "360" }));
    }
    setApplicationId(`NIS-${Math.floor(1000 + Math.random() * 9000)}`);
  }, [typeParam, tierParam, needParam]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    
    if (!formData.workEmail.trim()) {
      errs.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = "Enter a valid corporate email.";
    } else if (/gmail|yahoo|hotmail|outlook/i.test(formData.workEmail)) {
      errs.workEmail = "Please use your company email. Generic mailboxes are filtered.";
    }

    if (!formData.company.trim()) errs.company = "Company & website required.";
    if (!formData.role) errs.role = "Select your role.";
    if (!formData.size) errs.size = "Select enterprise size.";
    if (!formData.need) errs.need = "Choose Nisol Score™ or Nisol 360™.";
    if (!formData.ownership) errs.ownership = "Please confirm ownership intent.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Send to existing email API route with structured metadata
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          workEmail: formData.workEmail,
          companyName: formData.company,
          interestPillar: formData.need === "360" ? "Nisol 360™ Architecture" : "Nisol Score™ Benchmark",
          budgetRange: formData.need === "360" ? "Nisol 360™ (7-Day Architecture)" : "Nisol Score™ (Delivered within Nisol 360™)",
          message: `[Velvet Rope Application ${applicationId}]\nRole: ${formData.role}\nSize: ${formData.size}\nIntent: ${formData.need === "360" ? "Nisol 360™" : "Nisol Score™"}\nOwnership Intent: ${formData.ownership}\nMessage: ${formData.message || "None provided"}`
        }),
      });
    } catch (err) {
      console.warn("Telemetry submission notice:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0C1731] text-white min-h-screen selection:bg-[#D4A24E]/30 selection:text-[#FBF8F3]">
      
      {/* 1. HERO: VELVET ROPE FILTER INTRO */}
      <section className="relative pt-12 lg:pt-20 pb-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(212,162,78,0.1),_transparent_70%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Scarcity Ticker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#D4A24E]/30 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#D4A24E] animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-widest text-[#D4A24E] uppercase">
              APPLICATION • 5 PER MONTH • 48H REVIEW
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FBF8F3] leading-[1.05]">
            Apply for <span className="text-[#D4A24E]">Nisol 360™</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We architect 5 blueprints per month. Applications reviewed directly by master enterprise architects within 48 hours. Mutual NDA provided.
          </p>

          {/* Velvet Rope Scarcity Bar */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D4A24E]/40 bg-[#101D3D] px-5 py-2 shadow-lg">
              <span className="text-xs sm:text-sm font-bold text-[#FBF8F3]">
                Cohort: 2/5 Engagements Left
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-xs sm:text-sm font-medium text-[#D4A24E] font-mono">
                Next review: 48 hours
              </span>
            </div>
          </div>

          {/* Micro-guarantees */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E]" /> Strict Non-Disclosure
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E]" /> Client Infra Pass-Through
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E]" /> No juniors. Ever.
            </span>
          </div>

        </div>
      </section>

      {/* 2. THE APPLICATION FORM CONTAINER */}
      <section className="py-16 sm:py-24 bg-[#101D3D] border-b border-white/10 relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="bg-[#0C1731] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A24E] to-transparent" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#D4A24E]/10 blur-3xl" />

            {!submitted ? (
              <div>
                {/* Form Header */}
                <div className="flex items-start justify-between pb-6 border-b border-white/10">
                  <div>
                    <h2 className="text-2xl font-bold text-[#FBF8F3]">
                      Application
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400 font-mono">
                      6 fields. 90 seconds. No spam.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-[#D4A24E]">
                    <span className="w-2 h-2 rounded-full bg-[#D4A24E] animate-pulse" />
                    <span>Live Review</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  
                  {/* Field 1: Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full bg-[#101D3D] text-[#FBF8F3] placeholder:text-slate-500 rounded-xl px-4 py-3.5 text-sm border outline-none transition-colors ${
                        errors.fullName ? "border-[#D4A24E] ring-1 ring-[#D4A24E]/30" : "border-white/15 focus:border-[#D4A24E]"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs font-medium text-[#D4A24E]">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Field 2: Work Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full bg-[#101D3D] text-[#FBF8F3] placeholder:text-slate-500 rounded-xl px-4 py-3.5 text-sm border outline-none transition-colors ${
                        errors.workEmail ? "border-[#D4A24E] ring-1 ring-[#D4A24E]/30" : "border-white/15 focus:border-[#D4A24E]"
                      }`}
                    />
                    {errors.workEmail && (
                      <p className="text-xs font-medium text-[#D4A24E] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.workEmail}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 3: Company + Website */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Company &amp; Website *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp • acme.com"
                      className={`w-full bg-[#101D3D] text-[#FBF8F3] placeholder:text-slate-500 rounded-xl px-4 py-3.5 text-sm border outline-none transition-colors ${
                        errors.company ? "border-[#D4A24E] ring-1 ring-[#D4A24E]/30" : "border-white/15 focus:border-[#D4A24E]"
                      }`}
                    />
                    {errors.company && (
                      <p className="text-xs font-medium text-[#D4A24E]">{errors.company}</p>
                    )}
                  </div>

                  {/* Field 4 & 5: Role & Size in 2 Cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Role Dropdown */}
                    <div className="space-y-1.5 relative">
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                        Role *
                      </label>
                      <button
                        type="button"
                        onClick={() => { setRoleDropdownOpen(!roleDropdownOpen); setSizeDropdownOpen(false); }}
                        className={`w-full text-left bg-[#101D3D] text-sm rounded-xl px-4 py-3.5 flex items-center justify-between border transition-all ${
                          errors.role ? "border-[#D4A24E]" : "border-white/15 hover:border-white/30"
                        }`}
                      >
                        <span className={formData.role ? "text-[#FBF8F3] font-medium" : "text-slate-500"}>
                          {formData.role || "Select role"}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-[#D4A24E] transition-transform ${roleDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {roleDropdownOpen && (
                        <div className="absolute z-20 mt-1 w-full bg-[#101D3D] rounded-xl border border-white/20 shadow-2xl p-1.5 space-y-0.5">
                          {ROLES.map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => { setFormData({ ...formData, role: r }); setRoleDropdownOpen(false); }}
                              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                                formData.role === r ? "bg-[#D4A24E] text-[#0C1731] font-bold" : "text-slate-200 hover:bg-white/10"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.role && <p className="text-xs text-[#D4A24E]">{errors.role}</p>}
                    </div>

                    {/* Size Dropdown */}
                    <div className="space-y-1.5 relative">
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                        Enterprise Size *
                      </label>
                      <button
                        type="button"
                        onClick={() => { setSizeDropdownOpen(!sizeDropdownOpen); setRoleDropdownOpen(false); }}
                        className={`w-full text-left bg-[#101D3D] text-sm rounded-xl px-4 py-3.5 flex items-center justify-between border transition-all ${
                          errors.size ? "border-[#D4A24E]" : "border-white/15 hover:border-white/30"
                        }`}
                      >
                        <span className={formData.size ? "text-[#FBF8F3] font-medium truncate" : "text-slate-500"}>
                          {formData.size || "Select size"}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-[#D4A24E] transition-transform ${sizeDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {sizeDropdownOpen && (
                        <div className="absolute z-20 mt-1 w-full bg-[#101D3D] rounded-xl border border-white/20 shadow-2xl p-1.5 space-y-0.5">
                          {ENTERPRISE_SIZES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => { setFormData({ ...formData, size: s }); setSizeDropdownOpen(false); }}
                              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                                formData.size === s ? "bg-[#D4A24E] text-[#0C1731] font-bold" : "text-slate-200 hover:bg-white/10"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.size && <p className="text-xs text-[#D4A24E]">{errors.size}</p>}
                    </div>

                  </div>

                  {/* Field 6: What do you need? (2-Card Selector) */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      What do you need? *
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      
                      {/* Option 1: Nisol Score */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, need: "score" })}
                        className={`text-left w-full rounded-2xl border p-4.5 transition-all flex items-start gap-4 ${
                          formData.need === "score"
                            ? "bg-[#1B2D5B]/70 border-[#D4A24E] shadow-lg shadow-[#D4A24E]/10"
                            : "bg-[#101D3D]/80 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`mt-1 w-4 h-4 rounded-full border grid place-items-center shrink-0 ${
                          formData.need === "score" ? "border-[#D4A24E] bg-[#D4A24E]" : "border-slate-400"
                        }`}>
                          {formData.need === "score" && <span className="w-1.5 h-1.5 rounded-full bg-[#0C1731]" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#FBF8F3]">AI Maturity Audit (Nisol Score™)</span>
                            <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ARCHITECT-VALIDATED • 62 DIMENSIONS
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            AI Maturity Audit across 15 capabilities vs 8 industries • Architect-validated baseline included in Nisol 360™
                          </p>
                        </div>
                      </button>

                      {/* Option 2: Nisol 360 */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, need: "360" })}
                        className={`text-left w-full rounded-2xl border p-4.5 transition-all flex items-start gap-4 ${
                          formData.need === "360"
                            ? "bg-[#1B2D5B]/70 border-[#D4A24E] shadow-lg shadow-[#D4A24E]/10"
                            : "bg-[#101D3D]/80 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`mt-1 w-4 h-4 rounded-full border grid place-items-center shrink-0 ${
                          formData.need === "360" ? "border-[#D4A24E] bg-[#D4A24E]" : "border-slate-400"
                        }`}>
                          {formData.need === "360" && <span className="w-1.5 h-1.5 rounded-full bg-[#0C1731]" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#FBF8F3]">AI Transformation Architecture (Nisol 360™)</span>
                            <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#D4A24E] text-[#0C1731]">
                              7 DAYS • 5/MO
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            Complete Transformation Architecture • Spark / One / Pro / Enterprise • 30-360 Roadmap • CFO Model • 4 Gates
                          </p>
                        </div>
                      </button>

                    </div>
                  </div>

                  {/* Field 7: Velvet Rope Filter — Most Important */}
                  <div className="pt-2">
                    <div className="rounded-2xl border border-[#D4A24E]/60 bg-[#1B2D5B]/50 p-5 shadow-inner">
                      <div className="text-[11px] font-bold font-mono tracking-widest uppercase text-[#D4A24E] flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>PREMIUM FILTER • MOST IMPORTANT</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#FBF8F3] leading-snug">
                        Are you willing to own your blueprint and build with anyone?
                      </p>
                      <div className="mt-3 flex gap-3">
                        {["yes", "no"].map((val) => {
                          const isSelected = formData.ownership === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setFormData({ ...formData, ownership: val })}
                              className={`flex-1 rounded-xl border py-2.5 text-xs font-bold font-mono uppercase transition-all ${
                                isSelected
                                  ? "bg-[#D4A24E] border-[#D4A24E] text-[#0C1731]"
                                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                              }`}
                            >
                              {val === "yes" ? "Yes — We Own It" : "No — We Want Vendor Dependency"}
                            </button>
                          );
                        })}
                      </div>

                      {formData.ownership === "no" && (
                        <div className="mt-3 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300 leading-relaxed">
                          Nisol 360™ is built exclusively for enterprises who want 100% architecture ownership with zero vendor lock-in. If your governance mandates vendor dependency, we are not the right fit.
                        </div>
                      )}
                      {errors.ownership && (
                        <p className="mt-2 text-xs text-[#D4A24E]">{errors.ownership}</p>
                      )}
                    </div>
                  </div>

                  {/* Field 8: Message (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What is your north-star EBITDA or efficiency metric? (Optional)"
                      className="w-full bg-[#101D3D] text-[#FBF8F3] placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm border border-white/15 focus:border-[#D4A24E] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-[#D4A24E] text-[#0C1731] font-extrabold text-sm hover:bg-[#E5B86A] transition-all shadow-xl hover:shadow-[#D4A24E]/20 flex items-center justify-center gap-2 group"
                    >
                      <span>{loading ? "Verifying..." : "Submit Application"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-3 text-center text-xs font-mono text-slate-400">
                      By applying, you agree to mutual NDA review. No spam. No juniors. Only architects.
                    </p>
                  </div>

                </form>
              </div>
            ) : (
              /* Success Velvet Rope Confirmation */
              <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#D4A24E]/20 text-[#D4A24E] flex items-center justify-center mx-auto border border-[#D4A24E]/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E] text-[#0C1731] text-[11px] font-mono font-bold uppercase tracking-wider">
                    Application Received
                  </div>
                  <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-[#FBF8F3]">
                    Architects will review within 48 hours
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Check your inbox for our mutual NDA. Your enterprise dossier has entered the senior queue. We accept 5 per month — you will hear directly from an architect, not an SDR.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="mt-8 rounded-2xl bg-[#101D3D] border border-white/15 p-5 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-slate-400 uppercase">Application ID</span>
                    <span className="font-bold text-[#D4A24E]">{applicationId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Applicant:</span>
                    <span className="text-white font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Organization:</span>
                    <span className="text-white font-medium">{formData.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Track:</span>
                    <span className="text-[#D4A24E] font-bold">
                      {formData.need === "360" ? "Nisol 360™ Architecture" : "Nisol Score™ (Included in Nisol 360™)"}
                    </span>
                  </div>
                </div>

                {/* Executive Primer / Guide Download Card */}
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#122347] to-[#0A1224] border border-[#D4A24E]/40 p-5 sm:p-6 text-left max-w-md mx-auto relative overflow-hidden shadow-xl">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#D4A24E]/15 border border-[#D4A24E]/30 text-[#D4A24E] shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4A24E]/20 text-[#D4A24E] text-[10px] font-mono font-bold tracking-wider uppercase mb-1.5">
                        Executive Session Primer
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#FBF8F3] leading-snug">
                        AI Opportunity Mapping & Transformation Strategy
                      </h4>
                      <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                        Prepare for your architect session with our definitive enterprise framework for opportunity scoring, risk containment, and ROI governance.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <a
                      href="/reports/AI-Opportunity-Mapping-&-Transformation-Strategy-Executive-Guide.pdf"
                      download="AI-Opportunity-Mapping-and-Transformation-Strategy-Executive-Guide.pdf"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A24E] hover:bg-[#b88937] text-[#0C1731] font-bold text-xs transition-all shadow-md active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Executive Guide</span>
                    </a>
                    <a
                      href="/reports/AI-Opportunity-Mapping-&-Transformation-Strategy-Executive-Guide.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                    >
                      <span>Preview PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-slate-400 hover:text-white underline underline-offset-4"
                  >
                    Submit another application
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs font-mono text-slate-400 text-center">
              <ShieldCheck className="w-4 h-4 text-[#D4A24E]" />
              <span>Mutual NDA • Tenant-isolated • No data retention</span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. WHAT HAPPENS AFTER YOU APPLY (3-Step Timeline) */}
      <section className="py-20 bg-[#0C1731] border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-center text-[#FBF8F3]">
            What Happens After You Apply
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            <div className="bg-[#101D3D] p-8 rounded-2xl border border-white/10 relative text-left">
              <div className="w-12 h-12 rounded-full bg-[#0C1731] border border-[#D4A24E]/40 grid place-items-center font-mono text-sm font-bold text-[#D4A24E] mb-5">
                01
              </div>
              <h3 className="text-base font-bold text-[#FBF8F3]">Senior Review</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Senior enterprise architects review domain and telemetry within 48h. We architect 5 per month.
              </p>
            </div>

            <div className="bg-[#101D3D] p-8 rounded-2xl border border-white/10 relative text-left">
              <div className="w-12 h-12 rounded-full bg-[#0C1731] border border-[#D4A24E]/40 grid place-items-center font-mono text-sm font-bold text-[#D4A24E] mb-5">
                02
              </div>
              <h3 className="text-base font-bold text-[#FBF8F3]">NDA + Fit Call</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Mutual NDA executed + 30-min technical architecture fit session with a principal architect, not an SDR.
              </p>
            </div>

            <div className="bg-[#101D3D] p-8 rounded-2xl border border-white/10 relative text-left">
              <div className="w-12 h-12 rounded-full bg-[#0C1731] border border-[#D4A24E]/40 grid place-items-center font-mono text-sm font-bold text-[#D4A24E] mb-5">
                03
              </div>
              <h3 className="text-base font-bold text-[#FBF8F3]">Score &amp; 360 Kickoff</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                If Nisol Score: architect-validated baseline included in Nisol 360™. If Nisol 360™: 7-day architecture kickoff.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. DIRECT ENGAGEMENT. NO LAYERS */}
      <section className="py-20 bg-[#101D3D] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center text-[#FBF8F3]">
            Direct Engagement. No Layers.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="border-t border-[#D4A24E] pt-6">
              <h3 className="text-base font-bold text-[#FBF8F3]">
                24-Hour Architect Response
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Every inquiry routed directly to a senior AI systems architect. No SDR, no BDR, no sales qualification gymnastics.
              </p>
            </div>

            <div className="border-t border-[#D4A24E] pt-6">
              <h3 className="text-base font-bold text-[#FBF8F3]">
                Strict Non-Disclosure
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Mutual NDAs signed prior to inspecting proprietary data topologies or cost sheets. Tenant-isolated audit rooms.
              </p>
            </div>

            <div className="border-t border-[#D4A24E] pt-6">
              <h3 className="text-base font-bold text-[#FBF8F3]">
                Client Infra Pass-Through
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                You pay AWS/GCP directly. We never intermediate cloud bills or retain your proprietary models.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2 text-xs font-mono text-slate-300">
              <span className="text-slate-400">For existing enterprise clients:</span>
              <a href="mailto:architects@nisolai.com" className="text-[#D4A24E] font-bold hover:underline">
                architects@nisolai.com
              </a>
              <span className="text-slate-500">• not contact@</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PREFER TO SEE WHAT YOU GET FIRST? */}
      <section className="py-16 bg-[#0C1731] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-slate-300 font-mono uppercase tracking-wider">
            Prefer to see what you get first?
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-mono font-bold">
            <Link
              href="/blueprint"
              className="text-[#D4A24E] hover:text-[#E5B86A] transition-colors flex items-center gap-1.5"
            >
              <span>See what&apos;s inside Nisol 360™</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-white/20 hidden sm:inline">•</span>
            <Link
              href="/score"
              className="text-[#D4A24E] hover:text-[#E5B86A] transition-colors flex items-center gap-1.5"
            >
              <span>See your Nisol Score™</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-white/20 hidden sm:inline">•</span>
            <Link
              href="/discovery"
              className="text-[#D4A24E] hover:text-[#E5B86A] transition-colors flex items-center gap-1.5"
            >
              <span>How it works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C1731]" />}>
      <VelvetRopeContactContent />
    </Suspense>
  );
}
