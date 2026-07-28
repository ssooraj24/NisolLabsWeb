"use client";

import React, { useState, useEffect } from "react";

interface EditableContentProps {
  initialValue: string;
  onSave: (value: string) => Promise<void> | void;
  label?: string;
  placeholder?: string;
}

export function EditableContent({
  initialValue,
  onSave,
  label = "Content",
  placeholder = "Enter text...",
}: EditableContentProps) {
  const [value, setValue] = useState(initialValue || "");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(value);
      setSaveStatus("saved");
      setIsEditing(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("Failed to save content:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-sm font-bold text-[#0A1E3C] uppercase tracking-wider">{label}</span>

        <div className="flex items-center gap-2">
          {saveStatus === "saved" && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Saved
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
              ⚠️ Save failed
            </span>
          )}

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              ✏️ Edit Text
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setValue(initialValue || "");
                  setIsEditing(false);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : "💾 Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={14}
          placeholder={placeholder}
          className="w-full p-4 text-sm font-mono text-slate-800 bg-slate-50 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />
      ) : (
        <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans bg-slate-50/50 p-4 rounded-xl border border-slate-100">
          {value || <span className="text-slate-400 italic">No content generated yet.</span>}
        </div>
      )}
    </div>
  );
}
