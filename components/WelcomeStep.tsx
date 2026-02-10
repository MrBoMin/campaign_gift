"use client";

import Image from "next/image";

interface WelcomeStepProps {
  onStart: () => void;
}

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Decorative paper airplanes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] text-4xl opacity-10 rotate-[-20deg]">✈️</div>
        <div className="absolute top-[20%] right-[15%] text-3xl opacity-10 rotate-[15deg]">✈️</div>
        <div className="absolute bottom-[30%] left-[20%] text-2xl opacity-10 rotate-[30deg]">✈️</div>
        <div className="absolute bottom-[15%] right-[10%] text-4xl opacity-10 rotate-[-10deg]">✈️</div>
        <div className="absolute top-[50%] left-[5%] text-2xl opacity-10 rotate-[45deg]">✈️</div>
        {/* Confetti dots */}
        <div className="absolute top-[15%] left-[30%] h-2 w-2 rounded-full bg-blue-200 opacity-40" />
        <div className="absolute top-[25%] right-[25%] h-3 w-3 rounded-full bg-amber-200 opacity-40" />
        <div className="absolute bottom-[25%] left-[40%] h-2 w-2 rounded-full bg-blue-200 opacity-40" />
        <div className="absolute top-[60%] right-[30%] h-2 w-2 rounded-full bg-amber-200 opacity-40" />
      </div>

      {/* Logo */}
      <div className="relative mb-8">
        <Image
          src="/logo.png"
          alt="New Next International College"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>

      {/* Headline */}
      <h1 className="mb-3 text-3xl font-bold text-gray-900">
        ✈️ Dream Fest 2026
      </h1>

      {/* Subtext */}
      <p className="mb-10 text-lg text-gray-500">
        New Next International College မှ ကြိုဆိုပါတယ်
      </p>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="animate-bounce-gentle rounded-full bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
      >
        Start
      </button>
    </div>
  );
}
