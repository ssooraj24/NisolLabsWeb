"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useSummary(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchSummary() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("executive_summary")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setSummary(data?.executive_summary || "");
      } catch (err: any) {
        console.error("Error loading executive summary:", err);
        setError(err.message || "Failed to load summary");
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [reportId, supabase]);

  const saveSummary = async (newContent: string) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        executive_summary: newContent,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setSummary(newContent);
  };

  return { summary, loading, error, saveSummary };
}
