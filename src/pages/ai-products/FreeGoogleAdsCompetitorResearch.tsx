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
  const [result, setResult] = useState<string>("");

  // SEO TITLE
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

    setTimeout(() => setStep(2), 3000);
    setTimeout(() => setStep(3), 6000);
  };

  // IMAGE PASTE OCR
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;

      if (!items) return;

      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) return;

          setAdsText("🔍 Reading screenshot...");

          const result = await window.Tesseract.recognize(file, "eng");

          setAdsText(result.data.text);
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  // GEMINI API
  const generateAds = async () => {
    if (!brand) {
      alert("Enter your brand name");
      return;
    }

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
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
Improve this Google ad.

Brand: ${brand}
Competitor: ${company}

Ad:
${adsText}

Give output in this format:

HEADLINES:
(5 headlines)

DESCRIPTIONS:
(3 descriptions)

CTA:

KEYWORDS:
(10 keywords)
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    setResult(output);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white p-6">
      <div className="max-w-3xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">
          Free Google Ads Competitor Research
        </h1>

        <input
          placeholder="Search competitor (e.g. upgrad)"
          value={company}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCompany(e.target.value)
          }
          className="w-full p-4 rounded-xl text-black"
        />

        <button
          onClick={startProcess}
          className="mt-4 bg-[#c9a84c] px-6 py-3 rounded-xl"
        >
          Analyze Ads
        </button>
      </div>

      {/* STEPS */}
      {step > 0 && (
        <div className="text-center mt-10 space-y-2">
          {step >= 1 && <p>✅ Opening Ads Library...</p>}
          {step >= 2 && <p>📸 Take screenshot of ads</p>}
          {step >= 3 && <p>📋 Paste screenshot here (Ctrl + V)</p>}
        </div>
      )}

      {/* OCR TEXT */}
      {adsText && (
        <div className="max-w-2xl mx-auto mt-10">
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
            placeholder="Enter your brand name"
            value={brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBrand(e.target.value)
            }
            className="w-full p-3 text-black rounded-lg"
          />

          <button
            onClick={generateAds}
            className="mt-3 bg-green-500 px-6 py-3 rounded-xl"
          >
            Generate Ads
          </button>
        </div>
      )}

      {/* OUTPUT */}
      {result && (
        <div className="max-w-3xl mx-auto mt-10 bg-[#0a0f1c] p-6 rounded-xl">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
