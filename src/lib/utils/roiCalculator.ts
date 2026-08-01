export interface ROISummary {
  total_estimated_investment_usd: number;
  annual_cost_savings_usd: number;
  annual_revenue_uplift_usd?: number;
  payback_period_months: number;
  five_year_net_benefit_usd: number;
  overall_roi_percentage: number;
}

export interface DepartmentBreakdown {
  department: string;
  investment_usd: number;
  annual_savings_usd: number;
  key_drivers?: string[];
}

export interface ROIData {
  summary?: Partial<ROISummary>;
  department_breakdown?: DepartmentBreakdown[];
  financial_timeline_years?: any[];
}

/**
 * Recalculates ROI summary metrics deterministically based on department breakdown and rules.
 * Prevents LLM hallucinations or manual edit mismatches.
 */
export function calculateROICalculations(roiData: ROIData | null | undefined): ROIData {
  if (!roiData) {
    return {
      summary: {
        total_estimated_investment_usd: 0,
        annual_cost_savings_usd: 0,
        annual_revenue_uplift_usd: 0,
        payback_period_months: 0,
        five_year_net_benefit_usd: 0,
        overall_roi_percentage: 0,
      },
      department_breakdown: [],
    };
  }

  const depts = roiData.department_breakdown || [];
  const rawSummary = roiData.summary || {};

  // 1. Total Investment: sum of department investments if available, else raw summary
  const totalInvestment = depts.length > 0
    ? depts.reduce((acc, d) => acc + (Number(d.investment_usd) || 0), 0)
    : (Number(rawSummary.total_estimated_investment_usd) || 0);

  // 2. Annual Cost Savings: sum of department annual savings if available, else raw summary
  const annualSavings = depts.length > 0
    ? depts.reduce((acc, d) => acc + (Number(d.annual_savings_usd) || 0), 0)
    : (Number(rawSummary.annual_cost_savings_usd) || 0);

  const revenueUplift = Number(rawSummary.annual_revenue_uplift_usd) || 0;
  const totalAnnualBenefit = annualSavings + revenueUplift;

  // 3. Payback Period (Months): (Investment / Total Annual Benefit) * 12
  const paybackMonths = totalAnnualBenefit > 0
    ? Number(((totalInvestment / totalAnnualBenefit) * 12).toFixed(1))
    : 0;

  // 4. 5-Year Net Benefit: (Total Annual Benefit * 5) - Investment
  const fiveYearNetBenefit = (totalAnnualBenefit * 5) - totalInvestment;

  // 5. Overall 5-Year Net ROI %: (5-Year Net Benefit / Investment) * 100
  const overallRoiPercentage = totalInvestment > 0
    ? Math.round((fiveYearNetBenefit / totalInvestment) * 100)
    : 0;

  return {
    ...roiData,
    summary: {
      ...rawSummary,
      total_estimated_investment_usd: totalInvestment,
      annual_cost_savings_usd: annualSavings,
      annual_revenue_uplift_usd: revenueUplift,
      payback_period_months: paybackMonths,
      five_year_net_benefit_usd: fiveYearNetBenefit,
      overall_roi_percentage: overallRoiPercentage,
    },
    department_breakdown: depts,
  };
}
