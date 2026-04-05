import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function ChatPopup() {
  const [show, setShow] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10000); // 10 sec delay
    return () => clearTimeout(timer);
  }, []);

  // ❌ Do NOT show on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setShow(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 120 }}
          transition={{ duration: 0.5 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        >
          <div className="w-[260px] bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl shadow-xl p-4 text-center">

            {/* Heading */}
            <p className="text-white text-sm font-semibold mb-3">
              Do you want more leads & revenue?
            </p>

            {/* FLAGS */}
            <div className="flex justify-between gap-3">

              {/* GREEN FLAG */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={() => navigate("/contact")}
                className="flex-1 bg-green-600 text-white text-xs font-semibold py-3 rounded-lg shadow-lg"
              >
                🚩 YES  
                <br />
                <span className="text-[10px] font-normal">
                  I need more sales
                </span>
              </motion.button>

              {/* RED FLAG */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={() => setShow(false)}
                className="flex-1 bg-red-600 text-white text-xs font-semibold py-3 rounded-lg shadow-lg"
              >
                🚩 NO  
                <br />
                <span className="text-[10px] font-normal">
                  I'm covered
                </span>
              </motion.button>

            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
