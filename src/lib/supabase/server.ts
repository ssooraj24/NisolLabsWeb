import { getPool, query } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Server-side compatibility client for PostgreSQL + Better Auth
 */
export async function createClient() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList }).catch(() => null);

  return {
    auth: {
      getUser: async () => {
        if (session?.user) {
          return {
            data: {
              user: {
                id: session.user.id,
                email: session.user.email,
                user_metadata: {
                  full_name: session.user.name,
                  role: (session.user as any).role || "client",
                },
              },
            },
            error: null,
          };
        }
        return { data: { user: null }, error: null };
      },
    },
    // Expose direct SQL execution on PostgreSQL
    query,
    pool: getPool(),
  };
}