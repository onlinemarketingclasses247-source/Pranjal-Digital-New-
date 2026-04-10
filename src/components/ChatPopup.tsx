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
}, 1600);
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

<>
  {/* PRIMARY RIPPLE */}
  <motion.div
    className="absolute inset-0 rounded-full border border-[#c9a84c]"
    animate={{
      scale: [1, 1.4, 1.7],
      opacity: [0.5, 0.2, 0],
    }}
    transition={{
      duration: 1.6,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  />

  {/* SECONDARY RIPPLE (DELAYED FOR DEPTH) */}
  <motion.div
    className="absolute inset-0 rounded-full border border-[#c9a84c]/70"
    animate={{
      scale: [1, 1.4, 1.7],
      opacity: [0.4, 0.15, 0],
    }}
    transition={{
      duration: 1.6,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 0.8, // KEY: creates layered wave effect
    }}
  />
</>

                  

                  {/* IMAGE */}
                  <img
                    src="/images/about.png"
                    alt="Pranjal"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#c9a84c] relative z-10 shadow-xl"
                  />
                </motion.div>
              </div>

              {/* 🔥 MAIN CARD */}

               <div className="relative bg-gradient-to-b from-[#0b1220] to-[#05080f] border border-[#c9a84c]/50 rounded-xl shadow-2xl pt-16 pb-4 px-4">
              
                {/* ✅ FIXED CLOSE BUTTON (NOT CUT EVER) */}

 <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
  <button
    onClick={handleClose}
    className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg"
  >
    <X size={20} />
  </button>

  <span className="text-xs text-red-400 font-medium">
    Close
  </span>
</div>
                

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

                <div className="grid grid-cols-3 gap-2 mt-3">

  {/* CLIENTS */}
  <div className="bg-[#111827] rounded-md py-2 flex flex-col items-center justify-center text-center">
    <span className="text-[#c9a84c] text-sm">👥</span>
    <p className="text-[#c9a84c] font-bold text-xs">400+</p>
    <p className="text-white/40 text-[10px]">Clients</p>
  </div>

  {/* ROAS */}
  <div className="bg-[#111827] rounded-md py-2 flex flex-col items-center justify-center text-center">
    <span className="text-[#c9a84c] text-sm">📈</span>
    <p className="text-[#c9a84c] font-bold text-xs">7X</p>
    <p className="text-white/40 text-[10px]">ROAS</p>
  </div>

  {/* REVENUE */}
  <div className="bg-[#111827] rounded-md py-2 flex flex-col items-center justify-center text-center">
    <span className="text-[#c9a84c] text-sm">💰</span>
    <p className="text-[#c9a84c] font-bold text-xs">5M+</p>
    <p className="text-white/40 text-[10px]">Revenue</p>
  </div>

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
