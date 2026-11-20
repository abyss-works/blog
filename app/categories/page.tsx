import type { Metadata } from "next";
import { getTaxonomy } from "@/services/post";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { IndexGrid } from "@/components/blocks/index-grid";
import { categoryHref } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const { categories } = await getTaxonomy();
  return (
    <Container>
      <PageHeader
        title="Categories"
        actions={
          <span className="font-mono text-xs tabular-nums">
            {categories.length}개의 카테고리
          </span>
        }
      />
      <IndexGrid
        items={categories}
        hrefOf={categoryHref}
        emptyText="아직 카테고리가 없습니다."
        variant="rows"
      />
    </Container>
  );
}
