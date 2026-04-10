import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPopup() {
  const [visible, setVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hasClosed, setHasClosed] = useState<boolean>(false);
  const [shakeComplete, setShakeComplete] = useState<boolean>(false);

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
        setVisible(false);
        setHasClosed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show popup after delay (only desktop & not closed)
  useEffect(() => {
    if (hasClosed || isMobile) return;
    
    const timer = setTimeout(() => {
      setVisible(true);
      // Shake animation will run for 3.5 seconds, then auto-expand
      setTimeout(() => {
        if (!isExpanded && visible) {
          setIsExpanded(true);
          setShakeComplete(true);
        }
      }, 3800); // Shake duration before expanding
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, [hasClosed, isMobile, isExpanded, visible]);

  // Handle close - stores in sessionStorage, won't open again this session
  const handleClose = () => {
    setVisible(false);
    setHasClosed(true);
    sessionStorage.setItem('aiPopupClosed', 'true');
  };

  // Manual click to expand (if user clicks during shake)
  const handleManualExpand = () => {
    if (!isExpanded && visible) {
      setIsExpanded(true);
      setShakeComplete(true);
    }
  };

  // Don't render anything on mobile or if closed
  if (hasClosed || isMobile) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed z-50 bottom-6 right-6">
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
                width: isExpanded ? 420 : 70,
                height: isExpanded ? "auto" : 70,
                borderRadius: isExpanded ? "1.75rem" : "2rem"
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
                /* Shaking AI Icon State */
                <motion.div 
                  className="w-[70px] h-[70px] flex items-center justify-center cursor-pointer relative group"
                  animate={!shakeComplete ? {
                    x: [0, -7, 7, -6, 6, -4, 4, -2, 2, 0],
                    y: [0, -2, 2, -1, 1, 0, 0, -1, 1, 0],
                    rotate: [0, -4, 4, -3, 3, -2, 2, -1, 1, 0]
                  } : {}}
                  transition={{
                    duration: 3.5,
                    times: [0, 0.12, 0.22, 0.32, 0.42, 0.52, 0.62, 0.72, 0.85, 1],
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
                      AI assistant
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                /* Expanded Content - Lead Message with Contact Button */
                <div className="expanded-content p-5 relative">
                  {/* Decorative AI glow lines */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60" />
                  
                  {/* Header with AI icon */}
                  <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-5"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotateY: [0, 180, 360]
                      }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="text-5xl mb-3 inline-block"
                    >
                      🤖✨
                    </motion.div>
                    <h2 className="text-2xl font-black bg-gradient-to-r from-white via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                      AI
                    </h2>
                  </motion.div>

                  {/* Main Lead Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Question Box */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-2xl p-4 border border-amber-500/30 backdrop-blur-sm">
                      <p className="text-white text-base font-semibold text-center mb-2">
                        🎯 Looking for more leads?
                      </p>
                      <p className="text-white/80 text-sm text-center">
                        More revenue? More conversions?
                      </p>
                    </div>

                    {/* CTA Button linking to contact page */}
                    <motion.a
                      href="https://pranjaldigital.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="block bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-2xl p-4 border border-amber-400/60 shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <p className="text-center text-white text-lg font-bold mb-1">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">Pranjal</span> Now!
                      </p>
                      <p className="text-center text-amber-100 text-xs opacity-90">
                        Get a free strategy call →
                      </p>
                    </motion.a>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-chart-line text-green-400 text-xs"></i>
                        <span className="text-[10px] text-white/50">200+ clients</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-trophy text-yellow-500 text-xs"></i>
                        <span className="text-[10px] text-white/50">98% satisfaction</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-clock text-blue-400 text-xs"></i>
                        <span className="text-[10px] text-white/50">24/7 support</span>
                      </div>
                    </div>

                    {/* Micro CTA note */}
                    <div className="text-center pt-1">
                      <p className="text-[9px] text-white/30 flex items-center justify-center gap-1">
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
