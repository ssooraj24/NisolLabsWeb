"use client";

import React, { useState, useEffect } from "react";
import { getDailyRate, calculateTotalInvestment } from "@/lib/pricing/pricingEngine";

export interface PricingData {
  engagementType: "Basic" | "Standard" | "Premium" | string;
  dailyRate: number;
  days: number;
  totalInvestment: number;
  paymentTerms: string;
}

interface PricingFormProps {
  data?: Partial<PricingData>;
  onUpdate?: (updated: PricingData) => void;
  employeeCount?: number;
}

export function PricingForm({ data, onUpdate, employeeCount }: PricingFormProps) {
  const suggestedRate = getDailyRate(employeeCount || 75);

  const [engagementType, setEngagementType] = useState<string>(data?.engagementType || "Standard");
  const [dailyRate, setDailyRate] = useState<number>(data?.dailyRate || suggestedRate);
  const [days, setDays] = useState<number>(data?.days || 3);
  const [paymentTerms, setPaymentTerms] = useState<string>(data?.paymentTerms || "30% Upfront / 70% on Completion");

  const totalInvestment = calculateTotalInvestment(dailyRate, days);

  useEffect(() => {
    if (onUpdate) {
      onUpdate({
        engagementType,
        dailyRate,
        days,
        totalInvestment,
        paymentTerms,
      });
    }
  }, [engagementType, dailyRate, days, totalInvestment, paymentTerms]);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#0A1E3C]">Commercial Pricing Engine</h4>
          <p className="text-xs text-slate-500">Auto-suggested based on client company headcount ({employeeCount || "50-100"} employees)</p>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Base Rate: ₹{suggestedRate.toLocaleString("en-IN")}/day
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Engagement Type */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Engagement Model</label>
          <select
            value={engagementType}
            onChange={(e) => setEngagementType(e.target.value)}
            className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-blue-500"
          >
            <option value="Basic">Basic Discovery (1 Day)</option>
            <option value="Standard">Standard Assessment (3 Days)</option>
            <option value="Premium">Premium Transformation (5+ Days)</option>
          </select>
        </div>

        {/* Daily Rate */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Daily Rate (₹)</label>
          <input
            type="number"
            value={dailyRate}
            onChange={(e) => setDailyRate(Number(e.target.value))}
            className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Days */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Assessment Days</label>
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Investment Display */}
        <div className="bg-white p-2.5 rounded-xl border border-blue-200 flex flex-col justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Estimated Investment</span>
          <span className="text-lg font-extrabold text-blue-600 font-mono">
            ₹{totalInvestment.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="pt-2 border-t border-slate-200/80">
        <label className="text-xs font-bold text-slate-700 block mb-1">Payment & Milestone Terms</label>
        <input
          type="text"
          value={paymentTerms}
          onChange={(e) => setPaymentTerms(e.target.value)}
          placeholder="e.g. 30% upfront / 70% on completion"
          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white font-normal focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
