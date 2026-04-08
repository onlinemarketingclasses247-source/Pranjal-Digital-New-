import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Clock, CheckCircle2, Globe, Calendar, MessageSquare, Video, FileText, Users, ClipboardList, Handshake, Send, Zap, Shield, Target, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

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

const processSteps = [
  {
    icon: ClipboardList,
    title: 'Understand Requirements',
    description: 'We listen to your goals, challenges, and current marketing efforts to fully grasp your needs.',
    duration: '30-45 min call'
  },
  {
    icon: Target,
    title: 'Analyze & Research',
    description: 'Deep dive into your market, competitors, and current performance to identify opportunities.',
    duration: '1-2 days'
  },
  {
    icon: Users,
    title: 'Kick-off Discovery Call',
    description: 'Strategic discussion to align on objectives, timeline, and key success metrics.',
    duration: '45-60 min call'
  },
  {
    icon: FileText,
    title: 'Free Proposal & Audit',
    description: 'Comprehensive proposal with actionable insights and a no-obligation audit of your current strategy.',
    duration: '3-5 days'
  },
  {
    icon: Handshake,
    title: 'Partnership Launch',
    description: 'If everything aligns perfectly, we kick off with a structured onboarding process.',
    duration: 'Get started'
  }
];

const ProcessTimeline = () => (
  <div className="relative">
    {/* Connecting line */}
    <div className="absolute left-6 top-12 bottom-12 w-px bg-gradient-to-b from-[#c9a84c]/40 via-[#c9a84c]/20 to-transparent hidden md:block" />
    
    <div className="space-y-8">
      {processSteps.map((step, index) => (
        <div key={step.title} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-6 group">
          {/* Timeline dot/number */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors">
              <step.icon className="text-[#c9a84c]" size={20} />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 bg-[#0a0f1c] rounded-xl p-5 border border-white/10 hover:border-[#c9a84c]/30 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h4 className="text-white font-bold">
                <span className="text-[#c9a84c] mr-2">0{index + 1}.</span>
                {step.title}
              </h4>
              <span className="text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-1 rounded-full">
                {step.duration}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ActionCard = ({ icon: Icon, title, description, whatHappens, ctaText, ctaLink, isPrimary, onClick }) => (
  <div className={`rounded-2xl p-6 transition-all duration-300 ${isPrimary 
    ? 'bg-gradient-to-br from-[#c9a84c]/10 to-[#c9a84c]/5 border-2 border-[#c9a84c]/40 hover:border-[#c9a84c]/60' 
    : 'bg-[#0a0f1c] border border-white/10 hover:border-white/20'
  }`}>
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${isPrimary ? 'bg-[#c9a84c]' : 'bg-[#c9a84c]/10'}`}>
      <Icon size={28} className={isPrimary ? 'text-[#080c14]' : 'text-[#c9a84c]'} />
    </div>
    
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/60 text-sm mb-4">{description}</p>
    
    {/* What happens next - clear explanation */}
    <div className="bg-black/30 rounded-lg p-4 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Zap size={14} className="text-[#c9a84c]" />
        <span className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider">What happens next:</span>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{whatHappens}</p>
    </div>
    
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
        isPrimary 
          ? 'gold-bg text-[#080c14] hover:opacity-90' 
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
      }`}
    >
      {ctaText} <ChevronRight size={16} />
    </button>
  </div>
);

export default function Contact() {
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    document.title = "Contact Digital Marketing Consultant | Pranjal Digital";
    setMeta(
      "Contact a digital marketing consultant to discuss your business growth. Book a strategy call or send a message to explore SEO, ads, and full-funnel solutions."
    );
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalendly = () => {
    document.getElementById('calendly-section')?.scrollIntoView({ behavior: 'smooth' });
    setShowCalendly(true);
  };

  return (
    <div className="bg-[#080c14] pt-24">

      {/* Hero Section with Clear Options */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040608] to-[#080c14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#c9a84c]/5 blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="serif text-4xl md:text-5xl font-bold text-white mb-5">Let's Build Something Remarkable Together</h1>
          <p className="text-white/50 text-lg mb-8">
            Two ways to connect — choose what works best for you
          </p>
          
          {/* Two clear options at the top */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-[#0a0f1c]/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Send size={18} className="text-[#c9a84c]" />
                <span className="text-white font-semibold">Option 1: Send a Message</span>
              </div>
              <p className="text-white/40 text-sm">Fill out the form → Get email response within 24h → Discovery call</p>
            </div>
            <div className="bg-[#c9a84c]/5 backdrop-blur-sm rounded-xl p-4 border border-[#c9a84c]/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar size={18} className="text-[#c9a84c]" />
                <span className="text-white font-semibold">Option 2: Book a Meeting</span>
              </div>
              <p className="text-white/40 text-sm">Choose a time slot → 30-min strategy call → Immediate discussion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Options Side by Side */}
      <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Option 1: Contact Form Card */}
          <ScrollReveal>
            <div className="rounded-2xl bg-[#0a0f1c] border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-[#c9a84c]/20 to-transparent p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
                    <MessageSquare size={20} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Send a Message</h3>
                    <p className="text-white/40 text-xs">Get a response within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <form
                  action="https://formsubmit.co/pranjallundefined@gmail.com"
                  method="POST"
                  className="space-y-4"
                  id="contact-form"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Lead from Website" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_next" value="https://pranjaldigital.com/thank-you" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">Full Name *</label>
                      <input
                        name="name"
                        required
                        placeholder="John Smith"
                        className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-1.5">Company / Website</label>
                    <input
                      name="company"
                      placeholder="Your company or website URL"
                      className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">Service Interested In</label>
                      <select
                        name="service"
                        className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">Monthly Budget</label>
                      <select
                        name="budget"
                        className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                      >
                        <option value="">Select budget range...</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-1.5">Your Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your business, current challenges, and what you're looking to achieve..."
                      className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full gold-bg text-[#080c14] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>

          {/* Option 2: Book Meeting Card */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl bg-gradient-to-br from-[#c9a84c]/5 to-transparent border-2 border-[#c9a84c]/30 overflow-hidden">
              <div className="bg-gradient-to-r from-[#c9a84c]/30 to-transparent p-4 border-b border-[#c9a84c]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/30 flex items-center justify-center">
                    <Calendar size={20} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Book a Meeting</h3>
                    <p className="text-[#c9a84c]/70 text-xs">30-min free strategy call</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* Benefits of booking a meeting */}
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-3">✨ Why book a meeting:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 size={14} className="text-[#c9a84c]" />
                        Immediate conversation about your goals
                      </li>
                      <li className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 size={14} className="text-[#c9a84c]" />
                        Real-time answers to your questions
                      </li>
                      <li className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 size={14} className="text-[#c9a84c]" />
                        No form filling — just direct discussion
                      </li>
                      <li className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 size={14} className="text-[#c9a84c]" />
                        Get preliminary recommendations on the spot
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#c9a84c]/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-[#c9a84c]" />
                      <span className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider">What happens next:</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Choose a time slot → Join the video/audio call → Discuss your business goals → Get immediate feedback → Receive follow-up proposal within 48 hours
                    </p>
                  </div>

                  <button
                    onClick={scrollToCalendly}
                    className="w-full gold-bg text-[#080c14] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Book Your Free Call <Calendar size={16} />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Side Information Section */}
      <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal delay={0.2}>
            <div className="p-5 rounded-xl bg-[#0a0f1c] border border-white/10">
              <Mail className="text-[#c9a84c] mb-3" size={22} />
              <h4 className="text-white font-semibold mb-1">Email Support</h4>
              <p className="text-white/40 text-sm">info@pranjaldigital.com</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.25}>
            <div className="p-5 rounded-xl bg-[#0a0f1c] border border-white/10">
              <Clock className="text-[#c9a84c] mb-3" size={22} />
              <h4 className="text-white font-semibold mb-1">Response Time</h4>
              <p className="text-white/40 text-sm">Within 24 hours, usually faster</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="p-5 rounded-xl bg-[#0a0f1c] border border-white/10">
              <Globe className="text-[#c9a84c] mb-3" size={22} />
              <h4 className="text-white font-semibold mb-1">Markets Served</h4>
              <p className="text-white/40 text-sm">US, Canada, India & Global</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Calendly Section */}
      <section id="calendly-section" className="py-12 bg-[#040608]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {showCalendly ? (
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  src={CALENDLY}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Book a Meeting with Pranjal Digital"
                  className="bg-white"
                />
              </div>
            </ScrollReveal>
          ) : (
            <div className="text-center">
              <p className="text-white/40 text-sm">Click "Book Your Free Call" above to see available time slots</p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section - Bottom */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 px-4 py-2 rounded-full mb-4">
            <Shield size={16} className="text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-medium">Our Promise</span>
          </div>
          <h2 className="serif text-3xl md:text-4xl font-bold text-white mb-4">How We Handle Your Inquiry</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            From first contact to partnership — a transparent, no-pressure process designed for your success
          </p>
        </ScrollReveal>

        <ProcessTimeline />

        {/* Trust badges */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">400+</p>
                <p className="text-white/40 text-sm">Clients Served</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="text-white/40 text-sm">Response Guarantee</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Free</p>
                <p className="text-white/40 text-sm">Strategy Call & Audit</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">NDA</p>
                <p className="text-white/40 text-sm">Signed on Request</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
