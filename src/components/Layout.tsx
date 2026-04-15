import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Linkedin, Twitter, Youtube, Mail, ExternalLink, Calendar, Award, Users, Globe, DollarSign, TrendingUp, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatPopup from "@/components/ChatPopup";

const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';

function Header() {
const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const [location] = useLocation();

useEffect(() => {
const onScroll = () => setScrolled(window.scrollY > 30);
window.addEventListener('scroll', onScroll);
return () => window.removeEventListener('scroll', onScroll);
}, []);

useEffect(() => {
setMenuOpen(false);
}, [location]);

return (
<>
{/* HEADER */}
<header className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-300 ${scrolled ? 'bg-[#080c14] shadow-lg' : 'bg-transparent'}`}>
<div className="max-w-7xl mx-auto px-4">
<div className="flex items-center justify-between h-16 lg:h-20">

{/* LOGO */}
<Link href="/">
<span className="text-2xl font-bold cursor-pointer">
<span className="gold-gradient">Pranjal</span>
<span className="text-white"> Digital</span>
</span>
</Link>

{/* DESKTOP NAV */}
<nav className="hidden lg:flex items-center gap-8">

<Link href="/" className="text-white/80 hover:text-[#c9a84c] transition-colors">Home</Link>
<Link href="/services" className="text-white/80 hover:text-[#c9a84c] transition-colors">Services</Link>
<Link href="/about" className="text-white/80 hover:text-[#c9a84c] transition-colors">About</Link>
<Link href="/case-studies" className="text-white/80 hover:text-[#c9a84c] transition-colors">Case Studies</Link>

{/* DROPDOWN */}
<div className="relative group">
<span className="text-white/80 hover:text-[#c9a84c] cursor-pointer transition-colors">
AI Products ▾
</span>

<div className="absolute top-full pt-2 hidden group-hover:block z-[9999]">
<div className="bg-[#0a0f1c] rounded-lg shadow-lg border border-white/10 min-w-[220px]">
<Link
href="/ai-products/free-google-ads-competitor-research"
className="block px-4 py-3 text-sm text-white/80 hover:text-[#c9a84c] hover:bg-white/5 transition-colors"
>
Ads Intelligence Tool
</Link>
</div>
</div>
</div>

<Link href="/contact" className="text-white/80 hover:text-[#c9a84c] transition-colors">Contact</Link>
</nav>

{/* BUTTONS */}
<div className="hidden lg:flex gap-3">
<Link href="/contact" className="border border-[#c9a84c] text-[#c9a84c] px-4 py-2 rounded-lg hover:bg-[#c9a84c]/10 transition-all">
Contact
</Link>

<a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg px-4 py-2 rounded-lg text-[#080c14] font-semibold hover:opacity-90 transition-all">
Book Meeting
</a>
</div>

{/* MOBILE BUTTON */}
<button
className="lg:hidden text-white z-[99999] p-2"
onClick={() => setMenuOpen(!menuOpen)}
>
{menuOpen ? <X size={28} /> : <Menu size={28} />}
</button>

</div>
</div>

</header>

{/* MOBILE MENU (OUTSIDE HEADER) */}
<AnimatePresence>
{menuOpen && (
<motion.div
className="fixed inset-0 bg-[#020617] z-[2147483647] p-6 flex flex-col"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
>
<div className="flex justify-end">
<button onClick={() => setMenuOpen(false)} className="text-white">
<X size={32} />
</button>
</div>

<div className="flex flex-col gap-6 mt-16 text-white text-xl font-medium text-center">
<Link href="/" className="text-white hover:text-[#c9a84c] transition-colors">Home</Link>
<Link href="/services" className="text-white hover:text-[#c9a84c] transition-colors">Services</Link>
<Link href="/about" className="text-white hover:text-[#c9a84c] transition-colors">About</Link>
<Link href="/case-studies" className="text-white hover:text-[#c9a84c] transition-colors">Case Studies</Link>
<Link href="/ai-products/free-google-ads-competitor-research" className="text-white hover:text-[#c9a84c] transition-colors">
Ads Intelligence Tool
</Link>
<Link href="/contact" className="text-white hover:text-[#c9a84c] transition-colors">Contact</Link>
<a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="gold-bg text-center p-3 rounded-lg mt-4 text-[#080c14] font-semibold">
Book Meeting
</a>
</div>
</motion.div>
)}
</AnimatePresence>
</>
);
}

// PREMIUM FOOTER WITH ALL REQUESTED CHANGES
function Footer() {
const currentYear = new Date().getFullYear();

// Your social media links
const socialLinks = {
linkedin: "https://www.linkedin.com/in/pranjal-sharma-digital-marketing-consultant/",
twitter: "https://x.com/Pranjaldigitl",
youtube: "https://www.youtube.com/@PranjalSharmaDigital",
};

// Stats data
const stats = [
{ value: "12+", label: "Years Experience", icon: Award },
{ value: "400+", label: "Happy Clients", icon: Users },
{ value: "20+", label: "Countries Served", icon: Globe },
{ value: "5M+", label: "Revenue Generated", icon: DollarSign },
{ value: "7X", label: "Avg ROAS", icon: TrendingUp },
{ value: "25+", label: "Team Members", icon: UserPlus },
];

// Marketing Services
const marketingServices = [
{ name: "IT Services Marketing", path: "it-services-marketing" },
{ name: "SaaS Marketing Services", path: "saas-marketing-services" },
{ name: "Ecommerce Marketing Services", path: "ecommerce-marketing-services" },
{ name: "Healthcare Marketing Services", path: "healthcare-marketing-services" },
{ name: "Dental Marketing Services", path: "dental-marketing-services" },
];

return (
<footer className="bg-gradient-to-b from-[#0a0f1c] to-[#040608] text-white border-t border-[#c9a84c]/20 mt-auto">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
  
  {/* Company Info Section */}
  <div className="space-y-4">
    <Link href="/">
      <span className="text-2xl font-bold cursor-pointer inline-block">
        <span className="gold-gradient">Pranjal</span>
        <span className="text-white"> Digital</span>
      </span>
    </Link>
    <p className="text-white/50 text-sm leading-relaxed">
      Premium digital marketing solutions tailored to boost your business growth and maximize ROI.
    </p>
    {/* Social Media Links */}
    <div className="flex gap-3 pt-2">
      <a 
        href={socialLinks.linkedin} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#080c14] transition-all duration-300"
        aria-label="LinkedIn"
      >
        <Linkedin size={16} />
      </a>
      <a 
        href={socialLinks.twitter} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#080c14] transition-all duration-300"
        aria-label="Twitter"
      >
        <Twitter size={16} />
      </a>
      <a 
        href={socialLinks.youtube} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#080c14] transition-all duration-300"
        aria-label="YouTube"
      >
        <Youtube size={16} />
      </a>
    </div>
  </div>

  {/* Quick Links Section */}
  <div className="space-y-4">
    <h3 className="text-white font-semibold text-lg relative inline-block">
      Quick Links
      <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#c9a84c]"></span>
    </h3>
    <ul className="space-y-2">
      <li>
        <Link href="/" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          Home
        </Link>
      </li>
      <li>
        <Link href="/services" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          Services
        </Link>
      </li>
      <li>
        <Link href="/about" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          About Us
        </Link>
      </li>
      <li>
        <Link href="/case-studies" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          Case Studies
        </Link>
      </li>
      <li>
        <Link href="/contact" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          Contact
        </Link>
      </li>
    </ul>
  </div>

  {/* Marketing Services Section */}
  <div className="space-y-4">
    <h3 className="text-white font-semibold text-lg relative inline-block">
      Marketing Services
      <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#c9a84c]"></span>
    </h3>
    <ul className="space-y-2">
      {marketingServices.map((service, index) => (
        <li key={index}>
          <Link 
            href={`/${service.path}`} 
            className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm"
          >
            {service.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* Get In Touch Section with Contact Links */}
  <div className="space-y-4">
    <h3 className="text-white font-semibold text-lg relative inline-block">
      Get In Touch
      <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#c9a84c]"></span>
    </h3>
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <Mail size={16} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
        <a href="mailto:info@pranjaldigital.com" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          info@pranjaldigital.com
        </a>
      </li>
      <li className="flex items-start gap-3 pt-2">
        <ExternalLink size={16} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
        <Link href="/contact" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          Contact Us
        </Link>
      </li>
      <li className="flex items-start gap-3">
        <Calendar size={16} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#c9a84c] transition-colors text-sm">
          Book a Meeting
        </a>
      </li>
    </ul>
  </div>
</div>

{/* Stats Section - Fills empty space */}
<div className="mt-12 pt-8 border-t border-white/10">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {stats.map((stat, index) => {
      const Icon = stat.icon;
      return (
        <div key={index} className="text-center group">
          <div className="flex justify-center mb-2">
            <Icon size={24} className="text-[#c9a84c] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-white/40">{stat.label}</div>
        </div>
      );
    })}
  </div>
</div>

{/* Bottom Bar with Legal Links */}
<div className="mt-8 pt-6 border-t border-white/10">
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-white/40 text-sm">
      © {currentYear} Pranjal Digital. All rights reserved.
    </p>
    <div className="flex gap-6">
      <Link 
        href="/privacy-policy" 
        className="text-white/40 hover:text-[#c9a84c] transition-colors text-sm"
      >
        Privacy Policy
      </Link>
      <Link 
        href="/terms-of-service" 
        className="text-white/40 hover:text-[#c9a84c] transition-colors text-sm"
      >
        Terms of Service
      </Link>
    </div>
  </div>
</div>
</div>
</footer>
);
}

export function Layout({ children }: { children: React.ReactNode }) {
return (
<div className="min-h-screen bg-[#020617] flex flex-col">
<Header />
<main className="pt-20 flex-grow">{children}</main>
<Footer />
<ChatPopup />
</div>
);
}
