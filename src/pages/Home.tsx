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
  Settings, MapPin, Activity, Radio, Facebook as FacebookLogo,
  Instagram as InstagramLogo, Linkedin as LinkedinLogo, Amazon, Music,
  TrendingUp as TrendingUpIcon, Newspaper, MousePointer, Layout
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// Animated Stat Card
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(value, 2000, inView);
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/10 to-[#c9a84c]/0 rounded-full blur-xl" />
      <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/50 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

// Service categories with detailed breakdown
const serviceCategories = [
  {
    title: "Search Engine Optimization",
    icon: Search,
    color: "#c9a84c",
    description: "Dominate search results with a comprehensive SEO strategy",
    platforms: [
      { name: "Traditional SEO", icon: Search, desc: "Organic rankings & technical optimization" },
      { name: "AEO (Answer Engine Optimization)", icon: Sparkles, desc: "Optimize for voice search & featured snippets" },
      { name: "GEO (Generative Engine Optimization)", icon: Cpu, desc: "Prepare for AI-powered search results" }
    ]
  },
  {
    title: "Performance Marketing / Paid Ads",
    icon: Target,
    color: "#5DCAA5",
    description: "Data-driven campaigns that deliver measurable ROI",
    platforms: [
      { name: "Google Ads", icon: TrendingUp, desc: "Search, Display, Shopping, YouTube & PMax" },
      { name: "Meta Ads", icon: Facebook, desc: "Facebook & Instagram advertising" },
      { name: "LinkedIn Ads", icon: Linkedin, desc: "B2B lead generation & account targeting" },
      { name: "Amazon PPC", icon: Amazon, desc: "Sponsored Products, Brands & Display" },
      { name: "TikTok Ads", icon: Music, desc: "Short-form video advertising" },
      { name: "Taboola & Outbrain", icon: Newspaper, desc: "Native advertising on premium publishers" },
      { name: "Reddit Ads", icon: Radio, desc: "Community-driven targeted campaigns" },
      { name: "Programmatic Ads", icon: Layout, desc: "Automated, AI-driven display advertising" }
    ]
  },
  {
    title: "Content Marketing",
    icon: PenTool,
    color: "#F0997B",
    description: "Strategic content that builds authority and drives action",
    platforms: [
      { name: "Blog & Articles", icon: Newspaper, desc: "SEO-optimized thought leadership" },
      { name: "Video Marketing", icon: Play, desc: "YouTube, TikTok, Instagram Reels" },
      { name: "Podcast Marketing", icon: Radio, desc: "Audio content & guest appearances" },
      { name: "Infographics", icon: PieChart, desc: "Visual data storytelling" },
      { name: "Whitepapers & E-books", icon: Layers, desc: "Deep-dive lead magnets" }
    ]
  },
  {
    title: "Email Marketing",
    icon: Mail,
    color: "#85B7EB",
    description: "Nurture leads and drive repeat sales",
    platforms: [
      { name: "Newsletters", icon: Mail, desc: "Regular engagement campaigns" },
      { name: "Automation Flows", icon: Zap, desc: "Behavior-triggered sequences" },
      { name: "Segmentation", icon: Users, desc: "Personalized targeting" },
      { name: "AB Testing", icon: BarChart3, desc: "Data-optimized campaigns" }
    ]
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    icon: MousePointer,
    color: "#ED93B1",
    description: "Turn more visitors into paying customers",
    platforms: [
      { name: "A/B Testing", icon: Activity, desc: "Data-driven experiment design" },
      { name: "Heatmaps & Analytics", icon: BarChart3, desc: "User behavior insights" },
      { name: "Funnel Optimization", icon: TrendingUpIcon, desc: "Remove drop-off points" },
      { name: "UX Improvements", icon: Layout, desc: "Better user experience = higher conversions" }
    ]
  },
  {
    title: "LinkedIn Sales Navigator",
    icon: Linkedin,
    color: "#97C459",
    description: "Strategic B2B lead generation",
    platforms: [
      { name: "Advanced Search", icon: Search, desc: "Find ideal decision makers" },
      { name: "Lead Lists", icon: Users, desc: "Organized prospect management" },
      { name: "InMail Campaigns", icon: Mail, desc: "Direct outreach automation" },
      { name: "Account Targeting", icon: Building2, desc: "ABM strategy execution" }
    ]
  },
  {
    title: "Social Media Management",
    icon: Share2,
    color: "#c9a84c",
    description: "Build communities that convert",
    platforms: [
      { name: "Instagram", icon: Instagram, desc: "Visual storytelling & engagement" },
      { name: "Facebook", icon: Facebook, desc: "Community building & ads" },
      { name: "LinkedIn", icon: Linkedin, desc: "B2B thought leadership" },
      { name: "Twitter/X", icon: Twitter, desc: "Real-time engagement" },
      { name: "YouTube", icon: Youtube, desc: "Video SEO & content" }
    ]
  }
];

// 25+ Diverse Industries with animation
const industries = [
  { name: 'SaaS', icon: Cpu, gradient: 'from-purple-500/20 to-pink-500/20' },
  { name: 'E-commerce', icon: DollarSign, gradient: 'from-orange-500/20 to-red-500/20' },
  { name: 'Healthcare', icon: Shield, gradient: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Real Estate', icon: Building2, gradient: 'from-yellow-500/20 to-amber-500/20' },
  { name: 'Education', icon: Star, gradient: 'from-indigo-500/20 to-blue-500/20' },
  { name: 'Fintech', icon: TrendingUp, gradient: 'from-emerald-500/20 to-teal-500/20' },
  { name: 'Travel & Hospitality', icon: Globe, gradient: 'from-cyan-500/20 to-sky-500/20' },
  { name: 'Fashion & Beauty', icon: Sparkles, gradient: 'from-pink-500/20 to-rose-500/20' },
  { name: 'Food & Beverage', icon: Coffee, gradient: 'from-amber-500/20 to-yellow-500/20' },
  { name: 'Automotive', icon: Zap, gradient: 'from-slate-500/20 to-gray-500/20' },
  { name: 'Legal Services', icon: Shield, gradient: 'from-blue-500/20 to-indigo-500/20' },
  { name: 'Non-Profit', icon: Heart, gradient: 'from-red-500/20 to-rose-500/20' },
  { name: 'Entertainment', icon: Play, gradient: 'from-violet-500/20 to-purple-500/20' },
  { name: 'Gaming', icon: Target, gradient: 'from-fuchsia-500/20 to-pink-500/20' },
  { name: 'Manufacturing', icon: Settings, gradient: 'from-gray-500/20 to-slate-500/20' },
  { name: 'Logistics', icon: Globe, gradient: 'from-teal-500/20 to-cyan-500/20' },
  { name: 'Agencies', icon: Users, gradient: 'from-rose-500/20 to-pink-500/20' },
  { name: 'Startups', icon: RocketIcon, gradient: 'from-violet-500/20 to-purple-500/20' },
  { name: 'Enterprise', icon: Building2, gradient: 'from-slate-500/20 to-gray-500/20' },
  { name: 'Local Business', icon: Search, gradient: 'from-cyan-500/20 to-sky-500/20' },
  { name: 'Cryptocurrency', icon: TrendingUp, gradient: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Real Estate Tech', icon: Building2, gradient: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'EdTech', icon: Star, gradient: 'from-green-500/20 to-emerald-500/20' },
  { name: 'HealthTech', icon: Shield, gradient: 'from-red-500/20 to-rose-500/20' },
  { name: 'FinTech', icon: DollarSign, gradient: 'from-purple-500/20 to-pink-500/20' }
];

// Pain points - creative design data
const painPoints = [
  { icon: DollarSign, title: "Wasted Ad Spend", desc: "You're burning thousands on ads with little to no return" },
  { icon: Search, title: "Invisible on Google", desc: "Your competitors are ranking above you for every important keyword" },
  { icon: BarChart3, title: "Fancy Reports, Zero Results", desc: "Your agency shows impressive dashboards but your pipeline remains empty" },
  { icon: Users, title: "No Customer Clarity", desc: "You have no idea which channels actually bring paying customers" },
  { icon: Target, title: "Siloed Strategies", desc: "SEO, PPC, and content teams work in isolation with no unified plan" },
  { icon: Clock, title: "Wasted Time", desc: "Your talented team lacks senior strategic direction and clear priorities" }
];

// Comparison table data
const comparisonData = [
  { aspect: "Years of Experience", agency: "Junior account managers (0-2 years)", me: "12+ years hands-on experience" },
  { aspect: "Who You Work With", agency: "Rotating account managers", me: "Work directly with me" },
  { aspect: "Communication Speed", agency: "Slow — layers of approval", me: "Fast & direct decisions" },
  { aspect: "Strategy Depth", agency: "Template-based approach", me: "Custom strategies for your business" },
  { aspect: "Platform Expertise", agency: "Generalist knowledge", me: "Deep expertise across 20+ platforms" },
  { aspect: "Reporting Focus", agency: "Vanity metrics (likes, impressions)", me: "Revenue-tied KPIs only" },
  { aspect: "Contract Flexibility", agency: "Rigid long-term contracts", me: "No lock-in, cancel anytime" },
  { aspect: "Pricing Transparency", agency: "Hidden fees + markups", me: "Use calculator for instant estimate" },
  { aspect: "Team Access", agency: "You never meet the experts", me: "Full access to me and my team" },
  { aspect: "Global Experience", agency: "Local focus only", me: "20+ countries, multiple markets" }
];

// Countries for map
const countries = [
  { name: "India", x: "35%", y: "55%", flag: "🇮🇳" },
  { name: "USA", x: "15%", y: "35%", flag: "🇺🇸" },
  { name: "Canada", x: "10%", y: "28%", flag: "🇨🇦" },
  { name: "UK", x: "38%", y: "30%", flag: "🇬🇧" },
  { name: "Germany", x: "42%", y: "35%", flag: "🇩🇪" },
  { name: "France", x: "40%", y: "38%", flag: "🇫🇷" },
  { name: "Spain", x: "38%", y: "45%", flag: "🇪🇸" },
  { name: "Italy", x: "44%", y: "40%", flag: "🇮🇹" },
  { name: "Australia", x: "85%", y: "70%", flag: "🇦🇺" },
  { name: "UAE", x: "55%", y: "45%", flag: "🇦🇪" },
  { name: "Saudi Arabia", x: "52%", y: "42%", flag: "🇸🇦" },
  { name: "Qatar", x: "54%", y: "44%", flag: "🇶🇦" },
  { name: "Kuwait", x: "51%", y: "43%", flag: "🇰🇼" },
  { name: "Oman", x: "56%", y: "47%", flag: "🇴🇲" },
  { name: "Bahrain", x: "53%", y: "44%", flag: "🇧🇭" },
  { name: "Singapore", x: "75%", y: "55%", flag: "🇸🇬" }
];

// FAQ - Professional, global audience (NO HINDI)
const faqs = [
  { q: "What digital marketing services do you offer?", a: "I offer comprehensive digital marketing services including SEO (Traditional SEO, AEO, GEO), Performance Marketing (Google Ads, Meta Ads, LinkedIn Ads, Amazon PPC, TikTok Ads, Taboola, Outbrain, Reddit Ads, Programmatic Ads), Content Marketing, Email Marketing, Conversion Rate Optimization (CRO), LinkedIn Sales Navigator, and Social Media Management across all major platforms." },
  { q: "How are you different from a traditional marketing agency?", a: "Unlike agencies where you work with junior account managers, you work directly with me — a 12+ year industry veteran. No layers of approval, no template strategies, and no long-term contracts. You get direct access, faster decisions, and strategies that are custom-built for your business." },
  { q: "Which industries do you specialize in?", a: "I have successfully worked with over 25+ industries including SaaS, E-commerce, Healthcare, Real Estate, Fintech, Education, Travel, Manufacturing, and more. Each industry has its unique playbook, and I bring proven strategies from multiple sectors." },
  { q: "How does your pricing work?", a: "Use the cost calculator above to get an instant estimate. I offer flexible engagement models: hourly consulting, fixed-price projects, and monthly partnerships. No hidden fees, no surprises — just transparent pricing based on your specific needs." },
  { q: "When can I expect to see results?", a: "Timelines vary by service. Paid advertising campaigns can show initial leads within 2-3 days. SEO typically takes 3-6 months for significant organic growth. I provide realistic, data-backed timelines — no false promises." },
  { q: "Do you work with startups and small businesses?", a: "Absolutely! I have extensive experience working with startups and small businesses. I understand budget constraints and know how to maximize ROI even with limited resources." },
  { q: "Which countries do you serve?", a: "I work with clients globally across 20+ countries including USA, Canada, UK, Germany, France, Australia, UAE, Saudi Arabia, India, Singapore, and more. I understand different markets, cultures, and consumer behaviors." },
  { q: "What platforms do you advertise on?", a: "Google Ads (Search, Display, Shopping, YouTube, PMax), Meta Ads (Facebook & Instagram), LinkedIn Ads, Amazon PPC, TikTok Ads, Taboola, Outbrain, Reddit Ads, and Programmatic Advertising platforms. I select platforms where your specific audience actually converts." },
  { q: "Do you sign Non-Disclosure Agreements (NDAs)?", a: "Yes, absolutely. I sign NDAs before discussing any sensitive business information. Client confidentiality is a standard practice in all my engagements." },
  { q: "Can you manage my existing marketing team?", a: "Yes, I offer flexible collaboration models. I can either guide and mentor your existing team, or handle full execution myself. Whatever structure works best for your business." }
];

// Service Card Component
function ServiceCard({ service, index }: { service: typeof serviceCategories[0], index: number }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-full blur-2xl" />
      <div className="p-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <service.icon size={28} className="text-[#c9a84c]" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">{service.description}</p>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-[#c9a84c] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          {expanded ? "Show Less" : "View Details"} <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="space-y-3">
                {service.platforms.map((platform, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <platform.icon size={12} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium">{platform.name}</p>
                      <p className="text-white/40 text-xs">{platform.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// FAQ Item Component
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  
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
            <span className="text-[#c9a84c] text-sm font-medium">👋 Global Digital Marketing Expert</span>
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
        </div>
      </section>

      {/* ========== GLOBAL MAP SECTION ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#080c14] to-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Globe size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">GLOBAL REACH</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Serving Clients Across<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> 20+ Countries</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              USA | Canada | UK | Germany | France | Australia | GCC | India | Singapore
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 p-4"
          >
            <div className="relative aspect-[16/9] bg-[#050a12] rounded-xl overflow-hidden">
              {/* Map background SVG */}
              <svg viewBox="0 0 1200 600" className="w-full h-full opacity-40">
                <path d="M150,300 L200,280 L250,290 L300,260 L350,270 L400,250 L450,260 L500,240 L550,250 L600,230 L650,240 L700,220 L750,230 L800,210 L850,220 L900,200 L950,210 L1000,190 L1050,200" stroke="rgba(201,168,76,0.2)" strokeWidth="1" fill="none" />
                <path d="M150,350 L200,330 L250,340 L300,310 L350,320 L400,300 L450,310 L500,290 L550,300 L600,280 L650,290 L700,270 L750,280 L800,260 L850,270 L900,250 L950,260 L1000,240 L1050,250" stroke="rgba(201,168,76,0.15)" strokeWidth="1" fill="none" />
                <circle cx="300" cy="250" r="80" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
                <circle cx="700" cy="200" r="100" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
                <circle cx="500" cy="400" r="60" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
              </svg>
              
              {/* Country dots */}
              {countries.map((country, idx) => (
                <motion.div
                  key={country.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  style={{ left: country.x, top: country.y, position: 'absolute' }}
                  className="relative"
                  onMouseEnter={() => setHoveredCountry(country.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    className="w-3 h-3 rounded-full bg-[#c9a84c] shadow-lg shadow-[#c9a84c]/50 cursor-pointer"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    className="absolute -inset-2 rounded-full bg-[#c9a84c]/20"
                  />
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredCountry === country.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#0a0f1c] border border-[#c9a84c]/40 rounded-lg whitespace-nowrap z-20"
                      >
                        <span className="text-[#c9a84c] text-xs">{country.flag} {country.name}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              
              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full border border-[#c9a84c]/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/3 left-1/4 w-60 h-60 rounded-full border border-[#c9a84c]/5"
              />
            </div>
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

      {/* ========== TRUST BAR ========== */}
      <section className="py-16 bg-gradient-to-r from-[#040608] to-[#080c14] border-y border-[#c9a84c]/10">
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

      {/* ========== FUNNEL PYRAMID ========== */}
      <FunnelPyramid />

      {/* ========== COST CALCULATOR ========== */}
      <CostCalculator />

      {/* ========== SERVICES - DETAILED WITH ICONS ========== */}
      <section className="py-24 bg-gradient-to-b from-[#080c14] to-[#040608]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">COMPREHENSIVE SERVICES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Digital Marketing</span> Ecosystem
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              SEO • AEO • GEO • Performance Marketing • Content • CRO • LinkedIn Sales Navigator
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceCategories.map((service, idx) => (
              <ServiceCard key={service.title} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== PAIN POINTS - CREATIVE SECTION ========== */}
      <section className="py-24 bg-[#040608] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a84c]/5 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-red-400 text-sm">⚠️</span>
              <span className="text-red-400 text-xs font-medium">DOES THIS SOUND FAMILIAR?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Is Your<span className="text-red-400"> Marketing Broken?</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              You're not alone. Here are the most common challenges businesses face.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent hover:border-red-500/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <point.icon size={22} className="text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{point.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg shadow-red-500/30">
              Let's Fix This Together <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== WHY CHOOSE ME ========== */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Heart size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">WHY TRUST ME?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Makes Me<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Different?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'No Corporate Nonsense', desc: 'Plain English, no marketing jargon. Every recommendation makes business sense.' },
              { icon: PhoneCall, title: 'Direct Access', desc: 'No account managers, no junior execs. You get my 12+ years of experience directly.' },
              { icon: TrendingUp, title: 'Results or Nothing', desc: 'I only care about metrics that impact your bottom line — leads, sales, revenue.' },
              { icon: Globe, title: 'Global Experience', desc: 'Worked with businesses across 20+ countries. I understand different markets and cultures.' },
              { icon: BarChart3, title: 'Proven Track Record', desc: '6X-7X ROAS consistently. Millions in ad spend managed. Millions in traffic generated.' },
              { icon: Users, title: 'Full Team Behind Me', desc: 'Designers, writers, analysts — you get a full agency\'s power at freelancer flexibility.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#040608]">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                    <item.icon size={22} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="py-24 bg-gradient-to-b from-[#040608] to-[#080c14]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Triangle size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">HOW I WORK</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Simple<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> 5-Step Process</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              No complexity. Just a clear roadmap from where you are to where you want to be.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a84c]/40 via-[#c9a84c]/20 to-transparent hidden md:block" />
            
            {[
              { num: '01', title: 'Deep Dive Discovery', desc: 'I sit with you, understand your business, customers, and what makes you different. No templates, no assumptions.', icon: Search },
              { num: '02', title: 'Custom Strategy Blueprint', desc: 'A detailed roadmap showing exactly what we will do, why, and when you will see results.', icon: Target },
              { num: '03', title: 'Fast Execution', desc: 'My team jumps into action. Campaigns launch, content gets created, SEO gets fixed — all moving together.', icon: RocketIcon },
              { num: '04', title: 'Weekly Optimization', desc: 'Every week, we analyze data, kill what is not working, double down on what is. No set-and-forget.', icon: TrendingUp },
              { num: '05', title: 'Scale What Works', desc: 'Once we find winning channels, we pour fuel on the fire. More budget, more reach, more results.', icon: Zap },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} mb-12`}
              >
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center">
                        <step.icon size={22} className="text-[#c9a84c]" />
                      </div>
                      <span className="text-3xl font-bold text-[#c9a84c]/20">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#f0d282] flex items-center justify-center shadow-lg">
                    <span className="text-[#080c14] font-bold text-xl">{step.num}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ENGAGEMENT MODELS ========== */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Briefcase size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">FLEXIBLE OPTIONS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Work With Me,<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Your Way</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Choose what fits your business needs. Use the calculator above for custom pricing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'Hourly Consulting', desc: 'Need expert advice for a few hours? Perfect for audits, strategy calls, or fixing specific problems.', features: ['Strategy calls & reviews', 'Campaign audits', 'Team coaching', 'Zero commitment'], icon: Clock, highlighted: false },
              { type: 'Fixed Price Projects', desc: 'You know exactly what you need. Clear deliverables, fixed price, and a timeline.', features: ['SEO audit & strategy', 'Campaign setup', 'Website CRO', 'Clear milestones'], icon: Target, highlighted: true },
              { type: 'Monthly Partnership', desc: 'We work together like a team. Full execution, monthly strategy, and unlimited access to me.', features: ['Full campaign management', 'Dedicated team', 'Priority support', 'Monthly reporting'], icon: Users, highlighted: false },
            ].map((item, i) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-2xl overflow-hidden ${item.highlighted ? 'ring-2 ring-[#c9a84c]' : ''}`}
              >
                {item.highlighted && (
                  <div className="absolute top-4 right-4 bg-[#c9a84c] text-[#080c14] text-xs font-bold px-3 py-1 rounded-full z-10">
                    MOST POPULAR
                  </div>
                )}
                <div className="bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                    <item.icon size={22} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.type}</h3>
                  <p className="text-white/50 text-sm mb-4">{item.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 size={14} className="text-[#c9a84c]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`block text-center py-3 rounded-xl font-semibold transition-all duration-300 ${item.highlighted ? 'bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] hover:scale-105' : 'border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10'}`}>
                    Get Started →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INDUSTRIES - 25+ WITH GEAR ANIMATION ========== */}
      <section className="py-24 bg-gradient-to-b from-[#040608] to-[#080c14] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
              className="absolute opacity-5"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 40}%`,
              }}
            >
              <Settings size={120 + i * 60} className="text-[#c9a84c]" />
            </motion.div>
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <Globe size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">INDUSTRIES I SERVE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Worked Across<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> 25+ Industries</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Each industry has its own playbook. And I have mastered most of them.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className={`relative overflow-hidden rounded-2xl p-4 text-center bg-gradient-to-br ${industry.gradient} border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300`}>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2"
                  >
                    <industry.icon size={18} className="text-[#c9a84c]" />
                  </motion.div>
                  <p className="text-white/80 text-xs font-medium">{industry.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPARISON TABLE - 3D WITH EFFECTS ========== */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-1.5 mb-4">
              <ThumbsUp size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium">THE TRUTH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Big Agency vs<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Me</span>
            </h2>
            <p className="text-white/50 text-lg">
              Why pay agency rates for junior-level work when you can work directly with an expert?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative perspective-1000"
          >
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0a0f1c] shadow-2xl shadow-[#c9a84c]/5">
              {/* Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-[#040608] to-[#0a0f1c]">
                <div className="p-4 text-white/40 text-xs font-semibold uppercase">Factor</div>
                <div className="p-4 text-center text-white/40 text-xs font-semibold uppercase border-l border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Big Agency
                </div>
                <div className="p-4 text-center border-l border-[#c9a84c]/40 bg-gradient-to-r from-[#c9a84c]/10 to-[#f0d282]/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/10 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-[#c9a84c] text-xs font-semibold uppercase relative z-10">Pranjal Digital</span>
                </div>
              </div>
              
              {/* Rows */}
              {comparisonData.map((row, i) => (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-3 border-t border-white/10 ${i % 2 === 0 ? 'bg-[#080c14]' : 'bg-[#040608]'} hover:bg-[#0a0f1c] transition-colors duration-300`}
                >
                  <div className="p-4 text-white/70 text-sm font-medium">{row.aspect}</div>
                  <div className="p-4 border-l border-white/10 flex items-center justify-center">
                    <span className="text-white/40 text-sm flex items-center gap-1.5">
                      <X size={14} className="text-red-500/70" />
                      {row.agency}
                    </span>
                  </div>
                  <div className="p-4 border-l border-[#c9a84c]/20 bg-[#c9a84c]/5 flex items-center justify-center">
                    <span className="text-white/80 text-sm flex items-center gap-1.5">
                      <Check size={14} className="text-[#c9a84c]" />
                      {row.me}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              Everything you wanted to know about working with me.
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
