import { InventoryItem } from "./google-sheets";

export interface PrizeResult {
  prizeType: string;
  isWin: boolean;
}

/**
 * Weighted random prize selection based on inventory stock and weights.
 * Only prizes that are active AND have remaining stock are eligible.
 * "No Prize" is always eligible if active (no stock limit).
 */
export function selectPrize(inventory: InventoryItem[]): PrizeResult {
  const eligible = inventory.filter((item) => {
    if (!item.active) return false;
    if (item.prizeType.trim().toLowerCase() === "no prize") return true;
    return item.totalStock - item.claimed > 0;
  });

  if (eligible.length === 0) {
    return { prizeType: "No Prize", isWin: false };
  }

  const totalWeight = eligible.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight === 0) {
    return { prizeType: "No Prize", isWin: false };
  }

  const rand = Math.random() * totalWeight;
  let cumulative = 0;

  for (const item of eligible) {
    cumulative += item.weight;
    if (rand <= cumulative) {
      return {
        prizeType: item.prizeType,
        isWin: item.prizeType.trim().toLowerCase() !== "no prize",
      };
    }
  }

  // Fallback (shouldn't reach here)
  return { prizeType: "No Prize", isWin: false };
}

/**
 * Get prize display info from inventory data (from Google Sheet).
 * Falls back to defaults if columns are empty.
 */
export function getPrizeDisplay(
  prizeType: string,
  inventory?: InventoryItem[]
): {
  emoji: string;
  title: string;
  description: string;
} {
  // Look up from inventory if available
  if (inventory) {
    const item = inventory.find(
      (i) => i.prizeType.trim().toLowerCase() === prizeType.trim().toLowerCase()
    );
    if (item && item.emoji && item.displayTitle) {
      return {
        emoji: item.emoji,
        title: item.displayTitle,
        description: item.message || "",
      };
    }
  }

  // Fallback defaults for "No Prize"
  if (prizeType.trim().toLowerCase() === "no prize") {
    return {
      emoji: "❌",
      title: "Better Luck Next Time",
      description: "ကံမကောင်းပါ၊ Booth မှာတော့ လာလည်ပါနော်!",
    };
  }

  // Fallback: use prize type as title
  return {
    emoji: "🎁",
    title: prizeType,
    description: "Booth မှာ လာထုတ်ယူပါ!",
  };
}
