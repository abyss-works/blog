import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/blog";
import { CalendarIcon } from "lucide-react";
import { tagHref } from "@/lib/utils";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const href = post.slug ? `/posts/${post.slug}-${post.id}` : `/posts/${post.id}`;
  return (
    <div className="relative group">
      <Card className="h-full border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-xs text-zinc-500">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {post.date}
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {/* 카드 전체를 덮는 링크: 태그 링크와 중첩되지 않도록 제목에만 둔다 */}
            <Link
              href={href}
              className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-[3px] focus-visible:after:ring-zinc-400/50"
            >
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-zinc-400 line-clamp-2">
            {post.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              asChild
              variant="secondary"
              className="relative z-10 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 border-zinc-800"
            >
              <Link href={tagHref(tag)}>{tag}</Link>
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}
