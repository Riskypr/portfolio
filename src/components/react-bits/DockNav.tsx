// src/components/react-bits/DockNav.tsx
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface DockNavProps {
  items: { icon: React.ReactNode; label: string; href: string }[];
  className?: string;
}

export default function DockNav({ items, className }: DockNavProps) {
  // 1. Menyimpan posisi koordinat X dari mouse global di area dock
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none mt-4">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        // 2. Deteksi pergerakan mouse masuk, bergerak, dan keluar area
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "pointer-events-auto flex items-end gap-3 px-4 py-3 bg-white/70 backdrop-blur-md border border-neutral-200/80 rounded-4xl shadow-sm h-14",
          className
        )}
      >
        {items.map((item, idx) => (
          <DockIcon key={idx} href={item.href} mouseX={mouseX} label={item.label}>
            {item.icon}
          </DockIcon>
        ))}
      </motion.nav>
    </div>
  );
}

// ─── SUB-KOMPONEN UNTUK MENGHITUNG EFEK ANIMASI PEMBESARAN INDIVIDUAL ───
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

  // 3. Hitung jarak antara posisi mouse (X) dengan titik tengah tombol ikon ini
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // 4. Transformasikan jarak silang tersebut menjadi rentang ukuran lebar/tinggi piksel
  // Semakin dekat mouse (jarak mendekati 0), ukuran akan membesar dari 40px ke 60px
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  // 5. Redam animasi dengan fungsi Spring agar tidak patah-patah (efek kenyal elastis)
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 180, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 180, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width, height }}
      className="relative group flex items-center justify-center rounded-4xl text-neutral-500 hover:text-black hover:bg-neutral-50 border border-transparent hover:border-neutral-200/50 transition-colors pt-2"
    >
      {/* Tooltip Label Kecil yang muncul saat di-hover */}
      <span className="absolute -bottom-8 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[10px] font-mono font-bold tracking-wider uppercase bg-black text-white px-2 py-0.5 rounded-md shadow-sm pointer-events-none whitespace-nowrap z-30">
        {label}
      </span>
      
      {/* Render Icon Konten */}
      <div className="text-base flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </motion.a>
  );
}