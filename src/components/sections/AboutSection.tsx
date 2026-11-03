"use client";

import React, { useState } from "react";
// import Layers from "@/components/Lanyard";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Compass, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { EXPERIENCES } from "@/src/constants/about";
import ScrollReveal from "@/src/components/react-bits/ScrollReveal";

type Experience = (typeof EXPERIENCES)[number];

function ExperienceCard({ experience, showDetails = false }: { experience: Experience; showDetails?: boolean }) {
    const [company, type] = experience.company.split(" · ");
    const date = experience.date.split(" · ")[0];

    return (
        <article className="rounded-[22px] border border-neutral-200 bg-white px-5 py-4 shadow-[0_3px_8px_rgba(0,0,0,0.04)] sm:px-6 sm:py-5">
            <h4 className="text-base font-semibold tracking-tight text-neutral-900">{company}</h4>
            <div className="mt-2 flex items-end justify-between gap-3">
                <p className="min-w-0 text-sm font-medium leading-snug text-neutral-700">{experience.title}</p>
                <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-neutral-600">{date}</span>
            </div>
            {showDetails && (
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-400">
                    {type && <span>{type}</span>}
                    {type && experience.location && <span aria-hidden="true">·</span>}
                    {experience.location && <span>{experience.location}</span>}
                </div>
            )}
        </article>
    );
}

export default function AboutSection() {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <section id="about" className="py-28 max-w-5xl mx-auto px-6 border-t border-neutral-100 scroll-mt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                {/* Left profile column */}
                <ScrollReveal className="md:col-span-5" duration={0.8} yOffset={32} enableBlur>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="relative w-full h-74 aspect-[4/5] max-w-[320px] mb-6 group overflow-hidden rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <img
                            src="/me.png"
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

                    <h3 className="text-2xl font-semibold text-black tracking-tight ">Risky Prasetyo</h3>
                    {/* <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Computer Systems Administration Assistant Intern at BPS</p> */}
                    <p className="text-[12px] font-medium text-neutral-400 tracking-widest mt-1 mb-8">Entry-Level Frontend Developer </p>
                </div>
                </ScrollReveal>

                {/* Right information column */}
                <ScrollReveal className="md:col-span-7" delay={0.12} duration={0.8} yOffset={32} enableBlur>
                <div className="space-y-12 pt-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 text-black">
                            {/* <Compass className="w-4 h-4 shrink-0" /> */}
                            <h4 className="text-xl font-semibold tracking-tight text-neutral-900">About Me</h4>
                        </div>
                        <div className="pl-6 border-l border-neutral-100 space-y-2">
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                I hold a Computer Science degree from the University of Palangka Raya and am an entry-level frontend developer with experience in JavaScript and PHP. I am currently developing my skills in artificial intelligence (AI) and computer networking, and I am open to opportunities in web development and related technology fields.
                            </p>
                        </div>
                    </div>

                </div>
                </ScrollReveal>

                {/* Experience follows About Me in the mobile grid; on desktop it occupies the left column below the profile. */}
                <motion.div
                    layout
                    transition={{ layout: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
                    className="md:col-span-5"
                >
                    <ScrollReveal duration={0.8} delay={0.1} yOffset={28} enableBlur>
                    <div className="w-full max-w-[420px]">
                        <h3 className="mb-5 text-xl font-semibold tracking-tight text-neutral-900">My work history</h3>

                        <motion.div layout transition={{ layout: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}>
                            <AnimatePresence initial={false} mode="wait">
                                {showHistory ? (
                                    <motion.div
                                        key="all-experiences"
                                        initial={{ opacity: 0, height: 0, y: 8 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -6 }}
                                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                        className="space-y-3 overflow-hidden"
                                    >
                                        {EXPERIENCES.map((experience, index) => (
                                            <motion.div
                                                key={`${experience.title}-${experience.company}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.28, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                <ExperienceCard experience={experience} showDetails />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="experience-stack"
                                        initial={{ opacity: 0, height: 0, y: -6 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: 8 }}
                                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative overflow-hidden px-2 pb-8 pt-1"
                                    >
                                        <div aria-hidden="true" className="absolute left-7 right-7 top-1 bottom-8 translate-y-6 rounded-[22px] border border-neutral-200 bg-neutral-100 shadow-[0_8px_16px_rgba(0,0,0,0.04)]" />
                                        <div aria-hidden="true" className="absolute left-4 right-4 top-1 bottom-8 translate-y-3 rounded-[22px] border border-neutral-200 bg-neutral-50 shadow-[0_6px_12px_rgba(0,0,0,0.04)]" />
                                        <div className="relative z-10">
                                            <ExperienceCard experience={EXPERIENCES[0]} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="mt-3 flex justify-center">
                            <motion.button
                                type="button"
                                layout
                                onClick={() => setShowHistory((visible) => !visible)}
                                aria-expanded={showHistory}
                                transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_22px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={showHistory ? "show-less" : "show-all"}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.16, ease: "easeOut" }}
                                    >
                                        {showHistory ? "Show less" : "Show all"}
                                    </motion.span>
                                </AnimatePresence>
                                <motion.span
                                    animate={{ rotate: showHistory ? 180 : 0 }}
                                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex size-4 items-center justify-center rounded-full bg-neutral-950 text-white"
                                >
                                    <ChevronDown className="size-2.5" />
                                </motion.span>
                            </motion.button>
                        </div>
                    </div>
                    </ScrollReveal>
                </motion.div>

                <ScrollReveal className="hidden lg:block md:col-span-7" duration={0.8} delay={0.18} yOffset={28} enableBlur>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 lg:-translate-y-64">
                    <div className="mb-6 flex items-end justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                                Developer snapshot
                            </p>
                            <h3 className="mt-2 text-lg font-semibold tracking-tight text-neutral-900">
                                What I&apos;m focused on
                            </h3>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                            Current direction
                        </span>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-neutral-200">
                        <div className="pr-4">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">01 / Building</span>
                            <h4 className="mt-3 text-sm font-semibold text-neutral-900">Web experiences</h4>
                            <p className="mt-2 text-xs leading-relaxed text-neutral-500">Developing clean, useful interfaces with JavaScript, Next.js, and PHP.</p>
                        </div>
                        <div className="px-4">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">02 / Exploring</span>
                            <h4 className="mt-3 text-sm font-semibold text-neutral-900">Artificial intelligence</h4>
                            <p className="mt-2 text-xs leading-relaxed text-neutral-500">Learning to bring practical AI features into everyday web applications.</p>
                        </div>
                        <div className="pl-4">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">03 / Strengthening</span>
                            <h4 className="mt-3 text-sm font-semibold text-neutral-900">Systems & networking</h4>
                            <p className="mt-2 text-xs leading-relaxed text-neutral-500">Growing my knowledge of computer systems and network fundamentals.</p>
                        </div>
                    </div>
                </div>
                </ScrollReveal>

            </div>
        </section>
    );
}


