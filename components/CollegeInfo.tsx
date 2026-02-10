"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const programs = [
  {
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    title: "NCC",
    description: "Computing & IT",
    descBurmese: "UK အသိအမှတ်ပြု IT ဘွဲ့",
  },
  {
    icon: "📊",
    color: "from-purple-500 to-pink-500",
    title: "ABE",
    description: "Business Management",
    descBurmese: "UK အသိအမှတ်ပြု Business ဘွဲ့",
  },
  {
    icon: "🎓",
    color: "from-amber-500 to-orange-500",
    title: "GED",
    description: "US High School Equivalency",
    descBurmese: "US အထက်တန်း အရည်အချင်းမီ",
  },
  {
    icon: "📚",
    color: "from-emerald-500 to-teal-500",
    title: "Short Courses",
    description: "IT & Business Skills",
    descBurmese: "IT နှင့် Business ကျွမ်းကျင်မှု",
  },
];

const activities = [
  {
    id: 1,
    title: "Campus Life",
    description: "ပျော်ရွှင်ဖွယ် ကျောင်းဘဝ",
    placeholder: "🏫",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    title: "Tech Workshop",
    description: "နည်းပညာ Workshop များ",
    placeholder: "💻",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 3,
    title: "Sports Day",
    description: "အားကစားပွဲတော်",
    placeholder: "⚽",
    color: "from-green-400 to-green-600",
  },
  {
    id: 4,
    title: "Graduation",
    description: "ဘွဲ့နှင်းသဘင်",
    placeholder: "🎓",
    color: "from-amber-400 to-amber-600",
  },
  {
    id: 5,
    title: "Cultural Events",
    description: "ယဉ်ကျေးမှုပွဲတော်များ",
    placeholder: "🎭",
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 6,
    title: "Field Trips",
    description: "လေ့လာရေးခရီးစဉ်",
    placeholder: "🚌",
    color: "from-teal-400 to-teal-600",
  },
];

// Supported image extensions
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

function useActivityImages() {
  const [imagePaths, setImagePaths] = useState<Record<number, string>>({});

  useEffect(() => {
    // For each activity, try to find an image with any supported extension
    activities.forEach((activity) => {
      let found = false;
      for (const ext of IMAGE_EXTENSIONS) {
        if (found) break;
        const path = `/activities/${activity.id}.${ext}`;
        const img = new window.Image();
        img.onload = () => {
          if (!found) {
            found = true;
            setImagePaths((prev) => ({ ...prev, [activity.id]: path }));
          }
        };
        img.src = path;
      }
    });
  }, []);

  return imagePaths;
}

export default function CollegeInfo() {
  const messengerUrl = process.env.NEXT_PUBLIC_MESSENGER_URL || "https://m.me/newnextcollege";
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://newnextcollege.com";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://facebook.com/newnextcollege";
  const [activeActivity, setActiveActivity] = useState(0);
  const imagePaths = useActivityImages();

  const currentActivity = activities[activeActivity];
  const currentImage = imagePaths[currentActivity.id];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-100 opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-md px-6 py-12">
        {/* Section Header */}
        <div className="animate-fade-in-up mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            About Us
          </span>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            New Next International College
          </h2>
          <p className="text-gray-500">
            သင့်အနာဂတ်ကို ဒီကနေ စတင်လိုက်ပါ
          </p>
        </div>

        {/* Activities Photo Gallery */}
        <div className="animate-fade-in-up mb-10" style={{ animationDelay: "0.1s" }}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Our Activities
          </h3>

          {/* Featured Activity */}
          <div className="mb-3 overflow-hidden rounded-2xl shadow-lg">
            <div className={`relative h-52 bg-gradient-to-br ${currentActivity.color}`}>
              {currentImage ? (
                <>
                  <Image
                    src={currentImage}
                    alt={currentActivity.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 448px) 100vw, 448px"
                  />
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="text-lg font-bold drop-shadow-md">{currentActivity.title}</h4>
                    <p className="text-sm text-white/90 drop-shadow-md">{currentActivity.description}</p>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <div className="mb-2 text-6xl">{currentActivity.placeholder}</div>
                    <h4 className="text-lg font-bold">{currentActivity.title}</h4>
                    <p className="text-sm text-white/80">{currentActivity.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {activities.map((activity, index) => {
              const thumbImage = imagePaths[activity.id];
              return (
                <button
                  key={activity.id}
                  onClick={() => setActiveActivity(index)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-xl transition-all ${
                    activeActivity === index
                      ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {thumbImage ? (
                    <div className="relative h-16 w-16">
                      <Image
                        src={thumbImage}
                        alt={activity.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className={`flex h-16 w-16 items-center justify-center bg-gradient-to-br ${activity.color} text-2xl`}>
                      {activity.placeholder}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programs */}
        <div className="animate-fade-in-up mb-10" style={{ animationDelay: "0.2s" }}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Programs
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {programs.map((program, index) => (
              <div
                key={program.title}
                className="animate-scale-in rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${program.color} text-xl shadow-sm`}>
                  {program.icon}
                </div>
                <h4 className="mb-0.5 text-sm font-bold text-gray-900">
                  {program.title}
                </h4>
                <p className="text-xs text-gray-500">{program.description}</p>
                <p className="mt-0.5 text-xs text-gray-400">{program.descBurmese}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up space-y-3" style={{ animationDelay: "0.4s" }}>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Follow on Facebook
          </a>

          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-blue-200 bg-blue-50 py-4 font-semibold text-blue-700 transition-all hover:bg-blue-100 active:scale-[0.98]"
          >
            💬 Messenger မှာ စကားပြောမယ်
          </a>

          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-gray-200 py-4 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            🌐 Visit Website
          </a>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-sm text-gray-400">
          &copy; 2026 New Next International College
        </p>
      </div>
    </div>
  );
}
