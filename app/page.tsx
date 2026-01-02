import { getPosts } from "@/services/post";
import { PostList } from "@/components/blocks/post-list";

// Server Component
export default async function Home() {
  // DAL: Fetch data securely on the server
  // This data is never exposed directly to the client as raw JSON,
  // only rendered HTML or serialized props for specific components.
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-transparent to-transparent opacity-50" />
        
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Abyssworks Studio
        </h1>
        
        <p className="relative z-10 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light tracking-wide">
          Solutions against the Depth of Logic
        </p>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </section>

      {/* Blog Posts Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Latest Insights</h2>
          <div className="h-px flex-1 bg-zinc-900 ml-6" />
        </div>
        
        <PostList posts={posts} />
      </section>
      
      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 mt-12">
        <div className="container mx-auto px-4 text-center text-zinc-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Abyssworks Studio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
