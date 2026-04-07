import FunnelPyramid from "../components/FunnelPyramid";
import CostCalculator from "../components/CostCalculator";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, ChevronDown, Play, TrendingUp, Users, Globe,
  DollarSign, BarChart3, Search, Target, Share2, Building2, Cpu, Mail,
  Star, Zap, Shield, Clock, PhoneCall, X, Check, Award, Briefcase,
  Sparkles, Heart, Coffee, Smile, ThumbsUp, Rocket as RocketIcon,
  Layers, Palette, Grid, Circle, Triangle, Hexagon, Instagram, Facebook,
  Linkedin, Youtube, Twitter, PenTool, Megaphone, LineChart, PieChart,
  Settings, Map, Navigation, Compass, Activity, Eye, Mic, Bot, Brain,
  Zap as ZapIcon, TrendingUp as TrendingIcon, Award as AwardIcon,
  MapPin, Navigation2, Compass as CompassIcon,
  Package, Scale, Gamepad, Car, LucideIcon
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

function setMeta(description) {
  let meta = document.querySelector("meta[name='description']");

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", description);
}

// Rating platforms with proper logos (using brand colors and custom designs)
const ratingPlatforms = [
  { name: 'Google', rating: 4.9, reviews: 85, color: '#4285F4', bgGradient: 'from-blue-500/20 to-blue-600/10' },
  { name: 'Clutch', rating: 4.8, reviews: 42, color: '#4B3B2B', bgGradient: 'from-amber-800/20 to-amber-900/10' },
  { name: 'G2', rating: 4.7, reviews: 38, color: '#FF6C2D', bgGradient: 'from-orange-500/20 to-orange-600/10' },
  { name: 'Trustpilot', rating: 4.6, reviews: 56, color: '#00B67A', bgGradient: 'from-green-500/20 to-green-600/10' },
  { name: 'Glassdoor', rating: 4.5, reviews: 28, color: '#00A162', bgGradient: 'from-teal-500/20 to-teal-600/10' },
  { name: 'Yelp', rating: 4.5, reviews: 22, color: '#D32323', bgGradient: 'from-red-500/20 to-red-600/10' },
  { name: 'UpCity', rating: 4.9, reviews: 45, color: '#00A651', bgGradient: 'from-green-500/20 to-green-600/10' },
  { name: 'GoodFirms', rating: 4.7, reviews: 31, color: '#F26522', bgGradient: 'from-orange-500/20 to-orange-600/10' },
];

// Custom hook for counting animation with scroll trigger
function useCountUp(end, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime = null;
    let animationFrame;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  return count;
}

// Animated Stat Card with scroll trigger
function StatCard({ value, suffix, label }) {
  const ref = useRef(null);
 const inView = useInView(ref, { once: true, amount: 0.2 });

const count = useCountUp(value, 2000, inView);
  
  
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center relative"
    >
      <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent mb-2">
     {count}{suffix}
      </div>
      <div className="text-white/50 text-sm font-medium">{label}</div>
    </motion.div>
  );
}




// 14 Digital Marketing Services
const aiServices = [
  { 
    icon: Search, 
    name: 'SEO + AEO + GEO', 
    desc: 'Traditional SEO + Answer Engine Optimization + Generative Engine Optimization. Rank on Google, ChatGPT, Perplexity, and all AI search engines.',
    features: ['Voice search optimization', 'Featured snippets domination', 'AI crawler optimization', 'Knowledge graph integration'],
    detailedDesc: 'I optimize your content for both traditional search engines AND AI platforms. When someone asks ChatGPT "best marketing agency" — your name appears. When they search Google — you rank #1.'
  },
  { 
    icon: Target, 
    name: 'AI-Powered PPC', 
    desc: 'Google PMax, Meta Advantage+, TikTok Smart campaigns — AI-driven ad optimization for maximum ROI.',
    features: ['Automated bidding strategies', 'Dynamic creative optimization', 'Predictive audience targeting', 'Real-time budget allocation'],
    detailedDesc: 'I leverage Google\'s Performance Max, Meta\'s Advantage+ shopping campaigns, and TikTok\'s Smart Performance campaigns. AI does the heavy lifting — I do the strategic optimization.'
  },
  { 
    icon: Brain, 
    name: 'AI Funnel Building', 
    desc: 'Complete funnel automation using AI — from lead capture to conversion and retention.',
    features: ['Chatbot integration', 'Personalized email sequences', 'AI lead scoring', 'Automated retargeting'],
    detailedDesc: 'I build complete marketing funnels powered by AI. Chatbots qualify leads, AI personalizes email sequences, and machine learning predicts which leads will convert.'
  },
  { 
    icon: LineChart, 
    name: 'Performance Marketing', 
    desc: 'Data-driven campaigns across all channels. Every dollar tracked, every conversion measured.',
    features: ['Cross-channel attribution', 'Real-time dashboards', 'A/B testing at scale', 'ROAS optimization'],
    detailedDesc: 'I track every single click, conversion, and dollar spent. Real-time dashboards show exactly what\'s working. No guessing — only data-driven decisions.'
  },
  { 
    icon: PenTool, 
    name: 'AI Content Strategy', 
    desc: 'Content that ranks on traditional and AI search engines. Blog, video, podcast — all optimized.',
    features: ['Topic clustering', 'Entity-based SEO', 'Content atomization', 'AI content optimization'],
    detailedDesc: 'I create content strategies that work for BOTH humans and AI. Topic clusters build authority. Entity optimization helps AI understand your expertise.'
  },
  { 
    icon: Activity, 
    name: 'CRO + Analytics', 
    desc: 'Convert more visitors into customers. Heatmaps, session recordings, and AI-powered recommendations.',
    features: ['Funnel analysis', 'User behavior tracking', 'A/B testing framework', 'Conversion prediction'],
    detailedDesc: 'I analyze every step of your funnel. Heatmaps show where users click. Session recordings reveal friction points. AI predicts which changes will boost conversions.'
  },
  { 
    icon: Linkedin, 
    name: 'LinkedIn Sales Navigator', 
    desc: 'B2B lead generation at scale. Target decision makers, automate outreach, close deals.',
    features: ['Advanced search filters', 'Lead list building', 'Automated connection requests', 'CRM integration'],
    detailedDesc: 'I help B2B businesses find and connect with decision makers on LinkedIn. Advanced filters target exact job titles, companies, and industries.'
  },
  { 
    icon: RocketIcon, 
    name: 'Growth Hacking', 
    desc: 'Creative, data-driven strategies to grow fast. Perfect for startups and scaling businesses.',
    features: ['Viral loop design', 'Referral programs', 'Community building', 'Rapid experimentation'],
    detailedDesc: 'I design creative growth strategies that don\'t require big budgets. Viral loops, referral programs, and community building — tested and proven.'
  },
];

// 25+ Industries with detailed explanations - Using only imported icons
const industriesData = [
  { name: 'SaaS', icon: Cpu, color: 'from-purple-500/20 to-pink-500/20', projects: 45, whatIDid: 'Helped a B2B SaaS company grow from $3K to $28K MRR in 6 months using SEO and PPC.', whatICanDo: 'Reduce CAC by 40-60%, improve trial-to-paid conversion by 2-3x, optimize onboarding flow, and scale predictably.', results: ['933% MRR growth', '46% lower CPL', '2.3x conversion rate'] },
  { name: 'E-commerce', icon: DollarSign, color: 'from-orange-500/20 to-red-500/20', projects: 38, whatIDid: 'Took a DTC brand from 1.7x to 4.2x ROAS in 90 days using Meta Ads + TikTok.', whatICanDo: 'Optimize product feeds, build retargeting funnels, scale winning products, reduce cart abandonment by 30-50%.', results: ['4.2x ROAS', '3.1x revenue', '68% better CTR'] },
  { name: 'Healthcare', icon: Shield, color: 'from-green-500/20 to-emerald-500/20', projects: 32, whatIDid: 'Increased patient bookings by 300% for a UK clinic using local SEO + Google Ads.', whatICanDo: 'HIPAA-compliant marketing, patient acquisition funnels, reputation management, local dominance.', results: ['300% bookings', '4.1x organic traffic', '£28 cost per booking'] },
  { name: 'Real Estate', icon: Building2, color: 'from-yellow-500/20 to-amber-500/20', projects: 28, whatIDid: 'Reduced cost per lead by 52% for a real estate developer using audience segmentation.', whatICanDo: 'Property listing optimization, local SEO, Facebook housing ads, lead qualification funnels.', results: ['52% lower CPL', '3.8x lead volume', 'Better lead quality'] },
  { name: 'EdTech', icon: Star, color: 'from-indigo-500/20 to-blue-500/20', projects: 25, whatIDid: 'Scaled an education platform from ₹2L to ₹18L monthly revenue using webinar funnels.', whatICanDo: 'Course marketing, student acquisition, webinar optimization, email automation.', results: ['9x revenue', '34% webinar show rate', 'Lower CAC'] },
  { name: 'Fintech', icon: TrendingUp, color: 'from-emerald-500/20 to-teal-500/20', projects: 22, whatIDid: 'Helped a payment gateway acquire 500+ businesses in 3 months using LinkedIn Ads.', whatICanDo: 'Compliance-friendly marketing, B2B lead generation, trust-building content, partnership marketing.', results: ['500+ business accounts', '42% lower CPA', '3x ROI'] },
  { name: 'Travel', icon: Globe, color: 'from-cyan-500/20 to-sky-500/20', projects: 20, whatIDid: 'Increased booking revenue by 280% for a travel agency using Google Hotel Ads + retargeting.', whatICanDo: 'Seasonal campaign planning, destination SEO, review management, package promotion.', results: ['280% revenue', '54% lower CPA', '2.5x ROAS'] },
  { name: 'Fashion', icon: Sparkles, color: 'from-pink-500/20 to-rose-500/20', projects: 18, whatIDid: 'Grew an Instagram-first fashion brand from 0 to 50K monthly visitors using influencer marketing.', whatICanDo: 'Visual content strategy, influencer partnerships, shoppable posts, UGC campaigns.', results: ['50K monthly visitors', '3.2x ROAS', '40% lower CAC'] },
  { name: 'Manufacturing', icon: Settings, color: 'from-gray-500/20 to-slate-500/20', projects: 15, whatIDid: 'Helped a B2B manufacturer generate 200+ qualified leads in 60 days using LinkedIn + Google Ads.', whatICanDo: 'Industrial SEO, technical content marketing, trade show integration, B2B lead nurturing.', results: ['200+ leads', '35% lower CPA', '4x ROI'] },
  { name: 'Logistics', icon: Package, color: 'from-blue-500/20 to-cyan-500/20', projects: 14, whatIDid: 'Scaled a freight forwarding company from 50 to 500+ monthly leads using Google Search Ads.', whatICanDo: 'Supply chain SEO, logistics keyword strategy, freight rate optimization, carrier acquisition.', results: ['900% lead growth', '28% lower CPA', '3.5x ROAS'] },
  { name: 'Legal', icon: Shield, color: 'from-slate-500/20 to-gray-500/20', projects: 12, whatIDid: 'Helped a law firm rank #1 for 20+ practice area keywords in 6 months.', whatICanDo: 'Attorney SEO, case acquisition funnels, legal directory optimization, reputation management.', results: ['20+ #1 rankings', '150% more cases', '42% lower CPA'] },
  { name: 'Non-Profit', icon: Heart, color: 'from-red-500/20 to-rose-500/20', projects: 11, whatIDid: 'Increased donor acquisition by 300% for a charity using Facebook fundraising ads.', whatICanDo: 'Donor journey mapping, grant SEO, volunteer recruitment, impact storytelling.', results: ['300% donors', '2.8x ROAS', '45% lower CPA'] },
  { name: 'Entertainment', icon: Play, color: 'from-violet-500/20 to-purple-500/20', projects: 10, whatIDid: 'Helped a streaming platform acquire 50K+ subscribers using YouTube Ads + influencer marketing.', whatICanDo: 'Content promotion, audience building, ticket sales optimization, fan engagement.', results: ['50K subscribers', '3.5x ROAS', '38% lower CPA'] },
  { name: 'Gaming', icon: Target, color: 'from-fuchsia-500/20 to-pink-500/20', projects: 9, whatIDid: 'Scaled a mobile game from 0 to 500K downloads using TikTok + App Store optimization.', whatICanDo: 'App store SEO, influencer campaigns, community building, retention optimization.', results: ['500K downloads', '$0.85 CPI', '35% Day-7 retention'] },
  { name: 'Automotive', icon: Zap, color: 'from-slate-500/20 to-gray-500/20', projects: 8, whatIDid: 'Helped a car dealership generate 500+ test drives using Google Local Services Ads.', whatICanDo: 'Local SEO, inventory feeds, service campaign optimization, review generation.', results: ['500+ test drives', '52% lower CPA', '3.8x ROAS'] },
  { name: 'Food & Bev', icon: Coffee, color: 'from-amber-500/20 to-yellow-500/20', projects: 8, whatIDid: 'Scaled a meal kit delivery service from 1K to 15K monthly subscribers using Meta Ads.', whatICanDo: 'Local restaurant SEO, delivery app optimization, loyalty program marketing.', results: ['15K subscribers', '4.2x ROAS', '35% lower CPA'] },
  { name: 'Agencies', icon: Users, color: 'from-rose-500/20 to-pink-500/20', projects: 7, whatIDid: 'Helped a marketing agency generate 80+ qualified leads/month using LinkedIn + content.', whatICanDo: 'Agency positioning, case study marketing, lead generation systems, proposal optimization.', results: ['80+ leads/month', '$52 CPL', '5.1x ROI'] },
  { name: 'Startups', icon: RocketIcon, color: 'from-violet-500/20 to-purple-500/20', projects: 25, whatIDid: 'Helped 25+ startups go from 0 to 10K+ users using growth hacking strategies.', whatICanDo: 'Product-led growth, viral loop design, investor deck SEO, launch strategy.', results: ['10K+ users', '$1.20 CAC', '62% activation'] },
  { name: 'Enterprise', icon: Building2, color: 'from-slate-500/20 to-gray-500/20', projects: 6, whatIDid: 'Optimized global campaigns for a Fortune 500 company across 15 countries.', whatICanDo: 'Enterprise SEO, global PPC, multi-language content, cross-border analytics.', results: ['2.8x ROI', '41% waste reduction', '3.5x budget scale'] },
  { name: 'Local Business', icon: MapPin, color: 'from-cyan-500/20 to-sky-500/20', projects: 35, whatIDid: 'Helped local businesses grow from 5 to 60+ leads/month using Google Maps + Local SEO.', whatICanDo: 'Google Business Profile optimization, local citations, review management, local link building.', results: ['12x leads', '38% lower CPA', '60 leads/month'] },
];

// Enhanced Comparison Table Data
const comparisonData = [
  { 
    aspect: 'Years of Hands-On Experience', 
    agency: 'Average 2-4 years (high turnover, junior talent)', 
    me: '12+ years — I have done it all, seen it all, fixed it all',
    major: true,
    agencyIcon: '📉',
    meIcon: '🏆',
    detail: 'Agencies often assign fresh graduates to your account. I bring over a decade of battle-tested experience.'
  },
  { 
    aspect: 'Who Actually Works On Your Account', 
    agency: 'Rotating junior account managers (changes every 6 months)', 
    me: 'Direct access to me — the expert who built this business',
    major: true,
    agencyIcon: '🔄',
    meIcon: '👨‍💻',
    detail: 'No handovers. No "let me check with my manager". You get decisions instantly.'
  },
  { 
    aspect: 'Response Time & Communication', 
    agency: '24-72 hours (through multiple layers of approval)', 
    me: '2-4 hours — WhatsApp, Call, or Email. Direct line to me.',
    major: true,
    agencyIcon: '🐢',
    meIcon: '⚡',
    detail: 'When a campaign needs immediate attention, I respond. Not a ticket system.'
  },
  { 
    aspect: 'Strategy Development', 
    agency: 'Template-based approach — one size fits all', 
    me: '100% custom strategy built specifically for YOUR business',
    major: true,
    agencyIcon: '📋',
    meIcon: '🎯',
    detail: 'I study your business, competitors, customers, and market before writing a single word of strategy.'
  },
  { 
    aspect: 'Contract & Commitment', 
    agency: '6-12 month lock-in contracts + auto-renewal', 
    me: 'Month-to-month. Cancel anytime. No questions asked.',
    major: false,
    agencyIcon: '🔒',
    meIcon: '🔓',
    detail: 'I earn your business every single month. If you are not happy, you walk away.'
  },
  { 
    aspect: 'Reporting & Metrics', 
    agency: 'Vanity metrics — impressions, clicks, "brand awareness"', 
    me: 'Revenue-tied KPIs — ROAS, CAC, LTV, pipeline value',
    major: true,
    agencyIcon: '📊',
    meIcon: '💰',
    detail: 'I only report on metrics that impact your bottom line. No fluff. No BS.'
  },
  { 
    aspect: 'Team Access & Resources', 
    agency: 'Limited to 1 account manager (the rest are "internal")', 
    me: 'Full team of 25+ specialists — designers, writers, developers, analysts',
    major: false,
    agencyIcon: '👤',
    meIcon: '👥',
    detail: 'You get a full agency\'s firepower. But you pay freelancer rates. And you talk to me directly.'
  },
  { 
    aspect: 'Pricing Model & Transparency', 
    agency: 'High retainers + hidden fees + markup on ad spend', 
    me: 'Use the calculator. Fixed project. Hourly. Whatever works for you.',
    major: true,
    agencyIcon: '💸',
    meIcon: '💎',
    detail: 'No hidden fees. No markup on your ad spend. You pay exactly what we agree.'
  },
  { 
    aspect: 'Industry Experience Depth', 
    agency: 'Generalist — spread thin across 50+ industries', 
    me: 'Deep expertise in 25+ industries with proven playbooks',
    major: false,
    agencyIcon: '🌐',
    meIcon: '🎓',
    detail: 'I bring best practices from every industry I have worked with. Your competitors might be from a different sector.'
  },
  { 
    aspect: 'AI & Technology Integration', 
    agency: 'Basic or outsourced (they charge you extra for "AI services")', 
    me: 'Advanced AI — PMax, Advantage+, GPT optimization, AI funnels',
    major: true,
    agencyIcon: '🤖',
    meIcon: '🧠',
    detail: 'I use AI to automate, optimize, and scale. You get cutting-edge tech without the markup.'
  },
  { 
    aspect: 'Risk & Accountability', 
    agency: 'They get paid even if you get zero results', 
    me: 'My reputation is on the line. I only succeed when you succeed.',
    major: true,
    agencyIcon: '⚠️',
    meIcon: '✅',
    detail: 'I am personally invested in your success. My business grows when your business grows.'
  },
];

// FAQ with detailed answers
const faqs = [
  { q: "What exactly do you do?", a: "I help businesses grow online. SEO, Google Ads, Social Media, everything. Whatever it takes to get you more customers and more sales. I have 12+ years of experience across 25+ industries and 20+ countries." },
  { q: "How are you different from a big agency?", a: "You talk to me directly. No junior account managers. 12 years of experience direct to you. Better pricing. Plus, I use AI and automation to deliver better results faster." },
  { q: "Which industries do you work with?", a: "SaaS, E-commerce, Healthcare, Real Estate, EdTech, Fintech, Travel, Fashion, Manufacturing, Logistics, Legal, Non-Profit, Entertainment, Gaming, Automotive, Food & Beverage, Agencies, Startups, Enterprise, Local Business — 25+ industries in total." },
  { q: "How much do you charge?", a: "Use the cost calculator above to get an instant estimate. Every business is different, so I customize pricing based on your specific needs and goals." },
  { q: "When will I see results?", a: "Google Ads can show leads in 2-3 days. SEO typically takes 3-6 months. I give realistic timelines — no false promises." },
  { q: "Do you work with startups?", a: "Absolutely! I have worked with 25+ startups. I know how to get results even with limited budgets." },
  { q: "Can you manage my existing team?", a: "Yes. I work in two ways — either guide your existing team as a consultant, or do the full execution with my team of 25+ specialists." },
  { q: "Do you sign NDAs?", a: "Yes. I sign NDAs before discussing any sensitive business details. Confidentiality is standard for me." },
  { q: "Which countries do you work with?", a: "USA, UK, Canada, Australia, India, UAE, Singapore, Germany, France, Netherlands, Sweden, Japan — and many more." },
  { q: "What platforms do you advertise on?", a: "Google (Search, Display, YouTube, PMax), Meta (Facebook, Instagram, Advantage+), LinkedIn, TikTok, Twitter, Pinterest, Snapchat, Reddit, Quora." },
];

// FAQ Item Component
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a0f1c]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-all duration-300"
      >
        <span className="text-white font-medium text-base md:text-lg">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-[#c9a84c]" size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10"
          >
            <div className="px-6 py-5 text-white/60 text-sm leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WorldMap() {
  return (
<div className="w-full max-w-[500px] mx-auto scale-95">
      <div className="map-3d-container">
        <div className="map-3d" />
      </div>

    </div>
  );
}
export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  useEffect(() => {
  document.title = "Digital Marketing Consultant | Pranjal Digital";

  setMeta(
    "Work with a digital marketing consultant offering SEO, Google Ads, Meta Ads, and full-funnel strategies to drive traffic, leads, and measurable growth."
  );
}, []);
  const [selectedIndustry, setSelectedIndustry] = useState(industriesData[0]);
  const statsRef = useRef(null);
  
  return (
    <div className="bg-[#080c14] overflow-hidden">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080c14] via-[#0a0f1c] to-[#080c14]" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#c9a84c]/5 blur-[100px]"
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[120px]"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/30 rounded-full px-5 py-2 mb-8"
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" 
            />
            <span className="text-[#c9a84c] text-sm font-medium">👋 Namaste! I'm Pranjal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-white">12+ Years of Making</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent">
              Digital Magic Happen
            </span>
            <br />
            <span className="text-white/90">For Businesses Worldwide</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            I have helped 400+ businesses grow online across 20+ countries — from startups to enterprises. 
            Generated millions in revenue, managed millions in ad spend, and delivered 6X-7X ROAS consistently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-[#c9a84c]/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Free Strategy Call <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </span>
            </a>
            <Link href="/services">
              <a className="border-2 border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-all duration-300">
                Explore Services
              </a>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={28} className="text-white/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

     

      {/* ========== STATS SECTION ========== */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-[#080c14] to-[#040608]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <StatCard value={12} suffix="+" label="Years Experience" />
            <StatCard value={400} suffix="+" label="Happy Clients" />
            <StatCard value={20} suffix="+" label="Countries Served" />
            <StatCard value={5} suffix="M+" label="Revenue Generated" />
            <StatCard value={7} suffix="X" label="Avg ROAS" />
          </div>
        </div>
      </section>

      {/* ========== GLOBAL PRESENCE SECTION ========== */}
      <section className="py-16 bg-gradient-to-b from-[#040608] to-[#080c14]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Globe size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">GLOBAL PRESENCE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Working With Clients Across<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> 20+ Countries</span>
            </h2>
            <p className="text-white/60 text-base max-w-3xl mx-auto leading-relaxed">
              From United States and Canada to United Kingdom, Germany, France, and Netherlands in Europe. 
              From India and Singapore to Japan and Australia in Asia-Pacific. 
              I have helped businesses succeed across different markets, cultures, and consumer behaviors. 
              Each country has its own search engines, social platforms, and buying habits — and I understand them all.
            </p>
          </motion.div>
          
<div className="grid lg:grid-cols-2 gap-6 items-center">
  {/* LEFT CONTENT */}
 <div className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
 

  {/* Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 to-transparent opacity-40" />

  <div className="relative z-10">

    {/* Heading */}
    <h3 className="text-[#c9a84c] font-semibold mb-3 text-xs uppercase tracking-wider">
      Global Clients
    </h3>

    {/* Live indicator */}
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 bg-[#c9a84c] rounded-full animate-pulse" />
      <span className="text-white/50 text-xs">Active Across Multiple Markets</span>
    </div>

    {/* Countries */}
    <div className="grid grid-cols-2 gap-3 text-white/80 text-sm mb-5">

      <span>🇺🇸 United States</span>
      <span>🇮🇳 India</span>
      <span>🇨🇦 Canada</span>
      <span>🇬🇧 United Kingdom</span>
      <span>🇩🇪 Germany</span>
      <span>🇫🇷 France</span>
      <span>🇳🇱 Netherlands</span>
      <span>🇸🇪 Sweden</span>
      <span>🇸🇬 Singapore</span>
      <span>🇯🇵 Japan</span>
      <span>🇦🇺 Australia</span>
      <span>🇦🇪 UAE</span>

    </div>

    {/* Divider */}
    <div className="border-t border-white/10 my-4" />

    {/* STATS (MAIN FIX 🔥) */}
    <div className="grid grid-cols-3 text-center">

      <div>
        <p className="text-[#c9a84c] font-bold text-xl">400+</p>
        <p className="text-white/40 text-xs">Clients</p>
      </div>

      <div>
        <p className="text-[#c9a84c] font-bold text-xl">20+</p>
        <p className="text-white/40 text-xs">Countries</p>
      </div>

      <div>
        <p className="text-[#c9a84c] font-bold text-xl">12+</p>
        <p className="text-white/40 text-xs">Years</p>
      </div>

    </div>

    {/* Bottom line */}
    <div className="mt-4 text-white/40 text-xs text-center">
      Proven Global Experience
    </div>

  </div>
</div>

  {/* RIGHT MAP */}
  <WorldMap />

</div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-white/40 text-sm">
              🌍 United States • Canada • United Kingdom • Germany • France • Netherlands • Sweden • India • Singapore • Japan • Australia • UAE
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== VIDEO SECTION ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#080c14] to-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-6">
                <Play size={14} className="text-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs font-medium">WATCH MY STORY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why I Started Pranjal Digital?
              </h2>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                I saw too many businesses getting ripped off by agencies. Paying huge fees for fancy reports but getting zero results.
              </p>
              <p className="text-white/60 mb-6 leading-relaxed">
                So I decided to do things differently. Direct access to an expert. Transparent pricing via calculator. Results that actually matter.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                  <CheckCircle2 size={16} className="text-[#c9a84c]" />
                  <span className="text-white/70 text-sm">12+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                  <CheckCircle2 size={16} className="text-[#c9a84c]" />
                  <span className="text-white/70 text-sm">400+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                  <CheckCircle2 size={16} className="text-[#c9a84c]" />
                  <span className="text-white/70 text-sm">20+ Countries</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
             <div className="relative group cursor-pointer z-10" onClick={() => setVideoOpen(true)}>
             <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] rounded-2xl blur opacity-20 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden w-full aspect-video bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10">
                  <img
  src="https://img.youtube.com/vi/MjqcQ46ai5Y/hqdefault.jpg"
  onError={(e) => {
    e.currentTarget.src = "https://img.youtube.com/vi/MjqcQ46ai5Y/0.jpg";
  }}

  alt="Video thumbnail"
  className="absolute inset-0 w-full h-full object-cover"
/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282] flex items-center justify-center shadow-2xl"
                    >
                      <Play className="text-[#080c14] ml-1" size={40} fill="#080c14" />
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium text-sm">🎬 Watch: Who is Pranjal & Why I Started This Journey</p>
                    <p className="text-white/40 text-xs">2 min explainer video</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition"
              >
                <X size={28} />
              </button>
              <div className="aspect-video bg-black">
              <iframe
  key={videoOpen}
  className="w-full h-full"
  src={`https://www.youtube.com/embed/MjqcQ46ai5Y?autoplay=1&rel=0&modestbranding=1`}
  title="Pranjal Digital - My Story"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== FUNNEL PYRAMID ========== */}
      <FunnelPyramid />

      {/* ========== COST CALCULATOR ========== */}
      <CostCalculator />

      {/* ========== COMPLETE DIGITAL MARKETING ECOSYSTEM ========== */}
      <section className="py-24 bg-gradient-to-b from-[#080c14] to-[#040608]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Layers size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">COMPLETE ECOSYSTEM</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Digital<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Marketing Ecosystem</span>
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto mb-6">
              SEO • AEO • GEO • Performance Marketing • Content • CRO • LinkedIn Sales Navigator • AI-Powered Everything
            </p>
            <p className="text-white/50 text-base max-w-3xl mx-auto leading-relaxed">
              I don't just do SEO. I optimize for Answer Engines (Alexa, Siri) AND Generative Engines (ChatGPT, Perplexity). 
              I don't just run ads. I use Google PMax, Meta Advantage+, and TikTok's AI to maximize every dollar. 
              I don't just build funnels. I automate them with AI — chatbots, personalized sequences, lead scoring.
              This is not your father's digital marketing. This is marketing for 2026 and beyond.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiServices.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/40 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 border border-white/10 rounded-full px-2 py-1 text-white/50">
                      {feature}
                    </span>
                  ))}
                </div>
                <p className="text-white/40 text-xs leading-relaxed border-t border-white/10 pt-3 mt-2">
                  {service.detailedDesc}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/services">
              <a className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#c9a84c]/30">
                View All 14+ Detailed Services <ArrowRight size={18} />
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== INDUSTRIES SECTION - 25+ INDUSTRIES ========== */}
      <section className="py-24 bg-[#040608]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Briefcase size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">INDUSTRY EXPERTISE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Worked Across<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> 25+ Industries</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Each industry has its own playbook. And I have mastered most of them. 
              From SaaS to Manufacturing, Healthcare to Gaming — I bring best practices from every sector.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {industriesData.map((industry, i) => (
                  <motion.button
                    key={industry.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      selectedIndustry?.name === industry.name
                        ? `bg-gradient-to-r ${industry.color} border border-[#c9a84c]/40 shadow-lg shadow-[#c9a84c]/10`
                        : 'bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <industry.icon size={18} className="text-[#c9a84c]" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white font-medium text-sm">{industry.name}</div>
                      <div className="text-white/40 text-xs">{industry.projects}+ projects</div>
                    </div>
                    {selectedIndustry?.name === industry.name && (
                      <CheckCircle2 size={14} className="text-[#c9a84c]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              key={selectedIndustry?.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:w-3/5 bg-gradient-to-br from-[#0a0f1c] to-[#040608] rounded-2xl border border-white/10 p-6 md:p-8"
            >
              {selectedIndustry && (
                <>
                  <div className="flex items-center gap-4 mb-6 flex-wrap">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedIndustry.color} flex items-center justify-center`}>
                      <selectedIndustry.icon size={32} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedIndustry.name}</h3>
                      <p className="text-white/50 text-sm">{selectedIndustry.projects}+ projects completed</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-[#c9a84c] font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 size={16} /> What I Have Done
                      </h4>
                      <p className="text-white/70 leading-relaxed">{selectedIndustry.whatIDid}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-[#c9a84c] font-semibold mb-2 flex items-center gap-2">
                        <Target size={16} /> What I Can Do For You
                      </h4>
                      <p className="text-white/70 leading-relaxed">{selectedIndustry.whatICanDo}</p>
                    </div>

                    <div>
                      <h4 className="text-[#c9a84c] font-semibold mb-3 flex items-center gap-2">
                        <TrendingIcon size={16} /> Key Results I Have Delivered
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {selectedIndustry.results.map((result, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-xl p-3 text-center border border-[#c9a84c]/20">
                            <div className="text-[#c9a84c] font-bold text-sm">{result}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-white/40 text-sm">
Pranjal Digital brings proven experience across 25+ industries, delivering results across diverse niches. With strong expertise in campaign planning, audience targeting, funnel optimization, and analytics, we understand what drives performance. Our multi-industry exposure enables agile strategy execution, data-driven decisions, and scalable growth, helping brands maximize visibility, engagement, and conversions across digital channels.            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== ENHANCED 3D COMPARISON TABLE ========== */}
    {/* ========== PREMIUM COMPARISON TABLE (CLEAN + HIGH-END) ========== */}
<section className="py-20 bg-[#080c14] relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-[#c9a84c]/10 blur-[120px]" />
  </div>

  <div className="relative max-w-6xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
        Big Agency vs <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Pranjal Digital</span>
      </h2>
      <p className="text-white/60">
        Clear differences. No fluff. Just what impacts your growth.
      </p>
    </div>

    {/* Table */}
    <div className="rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl">

      {/* Header */}
      <div className="grid grid-cols-3 bg-[#0a0f1c] text-sm font-semibold">
        <div className="p-4 text-white/40">Factor</div>
        <div className="p-4 text-center text-white/50 border-l border-white/10">
          Big Agency
        </div>
        <div className="p-4 text-center border-l border-[#c9a84c]/30 bg-[#c9a84c]/5 text-[#c9a84c]">
          Pranjal Digital
        </div>
      </div>

      {/* Rows */}
      {[
        {
          title: "Experience",
          agency: "2–4 yrs avg team",
          me: "12+ yrs hands-on",
        },
        {
          title: "Who Works On Account",
          agency: "Junior managers",
          me: "Direct expert",
        },
        {
          title: "Communication",
          agency: "24–72 hrs delay",
          me: "Same-day response",
        },
        {
          title: "Strategy",
          agency: "Template-based",
          me: "Custom-built",
        },
        {
          title: "Execution Speed",
          agency: "Slow approvals",
          me: "Fast & agile",
        },
        {
          title: "Pricing",
          agency: "High retainers",
          me: "Flexible & transparent",
        },
        {
          title: "Metrics",
          agency: "Clicks & impressions",
          me: "Revenue & ROI",
        },
        {
          title: "Accountability",
          agency: "Low ownership",
          me: "Direct responsibility",
        },
      ].map((row, i) => (

        <div
          key={i}
          className="grid grid-cols-3 text-sm border-t border-white/10 hover:bg-white/5 transition"
        >

          {/* Factor */}
          <div className="p-4 text-white font-medium">
            {row.title}
          </div>

          {/* Agency */}
          <div className="p-4 text-center text-white/50 border-l border-white/10 flex items-center justify-center gap-2">
            <span className="text-red-400">✕</span>
            {row.agency}
          </div>

          {/* Me */}
          <div className="p-4 text-center border-l border-[#c9a84c]/20 bg-gradient-to-r from-[#c9a84c]/5 to-transparent flex items-center justify-center gap-2">
            <span className="text-[#c9a84c]">✓</span>
            <span className="text-white/80 font-medium">{row.me}</span>
          </div>

        </div>
      ))}

    </div>

  </div>
</section>
      {/* ========== FAQ SECTION ========== */}
      <section className="py-24 bg-gradient-to-b from-[#040608] to-[#080c14]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Coffee size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">QUESTIONS?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Questions</span>
            </h2>
            <p className="text-white/50 text-lg">
              Everything you wanted to know. In simple English. No BS.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-6">
              <RocketIcon size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">READY TO GROW?</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5">
              Ready to Scale Your<br />
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                Digital Marketing ROI?
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Let's hop on a 30-min call. No pressure. No sales pitch. Just honest advice on how to grow your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold px-10 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#c9a84c]/30 flex items-center gap-2 text-lg"
              >
                Book Free Strategy Call <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </a>
              <Link href="/contact">
                <a className="border-2 border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-all duration-300 text-lg">
                  Send a Message
                </a>
              </Link>
            </div>
            <p className="text-white/30 text-sm mt-6">
              ⏰ 30-min free consultation • No obligation • Real advice • Use calculator for pricing
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
