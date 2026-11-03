"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";

type SlingAxis = "any" | "horizontal" | "vertical";

interface SlingButtonProps {
  onSend: () => void;
  size?: number;
  armAt?: number;
  maxPull?: number;
  axis?: SlingAxis;
  tapSends?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

interface PullPoint {
  x: number;
  y: number;
}

export default function SlingButton({
  onSend,
  size = 56,
  armAt = 16,
  maxPull = 44,
  axis = "any",
  tapSends = true,
  disabled = false,
  ariaLabel = "Send",
  className = "",
}: SlingButtonProps) {
  const [pull, setPull] = useState<PullPoint>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPoint = useRef<PullPoint>({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  const ignoreNextClick = useRef(false);
  const distance = Math.hypot(pull.x, pull.y);
  const charge = Math.min(distance / armAt, 1);
  const center = size / 2;
  const radius = size * 0.44;
  const circumference = 2 * Math.PI * radius;

  const constrainPull = (x: number, y: number) => {
    if (axis === "horizontal") y *= 0.18;
    if (axis === "vertical") x *= 0.18;

    const length = Math.hypot(x, y);
    if (length > maxPull) {
      const ratio = maxPull / length;
      x *= ratio;
      y *= ratio;
    }

    return { x, y };
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    startPoint.current = { x: event.clientX, y: event.clientY };
    hasDragged.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;
    const x = event.clientX - startPoint.current.x;
    const y = event.clientY - startPoint.current.y;
    if (Math.hypot(x, y) > 3) hasDragged.current = true;
    setPull(constrainPull(x, y));
  };

  const finishPull = () => {
    if (!isDragging) return;
    const isLoaded = Math.hypot(pull.x, pull.y) >= armAt;
    if (hasDragged.current) ignoreNextClick.current = true;
    if (isLoaded) onSend();
    setIsDragging(false);
    setPull({ x: 0, y: 0 });
  };

  const cancelPull = () => {
    ignoreNextClick.current = false;
    setIsDragging(false);
    setPull({ x: 0, y: 0 });
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPull}
      onPointerCancel={cancelPull}
      onClick={(event) => {
        if (ignoreNextClick.current) {
          ignoreNextClick.current = false;
          event.preventDefault();
          return;
        }
        if (tapSends) onSend();
      }}
      className={`relative grid shrink-0 place-items-center rounded-full touch-none select-none outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 overflow-visible"
      >
        <circle cx={center} cy={center} r={radius} fill="#27272a" />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f5f5f5"
          strokeWidth={2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - charge)}
          transform={`rotate(-90 ${center} ${center})`}
          className="transition-[stroke-dashoffset] duration-100"
        />
        <path
          d={`M ${center} ${center} L ${center + pull.x} ${center + pull.y}`}
          fill="none"
          stroke={charge >= 1 ? "#f5f5f5" : "#71717a"}
          strokeWidth={Math.max(1.5, size * 0.055)}
          strokeLinecap="round"
        />
      </svg>

      <motion.span
        animate={{ x: pull.x, y: pull.y, scale: isDragging && charge >= 1 ? 0.94 : 1 }}
        transition={
          isDragging
            ? { type: "tween", duration: 0 }
            : { type: "spring", stiffness: 520, damping: 23, mass: 0.55 }
        }
        className="absolute grid size-[72%] place-items-center rounded-full bg-[#f5f5f5] text-zinc-900 shadow-[0_2px_7px_rgba(0,0,0,0.22)]"
      >
        <ArrowUp aria-hidden="true" className="size-[42%]" strokeWidth={2.6} />
      </motion.span>
    </button>
  );
}
