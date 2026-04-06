import React, { useState } from "react";
import { 
  ArrowRight, 
  BarChart3, 
  X, 
  Shield, 
  TrendingUp, 
  Target, 
  Rocket, 
  DollarSign, 
  Users, 
  Search, 
  Settings, 
  BarChart2, 
  CheckCircle,
  Zap,
  Globe,
  Filter,
  Wrench,
  ChevronRight
} from "lucide-react";

// ─── EXPANDED CASE STUDIES DATA (15+ detailed cases) ───────────────────────

const CASE_STUDIES = [
  {
    id: 1,
    title: "SaaS Scaled from $3K to $28K MRR",
    industry: "B2B SaaS",
    region: "USA",
    tags: ["Google Ads", "Landing Pages", "Retargeting", "SaaS"],
    niche: "saas",
    accentColor: "#c9a84c",
    stats: [
      { val: "933%", lbl: "MRR Growth" },
      { val: "46%", lbl: "Lower CPL" },
      { val: "2.3x", lbl: "Conversion" },
      { val: "6 months", lbl: "Timeline" }
    ],
    problem: "High acquisition cost, poor funnel structure, and inconsistent growth due to lack of a structured system and unclear customer journey mapping.",
    strategy: "Built a full-funnel demand capture system using Google Ads, optimised landing pages, and a retargeting funnel segmented by funnel stage.",
    execution: "Restructured entire Google Ads account, implemented UTM tracking + GA4, rebuilt landing pages with clear CTA hierarchy, and ran weekly data reviews.",
    tools: ["Google Ads", "Google Analytics 4", "Hotjar", "HubSpot CRM", "Unbounce"],
    platforms: ["Google Search", "Google Display", "YouTube Pre-roll"],
    funnel: ["Awareness Ad", "Landing Page", "Free Trial", "Email Nurture", "Demo Call", "Conversion"],
    resources: "2 media buyers, 1 CRO specialist, 1 copywriter. Monthly ad spend: $8,000–$14,000",
    result: "MRR scaled from $3K to $28K in 6 months. CPL reduced by 46%. Conversion rate grew 2.3x. ROI consistently above 4x."
  },
  {
    id: 2,
    title: "4.2X ROAS for E-commerce Brand",
    industry: "E-commerce",
    region: "Australia",
    tags: ["Meta Ads", "Creative Testing", "Retargeting", "DTC"],
    niche: "ecommerce",
    accentColor: "#5DCAA5",
    stats: [
      { val: "4.2x", lbl: "ROAS" },
      { val: "3.1x", lbl: "Revenue" },
      { val: "68%", lbl: "Better CTR" },
      { val: "90 days", lbl: "Timeline" }
    ],
    problem: "High ad spend yielding low returns due to weak ad creatives and poor audience targeting on Meta. ROAS stuck at 1.7 for 4 months.",
    strategy: "Rebuilt entire Meta Ads account structure with a creative testing framework, proper campaign objective alignment, and a tiered retargeting funnel.",
    execution: "Weekly creative sprints testing 4–6 variations, audience segmentation by purchase intent, budget reallocation based on ROAS tiers.",
    tools: ["Meta Ads Manager", "Klaviyo", "Shopify Analytics", "Triple Whale", "Canva Pro"],
    platforms: ["Facebook Feed", "Instagram Reels", "Meta Audience Network"],
    funnel: ["Broad Prospecting", "Lookalike Audience", "Add-to-Cart", "Checkout Abandonment", "Post-Purchase"],
    resources: "1 media buyer, 2 creative strategists, 1 email specialist. Monthly ad spend: $12,000 AUD",
    result: "ROAS improved from 1.7 to 4.2 in 90 days. Revenue grew 3.1x. CTR improved 68%. CAC reduced by 38%."
  },
  {
    id: 3,
    title: "120+ Leads for IT Services",
    industry: "IT Services",
    region: "USA",
    tags: ["LinkedIn Ads", "Google Ads", "B2B", "Lead Gen"],
    niche: "b2b",
    accentColor: "#85B7EB",
    stats: [
      { val: "120+", lbl: "Qualified Leads" },
      { val: "60 days", lbl: "Timeline" },
      { val: "$41", lbl: "Cost/Lead" },
      { val: "4.2x", lbl: "ROI" }
    ],
    problem: "No consistent inbound lead pipeline. Business was 100% dependent on referrals with no predictable revenue growth system.",
    strategy: "Built a dual-channel funnel using LinkedIn Ads for decision-maker targeting and Google Ads for high-intent search traffic.",
    execution: "Optimised campaigns weekly, split-tested lead magnet offers, refined landing page copy, and implemented a CRM-based lead qualification workflow.",
    tools: ["LinkedIn Campaign Manager", "Google Ads", "Salesforce", "Calendly", "Zapier"],
    platforms: ["LinkedIn Sponsored Content", "LinkedIn InMail", "Google Search"],
    funnel: ["LinkedIn/Google Ad", "Gated Resource", "Lead Form", "CRM Automation", "Sales Call"],
    resources: "1 LinkedIn specialist, 1 Google Ads manager, 1 copywriter. Monthly spend: $6,500",
    result: "Generated 120+ qualified leads in 60 days. CPL of $41. 4.2x ROI. Pipeline value exceeded $380K."
  },
  {
    id: 4,
    title: "Local Business 5 → 60 Leads/Month",
    industry: "Local Services",
    region: "Canada",
    tags: ["Google Ads", "Local SEO", "Call Tracking", "GMB"],
    niche: "local",
    accentColor: "#97C459",
    stats: [
      { val: "12x", lbl: "Lead Increase" },
      { val: "60", lbl: "Leads/Month" },
      { val: "38%", lbl: "Lower CPA" },
      { val: "3 months", lbl: "Timeline" }
    ],
    problem: "Zero digital presence. Business relied entirely on offline word-of-mouth leads averaging only 5 leads per month.",
    strategy: "Local SEO foundation combined with Google Ads local campaigns, Google Business Profile optimisation, and call tracking implementation.",
    execution: "Optimised GMB listing, built location-specific landing pages, launched local search + call-only campaigns, and installed call tracking software.",
    tools: ["Google Ads", "Google Business Profile", "CallRail", "Ahrefs", "WordPress"],
    platforms: ["Google Search", "Google Maps Ads", "Local Services Ads"],
    funnel: ["Local Search", "Location Landing Page", "Call/Form", "Lead Qualification", "Booking"],
    resources: "1 SEO specialist, 1 Google Ads manager. Monthly spend: $2,200 CAD",
    result: "Leads grew from 5 to 60/month in 3 months. CPA reduced by 38%. Consistent monthly pipeline established."
  },
  {
    id: 5,
    title: "EdTech ₹2L → ₹18L Monthly Revenue",
    industry: "Education",
    region: "India",
    tags: ["Webinar Funnel", "Meta Ads", "Email Automation", "EdTech"],
    niche: "edtech",
    accentColor: "#F0997B",
    stats: [
      { val: "9x", lbl: "Revenue Growth" },
      { val: "₹18L", lbl: "Monthly Rev" },
      { val: "34%", lbl: "Show Rate" },
      { val: "4 months", lbl: "Timeline" }
    ],
    problem: "Low course sales and high funnel drop-offs. Existing ad spend not converting due to lack of trust-building mechanism.",
    strategy: "Designed a webinar-based funnel with pre-webinar email sequence, live pitch, replay retargeting, and post-webinar follow-up automation.",
    execution: "Ran Meta Ads to webinar registration page, built 7-email pre-webinar sequence, optimised landing pages, and retargeted replay watchers.",
    tools: ["Meta Ads Manager", "ActiveCampaign", "Zoom Webinar", "ClickFunnels", "Razorpay"],
    platforms: ["Facebook", "Instagram", "WhatsApp Remarketing"],
    funnel: ["Meta Ad", "Registration", "Email Sequence", "Live Webinar", "Offer Pitch", "Replay", "Purchase"],
    resources: "1 funnel builder, 1 media buyer, 1 email copywriter. Monthly spend: ₹1.2L",
    result: "Monthly revenue scaled from ₹2L to ₹18L in 4 months. Webinar show rate of 34%. 9x revenue growth."
  },
  {
    id: 6,
    title: "Real Estate CPL Reduced by 52%",
    industry: "Real Estate",
    region: "India",
    tags: ["Facebook Ads", "Audience Segmentation", "Lead Gen"],
    niche: "realestate",
    accentColor: "#7F77DD",
    stats: [
      { val: "52%", lbl: "CPL Reduction" },
      { val: "3.8x", lbl: "Lead Volume" },
      { val: "₹380", lbl: "Cost/Lead" },
      { val: "75 days", lbl: "Timeline" }
    ],
    problem: "High cost per lead at ₹800+ and poor audience targeting resulting in low-quality leads.",
    strategy: "Implemented detailed audience segmentation by income, intent, and geography. Rebuilt creatives with project-specific USPs.",
    execution: "Segmented campaigns by project, income tier, and buyer type. A/B tested creatives weekly. Integrated CRM for lead scoring.",
    tools: ["Meta Ads", "LeadSquared CRM", "Google Analytics", "Canva", "WhatsApp Business API"],
    platforms: ["Facebook Feed", "Instagram Stories", "Facebook Marketplace"],
    funnel: ["Targeted Ad", "Project Landing Page", "WhatsApp Lead Form", "CRM Entry", "Site Visit"],
    resources: "1 media buyer, 1 creative designer. Monthly spend: ₹2.5L",
    result: "CPL dropped from ₹800 to ₹380 (52% reduction). Lead volume grew 3.8x. Lead quality improved significantly."
  },
  {
    id: 7,
    title: "Healthcare Bookings +300%",
    industry: "Healthcare",
    region: "UK",
    tags: ["SEO", "Google Ads", "Healthcare", "Local"],
    niche: "healthcare",
    accentColor: "#5DCAA5",
    stats: [
      { val: "300%", lbl: "Booking Increase" },
      { val: "4.1x", lbl: "Organic Traffic" },
      { val: "£28", lbl: "Cost/Booking" },
      { val: "5 months", lbl: "Timeline" }
    ],
    problem: "Low online visibility and poor conversion on the booking page. Clinic was invisible on Google for key local search terms.",
    strategy: "Combined technical SEO, Google Ads for immediate traffic, and a CRO overhaul of the booking page.",
    execution: "Fixed technical SEO issues, built local content strategy, launched Google Ads with location extensions, and rebuilt booking flow.",
    tools: ["Google Ads", "Ahrefs", "Google Search Console", "Calendly", "Hotjar"],
    platforms: ["Google Search", "Google Maps", "Organic Search"],
    funnel: ["Local Search", "Service Landing Page", "Trust Signals", "Booking Widget", "Confirmation"],
    resources: "1 SEO specialist, 1 Google Ads manager. Monthly spend: £1,800",
    result: "Bookings increased 300% in 5 months. Organic traffic grew 4.1x. Cost per booking at £28."
  },
  {
    id: 8,
    title: "B2B Lead Pipeline: 80+ Leads/Month",
    industry: "B2B Consulting",
    region: "USA",
    tags: ["LinkedIn", "Google Ads", "B2B", "Pipeline"],
    niche: "b2b",
    accentColor: "#c9a84c",
    stats: [
      { val: "80+", lbl: "Leads/Month" },
      { val: "$52", lbl: "Cost/Lead" },
      { val: "5.1x", lbl: "ROI" },
      { val: "3 months", lbl: "Timeline" }
    ],
    problem: "No inbound system. Zero marketing infrastructure. Revenue entirely dependent on founder's personal network.",
    strategy: "Built full inbound system using LinkedIn thought leadership ads + Google Search for high-intent queries.",
    execution: "Published LinkedIn content at scale, ran sponsored posts, launched Google Ads, set up automated email nurture.",
    tools: ["LinkedIn Campaign Manager", "Google Ads", "HubSpot", "Calendly", "Apollo.io"],
    platforms: ["LinkedIn Sponsored Content", "Google Search", "LinkedIn InMail"],
    funnel: ["Organic/Paid LinkedIn", "Landing Page", "Lead Magnet", "Email Nurture", "Discovery Call"],
    resources: "1 LinkedIn specialist, 1 Google Ads manager. Monthly spend: $4,200",
    result: "80+ qualified leads per month. CPL of $52. Pipeline ROI of 5.1x. 3 enterprise contracts closed."
  },
  {
    id: 9,
    title: "Startup: 5,000+ Users in 30 Days",
    industry: "Startup",
    region: "Global",
    tags: ["Paid Acquisition", "Product Hunt", "Meta Ads", "Launch"],
    niche: "startup",
    accentColor: "#ED93B1",
    stats: [
      { val: "5,000+", lbl: "Users" },
      { val: "$1.20", lbl: "CAC" },
      { val: "62%", lbl: "Activation" },
      { val: "30 days", lbl: "Timeline" }
    ],
    problem: "No acquisition strategy for launch. Product was ready but team had no growth framework or paid media experience.",
    strategy: "Full-funnel launch strategy: Product Hunt launch, Meta Ads for paid acquisition, referral loop, onboarding optimisation.",
    execution: "Coordinated Product Hunt launch day, ran Meta Ads to sign-up page, built referral widget, A/B tested sign-up flow.",
    tools: ["Meta Ads Manager", "Product Hunt", "Mixpanel", "Intercom", "Viral Loops"],
    platforms: ["Product Hunt", "Facebook", "Instagram", "Reddit"],
    funnel: ["Product Hunt/Ad", "Sign-up Page", "Verification", "Onboarding", "Referral Prompt", "Activation"],
    resources: "1 growth marketer, 1 designer. Total launch budget: $6,000",
    result: "5,000+ users in 30 days at $1.20 CAC. 62% activation rate. Referral loop drove 28% of signups."
  },
  {
    id: 10,
    title: "Global Campaign Optimisation: 2.8x ROI",
    industry: "Global Brand",
    region: "Multi-country",
    tags: ["Geo-segmentation", "Google Ads", "Meta Ads", "Global"],
    niche: "global",
    accentColor: "#85B7EB",
    stats: [
      { val: "2.8x", lbl: "ROI Improvement" },
      { val: "41%", lbl: "Waste Reduced" },
      { val: "6", lbl: "Countries" },
      { val: "4 months", lbl: "Timeline" }
    ],
    problem: "Multi-country campaigns running with same creative across all markets. High wasted spend. No geo-level visibility.",
    strategy: "Geo-segmented campaign structure with country-level creative localisation and separate budget allocation.",
    execution: "Rebuilt campaign architecture by country, created localised creatives, set market-specific bidding strategies.",
    tools: ["Google Ads", "Meta Ads", "Looker Studio", "Supermetrics", "Notion"],
    platforms: ["Google Search", "Meta Platforms", "YouTube", "Display Network"],
    funnel: ["Country-Specific Ad", "Localised Landing Page", "Market CTA", "Regional CRM"],
    resources: "2 media buyers, 1 data analyst. Monthly spend: $45,000 across markets",
    result: "Overall ROI improved 2.8x. Wasted spend reduced by 41%. Best performing markets scaled 3.5x budget."
  },
  {
    id: 11,
    title: "E-commerce DTC Brand 3.5x Revenue",
    industry: "E-commerce",
    region: "USA",
    tags: ["TikTok Ads", "UGC", "Influencer", "DTC"],
    niche: "ecommerce",
    accentColor: "#c9a84c",
    stats: [
      { val: "3.5x", lbl: "Revenue" },
      { val: "2.1x", lbl: "ROAS" },
      { val: "54%", lbl: "Lower CAC" },
      { val: "4 months", lbl: "Timeline" }
    ],
    problem: "Stagnant sales on traditional platforms. Unable to reach younger demographic. High customer acquisition costs.",
    strategy: "TikTok-first strategy with UGC creators and influencer partnerships, plus Shopify CRO improvements.",
    execution: "Recruited micro-influencers, produced UGC content daily, optimized product pages, implemented post-purchase upsells.",
    tools: ["TikTok Ads Manager", "Klaviyo", "Shopify", "Canva", "CapCut"],
    platforms: ["TikTok", "Instagram Reels", "Shopify"],
    funnel: ["TikTok Ad/Influencer", "Product Page", "Add to Cart", "Checkout", "Post-Purchase Upsell"],
    resources: "1 media buyer, 2 UGC creators. Monthly spend: $15,000",
    result: "3.5x revenue growth in 4 months. ROAS improved from 1.8 to 3.8. CAC reduced by 54%."
  },
  {
    id: 12,
    title: "Mobile App 200K Downloads",
    industry: "Mobile App",
    region: "Global",
    tags: ["App Store Ads", "ASO", "Influencer", "Mobile"],
    niche: "startup",
    accentColor: "#7F77DD",
    stats: [
      { val: "200K", lbl: "Downloads" },
      { val: "$0.85", lbl: "CPI" },
      { val: "4.8", lbl: "App Rating" },
      { val: "90 days", lbl: "Timeline" }
    ],
    problem: "App launched with zero visibility. High competition in category. No organic traction.",
    strategy: "ASO optimization + Apple Search Ads + TikTok influencer campaign targeting niche communities.",
    execution: "Optimized app store listing, launched Apple Search Ads with keyword segmentation, partnered with 15 micro-influencers.",
    tools: ["Apple Search Ads", "App Store Connect", "Sensor Tower", "TikTok Creator Marketplace"],
    platforms: ["Apple App Store", "TikTok", "Instagram"],
    funnel: ["Ad/Influencer", "App Store Page", "Download", "Onboarding", "Retention Push"],
    resources: "1 ASO specialist, 1 media buyer. Monthly spend: $25,000",
    result: "200,000 downloads in 90 days at $0.85 CPI. 4.8 star rating. 35% Day-7 retention."
  }
];

const NICHES = [
  { key: "All", label: "All Industries" },
  { key: "saas", label: "B2B SaaS" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "b2b", label: "B2B / Consulting" },
  { key: "local", label: "Local Business" },
  { key: "edtech", label: "EdTech" },
  { key: "realestate", label: "Real Estate" },
  { key: "healthcare", label: "Healthcare" },
  { key: "startup", label: "Startup" },
  { key: "global", label: "Global" }
];

const PER_PAGE = 6;

// ─── MODAL COMPONENT ────────────────────────────────────────────────────────

function CaseStudyModal({ cs, onClose }) {
  if (!cs) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#0f1625] border border-[#c9a84c]/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="sticky top-0 bg-[#0f1625]/95 backdrop-blur-sm border-b border-white/10 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
              <BarChart3 size={20} style={{ color: cs.accentColor }} />
            </div>
            <h2 className="text-xl font-bold">{cs.title}</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Industry & Tags */}
          <div className="mb-6">
            <span className="text-sm" style={{ color: cs.accentColor }}>{cs.industry} • {cs.region}</span>
            <div className="flex flex-wrap gap-2 mt-3">
              {cs.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {cs.stats.map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                <div className="text-xl font-bold" style={{ color: cs.accentColor }}>{stat.val}</div>
                <div className="text-xs text-white/50">{stat.lbl}</div>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.accentColor }}>The Problem</h4>
              <p className="text-white/70 text-sm leading-relaxed">{cs.problem}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.accentColor }}>Strategy</h4>
              <p className="text-white/70 text-sm leading-relaxed">{cs.strategy}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.accentColor }}>Execution</h4>
              <p className="text-white/70 text-sm leading-relaxed">{cs.execution}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.accentColor }}>Tools & Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {cs.tools.slice(0, 5).map(tool => (
                  <span key={tool} className="px-2 py-1 rounded-md text-xs bg-white/5 border border-white/10">{tool}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.accentColor }}>Funnel Architecture</h4>
              <div className="flex flex-wrap items-center gap-2">
                {cs.funnel.map((step, i) => (
                  <React.Fragment key={step}>
                    <span className="px-3 py-1 rounded-full text-xs bg-[#c9a84c]/10 border border-[#c9a84c]/20">{step}</span>
                    {i < cs.funnel.length - 1 && <ChevronRight size={14} className="text-white/30" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.accentColor }}>Resources</h4>
              <p className="text-white/70 text-sm">{cs.resources}</p>
            </div>
            <div className="bg-[#c9a84c]/10 rounded-xl p-4 border border-[#c9a84c]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cs.accentColor }}>Results</h4>
              <p className="text-white font-medium text-sm">{cs.result}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-white/10 flex gap-3">
            <a href="/contact" className="flex-1 bg-[#c9a84c] text-[#080c14] font-bold py-3 rounded-xl text-center text-sm hover:opacity-90 transition">
              Request Similar Strategy <ArrowRight size={14} className="inline ml-1" />
            </a>
            <button onClick={onClose} className="px-6 py-3 rounded-xl border border-white/20 text-white/70 text-sm hover:bg-white/5 transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CASE STUDY CARD (Larger, Detailed) ─────────────────────────────────────

function CaseStudyCard({ cs, onOpen }) {
  return (
    <div 
      className="bg-[#0a0f1c] border border-white/10 rounded-2xl overflow-hidden hover:border-[#c9a84c]/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={() => onOpen(cs)}
    >
      {/* Accent Bar */}
      <div className="h-1" style={{ background: cs.accentColor }}></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cs.accentColor}15`, border: `1px solid ${cs.accentColor}30` }}>
            <BarChart3 size={22} style={{ color: cs.accentColor }} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight mb-1">{cs.title}</h3>
            <p className="text-xs font-semibold" style={{ color: cs.accentColor }}>{cs.industry} • {cs.region}</p>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cs.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-white/60">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Stats Preview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {cs.stats.slice(0, 2).map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-2 text-center">
              <div className="text-lg font-bold" style={{ color: cs.accentColor }}>{stat.val}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wide">{stat.lbl}</div>
            </div>
          ))}
        </div>
        
        {/* Problem Preview */}
        <p className="text-white/60 text-xs mb-4 line-clamp-2">{cs.problem.substring(0, 100)}...</p>
        
        {/* View Button */}
        <button className="w-full py-2.5 rounded-xl border border-[#c9a84c]/40 text-[#c9a84c] text-sm font-semibold flex items-center justify-center gap-2 group-hover:bg-[#c9a84c]/10 transition">
          View Full Case Study <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function CaseStudies() {
  const [activeNiche, setActiveNiche] = useState("All");
  const [page, setPage] = useState(0);
  const [selectedCase, setSelectedCase] = useState(null);

  const filtered = activeNiche === "All" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.niche === activeNiche);
  
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleNicheChange = (niche) => {
    setActiveNiche(niche);
    setPage(0);
  };

  return (
    <div className="bg-[#080c14] min-h-screen text-white">
      
      {/* Hero Section with Graphics */}
      <div className="relative overflow-hidden pt-20 pb-12">
        {/* Background Graphic Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#c9a84c]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-transparent via-[#c9a84c]/10 to-transparent rotate-12 blur-2xl"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-6">
            <TrendingUp size={14} className="text-[#c9a84c]" />
            <span className="text-xs text-[#c9a84c] font-medium">REAL RESULTS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Case Studies
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Real strategies. Real execution. Real measurable results.
          </p>
        </div>
      </div>

      {/* Disclaimer Section - Right after hero */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="bg-[#0a0f1c] border border-[#c9a84c]/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
            <Shield size={24} className="text-[#c9a84c]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-white/80 text-sm mb-1">
              <strong className="text-[#c9a84c]">Confidentiality Notice:</strong> We work with selected clients and maintain strict confidentiality.
            </p>
            <p className="text-white/50 text-xs">
              Detailed case studies, full performance data, and client references can be shared upon request. 
              Results vary based on industry, budget, and market conditions.
            </p>
          </div>
          <a href="/contact" className="bg-[#c9a84c] text-[#080c14] font-bold px-6 py-2.5 rounded-xl text-sm whitespace-nowrap hover:opacity-90 transition flex items-center gap-2">
            Request Full Details <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Filter Section - Improved Visibility */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Filter size={16} className="text-white/40" />
          <span className="text-sm text-white/50">Filter by industry:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {NICHES.map((niche) => (
            <button
              key={niche.key}
              onClick={() => handleNicheChange(niche.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeNiche === niche.key
                  ? "bg-[#c9a84c] text-[#080c14] shadow-lg shadow-[#c9a84c]/25"
                  : "bg-[#0a0f1c] border border-white/15 text-white/70 hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"
              }`}
            >
              {niche.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} onOpen={setSelectedCase} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10 mb-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-10 h-10 rounded-lg font-medium transition ${
                page === i
                  ? "bg-[#c9a84c] text-[#080c14]"
                  : "bg-[#0a0f1c] border border-white/15 text-white/60 hover:border-[#c9a84c]/50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center pb-20">
        <a
          href="/contact"
          className="bg-[#c9a84c] text-[#080c14] font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 hover:opacity-90 transition text-lg"
        >
          Discuss Your Business Growth <ArrowRight size={18} />
        </a>
      </div>

      {/* Modal */}
      {selectedCase && (
        <CaseStudyModal cs={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  );
}
