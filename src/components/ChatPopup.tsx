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

  // Detect mobile/desktop - COMPLETELY HIDE ON MOBILE
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // If mobile, completely hide and never show
      if (mobile) {
        setVisible(false);
        setHasClosed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show popup after 8 seconds, shake for 10 seconds, then auto-expand
  useEffect(() => {
    if (hasClosed || isMobile) return;
    
    // Show popup after 8 seconds
    const showTimer = setTimeout(() => {
      setVisible(true);
      
      // Auto-expand after 10 seconds of shaking
      const expandTimer = setTimeout(() => {
        if (!isExpanded && visible) {
          setIsExpanded(true);
        }
      }, 10000); // 10 seconds shake duration
      
      return () => clearTimeout(expandTimer);
    }, 8000); // 8 seconds delay before showing

    return () => {
      clearTimeout(showTimer);
    };
  }, [hasClosed, isMobile, isExpanded, visible]);

  // Handle close - stores in sessionStorage
  const handleClose = () => {
    setVisible(false);
    setHasClosed(true);
    sessionStorage.setItem('aiPopupClosed', 'true');
  };

  // Manual click to expand during shake
  const handleManualExpand = () => {
    if (!isExpanded && visible) {
      setIsExpanded(true);
    }
  };

  // Don't render anything on mobile or if closed
  if (hasClosed || isMobile) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed z-[9999] bottom-8 right-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 40, rotate: 5 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 260,
              mass: 0.8
            }}
            className="relative"
          >
            {/* Large X Close Button - Only shown when expanded */}
            {isExpanded && (
              <motion.button
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                whileHover={{ scale: 1.15, rotate: 90, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute -top-3.5 -right-3.5 w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center text-xl font-bold z-20 shadow-2xl border-2 border-white shadow-red-500/30 transition-all duration-300 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </motion.button>
            )}

            {/* Main Popup Container - Premium Glassmorphism */}
            <motion.div
              initial={{ 
                width: 70,
                height: 70,
                borderRadius: "2rem"
              }}
              animate={{ 
                width: isExpanded ? 340 : 70,
                height: isExpanded ? "auto" : 70,
                borderRadius: isExpanded ? "1.75rem" : "2rem"
              }}
              transition={{ 
                duration: 0.55, 
                type: "spring", 
                damping: 26,
                stiffness: 300,
                mass: 0.9
              }}
              className="relative overflow-hidden backdrop-blur-xl"
              style={{
                background: isExpanded 
                  ? "linear-gradient(135deg, rgba(18, 24, 38, 0.95), rgba(8, 12, 22, 0.98))"
                  : "linear-gradient(135deg, rgba(18, 24, 38, 0.95), rgba(8, 12, 22, 0.95))",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(201, 168, 76, 0.4)",
                boxShadow: isExpanded
                  ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(201, 168, 76, 0.2) inset, 0 0 30px rgba(201, 168, 76, 0.1)"
                  : "0 20px 40px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(201, 168, 76, 0.3) inset"
              }}
            >
              {!isExpanded ? (
                /* Premium Shaking AI Icon - 10 seconds continuous */
                <motion.div 
                  className="w-[70px] h-[70px] flex items-center justify-center cursor-pointer relative group"
                  animate={{
                    x: [0, -8, 8, -7, 7, -5, 5, -4, 4, -2, 2, -1, 1, 0],
                    y: [0, -3, 2, -2, 2, -1, 1, -1, 1, 0, 0, -1, 1, 0],
                    rotate: [0, -6, 6, -5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0]
                  }}
                  transition={{
                    duration: 10,
                    times: [0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56, 0.63, 0.72, 0.81, 0.91, 1],
                    ease: "easeInOut",
                    repeat: 0
                  }}
                  onClick={handleManualExpand}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="relative">
                    {/* Premium AI Text with 3D effect */}
                    <div className="relative">
                      <div className="text-3xl font-black bg-gradient-to-r from-white via-amber-300 to-yellow-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                        AI
                      </div>
                      {/* Glow behind text */}
                      <div className="absolute inset-0 blur-xl bg-amber-500/20 -z-10" />
                    </div>
                    
                    {/* Elegant orbiting rings */}
                    <motion.div
                      className="absolute -inset-4 rounded-full border border-amber-500/20"
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Premium pulse effect */}
                    <motion.div
                      className="absolute -inset-5 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0"
                      animate={{ scale: [1, 1.5, 1], opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Status dot with glow */}
                    <motion.div
                      className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    </motion.div>
                    
                    {/* Subtle hint text */}
                    <motion.div
                      className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-[9px] text-white/40 whitespace-nowrap font-medium tracking-wider uppercase"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      Ready to scale?
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                /* Premium Expanded Content - Compact & Elegant */
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-5 relative"
                  style={{ width: "340px" }}
                >
                  {/* Premium animated gradient border */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Header with AI - Elegant entrance */}
                  <motion.div 
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                      className="text-3xl mb-2 inline-block"
                    >
                      🎯
                    </motion.div>
                    <h3 className="text-sm font-bold bg-gradient-to-r from-white via-amber-300 to-yellow-500 bg-clip-text text-transparent tracking-wide uppercase">
                      Exclusive Opportunity
                    </h3>
                  </motion.div>

                  {/* Main Message - Premium typography */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Question with premium styling */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-xl p-3 border border-amber-500/20 backdrop-blur-sm">
                      <p className="text-white text-sm font-semibold text-center leading-relaxed">
                        Looking for more leads & revenue?
                      </p>
                    </div>

                    {/* Premium CTA Button - Contact Pranjal */}
                    <motion.a
                      href="https://pranjaldigital.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -8px rgba(201, 168, 76, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="block bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-500 rounded-xl py-3 px-4 border border-amber-400/60 shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group"
                    >
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      
                      <p className="text-center text-white text-sm font-bold tracking-wide">
                        Contact Pranjal Now! 🚀
                      </p>
                      <p className="text-center text-amber-100 text-[10px] opacity-80 mt-1">
                        Free 30-min strategy call →
                      </p>
                    </motion.a>

                    {/* Premium trust indicators */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="flex items-center justify-center gap-4 pt-2"
                    >
                      {[
                        { icon: "fa-chart-line", color: "text-emerald-400", label: "200+ Clients" },
                        { icon: "fa-trophy", color: "text-yellow-500", label: "98% Success" },
                        { icon: "fa-clock", color: "text-blue-400", label: "24/7 Support" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <i className={`fas ${item.icon} ${item.color} text-[10px]`} />
                          <span className="text-[9px] text-white/40 font-medium">{item.label}</span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Premium footer note */}
                    <div className="text-center pt-1">
                      <p className="text-[8px] text-white/30 flex items-center justify-center gap-1.5">
                        <i className="fas fa-shield-alt text-[8px]" />
                        <span>No obligation • Free consultation • No credit card</span>
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
