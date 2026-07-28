"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useROI(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [roi, setROI] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchROI() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("roi_estimates")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setROI(data?.roi_estimates || null);
      } catch (err: any) {
        console.error("Error loading ROI estimates:", err);
        setError(err.message || "Failed to load ROI estimates");
      } finally {
        setLoading(false);
      }
    }

    fetchROI();
  }, [reportId, supabase]);

  const saveROI = async (newROI: any) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        roi_estimates: newROI,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setROI(newROI);
  };

  return { roi, loading, error, saveROI };
}
