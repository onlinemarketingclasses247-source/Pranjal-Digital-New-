import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, TrendingUp } from "lucide-react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Desktop only
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Delay + Shake + Auto Open
  useEffect(() => {
    if (!isDesktop) return;

    // wait 8 sec → show icon
    const t1 = setTimeout(() => {
      setShowIcon(true);
      setIsShaking(true);
    }, 8000);

    // shake for 8 sec → open
    const t2 = setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);
    }, 16000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* PREMIUM AI ICON */}
      {!isOpen && showIcon && (
        <motion.div
          onClick={() => setIsOpen(true)}
          animate={
            isShaking
              ? {
                  x: [0, -4, 4, -3, 3, -2, 2, 0],
                }
              : {}
          }
          transition={{ duration: 0.6, repeat: isShaking ? Infinity : 0 }}
          className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
        >
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#c9a84c] to-[#f0d282] shadow-lg">

            {/* AI TEXT */}
            <span className="text-[#080c14] font-bold text-sm">AI</span>

            {/* PULSE RING */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#c9a84c]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

          </div>
        </motion.div>
      )}

      {/* POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-[9999]"
          >
            <div className="relative w-[280px] bg-[#0a0f1c] border border-[#c9a84c]/40 rounded-xl shadow-2xl overflow-hidden">

              {/* BIG CLOSE BUTTON */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg"
              >
                <X size={18} />
              </button>

              {/* CONTENT */}
              <div className="p-3 flex flex-col gap-3">

                {/* HEADSHOT + TEXT */}
                <div className="flex items-center gap-3">

                  <img
                    src="/images/about.png"
                    alt="Pranjal"
                    className="w-10 h-10 rounded-full object-cover border border-[#c9a84c]"
                  />

                  <div>
                    <p className="text-white text-xs font-semibold">
                      Need More Leads?
                    </p>
                    <p className="text-white/50 text-[10px]">
                      I’ll help you grow revenue 🚀
                    </p>
                  </div>

                </div>

                {/* MINI VISUAL (REVENUE ICON) */}
                <div className="flex items-center justify-center gap-2 text-[#c9a84c] text-xs">
                  <TrendingUp size={14} />
                  <span>Leads • Sales • Growth</span>
                </div>

                {/* CTA ONLY */}
                <a
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold py-2 rounded-lg text-xs hover:scale-[1.02] transition"
                >
                  Contact Pranjal
                  <ArrowRight size={12} />
                </a>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
