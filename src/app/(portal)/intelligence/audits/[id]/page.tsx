"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { StatusBadge } from "@/components/intelligence/StatusBadge";

interface Tenant {
  name: string;
  industry?: string;
  pricing_plan?: string;
}

interface Profile {
  full_name: string;
}

interface AuditDetail {
  id: string;
  title: string;
  status: string;
  overall_maturity_score: number | null;
  conducted_at: string;
  created_at: string;
  raw_responses: Record<string, any> | null;
  tenants: Tenant | null;
  profiles: Profile | null;
}

interface Question {
  id: number;
  section: string;
  order_index: number;
  question_text: string;
  tip_discussion: string | null;
}

const ALL_POSSIBLE_SECTIONS = [
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

export default function AuditDetailPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params?.id as string;

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [audit, setAudit] = useState<AuditDetail | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSection, setSelectedSection] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedTargetSections, setSelectedTargetSections] = useState<string[]>([]);
  const [savingSections, setSavingSections] = useState(false);

  useEffect(() => {
    if (!auditId) return;

    async function loadAuditData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch Audit details with tenant and consultant info
        const { data: auditData, error: auditErr } = await supabase
          .from("audits")
          .select(`
            id,
            title,
            status,
            overall_maturity_score,
            conducted_at,
            created_at,
            raw_responses,
            tenants:tenant_id (name, industry),
            profiles:conducted_by (full_name)
          `)
          .eq("id", auditId)
          .single();

        if (auditErr) throw new Error(`Failed to load audit: ${auditErr.message}`);

        // Fetch all 62 assessment questions
        const { data: questionData, error: qErr } = await supabase
          .from("questions")
          .select("*")
          .order("order_index", { ascending: true });

        if (qErr) throw new Error(`Failed to load questions: ${qErr.message}`);

        setAudit(auditData as unknown as AuditDetail);
        setQuestions(questionData || []);

        const raw = auditData.raw_responses as any;
        if (raw && Array.isArray(raw._target_sections)) {
          setSelectedTargetSections(raw._target_sections);
        } else {
          setSelectedTargetSections([]);
        }
      } catch (err: any) {
        console.error("Error loading audit detail:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadAuditData();
  }, [auditId, supabase]);

  const handleSaveTargetSections = async (newSections: string[]) => {
    if (!audit) return;
    setSavingSections(true);
    try {
      const updatedRaw = {
        ...(audit.raw_responses || {}),
        _target_sections: newSections,
      };

      const { error: uErr } = await supabase
        .from("audits")
        .update({
          raw_responses: updatedRaw,
          updated_at: new Date().toISOString(),
        })
        .eq("id", audit.id);

      if (uErr) throw uErr;

      setAudit({
        ...audit,
        raw_responses: updatedRaw,
      });
      setSelectedTargetSections(newSections);
      setIsConfigModalOpen(false);
    } catch (err: any) {
      alert(`Failed to save capability scope: ${err.message}`);
    } finally {
      setSavingSections(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Loading audit & raw responses...</p>
        </div>
      </div>
    );
  }

  if (error || !audit) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-red-800 mb-2">Audit Not Found</h3>
          <p className="text-sm text-red-600 mb-4">{error || "Requested audit record does not exist."}</p>
          <Link
            href="/intelligence/audits"
            className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800"
          >
            ← Back to Audits List
          </Link>
        </div>
      </div>
    );
  }

  const rawResponses = audit.raw_responses || {};
  
  // Calculate answered count out of 62
  const answeredCount = questions.filter((q) => {
    const val = rawResponses[q.id] || rawResponses[String(q.id)];
    if (!val) return false;
    if (typeof val === "object") {
      return Boolean(val.text || val.score || val.answer);
    }
    return Boolean(val);
  }).length;

  const sections = ["All", ...Array.from(new Set(questions.map((q) => q.section)))];

  const filteredQuestions = questions.filter((q) => {
    const matchesSection = selectedSection === "All" || q.section === selectedSection;
    const matchesSearch =
      searchQuery === "" ||
      q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.section.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Breadcrumb */}
      <div>
        <Link
          href="/intelligence/audits"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 mb-3"
        >
          ← Back to Audits Overview
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#0A1E3C]">{audit.title}</h1>
              <StatusBadge status={audit.status} />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Client: <span className="font-semibold text-slate-800">{audit.tenants?.name || "N/A"}</span>
              {audit.tenants?.industry && ` (${audit.tenants.industry})`} • Consultant:{" "}
              <span className="font-semibold text-slate-800">{audit.profiles?.full_name || "Unassigned"}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 text-sm font-semibold rounded-xl transition-colors border border-amber-300 flex items-center gap-1.5 cursor-pointer"
            >
              ⚙️ Scope Capabilities
              {selectedTargetSections.length > 0 && (
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  {selectedTargetSections.length}/15
                </span>
              )}
            </button>
            <button
              onClick={() => router.push(`/audits/${audit.id}/questionnaire`)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors border border-slate-200"
            >
              ✏️ Edit Raw Data
            </button>
            <button
              onClick={() => router.push(`/intelligence/audits/${audit.id}/report`)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              🚀 Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Scope Active Callout Banner */}
      {selectedTargetSections.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-4 text-emerald-950">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎯</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  Targeted Spark Scope Active ({selectedTargetSections.length} Sections Selected)
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                Active Sections: <strong>{selectedTargetSections.join(", ")}</strong>. Questionnaires will display only questions belonging to these modules.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSaveTargetSections([])}
            disabled={savingSections}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer"
          >
            Unlock All 15 Capabilities
          </button>
        </div>
      )}

      {/* MODAL: Configure Capability Scope */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl border my-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0A1E3C]">Configure Capability Scope</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select specific capability modules to ask during the diagnostic workshop (e.g. Nisol Spark 3-day sprint).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Select Sections ({selectedTargetSections.length || "All 15"} active):</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTargetSections(["Leadership & Strategy", "IT / Technology", "Culture & Change"])}
                    className="text-[11px] text-amber-700 hover:underline font-semibold"
                  >
                    Set Spark Preset (3)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setSelectedTargetSections([])}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Select All (Full 15)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 bg-slate-50 rounded-xl border">
                {ALL_POSSIBLE_SECTIONS.map((sec) => {
                  const isChecked = selectedTargetSections.length === 0 || selectedTargetSections.includes(sec);
                  return (
                    <label
                      key={sec}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-white border-amber-300 text-navy-950 font-bold shadow-2xs"
                          : "bg-slate-100/50 border-slate-200 text-slate-500"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          let current = selectedTargetSections.length === 0 ? [...ALL_POSSIBLE_SECTIONS] : [...selectedTargetSections];
                          if (e.target.checked) {
                            if (!current.includes(sec)) current.push(sec);
                          } else {
                            current = current.filter((s) => s !== sec);
                          }
                          if (current.length === ALL_POSSIBLE_SECTIONS.length) {
                            setSelectedTargetSections([]);
                          } else {
                            setSelectedTargetSections(current);
                          }
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>{sec}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingSections}
                onClick={() => handleSaveTargetSections(selectedTargetSections)}
                className="px-6 py-2 bg-[#0A1E3C] text-white text-xs font-bold rounded-xl hover:bg-slate-800 shadow-md disabled:opacity-50"
              >
                {savingSections ? "Saving Scope..." : "Save Capability Scope"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI & Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Questionnaire Progress</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-[#0A1E3C]">{answeredCount} / {questions.length || 62}</span>
            <span className="text-xs font-bold text-blue-600">{Math.round((answeredCount / (questions.length || 62)) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${Math.round((answeredCount / (questions.length || 62)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Overall Score</span>
          <span className="text-2xl font-extrabold text-[#0A1E3C] mt-2 block">
            {audit.overall_maturity_score ? `${Number(audit.overall_maturity_score).toFixed(1)} / 5.0` : "Not Scored"}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Calculated after report analysis</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Audit Date</span>
          <span className="text-base font-bold text-slate-800 mt-2 block">
            {audit.conducted_at ? new Date(audit.conducted_at).toLocaleDateString() : new Date(audit.created_at).toLocaleDateString()}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">Assessment Date</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Audit ID</span>
          <span className="text-xs font-mono text-slate-600 mt-2 block truncate">{audit.id}</span>
          <span className="text-xs text-slate-400 mt-1 block">UUID Identifier</span>
        </div>
      </div>

      {/* Raw Data Section Filter & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-[#0A1E3C]">Raw Assessment Data (62 Questions)</h2>
            <p className="text-xs text-slate-500">Collected workshop responses from Nisol Discovery</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-60"
            />
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSection === section
                  ? "bg-[#0A1E3C] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Questions & Responses List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No questions found matching your filter criteria.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const resp = rawResponses[q.id] || rawResponses[String(q.id)];
              let answerText = "";
              let scoreVal: number | null = null;

              if (typeof resp === "object" && resp !== null) {
                answerText = resp.text || resp.answer || resp.notes || "";
                scoreVal = resp.score ?? null;
              } else if (typeof resp === "string") {
                answerText = resp;
              } else if (typeof resp === "number") {
                scoreVal = resp;
              }

              return (
                <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                          Q{q.order_index} • {q.section}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{q.question_text}</h4>
                    </div>

                    {scoreVal !== null && (
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                        <span className="text-xs font-bold text-amber-700">Score: {scoreVal} / 5</span>
                      </div>
                    )}
                  </div>

                  {q.tip_discussion && (
                    <p className="text-xs text-slate-400 italic">💡 Tip: {q.tip_discussion}</p>
                  )}

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Response:
                    </span>
                    {answerText ? (
                      <p className="text-sm text-slate-800 whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-200 font-normal">
                        {answerText}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic bg-white p-2 rounded border border-dashed border-slate-200">
                        No text response recorded.
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
