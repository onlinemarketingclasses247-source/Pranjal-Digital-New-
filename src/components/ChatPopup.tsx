import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPopup() {
  const [visible, setVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hasClosed, setHasClosed] = useState<boolean>(false);

  // Check if user already closed this session
  useEffect(() => {
    const sessionClosed = sessionStorage.getItem('aiPopupClosed');
    if (sessionClosed === 'true') {
      setHasClosed(true);
      setVisible(false);
    }
  }, []);

  // Detect mobile/desktop - HIDE COMPLETELY ON MOBILE
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // If mobile, immediately hide and don't show
      if (mobile) {
        setHasClosed(true);
        setVisible(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show popup after 10 seconds on desktop only
  useEffect(() => {
    // Don't proceed if closed on mobile or already closed in session
    if (hasClosed || isMobile) return;
    
    console.log("Starting timer for popup - will show in 10 seconds"); // Debug log
    
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      console.log("Popup is now visible!"); // Debug log
      setVisible(true);
      
      // Auto-expand after 10 seconds of shaking
      const expandTimer = setTimeout(() => {
        if (!isExpanded && visible) {
          console.log("Auto-expanding after 10 seconds of shake");
          setIsExpanded(true);
        }
      }, 10000); // 10 seconds shake duration
      
      return () => clearTimeout(expandTimer);
    }, 10000); // 10 seconds delay before showing

    return () => clearTimeout(timer);
  }, [hasClosed, isMobile, isExpanded, visible]);

  // Handle close - stores in sessionStorage
  const handleClose = () => {
    console.log("Popup closed - saving to sessionStorage");
    setVisible(false);
    setHasClosed(true);
    setIsExpanded(false);
    sessionStorage.setItem('aiPopupClosed', 'true');
  };

  // Manual click to expand during shake
  const handleManualExpand = () => {
    if (!isExpanded && visible) {
      console.log("Manually expanded by clicking");
      setIsExpanded(true);
    }
  };

  // Don't render anything on mobile
  if (isMobile) {
    console.log("Mobile detected - not showing popup");
    return null;
  }
  
  // Don't render if closed in this session
  if (hasClosed) {
    console.log("Popup closed in this session - not showing");
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed z-[9999] bottom-6 right-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative"
          >
            {/* Large X Close Button - Only shown when expanded */}
            {isExpanded && (
              <motion.button
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center text-2xl font-bold z-20 shadow-2xl border-2 border-white/90 transition-all duration-200"
                aria-label="Close"
              >
                ✕
              </motion.button>
            )}

            {/* Main Popup Container */}
            <motion.div
              initial={{ 
                width: 70,
                height: 70,
                borderRadius: "2rem"
              }}
              animate={{ 
                width: isExpanded ? 380 : 70,
                height: isExpanded ? "auto" : 70,
                borderRadius: isExpanded ? "1.5rem" : "2rem"
              }}
              transition={{ 
                duration: 0.45, 
                type: "spring", 
                damping: 26,
                stiffness: 300
              }}
              className="relative overflow-hidden"
              style={{
                background: isExpanded 
                  ? "linear-gradient(145deg, rgba(16, 22, 35, 0.98), rgba(8, 12, 22, 0.98))"
                  : "linear-gradient(135deg, #0f1625, #0a0e1a)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid rgba(201, 168, 76, 0.5)",
                boxShadow: isExpanded
                  ? "0 30px 50px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(201, 168, 76, 0.3) inset, 0 0 30px rgba(201, 168, 76, 0.15)"
                  : "0 15px 35px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(201, 168, 76, 0.4) inset"
              }}
            >
              {!isExpanded ? (
                /* Shaking AI Icon State - 10 seconds continuous shake */
                <motion.div 
                  className="w-[70px] h-[70px] flex items-center justify-center cursor-pointer relative group"
                  animate={{
                    x: [0, -8, 8, -7, 7, -6, 6, -5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0],
                    y: [0, -3, 3, -2, 2, -2, 2, -1, 1, -1, 1, 0, 0, -1, 1, 0],
                    rotate: [0, -5, 5, -4, 4, -4, 4, -3, 3, -2, 2, -1, 1, 0]
                  }}
                  transition={{
                    duration: 10,
                    times: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.68, 0.76, 0.84, 0.92, 1],
                    ease: "easeInOut",
                    repeat: 0
                  }}
                  onClick={handleManualExpand}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="relative">
                    {/* High-end AI text with gradient */}
                    <div className="text-3xl font-black bg-gradient-to-r from-white via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                      AI
                    </div>
                    
                    {/* Pulse ring effect */}
                    <motion.div
                      className="absolute -inset-2 rounded-full border-2 border-amber-500/40"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    
                    {/* Dot indicator */}
                    <motion.div
                      className="absolute -top-1 -right-2 w-2.5 h-2.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    
                    {/* Hint text */}
                    <motion.div
                      className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-[9px] text-white/50 whitespace-nowrap font-medium"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Click to open →
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                /* Expanded Content - Lead Message with Contact Button */
                <div className="expanded-content p-5 relative" style={{ width: "380px" }}>
                  {/* Decorative AI glow lines */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60" />
                  
                  {/* Header with AI icon */}
                  <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotateY: [0, 180, 360]
                      }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="text-4xl mb-2 inline-block"
                    >
                      🤖✨
                    </motion.div>
                    <h2 className="text-xl font-black bg-gradient-to-r from-white via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                      AI Assistant
                    </h2>
                  </motion.div>

                  {/* Main Lead Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Question Box */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-xl p-3 border border-amber-500/30 backdrop-blur-sm">
                      <p className="text-white text-sm font-semibold text-center">
                        🎯 Looking for more leads & revenue?
                      </p>
                    </div>

                    {/* CTA Button linking to contact page */}
                    <motion.a
                      href="https://pranjaldigital.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl py-3 px-4 border border-amber-400/60 shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <p className="text-center text-white text-sm font-bold">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">Pranjal</span> Now! 🚀
                      </p>
                      <p className="text-center text-amber-100 text-[10px] opacity-90 mt-1">
                        Free strategy call →
                      </p>
                    </motion.a>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-chart-line text-green-400 text-[10px]"></i>
                        <span className="text-[9px] text-white/50">200+ clients</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-trophy text-yellow-500 text-[10px]"></i>
                        <span className="text-[9px] text-white/50">98% success</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-clock text-blue-400 text-[10px]"></i>
                        <span className="text-[9px] text-white/50">24/7 support</span>
                      </div>
                    </div>

                    {/* Micro CTA note */}
                    <div className="text-center pt-1">
                      <p className="text-[8px] text-white/30 flex items-center justify-center gap-1">
                        <i className="fas fa-shield-alt"></i>
                        Free consultation • No obligation
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
