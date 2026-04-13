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
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Free Google Ads Competitor Research | Pranjal Digital";
  }, []);

  // STEP FLOW
  const startProcess = () => {
    if (!company) return alert("Enter competitor");

    setStep(1);

    setTimeout(() => {
      window.open(
        `https://adstransparency.google.com/?region=IN&q=${company}`,
        "_blank"
      );
    }, 1000);

    setTimeout(() => setStep(2), 2500);
    setTimeout(() => setStep(3), 5000);
  };

  // OCR
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) return;

          setAdsText("🔍 Extracting text...");

          const result = await window.Tesseract.recognize(file, "eng");
          setAdsText(result.data.text);
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  // AI
  const generateAds = async () => {
    if (!brand) return alert("Enter brand");

    setLoading(true);

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Rewrite this Google Ad professionally.

Brand: ${brand}
Competitor: ${company}

Ad:
${adsText}

Give:

HEADLINES (5)
DESCRIPTIONS (3)
CTA
---
KEYWORDS (10)
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const [adsPart, keywordPart] = text.split("---");

    setAdsOutput(adsPart || "");
    setKeywords(keywordPart || "");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white p-6">
      
      {/* HERO */}
      <div className="max-w-3xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">
          Free Google Ads Competitor Research
        </h1>

        <p className="text-gray-400 mb-6">
          Find competitor ads, extract copy, and generate better ads using AI
        </p>

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter competitor (e.g. upgrad)"
          className="w-full p-4 rounded-xl text-black"
        />

        <button
          onClick={startProcess}
          className="mt-4 bg-[#c9a84c] px-6 py-3 rounded-xl font-bold"
        >
          Analyze Ads
        </button>
      </div>

      {/* STEPS */}
      {step > 0 && (
        <div className="max-w-2xl mx-auto mt-10 space-y-3 text-center">
          {step >= 1 && <p>🔗 Opening Ads Library...</p>}
          {step >= 2 && <p>📸 Screenshot competitor ads</p>}
          {step >= 3 && <p>📋 Paste screenshot (Ctrl + V)</p>}
        </div>
      )}

      {/* OCR BOX */}
      {step >= 3 && (
        <div className="max-w-2xl mx-auto mt-10">
          <div className="border border-dashed border-gray-500 p-6 rounded-xl text-center">
            <p className="text-gray-400">
              Paste screenshot here (Ctrl + V)
            </p>
          </div>
        </div>
      )}

      {/* OCR TEXT */}
      {adsText && (
        <div className="max-w-2xl mx-auto mt-6">
          <textarea
            value={adsText}
            readOnly
            className="w-full p-4 text-black rounded-lg"
            rows={5}
          />
        </div>
      )}

      {/* BRAND */}
      {adsText && (
        <div className="max-w-2xl mx-auto mt-4">
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Enter your brand name"
            className="w-full p-3 text-black rounded-lg"
          />

          <button
            onClick={generateAds}
            className="mt-3 bg-green-500 px-6 py-3 rounded-xl w-full"
          >
            {loading ? "Generating..." : "Generate Ads"}
          </button>
        </div>
      )}

      {/* OUTPUT */}
      {(adsOutput || keywords) && (
        <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
          
          {/* ADS */}
          <div className="bg-[#0a0f1c] p-6 rounded-xl">
            <h3 className="font-bold mb-3">Ad Copy</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {adsOutput}
            </pre>
          </div>

          {/* KEYWORDS */}
          <div className="bg-[#0a0f1c] p-6 rounded-xl">
            <h3 className="font-bold mb-3">Keywords</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {keywords}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
