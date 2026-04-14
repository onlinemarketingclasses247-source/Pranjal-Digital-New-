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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Google Ads Competitor Research Tool";
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

  // ✅ WORKING AI (NO API KEY)
  const generateAds = async () => {
    if (!brand) return alert("Enter your brand");

    setLoading(true);

    try {
      const prompt = `
You are a Google Ads expert.

Brand: ${brand}
Competitor: ${company}

Competitor Ads:
${adsText}

Generate:
1. 5 Headlines
2. 5 Descriptions
3. Keywords:
   - Exact
   - Phrase
   - Broad
`;

      const res = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: prompt
          })
        }
      );

      const data = await res.json();

      console.log("AI RESPONSE:", data);

      const output =
        data?.[0]?.generated_text ||
        "⚠️ AI loading or rate limited. Try again.";

      setAdsOutput(output);

    } catch (err) {
      console.error(err);
      setAdsOutput("❌ AI failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#080c14] text-white">

      {/* HERO */}
      <div className="max-w-6xl mx-auto text-center py-20 px-6">
        <h1 className="text-5xl font-bold">
          Turn Competitor Ads Into{" "}
          <span className="text-yellow-400">
            High-Converting Campaigns
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-3xl mx-auto">
          Get real ads directly from Google Ads Transparency Center.
          Analyze gaps and generate better ads using AI.
        </p>

        {/* VIDEO */}
        <div className="mt-12 flex justify-center">
          <div className="aspect-square w-full max-w-[360px] bg-black rounded-xl flex items-center justify-center text-gray-500">
            YouTube Video
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          ✔ Real Data ✔ AI Powered ✔ No Crawlers
        </div>
      </div>

      {/* INPUT */}
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
        <div className="max-w-2xl mx-auto mt-6 border p-6 text-center">
          Paste screenshot (Ctrl + V)
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
          <pre className="whitespace-pre-wrap">{adsOutput}</pre>
        </div>
      )}
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
