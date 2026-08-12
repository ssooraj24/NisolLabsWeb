"use client";

import { useEffect, useState, useCallback } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { UserProfile, getUsers, updateUserProfile } from "@/lib/supabase/queries/users";
import { Tenant } from "@/types/database";
import { getTenants } from "@/lib/supabase/queries/tenants";
import InviteUserModal from "@/components/users/InviteUserModal";

export default function UsersPage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState("all");

  // Invite Modal
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  // Edit Role State
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editRole, setEditRole] = useState<string>("client");
  const [editTenantId, setEditTenantId] = useState<string>("");
  const [savingEdit, setSavingEdit] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersData, tenantsData] = await Promise.all([
        getUsers({ role: selectedRole, tenant_id: selectedTenant, search }, supabase),
        getTenants(undefined, supabase),
      ]);
      setUsers(usersData);
      setTenants(tenantsData);
    } catch (err: any) {
      console.error("Error loading users page:", err);
      setError(`Failed to load users: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }, [selectedRole, selectedTenant, search, supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenEdit = (user: UserProfile) => {
    setEditingUser(user);
    setEditRole(user.role || "client");
    setEditTenantId(user.tenant_id || "");
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSavingEdit(true);
    try {
      await updateUserProfile(
        editingUser.id,
        { role: editRole, tenant_id: editTenantId || null },
        supabase
      );
      setEditingUser(null);
      await loadData();
    } catch (err: any) {
      alert(`Failed to update user: ${err.message}`);
    } finally {
      setSavingEdit(false);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "consultant":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "admin":
        return "Nisol Admin";
      case "consultant":
        return "Nisol Consultant";
      default:
        return "Client User";
    }
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0A1E3C] text-white rounded-2xl p-6 mb-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
            Identity & Access Management
          </span>
          <h1 className="text-3xl font-bold mt-1">User & Team Management</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Invite and manage Nisol team consultants, client organization users, and platform permissions.
          </p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="bg-white text-[#0A1E3C] hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 text-[#0A1E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          + Invite New User
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadData} className="underline font-semibold">
            Retry
          </button>
        </div>
      )}

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-6 flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search users by name, role, or client organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] transition-all"
          />
        </div>

        {/* Role Filter */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full md:w-48 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] bg-white transition-all"
        >
          <option value="all">All Roles</option>
          <option value="client">Client Users</option>
          <option value="consultant">Nisol Consultants</option>
          <option value="admin">Nisol Admins</option>
          <option value="super_admin">Super Admins</option>
        </select>

        {/* Organization Filter */}
        <select
          value={selectedTenant}
          onChange={(e) => setSelectedTenant(e.target.value)}
          className="w-full md:w-60 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] bg-white transition-all"
        >
          <option value="all">All Client Organizations</option>
          {tenants.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* User Directory Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <div className="w-8 h-8 border-3 border-[#0A1E3C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading user directory...
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="font-semibold text-slate-700">No users found</p>
            <p className="text-xs mt-1 text-slate-400">
              Try adjusting your search criteria or invite a new user.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6">User / Name</th>
                  <th className="py-3.5 px-6">Role</th>
                  <th className="py-3.5 px-6">Client Organization</th>
                  <th className="py-3.5 px-6">Joined Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {users.map((u) => {
                  const initials = (u.full_name || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0A1E3C] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">
                              {u.full_name || "Unnamed User"}
                            </p>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">
                              ID: {u.id.substring(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeClass(
                            u.role
                          )}`}
                        >
                          {getRoleLabel(u.role)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {u.tenants ? (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">{u.tenants.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-semibold uppercase">
                              {u.tenants.tenant_type || "Client"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">Unassigned</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#0A1E3C] hover:bg-slate-100 rounded-lg transition-all border border-slate-200"
                        >
                          Edit Role
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <InviteUserModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSuccess={loadData}
        tenants={tenants}
      />

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-[#0A1E3C] px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">Edit User Access</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">User</p>
                <p className="font-bold text-slate-800 text-base">{editingUser.full_name}</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Platform Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                >
                  <option value="client">Client User</option>
                  <option value="consultant">Nisol Consultant</option>
                  <option value="admin">Nisol Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Assigned Organization / Tenant
                </label>
                <select
                  value={editTenantId}
                  onChange={(e) => setEditTenantId(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
                >
                  <option value="">-- Unassigned / None --</option>
                  {tenants.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={savingEdit}
                  className="px-5 py-2 bg-[#0A1E3C] text-white text-xs font-bold rounded-xl hover:bg-[#162B4D] disabled:opacity-50"
                >
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
