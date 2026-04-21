import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone, Calendar, CheckCircle2, ChevronRight, Play, Star, 
  TrendingUp, Clock, Headphones, Shield, Zap, Users, 
  MessageSquare, Briefcase, DollarSign, ChevronDown, 
  ArrowRight, Sparkles, Smartphone, Monitor, Database,
  Award, HeartHandshake, BarChart3, Timer, Mail, Mic,
  Video, X, Menu, ExternalLink, CircleCheckBig
} from 'lucide-react';

// --- Configuration ---
const FORM_SUBMIT_URL = "https://formsubmit.co/pranjallundefined@gmail.com";
const CALENDLY_URL = "https://calendly.com/pranjaldigital-info/30min";

// --- Helper Components ---
const SectionWrapper = ({ children, className = "" }) => (
  <section className={`py-16 md:py-24 relative overflow-hidden ${className}`}>
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

const CTASection = ({ dark = false }) => (
  <div className={`rounded-2xl p-8 md:p-12 text-center ${dark ? 'bg-[#0a0f1c] border border-white/10' : 'bg-gradient-to-br from-[#c9a84c]/10 to-[#0d1220] border border-[#c9a84c]/20'}`}>
    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Never Miss a Patient Call Again?</h3>
    <p className="text-white/60 mb-6 max-w-xl mx-auto">
      Join hundreds of dental practices automating their front desk with our AI voice agent.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 flex items-center justify-center gap-2 group">
        Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <button className="bg-white/5 border border-white/10 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
        Request Demo Call
      </button>
    </div>
  </div>
);

// --- Main Component ---
export default function DentalVoiceAgentLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  // Animation controls
  const heroControls = useAnimation();
  const stepsControls = useAnimation();
  const heroRef = useRef(null);
  const stepsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isStepsInView = useInView(stepsRef, { once: true });

  useEffect(() => {
    if (isHeroInView) heroControls.start("visible");
    if (isStepsInView) stepsControls.start("visible");
  }, [heroControls, stepsControls, isHeroInView, isStepsInView]);

  const scrollToCalendly = () => {
    const element = document.getElementById('calendly-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowCalendly(true);
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

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
              <button onClick={scrollToCalendly} className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 px-5 rounded-xl text-sm hover:shadow-lg transition-all">
                Book Demo
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
                <button onClick={scrollToCalendly} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-2 rounded-xl">Book Demo</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <SectionWrapper className="pt-24 md:pt-32">
        <motion.div ref={heroRef} initial="hidden" animate={heroControls} variants={fadeUpVariants} className="text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} className="text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">AI for Dental Practices</span>
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Never Miss a Patient Call Again — <span className="bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent">Even After Clinic Hours</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            AI Voice Receptionist for Dentists that answers calls, books appointments, and updates your CRM automatically.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#0a0f1c] border border-white/10 rounded-full px-5 py-2 mb-8">
            <DollarSign size={16} className="text-[#c9a84c]" />
            <span className="text-white font-semibold">Plans start at <span className="text-[#c9a84c]">$49.99/month</span></span>
            <span className="text-white/40 text-sm mx-2">•</span>
            <span className="text-white/70 text-sm">7-Day Free Trial Included</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 flex items-center justify-center gap-2 group">
              Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={scrollToCalendly} className="bg-white/5 border border-white/10 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
              Request Demo Call
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/50">
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Works with your existing number</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> CRM integration included</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#c9a84c]" /> Setup in 24 hours</span>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Demo Video Section */}
      <SectionWrapper className="pt-0">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] p-2">
          <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#c9a84c]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] flex items-center justify-center pl-1">
                  <Play size={28} className="text-[#080c14]" />
                </div>
              </div>
            </div>
            <img src="https://placehold.co/1200x600/0a0f1c/ffffff?text=Dental+AI+Voice+Demo+Video" alt="Demo Video Thumbnail" className="w-full h-full object-cover rounded-xl opacity-50" />
          </div>
        </div>
        <p className="text-center text-white/40 text-sm mt-4">Watch How Patients Book Appointments Without a Receptionist</p>
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper id="how-it-works">
        <SectionHeader badge="Simple Process" title="How It Works" description="A 3-step system that turns missed calls into booked appointments" />
        <motion.div ref={stepsRef} initial="hidden" animate={stepsControls} variants={staggerContainerVariants} className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Phone, title: "Patient Calls Your Number", description: "No change needed—use your same clinic number. The AI answers instantly, 24/7." },
            { icon: Mic, title: "AI Agent Answers Instantly", description: "Understands patient needs, checks real-time availability, and books appointments naturally." },
            { icon: Database, title: "Data Sent to Your CRM", description: "Patient details saved, appointment logged, and follow-ups automated seamlessly." }
          ].map((step, idx) => (
            <motion.div key={idx} variants={fadeUpVariants} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a84c]/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 rounded-2xl p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.description}</p>
                {idx < 2 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-[#c9a84c]/30"><ChevronRight size={24} /></div>}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <button onClick={scrollToCalendly} className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#dbb85c] transition-colors font-semibold">
            See it in action → <ArrowRight size={16} />
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
              <div className="space-y-3"><div className="h-10 bg-white/5 rounded-lg w-full"></div><div className="h-10 bg-white/5 rounded-lg w-3/4"></div><div className="h-10 bg-white/5 rounded-lg w-1/2"></div></div>
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
              <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-white/50 text-xs">AI Agent Active</span><span className="text-[#c9a84c] text-xs ml-auto">24/7</span></div>
              <div className="space-y-3"><div className="h-10 bg-white/5 rounded-lg w-full"></div><div className="h-10 bg-[#c9a84c]/20 rounded-lg w-3/4"></div><div className="h-10 bg-white/5 rounded-lg w-1/2"></div></div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Integration Section */}
      <SectionWrapper className="bg-[#0a0f1c]">
        <SectionHeader badge="Seamless Integration" title="Works With Your Existing Setup" description="No need to change your current systems or processes." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ icon: Phone, label: "Your Current Number" }, { icon: Database, label: "Your Existing CRM" }, { icon: Monitor, label: "Free CRM Included" }, { icon: Smartphone, label: "Works with Any System" }].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#0d1220] to-[#080c14] border border-white/10 rounded-xl p-6"><div className="w-12 h-12 mx-auto rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-3"><item.icon size={24} className="text-[#c9a84c]" /></div><p className="text-white/70 text-sm font-medium">{item.label}</p></div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper id="pricing">
        <SectionHeader badge="Simple Pricing" title="Simple, Affordable Pricing" description="Transparent pricing with no hidden fees. Start with a 7-day free trial." />
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-[#c9a84c]/30 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-1 bg-[#c9a84c]/10 px-3 py-1 rounded-full mb-4"><Star size={12} className="text-[#c9a84c]" /><span className="text-[#c9a84c] text-xs">Most Popular</span></div>
              <h3 className="text-2xl font-bold text-white">Professional Plan</h3>
              <div className="mt-4 mb-2"><span className="text-4xl font-bold text-white">$49.99</span><span className="text-white/40">/month</span></div>
              <ul className="space-y-2 text-left mt-6 mb-8">
                {["AI voice agent 24/7", "CRM integration included", "Appointment booking system", "Email & chat support", "7-day free trial"].map((feature, idx) => (<li key={idx} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#c9a84c]" /><span className="text-white/70 text-sm">{feature}</span></li>))}
              </ul>
              <button className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 rounded-xl hover:shadow-lg transition-all">Start Free Trial</button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Demo Form Section */}
      <SectionWrapper id="demo">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader badge="Book a Demo" title="See the AI Voice Agent in Action" description="Schedule a personalized demo and see how our AI can transform your dental practice's call management." center={false} />
            <div className="space-y-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center"><CheckCircle2 size={16} className="text-[#c9a84c]" /></div><div><p className="text-white font-medium">Live product walkthrough</p><p className="text-white/40 text-sm">See exactly how the AI handles calls</p></div></div><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center"><CheckCircle2 size={16} className="text-[#c9a84c]" /></div><div><p className="text-white font-medium">Customized for your practice</p><p className="text-white/40 text-sm">Learn how it integrates with your workflow</p></div></div><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center"><CheckCircle2 size={16} className="text-[#c9a84c]" /></div><div><p className="text-white font-medium">No obligation, 15-min call</p><p className="text-white/40 text-sm">Get all your questions answered</p></div></div></div>
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
        <CTASection dark={false} />
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
            <button className="bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group">Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></button>
            <button onClick={scrollToCalendly} className="bg-white/5 border border-white/10 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all">Request Demo</button>
          </div>
        </div>
      </SectionWrapper>

      {/* Calendly Modal Section */}
      <div id="calendly-section" className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showCalendly ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCalendly(false)} />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#080c14] rounded-2xl w-full max-w-4xl h-[80vh] overflow-hidden border border-white/10">
          <button onClick={() => setShowCalendly(false)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"><X size={16} /></button>
          <iframe src={CALENDLY_URL} width="100%" height="100%" frameBorder="0" className="bg-white" />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-white/40 text-sm">
          <p>© 2024 DentalVoiceAI. All rights reserved. AI Voice Receptionist for Dental Practices.</p>
        </div>
      </footer>
    </div>
  );
}
