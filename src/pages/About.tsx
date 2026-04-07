import React, { useRef, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Globe, DollarSign, BarChart3, Cpu } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from 'wouter';

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

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
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
    <div ref={ref} className="text-center p-6 rounded-2xl bg-[#0a0f1c] border border-white/10">
      <div className="text-4xl font-bold gold-gradient mb-1">{count}{suffix}</div>
      <div className="text-white/50 text-sm">{label}</div>
    </div>
  );
}

const timeline = [
  { year: '2012', event: 'Started Digital Marketing', desc: 'Began with IT services marketing, building foundational SEO and PPC skills.' },
  { year: '2015', event: 'Expanded to SEO & PPC', desc: 'Mastered Google Ads and technical SEO; first major client campaigns launched.' },
  { year: '2018', event: 'Built First 25-Member Team', desc: 'Scaled from solo consultant to leading a specialized digital marketing team.' },
  { year: '2020', event: 'Crossed $1M+ in Managed Ad Spend', desc: 'Achieved consistent 6X+ ROAS for clients across multiple industries.' },
  { year: '2022', event: 'SaaS Marketing Specialization', desc: 'Expanded into SaaS growth — generating 68K+ users for product-led companies.' },
  { year: '2023', event: '500K+ Monthly Traffic Milestone', desc: 'Generated half a million monthly organic visitors for clients across verticals.' },
  { year: '2025', event: 'Elevance Health Appointment', desc: 'Appointed as Digital Marketing Consultant at Elevance Health — one of America\'s largest health insurers.' },
];

const workModels = [
  {
    type: 'As Your Consultant',
    desc: 'I guide your existing team with senior-level strategy and direction — without replacing anyone.',
    features: [
      'Marketing strategy & roadmap development',
      'Team coaching and upskilling',
      'Campaign audits and optimization reviews',
      'Weekly strategy calls and reporting reviews',
      'Quarterly growth planning sessions',
    ],
  },
  {
    type: 'As Your Execution Partner',
    desc: 'My 25-member team executes everything end-to-end — you focus on your business, we handle growth.',
    features: [
      'Full campaign management across all channels',
      'Dedicated content, design, and analytics team',
      'Monthly performance reports with insights',
      'Direct Slack/communication access',
      'Transparent budget management and reporting',
    ],
  },
];

export default function About() {
  useEffect(() => {
  document.title = "About Digital Marketing Consultant | Pranjal Digital";

  setMeta(
    "Learn about a digital marketing consultant with 12+ years of experience across global markets, delivering full-funnel strategies and performance-driven growth."
  );
}, []);
  return (
    <div className="bg-[#080c14] pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040608] to-[#080c14]" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[400px] rounded-full bg-[#c9a84c]/5 blur-[100px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-4">About Pranjal</p>
            <h1 className="serif text-5xl font-bold text-white mb-5 leading-tight">
              The Expert Behind<br />
              <span className="gold-gradient">The Results</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
             12+ years of hands-on digital marketing across India, US, Canada, Australia, Europe, and the Middle East. With experience from execution to Head of Marketing roles, I’ve built and scaled multi-funnel growth systems across industries with deep, hands-on expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
            <div className="aspect-square rounded-3xl border border-[#c9a84c]/20 overflow-hidden relative">

  {/* Background Image */}
  <img
    src="/images/about.png"
    alt="Pranjal Conference"
    className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 text-center p-8">
    <div className="serif text-8xl font-black gold-gradient mb-4">12+</div>
    <div className="text-white/60 text-lg">
      Years of mastery across<br />US, Canada & India markets
    </div>
  </div>

</div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-[#c9a84c]">25+</div>
                <div className="text-white/50 text-xs text-center">Team Members</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <h2 className="serif text-3xl font-bold text-white mb-5">Built on honesty, integrity, and strong technical expertise across marketing</h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                I started in 2012 as an IT services marketing specialist — learning the craft in one of the most competitive B2B niches in the world. While others stayed in their lane, I deliberately expanded into SaaS, Healthcare, E-commerce, Real Estate, Finance, and US Local Businesses.
              </p>
              <p>
                That cross-industry exposure is my unfair advantage. Strategies that work in SaaS often translate brilliantly to healthcare tech. Conversion frameworks from US local businesses apply directly to B2B lead gen. I bring these cross-pollinated insights to every engagement.
              </p>
              <p>
                Today I lead a 25-member specialist team covering SEO, PPC, content, design, and analytics — while maintaining the direct client relationships that junior-account-manager agencies can't offer.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['IT Services', 'SaaS', 'Healthcare', 'E-commerce', 'Real Estate', 'Finance', 'B2B'].map((tag) => (
                <span key={tag} className="text-xs border border-[#c9a84c]/30 text-[#c9a84c]/80 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Current Role Highlight */}
      <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-6 rounded-2xl border border-[#c9a84c]/30 bg-[#c9a84c]/5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
              <Globe className="text-[#c9a84c]" size={24} />
            </div>
            <div>
              <div className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-1">Why Pranjal Digital was Created? </div>
              <h3 className="text-white font-bold text-lg">I work with the philosophy that if you grow, I grow.</h3>
              <p className="text-white/50 text-sm">Pranjal Digital was created with a clear mission and vision to deliver honest, transparent digital marketing services, where client interests always come first. Every strategy, recommendation, and execution is driven by long-term growth, trust, and results — never short-term profit.</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#040608]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Career Journey</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">12 Years. One Direction.</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a84c]/60 via-[#c9a84c]/30 to-transparent hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.1}>
                  <div className="flex gap-6 sm:gap-10 items-start">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-[#c9a84c]/10 border-2 border-[#c9a84c] flex items-center justify-center z-10">
                        <div className="w-3 h-3 rounded-full bg-[#c9a84c]" />
                      </div>
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#c9a84c] font-bold text-sm">{item.year}</span>
                        <span className="text-white font-semibold">{item.event}</span>
                      </div>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Proof Points</p>
            <h2 className="serif text-4xl font-bold text-white">Results That Define My Career</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { value: 500, suffix: 'K+', label: 'Monthly Traffic Generated' },
              { value: 2, suffix: 'M+', label: 'Ad Spend Managed (USD)' },
              { value: 7, suffix: 'X', label: 'Average ROAS' },
              { value: 100, suffix: 'K+', label: 'SEO Traffic Projects' },
              { value: 68, suffix: 'K+', label: 'SaaS Users Generated' },
              { value: 400, suffix: '+', label: 'Clients Globally' },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Model */}
      <section className="py-24 bg-[#040608]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Engagement</p>
            <h2 className="serif text-4xl font-bold text-white mb-4">Two Ways to Work Together</h2>
            <p className="text-white/50">Whether you need strategic guidance or full execution, I have a model that fits.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workModels.map((m, i) => (
              <ScrollReveal key={m.type} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/20 transition-colors h-full">
                  <h3 className="serif text-2xl font-bold text-white mb-3">{m.type}</h3>
                  <p className="text-white/50 mb-6 text-sm leading-relaxed">{m.desc}</p>
                  <ul className="space-y-3">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
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
    </div>
  );
}
