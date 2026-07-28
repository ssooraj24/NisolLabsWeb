"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export interface Blueprint {
  id: string;
  name: string;
  category: string;
  description: string;
  technology_stack: string[];
  architecture_diagram?: string;
  implementation_steps?: string[];
  estimated_timeline?: string;
  resource_requirements?: string;
  success_metrics?: string[];
  created_at?: string;
}

const DEFAULT_SEED_BLUEPRINTS: Omit<Blueprint, "id">[] = [
  {
    name: "AI-Powered Customer Support Chatbot",
    category: "Customer Service",
    description: "Deploy RAG-augmented generative AI chatbot integrated with Zendesk knowledge base to handle 60% of tier-1 support requests.",
    technology_stack: ["OpenAI GPT-4o", "Supabase Vector (pgvector)", "Next.js", "Zendesk API"],
    architecture_diagram: "User Request -> Next.js API Gateway -> Embeddings API -> Supabase Vector Search -> GPT-4o Synthesis -> Response",
    implementation_steps: [
      "Phase 1: Knowledge Base Ingestion & Vector Indexing (2 weeks)",
      "Phase 2: RAG Pipeline & Prompt Engineering (2 weeks)",
      "Phase 3: Omnichannel Widget Integration & Testing (2 weeks)",
      "Phase 4: Production Rollout & Guardrail Monitoring (1 week)",
    ],
    estimated_timeline: "7 Weeks",
    resource_requirements: "1 Lead AI Engineer, 1 Frontend Developer, Support SME",
    success_metrics: ["60% ticket containment rate", "< 4s response latency", "90% CSAT score"],
  },
  {
    name: "Autonomous Invoice Extraction & AP Processing",
    category: "Finance",
    description: "Automated vision-LLM document processing engine to parse multi-page supplier invoices and auto-reconcile POs in SAP ERP.",
    technology_stack: ["Google Gemini Vision", "Python FastAPI", "PostgreSQL", "SAP ERP Connector"],
    architecture_diagram: "PDF Invoice Email -> OCR Vision Extractor -> Entity Normalization -> ERP Match Check -> Auto Approval Workflow",
    implementation_steps: [
      "Phase 1: Document Schema Mapping & Optical Parsing (3 weeks)",
      "Phase 2: ERP Integration & Matching Rules (3 weeks)",
      "Phase 3: Human-in-the-Loop Exception Portal (2 weeks)",
    ],
    estimated_timeline: "8 Weeks",
    resource_requirements: "1 Backend Engineer, 1 SAP Integration Consultant",
    success_metrics: ["85% straight-through processing", "99.2% extraction accuracy", "70% AP cycle speedup"],
  },
  {
    name: "Enterprise Search & Internal Wiki Copilot",
    category: "Knowledge Management",
    description: "Unified AI semantic search across Google Drive, Notion, Slack, and Confluence with conversational synthesis.",
    technology_stack: ["Anthropic Claude 3.5", "Qdrant Vector DB", "LangChain", "Node.js"],
    architecture_diagram: "Slack/Web Prompt -> Unified Search Router -> Hybrid Vector Search -> Claude Synthesizer -> Answer with Citations",
    implementation_steps: [
      "Phase 1: Multi-source Connector Setup (2 weeks)",
      "Phase 2: Chunking & Hybrid Embedding Index (3 weeks)",
      "Phase 3: Conversational Search UI (2 weeks)",
    ],
    estimated_timeline: "7 Weeks",
    resource_requirements: "1 Fullstack AI Developer, Security Lead",
    success_metrics: ["45min saved per employee/day", "< 2s search latency", "Zero data leakage"],
  },
  {
    name: "Predictive Supply Chain Risk Radar",
    category: "Operations",
    description: "Real-time anomaly monitoring for tier-1 & tier-2 supplier lead times, weather alerts, and freight bottlenecks.",
    technology_stack: ["Python ML (XGBoost)", "Kafka Streams", "BigQuery", "React Dashboard"],
    architecture_diagram: "Logistics Data Feeds -> Kafka Stream -> Predictive ML Model -> Anomaly Radar -> Automated Risk Escalation",
    implementation_steps: [
      "Phase 1: Logistics Telemetry Ingestion (4 weeks)",
      "Phase 2: Historical Lead Time Model Training (4 weeks)",
      "Phase 3: Real-time Alerting Radar UI (3 weeks)",
    ],
    estimated_timeline: "11 Weeks",
    resource_requirements: "1 Data Scientist, 1 Data Engineer, Supply Chain Specialist",
    success_metrics: ["30% reduction in stockouts", "4-day advance disruption warning"],
  },
  {
    name: "AI Legal Contract Review & Risk Annotator",
    category: "Legal",
    description: "Automated clause analysis and compliance risk scoring for NDAs, Vendor Agreements, and Enterprise MSAs.",
    technology_stack: ["OpenAI GPT-4o", "Docx Parser", "Next.js", "Supabase Storage"],
    architecture_diagram: "Contract Upload -> Document Parsing -> Legal Redline Engine -> Compliance Matrix -> Download Redlined Doc",
    implementation_steps: [
      "Phase 1: Legal Clause Taxonomy Definition (2 weeks)",
      "Phase 2: LLM Few-Shot Prompt Fine-tuning (2 weeks)",
      "Phase 3: Web Document Annotator UI (2 weeks)",
    ],
    estimated_timeline: "6 Weeks",
    resource_requirements: "1 AI Engineer, Legal Counsel SME",
    success_metrics: ["75% faster NDA turnaround", "100% compliance clause detection"],
  },
];

export default function SolutionBlueprintLibraryPage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User Profile Role Check
  const [userRole, setUserRole] = useState<string>("consultant");

  // Search, Filter & View Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modals
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null); // Detail Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBlueprint, setEditingBlueprint] = useState<Blueprint | null>(null); // Edit Modal
  const [deletingBlueprint, setDeletingBlueprint] = useState<Blueprint | null>(null); // Confirm Delete

  // Form State for Add / Edit
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    description: string;
    technology_stack: string;
    architecture_diagram: string;
    implementation_steps: string;
    estimated_timeline: string;
    resource_requirements: string;
    success_metrics: string;
  }>({
    name: "",
    category: "Customer Service",
    description: "",
    technology_stack: "",
    architecture_diagram: "",
    implementation_steps: "",
    estimated_timeline: "",
    resource_requirements: "",
    success_metrics: "",
  });

  const [saving, setSaving] = useState(false);

  // Fetch Blueprints & User Role
  async function fetchBlueprintsData() {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch user role
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        if (profile) setUserRole(profile.role);
      }

      // 2. Fetch Blueprints
      const { data, error: err } = await supabase
        .from("solution_blueprints")
        .select("*")
        .order("name", { ascending: true });

      if (err) throw err;

      if (!data || data.length === 0) {
        // Seed default master blueprints if table is empty
        const { data: seeded, error: seedErr } = await supabase
          .from("solution_blueprints")
          .insert(DEFAULT_SEED_BLUEPRINTS)
          .select();
        if (!seedErr && seeded) {
          setBlueprints(seeded as Blueprint[]);
        } else {
          setBlueprints(DEFAULT_SEED_BLUEPRINTS as any);
        }
      } else {
        setBlueprints(data as Blueprint[]);
      }
    } catch (err: any) {
      console.error("Error loading blueprints:", err);
      setError(err.message || "Failed to load solution blueprints");
      // Fallback to seeds on query error
      setBlueprints(DEFAULT_SEED_BLUEPRINTS as any);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlueprintsData();
  }, [supabase]);

  const isSuperAdmin = userRole === "super_admin" || userRole === "admin";

  // Filter Categories
  const categories = [
    "ALL",
    ...Array.from(new Set(blueprints.map((b) => b.category).filter(Boolean))),
  ];

  // Search & Category Filtering
  const filteredBlueprints = blueprints.filter((b) => {
    const matchesCategory =
      selectedCategory === "ALL" ||
      b.category?.toLowerCase() === selectedCategory.toLowerCase();

    const techString = (b.technology_stack || []).join(" ");
    const matchesSearch =
      searchQuery === "" ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      techString.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Open Form Modal for Create / Edit
  const openCreateModal = () => {
    setFormData({
      name: "",
      category: "Customer Service",
      description: "",
      technology_stack: "OpenAI GPT-4o, Supabase Vector, Next.js",
      architecture_diagram: "",
      implementation_steps: "Phase 1: Setup (2 weeks)\nPhase 2: Deployment (2 weeks)",
      estimated_timeline: "4 Weeks",
      resource_requirements: "1 AI Lead, 1 Frontend Developer",
      success_metrics: "50% efficiency gain, < 3s latency",
    });
    setIsCreateModalOpen(true);
  };

  const openEditModal = (bp: Blueprint) => {
    setEditingBlueprint(bp);
    setFormData({
      name: bp.name || "",
      category: bp.category || "Customer Service",
      description: bp.description || "",
      technology_stack: (bp.technology_stack || []).join(", "),
      architecture_diagram: bp.architecture_diagram || "",
      implementation_steps: (bp.implementation_steps || []).join("\n"),
      estimated_timeline: bp.estimated_timeline || "",
      resource_requirements: bp.resource_requirements || "",
      success_metrics: (bp.success_metrics || []).join(", "),
    });
  };

  // Submit Handler for Create / Update
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        technology_stack: formData.technology_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        architecture_diagram: formData.architecture_diagram.trim(),
        implementation_steps: formData.implementation_steps
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        estimated_timeline: formData.estimated_timeline.trim(),
        resource_requirements: formData.resource_requirements.trim(),
        success_metrics: formData.success_metrics
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (editingBlueprint) {
        // Update
        const { error: err } = await supabase
          .from("solution_blueprints")
          .update(payload)
          .eq("id", editingBlueprint.id);
        if (err) throw err;
        setEditingBlueprint(null);
      } else {
        // Create
        const { error: err } = await supabase
          .from("solution_blueprints")
          .insert(payload);
        if (err) throw err;
        setIsCreateModalOpen(false);
      }

      await fetchBlueprintsData();
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Delete Handler
  const handleDeleteConfirm = async () => {
    if (!deletingBlueprint) return;
    try {
      const { error: err } = await supabase
        .from("solution_blueprints")
        .delete()
        .eq("id", deletingBlueprint.id);

      if (err) throw err;
      setDeletingBlueprint(null);
      if (selectedBlueprint?.id === deletingBlueprint.id) {
        setSelectedBlueprint(null);
      }
      await fetchBlueprintsData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // PDF Export Trigger
  const handleExportPDF = (bp: Blueprint) => {
    window.print();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0A1E3C]">Solution Blueprint Library</h1>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              Master Architecture
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Pre-built, enterprise-grade AI technical blueprints ready for proposal inclusion and implementation.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
          >
            + Add New Blueprint
          </button>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by name, tech, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2 text-slate-400 text-xs">🔍</span>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle (Grid / List) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-end md:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white text-[#0A1E3C] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ▦ Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white text-[#0A1E3C] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ☰ List
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-sm">Loading blueprints library...</div>
      ) : error && filteredBlueprints.length === 0 ? (
        <div className="p-6 text-center text-red-600 text-sm">{error}</div>
      ) : filteredBlueprints.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm space-y-3">
          <p>No solution blueprints found matching your filter criteria.</p>
          {isSuperAdmin && (
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg"
            >
              + Create First Blueprint
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBlueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded uppercase tracking-wider">
                    {bp.category}
                  </span>
                  {bp.estimated_timeline && (
                    <span className="text-[10px] font-mono text-slate-500">
                      ⏱ {bp.estimated_timeline}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#0A1E3C] line-clamp-1">{bp.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{bp.description}</p>

                {/* Tech Stack Pills */}
                {bp.technology_stack && bp.technology_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {bp.technology_stack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {bp.technology_stack.length > 3 && (
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                        +{bp.technology_stack.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedBlueprint(bp)}
                  className="px-3.5 py-1.5 bg-[#0A1E3C] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  View Details
                </button>

                {isSuperAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(bp)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingBlueprint(bp)}
                      className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST / TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Blueprint Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Tech Stack</th>
                  <th className="py-3.5 px-4">Timeline</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBlueprints.map((bp) => (
                  <tr key={bp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0A1E3C]">
                      <button
                        onClick={() => setSelectedBlueprint(bp)}
                        className="hover:text-blue-600 text-left"
                      >
                        {bp.name}
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                        {bp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(bp.technology_stack || []).slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                      {bp.estimated_timeline || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedBlueprint(bp)}
                        className="px-3 py-1.5 bg-[#0A1E3C] text-white text-xs font-semibold rounded-lg"
                      >
                        Details
                      </button>
                      {isSuperAdmin && (
                        <>
                          <button
                            onClick={() => openEditModal(bp)}
                            className="px-2.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeletingBlueprint(bp)}
                            className="px-2.5 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg border border-red-200"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedBlueprint && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded uppercase">
                  {selectedBlueprint.category}
                </span>
                <h2 className="text-xl font-bold text-[#0A1E3C] mt-1">{selectedBlueprint.name}</h2>
              </div>
              <button
                onClick={() => setSelectedBlueprint(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Description</span>
                <p className="mt-1 leading-relaxed">{selectedBlueprint.description}</p>
              </div>

              {selectedBlueprint.technology_stack && (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Technology Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBlueprint.technology_stack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-100 font-mono text-xs font-semibold rounded-lg border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedBlueprint.architecture_diagram && (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Architecture Overview</span>
                  <pre className="mt-1 bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                    {selectedBlueprint.architecture_diagram}
                  </pre>
                </div>
              )}

              {selectedBlueprint.implementation_steps && selectedBlueprint.implementation_steps.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Implementation Phases</span>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    {selectedBlueprint.implementation_steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedBlueprint.success_metrics && selectedBlueprint.success_metrics.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Success Metrics</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlueprint.success_metrics.map((m, i) => (
                      <span key={i} className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
                        🎯 {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleExportPDF(selectedBlueprint)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-2"
              >
                📄 Export PDF
              </button>

              <div className="flex items-center gap-2">
                {isSuperAdmin && (
                  <button
                    onClick={() => {
                      const bp = selectedBlueprint;
                      setSelectedBlueprint(null);
                      openEditModal(bp);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                  >
                    Edit Blueprint
                  </button>
                )}
                <button
                  onClick={() => setSelectedBlueprint(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(isCreateModalOpen || editingBlueprint) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0A1E3C]">
                {editingBlueprint ? "Edit Solution Blueprint" : "Create New Solution Blueprint"}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingBlueprint(null);
                }}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1">Blueprint Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                  />
                </div>
                <div>
                  <label className="block mb-1">Estimated Timeline</label>
                  <input
                    type="text"
                    value={formData.estimated_timeline}
                    onChange={(e) => setFormData({ ...formData, estimated_timeline: e.target.value })}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              <div>
                <label className="block mb-1">Technology Stack (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={formData.technology_stack}
                  onChange={(e) => setFormData({ ...formData, technology_stack: e.target.value })}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              <div>
                <label className="block mb-1">Architecture Summary Diagram</label>
                <textarea
                  rows={2}
                  value={formData.architecture_diagram}
                  onChange={(e) => setFormData({ ...formData, architecture_diagram: e.target.value })}
                  className="w-full p-2.5 border rounded-lg font-mono focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              <div>
                <label className="block mb-1">Implementation Steps (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.implementation_steps}
                  onChange={(e) => setFormData({ ...formData, implementation_steps: e.target.value })}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              <div>
                <label className="block mb-1">Success Metrics (Comma separated)</label>
                <input
                  type="text"
                  value={formData.success_metrics}
                  onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingBlueprint(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingBlueprint ? "Update Blueprint" : "Create Blueprint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deletingBlueprint && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-red-700">Delete Solution Blueprint?</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete <span className="font-bold">{deletingBlueprint.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingBlueprint(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
