import Link from "next/link";
import { Count } from "@/types/blog";

interface IndexGridProps {
  items: Count[];
  hrefOf: (name: string) => string;
  emptyText: string;
}

/** 태그·카테고리 인덱스: 이름과 글 수를 가진 링크 타일 */
export function IndexGrid({ items, hrefOf, emptyText }: IndexGridProps) {
  if (items.length === 0) {
    return <p className="py-10 text-muted-foreground">{emptyText}</p>;
  }
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={hrefOf(item.name)}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-ring/60 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <span className="truncate">{item.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{item.count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
