export interface BlogMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category?: string;
}

export interface BlogPost extends BlogMeta {
  id: string;
  slug?: string;
  content?: string;
}
