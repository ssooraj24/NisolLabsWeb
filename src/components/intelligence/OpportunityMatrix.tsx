"use client";

import React, { useState } from "react";
import { Sparkles, LayoutGrid, CircleDot, Filter } from "lucide-react";

export interface OpportunityItem {
  id?: string;
  name: string;
  department?: string;
  description?: string;
  business_value?: string | number;
  feasibility?: string | number;
  businessValueScore?: number; // 0-100
  implementationEffortScore?: number; // 0-100 (Effort = 100 - Feasibility)
  category?: "Quick Win" | "Strategic Bet" | "Incremental" | "Long-Term" | "Re-evaluate" | "Long-term Fill";
  estimatedRoiPercentage?: number;
  estimatedTimelineWeeks?: number;
  techStack?: string[];
  complexity?: "Low" | "Medium" | "High";
}

interface OpportunityMatrixProps {
  data?: {
    quadrants?: {
      quick_wins?: OpportunityItem[];
      strategic_bets?: OpportunityItem[];
      incremental_improvements?: OpportunityItem[];
      long_term_investments?: OpportunityItem[];
    };
    useCases?: OpportunityItem[];
  };
}

export function OpportunityMatrix({ data }: OpportunityMatrixProps) {
  const [viewMode, setViewMode] = useState<"bubble" | "quadrants">("bubble");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [hoveredItem, setHoveredItem] = useState<OpportunityItem | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const q = data?.quadrants || {};
  const rawQuickWins = q.quick_wins || [];
  const rawStrategicBets = q.strategic_bets || [];
  const rawIncremental = q.incremental_improvements || [];
  const rawLongTerm = q.long_term_investments || [];

  // Consolidate all items
  const allItems: OpportunityItem[] = [
    ...rawQuickWins.map((item) => ({ ...item, category: "Quick Win" as const })),
    ...rawStrategicBets.map((item) => ({ ...item, category: "Strategic Bet" as const })),
    ...rawIncremental.map((item) => ({ ...item, category: "Incremental" as const })),
    ...rawLongTerm.map((item) => ({ ...item, category: "Long-Term" as const })),
  ];

  // If quadrants empty, fallback to defaults
  const items = allItems.length > 0 ? allItems : [
    { name: "AI-Driven Automated QA Test Generation", department: "Engineering", businessValueScore: 88, implementationEffortScore: 28, category: "Quick Win" as const, estimatedRoiPercentage: 340, estimatedTimelineWeeks: 4, complexity: "Low" as const, techStack: ["Playwright", "Claude 3.5 Sonnet"] },
    { name: "Omnichannel 24/7 AI Customer Support Concierge", department: "Customer Support", businessValueScore: 92, implementationEffortScore: 32, category: "Quick Win" as const, estimatedRoiPercentage: 380, estimatedTimelineWeeks: 6, complexity: "Low" as const, techStack: ["Voice/Chat LLM", "pgvector", "FastAPI"] },
    { name: "Automated Invoice OCR & AP Reconciliation", department: "Finance", businessValueScore: 86, implementationEffortScore: 36, category: "Quick Win" as const, estimatedRoiPercentage: 310, estimatedTimelineWeeks: 5, complexity: "Low" as const, techStack: ["GPT-4o Vision", "SAP Connector"] },
    { name: "AI Sales Proposal & RFP Auto-Generator", department: "Sales", businessValueScore: 85, implementationEffortScore: 40, category: "Quick Win" as const, estimatedRoiPercentage: 290, estimatedTimelineWeeks: 6, complexity: "Medium" as const, techStack: ["Hybrid RAG", "LlamaIndex"] },
    { name: "Multi-Modal Algorithmic Underwriting & Credit Scoring", department: "Lending & Underwriting", businessValueScore: 95, implementationEffortScore: 68, category: "Strategic Bet" as const, estimatedRoiPercentage: 420, estimatedTimelineWeeks: 14, complexity: "High" as const, techStack: ["XGBoost", "Confidential AI", "Postgres"] },
    { name: "Autonomous Asset Predictive Maintenance Engine", department: "Operations", businessValueScore: 90, implementationEffortScore: 64, category: "Strategic Bet" as const, estimatedRoiPercentage: 390, estimatedTimelineWeeks: 12, complexity: "High" as const, techStack: ["TimesFM", "Kafka", "TimescaleDB"] },
    { name: "Internal SOP & Policy RAG Assistant", department: "HR & Operations", businessValueScore: 62, implementationEffortScore: 25, category: "Incremental" as const, estimatedRoiPercentage: 210, estimatedTimelineWeeks: 3, complexity: "Low" as const, techStack: ["Pinecone", "Slack Bot"] },
    { name: "Weekly Executive BI Commentary Generator", department: "Leadership", businessValueScore: 58, implementationEffortScore: 22, category: "Incremental" as const, estimatedRoiPercentage: 180, estimatedTimelineWeeks: 3, complexity: "Low" as const, techStack: ["Claude 3.5 Haiku", "ClickHouse"] },
  ];

  // Extract departments
  const departments = ["all", ...Array.from(new Set(items.map((it) => it.department || "General")))];

  // Filter items
  const filteredItems = items.filter((it) => {
    if (selectedDept === "all") return true;
    return (it.department || "General") === selectedDept;
  });

  // SVG Chart Geometry
  const width = 800;
  const height = 480;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  // Colors per category
  const categoryConfig: Record<string, { bg: string; border: string; text: string; fill: string }> = {
    "Quick Win": { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", border: "#059669", text: "#047857", fill: "#10B981" },
    "Strategic Bet": { bg: "bg-indigo-50 text-indigo-700 border-indigo-200", border: "#4338CA", text: "#3730A3", fill: "#6366F1" },
    "Incremental": { bg: "bg-blue-50 text-blue-700 border-blue-200", border: "#2563EB", text: "#1D4ED8", fill: "#3B82F6" },
    "Long-Term": { bg: "bg-amber-50 text-amber-700 border-amber-200", border: "#D97706", text: "#B45309", fill: "#F59E0B" },
    "Re-evaluate": { bg: "bg-rose-50 text-rose-700 border-rose-200", border: "#DC2626", text: "#B91C1C", fill: "#EF4444" },
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            Strategic Portfolio Optimization
          </div>
          <h3 className="text-xl font-bold text-[#0A1E3C]">AI Opportunity Prioritization Matrix</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            2D Value vs Feasibility bubble chart sized by projected financial ROI magnitude.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer pr-2"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("bubble")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "bubble" ? "bg-white text-[#0A1E3C] shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              2D Bubble Chart
            </button>
            <button
              onClick={() => setViewMode("quadrants")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "quadrants" ? "bg-white text-[#0A1E3C] shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Quadrant Cards
            </button>
          </div>
        </div>
      </div>

      {viewMode === "bubble" ? (
        /* Interactive 2D Bubble Chart View */
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 p-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="bubbleShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Quadrant Background Zones */}
            {/* Top-Right: Quick Wins (High Value, High Feasibility = Low Effort) */}
            {/* Note: Feasibility (X-axis: 0% Low ➔ 100% High) */}
            <rect
              x={padding.left + innerW / 2}
              y={padding.top}
              width={innerW / 2}
              height={innerH / 2}
              fill="rgba(16, 185, 129, 0.08)"
              rx="8"
            />
            <text x={padding.left + innerW - 12} y={padding.top + 24} textAnchor="end" fontSize="11" fontWeight="800" fill="#047857">
              ⚡ QUICK WINS (High Value, High Feasibility)
            </text>

            {/* Top-Left: Strategic Bets (High Value, Lower Feasibility) */}
            <rect
              x={padding.left}
              y={padding.top}
              width={innerW / 2}
              height={innerH / 2}
              fill="rgba(99, 102, 241, 0.08)"
              rx="8"
            />
            <text x={padding.left + 12} y={padding.top + 24} textAnchor="start" fontSize="11" fontWeight="800" fill="#3730A3">
              🚀 STRATEGIC BETS (High Value, Complex Build)
            </text>

            {/* Bottom-Right: Incremental (Lower Value, High Feasibility) */}
            <rect
              x={padding.left + innerW / 2}
              y={padding.top + innerH / 2}
              width={innerW / 2}
              height={innerH / 2}
              fill="rgba(59, 130, 246, 0.06)"
              rx="8"
            />
            <text x={padding.left + innerW - 12} y={height - padding.bottom - 12} textAnchor="end" fontSize="11" fontWeight="800" fill="#1D4ED8">
              🔧 INCREMENTAL WINS (Modest Value, Easy Build)
            </text>

            {/* Bottom-Left: Long-Term / Re-Evaluate */}
            <rect
              x={padding.left}
              y={padding.top + innerH / 2}
              width={innerW / 2}
              height={innerH / 2}
              fill="rgba(245, 158, 11, 0.05)"
              rx="8"
            />
            <text x={padding.left + 12} y={height - padding.bottom - 12} textAnchor="start" fontSize="11" fontWeight="800" fill="#B45309">
              ⏳ LONG-TERM FILL-INS (Low Urgency)
            </text>

            {/* Quadrant Dividers */}
            <line
              x1={padding.left}
              y1={padding.top + innerH / 2}
              x2={padding.left + innerW}
              y2={padding.top + innerH / 2}
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />
            <line
              x1={padding.left + innerW / 2}
              y1={padding.top}
              x2={padding.left + innerW / 2}
              y2={padding.top + innerH}
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />

            {/* Axis Lines & Labels */}
            <text x={padding.left + innerW / 2} y={height - 18} fontSize="12" fontWeight="700" fill="#475569" textAnchor="middle">
              Implementation Feasibility (0% Complex ➔ 100% Plug-and-Play)
            </text>
            <text
              x="20"
              y={padding.top + innerH / 2}
              fontSize="12"
              fontWeight="700"
              fill="#475569"
              textAnchor="middle"
              transform={`rotate(-90, 20, ${padding.top + innerH / 2})`}
            >
              Business Value & Financial Impact (0% Low ➔ 100% Transformative)
            </text>

            {/* Render Bubbles */}
            {filteredItems.map((item, idx) => {
              // Calculate Feasibility (100 - Effort)
              const effort = item.implementationEffortScore || 40;
              const feasibility = 100 - effort;
              const impact = item.businessValueScore || 75;
              const roi = item.estimatedRoiPercentage || 280;

              const cx = padding.left + (feasibility / 100) * innerW;
              const cy = padding.top + innerH - (impact / 100) * innerH;
              // Radius scaled by ROI percentage
              const radius = Math.min(26, Math.max(12, 10 + (roi / 450) * 16));

              const catColor = categoryConfig[item.category || "Quick Win"] || categoryConfig["Quick Win"];
              const isHovered = hoveredItem?.name === item.name;

              return (
                <g
                  key={idx}
                  transform={`translate(${cx}, ${cy})`}
                  className="cursor-pointer transition-transform duration-200"
                  style={{ transform: isHovered ? `translate(${cx}px, ${cy}px) scale(1.18)` : `translate(${cx}px, ${cy}px)` }}
                  onMouseEnter={(e) => {
                    setHoveredItem(item);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoverPos({ x: rect.x + rect.width / 2, y: rect.y });
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={radius}
                    fill={catColor.fill}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    filter="url(#bubbleShadow)"
                    opacity={isHovered ? 1 : 0.9}
                  />
                  <text
                    x="0"
                    y="4"
                    fontSize={radius > 16 ? "11" : "9"}
                    fontWeight="900"
                    fill="#FFFFFF"
                    textAnchor="middle"
                  >
                    #{idx + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Hover Tooltip Card */}
          {hoveredItem && (
            <div className="absolute bottom-4 right-4 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl space-y-2 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{hoveredItem.department || "General"}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    categoryConfig[hoveredItem.category || "Quick Win"]?.bg
                  }`}
                >
                  {hoveredItem.category || "Quick Win"}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{hoveredItem.name}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{hoveredItem.description}</p>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="font-extrabold text-emerald-600">
                  +{hoveredItem.estimatedRoiPercentage || 280}% Estimated ROI
                </span>
                <span className="text-slate-500 font-medium">
                  {hoveredItem.estimatedTimelineWeeks || 6} wks to value
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quadrant Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quadrant 1: Quick Wins */}
          <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                ⚡ Quick Wins (High Value, High Feasibility)
              </span>
              <span className="text-xs font-extrabold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
                {items.filter((i) => i.category === "Quick Win").length} Initiatives
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {items
                .filter((i) => i.category === "Quick Win")
                .map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-emerald-100 text-xs shadow-2xs space-y-1">
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span className="text-emerald-700 font-semibold">{item.department}</span>
                      <span className="font-bold text-emerald-600">+{item.estimatedRoiPercentage || 300}% ROI</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quadrant 2: Strategic Bets */}
          <div className="p-5 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-200/60 pb-2">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                🚀 Strategic Bets (High Value, Complex Build)
              </span>
              <span className="text-xs font-extrabold bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded-full">
                {items.filter((i) => i.category === "Strategic Bet").length} Initiatives
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {items
                .filter((i) => i.category === "Strategic Bet")
                .map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-indigo-100 text-xs shadow-2xs space-y-1">
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span className="text-indigo-700 font-semibold">{item.department}</span>
                      <span className="font-bold text-indigo-600">+{item.estimatedRoiPercentage || 380}% ROI</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quadrant 3: Incremental */}
          <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                🔧 Incremental (Modest Value, Easy Build)
              </span>
              <span className="text-xs font-extrabold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-full">
                {items.filter((i) => i.category === "Incremental").length} Initiatives
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {items
                .filter((i) => i.category === "Incremental")
                .map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-blue-100 text-xs shadow-2xs space-y-1">
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span className="text-blue-700 font-semibold">{item.department}</span>
                      <span className="font-bold text-blue-600">+{item.estimatedRoiPercentage || 200}% ROI</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quadrant 4: Long-Term */}
          <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                ⏳ Long-Term (Low Urgency)
              </span>
              <span className="text-xs font-extrabold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                {items.filter((i) => i.category === "Long-Term").length} Initiatives
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {items
                .filter((i) => i.category === "Long-Term")
                .map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-amber-100 text-xs shadow-2xs space-y-1">
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span className="text-amber-700 font-semibold">{item.department}</span>
                      <span className="font-bold text-amber-600">+{item.estimatedRoiPercentage || 150}% ROI</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
