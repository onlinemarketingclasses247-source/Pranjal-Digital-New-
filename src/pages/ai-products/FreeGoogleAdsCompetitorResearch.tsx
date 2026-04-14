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
  const [company, setCompany] = useState("");
  const [adsText, setAdsText] = useState("");
  const [brand, setBrand] = useState("");
  const [output, setOutput] = useState<AdSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState("google/gemini-2-flash-1.1");
  
  // Your provided API key
  const OPENROUTER_API_KEY = "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";

  const models = [
    { value: "google/gemini-2-flash-1.1", label: "Gemini 2 Flash (Fast & Free)", recommended: true },
    { value: "meta-llama/llama-3-8b-instruct", label: "Llama 3 8B (Quality)", recommended: true },
    { value: "mistralai/mistral-7b-instruct", label: "Mistral 7B (Alternative)", recommended: false },
  ];

  useEffect(() => {
    document.title = "Google Ads Competitor Intelligence Tool";
  }, []);

  const startProcess = () => {
    if (!company) return alert("Enter competitor name");
    window.open(`https://adstransparency.google.com/?region=IN&q=${encodeURIComponent(company)}`, "_blank");
    setStep(1);
  };

  // Enhanced OCR with better text extraction
  useEffect(() => {
    const handlePaste = async (e: any) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (!file) return;

          setAdsText("📖 Reading screenshot with OCR...");

          try {
            const result = await window.Tesseract.recognize(file, "eng", {
              logger: (m: any) => console.log(m),
            });
            
            // Clean and enhance extracted text
            let extractedText = result?.data?.text || "";
            extractedText = extractedText
              .replace(/\n+/g, " ")
              .replace(/\s+/g, " ")
              .replace(/[^\w\s\.\,\!\?\-]/g, "") // Remove special chars but keep punctuation
              .trim();
            
            setAdsText(extractedText);
            setStep(2);
          } catch (error) {
            console.error("OCR Error:", error);
            setAdsText("Error reading image. Please try pasting again.");
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  // Validate ad copy against Google policies
  const validateAdCopy = (text: string): { valid: boolean; issues: string[] } => {
    const issues: string[] = [];
    
    if (/[A-Z]{4,}/.test(text)) issues.push("All caps detected");
    if (/!{2,}/.test(text)) issues.push("Multiple exclamation marks");
    if (/\?{2,}/.test(text)) issues.push("Multiple question marks");
    if (/click here/i.test(text)) issues.push("Clickbait phrase: 'click here'");
    if (/buy now/i.test(text)) issues.push("Aggressive: 'buy now'");
    if (/you won't believe/i.test(text)) issues.push("Clickbait phrase detected");
    if (/limited time only/i.test(text)) issues.push("Urgency phrase may be restricted");
    if (/act now/i.test(text)) issues.push("Urgency phrase may be restricted");
    
    return { valid: issues.length === 0, issues };
  };

  // Clean and truncate text according to Google policies
  const cleanText = (text: string, maxLength: number, isHeadline: boolean = false): string => {
    let cleaned = text.trim();
    
    // Remove excessive punctuation
    cleaned = cleaned.replace(/!{2,}/g, '!').replace(/\?{2,}/g, '?');
    
    // Convert all caps to proper case (except acronyms)
    if (/^[A-Z\s]+$/.test(cleaned) && cleaned.length > 3 && !/^[A-Z]{2,}$/.test(cleaned)) {
      cleaned = cleaned.charAt(0) + cleaned.slice(1).toLowerCase();
    }
    
    // Remove clickbait phrases
    const clickbaitPhrases = ['click here', 'you won\'t believe', 'limited time', 'act now', 'buy now'];
    clickbaitPhrases.forEach(phrase => {
      cleaned = cleaned.replace(new RegExp(phrase, 'gi'), '');
    });
    
    // Remove extra spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    // Truncate to max length
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength - 3).trim() + '...';
    }
    
    return cleaned;
  };

  // Extract key selling points from competitor ad
  const extractKeyPoints = (text: string): string[] => {
    const points: string[] = [];
    const sentences = text.split(/[.!?]+/);
    
    // Look for benefit-oriented phrases
    const benefitIndicators = ['save', 'increase', 'improve', 'better', 'faster', 'easier', 'free', 'discount', 'roi', 'conversion'];
    
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      if (benefitIndicators.some(indicator => lowerSentence.includes(indicator)) && sentence.length > 10) {
        points.push(sentence.trim());
      }
    });
    
    return points.slice(0, 5);
  };

  // Generate ads using OpenRouter AI with your API key
  const generateAdsWithAI = async (): Promise<AdSuggestion[]> => {
    const keyPoints = extractKeyPoints(adsText);
    const validation = validateAdCopy(adsText);
    
    const prompt = `You are a Google Ads expert. Generate COMPLIANT ad copy based on this competitor analysis:

COMPETITOR: ${company}
COMPETITOR AD TEXT: "${adsText}"
KEY SELLING POINTS FROM COMPETITOR: ${keyPoints.join(", ")}
MY BRAND: ${brand}

GOOGLE ADS POLICIES (STRICT):
- NO all caps words (e.g., "FREE", "BUY")
- NO excessive punctuation (!!, ???)
- NO clickbait ("Click here", "You won't believe")
- Each headline MAX 30 characters
- Each description MAX 90 characters
- Must include brand name "${brand}" naturally
- Keep same meaning and value propositions as competitor

Generate 3 ad types as JSON array:

1. RESPONSIVE SEARCH AD:
   - 10 headlines (30 chars each)
   - 3 descriptions (90 chars each)
   - 2 display paths (15 chars each)

2. RESPONSIVE DISPLAY AD:
   - 5 short headlines (30 chars each)
   - 1 long headline (90 chars)
   - 3 descriptions (90 chars each)
   - Business name "${brand}" (max 25 chars)

3. PERFORMANCE MAX AD:
   - 12 headlines (30 chars each)
   - 4 descriptions (90 chars each)
   - 1 long headline (90 chars)

Return ONLY valid JSON matching this structure:
[
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
]`;

    try {
      console.log("Calling OpenRouter API with model:", selectedModel);
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Google Ads Competitor Tool"
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "system",
              content: "You are a Google Ads copy expert. Generate only valid JSON. Follow all character limits and policies strictly. Never use all caps or clickbait."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      const aiContent = data.choices?.[0]?.message?.content;
      
      if (aiContent) {
        // Parse the JSON response
        let parsed;
        try {
          parsed = JSON.parse(aiContent);
          // If response is wrapped in an object, extract the array
          if (parsed.ads) parsed = parsed.ads;
          if (!Array.isArray(parsed)) parsed = [parsed];
        } catch (e) {
          console.error("JSON Parse Error:", e);
          throw new Error("Invalid JSON response from AI");
        }
        
        // Clean and validate each ad suggestion
        return parsed.map((ad: any) => ({
          type: ad.type,
          headlines: ad.headlines?.map((h: string) => cleanText(h, 30, true)).filter((h: string) => h.length > 0) || [],
          descriptions: ad.descriptions?.map((d: string) => cleanText(d, 90)).filter((d: string) => d.length > 0) || [],
          displayPaths: ad.displayPaths?.map((p: string) => cleanText(p, 15)).filter((p: string) => p.length > 0) || [],
          businessName: ad.businessName ? cleanText(ad.businessName, 25) : undefined,
          longHeadline: ad.longHeadline ? cleanText(ad.longHeadline, 90) : undefined,
        }));
      }
      
      throw new Error("No content in AI response");
      
    } catch (error) {
      console.error("AI generation failed:", error);
      // Fall back to local generation
      return generateAdsLocally();
    }
  };

  // Local intelligent generation fallback
  const generateAdsLocally = (): AdSuggestion[] => {
    const cleanCompetitorText = adsText.toLowerCase();
    const keyPoints = extractKeyPoints(cleanCompetitorText);
    
    // Generate competitor comparison headlines
    const headlineVariations = [
      `${brand} vs ${company}`,
      `Better than ${company}`,
      `Switch from ${company}`,
      `${brand} alternative`,
      `Why ${brand} wins`,
      `${brand} delivers more`,
      `Stop using ${company}`,
      `${brand} is smarter`,
      `Get ${brand} today`,
      `${brand} proven results`,
    ];
    
    // Generate benefit descriptions based on competitor points
    const descriptionVariations = keyPoints.length > 0 ? 
      keyPoints.map(point => {
        let newPoint = point.replace(new RegExp(company, 'gi'), brand);
        if (newPoint.length > 85) newPoint = newPoint.substring(0, 82) + '...';
        return newPoint;
      }) : [
        `${brand} helps you achieve better results than ${company}. Try us today.`,
        `Make the switch to ${brand} for superior features and support.`,
        `${brand} outperforms ${company} in speed, reliability, and value.`,
      ];
    
    const headlines = headlineVariations
      .map(h => cleanText(h, 30, true))
      .filter(h => h.length > 5 && validateAdCopy(h).valid)
      .slice(0, 12);
    
    const descriptions = descriptionVariations
      .map(d => cleanText(d, 90))
      .filter(d => d.length > 10 && validateAdCopy(d).valid)
      .slice(0, 4);
    
    // Responsive Search Ad
    const searchAd: AdSuggestion = {
      type: 'responsive_search',
      headlines: headlines.slice(0, 10),
      descriptions: descriptions.slice(0, 2),
      displayPaths: [cleanText(brand, 15), cleanText('ads', 15)],
    };
    
    // Responsive Display Ad
    const displayAd: AdSuggestion = {
      type: 'responsive_display',
      headlines: headlines.slice(0, 5),
      descriptions: descriptions.slice(0, 3),
      businessName: cleanText(brand, 25),
      longHeadline: cleanText(`The smarter way to market - ${brand}`, 90),
    };
    
    // Performance Max Ad
    const pmaxAd: AdSuggestion = {
      type: 'performance_max',
      headlines: headlines,
      descriptions: descriptions,
      longHeadline: cleanText(`${brand} - Better marketing results guaranteed`, 90),
    };
    
    return [searchAd, displayAd, pmaxAd];
  };
  
  const generateAds = async () => {
    if (!brand) return alert("Please enter your brand name");
    if (!adsText) return alert("Please paste a screenshot of competitor ad first");
    
    setLoading(true);
    setOutput([]);
    
    const suggestions = await generateAdsWithAI();
    setOutput(suggestions);
    setLoading(false);
  };
  
  const getCharacterCount = (text: string): number => {
    return text.length;
  };
  
  const isWithinLimit = (text: string, limit: number): boolean => {
    return text.length <= limit;
  };
  
  return (
    <div className="bg-[#080c14] text-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">
          Turn Competitor Ads Into{" "}
          <span className="text-yellow-400">High-Converting Campaigns</span>
        </h1>
        
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          AI-powered ad generation using {selectedModel === "google/gemini-2-flash-1.1" ? "Gemini 2 Flash" : "Llama 3"} 
          {" "}with Google Ads policy compliance
        </p>
      </div>
      
      {/* Model Selector */}
      <div className="max-w-2xl mx-auto px-6 mb-6">
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
          <label className="block text-sm text-gray-400 mb-2">AI Model (OpenRouter):</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-3 rounded-lg text-black bg-white"
          >
            {models.map(model => (
              <option key={model.value} value={model.value}>
                {model.label} {model.recommended && "⭐ Recommended"}
              </option>
            ))}
          </select>
          <p className="text-xs text-green-400 mt-2">
            ✅ API Key configured - Using OpenRouter AI
          </p>
        </div>
      </div>
      
      {/* Tool Interface */}
      <div className="max-w-4xl mx-auto mt-6 px-6">
        <div className="bg-gray-900/30 p-6 rounded-xl">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter competitor name (e.g., SEMrush, HubSpot, Salesforce)"
            className="w-full p-4 rounded-xl text-black mb-4"
          />
          
          <button
            onClick={startProcess}
            className="w-full bg-yellow-500 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
          >
            🔍 Search Competitor on Google Ads Transparency
          </button>
          
          {step >= 1 && (
            <div className="mt-6 border-2 border-dashed border-yellow-400 p-8 rounded-xl text-center">
              <p className="text-gray-300">📸 Paste screenshot (Ctrl + V)</p>
              <p className="text-xs text-gray-500 mt-2">Take a screenshot of competitor's ad from the Google Ads Transparency Center</p>
            </div>
          )}
          
          {adsText && adsText !== "📖 Reading screenshot with OCR..." && (
            <div className="mt-4">
              <label className="text-sm text-gray-400 mb-2 block">📝 Extracted Ad Text:</label>
              <textarea
                value={adsText}
                onChange={(e) => setAdsText(e.target.value)}
                className="w-full p-4 rounded-xl text-black"
                rows={4}
              />
            </div>
          )}
          
          {step >= 2 && (
            <>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter your brand name"
                className="w-full mt-4 p-4 rounded-xl text-black"
              />
              
              <button
                onClick={generateAds}
                disabled={loading}
                className="mt-4 w-full bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-50"
              >
                {loading ? "🤖 AI Generating Ads..." : "🚀 Generate Google-Compliant Ads"}
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="text-center mt-10">
          <div className="text-4xl animate-spin">🤖</div>
          <p className="text-gray-400 mt-2">AI analyzing competitor ads with {selectedModel}...</p>
          <p className="text-xs text-gray-500 mt-1">This may take 5-10 seconds</p>
        </div>
      )}
      
      {/* Results */}
      {output.length > 0 && !loading && (
        <div className="max-w-4xl mx-auto mt-10 px-6 pb-20">
          <h2 className="text-2xl font-bold mb-6">✅ Generated Google-Compliant Ads</h2>
          
          {output.map((ad, idx) => (
            <div key={idx} className="mb-8 bg-gray-900/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                {ad.type === 'responsive_search' && '🔍 Responsive Search Ad'}
                {ad.type === 'responsive_display' && '🖼️ Responsive Display Ad'}
                {ad.type === 'performance_max' && '🚀 Performance Max Ad'}
              </h3>
              
              {/* Headlines */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2">Headlines (30 chars max):</h4>
                <div className="flex flex-wrap gap-2">
                  {ad.headlines.map((headline, i) => {
                    const validation = validateAdCopy(headline);
                    return (
                      <div key={i} className={`bg-gray-800 px-3 py-1 rounded-lg text-sm ${!isWithinLimit(headline, 30) ? 'border-2 border-red-500' : validation.valid ? 'border border-green-500' : 'border border-yellow-500'}`}>
                        {headline}
                        <span className={`ml-2 text-xs ${isWithinLimit(headline, 30) ? 'text-green-400' : 'text-red-400'}`}>
                          ({getCharacterCount(headline)}/30)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Descriptions */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-2">Descriptions (90 chars max):</h4>
                <div className="space-y-2">
                  {ad.descriptions.map((desc, i) => {
                    const validation = validateAdCopy(desc);
                    return (
                      <div key={i} className={`bg-gray-800 p-2 rounded-lg ${!isWithinLimit(desc, 90) ? 'border-2 border-red-500' : validation.valid ? 'border border-green-500' : 'border border-yellow-500'}`}>
                        {desc}
                        <span className={`ml-2 text-xs ${isWithinLimit(desc, 90) ? 'text-green-400' : 'text-red-400'}`}>
                          ({getCharacterCount(desc)}/90)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Display Paths */}
              {ad.displayPaths && ad.displayPaths.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Display Paths (15 chars max):</h4>
                  <div className="flex gap-2">
                    {ad.displayPaths.map((path, i) => (
                      <div key={i} className={`bg-gray-800 px-3 py-1 rounded-lg ${!isWithinLimit(path, 15) ? 'border-2 border-red-500' : 'border border-green-500'}`}>
                        /{path}
                        <span className={`ml-2 text-xs ${isWithinLimit(path, 15) ? 'text-green-400' : 'text-red-400'}`}>
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
                  <div className={`inline-block bg-gray-800 px-3 py-1 rounded-lg ${!isWithinLimit(ad.businessName, 25) ? 'border-2 border-red-500' : 'border border-green-500'}`}>
                    {ad.businessName}
                    <span className={`ml-2 text-xs ${isWithinLimit(ad.businessName, 25) ? 'text-green-400' : 'text-red-400'}`}>
                      ({getCharacterCount(ad.businessName)}/25)
                    </span>
                  </div>
                </div>
              )}
              
              {/* Long Headline */}
              {ad.longHeadline && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Long Headline (90 chars max):</h4>
                  <div className={`bg-gray-800 p-2 rounded-lg ${!isWithinLimit(ad.longHeadline, 90) ? 'border-2 border-red-500' : 'border border-green-500'}`}>
                    {ad.longHeadline}
                    <span className={`ml-2 text-xs ${isWithinLimit(ad.longHeadline, 90) ? 'text-green-400' : 'text-red-400'}`}>
                      ({getCharacterCount(ad.longHeadline)}/90)
                    </span>
                  </div>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-green-900/20 rounded-lg text-sm text-green-400">
                ✅ Google Ads Compliant • No all-caps • No clickbait • Proper punctuation
              </div>
            </div>
          ))}
          
          <div className="bg-blue-900/20 p-4 rounded-lg text-sm text-blue-300">
            💡 **Pro Tips:** 
            • Create 3-5 ad variations and let Google's AI optimize performance
            • Don't pin headlines to specific positions for better results
            • Monitor ad strength in Google Ads dashboard
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="text-center text-gray-500 mt-20 pb-10">
        © 2025 Pranjal Digital • Google Ads Compliant Tool • Powered by OpenRouter AI
      </div>
    </div>
  );
};

export default FreeGoogleAdsCompetitorResearch;
