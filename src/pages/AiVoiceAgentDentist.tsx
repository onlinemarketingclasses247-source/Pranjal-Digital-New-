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
  Crown, Gem, Rocket, Target, Brain, Bot, Headset
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
  <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
    {badge && (
      <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-1.5 rounded-full mb-4">
        <Sparkles size={14} className="text-[#c9a84c]" />
        <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">{badge}</span>
      </span>
    )}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
      {title}
    </h2>
    {description && (
      <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
        {description}
      </p>
    )}
  </div>
);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#c9a84c]/30 shadow-2xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300"
        >
          <X size={18} />
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
                    <option value="+1">🇺🇸 +1 (US)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+91">🇮🇳 +91 (India)</option>
                    <option value="+61">🇦🇺 +61 (Australia)</option>
                    <option value="+49">🇩🇪 +49 (Germany)</option>
                    <option value="+33">🇫🇷 +33 (France)</option>
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
                  <CheckCircle2 size={10} /> We don't charge anything for CRM implementation if you don't have one!
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
            <p className="text-white/60">Thank you for your interest! We'll contact you within 24 hours to activate your 7-day free trial.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- Calendly Modal Component ---
const CalendlyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-[#080c14] rounded-2xl w-full max-w-5xl h-[85vh] overflow-hidden border border-[#c9a84c]/30 shadow-2xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10"
        >
          <X size={18} />
        </button>
        <iframe src={CALENDLY_URL} width="100%" height="100%" frameBorder="0" className="bg-white" title="Calendly Booking" />
      </motion.div>
    </div>
  );
};

// --- Animated Process Flow Component ---
const AnimatedProcessFlow = () => {
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [activeStep, setActiveStep] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      const interval = setInterval(() => {
        setActiveStep(prev => {
          const newStep = (prev + 1) % 3;
          if (newStep === 0) {
            setCompletedSteps([false, false, false]);
          }
          return newStep;
        });
        setCompletedSteps(prev => {
          const newCompleted = [...prev];
          if (activeStep < 2) {
            newCompleted[activeStep] = true;
          }
          return newCompleted;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [controls, isInView, activeStep]);

  const steps = [
    { 
      icon: PhoneCall, 
      title: "Patient Calls", 
      description: "Patient calls your existing clinic number. AI answers instantly, 24/7/365.",
      detail: "No app download • Same number • Instant response"
    },
    { 
      icon: Bot, 
      title: "AI Agent Answers", 
      description: "Understands patient needs, checks real-time availability, books appointments naturally.",
      detail: "Natural conversation • Real-time calendar sync • Smart scheduling"
    },
    { 
      icon: Database, 
      title: "CRM Updated", 
      description: "Patient details saved, appointment logged, and follow-ups automated seamlessly.",
      detail: "Auto-sync • Smart reminders • Patient insights"
    }
  ];

  return (
    <div ref={ref} className="relative py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2 } } }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            {/* Connector line */}
            {idx < 2 && (
              <div className="hidden md:block absolute top-1/3 -right-4 z-10">
                <motion.div
                  animate={{ x: activeStep === idx ? [0, 10, 0] : 0, opacity: completedSteps[idx] ? 1 : 0.3 }}
                  transition={{ duration: 0.8, repeat: activeStep === idx ? Infinity : 0 }}
                >
                  <ArrowRightIcon size={32} className="text-[#c9a84c]" />
                </motion.div>
              </div>
            )}

            <motion.div
              animate={{
                scale: activeStep === idx ? [1, 1.05, 1] : completedSteps[idx] ? 1.02 : 1,
                boxShadow: activeStep === idx ? "0 0 40px rgba(201,168,76,0.5)" : completedSteps[idx] ? "0 0 20px rgba(201,168,76,0.3)" : "none",
                borderColor: completedSteps[idx] ? "#c9a84c" : activeStep === idx ? "#c9a84c" : "rgba(255,255,255,0.1)"
              }}
              transition={{ duration: 0.5, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
              className={`bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border-2 rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-500 ${
                completedSteps[idx] ? 'border-[#c9a84c] shadow-lg shadow-[#c9a84c]/20' : 'border-white/10'
              }`}
            >
              {/* Glow effect on active */}
              {activeStep === idx && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/15 to-[#c9a84c]/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
              )}

              {/* Step number with checkmark */}
              <div className="absolute top-3 right-3">
                {completedSteps[idx] ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-7 h-7 rounded-full bg-[#c9a84c] flex items-center justify-center"
                  >
                    <Check size={14} className="text-[#080c14]" />
                  </motion.div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-xs font-bold">
                    {idx + 1}
                  </div>
                )}
              </div>

              {/* Icon */}
              <motion.div 
                animate={{ 
                  scale: activeStep === idx ? [1, 1.1, 1] : completedSteps[idx] ? 1.05 : 1,
                  rotateY: activeStep === idx ? [0, 360] : 0
                }}
                transition={{ duration: 0.8, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
                className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 transition-all duration-500 ${
                  completedSteps[idx] 
                    ? 'from-[#c9a84c] to-[#dbb85c]' 
                    : 'from-[#c9a84c]/20 to-[#c9a84c]/5'
                }`}
              >
                <step.icon size={36} className={completedSteps[idx] ? 'text-[#080c14]' : 'text-[#c9a84c]'} />
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm mb-3">{step.description}</p>
              <p className="text-[#c9a84c]/70 text-xs">{step.detail}</p>

              {/* Progress indicator */}
              {activeStep === idx && (
                <div className="mt-4 flex justify-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Animated Hero Component ---
const AnimatedHero = ({ onFreeTrialClick, onDemoClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const rotatingWords = ["Automatically", "Instantly", "Intelligently", "Seamlessly"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background with mouse follower */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full bg-[#c9a84c]/15 blur-[120px] transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '30%',
            left: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-[#c9a84c]/10 blur-[100px] transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
            bottom: '20%',
            right: '15%'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a84c]/5 blur-[150px]" />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#c9a84c]/30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{ 
              y: [null, -30, 30, -30],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative text-center max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-[#c9a84c]/20">
            <Sparkles size={14} className="text-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">Trusted by 500+ Dental Practices</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          AI Voice Receptionist for Dentists That
          <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent mt-3">
            Never Misses a Patient Call
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl mb-6 max-w-2xl mx-auto"
        >
          Answers calls, books appointments, and updates your CRM{" "}
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#c9a84c] font-semibold inline-block"
          >
            {rotatingWords[currentWordIndex]}
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2.5 mb-10"
        >
          <DollarSign size={18} className="text-[#c9a84c]" />
          <span className="text-white font-semibold">Starts at $49.99/month</span>
          <span className="text-white/40 text-sm mx-2">•</span>
          <span className="text-white/70 text-sm">7-day free trial</span>
          <span className="text-white/40 text-sm mx-2">•</span>
          <span className="text-white/70 text-sm">No setup fees</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDemoClick}
            className="group bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-4 px-10 rounded-xl hover:shadow-2xl hover:shadow-[#c9a84c]/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
          >
            <Calendar size={20} /> Book a Demo
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}><ArrowRight size={18} /></motion.span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onFreeTrialClick}
            className="bg-white/10 border-2 border-white/20 text-white font-bold py-4 px-10 rounded-xl hover:bg-white/20 hover:border-[#c9a84c]/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg backdrop-blur-sm"
          >
            <Rocket size={20} /> Get 7-Day Free Trial
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-white/40"
        >
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Works with your existing number</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Setup in 24 hours</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> No technical skills needed</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Cancel anytime</span>
        </motion.div>
      </div>
    </div>
  );
};

// --- Video Section Component ---
const VideoSection = () => {
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
        <video
          className="w-full h-full object-cover rounded-xl"
          controls
          preload="metadata"
          poster="https://placehold.co/1200x600/0a0f1c/ffffff?text=Dental+AI+Voice+Demo"
        >
          <source src="/videos/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="text-center mt-4">
        <p className="text-white/40 text-sm flex items-center justify-center gap-2">
          <Video size={14} /> Watch a real patient book an appointment via AI (35 sec)
        </p>
      </div>
    </motion.div>
  );
};

// --- Pricing Comparison Component ---
const PricingSection = ({ onFreeTrialClick }) => {
  return (
    <div className="py-8">
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Traditional Receptionist */}
        <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-2xl p-6 relative">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Users size={24} className="text-white/40" />
            </div>
            <h3 className="text-lg font-bold text-white/60">Traditional Receptionist</h3>
            <div className="mt-4 mb-2">
              <span className="text-3xl font-bold text-white/40">$3,000+</span>
              <span className="text-white/30">/month</span>
            </div>
            <ul className="space-y-2 text-left mt-6 mb-6">
              <li className="flex items-center gap-2 text-white/40 text-sm"><X size={14} className="text-red-400" /> Limited hours (9-5)</li>
              <li className="flex items-center gap-2 text-white/40 text-sm"><X size={14} className="text-red-400" /> Missed after-hours calls</li>
              <li className="flex items-center gap-2 text-white/40 text-sm"><X size={14} className="text-red-400" /> Manual data entry</li>
              <li className="flex items-center gap-2 text-white/40 text-sm"><X size={14} className="text-red-400" /> No CRM integration</li>
              <li className="flex items-center gap-2 text-white/40 text-sm"><X size={14} className="text-red-400" /> Benefits & PTO costs</li>
            </ul>
          </div>
        </div>

        {/* Our AI Voice Agent - Highlighted */}
        <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border-2 border-[#c9a84c]/50 rounded-2xl p-6 shadow-2xl shadow-[#c9a84c]/20 transform scale-105">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-2xl" />
          <div className="relative text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#c9a84c]/20 flex items-center justify-center mb-4">
              <Bot size={24} className="text-[#c9a84c]" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Voice Agent</h3>
            <div className="mt-4 mb-2">
              <span className="text-4xl font-bold text-[#c9a84c]">$49.99</span>
              <span className="text-white/40">/month</span>
            </div>
            <p className="text-[#c9a84c] text-xs mb-4">Save $2,950+ per month</p>
            <ul className="space-y-2 text-left mt-6 mb-6">
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> 24/7/365 availability</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Instant call answering</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Auto appointment booking</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> CRM integration included</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Free setup & training</li>
            </ul>
            <button 
              onClick={onFreeTrialClick}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all transform hover:scale-105"
            >
              Start Free Trial
            </button>
          </div>
        </div>

        {/* Hybrid Option */}
        <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-2xl p-6 relative">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Headset size={24} className="text-white/40" />
            </div>
            <h3 className="text-lg font-bold text-white/60">Hybrid (AI + Human)</h3>
            <div className="mt-4 mb-2">
              <span className="text-3xl font-bold text-white/40">$1,500+</span>
              <span className="text-white/30">/month</span>
            </div>
            <ul className="space-y-2 text-left mt-6 mb-6">
              <li className="flex items-center gap-2 text-white/40 text-sm"><CheckCircle2 size={14} className="text-yellow-500/50" /> Limited AI coverage</li>
              <li className="flex items-center gap-2 text-white/40 text-sm"><CheckCircle2 size={14} className="text-yellow-500/50" /> Partial automation</li>
              <li className="flex items-center gap-2 text-white/40 text-sm"><X size={14} className="text-red-400" /> Still miss after-hours</li>
              <li className="flex items-center gap-2 text-white/40 text-sm"><X size={14} className="text-red-400" /> Higher cost than AI-only</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function DentalVoiceAgentLanding() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "How does the AI voice agent work with my existing phone number?", a: "Simply forward your clinic's number to us, or we provide a new local number. The AI answers instantly, 24/7, using your clinic's protocols. Setup takes less than 24 hours." },
    { q: "Can it handle complex appointment scheduling?", a: "Absolutely. It checks real-time availability from your calendar, books, reschedules, and cancels appointments—all through natural conversation. It can handle multiple providers, locations, and custom appointment types." },
    { q: "What CRMs do you integrate with?", a: "We integrate with all major dental CRMs including Open Dental, Dentrix, Eaglesoft, and Curve Dental. No CRM? We provide a simple one for free with no implementation charges." },
    { q: "Is there a long-term contract?", a: "No. Our service is month-to-month. You can cancel anytime. The 7-day free trial is completely risk-free with no credit card required." },
    { q: "How fast is the setup?", a: "Most clinics are live within 24 hours. We handle the number forwarding, AI training on your clinic's protocols, and CRM integration for you completely free." },
  ];

  return (
    <div className="bg-[#080c14] min-h-screen font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <AnimatedHero onFreeTrialClick={() => setShowFreeTrial(true)} onDemoClick={() => setShowCalendly(true)} />

      {/* Video Section */}
      <SectionWrapper className="pt-0 pb-16">
        <VideoSection />
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper id="how-it-works" className="py-20">
        <SectionHeader badge="Simple Process" title="How It Works" description="A 3-step system that turns missed calls into booked appointments" />
        <AnimatedProcessFlow />
      </SectionWrapper>

      {/* Problem Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader badge="The Problem" title="Every Missed Call = Lost Revenue" description="You're losing patients daily without knowing it." center={false} />
            
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 font-bold text-center text-lg">Clinics lose 30–40% of calls</p>
              <p className="text-red-400/70 text-center text-sm mt-1">That's thousands in lost revenue every month</p>
            </div>

            <ul className="space-y-4">
              {["Patients call when you're busy with other patients", "No one answers after clinic hours or on weekends", "Reception mistakes lead to double-booking and lost trust", "No call tracking means no follow-ups on missed opportunities"].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <X size={12} className="text-red-400" />
                  </div>
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent blur-3xl" />
            <div className="relative bg-gradient-to-br from-red-500/10 to-[#080c14] border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/70 text-sm font-medium">Missed Call Dashboard</span>
                <span className="text-red-400 text-xs bg-red-500/20 px-2 py-0.5 rounded-full ml-auto">+127% this month</span>
              </div>
              <div className="space-y-3">
                {[
                  { patient: "Sarah Johnson", time: "2:15 PM", status: "Missed - Left voicemail", value: "$450" },
                  { patient: "Michael Chen", time: "6:30 PM", status: "Missed - No voicemail", value: "$320" },
                  { patient: "Dr. Emily Wilson", time: "8:45 AM", status: "Missed - Call back later", value: "$580" }
                ].map((call, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white/80 text-sm font-medium">{call.patient}</p>
                        <p className="text-white/30 text-xs">{call.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 text-xs font-mono">{call.status}</p>
                        <p className="text-red-400/70 text-xs">-{call.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Solution Section - Before vs After */}
      <SectionWrapper className="py-20">
        <SectionHeader badge="The Solution" title="Your 24/7 AI Receptionist That Converts Calls Into Appointments" center={true} />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-500/5 to-[#0a0f1c] border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={20} className="text-red-400" />
              <h3 className="text-white font-bold text-lg">Before AI Voice Agent</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Missed calls after hours</li>
              <li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Manual appointment booking</li>
              <li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Lost revenue from unanswered calls</li>
              <li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> No patient follow-ups</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#c9a84c]/10 to-[#0a0f1c] border border-[#c9a84c]/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/5 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp size={20} className="text-[#c9a84c]" />
              <h3 className="text-white font-bold text-lg">With AI Voice Agent</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> AI answers instantly 24/7</li>
              <li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Auto appointment booking</li>
              <li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Capture every patient call</li>
              <li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Automated follow-ups & reminders</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Integration Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-20">
        <SectionHeader badge="Seamless Integration" title="Works With Your Existing Setup" description="No need to change your current systems or processes." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ icon: Phone, label: "Your Current Number" }, { icon: Database, label: "Your Existing CRM" }, { icon: Monitor, label: "Free CRM Included" }, { icon: Smartphone, label: "Works with Any System" }].map((item, idx) => (
            <div key={idx} className="group bg-gradient-to-br from-[#0d1220] to-[#080c14] border border-white/10 rounded-xl p-6 hover:border-[#c9a84c]/30 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"><item.icon size={24} className="text-[#c9a84c]" /></div>
              <p className="text-white/70 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing" className="py-20">
        <SectionHeader badge="Simple Pricing" title="Simple, Affordable Pricing" description="Transparent pricing with no hidden fees. Start with a 7-day free trial." />
        <PricingSection onFreeTrialClick={() => setShowFreeTrial(true)} />
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-20">
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" description="Got questions? We've got answers." />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border border-white/10 rounded-xl overflow-hidden hover:border-[#c9a84c]/30 transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="text-white font-semibold">{faq.q}</span>
                <ChevronDown size={18} className={`text-white/50 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-white/50 text-sm border-t border-white/10">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper className="py-20">
        <div className="rounded-2xl bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Never Miss a Patient Call Again?</h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Join hundreds of dental practices automating their front desk with our AI voice agent.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={() => setShowCalendly(true)}
              className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-[#c9a84c]/30 transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
            >
              <Calendar size={20} /> Book a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setShowFreeTrial(true)}
              className="bg-white/10 border-2 border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 hover:border-[#c9a84c]/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg backdrop-blur-sm"
            >
              <Rocket size={20} /> Get 7-Day Free Trial
            </button>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <div className="border-t border-white/10 py-8 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center">
                <Mic size={16} className="text-[#080c14]" />
              </div>
              <span className="text-white font-bold">Dental<span className="text-[#c9a84c]">Voice</span>AI</span>
            </div>
            <div className="text-white/40 text-sm">
              © 2024 DentalVoiceAI. AI Voice Receptionist for Dental Practices
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CalendlyModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
      <FreeTrialModal isOpen={showFreeTrial} onClose={() => setShowFreeTrial(false)} />
    </div>
  );
}
