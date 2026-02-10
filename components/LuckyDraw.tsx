"use client";

import { useEffect, useState } from "react";

interface LuckyDrawProps {
  onComplete: () => void;
}

export default function LuckyDraw({ onComplete }: LuckyDrawProps) {
  const [phase, setPhase] = useState<"shaking" | "opening" | "done">("shaking");

  useEffect(() => {
    const shakeTimer = setTimeout(() => setPhase("opening"), 1500);
    const openTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(openTimer);
    };
  }, [onComplete]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-orange-50" />

      {/* Glowing orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[20%] h-40 w-40 rounded-full bg-amber-200 opacity-30 blur-3xl" />
        <div className="absolute bottom-[20%] right-[20%] h-40 w-40 rounded-full bg-orange-200 opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        {/* Gift box */}
        <div
          className={`mx-auto mb-8 flex h-44 w-44 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-8xl shadow-2xl shadow-amber-500/30 ${
            phase === "shaking"
              ? "animate-shake"
              : phase === "opening"
                ? "animate-box-open"
                : ""
          }`}
        >
          {phase === "done" ? "🎊" : "🎁"}
        </div>

        <p className="text-xl font-semibold text-gray-700">
          {phase === "shaking" && "ကံစမ်းမဲ ဖွင့်နေပါတယ်..."}
          {phase === "opening" && "ဖွင့်နေပါတယ်... ✨"}
        </p>

        {/* Loading dots */}
        {phase !== "done" && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full bg-amber-400"
                style={{
                  animation: "bounce-gentle 1s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
