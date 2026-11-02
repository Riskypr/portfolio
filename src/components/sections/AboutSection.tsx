"use client";

import React, { useState } from "react";
// import Layers from "@/components/Lanyard";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Briefcase, Compass, ChevronDown } from "lucide-react";
import { EXPERIENCES } from "@/src/constants/about";

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
                                { href: "https://www.linkedin.com/in/risky-prasetyo-905423256/", icon: <FaLinkedin className="w-4 h-4" />, name: "LinkedIn" },
                                { href: "https://github.com/Riskypr", icon: <FaGithub className="w-4 h-4" />, name: "GitHub" },
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
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Asisten Pranata Komputer Intern at BPS</p>
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mt-1 mb-8">Entry-Level Frontend Developer · AI & Web Development</p>
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
                                {EXPERIENCES.map((experience) => (
                                    <div key={`${experience.title}-${experience.company}`}>
                                        <span className="text-[10px] text-neutral-400 block">{experience.date}</span>
                                        <h4 className="text-xs font-bold text-black mt-0.5">{experience.title}</h4>
                                        <h5 className="text-[11px] text-neutral-500 font-medium">{experience.company}</h5>
                                        <p className="text-[10px] text-neutral-400 mt-1">{experience.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informasi Sisi Kanan */}
                <div className="md:col-span-7 space-y-12 pt-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 text-black">
                            <Compass className="w-4 h-4 shrink-0" />
                            <h4 className="text-xs uppercase tracking-widest font-bold">Tentang Saya</h4>
                        </div>
                        <div className="pl-6 border-l border-neutral-100 space-y-2">
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Lulusan Teknik Informatika Universitas Palangka Raya dan entry-level frontend developer dengan pengalaman menggunakan JavaScript dan PHP. Saat ini saya mengembangkan keterampilan di bidang kecerdasan buatan (AI) dan jaringan komputer, serta terbuka untuk peluang di pengembangan web dan bidang teknologi terkait.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
