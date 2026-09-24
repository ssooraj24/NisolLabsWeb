import { db, createDatabaseClient } from "@/lib/db/client";

// Seamless migration adapter from Supabase to native PostgreSQL + Better Auth
export const createBrowserClient = (_url?: string, _anonKey?: string) => {
  return createDatabaseClient();
};

export const supabase = db;
