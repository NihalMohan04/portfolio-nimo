import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { SmoothScrollLink } from "@/components/shared/smooth-scroll-link";
import { profile } from "@/lib/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">{"// "}</span>
          © {year} {profile.handle.toLowerCase()} · built with care
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
          <Link
            href={profile.socials.find((s) => s.label === "GitHub")?.href ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            github
          </Link>
          <Separator orientation="vertical" className="h-3" />
          <Link
            href={
              profile.socials.find((s) => s.label === "LinkedIn")?.href ?? "#"
            }
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            linkedin
          </Link>
          <Separator orientation="vertical" className="h-3" />
          <SmoothScrollLink
            href="#top"
            className="transition-colors hover:text-primary"
          >
            ↑ top
          </SmoothScrollLink>
        </div>
      </div>
    </footer>
  );
}
