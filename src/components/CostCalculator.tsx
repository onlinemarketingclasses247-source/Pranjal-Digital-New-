import React, { useState, useEffect } from "react";

const rates = {
  USD: 20,
  GBP: 15,
  EUR: 17,
  INR: 800,
};

const servicesList = [
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Content Marketing",
  "Email Marketing",
  "CRO",
  "Landing Pages",
  "Analytics",
  "Strategy",
  "Funnels",
];

export default function CostCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [months, setMonths] = useState(3);
  const [services, setServices] = useState({});
  const [complexity, setComplexity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [displayCost, setDisplayCost] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Initialize services
  useEffect(() => {
    const init = {};
    servicesList.forEach((s) => (init[s] = 0));
    setServices(init);
  }, []);

  // Cursor animation (points to button)
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 3) {
        setShowCursor(true);
        setTimeout(() => setShowCursor(false), 1200);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Odometer animation
  const animateNumber = (final) => {
    let start = 0;
    let duration = 800;
    let startTime = null;

    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      setDisplayCost(Math.floor(progress * final));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const calculate = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const totalHours =
        Object.values(services).reduce((a, b) => a + b, 0) *
        complexity;

      const hourlyRate = rates[currency];

      const total = totalHours * hourlyRate * months;
      const discounted = total * 0.9;

      setResult({
        total,
        discounted,
        hours: totalHours,
      });

      animateNumber(discounted);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-20 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl text-white font-bold text-center mb-4">
          Digital Marketing Cost Calculator
        </h2>

        {/* Currency Selector */}
        <div className="flex justify-center gap-3 mb-6">
          {Object.keys(rates).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-1 rounded border ${
                currency === c
                  ? "bg-[#c9a84c] text-black"
                  : "text-white/60 border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT PANEL */}
          <div className="bg-[#0a0f1c] p-5 rounded border border-white/10">

            {/* Services + Hours */}
            {servicesList.map((s) => (
              <div key={s} className="flex justify-between items-center mb-2">
                <span className="text-white text-sm">{s}</span>

                <input
                  type="number"
                  min="0"
                  placeholder="hrs"
                  className="w-20 bg-black border border-white/20 text-white text-sm px-2 py-1 rounded"
                  onChange={(e) =>
                    setServices({
                      ...services,
                      [s]: Number(e.target.value),
                    })
                  }
                />
              </div>
            ))}

            {/* Complexity */}
            <div className="mt-4">
              <label className="text-white/60 text-sm">
                Complexity
              </label>

              <select
                onChange={(e) => setComplexity(Number(e.target.value))}
                className="w-full mt-1 bg-black border border-white/20 text-white p-2 rounded"
              >
                <option value={1}>Basic</option>
                <option value={1.5}>Medium</option>
                <option value={2}>Advanced</option>
              </select>
            </div>

            {/* Month Slider */}
            <div className="mt-4">
              <label className="text-white/60 text-sm">
                Duration ({months} months)
              </label>

              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full mt-2 accent-[#c9a84c]"
              />
            </div>

            {/* Calculate Button */}
            <div className="relative mt-5">
              <button
                onClick={calculate}
                className="w-full bg-[#c9a84c] text-black py-3 rounded font-semibold hover:scale-105 transition"
              >
                Calculate Cost
              </button>

              {showCursor && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce text-white text-lg">
                  ↓
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-[#0a0f1c] p-5 rounded border border-[#c9a84c]/20 flex items-center justify-center">

            {loading ? (
              <div className="animate-spin h-16 w-16 border-4 border-[#c9a84c] border-t-transparent rounded-full"></div>
            ) : result ? (
              <div className="text-center space-y-3">

                <p className="text-white/50 text-sm">
                  Total Hours: {result.hours}
                </p>

                <p className="text-white/40 line-through">
                  {currency} {Math.floor(result.total).toLocaleString()}
                </p>

                <p className="text-[#c9a84c] text-3xl font-bold">
                  {currency} {displayCost.toLocaleString()}
                </p>

                <p className="text-green-400 text-sm">
                  10% Discount Applied
                </p>

                <p className="text-white/60 text-xs mt-2">
                  Includes strategy, execution, optimization & reporting.
                </p>
              </div>
            ) : (
              <p className="text-white/40 text-center">
                Enter details & calculate
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
