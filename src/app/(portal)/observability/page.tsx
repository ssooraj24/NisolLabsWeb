"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  Database,
  ExternalLink,
  Filter,
  Flame,
  Layers,
  Play,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { ObservabilityStatusResponse, TraceRecord } from "@/lib/observability/types";

export default function ObservabilityPage() {
  const [data, setData] = useState<ObservabilityStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [selectedTrace, setSelectedTrace] = useState<TraceRecord | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModelFilter, setSelectedModelFilter] = useState("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  // Interactive Test State
  const [testModel, setTestModel] = useState("gemini-flash-latest");
  const [testPrompt, setTestPrompt] = useState(
    "Analyze enterprise AI governance risks and produce a 3-bullet executive summary."
  );
  const [runLiveCall, setRunLiveCall] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<TraceRecord | null>(null);

  async function fetchObservabilityData() {
    try {
      const res = await fetch("/api/observability");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load observability data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchObservabilityData();
    const interval = setInterval(fetchObservabilityData, 20000);
    return () => clearInterval(interval);
  }, []);

  async function handleTriggerTest() {
    setTriggering(true);
    setLastTestResult(null);
    try {
      const res = await fetch("/api/observability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          traceName: `Portal Test: ${testModel}`,
          model: testModel,
          inputPrompt: testPrompt,
          runLiveCall,
          tenantName: "Nisol Test Enterprise",
          userId: "observability_admin",
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setLastTestResult(result.trace);
          setData(result.overview);
        }
      }
    } catch (err) {
      console.error("Error triggering test trace:", err);
    } finally {
      setTriggering(false);
    }
  }

  // Filtered traces
  const traces = data?.recentTraces || [];
  const filteredTraces = traces.filter((t) => {
    const matchesSearch =
      t.traceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.tenantName && t.tenantName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModel =
      selectedModelFilter === "ALL" ||
      (selectedModelFilter === "google" && t.provider === "google") ||
      (selectedModelFilter === "openai" && t.provider === "openai") ||
      (selectedModelFilter === "anthropic" && t.provider === "anthropic");

    const matchesStatus =
      selectedStatusFilter === "ALL" || t.status === selectedStatusFilter;

    return matchesSearch && matchesModel && matchesStatus;
  });

  const metrics = data?.metrics;
  const isConfigured = data?.config?.isConfigured;
  const langfuseUrl = data?.config?.baseUrl || "https://langfuse.nisolai.com";

  return (
    <div className="min-h-screen bg-[#071324] text-slate-100 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Activity className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  LLM Observability & Tracing
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-golden-500/20 text-golden-300 border border-golden-400/40">
                    Langfuse Engine
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Real-time prompt tracing, token cost accounting, latency benchmarking, and model evaluation for Nisol AI Core.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Langfuse Status Indicator */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                isConfigured
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-300"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span>
                {isConfigured ? "Langfuse Cloud Connected" : "Local Observer Active"}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => {
                setRefreshing(true);
                fetchObservabilityData();
              }}
              disabled={refreshing}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-golden-400" : ""}`}
              />
              <span>Sync</span>
            </button>

            {/* Direct Dashboard Link */}
            <a
              href={langfuseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-golden-500 to-amber-600 hover:from-golden-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Langfuse Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Top KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Generations */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Generations</span>
              <Zap className="w-4 h-4 text-golden-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {metrics ? metrics.totalGenerations : "..."}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">100%</span> tracked via Langfuse
            </div>
          </div>

          {/* Card 2: Total Tokens */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Tokens</span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {metrics ? metrics.totalTokens.toLocaleString() : "..."}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              <span className="text-slate-300 font-semibold">
                {metrics ? metrics.totalPromptTokens.toLocaleString() : "0"}
              </span>{" "}
              in /{" "}
              <span className="text-slate-300 font-semibold">
                {metrics ? metrics.totalCompletionTokens.toLocaleString() : "0"}
              </span>{" "}
              out
            </div>
          </div>

          {/* Card 3: Estimated Cost */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Est. LLM Cost</span>
              <Coins className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              ${metrics ? metrics.estimatedCostUsd.toFixed(4) : "0.0000"}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Real-time per-token accounting
            </div>
          </div>

          {/* Card 4: Average Latency */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Avg Latency</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {metrics ? metrics.avgLatencyMs : "0"} ms
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              End-to-end model inference
            </div>
          </div>

          {/* Card 5: Success Rate */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Success Rate</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              {metrics ? `${metrics.successRate}%` : "100%"}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Zero unhandled dropouts
            </div>
          </div>
        </div>

        {/* Model Distribution & Config Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Provider Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-golden-400" />
              Multi-Model Usage Distribution
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-blue-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" /> Google Gemini (Flash / Pro)
                  </span>
                  <span className="text-slate-300">
                    {metrics?.providerBreakdown.google || 0} traces
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: `${
                        metrics?.totalGenerations
                          ? ((metrics.providerBreakdown.google || 0) / metrics.totalGenerations) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> OpenAI (GPT-4o / Mini)
                  </span>
                  <span className="text-slate-300">
                    {metrics?.providerBreakdown.openai || 0} traces
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{
                      width: `${
                        metrics?.totalGenerations
                          ? ((metrics.providerBreakdown.openai || 0) / metrics.totalGenerations) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Anthropic (Claude 3.5 Sonnet)
                  </span>
                  <span className="text-slate-300">
                    {metrics?.providerBreakdown.anthropic || 0} traces
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{
                      width: `${
                        metrics?.totalGenerations
                          ? ((metrics.providerBreakdown.anthropic || 0) / metrics.totalGenerations) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Langfuse Project & Env Status */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-golden-400" />
                  Langfuse Ingestion Configuration
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isConfigured
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-golden-500/20 text-golden-300 border border-golden-500/40"
                  }`}
                >
                  {isConfigured ? "KEYS LOADED" : "READY TO CONNECT"}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Langfuse captures traces, evaluations, and token telemetry from Nisol Labs. When configured in{" "}
                <code className="bg-slate-800 text-golden-300 px-1 py-0.5 rounded font-mono text-[11px]">
                  .env.local
                </code>
                , traces sync asynchronously to your project dashboard with zero added user latency.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Host URL</div>
                  <div className="font-mono text-slate-200 truncate mt-0.5">{langfuseUrl}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Public Key</div>
                  <div className="font-mono text-slate-200 truncate mt-0.5">
                    {data?.config?.publicKeyMasked || "pk-lf-... (Not set yet)"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <span>To connect your cloud project, add keys to .env.local:</span>
              <code className="font-mono text-[11px] text-golden-400">
                LANGFUSE_PUBLIC_KEY & LANGFUSE_SECRET_KEY
              </code>
            </div>
          </div>
        </div>

        {/* Interactive Telemetry Simulator & Test Trigger */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c1e38] to-[#071324] border border-amber-500/20 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-golden-400" />
                Live Telemetry Simulator & Trace Trigger
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Send an ad-hoc LLM generation to test ingestion, measure exact token usage, and inspect trace logs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2 cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={runLiveCall}
                  onChange={(e) => setRunLiveCall(e.target.checked)}
                  className="rounded border-slate-700 text-golden-500 focus:ring-golden-400"
                />
                <span>Execute Live API Call (Gemini/OpenAI/Claude)</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1 space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Target Model
                </label>
                <select
                  value={testModel}
                  onChange={(e) => setTestModel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-golden-400"
                >
                  <option value="gemini-flash-latest">Google Gemini Flash Latest</option>
                  <option value="gpt-4o">OpenAI GPT-4o</option>
                  <option value="claude-3-5-sonnet-20241022">Anthropic Claude 3.5 Sonnet</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleTriggerTest}
                disabled={triggering}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-golden-500 to-amber-600 hover:from-golden-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {triggering ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting Trace...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Trigger Trace Now</span>
                  </>
                )}
              </button>
            </div>

            <div className="md:col-span-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Prompt Payload
              </label>
              <textarea
                rows={3}
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-golden-400 font-mono"
                placeholder="Enter prompt to evaluate..."
              />
            </div>
          </div>

          {/* Instant feedback card if triggered */}
          {lastTestResult && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white">Trace Generated & Ingested: </span>
                  <span className="font-mono text-emerald-300">{lastTestResult.id}</span>
                  <span className="text-slate-400 ml-2">({lastTestResult.latencyMs}ms | {lastTestResult.usage.totalTokens} tokens | ${lastTestResult.estimatedCostUsd})</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrace(lastTestResult)}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-[11px] self-start md:self-auto cursor-pointer"
              >
                Inspect Output 🔍
              </button>
            </div>
          )}
        </div>

        {/* Trace Stream & Explorer Table */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-golden-400" />
                Live Trace & Generation Explorer
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Recent AI generation events, token breakdowns, and model latencies.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter traces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-golden-400 w-44"
                />
              </div>

              {/* Provider Filter */}
              <select
                value={selectedModelFilter}
                onChange={(e) => setSelectedModelFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-golden-400"
              >
                <option value="ALL">All Models</option>
                <option value="google">Google Gemini</option>
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic Claude</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-golden-400"
              >
                <option value="ALL">All Status</option>
                <option value="SUCCESS">Success Only</option>
                <option value="ERROR">Errors Only</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Trace Name / Tenant</th>
                    <th className="p-3.5">Model</th>
                    <th className="p-3.5">Latency</th>
                    <th className="p-3.5">Tokens (In / Out)</th>
                    <th className="p-3.5">Cost</th>
                    <th className="p-3.5">Time</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTraces.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500">
                        No traces found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTraces.map((trace) => {
                      const isGoogle = trace.provider === "google";
                      const isOpenAI = trace.provider === "openai";
                      const isAnthropic = trace.provider === "anthropic";

                      return (
                        <tr
                          key={trace.id}
                          className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                          onClick={() => setSelectedTrace(trace)}
                        >
                          {/* Status */}
                          <td className="p-3.5">
                            {trace.status === "SUCCESS" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                200 OK
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                ERROR
                              </span>
                            )}
                          </td>

                          {/* Trace Name & Tenant */}
                          <td className="p-3.5">
                            <div className="font-semibold text-slate-100 group-hover:text-golden-300 transition-colors">
                              {trace.traceName}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{trace.tenantName || "Nisol Internal"}</span>
                              {trace.tags && trace.tags.length > 0 && (
                                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                                  #{trace.tags[0]}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Model */}
                          <td className="p-3.5">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold ${
                                isGoogle
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : isOpenAI
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : isAnthropic
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              }`}
                            >
                              {trace.model}
                            </span>
                          </td>

                          {/* Latency */}
                          <td className="p-3.5 font-mono text-slate-300">
                            {trace.latencyMs} ms
                          </td>

                          {/* Tokens */}
                          <td className="p-3.5 font-mono">
                            <span className="text-slate-300">
                              {trace.usage.totalTokens.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-500 ml-1">
                              ({trace.usage.promptTokens}/{trace.usage.completionTokens})
                            </span>
                          </td>

                          {/* Cost */}
                          <td className="p-3.5 font-mono text-emerald-400 font-semibold">
                            ${trace.estimatedCostUsd.toFixed(5)}
                          </td>

                          {/* Time */}
                          <td className="p-3.5 text-slate-400 text-[11px]">
                            {new Date(trace.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>

                          {/* Action */}
                          <td className="p-3.5 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTrace(trace);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-golden-500 hover:text-slate-950 text-slate-300 font-semibold text-[11px] transition-all cursor-pointer"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trace Inspection Modal / Drawer */}
        {selectedTrace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a1b32] border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-golden-500/20 text-golden-300 border border-golden-400/30">
                      {selectedTrace.id}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {selectedTrace.traceName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Recorded at {new Date(selectedTrace.createdAt).toLocaleString()} for tenant:{" "}
                    <span className="text-slate-200 font-semibold">
                      {selectedTrace.tenantName || "Nisol Platform"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTrace(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metrics Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Model Spec</div>
                  <div className="text-xs font-mono font-bold text-golden-300 mt-0.5">
                    {selectedTrace.model}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Latency</div>
                  <div className="text-xs font-mono font-bold text-purple-300 mt-0.5">
                    {selectedTrace.latencyMs} ms
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Tokens</div>
                  <div className="text-xs font-mono font-bold text-blue-300 mt-0.5">
                    {selectedTrace.usage.totalTokens.toLocaleString()} (In: {selectedTrace.usage.promptTokens} / Out: {selectedTrace.usage.completionTokens})
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Est. Cost</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                    ${selectedTrace.estimatedCostUsd.toFixed(6)}
                  </div>
                </div>
              </div>

              {/* Prompt Input Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Input Prompt Payload</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {selectedTrace.usage.promptTokens} tokens
                  </span>
                </label>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                  {selectedTrace.inputPrompt}
                </div>
              </div>

              {/* Model Output Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Model Generation Output</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {selectedTrace.usage.completionTokens} tokens
                  </span>
                </label>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-300/90 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                  {selectedTrace.outputResponse}
                </div>
              </div>

              {/* Metadata & Raw JSON preview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Langfuse Ingestion Metadata
                </label>
                <pre className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto">
                  {JSON.stringify(
                    {
                      traceId: selectedTrace.id,
                      status: selectedTrace.status,
                      provider: selectedTrace.provider,
                      metadata: selectedTrace.metadata,
                      tags: selectedTrace.tags,
                      userId: selectedTrace.userId,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setSelectedTrace(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
