import React, { useState, useEffect } from "react";

const HOURLY_RATE = 20;

const services = [
  { name: "SEO", hours: 25 },
  { name: "Google Ads", hours: 30 },
  { name: "Meta Ads", hours: 25 },
  { name: "SaaS Marketing", hours: 35 },
  { name: "B2B Marketing", hours: 30 },
  { name: "Content Marketing", hours: 20 },
  { name: "Email Marketing", hours: 15 },
  { name: "Conversion Rate Optimization", hours: 20 },
  { name: "Landing Page Optimization", hours: 15 },
  { name: "Analytics & Tracking", hours: 10 },
  { name: "Marketing Strategy", hours: 12 },
  { name: "Funnel Building", hours: 25 },
];

export default function CostCalculator() {
  const [selected, setSelected] = useState([]);
  const [months, setMonths] = useState(3);
  const [multiplier, setMultiplier] = useState(1);
  const [displayCost, setDisplayCost] = useState(0);

  const toggleService = (service) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const totalHours = selected.reduce((acc, s) => {
    const service = services.find((x) => x.name === s);
    return acc + service.hours * multiplier;
  }, 0);

  const monthlyCost = totalHours * HOURLY_RATE;
  const totalCost = monthlyCost * months;

  // ODOMETER EFFECT
  useEffect(() => {
    let start = displayCost;
    let end = totalCost;
    let duration = 500;
    let startTime = null;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);

      const value = Math.floor(start + (end - start) * percentage);
      setDisplayCost(value);

      if (percentage < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [totalCost]);

  // MAGNETIC SLIDER SNAP
  const handleSlider = (val) => {
    const snapPoints = [1, 3, 6, 12];
    let closest = snapPoints.reduce((a, b) =>
      Math.abs(b - val) < Math.abs(a - val) ? b : a
    );
    setMonths(closest);
  };

  return (
    <section className="py-28 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl text-white font-bold text-center mb-4">
          Digital Marketing Cost Calculator
        </h2>

        <p className="text-center text-white/60 mb-12">
          Build your marketing plan and estimate real investment required to grow.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="bg-[#0a0f1c] border border-white/10 rounded-xl p-6">

            <h3 className="text-white font-semibold mb-4">
              Select Services
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {services.map((s) => (
                <button
                  key={s.name}
                  onClick={() => toggleService(s.name)}
                  className={`p-3 text-sm rounded-lg border transition transform ${
                    selected.includes(s.name)
                      ? "bg-[#c9a84c] text-black scale-105 shadow-lg"
                      : "border-white/20 text-white/70 hover:border-[#c9a84c] hover:scale-105"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* SLIDER */}
            <div className="mb-6">
              <label className="text-white/60 text-sm">
                Duration (Months)
              </label>

              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => handleSlider(Number(e.target.value))}
                className="w-full mt-2 accent-[#c9a84c]"
              />

              <p className="text-white mt-1 font-semibold">
                {months} Months
              </p>
            </div>

            {/* INTENSITY */}
            <div>
              <label className="text-white/60 text-sm">
                Growth Intensity
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

          {/* RIGHT */}
          <div className="bg-[#0a0f1c] border border-[#c9a84c]/20 rounded-xl p-6 relative overflow-hidden">

            {/* BACKGROUND GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 to-transparent blur-xl opacity-30" />

            <h3 className="text-[#c9a84c] font-semibold mb-4 relative">
              Estimated Cost
            </h3>

            <div className="space-y-4 relative">

              <div className="flex justify-between text-white">
                <span>Monthly Hours</span>
                <span>{totalHours} hrs</span>
              </div>

              <div className="flex justify-between text-white">
                <span>Hourly Rate</span>
                <span>$20</span>
              </div>

              {/* ODOMETER NUMBER */}
              <div className="flex justify-between text-white">
                <span>Total Investment</span>
                <span className="text-[#c9a84c] text-2xl font-bold transition-all duration-300">
                  ${displayCost.toLocaleString()}
                </span>
              </div>

              <button className="mt-6 w-full bg-[#c9a84c] text-black py-3 rounded-lg font-semibold hover:scale-105 transition">
                Get Custom Strategy →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
