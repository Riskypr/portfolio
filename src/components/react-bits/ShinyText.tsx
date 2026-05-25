// src/components/react-bits/ShinyText.tsx
"use client";

import { cn } from "@/src/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({ text, disabled = false, speed = 5, className }: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        "text-[#b5b5b5a4] bg-clip-text inline-block",
        !disabled && "animate-shiny-text bg-gradient-to-r from-transparent via-[#ffffff] to-transparent bg-[length:200%_100%]",
        className
      )}
      style={{ animationDuration }}
    >
      {text}
    </span>
  );
}