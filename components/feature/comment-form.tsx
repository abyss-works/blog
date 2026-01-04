'use client'

import { createCommentAction } from "@/app/posts/[slug]/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface CommentFormProps {
  postId: string
  slug: string
  user: any // Supabase User
}

export function CommentForm({ postId, slug, user }: CommentFormProps) {
  if (!user) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 text-center">
        <p className="text-zinc-400 mb-4">Please log in to leave a comment.</p>
        <Button asChild variant="outline">
          <Link href={`/login?next=/posts/${slug}`}>Log in</Link>
        </Button>
      </div>
    )
  }

  return (
    <form action={createCommentAction} className="space-y-4">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="slug" value={slug} />
      <Textarea 
        name="content" 
        placeholder="Share your thoughts..." 
        className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700 min-h-[100px]"
        required 
      />
      <div className="flex justify-end">
        <Button type="submit" className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300">
          Post Comment
        </Button>
      </div>
    </form>
  )
}
