import { cn } from "@/lib/utils";

/** 작은 보조 레이블(섹션·페이지 머리의 분류명, 날짜 줄, 목차 제목). 문장형 표기, 대문자 변환 없음. */
export const eyebrowClass = "font-mono text-xs text-muted-foreground";

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn(eyebrowClass, className)} {...props} />;
}
