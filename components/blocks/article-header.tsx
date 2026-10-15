import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/blog";
import { categoryHref, formatMonth, tagHref } from "@/lib/utils";

interface ArticleHeaderProps {
  post: BlogPost;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pt-10 pb-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        Posts
      </Link>
      <p className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
        <time dateTime={post.date}>{formatMonth(post.date)}</time>
        {post.category && (
          <>
            <span aria-hidden="true">·</span>
            <Link href={categoryHref(post.category)} className="hover:text-foreground">
              {post.category}
            </Link>
          </>
        )}
      </p>
      <h1 className="text-3xl leading-tight font-bold tracking-tight break-words md:text-4xl">
        {post.title}
      </h1>
      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge asChild variant="secondary" className="text-muted-foreground hover:text-foreground">
                <Link href={tagHref(tag)}>{tag}</Link>
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
