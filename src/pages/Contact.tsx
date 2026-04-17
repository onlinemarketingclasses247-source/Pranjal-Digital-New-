import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, CheckCircle2, Globe, Calendar, MessageSquare, FileText, Users, ClipboardList, Handshake, Send, Zap, Shield, Target, Sparkles, Phone, MapPin, Award, TrendingUp, Headphones } from 'lucide-react';

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

const services = [
  'SEO (Technical / Content / Local)',
  'Google PPC Advertising',
  'Meta Ads (Facebook / Instagram)',
  'LinkedIn Advertising',
  'B2B Marketing & Lead Generation',
  'SaaS Marketing',
  'IT Services Marketing',
  'Email Marketing & Automation',
  'Social Media Marketing',
  'UI/UX & CRO',
  'Strategy Consultation',
  'Other / Not Sure',
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
const countryCodes = [
  { code: "+1", country: "US/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+65", country: "Singapore" },
  { code: "+27", country: "South Africa" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+852", country: "Hong Kong" },
  { code: "+86", country: "China" },
  { code: "+82", country: "Korea" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
  { code: "+31", country: "Netherlands" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+45", country: "Denmark" },
  { code: "+358", country: "Finland" },
  { code: "+64", country: "New Zealand" },
  { code: "+60", country: "Malaysia" },
  { code: "+66", country: "Thailand" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Philippines" },
  { code: "+84", country: "Vietnam" },
  { code: "+20", country: "Egypt" },
  { code: "+234", country: "Nigeria" },
  { code: "+254", country: "Kenya" },
  { code: "+598", country: "Uruguay" },
  { code: "+507", country: "Panama" },
];

// Countries list
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
    color: 'from-blue-500/20 to-blue-500/5'
  },
  {
    icon: Target,
    title: 'Analyze & Research',
    description: 'Deep dive into your market, competitors, and current performance to identify opportunities.',
    duration: '1-2 days',
    color: 'from-purple-500/20 to-purple-500/5'
  },
  {
    icon: Users,
    title: 'Kick-off Discovery Call',
    description: 'Strategic discussion to align on objectives, timeline, and key success metrics.',
    duration: '45-60 min',
    color: 'from-green-500/20 to-green-500/5'
  },
  {
    icon: FileText,
    title: 'Free Proposal & Audit',
    description: 'Comprehensive proposal with actionable insights and a no-obligation audit of your current strategy.',
    duration: '3-5 days',
    color: 'from-orange-500/20 to-orange-500/5'
  },
  {
    icon: Handshake,
    title: 'Partnership Launch',
    description: 'If everything aligns perfectly, we kick off with a structured onboarding process.',
    duration: 'Ready to start',
    color: 'from-[#c9a84c]/30 to-[#c9a84c]/10'
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
    <div className="bg-[#080c14]">
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
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Let's Build Something
            <span className="block bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent">Remarkable Together</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-lg"
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
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Option 1: Send Message */}
          <motion.div variants={fadeUp} className="group">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 overflow-hidden hover:border-[#c9a84c]/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/5 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <PulsingIcon Icon={MessageSquare} size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-white">Send a Message</h3>
                    <p className="text-white/40 text-sm">Get a response within 24 hours</p>
                  </div>
                </div>

                {/* Form with working email pranjallundefined@gmail.com */}
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

                  {/* Country and Phone Number Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Country *</label>
                      <select
                        name="country"
                        required
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
                      <div className="flex gap-2">
                        <select
                          name="country_code"
                          className="w-28 bg-[#080c14] border border-white/10 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-all cursor-pointer"
                        >
                          <option value="">Code</option>
                          {countryCodes.map((cc) => (
                            <option key={cc.code} value={cc.code}>{cc.code} ({cc.country})</option>
                          ))}
                        </select>
                        <input
                          name="phone"
                          type="tel"
                          placeholder="Phone number"
                          className="flex-1 bg-[#080c14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/20 placeholder:text-white/20 transition-all"
                        />
                      </div>
                    </div>
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

          {/* Option 2: Book Meeting */}
          <motion.div variants={fadeUp} className="group h-full">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#c9a84c]/5 to-[#0d1220] border-2 border-[#c9a84c]/30 overflow-hidden hover:border-[#c9a84c]/60 transition-all duration-500 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-3xl" />
              
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <ShakingPhoneIcon />
                  <div>
                    <h3 className="text-xl font-bold text-white">Book a Meeting</h3>
                    <p className="text-[#c9a84c]/70 text-sm">30-min free strategy call</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-black/30 rounded-xl p-5">
                    <p className="text-white font-semibold mb-4 text-sm">✨ Why book a meeting:</p>
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

                  <button
                    onClick={scrollToCalendly}
                    className="w-full bg-gradient-to-r from-[#c9a84c] to-[#dbb85c] text-[#080c14] font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Book Your Free Call 
                    <Calendar size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-white/30 text-xs">No credit card required • Cancel anytime • 100% free consultation</p>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#c9a84c]/5 blur-3xl group-hover:bg-[#c9a84c]/10 transition-all duration-700" />
            <div className="relative p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail size={28} className="text-[#c9a84c]" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Email Us</h4>
              <p className="text-[#c9a84c] text-sm font-mono mb-3">info@pranjaldigital.com</p>
              <p className="text-white/40 text-xs">We reply within 24 hours</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#c9a84c]/5 blur-3xl group-hover:bg-[#c9a84c]/10 transition-all duration-700" />
            <div className="relative p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock size={28} className="text-[#c9a84c]" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Fast Response</h4>
              <p className="text-2xl font-bold text-[#c9a84c] mb-2">Within 24h</p>
              <p className="text-white/40 text-xs">Usually much faster</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#c9a84c]/5 blur-3xl group-hover:bg-[#c9a84c]/10 transition-all duration-700" />
            <div className="relative p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe size={28} className="text-[#c9a84c]" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Global Reach</h4>
              <p className="text-[#c9a84c] text-sm font-semibold mb-2">US • Canada • India</p>
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
                height="700"
                frameBorder="0"
                title="Book a Meeting with Pranjal Digital"
                className="bg-white"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-2 rounded-full mb-6">
            <Shield size={16} className="text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-medium">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How We Handle Your Inquiry</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            From first contact to partnership — a transparent, no-pressure process designed for your success
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#c9a84c] via-[#c9a84c]/50 to-transparent hidden md:block" />
          
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
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="text-[#c9a84c]" size={20} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#c9a84c] flex items-center justify-center text-[10px] font-bold text-[#080c14]">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent rounded-xl p-5 border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-300 group-hover:transform group-hover:translate-x-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-white font-bold text-lg">{step.title}</h4>
                    <span className="text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-1 rounded-full font-mono">
                      ⏱ {step.duration}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Award, number: "400+", label: "Clients Served" },
              { icon: Headphones, number: "24h", label: "Response Guarantee" },
              { icon: TrendingUp, number: "Free", label: "Strategy Call & Audit" },
              { icon: Shield, number: "✓", label: "NDA on Request" }
            ].map((stat, idx) => (
              <div key={idx} className="group p-4 rounded-xl bg-gradient-to-br from-[#0a0f1c] to-[#0d1220] border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-300 text-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={18} className="text-[#c9a84c]" />
                </div>
                <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f5d76e] bg-clip-text text-transparent mb-1">{stat.number}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
