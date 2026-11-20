import type { Metadata } from "next";
import { getPosts } from "@/services/post";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { PostStream } from "@/components/blocks/post-stream";

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
    <Container>
      <PageHeader
        eyebrow="Tag"
        title={
          <>
            <span className="text-muted-foreground">#</span>
            {tag}
          </>
        }
        actions={
          <span className="font-mono text-xs tabular-nums">
            {posts.length}개의 글
          </span>
        }
      />
      <PostStream posts={posts} emptyText="이 태그의 글이 없습니다." />
    </Container>
  );
}
