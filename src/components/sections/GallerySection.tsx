"use client";

import React from "react";
import ScrollReveal from "@/src/components/react-bits/ScrollReveal";

interface GalleryItem {
  src: string;
  tag: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

function GalleryCard({ src, tag }: GalleryItem) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/60">
      <img
        src={src}
        alt={tag}
        className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
        <p className="text-white text-[11px] tracking-wider uppercase">{tag}</p>
      </div>
    </div>
  );
}

export default function GallerySection({ items }: GallerySectionProps) {
  return (
    <section className="py-20 max-w-5xl mx-auto px-6 border-t border-neutral-100">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance] box-border">
        {items.map((item, index) => (
          <ScrollReveal
            key={index}
            className="mb-4 break-inside-avoid"
            delay={index * 0.08}
            duration={0.7}
            yOffset={28}
            scale={0.98}
            enableBlur
            threshold={0.12}
          >
            <GalleryCard src={item.src} tag={item.tag} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
