import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, TrendingUp, Search, Target, MapPin,
  Smartphone, MessageSquare, Calendar, PhoneCall, Shield, DollarSign,
  ChevronRight, Star, Zap, BarChart3, Users, Globe, Award,
  Facebook, Instagram, Layers, Megaphone, Eye, Activity,
  Clock, Rocket, Sparkles, ThumbsUp, Brain, Bot, Gauge,
  Crown, BadgeCheck, Compass, Navigation, Filter, Sliders,
  Scale, BadgeDollarSign, HeartHandshake,
  // ... (keeping all used icons)
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// Types
interface Service {
  icon: React.ElementType;
  name: string;
  description: string;
  color: string;
}

// Data
const services: Service[] = [
  { icon: Facebook, name: 'Meta Ads (FB + IG)', description: 'Your leads engine – targeted campaigns that generate $10–15 dental leads', color: '#1877F2' },
  { icon: Target, name: 'Google Ads', description: 'Your leads funnel – high‑intent search & call ads for immediate appointments', color: '#EA4335' },
  { icon: MapPin, name: 'Google Business Profile', description: 'Local dentist lifeline – dominate map pack & drive 90+ calls/month', color: '#34A853' },
  { icon: Search, name: 'SEO + AEO + GEO', description: 'Long‑term strategy – rank on Google, ChatGPT, voice search, and AI engines', color: '#FBBC05' },
  { icon: Smartphone, name: 'Website + CRO', description: 'Conversion optimization – mobile‑first design, forms, chat, and SMS', color: '#c9a84c' },
];

const processSteps = [
  { num: '01', title: 'Audit & Strategy', desc: 'We analyze your current marketing, competitors, and patient journey.', icon: Search },
  { num: '02', title: 'Setup & Integration', desc: 'We build your campaigns, optimize GBP, install tracking, and configure CRM.', icon: Settings },
  { num: '03', title: 'Launch & Monitor', desc: 'Campaigns go live. We monitor performance daily, adjust bids, and test creatives.', icon: Activity },
  { num: '04', title: 'Scale & Optimize', desc: 'We double down on what works, add new channels, and grow your patient flow.', icon: TrendingUp },
];

const whyChooseUs = [
  { icon: Shield, title: 'Flat $499/month', desc: 'No surprise fees. All services included – Meta, Google, GBP, SEO, CRO, and reporting.' },
  { icon: Award, title: '12+ Years Experience', desc: 'Specialized in dental marketing since 2012. We know what works for practices like yours.' },
  { icon: Users, title: 'Proven Results', desc: 'Royal Lane Dental grew from 20 to 90+ calls/month and 350% more organic traffic.' },
  { icon: Rocket, title: 'First Month Results', desc: 'We guarantee measurable results in 30 days or 100% money back on management fees.' },
];

const vsAgencies = [
  { feature: 'Monthly Fee', us: '$499 (all‑inclusive)', them: '$2,000–$5,000+ hidden fees' },
  { feature: 'Dental Specialization', us: '✓ 12+ years in dental', them: 'Generalist agencies' },
  { feature: 'Meta + Google + GBP + SEO', us: '✓ All included', them: 'A la carte → extra $1,000+' },
  { feature: 'Dedicated Account Manager', us: '✓ Same expert every month', them: 'Rotating junior staff' },
  { feature: 'Reporting & Analytics', us: '✓ Live dashboards + monthly deep‑dives', them: 'Fancy PDFs with no insights' },
  { feature: 'Money‑Back Guarantee', us: '✓ First month results or refund', them: 'Locked into 6–12 month contracts' },
];

// Custom Hooks & Components
function useCountUp(end: number, duration: number = 2000, trigger: boolean = false) {
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

const Particles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 4 + 1,
          height: Math.random() * 4 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(201,168,76,${Math.random() * 0.3 + 0.05})`,
        }}
        animate={{ y: [0, -40, 0], opacity: [0, 0.5, 0] }}
        transition={{ duration: Math.random() * 6 + 3, repeat: Infinity, delay: Math.random() * 4 }}
      />
    ))}
  </div>
);

const Orb: React.FC<{ style?: React.CSSProperties; className?: string }> = ({ style, className }) => (
  <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
    transition={{ duration: 12, repeat: Infinity }}
    className={`absolute rounded-full blur-[100px] pointer-events-none ${className || ''}`}
    style={style}
  />
);

const FocusDiagram: React.FC = () => {
  const diagramRef = useRef(null);
  const isInView = useInView(diagramRef, { once: true, amount: 0.3 });
  return (
    <div ref={diagramRef} className="relative py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center hover:border-[#c9a84c]/40 transition-all duration-300 h-full">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#c9a84c]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon size={28} style={{ color: service.color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{service.name}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-4 w-12 h-0.5 bg-[#c9a84c]/40 mx-auto rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main component
export default function DentalLeadsPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const organic = useCountUp(1900, 2000, statsInView);
  const calls = useCountUp(90, 2000, statsInView);
  const forms = useCountUp(35, 2000, statsInView);
  const traffic = useCountUp(350, 2000, statsInView);

  useEffect(() => {
    document.title = 'Dental Leads | $499/month – Flat Fee | Meta, Google, SEO';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Get dental patients at $499/month flat fee. Includes Meta Ads, Google Ads, GBP optimization, SEO/AEO/GEO, and website CRO. Results guaranteed.';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div className="bg-[#070b12] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <Particles />
        <Orb style={{ width: 800, height: 800, top: '-20%', left: '-20%', background: 'rgba(201,168,76,0.1)' }} />
        <Orb style={{ width: 1000, height: 1000, bottom: '-30%', right: '-30%', background: 'rgba(201,168,76,0.08)' }} />

        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c]/10 to-[#c9a84c]/5 backdrop-blur-sm">
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-semibold tracking-wide">🦷 Flat‑fee Dental Marketing</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight mb-6">
            <span className="text-white">Everything for</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent bg-[length:200%] animate-gradient-x">
              $499/month
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/60 text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Meta Ads • Google Ads • GBP Optimization • SEO/AEO/GEO • Website CRO
            <br />
            <span className="text-[#c9a84c] font-semibold">One flat fee. No surprises. Results in first month or 100% money back.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#c9a84c]/30 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]">
              <Calendar size={20} /> Book Free Strategy Call <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/contact">
              <a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">
                <MessageSquare size={20} /> Contact for Leads
              </a>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-5 mt-12">
            {[
              { icon: Shield, label: 'Money Back Guarantee' },
              { icon: Users, label: '400+ Clients Served' },
              { icon: Award, label: '12+ Years Experience' },
              { icon: Star, label: '4.9/5 Client Rating' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <badge.icon size={14} className="text-[#c9a84c]" />
                <span className="text-white/60 text-xs font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Focus Diagram */}
      <section className="py-20 bg-gradient-to-b from-[#070b12] to-[#080d15] relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Compass size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">OUR FOCUS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              What We Focus On{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">to Grow Your Practice</span>
            </h2>
          </motion.div>
          <FocusDiagram />
        </div>
      </section>

      {/* Case Study: Royal Lane Dental (with data visualizations instead of missing images) */}
      <section className="py-20 bg-[#060a10] relative">
        <Orb style={{ width: 800, height: 800, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(201,168,76,0.04)' }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Award size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">VERIFIED CASE STUDY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              How We Transformed{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Royal Lane Dental</span>
            </h2>
            <p className="text-white/50 text-lg">Dallas, TX · General & Cosmetic Dentistry · 12 months of SEO + GBP + Ads</p>
          </motion.div>

          {/* Stats Cards */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { emoji: '📈', value: organic, suffix: '+', label: 'Organic Sessions/Mo', change: '↑ 352% from 420', color: '#4ade80' },
              { emoji: '📞', value: calls, suffix: '+', label: 'GBP Calls/Month', change: '↑ 350% from 20', color: '#60a5fa' },
              { emoji: '📝', value: forms, suffix: '+', label: 'Form Submissions/Mo', change: '↑ 540% from 5', color: '#f472b6' },
              { emoji: '📊', value: traffic, suffix: '%', label: 'Organic Traffic Growth', change: 'Full year 2025', color: '#c9a84c' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-full blur-2xl" />
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: stat.color }}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-white/70 text-sm mt-2">{stat.label}</div>
                <div className="text-white/40 text-xs mt-1">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Data Visualizations (replaces missing images) */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* GBP Ranking Card */}
            <div className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-md mb-3 flex items-center gap-2"><MapPin size={16} className="text-[#34A853]" /> Google Maps Ranking</h3>
              <div className="space-y-2">
                {[
                  { term: 'dentist Dallas TX', rank: 'Top 6–10' },
                  { term: 'clear aligners Dallas', rank: 'Top 8–12' },
                  { term: 'veneers Dallas', rank: 'Top 10–15' },
                ].map(r => (
                  <div key={r.term} className="flex justify-between text-sm border-b border-white/10 pb-1">
                    <span className="text-white/70">{r.term}</span>
                    <span className="text-green-400 font-semibold">{r.rank}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-white/50 text-xs">⭐ 4.9 (345+ reviews)</div>
            </div>

            {/* GA4 Traffic Chart */}
            <div className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-md mb-3 flex items-center gap-2"><BarChart3 size={16} className="text-[#c9a84c]" /> Organic Traffic Growth</h3>
              <div className="h-32 flex items-end gap-2">
                {[420, 680, 920, 1250, 1580, 1900].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-[#c9a84c]/40 rounded-t-md" style={{ height: `${(val / 2000) * 100}%` }} />
                    <span className="text-[10px] text-white/50 mt-1">{idx === 0 ? 'Jan' : idx === 5 ? 'Dec' : ''}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-white/60 text-xs mt-3">420 → 1,900+ sessions/mo (+352%)</p>
            </div>

            {/* Lead Flow Summary */}
            <div className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-md mb-3 flex items-center gap-2"><PhoneCall size={16} className="text-[#c9a84c]" /> Lead Volume</h3>
              {[
                { label: 'GBP Calls', before: 20, after: 90 },
                { label: 'Forms', before: 5, after: 35 },
                { label: 'Chat/SMS', before: 0, after: 15 },
              ].map(item => (
                <div key={item.label} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">{item.label}</span>
                    <span><span className="text-white/40 line-through">{item.before}</span> → <span className="text-green-400">{item.after}</span></span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282]" style={{ width: `${(item.after / 100) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gradient-to-b from-[#070b12] to-[#080d15]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <Rocket size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">OUR PROCESS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              From Zero to{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Full Chair</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }}
                className="relative bg-gradient-to-br from-[#0d1422] to-[#070b12] border border-white/10 rounded-2xl p-6 text-center group">
                <div className="absolute -top-3 left-6 text-[#c9a84c] font-mono text-4xl font-black opacity-20">{step.num}</div>
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <step.icon size={24} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us + vs Agencies */}
      <section className="py-20 bg-[#060a10]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Why Choose Us */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
                <BadgeCheck size={14} className="text-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs font-bold tracking-wide">WHY DENTISTS CHOOSE US</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Pranjal Digital</span>
              </h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, idx) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Comparison */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
                <Scale size={14} className="text-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs font-bold tracking-wide">COMPARISON</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Us vs{' '}
                <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Other Dental Agencies</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 text-white/60 font-medium">Feature</th>
                      <th className="text-left py-3 text-[#c9a84c] font-bold">Pranjal Digital</th>
                      <th className="text-left py-3 text-white/60 font-medium">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vsAgencies.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="py-3 text-white/80">{row.feature}</td>
                        <td className="py-3 text-[#c9a84c] font-semibold">{row.us}</td>
                        <td className="py-3 text-white/50">{row.them}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl text-center">
                <p className="text-[#c9a84c] text-sm font-bold">⭐ The only dental marketing agency with a flat $499/month all‑inclusive fee and first‑month results guarantee.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Single $499 Pricing */}
      <section className="py-20 bg-gradient-to-b from-[#070b12] to-[#060a10]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <DollarSign size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">SIMPLE PRICING</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              One Flat Fee.{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Everything Included.</span>
            </h2>
            <div className="relative inline-block my-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-[#f0d282]/20 rounded-2xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-[#0f1927] to-[#0a0f1a] border border-[#c9a84c]/40 rounded-2xl p-8 shadow-2xl">
                <div className="text-6xl md:text-7xl font-extrabold text-[#c9a84c]">$499</div>
                <div className="text-white/50 text-sm mt-1">per month • all services included</div>
                <div className="w-16 h-0.5 bg-[#c9a84c]/50 mx-auto my-4" />
                <ul className="text-left space-y-2 mb-6">
                  {['Meta Ads (Facebook + Instagram)', 'Google Ads (Search + Call Ads)', 'Google Business Profile Optimization', 'SEO + AEO + GEO (Traditional + AI)', 'Website CRO + Chat/SMS Integration', 'Monthly Reporting & Strategy Calls'].map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> {feature}</li>
                  ))}
                </ul>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12] hover:scale-105 transition-transform">
                  Get Started → <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="mt-8 p-4 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl max-w-md mx-auto">
              <Shield size={24} className="text-[#c9a84c] mx-auto mb-2" />
              <p className="text-white/80 text-sm font-medium">100% Money‑Back Guarantee – First month results or we refund 100% of management fees.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <Orb style={{ width: 1000, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(201,168,76,0.12)' }} />
        <Particles />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
              <TrendingUp size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-wide">READY FOR MORE PATIENTS?</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
              Stop Wasting Money on{' '}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">Ineffective Marketing</span>
            </h2>
            <p className="text-white/60 text-xl max-w-xl mx-auto mb-10">
              Let's build a system that fills your schedule with quality patients — for a flat $499/month.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#070b12]">
                <Calendar size={20} /> Book Free Consultation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/contact">
                <a className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c]">
                  <MessageSquare size={20} /> Ask About Leads
                </a>
              </Link>
            </div>
            <p className="text-white/30 text-sm mt-8">🦷 Dental marketing specialists · 12+ years · 400+ clients worldwide</p>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
