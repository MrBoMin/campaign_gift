import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream Fest 2026 | New Next International College",
  description:
    "Dream Fest 2026 - Lucky Draw & College Information by New Next International College at Hysan Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="my">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
