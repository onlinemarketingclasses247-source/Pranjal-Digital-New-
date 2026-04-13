import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Tesseract: any;
  }
}

const FreeGoogleAdsCompetitorResearch: React.FC = () => {
  const [company, setCompany] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [adsText, setAdsText] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [adsOutput, setAdsOutput] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // SEO
  useEffect(() => {
    document.title =
      "Free Google Ads Competitor Research | Pranjal Digital";
  }, []);

  // STEP FLOW
  const startProcess = () => {
    if (!company) {
      alert("Enter competitor name");
      return;
    }

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

  // OCR (SAFE)
  useEffect(() => {
    const handlePaste = async (e: any) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) return;

          setAdsText("🔍 Extracting text from image...");

          try {
            if (typeof window !== "undefined" && window.Tesseract) {
              const result = await window.Tesseract.recognize(file, "eng");
              setAdsText(result?.data?.text || "No text found");
            } else {
              setAdsText("❌ OCR not loaded. Refresh page.");
            }
          } catch (err) {
            setAdsText("❌ Failed to read image");
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  // GEMINI AI (SAFE)
  const generateAds = async () => {
    if (!brand) {
      alert("Enter your brand name");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBYOmGaUQ3ZAlk3Ft5v9JuWXDp3-DRojA8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No AI response";

      let adsPart = text;
      let keywordPart = "";

      if (text.includes("---")) {
        const parts = text.split("---");
        adsPart = parts[0];
        keywordPart = parts[1];
      }

      setAdsOutput(adsPart);
      setKeywords(keywordPart);
    } catch (err) {
      setAdsOutput("❌ Error generating ads");
      setKeywords("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white p-6">

      {/* HERO */}
      <div className="max-w-3xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">
          Free Google Ads Competitor Research
        </h1>

        <p className="text-gray-400 mb-6">
          Analyze competitor ads and generate better ads using AI
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
        <div className="max-w-2xl mx-auto mt-10 text-center space-y-2">
          {step >= 1 && <p>🔗 Opening Ads Library...</p>}
          {step >= 2 && <p>📸 Take screenshot of ads</p>}
          {step >= 3 && <p>📋 Paste screenshot here (Ctrl + V)</p>}
        </div>
      )}

      {/* OCR BOX */}
      {step >= 3 && (
        <div className="max-w-2xl mx-auto mt-10">
          <div className="border border-dashed border-gray-500 p-6 rounded-xl text-center">
            Paste screenshot here (Ctrl + V)
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

      {/* BRAND INPUT */}
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

          <div className="bg-[#0a0f1c] p-6 rounded-xl">
            <h3 className="font-bold mb-3">Ad Copy</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {adsOutput}
            </pre>
          </div>

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
