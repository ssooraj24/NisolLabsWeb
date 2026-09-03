"use client";

import { useEffect, useState } from "react";
import { IndustrySector, RevenueRangeOption, Tenant, TenantStatus, TenantType, PricingPlan } from "@/types/database";
import { updateTenant } from "@/lib/supabase/queries/tenants";
import { PRICING_PLAN_OPTIONS } from "./CreateTenantForm";
import { createBrowserClient } from "@supabase/ssr";

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

const REVENUE_RANGES: RevenueRangeOption[] = [
  "< ₹10 Cr",
  "₹10 Cr - ₹50 Cr",
  "₹50 Cr - ₹250 Cr",
  "₹250 Cr - ₹1,000 Cr",
  "₹1,000 Cr - ₹5,000 Cr",
  "> ₹5,000 Cr",
  "Prefer not to say",
];

const STATUS_OPTIONS: { label: string; value: TenantStatus }[] = [
  { label: "Active", value: "active" },
  { label: "Prospect", value: "prospect" },
  { label: "Inactive", value: "inactive" },
  { label: "Lost", value: "lost" },
  { label: "Past", value: "past" },
];

const TENANT_TYPE_OPTIONS: { label: string; value: TenantType }[] = [
  { label: "Client", value: "client" },
  { label: "Prospect", value: "prospect" },
  { label: "Partner", value: "partner" },
  { label: "Internal", value: "internal" },
];

const MOCK_ACTIVE_PARTNERS = [
  { id: "p-101", company_name: "Apex Tech Solutions", full_name: "Vikram Mehta" },
  { id: "p-102", company_name: "Atlas Advisory Group", full_name: "Sarah Jenkins" },
  { id: "p-103", company_name: "NextGen Cloud Systems", full_name: "Rahul Sharma" }
];

interface EditTenantFormProps {
  tenant: Tenant | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  supabaseClient?: any;
}

export default function EditTenantForm({
  tenant,
  isOpen,
  onClose,
  onSuccess,
  supabaseClient,
}: EditTenantFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partners, setPartners] = useState<{ id: string; company_name: string; full_name: string }[]>(MOCK_ACTIVE_PARTNERS);

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    tenant_type: "client" as TenantType,
    pricing_plan: "foundation" as PricingPlan,
    industry_sector: "" as IndustrySector | "",
    sub_industry: "",
    industry: "",
    employee_count: "",
    revenue_range: "" as RevenueRangeOption | "",
    country: "",
    state: "",
    city: "",
    status: "active" as TenantStatus,
    joined_date: "",
    partner_id: "" as string,
    partner_name: "" as string,
  });

  useEffect(() => {
    if (isOpen) {
      const fetchPartners = async () => {
        try {
          const client = supabaseClient || createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );
          const { data } = await client.from("partners").select("id, company_name, full_name").eq("status", "active");
          if (data && data.length > 0) {
            setPartners(data);
          }
        } catch (e) {
          // Keep mock fallback
        }
      };
      fetchPartners();
    }
  }, [isOpen, supabaseClient]);

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name || "",
        website: tenant.website || "",
        tenant_type: tenant.tenant_type || "client",
        pricing_plan: (tenant.pricing_plan as PricingPlan) || "foundation",
        industry_sector: (tenant.industry_sector as IndustrySector) || "",
        sub_industry: tenant.sub_industry || "",
        industry: tenant.industry || "",
        employee_count: tenant.employee_count !== null ? String(tenant.employee_count) : "",
        revenue_range: (tenant.revenue_range as RevenueRangeOption) || "",
        country: tenant.country || "",
        state: tenant.state || "",
        city: tenant.city || "",
        status: tenant.status || "active",
        joined_date: tenant.joined_date || "",
        partner_id: tenant.partner_id || "",
        partner_name: tenant.partner_name || "",
      });
    }
  }, [tenant]);

  if (!isOpen || !tenant) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Organization/Tenant Name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateTenant(
        tenant.id,
        {
          name: formData.name.trim(),
          website: formData.website.trim() || null,
          tenant_type: formData.tenant_type,
          pricing_plan: formData.pricing_plan,
          industry_sector: (formData.industry_sector as IndustrySector) || null,
          sub_industry: formData.sub_industry.trim() || null,
          industry: formData.industry.trim() || formData.industry_sector || null,
          employee_count: formData.employee_count ? parseInt(formData.employee_count, 10) : null,
          revenue_range: formData.revenue_range || null,
          country: formData.country.trim() || null,
          state: formData.state.trim() || null,
          city: formData.city.trim() || null,
          status: formData.status,
          joined_date: formData.joined_date || null,
          partner_id: formData.partner_id || null,
          partner_name: formData.partner_name || null,
        },
        supabaseClient
      );

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error updating tenant:", err);
      setError(err.message || "Failed to update tenant organization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto font-sans">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border my-8">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1E3C]">Update Tenant Profile</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit organizational profile, classification, location, and parameters.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-Only Computed Company Size Info Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">
                Computed Company Size (Read-Only)
              </span>
              <span className="text-slate-500">
                Derived automatically based on Employee Count
              </span>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 font-extrabold text-xs rounded-lg uppercase tracking-wide">
              {tenant.company_size || "Unspecified"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Organization Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Enterprise Solutions"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Website URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>

            {/* OPTIONAL PARTNER MAPPING */}
            <div className="md:col-span-2 p-3 rounded-xl bg-golden-50/70 border border-golden-300">
              <label className="block text-xs font-bold text-golden-900 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>🤝 Referred by Partner <span className="text-golden-700 font-medium text-[10px]">(Optional)</span></span>
                <span className="text-[10px] font-bold text-golden-800 uppercase">30% Commission Attribution</span>
              </label>
              <select
                value={formData.partner_id}
                onChange={(e) => {
                  const selected = partners.find((p) => p.id === e.target.value);
                  setFormData({
                    ...formData,
                    partner_id: e.target.value,
                    partner_name: selected ? selected.company_name : "",
                  });
                }}
                className="w-full text-sm border border-golden-400 rounded-xl p-2.5 bg-white font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-golden-500"
              >
                <option value="">None — Direct Nisol Client (No Partner)</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.company_name} ({p.full_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Tenant Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tenant Type
              </label>
              <select
                value={formData.tenant_type}
                onChange={(e) => setFormData({ ...formData, tenant_type: e.target.value as TenantType })}
                className="w-full text-sm border rounded-xl p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              >
                {TENANT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subscribed Plan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Subscribed Plan *</span>
                <span className="text-[10px] font-bold text-blue-600 lowercase font-mono">determines reports</span>
              </label>
              <select
                value={formData.pricing_plan}
                onChange={(e) => setFormData({ ...formData, pricing_plan: e.target.value as PricingPlan })}
                className="w-full text-sm border rounded-xl p-2.5 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              >
                {PRICING_PLAN_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} — {opt.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TenantStatus })}
                className="w-full text-sm border rounded-xl p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Sector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Industry Sector
              </label>
              <select
                value={formData.industry_sector}
                onChange={(e) => setFormData({ ...formData, industry_sector: e.target.value as IndustrySector })}
                className="w-full text-sm border rounded-xl p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              >
                <option value="">Select industry sector...</option>
                {INDUSTRY_SECTORS.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Industry */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Sub-Industry
              </label>
              <input
                type="text"
                placeholder="e.g. Automotive, Aerospace"
                value={formData.sub_industry}
                onChange={(e) => setFormData({ ...formData, sub_industry: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>

            {/* Employee Count */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Employee Count
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 250"
                value={formData.employee_count}
                onChange={(e) => setFormData({ ...formData, employee_count: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>

            {/* Revenue Range */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Revenue Range
              </label>
              <select
                value={formData.revenue_range}
                onChange={(e) => setFormData({ ...formData, revenue_range: e.target.value as RevenueRangeOption })}
                className="w-full text-sm border rounded-xl p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              >
                <option value="">Select annual revenue range...</option>
                {REVENUE_RANGES.map((rev) => (
                  <option key={rev} value={rev}>
                    {rev}
                  </option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Country
              </label>
              <input
                type="text"
                placeholder="e.g. India, United States"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                State / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Karnataka, California"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="e.g. Bengaluru, San Francisco"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>

            {/* Joined Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Joined Date
              </label>
              <input
                type="date"
                value={formData.joined_date}
                onChange={(e) => setFormData({ ...formData, joined_date: e.target.value })}
                className="w-full text-sm border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#0A1E3C] text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-md"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
