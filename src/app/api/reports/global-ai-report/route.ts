import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isInline = searchParams.get("view") === "inline";

    const primaryPath = path.join(
      process.cwd(),
      "public",
      "reports",
      "Global-Enterprise-AI-Maturity-Report-2026-nisolai.pdf"
    );

    const fallbackPath = path.join(
      process.cwd(),
      "Documents",
      "Marketing",
      "Presentation",
      "NisolAI-Enterprise-AI-Opportunity-and-Transformation-Strategy.pdf"
    );

    let targetPath = primaryPath;
    if (!fs.existsSync(primaryPath)) {
      if (fs.existsSync(fallbackPath)) {
        targetPath = fallbackPath;
      } else {
        return new NextResponse("Report file not found on server", { status: 404 });
      }
    }

    const fileBuffer = fs.readFileSync(targetPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${isInline ? "inline" : "attachment"}; filename="Global-Enterprise-AI-Maturity-Report-2026-nisolai.pdf"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error serving Global AI Report PDF:", error);
    return new NextResponse("Internal server error while serving report", { status: 500 });
  }
}
