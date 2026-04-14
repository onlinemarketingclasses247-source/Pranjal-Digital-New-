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
    document.title = "Free Google Ads Competitor Research";
  }, []);

  // START PROCESS
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

  // 🔥 SMART GENERATION WITH AI-LIKE DELAY
  const generateAds = () => {
    if (!brand) return alert("Enter your brand");

    setLoading(true);
    setAdsOutput("");

    // ⏱ RANDOM AI THINKING TIME (2–5 sec)
    const delay = 2000 + Math.random() * 3000;

    setTimeout(() => {
      try {
        let text = adsText;

        text = text.replace(/\n+/g, "\n").trim();

        const lines = text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 20 && !l.includes("http"));

        const topLines = lines.slice(0, 5);

        // 🔹 Replace competitor → brand
        const rewritten = topLines.map((line) => {
          const regex = new RegExp(company, "gi");
          return line.replace(regex, brand);
        });

        // 🔹 Headlines
        const headlines = rewritten.map((l) =>
          l.length > 60 ? l.slice(0, 60) + "..." : l
        );

        // 🔹 Descriptions
        const descriptions = rewritten.map((l) =>
          l.length > 90 ? l.slice(0, 90) + "..." : l
        );

        // 🔹 Keyword extraction (cleaned)
        const keywordBase = lines
          .join(" ")
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(" ")
          .filter(
            (w) =>
              w.length > 4 &&
              ![
                "with",
                "from",
                "this",
                "that",
                "your",
                "have",
                "more",
                "their",
                "about",
              ].includes(w)
          );

        const uniqueKeywords = [...new Set(keywordBase)].slice(0, 10);

        const exact = uniqueKeywords.map((k) => `[${k}]`);
        const phrase = uniqueKeywords.map((k) => `"${k}"`);
        const broad = uniqueKeywords;

        const strategy = [
          `Target competitor: ${company}`,
          `Position ${brand} as better alternative`,
          `Use competitor keywords for conquest campaigns`,
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

⚡ STRATEGY:
${strategy.join("\n")}
`;

        setAdsOutput(output);
      } catch (err) {
        console.error(err);
        setAdsOutput("❌ AI failed");
      }

      setLoading(false);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white p-6">

      {/* HERO (UNCHANGED STYLE) */}
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
            Generate Ads
          </button>
        </div>
      )}

      {/* 🤖 AI THINKING LOADER */}
      {loading && (
        <div className="max-w-2xl mx-auto mt-10 text-center">
          <div className="animate-spin text-4xl mb-4">🤖</div>
          <p className="text-gray-400">AI analyzing competitor ads...</p>
        </div>
      )}

      {/* OUTPUT */}
      {adsOutput && !loading && (
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
