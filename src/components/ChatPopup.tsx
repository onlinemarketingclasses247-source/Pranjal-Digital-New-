import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function ChatPopup() {
  const [step, setStep] = useState(0); // 0 dot, 1 brand, 2 message
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (window.innerWidth < 768) return; // desktop only

    const timer = setTimeout(() => {
      setVisible(true);

      // 🧠 TIMELINE (SLOW + PREMIUM)
      setTimeout(() => setStep(1), 4000);  // after vibration
      setTimeout(() => setStep(2), 7000);  // after brand pause
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            {/* ❌ CLOSE */}
            {step === 2 && (
              <button
                onClick={() => setVisible(false)}
                className="absolute -top-2 -right-2 text-white/40 hover:text-white text-xs"
              >
                ✕
              </button>
            )}

            {/* STEP 0 → AI DOT (VIBRATION) */}
            {step === 0 && (
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-yellow-400 flex items-center justify-center text-black font-bold shadow-lg"
                animate={{
                  x: [0, -2, 2, -2, 2, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.4,
                  repeat: 10   // 👈 vibration ~4 sec
                }}
              >
                AI
              </motion.div>
            )}

            {/* STEP 1 & 2 → EXPANDED UI */}
            {step >= 1 && (
              <motion.div
                initial={{ width: 50 }}
                animate={{ width: step === 2 ? 280 : 160 }}
                transition={{ duration: 0.6 }}
                className="bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl shadow-xl px-3 py-3 overflow-hidden"
              >
                {/* HEADER */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-yellow-400 flex items-center justify-center text-black text-xs font-bold">
                    AI
                  </div>

                  <span className="text-white text-sm font-semibold whitespace-nowrap">
                    Pranjal Digital
                  </span>
                </div>

                {/* MESSAGE */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3"
                  >
                    <p className="text-xs text-white leading-relaxed">
                      Need more leads & sales?
                    </p>

                    <p className="text-[11px] text-white/60 mt-1">
                      Book a free consultation with Pranjal.
                    </p>

                    <button
                      onClick={() => navigate("/contact")}
                      className="mt-3 w-full bg-[#c9a84c] text-black text-xs font-semibold py-2 rounded-md hover:opacity-90 transition"
                    >
                      Book Free Consultation →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
