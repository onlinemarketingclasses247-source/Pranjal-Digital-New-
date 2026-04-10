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
    { title: "More Leads", sub: "Get consistent qualified leads" },
    { title: "More Sales", sub: "Convert traffic into revenue" },
    { title: "More Revenue", sub: "Scale profit predictably" },
    { title: "More Growth", sub: "Build long-term systems" },
  ];

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

  // ROTATING CONTENT EVERY 1s
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
      {/* ICON */}
      {!isOpen && showIcon && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d282] flex items-center justify-center shadow-lg"
          >
            <span className="text-[#080c14] font-bold">AI</span>
          </motion.div>
        </div>
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
            <div className="relative w-[340px] bg-[#0a0f1c] border border-[#c9a84c]/60 rounded-xl shadow-2xl overflow-hidden">

              {/* CLOSE BUTTON (FIXED) */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl z-50"
              >
                <X size={20} />
              </button>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-3">

                {/* BIG IMAGE */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="relative"
                  >
                    <img
                      src="/images/about.png"
                      alt="Pranjal"
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#c9a84c]"
                    />
                  </motion.div>
                </div>

                {/* DYNAMIC TEXT */}
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-white font-bold text-lg leading-tight">
                    Want {content[index].title}?
                  </p>
                  <p className="text-white/60 text-sm leading-tight mt-1">
                    {content[index].sub}
                  </p>
                </motion.div>

                {/* STATS GRID (NO DEAD SPACE) */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#111827] rounded-md py-2">
                    <p className="text-[#c9a84c] font-bold">400+</p>
                    <p className="text-white/50">Clients</p>
                  </div>
                  <div className="bg-[#111827] rounded-md py-2">
                    <p className="text-[#c9a84c] font-bold">7X</p>
                    <p className="text-white/50">ROAS</p>
                  </div>
                  <div className="bg-[#111827] rounded-md py-2">
                    <p className="text-[#c9a84c] font-bold">5M+</p>
                    <p className="text-white/50">Revenue</p>
                  </div>
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
