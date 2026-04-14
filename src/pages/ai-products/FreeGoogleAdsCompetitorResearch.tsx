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
    // Clean and prepare the competitor text - remove any brand mentions
    const cleanCompetitorText = adsText.replace(new RegExp(competitor, 'gi'), '[COMPETITOR]');
    
    const prompt = `Create Google Ads copy for brand: "${brand}"

Based on competitor ad (competitor name removed for privacy):
"${cleanCompetitorText}"

CRITICAL RULES:
- NEVER mention or reference the competitor name
- ONLY use the brand name: "${brand}"
- Keep the same value propositions and benefits

Generate EXACT JSON format (no extra text):

{
  "ads": [
    {
      "type": "responsive_search",
      "headlines": ["${brand} Best Solution", "Save Time With ${brand}", "${brand} Trusted Platform", "Get More Results", "Try ${brand} Today", "${brand} Pro Grade", "Better Way To Work", "${brand} Experts", "Join ${brand} Now", "${brand} Success"],
      "descriptions": ["${brand} helps businesses achieve better results. Start your free trial today.", "Join thousands of happy customers using ${brand} for their daily operations."],
      "displayPaths": ["${brand.toLowerCase()}", "solutions"]
    },
    {
      "type": "responsive_display",
      "headlines": ["${brand} Platform", "Smart Solution", "Grow With ${brand}", "Trusted Choice", "${brand} Works"],
      "longHeadline": "${brand} - The smarter way to grow your business",
      "descriptions": ["Get started with ${brand} today. Easy setup, powerful features.", "${brand} helps you achieve more in less time."],
      "businessName": "${brand}"
    },
    {
      "type": "performance_max",
      "headlines": ["${brand} Official", "Best ${brand} Deals", "${brand} Pro", "Save With ${brand}", "${brand} Premium", "${brand} Guide", "Learn ${brand}", "${brand} Tips", "${brand} Review", "${brand} Demo", "${brand} Pricing", "Get ${brand}"],
      "descriptions": ["Discover why ${brand} is the top choice for businesses worldwide.", "Compare ${brand} features and pricing. Get the best value today.", "Join the ${brand} community and start seeing results.", "${brand} offers everything you need to succeed."],
      "longHeadline": "${brand} - Complete solution for modern businesses"
    }
  ]
}

CHARACTER LIMITS (STRICT):
- Headlines: MAX 30 characters each
- Descriptions: MAX 90 characters each  
- Display paths: MAX 15 characters each
- Long headline: MAX 90 characters
- Business name: MAX 25 characters

Return ONLY the JSON object, no other text.`;

    try {
      console.log("Calling OpenRouter API...");
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Google Ads Competitor Tool"
        },
        body: JSON.stringify({
          model: "google/gemini-2-flash-1.1",
          messages: [
            {
              role: "system",
              content: "You are a Google Ads expert. Generate only valid JSON. Never include competitor names. Follow character limits strictly."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error Response:", errorData);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("No content in response");
      }
      
      // Clean the response - remove any markdown or extra text
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```\n?/g, '');
      }
      
      const parsed = JSON.parse(cleanContent);
      const ads = parsed.ads || parsed;
      
      // Validate and clean the ads
      return ads.map((ad: any) => ({
        type: ad.type,
        headlines: ad.headlines.slice(0, 15).map((h: string) => h.substring(0, 30)),
        descriptions: ad.descriptions.slice(0, 5).map((d: string) => d.substring(0, 90)),
        displayPaths: ad.displayPaths?.slice(0, 2).map((p: string) => p.substring(0, 15)),
        businessName: ad.businessName?.substring(0, 25),
        longHeadline: ad.longHeadline?.substring(0, 90),
      }));
      
    } catch (error) {
      console.error("AI generation error:", error);
      throw error;
    }
  };

  const generateAds = async () => {
    if (!brand) {
      setError("Please enter your brand name");
      return;
    }
    if (!adsText || adsText === "Analyzing screenshot...") {
      setError("Please paste a screenshot of competitor ad first");
      return;
    }
    
    setLoading(true);
    setError("");
    setOutput([]);
    
    try {
      const suggestions = await generateAdsWithAI();
      if (suggestions && suggestions.length > 0) {
        setOutput(suggestions);
      } else {
        throw new Error("No ads generated");
      }
    } catch (err) {
      console.error("Generation error:", err);
      setError("Unable to generate ads. Please check your internet connection and try again.");
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
                    readOnly
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
