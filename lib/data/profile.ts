import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Nihal Mohan Shettigar",
  handle: "Nimo",
  initials: "NS",
  role: "Programmer Analyst @ Cognizant",
  tagline:
    "A passionate Python engineer willing to build AI-native platforms and enterprise automation. I architect LangGraph agents, async backends, and Next.js frontends — and I like my code typed end-to-end.",
  location: "Chennai, India",
  email: "nihalmohan46@gmail.com",
  resumeUrl: "/resume/Nihal_Mohan_Shettigar_Resume_Latest.pdf",
  status: {
    label: "Somehow stuck in SAP/Excel",
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
      label: "Email",
      href: "mailto:nihalmohan46@gmail.com",
      handle: "nihalmohan46@gmail.com",
    },
  ],
  about: [
    "I'm a self experienced Python engineer. I build backend services — FastAPI, async Python, MongoDB, and LangGraph-based agent systems with structured LLM outputs.",
    "I split my time between async backends, multi-provider LLM gateways, and Next.js frontends. I care about typed code, test coverage, and shipping things that don't wake you up at night.",
    "Currently full-time at Cognizant in Chennai doing SAP data validation, originally from Mangalore. BE in AI/ML from NMAM Institute of Technology.",
  ],
  currently: [
    "Focusing on shifting careers",
    "Programmer Analyst (full-time) @ Cognizant",
    "Learning Rust in small doses",
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
