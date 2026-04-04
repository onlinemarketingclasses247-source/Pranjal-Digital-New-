import React, { useState } from "react";

const funnelData = [
  {
    title: "TOFU - Awareness",
    color: "bg-[#c9a84c]/20",
    border: "border-[#c9a84c]",
    content: [
      "SEO for long-term traffic",
      "YouTube & Shorts strategy",
      "Social media content",
      "Display & awareness ads",
    ],
  },
  {
    title: "MOFU - Consideration",
    color: "bg-[#c9a84c]/15",
    border: "border-[#c9a84c]/70",
    content: [
      "Retargeting campaigns",
      "Lead magnets & funnels",
      "Email capture & nurturing",
      "Case studies & authority content",
    ],
  },
  {
    title: "BOFU - Conversion",
    color: "bg-[#c9a84c]/10",
    border: "border-[#c9a84c]/50",
    content: [
      "High-converting landing pages",
      "Google Search (intent traffic)",
      "Offer positioning",
      "Sales funnels optimization",
    ],
  },
  {
    title: "Retention & Scale",
    color: "bg-[#c9a84c]/5",
    border: "border-[#c9a84c]/30",
    content: [
      "Email automation",
      "Upsell / cross-sell",
      "LTV optimization",
      "Performance scaling",
    ],
  },
];

export default function FunnelPyramid() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-[#040608]">
      <div className="max-w-5xl mx-auto px-4 text-center">

        <h2 className="text-4xl font-bold text-white mb-4">
          Full-Funnel Growth Strategy
        </h2>
        <p className="text-white/50 mb-12">
          I don’t just run ads — I build complete revenue systems across every stage of your funnel.
        </p>

        {/* Pyramid */}
        <div className="flex flex-col items-center gap-3">

          {funnelData.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              className={`cursor-pointer transition-all duration-300 w-full max-w-md text-center border ${item.border} ${item.color} ${
                active === index ? "scale-105" : "opacity-70"
              }`}
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                height: `${120 - index * 20}px`,
              }}
            >
              <div className="flex items-center justify-center h-full text-white font-semibold text-sm px-4">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="mt-10 bg-[#0a0f1c] border border-white/10 rounded-xl p-6 text-left max-w-2xl mx-auto">
          <h3 className="text-[#c9a84c] font-semibold mb-3">
            {funnelData[active].title}
          </h3>

          <ul className="space-y-2 text-white/70 text-sm">
            {funnelData[active].content.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
