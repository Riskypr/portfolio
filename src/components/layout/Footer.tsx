"use client";

import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { OPEN_CONTACT_PANEL_EVENT } from "@/src/constants/contact";

export default function Footer() {
    const year = new Date().getFullYear();

    const openContactPanel = () => {
        window.dispatchEvent(new Event(OPEN_CONTACT_PANEL_EVENT));
    };

    return (
        <footer id="contact" className="mt-32 overflow-hidden border-t border-neutral-800 bg-black text-white">
            <div className="mx-auto max-w-6xl px-6 pt-20 sm:pt-28">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-500">
                    Get in touch
                </p>
                <h2 className="mt-5 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
                    <span className="block">Let&apos;s build</span>
                    <span className="block text-neutral-500">something meaningful together.</span>
                </h2>

                <div className="mt-16 grid grid-cols-1 gap-10 border-b border-neutral-800 pb-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    <div>
                        <p className="text-sm font-medium text-neutral-500">Contact</p>
                        <button
                            type="button"
                            onClick={openContactPanel}
                            className="group mt-3 inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-neutral-300"
                        >
                            Send me a message
                            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-neutral-500">Explore</p>
                        <a
                            href="/projects"
                            className="group mt-3 inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-neutral-300"
                        >
                            View my projects
                            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-neutral-500">Social</p>
                        <div className="mt-3 flex items-center gap-2.5">
                            <a
                                href="https://github.com/Riskypr"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="flex size-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:-translate-y-1"
                            >
                                <FaGithub className="size-[18px]" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/risky-prasetyo-905423256/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex size-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:-translate-y-1"
                            >
                                <FaLinkedin className="size-[18px]" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-6 py-8 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm text-neutral-500">Menu</p>
                        <nav aria-label="Footer" className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                            <a href="/#home" className="transition-colors hover:text-neutral-400">Home</a>
                            <a href="/#projects" className="transition-colors hover:text-neutral-400">Projects</a>
                            <a href="/#about" className="transition-colors hover:text-neutral-400">About</a>
                        </nav>
                    </div>
                    <p className="text-sm text-neutral-500">Copyright {year} Risky Prasetyo</p>
                </div>

                <div aria-hidden="true" className="select-none overflow-hidden pb-6 pt-16 sm:pt-20">
                    <span className="block whitespace-nowrap text-center text-[clamp(2rem,10vw,12rem)] font-semibold leading-[0.2] tracking-[-0.04em] text-white">
                        RISKY PRASETYO
                    </span>
                </div>
            </div>
        </footer>
    );
}
