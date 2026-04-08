import FunnelPyramid from "../components/FunnelPyramid";
import CostCalculator from "../components/CostCalculator";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, ChevronDown, Play, TrendingUp, Users, Globe,
  DollarSign, BarChart3, Search, Target, Share2, Building2, Cpu, Mail,
  Star, Zap, Shield, Clock, PhoneCall, X, Check, Award, Briefcase,
  Sparkles, Heart, Coffee, Smile, ThumbsUp, Rocket as RocketIcon,
  Layers, Palette, Grid, Circle, Triangle, Hexagon, Instagram, Facebook,
  Linkedin, Youtube, Twitter, PenTool, Megaphone, LineChart, PieChart,
  Settings, Map, Navigation, Compass, Activity, Eye, Mic, Bot, Brain,
  MapPin, Package
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

function setMeta(description) {
  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", description);
}

// Custom hook for counting animation
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
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  return count;
}

function StatCard({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const count = useCountUp(value, 2000, inView);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="text-center p-4 rounded-2xl bg-white/5 border border-white/5"
    >
      <div className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f0d282] bg-clip-text text-transparent mb-1">
        {count}{suffix}
      </div>
      <div className="text-white/50 text-[10px] md:text-xs font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

function WorldMap() {
  return (
    <div className="w-full max-w-[500px] mx-auto overflow-hidden">
      <div className="map-3d-container">
        <div className="map-3d" />
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Digital Marketing Consultant | Pranjal Digital";
    setMeta("Work with a digital marketing consultant offering SEO, Google Ads, Meta Ads, and full-funnel strategies.");
  }, []);

  return (
    <div className="bg-[#080c14] overflow-x-hidden">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080c14] via-[#0a0f1c] to-[#080c14]" />
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#c9a84c]/5 blur-[80px] md:blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a84c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a84c]"></span>
            </span>
            <span className="text-[#c9a84c] text-xs md:text-sm font-medium">Namaste! I'm Pranjal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white"
          >
            12+ Years of Making <br />
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f0d282] to-[#c9a84c] bg-clip-text text-transparent">
              Digital Magic Happen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I help businesses grow online across 20+ countries. Generated millions in revenue with consistent 6X-7X ROAS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={CALENDLY} target="_blank" className="w-full sm:w-auto bg-[#c9a84c] text-[#080c14] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              Book Free Call <ArrowRight size={18} />
            </a>
            <Link href="/services" className="w-full sm:w-auto border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-center">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-12 border-y border-white/5 bg-[#0a0f1c]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            <StatCard value={12} suffix="+" label="Years Exp" />
            <StatCard value={400} suffix="+" label="Happy Clients" />
            <StatCard value={20} suffix="+" label="Countries" />
            <StatCard value={5} suffix="M+" label="Revenue" />
            <StatCard value={7} suffix="X" label="Avg ROAS" />
          </div>
        </div>
      </section>

      {/* ========== GLOBAL PRESENCE ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Global Presence</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Results delivered across diverse markets and consumer behaviors.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-[#0a0f1c] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Globe size={120} /></div>
              <h3 className="text-[#c9a84c] font-bold text-sm uppercase mb-6 tracking-widest">Global Markets</h3>
              
              <div className="grid grid-cols-2 gap-4 text-white/70 text-sm mb-8">
                <div className="flex items-center gap-2">🇺🇸 <span>USA</span></div>
                <div className="flex items-center gap-2">🇬🇧 <span>UK</span></div>
                <div className="flex items-center gap-2">🇨🇦 <span>Canada</span></div>
                <div className="flex items-center gap-2">🇦🇺 <span>Australia</span></div>
                <div className="flex items-center gap-2">🇮🇳 <span>India</span></div>
                <div className="flex items-center gap-2">🇦🇪 <span>UAE</span></div>
              </div>

              <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">400+</div>
                  <div className="text-[10px] text-white/40">PROJECTS</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">20+</div>
                  <div className="text-[10px] text-white/40">REGIONS</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">24/7</div>
                  <div className="text-[10px] text-white/40">SUPPORT</div>
                </div>
              </div>
            </div>
            
            <WorldMap />
          </div>
        </div>
      </section>

    </div>
  );
}
