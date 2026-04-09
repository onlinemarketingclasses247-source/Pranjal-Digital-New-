import { motion } from "framer-motion";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "12+", label: "Years Experience" },
  { value: "400+", label: "Happy Clients" },
  { value: "20+", label: "Countries Served" },
  { value: "5M+", label: "Revenue Generated" },
  { value: "7X", label: "Avg ROAS" },
  { value: "25+", label: "Team Members" },
];

export default function MobileStats(): JSX.Element {
  return (
    <section className="py-10 bg-gradient-to-r from-[#080c14] to-[#040608] md:hidden">
      <div className="max-w-md mx-auto px-4">
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
