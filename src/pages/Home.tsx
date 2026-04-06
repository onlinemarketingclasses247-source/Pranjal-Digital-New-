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
  Zap as ZapIcon, TrendingUp as TrendingIcon, Award as AwardIcon
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// Rating platforms data
const ratingPlatforms = [
  { name: 'Google Business', rating: 4.9, reviews: 85, icon: '⭐', color: '#4285F4' },
  { name: 'Clutch', rating: 4.8, reviews: 42, icon: '🏆', color: '#4B3B2B' },
  { name: 'G2', rating: 4.7, reviews: 38, icon: '⭐', color: '#FF6C2D' },
  { name: 'Trustpilot', rating: 4.6, reviews: 56, icon: '⭐', color: '#00B67A' },
  { name: 'Glassdoor', rating: 4.5, reviews: 28, icon: '🏢', color: '#00A162' },
  { name: 'Ambition Box', rating: 4.8, reviews: 35, icon: '📦', color: '#FF6B00' },
  { name: 'Yelp', rating: 4.5, reviews: 22, icon: '⭐', color: '#D32323' },
  { name: 'UpCity', rating: 4.9, reviews: 45, icon: '⭐', color: '#00A651' },
  { name: 'GoodFirms', rating: 4.7, reviews: 31, icon: '⭐', color: '#F26522' },
];

// Custom hook for counting animation with scroll trigger
function useCountUp(end: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
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
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useCountUp(value, 2000, inView && !hasAnimated);
  
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center relative"
    >
      <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent mb-2">
        {hasAnimated ? count : 0}{suffix}
      </div>
      <div className="text-white/50 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

// 3D Globe Component with countries
const countriesData = [
  { name: 'United States', code: 'US', x: 60, y: 35, capital: 'Washington DC', projects: 85 },
  { name: 'United Kingdom', code: 'UK', x: 52, y: 30, capital: 'London', projects: 42 },
  { name: 'Canada', code: 'CA', x: 55, y: 28, capital: 'Ottawa', projects: 38 },
  { name: 'Australia', code: 'AU', x: 70, y: 55, capital: 'Canberra', projects: 35 },
  { name: 'India', code: 'IN', x: 48, y: 42, capital: 'New Delhi', projects: 67 },
  { name: 'Singapore', code: 'SG', x: 58, y: 45, capital: 'Singapore', projects: 29 },
  { name: 'Germany', code: 'DE', x: 48, y: 28, capital: 'Berlin', projects: 31 },
  { name: 'France', code: 'FR', x: 46, y: 30, capital: 'Paris', projects: 28 },
  { name: 'UAE', code: 'AE', x: 52, y: 38, capital: 'Dubai', projects: 24 },
  { name: 'Japan', code: 'JP', x: 75, y: 40, capital: 'Tokyo', projects: 22 },
];

function GlobeMap() {
  const [activeCountry, setActiveCountry] = useState(null);
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10">
      {/* Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/20" />
      
      {/* Globe Container */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0.4) 100%)',
        }}
      >
        {/* Continents (Simplified SVG representation) */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 400">
          {/* North America */}
          <path d="M150,80 L180,70 L220,90 L240,120 L230,160 L200,180 L170,170 L150,140 L140,110 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1" />
          {/* South America */}
          <path d="M220,200 L250,210 L260,250 L240,290 L210,280 L200,240 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1" />
          {/* Europe */}
          <path d="M380,60 L420,50 L440,70 L430,100 L400,110 L370,90 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1" />
          {/* Africa */}
          <path d="M390,130 L430,120 L450,160 L440,210 L410,220 L380,180 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1" />
          {/* Asia */}
          <path d="M500,50 L560,40 L600,70 L620,110 L580,140 L540,130 L510,100 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1" />
          {/* Australia */}
          <path d="M580,250 L620,240 L650,270 L630,290 L590,280 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1" />
        </svg>
        
        {/* Country Markers with animation */}
        {countriesData.map((country, idx) => {
          const angle = (idx / countriesData.length) * 360 + rotation;
          const radian = angle * Math.PI / 180;
          const x = 50 + Math.cos(radian) * 35;
          const y = 45 + Math.sin(radian) * 25;
          
          return (
            <motion.div
              key={country.code}
              className="absolute cursor-pointer group"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setActiveCountry(country)}
              onMouseLeave={() => setActiveCountry(null)}
              animate={{ scale: activeCountry?.code === country.code ? 1.2 : 1 }}
            >
              <div className="w-3 h-3 rounded-full bg-[#c9a84c] animate-pulse shadow-lg shadow-[#c9a84c]/50" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="font-bold">{country.name}</div>
                <div className="text-[#c9a84c] text-[10px]">{country.projects}+ projects</div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Active Country Details Panel */}
      <AnimatePresence>
        {activeCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-[#c9a84c]/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">{activeCountry.name}</h3>
                <p className="text-white/60 text-xs">Capital: {activeCountry.capital}</p>
              </div>
              <div className="text-right">
                <p className="text-[#c9a84c] font-bold">{activeCountry.projects}+</p>
                <p className="text-white/40 text-xs">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Services data with AI focus
const aiServices = [
  { 
    icon: Search, 
    name: 'SEO + AEO + GEO', 
    desc: 'Traditional SEO + Answer Engine Optimization + Generative Engine Optimization. Rank on Google, ChatGPT, Perplexity, and all AI search engines.',
    features: ['Voice search optimization', 'Featured snippets domination', 'AI crawler optimization', 'Knowledge graph integration']
  },
  { 
    icon: Target, 
    name: 'AI-Powered PPC', 
    desc: 'Google PMax, Meta Advantage+, TikTok Smart campaigns — AI-driven ad optimization for maximum ROI.',
    features: ['Automated bidding strategies', 'Dynamic creative optimization', 'Predictive audience targeting', 'Real-time budget allocation']
  },
  { 
    icon: Brain, 
    name: 'AI Funnel Building', 
    desc: 'Complete funnel automation using AI — from lead capture to conversion and retention.',
    features: ['Chatbot integration', 'Personalized email sequences', 'AI lead scoring', 'Automated retargeting']
  },
  { 
    icon: LineChart, 
    name: 'Performance Marketing', 
    desc: 'Data-driven campaigns across all channels. Every dollar tracked, every conversion measured.',
    features: ['Cross-channel attribution', 'Real-time dashboards', 'A/B testing at scale', 'ROAS optimization']
  },
  { 
    icon: PenTool, 
    name: 'AI Content Strategy', 
    desc: 'Content that ranks on traditional and AI search engines. Blog, video, podcast — all optimized.',
    features: ['Topic clustering', 'Entity-based SEO', 'Content atomization', 'AI content optimization']
  },
  { 
    icon: Activity, 
    name: 'CRO + Analytics', 
    desc: 'Convert more visitors into customers. Heatmaps, session recordings, and AI-powered recommendations.',
    features: ['Funnel analysis', 'User behavior tracking', 'A/B testing framework', 'Conversion prediction']
  },
  { 
    icon: Linkedin, 
    name: 'LinkedIn Sales Navigator', 
    desc: 'B2B lead generation at scale. Target decision makers, automate outreach, close deals.',
    features: ['Advanced search filters', 'Lead list building', 'Automated connection requests', 'CRM integration']
  },
  { 
    icon: RocketIcon, 
    name: 'Growth Hacking', 
    desc: 'Creative, data-driven strategies to grow fast. Perfect for startups and scaling businesses.',
    features: ['Viral loop design', 'Referral programs', 'Community building', 'Rapid experimentation']
  },
];

// Industry data with detailed explanations
const industriesData = [
  { 
    name: 'SaaS', 
    icon: Cpu, 
    color: 'from-purple-500/20 to-pink-500/20',
    whatIDid: 'Helped a B2B SaaS company grow from $3K to $28K MRR in 6 months using SEO and PPC.',
    whatICanDo: 'Reduce CAC, improve trial-to-paid conversion, optimize onboarding flow, and scale predictably.',
    results: ['933% MRR growth', '46% lower CPL', '2.3x conversion rate']
  },
  { 
    name: 'E-commerce', 
    icon: DollarSign, 
    color: 'from-orange-500/20 to-red-500/20',
    whatIDid: 'Took a DTC brand from 1.7x to 4.2x ROAS in 90 days using Meta Ads + TikTok.',
    whatICanDo: 'Optimize product feeds, build retargeting funnels, scale winning products, reduce cart abandonment.',
    results: ['4.2x ROAS', '3.1x revenue', '68% better CTR']
  },
  { 
    name: 'Healthcare', 
    icon: Shield, 
    color: 'from-green-500/20 to-emerald-500/20',
    whatIDid: 'Increased patient bookings by 300% for a UK clinic using local SEO + Google Ads.',
    whatICanDo: 'HIPAA-compliant marketing, patient acquisition funnels, reputation management, local dominance.',
    results: ['300% bookings', '4.1x organic traffic', '£28 cost per booking']
  },
  { 
    name: 'Real Estate', 
    icon: Building2, 
    color: 'from-yellow-500/20 to-amber-500/20',
    whatIDid: 'Reduced cost per lead by 52% for a real estate developer using audience segmentation.',
    whatICanDo: 'Property listing optimization, local SEO, Facebook housing ads, lead qualification funnels.',
    results: ['52% lower CPL', '3.8x lead volume', 'Better lead quality']
  },
  { 
    name: 'EdTech', 
    icon: Star, 
    color: 'from-indigo-500/20 to-blue-500/20',
    whatIDid: 'Scaled an education platform from ₹2L to ₹18L monthly revenue using webinar funnels.',
    whatICanDo: 'Course marketing, student acquisition, webinar optimization, email automation.',
    results: ['9x revenue', '34% webinar show rate', 'Lower CAC']
  },
  { 
    name: 'Fintech', 
    icon: TrendingUp, 
    color: 'from-emerald-500/20 to-teal-500/20',
    whatIDid: 'Helped a payment gateway acquire 500+ businesses in 3 months using LinkedIn Ads.',
    whatICanDo: 'Compliance-friendly marketing, B2B lead generation, trust-building content, partnership marketing.',
    results: ['500+ business accounts', '42% lower CPA', '3x ROI']
  },
  { 
    name: 'Travel', 
    icon: Globe, 
    color: 'from-cyan-500/20 to-sky-500/20',
    whatIDid: 'Increased booking revenue by 280% for a travel agency using Google Hotel Ads + retargeting.',
    whatICanDo: 'Seasonal campaign planning, destination SEO, review management, package promotion.',
    results: ['280% revenue', '54% lower CPA', '2.5x ROAS']
  },
  { 
    name: 'Fashion', 
    icon: Sparkles, 
    color: 'from-pink-500/20 to-rose-500/20',
    whatIDid: 'Grew an Instagram-first fashion brand from 0 to 50K monthly visitors using influencer marketing.',
    whatICanDo: 'Visual content strategy, influencer partnerships, shoppable posts, UGC campaigns.',
    results: ['50K monthly visitors', '3.2x ROAS', '40% lower CAC']
  },
];

// 3D Comparison Table Data
const comparisonData = [
  { 
    aspect: 'Years of Experience', 
    agency: 'Average 2-4 years (high turnover)', 
    me: '12+ years hands-on expertise',
    major: true,
    agencyIcon: '😕',
    meIcon: '🏆'
  },
  { 
    aspect: 'Who You Work With', 
    agency: 'Junior account managers (rotating)', 
    me: 'Direct access to me — the expert',
    major: true,
    agencyIcon: '🔄',
    meIcon: '👨‍💻'
  },
  { 
    aspect: 'Response Time', 
    agency: '24-48 hours (through layers)', 
    me: '2-4 hours (direct WhatsApp/Call)',
    major: true,
    agencyIcon: '🐢',
    meIcon: '⚡'
  },
  { 
    aspect: 'Strategy Customization', 
    agency: 'Template-based approach', 
    me: '100% custom — built for your business',
    major: true,
    agencyIcon: '📋',
    meIcon: '🎯'
  },
  { 
    aspect: 'Contract Flexibility', 
    agency: '6-12 month lock-in', 
    me: 'Month-to-month — cancel anytime',
    major: false,
    agencyIcon: '🔒',
    meIcon: '🔓'
  },
  { 
    aspect: 'Reporting Focus', 
    agency: 'Vanity metrics (impressions, clicks)', 
    me: 'Revenue-tied KPIs (ROAS, CAC, LTV)',
    major: true,
    agencyIcon: '📊',
    meIcon: '💰'
  },
  { 
    aspect: 'Team Access', 
    agency: 'Limited to your account manager', 
    me: 'Full team of specialists (designers, writers, analysts)',
    major: false,
    agencyIcon: '👤',
    meIcon: '👥'
  },
  { 
    aspect: 'Pricing Model', 
    agency: 'High retainers + hidden fees', 
    me: 'Transparent — use calculator or custom quote',
    major: true,
    agencyIcon: '💸',
    meIcon: '💎'
  },
  { 
    aspect: 'Industry Experience', 
    agency: 'Generalist (spread thin)', 
    me: 'Deep expertise in 20+ industries',
    major: false,
    agencyIcon: '🌐',
    meIcon: '🎓'
  },
  { 
    aspect: 'AI Integration', 
    agency: 'Basic or outsourced', 
    me: 'Advanced AI — PMax, Advantage+, GPT optimization',
    major: true,
    agencyIcon: '🤖',
    meIcon: '🧠'
  },
];

// FAQ with global, no pricing mentioned
const faqs = [
  { q: "Bhai, what exactly do you do?", a: "Simple bhai — I help businesses grow online. SEO, Google Ads, Social Media, everything. Whatever it takes to get you more customers and more sales." },
  { q: "How are you different from a big agency?", a: "Agencies me tum ek number se call karte ho. Yahan tum mere se direct baat karoge. No junior account managers. 12 saal ka experience direct tumhe milega. Aur better pricing bhi hai." },
  { q: "Which industries do you work with?", a: "IT, SaaS, Healthcare, Real Estate, E-commerce, Education, Finance — almost sab. Har industry ka alag formula hai, aur mere paas sabka experience hai." },
  { q: "How much do you charge?", a: "Use the cost calculator above to get an instant estimate. Every business is different, so I customize pricing based on your specific needs and goals." },
  { q: "When will I see results?", a: "Google Ads can show leads in 2-3 days. SEO typically takes 3-6 months. I give realistic timelines — no false promises." },
  { q: "Do you work with startups?", a: "Absolutely! I have worked with many startups. I know how to get results even with limited budgets." },
  { q: "Can you manage my existing team?", a: "Yes yes. I work in two ways — either guide your existing team, or do the execution myself. Whatever suits you better." },
  { q: "Do you sign NDAs?", a: "Obviously. I sign NDAs before discussing any sensitive business details. Confidentiality is standard for me." },
  { q: "Which countries do you work with?", a: "USA, UK, Canada, Australia, India, UAE, Singapore, Germany — and many more. I understand different markets and cultures." },
  { q: "What platforms do you advertise on?", a: "Google, Meta (Facebook/Instagram), LinkedIn, TikTok, Twitter, Pinterest, Snapchat — I choose platforms where your audience actually converts." },
];

// FAQ Item Component
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
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

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(industriesData[0]);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  
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

      {/* ========== RATINGS SECTION ========== */}
      <section className="py-12 bg-gradient-to-r from-[#040608] to-[#080c14] border-y border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <AwardIcon size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">TRUSTED & VERIFIED</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Rated <span className="text-[#c9a84c]">4.8+ Stars</span> Across Top Platforms
            </h2>
            <p className="text-white/50 text-sm mt-2">Real reviews from real clients worldwide</p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ratingPlatforms.map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-[#0a0f1c] border border-white/10 rounded-xl p-3 text-center hover:border-[#c9a84c]/30 transition-all duration-300"
              >
                <div className="text-2xl mb-1">{platform.icon}</div>
                <div className="text-white font-bold text-sm">{platform.name}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="text-[#c9a84c]" size={14} fill="#c9a84c" />
                  <span className="text-white font-bold text-sm">{platform.rating}</span>
                  <span className="text-white/40 text-xs">({platform.reviews})</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION (with scroll-triggered animation) ========== */}
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

      {/* ========== GLOBE MAP SECTION ========== */}
      <section className="py-16 bg-gradient-to-b from-[#040608] to-[#080c14]">
        <div className="max-w-6xl mx-auto px-4">
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
            <p className="text-white/50 text-base max-w-2xl mx-auto">
              From USA to Singapore, UK to Australia — I understand local markets and global audiences
            </p>
          </motion.div>
          
          <GlobeMap />
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
              <div className="relative group cursor-pointer" onClick={() => setVideoOpen(true)}>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10">
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
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
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
            <p className="text-white/50 text-lg max-w-3xl mx-auto">
              SEO • AEO • GEO • Performance Marketing • Content • CRO • LinkedIn Sales Navigator • AI-Powered Everything
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
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                  <service.icon size={28} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 border border-white/10 rounded-full px-2 py-1 text-white/50">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INDUSTRIES SECTION (Scroller + Details) ========== */}
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
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Each industry has its own playbook. And I have mastered most of them.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Industry Scroller */}
            <div className="lg:w-1/3">
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                {industriesData.map((industry, i) => (
                  <motion.button
                    key={industry.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                      selectedIndustry?.name === industry.name
                        ? `bg-gradient-to-r ${industry.color} border border-[#c9a84c]/40 shadow-lg shadow-[#c9a84c]/10`
                        : 'bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <industry.icon size={20} className="text-[#c9a84c]" />
                    </div>
                    <span className="text-white font-medium text-sm">{industry.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Industry Details Panel */}
            <motion.div
              key={selectedIndustry?.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:w-2/3 bg-gradient-to-br from-[#0a0f1c] to-[#040608] rounded-2xl border border-white/10 p-6 md:p-8"
            >
              {selectedIndustry && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedIndustry.color} flex items-center justify-center`}>
                      <selectedIndustry.icon size={32} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedIndustry.name}</h3>
                      <p className="text-white/50 text-sm">Industry Deep Dive</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[#c9a84c] font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 size={16} /> What I Have Done
                      </h4>
                      <p className="text-white/70 leading-relaxed">{selectedIndustry.whatIDid}</p>
                    </div>

                    <div>
                      <h4 className="text-[#c9a84c] font-semibold mb-2 flex items-center gap-2">
                        <Target size={16} /> What I Can Do For You
                      </h4>
                      <p className="text-white/70 leading-relaxed">{selectedIndustry.whatICanDo}</p>
                    </div>

                    <div>
                      <h4 className="text-[#c9a84c] font-semibold mb-3 flex items-center gap-2">
                        <TrendingIcon size={16} /> Key Results
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {selectedIndustry.results.map((result, idx) => (
                          <div key={idx} className="bg-white/5 rounded-xl p-3 text-center">
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
        </div>
      </section>

      {/* ========== 3D COMPARISON TABLE ========== */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Award size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">THE TRUTH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Big Agency vs<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Me</span>
            </h2>
            <p className="text-white/50 text-lg">
              Why pay agency rates when you can work directly with an expert?
            </p>
          </motion.div>

          <div className="relative perspective-1000">
            <div className="grid grid-cols-1 gap-3 transform-style-3d">
              {/* Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-[#0a0f1c] to-[#040608] rounded-t-2xl border border-white/10 overflow-hidden">
                <div className="p-4 text-white/40 text-xs font-semibold uppercase">Factor</div>
                <div className="p-4 text-center text-white/40 text-xs font-semibold uppercase border-l border-white/10">Big Agency</div>
                <div className="p-4 text-center border-l border-[#c9a84c]/40 bg-[#c9a84c]/5">
                  <span className="text-[#c9a84c] text-xs font-semibold uppercase">Pranjal Digital</span>
                </div>
              </div>
              
              {/* Rows with 3D effect */}
              {comparisonData.map((row, i) => (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, rotateX: -10 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.01, zIndex: 10 }}
                  className={`grid grid-cols-3 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${
                    row.major ? 'bg-gradient-to-r from-[#c9a84c]/5 to-transparent' : 'bg-[#040608]'
                  } hover:border-[#c9a84c]/40 hover:shadow-lg hover:shadow-[#c9a84c]/10`}
                  style={{ transform: 'translateZ(0px)' }}
                >
                  <div className="p-4 text-white font-semibold text-sm flex items-center gap-2">
                    {row.aspect}
                    {row.major && <span className="text-[#c9a84c] text-xs">(Major)</span>}
                  </div>
                  <div className="p-4 border-l border-white/10 flex items-center justify-center gap-2">
                    <span className="text-2xl">{row.agencyIcon}</span>
                    <span className="text-white/60 text-sm">{row.agency}</span>
                  </div>
                  <div className="p-4 border-l border-[#c9a84c]/20 bg-[#c9a84c]/5 flex items-center justify-center gap-2">
                    <span className="text-2xl">{row.meIcon}</span>
                    <span className="text-white/80 text-sm font-medium">{row.me}</span>
                    <Check size={14} className="text-[#c9a84c]" />
                  </div>
                </motion.div>
              ))}
            </div>
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
              Everything you wanted to know. In simple English.
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
