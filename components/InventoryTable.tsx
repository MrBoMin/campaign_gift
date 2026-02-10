"use client";

import { useState } from "react";

interface InventoryItem {
  prizeType: string;
  totalStock: number;
  claimed: number;
  weight: number;
  active: boolean;
}

interface InventoryTableProps {
  inventory: InventoryItem[];
  onUpdate: (updates: Array<{
    index: number;
    totalStock?: number;
    claimed?: number;
    weight?: number;
    active?: boolean;
  }>) => void;
  isSaving: boolean;
}

export default function InventoryTable({
  inventory,
  onUpdate,
  isSaving,
}: InventoryTableProps) {
  const [editData, setEditData] = useState<InventoryItem[]>(inventory);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync when inventory prop changes (after save)
  if (!hasChanges && JSON.stringify(editData) !== JSON.stringify(inventory)) {
    setEditData(inventory);
  }

  function handleChange(index: number, field: keyof InventoryItem, value: string | boolean) {
    const newData = [...editData];
    if (field === "active") {
      newData[index] = { ...newData[index], active: value as boolean };
    } else if (field === "totalStock" || field === "weight") {
      newData[index] = { ...newData[index], [field]: parseInt(value as string, 10) || 0 };
    }
    setEditData(newData);
    setHasChanges(true);
  }

  function handleSave() {
    const updates = editData.map((item, index) => ({
      index,
      totalStock: item.totalStock,
      claimed: item.claimed,
      weight: item.weight,
      active: item.active,
    }));
    onUpdate(updates);
    setHasChanges(false);
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h3 className="font-semibold text-gray-900">Voucher Inventory</h3>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3">Prize</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Claimed</th>
              <th className="px-4 py-3">Remaining</th>
              <th className="px-4 py-3">Weight %</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {editData.map((item, index) => {
              const remaining =
                item.prizeType === "No Prize" ? "-" : item.totalStock - item.claimed;
              const isSoldOut =
                item.prizeType !== "No Prize" &&
                item.totalStock - item.claimed <= 0;

              return (
                <tr key={item.prizeType} className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.prizeType}
                  </td>
                  <td className="px-4 py-3">
                    {item.prizeType === "No Prize" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <input
                        type="number"
                        value={item.totalStock}
                        onChange={(e) => handleChange(index, "totalStock", e.target.value)}
                        className="w-20 rounded border border-gray-200 px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.claimed}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-medium ${
                        isSoldOut ? "text-red-500" : "text-gray-900"
                      }`}
                    >
                      {remaining}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.weight}
                      onChange={(e) => handleChange(index, "weight", e.target.value)}
                      className="w-20 rounded border border-gray-200 px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={(e) => handleChange(index, "active", e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
