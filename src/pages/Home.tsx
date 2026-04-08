// ✅ FINAL OPTIMIZED HOMEPAGE (MOBILE-FIRST, HIGH-CONVERSION)

import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Menu, X, ChevronDown, Play,
  Search, Target, Brain, LineChart, Cpu, DollarSign
} from "lucide-react";

const CALENDLY = "https://calendly.com/pranjaldigital-info/30min";

export default function Home() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "auto";
  }, [menu]);

  return (
    <div className="bg-[#080c14] text-white overflow-x-hidden">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-[#080c14]/90 backdrop-blur border-b border-white/10 px-4 py-3 flex justify-between items-center">
        
        {/* LOGO FIX (no wrap) */}
        <Link href="/" className="text-[15px] sm:text-lg font-bold whitespace-nowrap">
          Pranjal Digital
        </Link>

        <button onClick={() => setMenu(true)} className="p-2">
          <Menu size={22} />
        </button>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center gap-8 text-xl"
          >
            <button onClick={() => setMenu(false)} className="absolute top-6 right-6">
              <X size={26} />
            </button>

            <Link href="/" onClick={() => setMenu(false)}>Home</Link>
            <Link href="/services" onClick={() => setMenu(false)}>Services</Link>
            <Link href="/contact" onClick={() => setMenu(false)}>Contact</Link>

            <a href={CALENDLY} className="bg-[#c9a84c] text-black px-6 py-3 rounded-xl font-bold">
              Book Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO ================= */}
      <section className="pt-24 pb-16 px-5 text-center max-w-4xl mx-auto">

        <div className="text-xs text-[#c9a84c] mb-3">
          👋 Namaste! I'm Pranjal
        </div>

        {/* FIX: RESPONSIVE HEADLINE */}
        <h1 className="text-[34px] sm:text-[48px] md:text-[60px] font-bold leading-[1.2] mb-5">
          12+ Years of <br />
          <span className="text-[#c9a84c]">Digital Growth</span>
        </h1>

        <p className="text-white/60 text-sm sm:text-base mb-8">
          400+ clients • 20+ countries • $5M+ revenue generated
        </p>

        {/* FIX: FAT FINGER SAFE */}
        <div className="flex flex-col gap-4">
          <a
            href={CALENDLY}
            className="bg-[#c9a84c] text-black font-bold py-4 rounded-xl"
          >
            Book Free Strategy Call
          </a>

          <Link href="/services" className="border border-white/20 py-4 rounded-xl">
            Explore Services
          </Link>
        </div>

        <ChevronDown className="mx-auto mt-10 text-white/30 animate-bounce" />
      </section>

      {/* ================= SERVICES (GRID FIX) ================= */}
      <section className="px-5 pb-16">
        <div className="grid grid-cols-2 gap-3">

          {[
            { icon: Search, name: "SEO + AEO" },
            { icon: Target, name: "AI PPC" },
            { icon: Brain, name: "Funnels" },
            { icon: LineChart, name: "Performance" },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0f1c] p-4 rounded-xl text-center">
              <s.icon className="mx-auto mb-2 text-[#c9a84c]" />
              <p className="text-sm">{s.name}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CALCULATOR FIX ================= */}
      <section className="px-5 pb-16">

        {/* Replace long vertical list */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {["SEO", "Ads", "Funnels", "Content"].map((s, i) => (
            <button key={i} className="bg-white/5 py-3 rounded-lg text-sm">
              {s}
            </button>
          ))}
        </div>

        {/* FIX: BIG SLIDER */}
        <input type="range" className="w-full h-6 mb-4" />

        <div className="flex gap-2">
          {["USD", "INR", "GBP"].map((c) => (
            <button key={c} className="flex-1 py-3 bg-white/5 rounded-lg text-sm">
              {c}
            </button>
          ))}
        </div>

      </section>

      {/* ================= COMPARISON (FIXED) ================= */}
      <section className="px-5 pb-16">

        {[
          ["Experience", "2-4 yrs", "12+ yrs"],
          ["Strategy", "Template", "Custom"],
          ["Response", "48 hrs", "Same day"],
        ].map((row, i) => (
          <div key={i} className="bg-[#0a0f1c] p-4 rounded-xl mb-3">

            <p className="text-xs text-white/40 mb-2">{row[0]}</p>

            <div className="flex justify-between text-sm">
              <span className="text-red-400">✕ {row[1]}</span>
              <span className="text-[#c9a84c]">✓ {row[2]}</span>
            </div>

          </div>
        ))}

      </section>

      {/* ================= INDUSTRIES FIX ================= */}
      <section className="px-5 pb-16">

        <div className="flex gap-3 overflow-x-auto pb-4">
          {["SaaS", "Ecom", "Fintech", "Healthcare"].map((i) => (
            <div key={i} className="min-w-[140px] bg-[#0a0f1c] p-4 rounded-xl text-center">
              {i}
            </div>
          ))}
        </div>

      </section>

      {/* ================= VIDEO ================= */}
      <section className="px-5 pb-16">
        <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/MjqcQ46ai5Y"
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to scale your marketing?
        </h2>

        <a
          href={CALENDLY}
          className="bg-[#c9a84c] text-black font-bold py-4 px-8 rounded-xl inline-block"
        >
          Book Free Call
        </a>
      </section>

    </div>
  );
}
