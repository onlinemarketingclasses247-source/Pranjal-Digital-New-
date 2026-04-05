import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function ChatPopup() {
  const [step, setStep] = useState(0); // 0 = dot, 1 = brand, 2 = message
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (window.innerWidth < 768) return; // ❌ desktop only

    const timer = setTimeout(() => {
      setVisible(true);

      setTimeout(() => setStep(1), 600);   // show brand
      setTimeout(() => setStep(2), 1400);  // show message
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">

          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
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

            {/* STEP 0 → DOT */}
            {step === 0 && (
              <motion.div
                className="w-3 h-3 rounded-full bg-[#c9a84c] shadow-lg"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            )}

            {/* STEP 1 → BRAND */}
            {step >= 1 && (
              <motion.div
                initial={{ width: 40 }}
                animate={{ width: step >= 2 ? 260 : 140 }}
                className="bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-full px-3 py-2 shadow-xl flex items-center gap-2 overflow-hidden"
              >
                {/* AI ICON */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c9a84c] to-yellow-400 flex items-center justify-center text-black text-[10px] font-bold">
                  AI
                </div>

                {/* BRAND TEXT */}
                <span className="text-white text-xs font-semibold whitespace-nowrap">
                  Pranjal Digital
                </span>

                {/* STEP 2 → MESSAGE */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 border-l border-white/10 pl-2"
                  >
                    <p className="text-[11px] text-white font-semibold leading-tight">
                      Need More Leads & Sales?
                    </p>

                    <button
                      onClick={() => navigate("/contact")}
                      className="text-[10px] text-[#c9a84c] font-semibold mt-1 hover:underline"
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
