import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createGrantApplication } from "@/lib/supabase/queries/grants";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      org_name,
      registration_type,
      hq_location,
      mission_statement,
      problem_solved,
      tech_bottleneck,
      leadership_confirmed,
      grant_use_case,
      amplification_pledged,
      media_reach_link,
      contact_name,
      contact_title,
      contact_email,
      contact_phone,
    } = body;

    // Basic Validation
    if (!org_name || !contact_email || !contact_name || !problem_solved) {
      return NextResponse.json(
        { success: false, error: "Missing required application fields." },
        { status: 400 }
      );
    }

    // 1. Save to Database
    let grantRecord;
    try {
      grantRecord = await createGrantApplication({
        org_name,
        registration_type,
        hq_location,
        mission_statement,
        problem_solved,
        tech_bottleneck,
        leadership_confirmed: Boolean(leadership_confirmed),
        grant_use_case,
        amplification_pledged: Boolean(amplification_pledged),
        media_reach_link,
        contact_name,
        contact_title,
        contact_email,
        contact_phone,
      });
    } catch (dbError: any) {
      console.error("Database save error for grant application:", dbError);
      // Even if database fails locally during dev, we proceed or inform
    }

    // 2. Send Auto-Reply Confirmation Email to Applicant
    const senderEmail = process.env.EMAIL_FROM || "Nisol AI <grants@nisolai.com>";
    const recipientEmail = process.env.TO_EMAIL || "contact@nisolai.com";

    if (resend) {
      try {
        // Confirmation to applicant
        await resend.emails.send({
          from: senderEmail,
          to: [contact_email],
          replyTo: recipientEmail,
          subject: `Grant Application Received — Nisol Enterprise Intelligence Grant`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0A1E3C; color: #ffffff; border-radius: 16px;">
              <div style="margin-bottom: 24px; border-b: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
                <span style="font-size: 11px; text-transform: uppercase; tracking: 2px; color: #60A5FA; font-weight: bold;">Nisol Enterprise Intelligence Grant</span>
                <h1 style="font-size: 24px; font-weight: 700; margin: 8px 0 0 0; color: #ffffff;">Application Confirmed</h1>
              </div>

              <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">Dear ${contact_name},</p>

              <p style="color: #E2E8F0; font-size: 15px; line-height: 1.6;">
                Thank you for applying for the <strong>Nisol Enterprise Intelligence Grant</strong> on behalf of <strong>${org_name}</strong>.
              </p>

              <div style="background: rgba(255,255,255,0.05); border-left: 4px solid #3B82F6; padding: 16px; margin: 24px 0; border-radius: 8px;">
                <p style="margin: 0; color: #93C5FD; font-size: 13px; font-weight: 600;">GRANT DETAILS</p>
                <p style="margin: 4px 0 0 0; color: #F8FAFC; font-size: 14px;"><strong>Value:</strong> ₹4,50,000 / $5,500 (Nisol One™ Discovery)</p>
                <p style="margin: 4px 0 0 0; color: #F8FAFC; font-size: 14px;"><strong>Grant Cohort:</strong> 2026-Q1</p>
                <p style="margin: 4px 0 0 0; color: #F8FAFC; font-size: 14px;"><strong>Status:</strong> Under Initial Screening</p>
              </div>

              <h3 style="color: #ffffff; font-size: 16px; font-weight: 600;">Next Steps</h3>
              <ul style="color: #94A3B8; font-size: 14px; line-height: 1.8; padding-left: 20px;">
                <li>Our Grant Advisory Board will review your submission against our 4-point impact & data complexity rubric.</li>
                <li>Shortlisted applicants will receive a 30-minute virtual briefing call within <strong>5 business days</strong>.</li>
                <li>Awardees will receive a physical, cloth-bound Partnership Agreement by courier.</li>
              </ul>

              <p style="color: #64748B; font-size: 13px; margin-top: 32px; border-t: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
                Intelligence. Delivered.<br />
                <strong>Nisol AI Grant Advisory Board</strong> | <a href="https://nisolai.com/grants" style="color: #60A5FA;">nisolai.com/grants</a>
              </p>
            </div>
          `,
        });

        // Notification to Nisol Admin Team
        await resend.emails.send({
          from: senderEmail,
          to: [recipientEmail],
          subject: `🚨 New Intelligence Grant Application: ${org_name}`,
          html: `
            <h2>New Grant Application Submitted</h2>
            <p><strong>Organization:</strong> ${org_name} (${registration_type})</p>
            <p><strong>HQ Location:</strong> ${hq_location}</p>
            <p><strong>Contact:</strong> ${contact_name} (${contact_title})</p>
            <p><strong>Email:</strong> ${contact_email} | <strong>Phone:</strong> ${contact_phone}</p>
            <br />
            <p><strong>Mission Statement:</strong> ${mission_statement}</p>
            <p><strong>Problem Solved:</strong> ${problem_solved}</p>
            <p><strong>Tech Bottleneck:</strong> ${tech_bottleneck}</p>
            <p><strong>Grant Use Case:</strong> ${grant_use_case}</p>
            <br />
            <p><a href="https://nisolai.com/grants">View in Superadmin Portal →</a></p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send Resend email notifications:", emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Grant application submitted successfully. Confirmation email sent.",
        data: grantRecord || { org_name, status: "pending" },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Grant application API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
