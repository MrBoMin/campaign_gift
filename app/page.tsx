"use client";

import { useState, useCallback } from "react";
import WelcomeStep from "@/components/WelcomeStep";
import LeadForm from "@/components/LeadForm";
import LuckyDraw from "@/components/LuckyDraw";
import PrizeResult from "@/components/PrizeResult";
import CollegeInfo from "@/components/CollegeInfo";

type Step = "welcome" | "form" | "draw" | "result" | "info";

interface PrizeData {
  prize: string;
  redemptionCode: string;
  isWin: boolean;
  display: {
    emoji: string;
    title: string;
    description: string;
  };
}

export default function Home() {
  const [step, setStep] = useState<Step>("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [prizeData, setPrizeData] = useState<PrizeData | null>(null);

  async function handleFormSubmit(data: {
    name: string;
    phone: string;
    email: string;
  }) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      if (result.duplicate) {
        const isWin = result.prize !== "No Prize" && result.prize !== "" && result.redemptionCode !== "";
        setPrizeData({
          prize: result.prize,
          redemptionCode: isWin ? result.redemptionCode : "",
          isWin,
          display: result.display,
        });
        setStep("result");
      } else {
        setPrizeData({
          prize: result.prize,
          redemptionCode: result.redemptionCode,
          isWin: result.isWin,
          display: result.display,
        });
        setStep("draw");
      }
    } catch {
      alert("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDrawComplete = useCallback(() => {
    setStep("result");
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Step transitions */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          step === "welcome"
            ? "opacity-100 translate-y-0"
            : "pointer-events-none absolute inset-0 opacity-0 -translate-y-8"
        }`}
      >
        <WelcomeStep onStart={() => setStep("form")} />
      </div>

      <div
        className={`transition-all duration-700 ease-in-out ${
          step === "form"
            ? "opacity-100 translate-y-0"
            : "pointer-events-none absolute inset-0 opacity-0 translate-y-8"
        }`}
      >
        <LeadForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>

      <div
        className={`transition-all duration-700 ease-in-out ${
          step === "draw"
            ? "opacity-100 scale-100"
            : "pointer-events-none absolute inset-0 opacity-0 scale-95"
        }`}
      >
        {step === "draw" && <LuckyDraw onComplete={handleDrawComplete} />}
      </div>

      <div
        className={`transition-all duration-700 ease-in-out ${
          step === "result"
            ? "opacity-100 scale-100"
            : "pointer-events-none absolute inset-0 opacity-0 scale-95"
        }`}
      >
        {prizeData && step === "result" && (
          <PrizeResult
            prize={prizeData.prize}
            redemptionCode={prizeData.redemptionCode}
            isWin={prizeData.isWin}
            display={prizeData.display}
            onContinue={() => setStep("info")}
          />
        )}
      </div>

      <div
        className={`transition-all duration-700 ease-in-out ${
          step === "info"
            ? "opacity-100 translate-y-0"
            : "pointer-events-none absolute inset-0 opacity-0 translate-y-8"
        }`}
      >
        {step === "info" && <CollegeInfo />}
      </div>
    </main>
  );
}
