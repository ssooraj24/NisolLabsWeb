"use client"

import { useState } from "react"
import { GrantApplication } from "@/types/grants"

interface GrantDetailsDrawerProps {
  grant: GrantApplication | null
  isOpen: boolean
  onClose: () => void
  onOpenScoringModal: (grant: GrantApplication) => void
  onUpdateStatus: (id: string, newStatus: GrantApplication["status"]) => void
}

export const GrantDetailsDrawer = ({
  grant,
  isOpen,
  onClose,
  onOpenScoringModal,
  onUpdateStatus,
}: GrantDetailsDrawerProps) => {
  if (!isOpen || !grant) return null

  const getStatusBadge = (status: GrantApplication["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "under_review":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "shortlisted":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "awarded":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "declined":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const [dispatching, setDispatching] = useState(false)

  const handleDispatchSprintGuide = async () => {
    if (!grant) return
    setDispatching(true)
    try {
      const res = await fetch("/api/grants/sprint-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: grant.contact_email,
          recipientName: grant.contact_name,
          orgName: grant.org_name,
        }),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        alert(`Sprint Guide booklet sent successfully to ${grant.contact_email}!`)
      } else {
        alert(result.error || "Failed to send Sprint Guide.")
      }
    } catch (err) {
      alert("Error sending Sprint Guide email.")
    } finally {
      setDispatching(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-[#0B172C] text-white h-full shadow-2xl flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-[#070F1E]">
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest block">
              Grant Application Dossier
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{grant.org_name}</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(grant.status)}`}>
              {grant.status.replace("_", " ").toUpperCase()}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Action Bar */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <span className="text-slate-400">Rubric Score:</span>{" "}
              <strong className="text-lg text-blue-400 ml-1">{grant.rubric_total_weighted || 0}/100</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDispatchSprintGuide}
                disabled={dispatching}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                title="Send 7-Day Sprint Guide PDF to Client Email"
              >
                {dispatching ? "Sending Guide..." : "📄 Email Sprint Guide"}
              </button>

              <button
                onClick={() => onOpenScoringModal(grant)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                ⚖️ Evaluate Rubric
              </button>

              <select
                value={grant.status}
                onChange={(e) => onUpdateStatus(grant.id, e.target.value as GrantApplication["status"])}
                className="px-3 py-1.5 rounded-lg bg-[#0F2448] text-white text-xs font-semibold border border-white/10 focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="awarded">Awarded 🎉</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          {/* Section A: Org Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
              Section A: Organization & Contact
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Registration Type:</span>
                <span className="font-semibold text-slate-200">{grant.registration_type}</span>
              </div>
              <div>
                <span className="text-slate-400 block">HQ Location:</span>
                <span className="font-semibold text-slate-200">{grant.hq_location}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Primary Contact:</span>
                <span className="font-semibold text-slate-200">{grant.contact_name} ({grant.contact_title})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Contact Info:</span>
                <span className="font-semibold text-slate-200">{grant.contact_email} | {grant.contact_phone}</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-xs text-slate-400 block">Mission Statement:</span>
              <p className="text-xs text-slate-200 mt-1 bg-white/5 p-3 rounded-lg border border-white/5">
                "{grant.mission_statement}"
              </p>
            </div>
          </div>

          {/* Section B: Impact & Bottleneck */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
              Section B: Problem & Technology Bottleneck
            </h3>
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Problem Solved:</span>
              <p className="text-xs text-slate-200 mt-1 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                {grant.problem_solved}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 block font-semibold">Technology Bottleneck:</span>
              <p className="text-xs text-slate-200 mt-1 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                {grant.tech_bottleneck}
              </p>
            </div>
          </div>

          {/* Section C: Partnership & Use Case */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
              Section C: Grant Use Case & Commitments
            </h3>
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Proposed Grant Use Case:</span>
              <p className="text-xs text-slate-200 mt-1 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                {grant.grant_use_case}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2">
                <span>{grant.leadership_confirmed ? "✓" : "✗"}</span>
                <span>Leadership Commitment Confirmed</span>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center gap-2">
                <span>{grant.amplification_pledged ? "✓" : "✗"}</span>
                <span>Co-Marketing Amplification Pledged</span>
              </div>
            </div>

            {grant.media_reach_link && (
              <div className="text-xs pt-2">
                <span className="text-slate-400">Media / Social Link: </span>
                <a
                  href={grant.media_reach_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  {grant.media_reach_link}
                </a>
              </div>
            )}
          </div>

          {/* Internal Notes */}
          {grant.internal_notes && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-amber-500/20 pb-2">
                Internal Advisory Notes
              </h3>
              <p className="text-xs text-amber-200 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                {grant.internal_notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#070F1E] flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Submitted on: {new Date(grant.created_at).toLocaleDateString()}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  )
}
