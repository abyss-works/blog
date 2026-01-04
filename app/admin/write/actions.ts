'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { postService } from '@/services/prisma-post-service'
import { Tag, Category } from '@/types'

export async function createPostAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Extract data from formData
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const description = formData.get('description') as string
  const thumbnail_url = formData.get('thumbnail_url') as string
  const published = formData.get('published') === 'on'
  const categoriesRaw = formData.get('categories') as string
  const tagsRaw = formData.get('tags') as string

  // Simple validation
  if (!title || !slug || !content) {
    throw new Error("Title, slug, and content are required")
  }

  // Parse Tags and Categories
  // Expecting comma separated values: "Next.js, React"
  const tags: Tag[] = tagsRaw ? tagsRaw.split(',').map(t => {
      const name = t.trim()
      return { id: '', name, slug: name.toLowerCase().replace(/\s+/g, '-') }
  }) : []

  const categories: Category[] = categoriesRaw ? categoriesRaw.split(',').map(c => {
      const name = c.trim()
      return { id: '', name, slug: name.toLowerCase().replace(/\s+/g, '-') }
  }) : []


  try {
    await postService.createPost({
      title,
      slug,
      content,
      description,
      thumbnail_url,
      published,
      author_id: user.id, // Assuming Supabase User ID matches Profile ID
      tags,
      categories
    })
  } catch (error) {
    console.error("Failed to create post:", error)
    // In a real app, we'd return specific errors to the form
    throw error 
  }

  revalidatePath('/')
  redirect(`/posts/${slug}`)
}
