"use client"

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

type User = {
  email: string | null;
  created_at: string | null;
  // Add any other fields you may need
};

export default function ProfilePage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        setUser(null);
      } else {
        setUser(data.user as unknown as User);
        setError(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Redirect to login after sign‑out
    window.location.href = "/login";
  };

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "#0A1E3C" }}>Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded shadow-lg glassmorphism">
          <p className="mb-2"><strong>Email:</strong> {user.email ?? "N/A"}</p>
          <p className="mb-2"><strong>Joined:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</p>
          <button
            onClick={handleSignOut}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
      <Link href="/dashboard" className="inline-block mt-4 text-sm text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>
    </section>
  );
}
