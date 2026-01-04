import { postService } from "@/services/prisma-post-service"
import { notFound } from "next/navigation"
import { MarkdownViewer } from "@/components/feature/markdown-viewer"
import { formatDate } from "@/lib/utils"
import { CommentSection } from "@/components/feature/comment-section"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await postService.getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#050505] text-zinc-100">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950/50 z-10" />
        {post.thumbnail_url && (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm scale-110"
                style={{ backgroundImage: `url(${post.thumbnail_url})` }}
            />
        )}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 mb-4">
            <span>{formatDate(post.created_at)}</span>
            <span>•</span>
            <span>{post.categories?.[0]?.name || "Uncategorized"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto mt-4">
              {post.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <MarkdownViewer content={post.content} />
        
        {/* Comments Section */}
        <CommentSection postId={post.id} slug={post.slug} />
      </div>
    </article>
  )
}
