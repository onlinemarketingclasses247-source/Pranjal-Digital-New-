import FunnelPyramid from "@/components/FunnelPyramid";
import CostCalculator from "@/components/CostCalculator";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, ChevronDown, Play, TrendingUp, Users, Globe,
  DollarSign, BarChart3, Search, Target, Share2, Building2, Cpu, Mail,
  Star, Zap, Shield, Clock, PhoneCall, X, Check, Award, Briefcase,
  Sparkles, Heart, Coffee, Smile, ThumbsUp, Rocket as RocketIcon,
  Layers, Palette, Grid, Circle, Triangle, Hexagon
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
  // ✅ FIXED: Proper TypeScript ref typing
  const ref = useRef<HTMLDivElement | null>(null);
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

// Services data with unique icons
const services = [
  { icon: Search, name: 'SEO Excellence', desc: 'Get found on Google. Organic traffic that actually converts into customers.', color: '#c9a84c' },
  { icon: Target, name: 'Smart PPC', desc: 'Every rupee spent works hard. Google, Meta, LinkedIn — all optimized.', color: '#5DCAA5' },
  { icon: Share2, name: 'Social Media Magic', desc: 'Build a brand people love. Real engagement, real community, real growth.', color: '#F0997B' },
  { icon: Building2, name: 'B2B Lead Machine', desc: 'Targeted campaigns that fill your pipeline with quality leads.', color: '#85B7EB' },
  { icon: Cpu, name: 'SaaS Growth Hacks', desc: 'Turn free trials into paying customers. Reduce churn. Scale fast.', color: '#ED93B1' },
  { icon: Globe, name: 'Global IT Marketing', desc: 'Position your IT company as a global leader. Build authority that sells.', color: '#97C459' },
];

// Pain points with better copy
const painPoints = [
  'You\'re burning lakhs on ads but seeing zero returns',
  'Your competitors are eating your lunch on Google every single day',
  'Your agency sends fancy reports but your pipeline is still empty',
  'You have no idea where your customers are coming from',
  'Your marketing team is talented but lacks senior strategic direction',
  'SEO, PPC, Content — all working in silos with no unified strategy',
];

// Differentiators with human touch
const differentiators = [
  { icon: Zap, title: 'No Corporate Nonsense', desc: 'I speak plain English, not marketing jargon. Every recommendation makes business sense.', color: '#c9a84c' },
  { icon: PhoneCall, title: 'You Talk to ME Directly', desc: 'No account managers, no junior execs. You get my 12+ years of experience directly.', color: '#5DCAA5' },
  { icon: TrendingUp, title: 'Results or Nothing', desc: 'I only care about metrics that impact your bottom line — leads, sales, revenue.', color: '#F0997B' },
  { icon: Globe, title: 'Cross-Industry Genius', desc: 'IT, SaaS, Healthcare, Real Estate — I bring best practices from everywhere.', color: '#85B7EB' },
  { icon: BarChart3, title: 'Proven Track Record', desc: '6X-7X ROAS consistently. $2M+ ad spend managed. 500K+ monthly traffic.', color: '#ED93B1' },
  { icon: Users, title: 'Full Team Behind Me', desc: 'Designers, writers, analysts — you get a full agency\'s power at freelancer prices.', color: '#97C459' },
];

// Process steps with unique layout
const processSteps = [
  { num: '01', title: 'Deep Dive Discovery', desc: 'I sit with you, understand your business, customers, and what makes you different. No templates, no assumptions.', icon: Search, color: '#c9a84c' },
  { num: '02', title: 'Custom Strategy Blueprint', desc: 'A detailed roadmap showing exactly what we will do, why, and when you will see results.', icon: Target, color: '#5DCAA5' },
  { num: '03', title: 'Fast Execution', desc: 'My team jumps into action. Campaigns launch, content gets created, SEO gets fixed — all moving together.', icon: RocketIcon, color: '#F0997B' },
  { num: '04', title: 'Weekly Optimization', desc: 'Every week, we analyze data, kill what\'s not working, double down on what is. No set-and-forget.', icon: TrendingUp, color: '#85B7EB' },
  { num: '05', title: 'Scale What Works', desc: 'Once we find winning channels, we pour fuel on the fire. More budget, more reach, more results.', icon: Zap, color: '#ED93B1' },
];

// Engagement models
const engagements = [
  {
    type: 'Hourly Help',
    price: '₹1,700 / hour',
    desc: 'Need expert advice for a few hours? Perfect for audits, strategy calls, or fixing specific problems.',
    features: ['Strategy calls & reviews', 'Campaign audits', 'Team coaching', 'Zero commitment'],
    icon: Clock,
    color: '#5DCAA5',
  },
  {
    type: 'Fixed Project',
    price: 'Custom Quote',
    desc: 'You know exactly what you need. I give you a fixed price, clear deliverables, and a timeline.',
    features: ['SEO audit & strategy', 'Campaign setup', 'Website CRO', 'Clear milestones'],
    icon: Target,
    color: '#c9a84c',
    highlighted: true,
  },
  {
    type: 'Monthly Partnership',
    price: 'Starts ₹50K/month',
    desc: 'We work together like a team. Full execution, monthly strategy, and unlimited access to me.',
    features: ['Full campaign management', 'Dedicated team', 'Priority support', 'Monthly reporting'],
    icon: Users,
    color: '#F0997B',
  },
];

// Industries with gradient backgrounds
const industries = [
  { name: 'IT Services', icon: Building2, gradient: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'SaaS', icon: Cpu, gradient: 'from-purple-500/20 to-pink-500/20' },
  { name: 'Healthcare', icon: Shield, gradient: 'from-green-500/20 to-emerald-500/20' },
  { name: 'E-commerce', icon: DollarSign, gradient: 'from-orange-500/20 to-red-500/20' },
  { name: 'Real Estate', icon: Building2, gradient: 'from-yellow-500/20 to-amber-500/20' },
  { name: 'Education', icon: Star, gradient: 'from-indigo-500/20 to-blue-500/20' },
  { name: 'Finance', icon: TrendingUp, gradient: 'from-emerald-500/20 to-teal-500/20' },
  { name: 'B2B Companies', icon: Users, gradient: 'from-rose-500/20 to-pink-500/20' },
  { name: 'Local Business', icon: Globe, gradient: 'from-cyan-500/20 to-sky-500/20' },
  { name: 'Startups', icon: Zap, gradient: 'from-violet-500/20 to-purple-500/20' },
];

// FAQ with natural language
const faqs = [
  { q: "Bhai, what exactly do you do?", a: "Simple bhai — I help businesses grow online. SEO, Google Ads, Social Media, everything. Whatever it takes to get you more customers and more sales." },
  { q: "How are you different from a big agency?", a: "Agencies me tum ek number se call karte ho. Yahan tum mere se direct baat karoge. No junior account managers. 12 saal ka experience direct tumhe milega. Aur sasti bhi hai." },
  { q: "Which industries do you work with?", a: "IT, SaaS, Healthcare, Real Estate, E-commerce, Education, Finance — almost sab. Har industry ka alag formula hai, aur mere paas sabka experience hai." },
  { q: "Kitna charge karte ho?", a: "Flexible hai bhai. Hourly ₹1700 se start hai. Fixed project bhi kar sakte ho. Ya monthly retainer ₹50K+ . Jo tumhare budget me aaye." },
  { q: "Results kab dikhte hain?", a: "Google Ads me 2-3 din me leads aa sakte hain. SEO me 3-6 months lagte hain. Realistic timeline batata hu — no false promises." },
  { q: "Startup ke saath kaam karte ho?", a: "Bilkul! Maximum startups ke saath kaam kiya hai. Limited budget me bhi results laane ka formula pata hai." },
  { q: "Meri existing team ko manage kar sakte ho?", a: "Yes yes. Dono tarah se kaam karta hu — ya toh tumhari team ko guide karu, ya khud execution karu. Jo tumhe suit kare." },
  { q: "NDA sign karoge?", a: "Obviously. Koi bhi sensitive details share karne se pehle NDA sign karta hu. Confidentiality is standard for me." },
];

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
  
  return (
    <div className="bg-[#080c14] overflow-hidden">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
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
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(201,168,76,0.03)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%" height="100%" fill="url(%23grid)" /%3E%3C/svg%3E')] opacity-30" />
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
            <span className="text-white/90">For Real Businesses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            I've helped 400+ businesses grow online — from startups to enterprises. 
            Generated 500K+ monthly traffic, managed ₹15Cr+ in ad spend, and delivered 
            6X-7X ROAS consistently. And now I want to help you too.
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
                See What I Do
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

      {/* ========== VIDEO SECTION ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#080c14] to-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side - Text Content */}
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
                I saw too many businesses getting ripped off by agencies. Paying lakhs for fancy reports but getting zero results.
              </p>
              <p className="text-white/60 mb-6 leading-relaxed">
                So I decided to do things differently. Direct access to an expert. Transparent pricing. Results that actually matter.
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
                  <span className="text-white/70 text-sm">6X-7X Average ROAS</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Video Player */}
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

      {/* ========== TRUST BAR - Stats ========== */}
      <section className="py-16 bg-gradient-to-r from-[#040608] to-[#080c14] border-y border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <StatCard value={12} suffix="+" label="Years Experience" />
            <StatCard value={400} suffix="+" label="Happy Clients" />
            <StatCard value={500} suffix="K+" label="Monthly Traffic" />
            <StatCard value={2} suffix="M+" label="Ad Spend Managed" />
            <StatCard value={7} suffix="X" label="Avg ROAS" />
          </div>
        </div>
      </section>

      {/* ========== FUNNEL PYRAMID SECTION ========== */}
      <FunnelPyramid />

      {/* ========== CALCULATOR SECTION ========== */}
      <CostCalculator />

      {/* ========== SERVICES - COLLAGE VIEW ========== */}
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
              <span className="text-[#c9a84c] text-xs font-medium">WHAT I DO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Services That Actually<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> Move the Needle</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Not just activity. Real results that show up in your bank account.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#040608] border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-full blur-2xl" />
                <div className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={28} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PAIN POINTS - Circle/Grid View ========== */}
      <section className="py-24 bg-[#040608] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a84c]/5 blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-red-400 text-sm">😤</span>
              <span className="text-red-400 text-xs font-medium">SOUND FAMILIAR?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Does Your Marketing Feel<span className="text-red-400"> Broken?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-red-500/5 to-transparent border border-red-500/10 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-sm">⚠️</span>
                </div>
                <span className="text-white/70 text-sm">{point}</span>
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

      {/* ========== WHY CHOOSE ME - Unique Alternating Layout ========== */}
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
            {differentiators.map((item, i) => (
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

      {/* ========== PROCESS - Pyramid/Triangle Style ========== */}
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
            
            <div className="space-y-12">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
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
              Choose what fits your budget and needs. No lock-in contracts. No hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagements.map((item, i) => (
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
                  <h3 className="text-xl font-bold text-white mb-1">{item.type}</h3>
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent mb-3">
                    {item.price}
                  </div>
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

      {/* ========== INDUSTRIES - Circle/Grid View ========== */}
      <section className="py-24 bg-gradient-to-b from-[#040608] to-[#080c14]">
        <div className="max-w-6xl mx-auto px-4">
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
              I've Worked Across<span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"> 10+ Industries</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Each industry has its own playbook. And I've mastered most of them.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className={`relative overflow-hidden rounded-2xl p-4 text-center bg-gradient-to-br ${industry.gradient} border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300`}>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <industry.icon size={20} className="text-[#c9a84c]" />
                  </div>
                  <p className="text-white/80 text-sm font-medium">{industry.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPARISON TABLE ========== */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-5xl mx-auto px-4">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-[#0a0f1c]"
          >
            <div className="grid grid-cols-3 bg-[#040608]">
              <div className="p-4 text-white/40 text-xs font-semibold uppercase">Factor</div>
              <div className="p-4 text-center text-white/40 text-xs font-semibold uppercase border-l border-white/10">Big Agency</div>
              <div className="p-4 text-center border-l border-[#c9a84c]/40 bg-[#c9a84c]/5">
                <span className="text-[#c9a84c] text-xs font-semibold uppercase">Pranjal Digital</span>
              </div>
            </div>
            {[
              { aspect: 'Cost', agency: 'High retainers + markups', me: 'Flexible from ₹1,700/hr' },
              { aspect: 'Speed', agency: 'Slow — layers of approval', me: 'Fast & direct decisions' },
              { aspect: 'Expertise', agency: 'Junior teams, senior oversight', me: '12+ years hands-on' },
              { aspect: 'Access', agency: 'Account manager buffer', me: 'You work with me directly' },
              { aspect: 'Flexibility', agency: 'Rigid contracts', me: 'Hourly, fixed, or retainer' },
              { aspect: 'ROI Focus', agency: 'Vanity metrics', me: 'Revenue-tied KPIs only' },
            ].map((row, i) => (
              <div key={row.aspect} className={`grid grid-cols-3 border-t border-white/10 ${i % 2 === 0 ? 'bg-[#080c14]' : 'bg-[#040608]'}`}>
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
              </div>
            ))}
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
              Everything you wanted to know. In simple Hindi-English.
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
              Ready to 10X Your<br />
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
              ⏰ 30-min free consultation • No obligation • Real advice
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
