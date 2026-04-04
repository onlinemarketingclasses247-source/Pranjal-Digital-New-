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
    desc: "Convert leads into customers.",
    strategy: "Landing pages, offers & high-intent campaigns.",
  },
  {
    title: "Retention & Scale",
    desc: "Increase lifetime value and scale revenue.",
    strategy: "Email automation, upsells & scaling.",
  },
];

export default function FunnelPyramid() {
  const [active, setActive] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(0);

  // Sequential blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % stages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#040608] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center">

        {/* HEADING */}
        <h2 className="text-4xl font-bold text-white mb-6">
          Full-Funnel Growth Strategy
        </h2>

        {/* TEXT (CLEAN + GOLD CTA) */}
        <div className="text-white/70 max-w-2xl mx-auto mb-14 text-sm leading-relaxed space-y-2">
          <p>
            Most businesses go through multiple stages before a lead becomes a customer.
          </p>
          <p>
            Each stage of the funnel plays a critical role in driving conversions and revenue.
          </p>
          <p>
            <span className="text-[#c9a84c] font-semibold">
              Click on any stage below to interact and understand how the funnel works.
            </span>
          </p>
        </div>

        {/* PYRAMID */}
        <div className="relative flex flex-col items-center perspective-[1200px] space-y-2">

          {stages.map((stage, index) => (
            <React.Fragment key={index}>

              {/* LAYER */}
              <div
                onClick={() => setActive(index)}
                className={`cursor-pointer group relative transition-all duration-500 ${
                  highlightIndex === index ? "scale-105" : "opacity-80"
                }`}
                style={{
                  width: `${220 + index * 80}px`,
                }}
              >
                <div
                  className="relative text-center py-6 rounded-md border"
                  style={{
                    transform: "rotateX(12deg)",
                    borderColor:
                      highlightIndex === index
                        ? "#c9a84c"
                        : "rgba(201,168,76,0.4)",
                    background:
                      "linear-gradient(145deg, rgba(201,168,76,0.25), rgba(10,15,28,0.95))",
                    boxShadow:
                      highlightIndex === index
                        ? "0 0 25px rgba(201,168,76,0.6)"
                        : "0 10px 25px rgba(0,0,0,0.5)",
                  }}
                >

                  {/* TEXT */}
                  <div className="relative text-white font-semibold group-hover:text-[#c9a84c] transition">
                    {stage.title}
                  </div>

                  {/* SAND FLOW LINE */}
                  <div
                    className={`absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-[#c9a84c] to-transparent transition ${
                      highlightIndex === index ? "opacity-60" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              {/* ARROW BETWEEN STAGES */}
              {index < stages.length - 1 && (
                <div className="text-[#c9a84c] text-xl animate-bounce">
                  ↓
                </div>
              )}
            </React.Fragment>
          ))}

          {/* BASE GLOW */}
          <div className="mt-4 w-[300px] h-[20px] bg-[#c9a84c]/30 blur-xl rounded-full animate-pulse" />
        </div>

        {/* MODAL */}
        {active !== null && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-[#0a0f1c] border border-[#c9a84c]/40 rounded-xl p-6 max-w-md w-full relative">

              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-white/50 hover:text-white"
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

              {active < stages.length - 1 && (
                <button
                  onClick={() => setActive(active + 1)}
                  className="bg-[#c9a84c] text-[#040608] px-4 py-2 rounded-lg w-full font-semibold"
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
