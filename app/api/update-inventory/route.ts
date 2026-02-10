import { NextRequest, NextResponse } from "next/server";
import { updateInventoryFull, getInventory } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, updates } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: "Invalid updates format" }, { status: 400 });
    }

    // Get current inventory to validate indices
    const currentInventory = await getInventory();

    for (const update of updates) {
      const { index, totalStock, claimed, weight, active } = update;
      const rowIndex = index + 2; // +2 for header and 1-based

      if (rowIndex < 2 || rowIndex > currentInventory.length + 1) {
        continue;
      }

      await updateInventoryFull(rowIndex, {
        totalStock: totalStock ?? currentInventory[index].totalStock,
        claimed: claimed ?? currentInventory[index].claimed,
        weight: weight ?? currentInventory[index].weight,
        active: active ?? currentInventory[index].active,
      });
    }

    const updatedInventory = await getInventory();
    return NextResponse.json({ inventory: updatedInventory });
  } catch (error) {
    console.error("update-inventory error:", error);
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  }
}
