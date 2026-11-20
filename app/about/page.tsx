import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container size="narrow" className="pb-16">
      <PageHeader
        title="About"
        description="Solutions against the Deep"
      />
      <div className="space-y-4.5 text-[15.8px] leading-[1.88] text-body-secondary">
        <p>
          Abyssworks Studio의 기술 블로그입니다. 인프라, 백엔드, 프런트엔드를
          만들고 운영하며 배운 것을 기록합니다.
        </p>
        <p>
          코드와 작업 과정은{" "}
          <a
            href="https://github.com/abyss-works"
            className="text-foreground underline decoration-border-strong decoration-1 underline-offset-4 transition-colors hover:decoration-mineral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
            rel="noreferrer"
          >
            GitHub
          </a>
          에 있습니다.
        </p>
      </div>
    </Container>
  );
}
