import { prisma } from "@/lib/db";
import { BlogPost, BlogMeta, Count } from "@/types/blog";
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
    category: post.category ?? undefined,
  };
}

export async function getPosts(
  filter: { tag?: string; category?: string } = {},
): Promise<BlogPost[]> {
  const posts: PostModel[] = await prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      ...(filter.tag !== undefined && { tags: { has: filter.tag } }),
      ...(filter.category !== undefined && { category: filter.category }),
    },
    orderBy: { date: "desc" },
  });

  return posts.map((p) => ({
    id: p.urlId,
    slug: p.slug ?? undefined,
    ...toBlogMeta(p),
  }));
}

function countNames(names: string[]): Count[] {
  const map = new Map<string, number>();
  for (const name of names) map.set(name, (map.get(name) ?? 0) + 1);
  return [...map]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

/** 발행 글 기준 카테고리·태그별 글 수. 이름 오름차순. */
export async function getTaxonomy(): Promise<{
  categories: Count[];
  tags: Count[];
}> {
  const rows = await prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED },
    select: { category: true, tags: true },
  });
  return {
    categories: countNames(
      rows.flatMap((r) => (r.category ? [r.category] : [])),
    ),
    tags: countNames(rows.flatMap((r) => r.tags)),
  };
}

/** 날짜 내림차순 목록에서 양옆 글. prev는 더 오래된 글, next는 더 새 글. */
export async function getAdjacentPosts(
  urlId: string,
): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const posts = await getPosts();
  const i = posts.findIndex((p) => p.id === urlId);
  if (i < 0) return { prev: null, next: null };
  return { prev: posts[i + 1] ?? null, next: posts[i - 1] ?? null };
}

export async function getPostByUrlId(urlId: string): Promise<BlogPost | null> {
  const post: PostModel | null = await prisma.post.findFirst({
    where: { urlId, status: PostStatus.PUBLISHED },
  });

  if (!post) return null;

  return {
    id: post.urlId,
    slug: post.slug ?? undefined,
    content: post.content ?? undefined,
    ...toBlogMeta(post),
  };
}
