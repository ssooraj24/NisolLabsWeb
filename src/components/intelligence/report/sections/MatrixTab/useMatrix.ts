"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useMatrix(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [matrix, setMatrix] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchMatrix() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("opportunity_matrix")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setMatrix(data?.opportunity_matrix || null);
      } catch (err: any) {
        console.error("Error loading opportunity matrix:", err);
        setError(err.message || "Failed to load matrix");
      } finally {
        setLoading(false);
      }
    }

    fetchMatrix();
  }, [reportId, supabase]);

  const saveMatrix = async (newMatrix: any) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        opportunity_matrix: newMatrix,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setMatrix(newMatrix);
  };

  return { matrix, loading, error, saveMatrix };
}
