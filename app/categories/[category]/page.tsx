import type { Metadata } from "next";
import { getPosts } from "@/services/post";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { PostStream } from "@/components/blocks/post-stream";

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
    <Container>
      <PageHeader
        eyebrow="Category"
        title={category}
        actions={
          <span className="font-mono text-xs tabular-nums">
            {posts.length}개의 글
          </span>
        }
      />
      <PostStream posts={posts} emptyText="이 카테고리의 글이 없습니다." />
    </Container>
  );
}
