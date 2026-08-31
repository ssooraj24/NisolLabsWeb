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
      deliverableTypes,
      planTier: bodyPlanTier,
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
    const resolvedPlanTier = normalizePricingPlan(
      bodyPlanTier || tenantObj?.pricing_plan || report?.plan_tier || "enterprise"
    );
    const rawDeliverables: DeliverableType[] =
      Array.isArray(deliverableTypes) && deliverableTypes.length > 0
        ? (deliverableTypes as DeliverableType[])
        : [deliverableType || "ai_readiness_transformation"];

    // GATING CHECK: Verify all requested deliverables against subscribed plan
    for (const dt of rawDeliverables) {
      if (!isDeliverableAllowedForPlan(dt, resolvedPlanTier)) {
        const planInfo = PLAN_CONFIG[resolvedPlanTier];
        return NextResponse.json(
          {
            success: false,
            error: `The requested deliverable ('${dt}') is not included in the client's ${planInfo.name} subscription plan. Please upgrade your subscription tier to access this report.`,
          },
          { status: 403 }
        );
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

    const exportOptions = {
      sections,
      ...stylingOptions,
      includeTOC: includeTOC !== false,
      watermarkText: watermarkText || "CONFIDENTIAL",
      currency: currency || "INR",
    };

    const getDeliverableDoc = (dt: DeliverableType) => {
      switch (dt) {
        case "board_investment_memo":
          return {
            title: `${resolvedCompany} - CFO & Board Investment Memo`,
            html: generateBoardMemoHTML(report, audit, exportOptions),
          };
        case "data_strategy_blueprint":
          return {
            title: `${resolvedCompany} - Data Strategy & Vector Lakehouse Blueprint`,
            html: generateDataStrategyHTML(report, audit, exportOptions),
          };
        case "poc_evaluation_report":
          return {
            title: `${resolvedCompany} - PoC Evaluation & Scalability Dossier`,
            html: generatePocEvaluationHTML(report, audit, exportOptions),
          };
        case "ai_readiness_transformation":
        default:
          return {
            title: `${resolvedCompany} - Enterprise AI Transformation Strategy`,
            html: generateReportHTML(report, audit, exportOptions),
          };
      }
    };

    let htmlContent = "";
    if (rawDeliverables.length === 1) {
      htmlContent = getDeliverableDoc(rawDeliverables[0]).html;
    } else {
      const docs = rawDeliverables.map((dt) => getDeliverableDoc(dt));
      htmlContent = combineDeliverableHTMLs(docs, `${resolvedCompany} - Enterprise Deliverables Portfolio`);
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

function combineDeliverableHTMLs(
  docs: { title: string; html: string }[],
  overallTitle: string
): string {
  const styleBlocks: string[] = [];
  const bodySections: string[] = [];

  for (const doc of docs) {
    // Collect all <style> blocks
    const styleMatches = doc.html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (styleMatches) {
      styleMatches.forEach((s) => styleBlocks.push(s));
    }
    // Extract <body> contents
    const bodyMatch = doc.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) {
      bodySections.push(
        `<section class="deliverable-bundle-item" style="page-break-after: always; break-after: page;">\n${bodyMatch[1]}\n</section>`
      );
    }
  }

  const uniqueStyles = Array.from(new Set(styleBlocks)).join("\n");
  const combinedBody = bodySections.join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${overallTitle}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
  ${uniqueStyles}
  <style>
    @media print {
      .deliverable-bundle-item {
        page-break-after: always;
        break-after: page;
      }
      .deliverable-bundle-item:last-child {
        page-break-after: auto;
        break-after: auto;
      }
    }
  </style>
</head>
<body>
  ${combinedBody}
</body>
</html>`;
}
