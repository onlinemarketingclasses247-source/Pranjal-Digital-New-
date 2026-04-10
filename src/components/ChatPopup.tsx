import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [closed, setClosed] = useState(false);
  const [index, setIndex] = useState(0);

  const content = [
    { title: "More Leads", sub: "Get consistent qualified leads" },
    { title: "More Sales", sub: "Turn traffic into paying customers" },
    { title: "More Revenue", sub: "Scale your business profitably" },
    { title: "More Growth", sub: "Build systems that compound" },
  ];

  // ✅ SAFE DESKTOP DETECTION (NO HYDRATION ISSUE)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, []);

  // ✅ SESSION CHECK
  useEffect(() => {
    if (typeof window !== "undefined") {
      const closedSession = sessionStorage.getItem("chatClosed");
      if (closedSession === "true") {
        setClosed(true);
      }
    }
  }, []);

  // ✅ SHOW LOGIC (FAST FOR VISIBILITY)
  useEffect(() => {
    if (!isDesktop || closed) return;

    const t1 = setTimeout(() => setShowIcon(true), 1000); // 1 sec
    const t2 = setTimeout(() => setIsOpen(true), 3000); // 3 sec

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isDesktop, closed]);

  // ✅ ROTATING TEXT
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // ✅ CLOSE HANDLER (SESSION LOCK)
  const handleClose = () => {
    setIsOpen(false);
    setShowIcon(false);
    setClosed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chatClosed", "true");
    }
  };

  // ✅ FINAL SAFETY
  if (closed) return null;
  if (!isDesktop) return null;

  return (
    <>
      {/* 🔹 FLOATING AI ICON */}
      {!isOpen && showIcon && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282] flex items-center justify-center shadow-xl"
          >
            <span className="text-[#080c14] font-bold">AI</span>
          </motion.div>
        </div>
      )}

      {/* 🔹 POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 z-[9999]"
          >
            <div className="relative w-[340px] bg-gradient-to-b from-[#0a0f1c] to-[#060a14] border border-[#c9a84c]/50 rounded-xl shadow-2xl p-4">

              {/* 🔴 CLOSE BUTTON (FIXED) */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg z-50"
              >
                <X size={18} />
              </button>

              {/* 🔹 IMAGE WITH PREMIUM RIPPLE */}
              <div className="flex justify-center mb-2">
                <div className="relative">

                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#c9a84c]"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />

                  <img
                    src="/images/about.png"
                    alt="Pranjal"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#c9a84c] relative z-10"
                  />
                </div>
              </div>

              {/* 🔹 DYNAMIC TEXT */}
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
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

                <p className="text-white/60 text-sm leading-tight mt-1">
                  {content[index].sub}
                </p>
              </motion.div>

              {/* 🔹 STATS GRID */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                <div className="bg-[#111827] rounded-md py-2">
                  <p className="text-[#c9a84c] font-bold">400+</p>
                  <p className="text-white/40">Clients</p>
                </div>
                <div className="bg-[#111827] rounded-md py-2">
                  <p className="text-[#c9a84c] font-bold">7X</p>
                  <p className="text-white/40">ROAS</p>
                </div>
                <div className="bg-[#111827] rounded-md py-2">
                  <p className="text-[#c9a84c] font-bold">5M+</p>
                  <p className="text-white/40">Revenue</p>
                </div>
              </div>

              {/* 🔹 CTA */}
              <a
                href="/contact"
                className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#f0d282] text-[#080c14] font-bold py-3 rounded-lg text-sm hover:scale-[1.04] transition"
              >
                Contact Pranjal
                <ArrowRight size={16} />
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
