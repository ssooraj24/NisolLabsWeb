"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, DollarSign, Clock, TrendingUp, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ROICalculatorPage() {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [hourlyCost, setHourlyCost] = useState<number>(65);
  const [repetitiveHours, setRepetitiveHours] = useState<number>(15); // hours per week per employee
  const [aiEfficiencyGain, setAiEfficiencyGain] = useState<number>(60); // % reduction in repetitive hours

  // Calculations
  const weeklyRepetitiveHoursTotal = teamSize * repetitiveHours;
  const annualRepetitiveHoursTotal = weeklyRepetitiveHoursTotal * 50; // 50 work weeks
  const annualRepetitiveCostTotal = annualRepetitiveHoursTotal * hourlyCost;

  const annualHoursSaved = Math.round(annualRepetitiveHoursTotal * (aiEfficiencyGain / 100));
  const annualCostSavings = Math.round(annualRepetitiveCostTotal * (aiEfficiencyGain / 100));

  // Estimated implementation investment based on team size
  const estimatedImplementationCost = Math.round(Math.max(25000, teamSize * 1200));
  const netSavingsYearOne = annualCostSavings - estimatedImplementationCost;
  const roiPercentage = Math.round((netSavingsYearOne / estimatedImplementationCost) * 100);

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">Interactive Business Tool</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Enterprise AI <span className="golden-gradient-text">ROI Calculator</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          Estimate annual cost savings, productivity gains, and projected return on investment when deploying Nisol Labs autonomous agents and intelligent document automation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-navy-950 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-golden-600" />
              Operational Parameters
            </h2>
            <span className="text-xs text-navy-600 font-medium">Adjust sliders in real-time</span>
          </div>

          {/* Slider 1: Team Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-navy-900">Knowledge Worker Team Size</label>
              <span className="text-base font-extrabold text-golden-700 bg-golden-100 px-3 py-1 rounded-lg border border-golden-300">
                {teamSize} Employees
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-golden-600"
            />
            <div className="flex justify-between text-[11px] text-navy-600 font-medium">
              <span>5 Members</span>
              <span>250 Members</span>
              <span>500+ Members</span>
            </div>
          </div>

          {/* Slider 2: Hourly Cost */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-navy-900">Average Blended Hourly Rate ($/hr)</label>
              <span className="text-base font-extrabold text-golden-700 bg-golden-100 px-3 py-1 rounded-lg border border-golden-300">
                ${hourlyCost} / hr
              </span>
            </div>
            <input
              type="range"
              min={25}
              max={200}
              step={5}
              value={hourlyCost}
              onChange={(e) => setHourlyCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-golden-600"
            />
            <div className="flex justify-between text-[11px] text-navy-600 font-medium">
              <span>$25/hr</span>
              <span>$100/hr</span>
              <span>$200/hr</span>
            </div>
          </div>

          {/* Slider 3: Weekly Repetitive Hours */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-navy-900">Repetitive Work Hours per Week / Employee</label>
              <span className="text-base font-extrabold text-golden-700 bg-golden-100 px-3 py-1 rounded-lg border border-golden-300">
                {repetitiveHours} hrs / week
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={repetitiveHours}
              onChange={(e) => setRepetitiveHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-golden-600"
            />
            <div className="flex justify-between text-[11px] text-navy-600 font-medium">
              <span>5 hrs (Min)</span>
              <span>20 hrs (Avg)</span>
              <span>35 hrs (Heavy)</span>
            </div>
          </div>

          {/* Slider 4: AI Automation Efficiency */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-navy-900">Target AI Automation & Efficiency Gain (%)</label>
              <span className="text-base font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                {aiEfficiencyGain}% Efficiency
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={90}
              step={5}
              value={aiEfficiencyGain}
              onChange={(e) => setAiEfficiencyGain(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-navy-600 font-medium">
              <span>20% (Conservative)</span>
              <span>60% (Nisol Benchmark)</span>
              <span>90% (Zero-Touch)</span>
            </div>
          </div>
        </div>

        {/* Dynamic ROI Calculation Summary Panel */}
        <div className="lg:col-span-5 bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <span className="text-xs font-bold uppercase tracking-wider text-golden-400">Projected Financial ROI</span>
              <span className="text-xs font-mono bg-golden-500/20 text-golden-300 px-2 py-0.5 rounded">
                Live Model
              </span>
            </div>

            {/* Big Metrics */}
            <div className="space-y-4">
              <div className="bg-navy-900/90 p-5 rounded-2xl border border-navy-800">
                <div className="text-xs text-navy-200 font-semibold mb-1">Estimated Annual Cost Savings</div>
                <div className="text-4xl font-black golden-gradient-text">
                  ${annualCostSavings.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Direct bottom-line efficiency recovery
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-navy-900/90 p-4 rounded-xl border border-navy-800">
                  <div className="text-[11px] text-navy-200 font-semibold">Annual Hours Saved</div>
                  <div className="text-2xl font-black text-white mt-1">
                    {annualHoursSaved.toLocaleString()} hrs
                  </div>
                </div>

                <div className="bg-navy-900/90 p-4 rounded-xl border border-navy-800">
                  <div className="text-[11px] text-navy-200 font-semibold">Year-1 Net ROI</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {roiPercentage > 0 ? `+${roiPercentage}%` : `${roiPercentage}%`}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-navy-200 border-t border-navy-800 pt-4">
              <div className="flex justify-between">
                <span>Estimated Implementation Budget:</span>
                <span className="font-bold text-white">${estimatedImplementationCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Net First-Year Savings:</span>
                <span className="font-bold text-emerald-400">${netSavingsYearOne.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <Button href="/contact" variant="primary" size="lg" className="w-full justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                Claim Custom ROI Audit Report
              </Button>
              <p className="text-[10px] text-center text-navy-300">
                Based on Nisol Labs multi-agent automation benchmarks. Individual enterprise results vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
