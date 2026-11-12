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

/** 태그·카테고리 이름과 글 수 */
export interface Count {
  name: string;
  count: number;
}
