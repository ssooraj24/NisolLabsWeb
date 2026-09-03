"use client"

import { useEffect, useState } from "react"
import { GrantApplication, GrantStatus } from "@/types/grants"
import { getGrantApplications, updateGrantApplication, deleteGrantApplication } from "@/lib/supabase/queries/grants"
import { GrantDetailsDrawer } from "@/components/grants/GrantDetailsDrawer"
import { GrantScoringModal } from "@/components/grants/GrantScoringModal"
import { CreateGrantModal } from "@/components/grants/CreateGrantModal"

export default function AdminGrantsPage() {
  const [grants, setGrants] = useState<GrantApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Modal / Drawer States
  const [selectedGrant, setSelectedGrant] = useState<GrantApplication | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isScoringOpen, setIsScoringOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const fetchGrants = async () => {
    setLoading(true)
    try {
      const data = await getGrantApplications({ status: activeTab, search: searchQuery })
      setGrants(data)
    } catch (err) {
      console.error("Failed to fetch grant applications:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGrants()
  }, [activeTab, searchQuery])

  // Handlers for Status Update
  const handleUpdateStatus = async (id: string, newStatus: GrantStatus) => {
    try {
      const updated = await updateGrantApplication(id, { status: newStatus })
      setGrants((prev) => prev.map((g) => (g.id === id ? updated : g)))
      if (selectedGrant?.id === id) {
        setSelectedGrant(updated)
      }
    } catch (err) {
      console.error("Error updating status:", err)
      alert("Failed to update status.")
    }
  }

  // Handlers for Delete
  const handleDeleteGrant = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the grant application for "${name}"?`)) return
    try {
      await deleteGrantApplication(id)
      setGrants((prev) => prev.filter((g) => g.id !== id))
      if (selectedGrant?.id === id) {
        setIsDrawerOpen(false)
        setSelectedGrant(null)
      }
    } catch (err) {
      console.error("Error deleting grant record:", err)
      alert("Failed to delete grant record.")
    }
  }

  // Metric Calculation
  const totalCount = grants.length
  const pendingCount = grants.filter((g) => g.status === "pending").length
  const shortlistedCount = grants.filter((g) => g.status === "shortlisted").length
  const awardedCount = grants.filter((g) => g.status === "awarded").length
  const avgScore =
    grants.length > 0
      ? Math.round(grants.reduce((acc, g) => acc + (g.rubric_total_weighted || 0), 0) / grants.length)
      : 0

  const getStatusBadge = (status: GrantStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "under_review":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "shortlisted":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "awarded":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "declined":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-widest">
            <span>🛡️ Superadmin Portal</span>
            <span>•</span>
            <span>Intelligence Grants</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Grant Applications & Fellowship Management
          </h1>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
        >
          <span>+ Log Offline Grant</span>
        </button>
      </div>

      {/* Metrics Header Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Total Inquiries
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
            Pending Review
          </span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{pendingCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider block">
            Shortlisted
          </span>
          <span className="text-2xl font-bold text-purple-600 mt-1 block">{shortlistedCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">
            Awarded Grants
          </span>
          <span className="text-2xl font-bold text-emerald-600 mt-1 block">{awardedCount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm col-span-2 lg:col-span-1">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            Avg Rubric Score
          </span>
          <span className="text-2xl font-bold text-blue-600 mt-1 block">{avgScore} / 100</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Grants" },
            { id: "pending", label: "Pending" },
            { id: "under_review", label: "Under Review" },
            { id: "shortlisted", label: "Shortlisted" },
            { id: "awarded", label: "Awarded" },
            { id: "declined", label: "Declined" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search org, email, city..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading grant applications...</div>
        ) : grants.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-slate-500 text-sm font-medium">No grant applications found matching your filter.</p>
            <button
              onClick={() => {
                setActiveTab("all")
                setSearchQuery("")
              }}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Organization</th>
                  <th className="py-3.5 px-4">Registration</th>
                  <th className="py-3.5 px-4">Primary Contact</th>
                  <th className="py-3.5 px-4 text-center">Rubric Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {grants.map((grant) => (
                  <tr key={grant.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      <div>{grant.org_name}</div>
                      <span className="text-[11px] font-normal text-slate-400">{grant.hq_location}</span>
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-600">{grant.registration_type}</td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{grant.contact_name}</div>
                      <div className="text-[11px] text-slate-400">{grant.contact_email}</div>
                    </td>

                    <td className="py-4 px-4 text-center font-bold">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-mono text-xs ${
                          (grant.rubric_total_weighted || 0) >= 70
                            ? "bg-emerald-100 text-emerald-800"
                            : (grant.rubric_total_weighted || 0) >= 40
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {grant.rubric_total_weighted || 0} / 100
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(grant.status)}`}>
                        {grant.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-500">
                      {new Date(grant.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedGrant(grant)
                          setIsDrawerOpen(true)
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-colors"
                      >
                        View Dossier
                      </button>

                      <button
                        onClick={() => {
                          setSelectedGrant(grant)
                          setIsScoringOpen(true)
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-xs transition-colors"
                      >
                        Evaluate
                      </button>

                      <button
                        onClick={() => handleDeleteGrant(grant.id, grant.org_name)}
                        className="px-2 py-1 rounded-lg hover:bg-rose-50 text-rose-600 text-xs transition-colors"
                        title="Delete record"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals & Drawers */}
      <GrantDetailsDrawer
        grant={selectedGrant}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenScoringModal={(grant) => {
          setSelectedGrant(grant)
          setIsScoringOpen(true)
        }}
        onUpdateStatus={handleUpdateStatus}
      />

      <GrantScoringModal
        grant={selectedGrant}
        isOpen={isScoringOpen}
        onClose={() => setIsScoringOpen(false)}
        onSuccess={(updated) => {
          setGrants((prev) => prev.map((g) => (g.id === updated.id ? updated : g)))
          if (selectedGrant?.id === updated.id) {
            setSelectedGrant(updated)
          }
        }}
      />

      <CreateGrantModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={(newGrant) => {
          setGrants((prev) => [newGrant, ...prev])
        }}
      />
    </div>
  )
}
