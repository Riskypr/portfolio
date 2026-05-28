// app/page.tsx
"use client";

import React from "react";
import DockNav from "@/src/components/react-bits/DockNav";
import VariableProximity from "@/src/components/react-bits/VariableProximity";
import ClickSpark from "@/src/components/react-bits/ClickSpark";

import HeroSection from "@/src/components/sections/HeroSection";
import ProjectsSection from "@/src/components/sections/ProjectsSection";
import AboutSection from "@/src/components/sections/AboutSection";
import GallerySection from "@/src/components/sections/GallerySection";

// Icons
import { FaReact, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiBootstrap, SiPhp, SiJavascript, SiPython, SiFigma } from "react-icons/si";
import { Home as HomeIcon, Folder as FolderIcon, User, Mail } from "lucide-react";

const NAV_ITEMS = [
  { 
    isStatic: true, 
    icon: (
      <div className="flex items-center gap-2 pr-2 h-6">
        <img src="/aboutMe.jpg" alt="Risky Prasetyo" className="w-8 h-8 rounded-full object-cover border border-neutral-200 shrink-0" />
        <span className="text-xs font-semibold text-black hidden sm:inline-block tracking-tight">Risky Prasetyo</span>
      </div>
    ), 
    label: "Risky Prasetyo", 
    href: "#home" 
  },
  { icon: <HomeIcon className="w-3.5 h-3.5" />, label: "Home", href: "#home" },
  { icon: <FolderIcon className="w-3.5 h-3.5" />, label: "Projects", href: "#projects" },
  { icon: <User className="w-3.5 h-3.5" />, label: "About", href: "#about" },
  { icon: <Mail className="w-3.5 h-3.5" />, label: "Contact", href: "mailto:your-email@example.com" },
];

const TECH_ICONS = [
  { icon: <FaReact className="text-black" />, name: "React" },
  { icon: <SiNextdotjs className="text-black" />, name: "Next.js" },
  { icon: <SiTailwindcss className="text-black" />, name: "Tailwind" },
  { icon: <SiTypescript className="text-black" />, name: "TypeScript" },
  { icon: <SiPhp className="text-black" />, name: "PHP" },
  { icon: <SiBootstrap className="text-black" />, name: "Bootstrap" },
  { icon: <SiJavascript className="text-black" />, name: "JavaScript" },
  { icon: <SiPython className="text-black" />, name: "Python" },
  { icon: <SiFigma className="text-black" />, name: "Figma" },
];

const PROJECTS_DATA = [
  {
    title: "JobTrackr",
    category: "Web Application / AI Dashboard",
    desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
    tech: ["Next.js"],
    images: ["/Jobtrack.png", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"],
    liveUrl: "https://jobtrackr-dusky.vercel.app/"
  },
  {
    title: "PdfCraft",
    category: "Web Application / AI Dashboard",
    desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
    tech: ["Next.js"],
    images: ["/PdfCraft.png", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"],
    liveUrl: "https://jobtrackr.example.com"
  },
  {
    title: "Jabarin",
    category: "Web Application / AI Dashboard",
    desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
    tech: ["Next.js"],
    images: ["/Jabarin.png", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"],
    liveUrl: "https://jobtrackr.example.com"
  },
  {
    title: "StockHub",
    category: "Web Application / AI Dashboard",
    desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
    tech: ["Next.js"],
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"],
    liveUrl: "https://jobtrackr.example.com"
  },
];

const SHOWCASE_IMAGES = ["/Jobtrack.png", "/PdfCraft.png", "/Jabarin.png"];

const GALLERY_ITEMS = [
  { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600", tag: "Workspace & Setup" },
  { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600", tag: "Code Exploration" },
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600", tag: "UI/UX Concept" },
  { src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600", tag: "Collaboration" },
  { src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600", tag: "Web Optimization" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ffffff] px-1 md:px-20 text-neutral-800 font-sans selection:bg-black selection:text-white relative">
      <ClickSpark sparkColor="#000000" sparkCount={10} sparkSize={5} duration={500} />
      <DockNav items={NAV_ITEMS} />

      {/* Sections */}
      <HeroSection techIcons={TECH_ICONS} showcaseImages={SHOWCASE_IMAGES} />
      <ProjectsSection projects={PROJECTS_DATA} />

      {/* Quote Separator */}
      <section className="py-8">
        <div className="border-t pt-8 border-neutral-100 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4 block">Words from the Pages</span>
          <VariableProximity
            text="“I am not afraid of storms, for I am learning how to sail my ship.”"
            className="text-lg md:text-3xl text-black text-center leading-relaxed tracking-wide cursor-pointer font-serif italic transition-all duration-150"
          />
          <p className="text-[11px] text-neutral-400 mt-3">— Louisa May Alcott, Little Women</p>
        </div>
      </section>

      <AboutSection />
      <GallerySection items={GALLERY_ITEMS} />

      {/* Footer */}
      <footer className="py-16 border-t border-neutral-100 text-center text-[11px] text-neutral-400 tracking-widest">
        © {new Date().getFullYear()} RISKY PRASETYO. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}