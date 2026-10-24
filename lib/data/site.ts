import type { NavItem } from "@/lib/types";

export const site = {
  title: "Nimo — Python · AI · Backend",
  description:
    "Portfolio of Nihal Mohan Shettigar — Python engineer building AI-native platforms, LangGraph agents, and Next.js frontends.",
  author: "Nihal Mohan Shettigar",
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "Freetime", href: "#freetime" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
  ascii: {
    banner: "nimo@portfolio:~$",
  },
};
