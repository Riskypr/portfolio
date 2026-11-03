"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SlingButton from "@/src/components/react-bits/SlingButton";

export default function BackToTopButton() {
    const [isNearBottom, setIsNearBottom] = useState(false);

    useEffect(() => {
        const updatePosition = () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            setIsNearBottom(scrollTop + clientHeight >= scrollHeight - 100);
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition, { passive: true });
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    return (
        <AnimatePresence>
            {isNearBottom && (
                <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.9 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-6 left-6 z-[55]"
                >
                    <SlingButton
                        ariaLabel="Kembali ke atas"
                        onSend={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        size={52}
                        armAt={14}
                        maxPull={42}
                        axis="any"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
