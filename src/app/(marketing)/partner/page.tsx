"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Handshake, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Building2, 
  Factory, 
  Activity, 
  Briefcase, 
  Globe, 
  Lock, 
  HelpCircle, 
  ChevronDown, 
  Award, 
  Calculator, 
  FileText, 
  Zap, 
  Loader2, 
  Star,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function PartnerPage() {
  // Interactive Earnings Calculator State
  const [dealType, setDealType] = useState<"enterprise" | "one">("enterprise");
  const [referralCount, setReferralCount] = useState<number>(3);

  // Application Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    phone: "",
    website: "",
    partnerType: "Implementation Partner (25-35%)",
    primaryMarket: "India Tier-1 Cities",
    estimatedReferrals: "3 - 5 Deals / Year",
    message: ""
  });

  // Accordion FAQ Open States
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Math for calculator
  const dealValue = dealType === "enterprise" ? 1850000 : 450000;
  const dealValueUSD = dealType === "enterprise" ? 22500 : 5500;
  const year1Rate = 0.30;
  const year2Rate = 0.20;

  const year1EarningsINR = referralCount * dealValue * year1Rate;
  const year1EarningsUSD = Math.round(referralCount * dealValueUSD * year1Rate);
  
  const year2EarningsINR = referralCount * dealValue * year2Rate;
  const year2EarningsUSD = Math.round(referralCount * dealValueUSD * year2Rate);

  const threeYearLifetimeINR = year1EarningsINR + (year2EarningsINR * 2);
  const threeYearLifetimeUSD = year1EarningsUSD + (year2EarningsUSD * 2);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.companyName) {
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/partner-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || "Failed to submit application.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "How much does it cost to join the Nisol AI Partner Program?",
      a: "Zero. The program is 100% free to join. There are no registration fees, annual subscription costs, or hidden overheads."
    },
    {
      q: "Do I need technical or engineering capability to refer leads?",
      a: "No technical experience is required for Referral Partners. You introduce decision-makers; Nisol AI's enterprise architects handle solution discovery, technical scoping, proposal delivery, and implementation."
    },
    {
      q: "How does Deal Registration and Protection work?",
      a: "When you register a deal via the Partner Portal, you receive exclusive 90-day protection. If Nisol AI's internal sales team is already in active contact with the prospect, we notify you within 48 hours for total transparency."
    },
    {
      q: "What is Nisol AI's SLA for following up on partner-referred leads?",
      a: "We guarantee first contact within 48 business hours of lead submission. You receive instant automated tracking notifications at every stage of the engagement pipeline."
    },
    {
      q: "What happens after Year 1? How does recurring renewal work?",
      a: "You earn 30% on Year 1 contract value. From Year 2 onward, you receive 20% recurring commission on annual contract renewals for as long as the client remains with Nisol AI. If you drive an upsell, you earn 30% on incremental revenue for Year 1 of that upsell."
    },
    {
      q: "What are the Founding Partner Program perks?",
      a: "The first 10 partners receive permanent grandfathered 30% commission rates, a free co-branded case study produced by Nisol AI, logo placement on nisolai.com/partners, 6-month priority lead routing, quarterly CEO strategy sessions, and 30-day early access to new AI product releases."
    },
    {
      q: "When and how are commissions paid out?",
      a: "Commissions are paid monthly on a Net-30 basis following client invoice clearance. Payouts are made via bank wire transfer with complete transparency via your partner dashboard."
    },
    {
      q: "Can international partners outside India join?",
      a: "Yes! We actively recruit partners across India (Tier-1 cities) and the Middle East (Dubai / UAE), as well as global IT consultants serving enterprise clients."
    }
  ];

  return (
    <div className="space-y-20 pb-24">
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 bg-navy-950 text-white overflow-hidden border-b border-navy-800">
        {/* Ambient Light Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-golden-500/10 via-emerald-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/5 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-golden-400 animate-pulse" />
              <span>FOUNDING PARTNER COHORT NOW OPEN — 30% RECURRING</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
              Grow Your Business with <br className="hidden sm:inline" />
              <span className="golden-gradient-text">Nisol AI Partnerships</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Earn <strong className="text-golden-300 font-bold">30% recurring commission</strong> by introducing enterprise clients to high-margin AI implementations. Zero delivery hassle. Guaranteed 90-day deal protection.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto font-bold text-base px-8 py-4 shadow-xl cursor-pointer"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Apply for Founding Partner Status
              </Button>
              <Button 
                href="#calculator" 
                variant="navy" 
                size="lg" 
                className="w-full sm:w-auto text-base px-8 py-4 border border-navy-700"
                icon={<Calculator className="w-4 h-4 text-golden-400" />}
              >
                Calculate Your Earnings
              </Button>
            </div>

            {/* Quick Feature Chips */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-300 border-t border-navy-800/80 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-golden-400 shrink-0" />
                <span>30% Year 1 / 20% Year 2+</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>90-Day Deal Protection</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-golden-400 shrink-0" />
                <span>48-Hour Response SLA</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Delivery Burden</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOUNDING PARTNER URGENCY SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border-2 border-golden-500/40 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-r from-golden-500 to-amber-500 text-navy-950 font-black text-xs uppercase tracking-widest rounded-bl-2xl shadow-lg">
            🏆 EXCLUSIVE COHORT — 7 OF 10 SPOTS REMAINING
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="golden">Founding Partner Program</Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Special Perks for the First 10 Partners
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Join the inaugural Nisol AI Partner Cohort and lock in permanent advantages that will never be offered again once tiers activate in Month 7.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-800/60 border border-navy-700/80">
                  <Star className="w-4 h-4 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Grandfathered 30% Rate</strong>
                    <span className="text-[11px] text-slate-400">Never drop to lower commission tiers</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-800/60 border border-navy-700/80">
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Co-Branded Case Study</strong>
                    <span className="text-[11px] text-slate-400">Produced at zero cost for your agency</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-800/60 border border-navy-700/80">
                  <Globe className="w-4 h-4 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Featured Website Placement</strong>
                    <span className="text-[11px] text-slate-400">Permanent logo & link on nisolai.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-800/60 border border-navy-700/80">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Priority Lead Routing</strong>
                    <span className="text-[11px] text-slate-400">First right of refusal for 6 months</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-navy-950/80 rounded-2xl p-6 border border-golden-500/30 text-center space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-golden-400 uppercase tracking-widest">Cohort Capacity Status</span>
                <div className="text-4xl font-black text-white">3 / 10 <span className="text-sm font-medium text-slate-400">Claimed</span></div>
                <div className="w-full bg-navy-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-golden-500 to-amber-500 h-full w-[30%]" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-snug">
                Founding Partner perks expire upon reaching 10 active partner registrations. Secure your position today.
              </p>

              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="primary" 
                size="md" 
                className="w-full justify-center font-bold cursor-pointer"
              >
                Claim Founding Partner Slot →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE EARNINGS CALCULATOR */}
      {/* ========================================================================= */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="navy">Interactive Partner Revenue Model</Badge>
            <h2 className="text-3xl font-extrabold text-navy-950">
              Calculate Your Expected Partner Income
            </h2>
            <p className="text-sm text-navy-700">
              See what your referral pipeline generates across Year 1 and recurring renewal years.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              {/* Deal Tier Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  1. Select Engagement Package
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDealType("enterprise")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dealType === "enterprise"
                        ? "border-golden-500 bg-golden-50/60 ring-2 ring-golden-500/20 font-bold"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <div className="text-xs text-navy-900">Nisol Enterprise</div>
                    <div className="text-sm font-black text-golden-600">₹18,50,000</div>
                    <div className="text-[10px] text-slate-500">($22,500 USD avg)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDealType("one")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dealType === "one"
                        ? "border-golden-500 bg-golden-50/60 ring-2 ring-golden-500/20 font-bold"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <div className="text-xs text-navy-900">Nisol One (Mid-Market)</div>
                    <div className="text-sm font-black text-golden-600">₹4,50,000</div>
                    <div className="text-[10px] text-slate-500">($5,500 USD avg)</div>
                  </button>
                </div>
              </div>

              {/* Referral Count Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    2. Annual Closed Referrals
                  </label>
                  <span className="text-lg font-black text-golden-600 bg-golden-100 px-3 py-0.5 rounded-lg border border-golden-300">
                    {referralCount} Deals / Year
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={15}
                  value={referralCount}
                  onChange={(e) => setReferralCount(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-golden-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>1 Deal</span>
                  <span>5 Deals</span>
                  <span>10 Deals</span>
                  <span>15 Deals</span>
                </div>
              </div>
            </div>

            {/* Output Display */}
            <div className="lg:col-span-6 bg-navy-950 text-white p-8 rounded-2xl border border-golden-500/30 shadow-xl space-y-6">
              <div className="border-b border-navy-800 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-golden-400 uppercase tracking-widest">Calculated Payout</span>
                  <div className="text-sm text-slate-300 font-medium">Based on {referralCount} referred deals</div>
                </div>
                <Badge variant="emerald">Net-30 Monthly Payout</Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-900/90 border border-navy-800">
                  <span className="text-xs font-semibold text-slate-300">Year 1 Commission (30%):</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-golden-400">₹{year1EarningsINR.toLocaleString("en-IN")}</span>
                    <span className="block text-[10px] text-slate-400">($${year1EarningsUSD.toLocaleString()} USD)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-900/90 border border-navy-800">
                  <span className="text-xs font-semibold text-slate-300">Year 2+ Recurring / Yr (20%):</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-emerald-400">₹{year2EarningsINR.toLocaleString("en-IN")}</span>
                    <span className="block text-[10px] text-slate-400">($${year2EarningsUSD.toLocaleString()} USD/yr)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-golden-500/10 border border-golden-500/40 text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase text-golden-300 tracking-wider">Estimated 3-Year Total Partner Income</span>
                  <div className="text-3xl font-black text-white">₹{threeYearLifetimeINR.toLocaleString("en-IN")}</div>
                  <div className="text-xs text-golden-400 font-semibold">≈ $${threeYearLifetimeUSD.toLocaleString()} USD</div>
                </div>
              </div>

              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="primary" 
                size="md" 
                className="w-full justify-center font-bold cursor-pointer"
              >
                Apply to Start Earning →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* THE 4-STEP PARTNER JOURNEY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden">Frictionless Process</Badge>
          <h2 className="text-3xl font-extrabold text-navy-950">
            How the Nisol AI Partner Program Works
          </h2>
          <p className="text-sm text-navy-700">
            From initial application to monthly recurring bank payouts in 4 clear steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4 hover:shadow-md transition-all relative group">
            <div className="w-10 h-10 rounded-xl bg-golden-100 text-golden-700 font-black flex items-center justify-center text-lg border border-golden-300">
              01
            </div>
            <h3 className="text-base font-bold text-navy-950">Sign Up (Free)</h3>
            <p className="text-xs text-navy-700 leading-relaxed">
              No registration fees or hidden commitments. Fill out a simple application and gain access to your partner portal and sales collateral toolkit.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4 hover:shadow-md transition-all relative group">
            <div className="w-10 h-10 rounded-xl bg-golden-100 text-golden-700 font-black flex items-center justify-center text-lg border border-golden-300">
              02
            </div>
            <h3 className="text-base font-bold text-navy-950">Share & Refer</h3>
            <p className="text-xs text-navy-700 leading-relaxed">
              Introduce enterprise leads or submit deal registrations. You get <strong className="text-navy-900">90-day deal protection</strong> and a <strong className="text-navy-900">48-hour SLA response guarantee</strong>.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4 hover:shadow-md transition-all relative group">
            <div className="w-10 h-10 rounded-xl bg-golden-100 text-golden-700 font-black flex items-center justify-center text-lg border border-golden-300">
              03
            </div>
            <h3 className="text-base font-bold text-navy-950">Earn 30% + 20%</h3>
            <p className="text-xs text-navy-700 leading-relaxed">
              Earn 30% of Year 1 contract value upon deal close. Continue earning 20% recurring on Year 2+ renewals with zero delivery responsibility.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4 hover:shadow-md transition-all relative group">
            <div className="w-10 h-10 rounded-xl bg-golden-100 text-golden-700 font-black flex items-center justify-center text-lg border border-golden-300">
              04
            </div>
            <h3 className="text-base font-bold text-navy-950">Grow & Upgrade</h3>
            <p className="text-xs text-navy-700 leading-relaxed">
              Unlock co-marketing grants, priority technical advisory, dedicated partner managers, and executive briefings as your referral volume expands.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TARGET PARTNER PROFILES */}
      {/* ========================================================================= */}
      <section className="bg-navy-950 text-white py-16 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="golden">Who We Partner With</Badge>
            <h2 className="text-3xl font-extrabold text-white">
              Built for Organizations & Advisors with Enterprise Access
            </h2>
            <p className="text-sm text-slate-300">
              Whether you are an IT consultancy, boutique advisory, or industry executive, Nisol AI expands your commercial portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 space-y-3 hover:border-golden-500/40 transition-colors">
              <Building2 className="w-6 h-6 text-golden-400" />
              <h3 className="text-base font-bold text-white">System Integrators & SIs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add enterprise AI capabilities and agentic engineering to your service catalog without hiring dedicated ML research teams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 space-y-3 hover:border-golden-500/40 transition-colors">
              <Briefcase className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">IT Consulting & Strategy Firms</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bridge the gap between strategic AI advisory and actual enterprise software deployment with guaranteed execution SLAs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 space-y-3 hover:border-golden-500/40 transition-colors">
              <Zap className="w-6 h-6 text-golden-400" />
              <h3 className="text-base font-bold text-white">Managed Service Providers (MSPs)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monetize your existing client base by introducing AI document automation and enterprise copilots alongside IT infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 space-y-3 hover:border-golden-500/40 transition-colors">
              <Factory className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Business Consultancies</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Recommend custom operational AI automation to your enterprise clients and share in the 30% first-year contract value.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 space-y-3 hover:border-golden-500/40 transition-colors">
              <Users className="w-6 h-6 text-golden-400" />
              <h3 className="text-base font-bold text-white">Former CXOs & Industry Advisors</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Turn executive network trust into substantial recurring revenue streams with zero delivery burden or operational overhead.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 space-y-3 hover:border-golden-500/40 transition-colors">
              <Globe className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Cloud Partners (AWS / Azure / GCP)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Drive 30-50% increased cloud consumption for enterprise clients while capturing referral commissions on Nisol AI services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="navy">Partner FAQs</Badge>
          <h2 className="text-3xl font-extrabold text-navy-950">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-navy-700">
            Everything you need to know about commissions, SLAs, deal protection, and terms.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="glass-panel rounded-2xl border border-slate-200 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left font-bold text-sm text-navy-950 flex items-center justify-between gap-4 hover:bg-slate-50/50"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-golden-600 shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-5 text-xs text-navy-700 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INLINE / BOTTOM APPLICATION SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-golden-500/40 shadow-2xl space-y-8 text-center relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <Badge variant="golden">Ready to Accelerate Your Revenue?</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Apply for Nisol AI Partner Program Today
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join the Founding Partner cohort before the 10 spots fill up. Free to join, 30% recurring commission, 90-day protection.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="primary" 
                size="lg" 
                className="font-bold text-base px-8 cursor-pointer"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Open Application Form →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* APPLICATION MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-navy-950">Partner Application Received</h3>
                <p className="text-sm text-navy-700 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your partner application for <strong>{formData.companyName}</strong> has been received. A Nisol AI Partner Lead will review your details and respond within 48 hours.
                </p>
                <Button onClick={() => { setSubmitted(false); setIsModalOpen(false); }} variant="navy" size="md">
                  Close Window
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-golden-600" />
                    Nisol AI Partner Application
                  </h3>
                  <p className="text-xs text-slate-500">
                    Apply for Founding Partner Status (30% Recurring Commission)
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 uppercase">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 uppercase">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@firm.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 uppercase">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Tech Solutions"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 / +971..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 uppercase">Partner Track</label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                    >
                      <option value="Implementation Partner (25-35%)">Implementation Partner (25-35%)</option>
                      <option value="Referral Partner (15-20%)">Referral Partner (15-20%)</option>
                      <option value="Founding Partner (30% Permanent)">Founding Partner (30% Permanent)</option>
                      <option value="Cloud / Strategic Ecosystem">Cloud / Strategic Ecosystem</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 uppercase">Primary Region / Market</label>
                    <select
                      value={formData.primaryMarket}
                      onChange={(e) => setFormData({ ...formData, primaryMarket: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm bg-white"
                    >
                      <option value="India Tier-1 Cities">India Tier-1 Cities</option>
                      <option value="Dubai / UAE / GCC">Dubai / UAE / GCC</option>
                      <option value="US / North America">US / North America</option>
                      <option value="Global / Remote">Global / Remote</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase">Brief Partner Background / Client Profile</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us briefly about your current enterprise clients, vertical focus, or target accounts..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    disabled={loading}
                    className="w-full justify-center font-bold cursor-pointer"
                    icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  >
                    {loading ? "Submitting Application..." : "Submit Partner Application →"}
                  </Button>
                </div>
                <p className="text-[11px] text-center text-slate-500">
                  🔒 Your information is confidential. We will never share your client data or contacts.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
