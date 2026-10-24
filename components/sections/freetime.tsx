"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { freetime } from "@/lib/data/freetime";

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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function Freetime() {
  return (
    <section
      id="freetime"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeading
          label="freetime"
          index="05"
          description="what I practice off the clock"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {freetime.map((item) => (
            <motion.div key={item.title} variants={inView}>
              <Card className="h-full border-border/80 bg-card/40 transition-colors hover:border-primary/40 hover:bg-card/70">
                <CardContent className="flex h-full flex-col gap-3 pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-primary">
                      {"// "}
                      {item.title.toLowerCase()}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
