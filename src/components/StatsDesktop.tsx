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

function useCount(end: number, duration = 1800) {
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

export default function StatsDesktop() {
  return (
    <section className="hidden md:block py-14 bg-gradient-to-r from-[#080c14] to-[#040608] relative overflow-hidden">

      {/* subtle glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-[#c9a84c]/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-3 gap-5">

          {stats.map((s, i) => {
            const count = useCount(s.value);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.04 }}
                className="group relative p-5 rounded-xl border border-white/10 bg-[#0a0f1c]/70 backdrop-blur-md text-center"
              >

                {/* number */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"
                >
                  {count}{s.suffix}
                </motion.div>

                {/* label */}
                <div className="text-white/60 text-sm mt-2">
                  {s.label}
                </div>

                {/* glow underline */}
                <div className="mt-2 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-40 group-hover:opacity-100 transition" />

              </motion.div>
            );
          })}

        </div>

        {/* BOTTOM FILL CONTENT */}
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <p className="text-white/60 text-sm leading-relaxed">
            These numbers are not vanity metrics — they reflect real growth systems built across industries.
            Every campaign is structured to drive measurable results, not just traffic.
          </p>
        </div>

      </div>
    </section>
  );
}
