import { NextResponse } from "next/server";
import { getInventory } from "@/lib/google-sheets";

export async function GET() {
  try {
    const inventory = await getInventory();
    const items = inventory.map((item) => ({
      ...item,
      remaining: item.prizeType === "No Prize" ? "-" : item.totalStock - item.claimed,
      status:
        item.prizeType === "No Prize"
          ? item.active
            ? "Active"
            : "Inactive"
          : !item.active
            ? "Inactive"
            : item.totalStock - item.claimed <= 0
              ? "Sold Out"
              : "Active",
    }));

    return NextResponse.json({ inventory: items });
  } catch (error) {
    console.error("check-inventory error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}
