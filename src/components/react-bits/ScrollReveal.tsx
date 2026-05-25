// src/components/react-bits/ScrollReveal.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  baseOpacity?: number;
  enableBlur?: boolean;
  disableOpacity?: boolean;
  
  // Amplitudo Transformasi Fisik
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  rotation?: number;
  
  // Konfigurasi Waktu & Trigger
  delay?: number;
  duration?: number;
  threshold?: number;
  easing?: [number, number, number, number] | string; 
}

export default function ScrollReveal({
  children,
  className = "",
  baseOpacity = 0,
  enableBlur = true,
  disableOpacity = false,
  yOffset = 40,
  xOffset = 0,
  scale = 1,
  rotation = 0,
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  easing = [0.16, 1, 0.3, 1],
}: ScrollRevealProps) {
  const ref = useRef(null);
  
  const isInView = useInView(ref, { 
    once: false, 
    amount: threshold 
  });

  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimationDone(true), (duration + delay) * 1000);
      return () => clearTimeout(timer);
    } else {
      setAnimationDone(false);
    }
  }, [isInView, duration, delay]);

  const variants = {
    hidden: {
      opacity: disableOpacity ? 1 : baseOpacity,
      y: yOffset,
      x: xOffset,
      scale: scale,
      rotate: rotation,
      filter: enableBlur ? "blur(8px)" : "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
  };

  // Kita gunakan Type Assertion tegas agar TypeScript tidak menebak format string objek transisi
  const currentTransition = isInView 
    ? {
        duration: duration,
        delay: delay,
        ease: easing,
      }
    : {
        duration: 0.4,
        ease: "easeInOut",
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      // SOLUSI: Menggunakan 'as any' di sini memotong semua kerumitan deteksi tipe internal Framer Motion yang bervariasi antar versi
      transition={currentTransition as any} 
      className={className}
      style={{
        filter: enableBlur && !animationDone && !isInView ? "blur(8px)" : "none",
      }}
    >
      {children}
    </motion.div>
  );
}