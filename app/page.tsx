// src/app/page.tsx
"use client";

import React, { useState } from "react";
import DockNav from "@/src/components/react-bits/DockNav";
import SplitText from "@/src/components/react-bits/SplitText";
import RotatingText from "@/src/components/react-bits/RotatingText";
import LogoLoop from "@/src/components/react-bits/LogoLoop";
import FolderShowcase from "@/src/components/react-bits/FolderShowcase";
import BounceCards from "@/src/components/react-bits/BounceCards";
import BlobCursor from "@/src/components/react-bits/BlobCursor";
import VariableProximity from "@/src/components/react-bits/VariableProximity";
import ScrollReveal from "@/src/components/react-bits/ScrollReveal";
import ClickSpark from "@/src/components/react-bits/ClickSpark";

import { FaReact, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiBootstrap, SiPhp, SiJavascript, SiPython, SiFigma } from "react-icons/si";
import { Briefcase, GraduationCap, Home as HomeIcon, Folder as FolderIcon, User, ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, Compass } from "lucide-react";

export default function Home() {
  // State untuk toggle hide/show riwayat pengalaman kerja
  const [showHistory, setShowHistory] = useState(false);

  // Menu Item untuk Navigasi Dock Atas
  const navItems = [
    { icon: <HomeIcon className="w-3.5 h-3.5" />, label: "Home", href: "#home" },
    { icon: <FolderIcon className="w-3.5 h-3.5" />, label: "Projects", href: "#projects" },
    { icon: <User className="w-3.5 h-3.5" />, label: "About", href: "#about" },
  ];

  const techIcons = [
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

  const projects = [
    {
      title: "JobTrackr",
      category: "Web Application / AI Dashboard",
      desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
      tech: ["Next.js"],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
      ],
      liveUrl: "https://jobtrackr-dusky.vercel.app/"
    },
    {
      title: "PdfCraft",
      category: "Web Application / AI Dashboard",
      desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
      tech: ["Next.js"],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
      ],
      liveUrl: "https://jobtrackr.example.com"
    },
    {
      title: "JobTrackr",
      category: "Web Application / AI Dashboard",
      desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
      tech: ["Next.js"],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
      ],
      liveUrl: "https://jobtrackr.example.com"
    },
    {
      title: "JobTrackr",
      category: "Web Application / AI Dashboard",
      desc: "Dashboard cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pelamar melacak, mengelola, dan mengoptimalkan status pengiriman lamaran pekerjaan mereka secara efisien.",
      tech: ["Next.js"],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
      ],
      liveUrl: "https://jobtrackr.example.com"
    },
  ];

  const showcaseImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <main className="min-h-screen bg-[#ffffff] px-1 md:px-20 text-neutral-800 font-sans selection:bg-black selection:text-white relative">
      <ClickSpark
        sparkColor="#000000" // Hitam agar sesuai tema minimalis Anda
        sparkCount={10}
        sparkSize={5}
        duration={500}
      />
      <DockNav items={navItems} />

      {/* ========================================================
          1. HERO SECTION
         ======================================================== */}
      <section id="home" className="relative min-h-screen flex flex-col justify-between px-6 lg:px-16 overflow-hidden border-b border-neutral-100/80">
        <BlobCursor />
        <div
          className="absolute inset-0 z-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(#000000 1px, transparent 2px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-32 pb-12 flex-grow">
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-4">{"selamat datang"}</p>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] overflow-hidden">
              <span className="flex flex-wrap items-center gap-x-2 md:gap-x-4">
                <span>
                  <RotatingText
                    texts={[
                      "Halo, Semuanya!",
                      "Hello, Everyone!",
                      "皆さん, こんにちは!"
                    ]}
                  />
                </span>
              </span>
              <span className="text-black block text-2xl md:text-[50px] font-bold -mt-4">
                <SplitText text="Saya Risky Prasetyo" className="block text-black" />
              </span>
            </h1>

            <p className="text-neutral-600 text-xs md:text-sm max-w-lg leading-relaxed">
              Lulusan Informatika yang berdedikasi membangun antarmuka web modern berperforma tinggi. Menyatukan estetika minimalis dengan fungsionalitas kode yang bersih.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="#about"
                className="group flex items-center gap-2 bg-black hover:bg-neutral-800 text-white text-[10px] md:text-sm font-mono font-bold capitalize tracking-widest py-3.5 px-6 rounded-full transition-all duration-300 shadow-sm"
              >
                <span>Tentang Saya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="flex items-center gap-1.5 border border-neutral-200 text-neutral-500 hover:text-black hover:bg-neutral-50 text-xs font-mono font-bold capitalize tracking-widest py-3.5 px-6 rounded-full transition-all duration-300"
              >
                Lihat Proyek
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center lg:justify-end">
            <BounceCards images={showcaseImages} />
          </div>
        </div>

        <div className="relative z-20 max-w-6xl w-full mx-auto border-t border-neutral-100 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-black font-mono whitespace-nowrap">
              Tech Stack Saya
            </span>
            <div className="hidden sm:block w-[1px] h-4 bg-neutral-200" />
          </div>

          <div className="w-full overflow-hidden">
            <LogoLoop items={techIcons} speed={30} />
          </div>
        </div>
      </section>
// src/app/page.tsx (Potongan kode pada Katalog Proyek)

      {/* ========================================================
    2. PROJECTS SECTION (FOLDER SHOWCASE) + REACTBITS SCROLL REVEAL
   ======================================================== */}
      <section id="projects" className="py-28 max-w-5xl mx-auto px-6 text-center scroll-mt-10">

        {/* Animasi Masuk Judul Seksi */}
        <ScrollReveal duration={0.8} yOffset={30} enableBlur={true}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight uppercase font-mono">Katalog Proyek</h2>
            <div className="w-12 h-[2px] bg-black mt-3 mb-2" />
            <p className="text-neutral-400 text-xs font-mono">Klik folder di bawah untuk mengeksplorasi spesifikasi berkas proyek</p>
          </div>
        </ScrollReveal>

        {/* Container Grid Proyek dengan Efek Staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.12} // Delta waktu antar komponen memunculkan efek susun mengalir
              duration={0.9}
              yOffset={50}
              scale={0.97}        // Menambahkan sedikit efek ekspansi skala saat muncul dari bawah
              enableBlur={true}
              threshold={0.1}     // Sensitivitas deteksi viewport (10% bagian card masuk, animasi langsung jalan)
            >
              <FolderShowcase project={project} />
            </ScrollReveal>
          ))}
        </div>

        {/* Animasi Masuk Tombol View All */}
        <ScrollReveal delay={0.2} duration={0.7} yOffset={20}>
          <div className="flex justify-center mt-12">
            <a
              href="/projects"
              className="relative inline-flex items-center gap-2 text-black text-md font-mono font-medium capitalize transition-all duration-300 group after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              <span>View All My Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Word from the page */}
      <section className="py-8">
        <div className="border-t pt-8 border-neutral-100 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4 block">
            Words from the Pages
          </span>
          <VariableProximity
            text="“I am not afraid of storms, for I am learning how to sail my ship.”"
            className="text-lg md:text-3xl text-black text-center leading-relaxed tracking-wide cursor-pointer font-serif italic transition-all duration-150"
          />
          <p className="text-[11px] font-mono text-neutral-400 mt-3">
            — Louisa May Alcott, Little Women
          </p>
        </div>
      </section>

      {/* ========================================================
          4. ABOUT ME SECTION (RESTRUCTURED)
         ======================================================== */}
      <section id="about" className="py-28 max-w-5xl mx-auto px-6 border-t border-neutral-100 scroll-mt-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* ─── PROFIL SISI KIRI ─── */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Wrapper Gambar Kontainer Utama */}
            <div className="relative w-full h-84 aspect-[4/5] max-w-[320px] mb-6 group overflow-hidden rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <img
                src="/aboutMe.jpg"
                alt="Risky Prasetyo"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Tautan Sosial Media Absolut Melayang di Atas Gambar */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-black hover:text-white transition-all duration-300 border border-white/20 shadow-sm"
                  title="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-black hover:text-white transition-all duration-300 border border-white/20 shadow-sm"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-black hover:text-white transition-all duration-300 border border-white/20 shadow-sm"
                  title="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Nama & Role */}
            <h3 className="text-xl font-bold text-black font-mono tracking-tight uppercase">Risky Prasetyo</h3>
            <p className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-widest mt-1 mb-8">Front End Developer</p>

            {/* Tombol Interaktif Accordion Pengalaman */}
            <div className="w-full max-w-[320px] border-t border-b border-neutral-100 py-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-black hover:text-neutral-500 transition-colors py-1"
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  History Pengalaman
                </span>
                {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Konten Hide & Show Dropdown */}
              {showHistory && (
                <div className="mt-4 pt-2 space-y-5 border-t border-neutral-50/60 text-left">
                  <div className="animate-fadeIn">
                    <span className="text-[10px] text-neutral-400 font-mono block">Februari 2025 - Juli 2025</span>
                    <h4 className="text-xs font-bold text-black mt-0.5">Magang Frontend Developer</h4>
                    <h5 className="text-[11px] text-neutral-400 font-medium">PT Solusi Teknologi Digital</h5>
                    <p className="text-neutral-600 text-[11px] mt-1.5 leading-relaxed">
                      Melakukan optimasi performa dashboard admin serta implementasi arsitektur komponen modular berbasis Next.js.
                    </p>
                  </div>
                  {/* Anda bisa menambahkan item history pekerjaan lainnya di bawah sini */}
                </div>
              )}
            </div>
          </div>

          {/* ─── INFORMASI SISI KANAN (TIDAK MENGGUNAKAN CARD) ─── */}
          <div className="md:col-span-7 space-y-12 pt-2">

            {/* Sub-Seksi 1: Pendidikan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-black font-mono">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <h4 className="text-xs uppercase tracking-widest font-bold">Latar Belakang Akademis</h4>
              </div>
              <div className="pl-6 border-l border-neutral-100 space-y-2">
                <h5 className="text-base font-bold text-black tracking-tight">S1 — Teknik Informatika (S.T.)</h5>
                <p className="text-xs font-mono text-neutral-500">Universitas Ahmad Dahlan · Lulus Tahun 2026</p>
                <p className="text-neutral-600 text-xs md:text-sm leading-relaxed pt-1">
                  Berfokus pada rekayasa perangkat lunak dan komputasi cerdas. Menyelesaikan tugas akhir skripsi tepat waktu dengan konsentrasi pengembangan antarmuka web modern, interaktivitas visual, serta optimasi performa *client-side*.
                </p>
              </div>
            </div>

            {/* Sub-Seksi 2: Kegiatan & Organisasi */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-black font-mono">
                <Compass className="w-4 h-4 shrink-0" />
                <h4 className="text-xs uppercase tracking-widest font-bold">Kegiatan & Eksplorasi Kampus</h4>
              </div>
              <div className="pl-6 border-l border-neutral-100 space-y-6">

                {/* Aktivitas 1 */}
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-mono block">Maret 2026 — April 2026</span>
                  <h5 className="text-xs font-bold text-black uppercase tracking-tight">Sertifikasi Kompetensi AI Generatif</h5>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    Mengikuti pelatihan fundamental teknologi AI generatif di Dicoding, mencakup pemahaman mendalam tentang text generation, image manipulation, dan pemrosesan audio (*speech framework*).
                  </p>
                </div>

                {/* Aktivitas 2 */}
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-mono block">Mei 2026</span>
                  <h5 className="text-xs font-bold text-black uppercase tracking-tight">Mini Bootcamp Field Collection</h5>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    Terlibat aktif dalam program pengenalan operasional lapangan (*field collection dynamics*) untuk memperluas pemahaman interpersonal, manajemen risiko kerja, dan alur bisnis operasional.
                  </p>
                </div>

                {/* Aktivitas 3 */}
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-mono block">2023 — 2025</span>
                  <h5 className="text-xs font-bold text-black uppercase tracking-tight">Eksplorasi Proyek Open-Source & Badminton Club</h5>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    Aktif mengembangkan berbagai proyek antarmuka web mandiri berbasis Tailwind CSS, serta aktif menjaga keseimbangan kebugaran fisik melalui kegiatan unit olahraga bulutangkis internal kampus.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. MASONRY GALLERY SECTION
         ======================================================== */}
      <section className="py-20 max-w-5xl mx-auto px-6 border-t border-neutral-100">
        {/* <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight uppercase font-mono">Visual Showcase</h2>
          <div className="w-12 h-[2px] bg-black mt-3 mb-2 mx-auto" />
          <p className="text-neutral-400 text-xs font-mono">Dokumentasi aktivitas, sertifikasi, dan eksplorasi desain</p>
        </div> */}

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance] box-border before:box-border after:box-border">
          <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/60">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
              alt="Showcase 1"
              className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
              <p className="text-white font-mono text-[11px] tracking-wider uppercase">Workspace & Setup</p>
            </div>
          </div>

          <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/60">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600"
              alt="Showcase 2"
              className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
              <p className="text-white font-mono text-[11px] tracking-wider uppercase">Code Exploration</p>
            </div>
          </div>

          <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/60">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600"
              alt="Showcase 3"
              className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
              <p className="text-white font-mono text-[11px] tracking-wider uppercase">UI/UX Concept</p>
            </div>
          </div>

          <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/60">
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600"
              alt="Showcase 4"
              className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
              <p className="text-white font-mono text-[11px] tracking-wider uppercase">Collaboration</p>
            </div>
          </div>

          <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/60">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600"
              alt="Showcase 5"
              className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
              <p className="text-white font-mono text-[11px] tracking-wider uppercase">Web Optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FOOTER
         ======================================================== */}
      <footer className="py-16 border-t border-neutral-100 text-center text-[11px] font-mono text-neutral-400 tracking-widest">
        © {new Date().getFullYear()} RISKY PRASETYO. ALL RIGHTS RESERVED.
      </footer>
    </main >
  );
}