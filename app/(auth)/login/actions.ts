'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Type-casting here for simplicity, but zorm/zod validation is recommended
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function loginWithGoogle() {
  const supabase = await createClient()
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" // Adjust based on env

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    redirect('/error')
  }

  if (data.url) {
    redirect(data.url)
  }
}
