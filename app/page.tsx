import { postService } from "@/services/prisma-post-service"
import { PostCard } from "@/components/ui/post-card"
import { PostList } from "@/components/blocks/post-list"
import { WaveBackground } from "@/components/ui/wave-background"

export default async function Home() {
  const posts = await postService.getPosts(1, 10)

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-zinc-800">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 z-0 opacity-40">
           <WaveBackground />
        </div>
        <div className="z-10 text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Abyssworks Studio
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Exploring the depths of engineering and design.
          </p>
        </div>
      </section>

      {/* Post List Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
        </div>
        
        <PostList posts={posts} />
      </section>
    </main>
  )
}
