"use client";

const programs = [
  {
    icon: "💻",
    title: "NCC",
    description: "Computing & IT (UK Qualification)",
    descBurmese: "UK အသိအမှတ်ပြု IT ဘွဲ့",
  },
  {
    icon: "📊",
    title: "ABE",
    description: "Business Management (UK Qualification)",
    descBurmese: "UK အသိအမှတ်ပြု Business ဘွဲ့",
  },
  {
    icon: "🎓",
    title: "GED",
    description: "US High School Equivalency",
    descBurmese: "US အထက်တန်း အရည်အချင်းမီ",
  },
  {
    icon: "📚",
    title: "Short Courses",
    description: "IT & Business Skills",
    descBurmese: "IT နှင့် Business ကျွမ်းကျင်မှု",
  },
];

export default function CollegeInfo() {
  const messengerUrl = process.env.NEXT_PUBLIC_MESSENGER_URL || "https://m.me/newnextcollege";
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://newnextcollege.com";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://facebook.com/newnextcollege";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Section title */}
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          About New Next International College
        </h2>

        {/* Horizontal scrollable cards */}
        <div className="mb-8 -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {programs.map((program) => (
              <div
                key={program.title}
                className="min-w-[200px] snap-center rounded-2xl border border-gray-100 bg-white p-5 shadow-md"
              >
                <div className="mb-3 text-4xl">{program.icon}</div>
                <h3 className="mb-1 text-lg font-bold text-gray-900">
                  {program.title}
                </h3>
                <p className="mb-1 text-sm text-gray-600">{program.description}</p>
                <p className="text-sm text-gray-400">{program.descBurmese}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook Page
          </a>

          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-600 py-3.5 font-semibold text-blue-600 transition-all hover:bg-blue-50 active:scale-[0.98]"
          >
            💬 Messenger မှာ စကားပြောမယ်
          </a>

          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3.5 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            🌐 Website
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
