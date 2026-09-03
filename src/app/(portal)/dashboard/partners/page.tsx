"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Handshake, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Star, 
  Building2, 
  FileText, 
  Settings, 
  ChevronRight, 
  Download, 
  Check, 
  X,
  ExternalLink,
  Plus,
  RefreshCw,
  Zap,
  Globe
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Initial mock dataset for initial render / local preview
const MOCK_PARTNERS = [
  {
    id: "p-101",
    full_name: "Vikram Mehta",
    company_name: "Apex Tech Solutions",
    work_email: "vikram@apextech.com",
    partner_track: "Implementation Partner (25-35%)",
    primary_market: "India Tier-1 Cities",
    is_founding_partner: true,
    status: "active",
    unique_ref_code: "NISOL-APEX-492",
    created_at: "2026-09-02T10:14:00Z"
  },
  {
    id: "p-102",
    full_name: "Sarah Jenkins",
    company_name: "Atlas Advisory Group",
    work_email: "sarah@atlasadvisory.com",
    partner_track: "Referral Partner (15-20%)",
    primary_market: "Dubai / UAE / GCC",
    is_founding_partner: true,
    status: "active",
    unique_ref_code: "NISOL-ATLAS-104",
    created_at: "2026-09-02T14:22:00Z"
  },
  {
    id: "p-103",
    full_name: "Rahul Sharma",
    company_name: "NextGen Cloud Systems",
    work_email: "rahul@nextgencloud.io",
    partner_track: "Implementation Partner (25-35%)",
    primary_market: "India Tier-1 Cities",
    is_founding_partner: false,
    status: "pending_approval",
    unique_ref_code: "NISOL-NEXTG-991",
    created_at: "2026-09-03T09:10:00Z"
  }
];

const MOCK_DEALS = [
  {
    id: "d-801",
    partner_name: "Apex Tech Solutions",
    partner_id: "p-101",
    target_company_name: "Reliance Global Logistics",
    target_domain: "reliancelogistics.com",
    contact_person_name: "Anish Patel (CIO)",
    package_tier: "Nisol Enterprise",
    estimated_deal_value_inr: 1850000,
    status: "protected",
    protection_expires_at: "2026-12-02T10:14:00Z",
    sla_response_due_at: "2026-09-05T10:14:00Z",
    created_at: "2026-09-02T10:14:00Z"
  },
  {
    id: "d-802",
    partner_name: "Atlas Advisory Group",
    partner_id: "p-102",
    target_company_name: "Emirates FinTech Hub",
    target_domain: "emiratesfintech.ae",
    contact_person_name: "Tariq Al-Mansoor (CTO)",
    package_tier: "Nisol Enterprise",
    estimated_deal_value_inr: 2400000,
    status: "protected",
    protection_expires_at: "2026-12-02T14:22:00Z",
    sla_response_due_at: "2026-09-04T14:22:00Z",
    created_at: "2026-09-02T14:22:00Z"
  },
  {
    id: "d-803",
    partner_name: "NextGen Cloud Systems",
    partner_id: "p-103",
    target_company_name: "Reliance Global Logistics",
    target_domain: "reliancelogistics.com",
    contact_person_name: "Anish Patel",
    package_tier: "Nisol Enterprise",
    estimated_deal_value_inr: 1850000,
    status: "conflict_rejected",
    conflict_partner_name: "Apex Tech Solutions",
    protection_expires_at: "N/A",
    sla_response_due_at: "N/A",
    created_at: "2026-09-03T09:12:00Z"
  }
];

const MOCK_COMMISSIONS = [
  {
    id: "c-301",
    partner_name: "Apex Tech Solutions",
    target_company_name: "Reliance Global Logistics",
    deal_revenue_inr: 1850000,
    commission_rate: 0.30,
    commission_amount_inr: 555000,
    commission_type: "Year 1 (30%)",
    payout_status: "calculated",
    created_at: "2026-09-02T10:14:00Z"
  }
];

function SuperadminPartnersContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as "applications" | "deals" | "directory" | "commissions" | "assets" | "settings" | null;

  const [activeTab, setActiveTab] = useState<"applications" | "deals" | "directory" | "commissions" | "assets" | "settings">("applications");

  useEffect(() => {
    if (tabParam && ["applications", "deals", "directory", "commissions", "assets", "settings"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const [partners, setPartners] = useState(MOCK_PARTNERS);
  const [deals, setDeals] = useState(MOCK_DEALS);
  const [commissions, setCommissions] = useState(MOCK_COMMISSIONS);

  const pendingApps = partners.filter(p => p.status === "pending_approval");
  const activePartners = partners.filter(p => p.status === "active");
  const protectedDeals = deals.filter(d => d.status === "protected");
  const conflictDeals = deals.filter(d => d.status === "conflict_rejected");

  const approvePartner = (id: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, status: "active" } : p));
  };

  const rejectPartner = (id: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, status: "rejected" } : p));
  };

  return (
    <div className="p-6 min-h-screen bg-[#F8FAFC] font-sans space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0A1E3C]">Superadmin Partner Hub</h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-golden-500/20 text-golden-800 border border-golden-400">
              FOUNDING COHORT ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage partner applications, timestamped deal protection, 48-hour SLAs, and Net-30 monthly payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/partner" target="_blank" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-3.5 py-2 rounded-xl transition-all shadow-xs">
            <ExternalLink className="w-3.5 h-3.5 text-golden-600" />
            <span>View Live /partner Page</span>
          </Link>
          <Link href="/partner/terms" target="_blank" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0A1E3C] hover:bg-slate-800 px-3.5 py-2 rounded-xl transition-all shadow-xs">
            <FileText className="w-3.5 h-3.5 text-golden-400" />
            <span>Partner Terms</span>
          </Link>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Applications</span>
            <div className="text-2xl font-black text-[#0A1E3C] mt-1">{pendingApps.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-golden-50 text-golden-700 border border-golden-200 flex items-center justify-center font-bold">
            📥
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Active Protected Deals</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{protectedDeals.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
            🛡️
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Conflict Disputes Flagged</span>
            <div className="text-2xl font-black text-amber-700 mt-1">{conflictDeals.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
            ⚖️
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-golden-600">Calculated Payouts</span>
            <div className="text-2xl font-black text-golden-700 mt-1">₹5.55L</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-golden-50 text-golden-700 border border-golden-200 flex items-center justify-center font-bold">
            💰
          </div>
        </div>
      </div>

      {/* Submenu Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "applications"
              ? "bg-[#0A1E3C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span>📥 Applications & Approvals</span>
          {pendingApps.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-golden-500 text-[#0A1E3C] text-[10px] font-black">
              {pendingApps.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("deals")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "deals"
              ? "bg-[#0A1E3C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span>🛡️ Deal Registrations & Conflicts</span>
          {conflictDeals.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-black">
              {conflictDeals.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("directory")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "directory"
              ? "bg-[#0A1E3C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          👥 Partner Directory & Tiers ({activePartners.length})
        </button>

        <button
          onClick={() => setActiveTab("commissions")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "commissions"
              ? "bg-[#0A1E3C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          💰 Commissions & Net-30 Payouts
        </button>

        <button
          onClick={() => setActiveTab("assets")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "assets"
              ? "bg-[#0A1E3C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          📚 Partner Assets & Collateral
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "settings"
              ? "bg-[#0A1E3C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          ⚙️ SLA & Program Settings
        </button>
      </div>

      {/* TAB CONTENTS */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0A1E3C]">Partner Application Queue</h2>
            <span className="text-xs text-slate-500 font-medium">Auto-notifies applicants upon approval</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Applicant & Firm</th>
                    <th className="p-4">Track</th>
                    <th className="p-4">Region / Focus</th>
                    <th className="p-4">Applied At</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {partners.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#0A1E3C]">{p.full_name}</div>
                        <div className="text-slate-500 text-[11px]">{p.company_name} • {p.work_email}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{p.partner_track}</td>
                      <td className="p-4 text-slate-600">{p.primary_market}</td>
                      <td className="p-4 text-slate-400">{new Date(p.created_at).toLocaleDateString()}</td>
                      <td className="p-4 text-center">
                        {p.status === "pending_approval" ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-golden-100 text-golden-800 border border-golden-300">
                            PENDING REVIEW
                          </span>
                        ) : p.status === "active" ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            APPROVED (FOUNDING)
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                            REJECTED
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {p.status === "pending_approval" && (
                          <>
                            <button
                              onClick={() => approvePartner(p.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                            >
                              Approve Partner
                            </button>
                            <button
                              onClick={() => rejectPartner(p.id)}
                              className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold text-[11px] hover:bg-slate-300 transition-colors"
                            >
                              Reject
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
        </div>
      )}

      {activeTab === "deals" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0A1E3C]">Timestamped Deal Registrations & Conflict Desk</h2>
              <p className="text-xs text-slate-500">First-come, first-served domain deduplication (`domain.com`). 90-day protection window.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Timestamp (Exact MS)</th>
                    <th className="p-4">Target Domain</th>
                    <th className="p-4">Registering Partner</th>
                    <th className="p-4">Package</th>
                    <th className="p-4">48-Hr SLA Status</th>
                    <th className="p-4">90-Day Protection</th>
                    <th className="p-4 text-center">Status & Conflict Check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deals.map((d) => (
                    <tr key={d.id} className={d.status === "conflict_rejected" ? "bg-amber-50/40 hover:bg-amber-50" : "hover:bg-slate-50/50"}>
                      <td className="p-4 text-slate-400 font-mono text-[10px]">
                        {new Date(d.created_at).toISOString()}
                      </td>
                      <td className="p-4 font-bold text-[#0A1E3C]">
                        {d.target_company_name}
                        <div className="text-[11px] font-mono text-golden-600 font-semibold">{d.target_domain}</div>
                      </td>
                      <td className="p-4 font-medium text-slate-700">{d.partner_name}</td>
                      <td className="p-4 text-slate-600">{d.package_tier}</td>
                      <td className="p-4">
                        {d.status === "protected" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <Clock className="w-3 h-3 text-emerald-600" /> SLA Contacted
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {d.protection_expires_at !== "N/A" ? (
                          <span>Active until {new Date(d.protection_expires_at).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {d.status === "protected" ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            PROTECTION GRANTED
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              ⚠️ CONFLICT REJECTED
                            </span>
                            <div className="text-[10px] text-amber-700">
                              Earlier Partner: <strong>{d.conflict_partner_name}</strong>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "directory" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0A1E3C]">Active Partner Directory</h2>
            <span className="text-xs text-slate-500 font-medium">All approved Founding & Standard partners</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activePartners.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#0A1E3C]">{p.company_name}</h3>
                    <p className="text-xs text-slate-500">{p.full_name} • {p.work_email}</p>
                  </div>
                  {p.is_founding_partner && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-golden-100 text-golden-800 border border-golden-300">
                      FOUNDING (30%)
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border space-y-1">
                  <div>Track: <strong>{p.partner_track}</strong></div>
                  <div>Region: <strong>{p.primary_market}</strong></div>
                  <div>Ref Code: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px] text-slate-800">{p.unique_ref_code}</code></div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Joined {new Date(p.created_at).toLocaleDateString()}</span>
                  <span className="font-bold text-emerald-600">Active Status</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "commissions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0A1E3C]">Monthly Net-30 Commission Payouts</h2>
            <button className="px-3.5 py-1.5 bg-[#0A1E3C] text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs">
              <Download className="w-3.5 h-3.5 text-golden-400" />
              <span>Export Payout Batch (CSV)</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Partner</th>
                  <th className="p-4">Target Company</th>
                  <th className="p-4">Closed Deal Revenue</th>
                  <th className="p-4">Commission Rate</th>
                  <th className="p-4">Calculated Payout</th>
                  <th className="p-4 text-center">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {commissions.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-[#0A1E3C]">{c.partner_name}</td>
                    <td className="p-4 text-slate-700">{c.target_company_name}</td>
                    <td className="p-4 font-mono font-bold text-slate-800">₹{c.deal_revenue_inr.toLocaleString("en-IN")}</td>
                    <td className="p-4 font-bold text-golden-600">{c.commission_type}</td>
                    <td className="p-4 font-mono font-black text-emerald-700">₹{c.commission_amount_inr.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-golden-100 text-golden-800 border border-golden-300">
                        CALCULATED (NET-30 PENDING)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "assets" && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0A1E3C]">Partner Resource & Sales Collateral Library</h2>
          <p className="text-xs text-slate-500">Sales decks, executive one-pagers, and proposal templates delivered to partners inside their dashboard.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="text-xs text-navy-950 block">Nisol AI Partner Sales Pitch Deck (2026)</strong>
                <span className="text-[10px] text-slate-400">PDF • 14 Slides</span>
              </div>
              <Button variant="navy" size="sm">Download</Button>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="text-xs text-navy-950 block">Nisol Enterprise Executive One-Pager</strong>
                <span className="text-[10px] text-slate-400">PDF • 2 Pages</span>
              </div>
              <Button variant="navy" size="sm">Download</Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-3xl">
          <h2 className="text-base font-bold text-[#0A1E3C]">Global Partner Program Configuration</h2>
          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
              <div>
                <strong className="block text-navy-950 font-bold">Deal Protection Duration</strong>
                <span className="text-[11px] text-slate-500">Days of exclusive protection awarded on approved deal registrations</span>
              </div>
              <span className="font-bold text-golden-600 bg-golden-100 px-3 py-1 rounded-lg border border-golden-300">90 Days</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
              <div>
                <strong className="block text-navy-950 font-bold">Lead Contact SLA Guarantee</strong>
                <span className="text-[11px] text-slate-500">Maximum response window for internal sales team to reach referred prospects</span>
              </div>
              <span className="font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">48 Hours</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
              <div>
                <strong className="block text-navy-950 font-bold">Founding Partner Cohort Capacity</strong>
                <span className="text-[11px] text-slate-500">Maximum number of initial partners grandfathered at 30% permanent rate</span>
              </div>
              <span className="font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-lg border border-purple-300">10 Partners</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SuperadminPartnersPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm font-semibold text-slate-500">Loading Superadmin Partner Hub...</div>}>
      <SuperadminPartnersContent />
    </Suspense>
  );
}
