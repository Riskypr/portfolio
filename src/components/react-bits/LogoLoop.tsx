// src/components/react-bits/LogoLoop.tsx
"use client";

import { motion } from "framer-motion";

interface LogoLoopProps {
  items: { icon: React.ReactNode; name: string }[];
  speed?: number;
}

export default function LogoLoop({ items, speed = 25 }: LogoLoopProps) {
  // Gandakan item agar transisinya loop mulus tanpa putus
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden relative py-2 bg-white">
      {/* Efek Fade Gradasi Halus Kiri & Kanan */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap gap-12 items-center"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors cursor-default group cursor-pointer">
            <div className="text-xl md:text-2xl filter grayscale group-hover:grayscale-0 transition-all">
              {item.icon}
            </div>
            {/* <span className="text-xs font-bold tracking-wider uppercase font-mono">
              {item.name}
            </span> */}
          </div>
        ))}
      </motion.div>
    </div>
  );
}