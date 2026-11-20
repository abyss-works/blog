import type { Metadata } from "next";
import { getTaxonomy } from "@/services/post";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { IndexGrid } from "@/components/blocks/index-grid";
import { tagHref } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Tags" };

export default async function TagsPage() {
  const { tags } = await getTaxonomy();
  return (
    <Container>
      <PageHeader
        title="Tags"
        actions={
          <span className="font-mono text-xs tabular-nums">
            {tags.length}개의 태그
          </span>
        }
      />
      <IndexGrid
        items={tags}
        hrefOf={tagHref}
        emptyText="아직 태그가 없습니다."
        variant="tags"
      />
    </Container>
  );
}
