import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone, Calendar, CheckCircle2, ChevronRight, Play, Star,
  TrendingUp, Clock, Headphones, Shield, Zap, Users,
  MessageSquare, Briefcase, DollarSign, ChevronDown,
  ArrowRight, Sparkles, Smartphone, Monitor, Database,
  Award, HeartHandshake, BarChart3, Timer, Mail, Mic,
  Video, X, Menu, ExternalLink, CircleCheckBig, Loader2,
  PhoneCall, CalendarDays, Clock3, BellRing, User, Building2,
  Globe, PhoneForwarded, CreditCard, Check, AlertCircle,
  ThumbsUp, XCircle, ArrowLeft, ArrowRight as ArrowRightIcon,
  Crown, Gem, Rocket, Target, Brain, Bot, Headset, Volume2,
  Wifi, Cloud, ShieldCheck, Gift, FastForward, Layers,
  Info, Eye, TrendingUp as TrendingIcon, DollarSign as DollarIcon,
  VolumeX, Volume1, Volume2 as Volume2Icon
} from 'lucide-react';

// --- Configuration ---
const FORM_SUBMIT_URL = "https://formsubmit.co/pranjallundefined@gmail.com";

// --- Helper Components ---
const SectionWrapper = ({ children, className = "", id }) => (
  <section id={id} className={`relative overflow-hidden ${className}`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {children}
    </div>
  </section>
);

const SectionHeader = ({ badge, title, description, center = true }) => (
  <div className={`mb-10 md:mb-14 ${center ? 'text-center' : ''}`}>
    {badge && (
      <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-1.5 rounded-full mb-4">
        <Sparkles size={14} className="text-[#c9a84c]" />
        <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">{badge}</span>
      </span>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
      {title}
    </h2>
    {description && (
      <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">
        {description}
      </p>
    )}
  </div>
);

// --- CTA Button Component ---
const CTAButtons = ({ onDemoClick, onTrialClick, variant = "default", className = "" }) => {
  if (variant === "small") {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 justify-center ${className}`}>
        <button onClick={onDemoClick} className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2.5 px-5 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all flex items-center justify-center gap-2 text-sm">
          <Calendar size={14} /> Book a Demo
        </button>
        <button onClick={onTrialClick} className="bg-white/10 border border-white/20 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm">
          <Rocket size={14} /> 7-Day Free Trial
        </button>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
      <button onClick={onDemoClick} className="group bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-[#c9a84c]/40 transition-all duration-300 flex items-center justify-center gap-2">
        <Calendar size={18} /> Book a Demo
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <button onClick={onTrialClick} className="bg-white/10 border border-white/20 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/20 hover:border-[#c9a84c]/40 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
        <Rocket size={18} /> Get 7-Day Free Trial
      </button>
    </div>
  );
};

// --- Free Trial Modal Component with Clear X Button ---
const FreeTrialModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const aiOptions = [
    "24/7 Appointment Booking",
    "Patient FAQ & Questions",
    "Emergency Triage",
    "Insurance Verification",
    "Prescription Refills",
    "Payment Processing"
  ];

  const crmOptions = [
    "Open Dental",
    "Dentrix",
    "Eaglesoft",
    "Curve Dental",
    "We don't have a CRM (Need free implementation)",
    "Other (Looking to implement)"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    
    try {
      await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#c9a84c]/30 shadow-2xl"
      >
        {/* Prominent X button at top right */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 flex items-center justify-center text-white hover:text-white transition-all duration-300 group"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <input type="hidden" name="_subject" value="7-Day Free Trial Request - Dental Voice AI" />
            <input type="hidden" name="_next" value="https://pranjaldigital.com/thank-you" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                <Gem size={32} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Start Your 7-Day Free Trial</h3>
              <p className="text-white/50 text-sm">Fill out the form below and we'll activate your trial within 24 hours.</p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs mb-1 font-medium">Doctor Name *</label>
                  <input required name="doctor_name" placeholder="Dr. John Smith" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1 font-medium">Clinic Name *</label>
                  <input required name="clinic_name" placeholder="Smith Dental Care" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-1 font-medium">Email Address *</label>
                <input required type="email" name="email" placeholder="dr.smith@dentalcare.com" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all" />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-1 font-medium">Phone Number *</label>
                <div className="flex gap-2">
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-28 bg-[#080c14] border border-white/10 text-white rounded-xl px-3 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                  <input required name="phone" type="tel" placeholder="(555) 000-9999" className="flex-1 bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2 font-medium">What AI Voice Assistant Solutions are you looking for? *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {aiOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" name="ai_solutions" value={option} className="rounded border-white/20 bg-[#080c14] text-[#c9a84c] focus:ring-[#c9a84c]/20" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2 font-medium">Your Existing CRM *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {crmOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer hover:text-white transition-colors">
                      <input type="radio" name="crm" value={option} required className="border-white/20 bg-[#080c14] text-[#c9a84c] focus:ring-[#c9a84c]/20" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <p className="text-[#c9a84c]/70 text-xs mt-2 flex items-center gap-1">
                  <Gift size={10} /> Free CRM implementation included!
                </p>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-1 font-medium">Tell us about your AI Voice Assistant requirements *</label>
                <textarea 
                  required 
                  name="requirements" 
                  rows={4}
                  placeholder="Describe your clinic's needs, call volume, peak hours, and any specific features you're looking for..."
                  className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 text-base"
              >
                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : <>Request 7-Day Trial Now <Rocket size={18} /></>}
              </button>
              <p className="text-white/30 text-xs text-center">No credit card required • Cancel anytime • Free setup included</p>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-6"
            >
              <Check size={48} className="text-[#c9a84c]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">Trial Request Received!</h3>
            <p className="text-white/60">Thank you! We'll contact you within 24 hours to activate your 7-day free trial.</p>
            <button onClick={onClose} className="mt-6 text-[#c9a84c] text-sm">Close</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- Stable AI Work Animation (No CLS) ---
const AIWorkAnimation = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-6 border border-white/10">
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-2 bg-[#c9a84c]/20 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[#c9a84c] text-xs font-medium">AI ACTIVE 24/7</span>
        </span>
      </div>
      
      {/* Fixed layout using CSS Grid with fixed heights - No shifting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* Step 1: Incoming Call */}
        <div className="bg-white/5 rounded-xl p-4 text-center min-h-[140px]">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
            <PhoneCall size={22} className="text-blue-400" />
          </div>
          <p className="text-white/80 text-sm font-medium">Incoming Call</p>
          <p className="text-white/40 text-xs">Patient calling...</p>
          <div className="mt-2 flex justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Arrow - static */}
        <div className="hidden md:flex items-center justify-center">
          <ArrowRightIcon size={28} className="text-[#c9a84c]" />
        </div>
        <div className="flex md:hidden justify-center my-1">
          <ChevronDown size={20} className="text-[#c9a84c]" />
        </div>

        {/* Step 2: AI Voice Agent */}
        <div className="bg-gradient-to-br from-[#c9a84c]/10 to-transparent border border-[#c9a84c]/30 rounded-xl p-4 text-center min-h-[140px]">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full bg-[#c9a84c]/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-1 rounded-full bg-[#c9a84c]/30 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-[#c9a84c]/40 flex items-center justify-center">
              <Mic size={18} className="text-white" />
            </div>
          </div>
          <div className="flex justify-center gap-0.5 mt-2">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [6, 16, 6] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-[#c9a84c] rounded-full"
                style={{ height: 6 }}
              />
            ))}
          </div>
          <p className="text-[#c9a84c] text-sm font-semibold mt-1">AI Voice Agent</p>
          <p className="text-white/40 text-xs">Analyzing & Responding</p>
        </div>

        {/* Arrow - static */}
        <div className="hidden md:flex items-center justify-center">
          <ArrowRightIcon size={28} className="text-[#c9a84c]" />
        </div>
        <div className="flex md:hidden justify-center my-1">
          <ChevronDown size={20} className="text-[#c9a84c]" />
        </div>

        {/* Step 3: Appointment Booked */}
        <div className="bg-white/5 rounded-xl p-4 text-center min-h-[140px]">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-2">
            <Calendar size={22} className="text-green-400" />
          </div>
          <p className="text-white/80 text-sm font-medium">Appointment Booked</p>
          <p className="text-white/40 text-xs">CRM Updated</p>
          <div className="mt-2">
            <CheckCircle2 size={14} className="text-green-400 mx-auto" />
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 text-center">
        <p className="text-white/40 text-xs flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1"><Clock size={10} /> Answers instantly</span>
          <span className="flex items-center gap-1"><Zap size={10} /> 24/7 availability</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={10} /> Never misses a call</span>
        </p>
      </div>
    </div>
  );
};

// --- Typing Effect Component for Hero ---
const TypingEffect = () => {
  const phrases = [
    "After Clinic Hours",
    "During Lunch Break",
    "When Reception is Busy",
    "On Weekends",
    "During Peak Hours"
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timer;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        if (displayText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }, 80);
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent mt-2 min-h-[60px] md:min-h-[80px]">
      {displayText}
      <span className="inline-block w-0.5 h-6 md:h-8 bg-[#c9a84c] ml-1 animate-pulse" />
    </span>
  );
};

// --- Video Section with Auto-Play and Live Call Indicator ---
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView && videoRef.current && !isPlaying) {
      // Auto-play when in view
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Auto-play was prevented, user needs to click
          console.log("Auto-play prevented");
        });
      }
    }
  }, [isInView, isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a84c]/40 to-[#c9a84c]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#0d1220]">
        {/* Live indicator */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0 left-0" />
          </div>
          <span className="text-white text-xs font-medium tracking-wider">LIVE CALL IN ACTION</span>
        </div>
        
        {/* Mute button */}
        <button
          onClick={handleMuteToggle}
          className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
        >
          {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume2Icon size={16} className="text-white" />}
        </button>

        <div className="relative aspect-video bg-black/50">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            preload="auto"
            loop
            muted={isMuted}
            playsInline
            onLoadedData={() => setIsLoaded(true)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/videos/dental-ai-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play/Pause overlay button */}
          {!isPlaying && isLoaded && (
            <button
              onClick={handlePlayPause}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#c9a84c]/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#c9a84c] transition-all duration-300"
            >
              <Play size={24} className="text-[#080c14] ml-1" />
            </button>
          )}
          
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1c]">
              <div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mt-5">
        <p className="text-white/80 text-sm md:text-base font-medium flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Watch a real patient book an appointment via AI (35 sec)
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs">
          <span className="flex items-center gap-1 text-white/40"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Real call recording</span>
          <span className="flex items-center gap-1 text-white/40"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Real appointment booking</span>
          <span className="flex items-center gap-1 text-white/40"><CheckCircle2 size={10} className="text-[#c9a84c]" /> No human involved</span>
        </div>
        <p className="text-white/30 text-xs mt-3 max-w-2xl mx-auto">See how our AI handles a real patient call from start to finish - natural conversation, real-time scheduling, and automatic CRM update.</p>
      </div>
    </motion.div>
  );
};

// --- Premium How It Works Section ---
const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [controls, isInView]);

  const steps = [
    { number: "01", icon: PhoneCall, title: "Patient Calls", description: "Patient calls your existing clinic number. AI answers instantly, 24/7/365.", features: ["No app download", "Same number", "Instant response"] },
    { number: "02", icon: Bot, title: "AI Agent Answers", description: "AI understands patient needs, checks real-time availability, books appointments naturally.", features: ["Natural conversation", "Real-time sync", "Smart scheduling"] },
    { number: "03", icon: Database, title: "CRM Updated", description: "Patient details saved, appointment logged, and follow-ups automated seamlessly.", features: ["Auto-sync", "Smart reminders", "Patient insights"] }
  ];

  return (
    <div ref={ref} className="relative py-6">
      <div className="grid md:grid-cols-3 gap-5">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.15 } } }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <motion.div
              animate={{
                scale: activeStep === idx ? [1, 1.02, 1] : 1,
                boxShadow: activeStep === idx ? "0 10px 30px rgba(201,168,76,0.15)" : "none",
                borderColor: activeStep === idx ? "#c9a84c" : "rgba(255,255,255,0.1)"
              }}
              transition={{ duration: 0.5, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border rounded-xl p-5 relative overflow-hidden h-full"
            >
              {activeStep === idx && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center">
                  <step.icon size={20} className="text-[#c9a84c]" />
                </div>
                <span className="text-3xl font-bold text-white/5">{step.number}</span>
              </div>

              <div className="mt-3">
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.features.map((feature, fIdx) => (
                    <span key={fIdx} className="text-[#c9a84c]/50 text-[10px] bg-[#c9a84c]/5 px-2 py-0.5 rounded-full">{feature}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {idx < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <motion.div
                  animate={{ x: activeStep === idx ? [0, 4, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: activeStep === idx ? Infinity : 0 }}
                >
                  <ArrowRightIcon size={20} className="text-[#c9a84c]/40" />
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${activeStep === idx ? 'w-6 bg-[#c9a84c]' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Human + AI Collaboration Section ---
const CollaborationSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-6 border border-white/10">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-3 py-1 rounded-full mb-3">
            <HeartHandshake size={12} className="text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-[10px] font-medium">Human + AI Collaboration</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">We Don't Replace Your Receptionist — We Empower Them</h3>
          <p className="text-white/60 text-sm mb-4">
            Your receptionist is the heart of your practice. But no human can work 24/7/365. 
            Our AI voice agent steps in when your team is unavailable — after hours, during lunch breaks, 
            or when they're busy with other patients.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-2.5">
              <Clock size={14} className="text-[#c9a84c] mb-1" />
              <p className="text-white/70 text-xs font-medium">After Hours Coverage</p>
              <p className="text-white/30 text-[10px]">Never miss a call at night</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2.5">
              <Users size={14} className="text-[#c9a84c] mb-1" />
              <p className="text-white/70 text-xs font-medium">Reduce Burnout</p>
              <p className="text-white/30 text-[10px]">Let AI handle the overflow</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-3xl" />
          <div className="relative bg-gradient-to-br from-[#c9a84c]/10 to-[#080c14] border border-[#c9a84c]/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                  <Bot size={12} className="text-[#c9a84c]" />
                </div>
                <span className="text-white/70 text-[10px]">AI Agent</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-2"><p className="text-white/60 text-[10px]">AI: "Dr. Smith is busy. Can I help book an appointment?"</p></div>
              <div className="bg-[#c9a84c]/10 rounded-lg p-2"><p className="text-[#c9a84c] text-[10px]">Patient: "Yes, I need a cleaning next week."</p></div>
              <div className="bg-white/5 rounded-lg p-2"><p className="text-white/60 text-[10px]">AI: "Tuesday at 2pm works. I'll book it and add you to the system."</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Pricing Comparison Table ---
const PricingSection = ({ onFreeTrialClick }) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Our Plan */}
        <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border-2 border-[#c9a84c]/50 rounded-xl p-5 shadow-xl shadow-[#c9a84c]/15">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
            OUR PLAN
          </div>
          <div className="relative text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-[#c9a84c]/20 flex items-center justify-center mb-3">
              <Crown size={18} className="text-[#c9a84c]" />
            </div>
            <h3 className="text-lg font-bold text-white">DentalVoiceAI</h3>
            <div className="mt-3 mb-1">
              <span className="text-3xl font-bold text-[#c9a84c]">$49.99</span>
              <span className="text-white/40 text-sm">/month</span>
            </div>
            <p className="text-[#c9a84c] text-[10px] mb-3">+ nominal per-call fee for high volumes</p>
            <ul className="space-y-1.5 text-left mt-4 mb-4">
              <li className="flex items-center gap-2 text-white/80 text-xs"><CheckCircle2 size={10} className="text-[#c9a84c]" /> No setup fees</li>
              <li className="flex items-center gap-2 text-white/80 text-xs"><CheckCircle2 size={10} className="text-[#c9a84c]" /> 24/7/365 availability</li>
              <li className="flex items-center gap-2 text-white/80 text-xs"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Free CRM integration</li>
              <li className="flex items-center gap-2 text-white/80 text-xs"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Low latency response</li>
            </ul>
            <button 
              onClick={onFreeTrialClick}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 rounded-lg hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all text-sm"
            >
              Start Free Trial
            </button>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-xl p-5">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-white/5 flex items-center justify-center mb-3">
              <AlertCircle size={18} className="text-white/40" />
            </div>
            <h3 className="text-lg font-bold text-white/60">Other AI Voice Agents</h3>
            <div className="mt-3 mb-1">
              <span className="text-2xl font-bold text-white/40">$200+</span>
              <span className="text-white/30 text-sm">/month</span>
            </div>
            <ul className="space-y-1.5 text-left mt-4 mb-4">
              <li className="flex items-center gap-2 text-white/40 text-xs"><X size={10} className="text-red-400" /> High setup fees ($500+)</li>
              <li className="flex items-center gap-2 text-white/40 text-xs"><X size={10} className="text-red-400" /> Expensive per-call charges</li>
              <li className="flex items-center gap-2 text-white/40 text-xs"><X size={10} className="text-red-400" /> Slow response time</li>
              <li className="flex items-center gap-2 text-white/40 text-xs"><X size={10} className="text-red-400" /> Long-term contracts</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-white/40 text-[10px] flex items-center justify-center gap-1">
          <Info size={10} /> Pricing varies based on call volume and custom AI workflows. Contact us for enterprise pricing.
        </p>
      </div>
    </div>
  );
};

// --- Calendly Section (Scroll to) ---
const CalendlySection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} id="calendly-section" className="scroll-mt-20">
      <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-6 border border-white/10">
        <div className="text-center mb-5">
          <h3 className="text-xl font-bold text-white mb-1">Schedule Your Free Demo</h3>
          <p className="text-white/50 text-xs">Choose a time that works for you. 30-min personalized walkthrough.</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/10 min-h-[550px] relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1c]">
              <div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
            </div>
          )}
          <iframe 
            src="https://calendly.com/pranjaldigital-info/30min?embed_domain=pranjaldigital.com&embed_type=Inline&hide_gdpr_banner=1"
            width="100%" 
            height="600" 
            frameBorder="0" 
            className={`bg-white transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            title="Calendly Booking"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

// --- Animated Hero Component ---
const AnimatedHero = ({ onFreeTrialClick, onDemoClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      className="relative min-h-[85vh] flex items-center pt-16 pb-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-80 h-80 rounded-full bg-[#c9a84c]/15 blur-[100px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`, top: '30%', left: '20%' }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full bg-[#c9a84c]/10 blur-[80px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`, bottom: '20%', right: '15%' }}
        />
      </div>

      <div className="relative text-center max-w-4xl mx-auto z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5 border border-[#c9a84c]/20">
            <Sparkles size={12} className="text-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-[10px] font-medium uppercase tracking-wider">The Smart AI Receptionist for Modern Dental Practices</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
        >
          Never Miss a Patient Call —
          <TypingEffect />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-sm md:text-base mb-5 max-w-2xl mx-auto"
        >
          AI Voice Receptionist that answers calls, books appointments, and updates your CRM automatically — so your team can focus on patients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6"
        >
          <DollarIcon size={14} className="text-[#c9a84c]" />
          <span className="text-white font-semibold text-xs">Starts at $49.99/month</span>
          <span className="text-white/40 text-[10px] mx-1">•</span>
          <span className="text-white/70 text-xs">7-day free trial</span>
          <span className="text-white/40 text-[10px] mx-1">•</span>
          <span className="text-white/70 text-xs">No setup fees</span>
        </motion.div>

        <CTAButtons onDemoClick={onDemoClick} onTrialClick={onFreeTrialClick} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-6 text-[10px] md:text-xs text-white/40"
        >
          <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Works with your existing number</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Setup in 24 hours</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> No technical skills needed</span>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function DentalVoiceAgentLanding() {
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const scrollToCalendly = () => {
    const element = document.getElementById('calendly-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqs = [
    { q: "How does the AI voice agent work with my existing phone number?", a: "Simply forward your clinic's number to us, or we provide a new local number. The AI answers instantly, 24/7, using your clinic's protocols. Setup takes less than 24 hours." },
    { q: "Will this replace my receptionist?", a: "No! We believe in human + AI collaboration. Your receptionist is invaluable for complex patient needs. Our AI steps in after hours, during lunch breaks, or when your team is busy — ensuring every call is answered." },
    { q: "Can it handle complex appointment scheduling?", a: "Absolutely. It checks real-time availability from your calendar, books, reschedules, and cancels appointments—all through natural conversation." },
    { q: "What CRMs do you integrate with?", a: "We integrate with all major dental CRMs including Open Dental, Dentrix, Eaglesoft, and Curve Dental. No CRM? We provide a simple one for free." },
  ];

  return (
    <div className="bg-[#080c14] min-h-screen font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <AnimatedHero onFreeTrialClick={() => setShowFreeTrial(true)} onDemoClick={scrollToCalendly} />

      {/* AI Work Animation */}
      <SectionWrapper className="pt-0 pb-6">
        <AIWorkAnimation />
      </SectionWrapper>

      {/* Video Section */}
      <SectionWrapper className="pt-0 pb-10">
        <VideoSection />
      </SectionWrapper>

      {/* CTA after Video */}
      <SectionWrapper className="pt-0 pb-6">
        <div className="text-center">
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Human + AI Collaboration Section */}
      <SectionWrapper className="py-8">
        <CollaborationSection />
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper id="how-it-works" className="py-8">
        <SectionHeader badge="Simple Process" title="How It Works" description="A 3-step system that turns missed calls into booked appointments" />
        <HowItWorksSection />
      </SectionWrapper>

      {/* CTA after How It Works */}
      <SectionWrapper className="pt-0 pb-6">
        <div className="text-center">
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Problem Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <SectionHeader badge="The Problem" title="Every Missed Call = Lost Revenue" description="You're losing patients daily without knowing it." center={false} />
            
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 font-bold text-center text-sm">Clinics lose 30–40% of calls</p>
              <p className="text-red-400/70 text-center text-[10px] mt-0.5">That's thousands in lost revenue every month</p>
            </div>

            <ul className="space-y-2">
              {["Patients call when you're busy with patients", "No one answers after clinic hours", "Reception mistakes lead to double-booking", "No call tracking means no follow-ups"].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 group">
                  <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={10} className="text-red-400" />
                  </div>
                  <span className="text-white/70 text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="relative bg-gradient-to-br from-red-500/10 to-[#080c14] border border-red-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/70 text-[10px] font-medium">Missed Call Dashboard</span>
                <span className="text-red-400 text-[8px] bg-red-500/20 px-1.5 py-0.5 rounded-full ml-auto">+127%</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { patient: "Sarah Johnson", time: "2:15 PM", value: "$450" },
                  { patient: "Michael Chen", time: "6:30 PM", value: "$320" },
                  { patient: "Dr. Emily Wilson", time: "8:45 AM", value: "$580" }
                ].map((call, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-2">
                    <div className="flex justify-between items-center">
                      <div><p className="text-white/80 text-[10px] font-medium">{call.patient}</p><p className="text-white/30 text-[8px]">{call.time}</p></div>
                      <div className="text-right"><p className="text-red-400/70 text-[10px]">-{call.value}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing" className="py-10">
        <SectionHeader badge="Simple Pricing" title="Simple, Affordable Pricing" description="Transparent pricing with no hidden fees." />
        <PricingSection onFreeTrialClick={() => setShowFreeTrial(true)} />
      </SectionWrapper>

      {/* CTA after Pricing */}
      <SectionWrapper className="pt-0 pb-6">
        <div className="text-center">
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Calendly Section */}
      <SectionWrapper className="py-8">
        <CalendlySection />
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-10">
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" description="Got questions? We've got answers." />
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-lg overflow-hidden hover:border-[#c9a84c]/30 transition-all">
              <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-3 text-left">
                <span className="text-white font-medium text-xs">{faq.q}</span>
                <ChevronDown size={12} className={`text-white/50 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="p-3 pt-0 text-white/50 text-[10px] border-t border-white/10">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper className="py-10">
        <div className="rounded-xl bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20 p-6 text-center">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">Ready to Never Miss a Patient Call Again?</h3>
          <p className="text-white/60 mb-5 text-sm">Join hundreds of dental practices automating their front desk.</p>
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Footer */}
      <div className="border-t border-white/10 py-5 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center">
                <Mic size={12} className="text-[#080c14]" />
              </div>
              <span className="text-white font-bold text-xs">Dental<span className="text-[#c9a84c]">Voice</span>AI</span>
            </div>
            <div className="text-white/40 text-[9px]">© 2024 DentalVoiceAI. AI Voice Receptionist for Dental Practices</div>
          </div>
        </div>
      </div>

      {/* Free Trial Modal */}
      <FreeTrialModal isOpen={showFreeTrial} onClose={() => setShowFreeTrial(false)} />
    </div>
  );
}
