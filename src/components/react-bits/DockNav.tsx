// src/components/react-bits/DockNav.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface DockNavProps {
  items: { icon: React.ReactNode; label: string; href: string; isStatic?: boolean }[];
  className?: string;
}

export default function DockNav({ items, className }: DockNavProps) {
  const mouseX = useMotionValue(Infinity);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler fungsi untuk eksekusi smooth scroll melewati batas offset atas navbar
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Jalankan fungsi kustom hanya untuk jangkar internal halaman (#)
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

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
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-center h-10 rounded-full hover:bg-neutral-50 border border-transparent hover:border-neutral-200/50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] px-2 hover:scale-[1.03]"
              >
                {item.icon}
              </a>
            );
          }

          return (
            <DockIcon 
              key={idx} 
              href={item.href} 
              mouseX={mouseX} 
              label={item.label}
              onClick={(e) => handleNavClick(e, item.href)}
            >
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
  onClick,
}: {
  href: string;
  mouseX: any;
  label: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
      onClick={onClick}
      style={{ width, height }}
      className="relative group flex items-center justify-center rounded-4xl text-neutral-500 hover:text-black hover:bg-neutral-50 border border-transparent hover:border-neutral-200/50 transition-colors duration-300"
    >
      <span className="absolute -bottom-8 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-[10px] font-mono font-bold tracking-wider uppercase bg-black text-white px-2 py-0.5 rounded-md shadow-sm pointer-events-none whitespace-nowrap z-30">
        {label}
      </span>
      
      <div className="text-base flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-110">
        {children}
      </div>
    </motion.a>
  );
}