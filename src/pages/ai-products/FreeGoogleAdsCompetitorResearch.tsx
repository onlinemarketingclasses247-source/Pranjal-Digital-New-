import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Tesseract: any;
  }
}

const FreeGoogleAdsCompetitorResearch: React.FC = () => {
  const [company, setCompany] = useState("");
  const [step, setStep] = useState(0);
  const [adsText, setAdsText] = useState("");
  const [brand, setBrand] = useState("");
  const [adsOutput, setAdsOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Google Ads Competitor Intelligence Tool";
  }, []);

  // STEP 1
  const startProcess = () => {
    if (!company) return alert("Enter competitor");

    setStep(1);

    setTimeout(() => {
      window.open(
        `https://adstransparency.google.com/?region=IN&q=${company}`,
        "_blank"
      );
    }, 1000);

    setTimeout(() => setStep(3), 3000);
  };

  // OCR (UNCHANGED)
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = (e.clipboardData as DataTransfer)?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) return;

          setAdsText("🔍 Reading screenshot...");

          try {
            if (window.Tesseract) {
              const result = await window.Tesseract.recognize(file, "eng");
              setAdsText(result?.data?.text || "No text found");
              setStep(4);
            }
          } catch {
            setAdsText("Error reading image");
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  // ✅ ML-LIKE ENGINE (NO API)
  const generateAds = () => {
    if (!brand) return alert("Enter your brand");

    setLoading(true);

    try {
      const text = adsText.toLowerCase();

      // 🔹 Extract keywords
      const words = text
        .replace(/[^\w\s]/g, "")
        .split(" ")
        .filter((w) => w.length > 3);

      const freq: Record<string, number> = {};
      words.forEach((w) => {
        freq[w] = (freq[w] || 0) + 1;
      });

      const sorted = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map((w) => w[0])
        .slice(0, 12);

      // 🔹 Headlines
      const headlines = [
        `${brand} – Better Than ${company}`,
        `Switch from ${company} to ${brand}`,
        `${brand} for Faster Growth`,
        `Why ${brand} Beats ${company}`,
        `Upgrade to ${brand} Today`,
      ];

      // 🔹 Descriptions
      const descriptions = [
        `Tired of ${company}? ${brand} delivers better performance and ROI.`,
        `${brand} helps you scale faster with smarter campaigns.`,
        `Stop wasting budget. Switch to ${brand}.`,
        `Get better results than ${company} with ${brand}.`,
        `${brand} is built for performance-driven growth.`,
      ];

      // 🔹 Keywords
      const exact = sorted.map((k) => `[${k}]`);
      const phrase = sorted.map((k) => `"${k}"`);
      const broad = sorted;

      // 🔹 Angles
      const angles = [
        `Pain-Based: Highlight weaknesses in ${company}`,
        `Performance-Based: Show ROI improvement using ${brand}`,
      ];

      const output = `
🔥 HEADLINES:
${headlines.join("\n")}

📝 DESCRIPTIONS:
${descriptions.join("\n")}

🎯 KEYWORDS:

Exact:
${exact.join(", ")}

Phrase:
${phrase.join(", ")}

Broad:
${broad.join(", ")}

⚡ STRATEGY ANGLES:
${angles.join("\n")}
`;

      setAdsOutput(output);
    } catch (err) {
      console.error(err);
      setAdsOutput("❌ Generation failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#080c14] text-white">

      {/* HERO */}
      <div className="max-w-6xl mx-auto text-center py-20 px-6">
        <h1 className="text-5xl font-bold leading-tight">
          Real-Time Competitor Ad Intelligence  
          <span className="text-yellow-400"> (No Crawlers)</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
          Tools like SEMrush, Ahrefs, and SpyFu rely on crawlers — meaning
          data is delayed and often outdated.
        </p>

        <p className="mt-3 text-gray-300 max-w-3xl mx-auto">
          This tool lets you extract real ads from Google and instantly generate
          better ad strategies using intelligent pattern analysis.
        </p>

        {/* VIDEO */}
        <div className="mt-12 flex justify-center">
          <div className="w-[320px] h-[320px] bg-black rounded-xl flex items-center justify-center text-gray-500 border border-yellow-500/30">
            YouTube Demo
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          ✔ Real Ads ✔ Instant Insights ✔ No API ✔ No Failures
        </div>
      </div>

      {/* TOOL */}
      <div className="max-w-3xl mx-auto mt-10 px-6 text-center">

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter competitor"
          className="w-full p-4 rounded-xl text-black"
        />

        <button
          onClick={startProcess}
          className="mt-4 bg-[#c9a84c] px-6 py-3 rounded-xl"
        >
          Start Analysis
        </button>

      </div>

      {step >= 3 && (
        <div className="max-w-2xl mx-auto mt-6 border border-dashed border-gray-600 p-6 text-center rounded-xl">
          📸 Paste screenshot (Ctrl + V)
        </div>
      )}

      {adsText && (
        <div className="max-w-2xl mx-auto mt-6 px-6">
          <textarea
            value={adsText}
            readOnly
            className="w-full p-4 text-black"
            rows={5}
          />
        </div>
      )}

      {step >= 4 && (
        <div className="max-w-2xl mx-auto mt-4 px-6">
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Enter your brand"
            className="w-full p-3 text-black"
          />

          <button
            onClick={generateAds}
            className="mt-3 bg-green-500 px-6 py-3 w-full"
          >
            {loading ? "Generating..." : "Generate Ads"}
          </button>
        </div>
      )}

      {adsOutput && (
        <div className="max-w-5xl mx-auto mt-10 bg-[#0a0f1c] p-6 rounded-xl">
          <h2 className="text-xl mb-4">Generated Ad Strategy</h2>
          <pre className="whitespace-pre-wrap text-gray-300">
            {adsOutput}
          </pre>
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-20 py-10 border-t border-gray-800 text-center text-gray-500 text-sm">
        Built by Pranjal Digital • Smart Ad Intelligence Tool
      </div>

    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
