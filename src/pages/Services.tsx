import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Search, PenTool, Globe, Target, Share2, Building2,
  Zap, Star, Users, Cpu, Mail, BarChart2, MessageSquare,
  ArrowRight, Plus, X
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

/* =========================
   VERY DETAILED SERVICES
========================= */
const services = [
  {
    icon: Search,
    name: 'Technical SEO',
    what: 'Deep technical optimisation ensuring your website is fully crawlable, indexable, and aligned with Google’s ranking systems.',
    how: [
      'Full technical audit: crawl errors, indexation, Core Web Vitals',
      'Schema markup & structured data for rich results',
      'Page speed optimisation (mobile-first)',
      'Internal linking + crawl budget optimisation',
      'Fixing duplicate content, canonical, redirects',
    ],
    impact: 'Strong SEO foundation → higher rankings, better UX, compounding organic traffic.',
  },
  {
    icon: PenTool,
    name: 'Content SEO & Strategy',
    what: 'Building topical authority with content that ranks AND converts.',
    how: [
      'Keyword clustering + topical authority mapping',
      'Blog + landing page + pillar content creation',
      'E-E-A-T optimisation (trust + authority)',
      'Content distribution strategy',
      'Competitor gap analysis',
    ],
    impact: 'Long-term traffic engine reducing dependency on ads.',
  },
  {
    icon: Target,
    name: 'Google Ads',
    what: 'Capturing high-intent users exactly when they are ready to buy.',
    how: [
      'Keyword intent mapping',
      'Search, Display, YouTube & PMax campaigns',
      'Conversion tracking setup',
      'Ad copy + landing page alignment',
      'Continuous A/B testing',
    ],
    impact: 'Immediate revenue + predictable scaling.',
  },
  {
    icon: Share2,
    name: 'Meta Ads',
    what: 'Full-funnel paid social campaigns.',
    how: [
      'Audience research + lookalikes',
      'Creative testing frameworks',
      'Retargeting funnels',
      'Conversion API setup',
      'Scaling systems',
    ],
    impact: 'Scalable growth across B2C & D2C.',
  },
  {
    icon: Star,
    name: 'Social Media Marketing',
    what: 'Organic brand building.',
    how: [
      'Content calendar',
      'Platform strategy (LinkedIn, Instagram, X)',
      'Community building',
      'Influencer collaborations',
    ],
    impact: 'Brand authority + inbound leads.',
  },
  {
    icon: Mail,
    name: 'Email Marketing',
    what: 'Highest ROI owned channel.',
    how: [
      'Automation flows',
      'Segmentation',
      'Drip campaigns',
      'A/B testing',
    ],
    impact: 'Retention + repeat revenue.',
  },
  {
    icon: Building2,
    name: 'LinkedIn Ads',
    what: 'B2B lead generation.',
    how: [
      'ABM targeting',
      'Lead gen forms',
      'Executive branding ads',
    ],
    impact: 'High-quality enterprise leads.',
  },
  {
    icon: Zap,
    name: 'TikTok & Amazon Ads',
    what: 'Emerging growth platforms.',
    how: [
      'UGC creatives',
      'Amazon sponsored ads',
      'Platform-specific optimisation',
    ],
    impact: 'New audience acquisition.',
  },
  {
    icon: Users,
    name: 'B2B Lead Generation',
    what: 'Pipeline generation system.',
    how: [
      'ICP definition',
      'Outbound + inbound',
      'ABM campaigns',
    ],
    impact: 'Predictable pipeline.',
  },
  {
    icon: Cpu,
    name: 'SaaS & IT Marketing',
    what: 'Specialised growth systems.',
    how: [
      'Product-led growth',
      'Review platform optimisation',
      'Technical content',
    ],
    impact: 'MRR growth.',
  },
];

/* =========================
   10 FAQs
========================= */
const faqs = [
  { q: 'Do I need all services?', a: 'No. We start with 2–3 high-impact channels.' },
  { q: 'How fast results?', a: 'Ads: 2–4 weeks. SEO: 3–6 months.' },
  { q: 'Do you handle everything?', a: 'Yes, end-to-end execution.' },
  { q: 'Do you work globally?', a: 'Yes — US, India, Europe.' },
  { q: 'Industries?', a: 'SaaS, IT, ecommerce, B2B.' },
  { q: 'Reporting?', a: 'Real-time dashboards + monthly reports.' },
  { q: 'Minimum duration?', a: '3–6 months recommended.' },
  { q: 'Difference from agency?', a: 'Direct expert + no fluff.' },
  { q: 'SEO + Ads together?', a: 'Best combination for growth.' },
  { q: 'Onboarding process?', a: 'Audit → Strategy → Launch in 3–4 weeks.' },
];

/* =========================
   COMPONENT
========================= */
export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#080c14] pt-24">

      {/* HERO */}
      <section className="py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040608] to-[#080c14]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-5">
            End-to-End Digital Marketing Services
          </h1>
          <p className="text-white/50">
            Strategy + Execution + Growth — aligned to revenue.
          </p>
        </div>
      </section>

      {/* SERVICES GRID (CLAUDE UI) */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="p-7 rounded-2xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/20 transition-colors h-full flex flex-col">

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center">
                    <s.icon className="text-[#c9a84c]" size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl">{s.name}</h3>
                </div>

                <p className="text-white/60 text-sm mb-4">{s.what}</p>

                <ul className="text-white/60 text-sm space-y-2 mb-4">
                  {s.how.map((h, idx) => (
                    <li key={idx}>• {h}</li>
                  ))}
                </ul>

                <div className="text-[#c9a84c] text-sm font-semibold">
                  {s.impact}
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <a
          href={CALENDLY}
          target="_blank"
          className="bg-[#c9a84c] text-black px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2"
        >
          Book Strategy Call <ArrowRight size={18} />
        </a>

        <div className="mt-6">
          <Link href="/contact">
            <a className="text-white/60 hover:text-[#c9a84c]">
              Or send a message →
            </a>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl text-white mb-10 text-center">
          Frequently Asked Questions
        </h2>

        {faqs.map((f, i) => (
          <div key={i} className="mb-4 border border-white/10 rounded-xl">
            <button
              className="w-full flex justify-between items-center p-5 text-white"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              {f.q}
              {openFaq === i ? <X /> : <Plus />}
            </button>

            {openFaq === i && (
              <div className="p-5 text-white/60 border-t border-white/10">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </section>

    </div>
  );
}
