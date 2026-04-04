import React, { useState } from "react";

const services = [
  { name: "SEO", baseHours: 20 },
  { name: "Google Ads", baseHours: 25 },
  { name: "Meta Ads", baseHours: 20 },
  { name: "Content Marketing", baseHours: 15 },
  { name: "Email Marketing", baseHours: 10 },
  { name: "Analytics & Tracking", baseHours: 8 },
];

const HOURLY_RATE = 20;

export default function CostCalculator() {
  const [selected, setSelected] = useState([]);
  const [months, setMonths] = useState(3);
  const [multiplier, setMultiplier] = useState(1);

  const toggleService = (service) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const totalHours = selected.reduce((acc, service) => {
    const s = services.find((x) => x.name === service);
    return acc + s.baseHours * multiplier;
  }, 0);

  const monthlyCost = totalHours * HOURLY_RATE;
  const totalCost = monthlyCost * months;

  return (
    <section className="py-28 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl text-white font-bold text-center mb-4">
          Digital Marketing Cost Calculator
        </h2>

        <p className="text-center text-white/60 mb-10">
          Estimate your marketing investment based on services, effort, and growth goals.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="bg-[#0a0f1c] border border-white/10 rounded-xl p-6">

            <h3 className="text-white font-semibold mb-4">
              Select Services
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {services.map((s) => (
                <button
                  key={s.name}
                  onClick={() => toggleService(s.name)}
                  className={`p-3 text-sm rounded-lg border transition ${
                    selected.includes(s.name)
                      ? "bg-[#c9a84c] text-black"
                      : "border-white/20 text-white/70 hover:border-[#c9a84c]"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* MONTHS */}
            <div className="mb-6">
              <label className="text-white/60 text-sm">
                Duration (Months)
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full mt-2"
              />
              <p className="text-white mt-1">{months} Months</p>
            </div>

            {/* COMPLEXITY */}
            <div>
              <label className="text-white/60 text-sm">
                Project Intensity
              </label>

              <select
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full mt-2 bg-[#040608] border border-white/20 text-white p-2 rounded"
              >
                <option value={1}>Basic</option>
                <option value={1.5}>Growth</option>
                <option value={2}>Aggressive</option>
              </select>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#0a0f1c] border border-[#c9a84c]/20 rounded-xl p-6">

            <h3 className="text-[#c9a84c] font-semibold mb-4">
              Estimated Cost
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between text-white">
                <span>Monthly Hours</span>
                <span>{totalHours} hrs</span>
              </div>

              <div className="flex justify-between text-white">
                <span>Hourly Rate</span>
                <span>${HOURLY_RATE}</span>
              </div>

              <div className="flex justify-between text-white">
                <span>Monthly Cost</span>
                <span className="text-[#c9a84c] font-bold">
                  ${monthlyCost.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-white">
                <span>Total Cost</span>
                <span className="text-[#c9a84c] font-bold text-lg">
                  ${totalCost.toLocaleString()}
                </span>
              </div>

              {/* CTA */}
              <button className="mt-6 w-full bg-[#c9a84c] text-black py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Get Custom Strategy →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
