import { Heading } from "@/lib/markdown";

interface TocProps {
  headings: Heading[];
}

/** 글 목차. 넓은 화면에서 본문 우측에 고정된다. 제목이 없으면 그리지 않는다. */
export function Toc({ headings }: TocProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="hidden lg:block lg:sticky lg:top-[88px] lg:self-start lg:max-h-[calc(100vh-112px)] lg:overflow-y-auto border-l border-border pl-3.5"
    >
      <p className="mb-2.5 text-xs font-medium text-muted-foreground">
        Contents
      </p>
      <ul className="flex flex-col gap-1">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-3" : undefined}>
            <a
              href={`#${h.id}`}
              className="block py-1 text-[12.5px] leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
