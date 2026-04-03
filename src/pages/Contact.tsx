import React from 'react';
import { ArrowRight, Mail, Clock, CheckCircle2, Globe, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

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

export default function Contact() {
  return (
    <div className="bg-[#080c14] pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040608] to-[#080c14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#c9a84c]/5 blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="serif text-5xl font-bold text-white mb-5">Let's Build Something Remarkable Together</h1>
          <p className="text-white/50 text-lg">
            Whether you have a clear brief or need help figuring out where to start, let's have a real conversation about growing your business.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <ScrollReveal className="lg:col-span-3">
            <form 
              action="https://formsubmit.co/pranjallundefined@gmail.com" 
              method="POST"
              className="space-y-5 p-8 rounded-2xl bg-[#0a0f1c] border border-white/10"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Lead from Website" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_next" value="https://pranjaldigital.com/thank-you" />

              <h2 className="serif text-2xl font-bold text-white mb-6">Send Me a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">Full Name *</label>
                  <input
                    name="name"
                    required
                    placeholder="John Smith"
                    className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1.5">Company / Website</label>
                <input
                  name="company"
                  placeholder="Your company or website URL"
                  className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">Service Interested In</label>
                  <select
                    name="service"
                    className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
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
                    className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
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
                  rows={5}
                  placeholder="Tell me about your business..."
                  className="w-full bg-[#080c14] border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full gold-bg text-[#080c14] font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Send Message <ArrowRight size={18} />
              </button>
            </form>
          </ScrollReveal>

          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-[#0a0f1c] border border-white/10">
                <Mail className="text-[#c9a84c] mb-4" size={20} />
                <h3 className="text-white font-bold mb-1">Email</h3>
                <p className="text-white/50 text-sm">info@pranjaldigital.com</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
