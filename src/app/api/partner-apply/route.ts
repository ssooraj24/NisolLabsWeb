import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_for_dev");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      fullName, 
      workEmail, 
      companyName, 
      phone,
      partnerType, 
      primaryMarket, 
      estimatedReferrals, 
      website,
      message 
    } = body;

    // Basic validation
    if (!fullName || !workEmail || !companyName || !partnerType) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (*)." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.TO_EMAIL || "partners@nisolai.com";
    const senderEmail = process.env.EMAIL_FROM || "Nisol AI Partners <contact@nisolai.com>";

    // If Resend API key is provided, send email notification
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: senderEmail,
        to: [recipientEmail],
        replyTo: workEmail,
        subject: `🏆 New Partner Program Application: ${companyName} (${fullName})`,
        html: `
          <h2>New Nisol AI Partner Application</h2>
          <p><strong>Applicant Name:</strong> ${fullName}</p>
          <p><strong>Work Email:</strong> ${workEmail}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Company / Firm:</strong> ${companyName}</p>
          <p><strong>Website:</strong> ${website || "N/A"}</p>
          <p><strong>Partner Track:</strong> ${partnerType}</p>
          <p><strong>Primary Market / Vertical:</strong> ${primaryMarket || "N/A"}</p>
          <p><strong>Estimated Annual Referrals:</strong> ${estimatedReferrals || "N/A"}</p>
          <br />
          <p><strong>Background & Opportunities:</strong></p>
          <p>${message ? message.replace(/\n/g, "<br>") : "N/A"}</p>
        `,
      });

      if (error) {
        console.error("Resend Partner Email error:", error);
        // Continue with success response so user experience is smooth, log error
      }
    } else {
      console.log("Partner application received (Dev Mode):", {
        fullName, workEmail, companyName, partnerType, primaryMarket, estimatedReferrals
      });
    }

    return NextResponse.json({
      success: true,
      message: "Application received successfully. A Nisol AI Partner Manager will contact you within 48 hours."
    }, { status: 200 });

  } catch (error) {
    console.error("Server error processing partner application:", error);
    return NextResponse.json({ success: false, error: "An unexpected server error occurred." }, { status: 500 });
  }
}
