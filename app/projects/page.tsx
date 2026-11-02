import ClickSpark from "@/src/components/react-bits/ClickSpark";
import DockNav from "@/src/components/react-bits/DockNav";
import TextPressure from "@/src/components/react-bits/TextPressure";
import ProjectsSection from "@/src/components/sections/ProjectsSection";

import Footer from "@/src/components/layout/Footer";

import { NAV_ITEMS } from "@/src/constants/navigation";
import { getGithubProjects } from "@/src/lib/github-projects";

export const revalidate = 3600;

export default async function ProjectsPage() {
    const githubProjects = await getGithubProjects();

    return (
        <main className="relative min-h-screen bg-white text-neutral-800 font-sans selection:bg-black selection:text-white">
            <ClickSpark
                sparkColor="#000"
                sparkCount={10}
                sparkSize={5}
                duration={500}
            />

            <DockNav items={NAV_ITEMS} />

            <div className="pt-28">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex justify-center">
                        <div className="w-full max-w-5xl md:h-40">
                            <TextPressure
                                text="My Projects"
                                flex
                                alpha={false}
                                stroke={false}
                                width
                                weight
                                italic
                                textColor="#000000"
                                strokeColor="#5227FF"
                                minFontSize={36}
                            />
                        </div>
                    </div>
                    <p className="mt-4 text-center text-neutral-500 max-w-xl mx-auto">
                        Semua repository publik dari GitHub Riskypr, termasuk deskripsi,
                        teknologi, dan tautan demo bila tersedia.
                    </p>
                </div>
            </div>
            {githubProjects.length > 0 ? (
                <ProjectsSection projects={githubProjects} showTitle={false} showViewAll={false} />
            ) : (
                <p className="max-w-2xl mx-auto px-6 py-16 text-center text-neutral-500">
                    Daftar repository belum dapat dimuat. Silakan lihat langsung di{" "}
                    <a className="underline text-black" href="https://github.com/Riskypr" target="_blank" rel="noopener noreferrer">
                        GitHub Riskypr
                    </a>.
                </p>
            )}
            <Footer />
        </main>
    );
}
