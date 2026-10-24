import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Nihal Mohan Shettigar",
  handle: "Nimo",
  initials: "NS",
  role: "Python Engineer",
  tagline:
    "Python engineer building AI-native backends and agent systems. I ship fast with AI coding tools, and keep it honest with strict types, tests, and code review.",
  location: "Chennai, India",
  email: "nihalmohan46@gmail.com",
  resumeUrl: "/resume/Nihal_Mohan_Shettigar_Resume.pdf",
  status: {
    label: "Open to interesting work",
    available: true,
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/NihalMohan04",
      handle: "@NihalMohan04",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/nihal-mohan-shettigar",
      handle: "in/nihal-mohan-shettigar",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/__findingnimo",
      handle: "@__findingnimo",
    },
    {
      label: "Email",
      href: "mailto:nihalmohan46@gmail.com",
      handle: "nihalmohan46@gmail.com",
    },
  ],
  about: [
    "I'm a Python engineer who builds backend services and AI agent systems — FastAPI, async Python, MongoDB, and LangGraph-based agents with structured LLM outputs.",
    "I split my time between async backends, multi-provider LLM gateways, and Next.js frontends. I care about typed code, test coverage, and shipping things that don't wake you up at night.",
    "Currently full-time at Cognizant in Chennai doing SAP data validation, originally from Mangalore, and before that a research intern at NIT Karnataka working on video captioning. BE in AI/ML from NMAM Institute of Technology.",
  ],
  currently: [
    "Programmer Analyst (full-time) @ Cognizant",
  ],
  facts: [
    { label: "based in", value: "Chennai, IN" },
    { label: "originally from", value: "Mangalore, IN" },
    { label: "timezone", value: "IST (UTC+5:30)" },
    { label: "education", value: "BE AI/ML · NMAMIT · 7.98" },
    { label: "coffee/day", value: "2-3 cups, black" },
    { label: "editor", value: "Neovim + Claude Code" },
    { label: "shell", value: "zsh, fish on weekends" },
  ],
};
