"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { skills } from "@/lib/data/skills";

const inView = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function Skills() {
  return (
    <section
      id="stack"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeading
          label="stack"
          index="03"
          description="what I work with"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={inView}
              className="group/skill relative"
            >
              <Card className="h-full border-border/80 bg-card/40 transition-colors hover:border-primary/40 hover:bg-card/70">
                <CardContent className="flex h-full flex-col gap-4 pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-primary">
                      {"// "}
                      {group.category.toLowerCase()}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {group.items.length}{" "}
                      {group.items.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <span className="inline-block cursor-default rounded border border-border/70 bg-background/40 px-2 py-1 font-mono text-xs text-foreground/80 transition-all hover:border-primary/70 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_-2px_oklch(0.92_0.24_128/0.4)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
