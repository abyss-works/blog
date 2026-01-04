import { Post } from "@/types";

export interface PostRepository {
  /**
   * getPosts
   * Retrieves a paginated list of posts.
   * @param page Page number (1-based)
   * @param limit Number of posts per page
   * @param publishedOnly If true, only returns published posts
   */
  getPosts(page: number, limit?: number, publishedOnly?: boolean): Promise<Post[]>;

  /**
   * getPostBySlug
   * Retrieves a single post by its slug.
   * @param slug The url slug of the post
   */
  getPostBySlug(slug: string): Promise<Post | null>;

  // Future methods (commented out for now until implementation)
  // createPost(data: Partial<Post>): Promise<Post>;
  // updatePost(id: string, data: Partial<Post>): Promise<Post>;
}
