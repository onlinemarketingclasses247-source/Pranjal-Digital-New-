import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, TrendingUp, Search, Target, MapPin,
  Smartphone, MessageSquare, Calendar, PhoneCall, Shield, DollarSign,
  ChevronRight, Star, Zap, BarChart3, Users, Globe, Award,
  Facebook, Instagram, Layers, Megaphone, Eye, Activity,
  Clock, Rocket, Sparkles, ThumbsUp, Brain, Bot, Gauge,
  Crown, BadgeCheck, Compass, Navigation, Filter, Sliders,
  Scale, HeartHandshake, Coffee, Play, Briefcase, Building2, Cpu, Mail,
  Linkedin, Youtube, PenTool, LineChart, PieChart, Settings, FileText, Mic,
  Gem, Medal, Trophy, Flag, Handshake, ClipboardList, CheckSquare, Code, Database
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// ----- Types -------------------------------------------------
interface Campaign {
  name: string;
  type: string;
  cpl: string;
  ctr: string;
  roas: string;
  leads: string;
  impressions: string;
  emoji: string;
}

interface Ranking {
  term: string;
  before: string;
  after: string;
  hot: boolean;
}

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  tag: string | null;
}

// ----- Data -------------------------------------------------
const metaCampaigns: Campaign[] = [
  { name: "Summer Smile Makeover", type: "Lead Generation", cpl: "$10.28", ctr: "5.2%", roas: "4.2x", leads: "187", impressions: "245K", emoji: "✨" },
  { name: "Emergency Dentist – Dallas", type: "Calls & Forms", cpl: "$12.45", ctr: "6.8%", roas: "3.8x", leads: "96", impressions: "128K", emoji: "🚨" },
  { name: "Clear Aligners Offer", type: "Booking Campaign", cpl: "$8.97", ctr: "7.1%", roas: "5.1x", leads: "312", impressions: "356K", emoji: "💎" },
];

const rankings: Ranking[] = [
  { term: "dentist Dallas TX", before: "Out of top 20", after: "Top 6–10", hot: true },
  { term: "clear aligners Dallas", before: "Not ranked", after: "Top 8–12", hot: true },
  { term: "veneers Dallas", before: "Not ranked", after: "Top 10–15", hot: false },
  { term: "family dentist Dallas", before: "Out of maps pack", after: "Maps pack visibility", hot: true },
];

const plans: Plan[] = [
  {
    name: "Essentials",
    price: 499,
    description: "Perfect for new practices wanting to dominate local social media.",
    features: [
      "Meta Ads (Facebook + Instagram) – full management",
      "Landing page design & optimization",
      "Creative design (static & carousel ads)",
      "Ad copy & content creation",
      "Monthly performance reporting"
    ],
    tag: null
  },
  {
    name: "Growth",
    price: 999,
    description: "Ideal for practices ready to scale with multi‑channel campaigns.",
    features: [
      "Everything in Essentials",
      "Google Ads (Search + Call Ads) management",
      "Video ad creation (15‑30 sec)",
      "Advanced graphics & motion design",
      "A/B testing & creative optimization"
    ],
    tag: "MOST POPULAR"
  },
  {
    name: "Dominator",
    price: 1999,
    description: "Full‑funnel domination – from awareness to long‑term organic growth.",
    features: [
      "Everything in Growth",
      "SEO + AEO + GEO (full strategy & execution)",
      "Complete website management & CRO",
      "Technical SEO & ongoing design changes",
      "Dedicated account strategist"
    ],
    tag: "BEST VALUE"
  },
];

// ----- Hooks -------------------------------------------------
function useCountUp(end: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, trigger]);
  return count;
}

// ----- Components -------------------------------------------
const Particles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 4 + 1,
          height: Math.random() * 4 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(201,168,76,${Math.random() * 0.4 + 0.1})`,
        }}
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 4 }}
      />
    ))}
  </div>
);

const Orb: React.FC<{ style?: React.CSSProperties; className?: string }> = ({ style, className = "" }) => (
  <motion.div
    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 8, repeat: Infinity }}
    className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
    style={style}
  />
);

// Dental‑specific funnel section
const DentalFunnel: React.FC = () => {
  const funnelSteps = [
    { stage: "TOFU", title: "Awareness", icon: Eye, description: "Facebook & Instagram ads, educational reels, local awareness campaigns", color: "#c9a84c" },
    { stage: "MOFU", title: "Consideration", icon: Search, description: "Retargeting ads, Google search ads, case studies, before/after galleries", color: "#f0d282" },
    { stage: "BOFU", title: "Conversion", icon: Target, description: "Special offers, appointment booking, call extensions, GBP actions", color: "#c9a84c" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
          <Layers size={14} className="text-[#c9a84c]" />
          <span className="text-[#c9a84c] text-xs font-bold tracking-wider">DENTAL MARKETING FUNNEL</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold">How We Turn <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Strangers into Patients</span></h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto mt-4">A proven three‑stage funnel designed specifically for dental practices.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {funnelSteps.map((step, idx) => (
          <motion.div
            key={step.stage}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="relative bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <div className="inline-block px-3 py-1 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-bold mb-4">{step.stage}</div>
            <div className="w-16 h-16 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <step.icon size={28} style={{ color: step.color }} />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            <div className="mt-5 flex justify-center gap-1">
              {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/40" />)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* connecting arrows (desktop) */}
      <div className="hidden md:flex justify-center items-center gap-4 mt-8 text-white/20">
        <ArrowRight size={32} className="animate-pulse" />
        <ArrowRight size={32} className="animate-pulse delay-100" />
      </div>
    </div>
  );
};

// Campaign Card
const CampaignCard: React.FC<{ campaign: Campaign; idx: number }> = ({ campaign, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.12, duration: 0.6 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative bg-gradient-to-br from-[#0d1422] to-[#060a10] border border-white/10 rounded-2xl overflow-hidden group"
    style={{ boxShadow: '0 0 40px rgba(201,168,76,0.05)' }}
  >
    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <div className="w-3 h-3 rounded-full bg-green-400/60" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-white/30 text-xs font-mono">Meta Ads Manager · Campaign Results</span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-2xl mb-1">{campaign.emoji}</div>
          <h3 className="text-white font-bold text-lg leading-tight">{campaign.name}</h3>
          <span className="text-xs text-white/40 font-mono">{campaign.type}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">Active</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Cost Per Lead", value: campaign.cpl, highlight: true },
          { label: "CTR", value: campaign.ctr, highlight: false },
          { label: "ROAS", value: campaign.roas, highlight: false },
          { label: "Total Leads", value: campaign.leads, highlight: false },
        ].map((m, i) => (
          <div key={i} className={`p-3 rounded-xl border ${m.highlight ? 'bg-[#c9a84c]/10 border-[#c9a84c]/30' : 'bg-white/[0.03] border-white/8'}`}>
            <div className="text-white/40 text-[10px] uppercase mb-1">{m.label}</div>
            <div className={`font-bold text-xl ${m.highlight ? 'text-[#c9a84c]' : 'text-white'}`}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8 pt-4">
        <div className="text-white/30 text-[10px] uppercase mb-2 flex items-center gap-1">
          <Activity size={10} /> Impressions: {campaign.impressions}
        </div>
        <div className="flex items-end gap-1 h-10">
          {[40, 65, 45, 80, 70, 90, 75, 100, 85, 95, 88, 92].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.03 }}
              className="flex-1 rounded-sm"
              style={{ background: `rgba(201,168,76,${0.2 + (h / 100) * 0.6})` }}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-full">
          <Facebook size={10} className="text-[#1877F2]" />
          <span className="text-[#1877F2] text-[10px] font-medium">Facebook</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E4405F]/10 border border-[#E4405F]/20 rounded-full">
          <Instagram size={10} className="text-[#E4405F]" />
          <span className="text-[#E4405F] text-[10px] font-medium">Instagram</span>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: 'inset 0 0 40px rgba(201,168,76,0.06)' }} />
  </motion.div>
);

// ----- Main Page ----------------------------------------------
export default function DentalLeadsPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const organic = useCountUp(1900, 2200, statsInView);
  const calls = useCountUp(90, 2000, statsInView);
  const forms = useCountUp(35, 2000, statsInView);
  const traffic = useCountUp(350, 2000, statsInView);

  useEffect(() => {
    document.title = 'Dental Leads | Get Patients at $10/Lead* | Meta, Google, SEO';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Get dental patients at $10/lead* with our proven system: Meta Ads, Google Ads, GBP optimization, SEO/AEO/GEO. Results in first month or 100% money back.';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div style={{ background: '#070b12', color: '#fff', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      <Particles />
      <Orb style={{ width: 600, height: 600, top: '-10%', left: '-10%', background: 'rgba(201,168,76,0.08)' }} />
      <Orb style={{ width: 700, height: 700, bottom: '-20%', right: '-15%', background: 'rgba(201,168,76,0.06)' }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c]/12 to-[#c9a84c]/04"
          >
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#c9a84c]" />
            <span style={{ color: '#c9a84c', fontSize: 13, fontWeight: 600 }}>🦷 Specialized Dental Clinic Growth System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(38px, 7vw, 78px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            <span style={{ color: '#fff' }}>Get Dental Patients</span>
            <br />
            <span style={{ background: 'linear-gradient(90deg, #c9a84c, #f0d282, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%' }}>
              at $10/Lead*
            </span>
          </motion.h1>
          <p className="text-white/50 text-sm mt-2">* Lead price may vary based on city, competition and target demography</p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px,2vw,20px)', maxWidth: 620, margin: '24px auto 40px', lineHeight: 1.7 }}
          >
            Meta Ads · Google Ads · GBP Optimization · SEO/AEO/GEO · Website CRO
            <br />
            <span style={{ color: '#c9a84c', fontWeight: 600 }}>Results in first month or 100% money back.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a href={CALENDLY} target="_blank"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]">
              <Calendar size={20} /> Book Free Strategy Call <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/contact">
              <a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">
                <MessageSquare size={20} /> Contact for Leads
              </a>
            </Link>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            {[
              { icon: Shield, label: "Money Back Guarantee" },
              { icon: Users, label: "400+ Clients Served" },
              { icon: Award, label: "12+ Years Experience" },
              { icon: Star, label: "4.9/5 Client Rating" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <b.icon size={14} style={{ color: '#c9a84c' }} />
                <span className="text-white/60 text-xs">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
          </div>
        </motion.div>
      </section>

      {/* Money Back Guarantee (After Hero) */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 mb-12">
        <div className="bg-gradient-to-r from-[#c9a84c]/10 to-transparent border border-[#c9a84c]/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-[#c9a84c]" />
            <div>
              <h3 className="text-white font-bold text-lg">100% Money‑Back Guarantee</h3>
              <p className="text-white/60 text-sm">No results in first month? We refund 100% of your management fees. No questions asked.</p>
            </div>
          </div>
          <a href={CALENDLY} target="_blank" className="px-6 py-2.5 rounded-lg bg-[#c9a84c] text-[#070b12] font-bold text-sm hover:bg-[#f0d282] transition shadow-md">
            Claim Your Guarantee →
          </a>
        </div>
      </div>

      {/* Detailed Services Section */}
      <section className="py-20 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Layers size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">WHAT WE DO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Complete <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Dental Marketing Ecosystem</span></h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mt-2">Everything your practice needs to attract, convert, and retain more patients.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Meta Ads */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ y: -6 }}
              className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1877F2]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <Facebook size={24} className="text-[#1877F2]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Meta Ads (FB + IG)</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Hyper‑targeted campaigns that reach patients actively searching for dental services. We use custom audiences, lookalike models, and retargeting to drive $10‑15 leads with 5‑7% CTR and 3‑5x ROAS.</p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Lead forms & instant booking</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Video & carousel ads for services</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Retargeting website visitors</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Google Ads */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ y: -6 }}
              className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EA4335]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <Target size={24} className="text-[#EA4335]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Google Ads</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Capture high‑intent searches like “emergency dentist near me”. We optimize for call extensions, location extensions, and local service ads to get appointments while competitors watch.</p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Search, Display & YouTube Ads</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Call‑only campaigns for instant leads</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Local service ads integration</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* SEO / AEO / GEO */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ y: -6 }}
              className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FBBC05]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <Search size={24} className="text-[#FBBC05]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">SEO + AEO + GEO</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Rank on Google, ChatGPT, Perplexity, and voice search. We optimize for traditional search engines AND answer/generative engines, so patients find you everywhere.</p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Local & AI search optimization</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Featured snippets & knowledge panel</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Voice search (Alexa, Siri, Google Assistant)</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Website Development & Management */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ y: -6 }}
              className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <Smartphone size={24} className="text-[#c9a84c]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Website Dev & Management</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Mobile‑first, lightning‑fast, conversion‑optimized websites. We handle design, development, hosting, updates, and CRO (chat, SMS, forms, scheduling).</p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Appointment booking integration</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Live chat & SMS lead capture</li>
                    <li className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Ongoing speed & security updates</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA after Services */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-gradient-to-r from-[#c9a84c]/20 to-transparent border border-[#c9a84c]/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Fill Your Schedule?</h3>
          <p className="text-white/70 mb-5">Let’s build a custom strategy for your practice – no obligation, just real advice.</p>
          <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] font-bold hover:scale-105 transition shadow-lg">
            Get Your Free Growth Plan → <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Meta Ads Campaigns */}
      <section className="py-20 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Megaphone size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wider">REAL META ADS RESULTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Real Campaigns. <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Real Dental Leads.</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {metaCampaigns.map((c, i) => <CampaignCard key={c.name} campaign={c} idx={i} />)}
          </div>
          <div className="text-center mt-10">
            <a href={CALENDLY} target="_blank"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/5 border border-white/20 text-white font-semibold hover:bg-[#c9a84c] hover:text-[#070b12] transition-all">
              Launch Your Campaigns → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-[#060a10] relative">
        <Orb style={{ width: 800, height: 800, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(201,168,76,0.04)' }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Award size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">VERIFIED CASE STUDY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">How We Transformed <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Royal Lane Dental</span></h2>
            <p className="text-white/50 text-lg">Dallas, TX · 12 months of SEO + GBP optimization (2025–2026)</p>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { emoji: "📈", value: organic, suffix: "+", label: "Organic Sessions/Mo", change: "↑ 352% from 420", color: "#4ade80" },
              { emoji: "📞", value: calls, suffix: "+", label: "GBP Calls/Month", change: "↑ 350% from 20", color: "#60a5fa" },
              { emoji: "📝", value: forms, suffix: "+", label: "Form Submissions/Mo", change: "↑ 540% from 5", color: "#f472b6" },
              { emoji: "📊", value: traffic, suffix: "%", label: "Organic Traffic Growth", change: "Full year 2026", color: "#c9a84c" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-full blur-2xl" />
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: s.color }}>{s.value.toLocaleString()}{s.suffix}</div>
                <div className="text-white/70 text-sm mt-2">{s.label}</div>
                <div className="text-white/40 text-xs mt-1">{s.change}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><Search size={18} className="text-[#c9a84c]" /> Google Maps Rankings</h3>
              {rankings.map(r => (
                <div key={r.term} className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/80">{r.term}</span>
                  <span className="text-green-400 font-semibold">{r.after}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><PhoneCall size={18} className="text-[#c9a84c]" /> Lead Volume Growth</h3>
              {[
                { label: "GBP Calls", before: 20, after: 90 },
                { label: "Website Forms", before: 5, after: 35 },
                { label: "Chat / SMS", before: 0, after: 15 },
              ].map(item => (
                <div key={item.label} className="mb-3">
                  <div className="flex justify-between text-sm"><span>{item.label}</span><span><span className="line-through text-white/40">{item.before}</span> → <span className="text-green-400">{item.after}</span></span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282]" style={{ width: `${(item.after / 100) * 100}%` }} /></div>
                </div>
              ))}
              <div className="mt-4 p-2 bg-[#c9a84c]/10 rounded-xl text-center text-[#c9a84c] text-sm">📊 Total: ~25/mo → 140+/mo in patient inquiries</div>
            </div>
          </div>
          <div className="text-center">
            <a href="https://www.royallanedental.com/" target="_blank" className="text-white/40 hover:text-[#c9a84c] text-sm inline-flex items-center gap-1">View Full Case Study <ChevronRight size={14} /></a>
          </div>
          <div className="text-center mt-8">
            <a href={CALENDLY} target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] font-bold hover:scale-105 transition">
              Get Same Results for Your Practice → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Dental Funnel */}
      <DentalFunnel />

      {/* CTA after Funnel */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-gradient-to-r from-[#c9a84c]/20 to-transparent border border-[#c9a84c]/30 rounded-2xl p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white">Ready to Dominate Your Market?</h3>
              <p className="text-white/70">Let’s map out your patient acquisition funnel – no obligation, just insights.</p>
            </div>
            <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-[#c9a84c] hover:text-[#070b12] transition">
              Book Free Strategy Session → <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Pricing Plans */}
      <section className="py-20 bg-[#060a10]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <DollarSign size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">SIMPLE PRICING</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Choose Your <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Growth Plan</span></h2>
            <p className="text-white/50 text-lg">Flat monthly fee – no hidden costs. Cancel anytime.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-2xl p-6 transition-all ${plan.tag ? 'bg-gradient-to-br from-[#0f1927] to-[#0a0f1a] border border-[#c9a84c]/40 shadow-xl' : 'bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10'}`}
              >
                {plan.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] text-xs font-extrabold px-3 py-1 rounded-full">
                    {plan.tag}
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[#c9a84c] font-extrabold text-4xl">${plan.price}</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <p className="text-white/50 text-sm mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-white/70 text-sm">
                      <CheckCircle2 size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={CALENDLY} target="_blank"
                  className="block text-center py-3 rounded-xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] hover:scale-105 transition">
                  Get Started →
                </a>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <a href={CALENDLY} target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-[#c9a84c] hover:text-[#070b12] transition">
              Need a Custom Plan? Talk to Us → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Money Back Guarantee (Below Pricing) */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-[#c9a84c]/10 to-transparent border border-[#c9a84c]/30 rounded-2xl p-6 text-center">
          <Shield size={40} className="text-[#c9a84c] mx-auto mb-3" />
          <h3 className="text-white font-bold text-2xl mb-2">Your Success is Guaranteed</h3>
          <p className="text-white/70 max-w-2xl mx-auto">If you don’t see measurable results (increased calls, form fills, or leads) in the first month, we’ll refund 100% of your management fees. No fine print.</p>
          <a href={CALENDLY} target="_blank" className="inline-block mt-5 px-6 py-2 rounded-lg bg-[#c9a84c] text-[#070b12] font-bold hover:bg-[#f0d282] transition">Get Risk‑Free Quote →</a>
        </div>
      </div>

      {/* Our Dental Marketing (was Why Choose Us) */}
      <section className="py-20 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <BadgeCheck size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">OUR DENTAL MARKETING</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Why Choose <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Pranjal Digital</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Flat $499/month Starting", desc: "Transparent pricing – no hidden fees. All services clearly defined per tier." },
              { icon: Award, title: "12+ Years Dental Focus", desc: "We only work with dental practices. We know patient psychology, seasonality, and compliance." },
              { icon: Users, title: "Proven Results", desc: "Royal Lane Dental grew from 20 to 90+ calls/month and 350% more organic traffic in 2026." },
              { icon: Rocket, title: "First Month Guarantee", desc: "See measurable results in 30 days or we refund 100% of management fees." },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <item.icon size={22} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Dental Clients Across USA – 8 states, flags + blinking pin, no numbers */}
          <div className="mt-20">
            <h3 className="text-white font-bold text-2xl text-center mb-8">📍 Dental Clients Across the USA</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { state: "Texas", flag: "🇺🇸" },   // using US flag for all or we can use state flags? Simple approach: state name + pin icon + US flag
                { state: "California", flag: "🇺🇸" },
                { state: "New York", flag: "🇺🇸" },
                { state: "Florida", flag: "🇺🇸" },
                { state: "Illinois", flag: "🇺🇸" },
                { state: "Georgia", flag: "🇺🇸" },
                { state: "Washington", flag: "🇺🇸" },
                { state: "Colorado", flag: "🇺🇸" },
              ].map((s, i) => (
                <motion.div
                  key={s.state}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3 hover:border-[#c9a84c]/40 transition group"
                >
                  <span className="text-xl">{s.flag}</span>
                  <span className="text-white/80 text-sm font-medium">{s.state}</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <MapPin size={14} className="text-[#c9a84c]" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <p className="text-white/40 text-xs text-center mt-6">Serving dental practices across the United States – local expertise, national reach.</p>
          </div>
        </div>
      </section>

      {/* CTA after Dental Clients */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-[#c9a84c]/20 to-transparent border border-[#c9a84c]/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Join 400+ Successful Dental Practices</h3>
          <p className="text-white/70 mb-5">Let’s write your success story – book a no‑pressure consultation today.</p>
          <a href={CALENDLY} target="_blank" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] font-bold hover:scale-105 transition shadow-lg">
            Schedule Your Free Audit → <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Our Process */}
      <section className="py-20 bg-[#060a10]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Rocket size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">OUR PROVEN PROCESS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">From Zero to <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Full Chair</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery & Audit", icon: Search, desc: "We analyze your current marketing, website, GBP, and competitors to create a custom plan.", color: "#c9a84c" },
              { step: "02", title: "Strategy & Setup", icon: Settings, desc: "We build your ad accounts, design creatives, optimize GBP, and install tracking.", color: "#f0d282" },
              { step: "03", title: "Launch & Monitor", icon: Activity, desc: "Campaigns go live. We monitor performance daily, adjust bids, and test new angles.", color: "#c9a84c" },
              { step: "04", title: "Scale & Optimize", icon: TrendingUp, desc: "We double down on winning channels, add new services, and grow your patient base.", color: "#f0d282" },
            ].map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center group overflow-hidden"
              >
                <div className="absolute -top-3 left-6 text-6xl font-black text-[#c9a84c]/10">{step.step}</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <step.icon size={28} style={{ color: step.color }} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                  <div className="mt-4 flex justify-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]/60" />
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]/30" />
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]/10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={CALENDLY} target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-[#c9a84c] hover:text-[#070b12] transition">
              Start Your Journey → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table – Technical differences */}
      <section className="py-20 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Scale size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">COMPARISON</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Our Dental Marketing vs <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Other Agencies</span></h2>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0f1a]">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr><th className="p-4 text-left text-white/60">Aspect</th><th className="p-4 text-left text-[#c9a84c] font-bold">Pranjal Digital</th><th className="p-4 text-left text-white/60">Other Agencies</th></tr>
              </thead>
              <tbody>
                {[
                  { feature: "Meta Ads Approach", us: "Hyper‑local targeting, patient avatars, creative testing (static + video), lead forms & instant booking", them: "Generic interest targeting, no creative iteration, slow response" },
                  { feature: "Google Ads Strategy", us: "Intent‑based keyword clusters, call‑only campaigns, location extensions, local service ads integration", them: "Broad match keywords, no call tracking, wasted spend" },
                  { feature: "SEO + AEO + GEO", us: "Rank on Google, ChatGPT, Perplexity, voice search – full entity optimization & AI crawler readiness", them: "Only traditional SEO, ignores answer/generative engines" },
                  { feature: "Website CRO", us: "Mobile‑first, sub‑2s load time, chat/SMS integration, appointment scheduling, heatmap analysis", them: "Slow, bloated themes, no conversion optimisation" },
                  { feature: "Reporting & Transparency", us: "Live dashboards + monthly deep‑dive with actionable insights", them: "Fancy PDFs with no real data or next steps" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-white/10 hover:bg-white/5 transition">
                    <td className="p-4 text-white/80 font-medium">{row.feature}</td>
                    <td className="p-4 text-[#c9a84c] text-sm leading-relaxed">{row.us}</td>
                    <td className="p-4 text-white/50 text-sm leading-relaxed">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <a href={CALENDLY} target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] font-bold hover:scale-105 transition">
              Switch to a Smarter Agency → <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <Orb style={{ width: 900, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(201,168,76,0.07)' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <TrendingUp size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold">READY FOR MORE PATIENTS?</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-5">
              Stop Wasting Money on <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Ineffective Marketing</span>
            </h2>
            <p className="text-white/60 text-xl max-w-xl mx-auto mb-10">
              Let's build a predictable patient acquisition system – starting at $499/month.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a href={CALENDLY} target="_blank"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]">
                <Calendar size={20} /> Book Free Consultation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/contact">
                <a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">
                  Get Dental Leads Now
                </a>
              </Link>
            </div>
            <p className="text-white/30 text-xs mt-6">* Lead price may vary based on city, competition and target demography</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
