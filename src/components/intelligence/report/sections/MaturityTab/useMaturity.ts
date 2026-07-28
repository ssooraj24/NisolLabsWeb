"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useMaturity(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [readiness, setReadiness] = useState<any>(null);
  const [capabilityScores, setCapabilityScores] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchMaturity() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("ai_readiness_assessment, capability_scores")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setReadiness(data?.ai_readiness_assessment || null);
        setCapabilityScores(data?.capability_scores || null);
      } catch (err: any) {
        console.error("Error loading maturity data:", err);
        setError(err.message || "Failed to load maturity assessment");
      } finally {
        setLoading(false);
      }
    }

    fetchMaturity();
  }, [reportId, supabase]);

  const saveMaturity = async (newReadiness: any, newCapScores: any) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        ai_readiness_assessment: newReadiness,
        capability_scores: newCapScores,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setReadiness(newReadiness);
    setCapabilityScores(newCapScores);
  };

  return { readiness, capabilityScores, loading, error, saveMaturity };
}
