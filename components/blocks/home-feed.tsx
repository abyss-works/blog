"use client";

import { useId, useRef, useState } from "react";
import { BlogPost, Count } from "@/types/blog";
import { PostStream } from "@/components/blocks/post-stream";
import { cn } from "@/lib/utils";

interface HomeFeedProps {
  posts: BlogPost[];
  categories: Count[];
}

export function HomeFeed({ posts, categories }: HomeFeedProps) {
  // null은 전체(All) 선택을 뜻하며 소문자 "all" 카테고리와의 충돌을 막는다.
  const [selected, setSelected] = useState<string | null>(null);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs: Array<{ key: string | null; label: string; count: number }> = [
    { key: null, label: "All", count: posts.length },
    ...categories.map((cat) => ({
      key: cat.name,
      label: cat.name,
      count: cat.count,
    })),
  ];

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.key === selected),
  );
  const panelId = `${baseId}-panel`;
  const activeTabId = `${baseId}-tab-${activeIndex}`;

  const visiblePosts =
    selected === null
      ? posts
      : posts.filter((post) => post.category === selected);

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === -1) return;

    e.preventDefault();
    setSelected(tabs[next].key);
    tabRefs.current[next]?.focus();
  }

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

        {/* 수평 스크롤 시 포커스 링이 잘리지 않도록 좌우·상하 여유 패딩을 둔다. */}
        <div
          role="tablist"
          aria-label="카테고리 필터"
          className="-mx-1 flex items-center gap-5 overflow-x-auto px-1 pt-1"
        >
          {tabs.map((tab, idx) => {
            const active = tab.key === selected;
            const tabId = `${baseId}-tab-${idx}`;
            return (
              <button
                key={tab.key ?? "__all__"}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={cn(
                  "relative inline-flex items-baseline gap-1.5 pt-2 pb-3 text-[13.5px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:rounded-sm",
                  active
                    ? "font-medium text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-mineral"
                    : "text-muted-foreground hover:text-body-secondary",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "font-mono text-[11px] tabular-nums",
                    active ? "text-mineral" : "text-muted-foreground",
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div id={panelId} role="tabpanel" aria-labelledby={activeTabId}>
        <PostStream
          posts={visiblePosts}
          emptyText={
            selected === null
              ? "아직 글이 없습니다."
              : "이 카테고리의 글이 없습니다."
          }
        />
      </div>
    </>
  );
}
