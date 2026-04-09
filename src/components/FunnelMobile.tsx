import React, { useState, useEffect } from "react";

const CALENDLY = "https://calendly.com/pranjaldigital-info/30min";

const stages = [
  {
    title: "TOFU — Awareness",
    desc: "Cold audience enters",
    detail: "SEO, YouTube, Ads",
  },
  {
    title: "MOFU — Consideration",
    desc: "Visitors become leads",
    detail: "Funnels, Retargeting",
  },
  {
    title: "BOFU — Conversion",
    desc: "Leads convert",
    detail: "Landing pages, Offers",
  },
  {
    title: "Retention & Scale",
    desc: "Maximize revenue",
    detail: "Email, Upsells",
  },
];

export default function FunnelMobile() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setActive((p) => (p + 1) % stages.length);
    }, 1400);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="md:hidden py-14 bg-[#040608] px-4 overflow-hidden">

      {/* HEADING */}
      <h2 className="text-xl font-bold text-white text-center mb-3">
        How I Build Funnels That Convert
      </h2>

      <p className="text-white/60 text-xs text-center mb-8">
        Traffic → Leads → Customers → Scale
      </p>

      {/* FLOW CONTAINER */}
      <div className="relative flex flex-col items-center">

        {/* Vertical base line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/10" />

        {stages.map((s, i) => (
          <div key={i} className="relative w-full flex justify-center mb-6">

            {/* Animated glowing node */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-500 ${
                active === i
                  ? "bg-[#c9a84c] shadow-[0_0_18px_#c9a84c]"
                  : "bg-white/20"
              }`}
            />

            {/* Card */}
            <div
              className={`w-full max-w-[320px] rounded-xl p-4 border transition-all duration-500 ${
                active === i
                  ? "border-[#c9a84c] bg-[#0a0f1c] shadow-[0_0_25px_rgba(201,168,76,0.4)] scale-[1.02]"
                  : "border-white/10"
              }`}
            >
              <div className="flex justify-between items-center">

                <div>
                  <div className="text-white font-semibold text-sm">
                    {s.title}
                  </div>

                  <div className="text-white/50 text-xs mt-1">
                    {s.desc}
                  </div>

                  <div className="text-[#c9a84c] text-[11px] mt-1">
                    {s.detail}
                  </div>
                </div>

                <div className="text-[#c9a84c] text-sm">
                  →
                </div>
              </div>

              {/* Glow bar animation */}
              {active === i && (
                <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent animate-pulse" />
              )}
            </div>

          </div>
        ))}

        {/* Base glow */}
        <div className="w-[180px] h-[18px] bg-[#c9a84c]/30 blur-xl rounded-full animate-pulse mt-2" />
      </div>

      {/* EXPLANATION BLOCK (REMOVES EMPTY FEEL) */}
      <div className="mt-10 text-center px-2">
        <p className="text-white/60 text-xs leading-relaxed">
          I don’t run random ads. I build structured funnels where each stage
          has a clear role — from attracting traffic to converting and scaling revenue.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[#c9a84c] text-[#040608] font-bold px-6 py-3 rounded-xl w-full max-w-[280px] shadow-md hover:opacity-90 transition"
        >
          Book Free Strategy Call
        </a>
      </div>

    </section>
  );
}
