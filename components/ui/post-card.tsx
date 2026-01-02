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

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <Card className="h-full border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-xs text-zinc-500">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {post.date}
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {post.title}
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
              variant="secondary"
              className="bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 border-zinc-800"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
