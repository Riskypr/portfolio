// components/ExpandableText.tsx

"use client";

import { useMemo, useState } from "react";

interface ExpandableTextProps {
    text: string;
    maxWords?: number;
}

export default function ExpandableText({
    text,
    maxWords = 20,
}: ExpandableTextProps) {
    const [expanded, setExpanded] = useState(false);

    const words = useMemo(() => text.trim().split(/\s+/), [text]);
    const isLongText = words.length > maxWords;

    const previewText = useMemo(() => {
        if (!isLongText) return text;
        return `${words.slice(0, maxWords).join(" ")}...`;
    }, [text, words, maxWords, isLongText]);

    return (
        <div>
            <p className="text-neutral-600 text-xs leading-relaxed">
                {expanded ? text : previewText}
            </p>

            {isLongText && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="mt-2 text-xs font-medium text-black hover:text-neutral-600 transition-colors cursor-pointer"
                >
                    {expanded
                        ? "Tampilkan lebih sedikit"
                        : "Baca selengkapnya"}
                </button>
            )}
        </div>
    );
}