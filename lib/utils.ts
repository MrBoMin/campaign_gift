/**
 * Generate a unique 6-character redemption code: NX-XXXXXX
 */
export function generateRedemptionCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0/1/I to avoid confusion
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NX-${code}`;
}

/**
 * Validate Myanmar phone number format: 09xxxxxxxx (9-11 digits after 09)
 */
export function isValidMyanmarPhone(phone: string): boolean {
  return /^09\d{7,9}$/.test(phone);
}

/**
 * Format timestamp to ISO string
 */
export function formatTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Convert leads data to CSV string
 */
export function leadsToCSV(
  leads: Array<{
    name: string;
    phone: string;
    email: string;
    prize: string;
    redemptionCode: string;
    redeemed: string;
    timestamp: string;
  }>
): string {
  const header = "Name,Phone,Email,Prize,Redemption Code,Redeemed,Timestamp";
  const rows = leads.map((l) =>
    [
      escapeCSV(l.name),
      escapeCSV(l.phone),
      escapeCSV(l.email),
      escapeCSV(l.prize),
      escapeCSV(l.redemptionCode),
      escapeCSV(l.redeemed),
      escapeCSV(l.timestamp),
    ].join(",")
  );
  return [header, ...rows].join("\n");
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
