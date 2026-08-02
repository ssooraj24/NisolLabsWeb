import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateReportHTML } from "@/lib/utils/pdfGenerator";
import { resolveClientCompanyName } from "@/lib/utils/companyNameResolver";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, sections, templateId, watermarkText, includeTOC, currency, companyName: bodyCompanyName, auditTitle: bodyAuditTitle } = body;

    if (!reportId) {
      return NextResponse.json(
        { success: false, error: "reportId parameter is required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1. Try fetching report by reportId (id)
    let { data: report } = await supabase
      .from("audit_reports")
      .select("*")
      .eq("id", reportId)
      .maybeSingle();

    // 2. If not found by report id, try fetching by audit_id
    if (!report) {
      const { data: reportByAudit } = await supabase
        .from("audit_reports")
        .select("*")
        .eq("audit_id", reportId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      report = reportByAudit;
    }

    // 3. Fetch audit metadata using report.audit_id or reportId
    const targetAuditId = report?.audit_id || reportId;
    const { data: audit } = await supabase
      .from("audits")
      .select("id, title, status, raw_responses, tenant_id, tenants:tenant_id (name, industry)")
      .eq("id", targetAuditId)
      .maybeSingle();

    // Direct tenant query fallback if join didn't populate tenants
    if (audit && audit.tenant_id && !audit.tenants) {
      const { data: tenantData } = await supabase
        .from("tenants")
        .select("name, industry")
        .eq("id", audit.tenant_id)
        .maybeSingle();

      if (tenantData) {
        (audit as any).tenants = tenantData;
      }
    }

    // 4. Resolve client company name using multi-tier resolver
    const resolvedCompany = resolveClientCompanyName(report, audit, {
      bodyCompanyName,
      bodyAuditTitle,
    });

    if (!report) {
      const tenantObj = audit?.tenants ? (Array.isArray(audit.tenants) ? audit.tenants[0] : (audit.tenants as any)) : null;
      report = {
        id: reportId,
        audit_id: targetAuditId,
        companyName: resolvedCompany,
        industry: tenantObj?.industry || audit?.raw_responses?.industry || "Technology & Operations",
      };
    } else {
      report.companyName = resolvedCompany;
    }

    // Fetch template styling if templateId supplied
    let stylingOptions = {
      primaryColor: "#0A1E3C",
      secondaryColor: "#EBB44B",
      fontFamily: "Inter",
    };

    if (templateId) {
      const { data: tmpl } = await supabase
        .from("report_templates")
        .select("styling")
        .eq("id", templateId)
        .maybeSingle();

      if (tmpl?.styling) {
        stylingOptions = {
          primaryColor: tmpl.styling.primary_color || "#0A1E3C",
          secondaryColor: tmpl.styling.secondary_color || "#EBB44B",
          fontFamily: tmpl.styling.font_family || "Inter",
        };
      }
    }

    const htmlContent = generateReportHTML(report, audit, {
      sections,
      ...stylingOptions,
      includeTOC: includeTOC !== false,
      watermarkText: watermarkText || "CONFIDENTIAL",
      currency: currency || "INR",
    });

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (err: any) {
    console.error("[API /export-pdf] PDF Export Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate PDF export" },
      { status: 500 }
    );
  }
}

