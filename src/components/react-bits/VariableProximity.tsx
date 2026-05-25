"use client";

import React, { useRef, useState, useEffect } from "react";

interface VariableProximityProps {
  text: string;
  className?: string;
}

export default function VariableProximity({ text, className = "" }: VariableProximityProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const words = text.split(" ");

  return (
    // Kita aktifkan font-sans bawaan Next.js/Tailwind modern yang mendukung variabel weight
    <p ref={containerRef} className={`flex flex-wrap justify-center font-sans ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex mx-[3px]">
          {word.split("").map((char, charIdx) => (
            <ProximityLetter
              key={charIdx}
              char={char}
              mousePos={mousePos}
            />
          ))}
        </span>
      ))}
    </p>
  );
}

interface ProximityLetterProps {
  char: string;
  mousePos: { x: number; y: number };
}

function ProximityLetter({ char, mousePos }: ProximityLetterProps) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const [weight, setWeight] = useState(400);

  useEffect(() => {
    if (!letterRef.current) return;

    const rect = letterRef.current.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - charX, 2) + Math.pow(mousePos.y - charY, 2)
    );

    // Radius interaksi (160px)
    const radius = 160; 

    if (distance < radius) {
      const proximityFactor = 1 - distance / radius;
      // Gunakan rumus easing kuadratik agar transisi menebalnya melengkung halus, tidak linear kaku
      const easeFactor = Math.pow(proximityFactor, 2); 
      
      // Rentang ketebalan dari 400 (Regular) ke 800 (Extra Bold)
      const calculatedWeight = 400 + easeFactor * 400;
      setWeight(calculatedWeight);
    } else {
      setWeight(400);
    }
  }, [mousePos]);

  return (
    <span
      ref={letterRef}
      className="select-none will-change-[font-variation-settings,font-weight]"
      style={{ 
        fontWeight: Math.round(weight),
        // Untuk browser modern yang membaca sumbu variabel font secara native
        fontVariationSettings: `"wght" ${weight}` 
      }}
    >
      {char}
    </span>
  );
}