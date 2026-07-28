import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateReportHTML } from "@/lib/utils/pdfGenerator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, sections, templateId, watermarkText, includeTOC } = body;

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

    // Fetch report data
    const { data: report, error: rErr } = await supabase
      .from("audit_reports")
      .select("*")
      .eq("id", reportId)
      .single();

    if (rErr || !report) {
      return NextResponse.json(
        { success: false, error: `Report record not found: ${rErr?.message}` },
        { status: 444 }
      );
    }

    // Fetch audit metadata
    const { data: audit } = await supabase
      .from("audits")
      .select("id, title, status, tenants:tenant_id (name, industry)")
      .eq("id", report.audit_id)
      .single();

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
        .single();

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
