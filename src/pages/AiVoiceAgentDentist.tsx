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
  Globe, PhoneForwarded, CreditCard, Check
} from 'lucide-react';

// --- Configuration ---
const FORM_SUBMIT_URL = "https://formsubmit.co/pranjallundefined@gmail.com";
const CALENDLY_URL = "https://calendly.com/pranjaldigital-info/30min";

// --- Helper Components ---
const SectionWrapper = ({ children, className = "", id }) => (
  <section id={id} className={`py-16 md:py-24 relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-transparent to-[#080c14] pointer-events-none" />
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
const FreeTrialModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', clinicName: '',
    preferredTime: '', bestTimeToCall: '', services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = ['9am - 12pm', '12pm - 3pm', '3pm - 6pm', '6pm - 9pm', 'Anytime'];
  const callOptions = ['Morning (9am-12pm)', 'Afternoon (12pm-3pm)', 'Evening (3pm-6pm)', 'Flexible'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', clinicName: '', preferredTime: '', bestTimeToCall: '', services: [] });
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#c9a84c]/30 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"><X size={16} /></button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                <Zap size={28} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Start Your 7-Day Free Trial</h3>
              <p className="text-white/50 text-sm">Fill out the form below and we'll activate your trial within 24 hours.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs mb-1">Full Name *</label>
                  <input required name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Dr. John Smith" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1">Clinic Name *</label>
                  <input required name="clinic" value={formData.clinicName} onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })} placeholder="Smith Dental Care" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-1">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="dr.smith@dentalcare.com" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-1">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 (555) 000-9999" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">What services are you interested in? *</label>
                <div className="grid grid-cols-2 gap-2">
                  {['AI Voice Receptionist', 'CRM Integration', 'Appointment Booking', 'SMS Reminders', 'Analytics Dashboard', 'Custom Training'].map(service => (
                    <label key={service} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                      <input type="checkbox" value={service} onChange={(e) => {
                        const updated = e.target.checked ? [...formData.services, service] : formData.services.filter(s => s !== service);
                        setFormData({ ...formData, services: updated });
                      }} className="rounded border-white/20 bg-[#080c14] text-[#c9a84c] focus:ring-[#c9a84c]/20" />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-1">Preferred Trial Start Date</label>
                <select name="preferredDate" value={formData.preferredTime} onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })} className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm">
                  <option value="">Select a timeframe...</option>
                  {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-1">Best Time to Call You *</label>
                <select required name="bestTime" value={formData.bestTimeToCall} onChange={(e) => setFormData({ ...formData, bestTimeToCall: e.target.value })} className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm">
                  <option value="">Select preferred time...</option>
                  {callOptions.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Activating...</> : <>Start Free Trial <ArrowRight size={16} /></>}
              </button>
              <p className="text-white/30 text-xs text-center">No credit card required • Cancel anytime</p>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4">
              <Check size={40} className="text-[#c9a84c]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Trial Request Received!</h3>
            <p className="text-white/60">We'll contact you within 24 hours to activate your 7-day free trial.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- How It Works Flow Component ---
const HowItWorksFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 3);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const steps = [
    { icon: PhoneCall, title: "Patient Calls", description: "Uses your existing clinic number. AI answers instantly, 24/7/365.", color: "from-blue-500/20 to-blue-500/5", glow: "blue-500" },
    { icon: Mic, title: "AI Agent Answers", description: "Understands patient needs, checks real-time availability, books appointments naturally.", color: "from-[#c9a84c]/20 to-[#c9a84c]/5", glow: "#c9a84c" },
    { icon: Database, title: "CRM Updated", description: "Patient details saved, appointment logged, and follow-ups automated seamlessly.", color: "from-green-500/20 to-green-500/5", glow: "green-500" }
  ];

  return (
    <div ref={ref} className="relative py-12">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block" />
      <div className="grid md:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2 } } }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <motion.div
              animate={{
                scale: activeStep === idx ? [1, 1.02, 1] : 1,
                borderColor: activeStep === idx ? step.glow : 'rgba(255,255,255,0.1)',
                boxShadow: activeStep === idx ? `0 0 30px ${step.glow}40` : 'none'
              }}
              transition={{ duration: 0.5, repeat: activeStep === idx ? Infinity : 0, repeatDelay: 2 }}
              className={`bg-gradient-to-br ${step.color} border rounded-2xl p-6 text-center relative overflow-hidden`}
            >
              {activeStep === idx && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 relative z-10`}>
                <step.icon size={28} className={`text-${step.glow === '#c9a84c' ? '[#c9a84c]' : step.glow === 'blue-500' ? 'text-blue-400' : 'text-green-400'}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm">{step.description}</p>
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <motion.div animate={{ x: activeStep === idx ? [0, 5, 0] : 0 }} transition={{ duration: 0.8, repeat: activeStep === idx ? Infinity : 0 }}>
                    <ChevronRight size={24} className="text-[#c9a84c]/50" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {steps.map((_, idx) => (
          <button key={idx} onClick={() => setActiveStep(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === idx ? 'w-6 bg-[#c9a84c]' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};

// --- Animated Hero Component ---
const AnimatedHero = ({ onFreeTrialClick, onDemoClick }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const rotatingTexts = ["$49.99/month", "7-Day Free Trial", "Setup in 24 Hours", "No Contract"];

  useEffect(() => {
    const interval = setInterval(() => setCurrentTextIndex(prev => (prev + 1) % rotatingTexts.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#c9a84c]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#c9a84c]/5 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[150px]" />
      </div>

      <div className="relative text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">AI for Dental Practices</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Never Miss a Patient Call Again —
          <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent">Even After Clinic Hours</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          AI Voice Receptionist for Dentists that answers calls, books appointments, and updates your CRM automatically.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8"
        >
          <DollarSign size={16} className="text-[#c9a84c]" />
          <span className="text-white font-semibold">Plans start at</span>
          <motion.span
            key={currentTextIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#c9a84c] font-bold"
          >
            {rotatingTexts[currentTextIndex]}
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onFreeTrialClick}
            className="group bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start Free Trial
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}><ArrowRight size={16} /></motion.span>
          </button>
          <button
            onClick={onDemoClick}
            className="bg-white/5 border border-white/10 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calendar size={16} /> Request Demo Call
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/50"
        >
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Works with your existing number</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> CRM integration included</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Setup in 24 hours</span>
        </motion.div>
      </div>
    </div>
  );
};

// --- Animated Video Section ---
const AnimatedVideoSection = () => {
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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a84c]/30 to-[#c9a84c]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#0d1220]">
        <div className="aspect-video bg-black/50 flex items-center justify-center relative cursor-pointer group/video">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-[#c9a84c]/20 flex items-center justify-center group-hover/video:bg-[#c9a84c]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] flex items-center justify-center pl-1">
                <Play size={28} className="text-[#080c14]" />
              </div>
            </motion.div>
          </div>
          <img
            src="https://placehold.co/1200x600/0a0f1c/ffffff?text=Dental+AI+Voice+Demo+Video"
            alt="Demo Video Thumbnail"
            className="w-full h-full object-cover rounded-xl opacity-40 group-hover/video:opacity-30 transition-opacity duration-500"
          />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/80 text-xs">Live Demo</span>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white/60 text-xs">2:34 min</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-white/40 text-sm mt-4 flex items-center justify-center gap-2">
        <Video size={14} /> Watch How Patients Book Appointments Without a Receptionist
      </p>
    </motion.div>
  );
};

// --- Main Component ---
export default function DentalVoiceAgentLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const scrollToCalendly = () => setShowCalendly(true);
  const openFreeTrial = () => setShowFreeTrial(true);

  const faqs = [
    { q: "How does the AI voice agent work with my existing phone number?", a: "Simply forward your clinic's number to us, or we provide a new local number. The AI answers instantly, 24/7, using your clinic's protocols." },
    { q: "Can it handle complex appointment scheduling?", a: "Absolutely. It checks real-time availability from your calendar, books, reschedules, and cancels appointments—all through natural conversation." },
    { q: "What CRMs do you integrate with?", a: "We integrate with all major dental CRMs (Dentrix, Eaglesoft, Open Dental) and general CRMs like HubSpot, Salesforce, and GoHighLevel. No CRM? We provide a simple one for free." },
    { q: "Is there a long-term contract?", a: "No. Our service is month-to-month. You can cancel anytime. The 7-day free trial is completely risk-free." },
    { q: "How fast is the setup?", a: "Most clinics are live within 24 hours. We handle the number forwarding, AI training, and CRM integration for you." },
  ];

  const countryCodesList = [
    { code: "+1", country: "US/Canada" }, { code: "+44", country: "UK" }, { code: "+91", country: "India" },
    { code: "+61", country: "Australia" }, { code: "+49", country: "Germany" }, { code: "+33", country: "France" },
  ];
  const countries = ["United States", "Canada", "United Kingdom", "India", "Australia", "Germany", "France", "Other"];

  const getDefaultCountryCode = (country) => {
    const match = { "United States": "+1", "Canada": "+1", "United Kingdom": "+44", "India": "+91", "Australia": "+61", "Germany": "+49", "France": "+33" };
    return match[country] || "+1";
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setCountryCode(getDefaultCountryCode(country));
  };

  return (
    <div className="bg-[#080c14] min-h-screen font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080c14]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center">
                <Mic size={16} className="text-[#080c14]" />
              </div>
              <span className="text-white font-bold text-lg">Dental<span className="text-[#c9a84c]">Voice</span>AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-white/70 hover:text-[#c9a84c] transition-colors text-sm">How It Works</a>
              <a href="#pricing" className="text-white/70 hover:text-[#c9a84c] transition-colors text-sm">Pricing</a>
              <a href="#demo" className="text-white/70 hover:text-[#c9a84c] transition-colors text-sm">Demo</a>
              <button onClick={openFreeTrial} className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 px-5 rounded-xl text-sm hover:shadow-lg transition-all">
                Free Trial
              </button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#080c14] border-t border-white/10">
              <div className="px-4 py-4 space-y-3">
                <a href="#how-it-works" className="block text-white/70 py-2">How It Works</a>
                <a href="#pricing" className="block text-white/70 py-2">Pricing</a>
                <a href="#demo" className="block text-white/70 py-2">Demo</a>
                <button onClick={openFreeTrial} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 rounded-xl">Free Trial</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <SectionWrapper className="pt-20 md:pt-24">
        <AnimatedHero onFreeTrialClick={openFreeTrial} onDemoClick={scrollToCalendly} />
      </SectionWrapper>

      {/* Video Section */}
      <SectionWrapper className="pt-0">
        <AnimatedVideoSection />
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper id="how-it-works">
        <SectionHeader badge="Simple Process" title="How It Works" description="A 3-step system that turns missed calls into booked appointments" />
        <HowItWorksFlow />
        <div className="text-center mt-8">
          <button onClick={scrollToCalendly} className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#dbb85c] transition-colors font-semibold group">
            See it in action <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </SectionWrapper>

      {/* Problem Section */}
      <SectionWrapper className="bg-[#0a0f1c]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader badge="The Problem" title="Every Missed Call = Lost Revenue" description="You're losing patients daily without knowing it." center={false} />
            <ul className="space-y-4">
              {["Patients call when you're busy with other patients", "No one answers after clinic hours or on weekends", "Reception mistakes lead to double-booking and lost trust", "No call tracking means no follow-ups on missed opportunities"].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3"><X size={18} className="text-red-400 mt-0.5 flex-shrink-0" /><span className="text-white/70">{item}</span></li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 font-semibold text-center">A typical dental clinic loses $5,000+ per month from unanswered calls.</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-3xl" />
            <div className="relative bg-gradient-to-br from-[#0d1220] to-[#080c14] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4"><div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" /><span className="text-white/70 text-sm">Missed Call Alert</span></div>
              <div className="space-y-3">
                {["Patient: Dr. Smith, I need an emergency appointment", "System: No available slots today", "Caller: I'll go somewhere else then", "Status: MISSED OPPORTUNITY - $450 LOST"].map((text, i) => (
                  <div key={i} className="h-10 bg-white/5 rounded-lg flex items-center px-3"><span className="text-white/40 text-xs">{text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Solution Section */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <SectionHeader badge="The Solution" title="Your 24/7 AI Receptionist That Converts Calls Into Appointments" center={false} />
            <div className="grid grid-cols-2 gap-4">
              {["Answers every call instantly", "Books appointments automatically", "Handles patient questions intelligently", "Reduces no-shows with reminders", "Syncs everything to your CRM", "Works 24/7/365 without breaks"].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#c9a84c]" /><span className="text-white/70 text-sm">{point}</span></div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-[#c9a84c]/20 to-transparent blur-3xl" />
            <div className="relative bg-gradient-to-br from-[#0d1220] to-[#080c14] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-white/50 text-xs">AI Agent Active</span></div>
                <span className="text-[#c9a84c] text-xs bg-[#c9a84c]/10 px-2 py-1 rounded-full">24/7</span>
              </div>
              <div className="space-y-3">
                <div className="h-10 bg-white/5 rounded-lg flex items-center px-3"><span className="text-white/60 text-xs">Patient: I need to book a cleaning</span></div>
                <div className="h-10 bg-[#c9a84c]/20 rounded-lg flex items-center px-3"><span className="text-[#c9a84c] text-xs">AI: I have Thursday at 2pm available. Shall I book it?</span></div>
                <div className="h-10 bg-white/5 rounded-lg flex items-center px-3"><span className="text-white/60 text-xs">Patient: Yes please!</span></div>
                <div className="h-10 bg-green-500/20 rounded-lg flex items-center px-3"><span className="text-green-400 text-xs">✓ Appointment booked! Confirmation sent.</span></div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Integration Section */}
      <SectionWrapper className="bg-[#0a0f1c]">
        <SectionHeader badge="Seamless Integration" title="Works With Your Existing Setup" description="No need to change your current systems or processes." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ icon: Phone, label: "Your Current Number" }, { icon: Database, label: "Your Existing CRM" }, { icon: Monitor, label: "Free CRM Included" }, { icon: Smartphone, label: "Works with Any System" }].map((item, idx) => (
            <div key={idx} className="group bg-gradient-to-br from-[#0d1220] to-[#080c14] border border-white/10 rounded-xl p-6 hover:border-[#c9a84c]/30 transition-all duration-300">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"><item.icon size={24} className="text-[#c9a84c]" /></div>
              <p className="text-white/70 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing">
        <SectionHeader badge="Simple Pricing" title="Simple, Affordable Pricing" description="Transparent pricing with no hidden fees. Start with a 7-day free trial." />
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-[#c9a84c]/30 rounded-2xl p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-3xl group-hover:bg-[#c9a84c]/20 transition-all duration-700" />
            <div className="relative">
              <div className="inline-flex items-center gap-1 bg-[#c9a84c]/10 px-3 py-1 rounded-full mb-4"><Star size={12} className="text-[#c9a84c]" /><span className="text-[#c9a84c] text-xs">Most Popular</span></div>
              <h3 className="text-2xl font-bold text-white">Professional Plan</h3>
              <div className="mt-4 mb-2"><span className="text-4xl font-bold text-white">$49.99</span><span className="text-white/40">/month</span></div>
              <ul className="space-y-2 text-left mt-6 mb-8">
                {["AI voice agent 24/7", "CRM integration included", "Appointment booking system", "Email & chat support", "7-day free trial"].map((feature, idx) => (<li key={idx} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#c9a84c]" /><span className="text-white/70 text-sm">{feature}</span></li>))}
              </ul>
              <button onClick={openFreeTrial} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all">Start Free Trial</button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Demo Form Section */}
      <SectionWrapper id="demo">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader badge="Book a Demo" title="See the AI Voice Agent in Action" description="Schedule a personalized demo and see how our AI can transform your dental practice's call management." center={false} />
            <div className="space-y-4">
              <div className="flex items-center gap-3 group"><div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle2 size={16} className="text-[#c9a84c]" /></div><div><p className="text-white font-medium">Live product walkthrough</p><p className="text-white/40 text-sm">See exactly how the AI handles calls</p></div></div>
              <div className="flex items-center gap-3 group"><div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle2 size={16} className="text-[#c9a84c]" /></div><div><p className="text-white font-medium">Customized for your practice</p><p className="text-white/40 text-sm">Learn how it integrates with your workflow</p></div></div>
              <div className="flex items-center gap-3 group"><div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle2 size={16} className="text-[#c9a84c]" /></div><div><p className="text-white font-medium">No obligation, 15-min call</p><p className="text-white/40 text-sm">Get all your questions answered</p></div></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6">Book Your Free Demo Call</h3>
            <form action={FORM_SUBMIT_URL} method="POST" className="space-y-4">
              <input type="hidden" name="_subject" value="New Dental Voice Agent Demo Request" />
              <input type="hidden" name="_next" value="https://pranjaldigital.com/thank-you" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" required placeholder="Full Name *" className="bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" />
                <input name="clinic" required placeholder="Clinic Name *" className="bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" />
              </div>
              <div><input name="email" type="email" required placeholder="Email Address *" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" /></div>
              <div className="flex gap-2"><select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="w-28 bg-[#080c14] border border-white/10 text-white rounded-xl px-3 py-3 text-sm"><option value="+1">+1</option><option value="+44">+44</option><option value="+91">+91</option></select><input name="phone" required placeholder="Phone Number *" className="flex-1 bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#c9a84c]/50 transition-all" /></div>
              <div><select name="crm" className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm"><option value="">Do you have a CRM?</option><option>Yes, I have a CRM</option><option>No, I need one</option><option>Not sure</option></select></div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">Book My Demo <Calendar size={16} /></button>
            </form>
          </div>
        </div>
      </SectionWrapper>

      {/* Second CTA Section */}
      <SectionWrapper>
        <div className="rounded-2xl bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Never Miss a Patient Call Again?</h3>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">Join hundreds of dental practices automating their front desk with our AI voice agent.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openFreeTrial} className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 flex items-center justify-center gap-2 group">Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></button>
            <button onClick={scrollToCalendly} className="bg-white/5 border border-white/10 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">Request Demo Call</button>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper className="bg-[#0a0f1c]">
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" description="Got questions? We've got answers." />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-5 text-left"><span className="text-white font-semibold">{faq.q}</span><ChevronDown size={18} className={`text-white/50 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} /></button>
              <AnimatePresence>{activeFaq === idx && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><div className="p-5 pt-0 text-white/50 text-sm border-t border-white/10">{faq.a}</div></motion.div>)}</AnimatePresence>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stop Missing Calls. Start Booking More Patients Automatically.</h2>
          <div className="inline-flex items-center gap-2 bg-[#0a0f1c] border border-white/10 rounded-full px-5 py-2 mb-8">
            <DollarSign size={16} className="text-[#c9a84c]" /><span className="text-white font-semibold">Starts at $49.99/month</span><span className="text-white/40 text-sm mx-2">•</span><span className="text-white/70 text-sm">7-day free trial • Setup done for you</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openFreeTrial} className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group">Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></button>
            <button onClick={scrollToCalendly} className="bg-white/5 border border-white/10 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all">Request Demo</button>
          </div>
        </div>
      </SectionWrapper>

      {/* Calendly Modal */}
      <AnimatePresence>
        {showCalendly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#080c14] rounded-2xl w-full max-w-4xl h-[80vh] overflow-hidden border border-white/10">
              <button onClick={() => setShowCalendly(false)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"><X size={16} /></button>
              <iframe src={CALENDLY_URL} width="100%" height="100%" frameBorder="0" className="bg-white" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Free Trial Modal */}
      <FreeTrialModal isOpen={showFreeTrial} onClose={() => setShowFreeTrial(false)} />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-white/40 text-sm">
          <p>© 2024 DentalVoiceAI. All rights reserved. AI Voice Receptionist for Dental Practices.</p>
        </div>
      </footer>
    </div>
  );
}
