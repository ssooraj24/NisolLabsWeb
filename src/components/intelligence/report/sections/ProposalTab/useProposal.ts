"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useProposal(reportId: string) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [proposal, setProposal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    async function fetchProposal() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("audit_reports")
          .select("proposal_draft")
          .eq("id", reportId)
          .single();

        if (err) throw err;
        setProposal(data?.proposal_draft || "");
      } catch (err: any) {
        console.error("Error loading proposal draft:", err);
        setError(err.message || "Failed to load proposal");
      } finally {
        setLoading(false);
      }
    }

    fetchProposal();
  }, [reportId, supabase]);

  const saveProposal = async (newProposal: string) => {
    const { error: err } = await supabase
      .from("audit_reports")
      .update({
        proposal_draft: newProposal,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (err) throw err;
    setProposal(newProposal);
  };

  return { proposal, loading, error, saveProposal };
}
