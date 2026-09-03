import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sprintGuideContent = {
  title: "The Intelligence Sprint Guide: Your 7-Day Journey to Enterprise Intelligence Clarity",
  subtitle: "For recipients of the Nisol Enterprise Intelligence Grant",
  philosophy: [
    { title: "1. We Don't Bill by the Hour", desc: "Our fee is fixed. Our commitment is total. We count outcomes, not hours." },
    { title: "2. We Work at Startup Speed", desc: "Legacy consultancies spend months in discovery. We spend 7 days with intense focus." },
    { title: "3. Your Data is Yours", desc: "Zero vendor lock-in. Zero data retention. The architecture and code belong to you." },
    { title: "4. Museum-Grade Work", desc: "Every deliverable is designed to be board-ready, both in content and physical artifact." }
  ],
  schedule: [
    { day: "Day 1", theme: "Vision & Data", client: "90-min Vision Interview with CEO/Director & System Data Access", deliverable: "Data Map (1-page visual of current ecosystem)" },
    { day: "Day 2", theme: "Interviews & Insights", client: "45-min interviews with 4-5 key departmental leads", deliverable: "Pain Point Heatmap (Maximum ROI opportunity dashboard)" },
    { day: "Day 3", theme: "Financial Modeling", client: "Provide budget, cost center, and headcount data", deliverable: "ROI Scenario Planner (DCF, NPV & Payback period spreadsheet)" },
    { day: "Day 4", theme: "Architecture Design", client: "30-min interim feedback call", deliverable: "Architecture Blueprint V1 (LLM stack & security diagram)" },
    { day: "Day 5", theme: "Action Briefs", client: "Review draft architecture", deliverable: "5-8 Strategic Action Brief battle cards" },
    { day: "Day 6", theme: "Preview & Refine", client: "Silent Day — Review interactive preview dashboard", deliverable: "Interactive Dashboard preview URL" },
    { day: "Day 7", theme: "Final Polish", client: "Block 2 hours for Day 8 Reveal presentation", deliverable: "Final Polish & Physical Hardcover Dossier printing" }
  ],
  day8Deliverables: [
    "Museum-Grade Cloth-Bound Hardcover Intelligence Dossier",
    "Standalone 2-Page Executive Summary for the Board of Directors",
    "Private Interactive Dashboard URL for leadership exploration"
  ]
};

export async function GET() {
  return NextResponse.json({ success: true, guide: sprintGuideContent });
}

export async function POST(req: Request) {
  try {
    const { email, recipientName, orgName } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Recipient email is required." }, { status: 400 });
    }

    const senderEmail = process.env.EMAIL_FROM || "Nisol AI <grants@nisolai.com>";

    if (resend) {
      await resend.emails.send({
        from: senderEmail,
        to: [email],
        subject: `The 7-Day Intelligence Sprint Guide — Nisol AI`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #070F1E; color: #ffffff; border-radius: 16px;">
            <div style="margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
              <span style="font-size: 11px; text-transform: uppercase; tracking: 2px; color: #60A5FA; font-weight: bold;">Nisol Enterprise Intelligence</span>
              <h1 style="font-size: 22px; font-weight: 700; margin: 8px 0 0 0; color: #ffffff;">The 7-Day Intelligence Sprint Guide</h1>
            </div>

            <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">
              Dear ${recipientName || "Executive Leader"},
            </p>

            <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">
              Here is your official <strong>7-Day Intelligence Sprint Guide</strong> for ${orgName || "your institution"}. This guide outlines what to expect day-by-day during your 7-day AI architecture sprint.
            </p>

            <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; margin: 20px 0;">
              <h3 style="color: #93C5FD; font-size: 15px; margin-top: 0;">Sprint Schedule Overview</h3>
              <ul style="color: #E2E8F0; font-size: 13px; padding-left: 20px; line-height: 1.8;">
                <li><strong>Day 1:</strong> Vision & Data (90-min Vision Interview)</li>
                <li><strong>Day 2:</strong> Stakeholder Interviews & Pain Point Heatmap</li>
                <li><strong>Day 3:</strong> Financial Modeling (DCF / NPV / Payback)</li>
                <li><strong>Day 4:</strong> Technical Architecture Blueprint</li>
                <li><strong>Day 5:</strong> Strategic Action Brief Battle Cards</li>
                <li><strong>Day 6:</strong> Interactive Preview Dashboard</li>
                <li><strong>Day 7:</strong> Final Polish & Physical Dossier Printing</li>
                <li><strong>Day 8:</strong> The Reveal & Board 2-Pager Presentation</li>
              </ul>
            </div>

            <p style="color: #64748B; font-size: 12px; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
              Intelligence. Delivered.<br />
              <strong>Nisol AI</strong> | <a href="https://nisolai.com/grants" style="color: #60A5FA;">nisolai.com/grants</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: `Sprint Guide dispatched to ${email}` });
  } catch (error: any) {
    console.error("Sprint guide dispatch error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}
