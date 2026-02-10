import { google, sheets_v4 } from "googleapis";

let sheetsInstance: sheets_v4.Sheets | null = null;

function formatPrivateKey(key: string): string {
  // Handle various formats the key might arrive in:
  // 1. With literal \n (from .env files)
  // 2. With actual newlines (from some env var systems)
  // 3. Wrapped in quotes (from copy-paste)
  let formatted = key;

  // Remove surrounding quotes if present
  if ((formatted.startsWith('"') && formatted.endsWith('"')) ||
      (formatted.startsWith("'") && formatted.endsWith("'"))) {
    formatted = formatted.slice(1, -1);
  }

  // Replace literal \n with actual newlines
  formatted = formatted.replace(/\\n/g, "\n");

  return formatted;
}

function getSheets(): sheets_v4.Sheets {
  if (sheetsInstance) return sheetsInstance;

  const privateKey = formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY || "");

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsInstance = google.sheets({ version: "v4", auth });
  return sheetsInstance;
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!;

export interface Lead {
  name: string;
  phone: string;
  email: string;
  prize: string;
  redemptionCode: string;
  redeemed: string;
  timestamp: string;
}

export interface InventoryItem {
  prizeType: string;
  totalStock: number;
  claimed: number;
  weight: number;
  active: boolean;
}

// --- Leads Sheet ---

export async function appendLead(lead: Lead): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Leads!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          lead.name,
          lead.phone,
          lead.email,
          lead.prize,
          lead.redemptionCode,
          lead.redeemed,
          lead.timestamp,
        ],
      ],
    },
  });
}

export async function getLeads(): Promise<Lead[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Leads!A2:G",
  });

  const rows = res.data.values || [];
  return rows.map((row) => ({
    name: row[0] || "",
    phone: row[1] || "",
    email: row[2] || "",
    prize: row[3] || "",
    redemptionCode: row[4] || "",
    redeemed: row[5] || "No",
    timestamp: row[6] || "",
  }));
}

export async function findLeadByPhone(phone: string): Promise<{ lead: Lead; rowIndex: number } | null> {
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.phone === phone);
  if (index === -1) return null;
  return { lead: leads[index], rowIndex: index + 2 }; // +2 for header row and 1-based index
}

export async function updateLeadPrize(
  rowIndex: number,
  prize: string,
  redemptionCode: string
): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Leads!D${rowIndex}:E${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[prize, redemptionCode]],
    },
  });
}

export async function markRedeemed(rowIndex: number): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Leads!F${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["Yes"]],
    },
  });
}

// --- Inventory Sheet ---

export async function getInventory(): Promise<InventoryItem[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Inventory!A2:E",
  });

  const rows = res.data.values || [];
  return rows.map((row) => ({
    prizeType: row[0] || "",
    totalStock: parseInt(row[1] || "0", 10),
    claimed: parseInt(row[2] || "0", 10),
    weight: parseInt(row[3] || "0", 10),
    active: String(row[4] || "FALSE").toUpperCase() === "TRUE",
  }));
}

export async function incrementClaimed(prizeType: string): Promise<void> {
  const inventory = await getInventory();
  const index = inventory.findIndex((item) => item.prizeType === prizeType);
  if (index === -1) return;

  const rowIndex = index + 2; // +2 for header and 1-based
  const newClaimed = inventory[index].claimed + 1;

  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Inventory!C${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[newClaimed]],
    },
  });
}

export async function updateInventoryRow(
  rowIndex: number,
  data: { totalStock: number; weight: number; active: boolean }
): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Inventory!B${rowIndex}:E${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.totalStock, "", data.weight, data.active ? "TRUE" : "FALSE"]],
    },
  });
}

export async function updateInventoryFull(
  rowIndex: number,
  data: { totalStock: number; claimed: number; weight: number; active: boolean }
): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Inventory!B${rowIndex}:E${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.totalStock, data.claimed, data.weight, data.active ? "TRUE" : "FALSE"]],
    },
  });
}
