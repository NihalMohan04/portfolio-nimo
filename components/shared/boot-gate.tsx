"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BootSequence } from "@/components/shared/boot-sequence";

type BootGateProps = {
  children: ReactNode;
  revealDelayMs?: number;
  revealDurationMs?: number;
};

function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function BootGate({
  children,
  revealDelayMs = 200,
  revealDurationMs = 600,
}: BootGateProps) {
  const [bootDone, setBootDone] = useState<boolean>(detectReducedMotion);
  const [shouldReveal, setShouldReveal] = useState<boolean>(detectReducedMotion);

  useEffect(() => {
    if (bootDone) return;
    const t = setTimeout(() => setShouldReveal(true), revealDelayMs);
    return () => clearTimeout(t);
  }, [bootDone, revealDelayMs]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      {bootDone ? null : <BootSequence onDone={() => setBootDone(true)} />}
      <div
        data-revealed={bootDone && shouldReveal}
        style={{
          opacity: bootDone && shouldReveal ? 1 : 0,
          transform:
            bootDone && shouldReveal ? "translateY(0)" : "translateY(12px)",
          transition: `opacity ${revealDurationMs}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${revealDurationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {children}
      </div>
    </>
  );
}


