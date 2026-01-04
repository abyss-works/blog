import { postService } from "@/services/prisma-post-service"
import { PostList } from "@/components/blocks/post-list"
import { notFound } from "next/navigation"

interface TagPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  
  // Fetch posts by tag slug
  const posts = await postService.getPosts(1, 50, { publishedOnly: true, tagSlug: slug })

  if (posts.length === 0) {
    // Optional: You could show an empty state instead of 404
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 p-8">
      <div className="max-w-5xl mx-auto space-y-12 py-12">
        <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight capitalize">Tag: <span className="text-zinc-400">#{slug}</span></h1>
            <p className="text-zinc-500">Browsing all posts tagged with {slug}.</p>
        </div>
        
        <PostList posts={posts} />
      </div>
    </main>
  )
}
