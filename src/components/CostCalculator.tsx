import React, { useState, useEffect } from "react";

const currencyConfig = {
  USD: { rate: 20, symbol: "$" },
  GBP: { rate: 15, symbol: "£" },
  EUR: { rate: 17, symbol: "€" },
  INR: { rate: 800, symbol: "₹" },
};

const servicesList = [
  "SEO","Google Ads","Meta Ads","Content","Email",
  "CRO","Landing Pages","Analytics","Strategy",
  "Funnels","YouTube","Performance"
];

const serviceOutputs = {
  SEO: ["Keyword Research", "On-page SEO"],
  "Google Ads": ["Campaign Setup", "ROAS Optimization"],
  Content: ["Content Strategy", "Blogs"],
  CRO: ["A/B Testing", "UX Optimization"],
};

export default function CostCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [hours, setHours] = useState(20);
  const [months, setMonths] = useState(3);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currencyChanged, setCurrencyChanged] = useState(false);
  const [clicked, setClicked] = useState(false);

  const toggleService = (s) => {
    setSelected((prev) =>
      prev.includes(s)
        ? prev.filter((x) => x !== s)
        : [...prev, s]
    );
  };

  // BIG CURSOR LOOP
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

  // HANDLE CURRENCY CHANGE
  const handleCurrency = (c) => {
    setCurrency(c);
    if (result) {
      setResult(null);
      setCurrencyChanged(true);
    }
  };

  const calculate = () => {
    setClicked(true);
    setLoading(true);
    setCurrencyChanged(false);

    setTimeout(() => {
      const { rate, symbol } = currencyConfig[currency];
      const total = hours * rate * months;
      const discount = total * 0.9;

      setResult({
        total,
        discount,
        symbol,
      });

      setLoading(false);
    }, 1200);
  };

  const getDeliverables = () => {
    let output = [];
    selected.forEach((s) => {
      if (serviceOutputs[s]) {
        output = [...output, ...serviceOutputs[s]];
      }
    });
    return [...new Set(output)];
  };

  return (
    <section className="py-20 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl text-white text-center font-bold mb-6">
          Digital Marketing Cost Calculator
        </h2>

        {/* Currency */}
        <div className="flex justify-center gap-3 mb-6">
          {Object.keys(currencyConfig).map((c) => (
            <button
              key={c}
              onClick={() => handleCurrency(c)}
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
              {servicesList.map((s) => (
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
            <label className="text-white/60 text-sm">
              Total Project Hours: {hours}
            </label>
            <input
              type="range"
              min="5"
              max="5000"
              value={hours}
              onChange={(e) => setHours(+e.target.value)}
              className="w-full accent-[#c9a84c]"
            />

            <p className="text-white/40 text-xs mt-1">
              Total effort across all selected services (not per service)
            </p>

            {/* MONTH */}
            <label className="text-white/60 text-sm mt-3 block">
              Duration: {months} months
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(+e.target.value)}
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
          <div className="bg-[#0a0f1c] p-6 rounded border border-[#c9a84c]/20 flex items-center justify-center">

            {loading ? (
              <div className="text-center">
                <div className="w-40 h-2 bg-white/10 rounded overflow-hidden mb-4">
                  <div className="h-full bg-[#c9a84c] animate-pulse w-full"></div>
                </div>
                <p className="text-white/50 text-sm">
                  Building your growth plan...
                </p>
              </div>
            ) : currencyChanged ? (
              <p className="text-yellow-400 text-sm">
                Currency changed — click calculate again
              </p>
            ) : result ? (
              <div className="space-y-4 text-center">

                <p className="text-white/40 line-through">
                  {result.symbol}
                  {Math.floor(result.total).toLocaleString()}
                </p>

                <p className="text-[#c9a84c] text-3xl font-bold">
                  {result.symbol}
                  {Math.floor(result.discount).toLocaleString()}
                </p>

                <p className="text-green-400 text-sm">
                  10% Discount Applied
                </p>

                <div className="text-left text-white/70 text-sm space-y-1 mt-4">
                  {getDeliverables().map((item, i) => (
                    <p key={i}>✔ {item}</p>
                  ))}
                </div>

              </div>
            ) : (
              <div className="text-center text-white/50 text-sm space-y-2">
                <p>Select services & calculate</p>
                <p>Get a clear estimate of your growth investment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
