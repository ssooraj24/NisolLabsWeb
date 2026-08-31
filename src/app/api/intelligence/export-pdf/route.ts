import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateReportHTML } from "@/lib/utils/pdfGenerator";
import { generateBoardMemoHTML } from "@/lib/utils/boardMemoGenerator";
import { generateDataStrategyHTML } from "@/lib/utils/dataStrategyGenerator";
import { generatePocEvaluationHTML } from "@/lib/utils/pocEvaluationGenerator";
import { resolveClientCompanyName } from "@/lib/utils/companyNameResolver";
import { decryptPayload } from "@/lib/security/encryption";
import {
  isDeliverableAllowedForPlan,
  normalizePricingPlan,
  PLAN_CONFIG,
  DeliverableType,
} from "@/lib/report/reportPortfolioTypes";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      reportId,
      deliverableType,
      sections,
      templateId,
      watermarkText,
      includeTOC,
      currency,
      companyName: bodyCompanyName,
      auditTitle: bodyAuditTitle,
    } = body;

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

    // Decrypt full report payload if present and merge
    if (report?.report_payload) {
      try {
        const decrypted = decryptPayload(report.report_payload);
        if (decrypted && typeof decrypted === "object") {
          report = { ...decrypted, ...report, report_payload: decrypted };
        }
      } catch (e) {
        console.warn("[API /export-pdf] Could not decrypt report payload:", e);
      }
    }

    // 3. Fetch audit metadata using report.audit_id or reportId
    const targetAuditId = report?.audit_id || reportId;
    const { data: audit } = await supabase
      .from("audits")
      .select("id, title, status, raw_responses, tenant_id, tenants:tenant_id (name, industry, pricing_plan)")
      .eq("id", targetAuditId)
      .maybeSingle();

    // Direct tenant query fallback if join didn't populate tenants
    if (audit && audit.tenant_id && !audit.tenants) {
      const { data: tenantData } = await supabase
        .from("tenants")
        .select("name, industry, pricing_plan")
        .eq("id", audit.tenant_id)
        .maybeSingle();

      if (tenantData) {
        (audit as any).tenants = tenantData;
      }
    }

    // GATING CHECK: Verify requested deliverable against subscribed plan
    const tenantObj = audit?.tenants
      ? Array.isArray(audit.tenants)
        ? audit.tenants[0]
        : (audit.tenants as any)
      : null;
    const planTier = tenantObj?.pricing_plan || report?.plan_tier || "foundation";
    const reqDeliverable: DeliverableType = deliverableType || "ai_readiness_transformation";

    if (!isDeliverableAllowedForPlan(reqDeliverable, planTier)) {
      const planInfo = PLAN_CONFIG[normalizePricingPlan(planTier)];
      return NextResponse.json(
        {
          success: false,
          error: `The requested deliverable ('${reqDeliverable}') is not included in the client's ${planInfo.name} subscription plan. Please upgrade your subscription tier to access this report.`,
        },
        { status: 403 }
      );
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

    const exportOptions = {
      sections,
      ...stylingOptions,
      includeTOC: includeTOC !== false,
      watermarkText: watermarkText || "CONFIDENTIAL",
      currency: currency || "INR",
    };

    let htmlContent = "";

    // Route to specialized generator based on deliverableType
    switch (deliverableType) {
      case "board_investment_memo":
        htmlContent = generateBoardMemoHTML(report, audit, exportOptions);
        break;
      case "data_strategy_blueprint":
        htmlContent = generateDataStrategyHTML(report, audit, exportOptions);
        break;
      case "poc_evaluation_report":
        htmlContent = generatePocEvaluationHTML(report, audit, exportOptions);
        break;
      case "ai_readiness_transformation":
      default:
        htmlContent = generateReportHTML(report, audit, exportOptions);
        break;
    }

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
