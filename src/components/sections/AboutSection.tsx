"use client";

import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Briefcase, GraduationCap, Compass, ChevronUp, ChevronDown } from "lucide-react";

export default function AboutSection() {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <section id="about" className="py-28 max-w-5xl mx-auto px-6 border-t border-neutral-100 scroll-mt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                {/* Profil Sisi Kiri */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="relative w-full h-84 aspect-[4/5] max-w-[320px] mb-6 group overflow-hidden rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <img
                            src="/aboutMe.jpg"
                            alt="Risky Prasetyo"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />

                        {/* Social Media Shortcuts */}
                        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                            {[
                                { href: "https://instagram.com", icon: <FaInstagram className="w-4 h-4" />, name: "Instagram" },
                                { href: "https://linkedin.com", icon: <FaLinkedin className="w-4 h-4" />, name: "LinkedIn" },
                                { href: "https://github.com", icon: <FaGithub className="w-4 h-4" />, name: "GitHub" },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-black hover:text-white transition-all duration-300 border border-white/20 shadow-sm"
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-black tracking-tight uppercase">Risky Prasetyo</h3>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1 mb-8">Front End Developer</p>
                    {/* Accordion History */}
                    <div className="w-full max-w-[320px] border-t border-b border-neutral-100 py-3 mt-4">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black hover:text-neutral-500 transition-colors duration-300 py-1 cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5" />
                                History Pengalaman
                            </span>
                            {/* Icon rotasi yang smooth */}
                            <ChevronDown
                                className={`w-4 h-4 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showHistory ? "rotate-180" : "rotate-0"}`}
                            />
                        </button>

                        {/* Konten dengan tinggi dinamis & fade-in smooth */}
                        <div
                            className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showHistory ? "grid-rows-[1fr] opacity-100 mt-4 pt-2 border-t border-neutral-50" : "grid-rows-[0fr] opacity-0"
                                }`}
                        >
                            <div className="overflow-hidden space-y-5 text-left">
                                <div>
                                    <span className="text-[10px] text-neutral-400 block">Agustus 2024 - Desember 2024</span>
                                    <h4 className="text-xs font-bold text-black mt-0.5">Magang Frontend Web Developer</h4>
                                    <h5 className="text-[11px] text-neutral-400 font-medium">Diskominfosantik Kalteng</h5>
                                    <p className="text-neutral-600 text-[11px] mt-1.5 leading-relaxed">
                                        Melakukan optimasi performa dashboard admin serta implementasi arsitektur komponen modular berbasis Next.js.
                                    </p>
                                </div>
                                <div>
                                    <span className="text-[10px] text-neutral-400 block">Februari 2024 - Juli 2024</span>
                                    <h4 className="text-xs font-bold text-black mt-0.5">Studi Independen Frontend Web and Backend</h4>
                                    <h5 className="text-[11px] text-neutral-400 font-medium">Dicoding Indonesia</h5>
                                    <p className="text-neutral-600 text-[11px] mt-1.5 leading-relaxed">
                                        Melakukan optimasi performa dashboard admin serta implementasi arsitektur komponen modular berbasis Next.js.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informasi Sisi Kanan */}
                <div className="md:col-span-7 space-y-12 pt-2">
                    {/* Pendidikan */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 text-black">
                            <GraduationCap className="w-4 h-4 shrink-0" />
                            <h4 className="text-xs uppercase tracking-widest font-bold">Latar Belakang Akademis</h4>
                        </div>
                        <div className="pl-6 border-l border-neutral-100 space-y-2">
                            <h5 className="text-base font-bold text-black tracking-tight">S1 — Teknik Informatika (S.T.)</h5>
                            <p className="text-xs text-neutral-500">Universitas Ahmad Dahlan · Lulus Tahun 2026</p>
                            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed pt-1">
                                Berfokus pada rekayasa perangkat lunak dan komputasi cerdas. Menyelesaikan tugas akhir skripsi tepat waktu dengan konsentrasi pengembangan antarmuka web modern, interaktivitas visual, serta optimasi performa *client-side*.
                            </p>
                        </div>
                    </div>

                    {/* Kegiatan & Eksplorasi */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 text-black">
                            <Compass className="w-4 h-4 shrink-0" />
                            <h4 className="text-xs uppercase tracking-widest font-bold">Kegiatan & Eksplorasi Kampus</h4>
                        </div>
                        <div className="pl-6 border-l border-neutral-100 space-y-6">
                            {[
                                {
                                    date: "Maret 2026 — April 2026",
                                    title: "Sertifikasi Kompetensi AI Generatif",
                                    desc: "Mengikuti pelatihan fundamental teknologi AI generatif di Dicoding, mencakup pemahaman mendalam tentang text generation, image manipulation, dan pemrosesan audio (speech framework)."
                                },
                                {
                                    date: "Mei 2026",
                                    title: "Mini Bootcamp Field Collection",
                                    desc: "Terlibat aktif dalam program pengenalan operasional lapangan (field collection dynamics) untuk memperluas pemahaman interpersonal, manajemen risiko kerja, dan alur bisnis operasional."
                                },
                                {
                                    date: "2023 — 2025",
                                    title: "Eksplorasi Proyek Open-Source & Badminton Club",
                                    desc: "Aktif mengembangkan berbagai proyek antarmuka web mandiri berbasis Tailwind CSS, serta aktif menjaga keseimbangan kebugaran fisik melalui kegiatan unit olahraga bulutangkis internal kampus."
                                }
                            ].map((item, index) => (
                                <div key={index} className="space-y-1">
                                    <span className="text-[10px] text-neutral-400 block">{item.date}</span>
                                    <h5 className="text-xs font-bold text-black uppercase tracking-tight">{item.title}</h5>
                                    <p className="text-neutral-600 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}