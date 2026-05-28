// src/components/react-bits/DockNav.tsx
"use client";

import React, { useRef, useState, useEffect } from "react"; // Tambahkan useState & useEffect
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface DockNavProps {
  items: { icon: React.ReactNode; label: string; href: string; isStatic?: boolean }[];
  className?: string;
}

export default function DockNav({ items, className }: DockNavProps) {
  const mouseX = useMotionValue(Infinity);
  const [mounted, setMounted] = useState(false);

  // Pastikan komponen telah ter-mount sempurna di client sebelum render elemen responsive
  useEffect(() => {
    setMounted(true);
  }, []);

  // Jika belum mounted, kembalikan nav kosong dengan struktur minimal agar server & client sinkron
  if (!mounted) {
    return (
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none mt-4">
        <nav className={cn(
          "pointer-events-auto flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-md border border-neutral-200/80 rounded-4xl shadow-sm h-14",
          className
        )} />
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none mt-4">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "pointer-events-auto flex items-center gap-3 px-3 py-3 bg-white/70 backdrop-blur-md border border-neutral-200/80 rounded-4xl shadow-sm h-14",
          className
        )}
      >
        {items.map((item, idx) => {
          if (item.isStatic) {
            return (
              <a
                key={idx}
                href={item.href}
                className="flex items-center justify-center h-10 rounded-full hover:bg-neutral-50 border border-transparent hover:border-neutral-200/50 transition-all duration-200 px-2"
              >
                {item.icon}
              </a>
            );
          }

          return (
            <DockIcon key={idx} href={item.href} mouseX={mouseX} label={item.label}>
              {item.icon}
            </DockIcon>
          );
        })}
      </motion.nav>
    </div>
  );
}

function DockIcon({
  href,
  mouseX,
  label,
  children,
}: {
  href: string;
  mouseX: any;
  label: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 180, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 180, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width, height }}
      className="relative group flex items-center justify-center rounded-4xl text-neutral-500 hover:text-black hover:bg-neutral-50 border border-transparent hover:border-neutral-200/50 transition-colors"
    >
      <span className="absolute -bottom-8 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[10px] font-mono font-bold tracking-wider uppercase bg-black text-white px-2 py-0.5 rounded-md shadow-sm pointer-events-none whitespace-nowrap z-30">
        {label}
      </span>
      
      <div className="text-base flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </motion.a>
  );
}