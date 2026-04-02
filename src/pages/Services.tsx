import React from 'react';
import { ArrowRight, Search, Target, Share2, Building2, Cpu, Mail, Globe, Zap, BarChart2, Users, MessageSquare, PenTool, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Link } from 'wouter';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

const services = [
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
    icon: Globe,
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
];

export default function Services() {
  return (
    <div className="bg-[#080c14] pt-24">
      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040608] to-[#080c14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#c9a84c]/6 blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Full Service</p>
          <h1 className="serif text-5xl font-bold text-white mb-5">End-to-End Digital Marketing Services</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            14 specialized services, all executed with a single goal: growing your revenue through data-driven digital marketing.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 0.05}>
              <div className="p-7 rounded-2xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/20 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                    <s.icon className="text-[#c9a84c]" size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl">{s.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-1.5">What It Is</div>
                  <p className="text-white/60 text-sm leading-relaxed">{s.what}</p>
                </div>

                <div className="mb-4 flex-1">
                  <div className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-1.5">How I Execute</div>
                  <ul className="space-y-1.5">
                    {s.how.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-white/60 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-1.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-1">Business Impact</div>
                  <p className="text-white/80 text-sm">{s.impact}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-[#040608] to-[#080c14]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="serif text-4xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-white/50 mb-8">Book a free strategy call — I'll diagnose exactly where your biggest growth opportunity is and which service will move the needle fastest.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg text-[#080c14] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                Book a Free Strategy Call <ArrowRight size={18} />
              </a>
              <Link href="/contact" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors">
                Contact Me
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
