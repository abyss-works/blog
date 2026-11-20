import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { postHref } from "@/lib/utils";

interface ArticleNavProps {
  /** 더 오래된 글 */
  prev: BlogPost | null;
  /** 더 새 글 */
  next: BlogPost | null;
}

function NavLink({
  post,
  label,
  align,
}: {
  post: BlogPost;
  label: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={postHref(post)}
      className={`group flex min-w-0 flex-col gap-1 py-1 text-sm text-body-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm ${
        align === "right" ? "items-end text-right sm:col-start-2" : ""
      }`}
    >
      <span className="font-mono text-[11.5px] text-muted-foreground">
        {label}
      </span>
      <span className="line-clamp-2">{post.title}</span>
    </Link>
  );
}

export function ArticleNav({ prev, next }: ArticleNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="이전·다음 글"
      className="mt-14 grid gap-5 border-t border-border pt-6 sm:grid-cols-2"
    >
      {prev && <NavLink post={prev} label="Previous" align="left" />}
      {next && <NavLink post={next} label="Next" align="right" />}
    </nav>
  );
}
