"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"

export type Tenant = {
  id: string
  name: string
  industry: string | null
  employee_count: number | null
  revenue_range: string | null
  created_at?: string
  updated_at?: string
}

const INDUSTRY_OPTIONS = [
  "Technology & Software",
  "Healthcare & Life Sciences",
  "Financial Services & Banking",
  "Manufacturing & Logistics",
  "Retail & E-commerce",
  "Professional Services",
  "Energy & Utilities",
  "Other"
]

const REVENUE_OPTIONS = [
  "< $1M",
  "$1M - $10M",
  "$10M - $50M",
  "$50M - $250M",
  "$250M+"
]

export default function TenantsPage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    employee_count: "",
    revenue_range: ""
  })
  const [submitting, setSubmitting] = useState(false)

  const loadTenants = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching tenants:", error)
      setError(`Failed to load tenants: ${error.message}`)
      setTenants([])
    } else {
      setTenants(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadTenants()
  }, [])

  const openCreateModal = () => {
    setEditingTenant(null)
    setFormData({ name: "", industry: "", employee_count: "", revenue_range: "" })
    setIsModalOpen(true)
  }

  const openEditModal = (tenant: Tenant) => {
    setEditingTenant(tenant)
    setFormData({
      name: tenant.name,
      industry: tenant.industry || "",
      employee_count: tenant.employee_count ? String(tenant.employee_count) : "",
      revenue_range: tenant.revenue_range || ""
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return alert("Tenant name is required")

    setSubmitting(true)
    const payload = {
      name: formData.name.trim(),
      industry: formData.industry || null,
      employee_count: formData.employee_count ? parseInt(formData.employee_count, 10) : null,
      revenue_range: formData.revenue_range || null,
      updated_at: new Date().toISOString()
    }

    if (editingTenant) {
      // Update existing tenant
      const { error } = await supabase
        .from("tenants")
        .update(payload)
        .eq("id", editingTenant.id)

      if (error) {
        alert(`Update failed: ${error.message}`)
      } else {
        setIsModalOpen(false)
        loadTenants()
      }
    } else {
      // Create new tenant
      const { error } = await supabase
        .from("tenants")
        .insert(payload)

      if (error) {
        alert(`Creation failed: ${error.message}`)
      } else {
        setIsModalOpen(false)
        loadTenants()
      }
    }
    setSubmitting(false)
  }

  const filteredTenants = tenants.filter((t) => {
    const q = searchQuery.toLowerCase()
    return (
      t.name.toLowerCase().includes(q) ||
      (t.industry || "").toLowerCase().includes(q) ||
      (t.revenue_range || "").toLowerCase().includes(q)
    )
  })

  return (
    <section className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0A1E3C] text-white rounded-2xl p-6 mb-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
            Directory & Tenant Management
          </span>
          <h1 className="text-3xl font-bold mt-1">Clients & Tenants</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Manage client organizations, industry sectors, company size, and enterprise tenant details.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-white text-[#0A1E3C] hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 text-[#0A1E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          + Add New Tenant
        </button>
      </div>

      {/* Error Notification */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadTenants} className="underline font-semibold">Retry</button>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            placeholder="Search tenants or industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800">{filteredTenants.length}</strong> of <strong className="text-slate-800">{tenants.length}</strong> tenants
        </div>
      </div>

      {/* Tenant Cards List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border">
          <div className="w-8 h-8 border-4 border-[#0A1E3C] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="font-medium text-sm">Loading tenants list...</p>
        </div>
      ) : filteredTenants.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border">
          <p className="font-bold text-lg text-slate-700">No tenants found</p>
          <p className="text-sm text-slate-500 mt-1">Get started by creating your first client tenant profile.</p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-block bg-[#0A1E3C] text-white px-4 py-2 rounded-lg text-xs font-semibold"
          >
            + Create Tenant
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-lg text-[#0A1E3C]">{tenant.name}</h3>
                  <button
                    onClick={() => openEditModal(tenant)}
                    className="p-1.5 rounded-lg border bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1 transition-colors"
                    title="Edit tenant details"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-slate-600">
                    <span className="w-24 text-slate-400 font-medium">Industry:</span>
                    <span className="font-semibold text-slate-800">{tenant.industry || "Not specified"}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <span className="w-24 text-slate-400 font-medium">Employees:</span>
                    <span className="font-semibold text-slate-800">{tenant.employee_count ? tenant.employee_count.toLocaleString() : "N/A"}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <span className="w-24 text-slate-400 font-medium">Revenue:</span>
                    <span className="font-semibold text-slate-800">{tenant.revenue_range || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  ID: {tenant.id.slice(0, 8)}...
                </span>
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View Audits →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-xl font-bold text-[#0A1E3C]">
                {editingTenant ? "Update Tenant" : "Create New Tenant"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tenant / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-sm border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Industry Sector
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full text-sm border rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                >
                  <option value="">Select industry sector...</option>
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Employee Count
                </label>
                <input
                  type="number"
                  placeholder="e.g. 250"
                  value={formData.employee_count}
                  onChange={(e) => setFormData({ ...formData, employee_count: e.target.value })}
                  className="w-full text-sm border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Revenue Range
                </label>
                <select
                  value={formData.revenue_range}
                  onChange={(e) => setFormData({ ...formData, revenue_range: e.target.value })}
                  className="w-full text-sm border rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                >
                  <option value="">Select annual revenue range...</option>
                  {REVENUE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#0A1E3C] text-white text-sm font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors"
                >
                  {submitting ? "Saving..." : editingTenant ? "Update Tenant" : "Create Tenant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
