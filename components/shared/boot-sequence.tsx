"use client";

import { useEffect, useState } from "react";

type Variant = "systemd" | "decrypt" | "progress";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?/|\\+=░▒▓█▀▄■□·";

const SYSTEMD_LINES: string[] = [
  "nimo kernel v1.0.0 on portfolio.os",
  "[  OK  ] mounting /home/nimo",
  "[  OK  ] loading stack: ts, react, next, framer",
  "[  OK  ] connecting to github.com",
  "[  OK  ] linking experience, skills, projects",
  "[  OK  ] cursor online",
  "[  OK  ] magnetic field stable",
  "ready. welcome.",
];

const DECRYPT_WORD = "NIMO";
const DECRYPT_DURATION_MS = 1500;
const DECRYPT_STAGGER_MS = 220;

const PROGRESS_DURATION_MS = 2000;
const PROGRESS_TICKS: string[] = [
  "mounting /home/nimo",
  "loading stack modules",
  "connecting to github.com",
  "linking experience, skills",
  "initializing cursor layer",
  "calibrating magnetic field",
  "ready.",
];

const SYSTEMD_STEP_MS = 220;
const SYSTEMD_FADE_OUT_START_AT = SYSTEMD_LINES.length * SYSTEMD_STEP_MS + 350;
const SYSTEMD_TOTAL_MS = SYSTEMD_FADE_OUT_START_AT + 400;
const DECRYPT_TOTAL_MS =
  (DECRYPT_WORD.length - 1) * DECRYPT_STAGGER_MS + DECRYPT_DURATION_MS + 350;
const PROGRESS_TOTAL_MS = PROGRESS_DURATION_MS + 350;

const TOTAL_MS = Math.max(SYSTEMD_TOTAL_MS, DECRYPT_TOTAL_MS, PROGRESS_TOTAL_MS);
const FADE_OUT_START_AT = TOTAL_MS - 400;

function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shouldShow(): boolean {
  if (typeof window === "undefined") return true;
  return !detectReducedMotion();
}

function getVariant(): Variant {
  if (typeof window === "undefined") return "progress";
  const param = new URLSearchParams(window.location.search).get("boot");
  if (param === "systemd") return "systemd";
  if (param === "decrypt") return "decrypt";
  return "progress";
}

export function BootSequence({ onDone }: { onDone?: () => void } = {}) {
  const [visible, setVisible] = useState<boolean>(shouldShow);
  const [fadingOut, setFadingOut] = useState(false);
  const [variant] = useState<Variant>(getVariant);
  const [shownCount, setShownCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;

    if (variant === "systemd") {
      const stepTimers: ReturnType<typeof setTimeout>[] = [];
      for (let i = 0; i < SYSTEMD_LINES.length; i++) {
        stepTimers.push(
          setTimeout(() => {
            setShownCount((c) => c + 1);
          }, i * SYSTEMD_STEP_MS + 80),
        );
      }
      const fadeTimer = setTimeout(() => {
        setFadingOut(true);
        onDone?.();
      }, SYSTEMD_FADE_OUT_START_AT);
      const hideTimer = setTimeout(() => setVisible(false), SYSTEMD_TOTAL_MS);
      return () => {
        stepTimers.forEach(clearTimeout);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }

    if (variant === "progress") {
      let raf = 0;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / PROGRESS_DURATION_MS);
        setProgress(t);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      const fadeTimer = setTimeout(() => {
        setFadingOut(true);
        onDone?.();
      }, FADE_OUT_START_AT);
      const hideTimer = setTimeout(() => setVisible(false), TOTAL_MS);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }

    // decrypt
    const allResolveAt =
      (DECRYPT_WORD.length - 1) * DECRYPT_STAGGER_MS + DECRYPT_DURATION_MS;
    const resolvedTimer = setTimeout(
      () => setShownCount(DECRYPT_WORD.length + 1),
      allResolveAt,
    );
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
      onDone?.();
    }, FADE_OUT_START_AT);
    const hideTimer = setTimeout(() => setVisible(false), TOTAL_MS);
    return () => {
      clearTimeout(resolvedTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [visible, variant, onDone]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading site"
      className="boot-overlay fixed inset-0 z-[200] flex items-center justify-center bg-background"
      data-fading={fadingOut}
    >
      {variant === "systemd" ? (
        <SystemdLog shownCount={shownCount} />
      ) : variant === "progress" ? (
        <ProgressBar progress={progress} />
      ) : (
        <DecryptText
          word={DECRYPT_WORD}
          durationMs={DECRYPT_DURATION_MS}
          staggerMs={DECRYPT_STAGGER_MS}
          resolved={shownCount > DECRYPT_WORD.length}
        />
      )}
    </div>
  );
}

function SystemdLog({ shownCount }: { shownCount: number }) {
  return (
    <pre className="m-0 max-w-[90vw] overflow-hidden whitespace-pre font-mono text-[11px] leading-[1.7] text-muted-foreground sm:text-xs">
      {SYSTEMD_LINES.slice(0, shownCount).map((line, i) => (
        <div
          key={i}
          className={line.startsWith("[") ? "boot-line boot-line--ok" : "boot-line"}
          aria-hidden
        >
          {line}
        </div>
      ))}
      {shownCount < SYSTEMD_LINES.length && (
        <span aria-hidden className="boot-cursor inline-block h-3 w-2 -translate-y-0.5 bg-primary align-middle" />
      )}
    </pre>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  const ticksToShow = Math.floor(progress * PROGRESS_TICKS.length);
  return (
    <div className="flex w-full max-w-md flex-col gap-4 px-6 font-mono">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>loading nimo.os</span>
        <span className="text-primary">{pct}%</span>
      </div>
      <div className="boot-bar h-1.5 border border-border bg-white/5">
        <div
          className="boot-bar-fill h-full origin-left bg-primary"
          style={{
            transform: `scaleX(${progress})`,
            boxShadow: "0 0 16px oklch(0.92 0.24 128 / 0.5)",
          }}
        />
      </div>
      <div className="flex flex-col gap-1 text-[11px] text-muted-foreground">
        {PROGRESS_TICKS.slice(0, ticksToShow).map((t, i) => (
          <div key={i} className="text-primary">
            [  OK  ] {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function DecryptText({
  word,
  durationMs,
  staggerMs,
  resolved,
}: {
  word: string;
  durationMs: number;
  staggerMs: number;
  resolved: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-7">
      <div
        className="font-mono text-5xl font-bold tracking-wider text-primary sm:text-7xl"
        aria-label={word}
      >
        {word.split("").map((ch, i) => (
          <DecryptLetter
            key={i}
            char={ch}
            startAt={i * staggerMs}
            durationMs={durationMs}
          />
        ))}
      </div>
      <div
        role="status"
        aria-live={resolved ? "off" : "polite"}
        className={resolved ? "boot-tag boot-tag--ok" : "boot-tag"}
      >
        {resolved ? "[ identity verified ] · welcome." : "[ resolving identity... ]"}
      </div>
    </div>
  );
}

function DecryptLetter({
  char,
  startAt,
  durationMs,
}: {
  char: string;
  startAt: number;
  durationMs: number;
}) {
  const [text, setText] = useState(char);
  const [state, setState] = useState<"glitching" | "resolved">("glitching");

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const t = now - start - startAt;
      if (t < 0) {
        setText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        raf = requestAnimationFrame(tick);
      } else if (t < durationMs) {
        if (Math.random() < 0.32) {
          setText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        } else {
          setText(char);
        }
        raf = requestAnimationFrame(tick);
      } else {
        setText(char);
        setState("resolved");
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [char, startAt, durationMs]);

  return (
    <span
      aria-hidden
      className={
        state === "glitching"
          ? "boot-letter boot-letter--glitch"
          : "boot-letter boot-letter--resolved"
      }
    >
      {text}
    </span>
  );
}
