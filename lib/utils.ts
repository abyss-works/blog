import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function postHref(post: { id: string; slug?: string }) {
  return post.slug ? `/posts/${post.slug}-${post.id}` : `/posts/${post.id}`
}

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}`
}

export function categoryHref(category: string) {
  return `/categories/${encodeURIComponent(category)}`
}
