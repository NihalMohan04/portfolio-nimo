"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable; theme just won't persist
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="inline-flex size-7 items-center justify-center rounded text-muted-foreground transition-colors hover:text-primary"
    >
      <Sun aria-hidden className="hidden size-3.5 dark:block" />
      <Moon aria-hidden className="size-3.5 dark:hidden" />
    </button>
  );
}
