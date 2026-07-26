"use client"
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      const redirect = new URLSearchParams(window.location.search).get("redirect_to") || "/dashboard";
      router.push(redirect);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0A1E3C] text-[#EBB44B] font-black text-xl mb-4 shadow-md">
            N
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A1E3C] tracking-tight">
            Nisol Discovery
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Enterprise AI Maturity & Assessment Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-xl font-bold mb-6 text-slate-800 text-center">Sign In to Your Account</h2>
          
          <div className="mb-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] focus:border-transparent transition-all" 
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] focus:border-transparent transition-all" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#0A1E3C] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#162B4D] active:scale-[0.99] transition-all shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
