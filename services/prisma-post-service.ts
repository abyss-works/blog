import { PostRepository } from "./post-repository";
import { Post, Tag } from "@/types";
import { prisma } from "@/lib/prisma";

export class PrismaPostService implements PostRepository {
  async getPosts(page: number = 1, limit: number = 10, publishedOnly: boolean = true): Promise<Post[]> {
    const skip = (page - 1) * limit;

    const whereCondition = publishedOnly ? { published: true } : {};

    const posts = await prisma.post.findMany({
      where: whereCondition,
      skip: skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        tags: true,
        categories: true,
      },
    });

    return posts.map(this.mapPrismaPostToDomain);
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        tags: true,
        categories: true,
      },
    });

    if (!post) return null;
    return this.mapPrismaPostToDomain(post);
  }

  // Private helper to map database model to domain model
  private mapPrismaPostToDomain(prismaPost: any): Post {
    return {
      id: prismaPost.id,
      title: prismaPost.title,
      slug: prismaPost.slug,
      content: prismaPost.content,
      description: prismaPost.description || "",
      thumbnail_url: prismaPost.thumbnail_url || undefined,
      published: prismaPost.published,
      author_id: prismaPost.author_id,
      view_count: prismaPost.view_count,
      created_at: prismaPost.created_at.toISOString(),
      updated_at: prismaPost.updated_at.toISOString(),
      tags: prismaPost.tags.map((t: any) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
      })),
      categories: prismaPost.categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      })),
    };
  }
}

export const postService = new PrismaPostService();
