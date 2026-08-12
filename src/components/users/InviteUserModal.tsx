"use client";

import { useState } from "react";
import { Tenant } from "@/types/database";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tenants: Tenant[];
}

export default function InviteUserModal({
  isOpen,
  onClose,
  onSuccess,
  tenants,
}: InviteUserModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"client" | "consultant" | "admin">("client");
  const [tenantId, setTenantId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          role: role,
          tenant_id: tenantId || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to invite user");
      }

      setSuccessMsg(data.message || "User invitation created successfully.");
      setTimeout(() => {
        setFullName("");
        setEmail("");
        setRole("client");
        setTenantId("");
        setSuccessMsg(null);
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Invite user error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0A1E3C] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
              User Provisioning
            </span>
            <h2 className="text-xl font-bold mt-0.5">Invite Team Member or Client</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              {successMsg}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] transition-all"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="s.jenkins@clientcompany.com"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] transition-all"
            />
          </div>

          {/* User Role */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Platform Role <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  role === "client"
                    ? "bg-[#0A1E3C] text-white border-[#0A1E3C] shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Client User
              </button>
              <button
                type="button"
                onClick={() => setRole("consultant")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  role === "consultant"
                    ? "bg-[#0A1E3C] text-white border-[#0A1E3C] shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Nisol Consultant
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  role === "admin"
                    ? "bg-[#0A1E3C] text-white border-[#0A1E3C] shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Nisol Admin
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {role === "client" && "Client users can view reports and dashboards assigned to their specific organization."}
              {role === "consultant" && "Consultants can create, conduct, and audit assigned client maturity assessments."}
              {role === "admin" && "Admins have full operational access across all clients, blueprints, and system templates."}
            </p>
          </div>

          {/* Tenant / Organization */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Assigned Client Organization / Tenant {role === "client" && <span className="text-red-500">*</span>}
            </label>
            <select
              value={tenantId}
              required={role === "client"}
              onChange={(e) => setTenantId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] bg-white transition-all"
            >
              <option value="">-- Select Client Organization --</option>
              {tenants.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.tenant_type || "Client"})
                </option>
              ))}
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#0A1E3C] text-white text-xs font-bold rounded-xl hover:bg-[#162B4D] disabled:opacity-50 transition-all shadow-md flex items-center gap-2"
            >
              {loading && (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Sending Invitation..." : "Send User Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
