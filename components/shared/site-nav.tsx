"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/data/site";
import { profile } from "@/lib/data/profile";
import { buttonVariants } from "@/components/ui/button";

const SECTION_IDS = ["about", "experience", "stack", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = SECTION_IDS.map((id) => ({
      id,
      el: document.getElementById(id),
    })).filter((entry): entry is { id: SectionId; el: HTMLElement } =>
      Boolean(entry.el),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio ||
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "oklch(0.1 0 0 / 0.75)"
            : "oklch(0.1 0 0 / 0)",
          borderColor: scrolled
            ? "oklch(1 0 0 / 8%)"
            : "oklch(1 0 0 / 0%)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b backdrop-blur",
          scrolled ? "supports-[backdrop-filter]:bg-background/60" : "",
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-6">
          <Link
            href="#top"
            className="group inline-flex items-center gap-1.5 font-mono text-sm"
          >
            <span className="text-muted-foreground">~/</span>
            <span className="text-glow font-semibold text-primary transition-opacity group-hover:opacity-90">
              {profile.handle.toLowerCase()}
            </span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-3.5 w-1.5 bg-primary align-middle animate-cursor"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="flex items-center gap-1 sm:gap-2"
          >
            {site.nav.map((item) => {
              const id = item.href.replace("#", "") as SectionId;
              const isActive = active === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "hidden rounded px-2 py-1 font-mono text-xs transition-colors sm:inline-block",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="text-primary/60">.</span>
                  {item.label.toLowerCase()}
                </Link>
              );
            })}
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ size: "xs", variant: "default" }),
                "ml-1",
              )}
            >
              hire me
              <ArrowUpRight aria-hidden className="size-3" />
            </Link>
          </nav>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
