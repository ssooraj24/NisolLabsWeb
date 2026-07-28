"use client";

import React, { useState } from "react";

export interface MaturityRadarProps {
  data: Record<string, number> | any;
  showTarget?: boolean;
  targetData?: Record<string, number>;
  onScoreChange?: (capability: string, score: number) => void;
  overallScore?: number;
}

export function MaturityRadar({
  data,
  showTarget = true,
  targetData,
  onScoreChange,
  overallScore,
}: MaturityRadarProps) {
  // 1. Normalize capability scores dictionary into list of { name, current, target }
  let capabilities: { name: string; current: number; target: number }[] = [];

  if (Array.isArray(data)) {
    capabilities = data.map((item: any) => ({
      name: item.name || item.capability || "Unknown",
      current: typeof item.score === "number" ? item.score : Number(item.current) || 3,
      target: typeof item.target === "number" ? item.target : 4.5,
    }));
  } else if (typeof data === "object" && data !== null) {
    capabilities = Object.entries(data).map(([name, val]) => {
      const current = typeof val === "number" ? val : Number((val as any)?.score) || 3;
      const target = targetData && targetData[name] !== undefined ? targetData[name] : Math.min(5, current + 1.0);
      return { name, current, target };
    });
  }

  // Ensure default capabilities if empty
  if (capabilities.length === 0) {
    const defaults = [
      "Leadership & Strategy",
      "IT / Technology",
      "Data & Analytics",
      "Security & Compliance",
      "Customer Service",
      "Sales",
      "Marketing",
      "Operations & Supply Chain",
      "Finance",
      "HR",
      "Procurement",
      "Legal",
      "Knowledge Management",
      "Project Management",
      "Culture & Change",
    ];
    capabilities = defaults.map((name) => ({ name, current: 3.5, target: 4.5 }));
  }

  const [selectedCap, setSelectedCap] = useState<string | null>(null);

  // SVG Radar Dimensions & Geometry
  const size = 500;
  const center = size / 2;
  const radius = 170;
  const levels = [1, 2, 3, 4, 5];
  const numAxes = capabilities.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Helper to convert polar coordinates to Cartesian SVG (x, y)
  const getCoordinates = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 5) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate SVG polygon points string
  const currentPoints = capabilities
    .map((c, i) => {
      const { x, y } = getCoordinates(i, c.current);
      return `${x},${y}`;
    })
    .join(" ");

  const targetPoints = capabilities
    .map((c, i) => {
      const { x, y } = getCoordinates(i, c.target);
      return `${x},${y}`;
    })
    .join(" ");

  const calculatedAvg = (
    capabilities.reduce((acc, c) => acc + c.current, 0) / capabilities.length
  ).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#0A1E3C]">AI Maturity Radar Chart</h3>
            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
              {numAxes} Capabilities
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Spider radar breakdown comparing current score (1.0–5.0) against target benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
              <span className="text-slate-700">Current Posture ({overallScore ? overallScore.toFixed(1) : calculatedAvg})</span>
            </div>
            {showTarget && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-600 inline-block border-dashed" />
                <span className="text-slate-700">Target Benchmark</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Radar Graphic Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
            {/* Concentric Level Circles */}
            {levels.map((lvl) => {
              const r = (lvl / 5) * radius;
              return (
                <g key={lvl}>
                  <circle
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray={lvl === 5 ? "none" : "3,3"}
                  />
                  <text
                    x={center + 4}
                    y={center - r + 12}
                    className="text-[9px] fill-slate-400 font-mono font-semibold"
                  >
                    {lvl}.0
                  </text>
                </g>
              );
            })}

            {/* Axis Lines & Labels */}
            {capabilities.map((c, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const lineEnd = {
                x: center + radius * Math.cos(angle),
                y: center + radius * Math.sin(angle),
              };
              const labelPos = {
                x: center + (radius + 28) * Math.cos(angle),
                y: center + (radius + 18) * Math.sin(angle),
              };

              const isSelected = selectedCap === c.name;

              return (
                <g key={c.name} className="cursor-pointer" onClick={() => setSelectedCap(c.name)}>
                  <line
                    x1={center}
                    y1={center}
                    x2={lineEnd.x}
                    y2={lineEnd.y}
                    stroke={isSelected ? "#2563EB" : "#CBD5E1"}
                    strokeWidth={isSelected ? "2" : "1"}
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor={labelPos.x > center ? "start" : labelPos.x < center ? "end" : "middle"}
                    dominantBaseline="middle"
                    className={`text-[10px] font-bold transition-colors ${
                      isSelected ? "fill-blue-600 font-extrabold text-xs" : "fill-slate-700 hover:fill-blue-600"
                    }`}
                  >
                    {c.name.length > 16 ? `${c.name.substring(0, 14)}...` : c.name} ({c.current})
                  </text>
                </g>
              );
            })}

            {/* Target Polygon (Overlay) */}
            {showTarget && (
              <polygon
                points={targetPoints}
                fill="rgba(52, 211, 153, 0.15)"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            )}

            {/* Current Posture Polygon */}
            <polygon
              points={currentPoints}
              fill="rgba(37, 99, 235, 0.25)"
              stroke="#2563EB"
              strokeWidth="3"
              className="transition-all duration-500"
            />

            {/* Data Point Handles */}
            {capabilities.map((c, i) => {
              const { x, y } = getCoordinates(i, c.current);
              const isSelected = selectedCap === c.name;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={isSelected ? "7" : "4.5"}
                  className="fill-blue-600 stroke-white stroke-2 hover:scale-125 cursor-pointer transition-transform"
                  onClick={() => setSelectedCap(c.name)}
                >
                  <title>{`${c.name}: ${c.current} / 5.0`}</title>
                </circle>
              );
            })}
          </svg>
        </div>

        {/* Sidebar Legend & Interactive Adjuster */}
        <div className="w-full lg:w-72 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold text-[#0A1E3C] uppercase tracking-wider border-b border-slate-200 pb-2">
            Capability Score Inspector
          </h4>

          {selectedCap ? (
            (() => {
              const capItem = capabilities.find((c) => c.name === selectedCap);
              if (!capItem) return null;
              return (
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{capItem.name}</span>
                    <span className="text-[11px] text-slate-500">Current Score: {capItem.current} / 5.0</span>
                  </div>

                  {onScoreChange && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 block">Adjust Score:</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={capItem.current}
                        onChange={(e) => onScoreChange(capItem.name, parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            <p className="text-xs text-slate-500 italic">
              Click any node or label on the radar chart to inspect or adjust individual capability scores.
            </p>
          )}

          <div className="pt-2 border-t border-slate-200 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 block">Score Legend:</span>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold border border-emerald-100">4.0 - 5.0: Leader</span>
              <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-semibold border border-blue-100">3.0 - 3.9: Mature</span>
              <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold border border-amber-100">2.0 - 2.9: Developing</span>
              <span className="text-red-700 bg-red-50 px-1.5 py-0.5 rounded font-semibold border border-red-100">1.0 - 1.9: Initial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
