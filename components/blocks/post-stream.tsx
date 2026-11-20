import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { categoryHref, formatMonth, postHref, tagHref } from "@/lib/utils";

interface PostStreamProps {
  posts: BlogPost[];
  emptyText: string;
}

/** 날짜·카테고리 메타 레일과 본문 요약으로 구성된 정적 글 목록 */
export function PostStream({ posts, emptyText }: PostStreamProps) {
  if (posts.length === 0) {
    return (
      <p className="py-12 text-sm text-muted-foreground">{emptyText}</p>
    );
  }

  return (
    <ul className="pt-1 pb-16">
      {posts.map((post) => (
        <li key={post.id} className="hairline-sheen border-b border-border">
          <article className="group relative grid grid-cols-1 gap-2 py-6 sm:grid-cols-[164px_minmax(0,1fr)] sm:gap-8 sm:py-7">
            <div className="flex flex-row items-center gap-2.5 pt-0.5 sm:flex-col sm:items-start sm:gap-1.5">
              <time
                dateTime={post.date}
                className="font-mono text-[12.5px] tabular-nums text-muted-foreground transition-colors duration-200 group-hover:text-body-secondary"
              >
                {formatMonth(post.date)}
              </time>
              {(post.category || post.readingMinutes) && (
                <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                  {post.category && (
                    <Link
                      href={categoryHref(post.category)}
                      className="relative z-10 font-medium text-mineral opacity-85 transition-opacity duration-200 hover:opacity-100 group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                    >
                      {post.category}
                    </Link>
                  )}
                  {post.category && post.readingMinutes && (
                    <span aria-hidden="true">·</span>
                  )}
                  {post.readingMinutes && (
                    <span className="tabular-nums">{post.readingMinutes} min</span>
                  )}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="mb-1.5 text-[clamp(1.125rem,1.9vw,1.25rem)] leading-[1.38] font-semibold tracking-[-0.02em] text-title transition-colors duration-200 group-hover:text-foreground">
                {/* 행 전체를 덮는 링크: 카테고리·태그 링크와 중첩되지 않도록 제목에만 둔다 */}
                <Link
                  href={postHref(post)}
                  className="outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:rounded-sm"
                >
                  {post.title}
                </Link>
              </h2>

              {post.description && (
                <p className="mb-3 max-w-[62ch] text-[14.5px] leading-[1.74] text-body-secondary line-clamp-2">
                  {post.description}
                </p>
              )}

              {post.tags.length > 0 && (
                <ul className="relative z-10 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11.5px] text-muted-foreground">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={tagHref(tag)}
                        className="opacity-80 transition-colors hover:text-mineral hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                      >
                        <span aria-hidden="true" className="mr-0.5 opacity-45">
                          #
                        </span>
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
