"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type TypeOnViewProps = {
  text: string;
  className?: string;
  charDelayMs?: number;
  startDelayMs?: number;
  as?: "span" | "h2" | "h3";
};

export function TypeOnView({
  text,
  className,
  charDelayMs = 70,
  startDelayMs = 0,
  as = "span",
}: TypeOnViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [shownCount, setShownCount] = useState<number>(
    prefersReducedMotion ? text.length : 0,
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i <= text.length; i++) {
      timers.push(
        setTimeout(() => {
          setShownCount(i);
        }, startDelayMs + i * charDelayMs),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, text, charDelayMs, startDelayMs]);

  const Tag = motion[as] as React.ComponentType<{
    ref?: React.Ref<HTMLElement>;
    className?: string;
    "aria-label"?: string;
    children?: React.ReactNode;
  }>;

  return (
    <Tag
      ref={containerRef}
      className={className}
      aria-label={text}
    >
      <span aria-hidden>{text.slice(0, shownCount)}</span>
      {!prefersReducedMotion && shownCount < text.length && (
        <span
          aria-hidden
          className="animate-cursor ml-0.5 inline-block h-3 w-1.5 -translate-y-0.5 bg-primary align-middle"
        />
      )}
    </Tag>
  );
}
