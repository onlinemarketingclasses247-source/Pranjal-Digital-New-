import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [closed, setClosed] = useState(false);
  const [index, setIndex] = useState(0);

  const content = [
    { title: "More Leads", sub: "Get consistent inbound leads" },
    { title: "More Sales", sub: "Convert visitors into clients" },
    { title: "More Revenue", sub: "Scale your business profitably" },
    { title: "More Growth", sub: "Build long-term systems" },
  ];

  // KEEP YOUR WORKING LOGIC
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const closedSession = sessionStorage.getItem("chatClosed");
    if (closedSession === "true") setClosed(true);
  }, []);

  useEffect(() => {
    if (!isDesktop || closed) return;

    const t1 = setTimeout(() => setShowIcon(true), 6000);
    const t2 = setTimeout(() => setIsOpen(true), 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isDesktop, closed]);

  // TEXT CHANGE EVERY 1 SEC
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 1000);
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-[9999]"
          >
            <div className="relative w-[340px]">

              {/* 🔥 TOP FLOATING IMAGE (CUT OUT STYLE) */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">

                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="relative w-24 h-24 rounded-full"
                >
                  {/* GOLD RIPPLE */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#c9a84c]"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />

                  {/* IMAGE */}
                  <img
                    src="/images/about.png"
                    alt="Pranjal"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#c9a84c] relative z-10 shadow-xl"
                  />
                </motion.div>
              </div>

              {/* 🔥 MAIN CARD */}
              <div className="bg-gradient-to-b from-[#0b1220] to-[#05080f] border border-[#c9a84c]/50 rounded-xl shadow-2xl pt-16 pb-4 px-4">

                {/* ✅ FIXED CLOSE BUTTON (NOT CUT EVER) */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl z-50"
                >
                  <X size={20} />
                </button>

                {/* 🔥 TEXT CONTENT */}
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-white font-bold text-lg tracking-tight">
                    Want{" "}
                    <span className="text-[#c9a84c]">
                      {content[index].title}
                    </span>
                    ?
                  </p>

                  <p className="text-white/70 text-sm mt-1 leading-tight">
                    {content[index].sub}
                  </p>
                </motion.div>

                {/* 🔥 PROOF LINE */}
                <div className="text-center text-xs text-white/50 mt-2">
                  400+ Clients • 7X ROAS • 5M+ Revenue
                </div>

                {/* 🔥 CTA */}
                <a
                  href="/contact"
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold py-3 rounded-lg text-sm hover:scale-[1.04] transition"
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
