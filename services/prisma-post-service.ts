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

  async createPost(data: Partial<Post>): Promise<Post> {
    // Separate relations from flat data
    const { tags, categories, author_id, ...rest } = data;
    
    // We assume author_id is required
    if (!author_id) throw new Error("Author ID is required");

    // Prepare connect/create logic for Tags
    // Note: data.tags comes as an array of Tag objects from the domain model, 
    // but the UI might send just names. We'll handle normalization in the Service or Action.
    // Here we assume data.tags contains objects with names/slugs if we want to create them.
    // For simplicity, let's assume the controller/action passes ready-to-use connect/create input 
    // OR we iterate here. Let's iterate here for robustness.
    
    const tagConnectOrCreate = tags?.map(t => ({
      where: { slug: t.slug },
      create: { name: t.name, slug: t.slug }
    })) || [];

    const categoryConnectOrCreate = categories?.map(c => ({
      where: { slug: c.slug },
      create: { name: c.name, slug: c.slug }
    })) || [];

    const post = await prisma.post.create({
      data: {
        title: rest.title!,
        slug: rest.slug!,
        content: rest.content!,
        description: rest.description,
        thumbnail_url: rest.thumbnail_url,
        published: rest.published,
        author: { connect: { id: author_id } },
        tags: {
          connectOrCreate: tagConnectOrCreate
        },
        categories: {
          connectOrCreate: categoryConnectOrCreate
        }
      },
      include: {
        tags: true,
        categories: true
      }
    });

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
