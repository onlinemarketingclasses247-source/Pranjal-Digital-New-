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
  const isDarkHeader = location === '/services';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled || isDarkHeader
          ? 'bg-[#080c14]/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 relative">
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

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="border border-[#c9a84c]/40 text-[#c9a84c] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#c9a84c]/10 transition"
            >
              Contact Us
            </Link>
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
            className="lg:hidden absolute right-4 top-4 z-[10000] p-2 rounded-full bg-[#080c14] border border-[#c9a84c]/30 shadow-lg"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[9998]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div className="fixed top-0 right-0 w-full h-screen bg-[#080c14] z-[9999] flex flex-col px-6 pt-20">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md"
              >
                <X size={20} className="text-white" />
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-4 border-b border-white/10 ${
                    location === link.href ? 'text-[#c9a84c]' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 gold-bg text-[#080c14] font-semibold text-sm px-5 py-3 rounded-lg text-center"
              >
                Book a Meeting
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#040608] border-t border-[#c9a84c]/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-3">
              <span className="gold-gradient">Pranjal</span>
              <span className="text-white"> Digital</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Driving Real Results Through Data-Driven Marketing. 12+ years of expertise across US, Canada, and India markets.
            </p>
            <div className="flex gap-4 mt-4">
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

          <div>
            <div className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Navigation</div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
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
            <div className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">Services</div>
            <ul className="space-y-2">
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

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
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
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileCTA />
      <ChatPopup />
    </div>
  );
}
