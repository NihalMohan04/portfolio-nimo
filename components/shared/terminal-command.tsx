"use client";

import { useEffect, useState } from "react";

type Props = {
  prompt?: string;
  command: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
};

export function TerminalCommand({
  prompt = "nimo@portfolio:~$",
  command,
  className,
  typingSpeed = 45,
  startDelay = 200,
}: Props) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = window.setTimeout(() => {
      let i = 0;
      const tick = window.setInterval(() => {
        if (cancelled) {
          window.clearInterval(tick);
          return;
        }
        i += 1;
        setTyped(command.slice(0, i));
        if (i >= command.length) {
          window.clearInterval(tick);
          setDone(true);
        }
      }, typingSpeed);
    }, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [command, typingSpeed, startDelay]);

  return (
    <div
      className={`flex items-center gap-2 font-mono text-sm sm:text-base ${className ?? ""}`}
    >
      <span className="text-primary">{prompt.split(":")[0]}</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-muted-foreground">$</span>
      <span className="text-foreground">{typed}</span>
      <span
        aria-hidden
        className={`ml-0.5 inline-block h-4 w-2 bg-primary align-middle ${
          done ? "animate-cursor" : ""
        }`}
      />
    </div>
  );
}
