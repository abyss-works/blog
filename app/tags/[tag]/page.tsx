import type { Metadata } from "next";
import { getPosts } from "@/services/post";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { PostGrid } from "@/components/blocks/post-grid";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: `#${decodeURIComponent((await params).tag)}` };
}

export default async function TagPage({ params }: PageProps) {
  const tag = decodeURIComponent((await params).tag);
  const posts = await getPosts({ tag });

  return (
    <Container className="pb-8">
      <PageHeader
        eyebrow="Tag"
        title={
          <>
            <span className="text-muted-foreground">#</span>
            {tag}
          </>
        }
        description={`${posts.length}개의 글`}
      />
      <PostGrid posts={posts} emptyText="이 태그의 글이 없습니다." />
    </Container>
  );
}
