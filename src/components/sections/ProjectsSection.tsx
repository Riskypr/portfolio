"use client";

import React from "react";
import ScrollReveal from "@/src/components/react-bits/ScrollReveal";
import FolderShowcase from "@/src/components/react-bits/FolderShowcase";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  images: string[];
  liveUrl: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-28 max-w-5xl mx-auto px-6 text-center scroll-mt-10">
      <ScrollReveal duration={0.8} yOffset={30} enableBlur={true}>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight uppercase">Katalog Proyek</h2>
          <div className="w-12 h-[2px] bg-black mt-3" />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ScrollReveal
            key={index}
            delay={index * 0.12} 
            duration={0.9}
            yOffset={50}
            scale={0.97}        
            enableBlur={true}
            threshold={0.1}     
          >
            <FolderShowcase project={project} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2} duration={0.7} yOffset={20}>
        <div className="flex justify-center mt-12">
          <a
            href="/projects"
            className="relative inline-flex items-center gap-2 text-black text-md font-medium capitalize transition-all duration-300 group after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
          >
            <span>View All My Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}