import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function ChatPopup() {
  const [show, setShow] = useState(false);
  const [, navigate] = useLocation();

  // ⏱ Show after 10 seconds (DESKTOP ONLY)
  useEffect(() => {
    if (window.innerWidth < 768) return; // ❌ disable on mobile

    const timer = setTimeout(() => {
      setShow(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-5 right-5 z-50 hidden md:block"
        >
          <div className="relative bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-lg shadow-xl px-4 py-3 w-[240px]">

            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-1 right-2 text-white/40 hover:text-white text-xs"
            >
              ✕
            </button>

            {/* TEXT */}
            <p className="text-white text-xs font-semibold leading-tight">
              Need More Leads & Sales?
            </p>

            <p className="text-white/60 text-[11px] mt-1 leading-tight">
              Book a free consulting session with Pranjal.
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate("/contact")}
              className="mt-3 w-full bg-[#c9a84c] text-black text-xs font-semibold py-2 rounded-md hover:opacity-90 transition"
            >
              Book Now →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
