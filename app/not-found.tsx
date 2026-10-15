import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

export default function NotFound() {
  return (
    <Container size="narrow" className="pb-8">
      <PageHeader
        eyebrow="404"
        title="페이지를 찾을 수 없습니다"
        description="주소가 바뀌었거나 글이 삭제되었을 수 있습니다."
      />
      <Button asChild variant="outline">
        <Link href="/">홈으로</Link>
      </Button>
    </Container>
  );
}
