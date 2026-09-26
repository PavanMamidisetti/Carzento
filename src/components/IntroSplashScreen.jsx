import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Sparkles } from 'lucide-react';

/**
 * IntroSplashScreen — Cinematic Glowing Title Splash Screen
 * Displays a glowing title with an ambient radial aura against a black background
 * for 2 seconds on initial website load, creating an executive impression for recruiters.
 */
export default function IntroSplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 3-second display timer
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) {
        setTimeout(onFinish, 600); // Wait for fade-out animation to complete
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
          style={{
            background: '#020408',
          }}
        >
          {/* ─── Screen-Wide Ambient Radiant Glows ─── */}
          {/* Center primary radial aura */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.85, 1.15, 1],
              opacity: [0.4, 0.85, 0.75],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(30, 165, 153, 0.45) 0%, rgba(13, 138, 128, 0.22) 35%, rgba(6, 78, 72, 0.1) 60%, transparent 75%)',
              filter: 'blur(45px)',
            }}
          />

          {/* Secondary pulsating cyan outer halo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.9, 1.25, 1.05],
              opacity: [0.2, 0.5, 0.35],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.2,
            }}
            className="absolute w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(45, 212, 191, 0.25) 0%, rgba(14, 165, 233, 0.12) 40%, transparent 70%)',
              filter: 'blur(75px)',
            }}
          />

          {/* Full Screen Perimeter Glow Frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow:
                'inset 0 0 100px 20px rgba(30, 165, 153, 0.22), inset 0 0 180px 40px rgba(13, 138, 128, 0.15)',
            }}
          />

          {/* Subtle Grid Lines for High-Tech Aesthetic */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* ─── Central Brand & Title Emblem ─── */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Logo Emblem with Radiant Pulse */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              {/* Emblem Glow Backing */}
              <div
                className="absolute inset-0 rounded-2xl animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #1ea599 0%, #10b981 100%)',
                  filter: 'blur(22px)',
                  opacity: 0.85,
                }}
              />

              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-2xl border"
                style={{
                  background: 'linear-gradient(145deg, #0f2b28 0%, #061514 100%)',
                  borderColor: 'rgba(45, 212, 191, 0.55)',
                  boxShadow:
                    '0 0 35px rgba(30, 165, 153, 0.7), inset 0 0 20px rgba(45, 212, 191, 0.35)',
                }}
              >
                <Car
                  className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-teal)]"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(45, 212, 191, 0.9))',
                  }}
                  strokeWidth={2.2}
                />
              </div>
            </motion.div>

            {/* Glowing Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="relative"
            >
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight flex items-center justify-center"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.03em',
                  textShadow:
                    '0 0 30px rgba(30, 165, 153, 0.8), 0 0 65px rgba(30, 165, 153, 0.45), 0 0 100px rgba(13, 138, 128, 0.3)',
                }}
              >
                <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
                  Car
                </span>
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300"
                  style={{
                    filter: 'drop-shadow(0 0 25px rgba(45, 212, 191, 0.85))',
                  }}
                >
                  zento
                </span>
              </h1>
            </motion.div>

            {/* Professional Tagline & Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="mt-3 flex flex-col items-center gap-2.5"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-teal-300">
                  Automotive Intelligence &amp; Marketplace
                </span>
              </div>
            </motion.div>

            {/* 3-Second Glowing Progress Bar */}
            <div className="w-48 sm:w-64 h-[2.5px] bg-neutral-900 rounded-full mt-8 overflow-hidden relative border border-white/10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400"
                style={{
                  boxShadow: '0 0 15px #1ea599, 0 0 30px #2dd4bf',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
