import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    name: "CallPilot",
    tagline: "AI voice assistant simulator",
    period: "Sep 2026",
    highlights: [
      "Full-stack simulator for small-business missed-call follow-up, with configurable cake-order and clinic-booking workflows, conversation history, and follow-up dashboards.",
      "Pluggable LLM providers with schema-validated outputs, plus external speech-to-text and text-to-speech for English, Hindi, and mixed-language conversations.",
      "Google Calendar booking, rescheduling, and cancellation with explicit confirmation, secured with OAuth, encrypted credential storage, and per-business access controls.",
    ],
    stack: ["TypeScript", "Next.js", "Fastify", "Supabase", "Zod"],
  },
  {
    name: "CA Portal",
    tagline: "Regulatory intelligence platform",
    period: "Oct 2026",
    highlights: [
      "Automated CBIC document and RSS ingestion with PDF storage, retries, and safe processing across concurrent workers.",
      "Gemini-powered structured extraction of regulatory summaries, key points, and statutes, feeding a searchable knowledge base with an editorial approval gate for AI-generated news.",
      "Statutory deadline engine with government extension overrides and calendar exports, plus income-tax, TDS, HRA, and EMI calculators covered by Vitest unit tests.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Gemini API"],
  },
  {
    name: "Sketchify",
    tagline: "Sketch to realistic face generator",
    period: "Oct 2024 · Final year project",
    highlights: [
      "Trained a GAN on CelebAMask-HQ to generate realistic faces from hand-drawn sketches, with a web interface for sketch input and model inference.",
    ],
    stack: ["Python", "GANs", "Deep Learning"],
  },
];
