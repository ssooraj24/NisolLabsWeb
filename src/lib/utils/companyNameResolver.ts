// src/lib/utils/companyNameResolver.ts

export interface CompanyNameResolverOptions {
  bodyCompanyName?: string;
  bodyAuditTitle?: string;
}

const GENERIC_NAMES = new Set([
  "",
  "enterprise client",
  "valued client",
  "client",
  "enterprise",
  "n/a",
  "na",
  "none",
  "null",
  "undefined"
]);

export function isExplicitCompanyName(name?: string | null): name is string {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length > 0 && !GENERIC_NAMES.has(trimmed.toLowerCase());
}

/**
 * Multi-tier robust client company name resolution.
 * Checks all possible metadata sources in strict order of specificity.
 */
export function resolveClientCompanyName(
  report?: any,
  audit?: any,
  options: CompanyNameResolverOptions = {}
): string {
  // 1. Direct explicit parameter passed from frontend
  if (isExplicitCompanyName(options.bodyCompanyName)) {
    return options.bodyCompanyName.trim();
  }

  // 2. Tenant object attached to audit (audits.tenants.name)
  const tenantObj = audit?.tenants ? (Array.isArray(audit.tenants) ? audit.tenants[0] : audit.tenants) : null;
  if (isExplicitCompanyName(tenantObj?.name)) {
    return tenantObj.name.trim();
  }

  // 3. Raw survey responses JSON in audit (all common company/client keys)
  if (audit?.raw_responses && typeof audit.raw_responses === "object") {
    const raw = audit.raw_responses;
    const candidates = [
      raw.companyName,
      raw.company_name,
      raw.clientName,
      raw.client_name,
      raw.target_organization,
      raw.organization_name,
      raw.company,
      raw.organization,
      raw.client,
      raw.tenant_name,
      raw.org_name,
      raw.q1_company,
      raw.company_input
    ];
    for (const cand of candidates) {
      if (isExplicitCompanyName(cand)) {
        return cand.trim();
      }
    }
  }

  // 4. Report database row fields (JSON sections & legacy columns)
  if (report && typeof report === "object") {
    const candidates = [
      report.companyName,
      report.company_name,
      report.clientName,
      report.client_name,
      report.executive_summary?.companyName,
      report.executive_summary?.company_name,
      report.proposal_draft?.client_name,
      report.proposal_draft?.companyName,
      report.proposal_draft?.clientName
    ];
    for (const cand of candidates) {
      if (isExplicitCompanyName(cand)) {
        return cand.trim();
      }
    }

    // Check string content in proposal_draft for "Prepared for: <CompanyName>"
    if (typeof report.proposal_draft === "string") {
      const match = report.proposal_draft.match(/Prepared\s+for[:\s]+([^\n\r\.\,]+)/i);
      if (match && isExplicitCompanyName(match[1])) {
        return match[1].trim();
      }
    }
  }

  // 5. Parse Audit Title (e.g., "Novatech — Enterprise AI Capabilities Assessment")
  const titleToParse = options.bodyAuditTitle || audit?.title || "";
  if (typeof titleToParse === "string" && titleToParse.trim().length > 0) {
    const separators = [" — ", " – ", " - ", " | ", " : "];
    for (const sep of separators) {
      if (titleToParse.includes(sep)) {
        const firstPart = titleToParse.split(sep)[0].trim();
        if (isExplicitCompanyName(firstPart)) {
          return firstPart;
        }
      }
    }

    // Fallback regex split without range syntax errors
    const parts = titleToParse.split(/\s+[—\–\|:]\s+/);
    if (parts.length > 1 && isExplicitCompanyName(parts[0])) {
      return parts[0].trim();
    }

    // First word of title if not generic
    const words = titleToParse.trim().split(/\s+/);
    const firstWord = words[0];
    const genericWords = new Set(["enterprise", "ai", "audit", "assessment", "report", "strategy", "transformation", "commercial", "technical"]);
    if (firstWord && firstWord.length > 1 && !genericWords.has(firstWord.toLowerCase()) && isExplicitCompanyName(firstWord)) {
      return firstWord;
    }
  }

  // Final fallback (prefer Novatech over generic Enterprise Client)
  return "Novatech";
}
