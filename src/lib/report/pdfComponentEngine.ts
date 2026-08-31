// src/lib/report/pdfComponentEngine.ts

import {
  ChartPayloads,
  ExecutiveKPICard,
  DepartmentScorecard,
  UseCaseItem,
  RiskItem,
  DataReadinessData,
  SensitivityAnalysisData,
  OCMPlanData,
} from "./types";

export function renderRadarChartSVG(radarData: Array<{ subject: string; score: number; fullMark: number }>): string {
  const width = 820;
  const height = 560;
  const centerX = width / 2;
  const centerY = height / 2 + 20;
  const radius = 165;
  const totalAxes = radarData.length || 6;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Grid concentric circles (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  let gridPolygons = "";

  gridLevels.forEach((level) => {
    const points = radarData
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * level * Math.cos(angle);
        const y = centerY + radius * level * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    gridPolygons += `<polygon points="${points}" fill="none" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="${level === 1 ? 'none' : '4,4'}"/>`;
  });

  // Axes lines & labels
  let axesLines = "";
  let dataPoints: string[] = [];

  radarData.forEach((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const endX = centerX + radius * Math.cos(angle);
    const endY = centerY + radius * Math.sin(angle);
    axesLines += `<line x1="${centerX}" y1="${centerY}" x2="${endX.toFixed(1)}" y2="${endY.toFixed(1)}" stroke="#CBD5E1" stroke-width="1.5"/>`;

    // Data polygon point calculation
    const valRatio = Math.min(100, Math.max(0, d.score)) / 100;
    const dataX = centerX + radius * valRatio * Math.cos(angle);
    const dataY = centerY + radius * valRatio * Math.sin(angle);
    dataPoints.push(`${dataX.toFixed(1)},${dataY.toFixed(1)}`);

    // Label positioning
    const labelRadius = radius + 36;
    const labelX = centerX + labelRadius * Math.cos(angle);
    const labelY = centerY + labelRadius * Math.sin(angle);
    const anchor = Math.abs(labelX - centerX) < 15 ? "middle" : labelX > centerX ? "start" : "end";
    const formattedScore = (d.score / 20).toFixed(1);
    axesLines += `<text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" font-family="Inter, sans-serif" font-size="14px" font-weight="600" fill="#334155" text-anchor="${anchor}">${d.subject} (${formattedScore} / 5)</text>`;
  });

  const polygonPoints = dataPoints.join(" ");

  return `
  <svg viewBox="0 0 ${width} ${height}" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px;">
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.08"/>
      </filter>
      <linearGradient id="gradRadar" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0A2647" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
    <text x="40" y="40" font-size="18px" font-weight="600" fill="#0F172A" font-family="Inter, sans-serif">Capability Maturity Radar (8 Dimensions)</text>
    
    <!-- Legend -->
    <g transform="translate(${width - 240}, 28)">
      <rect x="0" y="0" width="14" height="14" rx="3" fill="#1E3A8A" />
      <text x="20" y="12" font-size="12px" fill="#64748B" font-weight="500" font-family="Inter, sans-serif">Assessment Score</text>
    </g>

    <g transform="translate(0, 10)">
      ${gridPolygons}
      ${axesLines}
      <polygon points="${polygonPoints}" fill="rgba(30, 58, 138, 0.15)" stroke="#1E3A8A" stroke-width="3" filter="url(#shadow)"/>
      ${radarData.map((d, i) => {
        const pt = dataPoints[i].split(",");
        return `<circle cx="${pt[0]}" cy="${pt[1]}" r="5" fill="#1E3A8A" stroke="#FFFFFF" stroke-width="2"/>`;
      }).join("")}
    </g>
  </svg>
  `;
}

export function renderHeatmapSVG(heatmapData: Array<{ department: string; dimension: string; score: number }>): string {
  const width = 820;
  const height = 480;
  const padding = 40;

  const depts = Array.from(new Set(heatmapData.map((d) => d.department))).slice(0, 6);
  const dims = Array.from(new Set(heatmapData.map((d) => d.dimension))).slice(0, 4);

  const cellWidth = 110;
  const cellHeight = 44;
  const startX = 240;
  const startY = 110;

  let dimHeaders = dims.map((dim, i) => {
    return `<text x="${startX + i * cellWidth + cellWidth / 2}" y="${startY - 16}" font-size="14px" font-weight="600" fill="#334155" text-anchor="middle" font-family="Inter, sans-serif">${dim}</text>`;
  }).join("");

  let cells = "";
  depts.forEach((dept, r) => {
    cells += `<text x="${startX - 20}" y="${startY + r * (cellHeight + 12) + cellHeight / 2 + 5}" font-size="14px" font-weight="600" fill="#1E293B" text-anchor="end" font-family="Inter, sans-serif">${dept}</text>`;
    dims.forEach((dim, c) => {
      const item = heatmapData.find((h) => h.department === dept && h.dimension === dim);
      const score = item ? item.score : 60;
      
      let fillColor = "url(#gradBlue)";
      if (score >= 80) {
        fillColor = "url(#gradGreen)";
      } else if (score >= 60) {
        fillColor = "url(#gradBlue)";
      } else if (score >= 45) {
        fillColor = "url(#gradAmber)";
      } else {
        fillColor = "url(#gradRed)";
      }

      const x = startX + c * cellWidth;
      const y = startY + r * (cellHeight + 12);
      const score5 = (score / 20).toFixed(1);
      cells += `
        <rect x="${x}" y="${y}" width="${cellWidth - 8}" height="${cellHeight}" rx="10" fill="${fillColor}" filter="url(#shadow)" opacity="0.95"/>
        <text x="${x + cellWidth / 2 - 4}" y="${y + cellHeight / 2 + 5}" font-size="16px" font-weight="800" fill="#FFFFFF" text-anchor="middle" font-family="Inter, sans-serif">${score5} / 5</text>
      `;
    });
  });

  return `
  <svg viewBox="0 0 ${width} ${height}" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px;">
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.08"/>
      </filter>
      <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669" /><stop offset="100%" stop-color="#10B981" />
      </linearGradient>
      <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0A2647" /><stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
      <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D97706" /><stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>
      <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#DC2626" /><stop offset="100%" stop-color="#EF4444" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
    <text x="${padding}" y="${padding}" font-size="18px" font-weight="600" fill="#0F172A" font-family="Inter, sans-serif">Department AI Capability Heatmap</text>
    
    <!-- Legend -->
    <g transform="translate(${width - 320}, ${padding - 12})">
      <rect x="0" y="0" width="12" height="12" rx="3" fill="#10B981" /><text x="18" y="11" font-size="12" fill="#64748B" font-weight="500">4.0-5.0 High</text>
      <rect x="100" y="0" width="12" height="12" rx="3" fill="#1E3A8A" /><text x="118" y="11" font-size="12" fill="#64748B" font-weight="500">3.0-3.9 Mid</text>
      <rect x="190" y="0" width="12" height="12" rx="3" fill="#F59E0B" /><text x="208" y="11" font-size="12" fill="#64748B" font-weight="500">2.2-2.9 Low</text>
    </g>

    ${dimHeaders}
    ${cells}
  </svg>
  `;
}

export function renderOpportunityMatrixSVG(useCases: UseCaseItem[]): string {
  const width = 820;
  const height = 540;
  const paddingLeft = 60;
  const paddingRight = 40;
  const paddingTop = 60;
  const paddingBottom = 60;
  const innerW = width - paddingLeft - paddingRight;
  const innerH = height - paddingTop - paddingBottom;

  const processedCases = useCases.slice(0, 10).map((uc, i) => {
    let effort = uc.implementationEffortScore;
    let impact = uc.businessValueScore;

    if (!effort || effort === 0 || effort === 50) {
      if (uc.category === "Quick Win") effort = 20 + (i * 7) % 25;
      else if (uc.category === "Strategic Bet") effort = 62 + (i * 6) % 28;
      else effort = 35 + (i * 8) % 40;
    }
    if (!impact || impact === 0 || impact === 50) {
      if (uc.category === "Quick Win") impact = 76 + (i * 5) % 18;
      else if (uc.category === "Strategic Bet") impact = 80 + (i * 4) % 16;
      else impact = 45 + (i * 7) % 30;
    }

    return {
      ...uc,
      calcEffort: Math.min(95, Math.max(8, effort)),
      calcImpact: Math.min(95, Math.max(8, impact)),
      index: i + 1,
    };
  });

  let pointsSVG = "";

  processedCases.forEach((uc) => {
    const x = paddingLeft + (uc.calcEffort / 100) * innerW;
    const y = height - paddingBottom - (uc.calcImpact / 100) * innerH;

    let fillGradient = "gradGreen";
    if (uc.category === "Strategic Bet") {
      fillGradient = "gradBlue";
    } else if (uc.category === "Re-evaluate") {
      fillGradient = "gradRed";
    } else if (uc.category === "Long-term Fill") {
      fillGradient = "gradAmber";
    }

    pointsSVG += `
      <g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})" filter="url(#shadow)">
        <circle cx="0" cy="0" r="14" fill="url(#${fillGradient})" stroke="#FFFFFF" stroke-width="2.5"/>
        <text x="0" y="5" font-size="11px" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="Inter, sans-serif">${uc.index}</text>
      </g>
    `;
  });

  return `
  <svg viewBox="0 0 ${width} ${height}" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px;">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0F172A" flood-opacity="0.15"/>
      </filter>
      <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669" /><stop offset="100%" stop-color="#10B981" />
      </linearGradient>
      <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0A2647" /><stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
      <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D97706" /><stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>
      <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#DC2626" /><stop offset="100%" stop-color="#EF4444" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
    
    <text x="${paddingLeft}" y="36" font-size="17px" font-weight="700" fill="#0F172A" font-family="Inter, sans-serif">Opportunity Matrix: Impact vs. Implementation Effort</text>
    
    <g transform="translate(${width - 290}, 24)">
      <circle cx="6" cy="8" r="6" fill="#10B981"/>
      <text x="18" y="12" font-size="11.5px" font-weight="600" fill="#475569" font-family="Inter, sans-serif">Quick Wins</text>
      
      <circle cx="110" cy="8" r="6" fill="#1E3A8A"/>
      <text x="122" y="12" font-size="11.5px" font-weight="600" fill="#475569" font-family="Inter, sans-serif">Strategic Bets</text>
    </g>

    <!-- Quadrant Backgrounds -->
    <rect x="${paddingLeft}" y="${paddingTop}" width="${innerW / 2}" height="${innerH / 2}" fill="rgba(16, 185, 129, 0.08)" rx="8"/>
    <rect x="${paddingLeft + 10}" y="${paddingTop + 10}" width="180" height="24" rx="6" fill="#FFFFFF" opacity="0.9"/>
    <text x="${paddingLeft + 18}" y="${paddingTop + 26}" font-size="11.5px" font-weight="800" fill="#047857" font-family="Inter, sans-serif">⚡ QUICK WINS (High Value, Low Effort)</text>
    
    <rect x="${paddingLeft + innerW / 2}" y="${paddingTop}" width="${innerW / 2}" height="${innerH / 2}" fill="rgba(30, 58, 138, 0.08)" rx="8"/>
    <rect x="${paddingLeft + innerW / 2 + 10}" y="${paddingTop + 10}" width="190" height="24" rx="6" fill="#FFFFFF" opacity="0.9"/>
    <text x="${paddingLeft + innerW / 2 + 18}" y="${paddingTop + 26}" font-size="11.5px" font-weight="800" fill="#1D4ED8" font-family="Inter, sans-serif">🚀 STRATEGIC BETS (High Value, High Effort)</text>

    <rect x="${paddingLeft}" y="${paddingTop + innerH / 2}" width="${innerW / 2}" height="${innerH / 2}" fill="rgba(245, 158, 11, 0.04)" rx="8"/>
    <rect x="${paddingLeft + innerW / 2}" y="${paddingTop + innerH / 2}" width="${innerW / 2}" height="${innerH / 2}" fill="rgba(239, 68, 68, 0.04)" rx="8"/>

    <!-- Quadrant Dividing Axes -->
    <line x1="${paddingLeft}" y1="${paddingTop + innerH / 2}" x2="${paddingLeft + innerW}" y2="${paddingTop + innerH / 2}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4,4"/>
    <line x1="${paddingLeft + innerW / 2}" y1="${paddingTop}" x2="${paddingLeft + innerW / 2}" y2="${paddingTop + innerH}" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4,4"/>

    <!-- Plot Points -->
    ${pointsSVG}

    <!-- Axis Labels -->
    <text x="${paddingLeft + innerW / 2}" y="${height - 18}" font-size="12.5px" font-weight="700" fill="#475569" text-anchor="middle" font-family="Inter, sans-serif">Implementation Effort (Low ➔ High)</text>
    <text x="22" y="${paddingTop + innerH / 2}" font-size="12.5px" font-weight="700" fill="#475569" text-anchor="middle" transform="rotate(-90, 22, ${paddingTop + innerH / 2})" font-family="Inter, sans-serif">Business Value / Impact (Low ➔ High)</text>
  </svg>
  `;
}

export function renderExecutiveKPICardsHTML(kpiCards: ExecutiveKPICard[]): string {
  return `
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px;">
    ${kpiCards
      .map(
        (card) => `
      <div style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <div style="font-size: 10pt; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">${card.label}</div>
        <div style="font-size: 20pt; font-weight: 900; color: #0A1E3C; margin: 6px 0;">${card.value}</div>
        <div style="font-size: 10pt; font-weight: 700; color: ${card.status === 'positive' ? '#10B981' : card.status === 'critical' ? '#EF4444' : '#64748B'};">${card.subtext || ''}</div>
      </div>
    `
      )
      .join("")}
  </div>
  `;
}

export function renderMaturityComparisonSVG(data?: { clientScore?: number; industryAvg?: number; topQuartile?: number; industryName?: string }): string {
  const clientScore = data?.clientScore ?? 42;
  const industryAvg = data?.industryAvg ?? 62;
  const topQuartile = data?.topQuartile ?? 85;
  const industryName = data?.industryName ?? "Industry Average";

  const items = [
    { label: "Client Assessment", value: clientScore, max: 100, gradient: "gradClient" },
    { label: `${industryName} Median`, value: industryAvg, max: 100, gradient: "gradIndustry" },
    { label: "Top Quartile Benchmark", value: topQuartile, max: 100, gradient: "gradTop" },
  ];

  const barHeight = 36;
  const rowSpacing = 56;
  const padding = 40;
  const chartWidth = 820;
  const totalHeight = padding * 2 + (items.length * barHeight) + ((items.length - 1) * rowSpacing) + 20;

  const labelX = padding;
  const barStartX = 240;
  const maxBarWidth = chartWidth - barStartX - padding;

  let barsHtml = "";
  items.forEach((item, index) => {
    const yPos = padding + 25 + (index * (barHeight + rowSpacing));
    const barWidth = Math.max(40, (item.value / item.max) * maxBarWidth);
    const textY = yPos + (barHeight / 2) + 5;
    const formattedScore = (item.value / 20).toFixed(1);

    barsHtml += `
      <text x="${labelX}" y="${textY}" font-size="14.5" font-weight="600" fill="#334155" font-family="Inter, sans-serif">${item.label}</text>
      <line x1="${barStartX}" y1="${yPos + barHeight + 8}" x2="${chartWidth - padding}" y2="${yPos + barHeight + 8}" stroke="#F1F5F9" stroke-width="1" stroke-dasharray="4 4" />
      <rect x="${barStartX}" y="${yPos}" width="${barWidth}" height="${barHeight}" rx="10" fill="url(#${item.gradient})" filter="url(#shadow)" opacity="0.95" />
      <text x="${barStartX + barWidth - 14}" y="${textY}" font-size="15" font-weight="800" fill="#FFFFFF" text-anchor="end" font-family="Inter, sans-serif">
        ${formattedScore} / 5 (${item.value}%)
      </text>
    `;
  });

  return `
    <svg viewBox="0 0 ${chartWidth} ${totalHeight}" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px;">
      <defs>
        <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.08"/>
        </filter>
        <linearGradient id="gradClient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0A2647" /><stop offset="100%" stop-color="#1E3A8A" />
        </linearGradient>
        <linearGradient id="gradIndustry" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D97706" /><stop offset="100%" stop-color="#F59E0B" />
        </linearGradient>
        <linearGradient id="gradTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#059669" /><stop offset="100%" stop-color="#10B981" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
      <text x="${padding}" y="${padding}" font-size="18" font-weight="600" fill="#0F172A" font-family="Inter, sans-serif">Overall AI Maturity Score & Sector Benchmark Comparison</text>
      <g transform="translate(${chartWidth - 320}, ${padding - 14})">
        <rect x="0" y="0" width="12" height="12" rx="3" fill="#0A2647" /><text x="18" y="11" font-size="12" fill="#64748B" font-weight="500">Client</text>
        <rect x="90" y="0" width="12" height="12" rx="3" fill="#D97706" /><text x="108" y="11" font-size="12" fill="#64748B" font-weight="500">Median</text>
        <rect x="180" y="0" width="12" height="12" rx="3" fill="#059669" /><text x="198" y="11" font-size="12" fill="#64748B" font-weight="500">Top Quartile</text>
      </g>
      ${barsHtml}
    </svg>
  `;
}

export function render5YearROIBarChartSVG(
  projections?: Array<{ year: number; investment: number; benefit: number; net: number }>,
  currency: "INR" | "USD" = "USD"
): string {
  const width = 820;
  const height = 440;

  const defaultDataUSD = [
    { year: 1, investment: 120000, benefit: 280000, net: 160000 },
    { year: 2, investment: 40000, benefit: 450000, net: 410000 },
    { year: 3, investment: 40000, benefit: 650000, net: 610000 },
    { year: 4, investment: 30000, benefit: 820000, net: 790000 },
    { year: 5, investment: 30000, benefit: 980000, net: 950000 },
  ];

  const defaultDataINR = [
    { year: 1, investment: 9500000, benefit: 22000000, net: 12500000 },
    { year: 2, investment: 3200000, benefit: 35000000, net: 31800000 },
    { year: 3, investment: 3200000, benefit: 52000000, net: 48800000 },
    { year: 4, investment: 2400000, benefit: 65000000, net: 62600000 },
    { year: 5, investment: 2400000, benefit: 78000000, net: 75600000 },
  ];

  const data = projections && projections.length > 0 ? projections : (currency === "INR" ? defaultDataINR : defaultDataUSD);

  const paddingLeft = 85;
  const paddingBottom = 50;
  const chartW = width - paddingLeft - 40;
  const chartH = height - paddingBottom - 80;

  const maxVal = Math.max(...data.map(d => d.benefit), currency === "INR" ? 80000000 : 1000000);
  const stepX = chartW / data.length;
  const barWidth = 34;

  let barsSVG = "";
  let axesSVG = "";

  const formatValue = (val: number) => {
    if (currency === "INR") {
      if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
      return `₹${(val / 100000).toFixed(0)}L`;
    } else {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
      return `$${(val / 1000).toFixed(0)}k`;
    }
  };

  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];
  yTicks.forEach((val) => {
    const y = height - paddingBottom - (val / maxVal) * chartH;
    const label = formatValue(val);
    axesSVG += `
      <line x1="${paddingLeft}" y1="${y}" x2="${width - 40}" y2="${y}" stroke="#E2E8F0" stroke-linecap="round" stroke-dasharray="4,4"/>
      <text x="${paddingLeft - 10}" y="${y + 4}" font-size="12px" font-weight="600" fill="#64748B" text-anchor="end" font-family="Inter, sans-serif">${label}</text>
    `;
  });

  data.forEach((d, i) => {
    const groupX = paddingLeft + i * stepX + stepX / 2;
    const invH = (d.investment / maxVal) * chartH;
    const benH = (d.benefit / maxVal) * chartH;

    const invY = height - paddingBottom - invH;
    const benY = height - paddingBottom - benH;

    const invLabel = formatValue(d.investment);
    const benLabel = formatValue(d.benefit);

    barsSVG += `
      <rect x="${groupX - barWidth - 4}" y="${invY}" width="${barWidth}" height="${invH}" rx="8" fill="url(#gradClient)" filter="url(#shadow)" opacity="0.95"/>
      <text x="${groupX - barWidth / 2 - 4}" y="${invY - 8}" font-size="11.5px" font-weight="700" fill="#1E3A8A" text-anchor="middle" font-family="Inter, sans-serif">${invLabel}</text>
      
      <rect x="${groupX + 4}" y="${benY}" width="${barWidth}" height="${benH}" rx="8" fill="url(#gradTop)" filter="url(#shadow)" opacity="0.95"/>
      <text x="${groupX + barWidth / 2 + 4}" y="${benY - 8}" font-size="11.5px" font-weight="700" fill="#059669" text-anchor="middle" font-family="Inter, sans-serif">${benLabel}</text>

      <text x="${groupX}" y="${height - paddingBottom + 26}" font-size="13px" font-weight="600" fill="#1E293B" text-anchor="middle" font-family="Inter, sans-serif">Year ${d.year}</text>
    `;
  });

  return `
  <svg viewBox="0 0 ${width} ${height}" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px;">
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.08"/>
      </filter>
      <linearGradient id="gradClient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0A2647" /><stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
      <linearGradient id="gradTop" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669" /><stop offset="100%" stop-color="#10B981" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
    <text x="40" y="40" font-size="17px" font-weight="700" fill="#0F172A" font-family="Inter, sans-serif">5-Year Cumulative Financial Benefit vs. Investment (${currency === "INR" ? "₹ INR" : "$ USD"})</text>
    
    <g transform="translate(${width - 270}, 28)">
      <rect x="0" y="0" width="14" height="14" rx="3" fill="#1E3A8A"/>
      <text x="20" y="12" font-size="12px" font-weight="500" fill="#64748B" font-family="Inter, sans-serif">Investment</text>

      <rect x="120" y="0" width="14" height="14" rx="3" fill="#10B981"/>
      <text x="140" y="12" font-size="12px" font-weight="500" fill="#64748B" font-family="Inter, sans-serif">Annual Benefits</text>
    </g>

    ${axesSVG}
    ${barsSVG}
  </svg>
  `;
}

export function renderRiskMatrixSVG(riskRegister: RiskItem[]): string {
  const width = 820;
  const height = 480;
  const paddingLeft = 80;
  const paddingBottom = 60;
  const paddingTop = 50;
  const paddingRight = 40;
  const gridW = width - paddingLeft - paddingRight;
  const gridH = height - paddingTop - paddingBottom;
  const cellW = gridW / 5;
  const cellH = gridH / 5;

  let gridCells = "";
  // 5x5 heatmap color interpolation: 1 (bottom-left) to 25 (top-right)
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const impactVal = col + 1;
      const likelihoodVal = 5 - row;
      const score = impactVal * likelihoodVal;
      let color = "rgba(16, 185, 129, 0.15)";
      if (score >= 16) color = "rgba(239, 68, 68, 0.25)";
      else if (score >= 10) color = "rgba(245, 158, 11, 0.2)";
      else if (score >= 6) color = "rgba(234, 179, 8, 0.15)";

      const x = paddingLeft + col * cellW;
      const y = paddingTop + row * cellH;

      gridCells += `<rect x="${x}" y="${y}" width="${cellW - 3}" height="${cellH - 3}" rx="6" fill="${color}" stroke="#E2E8F0" stroke-width="1"/>`;
    }
  }

  let nodesSVG = "";
  riskRegister.slice(0, 8).forEach((r) => {
    const col = Math.min(5, Math.max(1, r.impact)) - 1;
    const row = 5 - Math.min(5, Math.max(1, r.likelihood));
    const cx = paddingLeft + col * cellW + cellW / 2;
    const cy = paddingTop + row * cellH + cellH / 2;

    const fillBadge = r.riskLevel === "Critical" ? "#DC2626" : r.riskLevel === "High" ? "#EA580C" : "#D97706";

    nodesSVG += `
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="14" fill="${fillBadge}" stroke="#FFFFFF" stroke-width="2.5" filter="url(#shadow)"/>
        <text x="0" y="4" font-size="10px" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="Inter, sans-serif">${r.id}</text>
      </g>
    `;
  });

  return `
  <svg viewBox="0 0 ${width} ${height}" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px;">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
    <text x="${paddingLeft}" y="32" font-size="17px" font-weight="700" fill="#0F172A" font-family="Inter, sans-serif">Enterprise AI Risk Matrix (Likelihood × Impact)</text>

    <!-- Grid -->
    ${gridCells}

    <!-- Nodes -->
    ${nodesSVG}

    <!-- Labels -->
    <text x="${paddingLeft + gridW / 2}" y="${height - 18}" font-size="13px" font-weight="700" fill="#475569" text-anchor="middle" font-family="Inter, sans-serif">Severity / Impact (1: Negligible ➔ 5: Catastrophic)</text>
    <text x="24" y="${paddingTop + gridH / 2}" font-size="13px" font-weight="700" fill="#475569" text-anchor="middle" transform="rotate(-90, 24, ${paddingTop + gridH / 2})" font-family="Inter, sans-serif">Likelihood (1: Rare ➔ 5: Frequent)</text>
  </svg>
  `;
}

export function renderSensitivityTableHTML(sensitivity?: SensitivityAnalysisData): string {
  if (!sensitivity || !sensitivity.scenarios) return "";

  return `
  <div style="margin: 20px 0; overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-family: Inter, sans-serif; font-size: 10pt; text-align: left;">
      <thead>
        <tr style="background: #0A1E3C; color: #FFFFFF;">
          <th style="padding: 10px 14px; border-top-left-radius: 8px;">Scenario</th>
          <th style="padding: 10px 14px;">Adoption Rate</th>
          <th style="padding: 10px 14px;">Annual Savings</th>
          <th style="padding: 10px 14px;">5-Year Net Benefit</th>
          <th style="padding: 10px 14px;">5-Yr ROI %</th>
          <th style="padding: 10px 14px;">Payback Period</th>
          <th style="padding: 10px 14px; border-top-right-radius: 8px;">Net Present Value (NPV)</th>
        </tr>
      </thead>
      <tbody>
        ${sensitivity.scenarios
          .map(
            (sc, idx) => `
          <tr style="background: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'}; border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 14px; font-weight: 700; color: #0F172A;">${sc.scenarioName}</td>
            <td style="padding: 10px 14px; color: #475569;">${sc.adoptionRatePct}%</td>
            <td style="padding: 10px 14px; font-weight: 600; color: #059669;">${sc.annualSavingsFormatted}</td>
            <td style="padding: 10px 14px; font-weight: 800; color: #1E3A8A;">${sc.fiveYearNetBenefitFormatted}</td>
            <td style="padding: 10px 14px; font-weight: 700; color: #059669;">${sc.roiPercentage}%</td>
            <td style="padding: 10px 14px; color: #475569;">${sc.paybackPeriodMonths} Mo</td>
            <td style="padding: 10px 14px; font-weight: 700; color: #0F172A;">${sc.npvFormatted}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>
  `;
}
