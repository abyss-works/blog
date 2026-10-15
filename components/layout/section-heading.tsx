interface SectionHeadingProps {
  children: React.ReactNode;
}

/** 섹션 제목(영문, 대문자 모노)과 오른쪽으로 이어지는 가로선. 본문·aside 모두 이 형식을 쓴다. */
export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="mb-4 flex items-center gap-4 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase after:h-px after:flex-1 after:bg-border">
      {children}
    </h2>
  );
}
