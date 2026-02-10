"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRGeneratorPage() {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState(300);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fgColor, setFgColor] = useState("#000000");
  const qrRef = useRef<HTMLDivElement>(null);

  const defaultUrl = typeof window !== "undefined" ? window.location.origin : "https://your-domain.com";
  const qrUrl = url.trim() || defaultUrl;

  function downloadQR() {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Add padding for printing
    const padding = 40;
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2;

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, padding, padding, size, size);

      const link = document.createElement("a");
      link.download = `dream-fest-qr-${size}px.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <a
            href="/admin"
            className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </a>
          <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
          <p className="mt-2 text-gray-500">
            Generate QR codes for paper airplanes and promotional materials
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Settings */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Settings</h2>

              <div className="space-y-4">
                {/* URL */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Landing Page URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={defaultUrl}
                    className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Leave empty to use current domain
                  </p>
                </div>

                {/* Size */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Size: {size}px
                  </label>
                  <input
                    type="range"
                    min={150}
                    max={600}
                    step={10}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>150px</span>
                    <span>600px</span>
                  </div>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      QR Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded-lg border-2 border-gray-200"
                      />
                      <span className="text-sm text-gray-500 font-mono">{fgColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Background
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded-lg border-2 border-gray-200"
                      />
                      <span className="text-sm text-gray-500 font-mono">{bgColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick presets */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Quick Presets</h2>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setFgColor("#000000"); setBgColor("#FFFFFF"); }}
                  className="rounded-xl border-2 border-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  ⬛ Classic B&W
                </button>
                <button
                  onClick={() => { setFgColor("#1E40AF"); setBgColor("#FFFFFF"); }}
                  className="rounded-xl border-2 border-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  🔵 Brand Blue
                </button>
                <button
                  onClick={() => { setFgColor("#FFFFFF"); setBgColor("#1E40AF"); }}
                  className="rounded-xl border-2 border-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  🔷 Inverted Blue
                </button>
                <button
                  onClick={() => { setFgColor("#7C3AED"); setBgColor("#FFFFFF"); }}
                  className="rounded-xl border-2 border-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  🟣 Purple
                </button>
              </div>
            </div>
          </div>

          {/* Preview & Download */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Preview</h2>

              {/* QR Code */}
              <div
                ref={qrRef}
                className="mx-auto flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-6"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeSVG
                  value={qrUrl}
                  size={Math.min(size, 250)}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <p className="mt-3 text-center text-xs text-gray-400 font-mono break-all">
                {qrUrl}
              </p>

              {/* Download button */}
              <button
                onClick={downloadQR}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Download PNG ({size}px)
              </button>
            </div>

            {/* Tips */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <h3 className="mb-2 text-sm font-bold text-amber-800">Tips for printing</h3>
              <ul className="space-y-1.5 text-sm text-amber-700">
                <li>• Use 300px+ for paper airplanes</li>
                <li>• Use 500px+ for banners and posters</li>
                <li>• High error correction (H) is enabled — works even partially covered</li>
                <li>• Test scanning before printing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
