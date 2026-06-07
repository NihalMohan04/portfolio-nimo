import type { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Backend",
    items: [
      "FastAPI",
      "Async Python",
      "Pydantic v2",
      "REST APIs",
      "JWT Auth",
      "Beanie ODM",
    ],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "TanStack Query", "Zustand"],
  },
  {
    category: "AI & Agents",
    items: [
      "LangGraph",
      "OpenAI API",
      "Anthropic API",
      "AWS Bedrock",
      "Structured LLM Pipelines",
    ],
  },
  {
    category: "Data",
    items: ["MongoDB", "Motor"],
  },
  {
    category: "Infrastructure",
    items: [
      "Docker",
      "Docker Compose",
      "AWS (EC2, S3, IAM)",
      "CI/CD",
      "Multi-stage Builds",
    ],
  },
  {
    category: "Dev Tools",
    items: ["Git", "Claude Code", "Codex", "pytest", "Ruff", "Mypy", "Pre-commit"],
  },
  {
    category: "Enterprise",
    items: ["SAP ECC", "SAP S/4HANA", "VBS", "Excel Automation"],
  },
];
