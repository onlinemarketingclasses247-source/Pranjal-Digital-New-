import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPopup() {
  const [visible, setVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [hasClosed, setHasClosed] = useState<boolean>(false);

  // Check if user already closed this session
  useEffect(() => {
    const sessionClosed = sessionStorage.getItem('giftBoxClosed');
    if (sessionClosed === 'true') {
      setHasClosed(true);
      setVisible(false);
    }
  }, []);

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show gift box after 6 seconds
  useEffect(() => {
    if (hasClosed) return;
    
    const timer = setTimeout(() => {
      setVisible(true);
      // Auto-expand after 4 seconds of shaking (total 10 seconds)
      setTimeout(() => {
        if (!isExpanded) {
          setIsExpanded(true);
        }
      }, 4000);
    }, 6000);

    return () => clearTimeout(timer);
  }, [hasClosed, isExpanded]);

  // Handle close - stores in sessionStorage so it won't reappear
  const handleClose = () => {
    setVisible(false);
    setHasClosed(true);
    sessionStorage.setItem('giftBoxClosed', 'true');
  };

  // Handle download
  const handleDownload = (guideType: 'seo' | 'ppc') => {
    setDownloading(guideType);
    
    setTimeout(() => {
      const guides = {
        seo: {
          url: "/ebooks/SEO-Trends-2026-SEJ.pdf",
          name: "SEO-Trends-2026-SEJ.pdf"
        },
        ppc: {
          url: "/ebooks/PPC_Trends_2026.pdf",
          name: "PPC_Trends_2026.pdf"
        }
      };
      
      const guide = guides[guideType];
      const link = document.createElement('a');
      link.href = guide.url;
      link.download = guide.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloading(null);
      
      // Optional: Track download
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'free_ebook_download', {
          guide_type: guideType,
          source: 'gift_box'
        });
      }
    }, 500);
  };

  // Handle manual click to open during shake
  const handleManualOpen = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  if (hasClosed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div 
          className={`fixed z-50 ${
            isMobile 
              ? "right-4 left-4 top-1/2" 
              : "bottom-6 right-6"
          }`}
          style={isMobile ? { transform: "translateY(-50%)" } : {}}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative"
          >
            {/* Close Button - Always visible and clear */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className={`absolute ${
                isMobile ? "-top-3 -right-2" : "-top-3 -right-3"
              } w-8 h-8 rounded-full bg-red-500/90 hover:bg-red-600 backdrop-blur-sm text-white flex items-center justify-center text-sm font-bold z-20 shadow-lg border-2 border-white/30 transition-all duration-300`}
              style={{ boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}
            >
              ✕
            </motion.button>

            {/* Gift Box Container */}
            <motion.div
              initial={{ width: isMobile ? "100%" : 70 }}
              animate={{ 
                width: isExpanded 
                  ? (isMobile ? "100%" : 420)
                  : (isMobile ? "auto" : 70)
              }}
              transition={{ duration: 0.5, type: "spring", damping: 25 }}
              className={`bg-gradient-to-br from-[#0a0f1c] to-[#0d1424] border-2 border-[#c9a84c]/50 shadow-2xl overflow-hidden ${
                isExpanded ? "rounded-2xl" : "rounded-full"
              }`}
            >
              {!isExpanded ? (
                // Shaking Gift Box
                <motion.div 
                  className={`${isMobile ? "w-16 h-16" : "w-[70px] h-[70px]"} flex items-center justify-center cursor-pointer relative`}
                  animate={{
                    x: [0, -8, 8, -8, 8, -8, 8, -8, 8, 0],
                    rotate: [0, -5, 5, -5, 5, -5, 5, -5, 5, 0]
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
                    ease: "easeInOut"
                  }}
                  onClick={handleManualOpen}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <span className="text-4xl">🎁</span>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-white/60 whitespace-nowrap"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Click or wait
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                // Expanded Content
                <div className={`p-5 ${isMobile ? "max-h-[90vh] overflow-y-auto" : ""}`}>
                  {/* Header Animation */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-5xl mb-2"
                    >
                      🎁
                    </motion.div>
                  </motion.div>

                  {/* Pranjal's Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white">
                        Namaste! 👋
                      </h3>
                      <p className="text-sm text-white/80 mt-1">
                        <span className="font-semibold text-[#c9a84c]">I'm Pranjal</span>
                      </p>
                    </div>

                    <div className="bg-[#c9a84c]/10 rounded-lg p-4 border border-[#c9a84c]/30">
                      <p className="text-sm text-white/90 leading-relaxed">
                        Thank you for visiting my website! 🙏
                      </p>
                      <p className="text-sm text-white/90 leading-relaxed mt-2">
                        As a small token of gratitude, I'm sharing 2 ebooks from{' '}
                        <span className="font-semibold text-[#c9a84c]">Search Engine Journal</span>
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white font-semibold mb-2">
                        📚 What's inside:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[#c9a84c]">📘</span>
                          <span className="text-sm text-white">SEO Trends 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#c9a84c]">📗</span>
                          <span className="text-sm text-white">PPC Trends 2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                      <p className="text-xs text-white/80 leading-relaxed italic">
                        "Written by industry leaders - I personally read these 
                        and found them super helpful. That's why I decided to share them with you."
                      </p>
                      <p className="text-xs text-[#c9a84c] mt-2 font-semibold">
                        — Pranjal
                      </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                      <div className="flex items-center gap-1">
                        <span className="text-green-500 text-xs">✓</span>
                        <span className="text-[10px] text-white/60">No email needed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-500 text-xs">✓</span>
                        <span className="text-[10px] text-white/60">No signup</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-500 text-xs">✓</span>
                        <span className="text-[10px] text-white/60">No hidden charges</span>
                      </div>
                    </div>

                    {/* Download Buttons */}
                    <div className="space-y-2 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDownload('seo')}
                        disabled={downloading === 'seo'}
                        className="w-full bg-gradient-to-r from-[#c9a84c] to-yellow-500 text-black font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
                      >
                        {downloading === 'seo' ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Downloading...
                          </>
                        ) : (
                          <>📥 Download SEO Trends 2026 (Free)</>
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDownload('ppc')}
                        disabled={downloading === 'ppc'}
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg text-sm flex items-center justify-center gap-2 border border-white/20 transition-all"
                      >
                        {downloading === 'ppc' ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Downloading...
                          </>
                        ) : (
                          <>📥 Download PPC Trends 2026 (Free)</>
                        )}
                      </motion.button>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center pt-2">
                      <p className="text-[9px] text-white/30">
                        🔓 100% Free • Instant Download • No Strings Attached
                      </p>
                      <p className="text-[9px] text-white/20 mt-1">
                        Just pure marketing knowledge to help you grow
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
