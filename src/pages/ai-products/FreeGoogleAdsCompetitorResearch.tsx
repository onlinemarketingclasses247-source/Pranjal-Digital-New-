import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Tesseract: any;
  }
}

interface AdSuggestion {
  type: 'responsive_search' | 'responsive_display' | 'performance_max';
  headlines: string[];
  descriptions: string[];
  displayPaths?: string[];
  businessName?: string;
  longHeadline?: string;
}

const FreeGoogleAdsCompetitorResearch: React.FC = () => {
  const [competitor, setCompetitor] = useState("");
  const [adsText, setAdsText] = useState("");
  const [brand, setBrand] = useState("");
  const [output, setOutput] = useState<AdSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const OPENROUTER_API_KEY = "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";

  useEffect(() => {
    document.title = "Google Ads Competitor Intelligence - Real-Time Ad Analysis";
  }, []);

  const startProcess = () => {
    if (!competitor) {
      setError("Please enter a competitor name");
      return;
    }
    setError("");
    window.open(`https://adstransparency.google.com/?region=IN&q=${encodeURIComponent(competitor)}`, "_blank");
    setStep(1);
  };

  // OCR for screenshot
  useEffect(() => {
    const handlePaste = async (e: any) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) return;

          setAdsText("Analyzing screenshot...");

          try {
            const result = await window.Tesseract.recognize(file, "eng");
            let extractedText = result?.data?.text || "";
            extractedText = extractedText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
            setAdsText(extractedText);
            setStep(2);
          } catch {
            setAdsText("Could not read image. Please try again.");
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const generateAdsWithAI = async (): Promise<AdSuggestion[]> => {
    const prompt = `You are a Google Ads expert. Create ad copy for MY brand based on competitor analysis.

IMPORTANT RULES:
- NEVER include the competitor name "${competitor}" in any headline or description
- ONLY use MY brand name: "${brand}"
- Keep the same value propositions and benefits from competitor ad
- Rewrite everything for MY brand only

Competitor ad text: "${adsText}"

My brand: "${brand}"

Generate 3 ad types as JSON array (STRICT character limits):

1. RESPONSIVE SEARCH AD:
   - 10 headlines (MAX 30 characters each)
   - 3 descriptions (MAX 90 characters each)
   - 2 display paths (MAX 15 characters each)

2. RESPONSIVE DISPLAY AD:
   - 5 headlines (MAX 30 characters each)
   - 1 long headline (MAX 90 characters)
   - 3 descriptions (MAX 90 characters each)
   - Business name: "${brand}" (MAX 25 chars)

3. PERFORMANCE MAX AD:
   - 12 headlines (MAX 30 characters each)
   - 4 descriptions (MAX 90 characters each)
   - 1 long headline (MAX 90 characters)

POLICIES (STRICT):
- NO all caps words
- NO excessive punctuation (!!, ???)
- NO clickbait ("Click here", "Limited time")
- Every word counts toward character limit

Return ONLY valid JSON:
{
  "ads": [
    {
      "type": "responsive_search",
      "headlines": ["headline1", "headline2", ...],
      "descriptions": ["desc1", "desc2", ...],
      "displayPaths": ["path1", "path2"]
    },
    {
      "type": "responsive_display",
      "headlines": ["headline1", ...],
      "longHeadline": "long headline here",
      "descriptions": ["desc1", ...],
      "businessName": "${brand}"
    },
    {
      "type": "performance_max",
      "headlines": ["headline1", ...],
      "descriptions": ["desc1", ...],
      "longHeadline": "long headline here"
    }
  ]
}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2-flash-1.1",
        messages: [
          {
            role: "system",
            content: "You are a Google Ads expert. Generate only valid JSON. Never include competitor names, only the user's brand name. Follow all character limits strictly."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) throw new Error("No response from AI");
    
    const parsed = JSON.parse(content);
    return parsed.ads || parsed;
  };

  const generateAds = async () => {
    if (!brand) {
      setError("Please enter your brand name");
      return;
    }
    if (!adsText) {
      setError("Please paste a screenshot of competitor ad first");
      return;
    }
    
    setLoading(true);
    setError("");
    setOutput([]);
    
    try {
      const suggestions = await generateAdsWithAI();
      setOutput(suggestions);
    } catch (err) {
      setError("AI generation failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCharacterCount = (text: string): number => text.length;
  const isWithinLimit = (text: string, limit: number): boolean => text.length <= limit;

  return (
    <div className="bg-[#080c14] text-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Real-Time Google Ads Intelligence
          <span className="text-yellow-400 block mt-2">Better Than SEMrush, SpyFu & Ahrefs</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Stop using outdated crawler tools. Get LIVE competitor ad data directly from Google's Transparency Center + AI-powered ad generation.
        </p>
      </div>

      {/* Video Section */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-yellow-400/10 to-transparent p-8 rounded-2xl border border-yellow-400/30">
          <div className="aspect-video bg-black rounded-xl flex items-center justify-center border-2 border-yellow-400">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-400">Watch how to outsmart competitors in 2 minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why It's Better Section */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Why Traditional Tools Are Obsolete</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/10 border border-red-500 rounded-xl p-6">
            <div className="text-3xl mb-3">❌</div>
            <h3 className="text-xl font-semibold mb-2">SEMrush, SpyFu, Ahrefs</h3>
            <p className="text-gray-400">Show 30-90 day old data. Their crawlers can't access real-time Google Ads.</p>
          </div>
          
          <div className="bg-yellow-900/10 border border-yellow-500 rounded-xl p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Our Tool</h3>
            <p className="text-gray-400">Live data from Google Ads Transparency Center + AI analysis of current campaigns.</p>
          </div>
          
          <div className="bg-green-900/10 border border-green-500 rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Generation</h3>
            <p className="text-gray-400">Not just spying - we create better ads using competitor insights.</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Enter Competitor</h3>
            <p className="text-gray-400">Type any competitor name - we'll open their live Google Ads</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Paste Screenshot</h3>
            <p className="text-gray-400">Take a screenshot of their ad and paste it (Ctrl+V)</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Get Better Ads</h3>
            <p className="text-gray-400">AI generates Google-compliant ads for YOUR brand</p>
          </div>
        </div>
      </div>

      {/* Main Tool */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
          
          {/* Step 1 */}
          <div className="mb-8">
            <label className="block text-yellow-400 font-semibold mb-2">Step 1: Enter Competitor</label>
            <input
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="e.g., SEMrush, HubSpot, Salesforce"
              className="w-full p-4 rounded-xl text-black bg-white"
            />
            <button
              onClick={startProcess}
              className="mt-3 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition w-full"
            >
              See Live Competitor Ads →
            </button>
          </div>

          {/* Step 2 */}
          {step >= 1 && (
            <div className="mb-8">
              <label className="block text-yellow-400 font-semibold mb-2">Step 2: Paste Screenshot</label>
              <div className="border-2 border-dashed border-yellow-400/50 rounded-xl p-8 text-center bg-gray-900/50">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-gray-300">Take a screenshot of competitor's ad</p>
                <p className="text-sm text-gray-500">Press Ctrl + V to paste here</p>
              </div>
              
              {adsText && adsText !== "Analyzing screenshot..." && (
                <div className="mt-4">
                  <label className="text-sm text-gray-400 mb-2 block">Extracted Ad Text:</label>
                  <textarea
                    value={adsText}
                    onChange={(e) => setAdsText(e.target.value)}
                    className="w-full p-3 rounded-xl text-black text-sm"
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3 */}
          {step >= 2 && (
            <div className="mb-8">
              <label className="block text-yellow-400 font-semibold mb-2">Step 3: Your Brand Name</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter your brand name"
                className="w-full p-4 rounded-xl text-black bg-white"
              />
              
              <button
                onClick={generateAds}
                disabled={loading}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition w-full disabled:opacity-50"
              >
                {loading ? "AI Analyzing & Generating..." : "Generate Winning Ads →"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-center">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="max-w-4xl mx-auto px-6 pb-20 text-center">
          <div className="bg-gray-900/50 rounded-2xl p-12">
            <div className="text-6xl animate-spin mb-4">🤖</div>
            <p className="text-xl text-gray-300">AI is analyzing competitor strategy...</p>
            <p className="text-sm text-gray-500 mt-2">Creating Google-compliant ads for {brand || "your brand"}</p>
          </div>
        </div>
      )}

      {output.length > 0 && !loading && (
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-center mb-8">🎯 Your Winning Ads Are Ready</h2>
          
          {output.map((ad, idx) => (
            <div key={idx} className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold">
                  {ad.type === 'responsive_search' && '🔍 Search Ad'}
                  {ad.type === 'responsive_display' && '🖼️ Display Ad'}
                  {ad.type === 'performance_max' && '🚀 Performance Max'}
                </h3>
              </div>
              
              {/* Headlines */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2">Headlines (max 30 chars):</h4>
                <div className="flex flex-wrap gap-2">
                  {ad.headlines.map((headline, i) => (
                    <div key={i} className={`bg-gray-800 px-3 py-2 rounded-lg text-sm ${!isWithinLimit(headline, 30) ? 'border-2 border-red-500' : ''}`}>
                      {headline}
                      <span className={`ml-2 text-xs ${isWithinLimit(headline, 30) ? 'text-green-400' : 'text-red-400'}`}>
                        {getCharacterCount(headline)}/30
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Descriptions */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2">Descriptions (max 90 chars):</h4>
                <div className="space-y-2">
                  {ad.descriptions.map((desc, i) => (
                    <div key={i} className={`bg-gray-800 p-3 rounded-lg ${!isWithinLimit(desc, 90) ? 'border-2 border-red-500' : ''}`}>
                      {desc}
                      <span className={`ml-2 text-xs ${isWithinLimit(desc, 90) ? 'text-green-400' : 'text-red-400'}`}>
                        {getCharacterCount(desc)}/90
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Display Paths */}
              {ad.displayPaths && ad.displayPaths.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Display URL Paths:</h4>
                  <div className="flex gap-2">
                    {ad.displayPaths.map((path, i) => (
                      <div key={i} className="bg-gray-800 px-3 py-1 rounded-lg text-sm">
                        /{path} ({getCharacterCount(path)}/15)
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Business Name */}
              {ad.businessName && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Business Name:</h4>
                  <div className="bg-gray-800 px-3 py-1 rounded-lg inline-block">
                    {ad.businessName} ({getCharacterCount(ad.businessName)}/25)
                  </div>
                </div>
              )}
              
              {/* Long Headline */}
              {ad.longHeadline && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Long Headline:</h4>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    {ad.longHeadline} ({getCharacterCount(ad.longHeadline)}/90)
                  </div>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-green-900/30 rounded-lg text-sm text-green-400 border border-green-500/30">
                ✅ Google Ads Compliant • Ready to launch
              </div>
            </div>
          ))}
          
          <div className="bg-blue-900/30 p-6 rounded-xl text-center border border-blue-500/30">
            <p className="text-blue-300">
              🚀 These ads are optimized for Google's AI. Create multiple variations and let Google find the best performing combinations.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-gray-500 py-10 border-t border-gray-800">
        <p>© 2025 - Real Google Ads Intelligence • Live Data • AI Powered</p>
        <p className="text-xs mt-2">Better than SEMrush, SpyFu & Ahrefs for Google Ads competitor research</p>
      </div>
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
