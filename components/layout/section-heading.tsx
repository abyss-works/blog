interface SectionHeadingProps {
  children: React.ReactNode;
}

/** 섹션 제목과 오른쪽으로 이어지는 가로선 */
export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="mb-5 flex items-center gap-4 text-sm font-medium text-muted-foreground after:h-px after:flex-1 after:bg-border">
      {children}
    </h2>
  );
}
