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

  // ============================================
  // 🔑 ENVIRONMENT VARIABLES - MUST start with REACT_APP_
  // ============================================
  
  // Your OpenRouter API Key
  const OPENROUTER_API_KEY = process.env.REACT_APP_OPEN_ROUTER_KEY || "";
  
  // Your Hugging Face API Key  
  const HF_API_KEY = process.env.REACT_APP_HF_API_KEY || "";
  
  // Fallback hardcoded key (if env vars don't work)
  const FALLBACK_OPENROUTER_KEY = "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";
  
  // Use env var or fallback
  const activeOpenRouterKey = OPENROUTER_API_KEY || FALLBACK_OPENROUTER_KEY;
  const activeHfKey = HF_API_KEY || "hf_YOUR_TOKEN_HERE";

  // ============================================
  // AI PROVIDER SELECTION
  // ============================================
  const [aiProvider, setAiProvider] = useState<"openrouter" | "huggingface">("openrouter");

  useEffect(() => {
    document.title = "Google Ads Competitor Intelligence - Real-Time Ad Analysis";
    window.scrollTo(0, 0);
    
    // Debug logging
    console.log("REACT_APP_OPEN_ROUTER_KEY exists:", !!process.env.REACT_APP_OPEN_ROUTER_KEY);
    console.log("Using OpenRouter Key:", activeOpenRouterKey ? "Yes (length: " + activeOpenRouterKey.length + ")" : "No");
    console.log("Using HF Key:", activeHfKey ? "Yes" : "No");
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

          setAdsText("📸 Analyzing screenshot with OCR...");

          try {
            const result = await window.Tesseract.recognize(file, "eng");
            let extractedText = result?.data?.text || "";
            extractedText = extractedText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
            setAdsText(extractedText);
            setStep(2);
          } catch {
            setAdsText("❌ Could not read image. Please try again.");
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const generateAdsWithAI = async (): Promise<AdSuggestion[]> => {
    const prompt = `Create Google Ads copy for brand: "${brand}"

Based on this competitor ad text:
"${adsText.substring(0, 800)}"

STRICT RULES:
- NEVER mention competitor name
- ONLY use brand: "${brand}"
- Follow Google Ads policies (no all caps, no clickbait, no excessive punctuation)

Return ONLY valid JSON (no markdown, no extra text):
{
  "ads": [
    {
      "type": "responsive_search",
      "headlines": ["${brand} Best", "Save With ${brand}", "Get ${brand} Now", "Try ${brand} Free", "${brand} Pro", "${brand} Works", "${brand} Guide", "${brand} Tips", "${brand} Demo", "${brand} Pricing"],
      "descriptions": ["${brand} helps you achieve better results. Start free trial today.", "Join thousands using ${brand} for success."],
      "displayPaths": ["${brand.toLowerCase()}", "go"]
    },
    {
      "type": "responsive_display",
      "headlines": ["${brand} Platform", "Smart ${brand}", "Grow With ${brand}", "Trusted ${brand}", "${brand} Pro"],
      "longHeadline": "${brand} - The smarter way to grow",
      "descriptions": ["Get started with ${brand} today. Easy to use.", "${brand} helps you achieve more."],
      "businessName": "${brand}"
    },
    {
      "type": "performance_max",
      "headlines": ["${brand} Official", "${brand} Pro", "Save With ${brand}", "${brand} Premium", "${brand} Guide", "Learn ${brand}", "${brand} Tips", "${brand} Review", "${brand} Demo", "${brand} Pricing", "Get ${brand}", "Best ${brand}"],
      "descriptions": ["${brand} is the top choice for businesses.", "Join ${brand} community today.", "${brand} offers everything you need.", "Start with ${brand} now."],
      "longHeadline": "${brand} - Complete business solution"
    }
  ]
}`;

    if (aiProvider === "openrouter") {
      return await callOpenRouter(prompt);
    } else {
      return await callHuggingFace(prompt);
    }
  };

  // ============================================
  // OPENROUTER API CALL (Using the key)
  // ============================================
  const callOpenRouter = async (prompt: string): Promise<AdSuggestion[]> => {
    if (!activeOpenRouterKey) {
      throw new Error("OpenRouter API key not configured. Please add REACT_APP_OPEN_ROUTER_KEY in environment variables.");
    }
    
    console.log("Calling OpenRouter API...");
    
    const freeModels = [
      "qwen/qwen3.6-plus-preview:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "nvidia/nemotron-3-super:free",
      "openrouter/free"
    ];
    
    let lastError = null;
    
    for (const model of freeModels) {
      try {
        console.log(`Trying model: ${model}`);
        
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${activeOpenRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "Google Ads Competitor Tool"
          },
          body: JSON.stringify({
            model: model,
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
            max_tokens: 2000,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          
          if (content) {
            let cleanContent = content.trim();
            if (cleanContent.startsWith('```json')) {
              cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            }
            if (cleanContent.startsWith('```')) {
              cleanContent = cleanContent.replace(/```\n?/g, '');
            }
            
            const parsed = JSON.parse(cleanContent);
            const ads = parsed.ads || parsed;
            console.log(`Success with model: ${model}`);
            return formatAds(ads);
          }
        } else {
          const errorText = await response.text();
          console.warn(`Model ${model} failed:`, response.status);
          lastError = `Model ${model} failed: ${response.status}`;
        }
      } catch (err) {
        console.warn(`Error with model ${model}:`, err);
        lastError = err;
      }
    }
    
    throw new Error(`OpenRouter API Error: All models failed. ${lastError}`);
  };

  // ============================================
  // HUGGING FACE API CALL
  // ============================================
  const callHuggingFace = async (prompt: string): Promise<AdSuggestion[]> => {
    if (!activeHfKey || activeHfKey === "hf_YOUR_TOKEN_HERE") {
      throw new Error("Hugging Face API key not configured. Please add REACT_APP_HF_API_KEY in environment variables.");
    }
    
    console.log("Calling Hugging Face API...");
    
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${activeHfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `<|begin_of_text|><|start_header_id|>user<|end_header_id|>
${prompt}
<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
        parameters: {
          max_new_tokens: 2000,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Hugging Face Error:", response.status, errorData);
      throw new Error(`Hugging Face API Error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data[0]?.generated_text || "";
    
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    
    const parsed = JSON.parse(jsonMatch[0]);
    const ads = parsed.ads || parsed;
    return formatAds(ads);
  };

  const formatAds = (ads: any[]): AdSuggestion[] => {
    return ads.map((ad: any) => ({
      type: ad.type,
      headlines: ad.headlines.slice(0, 15).map((h: string) => {
        let cleaned = h.replace(new RegExp(competitor, 'gi'), '');
        return cleaned.substring(0, 30);
      }),
      descriptions: ad.descriptions.slice(0, 5).map((d: string) => {
        let cleaned = d.replace(new RegExp(competitor, 'gi'), '');
        return cleaned.substring(0, 90);
      }),
      displayPaths: ad.displayPaths?.slice(0, 2).map((p: string) => p.substring(0, 15)),
      businessName: ad.businessName?.substring(0, 25),
      longHeadline: ad.longHeadline?.substring(0, 90),
    }));
  };

  const generateAds = async () => {
    if (!brand) {
      setError("Please enter your brand name");
      return;
    }
    if (!adsText || adsText.includes("Analyzing") || adsText.includes("Could not read")) {
      setError("Please paste a valid screenshot of competitor ad first");
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
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCharacterCount = (text: string): number => text.length;

  const resetToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(0);
    setCompetitor("");
    setAdsText("");
    setBrand("");
    setOutput([]);
    setError("");
  };

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

      {/* AI Provider Selector */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
          <label className="block text-sm text-gray-400 mb-2">🤖 AI Provider:</label>
          <div className="flex gap-4">
            <button
              onClick={() => setAiProvider("openrouter")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                aiProvider === "openrouter"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              OpenRouter
            </button>
            <button
              onClick={() => setAiProvider("huggingface")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                aiProvider === "huggingface"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Hugging Face
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {aiProvider === "openrouter" 
              ? "Using OpenRouter with free models (Qwen, Llama, Nemotron)" 
              : "Using Hugging Face with Llama 3 model"}
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-yellow-400/10 to-transparent p-8 rounded-2xl border border-yellow-400/30">
          <div className="aspect-video bg-black rounded-xl flex items-center justify-center border-2 border-yellow-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-gray-400">Watch demo - 2 minutes to better ads</p>
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
              
              {adsText && !adsText.includes("Analyzing") && !adsText.includes("Could not read") && (
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
              
              {adsText && adsText.includes("Analyzing") && (
                <div className="mt-4 text-center text-yellow-400">
                  {adsText}
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
                {loading ? "🤖 AI Generating Your Ads..." : "🚀 Generate Winning Ads →"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-center">
              <div className="font-semibold mb-1">⚠️ {error}</div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-4xl mx-auto px-6 pb-20 text-center">
          <div className="bg-gray-900/50 rounded-2xl p-12">
            <div className="text-6xl animate-spin mb-4">🤖</div>
            <p className="text-xl text-gray-300">AI is analyzing competitor strategy...</p>
            <p className="text-sm text-gray-500 mt-2">Creating Google-compliant ads for {brand || "your brand"}</p>
            <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-yellow-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {output.length > 0 && !loading && (
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm mb-4">
              ✨ AI Generated Ads
            </div>
            <h2 className="text-3xl font-bold">🎯 Your Winning Ads Are Ready</h2>
            <p className="text-gray-400 mt-2">Google Ads compliant • Ready to launch</p>
          </div>
          
          {output.map((ad, idx) => (
            <div key={idx} className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold">
                  {ad.type === 'responsive_search' && '🔍 Responsive Search Ad'}
                  {ad.type === 'responsive_display' && '🖼️ Responsive Display Ad'}
                  {ad.type === 'performance_max' && '🚀 Performance Max Ad'}
                </h3>
              </div>
              
              {/* Headlines */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2">Headlines (30 chars max):</h4>
                <div className="flex flex-wrap gap-2">
                  {ad.headlines.map((headline, i) => (
                    <div key={i} className="bg-gray-800 px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
                      {headline}
                      <span className="ml-2 text-xs text-green-400">
                        ({getCharacterCount(headline)}/30)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Descriptions */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2">Descriptions (90 chars max):</h4>
                <div className="space-y-2">
                  {ad.descriptions.map((desc, i) => (
                    <div key={i} className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
                      {desc}
                      <span className="ml-2 text-xs text-green-400">
                        ({getCharacterCount(desc)}/90)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Display Paths */}
              {ad.displayPaths && ad.displayPaths.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Display URL Paths (15 chars max):</h4>
                  <div className="flex gap-2">
                    {ad.displayPaths.map((path, i) => (
                      <div key={i} className="bg-gray-800 px-3 py-1 rounded-lg text-sm">
                        /{path}
                        <span className="ml-2 text-xs text-green-400">
                          ({getCharacterCount(path)}/15)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Business Name */}
              {ad.businessName && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Business Name (25 chars max):</h4>
                  <div className="bg-gray-800 px-3 py-1 rounded-lg inline-block">
                    {ad.businessName}
                    <span className="ml-2 text-xs text-green-400">
                      ({getCharacterCount(ad.businessName)}/25)
                    </span>
                  </div>
                </div>
              )}
              
              {/* Long Headline */}
              {ad.longHeadline && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Long Headline (90 chars max):</h4>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    {ad.longHeadline}
                    <span className="ml-2 text-xs text-green-400">
                      ({getCharacterCount(ad.longHeadline)}/90)
                    </span>
                  </div>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-green-900/30 rounded-lg text-sm text-green-400 border border-green-500/30">
                ✅ Google Ads Compliant • No competitor mentions • Ready to launch
              </div>
            </div>
          ))}
          
          <div className="bg-blue-900/30 p-6 rounded-xl text-center border border-blue-500/30">
            <p className="text-blue-300">
              🚀 These ads were generated by AI based on competitor analysis. 
              Create multiple variations and let Google's AI find the best performing combinations.
            </p>
            <button 
              onClick={resetToTop}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Analyze Another Competitor →
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-gray-500 py-10 border-t border-gray-800">
        <p>© 2025 - Real Google Ads Intelligence • Powered by AI</p>
        <p className="text-xs mt-2">Better than SEMrush, SpyFu & Ahrefs for real-time Google Ads competitor research</p>
      </div>
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
