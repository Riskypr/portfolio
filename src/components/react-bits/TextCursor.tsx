"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TextCursorProps {
  text: string;
  spacing?: number;
  maxPoints?: number;
  exitDuration?: number;
  removalInterval?: number;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  angle: number;
  randomX: number;
  randomY: number;
  randomRotate: number;
}

export default function TextCursor({
  text,
  spacing = 90,
  maxPoints = 5,
  exitDuration = 0.45,
  removalInterval = 35,
}: TextCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);
  const lastMoveTime = useRef(Date.now());
  const [trail, setTrail] = useState<TrailItem[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const bounds = container.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) return;

      lastMoveTime.current = Date.now();
      setTrail((previous) => {
        const next = [...previous];
        const addPoint = (pointX: number, pointY: number, angle: number) =>
          next.push({
            id: idCounter.current++,
            x: pointX,
            y: pointY,
            angle,
            randomX: Math.random() * 10 - 5,
            randomY: Math.random() * 10 - 5,
            randomRotate: Math.random() * 10 - 5,
          });

        const last = next.at(-1);
        if (!last) {
          addPoint(x, y, 0);
        } else {
          const dx = x - last.x;
          const dy = y - last.y;
          const distance = Math.hypot(dx, dy);
          if (distance >= spacing) {
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            const steps = Math.floor(distance / spacing);
            for (let step = 1; step <= steps; step += 1) {
              const progress = (spacing * step) / distance;
              addPoint(last.x + dx * progress, last.y + dy * progress, angle);
            }
          } else {
            return previous;
          }
        }

        return next.slice(-maxPoints);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxPoints, spacing]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() - lastMoveTime.current > 100) {
        setTrail((previous) => (previous.length ? previous.slice(1) : previous));
      }
    }, removalInterval);

    return () => window.clearInterval(interval);
  }, [removalInterval]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      <AnimatePresence>
        {trail.map((item) => (
          <motion.span
            key={item.id}
            initial={{ opacity: 0, scale: 0.65, rotate: item.angle }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, item.randomX, 0],
              y: [0, item.randomY, 0],
              rotate: [item.angle, item.angle + item.randomRotate, item.angle],
            }}
            exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
            transition={{
              opacity: { duration: exitDuration, ease: "easeOut" },
              scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
              y: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
              rotate: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            }}
            className="absolute select-none whitespace-nowrap text-2xl font-semibold tracking-tight text-neutral-500/80 md:text-3xl"
            style={{ left: item.x, top: item.y }}
          >
            {text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
