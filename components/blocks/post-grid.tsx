import { PostCard } from "@/components/blocks/post-card";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

interface PostGridProps {
  posts: BlogPost[];
  emptyText: string;
  /** aside와 나란히 놓이면 2, 전체 폭이면 3 */
  columns?: 2 | 3;
}

export function PostGrid({ posts, emptyText, columns = 3 }: PostGridProps) {
  if (posts.length === 0) {
    return <p className="py-10 text-muted-foreground">{emptyText}</p>;
  }
  return (
    <ul
      className={cn(
        "grid gap-5 md:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {posts.map((post) => (
        <li key={post.id} className="min-w-0">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
