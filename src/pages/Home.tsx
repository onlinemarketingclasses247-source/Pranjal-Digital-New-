import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Globe, Search, Target, Brain, LineChart, 
  PenTool, Activity, Linkedin, Rocket as RocketIcon, Cpu, DollarSign, 
  Shield, Building2, Star, TrendingUp, Sparkles, Settings, Heart, Play, 
  MapPin, Coffee, Package
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

// --- HELPERS ---
function setMeta(description) {
  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", description);
}

function useCountUp(end, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime = null;
    let animationFrame;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  return count;
}

// --- COMPONENTS ---
function StatCard({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const count = useCountUp(value, 2000, inView);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="text-center"
    >
      <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-widest mt-1">{label}</div>
    </motion.div>
  );
}

function WorldMap() {
  return (
    <div className="w-full relative aspect-square max-w-[500px] mx-auto overflow-hidden rounded-3xl border border-white/5 bg-[#0a0f1c]">
      <div className="map-3d-container absolute inset-0">
        <div className="map-3d" />
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Digital Marketing Consultant | Pranjal Digital";
    setMeta("12+ Years of Digital Marketing Excellence. SEO, PPC, and Growth Strategy.");
  }, []);

  return (
    <div className="bg-[#080c14] text-white selection:bg-[#c9a84c]/30">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#c9a84c]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs md:text-sm font-medium tracking-wide">Namaste! I'm Pranjal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
          >
            12+ Years of Making <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f5d76e] to-[#c9a84c] bg-clip-text text-transparent shimmer-text">
              Digital Magic Happen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Helping 400+ businesses scale across 20+ countries. Consistently delivering 6X-7X ROAS through data-driven performance marketing and AI optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={CALENDLY} target="_blank" className="gold-bg w-full sm:w-auto px-10 py-5 rounded-2xl flex items-center justify-center gap-3">
              Book Free Strategy Call <ArrowRight size={20} />
            </a>
            <Link href="/services" className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all font-bold">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS STRIP ========== */}
      <section className="py-16 border-y border-white/5 bg-[#0a0f1c]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-4">
            <StatCard value={12} suffix="+" label="Years Experience" />
            <StatCard value={400} suffix="+" label="Happy Clients" />
            <StatCard value={20} suffix="+" label="Countries Served" />
            <StatCard value={5} suffix="M+" label="Revenue Generated" />
            <StatCard value={7} suffix="X" label="Avg ROAS" />
          </div>
        </div>
      </section>

      {/* ========== GLOBAL PRESENCE ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#c9a84c] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              <Globe size={14} /> Global Footprint
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Serving Clients in <span className="gold-gradient">20+ Nations</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Country Card */}
            <div className="bg-gradient-to-br from-[#0a0f1c] to-[#080c14] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={200} />
              </div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-white/80 font-medium">
                  <div className="flex items-center gap-3">🇺🇸 <span className="text-sm md:text-base">United States</span></div>
                  <div className="flex items-center gap-3">🇬🇧 <span className="text-sm md:text-base">United Kingdom</span></div>
                  <div className="flex items-center gap-3">🇨🇦 <span className="text-sm md:text-base">Canada</span></div>
                  <div className="flex items-center gap-3">🇦🇪 <span className="text-sm md:text-base">UAE</span></div>
                  <div className="flex items-center gap-3">🇸🇬 <span className="text-sm md:text-base">Singapore</span></div>
                  <div className="flex items-center gap-3">🇮🇳 <span className="text-sm md:text-base">India</span></div>
                  <div className="flex items-center gap-3">🇦🇺 <span className="text-sm md:text-base">Australia</span></div>
                  <div className="flex items-center gap-3">🇩🇪 <span className="text-sm md:text-base">Germany</span></div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">400+</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Global Projects</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#c9a84c]">24/7</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Global Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <WorldMap />
          </div>
        </div>
      </section>

      {/* Cost Calculator or Other Sections would follow... */}
    </div>
  );
}
