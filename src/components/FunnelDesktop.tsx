import React, { useState, useEffect } from "react";

const stages = [
  {
    title: "TOFU — Awareness",
    desc: "Cold audience enters your ecosystem",
    strategy: "SEO, YouTube, Meta Ads, Google Ads",
    metric: "CTR, CPM, Traffic Quality",
  },
  {
    title: "MOFU — Consideration",
    desc: "Visitors turn into qualified leads",
    strategy: "Funnels, Lead Magnets, Retargeting",
    metric: "CPL, Engagement, Lead Quality",
  },
  {
    title: "BOFU — Conversion",
    desc: "Leads become paying customers",
    strategy: "Landing Pages, Offers, Sales Psychology",
    metric: "Conversion Rate, CAC",
  },
  {
    title: "Retention & Scale",
    desc: "Maximize lifetime value",
    strategy: "Email, Upsells, Automation, Scaling Ads",
    metric: "LTV, ROAS, Repeat Revenue",
  },
];

export default function FunnelDesktop() {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setHighlight((p) => (p + 1) % stages.length);
    }, 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="hidden md:block py-32 bg-[#040608] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* HEADING */}
        <h2 className="text-5xl font-bold text-white mb-6">
          Let Me Show You How I Build Marketing Funnels
        </h2>

        {/* EXPLANATION */}
        <div className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed mb-16 space-y-4">
          <p>
            Most businesses fail not because of bad ads — but because they don’t understand the full funnel.
          </p>
          <p>
            I don’t run random campaigns. I design structured systems where every stage has a role, a metric, and a clear outcome.
          </p>
          <p className="text-[#c9a84c] font-medium">
            Traffic → Leads → Customers → Lifetime Value
          </p>
        </div>

        {/* FUNNEL VISUAL */}
        <div className="flex flex-col items-center space-y-4 mb-20">

          {stages.map((s, i) => (
            <React.Fragment key={i}>
              
              <div
                className={`relative transition-all duration-500 ${
                  highlight === i ? "scale-105" : "opacity-70"
                }`}
                style={{ width: `${320 + i * 140}px` }}
              >
                <div
                  className="p-6 rounded-xl border text-center relative"
                  style={{
                    borderColor:
                      highlight === i
                        ? "#c9a84c"
                        : "rgba(201,168,76,0.3)",
                    background:
                      "linear-gradient(145deg, rgba(201,168,76,0.2), #0a0f1c)",
                    boxShadow:
                      highlight === i
                        ? "0 0 40px rgba(201,168,76,0.6)"
                        : "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="text-[#c9a84c] font-semibold mb-2">
                    {s.title}
                  </div>

                  <div className="text-white/80 text-sm mb-2">
                    {s.desc}
                  </div>

                  <div className="text-white/60 text-xs mb-2">
                    {s.strategy}
                  </div>

                  <div className="text-white/40 text-xs">
                    KPI: {s.metric}
                  </div>

                  {highlight === i && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 w-[2px] h-12 bg-gradient-to-b from-[#c9a84c] to-transparent" />
                  )}
                </div>
              </div>

              {i < stages.length - 1 && (
                <div className="text-[#c9a84c] animate-bounce">↓</div>
              )}
            </React.Fragment>
          ))}

          <div className="w-[420px] h-[30px] bg-[#c9a84c]/30 blur-xl rounded-full animate-pulse mt-4" />
        </div>

        {/* DEEP EXPLANATION GRID */}
        <div className="grid grid-cols-3 gap-8 text-left mb-20">

          <div>
            <h4 className="text-[#c9a84c] font-semibold mb-2">Traffic Layer</h4>
            <p className="text-white/60 text-sm">
              We don’t just drive traffic — we filter intent using creatives,
              targeting, and messaging to bring the right audience.
            </p>
          </div>

          <div>
            <h4 className="text-[#c9a84c] font-semibold mb-2">Conversion Layer</h4>
            <p className="text-white/60 text-sm">
              Every click is directed into a system designed to convert —
              landing pages, offers, and behavioral triggers.
            </p>
          </div>

          <div>
            <h4 className="text-[#c9a84c] font-semibold mb-2">Revenue Layer</h4>
            <p className="text-white/60 text-sm">
              Real profit comes after conversion — retention, upsells,
              and scaling systems are where growth compounds.
            </p>
          </div>

        </div>

        {/* BOTTOM CTA SECTION (NO EMPTY SPACE) */}
        <div className="bg-gradient-to-r from-[#0a0f1c] to-[#080c14] border border-[#c9a84c]/20 rounded-xl p-8">

          <h3 className="text-white text-2xl font-semibold mb-3">
            This is how I build predictable growth systems
          </h3>

          <p className="text-white/60 mb-6">
            Not hacks. Not random ads. A complete funnel engineered for scale.
          </p>

          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#c9a84c] text-[#040608] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            Book Free Strategy Call
          </a>
        </div>

      </div>
    </section>
  );
}
