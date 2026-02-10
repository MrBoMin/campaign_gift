"use client";

import { useState } from "react";

interface Lead {
  name: string;
  phone: string;
  email: string;
  prize: string;
  redemptionCode: string;
  redeemed: string;
  timestamp: string;
}

interface LeadTableProps {
  leads: Lead[];
  onRedeem: (phone: string) => void;
  onExport: () => void;
  isRedeeming: string | null;
}

export default function LeadTable({
  leads,
  onRedeem,
  onExport,
  isRedeeming,
}: LeadTableProps) {
  const [search, setSearch] = useState("");

  const filtered = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search)
  );

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold text-gray-900">
          Lead List ({leads.length})
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or phone..."
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={onExport}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Prize</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Redeemed</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  {search ? "No results found" : "No leads yet"}
                </td>
              </tr>
            ) : (
              filtered.map((lead, index) => (
                <tr key={`${lead.phone}-${index}`} className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {lead.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {lead.email || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        lead.prize === "No Prize"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {lead.prize || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">
                    {lead.redemptionCode || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {lead.redeemed === "Yes" ? (
                      <span className="inline-block rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {lead.timestamp
                      ? new Date(lead.timestamp).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {lead.prize &&
                      lead.prize !== "No Prize" &&
                      lead.redeemed !== "Yes" && (
                        <button
                          onClick={() => onRedeem(lead.phone)}
                          disabled={isRedeeming === lead.phone}
                          className="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-green-700 disabled:opacity-60"
                        >
                          {isRedeeming === lead.phone ? "..." : "Redeem"}
                        </button>
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
