"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  styling: {
    primary_color: string;
    secondary_color: string;
    font_family: string;
    logo_url?: string;
  };
  created_at?: string;
  updated_at?: string;
}

const ALL_SECTION_OPTIONS = [
  { id: "summary", label: "Executive Summary" },
  { id: "readiness", label: "AI Readiness Assessment" },
  { id: "capabilities", label: "Capability Scores" },
  { id: "matrix", label: "Opportunity Matrix" },
  { id: "usecases", label: "Top 20 AI Use Cases" },
  { id: "roadmap", label: "Transformation Roadmap" },
  { id: "roi", label: "ROI Analysis" },
  { id: "blueprints", label: "Solution Blueprints" },
  { id: "proposal", label: "Proposal Draft" },
];

const DEFAULT_SEED_TEMPLATES: Omit<ReportTemplate, "id">[] = [
  {
    name: "Standard Advisory Report",
    description: "Default comprehensive Nisol Intelligence advisory template covering all 10 strategic outputs.",
    sections: ["summary", "readiness", "capabilities", "matrix", "usecases", "roadmap", "roi", "blueprints", "proposal"],
    styling: {
      primary_color: "#0A1E3C",
      secondary_color: "#EBB44B",
      font_family: "Inter",
      logo_url: "/images/nisol-logo.png",
    },
  },
  {
    name: "Executive Brief (Fast Track)",
    description: "Lightweight, C-suite focused report emphasizing high-level summary, roadmap, and ROI.",
    sections: ["summary", "readiness", "matrix", "roadmap", "roi"],
    styling: {
      primary_color: "#0F172A",
      secondary_color: "#3B82F6",
      font_family: "Roboto",
    },
  },
];

export default function ReportTemplatesPage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User Role Check
  const [userRole, setUserRole] = useState<string>("super_admin");

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ReportTemplate | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<ReportTemplate | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    selectedSections: string[];
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    logoUrl: string;
  }>({
    name: "",
    description: "",
    selectedSections: ["summary", "readiness", "capabilities", "matrix", "usecases", "roadmap", "roi", "blueprints", "proposal"],
    primaryColor: "#0A1E3C",
    secondaryColor: "#EBB44B",
    fontFamily: "Inter",
    logoUrl: "",
  });

  const [saving, setSaving] = useState(false);

  // Fetch Templates & User Role
  async function loadTemplatesData() {
    setLoading(true);
    setError(null);
    try {
      // Fetch user role
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

      // Fetch templates
      const { data, error: err } = await supabase
        .from("report_templates")
        .select("*")
        .order("name", { ascending: true });

      if (err && err.code !== "PGRST116") throw err;

      if (!data || data.length === 0) {
        // Seed default templates if empty
        const { data: seeded, error: seedErr } = await supabase
          .from("report_templates")
          .insert(DEFAULT_SEED_TEMPLATES)
          .select();
        if (!seedErr && seeded) {
          setTemplates(seeded as ReportTemplate[]);
        } else {
          setTemplates(DEFAULT_SEED_TEMPLATES as any);
        }
      } else {
        setTemplates(data as ReportTemplate[]);
      }
    } catch (err: any) {
      console.error("Error loading report templates:", err);
      setError(err.message || "Failed to load report templates");
      setTemplates(DEFAULT_SEED_TEMPLATES as any);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTemplatesData();
  }, [supabase]);

  const isSuperAdmin = userRole === "super_admin" || userRole === "admin";

  const openCreateModal = () => {
    setFormData({
      name: "",
      description: "",
      selectedSections: ["summary", "readiness", "capabilities", "matrix", "usecases", "roadmap", "roi", "blueprints", "proposal"],
      primaryColor: "#0A1E3C",
      secondaryColor: "#EBB44B",
      fontFamily: "Inter",
      logoUrl: "",
    });
    setIsCreateModalOpen(true);
  };

  const openEditModal = (tmpl: ReportTemplate) => {
    setEditingTemplate(tmpl);
    setFormData({
      name: tmpl.name || "",
      description: tmpl.description || "",
      selectedSections: tmpl.sections || ["summary"],
      primaryColor: tmpl.styling?.primary_color || "#0A1E3C",
      secondaryColor: tmpl.styling?.secondary_color || "#EBB44B",
      fontFamily: tmpl.styling?.font_family || "Inter",
      logoUrl: tmpl.styling?.logo_url || "",
    });
  };

  const handleToggleSection = (sectionId: string) => {
    if (formData.selectedSections.includes(sectionId)) {
      setFormData({
        ...formData,
        selectedSections: formData.selectedSections.filter((id) => id !== sectionId),
      });
    } else {
      setFormData({
        ...formData,
        selectedSections: [...formData.selectedSections, sectionId],
      });
    }
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const list = [...formData.selectedSections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    setFormData({ ...formData, selectedSections: list });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        sections: formData.selectedSections,
        styling: {
          primary_color: formData.primaryColor,
          secondary_color: formData.secondaryColor,
          font_family: formData.fontFamily,
          logo_url: formData.logoUrl.trim() || undefined,
        },
        updated_at: new Date().toISOString(),
      };

      if (editingTemplate) {
        const { error: err } = await supabase
          .from("report_templates")
          .update(payload)
          .eq("id", editingTemplate.id);
        if (err) throw err;
        setEditingTemplate(null);
      } else {
        const { error: err } = await supabase.from("report_templates").insert(payload);
        if (err) throw err;
        setIsCreateModalOpen(false);
      }

      await loadTemplatesData();
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTemplate) return;
    try {
      const { error: err } = await supabase
        .from("report_templates")
        .delete()
        .eq("id", deletingTemplate.id);

      if (err) throw err;
      setDeletingTemplate(null);
      await loadTemplatesData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <span className="text-3xl">🔒</span>
          <h2 className="text-xl font-bold text-amber-900">Super Admin Access Required</h2>
          <p className="text-sm text-amber-700 max-w-md mx-auto">
            Report Template Configuration is strictly restricted to Super Administrators.
          </p>
          <Link href="/intelligence/dashboard" className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0A1E3C]">Report Templates</h1>
            <span className="text-xs bg-amber-500/20 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-300">
              Super Admin Only
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Define section inclusion, order, brand colors, fonts, and styling for client advisory reports.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          + Create New Template
        </button>
      </div>

      {/* Templates List Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-sm">Loading report templates...</div>
      ) : templates.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm space-y-3">
          <p>No report templates defined. Create a custom template or system default.</p>
          <button onClick={openCreateModal} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">
            + Create Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tmpl) => {
            const secCount = tmpl.sections?.length || 0;
            const primary = tmpl.styling?.primary_color || "#0A1E3C";
            const secondary = tmpl.styling?.secondary_color || "#EBB44B";

            return (
              <div
                key={tmpl.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#0A1E3C]">{tmpl.name}</h3>
                      <span className="text-xs text-slate-500">{secCount} Sections Included</span>
                    </div>

                    {/* Color Chips */}
                    <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                      <span className="w-4 h-4 rounded-full border shadow-2xs" style={{ backgroundColor: primary }} title={`Primary: ${primary}`} />
                      <span className="w-4 h-4 rounded-full border shadow-2xs" style={{ backgroundColor: secondary }} title={`Secondary: ${secondary}`} />
                      <span className="text-[10px] font-mono text-slate-600 ml-1">{tmpl.styling?.font_family || "Inter"}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{tmpl.description}</p>

                  {/* Section Order Preview */}
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Section Pipeline</span>
                    <div className="flex flex-wrap gap-1">
                      {tmpl.sections?.map((sec, idx) => (
                        <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {idx + 1}. {ALL_SECTION_OPTIONS.find((s) => s.id === sec)?.label || sec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Updated: {tmpl.updated_at ? new Date(tmpl.updated_at).toLocaleDateString() : "System Default"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(tmpl)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingTemplate(tmpl)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(isCreateModalOpen || editingTemplate) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0A1E3C]">
                {editingTemplate ? "Edit Report Template" : "Create Report Template"}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingTemplate(null);
                }}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1">Template Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Enterprise Advisory Standard"
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the purpose of this template..."
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 font-normal"
                />
              </div>

              {/* Sections Selection */}
              <div>
                <label className="block mb-2 text-slate-900 font-bold">Included Sections & Pipeline Order *</label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {ALL_SECTION_OPTIONS.map((sec) => {
                    const isChecked = formData.selectedSections.includes(sec.id);
                    return (
                      <label key={sec.id} className="flex items-center gap-2 cursor-pointer text-xs font-normal">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSection(sec.id)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{sec.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Section Order Adjuster */}
              {formData.selectedSections.length > 0 && (
                <div>
                  <label className="block mb-1 text-slate-900 font-bold">Selected Order (Re-order using ↑ ↓)</label>
                  <div className="space-y-1 p-3 bg-white rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                    {formData.selectedSections.map((secId, idx) => {
                      const secLabel = ALL_SECTION_OPTIONS.find((s) => s.id === secId)?.label || secId;
                      return (
                        <div key={secId} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs">
                          <span>
                            {idx + 1}. <strong className="text-slate-900">{secLabel}</strong>
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveSection(idx, "up")}
                              className="px-2 py-0.5 bg-white border rounded hover:bg-slate-100 disabled:opacity-30"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.selectedSections.length - 1}
                              onClick={() => handleMoveSection(idx, "down")}
                              className="px-2 py-0.5 bg-white border rounded hover:bg-slate-100 disabled:opacity-30"
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Styling Configuration */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block mb-2 text-slate-900 font-bold">Branding & Styling Controls</label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Primary Color</label>
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-full h-9 p-0.5 border rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Secondary Color</label>
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-full h-9 p-0.5 border rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Font Family</label>
                    <select
                      value={formData.fontFamily}
                      onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
                      className="w-full p-2 border rounded-lg bg-white"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Outfit">Outfit</option>
                      <option value="Arial">Arial</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingTemplate(null);
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
                  {saving ? "Saving..." : editingTemplate ? "Update Template" : "Save Template"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deletingTemplate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-red-700">Delete Report Template?</h3>
            <p className="text-xs text-slate-600">
              This will permanently delete the template <span className="font-bold">{deletingTemplate.name}</span>. Are you sure?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingTemplate(null)}
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
