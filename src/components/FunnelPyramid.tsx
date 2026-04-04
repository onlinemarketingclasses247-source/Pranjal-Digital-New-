import React, { useState } from "react";

const stages = [
  {
    title: "TOFU - Awareness",
    desc: "Attract new users into your ecosystem.",
    strategy: "SEO, YouTube, paid ads & content marketing.",
  },
  {
    title: "MOFU - Consideration",
    desc: "Turn visitors into leads.",
    strategy: "Funnels, retargeting & lead capture systems.",
  },
  {
    title: "BOFU - Conversion",
    desc: "Convert leads into customers.",
    strategy: "Landing pages, offers & high-intent campaigns.",
  },
  {
    title: "Retention & Scale",
    desc: "Maximize lifetime value.",
    strategy: "Email automation, upsells & scaling.",
  },
];

export default function FunnelPyramid() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-28 bg-[#040608]">
      <div className="max-w-5xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-white mb-4">
          Full-Funnel Growth Strategy
        </h2>

        <p className="text-white/50 mb-10 animate-pulse">
          Tap on any stage to explore
        </p>

        {/* PYRAMID */}
        <div className="relative mx-auto w-full max-w-md">

          {/* Base Pyramid Shape */}
          <div
            className="w-full h-[420px] border border-[#c9a84c]/40 bg-gradient-to-b from-[#1a1405] via-[#0a0f1c] to-[#040608] shadow-[0_0_40px_rgba(201,168,76,0.15)]"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* INTERACTIVE LAYERS */}
          {stages.map((stage, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className="absolute left-0 w-full cursor-pointer group"
              style={{
                top: `${index * 95}px`,
                height: "95px",
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#c9a84c]/10 blur-xl" />

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-white text-sm font-semibold transition-all duration-300 group-hover:text-[#c9a84c] group-hover:scale-105">
                {stage.title}
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {active !== null && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl p-6 max-w-md w-full text-left relative shadow-[0_0_30px_rgba(201,168,76,0.2)]">

              {/* CLOSE */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-white/50 hover:text-white text-lg"
              >
                ✕
              </button>

              {/* TITLE */}
              <h3 className="text-[#c9a84c] font-semibold mb-3">
                {stages[active].title}
              </h3>

              {/* DESC */}
              <p className="text-white/70 text-sm mb-3">
                {stages[active].desc}
              </p>

              {/* STRATEGY */}
              <p className="text-white text-sm mb-6">
                {stages[active].strategy}
              </p>

              {/* NEXT BUTTON */}
              {active < stages.length - 1 && (
                <button
                  onClick={() => setActive(active + 1)}
                  className="bg-[#c9a84c] text-[#040608] px-4 py-2 rounded-lg text-sm font-semibold w-full hover:opacity-90 transition"
                >
                  Next Stage →
                </button>
              )}

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
