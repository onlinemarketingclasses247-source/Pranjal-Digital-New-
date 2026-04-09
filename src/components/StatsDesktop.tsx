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

export default function StatsDesktop() {
  const [activeIndex, setActiveIndex] = useState(0);

  // glowing sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hidden md:block py-24 bg-gradient-to-b from-[#040608] to-[#080c14]">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* HEADING */}
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Proven Results, Not Just Promises
        </h2>

        <p className="text-white/60 max-w-3xl mx-auto mb-16 leading-relaxed">
          Every number here represents real business growth. These are not vanity metrics — 
          they are outcomes of structured funnel strategies, data-driven campaigns, and 
          consistent optimization across multiple industries.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-8">

          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >

                {/* GLOW BACKGROUND */}
                <div
                  className={`absolute inset-0 rounded-2xl blur-xl transition duration-500 ${
                    isActive
                      ? "bg-[#c9a84c]/20 opacity-80"
                      : "opacity-0"
                  }`}
                />

                {/* CARD */}
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#c9a84c]/40 transition-all duration-300">

                  {/* ICON */}
                  <div className="flex justify-center mb-4">
                    <Icon
                      size={28}
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
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>

                  {/* LABEL */}
                  <div className="text-white/60 text-sm">
                    {stat.label}
                  </div>

                  {/* SHINE EFFECT */}
                  <div
                    className={`absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none overflow-hidden`}
                  >
                    <motion.div
                      animate={{
                        x: isActive ? ["-100%", "100%"] : "-100%",
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CONTENT */}
        <div className="mt-16 max-w-3xl mx-auto">
          <p className="text-white/60 text-base leading-relaxed">
            These results are built through a full-funnel approach — from awareness to retention. 
            Each stage is optimized using data, creative testing, and conversion-focused execution.
          </p>

          <p className="text-[#c9a84c] mt-4 font-medium">
            Growth is not accidental — it’s engineered.
          </p>
        </div>
      </div>
    </section>
  );
}
