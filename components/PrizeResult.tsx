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
      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="animate-confetti absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: [
                  "#2563EB",
                  "#F59E0B",
                  "#10B981",
                  "#EF4444",
                  "#8B5CF6",
                  "#EC4899",
                ][Math.floor(Math.random() * 6)],
                width: `${6 + Math.random() * 6}px`,
                height: `${6 + Math.random() * 6}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-sm text-center">
        {/* Prize emoji */}
        <div className="animate-fade-in-up mb-4 text-7xl">{display.emoji}</div>

        {/* Prize title */}
        <h2 className="animate-fade-in-up mb-3 text-2xl font-bold text-gray-900">
          {display.title}
        </h2>

        {/* Prize description */}
        <p className="animate-fade-in-up mb-6 text-lg text-gray-600">
          {display.description}
        </p>

        {/* Redemption code */}
        {isWin && redemptionCode && (
          <div className="animate-fade-in-up mb-4">
            <div className="inline-block rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 px-6 py-3">
              <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                Redemption Code
              </p>
              <p className="mt-1 font-mono text-2xl font-bold text-amber-700">
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
          <div className="animate-fade-in-up mb-8 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-700">
              📍 Booth Location
            </p>
            <p className="mt-1 text-blue-600">
              Hysan Education — Hall A, Booth 12
            </p>
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="animate-fade-in-up rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
        >
          New Next အကြောင်း ကြည့်မယ်
        </button>
      </div>
    </div>
  );
}
