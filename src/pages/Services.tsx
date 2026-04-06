import React, { useEffect, useRef, useState } from 'react';
function setMeta(description) {
  let meta = document.querySelector("meta[name='description']");

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", description);
}
import { Link } from 'wouter';
import {
  Search, PenTool, Globe, Target, Share2, Building2,
  Zap, Star, Users, Cpu, Mail, BarChart2, MessageSquare,
  Monitor, ArrowRight, Calendar, Play, Eye, CheckCircle,
  TrendingUp, Rocket, ChevronDown, Plus, X
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';



const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// ── PROCESS STEPS ──────────────────────────────────────────────────────────
const processSteps = [
  {
    week: 'Week 1',
    icon: Search,
    title: 'Discovery & Deep Audit',
    desc: 'I personally dive into your business — goals, existing assets, competitors, and market positioning. A 360° audit of your digital presence identifies hidden opportunities and critical gaps before a single rupee is spent.',
  },
  {
    week: 'Week 1–2',
    icon: PenTool,
    title: 'Custom Strategy Blueprint',
    desc: 'Based on audit findings, I architect a bespoke multi-channel strategy — funnel mapping, channel selection, budget allocation, KPI targets, and a 90-day roadmap. You get a documented plan, not a vague proposal.',
  },
  {
    week: 'Week 2–4',
    icon: Monitor,
    title: 'Specialist Team Build & Setup',
    desc: 'The right certified specialists are assigned — SEO engineers, paid media experts, content strategists, designers. Every tool, tracking pixel, analytics dashboard, and campaign infrastructure is set up correctly from day one.',
  },
  {
    week: 'Week 4',
    icon: CheckCircle,
    title: 'Launch & Go-Live',
    desc: 'Campaigns and content go live with full tracking in place. Every launch follows a pre-flight checklist — conversion events, UTM structure, audience segments, creative variants — ensuring clean, attributable data from day one.',
  },
  {
    week: 'Ongoing',
    icon: Eye,
    title: 'Close Monitoring & Reporting',
    desc: 'I personally oversee every active project with weekly performance reviews, real-time anomaly detection, and proactive course corrections. You receive clear, jargon-free reports showing exactly what\'s working and why.',
  },
  {
    week: 'Monthly',
    icon: TrendingUp,
    title: 'Data-Driven Optimisation',
    desc: 'Every channel is continuously tested and refined — A/B tests, bid strategy adjustments, content updates, landing page tweaks. Decisions are made from data, not gut feel. CPA goes down. ROAS goes up.',
  },
  {
    week: 'Quarters 2+',
    icon: Rocket,
    title: 'Scale & Expand',
    desc: 'Proven channels get scaled aggressively. New channels are added systematically. Winning creatives are turned into frameworks. The goal is compounding growth — where each month builds on the last.',
  },
];

// ── SPECIALIST TEAM ────────────────────────────────────────────────────────
const specialists = [
  { icon: Search, title: 'SEO Specialist', desc: 'Technical & content SEO, AEO, GEO, local search', cert: 'Google Certified' },
  { icon: Target, title: 'Paid Media Expert', desc: 'Google, Meta, LinkedIn, TikTok, Amazon Ads', cert: 'Meta Blueprint' },
  { icon: PenTool, title: 'Content Strategist', desc: 'SEO content, thought leadership, B2B/B2C copy', cert: 'HubSpot Certified' },
  { icon: BarChart2, title: 'CRO & Analytics', desc: 'A/B testing, heat mapping, conversion optimisation', cert: 'GA4 Certified' },
];

// ── STATS ──────────────────────────────────────────────────────────────────
const stats = [
  { num: 12, suffix: '+', label: 'Years of Experience', desc: 'Over a decade of hands-on digital marketing — from when Google Analytics was a novelty to the age of AI search.', pct: 100, large: true },
  { num: 400, suffix: '+', label: 'Clients Served', desc: 'Across 15+ industries, 3 continents, and businesses of every stage.', pct: 88 },
  { num: 500, suffix: 'K+', label: 'Monthly Organic Traffic', desc: 'Compounding organic traffic built for clients that keeps delivering long after campaigns end.', pct: 72 },
  { num: 2, suffix: 'M+', label: 'Ad Spend Managed', desc: 'Millions in Google, Meta, LinkedIn, TikTok and Amazon ad spend — profitably managed.', pct: 65 },
  { num: 7, suffix: 'X', label: 'Average ROAS', desc: 'Average return on ad spend across all performance marketing campaigns.', pct: 80 },
  { num: 94, suffix: '%', label: 'Client Retention Rate', desc: 'Clients stay because results compound. Long-term partnerships are the norm, not the exception.', pct: 94 },
  { num: 38, suffix: '%', label: 'Avg. Reduction in CPA', desc: 'Average cost-per-acquisition drop within the first 90 days of optimised paid media management.', pct: 60 },
  { num: 15, suffix: '', label: 'Industries Served', desc: 'SaaS, e-commerce, healthcare, IT, real estate, education, local business, and more.', pct: 55 },
  { num: 3, suffix: '', label: 'Continents of Active Clients', desc: 'US, India, Europe — global execution with local market expertise baked in.', pct: 50 },
];

// ── SERVICES DATA (UNIFIED FROM BOTH) ──────────────────────────────────────────
type Service = {
  icon: React.ElementType;
  name: string;
  what: string;
  how: string[];
  impact: string;
};

type FunnelStage = {
  id: string;
  badge: string;
  badgeClass: string;
  subtitle: string;
  desc: string;
  services: Service[];
};

const funnelStages: FunnelStage[] = [
  {
    id: 'tofu',
    badge: 'TOFU — Top of Funnel',
    badgeClass: 'tofu',
    subtitle: 'Awareness & Discovery',
    desc: 'Get found by the right people — before they even know they need you. Build brand visibility, organic reach, and inbound traffic at scale.',
    services: [
      {
        icon: Search,
        name: 'Technical SEO',
        what: 'Deep technical optimization to make your site fast, crawlable, and index-ready for Google.',
        how: [
          'Comprehensive site audit (Core Web Vitals, crawl errors, indexation)',
          'Schema markup and structured data implementation',
          'Page speed optimization and mobile-first indexing',
          'Internal linking architecture and site structure',
        ],
        impact: 'Dramatically improves organic visibility, reduces bounce rates, and builds long-term search authority.',
      },
      {
        icon: PenTool,
        name: 'Content SEO & Strategy',
        what: 'Content that ranks, converts, and builds your brand authority across every stage of the funnel.',
        how: [
          'Keyword gap analysis and topical cluster mapping',
          'SEO-optimized blog, pillar, and landing page content',
          'E-E-A-T optimization for competitive niches',
          'Content distribution and amplification strategy',
        ],
        impact: 'Generates compounding organic traffic that reduces paid acquisition costs over time.',
      },
      {
        icon: Globe,
        name: 'Local SEO',
        what: 'Dominate local search results and Google Maps for US and India markets.',
        how: [
          'Google Business Profile optimization and management',
          'Local citation building and NAP consistency',
          'Geo-targeted content and landing pages',
          'Review strategy and reputation management',
        ],
        impact: 'Drives high-intent local traffic that converts into foot traffic and phone inquiries.',
      },
      {
        icon: MessageSquare,
        name: 'Quora, Reddit & Community Marketing',
        what: 'Authority building through strategic participation in the communities your customers trust.',
        how: [
          'Quora answer strategy for high-intent queries',
          'Reddit community identification and engagement playbook',
          'Guest posting and thought leadership placement',
          'Community-native content that earns organic trust',
        ],
        impact: 'Builds brand credibility, earns backlinks, and drives warm referral traffic.',
      },
    ],
  },
  {
    id: 'mofu',
    badge: 'MOFU — Middle of Funnel',
    badgeClass: 'mofu',
    subtitle: 'Consideration & Engagement',
    desc: 'Nurture warm audiences into engaged prospects. Build trust, demonstrate authority, and stay top-of-mind while your buyer evaluates options.',
    services: [
      {
        icon: Star,
        name: 'Social Media Marketing',
        what: 'Organic social strategy that builds brand authority and community across all key platforms.',
        how: [
          'Platform-specific content strategy (LinkedIn, Instagram, X)',
          'Content calendar planning and creative production',
          'Community engagement and growth tactics',
          'Influencer collaboration and co-marketing',
        ],
        impact: 'Builds brand equity, drives referral traffic, and creates a loyal audience that converts.',
      },
      {
        icon: Mail,
        name: 'Email Marketing & Automation',
        what: 'Automated email sequences that nurture leads, onboard users, and drive lifetime value.',
        how: [
          'Drip campaign architecture for every funnel stage',
          'List segmentation and personalization at scale',
          'Behavioral triggers and lifecycle automation',
          'A/B testing of subject lines, copy, and CTAs',
        ],
        impact: 'Increases customer retention, reduces churn, and drives repeat revenue at low cost.',
      },
      {
        icon: BarChart2,
        name: 'AEO & GEO',
        what: 'Answer Engine Optimization and Generative Engine Optimization — the future of search.',
        how: [
          'Featured snippet, PAA, and voice search optimization',
          'AI-friendly content architecture and entity optimization',
          'Knowledge graph and brand entity building',
          'Generative AI citation strategy (ChatGPT, Perplexity)',
        ],
        impact: 'Future-proofs your organic visibility as AI search replaces traditional search engines.',
      },
      {
        icon: Building2,
        name: 'LinkedIn Advertising',
        what: 'Precision B2B targeting on the platform where decision-makers actually engage.',
        how: [
          'Sponsored content, InMail, and Lead Gen Form campaigns',
          'Account-based marketing (ABM) targeting by company/role',
          'Thought leadership ad strategy for authority building',
          'LinkedIn organic + paid integration',
        ],
        impact: 'Generates high-quality B2B leads and accelerates deal cycles for enterprise sales.',
      },
    ],
  },
  {
    id: 'bofu',
    badge: 'BOFU — Bottom of Funnel',
    badgeClass: 'bofu',
    subtitle: 'Conversion & Revenue',
    desc: 'Turn high-intent prospects into paying customers. Every tactic here is built around cost-per-acquisition and direct revenue attribution.',
    services: [
      {
        icon: Target,
        name: 'Google PPC Advertising',
        what: 'High-ROI Google Ads campaigns across Search, Display, Shopping, and YouTube.',
        how: [
          'Account structure, keyword research, and match type strategy',
          'Ad copy testing and landing page alignment',
          'Bidding automation with Performance Max integration',
          'Continuous A/B testing and negative keyword hygiene',
        ],
        impact: 'Consistent, measurable revenue from paid search with optimized cost-per-acquisition.',
      },
      {
        icon: Share2,
        name: 'Meta Ads (Facebook & Instagram)',
        what: 'Full-funnel Meta advertising that builds audiences, retargets prospects, and converts customers.',
        how: [
          'Audience research, lookalike building, and segmentation',
          'Creative strategy (static, video, carousel, reels)',
          'Pixel setup, custom events, and conversion API',
          'Campaign scaling with budget efficiency controls',
        ],
        impact: 'Scalable paid social that works across B2C, B2B, SaaS, and e-commerce verticals.',
      },
      {
        icon: Zap,
        name: 'TikTok & Amazon Ads',
        what: 'Performance advertising on the fastest-growing platforms for younger audiences and e-commerce.',
        how: [
          'TikTok Spark Ads and UGC-style creative strategy',
          'Amazon Sponsored Products, Brands, and Display ads',
          'Platform-native creative formats and hooks',
          'ROAS tracking and product-level optimization',
        ],
        impact: 'Reaches untapped audiences and drives product discovery at scale.',
      },
      {
        icon: Monitor,
        name: 'UI/UX & CRO',
        what: 'Conversion Rate Optimization that turns existing traffic into more leads and revenue.',
        how: [
          'Heuristic UX audit and user journey mapping',
          'A/B and multivariate testing with statistical significance',
          'Landing page redesign and copy optimization',
          'Heat mapping, session recording, and funnel analysis',
        ],
        impact: 'Increases conversion rates without increasing ad spend — pure ROI improvement.',
      },
    ],
  },
  {
    id: 'retention',
    badge: 'RETENTION & GROWTH',
    badgeClass: 'retention',
    subtitle: 'Loyalty & Lifetime Value',
    desc: 'The most underinvested stage of most marketing funnels. These services turn one-time buyers into loyal advocates and maximise customer lifetime value.',
    services: [
      {
        icon: Users,
        name: 'B2B Marketing & Lead Generation',
        what: 'End-to-end B2B demand generation that fills your pipeline with qualified prospects.',
        how: [
          'ICP definition and total addressable market analysis',
          'Multi-channel outbound and inbound lead gen programs',
          'Account-based marketing strategy and execution',
          'Sales and marketing alignment for lead handoff',
        ],
        impact: 'Shortens sales cycles and increases MQL-to-SQL conversion rates significantly.',
      },
      {
        icon: Cpu,
        name: 'IT Services & SaaS Marketing',
        what: 'Specialist marketing for IT companies and SaaS products competing in crowded global markets.',
        how: [
          'Review site optimization (Clutch, G2, Capterra)',
          'Technical content marketing for developer audiences',
          'Product-led growth marketing and trial conversion',
          'Competitive positioning and messaging strategy',
        ],
        impact: 'Generates qualified demos, trial signups, and long-term MRR growth.',
      },
    ],
  },
];

// ── FAQ DATA (10 COMPLETE FAQS) ───────────────────────────────────────────────
const faqs = [
  {
    q: 'Do I need all 14 services, or can I start with just one?',
    a: 'You absolutely don\'t need all 14 services. Most clients start with 2–3 high-impact services based on their current growth stage. In the strategy call, I\'ll identify exactly which services give you the best ROI right now — and we build from there as results come in.',
  },
  {
    q: 'How long before I see results?',
    a: 'Paid channels (Google, Meta, LinkedIn Ads) typically show initial data within 2–4 weeks and optimised performance by week 6–8. SEO is a longer game — you\'ll see meaningful traction in 3–6 months, but the results compound permanently. I set honest expectations upfront, not vanity timelines.',
  },
  {
    q: 'Will Pranjal personally work on my account?',
    a: 'Yes. I personally handle strategy, oversight, and client communication on every account. Specialist team members execute the channel-specific work under my direct supervision. You\'re never handed off to a junior account manager — I\'m your primary point of contact throughout.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Absolutely. A significant portion of my client base is in the US, UK, Australia, and Europe. I have deep experience with US and India market dynamics specifically. Time zones are managed with scheduled calls and async-first communication — it works seamlessly.',
  },
  {
    q: 'What industries do you specialise in?',
    a: 'SaaS and IT services, e-commerce, B2B professional services, healthcare, real estate, education, local businesses, and D2C brands. I have active playbooks for each — not generic templates but industry-specific frameworks built over 12+ years.',
  },
  {
    q: 'How do you measure and report results?',
    a: 'You receive a custom dashboard (Google Looker Studio or your preferred tool) with real-time access to all metrics. Monthly strategy reports include performance analysis, key wins, issues addressed, and next-month priorities — plain-English, no jargon, no vanity metrics.',
  },
  {
    q: 'What\'s the minimum engagement period?',
    a: 'I recommend a minimum of 3 months for performance marketing and 6 months for SEO — that\'s what it realistically takes to see meaningful, attributable results. I won\'t sign you to a 12-month lock-in from day one. Most clients stay 12–24+ months because the results justify it.',
  },
  {
    q: 'How is Pranjal Digital different from a traditional agency?',
    a: 'Traditional agencies assign you to a junior team, over-promise on discovery calls, and bury results in slide decks. Here, you get direct access to 12+ years of senior expertise, certified specialists in each channel, personal oversight on every project, and honest performance data.',
  },
  {
    q: 'Can you manage a mix of SEO and paid ads simultaneously?',
    a: 'Yes — and that\'s the most powerful combination. Paid ads deliver immediate revenue while SEO builds long-term organic dominance. The two inform each other: winning paid search keywords identify SEO targets, and organic insights reduce paid CPCs. A unified strategy always outperforms siloed channel management.',
  },
  {
    q: 'What does the onboarding process look like?',
    a: 'After the strategy call: (1) Scope and proposal within 48 hours. (2) Detailed onboarding questionnaire. (3) Access to your existing accounts and tools. (4) Full audit completed in week 1. (5) Strategy blueprint delivered in week 2. (6) Team assigned and setup begins immediately. First campaigns live within 3–4 weeks of kickoff.',
  },
];

// ── VIDEO HIGHLIGHTS ───────────────────────────────────────────────────────
const videoHighlights = [
  { num: '01', title: '12+ Years of Proven Expertise', desc: 'From local businesses to global SaaS companies — the same data-driven approach, scaled to your size and goals.' },
  { num: '02', title: 'Every Channel, One Strategy', desc: 'SEO, paid ads, content, email, and social — all working together in a unified funnel, not in silos.' },
  { num: '03', title: 'B2B, B2C, E-Commerce & SaaS', desc: 'Specialised playbooks for every business model — from lead generation to product-led growth to local dominance.' },
];

const servicePills = ['SEO','AEO','GEO','Google Ads','Meta Ads','LinkedIn Ads','TikTok Ads','Amazon Ads','Content','Email','B2B','Local SEO','IT/SaaS','E-Commerce'];

// ── BADGE CLASS MAP ────────────────────────────────────────────────────────
const badgeStyles: Record<string, string> = {
  tofu: 'bg-blue-500/10 border border-blue-400/25 text-blue-300',
  mofu: 'bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c]',
  bofu: 'bg-emerald-500/10 border border-emerald-400/25 text-emerald-300',
  retention: 'bg-purple-500/10 border border-purple-400/25 text-purple-300',
};

// ── USECOUNT HOOK ──────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = 16;
    const inc = target / (duration / step);
    const timer = setInterval(() => {
      start = Math.min(start + inc, target);
      setCount(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

// ── STAT CELL (FIXED TYPE ERROR) ──────────────────────────────────────────────
function StatCell({ stat, active, large }: { stat: typeof stats[0] & { large?: boolean }; active: boolean; large?: boolean }) {
  const count = useCountUp(stat.num, active);
  return (
    <div className={`relative overflow-hidden bg-[#0a0f1c] p-8 transition-colors hover:bg-[#0c1220] group ${large ? 'col-span-2 flex items-center gap-10' : ''}`}>
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
      <div className={large ? 'flex-1' : ''}>
        <span className="block font-serif text-5xl font-black text-[#c9a84c] leading-none mb-2 group-hover:text-[#e8c46a] transition-colors">
          {count}{stat.suffix}
        </span>
        <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
        <div className="text-xs text-white/50 leading-relaxed">{stat.desc}</div>
        <div className="mt-4 h-0.5 bg-white/10 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e8c46a] rounded transition-all duration-1000"
            style={{ width: active ? `${stat.pct}%` : '0%' }}
          />
        </div>
      </div>
      {large && <div className="font-serif text-8xl font-black text-[#c9a84c]/5 leading-none select-none pointer-events-none">{stat.num}+</div>}
    </div>
  );
}

// ── SERVICE CARD (UPDATED WITH SCROLL REVEAL) ───────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="bg-[#080c14] border border-white/10 rounded-2xl p-7 hover:border-[#c9a84c]/25 transition-colors flex flex-col h-full">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
            <Icon className="text-[#c9a84c]" size={22} />
          </div>
          <h3 className="text-white font-bold text-lg">{service.name}</h3>
        </div>

        <div className="mb-4">
          <div className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-2">What It Is</div>
          <p className="text-white/60 text-sm leading-relaxed">{service.what}</p>
        </div>

        <div className="mb-4 flex-1">
          <div className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-3">How I Execute</div>
          <div className="flex flex-col gap-2.5">
            {service.how.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-[#c9a84c]">{i + 1}</span>
                </div>
                <span className="text-white/60 text-sm leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest mb-1.5">Business Impact</div>
          <p className="text-white/80 text-sm leading-relaxed">{service.impact}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Services() {

useEffect(() => {
  setMeta(
    "Explore SEO, Google Ads, Meta Ads, CRO, and full-funnel digital marketing services designed to increase traffic, generate leads, and drive consistent business growth."
  );
}, []);
  const [activeStep, setActiveStep] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Auto-cycle process steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % processSteps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  // Trigger stats counter on scroll (with SSR safety)
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    
    // SSR safety check
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setStatsActive(true);
      return;
    }
    
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsActive(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#080c14] pt-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="py-20 text-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #040608 0%, #080c14 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto px-6">
          <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-4">Full-Service Digital Marketing</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            End-to-End Digital Marketing<br />
            <span className="text-[#c9a84c]">Services That Drive Revenue</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
            14 specialized services, one strategic brain, a certified team of specialists — all aligned toward a single goal: measurable business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#080c14] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-sm">
              Book a Free Strategy Call <ArrowRight size={16} />
            </a>
            <a href="#services-funnel"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors text-sm">
              Explore Services <ChevronDown size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-3">The Process</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">How I Deliver Results — Step by Step</h2>
          <p className="text-white/50 max-w-xl mb-12">A transparent, stage-gated process where every phase has clear deliverables and accountability built in.</p>

          {/* Step progress bar */}
          <div className="flex items-center gap-0 mb-16 overflow-x-auto pb-2">
            {processSteps.map((s, i) => (
              <div key={i} className="flex-1 min-w-[100px] flex flex-col items-center relative cursor-pointer" onClick={() => setActiveStep(i)}>
                {i < processSteps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-px" style={{ background: i < activeStep ? '#c9a84c' : 'rgba(255,255,255,0.1)' }} />
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-400 relative z-10 ${
                  i === activeStep ? 'bg-[#c9a84c] border-[#c9a84c] text-[#080c14] shadow-[0_0_0_6px_rgba(201,168,76,0.15)]' :
                  i < activeStep ? 'bg-[#c9a84c]/20 border-[#c9a84c] text-[#c9a84c]' :
                  'bg-[#080c14] border-white/20 text-white/40'
                }`}>{i + 1}</div>
                <p className={`text-xs mt-2 text-center leading-tight transition-colors ${i === activeStep ? 'text-white font-medium' : 'text-white/40'}`}>{s.title.split(' ')[0]}</p>
              </div>
            ))}
          </div>

          {/* Alternating steps */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent" />
            <div className="flex flex-col gap-0">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className="grid grid-cols-[1fr_60px_1fr] items-start py-8">
                    {isLeft ? (
                      <>
                        <div className="pr-10 text-right">
                          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]/70 mb-2 bg-[#c9a84c]/8 px-3 py-1 rounded-full border border-[#c9a84c]/15">{step.week}</span>
                          <div className="flex justify-end mb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center">
                              <Icon size={18} className="text-[#c9a84c]" />
                            </div>
                          </div>
                          <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                        <div className="flex justify-center pt-4">
                          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-400 ${
                            i === activeStep ? 'bg-[#c9a84c] border-[#c9a84c] text-[#080c14] shadow-[0_0_0_8px_rgba(201,168,76,0.12)]' :
                            'bg-[#080c14] border-white/20 text-white/40'
                          }`}>{i + 1}</div>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="flex justify-center pt-4">
                          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-400 ${
                            i === activeStep ? 'bg-[#c9a84c] border-[#c9a84c] text-[#080c14] shadow-[0_0_0_8px_rgba(201,168,76,0.12)]' :
                            'bg-[#080c14] border-white/20 text-white/40'
                          }`}>{i + 1}</div>
                        </div>
                        <div className="pl-10">
                          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]/70 mb-2 bg-[#c9a84c]/8 px-3 py-1 rounded-full border border-[#c9a84c]/15">{step.week}</span>
                          <div className="mb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center">
                              <Icon size={18} className="text-[#c9a84c]" />
                            </div>
                          </div>
                          <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 bg-[#080c14] text-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-3">Who Executes</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Strategic Leadership + Specialist Execution</h2>
          <p className="text-white/50 max-w-xl mx-auto mb-14">You get one strategic brain with full accountability — plus a team of certified specialists who are masters of their craft.</p>

          {/* Org chart */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#c9a84c] text-[#080c14] rounded-2xl px-12 py-5 inline-block">
              <p className="font-bold text-base">Pranjal — Head of Strategy & Oversight</p>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mt-1">Your Primary Point of Contact</p>
            </div>
            <div className="w-px h-8 bg-[#c9a84c]/30 mt-0" />
            <div className="w-4/5 h-px bg-[#c9a84c]/15 relative">
              <div className="absolute -top-5 left-[12.5%] w-px h-5 bg-[#c9a84c]/30" />
              <div className="absolute -top-5 right-[12.5%] w-px h-5 bg-[#c9a84c]/30" />
            </div>
            <div className="h-5" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {specialists.map((sp, i) => {
              const Icon = sp.icon;
              return (
                <div key={i} className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-5 hover:border-[#c9a84c]/25 transition-colors text-center">
                  <div className="w-11 h-11 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-[#c9a84c]" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{sp.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{sp.desc}</p>
                  <div className="inline-flex items-center gap-1 bg-[#c9a84c]/8 border border-[#c9a84c]/18 rounded-full px-3 py-1 text-[10px] font-bold text-[#c9a84c]">
                    ✦ {sp.cert}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monitoring strip */}
          <div className="bg-[#0a0f1c] border border-[#c9a84c]/15 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
              <Eye size={24} className="text-[#c9a84c]" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-1">Personal Oversight on Every Project</h4>
              <p className="text-white/50 text-sm">Pranjal reviews all active campaigns weekly. Nothing ships without strategic sign-off. Every anomaly is caught and corrected before it becomes a problem.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Weekly Review', 'Performance Alerts', 'Monthly Strategy Call', 'Full Transparency'].map(c => (
                <div key={c} className="bg-[#c9a84c]/8 border border-[#c9a84c]/15 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-[#c9a84c]">{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="py-20" style={{ background: '#0d1424' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-3">See It In Action</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Multi-Funnel Marketing, Explained</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video placeholder */}
            <div className="border border-white/10 rounded-2xl bg-[#0a0f1c] aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-[#c9a84c]/30 transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
              <div className="w-16 h-16 rounded-full bg-[#c9a84c] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Play size={24} fill="#080c14" className="text-[#080c14] ml-1" />
              </div>
              <p className="text-white/50 text-sm">Upload your intro video here</p>
              <p className="text-white/25 text-xs mt-1">Replace this placeholder with your video embed</p>
            </div>

            {/* Highlights */}
            <div>
              <div className="flex flex-col gap-5 mb-6">
                {videoHighlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[#c9a84c]">{h.num}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{h.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] mb-3">Services Covered</p>
                <div className="flex flex-wrap gap-2">
                  {servicePills.map(p => (
                    <span key={p} className="bg-[#c9a84c]/10 border border-[#c9a84c]/18 rounded-full px-3 py-1 text-[11px] font-semibold text-[#c9a84c]">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-[#080c14]" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-3">The Numbers Don't Lie</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Results That Speak for Themselves</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-white/10 rounded-2xl overflow-hidden">
            {stats.map((stat, i) => (
              <StatCell key={i} stat={stat} active={statsActive} large={stat.large} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES BY FUNNEL ── */}
      <section id="services-funnel" className="py-20 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-3">Services by Marketing Funnel</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">From First Click to Loyal Customer</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">Every service maps to a specific stage in your buyer journey. No guesswork. No wasted spend.</p>
          </div>

          {funnelStages.map((stage) => (
            <div key={stage.id} className="mb-20">
              <div className="flex items-center gap-5 mb-4">
                <div className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${badgeStyles[stage.badgeClass]}`}>
                  {stage.badge}
                </div>
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-white/40 text-xs shrink-0">{stage.subtitle}</span>
              </div>
              <p className="text-white/50 text-sm mb-8 max-w-2xl">{stage.desc}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {stage.services.map((srv, idx) => (
                  <ServiceCard key={srv.name} service={srv} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MID CTA ── */}
      <section className="py-24 text-center px-6" style={{ background: 'linear-gradient(180deg, #080c14 0%, #040608 100%)' }}>
        <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-4">Ready to Grow?</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
        <p className="text-white/50 max-w-lg mx-auto mb-10 text-sm leading-relaxed">Book a free 30-minute strategy call. I'll personally diagnose where your biggest growth opportunity is and map out exactly which services will move the needle fastest.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#c9a84c] text-[#080c14] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-sm">
            <Calendar size={18} /> Book Free Strategy Call
          </a>
          {/* FIXED: wouter Link with proper a tag */}
          <Link href="/contact">
            <a className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors text-sm">
              Send a Message
            </a>
          </Link>
        </div>
      </section>

      {/* ── FAQ (10 COMPLETE FAQS) ── */}
      <section className="py-20 bg-[#0a0f1c]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-white/50">Everything you need to know before we work together.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#080c14] border border-white/10 rounded-2xl overflow-hidden hover:border-[#c9a84c]/20 transition-colors">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-semibold text-sm leading-snug">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === i ? 'bg-[#c9a84c]' : 'bg-[#c9a84c]/10'}`}>
                    {openFaq === i
                      ? <X size={13} className="text-[#080c14]" />
                      : <Plus size={13} className="text-[#c9a84c]" />
                    }
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-white/8">
                    <p className="text-white/55 text-sm leading-relaxed pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 text-center px-6" style={{ background: 'linear-gradient(180deg, #040608 0%, #080c14 50%, #040608 100%)' }}>
        <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-4">Let's Build Something</p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Stop Guessing<br />and Start Growing?
        </h2>
        <p className="text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
          12+ years. 400+ clients. One strategic brain and a certified team dedicated to your growth. Let's talk about what that looks like for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#c9a84c] text-[#080c14] font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-opacity">
            <Calendar size={18} /> Book Free Strategy Call
          </a>
          {/* FIXED: wouter Link with proper a tag */}
          <Link href="/contact">
            <a className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors">
              Contact Me
            </a>
          </Link>
        </div>
      </section>

    </div>
  );
}
