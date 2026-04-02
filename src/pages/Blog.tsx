import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

const posts = [
  {
    id: 1,
    title: 'How I Generated 500K Monthly Organic Traffic Without a Single Paid Backlink',
    category: 'SEO',
    date: 'March 18, 2026',
    readTime: '8 min read',
    excerpt: 'A detailed breakdown of the exact technical SEO and content strategy that took a client from 12K to 500K+ monthly visitors in under 18 months — no PBNs, no shortcuts.',
  },
  {
    id: 2,
    title: '6X ROAS on Google Ads: The Campaign Structure Nobody Talks About',
    category: 'PPC',
    date: 'March 5, 2026',
    readTime: '6 min read',
    excerpt: 'Most Google Ads accounts are structured to make agencies money, not your business. Here\'s the campaign architecture I use to consistently achieve 6X+ return on ad spend.',
  },
  {
    id: 3,
    title: 'SaaS Marketing in 2026: Why Product-Led Growth Needs Paid Support',
    category: 'SaaS Marketing',
    date: 'February 20, 2026',
    readTime: '7 min read',
    excerpt: 'Product-led growth alone won\'t scale your SaaS anymore. Here\'s how I combine PLG with targeted paid campaigns to accelerate MRR growth and reduce churn simultaneously.',
  },
  {
    id: 4,
    title: 'B2B Lead Generation: Why LinkedIn ABM Outperforms Cold Outreach in 2026',
    category: 'B2B Marketing',
    date: 'February 8, 2026',
    readTime: '5 min read',
    excerpt: 'I analyzed 50+ B2B campaigns. Account-based marketing on LinkedIn generates 3X more qualified pipeline than cold email — and I\'ll show you exactly why and how.',
  },
  {
    id: 5,
    title: 'What Is AEO and Why Your SEO Strategy Is Already Obsolete',
    category: 'SEO',
    date: 'January 25, 2026',
    readTime: '9 min read',
    excerpt: 'Answer Engine Optimization is the next frontier of search. As AI answers replace blue links, brands that don\'t adapt now will disappear from search results by 2027.',
  },
  {
    id: 6,
    title: 'IT Services Marketing: How to Win US Clients Against Massive Competition',
    category: 'IT Services',
    date: 'January 12, 2026',
    readTime: '6 min read',
    excerpt: 'Winning US clients for IT services companies requires more than a good website and a Clutch profile. Here\'s the complete playbook I\'ve used to generate leads for IT firms since 2012.',
  },
];

const categories = ['All', 'SEO', 'PPC', 'SaaS Marketing', 'B2B Marketing', 'IT Services'];

const categoryColors: Record<string, string> = {
  SEO: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  PPC: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'SaaS Marketing': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'B2B Marketing': 'bg-green-500/10 text-green-400 border-green-500/20',
  'IT Services': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

export default function Blog() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="bg-[#080c14] pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040608] to-[#080c14]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Insights</p>
          <h1 className="serif text-5xl font-bold text-white mb-5">Digital Marketing Insights</h1>
          <p className="text-white/50 text-lg">
            No-fluff articles on SEO, PPC, SaaS growth, and B2B marketing — backed by 12+ years of hands-on experience.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === cat
                  ? 'bg-[#c9a84c] text-[#080c14] border-[#c9a84c]'
                  : 'border-white/20 text-white/60 hover:border-[#c9a84c]/40 hover:text-[#c9a84c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <article className="group p-6 rounded-2xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/20 transition-colors flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[post.category] || 'bg-white/5 text-white/50 border-white/10'}`}>
                    {post.category}
                  </span>
                </div>
                <h2 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#c9a84c] transition-colors flex-1">
                  {post.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-4 text-white/30 text-xs">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="text-[#c9a84c] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">No posts in this category yet.</div>
        )}
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#040608]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="serif text-3xl font-bold text-white mb-4">Want Personalized Insights for Your Business?</h2>
            <p className="text-white/50 mb-8">Skip the generic advice. Book a strategy call and get a custom roadmap tailored to your specific goals, market, and budget.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg text-[#080c14] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Book a Free Strategy Call <ArrowRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
