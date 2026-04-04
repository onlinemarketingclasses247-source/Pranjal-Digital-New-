import React, { useState } from "react";

const funnelData = [
  {
    title: "TOFU - Awareness",
    desc: "Attract new users through content, SEO & ads.",
    strategy: "I build visibility using SEO, YouTube, and paid awareness campaigns.",
  },
  {
    title: "MOFU - Consideration",
    desc: "Turn visitors into leads.",
    strategy: "I design funnels, retargeting & lead capture systems.",
  },
  {
    title: "BOFU - Conversion",
    desc: "Convert leads into customers.",
    strategy: "I optimize landing pages, offers & high-intent campaigns.",
  },
  {
    title: "Retention & Scale",
    desc: "Maximize LTV & scale revenue.",
    strategy: "I implement email automation, upsells & scaling strategies.",
  },
];

export default function FunnelPyramid() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-28 bg-[#040608]">
      <div className="max-w-5xl mx-auto px-4 text-center">

        <h2 className="text-4xl font-bold text-white mb-4">
          Full-Funnel Growth Strategy
        </h2>

        <p className="text-white/50 mb-12">
          Click on any stage to see how I grow your business.
        </p>

        {/* Pyramid */}
        <div className="flex flex-col items-center gap-4">

          {funnelData.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(active === index ? null : index)}
              className="relative w-full max-w-lg cursor-pointer group"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                height: `${160 - index * 30}px`,
              }}
            >

              {/* FRONT */}
              <div
                className={`absolute inset-0 flex items-center justify-center border border-[#c9a84c]/30 bg-[#c9a84c]/10 text-white font-semibold transition-all duration-500 ${
                  active === index ? "opacity-0 rotate-y-180" : "opacity-100"
                }`}
              >
                {item.title}
              </div>

              {/* BACK */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 border border-[#c9a84c] bg-[#0a0f1c] text-white transition-all duration-500 ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-sm text-white/60 mb-2">{item.desc}</p>
                <p className="text-[#c9a84c] text-sm font-medium">
                  {item.strategy}
                </p>
              </div>

              {/* Glow animation */}
              <div className="absolute inset-0 bg-[#c9a84c]/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
