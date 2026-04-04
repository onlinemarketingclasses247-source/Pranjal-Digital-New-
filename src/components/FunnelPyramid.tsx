import React, { useState, useEffect } from "react";

const stages = [
  {
    title: "TOFU - Awareness",
    desc: "Attract new users into your ecosystem.",
    strategy: "SEO, YouTube, paid ads & content marketing.",
  },
  {
    title: "MOFU - Consideration",
    desc: "Turn visitors into qualified leads.",
    strategy: "Funnels, retargeting & lead capture systems.",
  },
  {
    title: "BOFU - Conversion",
    desc: "Convert leads into paying customers.",
    strategy: "Landing pages, offers & high-intent campaigns.",
  },
  {
    title: "Retention & Scale",
    desc: "Increase lifetime value and scale revenue.",
    strategy: "Email automation, upsells & performance scaling.",
  },
];

export default function FunnelPyramid() {
  const [active, setActive] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <section className="py-32 bg-[#040608] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center">

        {/* INTRO TEXT */}
        <h2 className="text-4xl font-bold text-white mb-4">
          Full-Funnel Growth Strategy
        </h2>

        <p className="text-white/60 max-w-2xl mx-auto mb-2">
          Most businesses focus only on ads or traffic. Real growth happens when every stage of the funnel works together.
        </p>

        <p className="text-white/40 max-w-xl mx-auto mb-12">
          This pyramid shows exactly how I build predictable revenue systems — from awareness to scale.
        </p>

        {/* PYRAMID */}
        <div className="relative mx-auto w-full max-w-md">

          {/* MAIN PYRAMID */}
          <div
            className={`relative w-full h-[480px] border border-[#c9a84c] shadow-[0_0_60px_rgba(201,168,76,0.25)] transition-all duration-1000 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              background:
                "linear-gradient(to bottom, rgba(201,168,76,0.25), rgba(10,15,28,0.95))",
            }}
          >

            {/* SAND FLOW EFFECT */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-[#c9a84c] to-transparent opacity-30 animate-pulse" />

            {/* DIVIDERS */}
            {[120, 240, 360].map((pos, i) => (
              <div
                key={i}
                className="absolute left-0 w-full h-[1px] bg-[#c9a84c]/40"
                style={{ top: `${pos}px` }}
              />
            ))}

            {/* LAYERS */}
            {stages.map((stage, index) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className="absolute left-0 w-full cursor-pointer group flex items-center justify-center"
                style={{
                  top: `${index * 120}px`,
                  height: "120px",
                }}
              >

                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#c9a84c]/10 blur-xl" />

                {/* TEXT */}
                <div className="relative text-white font-semibold text-sm md:text-base text-center px-4 group-hover:text-[#c9a84c] transition group-hover:scale-105">
                  {stage.title}
                </div>
              </div>
            ))}
          </div>

          {/* BASE SHADOW (3D EFFECT) */}
          <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[85%] h-[12px] bg-[#c9a84c]/30 blur-lg rounded-full" />
        </div>

        {/* MODAL */}
        {active !== null && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl p-6 max-w-md w-full text-left relative shadow-[0_0_40px_rgba(201,168,76,0.2)]">

              {/* CLOSE */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-white/50 hover:text-white text-lg"
              >
                ✕
              </button>

              <h3 className="text-[#c9a84c] font-semibold mb-3">
                {stages[active].title}
              </h3>

              <p className="text-white/70 text-sm mb-3">
                {stages[active].desc}
              </p>

              <p className="text-white text-sm mb-6">
                {stages[active].strategy}
              </p>

              {/* NEXT */}
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
