"use client";

import React from "react";
import ScrollReveal from "@/src/components/react-bits/ScrollReveal";
import FolderShowcase from "@/src/components/react-bits/FolderShowcase";
import { ArrowUpRight } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  title?: string;
  showTitle?: boolean;
  showViewAll?: boolean;
}


interface Project {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  images: string[];
  liveUrl: string | null;
  repoUrl?: string;
}

export default function ProjectsSection({
  projects,
  title = "Katalog Proyek",
  showTitle = true,
  showViewAll = true,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-15 max-w-5xl mx-auto px-6 text-center scroll-mt-10">

      {showTitle && (
        <ScrollReveal duration={0.8} yOffset={30} enableBlur>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
              {title}
            </h2>
            <div className="w-12 h-[2px] bg-black mt-3" />
          </div>
        </ScrollReveal>
      )}

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

      {
        showViewAll && (
          <ScrollReveal delay={0.2} duration={0.7} yOffset={20}>
            <div className="flex justify-center mt-12">
              <a
                href="/projects"
                className="relative inline-flex items-center gap-2 text-md font-medium group"
              >
                <span>View All My Projects</span>

                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </ScrollReveal>
        )
      }
    </section>
  );
}
