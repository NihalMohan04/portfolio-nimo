"use client";

import { useEffect, useRef } from "react";

type MagneticTextProps = {
  text: string;
  className?: string;
  radius?: number;
  strength?: number;
};

function detectEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return finePointer && !reducedMotion;
}

export function MagneticText({
  text,
  className,
  radius = 80,
  strength = 0.12,
}: MagneticTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const targetsRef = useRef<{ x: number; y: number }[]>([]);
  const cursorsRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    if (!detectEnabled()) return;
    const container = containerRef.current;
    if (!container) return;

    const letters = letterRefs.current.filter(Boolean);
    if (letters.length === 0) return;

    targetsRef.current = letters.map(() => ({ x: 0, y: 0 }));
    cursorsRef.current = letters.map(() => ({ x: 0, y: 0 }));

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const tick = () => {
      const { x: mx, y: my, active } = mouseRef.current;

      letters.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        let tx = 0;
        let ty = 0;
        if (active) {
          const dx = mx - cx;
          const dy = my - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const falloff = 1 - dist / radius;
            const power = falloff * falloff * strength * radius;
            tx = (dx / (dist || 1)) * power;
            ty = (dy / (dist || 1)) * power;
          }
        }
        targetsRef.current[i] = { x: tx, y: ty };

        const cur = cursorsRef.current[i];
        cur.x += (tx - cur.x) * 0.18;
        cur.y += (ty - cur.y) * 0.18;
        el.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [radius, strength]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          ref={(el) => {
            if (el) letterRefs.current[i] = el;
          }}
          className="inline-block will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
