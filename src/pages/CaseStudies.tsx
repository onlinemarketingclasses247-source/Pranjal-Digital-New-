import React, { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, BarChart3 } from "lucide-react";

const caseStudies = [
  {
    title: "Scaled SaaS from $3K to $28K MRR",
    industry: "B2B SaaS | USA",
    problem: "High acquisition cost, poor funnel, inconsistent growth due to lack of structured system and unclear customer journey.",
    strategy: "Built full-funnel system using Google Ads, landing pages, and retargeting to capture and convert demand.",
    execution: "Restructured campaigns, implemented tracking, optimized landing pages, and iterated weekly using performance data.",
    results: "MRR scaled from $3K to $28K in 6 months with 46% lower CPL and 2.3x conversion growth."
  },
  {
    title: "4.2X ROAS for E-commerce Brand",
    industry: "E-commerce | Australia",
    problem: "High ad spend but low returns due to weak creatives and poor audience targeting.",
    strategy: "Rebuilt Meta Ads structure with creative testing and retargeting funnel.",
    execution: "Weekly creative testing, audience segmentation, and budget reallocation.",
    results: "ROAS improved from 1.7 to 4.2 with 3.1x revenue growth."
  },
  {
    title: "120+ Leads for IT Services",
    industry: "IT Services | USA",
    problem: "No consistent lead pipeline and dependency on referrals.",
    strategy: "Built LinkedIn + Google Ads funnel targeting decision-makers.",
    execution: "Optimized campaigns, landing pages, and lead qualification system.",
    results: "Generated 120+ qualified leads in 60 days."
  },
  {
    title: "Local Business Growth 5 → 60 Leads",
    industry: "Local Services | Canada",
    problem: "No digital presence and reliance on offline leads.",
    strategy: "Local SEO + Google Ads with call tracking.",
    execution: "Optimized listings, landing pages, and campaigns.",
    results: "Leads increased from 5 to 60/month with consistent pipeline."
  },
  {
    title: "EdTech ₹2L → ₹18L Growth",
    industry: "Education",
    problem: "Low conversions and high funnel drop-offs.",
    strategy: "Designed webinar funnel with automation.",
    execution: "Landing page optimization and retargeting campaigns.",
    results: "Revenue scaled to ₹18L/month."
  },
  {
    title: "Real Estate CPL Reduced 52%",
    industry: "Real Estate",
    problem: "High cost per lead and poor targeting.",
    strategy: "Audience segmentation and funnel optimization.",
    execution: "Improved creatives and targeting.",
    results: "CPL reduced by 52%."
  },
  {
    title: "Healthcare Bookings +300%",
    industry: "Healthcare",
    problem: "Low visibility and booking conversions.",
    strategy: "SEO + paid ads integration.",
    execution: "Optimized booking system and campaigns.",
    results: "Bookings increased by 300%."
  },
  {
    title: "B2B Lead Pipeline System",
    industry: "B2B Consulting",
    problem: "No inbound system for lead generation.",
    strategy: "LinkedIn + Google Ads funnel.",
    execution: "Campaign launch and automation.",
    results: "80+ leads/month generated."
  },
  {
    title: "Startup 5,000+ Users Launch",
    industry: "Startup",
    problem: "No acquisition strategy during launch.",
    strategy: "Full funnel paid acquisition strategy.",
    execution: "Ads + landing page optimization.",
    results: "5,000+ users acquired in 30 days."
  },
  {
    title: "Global Campaign Optimization",
    industry: "Global Brand",
    problem: "Inefficient multi-country campaigns.",
    strategy: "Geo-segmented campaign structure.",
    execution: "Country-level optimization.",
    results: "ROI improved 2.8x."
  }
];

export default function CaseStudies() {
  const [page, setPage] = useState(0);
  const perPage = 3;

  const start = page * perPage;
  const selected = caseStudies.slice(start, start + perPage);

  return (
    <div className="bg-[#080c14] pt-24 pb-20 text-white">

      {/* 🔥 TOP DISCLAIMER + CTA */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-[#0a0f1c] border border-[#c9a84c]/20 rounded-2xl p-8 text-center">

          <p className="text-white/70 text-sm mb-4">
            We work with selected clients and maintain strict confidentiality.
            Detailed case studies, full performance data, and client references
            can be shared upon request.
          </p>

          <p className="text-white/50 text-sm mb-6">
            Contact us to request full case studies, sample work, and insights.
          </p>

          <a
            href="/contact"
            className="gold-bg text-[#080c14] font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2"
          >
            Request Detailed Case Study <ArrowRight size={18} />
          </a>

        </div>
      </section>

      {/* HERO */}
      <section className="text-center mb-10 px-4">
        <h1 className="serif text-5xl font-bold mb-4">Case Studies</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Real strategies. Real execution. Real measurable results.
        </p>
      </section>

      {/* CASE STUDIES */}
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {selected.map((cs, i) => (
          <ScrollReveal key={i}>
            <div className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-8">

              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-[#c9a84c]" />
                <h2 className="text-2xl font-bold">{cs.title}</h2>
              </div>

              <p className="text-[#c9a84c] text-sm mb-4">{cs.industry}</p>

              <div className="space-y-3 text-sm text-white/70">
                <p><b>Problem:</b> {cs.problem}</p>
                <p><b>Strategy:</b> {cs.strategy}</p>
                <p><b>Execution:</b> {cs.execution}</p>
                <p className="text-white font-medium"><b>Results:</b> {cs.results}</p>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-12">
        {Array.from({ length: Math.ceil(caseStudies.length / perPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-4 py-2 rounded ${
              page === i
                ? "bg-[#c9a84c] text-black"
                : "border border-white/20 text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <a
          href="/contact"
          className="gold-bg text-[#080c14] font-bold px-10 py-4 rounded-xl inline-flex items-center gap-2"
        >
          Discuss Your Business Growth <ArrowRight size={18} />
        </a>
      </div>

    </div>
  );
}
