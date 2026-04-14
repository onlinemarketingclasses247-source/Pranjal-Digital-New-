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

  // ✅ WORKING AI (OpenRouter FIXED)
  const generateAds = async () => {
    if (!brand) return alert("Enter your brand");

    setLoading(true);

    try {
      const cleanedText = adsText.replace(/\n+/g, " ").slice(0, 1500);

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Ads Intelligence Tool"
        },
        body: JSON.stringify({
          model: "openchat/openchat-7b",
          messages: [
            {
              role: "user",
              content: `
You are a senior Google Ads strategist.

Brand: ${brand}
Competitor: ${company}

Competitor Ads:
${cleanedText}

Give structured output:

HEADLINES (5)
DESCRIPTIONS (5)

KEYWORDS:
- Exact
- Phrase
- Broad

Also:
- 2 ad angles
- 1 growth strategy
`
            }
          ]
        })
      });

      const data = await res.json();
      console.log("AI RESPONSE:", data);

      const output = data?.choices?.[0]?.message?.content;

      setAdsOutput(output || "❌ No response from AI");

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
        <h1 className="text-5xl font-bold leading-tight">
          Real-Time Google Ads Intelligence  
          <span className="text-yellow-400"> (Not Crawler Data)</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
          Traditional tools like SEMrush, Ahrefs, and SpyFu rely on crawlers — 
          meaning the data is delayed, incomplete, and often outdated.
        </p>

        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
          This tool pulls **live ads directly from Google Ads Transparency Center**, 
          extracts insights using AI, and generates **better-performing ad copies and keyword strategies instantly.**
        </p>

        {/* VIDEO */}
        <div className="mt-12 flex justify-center">
          <div className="w-[320px] h-[320px] rounded-xl bg-black border border-yellow-500/30 flex items-center justify-center text-gray-500">
            YouTube Demo
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          ✔ Live Google Data ✔ AI Powered ✔ No Crawlers ✔ Real Insights
        </div>
      </div>

      {/* COMPARISON */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">

        <div className="bg-[#0a0f1c] p-6 rounded-xl border border-red-500/20">
          <h3 className="text-red-400 font-semibold mb-2">❌ Crawler-Based Tools</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Data delayed by days/weeks</li>
            <li>• Misses many ads</li>
            <li>• No real messaging insight</li>
            <li>• Incomplete keyword intelligence</li>
          </ul>
        </div>

        <div className="bg-[#0a0f1c] p-6 rounded-xl border border-green-500/20">
          <h3 className="text-green-400 font-semibold mb-2">✅ This Tool</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Real-time ads from Google</li>
            <li>• Complete competitor visibility</li>
            <li>• AI-driven messaging insights</li>
            <li>• Instant ad + keyword generation</li>
          </ul>
        </div>

      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto mt-16 px-6 grid md:grid-cols-4 gap-6 text-center">

        <div className="bg-[#0a0f1c] p-5 rounded-xl">AI Headlines</div>
        <div className="bg-[#0a0f1c] p-5 rounded-xl">Ad Copy</div>
        <div className="bg-[#0a0f1c] p-5 rounded-xl">Keyword Strategy</div>
        <div className="bg-[#0a0f1c] p-5 rounded-xl">Competitor Gaps</div>

      </div>

      {/* TOOL */}
      <div className="max-w-3xl mx-auto mt-16 px-6 text-center">

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
          <h2 className="text-xl mb-4">AI Output</h2>
          <pre className="whitespace-pre-wrap text-gray-300">
            {adsOutput}
          </pre>
        </div>
      )}

      <div className="mt-20 py-10 border-t border-gray-800 text-center text-gray-500 text-sm">
        Built by Pranjal Digital • AI Marketing Tools
      </div>

    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
