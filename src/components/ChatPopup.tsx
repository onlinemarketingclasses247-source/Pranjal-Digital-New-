import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const CALENDLY = "https://calendly.com/pranjaldigital-info/30min";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect desktop only
  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* FLOATING BUTTON */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282] flex items-center justify-center shadow-lg hover:scale-105 transition">
            <span className="text-[#080c14] text-lg font-bold">AI</span>
          </div>
        </div>
      )}

      {/* POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 right-5 z-[9999]"
          >
            <div className="relative w-[320px] rounded-2xl bg-[#0a0f1c] border border-[#c9a84c]/40 shadow-2xl overflow-hidden">

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-black"
              >
                <X size={14} />
              </button>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-4">

                {/* HEADER */}
                <div className="text-center">
                  <h3 className="text-white font-semibold text-sm">
                    Want More Leads & Revenue?
                  </h3>
                  <p className="text-white/50 text-xs mt-1">
                    Let’s scale your business with proven strategies.
                  </p>
                </div>

                {/* CTA BUTTON 1 */}
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold py-2.5 rounded-lg text-sm hover:scale-[1.02] transition"
                >
                  Contact Pranjal
                  <ArrowRight size={14} />
                </a>

                {/* CTA BUTTON 2 */}
                <a
                  href="/contact"
                  className="w-full flex items-center justify-center border border-white/20 text-white py-2.5 rounded-lg text-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition"
                >
                  Contact Us
                </a>

                {/* TRUST LINE */}
                <p className="text-[10px] text-white/40 text-center">
                  400+ clients • 12+ years • Proven results
                </p>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
