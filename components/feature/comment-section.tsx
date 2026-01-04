import { postService } from "@/services/prisma-post-service"
import { createClient } from "@/utils/supabase/server"
import { CommentList } from "./comment-list"
import { CommentForm } from "./comment-form"

interface CommentSectionProps {
  postId: string
  slug: string
}

export async function CommentSection({ postId, slug }: CommentSectionProps) {
  const comments = await postService.getComments(postId)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <section className="space-y-8 pt-12 mt-12 border-t border-zinc-900">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Comments ({comments.length})</h2>
      <CommentForm postId={postId} slug={slug} user={user} />
      <CommentList comments={comments} />
    </section>
  )
}
