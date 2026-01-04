import { Post, Comment } from "@/types";

export interface PostRepository {
  /**
   * getPosts
   * Retrieves a paginated list of posts.
   * @param page Page number (1-based)
   * @param limit Number of posts per page
   * @param publishedOnly If true, only returns published posts
   */
  getPosts(page: number, limit?: number, options?: { publishedOnly?: boolean, categorySlug?: string, tagSlug?: string }): Promise<Post[]>;

  /**
   * getPostBySlug
   * Retrieves a single post by its slug.
   * @param slug The url slug of the post
   */
  getPostBySlug(slug: string): Promise<Post | null>;

  /**
   * createPost
   * Creates a new post.
   * @param data Partial post data
   */
  createPost(data: Partial<Post>): Promise<Post>;

  /**
   * getComments
   * Retrieves comments for a specific post.
   * @param postId The ID of the post
   */
  getComments(postId: string): Promise<Comment[]>;

  /**
   * createComment
   * Creates a new comment.
   * @param data Partial comment data
   */
  createComment(data: Partial<Comment>): Promise<Comment>;
}
