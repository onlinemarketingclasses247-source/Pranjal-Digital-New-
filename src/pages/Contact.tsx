import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Clock, CheckCircle2, Globe } from 'lucide-react';
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

  const [activeTab, setActiveTab] = useState<'form' | 'calendly'>('form');

  useEffect(() => {
    document.title = "Contact Digital Marketing Consultant | Pranjal Digital";
  }, []);

  return (
<div className="bg-[#080c14] pt-24">

{/* ================= TOP DECISION ================= */}
<section className="py-20 max-w-6xl mx-auto px-4">

<h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
How Would You Like To Get Started?
</h1>

<div className="grid md:grid-cols-2 gap-8">

{/* SEND REQUIREMENTS */}
<div onClick={() => setActiveTab('form')}
className="cursor-pointer p-8 rounded-2xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/40 transition">

<div className="text-4xl mb-4">📩</div>

<h2 className="text-xl font-bold text-white mb-3">
Send Your Requirements
</h2>

<p className="text-white/60 text-sm mb-6">
Submit → Analysis → Strategy → Growth 🚀
</p>

<button className="gold-bg px-5 py-3 rounded-lg font-semibold">
Open Form
</button>

</div>

{/* BOOK MEETING */}
<div onClick={() => setActiveTab('calendly')}
className="cursor-pointer p-8 rounded-2xl bg-[#0a0f1c] border border-white/10 hover:border-[#c9a84c]/40 transition">

<div className="text-4xl mb-4">📅</div>

<h2 className="text-xl font-bold text-white mb-3">
Book a Meeting
</h2>

<p className="text-white/60 text-sm mb-6">
Pick a time → Talk directly → Get clarity instantly
</p>

<button className="gold-bg px-5 py-3 rounded-lg font-semibold">
View Calendar
</button>

</div>

</div>
</section>

{/* ================= DYNAMIC SECTION ================= */}
<section className="py-16 max-w-4xl mx-auto px-4">

{activeTab === 'form' && (
<div className="bg-[#0a0f1c] p-8 rounded-2xl border border-white/10">

<h2 className="text-2xl font-bold text-white mb-6 text-center">
Share Your Requirements
</h2>

<form
action="https://formsubmit.co/YOUR_EMAIL@gmail.com"
method="POST"
className="space-y-5"
>

{/* REQUIRED HIDDEN FIELDS */}
<input type="hidden" name="_captcha" value="false" />
<input type="hidden" name="_subject" value="New Lead from Website" />
<input type="hidden" name="_template" value="table" />
<input type="hidden" name="_honey" style={{ display: "none" }} />
<input type="hidden" name="_next" value="https://pranjaldigital.com/thank-you" />

<div className="grid sm:grid-cols-2 gap-5">
<input name="name" required placeholder="Full Name" className="input" />
<input name="email" type="email" required placeholder="Email Address" className="input" />
</div>

<input name="company" placeholder="Company / Website" className="input" />

<div className="grid sm:grid-cols-2 gap-5">
<select name="service" className="input">
<option value="">Select Service</option>
{services.map((s) => (
<option key={s} value={s}>{s}</option>
))}
</select>

<select name="budget" className="input">
<option value="">Select Budget</option>
{budgets.map((b) => (
<option key={b} value={b}>{b}</option>
))}
</select>
</div>

<textarea
name="message"
required
rows={5}
placeholder="Tell me about your business..."
className="input"
/>

<button
type="submit"
className="w-full gold-bg py-4 rounded-xl font-bold flex items-center justify-center gap-2"
>
Launch My Growth 🚀 <ArrowRight size={18} />
</button>

</form>

</div>
)}

{activeTab === 'calendly' && (
<div className="rounded-2xl overflow-hidden border border-white/10">
<iframe
src={CALENDLY}
width="100%"
height="700"
className="bg-white"
/>
</div>
)}

</section>

{/* ================= PROCESS ================= */}
<section className="py-20 text-center">

<h2 className="text-3xl font-bold text-white mb-12">
What Happens Next 🚀
</h2>

<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">

{[
"Submit requirements",
"Business analysis",
"Strategy planning",
"Growth execution"
].map((step,i)=>(
<div key={i} className="p-6 bg-[#0a0f1c] rounded-xl border border-white/10">
<div className="text-3xl mb-3">🚀</div>
<p className="text-white/70 text-sm">{step}</p>
</div>
))}

</div>

</section>

{/* ================= CONTACT CARDS ================= */}
<section className="py-16 max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">

<div className="card"><Mail/> info@pranjaldigital.com</div>
<div className="card"><Clock/> 24hr Response</div>
<div className="card"><Globe/> Global Clients</div>

</section>

{/* ================= PERSONAL ================= */}
<section className="py-20 text-center">

<img src="/images/about.png"
className="w-40 h-40 mx-auto rounded-full object-cover mb-6"/>

<h3 className="text-2xl font-bold text-white mb-2">
Pranjal Sharma
</h3>

<p className="text-white/60 mb-6">
Digital Marketing Consultant | 12+ Years Experience
</p>

<div className="flex justify-center gap-6">
<a href="#" className="link">LinkedIn</a>
<a href="#" className="link">Email</a>
<a href="#" className="link">YouTube</a>
</div>

</section>

</div>
);
}
