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

const deliverablesMap = {
  SEO: ["Keyword Research","On-page SEO","Technical SEO","Backlinks"],
  Content: ["Content Plan","SEO Blogs","Copywriting"],
  Email: ["Automation","Flows","Campaigns"],
  "Google Ads": ["Campaign Setup","Conversion Tracking","Optimization"],
  "Meta Ads": ["Ad Creatives","Audience Targeting","Scaling"],
  CRO: ["A/B Testing","UX Fixes","Conversion Optimization"],
  "Landing Pages": ["Design","Copy","Conversion Setup"],
  Analytics: ["GA4 Setup","Tracking","Dashboard"],
  Strategy: ["Marketing Plan","Growth Strategy"],
  Funnels: ["Sales Funnels","Lead Journey"],
  YouTube: ["SEO","Video Strategy"],
  Performance: ["Scaling","Optimization"]
};

export default function Calculator() {

  const [currency, setCurrency] = useState("USD");
  const [hours, setHours] = useState(5);
  const [months, setMonths] = useState(1);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [currencyChanged, setCurrencyChanged] = useState(false);
  const [clicked, setClicked] = useState(false);

  

  const toggleService = (s) => {
    setSelected(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const calculate = () => {
    if (selected.length === 0) {
      setError("⚠ Please select at least one service");
      return;
    }
// 🚨 NEW CONDITION
  if (hours > 150) {
    setResult({
      enterprise: true
    });
    setError("");
    setClicked(true);
    return;
  }

  setError("");
  setClicked(true);
  setCurrencyChanged(false);

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
    setError("");
    setClicked(true);
    setCurrencyChanged(false);

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

  // 🔥 Currency change logic
  const handleCurrencyChange = (c) => {
    setCurrency(c);

    if (result) {
      setResult(null);
      setCurrencyChanged(true);
    }
  };

  // 🔥 Cursor pointer animation
  useEffect(() => {
    if (clicked) return;

    const btn = document.getElementById("calc-btn");
    if (!btn) return;

    let count = 0;

    const interval = setInterval(() => {
      if (count >= 3) return clearInterval(interval);

      btn.style.transform = "translateY(-5px)";
      setTimeout(() => {
        btn.style.transform = "translateY(0)";
      }, 400);

      count++;
    }, 1000);

    return () => clearInterval(interval);
  }, [clicked]);

  return (
    <section className="py-20 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl text-white text-center mb-6 font-bold">
          Digital Marketing Cost Calculator
        </h2>

        {/* Currency */}
        <div className="flex justify-center gap-3 mb-6">
          {Object.keys(currencyConfig).map(c => (
            <button
              key={c}
              onClick={() => handleCurrencyChange(c)}
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
                  className={`p-2 text-xs rounded ${
                    selected.includes(s)
                      ? "bg-[#c9a84c] text-black"
                      : "border border-white/20 text-white/70"
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
  max="200"
  step="5"
  value={hours}
  onChange={(e) => setHours(Number(e.target.value))}
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

            {currencyChanged && (
              <p className="text-yellow-400 text-sm mt-2">
                Currency changed → Please recalculate
              </p>
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
  <div className="text-white/60 space-y-4">
    <p className="text-white font-semibold">
      Your Estimate Preview
    </p>

    <p>
      Select services, define hours, and calculate to get
      a realistic marketing investment.
    </p>

    <div className="mt-6 text-sm space-y-2">
      <p>✔ Strategy + Execution</p>
      <p>✔ Funnel Optimization</p>
      <p>✔ Ads + SEO + CRO</p>
      <p>✔ Reporting & Growth Plan</p>
    </div>
  </div>

) : result.enterprise ? (

  {/* 🚀 ENTERPRISE CTA */}
  <div className="space-y-5 text-center">

    <p className="text-[#c9a84c] text-xl font-bold">
      High Scale Requirement Detected
    </p>

    <p className="text-white/60 text-sm">
      For projects above <span className="text-white font-semibold">150+ hours/month</span>,
      we provide custom strategy, dedicated team & pricing.
    </p>

    <p className="text-white/40 text-xs">
      Let’s build a tailored growth system for your business.
    </p>

    <a href="/contact">
      <div className="mt-4 bg-[#c9a84c] text-black py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90">
        Contact Us for Custom Quote →
      </div>
    </a>

  </div>

) : (

  {/* 💰 NORMAL RESULT */}
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
      <p className="font-semibold mb-2">Deliverables:</p>
      {result.deliverables.map((d, i) => (
        <p key={i}>✔ {d}</p>
      ))}
    </div>

    <p className="text-white/40 text-xs mt-4">
      Built for predictable growth — not random marketing.
    </p>

  </div>
)}
          </div>

        </div>
      </div>
    </section>
  );
}
