"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";

import { CopyButton } from "@/components/shared/copy-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { profile } from "@/lib/data/profile";
import { buttonVariants } from "@/components/ui/button";

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
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export function Contact() {
  const externalSocials = profile.socials.filter((s) => s.label !== "Email");

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeading
          label="contact"
          index="04"
          description="let's build something"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 overflow-hidden rounded-xl border border-border/80 bg-card/40"
        >
          <div className="flex items-center gap-2 border-b border-border/80 bg-card/80 px-4 py-2.5 font-mono text-xs text-muted-foreground">
            <span className="text-primary">→</span>
            <span>start_conversation.sh</span>
            <span className="ml-auto inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              live
            </span>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <motion.div variants={inView}>
              <p className="font-mono text-xs text-muted-foreground">
                {"// the fastest way to reach me"}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex min-w-0 items-center gap-2 rounded-md border border-border bg-background/50 px-3 py-2 font-mono text-sm text-foreground transition-all hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
                >
                  <Mail
                    aria-hidden
                    className="size-3.5 shrink-0 text-primary"
                  />
                  <span className="truncate">{profile.email}</span>
                </a>
                <CopyButton value={profile.email} />
              </div>
            </motion.div>

            <motion.div
              variants={inView}
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span>or find me here</span>
              <span aria-hidden className="h-px flex-1 bg-border" />
            </motion.div>

            <motion.ul
              variants={inView}
              className="grid gap-3 sm:grid-cols-2"
            >
              {externalSocials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-md border border-border bg-background/50 px-4 py-3 transition-all hover:border-primary/60 hover:bg-primary/5"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {social.label}
                      </div>
                      <div className="mt-0.5 truncate text-sm text-foreground group-hover:text-primary">
                        {social.handle}
                      </div>
                    </div>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                  </Link>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={inView}
              className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <MapPin aria-hidden className="size-3.5 text-primary" />
                {profile.location} · IST (UTC+5:30)
              </div>
              <Link
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                <Download aria-hidden className="size-3.5" />
                resume.pdf
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center font-mono text-xs text-muted-foreground"
        >
          <span className="text-primary">{"// "}</span>
          thanks for scrolling — built with next.js, tailwind, framer motion
        </motion.p>
      </div>
    </section>
  );
}
