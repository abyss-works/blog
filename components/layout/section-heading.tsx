import { eyebrowClass } from "@/components/layout/eyebrow";

interface SectionHeadingProps {
  children: React.ReactNode;
}

/** 섹션 제목(영문 한 단어, 문장형)과 오른쪽으로 이어지는 가로선. 본문·aside 모두 이 형식을 쓴다. */
export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className={`${eyebrowClass} mb-4 flex items-center gap-4 after:h-px after:flex-1 after:bg-border`}>
      {children}
    </h2>
  );
}
