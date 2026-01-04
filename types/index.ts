// Basic Type Definitions based on Functional Specification

export interface Profile {
  id: string; // uuid
  username: string;
  avatar_url?: string;
  role: "user" | "admin";
  created_at: string;
}

export interface Post {
  id: string; // uuid
  title: string;
  slug: string;
  content: string; // Markdown content
  description: string; // SEO description / Excerpt
  thumbnail_url?: string;
  published: boolean;
  author_id: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  tags?: Tag[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  parent_id?: string | null;
  created_at: string;
  author?: Profile; // optional for UI convenience
}
