import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [closed, setClosed] = useState(false);
  const [metricIndex, setMetricIndex] = useState(0);

  const metrics = ["Leads", "Sales", "Revenue", "Growth"];

  // Desktop only
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Session control
  useEffect(() => {
    const closedSession = sessionStorage.getItem("chatClosed");
    if (closedSession === "true") setClosed(true);
  }, []);

  // Delay + shake + open
  useEffect(() => {
    if (!isDesktop || closed) return;

    const t1 = setTimeout(() => {
      setShowIcon(true);
      setIsShaking(true);
    }, 8000);

    const t2 = setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);
    }, 16000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isDesktop, closed]);

  // Rotate metrics (VISIBLE CHANGE)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % metrics.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowIcon(false);
    setClosed(true);
    sessionStorage.setItem("chatClosed", "true");
  };

  if (!isDesktop || closed) return null;

  return (
    <>
      {/* AI ICON */}
      {!isOpen && showIcon && (
        <motion.div
          onClick={() => setIsOpen(true)}
          animate={isShaking ? { x: [0, -5, 5, -4, 4, -3, 3, 0] } : {}}
          transition={{ duration: 0.6, repeat: isShaking ? Infinity : 0 }}
          className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
        >
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282] flex items-center justify-center shadow-lg">
            <span className="text-[#080c14] font-bold">AI</span>

            <motion.div
              className="absolute inset-0 rounded-full border border-[#c9a84c]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity }}
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
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-[9999]"
          >
            <div className="relative w-[320px] bg-[#0a0f1c] border border-[#c9a84c]/50 rounded-xl shadow-2xl overflow-hidden">

              {/* CLOSE */}
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl z-50"
              >
                <X size={20} />
              </button>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-3">

                {/* IMAGE (BIG + PREMIUM) */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="relative"
                  >
                    <img
                      src="/images/about.png"
                      alt="Pranjal"
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#c9a84c]"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#c9a84c]"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                {/* HEADLINE */}
                <div className="text-center">
                  <p className="text-white font-semibold text-base leading-tight">
                    Want More{" "}
                    <span className="text-[#c9a84c]">
                      {metrics[metricIndex]}
                    </span>
                    ?
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    I help businesses scale with proven strategies that convert.
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold py-3 rounded-lg text-sm hover:scale-[1.03] transition"
                >
                  Contact Pranjal
                  <ArrowRight size={16} />
                </a>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
