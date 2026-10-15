import { Heading } from "@/lib/markdown";

interface TocProps {
  headings: Heading[];
}

/** 글 목차. xl 이상에서 본문 오른쪽에 붙는다. 제목이 없으면 그리지 않는다. */
export function Toc({ headings }: TocProps) {
  if (headings.length === 0) return null;
  return (
    <nav
      aria-label="목차"
      className="hidden xl:block absolute top-10 left-full ml-12 w-56 text-sm"
    >
      <p className="mb-3 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-1.5 border-l border-border">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-6" : "pl-3"}>
            <a
              href={`#${h.id}`}
              className="block text-muted-foreground hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
