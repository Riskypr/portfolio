// src/components/react-bits/FolderShowcase.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import { X, Code, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import ExpandableText from "./ExpandableText";


interface ProjectData {
    title: string;
    category: string;
    desc: string;
    tech: string[];
    images: string[];   
    liveUrl?: string | null;
    repoUrl?: string;
}

interface FolderShowcaseProps {
    project: ProjectData;
}

export default function FolderShowcase({ project }: FolderShowcaseProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false); 
    const [showFullDesc, setShowFullDesc] = useState(false);
    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

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
            <motion.div
                whileHover={{ y: -6 }}
                onClick={() => {
                    setCurrentImgIdx(0); 
                    setIsOpen(true);
                }}
                className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer group flex flex-col"
            >
                <div className="relative w-full overflow-hidden bg-neutral-100 border-b border-neutral-100 rounded-2xl">
                    <motion.div
                        className="w-full h-full relative"
                        style={{ perspective: 1000 }}
                        onMouseMove={(e) => {
                            const el = e.currentTarget;
                            const rect = el.getBoundingClientRect();
                            const width = rect.width;
                            const height = rect.height;

                            const xTilt = e.clientX - rect.left - width / 2;
                            const yTilt = e.clientY - rect.top - height / 2;
                            el.style.transform = `rotateY(${(xTilt / width) * 14}deg) rotateX(${-(yTilt / height) * 14}deg) scale(1.02)`;

                            const xPos = e.clientX - rect.left;
                            const yPos = e.clientY - rect.top;
                            setMousePos({ x: xPos, y: yPos });
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
                        }}
                    >
                        <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 pointer-events-none"
                        />

                        <div
                            className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t pointer-events-none z-10"
                            style={{
                                maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
                            }}
                        />  

                        <div
                            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none whitespace-nowrap"
                            style={{
                                left: mousePos.x,
                                top: mousePos.y,
                                transform: "translate(-50%, -50%) translateZ(40px)", 
                                transition: "opacity 0.2s ease, transform 0.05s ease-out", 
                            }}
                        >
                            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/50 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-black">
                                    {project.title}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Info Konten */}
                <div className="py-5 px-1 flex justify-between items-end gap-4 bg-white flex-grow">
                    <div className="flex flex-col gap-1 max-w-[70%]">
                        <h3 className="text-base font-medium text-black tracking-tight leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-[11px] text-neutral-400 truncate">
                            {project.tech.join(" • ")}
                        </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 text-xs font-medium tracking-wider text-neutral-400 group-hover:text-black transition-colors duration-200 pb-0.5">
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                </div>
            </motion.div>
            

            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center p-0 md:p-4 ">
                            {/* Latar Belakang Blur */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/80 "
                            />

                            {/* Konten Kotak Modal */}
                            <motion.div
                                initial={{ y: "100%", opacity: 0.5 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "100%", opacity: 0.5 }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="relative w-full max-w-xl bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.08)] md:shadow-[0_24px_50px_rgba(0,0,0,0.07)] rounded-t-2xl md:rounded-2xl overflow-hidden z-10 flex flex-col max-h-[100%] md:max-h-[100%]"
                            >
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 p-1.5 rounded-full border border-neutral-200/80 bg-white/90 backdrop-blur-sm text-neutral-400 hover:text-black hover:bg-white shadow-sm transition-colors z-30 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                               {/*  Gambar carousel */}
                                <div className="relative md:aspect-[16/10] w-full bg-neutral-50 overflow-hidden group/carousel border-b border-neutral-100">
                                    <motion.img
                                        key={currentImgIdx}
                                        src={project.images[currentImgIdx]}
                                        alt={`${project.title} screenshot ${currentImgIdx + 1}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full h-full object-cover"
                                    />

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

                                            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                                                {project.images.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1.5 rounded-full transition-all duration-200 ${i === currentImgIdx ? "w-4 bg-black" : "w-1.5 bg-neutral-300"}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Konten Modal */}
                                <div className="p-6 flex flex-col gap-5 text-left overflow-y-auto">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-1">
                                            {project.category}
                                        </span>
                                        <h4 className="text-xl font-black text-black tracking-tight">
                                            {project.title}
                                        </h4>
                                    </div>

                                    <ExpandableText text={project.desc} />

                                    {/* <div>
                                        <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase tracking-wider mb-2.5">
                                            <Code className="w-3.5 h-3.5" />
                                            <span>Technologies Used</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech.map((techItem, index) => (
                                                <span
                                                    key={index}
                                                    className="text-[10px] font-medium px-2.5 py-1 bg-neutral-50 text-neutral-800 border border-neutral-200/60 rounded-md"
                                                >
                                                    {techItem}
                                                </span>
                                            ))}
                                        </div>
                                    </div> */}

                                   {/* Action Buttons */}
                                    <div className="flex gap-3 border-t border-neutral-100 pt-4 pb-2 md:pb-0">
                                        <a
                                            href={project.liveUrl || project.repoUrl || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 p-4 rounded-xl bg-black text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 group"
                                        >
                                            <span>{project.liveUrl ? "View Live Site" : "View Repository"}</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </a>
                                        {project.liveUrl && project.repoUrl && (
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 p-4 rounded-xl border border-neutral-200 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                GitHub
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
