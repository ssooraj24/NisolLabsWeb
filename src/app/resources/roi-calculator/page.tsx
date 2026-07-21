"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calculator, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  BarChart3,
  Bot,
  Building2,
  Users,
  ChevronRight,
  ChevronLeft,
  Lock,
  Download,
  Mail,
  Zap,
  RotateCcw,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Industry AI Impact Factors from ROI-Calculator.docx
const INDUSTRY_FACTORS: Record<string, { factor: number; label: string }> = {
  "IT/Software": { factor: 0.45, label: "45% Impact (DevOps, Code Gen, QA)" },
  "BFSI": { factor: 0.40, label: "40% Impact (Document Analysis, Fraud, Compliance)" },
  "Healthcare": { factor: 0.35, label: "35% Impact (Clinical Docs, Triage, Claims)" },
  "Manufacturing": { factor: 0.30, label: "30% Impact (IoT Telemetry, Maintenance, IDP)" },
  "Retail": { factor: 0.35, label: "35% Impact (Personalization, Order Agents)" },
  "Logistics": { factor: 0.30, label: "30% Impact (Route & Freight IDP)" },
  "Education": { factor: 0.25, label: "25% Impact (Admin & Content Automation)" },
  "Government": { factor: 0.25, label: "25% Impact (Citizen Services, Processing)" },
  "Real Estate": { factor: 0.30, label: "30% Impact (Lead Enrichment, Contracts)" },
  "Pharma": { factor: 0.35, label: "35% Impact (Document Review, Compliance)" },
  "Professional Services": { factor: 0.40, label: "40% Impact (RFP Synthesis, Research)" }
};

// Available AI Opportunities for Multi-select
const AI_OPPORTUNITIES = [
  { id: "Support", label: "Customer Support & Escalation Agents", icon: "Bot" },
  { id: "HR", label: "HR & Talent Acquisition Agents", icon: "Users" },
  { id: "Sales", label: "Sales Prospecting & Outbound Research", icon: "TrendingUp" },
  { id: "Marketing", label: "Multi-Modal Marketing & Content AI", icon: "Sparkles" },
  { id: "DevOps", label: "AI Engineering & DevOps Pipelines", icon: "Zap" },
  { id: "Finance", label: "Accounts Payable & Invoice Processing", icon: "DollarSign" },
  { id: "Operations", label: "Supply Chain & Procurement Workflows", icon: "BarChart3" },
  { id: "Legal", label: "Contract & Regulatory Review Assistant", icon: "ShieldCheck" },
  { id: "IT", label: "Enterprise Knowledge RAG Copilot", icon: "Building2" },
  { id: "Engineering", label: "Synthetic Test & Code Review Bots", icon: "Calculator" }
];

// Readiness Audit Questions
const READINESS_QUESTIONS = [
  { id: "dataCentralized", label: "Is your enterprise data centralized in a cloud warehouse/lakehouse?", pts: 15 },
  { id: "dataStructured", label: "Is a majority of your document data cleaned or semi-structured?", pts: 10 },
  { id: "hasCloud", label: "Do you run on modern cloud infrastructure (AWS/GCP/Azure)?", pts: 10 },
  { id: "hasAPI", label: "Do your key business systems support REST/GraphQL APIs?", pts: 15 },
  { id: "hasDataTeam", label: "Do you have internal data/engineering capability?", pts: 15 },
  { id: "hasAIAwareness", label: "Is executive leadership committed to AI transformation?", pts: 10 },
  { id: "hasRPA", label: "Have you previously deployed basic RPA or script automations?", pts: 15 },
  { id: "hasDocumentedWorkflows", label: "Are core operational workflows mapped and documented?", pts: 10 }
];

export default function ROICalculatorPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  // Step 1: Company Profile
  const [industry, setIndustry] = useState<string>("IT/Software");
  const [employees, setEmployees] = useState<number>(50);
  const [annualRevenue, setAnnualRevenue] = useState<number>(5000000);

  // Step 2: Current Costs
  const [avgHourlyRate, setAvgHourlyRate] = useState<number>(35); // in USD base
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(10);
  const [monthlySupportTickets, setMonthlySupportTickets] = useState<number>(1000);
  const [avgCostPerTicket, setAvgCostPerTicket] = useState<number>(8); // in USD base

  // Step 3: Opportunities & Readiness
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["Support", "Sales", "HR"]);
  const [readinessAnswers, setReadinessAnswers] = useState<Record<string, boolean>>({
    dataCentralized: true,
    dataStructured: true,
    hasCloud: true,
    hasAPI: true,
    hasDataTeam: false,
    hasAIAwareness: true,
    hasRPA: false,
    hasDocumentedWorkflows: true
  });

  // Step 4: Lead Capture State
  const [leadCaptured, setLeadCaptured] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: ""
  });
  const [submittingLead, setSubmittingLead] = useState<boolean>(false);

  // Currency multiplier
  const currencyRate = currency === "INR" ? 83 : 1;
  const currencySymbol = currency === "INR" ? "₹" : "$";

  // Format Helper
  const formatMoney = (valInUSD: number) => {
    const converted = valInUSD * currencyRate;
    if (currency === "INR") {
      return `₹${Math.round(converted).toLocaleString("en-IN")}`;
    }
    return `$${Math.round(converted).toLocaleString("en-US")}`;
  };

  // --- MATHEMATICAL FORMULAS FROM ROI-CALCULATOR.DOCX ---

  // Formula 1: Manual Labor Cost = Employees * Hours/Week * 52 * Hourly Rate
  const annualManualLaborCostUSD = employees * manualHoursPerWeek * 52 * avgHourlyRate;

  // Formula 2: Support Cost = Monthly Tickets * Cost/Ticket * 12
  const annualSupportCostUSD = monthlySupportTickets * avgCostPerTicket * 12;

  // Formula 3: Total Addressable Cost
  const totalAddressableCostUSD = annualManualLaborCostUSD + annualSupportCostUSD;

  // Industry Impact Factor
  const impactFactor = (INDUSTRY_FACTORS[industry] || INDUSTRY_FACTORS["IT/Software"]).factor;

  // Formula 4: AI Savings = Total Addressable Cost * Impact Factor
  const annualAISavingsUSD = totalAddressableCostUSD * impactFactor;

  // Formula 5: Implementation Cost = $15,000 + ($10,000 * Number of Selected Areas) with bulk discount
  const numAreas = selectedAreas.length || 1;
  let perAreaCostUSD = 10000;
  if (numAreas >= 5) perAreaCostUSD = 8000;
  if (numAreas >= 8) perAreaCostUSD = 7000;
  const implementationCostUSD = 15000 + (numAreas * perAreaCostUSD);

  // Formula 6: Year 1 Net Savings = AI Savings - Implementation Cost
  const year1NetSavingsUSD = annualAISavingsUSD - implementationCostUSD;

  // Formula 7: Return on Investment (ROI %) = (Year 1 Net Savings / Implementation Cost) * 100
  const roiPercentage = Math.round((year1NetSavingsUSD / implementationCostUSD) * 100);

  // Formula 8: Payback Period (Months) = (Implementation Cost / AI Savings) * 12
  const paybackMonths = Number(((implementationCostUSD / annualAISavingsUSD) * 12).toFixed(1));

  // Formula 9: 3-Year Cumulative Savings = (AI Savings * 3) - (Implementation Cost * 1.24)
  const threeYearSavingsUSD = (annualAISavingsUSD * 3) - (implementationCostUSD * 1.24);

  // Formula 10: AI Maturity Score (0 - 100)
  const maturityScore = READINESS_QUESTIONS.reduce((acc, q) => {
    return acc + (readinessAnswers[q.id] ? q.pts : 0);
  }, 0);

  const getMaturityLevel = (score: number) => {
    if (score <= 25) return { label: "Novice", color: "bg-red-500 text-white", badge: "Not AI-Ready", desc: "Requires foundational data & infrastructure setup." };
    if (score <= 50) return { label: "Emerging", color: "bg-amber-500 text-white", badge: "Early Stage", desc: "Building core automation building blocks." };
    if (score <= 75) return { label: "Adopting", color: "bg-blue-600 text-white", badge: "Solid Foundation", desc: "Prime candidate for multi-agent workflows." };
    if (score <= 90) return { label: "Advanced", color: "bg-emerald-600 text-white", badge: "AI-Ready", desc: "High velocity readiness for LLMOps & agent clusters." };
    return { label: "AI-First", color: "bg-purple-600 text-white", badge: "Pioneer", desc: "Leading edge for autonomous agent orchestration." };
  };

  const maturityLevel = getMaturityLevel(maturityScore);

  // Toggle Area Selection
  const toggleArea = (id: string) => {
    if (selectedAreas.includes(id)) {
      if (selectedAreas.length > 1) {
        setSelectedAreas(selectedAreas.filter((a) => a !== id));
      }
    } else {
      setSelectedAreas([...selectedAreas, id]);
    }
  };

  // Toggle Readiness Question
  const toggleReadiness = (id: string) => {
    setReadinessAnswers({
      ...readinessAnswers,
      [id]: !readinessAnswers[id]
    });
  };

  // Handle Lead Form Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLead(true);

    try {
      await fetch("/api/roi/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          industry,
          employees,
          avgHourlyRate,
          manualHoursPerWeek,
          monthlySupportTickets,
          avgCostPerTicket,
          selectedAreas,
          currency,
          annualSavings: annualAISavingsUSD,
          implementationCost: implementationCostUSD,
          roiPercentage,
          paybackMonths,
          maturityScore,
          maturityLevel: maturityLevel.label
        })
      });
      setLeadCaptured(true);
    } catch (err) {
      setLeadCaptured(true);
    } finally {
      setSubmittingLead(false);
    }
  };

  return (
    <div className="space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Trust Badges */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <Badge variant="golden">Executive Business Assessment</Badge>
        
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          See How Much AI Can <br />
          <span className="golden-gradient-text">Save Your Business</span>
        </h1>
        
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          Answer 8 quick questions to calculate your personalized <strong>AI Savings</strong>, <strong>1-Year ROI</strong>, and <strong>AI Maturity Score</strong> in 2 minutes.
        </p>

        {/* Currency & Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Currency Switcher */}
          <div className="bg-slate-200 p-1 rounded-xl flex items-center gap-1 shadow-inner border border-slate-300">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                currency === "USD" ? "bg-navy-950 text-golden-400 shadow-sm" : "text-slate-700 hover:text-navy-950"
              }`}
            >
              $ USD ($)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                currency === "INR" ? "bg-navy-950 text-golden-400 shadow-sm" : "text-slate-700 hover:text-navy-950"
              }`}
            >
              ₹ INR (₹)
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-navy-700 font-semibold bg-white px-4 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-bit Encrypted</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-golden-600" /> 2 Min Assessment</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-navy-700" /> Founder-Led Team</span>
          </div>
        </div>
      </div>

      {/* 4-STEP WIZARD PROGRESS BAR */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold mb-3">
          <button onClick={() => setCurrentStep(1)} className={currentStep >= 1 ? "text-golden-700" : "text-slate-400"}>
            1. Company Profile
          </button>
          <button onClick={() => setCurrentStep(2)} className={currentStep >= 2 ? "text-golden-700" : "text-slate-400"}>
            2. Current Costs
          </button>
          <button onClick={() => setCurrentStep(3)} className={currentStep >= 3 ? "text-golden-700" : "text-slate-400"}>
            3. AI Opportunities
          </button>
          <button onClick={() => setCurrentStep(4)} className={currentStep >= 4 ? "text-golden-700" : "text-slate-400"}>
            4. ROI & Report
          </button>
        </div>

        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-golden-500 via-golden-600 to-golden-500 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* WIZARD CONTAINER */}
      <div className="max-w-4xl mx-auto">
        
        {/* STEP 1: COMPANY PROFILE */}
        {currentStep === 1 && (
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-golden-600">Step 01 / 04</span>
              <h2 className="text-2xl font-bold text-navy-950 mt-1">Company Profile & Industry Scale</h2>
              <p className="text-xs text-navy-700">Select your industry sector to apply calibrated AI impact factors.</p>
            </div>

            <div className="space-y-6">
              {/* Industry Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Industry Sector *</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm font-semibold bg-white text-navy-950"
                >
                  {Object.keys(INDUSTRY_FACTORS).map((ind) => (
                    <option key={ind} value={ind}>
                      {ind} — {INDUSTRY_FACTORS[ind].label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-navy-900">Total Knowledge Worker Employees</label>
                  <span className="text-base font-extrabold text-golden-700 bg-golden-100 px-3 py-1 rounded-lg border border-golden-300">
                    {employees} Employees
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-golden-600"
                />
                <div className="flex justify-between text-[11px] text-navy-600 font-medium">
                  <span>5 (Startup)</span>
                  <span>100 (Mid-Market)</span>
                  <span>500+ (Enterprise)</span>
                </div>
              </div>

              {/* Annual Revenue */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Estimated Annual Revenue Range</label>
                <select
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm font-semibold bg-white text-navy-950"
                >
                  <option value={1000000}>Under {formatMoney(1000000)} / year</option>
                  <option value={5000000}>{formatMoney(1000000)} - {formatMoney(5000000)} / year</option>
                  <option value={20000000}>{formatMoney(5000000)} - {formatMoney(20000000)} / year</option>
                  <option value={50000000}>{formatMoney(20000000)}+ / year (Enterprise)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={() => setCurrentStep(2)} variant="primary" size="lg" icon={<ChevronRight className="w-4 h-4" />}>
                Continue to Current Costs
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: CURRENT COSTS */}
        {currentStep === 2 && (
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-golden-600">Step 02 / 04</span>
              <h2 className="text-2xl font-bold text-navy-950 mt-1">Current Operational & Support Costs</h2>
              <p className="text-xs text-navy-700">Audit manual task hours and support ticket volumes to establish cost baseline.</p>
            </div>

            <div className="space-y-6">
              {/* Avg Hourly Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-navy-900">Average Blended Hourly Rate ({currencySymbol}/hr)</label>
                  <span className="text-base font-extrabold text-golden-700 bg-golden-100 px-3 py-1 rounded-lg border border-golden-300">
                    {formatMoney(avgHourlyRate)} / hr
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={150}
                  step={5}
                  value={avgHourlyRate}
                  onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-golden-600"
                />
              </div>

              {/* Weekly Manual Hours per Employee */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-navy-900">Weekly Hours spent on Repetitive Tasks (per Employee)</label>
                  <span className="text-base font-extrabold text-golden-700 bg-golden-100 px-3 py-1 rounded-lg border border-golden-300">
                    {manualHoursPerWeek} hrs / week
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-golden-600"
                />
              </div>

              {/* Monthly Support Ticket Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Monthly Support Inquiries / Tickets</label>
                  <input
                    type="number"
                    min={0}
                    max={100000}
                    value={monthlySupportTickets}
                    onChange={(e) => setMonthlySupportTickets(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm font-semibold bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Avg Cost per Ticket ({currencySymbol})</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={avgCostPerTicket}
                    onChange={(e) => setAvgCostPerTicket(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-golden-500 text-sm font-semibold bg-white"
                  />
                </div>
              </div>

              <div className="bg-navy-900 text-white p-4 rounded-xl flex items-center justify-between text-xs">
                <span>Calculated Baseline Annual Cost:</span>
                <span className="font-extrabold text-golden-400 text-base">{formatMoney(totalAddressableCostUSD)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button onClick={() => setCurrentStep(1)} variant="outline" size="lg" icon={<ChevronLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} variant="primary" size="lg" icon={<ChevronRight className="w-4 h-4" />}>
                Continue to AI Opportunities
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: AI OPPORTUNITIES & READINESS */}
        {currentStep === 3 && (
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-golden-600">Step 03 / 04</span>
              <h2 className="text-2xl font-bold text-navy-950 mt-1">Select AI Opportunities & Enterprise Readiness</h2>
              <p className="text-xs text-navy-700">Select business areas for AI deployment and answer quick readiness questions.</p>
            </div>

            {/* Areas Multi-select Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Target AI Implementation Areas (Select 1 or more)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AI_OPPORTUNITIES.map((area) => {
                  const isSelected = selectedAreas.includes(area.id);
                  return (
                    <div
                      key={area.id}
                      onClick={() => toggleArea(area.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs font-semibold ${
                        isSelected
                          ? "bg-navy-900 text-white border-golden-500 shadow-md"
                          : "bg-white text-navy-900 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span>{area.label}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isSelected ? "bg-golden-500 text-navy-950" : "bg-slate-100 border border-slate-300"}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Readiness Audit Questions */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Enterprise Readiness Audit (Check all that apply)</label>
              <div className="space-y-2">
                {READINESS_QUESTIONS.map((q) => {
                  const checked = !!readinessAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleReadiness(q.id)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100/70 cursor-pointer text-xs text-navy-900"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"}`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{q.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button onClick={() => setCurrentStep(2)} variant="outline" size="lg" icon={<ChevronLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(4)} variant="primary" size="lg" icon={<BarChart3 className="w-4 h-4" />}>
                Calculate Personalized ROI Report
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS & LEAD CAPTURE REPORT */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Score Banner */}
            <div className="bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${maturityLevel.color}`}>
                      Maturity Score: {maturityScore} / 100 ({maturityLevel.label})
                    </span>
                    <span className="text-xs text-golden-400 font-semibold">{maturityLevel.badge}</span>
                  </div>

                  <h2 className="text-3xl font-black text-white">
                    Estimated Annual Savings: <br />
                    <span className="golden-gradient-text">{formatMoney(annualAISavingsUSD)}</span>
                  </h2>

                  <p className="text-xs text-navy-200 leading-relaxed">
                    {maturityLevel.desc} Based on your <strong>{industry}</strong> industry factor ({Math.round(impactFactor * 100)}%) and selected <strong>{selectedAreas.length} AI opportunity areas</strong>.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-navy-900/90 p-5 rounded-2xl border border-navy-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-navy-300 font-medium">1-Year Net ROI:</span>
                    <span className="text-xl font-extrabold text-emerald-400">+{roiPercentage}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-navy-300 font-medium">Payback Period:</span>
                    <span className="text-sm font-extrabold text-golden-400">{paybackMonths} Months</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-navy-300 font-medium">3-Year Cumulative Savings:</span>
                    <span className="text-sm font-extrabold text-white">{formatMoney(threeYearSavingsUSD)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial & Cost Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-navy-600">Current Addressable Cost</span>
                <div className="text-2xl font-black text-navy-950">{formatMoney(totalAddressableCostUSD)}</div>
                <div className="text-[11px] text-navy-700">Manual Labor: {formatMoney(annualManualLaborCostUSD)} | Support: {formatMoney(annualSupportCostUSD)}</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-golden-700">Implementation Investment</span>
                <div className="text-2xl font-black text-golden-700">{formatMoney(implementationCostUSD)}</div>
                <div className="text-[11px] text-navy-700">$15k base + {selectedAreas.length} selected areas with volume discount</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Year-1 Net Impact</span>
                <div className="text-2xl font-black text-emerald-700">{formatMoney(year1NetSavingsUSD)}</div>
                <div className="text-[11px] text-navy-700">Net savings after 100% implementation payback</div>
              </div>
            </div>

            {/* Tailored AI Recommendations */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-navy-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-golden-600" />
                Tailored AI Implementation Recommendations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-golden-700 block">01. Recommended Starting Point</span>
                  <span className="text-navy-900 font-bold block">AI Discovery Workshop & Audit</span>
                  <p className="text-navy-700 text-[11px]">Audit data streams and validate multi-agent feasibility in 2 weeks.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-golden-700 block">02. Priority Agent Deployments</span>
                  <span className="text-navy-900 font-bold block">{selectedAreas.slice(0, 2).join(" & ")} Agents</span>
                  <p className="text-navy-700 text-[11px]">Deploy tool-calling agents with human-in-the-loop governance.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-golden-700 block">03. Infrastructure Scaling</span>
                  <span className="text-navy-900 font-bold block">LLMOps Telemetry & Caching</span>
                  <p className="text-navy-700 text-[11px]">Cut token latency by 60% with GPTCache and model routing.</p>
                </div>
              </div>
            </div>

            {/* LEAD CAPTURE FORM / MODAL */}
            <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 border border-golden-500/30 shadow-2xl relative">
              {leadCaptured ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Full Executive Report Dispatched!</h3>
                  <p className="text-sm text-navy-200 max-w-lg mx-auto">
                    Thank you, <strong>{leadForm.fullName}</strong>. A detailed PDF copy of your ROI analysis and AI Maturity Roadmap has been sent to <strong>{leadForm.email}</strong>.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                      Book Free Consultation
                    </Button>
                    <Button onClick={() => setCurrentStep(1)} variant="navy" size="md" icon={<RotateCcw className="w-4 h-4" />}>
                      Recalculate
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <Badge variant="golden">Get Full PDF Executive Report</Badge>
                    <h3 className="text-2xl font-bold text-white">Download Your Detailed ROI Breakdown</h3>
                    <p className="text-xs text-navy-200">Enter your details to receive the full report with formula breakdowns, architecture recommendations, and priority matrix.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={leadForm.fullName}
                      onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-navy-900 border border-navy-700 text-white focus:ring-2 focus:ring-golden-500 text-sm"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Work Email *"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-navy-900 border border-navy-700 text-white focus:ring-2 focus:ring-golden-500 text-sm"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Company Name *"
                      value={leadForm.companyName}
                      onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-navy-900 border border-navy-700 text-white focus:ring-2 focus:ring-golden-500 text-sm"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-navy-900 border border-navy-700 text-white focus:ring-2 focus:ring-golden-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" icon={<Download className="w-4 h-4" />}>
                      {submittingLead ? "Generating Report..." : "Get Your Full PDF Report"}
                    </Button>
                    <Link href="/contact" className="text-xs text-golden-400 hover:underline flex items-center gap-1 font-semibold">
                      Or Book Free AI Strategy Consultation directly
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </form>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Button onClick={() => setCurrentStep(3)} variant="outline" size="md" icon={<ChevronLeft className="w-4 h-4" />}>
                Adjust Opportunities
              </Button>
              <Button onClick={() => setCurrentStep(1)} variant="ghost" size="md" icon={<RotateCcw className="w-4 h-4" />}>
                Start Over
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
