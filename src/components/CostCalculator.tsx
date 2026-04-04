import React, { useState, useEffect } from "react";

const currencyConfig = {
  USD: { rate: 20, symbol: "$" },
  GBP: { rate: 15, symbol: "£" },
  EUR: { rate: 17, symbol: "€" },
  INR: { rate: 800, symbol: "₹" },
};

const services = [
  "SEO","Google Ads","Meta Ads","Content","Email",
  "CRO","Landing Pages","Analytics","Strategy",
  "Funnels","YouTube","Performance"
];

// 🔥 REAL DELIVERABLES (CORE FIX)
const deliverablesMap = {
  SEO: ["Keyword Research","On-page SEO","Technical Audit","Backlink Strategy"],
  "Google Ads": ["Campaign Setup","Conversion Tracking","Bid Optimization"],
  "Meta Ads": ["Creative Strategy","Audience Targeting","Ad Testing"],
  Content: ["Content Calendar","SEO Blogs","Conversion Copy"],
  Email: ["Email Automation","Drip Funnels","Campaign Strategy"],
  CRO: ["A/B Testing","UX Improvements","Heatmap Analysis"],
  "Landing Pages": ["Landing Page Design","Copywriting","Conversion Setup"],
  Analytics: ["GA4 Setup","Tracking Setup","Reporting Dashboard"],
  Strategy: ["Marketing Plan","Growth Roadmap","Channel Strategy"],
  Funnels: ["Sales Funnel Design","Lead Flow Setup"],
  YouTube: ["Video Strategy","SEO Optimization"],
  Performance: ["Full Funnel Optimization","Scaling Strategy"]
};

export default function CostCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [hours, setHours] = useState(5);
  const [months, setMonths] = useState(1);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const toggleService = (s) => {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const calculate = () => {
    if (selected.length === 0) {
      setError("⚠ Please select at least one service");
      setResult(null);
      return;
    }

    setError("");
    setClicked(true);

    const { rate, symbol } = currencyConfig[currency];
    const total = hours * months * rate;
    const discounted = total * 0.9;

    let deliverables = [];
    selected.forEach(s => {
      deliverables = [...deliverables, ...(deliverablesMap[s] || [])];
    });

    setResult({
      total,
      discounted,
      symbol,
      deliverables: [...new Set(deliverables)]
    });
  };

  // CURSOR POINTER
  useEffect(() => {
    if (clicked) return;

    const el = document.getElementById("calc-btn");
    if (!el) return;

    let count = 0;

    const interval = setInterval(() => {
      if (count >= 3) {
        clearInterval(interval);
        return;
      }

      el.style.transform = "scale(1.1)";
      setTimeout(() => {
        el.style.transform = "scale(1)";
      }, 600);

      count++;
    }, 1200);

    return () => clearInterval(interval);
  }, [clicked]);

  return (
    <section className="py-20 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl text-white text-center font-bold mb-6">
          Digital Marketing Cost Calculator
        </h2>

        {/* Currency */}
        <div className="flex justify-center gap-3 mb-6">
          {Object.keys(currencyConfig).map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-1 rounded ${
                currency === c
                  ? "bg-[#c9a84c] text-black"
                  : "border border-white/20 text-white/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="bg-[#0a0f1c] p-5 rounded border border-white/10">

            <div className="grid grid-cols-2 gap-2 mb-4">
              {services.map(s => (
                <button
                  key={s}
                  onClick={() => toggleService(s)}
                  className={`p-2 text-xs rounded border ${
                    selected.includes(s)
                      ? "bg-[#c9a84c] text-black"
                      : "border-white/20 text-white/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* HOURS */}
            <p className="text-white/60 text-sm">
              Hours per month: {hours}
            </p>
            <input
              type="range"
              min="5"
              max="5000"
              value={hours}
              onChange={(e) => setHours(+e.target.value)}
              className="w-full accent-[#c9a84c]"
            />

            {/* MONTH */}
            <p className="text-white/60 text-sm mt-3">
              Duration: {months} months
            </p>
            <input
              type="range"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(+e.target.value)}
              className="w-full accent-[#c9a84c]"
            />

            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}

            <button
              id="calc-btn"
              onClick={calculate}
              className="w-full mt-5 bg-[#c9a84c] text-black py-3 rounded font-semibold"
            >
              Calculate Cost
            </button>
          </div>

          {/* RIGHT */}
          <div className="bg-[#0a0f1c] p-6 rounded border border-[#c9a84c]/20">

            {!result ? (
              <div className="space-y-4 text-white/60 text-sm">
                <p className="text-white font-semibold">
                  What you’ll get:
                </p>
                <ul className="space-y-2">
                  <li>✔ Full-funnel marketing strategy</li>
                  <li>✔ Execution across selected channels</li>
                  <li>✔ Weekly reporting & optimization</li>
                  <li>✔ Growth-focused approach</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4">

                <p className="text-white/40 line-through">
                  {result.symbol}{Math.floor(result.total)}
                </p>

                <p className="text-[#c9a84c] text-3xl font-bold">
                  {result.symbol}{Math.floor(result.discounted)}
                </p>

                <p className="text-green-400 text-sm">
                  10% Discount Applied
                </p>

                <div className="text-white/70 text-sm mt-4">
                  <p className="font-semibold mb-2">Included Services:</p>
                  {result.deliverables.map((d, i) => (
                    <p key={i}>✔ {d}</p>
                  ))}
                </div>

                <p className="text-white/40 text-xs mt-4">
                  This is not just execution — it’s a complete revenue system.
                </p>

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
