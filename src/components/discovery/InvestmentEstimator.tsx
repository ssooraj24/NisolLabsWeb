"use client";

import React, { useState, useMemo } from "react";
import { Calculator, ArrowRight, Clock, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function InvestmentEstimator() {
  const [industry, setIndustry] = useState("Technology");
  const [functions, setFunctions] = useState("4-6"); // "1-3", "4-6", "7+"
  const [headcount, setHeadcount] = useState("51-250"); // "10-50", "51-250", "251-1000", "1000+"
  const [locations, setLocations] = useState("1"); // "1", "2-3", "4+"
  const [depth, setDepth] = useState("growth"); // "foundation", "growth", "enterprise"

  const estimation = useMemo(() => {
    if (depth === "spark") {
      return {
        minEstFormatted: "₹1,50,000",
        maxEstFormatted: "₹1,50,000",
        packageRecommendation: "Nisol Spark Engagement",
        badgeVariant: "outline" as const,
        timeline: "3 Business Days"
      };
    }

    const base = 350000;

    let wFunctions = 1.4;
    if (functions === "1-3") wFunctions = 1.0;
    if (functions === "7+") wFunctions = 1.8;

    let wSize = 1.3;
    if (headcount === "10-50") wSize = 1.0;
    if (headcount === "251-1000") wSize = 1.6;
    if (headcount === "1000+") wSize = 2.0;

    let wLocations = 1.0;
    if (locations === "2-3") wLocations = 1.25;
    if (locations === "4+") wLocations = 1.5;

    let wDepth = 1.5;
    if (depth === "foundation") wDepth = 1.0;
    if (depth === "enterprise") wDepth = 2.0;

    const rawEst = base * wFunctions * wSize * wLocations * wDepth;
    const minEst = Math.round((rawEst * 0.9) / 10000) * 10000;
    const maxEst = Math.round((rawEst * 1.1) / 10000) * 10000;

    let packageRecommendation = "Growth Engagement";
    let badgeVariant: "golden" | "navy" | "outline" = "golden";
    let timeline = "2–4 Weeks (10–15 Business Days)";

    if (depth === "foundation" || (headcount === "10-50" && depth !== "enterprise")) {
      if (functions === "1-3") {
        packageRecommendation = "Nisol Spark Engagement";
        badgeVariant = "outline";
        timeline = "3 Business Days";
      } else {
        packageRecommendation = "Foundation Engagement";
        badgeVariant = "navy";
        timeline = "1–2 Weeks (7–11 Business Days)";
      }
    } else if (depth === "enterprise" || headcount === "1000+" || locations === "4+") {
      packageRecommendation = "Enterprise Engagement";
      badgeVariant = "golden";
      timeline = "4–8 Weeks (Custom Roadmap)";
    }

    return {
      minEstFormatted: `₹${minEst.toLocaleString("en-IN")}`,
      maxEstFormatted: `₹${maxEst.toLocaleString("en-IN")}`,
      packageRecommendation,
      badgeVariant,
      timeline
    };
  }, [functions, headcount, locations, depth]);

  return (
    <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-golden-500/30 shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-golden-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Interactive Engagement Estimator</span>
          </div>
          <h3 className="text-2xl font-black text-white">Estimate Your Nisol Discovery™ Investment</h3>
        </div>
        <Badge variant="golden" className="self-start sm:self-center">Dynamic Lead Estimator</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-5 text-xs">
          {/* Industry */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 uppercase tracking-wider block">1. Industry Sector</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-golden-500 text-xs font-medium"
            >
              <option value="Technology">Technology & IT Services</option>
              <option value="Finance">BFSI & Financial Services</option>
              <option value="Healthcare">Healthcare & Life Sciences</option>
              <option value="Manufacturing">Manufacturing & Supply Chain</option>
              <option value="Retail">Retail & E-Commerce</option>
              <option value="Services">Professional Services & Consulting</option>
            </select>
          </div>

          {/* Business Functions */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 uppercase tracking-wider block">2. Business Functions to Assess</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "1–3 Functions", val: "1-3" },
                { label: "4–6 Functions", val: "4-6" },
                { label: "7+ Functions", val: "7+" },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setFunctions(item.val)}
                  className={`py-2 px-3 rounded-lg border text-center font-semibold transition-all ${
                    functions === item.val
                      ? "bg-golden-500 text-navy-950 border-golden-400"
                      : "bg-navy-900 border-navy-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Company Headcount */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 uppercase tracking-wider block">3. Company / Scope Headcount</label>
            <select
              value={headcount}
              onChange={(e) => setHeadcount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-golden-500 text-xs font-medium"
            >
              <option value="10-50">10 – 50 Employees (Small Unit)</option>
              <option value="51-250">51 – 250 Employees (Mid-Market)</option>
              <option value="251-1000">251 – 1,000 Employees (Large Business)</option>
              <option value="1000+">1,000+ Employees (Global Enterprise)</option>
            </select>
          </div>

          {/* Operating Locations & Depth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-bold text-slate-300 uppercase tracking-wider block">4. Operating Locations</label>
              <select
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-golden-500 text-xs font-medium"
              >
                <option value="1">Single Location / HQ</option>
                <option value="2-3">2 – 3 Locations</option>
                <option value="4+">4+ Multi-Region / Global</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-300 uppercase tracking-wider block">5. Desired Engagement Depth</label>
              <select
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-golden-500 text-xs font-medium"
              >
                <option value="spark">Spark (3-Day Focus Track — ₹1.5L)</option>
                <option value="foundation">Foundation (Core 360° Scope — ₹4.5L)</option>
                <option value="growth">Growth (Multi-Dept & Blueprints — ₹8.5L)</option>
                <option value="enterprise">Enterprise (Custom Architecture — ₹18.5L+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display Panel */}
        <div className="lg:col-span-5 bg-navy-900 rounded-2xl p-6 border border-golden-500/40 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <span className="text-xs text-slate-400 font-medium">Recommended Tier:</span>
              <span className="text-xs font-black text-golden-300 px-2.5 py-1 rounded bg-golden-500/20 border border-golden-500/40">
                {estimation.packageRecommendation}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Estimated Investment Range</span>
              <div className="text-3xl sm:text-4xl font-black text-white golden-gradient-text">
                {estimation.minEstFormatted} – {estimation.maxEstFormatted}
              </div>
              <span className="text-[10px] text-slate-400 block pt-1">Fixed-price outcome-based scope (excl. GST)</span>
            </div>

            <div className="space-y-2 pt-3 border-t border-navy-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-golden-400 shrink-0" />
                <span>Estimated Timeline: <strong className="text-white">{estimation.timeline}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes 15 Executive Deliverables & Interactive Blueprints</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero Public Model Training & Tenant Isolated Security</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              href={`/contact?type=discovery-call&package=${encodeURIComponent(estimation.packageRecommendation)}&est=${encodeURIComponent(estimation.minEstFormatted + ' - ' + estimation.maxEstFormatted)}`}
              variant="primary"
              size="md"
              className="w-full justify-center text-xs font-bold"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Lock In Estimate & Book Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
