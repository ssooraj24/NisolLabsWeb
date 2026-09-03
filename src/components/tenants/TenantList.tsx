"use client";

import { useState } from "react";
import { IndustrySector, Tenant, TenantStatus, TenantType, PricingPlan } from "@/types/database";
import { normalizePricingPlan } from "@/lib/report/reportPortfolioTypes";

const STATUS_BADGES: Record<TenantStatus, { bg: string; text: string }> = {
  active: { bg: "bg-emerald-100", text: "text-emerald-800" },
  prospect: { bg: "bg-blue-100", text: "text-blue-800" },
  inactive: { bg: "bg-amber-100", text: "text-amber-800" },
  lost: { bg: "bg-rose-100", text: "text-rose-800" },
  past: { bg: "bg-purple-100", text: "text-purple-800" },
};

const TYPE_BADGES: Record<TenantType, { bg: string; text: string }> = {
  client: { bg: "bg-[#0A1E3C]/10", text: "text-[#0A1E3C]" },
  prospect: { bg: "bg-sky-100", text: "text-sky-800" },
  partner: { bg: "bg-indigo-100", text: "text-indigo-800" },
  internal: { bg: "bg-slate-100", text: "text-slate-700" },
};

const PLAN_BADGES: Record<PricingPlan, { bg: string; text: string; label: string }> = {
  spark: { bg: "bg-emerald-50 border border-emerald-300", text: "text-emerald-800", label: "Spark" },
  foundation: { bg: "bg-slate-100 border border-slate-200", text: "text-slate-700", label: "One" },
  growth: { bg: "bg-amber-50 border border-amber-300", text: "text-amber-800", label: "Pro" },
  enterprise: { bg: "bg-purple-50 border border-purple-300", text: "text-purple-800", label: "Enterprise" },
  custom: { bg: "bg-blue-50 border border-blue-300", text: "text-blue-800", label: "Custom" },
};

const INDUSTRY_SECTORS: IndustrySector[] = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Retail",
  "Energy",
  "Education",
  "Government",
  "Professional Services",
  "Transportation",
  "Real Estate",
  "Media",
  "Other",
];

interface TenantListProps {
  tenants: Tenant[];
  loading: boolean;
  onEdit: (tenant: Tenant) => void;
  onViewDetail: (tenant: Tenant) => void;
  onCreateNew: () => void;
}

export default function TenantList({
  tenants,
  loading,
  onEdit,
  onViewDetail,
  onCreateNew,
}: TenantListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  const filteredTenants = tenants.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (sectorFilter !== "all" && t.industry_sector !== sectorFilter) return false;
    if (typeFilter !== "all" && t.tenant_type !== typeFilter) return false;
    if (planFilter !== "all" && normalizePricingPlan(t.pricing_plan) !== planFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = t.name.toLowerCase().includes(q);
      const matchIndustry = (t.industry || "").toLowerCase().includes(q);
      const matchSubIndustry = (t.sub_industry || "").toLowerCase().includes(q);
      const matchSector = (t.industry_sector || "").toLowerCase().includes(q);
      const matchCountry = (t.country || "").toLowerCase().includes(q);
      const matchCity = (t.city || "").toLowerCase().includes(q);
      return matchName || matchIndustry || matchSubIndustry || matchSector || matchCountry || matchCity;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border space-y-3 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        <div className="flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Search tenant name, industry, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="prospect">Prospect</option>
            <option value="inactive">Inactive</option>
            <option value="lost">Lost</option>
            <option value="past">Past</option>
          </select>

          {/* Industry Sector Filter */}
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="border rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          >
            <option value="all">All Industry Sectors</option>
            {INDUSTRY_SECTORS.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>

          {/* Tenant Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          >
            <option value="all">All Tenant Types</option>
            <option value="client">Client</option>
            <option value="prospect">Prospect</option>
            <option value="partner">Partner</option>
            <option value="internal">Internal</option>
          </select>

          {/* Subscribed Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="border rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          >
            <option value="all">All Plans</option>
            <option value="spark">Spark</option>
            <option value="foundation">Nisol One</option>
            <option value="growth">Nisol Pro</option>
            <option value="enterprise">Nisol Enterprise</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium shrink-0">
          Showing <strong className="text-slate-800">{filteredTenants.length}</strong> of{" "}
          <strong className="text-slate-800">{tenants.length}</strong>
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
          <div className="w-8 h-8 border-4 border-[#0A1E3C] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="font-medium text-xs">Loading tenant database...</p>
        </div>
      ) : filteredTenants.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
          <p className="font-bold text-base text-slate-700">No tenants match criteria</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p>
          <button
            onClick={onCreateNew}
            className="mt-4 inline-block bg-[#0A1E3C] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            + Add New Tenant
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTenants.map((tenant) => {
            const statusBadge = STATUS_BADGES[tenant.status] || STATUS_BADGES.active;
            const typeBadge = TYPE_BADGES[tenant.tenant_type] || TYPE_BADGES.client;
            const normPlan = normalizePricingPlan(tenant.pricing_plan);
            const planBadge = PLAN_BADGES[normPlan];

            return (
              <div
                key={tenant.id}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-base text-[#0A1E3C] leading-snug">{tenant.name}</h3>
                      {tenant.website && (
                        <a
                          href={tenant.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          🌐 {tenant.website.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${statusBadge.bg} ${statusBadge.text}`}>
                          {tenant.status || "active"}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${typeBadge.bg} ${typeBadge.text}`}>
                          {tenant.tenant_type || "client"}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${planBadge.bg} ${planBadge.text}`}>
                        ★ {planBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4 border-t pt-3 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Subscribed Plan:</span>
                      <span className="font-bold text-slate-900 capitalize">{normPlan}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Sector:</span>
                      <span className="font-semibold text-slate-800">{tenant.industry_sector || tenant.industry || "N/A"}</span>
                    </div>
                    {tenant.sub_industry && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium">Sub-Industry:</span>
                        <span className="font-semibold text-slate-800">{tenant.sub_industry}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Company Size:</span>
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {tenant.company_size || (tenant.employee_count ? `${tenant.employee_count} employees` : "N/A")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Revenue Range:</span>
                      <span className="font-semibold text-slate-800">{tenant.revenue_range || "N/A"}</span>
                    </div>
                    {(tenant.city || tenant.country) && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium">Location:</span>
                        <span className="font-semibold text-slate-800">
                          {[tenant.city, tenant.state, tenant.country].filter(Boolean).join(", ")}
                        </span>
                      </div>
                    )}
                    {tenant.partner_name && (
                      <div className="flex items-center justify-between text-xs text-slate-600 bg-golden-50 p-2 rounded-xl border border-golden-200 mt-2">
                        <span className="text-golden-900 font-bold text-[10px] uppercase">🤝 Referred By Partner:</span>
                        <span className="font-extrabold text-golden-800">{tenant.partner_name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewDetail(tenant)}
                    className="text-xs font-semibold text-slate-600 hover:text-[#0A1E3C] underline"
                  >
                    View Detail
                  </button>
                  <button
                    onClick={() => onEdit(tenant)}
                    className="px-3 py-1.5 rounded-lg border bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
