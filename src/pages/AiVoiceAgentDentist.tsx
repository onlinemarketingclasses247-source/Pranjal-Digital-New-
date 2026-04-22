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
  VolumeX, Volume1
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

// --- Sleek AI Work Animation (No dead space, animated AI voice) ---
const AIWorkAnimation = () => {
  const [audioLevels] = useState([0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4, 0.6]);
  
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl border border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Step 1 */}
        <div className="p-5 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
            <PhoneCall size={22} className="text-blue-400" />
          </div>
          <p className="text-white font-semibold text-sm">Incoming Call</p>
          <p className="text-white/40 text-xs">Patient calling...</p>
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Step 2 - AI Agent with animated voice waves */}
        <div className="p-5 text-center bg-gradient-to-r from-[#c9a84c]/5 to-transparent">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <div className="absolute inset-0 rounded-full bg-[#c9a84c]/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-1 rounded-full bg-[#c9a84c]/30 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-[#c9a84c]/40 flex items-center justify-center">
              <Mic size={20} className="text-white" />
            </div>
          </div>
          <div className="flex justify-center gap-0.5 mb-2">
            {audioLevels.map((level, i) => (
              <motion.div
                key={i}
                animate={{ height: [8, 16 + level * 10, 8] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                className="w-1 bg-[#c9a84c] rounded-full"
                style={{ height: 8 }}
              />
            ))}
          </div>
          <p className="text-[#c9a84c] font-semibold text-sm">AI Voice Agent</p>
          <p className="text-white/40 text-xs">Analyzing & Responding</p>
        </div>

        {/* Step 3 */}
        <div className="p-5 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-3">
            <Calendar size={22} className="text-green-400" />
          </div>
          <p className="text-white font-semibold text-sm">Appointment Booked</p>
          <p className="text-white/40 text-xs">CRM Updated</p>
          <CheckCircle2 size={14} className="text-green-400 mx-auto mt-2" />
        </div>
      </div>
      
      <div className="bg-white/5 py-2 text-center border-t border-white/10">
        <p className="text-white/40 text-xs flex flex-wrap items-center justify-center gap-3">
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

// --- Video Section Component (Working video from your reference) ---
const VideoSection = ({ onDemoClick }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a84c]/40 to-[#c9a84c]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#0d1220]">
        <div className="relative">
          <video
            className="w-full h-full object-cover rounded-xl"
            controls
            preload="metadata"
            poster="https://placehold.co/1200x600/0a0f1c/ffffff?text=Dental+AI+Voice+Demo"
          >
            <source src="/videos/dental-ai-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-white/40 text-sm flex items-center justify-center gap-2">
          <Video size={14} /> Watch a real patient book an appointment via AI (35 sec)
        </p>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-white/30">
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Real call</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Real booking</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#c9a84c]" /> No human involved</span>
        </div>
      </div>

      <div className="text-center mt-6">
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

// --- How It Works Flow Component ---
const HowItWorksFlow = () => {
  const [activeStep, setActiveStep] = useState(1);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const steps = [
    { icon: PhoneCall, title: "Patient Calls", description: "Uses your existing clinic number. AI answers instantly, 24/7/365.", color: "from-blue-500/20 to-blue-500/5", step: 1 },
    { icon: Mic, title: "AI Agent Answers", description: "Understands patient needs, checks real-time availability, books appointments naturally.", color: "from-[#c9a84c]/30 to-[#c9a84c]/10", step: 2 },
    { icon: Database, title: "CRM Updated", description: "Patient details saved, appointment logged, and follow-ups automated seamlessly.", color: "from-green-500/20 to-green-500/5", step: 3 }
  ];

  return (
    <div ref={ref} className="relative py-8">
      <div className="grid md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2 } } }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            {idx < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                <motion.div
                  animate={{ x: activeStep === idx ? [0, 8, 0] : 0 }}
                  transition={{ duration: 0.8, repeat: activeStep === idx ? Infinity : 0 }}
                >
                  <ArrowRightIcon size={28} className="text-[#c9a84c]/60" />
                </motion.div>
              </div>
            )}

            <motion.div
              animate={{
                scale: activeStep === idx ? 1.02 : 1,
                borderColor: activeStep === idx ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                boxShadow: activeStep === idx ? '0 0 30px rgba(201,168,76,0.3)' : 'none'
              }}
              transition={{ duration: 0.5, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
              className={`bg-gradient-to-br ${step.color} border-2 rounded-xl p-5 text-center relative overflow-hidden ${activeStep === idx ? 'border-[#c9a84c]' : 'border-white/10'}`}
            >
              {activeStep === idx && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-[10px] font-bold">
                {step.step}
              </div>

              <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-3 relative z-10">
                <step.icon size={26} className="text-[#c9a84c]" />
              </div>
              
              <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
              <p className="text-white/50 text-xs">{step.description}</p>
            </motion.div>
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

// --- Collaboration Section ---
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
            Your receptionist is the heart of your practice. But no human can work 24/7. 
            Our AI voice agent steps in when your team is unavailable — after hours, during lunch, 
            or when they're busy with patients.
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

// --- Pricing Section ---
const PricingSection = ({ onFreeTrialClick }) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border-2 border-[#c9a84c]/50 rounded-xl p-5 shadow-xl shadow-[#c9a84c]/15">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-[10px] font-bold px-2 py-0.5 rounded-full">
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
              <li className="flex items-center gap-2 text-white/80 text-xs"><CheckCircle2 size={10} className="text-[#c9a84c]" /> 24/7 availability</li>
              <li className="flex items-center gap-2 text-white/80 text-xs"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Free CRM integration</li>
              <li className="flex items-center gap-2 text-white/80 text-xs"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Low latency response</li>
            </ul>
            <button onClick={onFreeTrialClick} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 rounded-lg hover:shadow-lg transition-all text-sm">
              Start Free Trial
            </button>
          </div>
        </div>

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
    </div>
  );
};

// --- Calendly Section ---
const CalendlySection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div id="calendly-section" className="scroll-mt-20">
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
            src={CALENDLY_URL}
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
            <span className="text-[#c9a84c] text-[10px] font-medium uppercase tracking-wider">Smart AI Receptionist for Dental Practices</span>
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
          AI Voice Receptionist that answers calls, books appointments, and updates your CRM automatically.
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
          <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Works with your number</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> Setup in 24 hours</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#c9a84c]" /> No technical skills</span>
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

  const scrollToCalendly = () => {
    const element = document.getElementById('calendly-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openCalendlyModal = () => setShowCalendly(true);

  const faqs = [
    { q: "How does the AI work with my existing phone number?", a: "Simply forward your clinic's number to us. The AI answers instantly, 24/7. Setup takes less than 24 hours." },
    { q: "Will this replace my receptionist?", a: "No! We believe in human + AI collaboration. Our AI steps in after hours, during lunch breaks, or when your team is busy." },
    { q: "Can it handle complex appointment scheduling?", a: "Absolutely. It checks real-time availability from your calendar and books appointments naturally." },
    { q: "What CRMs do you integrate with?", a: "We integrate with Open Dental, Dentrix, Eaglesoft, and more. No CRM? We provide one for free." },
  ];

  return (
    <div className="bg-[#080c14] min-h-screen font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <AnimatedHero onFreeTrialClick={() => setShowFreeTrial(true)} onDemoClick={scrollToCalendly} />

      {/* AI Work Animation */}
      <SectionWrapper className="pt-0 pb-8">
        <AIWorkAnimation />
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

      {/* Problem Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <SectionHeader badge="The Problem" title="Every Missed Call = Lost Revenue" center={false} />
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 font-bold text-center text-sm">Clinics lose 30–40% of calls</p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><X size={12} className="text-red-400" /><span className="text-white/70 text-xs">Patients call when you're busy</span></li>
              <li className="flex items-center gap-2"><X size={12} className="text-red-400" /><span className="text-white/70 text-xs">No answers after clinic hours</span></li>
              <li className="flex items-center gap-2"><X size={12} className="text-red-400" /><span className="text-white/70 text-xs">Receptionist burnout</span></li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-[#080c14] border border-red-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/70 text-[10px] font-medium">Missed Calls This Week</span>
            </div>
            <div className="space-y-2">
              {[
                { patient: "Sarah Johnson", value: "$450" },
                { patient: "Michael Chen", value: "$320" },
                { patient: "Dr. Emily Wilson", value: "$580" }
              ].map((call, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-2 flex justify-between">
                  <span className="text-white/80 text-[10px]">{call.patient}</span>
                  <span className="text-red-400/70 text-[10px]">-{call.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Solution Section */}
      <SectionWrapper className="py-10">
        <SectionHeader badge="The Solution" title="Your 24/7 AI Receptionist That Converts Calls" center={true} />
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-red-500/5 to-[#0a0f1c] border border-red-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><XCircle size={18} className="text-red-400" /><h3 className="text-white font-bold text-base">Before AI</h3></div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/60 text-sm"><X size={12} className="text-red-400" /> Missed calls after hours</li>
              <li className="flex items-center gap-2 text-white/60 text-sm"><X size={12} className="text-red-400" /> Manual appointment booking</li>
              <li className="flex items-center gap-2 text-white/60 text-sm"><X size={12} className="text-red-400" /> Lost revenue</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#c9a84c]/10 to-[#0a0f1c] border border-[#c9a84c]/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><ThumbsUp size={18} className="text-[#c9a84c]" /><h3 className="text-white font-bold text-base">With AI</h3></div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 size={12} className="text-[#c9a84c]" /> AI answers instantly 24/7</li>
              <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Auto appointment booking</li>
              <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Capture every call</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing" className="py-10">
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
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-10">
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
              <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-3 text-left">
                <span className="text-white font-medium text-xs">{faq.q}</span>
                <ChevronDown size={12} className={`text-white/50 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-3 pt-0 text-white/50 text-[10px] border-t border-white/10">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper className="py-10">
        <div className="rounded-xl bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20 p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Ready to Never Miss a Patient Call Again?</h3>
          <CTAButtons onDemoClick={scrollToCalendly} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Footer */}
      <div className="border-t border-white/10 py-5 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center">
              <Mic size={12} className="text-[#080c14]" />
            </div>
            <span className="text-white font-bold text-xs">Dental<span className="text-[#c9a84c]">Voice</span>AI</span>
          </div>
          <div className="text-white/40 text-[9px]">© 2024 DentalVoiceAI. AI Voice Receptionist for Dental Practices</div>
        </div>
      </div>

      {/* Calendly Modal */}
      <AnimatePresence>
        {showCalendly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#080c14] rounded-2xl w-full max-w-4xl h-[85vh] overflow-hidden border border-[#c9a84c]/30 shadow-2xl"
            >
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors border border-white/10"
              >
                <X size={20} />
              </button>
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
