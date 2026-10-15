#!/usr/bin/env bash
# 인증 계층 검증.
#
# 실행 중인 인스턴스에 대해 로그인·인가·입력 검증·작성자 귀속을 확인한다.
# 첫 계정을 생성하므로 스크래치 DB를 대상으로 실행한다.
#
#   BASE_URL=http://localhost:3000 scripts/verify-auth.sh
#
# DATABASE_URL과 psql이 있으면 작성자 귀속 검사를 추가로 수행한다.
set -uo pipefail

BASE="${BASE_URL:-http://localhost:3000}"
ORIGIN="${BASE_ORIGIN:-$BASE}"
EMAIL="${VERIFY_EMAIL:-verify-author@example.com}"
PASSWORD="${VERIFY_PASSWORD:-verify-password-123}"
JAR="$(mktemp)"
JSON='Content-Type: application/json'

pass=0; fail=0; skip=0
check() { # check <설명> <기대> <실제>
  if [ "$2" = "$3" ]; then echo "  PASS  $1 (=$3)"; pass=$((pass+1));
  else echo "  FAIL  $1 (기대=$2 실제=$3)"; fail=$((fail+1)); fi
}
skip_() { echo "  SKIP  $1"; skip=$((skip+1)); }
# 브라우저와 동일하게 Origin/Referer를 보낸다 (better-auth CSRF 검사 대상).
code() { curl -s -o /dev/null -w '%{http_code}' -H "Origin: $ORIGIN" -H "Referer: $ORIGIN/admin" "$@"; }
verdict() { [ "$1" = "200" ] && echo "허용" || echo "거부"; }

db() { # db <SQL>
  psql "$DATABASE_URL" -t -A -c "$1" 2>/dev/null | tr -d '[:space:]'
}
if [ -n "${DATABASE_URL:-}" ] && command -v psql >/dev/null 2>&1; then HAVE_DB=1; else HAVE_DB=0; fi

echo "대상: $BASE"
echo
echo "=== 1. 비인증 접근 차단 ==="
check "POST /api/posts 무인증 차단" 401 "$(code -X POST "$BASE/api/posts" -H "$JSON" -d '{"title":"x","content":"y"}')"
check "GET /admin 무인증 리다이렉트" 307 "$(code "$BASE/admin")"
check "GET /sign-in 공개" 200 "$(code "$BASE/sign-in")"
check "GET / 목록 공개" 200 "$(code "$BASE/")"

echo
echo "=== 2. 첫 계정 생성 ==="
check "첫 가입 성공" 200 "$(code -c "$JAR" -X POST "$BASE/api/auth/sign-up/email" -H "$JSON" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"name\":\"verify\"}")"
check "세션 쿠키 발급" yes "$(grep -q 'better-auth' "$JAR" && echo yes || echo no)"

echo
echo "=== 3. 인증된 접근 ==="
check "POST /api/posts 인증 통과" 200 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '{"title":"Verify Title","content":"# body","tags":["t1"]}')"
check "GET /admin 인증 통과" 200 "$(code -b "$JAR" "$BASE/admin")"

echo
echo "=== 4. 추가 가입 차단 (단일 작성자) ==="
SECOND="$(code -X POST "$BASE/api/auth/sign-up/email" -H "$JSON" -d "{\"email\":\"intruder@example.com\",\"password\":\"$PASSWORD\",\"name\":\"intruder\"}")"
check "두 번째 가입 거부" "거부" "$(verdict "$SECOND")"
if [ "$HAVE_DB" = 1 ]; then
  check "user 행 1개 유지" 1 "$(db 'SELECT count(*) FROM "user";')"
else
  skip_ "user 행 수 확인 (DATABASE_URL/psql 없음)"
fi

echo
echo "=== 5. CSRF 보호 ==="
check "Origin 없는 sign-out 거부" "거부" "$(verdict "$(curl -s -o /dev/null -w '%{http_code}' -b "$JAR" -X POST "$BASE/api/auth/sign-out" -H "$JSON" -d '{}')")"

echo
echo "=== 6. 로그아웃 ==="
check "sign-out 성공" 200 "$(code -b "$JAR" -c "$JAR" -X POST "$BASE/api/auth/sign-out" -H "$JSON" -d '{}')"
check "sign-out 후 쓰기 차단" 401 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '{"title":"x","content":"y"}')"
check "sign-out 후 /admin 리다이렉트" 307 "$(code -b "$JAR" "$BASE/admin")"

echo
echo "=== 7. 재로그인 ==="
check "기존 계정 로그인" 200 "$(code -c "$JAR" -X POST "$BASE/api/auth/sign-in/email" -H "$JSON" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")"
check "재로그인 후 쓰기 가능" 200 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '{"title":"Second Post","content":"body"}')"

echo
echo "=== 8. 입력 검증 ==="
check "title 누락 거부" 400 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '{"content":"y"}')"
check "content 누락 거부" 400 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '{"title":"y"}')"
check "공백뿐인 title 거부" 400 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '{"title":"   ","content":"y"}')"
check "빈 본문 거부" 400 "$(code -b "$JAR" -X POST "$BASE/api/posts" -H "$JSON" -d '')"

echo
echo "=== 9. 작성자 귀속 ==="
if [ "$HAVE_DB" = 1 ]; then
  check "작성된 글 전부 authorId 보유" 0 "$(db 'SELECT count(*) FROM posts WHERE "authorId" IS NULL;')"
  check "authorId가 작성자 계정과 일치" 2 "$(db "SELECT count(*) FROM posts p JOIN \"user\" u ON u.id = p.\"authorId\" WHERE u.email = '$EMAIL';")"
  check "글 2건만 기록됨" 2 "$(db 'SELECT count(*) FROM posts;')"
else
  skip_ "작성자 귀속 확인 (DATABASE_URL/psql 없음)"
fi

rm -f "$JAR"
echo
echo "===================================="
echo "PASS=$pass FAIL=$fail SKIP=$skip"
exit $([ "$fail" -eq 0 ] && echo 0 || echo 1)
