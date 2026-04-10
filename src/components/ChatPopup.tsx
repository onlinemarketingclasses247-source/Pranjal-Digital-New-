import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPopup() {
  const [visible, setVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hasClosed, setHasClosed] = useState<boolean>(false);
  const [shakeCompleted, setShakeCompleted] = useState<boolean>(false);

  // Check if user already closed this session
  useEffect(() => {
    const sessionClosed = sessionStorage.getItem('aiPopupClosed');
    if (sessionClosed === 'true') {
      setHasClosed(true);
      setVisible(false);
    }
  }, []);

  // Detect mobile/desktop - COMPLETELY HIDE ON MOBILE, SHOW ON DESKTOP
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show popup after 10 seconds on desktop only
  useEffect(() => {
    if (hasClosed || isMobile) return;
    
    // Show popup after 10 seconds
    const showTimer = setTimeout(() => {
      setVisible(true);
      setShakeCompleted(false);
      
      // Auto-expand after 10 seconds of shaking if not clicked
      const expandTimer = setTimeout(() => {
        if (!isExpanded && visible && !shakeCompleted) {
          setIsExpanded(true);
          setShakeCompleted(true);
        }
      }, 10000); // 10 seconds shake duration
      
      return () => clearTimeout(expandTimer);
    }, 10000); // 10 seconds delay before showing

    return () => clearTimeout(showTimer);
  }, [hasClosed, isMobile, isExpanded, visible, shakeCompleted]);

  // Handle close - stores in sessionStorage, persists across page navigation
  const handleClose = () => {
    setVisible(false);
    setHasClosed(true);
    setIsExpanded(false);
    sessionStorage.setItem('aiPopupClosed', 'true');
  };

  // Manual click to expand during shake
  const handleManualExpand = () => {
    if (!isExpanded && visible && !shakeCompleted) {
      setIsExpanded(true);
      setShakeCompleted(true);
    }
  };

  // Don't render anything on mobile
  if (isMobile) return null;
  
  // Don't render if closed in this session
  if (hasClosed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed z-[9999] bottom-6 right-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.4, y: 50 }}
            transition={{ 
              type: "spring", 
              damping: 22, 
              stiffness: 280,
              mass: 0.7
            }}
            className="relative"
          >
            {/* Large X Close Button - Only shown when expanded */}
            {isExpanded && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center text-2xl font-bold z-20 shadow-2xl border-2 border-white cursor-pointer transition-all duration-200"
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
                width: isExpanded ? 360 : 70,
                height: isExpanded ? "auto" : 70,
                borderRadius: isExpanded ? "1.5rem" : "2rem"
              }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                damping: 28,
                stiffness: 320
              }}
              className="relative overflow-hidden"
              style={{
                background: isExpanded 
                  ? "linear-gradient(145deg, rgba(16, 22, 35, 0.98), rgba(8, 12, 22, 0.98))"
                  : "linear-gradient(135deg, #0f1625, #0a0e1a)",
                backdropFilter: "blur(16px)",
                border: "2px solid rgba(201, 168, 76, 0.5)",
                boxShadow: isExpanded
                  ? "0 25px 45px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(201, 168, 76, 0.3) inset, 0 0 25px rgba(201, 168, 76, 0.2)"
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
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    {/* Premium AI Text */}
                    <div className="text-3xl font-black bg-gradient-to-r from-white via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                      AI
                    </div>
                    
                    {/* Pulse ring effect */}
                    <motion.div
                      className="absolute -inset-3 rounded-full border-2 border-amber-500/40"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    
                    {/* Status indicator */}
                    <motion.div
                      className="absolute -top-1 -right-2 w-2.5 h-2.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    
                    {/* Hint text during shake */}
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
                /* Expanded Content - Lead Message */
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-5 relative"
                  style={{ width: "360px" }}
                >
                  {/* Premium accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                  
                  {/* Header */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-4"
                  >
                    <div className="text-4xl mb-2 inline-block">✨</div>
                    <h3 className="text-sm font-bold bg-gradient-to-r from-white via-amber-300 to-yellow-500 bg-clip-text text-transparent uppercase tracking-wide">
                      AI Opportunity
                    </h3>
                  </motion.div>

                  {/* Main Message */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-4"
                  >
                    {/* Lead Question */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-xl p-3 border border-amber-500/20">
                      <p className="text-white text-sm font-semibold text-center">
                        🎯 Looking for more leads & revenue?
                      </p>
                    </div>

                    {/* Contact Button */}
                    <motion.a
                      href="https://pranjaldigital.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl py-3 px-4 border border-amber-400/60 shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <p className="text-center text-white text-sm font-bold">
                        Contact Pranjal Now! 🚀
                      </p>
                      <p className="text-center text-amber-100 text-[10px] opacity-80 mt-1">
                        Free strategy call →
                      </p>
                    </motion.a>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-chart-line text-emerald-400 text-[10px]" />
                        <span className="text-[9px] text-white/40">200+ Clients</span>
                      </div>
                      <div className="w-px h-3 bg-white/20" />
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-trophy text-yellow-500 text-[10px]" />
                        <span className="text-[9px] text-white/40">98% Success</span>
                      </div>
                      <div className="w-px h-3 bg-white/20" />
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-clock text-blue-400 text-[10px]" />
                        <span className="text-[9px] text-white/40">24/7 Support</span>
                      </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center pt-1">
                      <p className="text-[8px] text-white/30 flex items-center justify-center gap-1">
                        <i className="fas fa-shield-alt" />
                        No obligation • Free consultation
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
