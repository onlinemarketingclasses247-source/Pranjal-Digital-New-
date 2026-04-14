import React, { useEffect, useState } from "react";

const FreeGoogleAdsCompetitorResearch = () => {
  const [company, setCompany] = useState("");
  const [step, setStep] = useState(0);
  const [adsText, setAdsText] = useState("");
  const [brand, setBrand] = useState("");
  const [adsOutput, setAdsOutput] = useState("");
  const [loading, setLoading] = useState(false);

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

    setTimeout(() => setStep(2), 2000);
    setTimeout(() => setStep(3), 4000);
  };

  // ✅ OCR (UNCHANGED)
  useEffect(() => {
    const handlePaste = async (e) => {
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

  // ✅ API CALL FIXED
  const generateAds = async () => {
    if (!brand) return alert("Enter your brand");

    setLoading(true);

    try {
      const res = await fetch("/api/generateAds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand,
          company,
          adsText,
        }),
      });

      const data = await res.json();

      setAdsOutput(
        data?.choices?.[0]?.message?.content || "No response from API"
      );
    } catch (error) {
      console.error(error);
      setAdsOutput("❌ API failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#080c14] text-white">

      {/* HERO */}
      <div className="max-w-6xl mx-auto text-center py-20 px-6">
        <h1 className="text-5xl font-bold">
          Google Ads Competitor Research Tool
        </h1>

        <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
          Stop relying on outdated data from tools like SEMrush, Ahrefs, or SpyFu.
          <br /><br />
          This tool pulls <span className="text-white font-semibold">live ads directly from Google Ads Transparency Center</span>,
          extracts them using image parsing, and uses AI to generate better ads.
          <br /><br />
          Get headlines, descriptions, and keyword ideas instantly for your brand.
        </p>

        {/* VIDEO */}
        <div className="mt-10 flex justify-center">
          <div className="aspect-square w-full max-w-[360px] rounded-xl overflow-hidden border border-yellow-500/30 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
            <div className="w-full h-full flex items-center justify-center bg-black text-gray-500">
              YouTube Video
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          ✔ Real Google Data &nbsp;&nbsp; ✔ AI Powered &nbsp;&nbsp; ✔ No Crawlers
        </div>
      </div>

      {/* WHAT YOU GET */}
      <div className="max-w-5xl mx-auto mt-20 px-6 grid md:grid-cols-2 gap-6">

        <div className="bg-[#0a0f1c] p-6 rounded-xl">
          🧠 AI Ad Copy
        </div>

        <div className="bg-[#0a0f1c] p-6 rounded-xl">
          🎯 Keyword Suggestions
        </div>

        <div className="bg-[#0a0f1c] p-6 rounded-xl">
          🔍 Competitor Insights
        </div>

        <div className="bg-[#0a0f1c] p-6 rounded-xl">
          ⚡ Faster Campaign Setup
        </div>

      </div>

      {/* TOOL */}
      <div className="max-w-3xl mx-auto mt-20 px-6 text-center">

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
        <div className="max-w-4xl mx-auto mt-10 bg-[#0a0f1c] p-6 rounded-xl px-6">
          <pre className="whitespace-pre-wrap">{adsOutput}</pre>
        </div>
      )}

      <div className="mt-20 py-10 border-t border-gray-800 text-center text-gray-500 text-sm">
        Built by Pranjal Digital
      </div>

    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
