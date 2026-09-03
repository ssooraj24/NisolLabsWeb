"use client"

import { useState } from "react"
import { GrantApplication } from "@/types/grants"
import { updateGrantRubricScores } from "@/lib/supabase/queries/grants"

interface GrantScoringModalProps {
  grant: GrantApplication | null
  isOpen: boolean
  onClose: () => void
  onSuccess: (updated: GrantApplication) => void
}

export const GrantScoringModal = ({ grant, isOpen, onClose, onSuccess }: GrantScoringModalProps) => {
  if (!isOpen || !grant) return null

  const [impact, setImpact] = useState(grant.rubric_impact_score || 3)
  const [complexity, setComplexity] = useState(grant.rubric_complexity_score || 3)
  const [leadership, setLeadership] = useState(grant.rubric_leadership_score || 3)
  const [amplification, setAmplification] = useState(grant.rubric_amplification_score || 3)
  const [notes, setNotes] = useState(grant.internal_notes || "")
  const [saving, setSaving] = useState(false)

  // Calculate real-time weighted score (0-100)
  const calculatedTotal = Math.round(
    ((impact / 5) * 35) +
    ((complexity / 5) * 25) +
    ((leadership / 5) * 20) +
    ((amplification / 5) * 20)
  )

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updateGrantRubricScores(grant.id, {
        impact,
        complexity,
        leadership,
        amplification,
        total_weighted: calculatedTotal,
      }, notes)

      onSuccess(updated)
      onClose()
    } catch (err) {
      console.error("Failed to save rubric scores:", err)
      alert("Error saving rubric scores.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0D1B2A] text-white rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
              Grant Advisory Rubric
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{grant.org_name}</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Weighted Score</span>
            <span className="text-2xl font-extrabold text-blue-400">{calculatedTotal} / 100</span>
          </div>
        </div>

        {/* 4 Rubric Dimensions */}
        <div className="space-y-5">
          {/* Dimension 1 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-200">1. Social / Educational Impact (Weight: 35%)</span>
              <span className="font-bold text-blue-400">{impact} / 5</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Does this solve a critical bottleneck affecting students or community?</p>
            <input
              type="range"
              min={1}
              max={5}
              value={impact}
              onChange={(e) => setImpact(Number(e.target.value))}
              className="w-full accent-blue-500 bg-white/10 rounded-lg h-2"
            />
          </div>

          {/* Dimension 2 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-200">2. Data Complexity & Fit (Weight: 25%)</span>
              <span className="font-bold text-indigo-400">{complexity} / 5</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Does their tech challenge allow us to showcase RoSense AI capabilities well?</p>
            <input
              type="range"
              min={1}
              max={5}
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-white/10 rounded-lg h-2"
            />
          </div>

          {/* Dimension 3 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-200">3. Leadership Buy-In (Weight: 20%)</span>
              <span className="font-bold text-sky-400">{leadership} / 5</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Is top leadership truly committed to the 7-day sprint?</p>
            <input
              type="range"
              min={1}
              max={5}
              value={leadership}
              onChange={(e) => setLeadership(Number(e.target.value))}
              className="w-full accent-sky-500 bg-white/10 rounded-lg h-2"
            />
          </div>

          {/* Dimension 4 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-200">4. Amplification Potential (Weight: 20%)</span>
              <span className="font-bold text-emerald-400">{amplification} / 5</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Do they have an engaged audience/media presence to share the story?</p>
            <input
              type="range"
              min={1}
              max={5}
              value={amplification}
              onChange={(e) => setAmplification(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-white/10 rounded-lg h-2"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Advisory Board Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter juror remarks, strengths, or recommendations..."
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {saving ? "Saving Scores..." : "Save Evaluation Score"}
          </button>
        </div>
      </div>
    </div>
  )
}
