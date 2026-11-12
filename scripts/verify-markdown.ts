// 목차 추출 검증. 실행: pnpm exec tsx scripts/verify-markdown.ts
import assert from "node:assert/strict";
import { extractHeadings, slugify } from "../lib/markdown";

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

console.log("verify-markdown: PASS 4");
