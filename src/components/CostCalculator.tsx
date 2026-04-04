import React, { useState, useEffect } from "react";

const HOURLY_RATE_USD = 20;

// Currency conversion (fixed)
const currencyRates = {
  USD: 1,
  INR: 83,
  EUR: 0.92,
  GBP: 0.78,
};

const services = [
  { name: "SEO", hours: 25 },
  { name: "Google Ads", hours: 30 },
  { name: "Meta Ads", hours: 25 },
  { name: "SaaS Marketing", hours: 35 },
  { name: "B2B Marketing", hours: 30 },
  { name: "Content Marketing", hours: 20 },
  { name: "Email Marketing", hours: 15 },
  { name: "CRO", hours: 20 },
  { name: "Landing Pages", hours: 15 },
  { name: "Analytics", hours: 10 },
  { name: "Strategy", hours: 12 },
  { name: "Funnels", hours: 25 },
];

export default function CostCalculator() {
  const [selected, setSelected] = useState([]);
  const [months, setMonths] = useState(3);
  const [currency, setCurrency] = useState("USD");
  const [calculated, setCalculated] = useState(false);
  const [displayCost, setDisplayCost] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const toggleService = (s) => {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const totalHours = selected.reduce((acc, s) => {
    const service = services.find((x) => x.name === s);
    return acc + service.hours;
  }, 0);

  const baseCostUSD = totalHours * HOURLY_RATE_USD * months;
  const convertedCost =
    baseCostUSD * currencyRates[currency];

  const discountedCost = convertedCost * 0.9;

  // ODOMETER ANIMATION
  const runAnimation = () => {
    let start = 0;
    let end = discountedCost;
    let duration = 800;
    let startTime = null;

    const animate = (time) => {
      if (!startTime) startTime = time;
      let progress = time - startTime;
      let percent = Math.min(progress / duration, 1);

      setDisplayCost(Math.floor(end * percent));

      if (percent < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const handleCalculate = () => {
    setCalculated(true);
    runAnimation();
  };

  // CURSOR ANIMATION
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

  return (
    <section className="py-20 bg-[#040608]">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl text-white font-bold text-center mb-4">
          Digital Marketing Cost Calculator
        </h2>

        {/* CURRENCY */}
        <div className="flex justify-center gap-3 mb-6">
          {Object.keys(currencyRates).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-1 rounded border ${
                currency === c
                  ? "bg-[#c9a84c] text-black"
                  : "border-white/20 text-white/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="bg-[#0a0f1c] p-5 rounded-lg border border-white/10">

            {/* SERVICES */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {services.map((s) => (
                <button
                  key={s.name}
                  onClick={() => toggleService(s.name)}
                  className={`p-2 text-xs rounded border ${
                    selected.includes(s.name)
                      ? "bg-[#c9a84c] text-black"
                      : "border-white/20 text-white/70"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* MONTH SELECTOR */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  className={`px-3 py-1 text-sm rounded ${
                    months === m
                      ? "bg-[#c9a84c] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {m}M
                </button>
              ))}
            </div>

            {/* CALCULATE BUTTON */}
            <div className="relative">
              <button
                onClick={handleCalculate}
                className="w-full bg-[#c9a84c] text-black py-3 rounded font-semibold"
              >
                Calculate Cost
              </button>

              {/* FAKE CURSOR */}
              {showCursor && (
                <div className="absolute -top-8 left-1/2 translate-x-[-50%] text-2xl animate-bounce">
                  🖱️
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#0a0f1c] p-5 rounded-lg border border-[#c9a84c]/20 flex flex-col justify-center">

            {!calculated ? (
              <p className="text-white/40 text-center">
                Select services & click calculate
              </p>
            ) : (
              <div className="text-center space-y-3">

                <p className="text-white/60 text-sm">
                  Estimated Investment
                </p>

                {/* ORIGINAL PRICE */}
                <p className="text-white/40 line-through text-lg">
                  {currency} {Math.floor(convertedCost).toLocaleString()}
                </p>

                {/* FINAL PRICE */}
                <p className="text-[#c9a84c] text-3xl font-bold">
                  {currency} {displayCost.toLocaleString()}
                </p>

                <p className="text-green-400 text-sm">
                  You save 10%
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
