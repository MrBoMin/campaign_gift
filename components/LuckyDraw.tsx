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
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* Blind box */}
        <div
          className={`mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-7xl shadow-xl ${
            phase === "shaking"
              ? "animate-shake"
              : phase === "opening"
                ? "animate-box-open"
                : ""
          }`}
        >
          {phase === "done" ? "🎊" : "🎁"}
        </div>

        <p className="text-lg font-medium text-gray-600">
          {phase === "shaking" && "ကံစမ်းမဲ ဖွင့်နေပါတယ်..."}
          {phase === "opening" && "ဖွင့်နေပါတယ်..."}
        </p>
      </div>
    </div>
  );
}
