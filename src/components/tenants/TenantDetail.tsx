"use client";

import { Tenant } from "@/types/database";

interface TenantDetailProps {
  tenant: Tenant | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (tenant: Tenant) => void;
}

export default function TenantDetail({
  tenant,
  isOpen,
  onClose,
  onEdit,
}: TenantDetailProps) {
  if (!isOpen || !tenant) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border my-8">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#0A1E3C]">{tenant.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-slate-100 text-slate-700">
                {tenant.status || "active"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Tenant ID: {tenant.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border">
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Classification
              </span>
              <p className="text-sm font-semibold text-slate-800">
                Type: <span className="capitalize">{tenant.tenant_type || "client"}</span>
              </p>
              <p className="text-slate-600 mt-1">
                Sector: <strong>{tenant.industry_sector || tenant.industry || "N/A"}</strong>
              </p>
              {tenant.sub_industry && (
                <p className="text-slate-600 mt-0.5">
                  Sub-Industry: <strong>{tenant.sub_industry}</strong>
                </p>
              )}
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border">
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Size & Benchmarks
              </span>
              <p className="text-sm font-semibold text-blue-700">
                Company Size: {tenant.company_size || "Derived automatically"}
              </p>
              <p className="text-slate-600 mt-1">
                Employee Count: <strong>{tenant.employee_count ? tenant.employee_count.toLocaleString() : "N/A"}</strong>
              </p>
              <p className="text-slate-600 mt-0.5">
                Revenue Bracket: <strong>{tenant.revenue_range || "N/A"}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border">
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Location & Web
              </span>
              <p className="text-slate-600">
                City: <strong>{tenant.city || "N/A"}</strong>
              </p>
              <p className="text-slate-600 mt-0.5">
                State: <strong>{tenant.state || "N/A"}</strong>
              </p>
              <p className="text-slate-600 mt-0.5">
                Country: <strong>{tenant.country || "N/A"}</strong>
              </p>
              {tenant.website && (
                <a
                  href={tenant.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline block mt-1 font-semibold"
                >
                  🌐 {tenant.website}
                </a>
              )}
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border">
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Lifecycle & Joined
              </span>
              <p className="text-slate-600">
                Joined Date: <strong>{tenant.joined_date ? new Date(tenant.joined_date).toLocaleDateString() : "N/A"}</strong>
              </p>
              <p className="text-slate-600 mt-0.5">
                Current Status: <strong className="capitalize">{tenant.status}</strong>
              </p>
            </div>
          </div>

          {/* Audit Trail Section */}
          <div className="border-t pt-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Audit Trail & Metadata
            </h4>
            <div className="bg-slate-100 p-3 rounded-xl text-[11px] text-slate-600 space-y-1">
              <p>
                <span className="font-semibold text-slate-500">Created By User ID:</span>{" "}
                {tenant.created_by || "System/Initial"}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Created At:</span>{" "}
                {tenant.created_at ? new Date(tenant.created_at).toLocaleString() : "N/A"}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Last Updated By User ID:</span>{" "}
                {tenant.updated_by || "System/Initial"}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Last Updated At:</span>{" "}
                {tenant.updated_at ? new Date(tenant.updated_at).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(tenant);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#0A1E3C] text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
          >
            Edit Tenant
          </button>
        </div>
      </div>
    </div>
  );
}
