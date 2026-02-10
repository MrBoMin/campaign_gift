"use client";

interface Lead {
  name: string;
  phone: string;
  email: string;
  prize: string;
  redemptionCode: string;
  redeemed: string;
  timestamp: string;
}

interface InventoryItem {
  prizeType: string;
  totalStock: number;
  claimed: number;
  weight: number;
  active: boolean;
}

interface StatsOverviewProps {
  leads: Lead[];
  inventory: InventoryItem[];
}

export default function StatsOverview({ leads, inventory }: StatsOverviewProps) {
  const totalLeads = leads.length;
  const totalRedeemed = leads.filter((l) => l.redeemed === "Yes").length;
  const totalWinners = leads.filter(
    (l) => l.prize && l.prize !== "No Prize"
  ).length;
  const redemptionRate = totalWinners > 0 ? Math.round((totalRedeemed / totalWinners) * 100) : 0;

  // Prize distribution
  const prizeDistribution: Record<string, number> = {};
  for (const lead of leads) {
    const prize = lead.prize || "No Prize";
    prizeDistribution[prize] = (prizeDistribution[prize] || 0) + 1;
  }

  const colors: Record<string, string> = {
    "Blind Box": "bg-purple-500",
    "Scholarship 10%": "bg-blue-500",
    "Photo Session": "bg-green-500",
    "Thank You Gift": "bg-amber-500",
    "No Prize": "bg-gray-400",
  };

  return (
    <div className="mb-8">
      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Leads</p>
          <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Winners</p>
          <p className="text-3xl font-bold text-blue-600">{totalWinners}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Redeemed</p>
          <p className="text-3xl font-bold text-green-600">{totalRedeemed}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Redemption Rate</p>
          <p className="text-3xl font-bold text-amber-600">{redemptionRate}%</p>
        </div>
      </div>

      {/* Prize Distribution Bar */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Prize Distribution
        </h3>
        {totalLeads > 0 ? (
          <>
            <div className="mb-3 flex h-6 overflow-hidden rounded-full">
              {Object.entries(prizeDistribution).map(([prize, count]) => (
                <div
                  key={prize}
                  className={`${colors[prize] || "bg-gray-300"} transition-all`}
                  style={{ width: `${(count / totalLeads) * 100}%` }}
                  title={`${prize}: ${count}`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(prizeDistribution).map(([prize, count]) => (
                <div key={prize} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <div className={`h-2.5 w-2.5 rounded-full ${colors[prize] || "bg-gray-300"}`} />
                  {prize}: {count}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">No data yet</p>
        )}
      </div>

      {/* Inventory Summary */}
      <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Inventory Summary
        </h3>
        <div className="space-y-2">
          {inventory
            .filter((item) => item.prizeType !== "No Prize")
            .map((item) => {
              const remaining = item.totalStock - item.claimed;
              const pct = item.totalStock > 0 ? (remaining / item.totalStock) * 100 : 0;
              return (
                <div key={item.prizeType}>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{item.prizeType}</span>
                    <span>{remaining}/{item.totalStock}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct > 50 ? "bg-green-500" : pct > 20 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
