"use client"
import { createBrowserClient } from "@supabase/ssr";
import { PropsWithChildren, useState } from "react";

export const SupabaseProvider = ({ children }: PropsWithChildren<{}>) => {
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ));
  // No SessionContextProvider needed; expose client via context if needed later
  return <>{children}</>;
};