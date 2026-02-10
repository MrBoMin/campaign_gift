import { NextRequest, NextResponse } from "next/server";
import {
  appendLead,
  findLeadByPhone,
  getInventory,
  incrementClaimed,
} from "@/lib/google-sheets";
import { selectPrize, getPrizeDisplay } from "@/lib/prize-logic";
import { generateRedemptionCode, isValidMyanmarPhone, formatTimestamp } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    if (!isValidMyanmarPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid phone format. Use 09xxxxxxxx" },
        { status: 400 }
      );
    }

    // Get inventory (needed for prize selection and display)
    const inventory = await getInventory();

    // Check for duplicate phone
    const existing = await findLeadByPhone(phone);
    if (existing) {
      const display = getPrizeDisplay(existing.lead.prize, inventory);
      return NextResponse.json({
        duplicate: true,
        prize: existing.lead.prize,
        redemptionCode: existing.lead.redemptionCode,
        display,
      });
    }
    const result = selectPrize(inventory);
    const redemptionCode = result.isWin ? generateRedemptionCode() : "";
    const timestamp = formatTimestamp();

    // Save lead to Google Sheets
    await appendLead({
      name,
      phone,
      email: email || "",
      prize: result.prizeType,
      redemptionCode,
      redeemed: "No",
      timestamp,
    });

    // Increment claimed count for the prize
    if (result.isWin) {
      await incrementClaimed(result.prizeType);
    }

    // Fire n8n webhook (non-blocking)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || "",
          prize: result.prizeType,
          redemption_code: redemptionCode,
          timestamp,
        }),
      }).catch(() => {
        // Silently fail — webhook is best-effort
      });
    }

    const display = getPrizeDisplay(result.prizeType, inventory);

    return NextResponse.json({
      duplicate: false,
      prize: result.prizeType,
      redemptionCode,
      isWin: result.isWin,
      display,
    });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
