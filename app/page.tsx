import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Freetime } from "@/components/sections/freetime";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { experience } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const current = experience.find((e) => e.current);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  url: site.url,
  description: site.description,
  ...(current && {
    jobTitle: current.role,
    worksFor: { "@type": "Organization", name: current.company },
  }),
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.split(",")[0].trim(),
    addressCountry: "IN",
  },
  knowsAbout: ["Python", "TypeScript", "Next.js", "FastAPI", "LangGraph", "LLM applications"],
  sameAs: profile.socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Freetime />
      <Contact />
    </>
  );
}
