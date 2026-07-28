import { NextRequest, NextResponse } from "next/server";
import { generateFullReport } from "@/lib/ai/reportGenerator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auditId, userId } = body;

    if (!auditId) {
      return NextResponse.json(
        { success: false, error: "auditId parameter is required" },
        { status: 400 }
      );
    }

    console.log(`[API /generate-report] Received request for auditId: ${auditId}`);
    const result = await generateFullReport(auditId, userId);

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("[API /generate-report] Error generating report:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Internal server error during report generation",
      },
      { status: 500 }
    );
  }
}
