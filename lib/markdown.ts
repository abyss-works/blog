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

/** 펜스 코드 블록(3개 이상의 백틱·물결표)을 제거한 본문 줄을 반환한다. */
function stripFencedCode(markdown: string): string {
  const out: string[] = [];
  let fenceChar: string | null = null;
  let fenceLen = 0;

  for (const line of markdown.split("\n")) {
    const m = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (fenceChar === null) {
      if (m) {
        const ch = m[1][0];
        // CommonMark: 백틱 인포 문자열에 백틱이 포함되면 펜스가 아니다.
        if (ch === "`" && m[2].includes("`")) {
          out.push(line);
        } else {
          fenceChar = ch;
          fenceLen = m[1].length;
        }
        continue;
      }
      out.push(line);
    } else if (m && m[1][0] === fenceChar && m[1].length >= fenceLen && m[2].trim() === "") {
      fenceChar = null;
      fenceLen = 0;
    }
  }
  return out.join("\n");
}

/** CommonMark 규칙에 맞춰 단일·다중 백틱 인라인 코드 스팬을 제거한다. */
function stripInlineCode(text: string): string {
  let out = "";
  let i = 0;
  while (i < text.length) {
    if (text[i] === "`") {
      let len = 1;
      while (i + len < text.length && text[i + len] === "`") len++;
      let close = i + len;
      let found = -1;
      while (close < text.length) {
        if (text[close] === "`") {
          let run = 1;
          while (close + run < text.length && text[close + run] === "`") run++;
          if (run === len) {
            found = close + run;
            break;
          }
          close += run;
        } else {
          close++;
        }
      }
      if (found !== -1) {
        out += " ";
        i = found;
        continue;
      }
      out += text.slice(i, i + len);
      i += len;
      continue;
    }
    out += text[i];
    i++;
  }
  return out;
}

/** 마크다운에서 h2·h3를 뽑는다. 펜스 코드 블록(```, ~~~) 안은 건너뛴다. */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const nextId = uniqueIds();
  let fenceChar: string | null = null;
  let fenceLen = 0;

  for (const line of markdown.split("\n")) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (fenceChar === null && fenceMatch) {
      const ch = fenceMatch[1][0];
      if (!(ch === "`" && fenceMatch[2].includes("`"))) {
        fenceChar = ch;
        fenceLen = fenceMatch[1].length;
        continue;
      }
    } else if (
      fenceChar !== null &&
      fenceMatch &&
      fenceMatch[1][0] === fenceChar &&
      fenceMatch[1].length >= fenceLen &&
      fenceMatch[2].trim() === ""
    ) {
      fenceChar = null;
      fenceLen = 0;
      continue;
    }
    if (fenceChar !== null) continue;

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

/** 마크다운 본문의 예상 읽기 시간(분)을 계산한다. 빈 문자열은 0을 반환한다. */
export function estimateReadingMinutes(
  markdown: string | null | undefined,
): number {
  if (!markdown) return 0;
  const plain = stripInlineCode(stripFencedCode(markdown))
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-|]/g, " ");

  const cjkChars =
    (plain.match(/[\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) ?? [])
      .length;
  const latinWords = (plain.match(/[A-Za-z0-9]+/g) ?? []).length;
  if (cjkChars === 0 && latinWords === 0) return 0;

  // 한국어 분당 ~400자, 영문 분당 ~220단어 기준
  const minutes = cjkChars / 400 + latinWords / 220;
  return Math.max(1, Math.round(minutes));
}
