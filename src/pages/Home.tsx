import FunnelPyramid from "@/components/FunnelPyramid";
import CostCalculator from "@/components/CostCalculator";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, ChevronDown, Play, TrendingUp, Users, Globe,
  DollarSign, BarChart3, Search, Target, Share2, Building2, Cpu, Mail,
  Star, Zap, Shield, Clock, PhoneCall, X, Check
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

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

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold gold-gradient mb-1">
        {count}{suffix}
      </div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  );
}

const services = [
  { icon: Search, name: 'SEO', desc: 'Technical, content, and local SEO that ranks and converts.' },
  { icon: Target, name: 'PPC Advertising', desc: 'Google, Meta, LinkedIn, TikTok — every dollar optimized.' },
  { icon: Share2, name: 'Social Media Marketing', desc: 'Brand-building content that drives real engagement.' },
  { icon: Building2, name: 'B2B Marketing', desc: 'Targeted lead generation for B2B companies at scale.' },
  { icon: Cpu, name: 'SaaS Marketing', desc: 'Growth strategies that turn trials into loyal paying users.' },
  { icon: Globe, name: 'IT Services Marketing', desc: 'Authority-building for IT companies competing globally.' },
];

const painPoints = [
  'Burning budget on ads with zero measurable ROI',
  'Competitors outranking you on Google every single day',
  'Running campaigns but conversions are nowhere to be found',
  'Your agency reports look great but pipeline stays empty',
  'Marketing team lacks senior strategic direction',
  'No unified strategy across SEO, PPC, and content',
];

const differentiators = [
  { icon: Zap, title: 'No-Fluff Strategy', desc: 'Every recommendation is tied to revenue, not vanity metrics.' },
  { icon: PhoneCall, title: 'Direct Expert Access', desc: 'You work with me — not a junior account manager.' },
  { icon: TrendingUp, title: 'Results-First Mindset', desc: 'KPIs are set before campaigns launch, not after.' },
  { icon: Globe, title: 'Cross-Industry Expertise', desc: '12+ years across IT, SaaS, Healthcare, Real Estate, and more.' },
  { icon: BarChart3, title: 'Proven ROI Track Record', desc: '6X–7X ROAS consistently across $2M+ in managed spend.' },
  { icon: Users, title: 'Team of 25 Specialists', desc: 'Full execution capability — designers, writers, analysts.' },
];

const process = [
  {
    phase: '01',
    title: 'Deep-Dive Audit & Strategy',
    items: ['Full digital presence audit', 'Competitor gap analysis', 'Custom growth roadmap', 'KPI setting & goal alignment'],
  },
  {
    phase: '02',
    title: 'Precision Execution',
    items: ['Multi-channel campaign launch', 'Content & creative production', 'Technical SEO implementation', 'Paid media optimization'],
  },
  {
    phase: '03',
    title: 'Optimization & Scale',
    items: ['Data-driven refinement', 'A/B testing & CRO', 'Monthly reporting & insights', 'Scaling winning campaigns'],
  },
];

const engagements = [
  {
    type: 'Hourly Consulting',
    price: 'From $20/hr',
    desc: 'Maximum flexibility. Pay only for the expertise you need, when you need it.',
    features: ['Strategy calls & reviews', 'Campaign audits', 'Team coaching', 'No long-term commitment'],
    highlighted: false,
  },
  {
    type: 'Fixed Cost Project',
    price: 'Custom Quote',
    desc: 'Defined scope, defined deliverables. Perfect for specific campaigns or audits.',
    features: ['Clear deliverables & timeline', 'SEO audits & strategies', 'Campaign setup', 'One-time projects'],
    highlighted: true,
  },
  {
    type: 'Project-Based Retainer',
    price: 'Monthly Retainer',
    desc: 'Ongoing partnership with dedicated execution from my full team.',
    features: ['Full campaign management', 'Dedicated team resources', 'Priority access', 'Monthly reporting'],
    highlighted: false,
  },
];

const industries = [
  { icon: Cpu, name: 'IT Services' },
  { icon: BarChart3, name: 'SaaS' },
  { icon: Shield, name: 'Healthcare' },
  { icon: DollarSign, name: 'E-commerce' },
  { icon: Building2, name: 'Real Estate' },
  { icon: Star, name: 'Education' },
  { icon: TrendingUp, name: 'Finance & Fintech' },
  { icon: Users, name: 'B2B Companies' },
  { icon: Globe, name: 'US Local Businesses' },
  { icon: Zap, name: 'Startups' },
  { icon: Target, name: 'Agencies' },
];

const comparison = [
  { aspect: 'Cost', agency: 'High retainers + markups', me: 'Flexible from $20/hr' },
  { aspect: 'Turnaround Speed', agency: 'Slow — layers of approval', me: 'Fast & direct decisions' },
  { aspect: 'Expertise Level', agency: 'Junior teams, senior oversight', me: '12+ years hands-on' },
  { aspect: 'Direct Access', agency: 'Account manager buffer', me: 'You work with me directly' },
  { aspect: 'Flexibility', agency: 'Rigid contracts & packages', me: 'Hourly, fixed, or retainer' },
  { aspect: 'Industry Depth', agency: 'Generalist playbooks', me: 'Cross-industry specialist' },
  { aspect: 'ROI Focus', agency: 'Vanity metric reporting', me: 'Revenue-tied KPIs only' },
];

const pricing = [
  { service: 'SEO (Technical + Content)', from: '$20/hr', note: 'Audits, strategy, full execution' },
  { service: 'PPC Campaign Setup', from: '$20/hr', note: 'Google, Meta, LinkedIn, TikTok' },
  { service: 'Ad Creative Strategy', from: '$20/hr', note: 'Copy, creative direction, testing' },
  { service: 'Content Strategy', from: '$20/hr', note: 'Blog, thought leadership, distribution' },
  { service: 'Consultation', from: '$20/hr', note: 'Strategy calls, audits, team coaching' },
];

const faqs = [
  { q: 'What services do you offer?', a: 'I offer a comprehensive suite: SEO (technical, content, local), PPC across all major platforms, social media marketing, B2B lead generation, SaaS marketing, email automation, and more. Full list on the Services page.' },
  { q: 'How is working with you different from a full-service agency?', a: 'You get direct access to a 12-year expert — not a junior account manager. No markups, no fluff. Every decision I make is tied to your revenue goals.' },
  { q: 'What industries do you specialize in?', a: 'IT Services, SaaS, Healthcare, E-commerce, Real Estate, Finance, Education, B2B, US Local Businesses, and Startups. My cross-industry experience means I bring proven strategies from adjacent sectors to your campaigns.' },
  { q: 'What is your pricing model?', a: 'Flexible — hourly consulting starting at $20/hr, fixed-cost projects, or monthly retainers. We can structure it based on what works best for your business and budget.' },
  { q: 'How quickly can I expect results?', a: 'PPC campaigns can show results within days. SEO typically shows meaningful movement in 3–6 months. I set realistic timelines in the first strategy call so you always know what to expect.' },
  { q: 'Do you work with startups?', a: 'Absolutely. Many of my best campaigns have been for early-stage startups needing to move fast and prove ROI with limited budgets. I understand how to prioritize and scale intelligently.' },
  { q: 'Can you manage my existing team?', a: 'Yes — I work in two modes: as a consultant who guides your existing team, or as an execution partner where my team does the work. Many clients blend both approaches.' },
  { q: 'What platforms do you run ads on?', a: 'Google (Search, Display, YouTube), Meta (Facebook + Instagram), LinkedIn, TikTok, Amazon, Quora, and Reddit. I choose platforms based on where your audience actually converts.' },
  { q: 'Do you offer SEO and PPC together?', a: 'Yes, and I strongly recommend it. Integrated campaigns where paid data informs SEO strategy and vice versa consistently outperform siloed approaches.' },
  { q: 'How do I get started?', a: 'Book a free 30-minute strategy call via Calendly. We\'ll discuss your goals, current challenges, and I\'ll outline exactly how I can help.' },
  { q: 'Do you sign NDAs?', a: 'Yes, I sign NDAs before discussing any sensitive business details. Confidentiality is standard practice for me.' },
  { q: 'Can I hire you on an hourly basis?', a: 'Yes. Hourly consulting is available starting at $20/hr — perfect for audits, strategy reviews, or one-off consultations.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-medium">{q}</span>
        <ChevronDown
          className={`shrink-0 text-[#c9a84c] transition-transform ${open ? 'rotate-180' : ''}`}
          size={18}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080c14] via-[#0a0f1c] to-[#080c14]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[120px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 text-[#c9a84c] text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
           Hi, I am Pranjal — real strategies that drive revenue in 2026 , not vanity metrics.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6"
          >
            12+ Years of Digital
            <br />
            <span className="gold-gradient">Marketing Mastery.</span>
            <br />
            Real Results. Real Revenue.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I've generated 500K+ monthly organic traffic, managed $2M+ in ad spend, and achieved consistent 6X–7X ROAS for businesses across IT, SaaS, Healthcare, and more.
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
              className="gold-bg text-[#080c14] font-bold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Book a Meeting <ArrowRight size={18} />
            </a>
            <Link href="/services" className="border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-xl hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-[#040608] border-y border-[#c9a84c]/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <StatCard value={12} suffix="+" label="Years Experience" />
            <StatCard value={400} suffix="+" label="Clients Served" />
            <StatCard value={500} suffix="K+" label="Monthly Traffic" />
            <StatCard value={2} suffix="M+" label="Ad Spend Managed" />
            <StatCard value={7} suffix="X" label="Average ROAS" />
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <ScrollReveal>
        <section className="py-24 bg-[#080c14]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Watch & Learn</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">See How I Generate Results</h2>
            <p className="text-white/50 mb-10">Watch how I approach digital marketing strategy and execution for real business growth.</p>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f1c] aspect-video group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#c9a84c] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-[#c9a84c]/30">
                  <Play className="text-[#080c14] ml-1" size={32} fill="#080c14" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/60 to-transparent" />
              <iframe
                className="w-full h-full opacity-0 absolute inset-0"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Pranjal Digital - Strategy Video"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </ScrollReveal>
      <FunnelPyramid />

      {/* SERVICES OVERVIEW */}
      <section className="py-24 bg-[#040608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Expertise</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">What I Specialize In</h2>
            <p className="text-white/50 max-w-2xl mx-auto">End-to-end digital marketing execution across the channels that matter most for your business growth, combining data-driven strategies, creative execution, and continuous optimization to drive traffic, leads, conversions, and long-term revenue.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.1}>
                <div className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4 group-hover:bg-[#c9a84c]/20 transition-colors">
                    <s.icon className="text-[#c9a84c]" size={22} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <Link href="/services" className="text-[#c9a84c] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link href="/services" className="border border-[#c9a84c]/40 text-[#c9a84c] font-semibold px-8 py-3 rounded-xl hover:bg-[#c9a84c]/10 transition-colors inline-flex items-center gap-2">
              View All 14 Services <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Sound Familiar?</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Is Your Marketing Broken?</h2>
            <p className="text-white/50 max-w-2xl mx-auto">You're burning budget with no ROI. Your competitors are outranking you. Your ads are running but not converting. I fix exactly that.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {painPoints.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0a0f1c] border border-white/10">
                  <CheckCircle2 className="text-[#c9a84c] shrink-0 mt-0.5" size={18} />
                  <span className="text-white/70 text-sm">{p}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg text-[#080c14] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Let's Fix This Together <ArrowRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY CHOOSE ME */}
      <section className="py-24 bg-[#040608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Why Pranjal Digital</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">The Difference Is In The Details</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                    <d.icon className="text-[#c9a84c]" size={20} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{d.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="serif text-4xl font-bold text-white mb-4">Ready to Build Something Big Together?</h2>
            <p className="text-white/50 mb-8">Let's talk about your goals, your challenges, and how 12+ years of cross-industry expertise can accelerate your growth.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg text-[#080c14] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                Book a Strategy Call <ArrowRight size={18} />
              </a>
              <Link href="/services" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors">
                View All Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">My Proven 3-Phase Process</h2>
            <p className="text-white/50">Strategy → Execution → Optimization. Every campaign follows this battle-tested framework.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {process.map((p, i) => (
              <ScrollReveal key={p.phase} delay={i * 0.15}>
                <div className="relative p-7 rounded-2xl bg-[#0a0f1c] border border-white/10">
                  <div className="text-6xl font-black text-[#c9a84c]/15 absolute top-4 right-6 leading-none">{p.phase}</div>
                  <div className="relative z-10">
                    <div className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-2">Phase {p.phase}</div>
                    <h3 className="text-white font-bold text-xl mb-4">{p.title}</h3>
                    <ul className="space-y-2">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className="py-24 bg-[#040608]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Flexible Engagement</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Work With Me, Your Way</h2>
            <p className="text-white/50">Three models to match exactly where you are in your growth journey.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {engagements.map((e, i) => (
              <ScrollReveal key={e.type} delay={i * 0.12}>
                <div className={`p-7 rounded-2xl border h-full flex flex-col ${e.highlighted ? 'border-[#c9a84c] bg-[#c9a84c]/5 relative' : 'border-white/10 bg-[#0a0f1c]'}`}>
                  {e.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-2">{e.type}</div>
                  <div className="text-2xl font-bold text-white mb-3">{e.price}</div>
                  <p className="text-white/50 text-sm mb-5 flex-1">{e.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {e.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle2 className="text-[#c9a84c] shrink-0" size={15} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`text-center py-3 rounded-xl font-semibold text-sm transition-colors ${e.highlighted ? 'gold-bg text-[#080c14] hover:opacity-90' : 'border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10'}`}>
                    Get Started
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Cross-Industry Expertise</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Industries I've Dominated</h2>
            <p className="text-white/50">Deep domain knowledge across 11+ industries — your campaigns benefit from cross-sector insights.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.06}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                    <ind.icon className="text-[#c9a84c]" size={17} />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{ind.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-[#040608]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">The Truth</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Big Agency vs. Pranjal Digital</h2>
            <p className="text-white/50">Why pay agency rates for junior-level work?</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 bg-[#0a0f1c]">
                <div className="p-4 text-white/40 text-xs font-semibold uppercase">Factor</div>
                <div className="p-4 text-center text-white/40 text-xs font-semibold uppercase border-l border-white/10">Big Agency</div>
                <div className="p-4 text-center border-l border-[#c9a84c]/40 bg-[#c9a84c]/5">
                  <span className="text-[#c9a84c] text-xs font-semibold uppercase">Pranjal Digital</span>
                </div>
              </div>
              {comparison.map((row, i) => (
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
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Transparent, Flexible Pricing</h2>
            <p className="text-white/50 max-w-2xl mx-auto">No hidden fees, no bloated agency retainers. Expert-level marketing starting at just $20/hour.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {pricing.map((p, i) => (
              <ScrollReveal key={p.service} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-[#0a0f1c] border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white font-semibold mb-1">{p.service}</div>
                    <div className="text-white/40 text-sm">{p.note}</div>
                  </div>
                  <div className="text-[#c9a84c] font-bold text-lg whitespace-nowrap">{p.from}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center">
            <p className="text-white/40 text-sm mb-6">Pricing varies by scope and complexity. Get a custom quote for your project.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg text-[#080c14] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Get a Custom Quote <ArrowRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-[#040608] border-y border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">By The Numbers</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Results That Speak For Themselves</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { value: 500, suffix: 'K+', label: 'Monthly Traffic Generated' },
              { value: 2, suffix: 'M+', label: 'Ad Spend Managed (USD)' },
              { value: 7, suffix: 'X', label: 'Average ROAS Achieved' },
              { value: 100, suffix: 'K+', label: 'SEO Traffic Projects' },
              { value: 68, suffix: 'K+', label: 'SaaS Users Generated' },
              { value: 400, suffix: '+', label: 'Clients Served Globally' },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Common Questions</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <FAQItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 bg-gradient-to-b from-[#040608] to-[#080c14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#c9a84c]/8 blur-[100px] pointer-events-none" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="serif text-5xl font-bold text-white mb-5">
              Ready to 10X Your<br />
              <span className="gold-gradient">Digital Marketing ROI?</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">Let's have a real conversation about what's holding your business back — and build a plan to fix it.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg text-[#080c14] font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 text-lg">
                Book a Free Strategy Call <ArrowRight size={20} />
              </a>
              <Link href="/contact" className="border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors text-lg">
                Contact Me
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
