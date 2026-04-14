import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
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
<header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${scrolled ? 'bg-[#080c14] shadow-lg' : 'bg-transparent'}`}>      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* LOGO */}
          <Link href="/">
            <span className="text-2xl font-bold">
              <span className="gold-gradient">Pranjal</span>
              <span className="text-white"> Digital</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">

            <Link href="/" className="text-white/80 hover:text-[#c9a84c]">
              Home
            </Link>

            <Link href="/services" className="text-white/80 hover:text-[#c9a84c]">
              Services
            </Link>

            <Link href="/about" className="text-white/80 hover:text-[#c9a84c]">
              About
            </Link>

            <Link href="/case-studies" className="text-white/80 hover:text-[#c9a84c]">
              Case Studies
            </Link>

            {/* DROPDOWN */}


            <div className="relative group">
  <span className="text-white/80 hover:text-[#c9a84c] cursor-pointer">
    AI Products ▾
  </span>
<div className="absolute top-full pt-2 hidden group-hover:block z-[9999]">

              <div className="bg-[#0a0f1c] rounded-lg shadow-lg border border-white/10 min-w-[220px]">

      <Link
        href="/ai-products/free-google-ads-competitor-research"
        className="block px-4 py-3 text-sm text-white/80 hover:text-[#c9a84c] hover:bg-white/5"
      >
        Ads Intelligence Tool
      </Link>

    </div>
  </div>
</div>

            

            <Link href="/contact" className="text-white/80 hover:text-[#c9a84c]">
              Contact
            </Link>

          </nav>

          {/* BUTTONS */}
          <div className="hidden lg:flex gap-3">
            <Link
              href="/contact"
              className="border border-[#c9a84c] text-[#c9a84c] px-4 py-2 rounded-lg"
            >
              Contact
            </Link>

            <a
              href={CALENDLY}
              target="_blank"
              className="gold-bg px-4 py-2 rounded-lg text-[#080c14]"
            >
              Book Meeting
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (

  <motion.div className="fixed inset-0 bg-[#020617] z-[999999] p-6 flex flex-col">
            <div className="flex flex-col gap-6 mt-16 text-white text-xl font-medium">

              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/about">About</Link>
              <Link href="/case-studies">Case Studies</Link>

              <Link href="/ai-products/free-google-ads-competitor-research">
                Ads Intelligence Tool
              </Link>

              <Link href="/contact">Contact</Link>

              <a href={CALENDLY} className="gold-bg text-center p-3 rounded-lg">
                Book Meeting
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
    <footer className="bg-[#040608] text-center text-white/40 py-6">
      © 2025 Pranjal Digital
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
      <ChatPopup />
    </div>
  );
}
