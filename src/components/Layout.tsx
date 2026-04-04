import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatPopup from "@/components/ChatPopup";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
   { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' },
];

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080c14]/95 backdrop-blur-md border-b border-[#c9a84c]/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">
              <span className="gold-gradient">Pranjal</span>
              <span className="text-white"> Digital</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#c9a84c] ${
                  location === link.href ? 'text-[#c9a84c]' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-bg text-[#080c14] font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Book a Meeting
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#080c14]/98 border-b border-[#c9a84c]/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-base font-medium py-2 transition-colors ${
                    location === link.href ? 'text-[#c9a84c]' : 'text-white/80 hover:text-[#c9a84c]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-bg text-[#080c14] font-semibold text-sm px-5 py-2.5 rounded-lg inline-block mt-2"
              >
                Book a Meeting
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#040608] border-t border-[#c9a84c]/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-3">
              <span className="gold-gradient">Pranjal</span>
              <span className="text-white"> Digital</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Driving Real Results Through Data-Driven Marketing. 12+ years of expertise across US, Canada, and India markets.
            </p>
            <div className="flex gap-4 mt-5">
             <div className="flex gap-4 mt-5">
  <a
    href="https://www.linkedin.com/in/pranjal-sharma-digital-marketing-consultant/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/40 hover:text-[#c9a84c] text-xs font-medium transition-colors"
  >
    LinkedIn
  </a>

  <a
    href="https://x.com/Pranjaldigitl"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/40 hover:text-[#c9a84c] text-xs font-medium transition-colors"
  >
    X
  </a>

  <a
    href="https://www.youtube.com/@PranjalSharmaDigital"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/40 hover:text-[#c9a84c] text-xs font-medium transition-colors"
  >
    YouTube
  </a>
</div>
            </div>
          </div>

          <div>
            <div className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-4">Navigation</div>
            <ul className="space-y-2.5">
  {navLinks.map((link) => (
    <li key={link.href}>
      <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
        {link.label}
      </Link>
    </li>
  ))}

  {/* ✅ ADD THESE */}
  <li>
    <Link href="/terms-of-service" className="text-white/50 hover:text-white text-sm transition-colors">
      Terms of Service
    </Link>
  </li>

  <li>
    <Link href="/privacy-policy" className="text-white/50 hover:text-white text-sm transition-colors">
      Privacy Policy
    </Link>
  </li>
</ul>
          </div>

          <div>
            <div className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-4">Services</div>
            <ul className="space-y-2.5">
              {['SEO', 'Google PPC', 'Meta Ads', 'B2B Marketing', 'SaaS Marketing', 'Email Marketing'].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-white/50 hover:text-white text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2025 Pranjal Digital. All Rights Reserved.</p>
          <p className="text-white/30 text-xs">info@pranjaldigital.com</p>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA() {
  const CALENDLY = 'https://calendly.com/pranjaldigital-info/30min';
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#080c14]/95 backdrop-blur-md border-t border-[#c9a84c]/20 px-4 py-3">
      <div className="flex gap-3">
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 gold-bg text-[#080c14] font-semibold text-sm py-2.5 rounded-lg text-center"
        >
          Book a Meeting
        </a>
        <Link href="/contact" className="flex-1 border border-[#c9a84c] text-[#c9a84c] font-semibold text-sm py-2.5 rounded-lg text-center">
          Contact Now
        </Link>
      </div>
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileCTA />
      <ChatPopup />
    </div>
  );
}
