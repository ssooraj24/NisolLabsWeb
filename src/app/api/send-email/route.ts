import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, workEmail, companyName, interestPillar, budgetRange, message } = body;

    const { data, error } = await resend.emails.send({
      from: "AI Audit <onboarding@resend.dev>",
      to: ["nisollabs@gmail.com"],
      replyTo: workEmail,
      subject: `New AI Audit Request from ${companyName}`,
      html: `
        <h2>New AI Discovery Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Work Email:</strong> ${workEmail}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Primary AI Pillar:</strong> ${interestPillar}</p>
        <p><strong>Budget Range:</strong> ${budgetRange}</p>
        <br />
        <p><strong>Project Goals & Context:</strong></p>
        <p>${message ? message.replace(/\n/g, "<br>") : "N/A"}</p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}