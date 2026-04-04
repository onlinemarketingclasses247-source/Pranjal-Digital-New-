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

export default function CostCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [selected, setSelected] = useState([]);
  const [hours, setHours] = useState(20);
  const [months, setMonths] = useState(3);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [display, setDisplay] = useState(0);
  const [clicked, setClicked] = useState(false);

  const toggle = (s) => {
    setSelected(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  // cursor keeps looping UNTIL click
  useEffect(() => {
    if (clicked) return;

    const interval = setInterval(() => {
      const el = document.getElementById("calc-btn");
      if (el) {
        el.classList.add("scale-110");
        setTimeout(() => el.classList.remove("scale-110"), 800);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [clicked]);

  const animateNumber = (final) => {
    let start = 0;
    let duration = 900;
    let startTime = null;

    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime)/duration, 1);
      setDisplay(Math.floor(progress * final));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const calculate = () => {
    setClicked(true);
    setLoading(true);

    setTimeout(() => {
      const { rate } = currencyConfig[currency];
      const totalHours = hours * selected.length;
      const total = totalHours * rate * months;
      const discount = total * 0.9;

      setResult({
        total,
        discount,
        hours: totalHours,
      });

      animateNumber(discount);
      setLoading(false);
    }, 1800);
  };

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
                currency===c
                ? "bg-[#c9a84c] text-black"
                : "text-white/60 border border-white/20"
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
                  onClick={() => toggle(s)}
                  className={`p-2 text-xs rounded border transition ${
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
            <label className="text-white/60 text-sm">
              Hours ({hours})
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={hours}
              onChange={(e)=>setHours(+e.target.value)}
              className="w-full accent-[#c9a84c]"
            />

            {/* MONTH */}
            <label className="text-white/60 text-sm mt-3 block">
              Duration ({months} months)
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={months}
              onChange={(e)=>setMonths(+e.target.value)}
              className="w-full accent-[#c9a84c]"
            />

            {/* BUTTON */}
            <button
              id="calc-btn"
              onClick={calculate}
              className="w-full mt-5 bg-[#c9a84c] text-black py-3 rounded font-semibold transition"
            >
              Calculate Cost
            </button>
          </div>

          {/* RIGHT */}
          <div className="bg-[#0a0f1c] rounded border border-[#c9a84c]/20 flex items-center justify-center relative overflow-hidden">

            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">

                {/* BIG SPINNER */}
                <div className="w-72 h-72 border-[6px] border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>

                {/* TEXT ROTATION */}
                <div className="absolute animate-spin text-white/40 text-xs tracking-widest">
                  SEO • ADS • FUNNELS • CONTENT • CRO • EMAIL •
                </div>

              </div>
            ) : result && (
              <div className="p-6 text-center space-y-4">

                <p className="text-white/50 text-sm">
                  Total Hours: {result.hours}
                </p>

                <p className="text-white/40 line-through">
                  {currencyConfig[currency].symbol}
                  {Math.floor(result.total).toLocaleString()}
                </p>

                <p className="text-[#c9a84c] text-3xl font-bold">
                  {currencyConfig[currency].symbol}
                  {display.toLocaleString()}
                </p>

                <p className="text-green-400 text-sm">
                  10% Discount Applied
                </p>

                {/* VALUE */}
                <div className="text-left text-white/70 text-sm mt-4 space-y-2">
                  <p>✔ Strategy + Execution</p>
                  <p>✔ Funnel Optimization</p>
                  <p>✔ Ads + SEO + CRO</p>
                  <p>✔ Weekly Reporting</p>
                  <p>✔ Growth Roadmap</p>
                </div>

                <p className="text-white/40 text-xs mt-3">
                  This is not just execution — it's a full revenue system.
                </p>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
