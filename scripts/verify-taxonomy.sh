#!/usr/bin/env bash
# 카테고리·태그 검증.
#
# 실행 중인 인스턴스에 글을 작성해 카테고리 저장·입력 검증과 카테고리·태그 목록 페이지 필터를 확인한다.
# 계정이 없으면 첫 계정을 생성하므로 스크래치 DB를 대상으로 실행한다.
#
#   BASE_URL=http://localhost:3000 scripts/verify-taxonomy.sh
#
# DATABASE_URL과 psql이 있으면 저장된 카테고리 값 검사를 추가로 수행한다.
set -uo pipefail

BASE="${BASE_URL:-http://localhost:3000}"
ORIGIN="${BASE_ORIGIN:-$BASE}"
EMAIL="${VERIFY_EMAIL:-verify-author@example.com}"
PASSWORD="${VERIFY_PASSWORD:-verify-password-123}"
JAR="$(mktemp)"
JSON='Content-Type: application/json'
RUN="$(date +%s)"
CAT="엔지니어링 & C# $RUN"
CAT_ENC="$(printf '%s' "$CAT" | jq -sRr @uri)"
TAG="태그/100% $RUN"
TAG_ENC="$(printf '%s' "$TAG" | jq -sRr @uri)"

pass=0; fail=0; skip=0
check() { # check <설명> <기대> <실제>
  if [ "$2" = "$3" ]; then echo "  PASS  $1 (=$3)"; pass=$((pass+1));
  else echo "  FAIL  $1 (기대=$2 실제=$3)"; fail=$((fail+1)); fi
}
skip_() { echo "  SKIP  $1"; skip=$((skip+1)); }
# 브라우저와 동일하게 Origin/Referer를 보낸다 (better-auth CSRF 검사 대상).
code() { curl -s -o /dev/null -w '%{http_code}' -H "Origin: $ORIGIN" -H "Referer: $ORIGIN/admin" "$@"; }
has() { # has <경로> <문자열>
  curl -s "$BASE$1" | grep -qF -- "$2" && echo yes || echo no
}
db() { # db <SQL>
  psql "$DATABASE_URL" -t -A -c "$1" 2>/dev/null | tr -d '[:space:]'
}
if [ -n "${DATABASE_URL:-}" ] && command -v psql >/dev/null 2>&1; then HAVE_DB=1; else HAVE_DB=0; fi

echo "대상: $BASE"
echo
echo "=== 1. 로그인 ==="
code -c "$JAR" -X POST "$BASE/api/auth/sign-up/email" -H "$JSON" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"name\":\"verify\"}" >/dev/null
check "로그인" 200 "$(code -c "$JAR" -X POST "$BASE/api/auth/sign-in/email" -H "$JSON" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")"

echo
echo "=== 2. 카테고리 입력 ==="
check "카테고리·태그 지정 글 작성" 200 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d "{\"title\":\"Categorized $RUN\",\"content\":\"body\",\"category\":\"  $CAT  \",\"tags\":[\"$TAG\"]}")"
check "카테고리 없는 글 작성" 200 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d "{\"title\":\"Plain $RUN\",\"content\":\"body\",\"category\":\"   \"}")"
check "50자 초과 카테고리 거부" 400 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d "{\"title\":\"x\",\"content\":\"y\",\"category\":\"$(printf 'a%.0s' $(seq 51))\"}")"
check "문자열이 아닌 카테고리 거부" 400 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '{"title":"x","content":"y","category":1}')"
if [ "$HAVE_DB" = 1 ]; then
  check "카테고리 앞뒤 공백 제거 저장" yes "$(psql "$DATABASE_URL" -t -A -c "SELECT category FROM posts WHERE title = 'Categorized $RUN';" | grep -qxF -- "$CAT" && echo yes || echo no)"
  check "공백뿐인 카테고리는 NULL 저장" 1 "$(db "SELECT count(*) FROM posts WHERE title = 'Plain $RUN' AND category IS NULL;")"
else
  skip_ "저장 값 확인 (DATABASE_URL/psql 없음)"
fi

echo
echo "=== 3. 목록 필터 ==="
check "카테고리 페이지 응답" 200 "$(code "$BASE/categories/$CAT_ENC")"
check "카테고리 페이지에 해당 글 포함" yes "$(has "/categories/$CAT_ENC" "Categorized $RUN")"
check "카테고리 페이지에 다른 글 제외" no "$(has "/categories/$CAT_ENC" "Plain $RUN")"
check "태그 페이지에 해당 글 포함" yes "$(has "/tags/$TAG_ENC" "Categorized $RUN")"
check "태그 페이지에 다른 글 제외" no "$(has "/tags/$TAG_ENC" "Plain $RUN")"
check "홈 카드에 카테고리 링크" yes "$(has "/" "href=\"/categories/$CAT_ENC\"")"
check "홈 카드에 태그 링크" yes "$(has "/" "href=\"/tags/$TAG_ENC\"")"

rm -f "$JAR"
echo
echo "===================================="
echo "PASS=$pass FAIL=$fail SKIP=$skip"
exit $([ "$fail" -eq 0 ] && echo 0 || echo 1)
