// src/components/react-bits/FolderShowcase.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectData {
    title: string;
    category: string;
    desc: string;
    tech: string[];
    images: string[];   // Tambahan array gambar untuk cover & carousel modal
    liveUrl?: string;   // Tambahan tautan live site proyek
}

interface FolderShowcaseProps {
    project: ProjectData;
}

export default function FolderShowcase({ project }: FolderShowcaseProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    // TAMBAHKAN STATE INI: Mengontrol posisi koordinat X dan Y teks nama proyek
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Fungsi navigasi carousel di dalam modal
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
    };

    return (
        <>
            {/* ─── KARTU UTAMA BERBASIS GAMBAR (GRID VIEW) ─── */}
            <motion.div
                whileHover={{ y: -6 }}
                onClick={() => {
                    setCurrentImgIdx(0); // Reset index gambar saat modal dibuka
                    setIsOpen(true);
                }}
                className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer group flex flex-col"
            >
                {/* ─── KONTEN GAMBAR DENGAN TILTED CARD & MOUSE-TRACKING TITLE ─── */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100 rounded-2xl">
                    <motion.div
                        className="w-full h-full relative"
                        style={{ perspective: 1000 }}
                        onMouseMove={(e) => {
                            const el = e.currentTarget;
                            const rect = el.getBoundingClientRect();
                            const width = rect.width;
                            const height = rect.height;

                            // 1. Hitung posisi kursor relatif terhadap titik tengah untuk Efek Tilt 3D
                            const xTilt = e.clientX - rect.left - width / 2;
                            const yTilt = e.clientY - rect.top - height / 2;
                            el.style.transform = `rotateY(${(xTilt / width) * 14}deg) rotateX(${-(yTilt / height) * 14}deg) scale(1.02)`;

                            // 2. Hitung posisi kursor murni dari pojok kiri atas gambar (0 sampai lebar/tinggi) untuk Teks Mengikuti Kursor
                            const xPos = e.clientX - rect.left;
                            const yPos = e.clientY - rect.top;
                            setMousePos({ x: xPos, y: yPos });
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
                        }}
                    >
                        {/* Gambar Utama Proyek */}
                        <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 pointer-events-none"
                        />

                        {/* Lapisan Gradien Gelap & Blur Bagian Bawah */}
                        <div
                            className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t pointer-events-none z-10"
                            style={{
                                maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
                            }}
                        />

                        {/* PERBAIKAN UTAMA: Teks Label yang Bergerak Mengikuti Kursor (React Bits Style) */}
                        <div
                            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none whitespace-nowrap"
                            style={{
                                left: mousePos.x,
                                top: mousePos.y,
                                transform: "translate(-50%, -50%) translateZ(40px)", // Mengunci posisi tengah kursor & memberi efek timbul 3D
                                transition: "opacity 0.2s ease, transform 0.05s ease-out", // Membuat pergerakan teks terasa kenyal halus
                            }}
                        >
                            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/50 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-black">
                                    {project.title}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Info Konten di Bawah Gambar */}
                <div className="py-5 px-1 flex justify-between items-end gap-4 bg-white flex-grow">
                    {/* Bagian Kiri Bawah: Nama & Spesifikasi Tech */}
                    <div className="flex flex-col gap-1 max-w-[70%]">
                        <h3 className="text-base font-medium text-black tracking-tight leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400 truncate">
                            {project.tech.join(" • ")}
                        </p>
                    </div>

                    {/* Bagian Kanan Bawah: Tombol Aksi Pemicu Modal */}
                    <div className="flex items-center gap-1 shrink-0 text-xs font-mono font-medium tracking-wider text-neutral-400 group-hover:text-black transition-colors duration-200 pb-0.5">
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                </div>
            </motion.div>
            

            {/* ─── POP-UP MODAL KUSTOM DENGAN CAROUSEL INTERAKTIF ─── */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Latar Belakang Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-white/80 backdrop-blur-md"
                        />

                        {/* Konten Kotak Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 10 }}
                            transition={{ type: "spring", duration: 0.35 }}
                            className="relative w-full max-w-xl bg-white border border-neutral-200 shadow-[0_24px_50px_rgba(0,0,0,0.07)] rounded-2xl overflow-hidden z-10 flex flex-col"
                        >
                            {/* Tombol Tutup (X) Mengambang di Pojok Atas */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-1.5 rounded-full border border-neutral-200/80 bg-white/90 backdrop-blur-sm text-neutral-400 hover:text-black hover:bg-white shadow-sm transition-colors z-30"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* 1. SEGMEN CAROUSEL GAMBAR (Atas Modal) */}
                            <div className="relative aspect-[16/9] w-full bg-neutral-50 overflow-hidden group/carousel border-b border-neutral-100">
                                <motion.img
                                    key={currentImgIdx}
                                    src={project.images[currentImgIdx]}
                                    alt={`${project.title} screenshot ${currentImgIdx + 1}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full h-full object-cover"
                                />

                                {/* Tombol Navigasi Kiri & Kanan (Hanya muncul jika gambar > 1) */}
                                {project.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full border border-neutral-200 bg-white/90 shadow-sm text-neutral-600 hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full border border-neutral-200 bg-white/90 shadow-sm text-neutral-600 hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>

                                        {/* Indikator Titik Posisi (Dots) */}
                                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                                            {project.images.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1.5 rounded-full transition-all duration-200 ${i === currentImgIdx ? "w-4 bg-black" : "w-1.5 bg-neutral-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* 2. SEGMEN DETAIL INFORMASI PROYEK (Bawah Modal) */}
                            <div className="p-6 flex flex-col gap-5 text-left">
                                <div>
                                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                                        {project.category}
                                    </span>
                                    <h4 className="text-xl font-black text-black tracking-tight">
                                        {project.title}
                                    </h4>
                                </div>

                                {/* Deskripsi */}
                                <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                                    {project.desc}
                                </p>

                                {/* Bahasa Pemrograman & Framework */}
                                <div>
                                    <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-2.5">
                                        <Code className="w-3.5 h-3.5" />
                                        <span>Teknologi Yang Digunakan</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech.map((techItem, index) => (
                                            <span
                                                key={index}
                                                className="text-[10px] font-mono font-medium px-2.5 py-1 bg-neutral-50 text-neutral-800 border border-neutral-200/60 rounded-md"
                                            >
                                                {techItem}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. SEGMEN ACTION BUTTONS */}
                                <div className="flex gap-3 mt-2 border-t border-neutral-100 pt-4">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-200 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-black hover:bg-neutral-50 transition-colors text-center"
                                    >
                                        Tutup
                                    </button>
                                    <a
                                        href={project.liveUrl || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-black text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 group"
                                    >
                                        <span>View Live Site</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}