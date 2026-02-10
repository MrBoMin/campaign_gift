"use client";

import Image from "next/image";

interface WelcomeStepProps {
  onStart: () => void;
}

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background gradient */}
      <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-[8%] left-[8%] text-5xl opacity-20">✈️</div>
        <div className="animate-float absolute top-[18%] right-[12%] text-4xl opacity-15" style={{ animationDelay: "1s" }}>✈️</div>
        <div className="animate-float absolute bottom-[28%] left-[15%] text-3xl opacity-15" style={{ animationDelay: "2s" }}>✈️</div>
        <div className="animate-float absolute bottom-[12%] right-[8%] text-5xl opacity-20" style={{ animationDelay: "0.5s" }}>✈️</div>
        <div className="animate-float absolute top-[45%] left-[3%] text-3xl opacity-10" style={{ animationDelay: "1.5s" }}>✈️</div>
        
        {/* Glowing orbs */}
        <div className="absolute top-[10%] left-[25%] h-32 w-32 rounded-full bg-blue-400 opacity-10 blur-3xl" />
        <div className="absolute bottom-[20%] right-[20%] h-40 w-40 rounded-full bg-purple-400 opacity-10 blur-3xl" />
        <div className="absolute top-[50%] right-[5%] h-24 w-24 rounded-full bg-amber-400 opacity-10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="animate-scale-in mb-6">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
            <Image
              src="/logo.png"
              alt="New Next International College"
              width={120}
              height={120}
              className="rounded-2xl object-contain"
              priority
            />
          </div>
        </div>

        {/* Event badge */}
        <div className="animate-fade-in-up mb-4">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            Hysan Education Fair 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up mb-3 text-4xl font-bold text-white drop-shadow-lg" style={{ animationDelay: "0.1s" }}>
          Dream Fest 2026
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up mb-4 text-lg text-blue-100" style={{ animationDelay: "0.2s" }}>
          New Next International College
        </p>
        <p className="animate-fade-in-up mb-10 text-base text-blue-200/80" style={{ animationDelay: "0.3s" }}>
          ကံစမ်းမဲဆွဲပြီး ဆုတွေ ရယူလိုက်ပါ
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={onStart}
            className="animate-pulse-glow group relative rounded-full bg-white px-12 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              Lucky Draw ဆွဲမယ်
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
