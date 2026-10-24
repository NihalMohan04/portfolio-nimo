import type { Metadata } from "next";
import Link from "next/link";

import { formatDate, getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — Nimo",
  description: "Notes on Python, AI agents, and backend engineering.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28">
      <h1 className="font-mono text-sm text-primary sm:text-base">
        <span className="text-muted-foreground">{"// "}</span>blog
      </h1>
      <p className="mt-3 text-muted-foreground">
        Notes on Python, AI agents, and backend engineering.
      </p>
      {posts.length === 0 ? (
        <p className="mt-12 font-mono text-sm text-muted-foreground">
          no posts yet.
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-border/60 border-y border-border/60">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-6 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
