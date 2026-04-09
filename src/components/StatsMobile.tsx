import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase, Users, Globe, TrendingUp, Target, Layers } from "lucide-react";

type Stat = {
  value: string;
  label: string;
  icon: any;
};

const stats: Stat[] = [
  { value: "12+", label: "Years Experience", icon: Briefcase },
  { value: "400+", label: "Happy Clients", icon: Users },
  { value: "20+", label: "Countries Served", icon: Globe },
  { value: "5M+", label: "Revenue Generated", icon: TrendingUp },
  { value: "7X", label: "Avg ROAS", icon: Target },
  { value: "25+", label: "Team Members", icon: Layers },
];

export default function StatsMobile() {
  const [activeIndex, setActiveIndex] = useState(0);

  // glow sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="md:hidden py-10 pb-24 bg-gradient-to-b from-[#040608] to-[#080c14]">
      <div className="px-4">

        {/* HEADING */}
        <h2 className="text-xl font-bold text-white text-center mb-2">
          Real Growth. Real Numbers.
        </h2>

        <p className="text-white/50 text-xs text-center mb-6 leading-relaxed">
          These numbers represent real performance across industries — driven by
          structured funnels, testing, and optimization.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-3">

          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >

                {/* GLOW */}
                <div
                  className={`absolute inset-0 rounded-xl blur-md transition ${
                    isActive ? "bg-[#c9a84c]/20 opacity-80" : "opacity-0"
                  }`}
                />

                {/* CARD */}
                <div className="relative p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-center">

                  {/* ICON */}
                  <div className="flex justify-center mb-2">
                    <Icon
                      size={18}
                      className={`transition ${
                        isActive ? "text-[#c9a84c]" : "text-white/40"
                      }`}
                    />
                  </div>

                  {/* NUMBER FLIP */}
                  <motion.div
                    key={stat.value}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </motion.div>

                  {/* LABEL */}
                  <div className="text-white/50 text-[11px] mt-1">
                    {stat.label}
                  </div>

                  {/* SHINE SWEEP */}
                  <motion.div
                    animate={{
                      x: isActive ? ["-100%", "120%"] : "-100%",
                    }}
                    transition={{ duration: 0.7 }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CONTENT */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-xs leading-relaxed">
            Built using full-funnel systems — from awareness to retention.
          </p>
          <p className="text-[#c9a84c] text-xs mt-2 font-medium">
            Growth is engineered, not guessed.
          </p>
        </div>

      </div>
    </section>
  );
}
