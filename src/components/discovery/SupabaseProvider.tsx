"use client";

import { PropsWithChildren } from "react";

export const SupabaseProvider = ({ children }: PropsWithChildren<{}>) => {
  return <>{children}</>;
};