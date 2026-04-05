import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function ChatPopup() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [, navigate] = useLocation();

  // ⏱ Show after 10 sec
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // ⏱ Auto expand after icon appears
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setExpanded(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 
            right-4 
            bottom-6 md:bottom-6 
            md:right-6 
            max-w-[260px]"
        >
          {/* MOBILE POSITION FIX */}
          <div className="md:hidden fixed right-3 top-1/2 -translate-y-1/2" />

          {/* MAIN CONTAINER */}
          <motion.div
            layout
            className="bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-full shadow-xl px-3 py-2 flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            {/* AI ICON */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-yellow-400 flex items-center justify-center text-black font-bold text-xs shadow-lg"
            >
              AI
            </motion.div>

            {/* TEXT EXPAND */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-left"
                >
                  <p className="text-[11px] text-[#c9a84c] font-semibold animate-pulse">
                    Knock Knock 👀
                  </p>
                  <p className="text-[11px] text-white/80 leading-tight">
                    Get more leads. More sales.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
