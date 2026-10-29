import { experience } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

export const dynamic = "force-static";

// Generated from the same data files as the site so it cannot drift.
export function GET() {
  const social = (label: string) =>
    profile.socials.find((s) => s.label === label);
  const github = social("GitHub");
  const linkedin = social("LinkedIn");

  const lines = [
    `# ${profile.name} (${profile.handle})`,
    "",
    `> ${site.description}`,
    "",
    `Based in ${profile.location}.`,
    "",
    "## Links",
    "",
    `- [Portfolio](${site.url}): single-page site with experience, projects, stack, and contact details`,
    `- [Resume (PDF)](${site.url}${profile.resumeUrl}): one-page resume`,
    ...(github ? [`- [GitHub](${github.href}): ${github.handle}`] : []),
    ...(linkedin ? [`- [LinkedIn](${linkedin.href}): ${linkedin.handle}`] : []),
    "",
    "## Experience",
    "",
    ...experience.map(
      (e) =>
        `- ${e.role}, ${e.company} (${e.period}, ${e.location}): ${e.stack.join(", ")}`,
    ),
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) =>
        `- ${p.name} (${p.period}): ${p.tagline}. ${p.stack.join(", ")}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
