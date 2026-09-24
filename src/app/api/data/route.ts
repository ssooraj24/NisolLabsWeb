import { NextRequest, NextResponse } from "next/server";
import { query, getPool } from "@/lib/db";
import { auth } from "@/lib/auth";

// Whitelist allowed tables to prevent arbitrary table access
const ALLOWED_TABLES = new Set([
  "audits",
  "audit_reports",
  "audit_maturity_scores",
  "questions",
  "tenants",
  "profiles",
  "user",
  "session",
  "grant_applications",
  "partners",
  "partner_deals",
  "partner_commissions",
  "report_templates",
  "report_history",
  "report_exports",
  "revenue_range_defaults",
  "audit_logs",
]);

// Sanitize column names
function sanitizeIdentifier(name: string): string {
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error(`Invalid identifier: ${name}`);
  }
  return `"${name}"`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, table, select = "*", filters = [], order, limit, offset, values, single, maybeSingle } = body;

    if (!table || !ALLOWED_TABLES.has(table)) {
      return NextResponse.json(
        { data: null, error: { message: `Unauthorized or invalid table: ${table}` } },
        { status: 400 }
      );
    }

    const tableName = table.includes("user") || table.includes("session") ? `"${table}"` : `public."${table}"`;

    if (action === "select") {
      let selectClause = "*";
      if (select && select !== "*") {
        if (select.includes(":") || select.includes("(") || select.includes(")")) {
          selectClause = "*";
        } else {
          try {
            selectClause = select
              .split(",")
              .map((c: string) => c.trim())
              .filter(Boolean)
              .map((c: string) => sanitizeIdentifier(c))
              .join(", ");
          } catch {
            selectClause = "*";
          }
        }
      }
      let sql = `SELECT ${selectClause} FROM ${tableName}`;
      const params: any[] = [];
      const whereClauses: string[] = [];

      if (Array.isArray(filters)) {
        for (const f of filters) {
          const { col, op, val } = f;
          const paramIdx = params.length + 1;
          const safeCol = sanitizeIdentifier(col);

          if (op === "eq") {
            if (val === null) {
              whereClauses.push(`${safeCol} IS NULL`);
            } else {
              whereClauses.push(`${safeCol} = $${paramIdx}`);
              params.push(val);
            }
          } else if (op === "neq") {
            if (val === null) {
              whereClauses.push(`${safeCol} IS NOT NULL`);
            } else {
              whereClauses.push(`${safeCol} != $${paramIdx}`);
              params.push(val);
            }
          } else if (op === "ilike") {
            whereClauses.push(`${safeCol} ILIKE $${paramIdx}`);
            params.push(val);
          } else if (op === "in" && Array.isArray(val)) {
            whereClauses.push(`${safeCol} = ANY($${paramIdx})`);
            params.push(val);
          } else if (op === "gt") {
            whereClauses.push(`${safeCol} > $${paramIdx}`);
            params.push(val);
          } else if (op === "gte") {
            whereClauses.push(`${safeCol} >= $${paramIdx}`);
            params.push(val);
          } else if (op === "lt") {
            whereClauses.push(`${safeCol} < $${paramIdx}`);
            params.push(val);
          } else if (op === "lte") {
            whereClauses.push(`${safeCol} <= $${paramIdx}`);
            params.push(val);
          }
        }
      }

      if (whereClauses.length > 0) {
        sql += ` WHERE ${whereClauses.join(" AND ")}`;
      }

      if (order && order.column) {
        const safeOrderCol = sanitizeIdentifier(order.column);
        sql += ` ORDER BY ${safeOrderCol} ${order.ascending === false ? "DESC" : "ASC"}`;
      }

      if (limit) {
        sql += ` LIMIT ${parseInt(limit, 10)}`;
      }
      if (offset) {
        sql += ` OFFSET ${parseInt(offset, 10)}`;
      }

      const res = await query(sql, params);
      const rows = res.rows;

      if (single) {
        if (rows.length === 0) {
          return NextResponse.json({ data: null, error: { message: "No rows found", code: "PGRST116" } });
        }
        return NextResponse.json({ data: rows[0], error: null });
      }

      if (maybeSingle) {
        return NextResponse.json({ data: rows[0] || null, error: null });
      }

      return NextResponse.json({ data: rows, error: null });
    }

    if (action === "insert") {
      const records = Array.isArray(values) ? values : [values];
      if (records.length === 0) {
        return NextResponse.json({ data: [], error: null });
      }

      const cols = Object.keys(records[0]);
      const safeCols = cols.map(sanitizeIdentifier).join(", ");
      const params: any[] = [];
      const rowPlaceholders: string[] = [];

      for (const rec of records) {
        const placeholders: string[] = [];
        for (const col of cols) {
          params.push(rec[col] === undefined ? null : rec[col]);
          placeholders.push(`$${params.length}`);
        }
        rowPlaceholders.push(`(${placeholders.join(", ")})`);
      }

      const sql = `INSERT INTO ${tableName} (${safeCols}) VALUES ${rowPlaceholders.join(", ")} RETURNING *`;
      const res = await query(sql, params);
      const data = Array.isArray(values) ? res.rows : (single || !Array.isArray(values) ? res.rows[0] : res.rows);

      return NextResponse.json({ data, error: null });
    }

    if (action === "update") {
      const cols = Object.keys(values || {});
      if (cols.length === 0) {
        return NextResponse.json({ data: null, error: { message: "No values to update" } }, { status: 400 });
      }

      const params: any[] = [];
      const setClauses: string[] = [];

      for (const col of cols) {
        params.push(values[col]);
        setClauses.push(`${sanitizeIdentifier(col)} = $${params.length}`);
      }

      const whereClauses: string[] = [];
      if (Array.isArray(filters)) {
        for (const f of filters) {
          const { col, op, val } = f;
          const paramIdx = params.length + 1;
          const safeCol = sanitizeIdentifier(col);

          if (op === "eq") {
            whereClauses.push(`${safeCol} = $${paramIdx}`);
            params.push(val);
          } else if (op === "in" && Array.isArray(val)) {
            whereClauses.push(`${safeCol} = ANY($${paramIdx})`);
            params.push(val);
          }
        }
      }

      if (whereClauses.length === 0) {
        return NextResponse.json({ data: null, error: { message: "Update requires WHERE filter" } }, { status: 400 });
      }

      const sql = `UPDATE ${tableName} SET ${setClauses.join(", ")} WHERE ${whereClauses.join(" AND ")} RETURNING *`;
      const res = await query(sql, params);
      const data = single ? res.rows[0] : res.rows;

      return NextResponse.json({ data, error: null });
    }

    if (action === "delete") {
      const params: any[] = [];
      const whereClauses: string[] = [];

      if (Array.isArray(filters)) {
        for (const f of filters) {
          const { col, op, val } = f;
          const paramIdx = params.length + 1;
          const safeCol = sanitizeIdentifier(col);

          if (op === "eq") {
            whereClauses.push(`${safeCol} = $${paramIdx}`);
            params.push(val);
          }
        }
      }

      if (whereClauses.length === 0) {
        return NextResponse.json({ data: null, error: { message: "Delete requires WHERE filter" } }, { status: 400 });
      }

      const sql = `DELETE FROM ${tableName} WHERE ${whereClauses.join(" AND ")} RETURNING *`;
      const res = await query(sql, params);

      return NextResponse.json({ data: res.rows, error: null });
    }

    return NextResponse.json({ data: null, error: { message: `Unsupported action: ${action}` } }, { status: 400 });
  } catch (err: any) {
    console.error("[Data API Error]:", err);
    return NextResponse.json(
      { data: null, error: { message: err.message || "Database query failed" } },
      { status: 500 }
    );
  }
}
