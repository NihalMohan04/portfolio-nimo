import type { NavItem } from "@/lib/types";

export const site = {
  url: "https://portfolio.nimosh.me",
  title: "Nimo — Python · AI · Backend",
  description:
    "Portfolio of Nihal Mohan Shettigar — Python and TypeScript developer building full-stack AI applications, agents, and backends. Open to Full Stack Engineer roles.",
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
