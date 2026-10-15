import type { Metadata } from "next";
import { getPosts } from "@/services/post";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { PostGrid } from "@/components/blocks/post-grid";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: decodeURIComponent((await params).category) };
}

export default async function CategoryPage({ params }: PageProps) {
  const category = decodeURIComponent((await params).category);
  const posts = await getPosts({ category });

  return (
    <Container className="pb-8">
      <PageHeader
        eyebrow="Category"
        title={category}
        description={`${posts.length}개의 글`}
      />
      <PostGrid posts={posts} emptyText="이 카테고리의 글이 없습니다." />
    </Container>
  );
}
