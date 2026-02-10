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
 * Map prize type to display info
 */
export function getPrizeDisplay(prizeType: string): {
  emoji: string;
  title: string;
  description: string;
} {
  // Normalize to handle variations (e.g. "Photo Session" vs "Photo Sessions")
  const normalized = prizeType.trim().toLowerCase();

  if (normalized === "blind box") {
    return {
      emoji: "🎁",
      title: "Blind Box ဖောက်ခွင့်",
      description: "Booth မှာလာပြပြီး ဖောက်လို့ရပါပြီ!",
    };
  }
  if (normalized.startsWith("scholarship")) {
    return {
      emoji: "🎓",
      title: "Scholarship Voucher",
      description: "Enrollment မှာ 10% OFF ရပါပြီ!",
    };
  }
  if (normalized.startsWith("photo session")) {
    return {
      emoji: "📸",
      title: "Free Photo Session",
      description: "Booth မှာလာရိုက်ပါ!",
    };
  }
  if (normalized === "thank you gift") {
    return {
      emoji: "🎉",
      title: "Thank You Gift",
      description: "Booth မှာ လက်ဆောင်လေးလာယူပါ!",
    };
  }
  // No Prize / default
  return {
    emoji: "❌",
    title: "Better Luck Next Time",
    description: "ကံမကောင်းပါ၊ Booth မှာတော့ လာလည်ပါနော်!",
  };
}
