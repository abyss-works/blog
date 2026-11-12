import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAdjacentPosts, getPostByUrlId } from "@/services/post";
import { extractHeadings } from "@/lib/markdown";
import { Container } from "@/components/layout/container";
import { ArticleHeader } from "@/components/blocks/article-header";
import { ArticleNav } from "@/components/blocks/article-nav";
import { PostContent } from "@/components/blocks/post-content";
import { Toc } from "@/components/blocks/toc";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// URL 형식: /posts/{slug}-{urlId} 또는 /posts/{urlId}. 마지막 8자가 urlId다.
function urlIdOf(slug: string) {
  return slug.length >= 8 ? slug.slice(-8) : slug;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostByUrlId(urlIdOf((await params).slug));
  return post ? { title: post.title, description: post.description } : {};
}

export default async function PostPage({ params }: PageProps) {
  const urlId = urlIdOf((await params).slug);
  const post = await getPostByUrlId(urlId);
  if (!post) notFound();

  const { prev, next } = await getAdjacentPosts(urlId);
  const headings = extractHeadings(post.content ?? "");

  return (
    <Container size="narrow" className="relative pb-8">
      <article>
        <ArticleHeader post={post} />
        <Toc headings={headings} />
        {post.content && <PostContent content={post.content} />}
      </article>
      <ArticleNav prev={prev} next={next} />
    </Container>
  );
}
