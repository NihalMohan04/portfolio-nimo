"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { experience } from "@/lib/data/experience";
import type { Experience as ExperienceEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const inView = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

function TimelineNode({ current }: { current: boolean }) {
  return (
    <span
      aria-hidden
      className="absolute left-0 top-2 flex h-3.5 w-3.5 items-center justify-center"
    >
      {current ? (
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
      ) : null}
      <span
        className={cn(
          "relative inline-flex h-3.5 w-3.5 rounded-full border-2 bg-background",
          current ? "border-primary" : "border-muted-foreground/60",
        )}
      />
    </span>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <motion.li
      variants={inView}
      className="relative pl-8 sm:pl-10"
    >
      <TimelineNode current={entry.current} />

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          <span>{entry.role}</span>
          <span className="text-muted-foreground"> · </span>
          <span className="text-primary">{entry.company}</span>
        </h3>
        <span className="font-mono text-xs text-muted-foreground">
          {entry.period}
        </span>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        <span>{entry.location}</span>
        {entry.workMode ? (
          <>
            <span aria-hidden>·</span>
            <span className="rounded border border-border/60 bg-card/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary/90">
              {entry.workMode}
            </span>
          </>
        ) : null}
        {entry.current ? (
          <>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5 text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              currently
            </span>
          </>
        ) : null}
      </div>

      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
        {entry.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary/80" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {entry.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border/70 bg-card/40 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.li>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeading
          label="experience"
          index="02"
          description="where I've shipped"
        />

        <div className="relative mt-12">
          <span
            aria-hidden
            className="absolute left-[6.5px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-border sm:left-[7.5px]"
          />

          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-14"
          >
            {experience.map((entry) => (
              <ExperienceCard key={entry.company} entry={entry} />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
