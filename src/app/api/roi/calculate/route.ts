import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      fullName,
      company,
      phone,
      industry,
      employees,
      avgHourlyRate,
      manualHoursPerWeek,
      monthlySupportTickets,
      avgCostPerTicket,
      selectedAreas,
      currency,
      annualSavings,
      implementationCost,
      roiPercentage,
      paybackMonths,
      maturityScore,
      maturityLevel
    } = body;

    if (!email || !company) {
      return NextResponse.json(
        { success: false, error: "Email and Company Name are required." },
        { status: 400 }
      );
    }

    // Lead Priority Qualification Logic from docx specification
    let leadPriority = "Low Priority";
    if (annualSavings > 500000 && roiPercentage > 500) {
      leadPriority = "High Priority (Call within 24h)";
    } else if (annualSavings > 200000 && roiPercentage > 300) {
      leadPriority = "Medium Priority (Email within 48h)";
    } else if (annualSavings > 50000 && roiPercentage > 100) {
      leadPriority = "Standard Qualified Lead";
    } else {
      leadPriority = "Nurture - Suggested Discovery Workshop";
    }

    const leadRecord = {
      id: `roi_${Date.now()}`,
      email,
      fullName: fullName || "Valued Prospect",
      company,
      phone: phone || "Not Provided",
      industry,
      employees,
      currency,
      selectedAreas,
      annualSavings,
      implementationCost,
      roiPercentage,
      paybackMonths,
      maturityScore,
      maturityLevel,
      leadPriority,
      createdAt: new Date().toISOString()
    };

    console.log("Captured ROI Lead:", leadRecord);

    return NextResponse.json({
      success: true,
      message: "Personalized ROI Report generated successfully.",
      data: leadRecord
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
