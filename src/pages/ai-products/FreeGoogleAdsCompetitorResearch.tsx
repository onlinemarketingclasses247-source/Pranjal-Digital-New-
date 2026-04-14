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
    document.title = "Free Google Ads Competitor Research | Pranjal Digital";
  }, []);

  const startProcess = () => {
    if (!company) return alert("Enter competitor");

    setStep(1);

    setTimeout(() => {
      window.open(
        `https://adstransparency.google.com/?region=IN&q=${company}`,
        "_blank"
      );
    }, 1000);

    setTimeout(() => setStep(2), 2000);
    setTimeout(() => setStep(3), 4000);
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

  // ✅ FIXED GEMINI CALL
  const generateAds = async () => {
    if (!brand) return alert("Enter your brand");

    setLoading(true);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBYOmGaUQ3ZAlk3Ft5v9JuWXDp3-DRojA8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are a Google Ads expert.

Rewrite this ad into HIGH CONVERTING Google Ads copy.

Brand: ${brand}
Competitor: ${company}

Ad:
${adsText}

Return:

HEADLINES (5)
DESCRIPTIONS (3)
CTA
KEYWORDS (10)`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800
            }
          })
        }
      );

      const data = await res.json();
      console.log("FULL RESPONSE:", data);

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text || text.length < 10) {
        setAdsOutput("❌ AI failed. Try again.");
      } else {
        setAdsOutput(text);
      }

    } catch (err) {
      console.error(err);
      setAdsOutput("❌ API error. Check console.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white p-6">

      <div className="max-w-3xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-3">
          Free Google Ads Competitor Research
        </h1>

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
        <div className="max-w-2xl mx-auto mt-6 border p-6 text-center">
          Paste screenshot (Ctrl + V)
        </div>
      )}

      {adsText && (
        <div className="max-w-2xl mx-auto mt-6">
          <textarea
            value={adsText}
            readOnly
            className="w-full p-4 text-black"
            rows={5}
          />
        </div>
      )}

      {step >= 4 && (
        <div className="max-w-2xl mx-auto mt-4">
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
        <div className="max-w-4xl mx-auto mt-10 bg-[#0a0f1c] p-6 rounded-xl">

          <div className="flex justify-between mb-3">
            <h3>Ad Copy</h3>
            <button
              onClick={() => navigator.clipboard.writeText(adsOutput)}
              className="bg-[#c9a84c] px-3 py-1"
            >
              Copy
            </button>
          </div>

          <pre className="whitespace-pre-wrap">{adsOutput}</pre>
        </div>
      )}
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
