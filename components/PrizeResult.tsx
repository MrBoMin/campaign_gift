"use client";

import { useEffect, useState } from "react";

interface PrizeResultProps {
  prize: string;
  redemptionCode: string;
  isWin: boolean;
  display: {
    emoji: string;
    title: string;
    description: string;
  };
  onContinue: () => void;
}

export default function PrizeResult({
  redemptionCode,
  isWin,
  display,
  onContinue,
}: PrizeResultProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isWin) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isWin]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
      {/* Background */}
      <div className={`absolute inset-0 ${isWin ? "bg-gradient-to-b from-amber-50 via-white to-blue-50" : "bg-gradient-to-b from-gray-50 to-white"}`} />

      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="animate-confetti absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: [
                  "#2563EB", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#EC4899",
                ][Math.floor(Math.random() * 6)],
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Prize emoji */}
        <div className="animate-scale-in mb-6">
          <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-3xl text-6xl shadow-xl ${
            isWin 
              ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30" 
              : "bg-gradient-to-br from-gray-200 to-gray-300 shadow-gray-300/30"
          }`}>
            {display.emoji}
          </div>
        </div>

        {/* Prize title */}
        <h2 className="animate-fade-in-up mb-3 text-2xl font-bold text-gray-900">
          {display.title}
        </h2>

        {/* Prize description */}
        <p className="animate-fade-in-up mb-8 text-lg text-gray-600" style={{ animationDelay: "0.1s" }}>
          {display.description}
        </p>

        {/* Redemption code */}
        {isWin && redemptionCode && (
          <div className="animate-fade-in-up mb-6" style={{ animationDelay: "0.2s" }}>
            <div className="inline-block rounded-2xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Redemption Code
              </p>
              <p className="mt-2 font-mono text-3xl font-bold text-amber-700">
                {redemptionCode}
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              📱 Screenshot ရိုက်ထားပါ
            </p>
          </div>
        )}

        {/* Booth location */}
        {isWin && (
          <div className="animate-fade-in-up mb-8 rounded-2xl bg-blue-50 border border-blue-100 p-5 space-y-3" style={{ animationDelay: "0.3s" }}>
            <p className="text-sm font-bold text-blue-700">
              📍 ဆုလာထုတ်ရန်
            </p>
            <div className="text-blue-600 text-sm space-y-1.5">
              <p className="font-semibold">New Next Booth</p>
              <p>Hysan Education Fair</p>
            </div>
            <div className="border-t border-blue-100 pt-3 text-blue-600 text-sm space-y-1.5">
              <p className="font-semibold">New Next Campus</p>
              <p>ကျောင်းမှာလည်း လာထုတ်လို့ရပါတယ်</p>
            </div>
          </div>
        )}

        {/* Continue button */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={onContinue}
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl active:scale-95"
          >
            New Next အကြောင်း ကြည့်မယ် →
          </button>
        </div>
      </div>
    </div>
  );
}
