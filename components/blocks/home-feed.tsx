"use client";

import { useState } from "react";
import { BlogPost, Count } from "@/types/blog";
import { PostStream } from "@/components/blocks/post-stream";
import { cn } from "@/lib/utils";

interface HomeFeedProps {
  posts: BlogPost[];
  categories: Count[];
}

export function HomeFeed({ posts, categories }: HomeFeedProps) {
  const [selected, setSelected] = useState<string>("all");

  const visiblePosts =
    selected === "all"
      ? posts
      : posts.filter((post) => post.category === selected);

  return (
    <>
      <section className="border-b border-border pt-7 sm:pt-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 sm:gap-6">
          <h1 className="text-[clamp(1.5rem,2.8vw,1.8125rem)] leading-tight font-semibold tracking-[-0.03em] text-foreground">
            Abyssworks Studio
          </h1>
          <p className="max-w-[50ch] text-sm text-muted-foreground">
            Solutions against the Deep · 인프라, 백엔드, 프런트엔드를 만들고 운영하며 배운 기록.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="카테고리 필터"
          className="flex items-center gap-5 overflow-x-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selected === "all"}
            onClick={() => setSelected("all")}
            className={cn(
              "relative inline-flex items-baseline gap-1.5 pt-2 pb-3 text-[13.5px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm",
              selected === "all"
                ? "font-medium text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-mineral"
                : "text-muted-foreground hover:text-body-secondary",
            )}
          >
            All
            <span
              className={cn(
                "font-mono text-[11px] tabular-nums",
                selected === "all" ? "text-mineral" : "opacity-75",
              )}
            >
              {posts.length}
            </span>
          </button>

          {categories.map((cat) => {
            const active = selected === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(cat.name)}
                className={cn(
                  "relative inline-flex items-baseline gap-1.5 pt-2 pb-3 text-[13.5px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm",
                  active
                    ? "font-medium text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-mineral"
                    : "text-muted-foreground hover:text-body-secondary",
                )}
              >
                {cat.name}
                <span
                  className={cn(
                    "font-mono text-[11px] tabular-nums",
                    active ? "text-mineral" : "opacity-75",
                  )}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <PostStream
        posts={visiblePosts}
        emptyText={
          selected === "all"
            ? "아직 글이 없습니다."
            : "이 카테고리의 글이 없습니다."
        }
      />
    </>
  );
}
