"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  value: string;
  className?: string;
};

export function CopyButton({ value, className }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // swallow — copy is best-effort
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${value}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card/60 px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary",
        copied && "border-primary/60 bg-primary/10 text-primary",
        className,
      )}
    >
      {copied ? (
        <>
          <Check aria-hidden className="size-3" />
          copied
        </>
      ) : (
        <>
          <Copy aria-hidden className="size-3" />
          copy
        </>
      )}
    </button>
  );
}
