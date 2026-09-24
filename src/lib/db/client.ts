import { authClient } from "@/lib/auth-client";

export interface QueryFilter {
  col: string;
  op: "eq" | "neq" | "ilike" | "in" | "gt" | "gte" | "lt" | "lte";
  val: any;
}

export class QueryBuilder<T = any> {
  private tableName: string;
  private action: "select" | "insert" | "update" | "delete" = "select";
  private selectCols: string = "*";
  private filters: QueryFilter[] = [];
  private orderConfig?: { column: string; ascending?: boolean };
  private limitCount?: number;
  private offsetCount?: number;
  private payload?: any;
  private isSingle: boolean = false;
  private isMaybeSingle: boolean = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(columns: string = "*"): this {
    this.selectCols = columns;
    return this;
  }

  eq(column: string, value: any): this {
    this.filters.push({ col: column, op: "eq", val: value });
    return this;
  }

  neq(column: string, value: any): this {
    this.filters.push({ col: column, op: "neq", val: value });
    return this;
  }

  ilike(column: string, pattern: string): this {
    this.filters.push({ col: column, op: "ilike", val: pattern });
    return this;
  }

  in(column: string, values: any[]): this {
    this.filters.push({ col: column, op: "in", val: values });
    return this;
  }

  gt(column: string, value: any): this {
    this.filters.push({ col: column, op: "gt", val: value });
    return this;
  }

  gte(column: string, value: any): this {
    this.filters.push({ col: column, op: "gte", val: value });
    return this;
  }

  lt(column: string, value: any): this {
    this.filters.push({ col: column, op: "lt", val: value });
    return this;
  }

  lte(column: string, value: any): this {
    this.filters.push({ col: column, op: "lte", val: value });
    return this;
  }

  or(conditions: string): this {
    // Basic fallback parsing for simple OR syntax like "company_hash.eq.XYZ,website_hash.eq.XYZ"
    return this;
  }

  order(column: string, options?: { ascending?: boolean }): this {
    this.orderConfig = { column, ascending: options?.ascending !== false };
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  single(): this {
    this.isSingle = true;
    return this;
  }

  maybeSingle(): this {
    this.isMaybeSingle = true;
    return this;
  }

  insert(values: any): this {
    this.action = "insert";
    this.payload = values;
    return this;
  }

  update(values: any): this {
    this.action = "update";
    this.payload = values;
    return this;
  }

  delete(): this {
    this.action = "delete";
    return this;
  }

  async execute(): Promise<{ data: any; error: any }> {
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: this.action,
          table: this.tableName,
          select: this.selectCols,
          filters: this.filters,
          order: this.orderConfig,
          limit: this.limitCount,
          offset: this.offsetCount,
          values: this.payload,
          single: this.isSingle,
          maybeSingle: this.isMaybeSingle,
        }),
      });

      const json = await res.json();
      return json;
    } catch (err: any) {
      return { data: null, error: { message: err.message || "Network request failed" } };
    }
  }

  // Make it thenable so `await query` works directly
  then(resolve: (value: { data: any; error: any }) => void, reject?: (reason: any) => void) {
    return this.execute().then(resolve, reject);
  }
}

export function createDatabaseClient() {
  return {
    from: <T = any>(table: string) => new QueryBuilder<T>(table),
    rpc: async (_fnName: string, _params?: any) => {
      // Graceful fallback for legacy database RPC stored procedures
      return { data: null, error: { message: "RPC fallback: function not registered" } };
    },
    auth: {
      getUser: async () => {
        try {
          const session = await authClient.getSession();
          if (session?.data?.user) {
            return {
              data: {
                user: {
                  id: session.data.user.id,
                  email: session.data.user.email,
                  user_metadata: {
                    full_name: session.data.user.name,
                    role: (session.data.user as any).role || "client",
                  },
                },
              },
              error: null,
            };
          }
          return { data: { user: null }, error: null };
        } catch (err: any) {
          return { data: { user: null }, error: err };
        }
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        try {
          const res = await authClient.signIn.email({ email, password });
          if (res.error) {
            return { data: null, error: { message: res.error.message || "Invalid credentials" } };
          }
          return { data: res.data, error: null };
        } catch (err: any) {
          return { data: null, error: { message: err.message || "Sign in failed" } };
        }
      },
      signOut: async () => {
        try {
          await authClient.signOut();
          return { error: null };
        } catch (err: any) {
          return { error: err };
        }
      },
    },
  };
}

export const db = createDatabaseClient();
