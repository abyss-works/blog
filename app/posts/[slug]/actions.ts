'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { postService } from '@/services/prisma-post-service'

export async function createCommentAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const content = formData.get('content') as string
  const postId = formData.get('postId') as string
  const slug = formData.get('slug') as string // for revalidation/redirect

  if (!content || !postId) {
    throw new Error("Content and Post ID are required")
  }

  try {
    await postService.createComment({
      content,
      post_id: postId,
      author_id: user.id
    })
  } catch (error) {
    console.error("Failed to create comment:", error)
    throw error
  }

  revalidatePath(`/posts/${slug}`)
}
