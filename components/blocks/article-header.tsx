import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { categoryHref, formatMonth, tagHref } from "@/lib/utils";

interface ArticleHeaderProps {
  post: BlogPost;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pb-6">
      <Link
        href="/"
        className="mb-7 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
        Posts
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-2.5 font-mono text-[12.5px] tabular-nums text-muted-foreground">
        <time dateTime={post.date}>{formatMonth(post.date)}</time>
        {post.category && (
          <>
            <span aria-hidden="true">·</span>
            <Link
              href={categoryHref(post.category)}
              className="font-sans font-medium text-mineral hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
            >
              {post.category}
            </Link>
          </>
        )}
        {post.readingMinutes && (
          <>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min</span>
          </>
        )}
      </div>

      <h1 className="text-[clamp(1.5625rem,3vw,2.0625rem)] leading-[1.26] font-semibold tracking-[-0.03em] text-balance text-foreground break-words">
        {post.title}
      </h1>

      {post.description && (
        <p className="mt-3 text-[15.5px] leading-[1.75] text-body-secondary">
          {post.description}
        </p>
      )}

      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11.5px] text-muted-foreground">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={tagHref(tag)}
                className="transition-colors hover:text-mineral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
              >
                <span aria-hidden="true" className="mr-0.5">
                  #
                </span>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
