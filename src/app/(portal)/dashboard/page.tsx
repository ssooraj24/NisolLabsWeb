"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

type Audit = { 
  id: string; 
  title: string; 
  status: string | null; 
  overall_maturity_score: number | null;
  tenant_id: string;
  conducted_by: string | null;
  created_at: string;
}
type Tenant = { id: string; name: string }

export default function Dashboard() {
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

  if (loading) return <p className="p-6">Loading audits...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>

  const tenantMap = new Map(tenants.map(t => [t.id, t.name]))

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Discovery Dashboard</h1>
        <NewAuditModal tenants={tenants} onCreated={loadData} supabase={supabase} />
      </div>

      {audits.length === 0 ? (
        <div className="p-8 border rounded bg-white text-center">
          <p className="mb-2">No audits found.</p>
          <p className="text-sm text-gray-500">Create your first audit to start assessment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {audits.map(audit => (
            <div key={audit.id} className="p-4 border rounded bg-white">
              <h2 className="font-semibold text-lg">{audit.title}</h2>
              <p className="text-sm text-gray-600">Tenant: {tenantMap.get(audit.tenant_id) || audit.tenant_id}</p>
              <p className="text-sm text-gray-600">Status: {audit.status || "draft"} | Score: {audit.overall_maturity_score ?? 0}/5</p>
              <p className="text-xs text-gray-400">ID: {audit.id.slice(0,8)}... | {new Date(audit.created_at).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-3">
                <Link href={`/audits/${audit.id}/questionnaire`} className="text-sm border px-3 py-1 rounded bg-black text-white">
                  Open Questionnaire
                </Link>
                <Link href={`/audits/${audit.id}`} className="text-sm border px-3 py-1 rounded">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function NewAuditModal({ tenants, onCreated, supabase }: { tenants: Tenant[]; onCreated: () => void; supabase: any }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [tenantId, setTenantId] = useState("")
  const [saving, setSaving] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !tenantId) return alert("Enter title and tenant")
    setSaving(true)

    // Get current user for conducted_by
    const { data: { user } } = await supabase.auth.getUser()

    const { error, data } = await supabase
      .from("audits")
      .insert({ 
        title, 
        tenant_id: tenantId, 
        status: "draft",
        conducted_by: user?.id || null,
        raw_responses: {}
      })
      .select()

    setSaving(false)
    if (error) {
      alert(`Failed: ${error.message}`)
      console.error(error)
    } else {
      setOpen(false)
      setTitle("")
      setTenantId("")
      onCreated()
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="border px-4 py-2 rounded bg-black text-white">
        + New Audit
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Create Audit</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 font-medium">Audit Title *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border rounded p-2" placeholder="e.g. Acme Corp Discovery 2025" />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">Tenant *</label>
                <select value={tenantId} onChange={e => setTenantId(e.target.value)} required className="w-full border rounded p-2">
                  <option value="">Select tenant</option>
                  {tenants.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
                  {saving ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}