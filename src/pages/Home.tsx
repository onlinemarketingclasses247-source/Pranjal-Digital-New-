import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Globe, Search, Target, Brain, LineChart,
  PenTool, Activity, Linkedin, Rocket as RocketIcon, Cpu, DollarSign,
  Shield, Building2, Star, TrendingUp, Sparkles, Settings, Heart, Play,
  MapPin, Coffee, Package, Menu, X, CheckCircle2, Briefcase, Layers,
  Check, Award, Zap, Users, PhoneCall, Clock, Instagram, Facebook, Youtube,
  Twitter, Compass, Navigation, BarChart3, Eye, Bot, MessageCircle, Grid3x3
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// Helper: meta description
function setMeta(description) {
  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", description);
}

// CountUp hook
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
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  return count;
}

// Stat Card
function StatCard({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const count = useCountUp(value, 2000, inView);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">{count}{suffix}</div>
      <div className="text-white/40 text-[11px] md:text-xs font-medium uppercase tracking-wider mt-2">{label}</div>
    </motion.div>
  );
}

// Services Card (compact for mobile)
function ServiceCard({ icon: Icon, name, desc, features }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-5 hover:border-[#c9a84c]/40 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
        <Icon size={24} className="text-[#c9a84c]" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
      <p className="text-white/60 text-sm leading-relaxed mb-3">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {features.slice(0, 2).map((f, i) => (
          <span key={i} className="text-[10px] bg-white/5 border border-white/10 rounded-full px-2 py-1 text-white/50">{f}</span>
        ))}
      </div>
    </motion.div>
  );
}

// FAQ Item
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.05 }} className="border border-white/10 rounded-xl overflow-hidden bg-[#0a0f1c]/50">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
        <span className="text-white font-medium text-sm md:text-base">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={18} className="text-[#c9a84c]" /></motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="border-t border-white/10">
            <div className="px-5 py-4 text-white/60 text-sm leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Industry selector (horizontal scroll for mobile, no overflow)
const industriesData = [
  { name: 'SaaS', icon: Cpu, color: 'from-purple-500/20', results: '2.3x conversion' },
  { name: 'Ecom', icon: DollarSign, color: 'from-orange-500/20', results: '4.2x ROAS' },
  { name: 'Healthcare', icon: Shield, color: 'from-green-500/20', results: '300% bookings' },
  { name: 'Real Estate', icon: Building2, color: 'from-yellow-500/20', results: '52% lower CPL' },
  { name: 'EdTech', icon: Star, color: 'from-indigo-500/20', results: '9x revenue' },
  { name: 'Fintech', icon: TrendingUp, color: 'from-emerald-500/20', results: '500+ accounts' },
];

// Comparison data (card style for mobile)
const comparisonFeatures = [
  { feature: 'Experience', agency: '2-4 yrs avg', me: '12+ yrs hands-on' },
  { feature: 'Who works on account', agency: 'Junior managers', me: 'Direct expert' },
  { feature: 'Response time', agency: '24-72 hrs', me: '2-4 hours' },
  { feature: 'Strategy', agency: 'Template-based', me: '100% custom' },
  { feature: 'Contract', agency: '6-12 month lock', me: 'Month-to-month' },
  { feature: 'Metrics', agency: 'Vanity metrics', me: 'Revenue, ROAS, CAC' },
];

const faqs = [
  { q: "What exactly do you do?", a: "I help businesses grow online — SEO, Google Ads, Social Media, AI funnels. 12+ years experience across 25+ industries." },
  { q: "How are you different from an agency?", a: "You talk to me directly. No junior account managers. Better pricing. AI-powered execution." },
  { q: "Which industries do you work with?", a: "SaaS, E-commerce, Healthcare, Real Estate, Fintech, Travel, Manufacturing, and 20+ more." },
  { q: "How much do you charge?", a: "Use the cost calculator on this site to get an instant estimate. Custom pricing based on your goals." },
  { q: "When will I see results?", a: "Google Ads can show leads in 2-3 days. SEO takes 3-6 months. I give realistic timelines." },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    document.title = "Pranjal Digital | Performance Marketing Consultant";
    setMeta("12+ Years of Digital Marketing. SEO, PPC, AI Funnels, and Global Growth. Work with a consultant, not a faceless agency.");
    // Prevent body scroll when mobile menu open
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  return (
    <div className="bg-[#080c14] text-white overflow-x-hidden w-full">
      {/* ========== SIMPLE MOBILE HEADER ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080c14]/80 backdrop-blur-xl border-b border-white/10 px-5 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Pranjal Digital</Link>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg bg-white/5">
          <Menu size={22} />
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col">
            <div className="flex justify-end p-6">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full bg-white/10"><X size={24} /></button>
            </div>
            <div className="flex flex-col items-center gap-8 text-2xl font-medium mt-20">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c9a84c]">Home</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c9a84c]">Services</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c9a84c]">Contact</Link>
              <a href={CALENDLY} target="_blank" className="mt-8 bg-[#c9a84c] text-black px-8 py-3 rounded-full font-bold">Book Call</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#c9a84c]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs font-medium">👋 Namaste! I'm Pranjal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl sm:text-7xl font-bold leading-[1.15] tracking-tight mb-6">
            12+ Years of <br />
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Digital Magic</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            400+ clients • 20+ countries • $5M+ revenue generated. Direct access, no agency markup.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" className="bg-gradient-to-r from-[#c9a84c] to-[#e6c468] text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#c9a84c]/30">Book Free Call <ArrowRight size={18} /></a>
            <Link href="/services" className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:border-[#c9a84c]/60 transition">Explore Services</Link>
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown size={24} className="text-white/30" /></div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-16 bg-gradient-to-b from-[#0a0f1c] to-[#080c14] px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <StatCard value={12} suffix="+" label="Years" />
          <StatCard value={400} suffix="+" label="Clients" />
          <StatCard value={20} suffix="+" label="Countries" />
          <StatCard value={5} suffix="M+" label="Revenue" />
          <StatCard value={7} suffix="X" label="Avg ROAS" />
        </div>
      </section>

      {/* SERVICES (GRID, mobile friendly) */}
      <section className="py-20 px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#c9a84c] px-4 py-1.5 rounded-full text-xs font-bold mb-4"><Layers size={14} /> Full Ecosystem</div>
          <h2 className="text-3xl md:text-5xl font-bold">AI-Powered <span className="gold-gradient">Marketing Suite</span></h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">SEO • PPC • Funnels • Analytics — all optimized for 2026</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ServiceCard icon={Search} name="SEO + AEO" desc="Rank on Google, ChatGPT & Perplexity." features={["Voice search", "AI crawlers"]} />
          <ServiceCard icon={Target} name="AI PPC" desc="PMax, Meta Advantage+ for max ROI." features={["Auto bidding", "Dynamic ads"]} />
          <ServiceCard icon={Brain} name="AI Funnels" desc="Chatbots + personalized sequences." features={["Lead scoring", "Retargeting"]} />
          <ServiceCard icon={LineChart} name="Performance" desc="Every dollar tracked, every conversion." features={["Dashboards", "A/B testing"]} />
        </div>
      </section>

      {/* COMPARISON (Mobile cards) */}
      <section className="py-20 px-6 bg-[#040608]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Agency vs. <span className="text-[#c9a84c]">Pranjal Digital</span></h2>
          <p className="text-white/50 mt-2">No fluff, just facts.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-3">
          {comparisonFeatures.map((item, idx) => (
            <div key={idx} className="bg-[#0a0f1c] border border-white/10 rounded-xl p-4">
              <div className="text-white/70 text-xs font-semibold mb-2">{item.feature}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-white/40"><span className="text-red-400">✕</span> {item.agency}</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="text-[#c9a84c]">✓</span> {item.me}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES (horizontal scroll, no overflow) */}
      <section className="py-20 px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#c9a84c] px-4 py-1.5 rounded-full text-xs font-bold mb-3"><Briefcase size={14} /> 25+ Industries</div>
          <h2 className="text-3xl font-bold">Proven across <span className="text-[#c9a84c]">every niche</span></h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-6 custom-scrollbar snap-x snap-mandatory max-w-full">
          {industriesData.map((ind, i) => (
            <div key={i} className="min-w-[160px] snap-start bg-[#0a0f1c] border border-white/10 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3"><ind.icon size={22} className="text-[#c9a84c]" /></div>
              <h4 className="font-bold text-white">{ind.name}</h4>
              <p className="text-[10px] text-white/50 mt-1">{ind.results}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO + STORY */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#080c14] to-[#0a0f1c]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 rounded-full px-4 py-1.5 text-[#c9a84c] text-xs mb-4"><Play size={14} /> My Story</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Why I started Pranjal Digital?</h3>
            <p className="text-white/60">Tired of agencies charging huge fees with zero results. I built a better way: direct access, transparent pricing, and real ROI.</p>
          </div>
          <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/MjqcQ46ai5Y" title="YouTube" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Questions? <span className="text-[#c9a84c]">Answered.</span></h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your <br /> <span className="text-[#c9a84c]">marketing ROI?</span></h2>
          <p className="text-white/50 mb-8">30-min free consultation. No pressure, just honest growth advice.</p>
          <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-3 bg-[#c9a84c] text-black font-bold px-10 py-5 rounded-xl text-lg shadow-2xl">Book Free Call <ArrowRight /></a>
        </div>
      </section>

      {/* simple footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-xs">
        © 2025 Pranjal Digital • Global Consultant • SEO • PPC • AI Growth
      </footer>

      {/* global styles */}
      <style>{`
        .gold-gradient {
          background: linear-gradient(135deg, #c9a84c, #f0d282);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e2538;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c9a84c;
          border-radius: 10px;
        }
        .gold-bg {
          background: linear-gradient(95deg, #c9a84c, #e6c468);
          box-shadow: 0 8px 20px rgba(201,168,76,0.25);
        }
      `}</style>
    </div>
  );
}
