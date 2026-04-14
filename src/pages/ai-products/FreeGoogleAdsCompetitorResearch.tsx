import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Tesseract: any;
  }
}

const stepsList = [
  "Open Ads Library",
  "Take Screenshot",
  "Paste Screenshot",
  "Generate Ads"
];

const FreeGoogleAdsCompetitorResearch: React.FC = () => {
  const [company, setCompany] = useState("");
  const [step, setStep] = useState(0);
  const [adsText, setAdsText] = useState("");
  const [brand, setBrand] = useState("");
  const [adsOutput, setAdsOutput] = useState("");
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
    const handlePaste = async (e: any) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) return;

          setAdsText("🔍 Reading screenshot...");

          try {
            if (typeof window !== "undefined" && window.Tesseract) {
              const result = await window.Tesseract.recognize(file, "eng");
              setAdsText(result?.data?.text || "No text found");
              setStep(4);
            } else {
              setAdsText("OCR not loaded. Refresh page.");
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

  // AI GENERATION (FIXED)
  const generateAds = async () => {
    if (!brand) return alert("Enter your brand");

    setLoading(true);

    const prompt = `
You are a Google Ads expert.

Rewrite the ad professionally.

Brand: ${brand}
Competitor: ${company}

Ad:
${adsText}

STRICT FORMAT:

HEADLINES:
1.
2.
3.
4.
5.

DESCRIPTIONS:
1.
2.
3.

CTA:
(one line)

KEYWORDS:
comma separated list (10 keywords)
`;

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBYOmGaUQ3ZAlk3Ft5v9JuWXDp3-DRojA8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      const data = await res.json();

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI";

      setAdsOutput(text);
    } catch {
      setAdsOutput("❌ Error generating ads");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white p-6">

      {/* HERO */}
      <div className="max-w-3xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-3">
          Free Google Ads Competitor Research
        </h1>

        <p className="text-gray-400 mb-6">
          Find competitor ads → extract copy → generate better ads
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
          Start Analysis
        </button>
      </div>

      {/* STEP PROGRESS */}
      {step > 0 && (
        <div className="max-w-3xl mx-auto mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stepsList.map((s, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${
                  step >= i + 1
                    ? "border-[#c9a84c] bg-[#0a0f1c]"
                    : "border-gray-700"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INSTRUCTIONS */}
      {step >= 2 && (
        <div className="max-w-2xl mx-auto mt-8 text-center text-gray-400">
          Step 1: Open ads library → Step 2: Filter ads → Step 3: Copy image → Step 4: Paste below
        </div>
      )}

      {/* PASTE BOX */}
      {step >= 3 && (
        <div className="max-w-2xl mx-auto mt-6">
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
      {step >= 4 && (
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

          {adsOutput && (
            <p className="text-green-400 text-center mt-3">
              ✅ Ads generated successfully
            </p>
          )}
        </div>
      )}

      {/* OUTPUT */}
      {adsOutput && (
        <div className="max-w-5xl mx-auto mt-10">

          <div className="bg-[#0a0f1c] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Ad Copy</h3>
              <button
                onClick={() => navigator.clipboard.writeText(adsOutput)}
                className="text-sm bg-[#c9a84c] px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>

            <pre className="whitespace-pre-wrap text-sm">
              {adsOutput}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
