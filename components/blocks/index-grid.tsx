import Link from "next/link";
import { Count } from "@/types/blog";

interface IndexGridProps {
  items: Count[];
  hrefOf: (name: string) => string;
  emptyText: string;
  /** rows: 카테고리용 단일 열 헤어라인 목록, tags: 태그용 다열 헤어라인 색인 */
  variant?: "rows" | "tags";
}

export function IndexGrid({
  items,
  hrefOf,
  emptyText,
  variant = "rows",
}: IndexGridProps) {
  if (items.length === 0) {
    return <p className="py-12 text-sm text-muted-foreground">{emptyText}</p>;
  }

  if (variant === "tags") {
    return (
      <ul className="mb-16 grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.name} className="hairline-sheen border-b border-border">
            <Link
              href={hrefOf(item.name)}
              className="group flex items-baseline justify-between gap-4 py-4 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
            >
              <span className="truncate font-mono text-[13px] text-body-secondary transition-colors group-hover:text-foreground">
                <span aria-hidden="true" className="mr-0.5 text-muted-foreground opacity-55">
                  #
                </span>
                {item.name}
              </span>
              <span className="font-mono text-[11.5px] tabular-nums text-muted-foreground transition-colors group-hover:text-mineral">
                {item.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mb-16">
      {items.map((item) => (
        <li key={item.name} className="hairline-sheen border-b border-border">
          <Link
            href={hrefOf(item.name)}
            className="group flex items-baseline justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
          >
            <span className="truncate text-[16.5px] font-medium text-title transition-colors group-hover:text-foreground">
              {item.name}
            </span>
            <span className="shrink-0 font-mono text-[12.5px] tabular-nums text-muted-foreground transition-colors group-hover:text-mineral">
              {item.count} {item.count === 1 ? "post" : "posts"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
