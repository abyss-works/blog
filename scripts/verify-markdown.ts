// 목차 추출 및 읽기 시간 계산 검증. 실행: pnpm exec tsx scripts/verify-markdown.ts
import assert from "node:assert/strict";
import { estimateReadingMinutes, extractHeadings, slugify } from "../lib/markdown";

// 펜스 안의 ## 는 제목이 아니고, h1은 목차에 넣지 않는다.
const a = extractHeadings(
  "# 제목\n## 설치\n```sh\n## not heading\n```\n### 한글 제목\n~~~\n## also not\n~~~\n",
);
assert.deepEqual(
  a.map((h) => [h.depth, h.id]),
  [
    [2, "설치"],
    [3, "한글-제목"],
  ],
);

// 같은 제목은 -2, -3 접미사로 구분한다.
const b = extractHeadings("## a\n## a\n## a\n");
assert.deepEqual(
  b.map((h) => h.id),
  ["a", "a-2", "a-3"],
);

// 기호만 있는 제목도 빈 id가 되지 않는다.
assert.equal(slugify("!!!"), "section");
assert.equal(slugify("  Hello, World! "), "hello-world");

// 읽기 시간 계산: 빈·공백 입력은 0, 짧은 본문은 최소 1분, 긴 본문은 분 단위로 반올림한다.
assert.equal(estimateReadingMinutes(""), 0);
assert.equal(estimateReadingMinutes("   \n\t  "), 0);
assert.equal(estimateReadingMinutes(null), 0);
assert.equal(estimateReadingMinutes("짧은 문장입니다."), 1);
assert.equal(estimateReadingMinutes("가".repeat(800)), 2);
assert.equal(estimateReadingMinutes("word ".repeat(660)), 3);
assert.equal(estimateReadingMinutes("가".repeat(400) + " " + "word ".repeat(220)), 2);

// 4백틱 펜스 안의 3백틱 코드 블록과 다중 백틱 인라인 코드를 정확히 제외한다.
assert.equal(
  estimateReadingMinutes("````md\n```ts\n" + "word ".repeat(660) + "\n```\n````\n"),
  0,
);
assert.equal(
  estimateReadingMinutes("``a`b`` " + "가".repeat(1200) + " `inline`"),
  3,
);

// 이미지 마크다운은 제외하고 링크 텍스트는 본문으로 센다.
assert.equal(
  estimateReadingMinutes("![alt](https://example.com/a.png) [링크 텍스트](https://example.com)"),
  1,
);

console.log("verify-markdown: PASS 14");
