"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { MagneticText } from "@/components/shared/magnetic-text";
import { ScrollCue } from "@/components/shared/scroll-cue";
import { StackMarquee } from "@/components/shared/stack-marquee";
import { StatusBadge } from "@/components/shared/status-badge";
import { TerminalCommand } from "@/components/shared/terminal-command";
import { profile } from "@/lib/data/profile";
import { skills } from "@/lib/data/skills";

const stackTicker = Array.from(
  new Set(skills.flatMap((group) => group.items)),
);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center pb-16 pt-28 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
        >
          <TerminalCommand command="whoami" />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0.25}
          className="mt-10 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          <span className="text-glow text-primary">
            <MagneticText text={profile.handle} />
          </span>
          <span className="text-muted-foreground"> / </span>
          <span className="text-pretty">{profile.name}</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0.4}
          className="mt-4 font-mono text-sm text-primary sm:text-base"
        >
          <span className="text-muted-foreground">role:</span> {profile.role}
          <span className="text-muted-foreground"> · </span>
          <span className="text-muted-foreground">loc:</span> {profile.location}
        </motion.p>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0.55}
          className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0.7}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <StatusBadge
            available={profile.status.available}
            label={profile.status.label}
          />
          <Link
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <FileText aria-hidden className="size-3.5" />
            View resume
          </Link>
          <Link href="#contact" className={buttonVariants({ size: "sm" })}>
            Get in touch
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={0.9}
        className="mt-16 sm:mt-20"
      >
        <StackMarquee items={stackTicker} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={1.1}
        className="mx-auto mt-12 w-full max-w-4xl px-6"
      >
        <ScrollCue href="#about" label="read more" />
      </motion.div>
    </section>
  );
}
