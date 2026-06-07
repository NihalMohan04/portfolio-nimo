"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Props = {
  href: string;
  label?: string;
};

export function ScrollCue({ href, label = "scroll" }: Props) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
    >
      <span className="text-primary">→</span>
      <span>{label}</span>
      <ChevronDown
        aria-hidden
        className="h-3 w-3 transition-transform group-hover:translate-y-0.5"
      />
    </motion.a>
  );
}
