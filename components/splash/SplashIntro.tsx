'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import StarfieldBackground from './StarfieldBackground';

interface SplashIntroProps {
  children: React.ReactNode;
}

export default function SplashIntro({ children }: SplashIntroProps) {
  // Check sessionStorage immediately on initialization to prevent flash
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('4sl_intro_seen');
    }
    return true; // Show splash by default on server-side
  });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Only set up timer if splash should be shown
    if (showSplash) {
      // Auto-exit after full sequence (9 seconds)
      const autoExitTimer = setTimeout(() => {
        handleExit();
      }, 9000);

      return () => clearTimeout(autoExitTimer);
    }
  }, [showSplash]);

  const handleExit = () => {
    setIsExiting(true);
    sessionStorage.setItem('4sl_intro_seen', 'true');

    // Allow radial reveal animation to complete before unmounting
    setTimeout(() => {
      setShowSplash(false);
    }, 2500);
  };

  const handleSkip = () => {
    handleExit();
  };

  useEffect(() => {
    if (!showSplash) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showSplash]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (!showSplash) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Main Content - Always visible underneath */}
      <div>
        {children}
      </div>

      {/* Splash Overlay */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
            style={{
              background: 'linear-gradient(to bottom, #1A3859 0%, #1A3859 50%, rgba(23, 29, 26, 1) 50%, rgba(23, 29, 26, 1) 100%)'
            }}
            onClick={handleSkip}
            initial={{ opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 100%)',
                    maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 100%)'
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.3 }
                : { duration: 2.5, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {/* Starfield Background - Bottom Half Only */}
            {!prefersReducedMotion && <StarfieldBackground />}

            {/* Skip Button */}
            <motion.button
              className="absolute bottom-8 right-8 text-[#FCC169] text-sm font-medium hover:underline z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleSkip}
            >
              Skip intro →
            </motion.button>

            <div className="relative flex flex-col items-center justify-center space-y-8">
              {/* 4SL Logo - Fade in */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 1.3,
                  ease: 'easeOut'
                }}
                className="relative w-64 h-20"
              >
                <Image
                  src="/4SL_logo.png"
                  alt="4StudentLives"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* "Presents Dossier for" Text */}
              <motion.p
                className="text-[#FCC169] text-xl font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: prefersReducedMotion ? 0.3 : 2.3,
                  duration: prefersReducedMotion ? 0.2 : 0.9,
                  ease: 'easeOut'
                }}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Presents Dossier for
              </motion.p>

              {/* Startup Ignition Logos (Layered) */}
              <div className="relative w-80 h-32 mt-4 z-30">
                {/* Green Arrow - Top Layer (comes first, z-index higher) */}
                <motion.div
                  className="absolute inset-0 z-40"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0.5 : 3.9,
                    duration: prefersReducedMotion ? 0.2 : 0.8,
                    ease: 'easeOut'
                  }}
                >
                  <Image
                    src="/startup_ignition_arrow_hd.png"
                    alt="Startup Ignition Arrow"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Base Logo - Behind Arrow (fades in after, z-index lower) */}
                <motion.div
                  className="absolute inset-0 z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0.6 : 4.9,
                    duration: prefersReducedMotion ? 0.2 : 1.0,
                    ease: 'easeOut'
                  }}
                >
                  <Image
                    src="/startup_ignition_base_hd.png"
                    alt="Startup Ignition"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
