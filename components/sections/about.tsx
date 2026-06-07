"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { profile } from "@/lib/data/profile";

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

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeading
          label="about"
          index="01"
          description="who is this guy"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14"
        >
          <motion.div
            variants={inView}
            className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </motion.div>

          <div className="space-y-8">
            <motion.div variants={inView}>
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                {"// currently"}
              </div>
              <Card className="border-border/80 bg-card/60">
                <CardContent className="pt-6">
                  <ul className="space-y-2.5 font-mono text-sm text-foreground/90">
                    {profile.currently.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-primary">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={inView}>
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                {"// system info"}
              </div>
              <dl className="divide-y divide-border/60 border-y border-border/60 font-mono text-sm">
                {profile.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <dt className="text-muted-foreground">{fact.label}</dt>
                    <dd className="text-right text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
