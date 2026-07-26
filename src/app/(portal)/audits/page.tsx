"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

type Audit = {
  id: string
  title: string
  status: string | null
  overall_maturity_score: number | null
  tenant_id: string
  conducted_by: string | null
  created_at: string
}

type Tenant = { id: string; name: string }

export default function AuditsPage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )
  const [audits, setAudits] = useState<Audit[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const loadData = async () => {
    setLoading(true)
    setError(null)

    const { data: auditsData, error: auditsError } = await supabase
      .from("audits")
      .select("id, title, status, overall_maturity_score, tenant_id, conducted_by, created_at")
      .order("created_at", { ascending: false })

    const { data: tenantsData, error: tenantsError } = await supabase
      .from("tenants")
      .select("id, name")

    if (auditsError) {
      console.error(auditsError)
      setError(`audits table error: ${auditsError.message}`)
    } else if (tenantsError) {
      console.error(tenantsError)
      setError(`tenants table error: ${tenantsError.message}`)
    } else {
      setAudits(auditsData || [])
      setTenants(tenantsData || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const tenantMap = new Map(tenants.map((t) => [t.id, t.name]))

  const filteredAudits = audits.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tenantMap.get(a.tenant_id) || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <p className="p-6">Loading audits list...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>

  return (
    <section className="p-6 min-h-screen bg-[#F8FAFC]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1E3C]">Audits Overview</h1>
          <p className="text-sm text-slate-500">Manage and conduct digital maturity assessments across client tenants.</p>
        </div>
        <input
          type="text"
          placeholder="Search audits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm w-full md:w-64 bg-white"
        />
      </div>

      {filteredAudits.length === 0 ? (
        <div className="p-8 border rounded-xl bg-white text-center shadow-sm">
          <p className="font-semibold text-slate-700">No audits found</p>
          <p className="text-sm text-slate-500 mt-1">Create audits from the Discovery Dashboard.</p>
          <Link href="/dashboard" className="inline-block mt-4 text-xs font-semibold bg-[#0A1E3C] text-white px-4 py-2 rounded-lg">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAudits.map((audit) => (
            <div key={audit.id} className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700 capitalize">
                    {audit.status || "draft"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(audit.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="font-bold text-base text-[#0A1E3C] mb-1">{audit.title}</h2>
                <p className="text-xs text-slate-600 mb-3">
                  <span className="font-medium text-slate-400">Tenant:</span> {tenantMap.get(audit.tenant_id) || audit.tenant_id}
                </p>
                <div className="bg-slate-50 p-2.5 rounded-lg border text-xs text-slate-600 mb-4 flex justify-between items-center">
                  <span>Maturity Score:</span>
                  <span className="font-bold text-[#0A1E3C] text-sm">{audit.overall_maturity_score ?? 0} / 5.0</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t mt-auto">
                <Link
                  href={`/audits/${audit.id}/questionnaire`}
                  className="flex-1 text-center text-xs font-medium border py-2 rounded-lg bg-[#0A1E3C] text-white hover:bg-slate-800 transition-colors"
                >
                  Questionnaire
                </Link>
                <Link
                  href={`/audits/${audit.id}`}
                  className="flex-1 text-center text-xs font-medium border py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
