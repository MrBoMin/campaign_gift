import { NextRequest, NextResponse } from "next/server";
import { getLeads, markRedeemed } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, phone, redemptionCode } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!phone && !redemptionCode) {
      return NextResponse.json({ error: "Phone or redemption code is required" }, { status: 400 });
    }

    const leads = await getLeads();

    // Find by redemption code first (more specific), then fall back to phone
    let index = -1;
    if (redemptionCode) {
      index = leads.findIndex(
        (l) => l.redemptionCode === redemptionCode && l.redeemed !== "Yes"
      );
    }
    if (index === -1 && phone) {
      // Find by phone — but only match rows with a prize (not "No Prize") and not yet redeemed
      index = leads.findIndex(
        (l) =>
          l.phone === phone &&
          l.prize !== "No Prize" &&
          l.prize !== "" &&
          l.redemptionCode !== "" &&
          l.redeemed !== "Yes"
      );
    }

    if (index === -1) {
      return NextResponse.json({ error: "No redeemable prize found for this entry" }, { status: 404 });
    }

    const rowIndex = index + 2; // +2 for header and 1-based
    await markRedeemed(rowIndex);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("redeem error:", error);
    return NextResponse.json(
      { error: "Failed to mark as redeemed" },
      { status: 500 }
    );
  }
}
