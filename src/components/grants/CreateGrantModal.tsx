"use client"

import { useState } from "react"
import { GrantApplication, GrantApplicationFormData } from "@/types/grants"
import { createGrantApplication } from "@/lib/supabase/queries/grants"

interface CreateGrantModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (newGrant: GrantApplication) => void
}

export const CreateGrantModal = ({ isOpen, onClose, onSuccess }: CreateGrantModalProps) => {
  if (!isOpen) return null

  const [formData, setFormData] = useState<GrantApplicationFormData>({
    org_name: "",
    registration_type: "Educational Institution",
    hq_location: "",
    mission_statement: "",
    problem_solved: "",
    tech_bottleneck: "",
    leadership_confirmed: true,
    grant_use_case: "",
    amplification_pledged: true,
    contact_name: "",
    contact_title: "",
    contact_email: "",
    contact_phone: "",
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const created = await createGrantApplication(formData)
      onSuccess(created)
      onClose()
    } catch (err) {
      console.error("Failed to create manual grant:", err)
      alert("Error creating grant application record.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0D1B2A] text-white rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-6 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
              Superadmin Action
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">Log Offline Grant Application</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Organization Name *</label>
              <input
                type="text"
                name="org_name"
                required
                value={formData.org_name}
                onChange={handleChange}
                placeholder="e.g. BITS Pilani Research Lab"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Registration Type *</label>
              <select
                name="registration_type"
                value={formData.registration_type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-[#0F2448] border border-white/10 text-white"
              >
                <option value="Educational Institution">Educational Institution</option>
                <option value="Section 8 Company">Section 8 Company</option>
                <option value="Trust">Trust</option>
                <option value="Society">Society</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">HQ Location *</label>
              <input
                type="text"
                name="hq_location"
                required
                value={formData.hq_location}
                onChange={handleChange}
                placeholder="City, State, Country"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Mission Statement *</label>
              <textarea
                name="mission_statement"
                required
                rows={2}
                value={formData.mission_statement}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Problem Solved *</label>
              <textarea
                name="problem_solved"
                required
                rows={2}
                value={formData.problem_solved}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Technology Bottleneck *</label>
              <textarea
                name="tech_bottleneck"
                required
                rows={2}
                value={formData.tech_bottleneck}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Proposed Grant Use Case *</label>
              <textarea
                name="grant_use_case"
                required
                rows={2}
                value={formData.grant_use_case}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Name *</label>
              <input
                type="text"
                name="contact_name"
                required
                value={formData.contact_name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Designation *</label>
              <input
                type="text"
                name="contact_title"
                required
                value={formData.contact_title}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Email *</label>
              <input
                type="email"
                name="contact_email"
                required
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Phone *</label>
              <input
                type="tel"
                name="contact_phone"
                required
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-50"
            >
              {saving ? "Creating Record..." : "Log Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
