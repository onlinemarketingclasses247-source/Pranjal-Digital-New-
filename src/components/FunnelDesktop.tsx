import React, { useState, useEffect } from "react";

const stages = [
  {
    title: "TOFU - Awareness",
    desc: "Attract new users",
    strategy: "SEO, YouTube, Ads",
  },
  {
    title: "MOFU - Consideration",
    desc: "Turn visitors into leads",
    strategy: "Funnels, retargeting",
  },
  {
    title: "BOFU - Conversion",
    desc: "Convert leads",
    strategy: "Landing pages, offers",
  },
  {
    title: "Retention & Scale",
    desc: "Increase LTV",
    strategy: "Email, upsells",
  },
];

export default function FunnelDesktop() {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setHighlight((p) => (p + 1) % stages.length);
    }, 1200);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="hidden md:block py-32 bg-[#040608] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold text-white mb-6">
          Full-Funnel Growth Engine
        </h2>

        <p className="text-white/60 max-w-2xl mx-auto mb-16">
          Every business scales through a structured funnel. We build each stage
          to maximize conversions and revenue.
        </p>

        <div className="flex flex-col items-center space-y-4">

          {stages.map((s, i) => (
            <React.Fragment key={i}>
              
              <div
                className={`relative transition-all duration-500 ${
                  highlight === i ? "scale-105" : "opacity-70"
                }`}
                style={{ width: `${300 + i * 120}px` }}
              >
                <div
                  className="p-6 rounded-xl border text-center"
                  style={{
                    borderColor:
                      highlight === i
                        ? "#c9a84c"
                        : "rgba(201,168,76,0.3)",
                    background:
                      "linear-gradient(145deg, rgba(201,168,76,0.2), #0a0f1c)",
                    boxShadow:
                      highlight === i
                        ? "0 0 30px rgba(201,168,76,0.6)"
                        : "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="text-[#c9a84c] font-semibold mb-2">
                    {s.title}
                  </div>

                  <div className="text-white/70 text-sm">{s.desc}</div>

                  <div className="text-white/50 text-xs mt-2">
                    {s.strategy}
                  </div>

                  {/* glow line */}
                  {highlight === i && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 w-[2px] h-10 bg-gradient-to-b from-[#c9a84c] to-transparent" />
                  )}
                </div>
              </div>

              {i < stages.length - 1 && (
                <div className="text-[#c9a84c] animate-bounce">↓</div>
              )}
            </React.Fragment>
          ))}

          <div className="w-[400px] h-[30px] bg-[#c9a84c]/30 blur-xl rounded-full animate-pulse mt-4" />
        </div>
      </div>
    </section>
  );
}
