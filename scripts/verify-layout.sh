#!/usr/bin/env bash
# 레이아웃 검증.
#
# 실행 중인 인스턴스의 각 라우트가 기대한 상태 코드를 반환하고, 페이지마다 셸 랜드마크
# (header, nav, main, footer), 건너뛰기 링크, h1 하나를 갖는지 확인한다.
#
#   BASE_URL=http://localhost:3000 scripts/verify-layout.sh
#
# POST_PATH(예: /posts/hello-abcd1234)와 TAG_PATH, CATEGORY_PATH를 주면 해당 페이지도 검사한다.
set -uo pipefail

BASE="${BASE_URL:-http://localhost:3000}"
pass=0; fail=0; skip=0
check() { # check <설명> <기대> <실제>
  if [ "$2" = "$3" ]; then echo "  PASS  $1 (=$3)"; pass=$((pass+1));
  else echo "  FAIL  $1 (기대=$2 실제=$3)"; fail=$((fail+1)); fi
}
skip_() { echo "  SKIP  $1"; skip=$((skip+1)); }

page() { # page <경로> <기대코드> [추가로 포함해야 할 문자열...]
  local path="$1" want="$2"; shift 2
  local body code
  body="$(curl -s -o - -w '\n%{http_code}' "$BASE$path")"
  code="${body##*$'\n'}"
  body="${body%$'\n'*}"
  echo "[$path]"
  check "status" "$want" "$code"
  for mark in '<header' '<nav' '<main' '<footer' 'href="#main"'; do
    check "contains $mark" "1" "$(grep -c -- "$mark" <<<"$body" | awk '{print ($1>0)?1:0}')"
  done
  check "h1 count" "1" "$(grep -o '<h1[ >]' <<<"$body" | wc -l | tr -d ' ')"
  for extra in "$@"; do
    check "contains $extra" "1" "$(grep -c -- "$extra" <<<"$body" | awk '{print ($1>0)?1:0}')"
  done
}

page "/" 200 '<aside'
page "/tags" 200
page "/categories" 200
page "/about" 200
page "/sign-in" 200
page "/nope-$(date +%s)" 404
page "/posts/nope-$(date +%s)" 404

if [ -n "${POST_PATH:-}" ]; then page "$POST_PATH" 200 '<article'; else skip_ "POST_PATH 미지정: 글 페이지"; fi
if [ -n "${TAG_PATH:-}" ]; then page "$TAG_PATH" 200; else skip_ "TAG_PATH 미지정: 태그 페이지"; fi
if [ -n "${CATEGORY_PATH:-}" ]; then page "$CATEGORY_PATH" 200; else skip_ "CATEGORY_PATH 미지정: 카테고리 페이지"; fi

echo "[/admin] 비인증"
check "redirect" "307" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/admin")"

echo
echo "PASS $pass  FAIL $fail  SKIP $skip"
[ "$fail" -eq 0 ]
