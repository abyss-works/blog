import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container size="narrow" className="pb-8">
      <PageHeader
        title="About"
        description="Solutions against the Depth of Logic"
      />
      <div className="text-[17px] leading-[1.75] text-foreground/90">
        <p className="mb-5">
          Abyssworks Studio의 기술 블로그입니다. 인프라, 백엔드, 프런트엔드를
          만들고 운영하며 배운 것을 기록합니다.
        </p>
        <p>
          코드와 작업 과정은{" "}
          <a
            href="https://github.com/abyss-works"
            className="underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground"
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
