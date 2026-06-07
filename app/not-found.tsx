import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col items-start justify-center gap-6 px-6 py-24">
      <div className="font-mono text-sm text-muted-foreground">
        <span className="text-primary">nimo@portfolio</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-sky-400">~</span>
        <span className="text-muted-foreground">$</span>{" "}
        <span className="text-foreground">cd /lost</span>
      </div>

      <h1 className="text-6xl font-semibold tracking-tight text-foreground sm:text-8xl">
        <span className="text-glow text-primary">404</span>
      </h1>

      <p className="font-mono text-base text-primary sm:text-lg">
        <span className="text-muted-foreground">error:</span> command not
        found
      </p>

      <p className="max-w-prose text-pretty text-muted-foreground">
        The page you’re looking for either doesn’t exist or was moved. Try
        heading back to the home directory.
      </p>

      <div className="mt-4 flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="text-primary">→</span>
        <Link
          href="/"
          className={buttonVariants({ size: "sm", variant: "default" })}
        >
          cd ~
        </Link>
      </div>
    </main>
  );
}
