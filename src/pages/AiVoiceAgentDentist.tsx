import React, { useState, useEffect, useRef } from 'react';
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
  VolumeX, Volume1, Radio, Signal, Headphones as HeadphonesIcon,
  Pause, UserCheck, Activity, Waves
} from 'lucide-react';

// --- Configuration ---
const FORM_SUBMIT_URL = "https://formsubmit.co/pranjallundefined@gmail.com";
const CALENDLY_URL = "https://calendly.com/pranjaldigital-info/30min";

// --- Helper Components ---
const SectionWrapper = ({ children, className = "", id }) => (
  <section id={id} className={`relative overflow-hidden ${className}`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {children}
    </div>
  </section>
);

const SectionHeader = ({ badge, title, description, center = true }) => (
  <div className={`mb-8 md:mb-12 ${center ? 'text-center' : ''}`}>
    {badge && (
      <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-3 py-1 rounded-full mb-3">
        <Sparkles size={12} className="text-[#c9a84c]" />
        <span className="text-[#c9a84c] text-[10px] md:text-xs font-medium uppercase tracking-wider">{badge}</span>
      </span>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
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

// --- Free Trial Modal Component ---
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
    "HubSpot",
    "Salesforce",
    "Open Dental",
    "Dentrix",
    "Eaglesoft",
    "Curve Dental",
    "Other (Please specify)",
    "We are looking to implement CRM"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-[#c9a84c]/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 right-0 z-20 flex justify-end p-4 bg-gradient-to-b from-[#0a0f1c] to-transparent">
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 flex items-center justify-center text-white hover:text-white transition-all duration-300 group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="px-6 pb-8">
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

            <div className="space-y-4">
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
                <div className="grid grid-cols-2 gap-2">
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
                  rows={3}
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

// --- AI Work Animation ---
const AIWorkAnimation = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl border border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div className="p-4 md:p-5 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
            <PhoneCall size={22} className="text-blue-400" />
          </div>
          <p className="text-white font-semibold text-sm">Incoming Call</p>
          <p className="text-white/40 text-xs">Patient calling...</p>
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        <div className="p-4 md:p-5 text-center bg-gradient-to-r from-[#c9a84c]/5 to-transparent">
          <div className="relative w-14 h-14 mx-auto mb-2">
            <div className="absolute inset-0 rounded-full bg-[#c9a84c]/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-1 rounded-full bg-[#c9a84c]/30" />
            <div className="absolute inset-2 rounded-full bg-[#c9a84c]/40 flex items-center justify-center">
              <Mic size={20} className="text-white" />
            </div>
          </div>
          <p className="text-[#c9a84c] font-semibold text-sm">AI Voice Agent</p>
          <p className="text-white/40 text-xs">Analyzing & Responding</p>
        </div>
        <div className="p-4 md:p-5 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-2">
            <Calendar size={22} className="text-green-400" />
          </div>
          <p className="text-white font-semibold text-sm">Appointment Booked</p>
          <p className="text-white/40 text-xs">CRM Updated</p>
          <CheckCircle2 size={14} className="text-green-400 mx-auto mt-2" />
        </div>
      </div>
      <div className="bg-white/5 py-2 text-center border-t border-white/10">
        <p className="text-white/40 text-[11px] flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1"><Clock size={10} /> Answers instantly</span>
          <span className="flex items-center gap-1"><Zap size={10} /> 24/7 availability</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={10} /> Never misses a call</span>
        </p>
      </div>
    </div>
  );
};

// --- Typing Effect Component ---
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

// --- Video Section with Auto-play and Pause Button ---
const VideoSection = ({ onDemoClick }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView && videoRef.current && !hasAutoPlayed) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasAutoPlayed(true);
      }).catch((error) => {
        console.log("Auto-play prevented:", error);
        setIsPlaying(false);
      });
    }
  }, [isInView, hasAutoPlayed]);

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a84c]/40 to-[#c9a84c]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#0d1220]">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0 left-0" />
          </div>
          <span className="text-white text-xs font-medium tracking-wider">🔴 WATCH LIVE DEMO</span>
        </div>
        
        <button
          onClick={handleMuteToggle}
          className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
        >
          {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume1 size={16} className="text-white" />}
        </button>

        <div className="relative aspect-video bg-black/50">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            preload="auto"
            loop
            muted={isMuted}
            playsInline
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/videos/dental-ai-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Large Play/Pause button - always visible */}
          <button
            onClick={handlePlayPause}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#c9a84c]/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#c9a84c] hover:scale-110 transition-all duration-300 shadow-2xl z-20"
          >
            {isPlaying ? <Pause size={28} className="text-[#080c14]" /> : <Play size={28} className="text-[#080c14] ml-1" />}
          </button>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-white/70 text-sm flex items-center justify-center gap-2">
          <Video size={14} className="text-[#c9a84c]" /> Watch Live AI Voice Assistant Product Demo Now
        </p>
      </div>

      <div className="text-center mt-5">
        <button
          onClick={onDemoClick}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 transform hover:scale-105"
        >
          Request Demo Call <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// --- Problem Section (Moved right below hero) ---
const ProblemSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#080c14] rounded-2xl p-6 md:p-8 border border-white/10">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full mb-3">
          <AlertCircle size={12} className="text-red-400" />
          <span className="text-red-400 text-xs font-medium uppercase tracking-wider">The Problem</span>
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Every Missed Call = Lost Revenue</h2>
        <p className="text-red-400 text-sm font-semibold">Clinics lose 30–40% of calls — that's thousands in lost revenue every month</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mt-6">
        <div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"><X size={16} className="text-red-400" /><span className="text-white/80 text-sm">Patients call when you're busy with other patients</span></li>
            <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"><X size={16} className="text-red-400" /><span className="text-white/80 text-sm">No one answers after clinic hours or on weekends</span></li>
            <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"><X size={16} className="text-red-400" /><span className="text-white/80 text-sm">Receptionist burnout and high turnover</span></li>
            <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"><X size={16} className="text-red-400" /><span className="text-white/80 text-sm">No call tracking means no follow-ups</span></li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/10 to-[#080c14] border border-red-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white/70 text-sm font-medium">Missed Calls This Week</span>
          </div>
          <div className="space-y-2">
            {[
              { patient: "Sarah Johnson", time: "2:15 PM", value: "$450" },
              { patient: "Michael Chen", time: "6:30 PM", value: "$320" },
              { patient: "Dr. Emily Wilson", time: "8:45 AM", value: "$580" }
            ].map((call, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <span className="text-white/80 text-sm font-medium">{call.patient}</span>
                  <p className="text-white/30 text-[10px]">{call.time}</p>
                </div>
                <span className="text-red-400/80 text-sm font-medium">-{call.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-red-500/20 rounded-lg text-center">
            <p className="text-red-400 text-sm font-bold">Total Lost: $1,350 this week</p>
            <p className="text-red-400/60 text-[10px] mt-1">That's over $5,400 per month!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Feature Cards Section ---
const FeatureCards = () => {
  const features = [
    { icon: Phone, title: "Answer 24/7", description: "Never miss a call, day or night" },
    { icon: Calendar, title: "Auto Booking", description: "Schedule appointments instantly" },
    { icon: Database, title: "CRM Sync", description: "Update patient records automatically" },
    { icon: MessageSquare, title: "Smart Questions", description: "Answer patient FAQs naturally" },
    { icon: BellRing, title: "Smart Reminders", description: "Reduce no-shows by 40%" },
    { icon: TrendingUp, title: "Revenue Recovery", description: "Capture every missed opportunity" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-xl p-3 text-center hover:border-[#c9a84c]/30 transition-all duration-300 group"
        >
          <div className="w-10 h-10 mx-auto rounded-lg bg-[#c9a84c]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <feature.icon size={18} className="text-[#c9a84c]" />
          </div>
          <p className="text-white text-xs font-medium">{feature.title}</p>
          <p className="text-white/30 text-[10px]">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// --- How It Works Section ---
const HowItWorksFlow = () => {
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
    { icon: PhoneCall, title: "Patient Calls", description: "Patient calls your existing clinic number. AI answers instantly, 24/7/365.", features: ["No app download", "Same number", "Instant response"], step: "01" },
    { icon: Bot, title: "AI Agent Answers", description: "AI understands patient needs, checks real-time availability, books appointments naturally.", features: ["Natural conversation", "Real-time sync", "Smart scheduling"], step: "02" },
    { icon: Database, title: "CRM Updated", description: "Patient details saved, appointment logged, and follow-ups automated seamlessly.", features: ["Auto-sync", "Smart reminders", "Patient insights"], step: "03" }
  ];

  return (
    <div ref={ref} className="relative py-6">
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.15 } } }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            {idx < 2 && (
              <div className="hidden md:block absolute top-1/3 -right-4 z-10">
                <motion.div animate={{ x: activeStep === idx ? [0, 5, 0] : 0 }} transition={{ duration: 0.6, repeat: activeStep === idx ? Infinity : 0 }}>
                  <ArrowRightIcon size={24} className="text-[#c9a84c]/50" />
                </motion.div>
              </div>
            )}
            <motion.div
              animate={{ scale: activeStep === idx ? [1, 1.02, 1] : 1, borderColor: activeStep === idx ? "#c9a84c" : "rgba(255,255,255,0.1)", boxShadow: activeStep === idx ? "0 10px 30px rgba(201,168,76,0.15)" : "none" }}
              transition={{ duration: 0.5, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border rounded-xl p-5 relative overflow-hidden h-full"
            >
              {activeStep === idx && <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} />}
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center"><step.icon size={20} className="text-[#c9a84c]" /></div>
                <span className="text-2xl font-bold text-white/10">{step.step}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/50 text-xs mb-3">{step.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-white/10">
                {step.features.map((feature, fIdx) => (<span key={fIdx} className="text-[#c9a84c]/60 text-[10px] bg-[#c9a84c]/5 px-2 py-0.5 rounded-full">{feature}</span>))}
              </div>
              {activeStep === idx && (<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1"><div className="w-1 h-1 rounded-full bg-[#c9a84c] animate-pulse" /><div className="w-1 h-1 rounded-full bg-[#c9a84c]/50 animate-pulse" style={{ animationDelay: '0.2s' }} /><div className="w-1 h-1 rounded-full bg-[#c9a84c]/30 animate-pulse" style={{ animationDelay: '0.4s' }} /></div>)}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, idx) => (<button key={idx} onClick={() => setActiveStep(idx)} className={`h-1 rounded-full transition-all duration-300 ${activeStep === idx ? 'w-6 bg-[#c9a84c]' : 'w-2 bg-white/20'}`} />))}
      </div>
    </div>
  );
};

// --- Human + AI Collaboration Section ---
const CollaborationSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-6 md:p-8 border border-white/10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-3 py-1 rounded-full mb-4">
            <HeartHandshake size={14} className="text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs font-medium">Human + AI Collaboration</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">We're Not Trying to Replace Your Receptionist — We're Empowering Them</h3>
          <p className="text-white/60 text-sm md:text-base mb-4">
            Your receptionist is the heart of your practice. But no human can work 24/7/365. 
            Unlike traditional voicemails or answering machines that just take messages, our AI Voice Agent 
            works <span className="text-[#c9a84c]">intelligently alongside your team</span> — handling routine calls, booking appointments, 
            and updating records while your receptionist focuses on complex patient needs.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/5 rounded-xl p-3"><TrendingUp size={16} className="text-[#c9a84c] mb-2" /><p className="text-white/80 text-sm font-medium">3x Higher Productivity</p><p className="text-white/30 text-xs">AI handles 70% of routine calls</p></div>
            <div className="bg-white/5 rounded-xl p-3"><UserCheck size={16} className="text-[#c9a84c] mb-2" /><p className="text-white/80 text-sm font-medium">Less Burnout</p><p className="text-white/30 text-xs">Receptionists focus on patients</p></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-3xl" />
          <div className="relative bg-gradient-to-br from-[#c9a84c]/10 to-[#080c14] border border-[#c9a84c]/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center"><Bot size={14} className="text-[#c9a84c]" /></div><span className="text-white/80 text-xs font-medium">AI Voice Agent</span></div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="text-white/40 text-[10px]">Active 24/7</span></div>
            </div>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-2"><p className="text-white/60 text-[11px]">AI: "Dr. Smith is with a patient. Can I help book an appointment?"</p></div>
              <div className="bg-[#c9a84c]/10 rounded-lg p-2"><p className="text-[#c9a84c] text-[11px]">Patient: "Yes, I need a cleaning next week."</p></div>
              <div className="bg-white/5 rounded-lg p-2"><p className="text-white/60 text-[11px]">AI: "Tuesday at 2pm works. I'll book it and add you to the system."</p></div>
              <div className="border-t border-white/10 pt-2 mt-2 text-center"><p className="text-white/30 text-[10px]">Seamless handoff to human during business hours</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Comparison Table ---
const ComparisonTable = () => {
  const comparisons = [
    { feature: "24/7 Availability", ai: true, voicemail: false, answering: false },
    { feature: "Instant Response", ai: true, voicemail: false, answering: false },
    { feature: "Books Appointments", ai: true, voicemail: false, answering: false },
    { feature: "Answers Patient Questions", ai: true, voicemail: false, answering: false },
    { feature: "Updates CRM Automatically", ai: true, voicemail: false, answering: false },
    { feature: "Reduces Receptionist Workload", ai: true, voicemail: false, answering: false },
    { feature: "Patient Satisfaction", ai: "High", voicemail: "Low", answering: "Medium" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-6 border border-white/10 overflow-x-auto">
      <h3 className="text-lg font-bold text-white text-center mb-6">Why AI Voice Agent is Better Than Traditional Voicemail or Answering Machines</h3>
      <table className="w-full min-w-[500px]">
        <thead><tr className="border-b border-white/10"><th className="text-left text-white/60 text-sm font-medium py-3 px-2">Feature</th><th className="text-center text-[#c9a84c] text-sm font-medium py-3 px-2">AI Voice Agent</th><th className="text-center text-white/40 text-sm font-medium py-3 px-2">Voicemail</th><th className="text-center text-white/40 text-sm font-medium py-3 px-2">Answering Machine</th></tr></thead>
        <tbody>
          {comparisons.map((item, idx) => (
            <tr key={idx} className="border-b border-white/5">
              <td className="text-white/70 text-sm py-3 px-2">{item.feature}</td>
              <td className="text-center py-3 px-2">{typeof item.ai === 'boolean' ? (item.ai ? <CheckCircle2 size={16} className="text-[#c9a84c] mx-auto" /> : <X size={14} className="text-red-400 mx-auto" />) : <span className="text-[#c9a84c] text-sm">{item.ai}</span>}</td>
              <td className="text-center py-3 px-2">{typeof item.voicemail === 'boolean' ? (item.voicemail ? <CheckCircle2 size={16} className="text-green-500/50 mx-auto" /> : <X size={14} className="text-red-400 mx-auto" />) : <span className="text-white/40 text-sm">{item.voicemail}</span>}</td>
              <td className="text-center py-3 px-2">{typeof item.answering === 'boolean' ? (item.answering ? <CheckCircle2 size={16} className="text-green-500/50 mx-auto" /> : <X size={14} className="text-red-400 mx-auto" />) : <span className="text-white/40 text-sm">{item.answering}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 p-4 bg-[#c9a84c]/10 rounded-lg text-center"><p className="text-[#c9a84c] text-sm font-medium">🎯 AI Voice Agent captures 3x more appointments than voicemail</p></div>
    </div>
  );
};

// --- Productivity Boost Section ---
const ProductivityBoost = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative"><div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-3xl" /><div className="relative bg-gradient-to-br from-red-500/10 to-[#080c14] border border-red-500/20 rounded-xl p-6"><div className="flex items-center gap-3 mb-4"><BarChart3 size={24} className="text-red-400" /><span className="text-white font-bold text-lg">Before AI Voice Agent</span></div><ul className="space-y-3"><li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Receptionist spends 4+ hours/day on calls</li><li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> 30-40% of after-hours calls go unanswered</li><li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Manual data entry into CRM</li><li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> High receptionist burnout & turnover</li></ul></div></div>
      <div className="relative"><div className="absolute inset-0 bg-gradient-to-l from-[#c9a84c]/20 to-transparent blur-3xl" /><div className="relative bg-gradient-to-br from-[#c9a84c]/10 to-[#080c14] border border-[#c9a84c]/20 rounded-xl p-6"><div className="flex items-center gap-3 mb-4"><TrendingUp size={24} className="text-[#c9a84c]" /><span className="text-white font-bold text-lg">After AI Voice Agent</span></div><ul className="space-y-3"><li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> AI handles 70% of routine calls</li><li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> 100% of after-hours calls answered</li><li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Automatic CRM updates</li><li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> 3x happier receptionists, lower turnover</li></ul></div></div>
    </div>
  );
};

// --- Solution Section ---
const SolutionSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-red-500/5 to-[#0a0f1c] border border-red-500/20 rounded-xl p-6"><div className="flex items-center gap-3 mb-4"><XCircle size={22} className="text-red-400" /><h3 className="text-white font-bold text-lg">Before AI</h3></div><ul className="space-y-3"><li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Missed calls after hours</li><li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Manual appointment booking</li><li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Lost revenue</li></ul></div>
      <div className="bg-gradient-to-br from-[#c9a84c]/10 to-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl p-6 relative overflow-hidden group"><div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/5 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" /><div className="flex items-center gap-3 mb-4"><ThumbsUp size={22} className="text-[#c9a84c]" /><h3 className="text-white font-bold text-lg">With AI</h3></div><ul className="space-y-3"><li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> AI answers instantly 24/7</li><li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Auto appointment booking</li><li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Capture every call</li></ul></div>
    </div>
  );
};

// --- Pricing Section ---
const PricingSection = ({ onFreeTrialClick }) => {
  return (
    <div><div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border-2 border-[#c9a84c]/50 rounded-xl p-6 shadow-xl shadow-[#c9a84c]/15"><div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-[11px] font-bold px-3 py-1 rounded-full">OUR PLAN</div><div className="relative text-center"><div className="w-12 h-12 mx-auto rounded-lg bg-[#c9a84c]/20 flex items-center justify-center mb-4"><Crown size={22} className="text-[#c9a84c]" /></div><h3 className="text-xl font-bold text-white">DentalVoiceAI</h3><div className="mt-4 mb-1"><span className="text-4xl font-bold text-[#c9a84c]">$49.99</span><span className="text-white/40 text-base">/month</span></div><p className="text-[#c9a84c] text-xs mb-4">+ nominal per-call fee for high volumes</p><ul className="space-y-2 text-left mt-5 mb-6"><li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={12} className="text-[#c9a84c]" /> No setup fees</li><li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={12} className="text-[#c9a84c]" /> 24/7 availability</li><li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Free CRM integration</li><li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Low latency response</li></ul><button onClick={onFreeTrialClick} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 rounded-lg hover:shadow-lg transition-all text-sm">Start Free Trial</button></div></div>
      <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-xl p-6"><div className="text-center"><div className="w-12 h-12 mx-auto rounded-lg bg-white/5 flex items-center justify-center mb-4"><AlertCircle size={22} className="text-white/40" /></div><h3 className="text-xl font-bold text-white/60">Other AI Voice Agents</h3><div className="mt-4 mb-1"><span className="text-3xl font-bold text-white/40">$200+</span><span className="text-white/30 text-base">/month</span></div><ul className="space-y-2 text-left mt-5 mb-6"><li className="flex items-center gap-2 text-white/40 text-sm"><X size={12} className="text-red-400" /> High setup fees ($500+)</li><li className="flex items-center gap-2 text-white/40 text-sm"><X size={12} className="text-red-400" /> Expensive per-call charges</li><li className="flex items-center gap-2 text-white/40 text-sm"><X size={12} className="text-red-400" /> Slow response time</li><li className="flex items-center gap-2 text-white/40 text-sm"><X size={12} className="text-red-400" /> Long-term contracts</li></ul></div></div>
    </div></div>
  );
};

// --- Calendly Section ---
const CalendlySection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div id="calendly-section" className="scroll-mt-20"><div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-6 border border-white/10"><div className="text-center mb-5"><h3 className="text-xl font-bold text-white mb-1">Schedule Your Free Demo</h3><p className="text-white/50 text-sm">Choose a time that works for you. 30-min personalized walkthrough.</p></div><div className="rounded-xl overflow-hidden border border-white/10 min-h-[550px] relative">{!isLoaded && (<div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1c]"><div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" /></div>)}<iframe src={CALENDLY_URL} width="100%" height="600" frameBorder="0" className={`bg-white transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} title="Calendly Booking" onLoad={() => setIsLoaded(true)} /></div></div></div>
  );
};

// --- Animated Hero Component with AI Voice Icon ---
const AnimatedHero = ({ onFreeTrialClick, onDemoClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => { const rect = e.currentTarget.getBoundingClientRect(); setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top }); };
  
  return (
    <div className="relative min-h-[85vh] flex items-center pt-16 pb-16 overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 overflow-hidden"><div className="absolute w-80 h-80 rounded-full bg-[#c9a84c]/15 blur-[100px] transition-transform duration-300 ease-out" style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`, top: '30%', left: '20%' }} /><div className="absolute w-64 h-64 rounded-full bg-[#c9a84c]/10 blur-[80px] transition-transform duration-300 ease-out" style={{ transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`, bottom: '20%', right: '15%' }} /></div>
      <div className="relative text-center max-w-4xl mx-auto z-10 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#c9a84c]/20">
            <Sparkles size={12} className="text-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-[10px] font-medium uppercase tracking-wider">Smart AI Receptionist for Dental Practices</span>
          </span>
          {/* AI Voice Icon with fast pulse animation */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center animate-pulse">
              <Activity size={16} className="text-[#c9a84c]" />
            </div>
            <div className="absolute -inset-1 rounded-full bg-[#c9a84c]/30 animate-ping opacity-75" style={{ animationDuration: '0.8s' }} />
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">Never Miss a Patient Call —<TypingEffect /></motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-white/60 text-sm md:text-base mb-5 max-w-2xl mx-auto">AI Voice Receptionist that answers calls, books appointments, and updates your CRM automatically.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="inline-flex flex-wrap items-center justify-center gap-2 bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6"><DollarIcon size={14} className="text-[#c9a84c]" /><span className="text-white font-semibold text-xs">Starts at $49.99/month</span><span className="text-white/40 text-[10px] mx-1">•</span><span className="text-white/70 text-xs">7-day free trial</span><span className="text-white/40 text-[10px] mx-1">•</span><span className="text-white/70 text-xs">No setup fees</span></motion.div>
        <CTAButtons onDemoClick={onDemoClick} onTrialClick={onFreeTrialClick} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap justify-center gap-4 mt-6 text-[10px] md:text-xs text-white/40"><span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Works with your number</span><span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Setup in 24 hours</span><span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> No technical skills</span></motion.div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function DentalVoiceAgentLanding() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const scrollToCalendly = () => { const element = document.getElementById('calendly-section'); if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };

  const faqs = [
    { q: "How does the AI work with my existing phone number?", a: "Simply forward your clinic's number to us. The AI answers instantly, 24/7. Setup takes less than 24 hours." },
    { q: "Will this replace my receptionist?", a: "No! We believe in human + AI collaboration. Our AI steps in after hours, during lunch breaks, or when your team is busy." },
    { q: "Can it handle complex appointment scheduling?", a: "Absolutely. It checks real-time availability from your calendar and books appointments naturally." },
    { q: "What CRMs do you integrate with?", a: "We integrate with HubSpot, Salesforce, Open Dental, Dentrix, Eaglesoft, and more. No CRM? We provide one for free." },
  ];

  return (
    <div className="bg-[#080c14] min-h-screen font-sans antialiased overflow-x-hidden">
      <AnimatedHero onFreeTrialClick={() => setShowFreeTrial(true)} onDemoClick={scrollToCalendly} />
      
      {/* Problem Section - Right Below Hero */}
      <SectionWrapper className="pt-0 pb-8">
        <ProblemSection />
      </SectionWrapper>

      {/* AI Work Animation */}
      <SectionWrapper className="pt-0 pb-8">
        <AIWorkAnimation />
      </SectionWrapper>

      {/* Feature Cards */}
      <SectionWrapper className="pt-0 pb-8">
        <FeatureCards />
      </SectionWrapper>

      {/* Video Section */}
      <SectionWrapper className="pt-0 pb-12">
        <VideoSection onDemoClick={scrollToCalendly} />
      </SectionWrapper>

      {/* CTA after Video */}
      <SectionWrapper className="pt-0 pb-6">
        <div className="text-center">
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Collaboration Section */}
      <SectionWrapper className="py-8">
        <CollaborationSection />
      </SectionWrapper>

      {/* Comparison Table */}
      <SectionWrapper className="py-8">
        <ComparisonTable />
      </SectionWrapper>

      {/* Productivity Boost */}
      <SectionWrapper className="py-8">
        <ProductivityBoost />
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper id="how-it-works" className="py-8">
        <SectionHeader badge="Simple Process" title="How It Works" description="A 3-step system that turns missed calls into booked appointments" />
        <HowItWorksFlow />
      </SectionWrapper>

      {/* CTA after How It Works */}
      <SectionWrapper className="pt-0 pb-6">
        <div className="text-center">
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Solution Section */}
      <SectionWrapper className="py-12">
        <SectionHeader badge="The Solution" title="Your 24/7 AI Receptionist That Converts Calls" center={true} />
        <SolutionSection />
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing" className="py-12">
        <SectionHeader badge="Simple Pricing" title="Simple, Affordable Pricing" />
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
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-12">
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
              <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-4 text-left">
                <span className="text-white font-medium text-sm">{faq.q}</span>
                <ChevronDown size={14} className={`text-white/50 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-4 pt-0 text-white/50 text-xs border-t border-white/10">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper className="py-12">
        <div className="rounded-xl bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20 p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Ready to Never Miss a Patient Call Again?</h3>
          <p className="text-white/60 mb-6 text-sm">Join hundreds of dental practices automating their front desk with our AI voice agent.</p>
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Footer */}
      <div className="border-t border-white/10 py-6 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center">
              <Mic size={14} className="text-[#080c14]" />
            </div>
            <span className="text-white font-bold text-sm">Dental<span className="text-[#c9a84c]">Voice</span>AI</span>
          </div>
          <div className="text-white/40 text-[11px]">© 2024 DentalVoiceAI. AI Voice Receptionist for Dental Practices</div>
        </div>
      </div>

      {/* Calendly Modal */}
      <AnimatePresence>
        {showCalendly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#080c14] rounded-2xl w-full max-w-4xl h-[85vh] overflow-hidden border border-[#c9a84c]/30 shadow-2xl">
              <button onClick={() => setShowCalendly(false)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors border border-white/10"><X size={20} /></button>
              <iframe src={CALENDLY_URL} width="100%" height="100%" frameBorder="0" className="bg-white" title="Calendly Booking" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Free Trial Modal */}
      <FreeTrialModal isOpen={showFreeTrial} onClose={() => setShowFreeTrial(false)} />
    </div>
  );
}
