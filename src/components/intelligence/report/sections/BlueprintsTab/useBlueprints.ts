"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useBlueprints(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [blueprints, setBlueprints] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchBlueprints() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("solution_blueprints")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setBlueprints(data?.solution_blueprints || null);
      } catch (err: any) {
        console.error("Error loading solution blueprints:", err);
        setError(err.message || "Failed to load blueprints");
      } finally {
        setLoading(false);
      }
    }

    fetchBlueprints();
  }, [reportId, supabase]);

  const saveBlueprints = async (newBlueprints: any) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        solution_blueprints: newBlueprints,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setBlueprints(newBlueprints);
  };

  return { blueprints, loading, error, saveBlueprints };
}
