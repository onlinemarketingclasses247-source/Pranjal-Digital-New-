import { motion } from "framer-motion";
import { CheckCircle, Calendar } from "lucide-react";

const CALENDLY = "https://calendly.com/pranjaldigital-info/30min";

export default function ThankYou() {
  return (
    <div className="relative bg-[#040608] min-h-screen text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#c9a84c]/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#c9a84c]/10 blur-[120px] rounded-full"
        />
      </div>

      {/* MAIN */}
      <div className="relative z-10 px-4 py-16 md:py-24">

        <div className="max-w-5xl mx-auto text-center">

          {/* SUCCESS ICON */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <CheckCircle className="mx-auto text-[#c9a84c]" size={60} />
          </motion.div>

          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Message Received Successfully
          </h1>

          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
            You're one step closer to scaling your business with a proven digital growth system.
          </p>

          {/* PROFILE + SPEECH */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10">

            {/* IMAGE */}
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -6, 0], opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              src="/images/about.png"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 border-[#c9a84c] shadow-[0_0_25px_rgba(201,168,76,0.4)] object-cover"
            />

            {/* CHAT BUBBLE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative bg-[#0a0f1c]/90 backdrop-blur-md border border-[#c9a84c]/30 rounded-xl p-5 sm:p-6 max-w-md text-left"
            >

              {/* TAIL */}
              <div className="absolute left-[-8px] top-6 w-4 h-4 bg-[#0a0f1c] border-l border-b border-[#c9a84c]/30 rotate-45 hidden md:block" />

              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Hey, I’ve personally received your message 👋
                <br /><br />
                My team is already reviewing your requirements.
                <br /><br />
                If you’re serious about scaling, I recommend booking a quick strategy call.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#040608] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book Free Strategy Call
              <Calendar size={18} />
            </a>
          </div>

          <p className="text-white/40 text-xs sm:text-sm mt-4">
            No fees • No pressure • Free audit included
          </p>
        </div>

        {/* STATS */}
        <div className="max-w-6xl mx-auto mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

          {[
            { value: "400+", label: "Clients" },
            { value: "20+", label: "Countries" },
            { value: "5M+", label: "Revenue" },
            { value: "7X", label: "ROAS" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0f1c]/80 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-white/10 text-center"
            >
              <div className="text-xl sm:text-2xl font-bold text-[#c9a84c]">
                {item.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mt-16 sm:mt-20">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            What Happens Next?
          </h2>

          <div className="space-y-3">
            {[
              "You’ll get a response within 24 hours",
              "We analyze your business before replying",
              "You get a custom strategy — not a template",
              "No sales pressure — only value",
              "You can book a call anytime",
              "We work globally (US, UK, India, etc.)",
              "We focus on ROI, not vanity metrics",
              "You’ll get clarity even if you don’t hire us",
              "We may suggest improvements immediately",
              "Everything stays confidential",
            ].map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0a0f1c]/70 p-4 rounded-lg border border-white/10 text-sm text-white/70"
              >
                {q}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
