// src/components/react-bits/BounceCards.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BounceCardsProps {
  images: string[];
}

export default function BounceCards({ images }: BounceCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = () => {
    // Berganti ke gambar berikutnya saat kartu diklik
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  // Rotasi dan posisi acak estetis untuk efek tumpukan kartu
  const cardTransforms = [
    { rotate: "-6deg", x: "-40px", y: "5px" },
    { rotate: "6deg", x: "12px", y: "-8px" },
    { rotate: "-2deg", x: "2px", y: "10px" },
  ];

  return (
    <div 
      className="relative w-[280px] h-[200px] md:w-[340px] md:h-[260px] cursor-pointer group select-none"
      onClick={handleCardClick}
    >
      {images.map((img, idx) => {
        // Tentukan apakah ini kartu yang sedang berada di paling atas
        const isTop = idx === activeIndex;
        const transform = cardTransforms[idx % cardTransforms.length];

        return (
          <motion.div
            key={idx}
            className="absolute inset-0 w-full h-full rounded-2xl border border-none bg-neutral-900 overflow-hidden shadow-2xl origin-center"
            style={{ zIndex: isTop ? 10 : idx }}
            animate={{
              scale: isTop ? 1 : 0.95,
              rotate: isTop ? "-4deg" : transform.rotate,
              x: isTop ? 0 : transform.x,
              y: isTop ? 0 : transform.y,
            }}
            whileHover={{
              y: isTop ? -12 : transform.y,
              scale: isTop ? 1.02 : 0.96,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img 
              src={img} 
              alt={`Project asset ${idx}`} 
              className="w-full h-full object-cover pointer-events-none filter grayscale hover:grayscale-0 transition-all duration-500"
            />
            {/* Lapisan overlay gradasi halus */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        );
      })}
    </div>
  );
}