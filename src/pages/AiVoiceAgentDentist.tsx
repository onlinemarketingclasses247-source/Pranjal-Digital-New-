import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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
  Pause, Activity, UserCheck, PieChart, LineChart, BarChart as BarChartIcon,  
  HeadsetIcon
} from 'lucide-react';

// --- Configuration ---
const FORM_SUBMIT_URL = "https://formsubmit.co/pranjallundefined@gmail.com";
const CALENDLY_URL = "https://calendly.com/pranjaldigital-info/30min";

// --- Country Codes ---
const countryCodesList = [
  { code: "+1", country: "United States/Canada", flag: "🇺🇸🇨🇦" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+673", country: "Brunei", flag: "🇧🇳" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+1", country: "Other (International)", flag: "🌍" }
];

// --- Helper Components ---
const SectionWrapper = ({ children, className = "", id }) => (
  <section id={id} className={`relative overflow-hidden ${className}`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {children}
    </div>
  </section>
);

const SectionHeader = ({ badge, title, description, center = true }) => (
  <div className={`mb-6 md:mb-10 ${center ? 'text-center' : ''}`}>
    {badge && (
      <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-3 py-1 rounded-full mb-3">
        <Sparkles size={12} className="text-[#c9a84c]" />
        <span className="text-[#c9a84c] text-[10px] md:text-xs font-medium uppercase tracking-wider">{badge}</span>
      </span>
    )}
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
      {title}
    </h2>
    {description && (
      <p className="text-white/50 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
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
        <button onClick={onDemoClick} className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
          <Calendar size={14} /> Book a Demo
        </button>
        <button onClick={onTrialClick} className="bg-white/10 border border-white/20 text-white font-bold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
          <Rocket size={14} /> 7-Day Free Trial
        </button>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
      <button onClick={onDemoClick} className="group bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl hover:shadow-2xl hover:shadow-[#c9a84c]/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
        <Calendar size={16} /> Book a Demo
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <button onClick={onTrialClick} className="bg-white/10 border border-white/20 text-white font-bold py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl hover:bg-white/20 hover:border-[#c9a84c]/40 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm text-sm sm:text-base">
        <Rocket size={16} /> Get 7-Day Free Trial
      </button>
    </div>
  );
};

// --- Free Trial Modal Component ---
const FreeTrialModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [selectedCountryLabel, setSelectedCountryLabel] = useState("United States/Canada");

  const aiOptions = [
    "24/7 Appointment Booking",
    "Patient FAQ & Questions",
    "Emergency Triage",
    "Insurance Verification",
    "Prescription Refills",
    "Payment Processing",
    "All of the above features"
  ];

  const crmOptions = [
    "HubSpot",
    "Salesforce",
    "Open Dental",
    "Dentrix",
    "Eaglesoft",
    "Curve Dental",
    "Other",
    "We are looking to implement CRM"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("country_code", selectedCountryCode);
    formData.append("country_name", selectedCountryLabel);
    
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

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#c9a84c]/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="sticky top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#0a0f1c] to-transparent pt-12 sm:pt-4 pb-2 px-5 sm:px-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={onClose} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-white hover:text-white transition-all duration-300 group"
              aria-label="Close modal"
            >
              <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-xs font-medium">Close</span>
            </button>
            <div className="w-20"></div>
          </div>
        </div>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="px-5 pb-8 sm:px-6 pt-2">
            <input type="hidden" name="_subject" value="7-Day Free Trial Request - Dental Voice AI" />
            <input type="hidden" name="_next" value="https://pranjaldigital.com/thank-you" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                <Gem size={28} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Start Your 7-Day Free Trial</h3>
              <p className="text-white/50 text-xs sm:text-sm">Fill out the form below and we'll activate your trial within 24 hours.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
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
                <div className="flex flex-col sm:flex-row gap-2">
                  <select 
                    value={selectedCountryCode}
                    onChange={(e) => {
                      const selected = countryCodesList.find(c => c.code === e.target.value);
                      setSelectedCountryCode(e.target.value);
                      setSelectedCountryLabel(selected?.country || "");
                    }}
                    className="w-full sm:w-48 bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all cursor-pointer"
                  >
                    {countryCodesList.map((cc) => (
                      <option key={`${cc.code}-${cc.country}`} value={cc.code}>
                        {cc.flag} {cc.code} ({cc.country})
                      </option>
                    ))}
                  </select>
                  <input required name="phone" type="tel" placeholder="(555) 000-9999" className="flex-1 bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all" />
                </div>
                <p className="text-white/30 text-[10px] mt-1">Selected country code will be included with your phone number</p>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2 font-medium">What AI Voice Assistant Solutions are you looking for? *</label>
                <select 
                  name="ai_solutions" 
                  required 
                  className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="">Select AI solutions...</option>
                  {aiOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2 font-medium">Your Existing CRM *</label>
                <select 
                  name="crm" 
                  required 
                  className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="">Select your CRM...</option>
                  {crmOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <p className="text-[#c9a84c]/70 text-xs mt-3 flex items-center gap-1">
                  <Gift size={12} /> Free CRM implementation included!
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
                className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
              >
                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : <>Request 7-Day Trial Now <Rocket size={18} /></>}
              </button>
              
              <p className="text-white/30 text-xs text-center pb-2">No credit card required • Cancel anytime • Free setup included</p>
            </div>
          </form>
        ) : (
          <div className="p-8 sm:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-6"
            >
              <Check size={40} className="text-[#c9a84c]" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Trial Request Received!</h3>
            <p className="text-white/60 text-xs sm:text-sm">Thank you! We'll contact you within 24 hours to activate your 7-day free trial.</p>
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
        <div className="p-3 sm:p-4 md:p-5 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
            <PhoneCall size={18} className="sm:size-22 text-blue-400" />
          </div>
          <p className="text-white font-semibold text-xs sm:text-sm">Incoming Call</p>
          <p className="text-white/40 text-[10px] sm:text-xs">Patient calling...</p>
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        <div className="p-3 sm:p-4 md:p-5 text-center bg-gradient-to-r from-[#c9a84c]/5 to-transparent">
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2">
            <div className="absolute inset-0 rounded-full bg-[#c9a84c]/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-1 rounded-full bg-[#c9a84c]/30" />
            <div className="absolute inset-2 rounded-full bg-[#c9a84c]/40 flex items-center justify-center">
              <Mic size={16} className="sm:size-20 text-white" />
            </div>
          </div>
          <p className="text-[#c9a84c] font-semibold text-xs sm:text-sm">AI Voice Agent</p>
          <p className="text-white/40 text-[10px] sm:text-xs">Analyzing & Responding</p>
        </div>
        <div className="p-3 sm:p-4 md:p-5 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-2">
            <Calendar size={18} className="sm:size-22 text-green-400" />
          </div>
          <p className="text-white font-semibold text-xs sm:text-sm">Appointment Booked</p>
          <p className="text-white/40 text-[10px] sm:text-xs">CRM Updated</p>
          <CheckCircle2 size={12} className="sm:size-14 text-green-400 mx-auto mt-2" />
        </div>
      </div>
      <div className="bg-white/5 py-2 text-center border-t border-white/10">
        <p className="text-white/40 text-[10px] sm:text-[11px] flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
    <span className="inline-block bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent">
      {displayText}
      <span className="inline-block w-0.5 h-5 sm:h-6 md:h-8 bg-[#c9a84c] ml-1 animate-pulse" />
    </span>
  );
};

// --- Video Section ---
const VideoSection = ({ onDemoClick }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView && videoRef.current && !hasStarted) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((error) => {
        console.log("Auto-play prevented:", error);
        setIsPlaying(false);
      });
    }
  }, [isInView, hasStarted]);

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

  const stats = [
    { value: "100%", label: "Call Answer Rate", icon: PhoneCall },
    { value: "24/7", label: "Availability", icon: Clock },
    { value: "< 1s", label: "Avg Response Time", icon: Zap },
    { value: "40%", label: "No-Show Reduction", icon: TrendingUp }
  ];

  return (
    <div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a84c]/40 to-[#c9a84c]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#0d1220]">
          
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5">
            <div className="relative">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 absolute top-0 left-0" />
            </div>
            <span className="text-white text-[10px] sm:text-xs font-medium tracking-wider">🔴 LIVE DEMO</span>
          </div>

          <button
            onClick={handleMuteToggle}
            className="absolute bottom-4 left-4 z-20 flex items-center gap-2 sm:gap-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-2 sm:px-5 sm:py-3 hover:bg-black/90 transition-all duration-300 hover:scale-105 border border-white/20"
          >
            {isMuted ? (
              <VolumeX size={20} className="sm:size-24 text-white" />
            ) : (
              <Volume2 size={20} className="sm:size-24 text-white" />
            )}
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
              {isMuted ? "SOUND OFF" : "SOUND ON"}
            </span>
          </button>

          <div className="relative aspect-video bg-black/50">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              preload="auto"
              loop
              playsInline
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/videos/dental-ai-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <button
              onClick={handlePlayPause}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: isPlaying 
                    ? "0 0 20px rgba(201,168,76,0.3)" 
                    : "0 0 30px rgba(201,168,76,0.6)"
                }}
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] flex items-center justify-center shadow-2xl transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause size={24} className="sm:size-32 md:size-36 text-[#080c14]" />
                ) : (
                  <Play size={24} className="sm:size-32 md:size-36 text-[#080c14] ml-0.5 sm:ml-1" />
                )}
              </motion.div>
            </button>

            {!isPlaying && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#c9a84c]/30 animate-ping opacity-75 z-10" />
            )}
          </div>
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-white/70 text-xs sm:text-sm md:text-base flex items-center justify-center gap-2">
            <Video size={14} className="sm:size-16 text-[#c9a84c]" /> 
            Watch Live AI Voice Assistant Product Demo Now
          </p>
        </div>

        <div className="text-center mt-4 sm:mt-5">
          <button
            onClick={onDemoClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Request Demo Call <ArrowRight size={14} className="sm:size-16" />
          </button>
        </div>
      </motion.div>

      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center hover:border-[#c9a84c]/30 transition-all duration-300 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg bg-[#c9a84c]/10 flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                <stat.icon size={14} className="sm:size-18 text-[#c9a84c]" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-white/40 text-[10px] sm:text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-white/40 text-[10px] sm:text-xs flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Real patient call recording</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Real appointment booking</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> No human intervention</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Automatic CRM update</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- AI Dashboard Section ---
const AIDashboardSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
      <div className="text-center mb-6 sm:mb-8">
        <SectionHeader 
          badge="AI Dashboard" 
          title="Complete Visibility Into Your Call Performance" 
          description="Track every call, monitor AI responses, and see your ROI in real-time"
          center={true}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-3xl" />
          <div className="relative bg-gradient-to-br from-[#080c14] to-[#0a0f1c] border border-white/10 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
                  <BarChartIcon size={14} className="sm:size-16 text-[#c9a84c]" />
                </div>
                <span className="text-white font-semibold text-xs sm:text-sm">AI Voice Dashboard</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white/40 text-[8px] sm:text-[10px]">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
                <p className="text-white/40 text-[8px] sm:text-[10px]">Calls Handled</p>
                <p className="text-xl sm:text-2xl font-bold text-[#c9a84c]">1,247</p>
                <p className="text-green-400 text-[6px] sm:text-[8px]">+32% vs last month</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
                <p className="text-white/40 text-[8px] sm:text-[10px]">Appointments</p>
                <p className="text-xl sm:text-2xl font-bold text-white">892</p>
                <p className="text-green-400 text-[6px] sm:text-[8px]">+28% vs last month</p>
              </div>
            </div>
            
            <div className="mb-4 sm:mb-5">
              <p className="text-white/40 text-[8px] sm:text-[10px] mb-1 sm:mb-2">Call Volume (Last 7 days)</p>
              <div className="flex items-end gap-1 h-16 sm:h-24">
                {[35, 52, 48, 61, 73, 68, 55].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: height }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-[#c9a84c] to-[#dbb85c] rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-white/30 text-[6px] sm:text-[8px]">Day {i+1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-white/40 text-[8px] sm:text-[10px] mb-1 sm:mb-2">Recent Calls</p>
              <div className="space-y-1.5 sm:space-y-2">
                {[
                  { patient: "Sarah Johnson", time: "2:15 PM", status: "Booked", duration: "2:30" },
                  { patient: "Michael Chen", time: "1:45 PM", status: "Booked", duration: "3:15" },
                  { patient: "Dr. Emily Wilson", time: "11:20 AM", status: "Rescheduled", duration: "4:00" }
                ].map((call, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-1.5 sm:p-2">
                    <div>
                      <p className="text-white text-[10px] sm:text-xs font-medium">{call.patient}</p>
                      <p className="text-white/30 text-[6px] sm:text-[8px]">{call.time}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[8px] sm:text-[10px] ${call.status === 'Booked' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {call.status}
                      </span>
                      <p className="text-white/30 text-[6px] sm:text-[8px]">{call.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white/5 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
                <PhoneCall size={14} className="sm:size-18 text-[#c9a84c]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm">Real-time Call Monitoring</h4>
                <p className="text-white/40 text-[10px] sm:text-xs">Watch live as AI handles patient calls</p>
              </div>
            </div>
            <p className="text-white/50 text-[10px] sm:text-xs ml-10 sm:ml-12">See every call as it happens, with live transcription and AI response tracking.</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
                <TrendingUp size={14} className="sm:size-18 text-[#c9a84c]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm">Performance Analytics</h4>
                <p className="text-white/40 text-[10px] sm:text-xs">Track conversion rates and ROI</p>
              </div>
            </div>
            <p className="text-white/50 text-[10px] sm:text-xs ml-10 sm:ml-12">Measure how many calls turn into booked appointments and calculate revenue recovered.</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
                <Database size={14} className="sm:size-18 text-[#c9a84c]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm">CRM Integration Status</h4>
                <p className="text-white/40 text-[10px] sm:text-xs">See sync status and patient records</p>
              </div>
            </div>
            <p className="text-white/50 text-[10px] sm:text-xs ml-10 sm:ml-12">View real-time sync status, patient records created, and appointment confirmations sent.</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
                <Headphones size={14} className="sm:size-18 text-[#c9a84c]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm">Quality Assurance</h4>
                <p className="text-white/40 text-[10px] sm:text-xs">Review AI conversations and improve</p>
              </div>
            </div>
            <p className="text-white/50 text-[10px] sm:text-xs ml-10 sm:ml-12">Listen to call recordings, review AI responses, and continuously improve performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Problem Section ---
const ProblemSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#080c14] rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
      <div className="text-center mb-4 sm:mb-6">
        <span className="inline-flex items-center gap-2 bg-red-500/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-3">
          <AlertCircle size={10} className="sm:size-12 text-red-400" />
          <span className="text-red-400 text-[8px] sm:text-xs font-medium uppercase tracking-wider">The Problem</span>
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Every Missed Call = Lost Revenue</h2>
        <p className="text-red-400 text-[10px] sm:text-sm font-semibold">Clinics lose 30–40% of calls — that's thousands in lost revenue every month</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center mt-4 sm:mt-6">
        <div>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg"><X size={12} className="sm:size-16 text-red-400 flex-shrink-0" /><span className="text-white/70 text-[10px] sm:text-sm">Patients call when you're busy with other patients</span></li>
            <li className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg"><X size={12} className="sm:size-16 text-red-400 flex-shrink-0" /><span className="text-white/70 text-[10px] sm:text-sm">No one answers after clinic hours or on weekends</span></li>
            <li className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg"><X size={12} className="sm:size-16 text-red-400 flex-shrink-0" /><span className="text-white/70 text-[10px] sm:text-sm">Receptionist burnout and high turnover</span></li>
            <li className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg"><X size={12} className="sm:size-16 text-red-400 flex-shrink-0" /><span className="text-white/70 text-[10px] sm:text-sm">No call tracking means no follow-ups</span></li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/10 to-[#080c14] border border-red-500/20 rounded-xl p-3 sm:p-5">
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white/70 text-[10px] sm:text-sm font-medium">Missed Calls This Week</span>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            {[
              { patient: "Sarah Johnson", time: "2:15 PM", value: "$450" },
              { patient: "Michael Chen", time: "6:30 PM", value: "$320" },
              { patient: "Dr. Emily Wilson", time: "8:45 AM", value: "$580" }
            ].map((call, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-2 sm:p-3 flex justify-between items-center">
                <div>
                  <span className="text-white/80 text-[10px] sm:text-sm font-medium">{call.patient}</span>
                  <p className="text-white/30 text-[8px] sm:text-[10px]">{call.time}</p>
                </div>
                <span className="text-red-400/80 text-[10px] sm:text-sm font-medium">-{call.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-500/20 rounded-lg text-center">
            <p className="text-red-400 text-[10px] sm:text-sm font-bold">Total Lost: $1,350 this week</p>
            <p className="text-red-400/60 text-[8px] sm:text-[10px] mt-0.5 sm:mt-1">That's over $5,400 per month!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Feature Cards Section ---
const FeatureCards = () => {
  const features = [
    { icon: Phone, title: "Answer 24/7", description: "Never miss a call" },
    { icon: Calendar, title: "Auto Booking", description: "Schedule instantly" },
    { icon: Database, title: "CRM Sync", description: "Auto updates" },
    { icon: MessageSquare, title: "Smart Questions", description: "Answer FAQs" },
    { icon: BellRing, title: "Smart Reminders", description: "Reduce no-shows" },
    { icon: TrendingUp, title: "Revenue Recovery", description: "Capture every call" }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-xl p-2 sm:p-3 text-center hover:border-[#c9a84c]/30 transition-all duration-300 group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg bg-[#c9a84c]/10 flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
            <feature.icon size={14} className="sm:size-18 text-[#c9a84c]" />
          </div>
          <p className="text-white text-[10px] sm:text-xs font-medium">{feature.title}</p>
          <p className="text-white/30 text-[8px] sm:text-[10px]">{feature.description}</p>
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
    <div ref={ref} className="relative py-4 sm:py-6">
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
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
                  <ArrowRightIcon size={20} className="sm:size-24 text-[#c9a84c]/50" />
                </motion.div>
              </div>
            )}
            <motion.div
              animate={{ scale: activeStep === idx ? [1, 1.02, 1] : 1, borderColor: activeStep === idx ? "#c9a84c" : "rgba(255,255,255,0.1)", boxShadow: activeStep === idx ? "0 10px 30px rgba(201,168,76,0.15)" : "none" }}
              transition={{ duration: 0.5, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
              className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border rounded-xl p-3 sm:p-5 relative overflow-hidden h-full"
            >
              {activeStep === idx && <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} />}
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center">
                  <step.icon size={16} className="sm:size-24 text-[#c9a84c]" />
                </div>
                <span className="text-xl sm:text-3xl font-bold text-white/10">{step.step}</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">{step.title}</h3>
              <p className="text-white/50 text-[10px] sm:text-sm mb-2 sm:mb-4 leading-relaxed">{step.description}</p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2 pt-2 sm:pt-3 border-t border-white/10">
                {step.features.map((feature, fIdx) => (
                  <span key={fIdx} className="text-[#c9a84c]/70 text-[8px] sm:text-xs bg-[#c9a84c]/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">{feature}</span>
                ))}
              </div>
              {activeStep === idx && (
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#c9a84c] animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[#c9a84c]/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 rounded-full bg-[#c9a84c]/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4 sm:mt-8">
        {steps.map((_, idx) => (<button key={idx} onClick={() => setActiveStep(idx)} className={`h-1 rounded-full transition-all duration-300 ${activeStep === idx ? 'w-5 sm:w-8 bg-[#c9a84c]' : 'w-1.5 sm:w-2 bg-white/20'}`} />))}
      </div>
    </div>
  );
};

// --- Human + AI Collaboration Section ---
const CollaborationSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-3 sm:mb-4">
            <HeartHandshake size={10} className="sm:size-14 text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-[8px] sm:text-xs font-medium">Human + AI Collaboration</span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">We're Not Trying to Replace Your Receptionist — We're Empowering Them</h3>
          <p className="text-white/60 text-[10px] sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
            Your receptionist is the heart of your practice. But no human can work 24/7/365. 
            Unlike traditional voicemails or answering machines that just take messages, our AI Voice Agent 
            works <span className="text-[#c9a84c]">intelligently alongside your team</span> — handling routine calls, booking appointments, 
            and updating records while your receptionist focuses on complex patient needs.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3"><TrendingUp size={12} className="sm:size-16 text-[#c9a84c] mb-1 sm:mb-2" /><p className="text-white/70 sm:text-white/80 text-[10px] sm:text-sm font-medium">3x Higher Productivity</p><p className="text-white/30 text-[8px] sm:text-[10px]">AI handles 70% of routine calls</p></div>
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3"><UserCheck size={12} className="sm:size-16 text-[#c9a84c] mb-1 sm:mb-2" /><p className="text-white/70 sm:text-white/80 text-[10px] sm:text-sm font-medium">Less Burnout</p><p className="text-white/30 text-[8px] sm:text-[10px]">Receptionists focus on patients</p></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-3xl" />
          <div className="relative bg-gradient-to-br from-[#c9a84c]/10 to-[#080c14] border border-[#c9a84c]/20 rounded-xl p-3 sm:p-5">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="flex items-center gap-1 sm:gap-2"><div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center"><Bot size={10} className="sm:size-14 text-[#c9a84c]" /></div><span className="text-white/70 sm:text-white/80 text-[8px] sm:text-xs font-medium">AI Voice Agent</span></div>
              <div className="flex items-center gap-1 sm:gap-2"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="text-white/40 text-[6px] sm:text-[10px]">Active 24/7</span></div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="bg-white/5 rounded-lg p-1.5 sm:p-2"><p className="text-white/60 text-[8px] sm:text-[11px]">AI: "Dr. Smith is with a patient. Can I help book an appointment?"</p></div>
              <div className="bg-[#c9a84c]/10 rounded-lg p-1.5 sm:p-2"><p className="text-[#c9a84c] text-[8px] sm:text-[11px]">Patient: "Yes, I need a cleaning next week."</p></div>
              <div className="bg-white/5 rounded-lg p-1.5 sm:p-2"><p className="text-white/60 text-[8px] sm:text-[11px]">AI: "Tuesday at 2pm works. I'll book it and add you to the system."</p></div>
              <div className="border-t border-white/10 pt-1 sm:pt-2 mt-1 sm:mt-2 text-center"><p className="text-white/30 text-[6px] sm:text-[10px]">Seamless handoff to human during business hours</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Comparison Table (Fixed - Proper Table Structure) ---
const ComparisonTable = () => {
  const comparisons = [
    { feature: "Instant Response", ai: true, voicemail: false, answering: false },
    { feature: "Books Appointments", ai: true, voicemail: false, answering: false },
    { feature: "Answers Patient Questions", ai: true, voicemail: false, answering: false },
    { feature: "Updates CRM Automatically", ai: true, voicemail: false, answering: false },
    { feature: "Reduces Receptionist Workload", ai: true, voicemail: false, answering: false },
    { feature: "Patient Satisfaction", ai: "High", voicemail: "Low", answering: "Medium" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-4 sm:p-6 border border-white/10 overflow-x-auto">
      <h3 className="text-sm sm:text-lg font-bold text-white text-center mb-4 sm:mb-6">Why AI Voice Agent is Better Than Traditional Voicemail or Answering Machines</h3>
      <table className="w-full min-w-[400px] sm:min-w-[500px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left text-white/60 text-[8px] sm:text-sm font-medium py-2 sm:py-3 px-1 sm:px-2">Feature</th>
            <th className="text-center text-[#c9a84c] text-[8px] sm:text-sm font-medium py-2 sm:py-3 px-1 sm:px-2">AI Voice Agent</th>
            <th className="text-center text-white/40 text-[8px] sm:text-sm font-medium py-2 sm:py-3 px-1 sm:px-2">Voicemail</th>
            <th className="text-center text-white/40 text-[8px] sm:text-sm font-medium py-2 sm:py-3 px-1 sm:px-2">Answering Machine</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((item, idx) => (
            <tr key={idx} className="border-b border-white/5">
              <td className="text-white/70 text-[8px] sm:text-sm py-2 sm:py-3 px-1 sm:px-2">{item.feature}</td>
              <td className="text-center py-2 sm:py-3 px-1 sm:px-2">
                {typeof item.ai === 'boolean' ? (
                  item.ai ? <CheckCircle2 size={10} className="sm:size-16 text-[#c9a84c] mx-auto" /> : <X size={8} className="sm:size-14 text-red-400 mx-auto" />
                ) : (
                  <span className="text-[#c9a84c] text-[8px] sm:text-sm">{item.ai}</span>
                )}
              </td>
              <td className="text-center py-2 sm:py-3 px-1 sm:px-2">
                {typeof item.voicemail === 'boolean' ? (
                  item.voicemail ? <CheckCircle2 size={10} className="sm:size-16 text-green-500/50 mx-auto" /> : <X size={8} className="sm:size-14 text-red-400 mx-auto" />
                ) : (
                  <span className="text-white/40 text-[8px] sm:text-sm">{item.voicemail}</span>
                )}
              </td>
              <td className="text-center py-2 sm:py-3 px-1 sm:px-2">
                {typeof item.answering === 'boolean' ? (
                  item.answering ? <CheckCircle2 size={10} className="sm:size-16 text-green-500/50 mx-auto" /> : <X size={8} className="sm:size-14 text-red-400 mx-auto" />
                ) : (
                  <span className="text-white/40 text-[8px] sm:text-sm">{item.answering}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 sm:mt-6 p-2 sm:p-4 bg-[#c9a84c]/10 rounded-lg text-center">
        <p className="text-[#c9a84c] text-[8px] sm:text-sm font-medium">🎯 AI Voice Agent captures 3x more appointments than voicemail</p>
      </div>
    </div>
  );
};

// --- Productivity Boost Section ---
const ProductivityBoost = () => {
  return (
    <div className="grid md:grid-cols-2 gap-5 sm:gap-8 items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-3xl" />
        <div className="relative bg-gradient-to-br from-red-500/10 to-[#080c14] border border-red-500/20 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <BarChart3 size={16} className="sm:size-24 text-red-400" />
            <span className="text-white font-bold text-sm sm:text-lg">Before AI Voice Agent</span>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-center gap-2 text-white/60 text-[8px] sm:text-sm"><X size={10} className="sm:size-14 text-red-400" /> Receptionist spends 4+ hours/day on calls</li>
            <li className="flex items-center gap-2 text-white/60 text-[8px] sm:text-sm"><X size={10} className="sm:size-14 text-red-400" /> 30-40% of after-hours calls go unanswered</li>
            <li className="flex items-center gap-2 text-white/60 text-[8px] sm:text-sm"><X size={10} className="sm:size-14 text-red-400" /> Manual data entry into CRM</li>
            <li className="flex items-center gap-2 text-white/60 text-[8px] sm:text-sm"><X size={10} className="sm:size-14 text-red-400" /> High receptionist burnout & turnover</li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-l from-[#c9a84c]/20 to-transparent blur-3xl" />
        <div className="relative bg-gradient-to-br from-[#c9a84c]/10 to-[#080c14] border border-[#c9a84c]/20 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <TrendingUp size={16} className="sm:size-24 text-[#c9a84c]" />
            <span className="text-white font-bold text-sm sm:text-lg">After AI Voice Agent</span>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-center gap-2 text-white/70 text-[8px] sm:text-sm"><CheckCircle2 size={10} className="sm:size-14 text-[#c9a84c]" /> AI handles 70% of routine calls</li>
            <li className="flex items-center gap-2 text-white/70 text-[8px] sm:text-sm"><CheckCircle2 size={10} className="sm:size-14 text-[#c9a84c]" /> 100% of after-hours calls answered</li>
            <li className="flex items-center gap-2 text-white/70 text-[8px] sm:text-sm"><CheckCircle2 size={10} className="sm:size-14 text-[#c9a84c]" /> Automatic CRM updates</li>
            <li className="flex items-center gap-2 text-white/70 text-[8px] sm:text-sm"><CheckCircle2 size={10} className="sm:size-14 text-[#c9a84c]" /> 3x happier receptionists, lower turnover</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Solution Section ---
const SolutionSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-red-500/5 to-[#0a0f1c] border border-red-500/20 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4"><XCircle size={16} className="sm:size-22 text-red-400" /><h3 className="text-white font-bold text-sm sm:text-lg">Before AI</h3></div>
        <ul className="space-y-2 sm:space-y-3">
          <li className="flex items-center gap-2 text-white/60 text-[8px] sm:text-sm"><X size={10} className="sm:size-14 text-red-400" /> Missed calls after hours</li>
          <li className="flex items-center gap-2 text-white/60 text-[8px] sm:text-sm"><X size={10} className="sm:size-14 text-red-400" /> Manual appointment booking</li>
          <li className="flex items-center gap-2 text-white/60 text-[8px] sm:text-sm"><X size={10} className="sm:size-14 text-red-400" /> Lost revenue</li>
        </ul>
      </div>
      <div className="bg-gradient-to-br from-[#c9a84c]/10 to-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl p-4 sm:p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/5 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4"><ThumbsUp size={16} className="sm:size-22 text-[#c9a84c]" /><h3 className="text-white font-bold text-sm sm:text-lg">With AI</h3></div>
        <ul className="space-y-2 sm:space-y-3">
          <li className="flex items-center gap-2 text-white/70 text-[8px] sm:text-sm"><CheckCircle2 size={10} className="sm:size-14 text-[#c9a84c]" /> AI answers instantly 24/7</li>
          <li className="flex items-center gap-2 text-white/70 text-[8px] sm:text-sm"><CheckCircle2 size={10} className="sm:size-14 text-[#c9a84c]" /> Auto appointment booking</li>
          <li className="flex items-center gap-2 text-white/70 text-[8px] sm:text-sm"><CheckCircle2 size={10} className="sm:size-14 text-[#c9a84c]" /> Capture every call</li>
        </ul>
      </div>
    </div>
  );
};

// --- Pricing Section ---
const PricingSection = ({ onFreeTrialClick }) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border-2 border-[#c9a84c]/50 rounded-xl p-5 sm:p-6 shadow-xl shadow-[#c9a84c]/15">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">OUR PLAN</div>
          <div className="relative text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg bg-[#c9a84c]/20 flex items-center justify-center mb-3 sm:mb-4"><Crown size={16} className="sm:size-22 text-[#c9a84c]" /></div>
            <h3 className="text-base sm:text-xl font-bold text-white">DentalVoiceAI</h3>
            <div className="mt-3 sm:mt-4 mb-1"><span className="text-2xl sm:text-4xl font-bold text-[#c9a84c]">$49.99</span><span className="text-white/40 text-xs sm:text-base">/month</span></div>
            <p className="text-[#c9a84c] text-[8px] sm:text-xs mb-3 sm:mb-4">+ nominal per-call fee for high volumes</p>
            <ul className="space-y-1.5 sm:space-y-2 text-left mt-4 sm:mt-5 mb-4 sm:mb-6">
              <li className="flex items-center gap-2 text-white/80 text-[8px] sm:text-sm"><CheckCircle2 size={8} className="sm:size-12 text-[#c9a84c]" /> No setup fees</li>
              <li className="flex items-center gap-2 text-white/80 text-[8px] sm:text-sm"><CheckCircle2 size={8} className="sm:size-12 text-[#c9a84c]" /> 24/7 availability</li>
              <li className="flex items-center gap-2 text-white/80 text-[8px] sm:text-sm"><CheckCircle2 size={8} className="sm:size-12 text-[#c9a84c]" /> Free CRM integration</li>
              <li className="flex items-center gap-2 text-white/80 text-[8px] sm:text-sm"><CheckCircle2 size={8} className="sm:size-12 text-[#c9a84c]" /> Low latency response</li>
            </ul>
            <button onClick={onFreeTrialClick} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all text-[10px] sm:text-sm">Start Free Trial</button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-xl p-5 sm:p-6">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg bg-white/5 flex items-center justify-center mb-3 sm:mb-4"><AlertCircle size={16} className="sm:size-22 text-white/40" /></div>
            <h3 className="text-base sm:text-xl font-bold text-white/60">Other AI Voice Agents</h3>
            <div className="mt-3 sm:mt-4 mb-1"><span className="text-2xl sm:text-3xl font-bold text-white/40">$200+</span><span className="text-white/30 text-xs sm:text-base">/month</span></div>
            <ul className="space-y-1.5 sm:space-y-2 text-left mt-4 sm:mt-5 mb-4 sm:mb-6">
              <li className="flex items-center gap-2 text-white/40 text-[8px] sm:text-sm"><X size={8} className="sm:size-12 text-red-400" /> High setup fees ($500+)</li>
              <li className="flex items-center gap-2 text-white/40 text-[8px] sm:text-sm"><X size={8} className="sm:size-12 text-red-400" /> Expensive per-call charges</li>
              <li className="flex items-center gap-2 text-white/40 text-[8px] sm:text-sm"><X size={8} className="sm:size-12 text-red-400" /> Slow response time</li>
              <li className="flex items-center gap-2 text-white/40 text-[8px] sm:text-sm"><X size={8} className="sm:size-12 text-red-400" /> Long-term contracts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Calendly Section ---
const CalendlySection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div id="calendly-section" className="scroll-mt-20">
      <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-4 sm:p-6 border border-white/10">
        <div className="text-center mb-4 sm:mb-5">
          <h3 className="text-base sm:text-xl font-bold text-white mb-1">Schedule Your Free Demo</h3>
          <p className="text-white/50 text-[10px] sm:text-sm">Choose a time that works for you. 30-min personalized walkthrough.</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/10 min-h-[450px] sm:min-h-[550px] relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1c]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
            </div>
          )}
          <iframe src={CALENDLY_URL} width="100%" height="600" frameBorder="0" className={`bg-white transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} title="Calendly Booking" onLoad={() => setIsLoaded(true)} />
        </div>
      </div>
    </div>
  );
};

// --- Animated Hero Component ---
const AnimatedHero = ({ onFreeTrialClick, onDemoClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => { const rect = e.currentTarget.getBoundingClientRect(); setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top }); };
  
  return (
    <div className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center pt-8 sm:pt-12 pb-8 sm:pb-12 overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#c9a84c]/15 blur-[100px] transition-transform duration-300 ease-out" style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`, top: '30%', left: '20%' }} />
        <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-[#c9a84c]/10 blur-[80px] transition-transform duration-300 ease-out" style={{ transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`, bottom: '20%', right: '15%' }} />
      </div>
      <div className="relative text-center max-w-4xl mx-auto z-10 px-4">
        {/* Animated Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative group">
            <div className="absolute -inset-4 rounded-full bg-[#c9a84c]/20 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#c9a84c]/30 to-[#c9a84c]/10 flex items-center justify-center border-2 border-[#c9a84c]/40 shadow-lg shadow-[#c9a84c]/20">
              <div className="relative">
                <HeadsetIcon size={32} className="sm:size-40 text-[#c9a84c] animate-pulse" />
                <Phone className="absolute -top-2 -right-2 w-6 h-6 text-[#c9a84c]" />
              </div>
            </div>
            {/* Voice wave animation */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5">
              <motion.div animate={{ height: [6, 14, 6] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-0.5 bg-[#c9a84c] rounded-full" style={{ height: 6 }} />
              <motion.div animate={{ height: [6, 20, 6] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} className="w-0.5 bg-[#c9a84c] rounded-full" style={{ height: 6 }} />
              <motion.div animate={{ height: [6, 26, 6] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-0.5 bg-[#c9a84c] rounded-full" style={{ height: 6 }} />
              <motion.div animate={{ height: [6, 20, 6] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-0.5 bg-[#c9a84c] rounded-full" style={{ height: 6 }} />
              <motion.div animate={{ height: [6, 14, 6] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-0.5 bg-[#c9a84c] rounded-full" style={{ height: 6 }} />
            </div>
          </div>
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
        >
          Dental AI Voice Agent
        </motion.h1>
        
        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-[#c9a84c] font-semibold mb-6 sm:mb-8 px-4 break-words"
        >
          Our AI Agent saves thousands of dollars a month<br className="hidden sm:block" />
          by answering missed call <span className="whitespace-nowrap">opportunities</span>
        </motion.p>
        
        {/* Typing Effect Line */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-5 sm:mb-6">
          <span className="text-white/80 text-sm sm:text-base md:text-lg">Never Miss a Patient Call — </span>
          <TypingEffect />
        </motion.div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-white/60 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 max-w-2xl mx-auto">AI Voice Receptionist that answers calls, books appointments, and updates your CRM automatically.</motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/10 rounded-full px-2 sm:px-4 py-1 sm:py-1.5 mb-5 sm:mb-7">
          <DollarIcon size={10} className="sm:size-14 text-[#c9a84c]" />
          <span className="text-white font-semibold text-[8px] sm:text-xs">Starts at $49.99/month</span>
          <span className="text-white/40 text-[6px] sm:text-[10px] mx-0.5 sm:mx-1">•</span>
          <span className="text-white/70 text-[7px] sm:text-xs">7-day free trial</span>
          <span className="text-white/40 text-[6px] sm:text-[10px] mx-0.5 sm:mx-1">•</span>
          <span className="text-white/70 text-[7px] sm:text-xs">No setup fees</span>
        </motion.div>
        
        <CTAButtons onDemoClick={onDemoClick} onTrialClick={onFreeTrialClick} />
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-5 sm:mt-7 text-[6px] sm:text-[10px] md:text-xs text-white/40">
          <span className="flex items-center gap-0.5 sm:gap-1"><CheckCircle2 size={6} className="sm:size-10 text-[#c9a84c]" /> Works with your number</span>
          <span className="flex items-center gap-0.5 sm:gap-1"><CheckCircle2 size={6} className="sm:size-10 text-[#c9a84c]" /> Setup in 24 hours</span>
          <span className="flex items-center gap-0.5 sm:gap-1"><CheckCircle2 size={6} className="sm:size-10 text-[#c9a84c]" /> No technical skills</span>
        </motion.div>
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
    { q: "How does the AI work with my existing phone number?", a: "Simply forward your clinic's number to us, or we can provide you with a new local number. The AI answers instantly, 24/7/365, using your clinic's custom protocols and greeting. Setup takes less than 24 hours and requires no technical skills from your side. We handle everything remotely. You keep your existing number and patients can still call the same number they've always used." },
    { q: "Will this replace my receptionist?", a: "No! We strongly believe in human + AI collaboration. Your receptionist is invaluable for complex patient needs, emotional conversations, and building relationships. Our AI steps in after hours, during lunch breaks, when your team is busy with other patients, or during peak call times — handling routine calls so your receptionist can focus on providing exceptional patient care. Think of it as a smart assistant, not a replacement." },
    { q: "Can it handle complex appointment scheduling?", a: "Absolutely. Our AI checks real-time availability from your calendar, handles multiple providers and locations, manages waitlists, sends confirmations, and can even reschedule or cancel appointments through natural conversation. It understands context like 'next Tuesday' or 'anytime after 3pm' and books accordingly. It can also handle recurring appointments and special requests." },
    { q: "What CRMs do you integrate with?", a: "We integrate with all major dental CRMs including Open Dental, Dentrix, Eaglesoft, Curve Dental, as well as general CRMs like HubSpot and Salesforce. If you don't have a CRM, we provide a simple, easy-to-use CRM completely free with no implementation charges. We also offer custom integrations for other systems. Our team handles the entire integration process for you." },
    { q: "How does pricing work for higher call volumes?", a: "Our standard $49.99/month plan covers up to 500 calls per month. For clinics with higher call volumes, we offer a nominal per-call fee beyond that — typically just $0.05 per additional call. For custom AI workflows, complex CRM integrations, or enterprise needs with over 5,000 calls per month, we offer custom enterprise pricing. Contact us for a personalized quote based on your clinic's specific requirements." },
    { q: "Is there a long-term contract?", a: "No. Our service is month-to-month with no long-term commitment. You can cancel anytime with 30 days notice. The 7-day free trial is completely risk-free with no credit card required. If you're not satisfied, you can cancel within the trial period at no cost. We're confident you'll love the results — most clinics see ROI within the first month of using our AI voice agent." }
  ];

  return (
    <>
      <Helmet>
        <title>Dental AI Voice Agent | AI Receptionist for Dentists</title>
        <meta
          name="description"
          content="AI dental voice agent that answers patient calls, books appointments, and updates your CRM automatically. Never miss a patient call again. Starts at $49.99/month with 7-day free trial."
        />


return (
  <>
    <Helmet>
      <title>Dental AI Agent | AI Receptionist for Dentists</title>
      <meta
        name="description"
        content="AI dental voice agent that answers patient calls, books appointments, and updates your CRM automatically. Starts at $49.99/month with a 7-day free trial."
      />
    </Helmet>

    <div className="bg-[#080c14] min-h-screen font-sans antialiased overflow-x-hidden">
        

        
        <AnimatedHero onFreeTrialClick={() => setShowFreeTrial(true)} onDemoClick={scrollToCalendly} />
        
        <SectionWrapper className="pt-0 pb-8 sm:pb-12">
          <VideoSection onDemoClick={scrollToCalendly} />
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-8 sm:pb-12">
          <ProblemSection />
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-8 sm:pb-12">
          <AIDashboardSection />
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-8 sm:pb-12">
          <AIWorkAnimation />
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-6 sm:pb-8">
          <FeatureCards />
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-6">
          <div className="text-center">
            <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-6 sm:py-8">
          <CollaborationSection />
        </SectionWrapper>

        <SectionWrapper className="py-6 sm:py-8">
          <ComparisonTable />
        </SectionWrapper>

        <SectionWrapper className="py-6 sm:py-8">
          <ProductivityBoost />
        </SectionWrapper>

        <SectionWrapper id="how-it-works" className="py-6 sm:py-8">
          <SectionHeader badge="Simple Process" title="How It Works" description="A 3-step system that turns missed calls into booked appointments" />
          <HowItWorksFlow />
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-6">
          <div className="text-center">
            <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-8 sm:py-12">
          <SectionHeader badge="The Solution" title="Your 24/7 AI Receptionist That Converts Calls" center={true} />
          <SolutionSection />
        </SectionWrapper>

        <SectionWrapper id="pricing" className="py-8 sm:py-12">
          <SectionHeader badge="Simple Pricing" title="Simple, Affordable Pricing" />
          <PricingSection onFreeTrialClick={() => setShowFreeTrial(true)} />
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-6">
          <div className="text-center">
            <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-6 sm:py-8">
          <CalendlySection />
        </SectionWrapper>

        <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-8 sm:py-12">
          <SectionHeader badge="FAQ" title="Frequently Asked Questions" />
          <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-3 sm:p-4 text-left">
                  <span className="text-white font-medium text-[10px] sm:text-sm">{faq.q}</span>
                  <ChevronDown size={12} className={`text-white/50 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-3 sm:p-4 pt-0 text-white/50 text-[8px] sm:text-xs border-t border-white/10 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-8 sm:py-12">
          <div className="rounded-xl bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20 p-5 sm:p-8 text-center">
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">Ready to Never Miss a Patient Call Again?</h3>
            <p className="text-white/60 mb-4 sm:mb-6 text-[10px] sm:text-sm">Join hundreds of dental practices automating their front desk with our AI voice agent.</p>
            <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
          </div>
        </SectionWrapper>

        <div className="border-t border-white/10 py-4 sm:py-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center">
                <Mic size={10} className="sm:size-14 text-[#080c14]" />
              </div>
              <span className="text-white font-bold text-[10px] sm:text-sm">Dental<span className="text-[#c9a84c]">Voice</span>AI</span>
            </div>
            <div className="text-white/40 text-[7px] sm:text-[11px]">© 2024 DentalVoiceAI. AI Voice Receptionist for Dental Practices</div>
          </div>
        </div>

        <AnimatePresence>
          {showCalendly && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#080c14] rounded-2xl w-full max-w-4xl h-[85vh] overflow-hidden border border-[#c9a84c]/30 shadow-2xl">
                <button onClick={() => setShowCalendly(false)} className="absolute top-4 right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors border border-white/10"><X size={14} className="sm:size-20" /></button>
                <iframe src={CALENDLY_URL} width="100%" height="100%" frameBorder="0" className="bg-white" title="Calendly Booking" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <FreeTrialModal isOpen={showFreeTrial} onClose={() => setShowFreeTrial(false)} />
      </div>
    </>
  );
}
