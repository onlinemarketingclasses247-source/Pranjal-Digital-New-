import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CALENDLY = "https://calendly.com/pranjaldigital-info/30min";

export default function ChatPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.4 }}
        className="w-[280px] bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl shadow-2xl p-4 relative"
      >
        {/* CLOSE */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-white/40 hover:text-white text-sm"
        >
          ✕
        </button>

        {/* IMAGE */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="/pranjal.png" // replace with your image path
            alt="Pranjal"
            className="w-10 h-10 rounded-full object-cover border border-[#c9a84c]"
          />
          <p className="text-white text-sm font-semibold">
            Need More Revenue?
          </p>
        </div>

        {/* COPY */}
        <p className="text-white/60 text-xs leading-relaxed mb-3">
          Get more leads. Close more sales. Scale your business with proven
          digital strategies.
        </p>

        {/* CTA */}
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#c9a84c] text-black text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Contact Me Now →
        </a>
      </motion.div>
    </motion.div>
  );
}
