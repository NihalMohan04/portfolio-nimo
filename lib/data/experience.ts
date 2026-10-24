import type { Experience } from "@/lib/types";

export const experience: Experience[] = [
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
