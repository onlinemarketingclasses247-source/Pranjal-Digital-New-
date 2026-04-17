import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, CheckCircle2, Globe, Calendar, MessageSquare, FileText, Users, ClipboardList, Handshake, Send, Zap, Shield, Target, Sparkles, Phone, MapPin, Award, TrendingUp, Headphones, Linkedin, Twitter, Youtube, ChevronDown, BarChart3, Rocket, Brain, LineChart, PieChart, ArrowRight, Star, TrendingUp as TrendingUpIcon, Users as UsersIcon, DollarSign, Check, Clock as ClockIcon, PhoneCall, Video, MessageCircle, ThumbsUp, Briefcase, Trophy, Zap as ZapIcon, Crown } from 'lucide-react';

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

// Updated services list
const services = [
  'SaaS Marketing',
  'IT Services Marketing',
  'Dental Marketing',
  'Go High Level',
  'Ecommerce Marketing',
  'Healthcare Marketing',
  'US Local Business',
  'India Local Business',
  'SEO, AEO, GEO',
  'Performance Marketing',
  'Google Ads',
  'Meta Ads',
  'LinkedIn Ads',
  'Amazon Ads',
  'TikTok Ads',
  'Social Media Marketing',
  'YouTube Marketing',
  'Content Marketing',
  'Other',
];

const budgets = [
  'Under $500/month',
  '$500 – $1,500/month',
  '$1,500 – $3,000/month',
  '$3,000 – $5,000/month',
  '$5,000+/month',
  'One-time project',
];

// Country codes with dial codes
const countryCodesList = [
  { code: "+1", country: "US/Canada", countries: ["United States", "Canada"] },
  { code: "+44", country: "UK", countries: ["United Kingdom"] },
  { code: "+91", country: "India", countries: ["India"] },
  { code: "+61", country: "Australia", countries: ["Australia"] },
  { code: "+49", country: "Germany", countries: ["Germany"] },
  { code: "+33", country: "France", countries: ["France"] },
  { code: "+81", country: "Japan", countries: ["Japan"] },
  { code: "+65", country: "Singapore", countries: ["Singapore"] },
  { code: "+27", country: "South Africa", countries: ["South Africa"] },
  { code: "+971", country: "UAE", countries: ["UAE"] },
  { code: "+966", country: "Saudi Arabia", countries: ["Saudi Arabia"] },
  { code: "+852", country: "Hong Kong", countries: ["Hong Kong"] },
  { code: "+86", country: "China", countries: ["China"] },
  { code: "+82", country: "Korea", countries: ["South Korea"] },
  { code: "+55", country: "Brazil", countries: ["Brazil"] },
  { code: "+52", country: "Mexico", countries: ["Mexico"] },
  { code: "+34", country: "Spain", countries: ["Spain"] },
  { code: "+39", country: "Italy", countries: ["Italy"] },
  { code: "+31", country: "Netherlands", countries: ["Netherlands"] },
  { code: "+46", country: "Sweden", countries: ["Sweden"] },
  { code: "+47", country: "Norway", countries: ["Norway"] },
  { code: "+45", country: "Denmark", countries: ["Denmark"] },
  { code: "+358", country: "Finland", countries: ["Finland"] },
  { code: "+64", country: "New Zealand", countries: ["New Zealand"] },
  { code: "+60", country: "Malaysia", countries: ["Malaysia"] },
  { code: "+66", country: "Thailand", countries: ["Thailand"] },
  { code: "+62", country: "Indonesia", countries: ["Indonesia"] },
  { code: "+63", country: "Philippines", countries: ["Philippines"] },
  { code: "+84", country: "Vietnam", countries: ["Vietnam"] },
  { code: "+20", country: "Egypt", countries: ["Egypt"] },
  { code: "+234", country: "Nigeria", countries: ["Nigeria"] },
  { code: "+254", country: "Kenya", countries: ["Kenya"] },
  { code: "+598", country: "Uruguay", countries: ["Uruguay"] },
  { code: "+507", country: "Panama", countries: ["Panama"] },
];

const getDefaultCountryCode = (country) => {
  const match = countryCodesList.find(item => 
    item.countries.includes(country) || item.country === country
  );
  return match ? match.code : "+1";
};

const countries = [
  "United States", "Canada", "United Kingdom", "India", "Australia", "Germany", 
  "France", "Japan", "Singapore", "South Africa", "UAE", "Saudi Arabia", 
  "Hong Kong", "China", "South Korea", "Brazil", "Mexico", "Spain", "Italy", 
  "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "New Zealand", 
  "Malaysia", "Thailand", "Indonesia", "Philippines", "Vietnam", "Egypt", 
  "Nigeria", "Kenya", "Uruguay", "Panama", "Other"
];

const processSteps = [
  {
    icon: ClipboardList,
    title: 'Understand Requirements',
    description: 'We listen to your goals, challenges, and current marketing efforts to fully grasp your needs.',
    duration: '30-45 min',
  },
  {
    icon: Target,
    title: 'Analyze & Research',
    description: 'Deep dive into your market, competitors, and current performance to identify opportunities.',
    duration: '1-2 days',
  },
  {
    icon: Users,
    title: 'Kick-off Discovery Call',
    description: 'Strategic discussion to align on objectives, timeline, and key success metrics.',
    duration: '45-60 min',
  },
  {
    icon: FileText,
    title: 'Free Proposal & Audit',
    description: 'Comprehensive proposal with actionable insights and a no-obligation audit of your current strategy.',
    duration: '3-5 days',
  },
  {
    icon: Handshake,
    title: 'Partnership Launch',
    description: 'If everything aligns perfectly, we kick off with a structured onboarding process.',
    duration: 'Ready to start',
  }
];

// Pulsing icon component for Send Message
const PulsingIcon = ({ Icon, size = 24 }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-[#c9a84c] animate-ping opacity-75" style={{ animationDuration: '1.5s' }} />
      <div className="absolute inset-0 rounded-full bg-[#c9a84c] animate-pulse opacity-50" style={{ animationDuration: '1.5s' }} />
      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center shadow-lg shadow-[#c9a84c]/25">
        <Icon size={size} className="text-[#080c14]" />
      </div>
    </div>
  );
};

// Shaking phone icon component for Book Meeting
const ShakingPhoneIcon = () => {
  const [isShaking, setIsShaking] = useState(true);
  const [showPhone, setShowPhone] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setShowPhone(false);
      setTimeout(() => {
        setShowPhone(true);
        setTimeout(() => setIsShaking(false), 500);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.div
        animate={isShaking ? {
          rotate: [0, -10, 10, -10, 10, 0],
          x: [0, -2, 2, -2, 2, 0]
        } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#dbb85c] flex items-center justify-center shadow-lg shadow-[#c9a84c]/25"
      >
        {showPhone ? <Phone size={24} className="text-[#080c14]" /> : <Calendar size={24} className="text-[#080c14]" />}
      </motion.div>
    </div>
  );
};

export default function Contact() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    const defaultCode = getDefaultCountryCode(country);
    setCountryCode(defaultCode);
  };

  useEffect(() => {
    document.title = "Contact Digital Marketing Consultant | Pranjal Digital";
    setMeta(
      "Contact a digital marketing consultant to discuss your business growth. Book a strategy call or send a message to explore SEO, ads, and full-funnel solutions."
    );
  }, []);

  const scrollToCalendly = () => {
    const element = document.getElementById('calendly-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowCalendly(true);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="bg-[#080c14] min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[#c9a84c]/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#c9a84c]/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={14} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-wider">Get In Touch</span>
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Let's Build Something
            <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent">Remarkable Together</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg"
          >
            Two ways to connect — choose what works best for you
          </motion.p>
        </div>
      </div>

      {/* Two Options Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Option 1: Send Message */}
          <motion.div variants={fadeUp} className="group">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 overflow-hidden hover:border-[#c9a84c]/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/5 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <PulsingIcon Icon={MessageSquare} size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-white">Send a Message</h3>
                    <p className="text-white/40 text-sm">Get a response within 24 hours</p>
                  </div>
                </div>

                <form
                  action="https://formsubmit.co/pranjallundefined@gmail.com"
                  method="POST"
                  target="_blank"
                  className="space-y-5"
                  onSubmit={() => setIsSubmitting(true)}
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Lead from Pranjal Digital Website" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value="https://pranjaldigital.com/thank-you" />
                  <input type="hidden" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_redirect" value="https://pranjaldigital.com/thank-you" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Full Name *</label>
                      <input
                        name="name"
                        required
                        placeholder="John Smith"
                        className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/20 placeholder:text-white/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/20 placeholder:text-white/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Country *</label>
                    <select
                      name="country"
                      required
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-all cursor-pointer"
                    >
                      <option value="">Select country...</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Phone Number</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative sm:w-32">
                        <select
                          name="country_code"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full appearance-none bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-all cursor-pointer"
                        >
                          {countryCodesList.map((cc) => (
                            <option key={cc.code} value={cc.code}>{cc.code}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                      </div>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Phone number"
                        className="flex-1 bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/20 placeholder:text-white/20 transition-all"
                      />
                    </div>
                    <p className="text-white/30 text-xs mt-1">Country code auto-selects based on your country</p>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Company / Website</label>
                    <input
                      name="company"
                      placeholder="Your company or website URL"
                      className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/20 placeholder:text-white/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Service Interested In</label>
                      <select
                        name="service"
                        className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-all cursor-pointer"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Monthly Budget</label>
                      <select
                        name="budget"
                        className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-all cursor-pointer"
                      >
                        <option value="">Select budget range...</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your business, current challenges, and what you're looking to achieve..."
                      className="w-full bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/20 placeholder:text-white/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#080c14] border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message 
                        <Send size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} className="text-[#c9a84c]" />
                    <span className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider">What happens next:</span>
                  </div>
                  <div className="space-y-2 text-sm text-white/60">
                    <p className="flex items-center gap-2">✓ Form submitted → Email confirmation</p>
                    <p className="flex items-center gap-2">✓ Response within 24 hours</p>
                    <p className="flex items-center gap-2">✓ Discovery call scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Option 2: Book Meeting - RICH VISUAL ELEMENTS TO FILL DEAD SPACE */}
          <motion.div variants={fadeUp} className="group h-full">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#c9a84c]/5 to-[#0d1220] border-2 border-[#c9a84c]/30 overflow-hidden hover:border-[#c9a84c]/60 transition-all duration-500 h-full flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c9a84c]/5 rounded-full blur-2xl" />
              
              <div className="relative p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <ShakingPhoneIcon />
                  <div>
                    <h3 className="text-xl font-bold text-white">Book a Meeting</h3>
                    <p className="text-[#c9a84c]/70 text-sm">30-min free strategy call</p>
                  </div>
                </div>

                <div className="space-y-5 flex-1">
                  {/* Why book section */}
                  <div className="bg-black/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket size={16} className="text-[#c9a84c]" />
                      <p className="text-white font-semibold text-sm">✨ Why book a meeting:</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Immediate conversation about your goals',
                        'Real-time answers to your questions',
                        'No form filling — direct discussion',
                        'Get preliminary recommendations instantly'
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-[#c9a84c] shrink-0" />
                          <span className="text-white/60 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What happens next section */}
                  <div className="bg-[#c9a84c]/10 rounded-xl p-5 border border-[#c9a84c]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={14} className="text-[#c9a84c]" />
                      <span className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider">What happens next:</span>
                    </div>
                    <div className="space-y-2 text-sm text-white/60">
                      <p className="flex items-center gap-2">✓ Choose a time slot that works for you</p>
                      <p className="flex items-center gap-2">✓ Join the video/audio call</p>
                      <p className="flex items-center gap-2">✓ Discuss your business goals</p>
                      <p className="flex items-center gap-2">✓ Get immediate feedback & proposal within 48h</p>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={scrollToCalendly}
                    className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Book Your Free Call 
                    <Calendar size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {/* ========== RICH VISUAL CONTENT TO FILL DEAD SPACE ========== */}
                  
                  {/* Success Stats Grid */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-center text-white/30 text-[10px] uppercase tracking-wider mb-4">TRUSTED BY BUSINESSES WORLDWIDE</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center group/stat">
                        <div className="w-10 h-10 mx-auto rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-2 group-hover/stat:bg-[#c9a84c]/20 transition-all duration-300">
                          <Trophy size={16} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-white font-bold text-sm">400+</p>
                        <p className="text-white/30 text-[10px]">Happy Clients</p>
                      </div>
                      <div className="text-center group/stat">
                        <div className="w-10 h-10 mx-auto rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-2 group-hover/stat:bg-[#c9a84c]/20 transition-all duration-300">
                          <Globe size={16} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-white font-bold text-sm">20+</p>
                        <p className="text-white/30 text-[10px]">Countries</p>
                      </div>
                      <div className="text-center group/stat">
                        <div className="w-10 h-10 mx-auto rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-2 group-hover/stat:bg-[#c9a84c]/20 transition-all duration-300">
                          <TrendingUpIcon size={16} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-white font-bold text-sm">3x</p>
                        <p className="text-white/30 text-[10px]">Avg. ROI</p>
                      </div>
                    </div>
                  </div>

                  {/* Client Testimonial Snippet */}
                  <div className="bg-gradient-to-r from-[#c9a84c]/5 to-transparent rounded-lg p-3 border-l-2 border-[#c9a84c]">
                    <div className="flex items-center gap-2 mb-1">
                      <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                      <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                      <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                      <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                      <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                    </div>
                    <p className="text-white/60 text-[11px] italic">"Pranjal Digital transformed our online presence. Revenue increased by 150% in 6 months!"</p>
                    <p className="text-white/30 text-[10px] mt-1">— Sarah Chen, SaaS Founder</p>
                  </div>

                  {/* Process Timeline Mini */}
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider text-center mb-3">YOUR JOURNEY WITH US</p>
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="w-8 h-8 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                          <PhoneCall size={12} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-white/40 text-[8px] mt-1">Call</p>
                      </div>
                      <ArrowRight size={12} className="text-white/20" />
                      <div className="text-center flex-1">
                        <div className="w-8 h-8 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                          <Target size={12} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-white/40 text-[8px] mt-1">Strategy</p>
                      </div>
                      <ArrowRight size={12} className="text-white/20" />
                      <div className="text-center flex-1">
                        <div className="w-8 h-8 mx-auto rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                          <Rocket size={12} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-white/40 text-[8px] mt-1">Launch</p>
                      </div>
                      <ArrowRight size={12} className="text-white/20" />
                      <div className="text-center flex-1">
                        <div className="w-8 h-8 mx-auto rounded-full bg-[#c9a84c]/40 flex items-center justify-center">
                          <Trophy size={12} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-white/40 text-[8px] mt-1">Growth</p>
                      </div>
                    </div>
                  </div>

                  {/* Call to action reminder */}
                  <div className="flex items-center justify-center gap-2 text-white/20 text-[9px] pt-2">
                    <span>⚡</span>
                    <span>No obligation • Cancel anytime • 100% free</span>
                    <span>⚡</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Info Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#c9a84c]/5 blur-3xl group-hover:bg-[#c9a84c]/10 transition-all duration-700" />
            <div className="relative p-5 sm:p-6 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} className="text-[#c9a84c]" />
              </div>
              <h4 className="text-white font-bold text-base sm:text-lg mb-2">Email Us</h4>
              <p className="text-[#c9a84c] text-xs sm:text-sm font-mono mb-3 break-all">info@pranjaldigital.com</p>
              <p className="text-white/40 text-xs">We reply within 24 hours</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#c9a84c]/5 blur-3xl group-hover:bg-[#c9a84c]/10 transition-all duration-700" />
            <div className="relative p-5 sm:p-6 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock size={24} className="text-[#c9a84c]" />
              </div>
              <h4 className="text-white font-bold text-base sm:text-lg mb-2">Fast Response</h4>
              <p className="text-xl sm:text-2xl font-bold text-[#c9a84c] mb-2">Within 24h</p>
              <p className="text-white/40 text-xs">Usually much faster</p>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#c9a84c]/5 blur-3xl group-hover:bg-[#c9a84c]/10 transition-all duration-700" />
            <div className="relative p-5 sm:p-6 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe size={24} className="text-[#c9a84c]" />
              </div>
              <h4 className="text-white font-bold text-base sm:text-lg mb-2">Global Reach</h4>
              <p className="text-[#c9a84c] text-xs sm:text-sm font-semibold mb-2">US • Canada • India</p>
              <p className="text-white/40 text-xs">11+ countries served</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Calendly Section */}
      <div id="calendly-section" className="bg-gradient-to-b from-[#040608] to-[#080c14] py-12 mt-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {showCalendly && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden border border-[#c9a84c]/20 shadow-2xl shadow-[#c9a84c]/10"
            >
              <iframe
                src={CALENDLY}
                width="100%"
                height="650"
                frameBorder="0"
                title="Book a Meeting with Pranjal Digital"
                className="bg-white min-h-[600px]"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-2 rounded-full mb-6">
            <Shield size={16} className="text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-medium">Our Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">How We Handle Your Inquiry</h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto px-4">
            From first contact to partnership — a transparent, no-pressure process designed for your success
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#c9a84c] via-[#c9a84c]/50 to-transparent hidden md:block" />
          
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="text-[#c9a84c]" size={18} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#c9a84c] flex items-center justify-center text-[10px] font-bold text-[#080c14]">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent rounded-xl p-4 md:p-5 border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-300 group-hover:transform group-hover:translate-x-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-white font-bold text-base md:text-lg">{step.title}</h4>
                    <span className="text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-1 rounded-full font-mono">
                      ⏱ {step.duration}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: Award, number: "400+", label: "Clients Served" },
              { icon: Headphones, number: "24h", label: "Response Guarantee" },
              { icon: TrendingUp, number: "Free", label: "Strategy Call & Audit" },
              { icon: Shield, number: "✓", label: "NDA on Request" }
            ].map((stat, idx) => (
              <div key={idx} className="group p-3 md:p-4 rounded-xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-300 text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={16} className="text-[#c9a84c]" />
                </div>
                <p className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent mb-1">{stat.number}</p>
                <p className="text-white/40 text-xs md:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Get In Touch Footer Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Visit Us</p>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                      1st floor, H.no 5, Rodali path, Janakpur, Kahilipara, Guwahati, Assam 781019, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Email Us</p>
                    <a href="mailto:info@pranjaldigital.com" className="text-white/50 hover:text-[#c9a84c] transition-colors text-xs sm:text-sm break-all">
                      info@pranjaldigital.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Book a Meeting</p>
                    <button onClick={scrollToCalendly} className="text-[#c9a84c] hover:text-[#dbb85c] transition-colors text-xs sm:text-sm">
                      Schedule a free strategy call →
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Connect With Us</h3>
              <p className="text-white/50 text-xs sm:text-sm mb-6">
                Follow us on social media for digital marketing insights, tips, and updates.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a href="https://www.linkedin.com/company/pranjal-digital" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 sm:gap-3 bg-[#080c14] border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5 transition-all duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0a0f1c] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Linkedin size={16} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">Pranjal Digital</p>
                    <p className="text-white/40 text-[10px] sm:text-xs">Company Page</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/pranjal-sharma-digital-marketing-consultant/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 sm:gap-3 bg-[#080c14] border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5 transition-all duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0a0f1c] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Linkedin size={16} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">Pranjal Sharma</p>
                    <p className="text-white/40 text-[10px] sm:text-xs">Founder's LinkedIn</p>
                  </div>
                </a>
                <a href="https://x.com/Pranjaldigitl" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 sm:gap-3 bg-[#080c14] border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5 transition-all duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0a0f1c] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Twitter size={16} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">Twitter / X</p>
                    <p className="text-white/40 text-[10px] sm:text-xs">@Pranjaldigitl</p>
                  </div>
                </a>
                <a href="https://www.youtube.com/@PranjalSharmaDigital" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 sm:gap-3 bg-[#080c14] border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5 transition-all duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0a0f1c] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Youtube size={16} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">YouTube</p>
                    <p className="text-white/40 text-[10px] sm:text-xs">Pranjal Sharma Digital</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
