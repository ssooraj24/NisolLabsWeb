"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useUseCases(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [useCases, setUseCases] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchUseCases() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("top_use_cases")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setUseCases(data?.top_use_cases || null);
      } catch (err: any) {
        console.error("Error loading use cases:", err);
        setError(err.message || "Failed to load use cases");
      } finally {
        setLoading(false);
      }
    }

    fetchUseCases();
  }, [reportId, supabase]);

  const saveUseCases = async (newUseCases: any) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        top_use_cases: newUseCases,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setUseCases(newUseCases);
  };

  return { useCases, loading, error, saveUseCases };
}
