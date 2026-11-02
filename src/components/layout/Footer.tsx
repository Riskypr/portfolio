"use client";

import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="mt-32 border-t border-neutral-800 bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center">
                    <p className="uppercase tracking-[0.3em] text-[11px] text-neutral-500">
                        Get In Touch
                    </p>
                    <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
                        Let&apos;s build something meaningful.
                    </h2>
                    <p className="mt-5 max-w-xl mx-auto text-neutral-400 leading-relaxed">
                        Saya terbuka untuk berdiskusi tentang proyek, ide kreatif, dan peluang kolaborasi.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {[
                        { label: "GitHub", href: "https://github.com/Riskypr" },
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/risky-prasetyo-905423256/" },
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-3 text-sm transition-all hover:border-white hover:bg-white hover:text-black"
                        >
                            {social.label}
                            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    ))}
                </div>

                <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-neutral-800 pt-8 md:flex-row">
                    <p className="text-sm text-neutral-500">Copyright {year} Risky Prasetyo</p>
                </div>
            </div>
        </footer>
    );
}
