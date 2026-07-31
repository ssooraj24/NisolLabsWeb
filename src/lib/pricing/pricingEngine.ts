// lib/pricing/pricingEngine.ts

import { CompanySize } from '@/types/database';

export const RATE_MATRIX: Record<string, number> = {
  "10-49": 40000,
  "50-100": 48000,
  "101-250": 58000,
  "251-500": 68000,
  "500+": 85000,
};

/**
 * Computes the read-only Company Size classification based on employee count.
 */
export function getCompanySizeTier(employeeCount: number | null | undefined): CompanySize | null {
  if (employeeCount === null || employeeCount === undefined || isNaN(employeeCount)) return null;
  if (employeeCount <= 10) return 'Startup';
  if (employeeCount <= 50) return 'Small';
  if (employeeCount <= 200) return 'Medium';
  if (employeeCount <= 500) return 'Mid-Market';
  if (employeeCount <= 5000) return 'Large';
  return 'Enterprise';
}

export function getDailyRate(employeeCount: number): number {
  if (!employeeCount || employeeCount <= 49) return 40000;
  if (employeeCount <= 100) return 48000;
  if (employeeCount <= 250) return 58000;
  if (employeeCount <= 500) return 68000;
  return 85000;
}

export function calculateTotalInvestment(dailyRate: number, days: number): number {
  return (dailyRate || 0) * (days || 0);
}

export function replacePlaceholders(template: string, data: Record<string, any>): string {
  if (!template) return "";

  const replacements: Record<string, string> = {
    "{{company_name}}": data.companyName || "Valued Client",
    "{{industry}}": data.industry || "Technology",
    "{{overall_score}}": data.overallScore !== undefined ? String(data.overallScore) : "3.8 / 5.0",
    "{{total_roi}}": data.totalROI ? String(data.totalROI) : "+290%",
    "{{payback_period}}": data.paybackPeriod ? String(data.paybackPeriod) : "6 Months",
    "{{total_use_cases}}": data.totalUseCases ? String(data.totalUseCases) : "20",
    "{{quick_wins_count}}": data.quickWinsCount ? String(data.quickWinsCount) : "5",
    "{{strategic_bets_count}}": data.strategicBetsCount ? String(data.strategicBetsCount) : "3",
    "{{daily_rate}}": data.dailyRate ? `₹${Number(data.dailyRate).toLocaleString("en-IN")}` : "₹48,000",
    "{{total_investment}}": data.totalInvestment ? `₹${Number(data.totalInvestment).toLocaleString("en-IN")}` : "₹144,000",
    "{{current_date}}": new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  return template.replace(/{{[\w_]+}}/g, (match) => replacements[match] || match);
}
