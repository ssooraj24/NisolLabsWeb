"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useRoadmap(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchRoadmap() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("roadmap")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setRoadmap(data?.roadmap || null);
      } catch (err: any) {
        console.error("Error loading roadmap:", err);
        setError(err.message || "Failed to load roadmap");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, [reportId, supabase]);

  const saveRoadmap = async (newRoadmap: any) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        roadmap: newRoadmap,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setRoadmap(newRoadmap);
  };

  return { roadmap, loading, error, saveRoadmap };
}
