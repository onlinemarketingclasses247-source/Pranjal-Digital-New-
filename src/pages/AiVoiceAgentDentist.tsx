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
  Wifi, Cloud, ShieldCheck, Gift, FastForward, Layers
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

// --- CTA Button Component for reuse ---
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

// --- Fast Calendly Modal (Direct iframe with preload) ---
const FastCalendlyModal = ({ isOpen, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Preload the iframe content
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#080c14] rounded-2xl w-full max-w-4xl h-[85vh] overflow-hidden border border-[#c9a84c]/30 shadow-2xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10"
        >
          <X size={18} />
        </button>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#080c14]">
            <div className="w-12 h-12 border-3 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
          </div>
        )}
        <iframe 
          ref={iframeRef}
          src="https://calendly.com/pranjaldigital-info/30min?embed_domain=pranjaldigital.com&embed_type=Inline&hide_gdpr_banner=1"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          className={`bg-white transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          title="Calendly Booking"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
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
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- AI Voice Wave Animation Component ---
const AIWorkAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-8 border border-white/10">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 bg-[#c9a84c]/20 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[#c9a84c] text-xs font-medium">AI ACTIVE 24/7</span>
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Incoming Call */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
            <PhoneCall size={32} className="text-blue-400 animate-pulse" />
          </div>
          <p className="text-white/70 text-sm font-medium">Incoming Call</p>
          <p className="text-white/30 text-xs">Patient calling...</p>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: isAnimating ? [0, 10, 0] : 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <ArrowRightIcon size={32} className="text-[#c9a84c] hidden md:block" />
          <ChevronDown size={32} className="text-[#c9a84c] md:hidden" />
        </motion.div>

        {/* AI Voice Wave */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-[#c9a84c]/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-2 rounded-full bg-[#c9a84c]/30 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-[#c9a84c]/40 flex items-center justify-center">
              <Mic size={28} className="text-white" />
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [10, 30 + Math.random() * 20, 10] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                className="w-1.5 bg-[#c9a84c] rounded-full"
                style={{ height: 10 }}
              />
            ))}
          </div>
          <p className="text-[#c9a84c] text-sm font-semibold mt-3">AI Voice Agent</p>
          <p className="text-white/30 text-xs">Analyzing & Responding</p>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: isAnimating ? [0, 10, 0] : 0 }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }}
        >
          <ArrowRightIcon size={32} className="text-[#c9a84c] hidden md:block" />
          <ChevronDown size={32} className="text-[#c9a84c] md:hidden" />
        </motion.div>

        {/* Appointment Booked */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-3">
            <Calendar size={32} className="text-green-400" />
          </div>
          <p className="text-white/70 text-sm font-medium">Appointment Booked</p>
          <p className="text-white/30 text-xs">CRM Updated Automatically</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <p className="text-white/40 text-sm flex items-center justify-center gap-2">
          <Clock size={12} /> Answers instantly • 24/7 • Never misses a call
        </p>
      </div>
    </div>
  );
};

// --- Video Section with Play Button ---
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
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
      <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a84c]/40 to-[#c9a84c]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#0d1220]">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-xl"
            preload="metadata"
            poster="https://placehold.co/1200x600/0a0f1c/ffffff?text=Dental+AI+Voice+Demo"
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/videos/dental-ai-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#c9a84c]/20 backdrop-blur-sm flex items-center justify-center group/play hover:bg-[#c9a84c]/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] flex items-center justify-center pl-1">
                <Play size={28} className="text-[#080c14]" />
              </div>
            </button>
          )}
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-white/70 text-base font-medium flex items-center justify-center gap-2">
          <Video size={16} className="text-[#c9a84c]" /> Watch a real patient book an appointment via AI (35 sec)
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-sm">
          <span className="flex items-center gap-1 text-white/40"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Zero missed calls</span>
          <span className="flex items-center gap-1 text-white/40"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Instant response</span>
          <span className="flex items-center gap-1 text-white/40"><CheckCircle2 size={12} className="text-[#c9a84c]" /> 24/7 availability</span>
          <span className="flex items-center gap-1 text-white/40"><CheckCircle2 size={12} className="text-[#c9a84c]" /> Auto CRM sync</span>
        </div>
        <p className="text-white/30 text-xs mt-3">See how our AI handles a real patient call from start to finish - natural conversation, real-time scheduling, and automatic CRM update.</p>
      </div>
    </motion.div>
  );
};

// --- Enhanced Integration Section ---
const IntegrationSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Works With Your Existing Setup</h3>
        <p className="text-white/50 text-sm max-w-2xl mx-auto">No need to change your current systems or processes. We integrate seamlessly with everything you already use.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Phone size={28} className="text-[#c9a84c]" />
          </div>
          <p className="text-white font-medium text-sm">Your Current Number</p>
          <p className="text-white/30 text-xs mt-1">Keep your existing number, just forward calls</p>
        </div>
        
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Database size={28} className="text-[#c9a84c]" />
          </div>
          <p className="text-white font-medium text-sm">Your Existing CRM</p>
          <p className="text-white/30 text-xs mt-1">Open Dental, Dentrix, Eaglesoft & more</p>
        </div>
        
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Monitor size={28} className="text-[#c9a84c]" />
          </div>
          <p className="text-white font-medium text-sm">Free CRM Included</p>
          <p className="text-white/30 text-xs mt-1">No CRM? We provide one for free</p>
        </div>
        
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Cloud size={28} className="text-[#c9a84c]" />
          </div>
          <p className="text-white font-medium text-sm">Any Scheduling System</p>
          <p className="text-white/30 text-xs mt-1">Works with all major calendars</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-[#c9a84c]/5 rounded-xl border border-[#c9a84c]/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#c9a84c]" />
            <span className="text-white/70 text-sm">No technical skills needed • Setup in 24 hours • Zero downtime</span>
          </div>
          <span className="text-[#c9a84c] text-xs font-mono">✓ HIPAA Compliant ✓ GDPR Ready</span>
        </div>
      </div>
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
    { icon: PhoneCall, title: "Patient Calls", description: "Patient calls your existing clinic number", detail: "No app download • Same number • Instant response", color: "from-blue-500/20 to-blue-500/5" },
    { icon: Bot, title: "AI Agent Answers", description: "AI understands needs & checks availability", detail: "Natural conversation • Real-time sync • Smart scheduling", color: "from-[#c9a84c]/30 to-[#c9a84c]/10" },
    { icon: Database, title: "CRM Updated", description: "Patient details saved & appointment logged", detail: "Auto-sync • Smart reminders • Patient insights", color: "from-green-500/20 to-green-500/5" }
  ];

  return (
    <div ref={ref} className="relative py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2 } } }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            {idx < 2 && (
              <div className="hidden md:block absolute top-1/3 -right-3 z-10">
                <motion.div
                  animate={{ x: activeStep === idx ? [0, 8, 0] : 0 }}
                  transition={{ duration: 0.8, repeat: activeStep === idx ? Infinity : 0 }}
                >
                  <ArrowRightIcon size={28} className="text-[#c9a84c]" />
                </motion.div>
              </div>
            )}

            <motion.div
              animate={{
                scale: activeStep === idx ? [1, 1.03, 1] : completedSteps[idx] ? 1.02 : 1,
                boxShadow: activeStep === idx ? "0 0 30px rgba(201,168,76,0.4)" : completedSteps[idx] ? "0 0 15px rgba(201,168,76,0.2)" : "none",
                borderColor: completedSteps[idx] ? "#c9a84c" : activeStep === idx ? "#c9a84c" : "rgba(255,255,255,0.1)"
              }}
              transition={{ duration: 0.5, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
              className={`bg-gradient-to-br ${step.color} border-2 rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-500`}
            >
              {activeStep === idx && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
              )}

              <div className="absolute top-3 right-3">
                {completedSteps[idx] ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-[#c9a84c] flex items-center justify-center"
                  >
                    <Check size={12} className="text-[#080c14]" />
                  </motion.div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-xs font-bold">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                <step.icon size={28} className="text-[#c9a84c]" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm mb-2">{step.description}</p>
              <p className="text-[#c9a84c]/60 text-xs">{step.detail}</p>

              {activeStep === idx && (
                <div className="mt-3 flex justify-center gap-1">
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

// --- Pricing Section with Clear Tiers ---
const PricingSection = ({ onFreeTrialClick }) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/30 transition-all duration-300">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Bot size={24} className="text-white/40" />
            </div>
            <h3 className="text-xl font-bold text-white">Basic Plan</h3>
            <div className="mt-4 mb-2">
              <span className="text-4xl font-bold text-white">$49.99</span>
              <span className="text-white/40">/month</span>
            </div>
            <p className="text-[#c9a84c] text-xs mb-4">For smaller clinics with basic needs</p>
            <ul className="space-y-2 text-left mt-6 mb-6">
              <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Up to 500 calls/month</li>
              <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Basic appointment booking</li>
              <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Email support</li>
              <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Basic CRM integration</li>
            </ul>
          </div>
        </div>

        {/* Professional Plan - Highlighted */}
        <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border-2 border-[#c9a84c]/50 rounded-2xl p-6 shadow-2xl shadow-[#c9a84c]/20">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#080c14] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
            MOST POPULAR
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-2xl" />
          <div className="relative text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#c9a84c]/20 flex items-center justify-center mb-4">
              <Crown size={24} className="text-[#c9a84c]" />
            </div>
            <h3 className="text-xl font-bold text-white">Professional Plan</h3>
            <div className="mt-4 mb-2">
              <span className="text-4xl font-bold text-[#c9a84c]">$99.99</span>
              <span className="text-white/40">/month</span>
            </div>
            <p className="text-[#c9a84c] text-xs mb-4">Best value for growing practices</p>
            <ul className="space-y-2 text-left mt-6 mb-6">
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Unlimited calls</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Advanced AI workflows</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Priority support 24/7</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Full CRM integration</li>
              <li className="flex items-center gap-2 text-white/80 text-sm"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Custom AI training</li>
            </ul>
            <button 
              onClick={onFreeTrialClick}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all transform hover:scale-105"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-white/40 text-sm flex items-center justify-center gap-2">
          <Info size={14} /> Pricing varies based on call volume, CRM complexity, and custom AI workflows. Contact us for enterprise pricing.
        </p>
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
      className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full bg-[#c9a84c]/15 blur-[120px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`, top: '30%', left: '20%' }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-[#c9a84c]/10 blur-[100px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`, bottom: '20%', right: '15%' }}
        />
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
          Answers calls instantly, books appointments automatically, and updates your CRM in real-time.
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

        <CTAButtons onDemoClick={onDemoClick} onTrialClick={onFreeTrialClick} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/40"
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
    { q: "How does pricing work for higher call volumes?", a: "Our Basic plan ($49.99) covers up to 500 calls/month. For higher volumes, custom AI workflows, or complex CRM integrations, we offer custom enterprise pricing. Contact us for a personalized quote." },
  ];

  return (
    <div className="bg-[#080c14] min-h-screen font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <AnimatedHero onFreeTrialClick={() => setShowFreeTrial(true)} onDemoClick={() => setShowCalendly(true)} />

      {/* AI Work Animation - Above Video */}
      <SectionWrapper className="pt-0 pb-8">
        <AIWorkAnimation />
      </SectionWrapper>

      {/* Video Section */}
      <SectionWrapper className="pt-0 pb-16">
        <VideoSection />
      </SectionWrapper>

      {/* CTA after Video */}
      <SectionWrapper className="pt-0 pb-8">
        <div className="text-center">
          <CTAButtons onDemoClick={() => setShowCalendly(true)} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper id="how-it-works" className="py-16">
        <SectionHeader badge="Simple Process" title="How It Works" description="A 3-step system that turns missed calls into booked appointments" />
        <AnimatedProcessFlow />
      </SectionWrapper>

      {/* CTA after How It Works */}
      <SectionWrapper className="pt-0 pb-8">
        <div className="text-center">
          <CTAButtons onDemoClick={() => setShowCalendly(true)} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Problem Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader badge="The Problem" title="Every Missed Call = Lost Revenue" description="You're losing patients daily without knowing it." center={false} />
            
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 font-bold text-center text-lg">Clinics lose 30–40% of calls</p>
              <p className="text-red-400/70 text-center text-sm mt-1">That's thousands in lost revenue every month</p>
            </div>

            <ul className="space-y-4">
              {["Patients call when you're busy with other patients", "No one answers after clinic hours or on weekends", "Reception mistakes lead to double-booking", "No call tracking means no follow-ups"].map((item, idx) => (
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
                  { patient: "Sarah Johnson", time: "2:15 PM", status: "Missed", value: "$450" },
                  { patient: "Michael Chen", time: "6:30 PM", status: "Missed", value: "$320" },
                  { patient: "Dr. Emily Wilson", time: "8:45 AM", status: "Missed", value: "$580" }
                ].map((call, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div><p className="text-white/80 text-sm font-medium">{call.patient}</p><p className="text-white/30 text-xs">{call.time}</p></div>
                      <div className="text-right"><p className="text-red-400 text-xs">{call.status}</p><p className="text-red-400/70 text-xs">-{call.value}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Solution Section */}
      <SectionWrapper className="py-16">
        <SectionHeader badge="The Solution" title="Your 24/7 AI Receptionist That Converts Calls Into Appointments" center={true} />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-500/5 to-[#0a0f1c] border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4"><XCircle size={20} className="text-red-400" /><h3 className="text-white font-bold text-lg">Before AI</h3></div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Missed calls after hours</li>
              <li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Manual appointment booking</li>
              <li className="flex items-center gap-2 text-white/60"><X size={14} className="text-red-400" /> Lost revenue from unanswered calls</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#c9a84c]/10 to-[#0a0f1c] border border-[#c9a84c]/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/5 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-2 mb-4"><ThumbsUp size={20} className="text-[#c9a84c]" /><h3 className="text-white font-bold text-lg">With AI</h3></div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> AI answers instantly 24/7</li>
              <li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Auto appointment booking</li>
              <li className="flex items-center gap-2 text-white/70"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Capture every patient call</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA after Solution */}
      <SectionWrapper className="pt-0 pb-8">
        <div className="text-center">
          <CTAButtons onDemoClick={() => setShowCalendly(true)} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* Integration Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-16">
        <SectionHeader badge="Seamless Integration" title="Works With Your Existing Setup" description="No need to change your current systems or processes." />
        <IntegrationSection />
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing" className="py-16">
        <SectionHeader badge="Simple Pricing" title="Simple, Affordable Pricing" description="Transparent pricing with no hidden fees. Start with a 7-day free trial." />
        <PricingSection onFreeTrialClick={() => setShowFreeTrial(true)} />
      </SectionWrapper>

      {/* CTA after Pricing */}
      <SectionWrapper className="pt-0 pb-8">
        <div className="text-center">
          <CTAButtons onDemoClick={() => setShowCalendly(true)} onTrialClick={() => setShowFreeTrial(true)} variant="small" />
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper className="bg-gradient-to-b from-[#0a0f1c] to-[#080c14] py-16">
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" description="Got questions? We've got answers." />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="border border-white/10 rounded-xl overflow-hidden hover:border-[#c9a84c]/30 transition-all duration-300">
              <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-5 text-left">
                <span className="text-white font-semibold">{faq.q}</span>
                <ChevronDown size={18} className={`text-white/50 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="p-5 pt-0 text-white/50 text-sm border-t border-white/10">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper className="py-16">
        <div className="rounded-2xl bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Never Miss a Patient Call Again?</h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Join hundreds of dental practices automating their front desk with our AI voice agent.</p>
          <CTAButtons onDemoClick={() => setShowCalendly(true)} onTrialClick={() => setShowFreeTrial(true)} />
        </div>
      </SectionWrapper>

      {/* Footer */}
      <div className="border-t border-white/10 py-6 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center">
                <Mic size={16} className="text-[#080c14]" />
              </div>
              <span className="text-white font-bold">Dental<span className="text-[#c9a84c]">Voice</span>AI</span>
            </div>
            <div className="text-white/40 text-sm">© 2024 DentalVoiceAI. AI Voice Receptionist for Dental Practices</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FastCalendlyModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
      <FreeTrialModal isOpen={showFreeTrial} onClose={() => setShowFreeTrial(false)} />
    </div>
  );
}

// Missing Info component
const Info = ({ size, className }) => <span className={className}>i</span>;
