import { NextRequest, NextResponse } from "next/server";
import { getLeads, markRedeemed } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, phone } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!phone) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }

    const leads = await getLeads();
    const index = leads.findIndex((l) => l.phone === phone);

    if (index === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
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
