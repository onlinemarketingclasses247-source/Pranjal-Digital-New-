import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 400, suffix: "+", label: "Happy Clients" },
  { value: 20, suffix: "+", label: "Countries Served" },
  { value: 5, suffix: "M+", label: "Revenue Generated" },
  { value: 7, suffix: "X", label: "Avg ROAS" },
  { value: 25, suffix: "+", label: "Team Members" },
];

function useCount(end: number, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const step = (t: number) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end]);

  return count;
}

export default function StatsMobile() {
  return (
    <section className="md:hidden py-10 bg-[#040608] px-4">

      <div className="grid grid-cols-2 gap-3">

        {stats.map((s, i) => {
          const count = useCount(s.value);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="relative p-3 rounded-lg border border-white/10 bg-[#0a0f1c]/80 text-center"
            >

              {/* subtle glow */}
              <div className="absolute inset-0 bg-[#c9a84c]/5 blur-lg opacity-30" />

              {/* number */}
              <div className="text-xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                {count}{s.suffix}
              </div>

              {/* label */}
              <div className="text-white/50 text-[11px] mt-1">
                {s.label}
              </div>

              {/* line */}
              <div className="mt-2 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-50" />

            </motion.div>
          );
        })}

      </div>

      {/* BOTTOM TEXT (FILLS GAP) */}
      <div className="mt-6 text-center px-2">
        <p className="text-white/60 text-xs leading-relaxed">
          Real growth backed by data, strategy, and execution — not guesswork.
        </p>
      </div>

    </section>
  );
}
