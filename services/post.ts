import { prisma } from "@/lib/db";
import { BlogPost, BlogMeta } from "@/types/blog";
import { PostStatus } from "@/lib/generated/prisma/enums";
import type { PostModel } from "@/lib/generated/prisma/models/Post";

function toBlogMeta(post: PostModel): BlogMeta {
  return {
    title: post.title,
    description: post.description ?? "",
    date: post.date
      ? post.date.toISOString().split("T")[0]
      : post.createdAt.toISOString().split("T")[0],
    tags: post.tags,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const posts: PostModel[] = await prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED },
    orderBy: { date: "desc" },
  });

  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    ...toBlogMeta(p),
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post: PostModel | null = await prisma.post.findFirst({
    where: { slug, status: PostStatus.PUBLISHED },
  });

  if (!post) return null;

  return {
    id: post.id,
    slug: post.slug,
    content: post.content ?? undefined,
    ...toBlogMeta(post),
  };
}
