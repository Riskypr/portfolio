"use client";

import React from "react";
import RotatingText from "@/src/components/react-bits/RotatingText";
import SplitText from "@/src/components/react-bits/SplitText";
import BounceCards from "@/src/components/react-bits/BounceCards";
import BlobCursor from "@/src/components/react-bits/BlobCursor";
import LogoLoop from "@/src/components/react-bits/LogoLoop";
import { ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  techIcons: { icon: React.ReactNode; name: string }[];
  showcaseImages: string[];
}

export default function HeroSection({ techIcons, showcaseImages }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between px-6 lg:px-16 overflow-hidden border-b border-neutral-100/80">
      <BlobCursor />
      
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 2px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-32 pb-12 flex-grow">
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <p className="text-xs font-cal uppercase tracking-widest text-neutral-400 mb-4">Welcome</p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] overflow-hidden">
            <span className="flex flex-wrap items-center gap-x-2 md:gap-x-4">
              <RotatingText texts={["Halo, Semuanya!", "Hello, Everyone!", "皆さん, こんにちは!"]} />
            </span>
            <span className="text-black block text-2xl md:text-[50px] font-bold -mt-2">
              <SplitText text="I am Risky Prasetyo" className="block text-black" />
            </span>
          </h1>

          <p className="text-neutral-600 text-xs md:text-sm max-w-lg leading-relaxed">
            A computer science graduate dedicated to building modern, high-performance web interfaces. Combining minimalist aesthetics with clean, functional code.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <a
              href="#about"
              className="group flex items-center gap-2 bg-black hover:bg-neutral-800 text-white text-[10px] md:text-sm font-bold capitalize tracking-widest py-3.5 px-6 rounded-full transition-all duration-300 shadow-sm"
            >
              <span>About Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>

            <a
              href="#projects"
              className="flex items-center gap-1.5 border border-neutral-200 text-neutral-500 hover:text-black bg-neutral-50 text-[10px] md:text-sm font-cal-sans font-bold capitalize tracking-widest py-3.5 px-6 rounded-full transition-all duration-300"
            >
              View Project
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center items-center lg:justify-end">
          <BounceCards images={showcaseImages} />
        </div>
      </div>

      <div className="relative z-20 max-w-6xl w-full mx-auto border-t border-neutral-100 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold uppercase tracking-widest text-black whitespace-nowrap">
            My Tech Stack
          </span>
          <div className="hidden sm:block w-[1px] h-4 bg-neutral-200" />
        </div>
        <div className="w-full overflow-hidden">
          <LogoLoop items={techIcons} speed={30} />
        </div>
      </div>
    </section>
  );
}