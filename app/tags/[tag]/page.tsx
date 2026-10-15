import Link from "next/link";
import { getPosts } from "@/services/post";
import { PostGrid } from "@/components/blocks/post-grid";
import { ArrowLeftIcon } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: PageProps) {
  const tag = decodeURIComponent((await params).tag);
  const posts = await getPosts({ tag });

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      <section className="container mx-auto px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to posts
        </Link>
        <h1 className="mb-12 text-3xl font-bold tracking-tight break-words">
          <span className="text-zinc-500">#</span>
          {tag}
        </h1>
        {posts.length > 0 ? (
          <PostGrid posts={posts} emptyText="이 분류의 글이 없습니다." />
        ) : (
          <p className="text-zinc-500">이 태그의 글이 없습니다.</p>
        )}
      </section>
    </main>
  );
}
