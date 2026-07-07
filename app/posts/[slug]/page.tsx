import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/services/post";
import { PostContent } from "@/components/blocks/post-content";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      <article className="container mx-auto max-w-3xl px-4 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {post.date}
            </div>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 border-zinc-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        {post.content && <PostContent content={post.content} />}
      </article>
    </main>
  );
}
