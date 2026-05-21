import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Search,
  Target,
  MapPin,
  Smartphone,
  MessageSquare,
  Calendar,
  PhoneCall,
  Shield,
  DollarSign,
  ChevronRight,
  Star,
  Zap,
  BarChart3,
  Users,
  Award,
  Facebook,
  Instagram,
  Layers,
  Megaphone,
  Activity,
  Clock,
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// ==================== TYPES ====================
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

interface Service {
  icon: React.ElementType;
  name: string;
  tag: string;
  stats: string[];
  proof: string;
  color: string;
}

interface Plan {
  name: string;
  price: number;
  features: string[];
  tag: string | null;
}

// ==================== DATA ====================
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

const services: Service[] = [
  { icon: Megaphone, name: "Meta Ads", tag: "FB + IG", stats: ["$10–15 CPL", "5–7% CTR", "3–5x ROAS"], proof: "312 leads in 30 days for a Dallas clinic at $8.97/lead", color: "#1877F2" },
  { icon: Target, name: "Google Ads", tag: "Search + Call Ads", stats: ["$12–18 CPL", "Top 3 positions", "4x+ ROAS"], proof: "Reduced cost per booking by 52% for a dental chain", color: "#EA4335" },
  { icon: MapPin, name: "Google Business", tag: "GBP Optimization", stats: ["90+ calls/mo", "Top 6–10 map rank", "350% more actions"], proof: "Royal Lane went from 20 calls → 90+ calls/month", color: "#34A853" },
  { icon: Search, name: "SEO + AEO + GEO", tag: "Organic Growth", stats: ["350% traffic↑", "Top 10 keywords", "Featured snippets"], proof: "420 → 1,900+ organic sessions/month for Royal Lane", color: "#FBBC05" },
  { icon: Smartphone, name: "Website + CRO", tag: "Conversion Rate", stats: ["75% mobile traffic", "55+ inquiries/mo", "28–35 forms/mo"], proof: "Chat & SMS added — 10–20 extra inquiries/month instantly", color: "#c9a84c" },
];

const plans: Plan[] = [
  { name: "Starter", price: 499, features: ["SEO + GBP optimization", "Weekly posts & updates", "Review management", "Monthly reporting"], tag: null },
  { name: "Growth", price: 999, features: ["Everything in Starter", "Google Ads management", "Meta Ads management", "Landing page optimization", "Chat/SMS setup"], tag: "MOST POPULAR" },
  { name: "Premium", price: 1999, features: ["Everything in Growth", "AEO + GEO strategy", "Video ads creation", "Full funnel automation", "Dedicated strategist"], tag: "BEST RESULTS" },
];

// ==================== HOOKS ====================
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

// ==================== SUBCOMPONENTS ====================
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

const StatBadge: React.FC<{ icon: React.ElementType; label: string; value: string; color?: string }> = ({
  icon: Icon,
  label,
  value,
  color = "#c9a84c",
}) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
    <Icon size={14} style={{ color }} />
    <span className="text-white/50 text-xs">{label}</span>
    <span className="text-white font-bold text-sm" style={{ color }}>{value}</span>
  </div>
);

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
    {/* Mock browser bar */}
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
          { label: "Click-Through Rate", value: campaign.ctr, highlight: false },
          { label: "ROAS", value: campaign.roas, highlight: false },
          { label: "Total Leads", value: campaign.leads, highlight: false },
        ].map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl border ${m.highlight ? 'bg-[#c9a84c]/10 border-[#c9a84c]/30' : 'bg-white/[0.03] border-white/8'}`}
          >
            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{m.label}</div>
            <div className={`font-bold text-xl ${m.highlight ? 'text-[#c9a84c]' : 'text-white'}`}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/8 pt-4">
        <div className="text-white/30 text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1">
          <Activity size={10} />
          Impressions: {campaign.impressions}
        </div>
        <div className="flex items-end gap-1 h-10">
          {[40, 65, 45, 80, 70, 90, 75, 100, 85, 95, 88, 92].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.03, duration: 0.5 }}
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

    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: 'inset 0 0 40px rgba(201,168,76,0.06)' }}
    />
  </motion.div>
);

// ==================== MAIN PAGE ====================
export default function DentalLeadsPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const organic = useCountUp(1900, 2200, statsInView);
  const calls = useCountUp(90, 2000, statsInView);
  const forms = useCountUp(35, 2000, statsInView);
  const traffic = useCountUp(350, 2000, statsInView);

  useEffect(() => {
    document.title = 'Dental Leads | $10/Lead* | SEO, Google Ads, Meta Ads';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content =
      'Get dental patients at $10/lead* with our proven system: Meta Ads, Google Ads, GBP optimization, SEO/AEO/GEO. Results in first month or 100% money back.';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div style={{ background: '#070b12', color: '#fff', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex flex-col justify-center">
        <Particles />
        <Orb style={{ width: 600, height: 600, top: '-10%', left: '-10%', background: 'rgba(201,168,76,0.08)' }} />
        <Orb style={{ width: 700, height: 700, bottom: '-20%', right: '-15%', background: 'rgba(201,168,76,0.06)' }} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-[#c9a84c]/30"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))' }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#c9a84c]"
            />
            <span style={{ color: '#c9a84c', fontSize: 13, fontWeight: 600 }}>🦷 Specialized Dental Clinic Growth System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(38px, 7vw, 78px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            <span style={{ color: '#fff' }}>Get Dental Patients</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #c9a84c, #f0d282, #c9a84c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200%',
              }}
            >
              at $10/Lead*
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'clamp(16px,2vw,20px)',
              maxWidth: 620,
              margin: '24px auto 40px',
              lineHeight: 1.7,
            }}
          >
            Meta Ads · Google Ads · GBP Optimization · SEO/AEO/GEO · Website CRO
            <br />
            <span style={{ color: '#c9a84c', fontWeight: 600 }}>Results in first month or 100% money back.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #f0d282)',
                color: '#070b12',
                boxShadow: '0 8px 40px rgba(201,168,76,0.35)',
              }}
            >
              <Calendar size={18} />
              Book Free Strategy Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/contact">
              <a
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#fff' }}
              >
                <MessageSquare size={18} />
                Contact for Leads
              </a>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
          >
            {[
              { icon: Shield, label: 'Money Back Guarantee' },
              { icon: Users, label: '400+ Clients Served' },
              { icon: Award, label: '12+ Years Experience' },
              { icon: Star, label: '4.9/5 Client Rating' },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <b.icon size={13} style={{ color: '#c9a84c' }} />
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{b.label}</span>
              </div>
            ))}
          </motion.div>

          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 20 }}>
            *$10/lead based on location, targeting & competition. Actual costs may vary.
          </p>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <div
            style={{
              width: 24,
              height: 40,
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 6,
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 4, height: 4, borderRadius: '50%', background: '#c9a84c' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ========== META ADS CAMPAIGNS ========== */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(180deg, #070b12 0%, #080d15 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <Megaphone size={13} style={{ color: '#c9a84c' }} />
              <span style={{ color: '#c9a84c', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                REAL META ADS RESULTS
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px,5vw,52px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              Real Campaigns.{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #c9a84c, #f0d282)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Real Dental Leads.
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
              Campaign-level data from active Facebook + Instagram dental lead generation campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {metaCampaigns.map((c, i) => (
              <CampaignCard key={c.name} campaign={c} idx={i} />
            ))}
          </div>

          {/* Aggregate dashboard row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(135deg, #0d1422, #070b12)' }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(24,119,242,0.15)' }}>
                <Facebook size={16} style={{ color: '#1877F2' }} />
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(228,64,95,0.15)' }}>
                <Instagram size={16} style={{ color: '#E4405F' }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>Meta Ads Manager — Aggregate Dashboard</span>
              <div
                className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span style={{ color: '#4ade80', fontSize: 11 }}>Live</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {[
                { label: 'Total Ad Spend', value: '$8,247', delta: '+12% MoM', up: true },
                { label: 'Leads Generated', value: '642', delta: '+34% MoM', up: true },
                { label: 'Avg. Cost/Lead', value: '$12.84', delta: '−18% MoM', up: false },
                { label: 'Blended ROAS', value: '4.2×', delta: '+0.8× MoM', up: true },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-5 text-center"
                  style={{ background: '#0a0f1a' }}
                >
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 8,
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ color: s.up ? '#4ade80' : '#f87171', fontSize: 12, marginTop: 4, fontWeight: 600 }}>{s.delta}</div>
                </motion.div>
              ))}
            </div>

            <div className="px-6 pb-6 pt-4">
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginBottom: 8 }}>LEADS OVER TIME (30 DAYS)</div>
              <div className="flex items-end gap-1" style={{ height: 48 }}>
                {[22, 35, 28, 45, 38, 55, 48, 62, 51, 70, 63, 78, 68, 85, 72, 90, 78, 95, 82, 100, 88, 96, 91, 98, 86, 94, 89, 97, 93, 100].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.02, duration: 0.4 }}
                      style={{
                        flex: 1,
                        borderRadius: '2px 2px 0 0',
                        background: `rgba(201,168,76,${0.15 + (h / 100) * 0.65})`,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CASE STUDY: ROYAL LANE DENTAL ========== */}
      <section style={{ padding: '100px 0', background: '#060a10', position: 'relative' }}>
        <Orb style={{ width: 800, height: 800, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(201,168,76,0.04)' }} />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <Award size={13} style={{ color: '#c9a84c' }} />
              <span style={{ color: '#c9a84c', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>VERIFIED CASE STUDY</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px,5vw,52px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              How We Transformed{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #c9a84c, #f0d282)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Royal Lane Dental
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
              Dallas, TX · General & Cosmetic Dentistry · 12 months of SEO + GBP optimization
            </p>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { emoji: '📈', value: organic, suffix: '+', sub: 'Organic Sessions/Mo', change: '↑ 352% from 420', color: '#4ade80' },
              { emoji: '📞', value: calls, suffix: '+', sub: 'GBP Calls/Month', change: '↑ 350% from 20', color: '#60a5fa' },
              { emoji: '📝', value: forms, suffix: '+', sub: 'Form Submissions/Mo', change: '↑ 540% from 5', color: '#f472b6' },
              { emoji: '📊', value: traffic, suffix: '%', sub: 'Organic Traffic Growth', change: 'Full year 2025', color: '#c9a84c' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  background: 'linear-gradient(135deg, #0d1422, #070b12)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: 28,
                  textAlign: 'center',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `${s.color}15`,
                    filter: 'blur(30px)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.emoji}</div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 'clamp(32px,4vw,48px)',
                    letterSpacing: '-0.03em',
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.value.toLocaleString()}
                  {s.suffix}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 8, fontWeight: 500 }}>{s.sub}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 4 }}>{s.change}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Rankings table */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(234,67,53,0.12)' }}>
                  <Search size={14} style={{ color: '#EA4335' }} />
                </div>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Google Maps & Search Rankings</span>
              </div>
              <div style={{ padding: '8px 0' }}>
                <div
                  className="grid grid-cols-3 px-5 py-2"
                  style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em' }}
                >
                  <span>Keyword</span>
                  <span>Before</span>
                  <span>After</span>
                </div>
                {rankings.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="grid grid-cols-3 px-5 py-3 border-t border-white/5 group hover:bg-white/[0.02] transition-colors"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {r.hot && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />}
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500 }}>{r.term}</span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>{r.before}</span>
                    <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>{r.after}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Lead flow chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)' }}>
                  <PhoneCall size={14} style={{ color: '#c9a84c' }} />
                </div>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Monthly Lead Volume — Before vs After</span>
              </div>
              <div style={{ padding: 24 }}>
                {[
                  { label: 'GBP Calls', before: 20, after: 90, color: '#60a5fa' },
                  { label: 'Website Forms', before: 5, after: 35, color: '#4ade80' },
                  { label: 'Chat / SMS', before: 0, after: 15, color: '#f472b6' },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? 24 : 0 }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'line-through' }}>
                          {item.before}/mo
                        </span>
                        <ArrowRight size={12} style={{ color: '#c9a84c' }} />
                        <span style={{ color: item.color, fontSize: 16, fontWeight: 800 }}>{item.after}+/mo</span>
                      </div>
                    </div>
                    <div style={{ marginBottom: 5 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, width: 36 }}>Before</span>
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${(item.before / item.after) * 100}%`,
                              height: '100%',
                              background: 'rgba(255,255,255,0.15)',
                              borderRadius: 3,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, width: 36 }}>After</span>
                        <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 5, overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.15, duration: 0.9 }}
                            style={{
                              height: '100%',
                              background: `linear-gradient(90deg, ${item.color}60, ${item.color})`,
                              borderRadius: 5,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 24,
                    padding: '14px 16px',
                    background: 'rgba(201,168,76,0.06)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 12,
                    textAlign: 'center',
                  }}
                >
                  <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: 14 }}>
                    📊 Total: ~25/mo → 140+/mo in patient inquiries
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* What was done — timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}
          >
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 24 }}>🛠 What We Did (2025 Strategy)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: '01',
                  title: 'Technical & On-Page SEO',
                  items: ['Fixed crawl errors & mobile UX', 'Implemented local + service schema', "Rewrote title tags for 'Dallas dentist'", 'Optimized site speed & headers'],
                },
                {
                  num: '02',
                  title: 'GBP Management',
                  items: ['Completed all GBP profile fields', 'Weekly posts with service highlights', 'Geo-tagged images on Maps', 'Review request strategy'],
                },
                {
                  num: '03',
                  title: 'Local Citations',
                  items: ['Cleaned inconsistent NAP listings', 'Added healthcare directory citations', 'Built local Dallas backlinks', 'Monitored citation consistency'],
                },
                {
                  num: '04',
                  title: 'Conversion Focus',
                  items: ['Added appointment form + phone CTAs', 'SMS chat widget integrated', 'Analytics tracking for all actions', 'A/B tested landing page variants'],
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    style={{
                      color: '#c9a84c',
                      fontWeight: 800,
                      fontSize: 28,
                      fontFamily: 'monospace',
                      marginBottom: 8,
                      opacity: 0.5,
                    }}
                  >
                    {s.num}
                  </div>
                  <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{s.title}</h4>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 mb-2">
                        <CheckCircle2 size={12} style={{ color: '#c9a84c', marginTop: 2, flexShrink: 0 }} />
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-6 text-center">
            <a
              href="https://www.royallanedental.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: 13,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a84c')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              View Royal Lane Dental Website <ChevronRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== SERVICES SYSTEM ========== */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(180deg, #070b12, #060a10)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <Layers size={13} style={{ color: '#c9a84c' }} />
              <span style={{ color: '#c9a84c', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>COMPLETE SYSTEM</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px,5vw,52px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              Everything to{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #c9a84c, #f0d282)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Fill Your Chair
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
              5 channels. One dashboard. One point of contact. Proven results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                style={{
                  background: 'linear-gradient(135deg, #0d1422, #070b12)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  padding: 28,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 2,
                    background: `linear-gradient(90deg, ${s.color}, transparent)`,
                    borderRadius: '0 0 2px 2px',
                  }}
                />
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{s.name}</h3>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                      background: 'rgba(255,255,255,0.05)',
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {s.stats.map((stat, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: s.color,
                        background: `${s.color}10`,
                        border: `1px solid ${s.color}25`,
                        padding: '3px 10px',
                        borderRadius: 20,
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Zap size={13} style={{ color: '#c9a84c', marginTop: 1, flexShrink: 0 }} />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                      <span style={{ color: '#c9a84c', fontWeight: 600 }}>Proof: </span>
                      {s.proof}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -8 }}
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 20,
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'rgba(201,168,76,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Calendar size={24} style={{ color: '#c9a84c' }} />
              </div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Get Your Free Growth Plan</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 20 }}>
                30-minute call. We'll audit your current setup and show you what's possible.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #c9a84c, #f0d282)',
                  borderRadius: 10,
                  color: '#070b12',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                Book Free Call <ArrowRight size={14} />
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section style={{ padding: '100px 0', background: '#060a10' }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <DollarSign size={13} style={{ color: '#c9a84c' }} />
              <span style={{ color: '#c9a84c', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>TRANSPARENT PRICING</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px,5vw,52px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              Service Fees from{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #c9a84c, #f0d282)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                $499/month
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17 }}>No hidden fees. No long-term contracts. Ad spend billed separately.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                style={{
                  position: 'relative',
                  background: plan.tag ? 'linear-gradient(135deg, #0f1927, #0a0f1a)' : 'linear-gradient(135deg, #0d1422, #070b12)',
                  border: plan.tag === 'MOST POPULAR' ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 24,
                  padding: '36px 28px',
                  boxShadow: plan.tag === 'MOST POPULAR' ? '0 0 60px rgba(201,168,76,0.1)' : 'none',
                }}
              >
                {plan.tag && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: plan.tag === 'MOST POPULAR' ? 'linear-gradient(90deg, #c9a84c, #f0d282)' : 'rgba(255,255,255,0.15)',
                      color: plan.tag === 'MOST POPULAR' ? '#070b12' : '#fff',
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      padding: '5px 16px',
                      borderRadius: 20,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {plan.tag}
                  </div>
                )}
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ color: '#c9a84c', fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em' }}>${plan.price}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>/month</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginBottom: 28 }}>Ad spend billed separately</p>
                <ul style={{ listStyle: 'none', margin: '0 0 32px', padding: 0 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: 'rgba(201,168,76,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle2 size={11} style={{ color: '#c9a84c' }} />
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                    background: plan.tag === 'MOST POPULAR' ? 'linear-gradient(135deg, #c9a84c, #f0d282)' : 'rgba(255,255,255,0.05)',
                    color: plan.tag === 'MOST POPULAR' ? '#070b12' : '#fff',
                    border: plan.tag === 'MOST POPULAR' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s',
                  }}
                >
                  Get Started →
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              maxWidth: 600,
              margin: '0 auto',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 20,
              padding: '36px 40px',
              textAlign: 'center',
            }}
          >
            <Shield size={36} style={{ color: '#c9a84c', marginBottom: 16 }} />
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 22, marginBottom: 12 }}>100% Money-Back Guarantee</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              If you don't see measurable results in the first month — increased calls, form fills, or leads — we'll refund 100% of your
              management fees. No questions asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <Orb style={{ width: 900, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(201,168,76,0.07)' }} />
        <Particles />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <TrendingUp size={13} style={{ color: '#c9a84c' }} />
              <span style={{ color: '#c9a84c', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>READY FOR MORE PATIENTS?</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(32px,6vw,64px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 20,
              }}
            >
              Stop Paying for Ads<br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #c9a84c, #f0d282)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                That Don't Convert
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, maxWidth: 500, margin: '0 auto 48px', lineHeight: 1.7 }}>
              Let's build a system that consistently fills your schedule with quality patients — every month.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-9 py-4.5 rounded-xl font-bold text-base transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #f0d282)',
                  color: '#070b12',
                  boxShadow: '0 12px 50px rgba(201,168,76,0.4)',
                  padding: '16px 36px',
                  borderRadius: 14,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                <Calendar size={18} />
                Book Free Consultation
                <ArrowRight size={16} />
              </a>
              <Link href="/contact">
                <a
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '16px 36px',
                    borderRadius: 14,
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                  }}
                >
                  <MessageSquare size={18} />
                  Ask About Leads
                </a>
              </Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 32 }}>
              🦷 Dental marketing specialists · 12+ years · 400+ clients worldwide
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
