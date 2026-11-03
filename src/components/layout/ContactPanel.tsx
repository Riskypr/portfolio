"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { OPEN_CONTACT_PANEL_EVENT } from "@/src/constants/contact";

const CONTACT_EMAIL = "";

export default function ContactPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [notice, setNotice] = useState("");
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const openPanel = () => {
            setNotice("");
            setIsOpen(true);
        };

        window.addEventListener(OPEN_CONTACT_PANEL_EVENT, openPanel);
        return () => window.removeEventListener(OPEN_CONTACT_PANEL_EVENT, openPanel);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        closeButtonRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const message = String(formData.get("message") ?? "");

        if (!CONTACT_EMAIL) {
            setNotice("Add a contact email address to enable message sending.");
            return;
        }

        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <AnimatePresence>
            {isOpen && [
                    <motion.button
                        key="contact-backdrop"
                        type="button"
                        aria-label="Close contact panel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[100] cursor-default bg-neutral-950/45 backdrop-blur-[3px]"
                    />,

                    <motion.aside
                        key="contact-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-panel-title"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 34, mass: 0.9 }}
                        className="fixed inset-y-0 right-0 z-[101] flex w-full flex-col bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.16)] sm:max-w-[min(820px,calc(100vw-2rem))] lg:w-1/3 lg:max-w-none"
                    >
                        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 md:px-12 md:py-12">
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close contact panel"
                                className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:right-8 sm:top-8"
                            >
                                <X className="size-5" />
                            </button>

                            <div className="max-w-3xl">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                                    Get in touch
                                </p>
                                <h2 id="contact-panel-title" className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                                    Let&apos;s talk.
                                </h2>
                                <p className="mt-3 text-sm text-neutral-500 sm:text-base">
                                    Fill out the form below and tell me what you have in mind.
                                </p>

                                <div className="mt-9 flex items-center gap-3">
                                    <img
                                        src="/me.png"
                                        alt=""
                                        className="size-14 rounded-full border border-neutral-200 object-cover"
                                    />
                                    <div>
                                        <p className="text-base font-semibold text-neutral-950">Risky Prasetyo</p>
                                        <a
                                            href="https://www.linkedin.com/in/risky-prasetyo-905423256/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-0.5 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-black"
                                        >
                                            Connect on LinkedIn <ArrowUpRight className="size-3.5" />
                                        </a>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-10 space-y-7">
                                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                                        <label className="block text-sm font-semibold text-neutral-900">
                                            Name
                                            <input
                                                name="name"
                                                autoComplete="name"
                                                required
                                                placeholder="Your name"
                                                className="mt-2.5 h-14 w-full rounded-xl border border-neutral-200 px-4 text-base font-normal text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                                            />
                                        </label>
                                        <label className="block text-sm font-semibold text-neutral-900">
                                            Email
                                            <input
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                placeholder="you@example.com"
                                                className="mt-2.5 h-14 w-full rounded-xl border border-neutral-200 px-4 text-base font-normal text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                                            />
                                        </label>
                                    </div>

                                    <label className="block text-sm font-semibold text-neutral-900">
                                        Send a message or describe your project
                                        <textarea
                                            name="message"
                                            required
                                            rows={7}
                                            placeholder="Tell me a little about what you are looking for..."
                                            className="mt-2.5 min-h-48 w-full resize-y rounded-xl border border-neutral-200 px-4 py-3 text-base font-normal text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                                        />
                                    </label>

                                    {notice && <p role="status" className="text-sm text-neutral-500">{notice}</p>}

                                    <button
                                        type="submit"
                                        className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.aside>
            ]}
        </AnimatePresence>
    );
}
