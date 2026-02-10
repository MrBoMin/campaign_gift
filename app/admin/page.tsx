"use client";

import { useState, useCallback, useEffect } from "react";
import AdminLogin from "@/components/AdminLogin";
import StatsOverview from "@/components/StatsOverview";
import InventoryTable from "@/components/InventoryTable";
import LeadTable from "@/components/LeadTable";

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

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "inventory" | "leads">("overview");

  const fetchData = useCallback(async () => {
    if (!password) return;
    setIsLoading(true);
    try {
      const [leadsRes, inventoryRes] = await Promise.all([
        fetch("/api/get-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }),
        fetch("/api/check-inventory"),
      ]);

      if (leadsRes.status === 401) {
        setIsAuthenticated(false);
        setLoginError("Session expired. Please login again.");
        return;
      }

      const leadsData = await leadsRes.json();
      const inventoryData = await inventoryRes.json();

      if (leadsData.leads) setLeads(leadsData.leads);
      if (inventoryData.inventory) setInventory(inventoryData.inventory);
    } catch {
      console.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      // Auto-refresh every 30s
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchData]);

  async function handleLogin(pwd: string) {
    // Validate password by trying to fetch leads
    try {
      const res = await fetch("/api/get-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });

      if (res.status === 401) {
        setLoginError("Invalid password");
        return;
      }

      setPassword(pwd);
      setIsAuthenticated(true);
      setLoginError("");
    } catch {
      setLoginError("Connection error");
    }
  }

  async function handleInventoryUpdate(
    updates: Array<{
      index: number;
      totalStock?: number;
      claimed?: number;
      weight?: number;
      active?: boolean;
    }>
  ) {
    setIsSaving(true);
    try {
      const res = await fetch("/api/update-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, updates }),
      });
      const data = await res.json();
      if (data.inventory) setInventory(data.inventory);
    } catch {
      alert("Failed to update inventory");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRedeem(phone: string) {
    setIsRedeeming(phone);
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, phone }),
      });

      if (res.ok) {
        // Refresh leads
        await fetchData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to redeem");
      }
    } catch {
      alert("Connection error");
    } finally {
      setIsRedeeming(null);
    }
  }

  async function handleExport() {
    try {
      const res = await fetch("/api/export-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        alert("Failed to export");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dream-fest-leads-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed");
    }
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Dream Fest Admin
            </h1>
            <p className="text-sm text-gray-500">
              Dashboard &middot; New Next International College
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-60"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
              }}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1">
          {(["overview", "inventory", "leads"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <StatsOverview leads={leads} inventory={inventory} />
        )}

        {activeTab === "inventory" && (
          <InventoryTable
            inventory={inventory}
            onUpdate={handleInventoryUpdate}
            isSaving={isSaving}
          />
        )}

        {activeTab === "leads" && (
          <LeadTable
            leads={leads}
            onRedeem={handleRedeem}
            onExport={handleExport}
            isRedeeming={isRedeeming}
          />
        )}
      </main>
    </div>
  );
}
