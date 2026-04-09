import React, { useState } from "react";

const stages = [
  {
    title: "TOFU",
    desc: "Awareness",
  },
  {
    title: "MOFU",
    desc: "Leads",
  },
  {
    title: "BOFU",
    desc: "Conversion",
  },
  {
    title: "Retention",
    desc: "Scale",
  },
];

export default function FunnelMobile() {
  const [active, setActive] = useState(0);

  return (
    <section className="md:hidden py-16 bg-[#040608] px-4">

      <h2 className="text-2xl text-white font-bold text-center mb-6">
        Growth Funnel
      </h2>

      <div className="space-y-4">

        {stages.map((s, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={`p-4 rounded-xl border transition ${
              active === i
                ? "border-[#c9a84c] bg-[#0a0f1c]"
                : "border-white/10"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">{s.title}</span>
              <span className="text-[#c9a84c]">→</span>
            </div>

            <div className="text-white/60 text-sm">{s.desc}</div>

            {active === i && (
              <div className="mt-3 text-xs text-white/50">
                Detailed strategy for this stage.
              </div>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}
