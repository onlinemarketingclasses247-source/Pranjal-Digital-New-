import React, { useState, useEffect } from "react";

const rates = {
  USD: 20,
  GBP: 15,
  EUR: 17,
  INR: 800,
};

const services = [
  "SEO",
  "Google Ads",
  "Meta Ads",
  "SaaS Marketing",
  "B2B Marketing",
  "Content Marketing",
  "Email Marketing",
  "CRO",
  "Landing Pages",
  "Analytics",
  "Strategy",
  "Funnels",
  "YouTube Marketing",
  "Performance Marketing",
];

export default function CostCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [selected, setSelected] = useState([]);
  const [hours, setHours] = useState(20);
  const [months, setMonths] = useState(3);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [displayCost, setDisplayCost] = useState(0);
  const [cursorCount, setCursorCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const toggleService = (s) => {
    setSelected((prev) =>
      prev.includes(s)
        ? prev.filter((x) => x !== s)
        : [...prev, s]
    );
  };

  // BIG CURSOR ANIMATION
  useEffect(() => {
    if (cursorCount >= 3) return;

    const timer = setTimeout(() => {
      setShowCursor(true);
      setTimeout(() => {
        setShowCursor(false);
        setCursorCount((c) => c + 1);
      }, 1200);
    }, 1500);

    return () => clearTimeout(timer);
  }, [cursorCount]);

  // CALCULATION
  const calculate = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const hourlyRate = rates[currency];
      const totalHours = hours * selected.length;
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

  // ODOMETER
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

  return (
    <section className="py-20 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl text-white font-bold text-center mb-4">
          Digital Marketing Cost Calculator
        </h2>

        {/* Currency */}
        <div className="flex justify-center gap-3 mb-6">
          {Object.keys(rates).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-1 rounded ${
                currency === c
                  ? "bg-[#c9a84c] text-black"
                  : "text-white/60 border border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT PANEL */}
          <div className="bg-[#0a0f1c] p-5 rounded border border-white/10">

            {/* SERVICES */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {services.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleService(s)}
                  className={`p-2 text-xs rounded border transition ${
                    selected.includes(s)
                      ? "bg-[#c9a84c] text-black scale-105"
                      : "border-white/20 text-white/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* HOURS SLIDER */}
            <div className="mb-4">
              <label className="text-white/60 text-sm">
                Hours per Service ({hours} hrs)
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-[#c9a84c]"
              />
            </div>

            {/* MONTH SLIDER */}
            <div className="mb-4">
              <label className="text-white/60 text-sm">
                Duration ({months} months)
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[#c9a84c]"
              />
            </div>

            {/* BUTTON */}
            <div className="relative mt-5">
              <button
                onClick={calculate}
                className="w-full bg-[#c9a84c] text-black py-3 rounded font-semibold"
              >
                Calculate Cost
              </button>

              {/* BIG CURSOR */}
              {showCursor && cursorCount < 3 && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce text-5xl">
                  👇
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-[#0a0f1c] p-5 rounded border border-[#c9a84c]/20 flex items-center justify-center relative overflow-hidden">

            {loading ? (
              <div className="relative w-40 h-40 flex items-center justify-center">

                {/* SPINNING RING */}
                <div className="absolute w-full h-full border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>

                {/* ROTATING TEXT */}
                <div className="absolute animate-spin text-xs text-white/60">
                  SEO • ADS • CRO • FUNNELS • CONTENT • EMAIL •
                </div>

              </div>
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
                  Includes strategy, execution, optimization & reporting across selected channels.
                </p>
              </div>
            ) : (
              <p className="text-white/40">
                Select services & calculate
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
