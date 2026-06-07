import type { Experience } from "@/lib/types";

export const experience: Experience[] = [
  {
    company: "LatSpace",
    role: "Founding Engineer (Part-time)",
    location: "Remote",
    period: "Nov 2025 – Present",
    current: true,
    workMode: "part-time",
    highlights: [
      "Architected core backend services for an AI-native ESG compliance platform using FastAPI, async Python, and MongoDB with Beanie ODM (CBAM and CCTS regulatory workflows).",
      "Designed LangGraph-based AI agent systems with modular node architecture and Pydantic v2-validated structured LLM outputs.",
      "Built Bifrost — a multi-provider LLM gateway abstracting OpenAI, Anthropic, and AWS Bedrock for unified model routing.",
      "Developed the Next.js 16 frontend with React 19 Server/Client Components, TanStack Query v5, and Zustand, strict TypeScript end-to-end.",
      "Set up Docker Compose across 5 microservices, multi-stage Dockerfiles, and AWS infra (EC2, S3, IAM) with multi-AZ failover and SOC 2 compliance.",
      "Enforced quality gates: 66% test coverage in CI, Ruff, Mypy strict, pre-commit hooks.",
    ],
    stack: [
      "FastAPI",
      "LangGraph",
      "MongoDB",
      "Beanie",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Docker",
      "AWS",
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Programmer Analyst",
    location: "Chennai, India",
    period: "Jun 2025 – Present",
    current: true,
    workMode: "full-time",
    highlights: [
      "Performed data validation for SAP ECC → S/4HANA conversion, ensuring data integrity across enterprise migration workflows.",
      "Built VBS-based automation tooling and Excel-driven reporting pipelines, cutting manual effort in data processing workflows.",
      "Gained exposure to enterprise-scale systems, structured process workflows, and operational reliability in large organizations.",
    ],
    stack: ["SAP ECC", "SAP S/4HANA", "VBS", "Excel Automation"],
  },
  {
    company: "National Institute of Technology Karnataka",
    role: "Research Intern",
    location: "Surathkal, Mangalore",
    period: "Jan 2025 – May 2025",
    current: false,
    highlights: [
      "Developed a video captioning model integrating SOTA computer vision and seq2seq methods for efficient caption generation.",
      "Implemented an end-to-end training pipeline — frame extraction, feature encoding, attention-based decoding — contributing to ongoing multimodal AI research.",
    ],
    stack: ["PyTorch", "Computer Vision", "Seq2Seq", "Attention"],
  },
];
