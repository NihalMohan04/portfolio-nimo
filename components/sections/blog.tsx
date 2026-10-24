import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { formatDate, getAllPosts } from "@/lib/blog/posts";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeading label="blog" index="04" description="latest writing" />

        <ul className="mt-12 divide-y divide-border/60 border-y border-border/60">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-5"
              >
                <div className="font-mono text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span> · {post.readingMinutes} min read</span>
                </div>
                <h3 className="mt-1.5 font-semibold group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="mt-6 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          all posts →
        </Link>
      </div>
    </section>
  );
}
