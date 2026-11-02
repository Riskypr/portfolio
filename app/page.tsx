"use client";

import ClickSpark from "@/src/components/react-bits/ClickSpark";
import DockNav from "@/src/components/react-bits/DockNav";

import HeroSection from "@/src/components/sections/HeroSection";
import ProjectsSection from "@/src/components/sections/ProjectsSection";
import AboutSection from "@/src/components/sections/AboutSection";
import GallerySection from "@/src/components/sections/GallerySection";

import QuoteSection from "@/src/components/layout/QuoteSection";
import Footer from "@/src/components/layout/Footer";
import MusicPlayer from "@/src/components/layout/MusicPlayer";

import { NAV_ITEMS } from "@/src/constants/navigation";
import { PROJECTS_DATA } from "@/src/constants/projects";
import { SHOWCASE_IMAGES } from "@/src/constants/showcase";
import { GALLERY_ITEMS } from "@/src/constants/gallery";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-white  text-neutral-800 font-sans selection:bg-black selection:text-white">
            <ClickSpark
                sparkColor="#000"
                sparkCount={10}
                sparkSize={5}
                duration={500}
            />

            <DockNav items={NAV_ITEMS} />

            <HeroSection
                showcaseImages={SHOWCASE_IMAGES}
            />

            <ProjectsSection projects={PROJECTS_DATA} />

            {/* <QuoteSection /> */}

            <AboutSection />

            <GallerySection items={GALLERY_ITEMS} />

            <Footer />

            <MusicPlayer />
        </main>
    );
}
