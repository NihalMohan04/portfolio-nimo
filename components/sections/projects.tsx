"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/lib/data/projects";

const inView = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeading
          label="projects"
          index="03"
          description="things I've built"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4"
        >
          {projects.map((project) => (
            <motion.div key={project.name} variants={inView}>
              <Card className="border-border/80 bg-card/40 transition-colors hover:border-primary/40 hover:bg-card/70">
                <CardContent className="flex flex-col gap-4 pt-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-mono text-sm text-primary">
                        {"// "}
                        {project.name.toLowerCase()}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {project.tagline}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">
                      {project.period}
                    </span>
                  </div>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.highlights.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span aria-hidden className="text-primary/60">
                          ›
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                      >
                        source
                        <ArrowUpRight aria-hidden className="size-3" />
                      </a>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
