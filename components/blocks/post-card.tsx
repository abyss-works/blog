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
import { categoryHref, formatMonth, postHref, tagHref } from "@/lib/utils";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative h-full">
      <Card className="h-full gap-4 py-5 transition-colors hover:border-ring/60 hover:bg-muted/40">
        <CardHeader className="px-5">
          <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
            <time dateTime={post.date} className="flex items-center gap-1">
              <CalendarIcon aria-hidden="true" className="size-3" />
              {formatMonth(post.date)}
            </time>
            {post.category && (
              <Link
                href={categoryHref(post.category)}
                className="relative z-10 transition-colors hover:text-foreground"
              >
                {post.category}
              </Link>
            )}
          </div>
          <CardTitle className="text-lg leading-snug font-semibold tracking-tight">
            {/* 카드 전체를 덮는 링크: 태그 링크와 중첩되지 않도록 제목에만 둔다 */}
            <Link
              href={postHref(post)}
              className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
            >
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5">
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {post.description}
          </CardDescription>
        </CardContent>
        {post.tags.length > 0 && (
          <CardFooter className="mt-auto flex flex-wrap gap-1.5 px-5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                asChild
                variant="secondary"
                className="relative z-10 text-muted-foreground hover:text-foreground"
              >
                <Link href={tagHref(tag)}>{tag}</Link>
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </article>
  );
}
