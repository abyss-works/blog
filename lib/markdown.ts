export interface Heading {
  depth: 2 | 3;
  text: string;
  id: string;
}

/** 제목 텍스트를 앵커 id로 바꾼다. 한글·영숫자·하이픈만 남기고 소문자화한다. */
export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "section";
}

/** 같은 id가 반복되면 -2, -3 접미사를 붙인다. 렌더러와 목차가 같은 순서로 호출한다. */
export function uniqueIds() {
  const seen = new Map<string, number>();
  return (base: string): string => {
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

/** 마크다운에서 h2·h3를 뽑는다. 펜스 코드 블록(```, ~~~) 안은 건너뛴다. */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const nextId = uniqueIds();
  let fence: string | null = null;

  for (const line of markdown.split("\n")) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const mark = fenceMatch[1][0].repeat(3);
      if (fence === null) fence = mark;
      else if (fence === mark) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[2].trim();
    headings.push({
      depth: m[1].length as 2 | 3,
      text,
      id: nextId(slugify(text)),
    });
  }
  return headings;
}
