// src/lib/report/pdfComponentEngine.ts

import { ChartPayloads, ExecutiveKPICard, DepartmentScorecard, UseCaseItem } from "./types";

export function renderRadarChartSVG(radarData: Array<{ subject: string; score: number; fullMark: number }>): string {
  const width = 500;
  const height = 340;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 110;
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
    gridPolygons += `<polygon points="${points}" fill="none" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="${level === 1 ? 'none' : '3,3'}"/>`;
  });

  // Axes lines & labels
  let axesLines = "";
  let dataPoints: string[] = [];

  radarData.forEach((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const endX = centerX + radius * Math.cos(angle);
    const endY = centerY + radius * Math.sin(angle);
    axesLines += `<line x1="${centerX}" y1="${centerY}" x2="${endX.toFixed(1)}" y2="${endY.toFixed(1)}" stroke="#CBD5E1" stroke-width="1"/>`;

    // Data polygon point calculation
    const valRatio = Math.min(100, Math.max(0, d.score)) / 100;
    const dataX = centerX + radius * valRatio * Math.cos(angle);
    const dataY = centerY + radius * valRatio * Math.sin(angle);
    dataPoints.push(`${dataX.toFixed(1)},${dataY.toFixed(1)}`);

    // Label positioning
    const labelRadius = radius + 25;
    const labelX = centerX + labelRadius * Math.cos(angle);
    const labelY = centerY + labelRadius * Math.sin(angle);
    const anchor = Math.abs(labelX - centerX) < 10 ? "middle" : labelX > centerX ? "start" : "end";
    axesLines += `<text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" font-family="Inter, sans-serif" font-size="10px" font-weight="600" fill="#334155" text-anchor="${anchor}">${d.subject} (${d.score}%)</text>`;
  });

  const polygonPoints = dataPoints.join(" ");

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px; font-family:Inter, sans-serif;">
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12"/>
    <text x="20" y="30" font-size="14px" font-weight="800" fill="#0A1E3C">Capability Maturity Radar (8 Dimensions)</text>
    <g transform="translate(0, 15)">
      ${gridPolygons}
      ${axesLines}
      <polygon points="${polygonPoints}" fill="rgba(14, 165, 233, 0.25)" stroke="#0284C7" stroke-width="2.5"/>
      ${radarData.map((d, i) => {
        const pt = dataPoints[i].split(",");
        return `<circle cx="${pt[0]}" cy="${pt[1]}" r="4" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.5"/>`;
      }).join("")}
    </g>
  </svg>
  `;
}

export function renderHeatmapSVG(heatmapData: Array<{ department: string; dimension: string; score: number }>): string {
  const width = 500;
  const height = 240;
  
  const depts = Array.from(new Set(heatmapData.map((d) => d.department))).slice(0, 6);
  const dims = Array.from(new Set(heatmapData.map((d) => d.dimension))).slice(0, 4);

  const cellWidth = 75;
  const cellHeight = 32;
  const startX = 160;
  const startY = 50;

  let dimHeaders = dims.map((dim, i) => {
    return `<text x="${startX + i * cellWidth + cellWidth / 2}" y="${startY - 10}" font-size="10px" font-weight="700" fill="#475569" text-anchor="middle">${dim}</text>`;
  }).join("");

  let cells = "";
  depts.forEach((dept, r) => {
    cells += `<text x="150" y="${startY + r * cellHeight + cellHeight / 2 + 4}" font-size="10px" font-weight="700" fill="#1E293B" text-anchor="end">${dept}</text>`;
    dims.forEach((dim, c) => {
      const item = heatmapData.find((h) => h.department === dept && h.dimension === dim);
      const score = item ? item.score : 60;
      
      let fillColor = "#E0F2FE"; // low
      let textColor = "#0369A1";
      if (score >= 80) {
        fillColor = "#10B981"; // high
        textColor = "#FFFFFF";
      } else if (score >= 60) {
        fillColor = "#3B82F6"; // medium-high
        textColor = "#FFFFFF";
      } else if (score >= 45) {
        fillColor = "#F59E0B"; // medium
        textColor = "#FFFFFF";
      } else {
        fillColor = "#EF4444"; // low
        textColor = "#FFFFFF";
      }

      const x = startX + c * cellWidth;
      const y = startY + r * cellHeight;
      cells += `
        <rect x="${x}" y="${y}" width="${cellWidth - 4}" height="${cellHeight - 4}" rx="6" fill="${fillColor}"/>
        <text x="${x + cellWidth / 2 - 2}" y="${y + cellHeight / 2 + 3}" font-size="10px" font-weight="800" fill="${textColor}" text-anchor="middle">${score}%</text>
      `;
    });
  });

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px; font-family:Inter, sans-serif;">
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12"/>
    <text x="20" y="25" font-size="14px" font-weight="800" fill="#0A1E3C">Department AI Capability Heatmap</text>
    ${dimHeaders}
    ${cells}
  </svg>
  `;
}

export function renderOpportunityMatrixSVG(useCases: UseCaseItem[]): string {
  const width = 500;
  const height = 300;
  const padding = 40;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2 - 20;

  let pointsSVG = "";
  useCases.forEach((uc) => {
    const x = padding + (uc.implementationEffortScore / 100) * innerW;
    const y = height - padding - (uc.businessValueScore / 100) * innerH;

    let dotColor = "#10B981"; // Quick Win
    if (uc.category === "Strategic Bet") dotColor = "#3B82F6";
    else if (uc.category === "Re-evaluate") dotColor = "#EF4444";
    else dotColor = "#64748B";

    pointsSVG += `
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${dotColor}" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="${(x + 8).toFixed(1)}" y="${(y + 3).toFixed(1)}" font-size="9px" font-weight="600" fill="#1E293B">${uc.name.substring(0, 18)}...</text>
    `;
  });

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px; font-family:Inter, sans-serif;">
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12"/>
    <text x="20" y="25" font-size="14px" font-weight="800" fill="#0A1E3C">AI Opportunity Matrix (Impact vs. Effort)</text>
    
    <!-- Quadrant Backgrounds -->
    <rect x="${padding}" y="${padding}" width="${innerW / 2}" height="${innerH / 2}" fill="rgba(16, 185, 129, 0.08)" rx="4"/>
    <text x="${padding + 10}" y="${padding + 20}" font-size="10px" font-weight="800" fill="#047857">⚡ QUICK WINS (High Value, Low Effort)</text>
    
    <rect x="${padding + innerW / 2}" y="${padding}" width="${innerW / 2}" height="${innerH / 2}" fill="rgba(59, 130, 246, 0.08)" rx="4"/>
    <text x="${padding + innerW / 2 + 10}" y="${padding + 20}" font-size="10px" font-weight="800" fill="#1D4ED8">🚀 STRATEGIC BETS (High Value, High Effort)</text>
    
    <!-- Axes -->
    <line x1="${padding}" y1="${padding + innerH / 2}" x2="${padding + innerW}" y2="${padding + innerH / 2}" stroke="#CBD5E1" stroke-dasharray="4,4"/>
    <line x1="${padding + innerW / 2}" y1="${padding}" x2="${padding + innerW / 2}" y2="${padding + innerH}" stroke="#CBD5E1" stroke-dasharray="4,4"/>

    <!-- Plot Points -->
    ${pointsSVG}

    <!-- Axis Labels -->
    <text x="${width / 2}" y="${height - 8}" font-size="10px" font-weight="700" fill="#64748B" text-anchor="middle">Implementation Effort →</text>
    <text x="12" y="${height / 2}" font-size="10px" font-weight="700" fill="#64748B" text-anchor="middle" transform="rotate(-90, 12, ${height / 2})">Business Impact →</text>
  </svg>
  `;
}

export function renderExecutiveKPICardsHTML(kpiCards: ExecutiveKPICard[]): string {
  return `
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
    ${kpiCards
      .map(
        (card) => `
      <div style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <div style="font-size: 9pt; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">${card.label}</div>
        <div style="font-size: 20pt; font-weight: 900; color: #0A1E3C; margin: 4px 0;">${card.value}</div>
        <div style="font-size: 8pt; font-weight: 600; color: ${card.status === 'positive' ? '#10B981' : '#64748B'};">${card.subtext || ''}</div>
      </div>
    `
      )
      .join("")}
  </div>
  `;
}

export function renderMaturityComparisonSVG(data?: { clientScore?: number; industryAvg?: number; topQuartile?: number }): string {
  const client = data?.clientScore || 42;
  const industry = data?.industryAvg || 62;
  const gap = Math.max(0, industry - client);
  const topQ = data?.topQuartile || 85;

  const width = 560;
  const height = 160;

  const items = [
    { label: "Client Score", val: client, color: "#0284C7" },
    { label: "Industry Average", val: industry, color: "#3B82F6" },
    { label: "Maturity Gap", val: gap, color: "#EF4444" },
    { label: "Top Quartile", val: topQ, color: "#10B981" }
  ];

  const barYStart = 40;
  const barHeight = 20;
  const barSpacing = 28;
  const maxW = 340;

  let barsHTML = "";
  items.forEach((item, i) => {
    const y = barYStart + i * barSpacing;
    const barW = Math.max(10, Math.min(maxW, (item.val / 100) * maxW));
    barsHTML += `
      <text x="140" y="${y + 14}" font-size="11px" font-weight="700" fill="#334155" text-anchor="end">${item.label}</text>
      <rect x="150" y="${y}" width="${maxW}" height="${barHeight}" rx="4" fill="#F1F5F9"/>
      <rect x="150" y="${y}" width="${barW}" height="${barHeight}" rx="4" fill="${item.color}"/>
      <text x="${158 + barW}" y="${y + 14}" font-size="11px" font-weight="800" fill="#0F172A">${item.val}/100</text>
    `;
  });

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px; font-family:Inter, sans-serif;">
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
    <text x="20" y="25" font-size="13px" font-weight="800" fill="#0A1E3C">AI Readiness Benchmark Comparison</text>
    ${barsHTML}
  </svg>
  `;
}

export function render5YearROIBarChartSVG(projections?: Array<{ year: number; investment: number; benefit: number; net: number }>): string {
  const width = 560;
  const height = 220;

  const defaultData = projections && projections.length > 0 ? projections : [
    { year: 1, investment: 120000, benefit: 280000, net: 160000 },
    { year: 2, investment: 40000, benefit: 450000, net: 410000 },
    { year: 3, investment: 40000, benefit: 650000, net: 610000 },
    { year: 4, investment: 30000, benefit: 820000, net: 790000 },
    { year: 5, investment: 30000, benefit: 980000, net: 950000 },
  ];

  const paddingLeft = 50;
  const paddingBottom = 35;
  const chartW = width - paddingLeft - 30;
  const chartH = height - paddingBottom - 45;

  const maxVal = Math.max(...defaultData.map(d => d.benefit), 1000000);
  const stepX = chartW / defaultData.length;
  const barWidth = 24;

  let barsSVG = "";
  let axesSVG = "";

  // Y-axis gridlines
  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];
  yTicks.forEach((val) => {
    const y = height - paddingBottom - (val / maxVal) * chartH;
    const label = `$${(val / 1000).toFixed(0)}k`;
    axesSVG += `
      <line x1="${paddingLeft}" y1="${y}" x2="${width - 30}" y2="${y}" stroke="#E2E8F0" stroke-linecap="round" stroke-dasharray="2,3"/>
      <text x="${paddingLeft - 8}" y="${y + 4}" font-size="9px" font-weight="600" fill="#64748B" text-anchor="end">${label}</text>
    `;
  });

  defaultData.forEach((d, i) => {
    const groupX = paddingLeft + i * stepX + stepX / 2;
    const invH = (d.investment / maxVal) * chartH;
    const benH = (d.benefit / maxVal) * chartH;

    const invY = height - paddingBottom - invH;
    const benY = height - paddingBottom - benH;

    barsSVG += `
      <!-- Investment bar -->
      <rect x="${groupX - barWidth - 2}" y="${invY}" width="${barWidth}" height="${invH}" rx="3" fill="#64748B"/>
      <!-- Benefit bar -->
      <rect x="${groupX + 2}" y="${benY}" width="${barWidth}" height="${benH}" rx="3" fill="#10B981"/>
      
      <!-- X-label -->
      <text x="${groupX}" y="${height - paddingBottom + 16}" font-size="10px" font-weight="700" fill="#1E293B" text-anchor="middle">Year ${d.year}</text>
    `;
  });

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#FFFFFF; border-radius:12px; font-family:Inter, sans-serif;">
    <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1"/>
    <text x="20" y="24" font-size="13px" font-weight="800" fill="#0A1E3C">5-Year Cumulative Financial Benefit vs. Investment ($ USD)</text>
    
    <!-- Legend -->
    <rect x="${width - 190}" y="12" width="10" height="10" rx="2" fill="#64748B"/>
    <text x="${width - 176}" y="21" font-size="9px" font-weight="600" fill="#475569">Investment</text>

    <rect x="${width - 105}" y="12" width="10" height="10" rx="2" fill="#10B981"/>
    <text x="${width - 91}" y="21" font-size="9px" font-weight="600" fill="#475569">Annual Benefits</text>

    ${axesSVG}
    ${barsSVG}
  </svg>
  `;
}

