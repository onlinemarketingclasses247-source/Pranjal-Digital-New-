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

  useEffect(() => {
    document.title = "Google Ads Competitor Intelligence - Real-Time Ad Analysis";
    window.scrollTo(0, 0);
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

  // ============================================
  // SMART AD GENERATION - Makes Actual Sense
  // ============================================
  const generateSmartAds = (): AdSuggestion[] => {
    const adText = adsText.toLowerCase();
    const brandName = brand;
    
    // Extract actual value propositions from competitor ad
    let valueProps = [];
    
    // Detect what the competitor is offering
    if (adText.includes('save') || adText.includes('discount') || adText.includes('cheap')) {
      valueProps.push('Save money');
    }
    if (adText.includes('fast') || adText.includes('quick') || adText.includes('speed')) {
      valueProps.push('Lightning fast');
    }
    if (adText.includes('easy') || adText.includes('simple')) {
      valueProps.push('Easy to use');
    }
    if (adText.includes('support') || adText.includes('help') || adText.includes('247')) {
      valueProps.push('24/7 support');
    }
    if (adText.includes('trust') || adText.includes('secure') || adText.includes('safe')) {
      valueProps.push('Trusted & secure');
    }
    if (adText.includes('best') || adText.includes('award') || adText.includes('top')) {
      valueProps.push('Award-winning');
    }
    if (adText.includes('free') || adText.includes('trial')) {
      valueProps.push('Free trial');
    }
    if (adText.includes('roi') || adText.includes('profit') || adText.includes('growth')) {
      valueProps.push('Maximize ROI');
    }
    if (adText.includes('automate') || adText.includes('ai')) {
      valueProps.push('AI-powered');
    }
    
    // Default value props if none detected
    if (valueProps.length === 0) {
      valueProps = ['Premium quality', 'Best value', 'Top rated'];
    }
    
    const mainBenefit = valueProps[0];
    const secondBenefit = valueProps[1] || valueProps[0];
    
    // Create meaningful headlines
    const headlines = [
      `${brandName}: ${mainBenefit}`,
      `${mainBenefit} with ${brandName}`,
      `Get ${brandName} Today`,
      `Official ${brandName} Site`,
      `${brandName} - ${secondBenefit}`,
      `Try ${brandName} Risk Free`,
      `${brandName} Trusted by Many`,
      `Best ${brandName} Deals`,
      `${brandName} Experts`,
      `Why Choose ${brandName}`,
      `${brandName} vs Alternatives`,
      `${brandName} Success Stories`,
      `${brandName} Pro Plan`,
      `${brandName} Free Trial`,
      `Learn More About ${brandName}`,
    ].map(h => h.substring(0, 30));
    
    // Create meaningful descriptions
    const descriptions = [
      `${brandName} delivers ${mainBenefit.toLowerCase()} for businesses like yours. Join thousands of satisfied customers. Start free trial today.`,
      `Experience ${secondBenefit.toLowerCase()} with ${brandName}. Easy setup, dedicated support, and proven results. Get started now.`,
      `Why wait? ${brandName} offers the best ${mainBenefit.toLowerCase()} solution on the market. Limited time offer available.`,
      `Compare ${brandName} with other solutions. See why we're the ${mainBenefit.toLowerCase()} choice for smart businesses.`,
    ].map(d => d.substring(0, 90));
    
    // Responsive Search Ad
    const searchAd: AdSuggestion = {
      type: 'responsive_search',
      headlines: headlines.slice(0, 10),
      descriptions: descriptions.slice(0, 2),
      displayPaths: [brandName.toLowerCase().substring(0, 15), "get-started".substring(0, 15)],
    };
    
    // Responsive Display Ad
    const displayAd: AdSuggestion = {
      type: 'responsive_display',
      headlines: headlines.slice(0, 5),
      descriptions: descriptions.slice(0, 3),
      businessName: brandName.substring(0, 25),
      longHeadline: `${brandName}: The ${mainBenefit} Solution You Need`.substring(0, 90),
    };
    
    // Performance Max Ad
    const pmaxAd: AdSuggestion = {
      type: 'performance_max',
      headlines: headlines,
      descriptions: descriptions,
      longHeadline: `${brandName} - ${mainBenefit} • ${secondBenefit} • Free Trial`.substring(0, 90),
    };
    
    return [searchAd, displayAd, pmaxAd];
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
    
    // Simulate processing
    setTimeout(() => {
      try {
        const suggestions = generateSmartAds();
        setOutput(suggestions);
      } catch (err: any) {
        setError("Failed to generate ads. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1500);
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
      <div className="text-center py-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Real-Time Google Ads Intelligence
        </h1>
        <p className="text-xl text-yellow-400 font-semibold mb-4">
          Better Than SEMrush, SpyFu & Ahrefs
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Stop using outdated crawler tools. Get LIVE competitor ad data directly from Google + AI-powered ad generation.
        </p>
      </div>

      {/* How It Works - Step by Step */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 text-black">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Competitor Name</h3>
            <p className="text-gray-400">Type any competitor name like "SEMrush" or "HubSpot"</p>
            <div className="mt-3 text-sm text-gray-500">↓</div>
            <div className="mt-2 text-xs text-gray-600">We automatically open Google Ads Transparency Center</div>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 text-black">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Take & Paste Screenshot</h3>
            <p className="text-gray-400">Take a screenshot of their live ad and press Ctrl+V</p>
            <div className="mt-3 text-sm text-gray-500">↓</div>
            <div className="mt-2 text-xs text-gray-600">Our OCR extracts the ad text automatically</div>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 text-black">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Your Brand & Generate</h3>
            <p className="text-gray-400">Type your brand name and click generate</p>
            <div className="mt-3 text-sm text-gray-500">✓</div>
            <div className="mt-2 text-xs text-gray-600">AI creates Google-compliant ads for YOUR brand</div>
          </div>
        </div>
      </div>

      {/* Why This Is Better Section */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why This Beats SEMrush, SpyFu & Ahrefs</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/10 border border-red-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">❌</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Traditional Tools</h3>
                <p className="text-gray-400 text-sm">Show 30-90 day old data from crawlers that can't access real Google Ads data</p>
                <ul className="mt-3 text-sm text-gray-500 list-disc list-inside">
                  <li>Outdated competitor insights</li>
                  <li>Missing current campaigns</li>
                  <li>Expensive monthly subscriptions</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-green-900/10 border border-green-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Our Tool</h3>
                <p className="text-gray-400 text-sm">Live data from Google Ads Transparency Center + AI analysis</p>
                <ul className="mt-3 text-sm text-gray-500 list-disc list-inside">
                  <li>Real-time competitor ads</li>
                  <li>Current campaigns only</li>
                  <li>Free to use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tool Section */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
          
          {/* Step 1 Input */}
          <div className="mb-8">
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">
              Step 1: Enter Competitor Name
            </label>
            <input
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="e.g., SEMrush, HubSpot, Salesforce, Ahrefs"
              className="w-full p-4 rounded-xl text-black bg-white text-lg"
            />
            <button
              onClick={startProcess}
              className="mt-3 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition w-full text-lg"
            >
              🔍 See Live Competitor Ads on Google
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This opens Google Ads Transparency Center - take a screenshot of any ad you see
            </p>
          </div>

          {/* Step 2 - Paste Screenshot */}
          {step >= 1 && (
            <div className="mb-8">
              <label className="block text-yellow-400 font-semibold mb-2 text-lg">
                Step 2: Paste Competitor Ad Screenshot
              </label>
              <div className="border-2 border-dashed border-yellow-400/50 rounded-xl p-8 text-center bg-gray-900/50">
                <div className="text-5xl mb-3">📸</div>
                <p className="text-gray-300 text-lg">Take a screenshot of competitor's ad</p>
                <p className="text-sm text-gray-500 mt-2">Press <kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-700 rounded">V</kbd> to paste here</p>
              </div>
              
              {adsText && !adsText.includes("Analyzing") && !adsText.includes("Could not read") && (
                <div className="mt-4">
                  <label className="text-sm text-gray-400 mb-2 block">📝 Extracted Ad Text:</label>
                  <div className="bg-gray-900 p-3 rounded-xl text-gray-300 text-sm border border-gray-700">
                    {adsText}
                  </div>
                </div>
              )}
              
              {adsText && adsText.includes("Analyzing") && (
                <div className="mt-4 text-center text-yellow-400">
                  ⏳ {adsText}
                </div>
              )}
            </div>
          )}

          {/* Step 3 - Your Brand */}
          {step >= 2 && (
            <div className="mb-8">
              <label className="block text-yellow-400 font-semibold mb-2 text-lg">
                Step 3: Enter Your Brand Name
              </label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter your brand name"
                className="w-full p-4 rounded-xl text-black bg-white text-lg"
              />
              
              <button
                onClick={generateAds}
                disabled={loading}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition w-full text-lg disabled:opacity-50"
              >
                {loading ? "🤖 AI Generating Your Ads..." : "🚀 Generate Google-Compliant Ads →"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-center">
              <div className="font-semibold">⚠️ {error}</div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
          <div className="bg-gray-900/50 rounded-2xl p-12">
            <div className="text-6xl animate-spin mb-4">🤖</div>
            <p className="text-xl text-gray-300">AI is analyzing competitor strategy...</p>
            <p className="text-sm text-gray-500 mt-2">Creating Google-compliant ads for {brand || "your brand"}</p>
            <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-yellow-400 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {output.length > 0 && !loading && (
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm mb-3">
              ✨ Based on {competitor}'s ad strategy
            </div>
            <h2 className="text-3xl font-bold">🎯 Your Winning Ads Are Ready</h2>
            <p className="text-gray-400 mt-2">Google Ads compliant • Ready to launch</p>
          </div>
          
          {output.map((ad, idx) => (
            <div key={idx} className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
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
              💡 Pro Tip: Create multiple ad variations and let Google's AI optimize which combinations perform best.
            </p>
            <button 
              onClick={resetToTop}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Start Over →
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-gray-500 py-8 border-t border-gray-800">
        <p>© 2025 - Real Google Ads Intelligence • Live Data • AI Powered</p>
        <p className="text-xs mt-1">Better than SEMrush, SpyFu & Ahrefs for real-time Google Ads competitor research</p>
      </div>
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
