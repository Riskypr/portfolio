// src/components/react-bits/ClickSpark.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface ClickSparkProps {
  sparkColor?: string; // Warna percikan
  sparkSize?: number;  // Ukuran dasar partikel
  sparkCount?: number; // Jumlah partikel per klik
  duration?: number;   // Durasi animasi dalam ms
  className?: string;  
}

export default function ClickSpark({
  sparkColor = "#000000", // Default hitam agar selaras dengan tema Anda
  sparkSize = 6,
  sparkCount = 8,
  duration = 400,
  className = "",
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);
  const startTimeRef = useRef<number>(0);

  // Fungsi untuk menggambar partikel di canvas
  const drawSparks = useCallback(
    (ctx: CanvasRenderingContext2D, elapsed: number) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      sparksRef.current.forEach((spark) => {
        // Hitung progres partikel (0 ke 1)
        const progress = elapsed / duration;
        if (progress >= 1) return; // Partikel sudah mati

        // Hitung opasitas (memudar)
        const opacity = 1 - progress;
        
        // Hitung posisi partikel berdasarkan kecepatan dan gravitasi
        // Menggunakan easing out agar melambat
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const distance = spark.speed * easeOut;
        
        const x = spark.x + Math.cos(spark.angle) * distance;
        const y = spark.y + Math.sin(spark.angle) * distance + (progress * progress * 50); // Tambah sedikit gravitasi

        // Hitung ukuran partikel (mengecil)
        const size = sparkSize * (1 - progress);

        // Gambar partikel (lingkaran)
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        
        // Konversi hex color ke rgba untuk opasitas
        const r = parseInt(sparkColor.slice(1, 3), 16);
        const g = parseInt(sparkColor.slice(3, 5), 16);
        const b = parseInt(sparkColor.slice(5, 7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      });
    },
    [duration, sparkColor, sparkSize]
  );

  // Loop animasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      drawSparks(ctx, elapsed);

      // Hapus partikel yang sudah selesai dlm array
      if (elapsed > duration) {
        sparksRef.current = [];
        startTimeRef.current = 0;
        // Tidak perlu me-request frame lagi jika tidak ada partikel
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Fungsi untuk menangani klik global
    const handleClick = (e: MouseEvent) => {
      // Deteksi apakah elemen yang diklik atau induknya adalah tombol/tautan/dll
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest("[role='button']") ||
        getComputedStyle(target).cursor === "pointer";

      // Hanya buat percikan jika elemen interaktif diklik
      if (!isInteractive) return;

      // Ambil posisi canvas relatif terhadap viewport
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Reset sparks array
      sparksRef.current = [];

      // Buat partikel baru
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: clickX,
          y: clickY,
          angle: Math.random() * Math.PI * 2, // Arah acak
          speed: 20 + Math.random() * 30,     // Kecepatan acak
        });
      }

      // Mulai ulang animasi
      startTimeRef.current = 0;
      cancelAnimationFrame(animationFrameId); // Batalkan animasi sebelumnya jika ada
      animationFrameId = requestAnimationFrame(render);
    };

    // Fungsi untuk menyesuaikan ukuran canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawSparks, duration, sparkCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-50 ${className}`} // pointer-events-none agar tidak memblokir klik asli, z-50 agar di atas segalanya
    />
  );
}